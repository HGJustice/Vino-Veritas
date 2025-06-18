import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GET_WINERIES, GET_BATCHES } from '../../queries/queries';
import useUserAddress from '../../hooks/useUserAddress';
import useCustomQuery from '../../hooks/useCustomQuery.js';
import './LocationMap.css';

const fromFixedPoint = (intValue, decimals = 5) => {
  return intValue / 10 ** decimals;
};

export default function LocationMap() {
  const userAddress = useUserAddress();
  const { data: wineriesData } = useCustomQuery(
    GET_WINERIES,
    { userAddress },
    { skip: !userAddress },
  );
  const [wineries, setWineries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [selectedWinery, setSelectedWinery] = useState(null);
  const {
    data: batchesData,
    loading: batchesLoading,
    error: batchesError,
  } = useCustomQuery(
    GET_BATCHES,
    { wineryName: selectedWinery?.name || '' },
    { skip: !selectedWinery },
  );
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);

  useEffect(() => {
    if (wineriesData && wineriesData.wineryCreateds) {
      const convertedWineries = wineriesData.wineryCreateds.map(winery => ({
        ...winery,
        latitude: fromFixedPoint(parseInt(winery.latitude)),
        longitude: fromFixedPoint(parseInt(winery.longitude)),
      }));
      setWineries(convertedWineries);
      if (convertedWineries.length > 0) {
        setMapCenter({
          lat: convertedWineries[0].latitude,
          lng: convertedWineries[0].longitude,
        });
      }
    }
  }, [wineriesData]);

  const handleMarkerClick = winery => {
    setSelectedWinery(winery);
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }
    const content = `
      <div>
        <h3>${winery.name}</h3>
        <div id="batches-content">Loading batches...</div>
        
      </div>
    `;
    const infoWindow = new window.google.maps.InfoWindow({
      content: content,
      position: { lat: winery.latitude, lng: winery.longitude },
    });
    infoWindow.addListener('closeclick', () => {
      setSelectedWinery(null);
    });
    infoWindow.open(mapRef.current);
    infoWindowRef.current = infoWindow;

    refetchBatches({ variables: { wineryName: winery.name } });
  };

  useEffect(() => {
    if (selectedWinery && batchesData && !batchesLoading && !batchesError) {
      const batchesContent = `
        <h4>Batches:</h4>
        <ul>
          ${batchesData.batchCreateds
            .map(batch => `<li>${batch.batchName}</li>`)
            .join('')}
        </ul>
      `;
      const contentDiv = document.getElementById('batches-content');
      if (contentDiv) {
        contentDiv.innerHTML = batchesContent;
      }
    }
  }, [selectedWinery, batchesData, batchesLoading, batchesError]);

  const onMapLoad = map => {
    mapRef.current = map;
  };

  return (
    <div className="locationMap__container">
      {batchesError ? (
        <p>No winery data available. Please add a winery.</p>
      ) : (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
          <GoogleMap
            mapContainerClassName="locationMap__map"
            center={mapCenter}
            zoom={10}
            onLoad={onMapLoad}
          >
            {wineries.map((winery, index) => (
              <Marker
                key={index}
                position={{ lat: winery.latitude, lng: winery.longitude }}
                onClick={() => handleMarkerClick(winery)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
}
