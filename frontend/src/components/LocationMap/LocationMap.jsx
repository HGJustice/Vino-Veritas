import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ethers } from 'ethers';
import { useQuery, gql } from '@apollo/client';
import './LocationMap.css';

async function getUserAddress() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return await signer.getAddress();
}

const fromFixedPoint = (intValue, decimals = 5) => {
  return intValue / 10 ** decimals;
};

const GET_WINERIES = gql`
  query GetWineries($userAddress: String!) {
    wineryCreateds(where: { addy: $userAddress }) {
      name
      latitude
      longitude
    }
  }
`;

const GET_BATCHES = gql`
  query GetBatches($wineryName: String!) {
    batchCreateds(where: { wineryName: $wineryName }) {
      wineryName
      batchName
    }
  }
`;

export default function LocationMap() {
  const [userAddress, setUserAddress] = useState(null);
  const [wineries, setWineries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [selectedWinery, setSelectedWinery] = useState(null);
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getUserAddress();
      setUserAddress(address);
    };

    fetchAddress();
  }, []);

  const { data: wineriesData } = useQuery(GET_WINERIES, {
    variables: { userAddress: userAddress },
    skip: !userAddress,
  });

  const {
    data: batchesData,
    loading: batchesLoading,
    error: batchesError,
  } = useQuery(GET_BATCHES, {
    variables: { wineryName: selectedWinery?.name || '' },
    skip: !selectedWinery,
  });

  useEffect(() => {
    if (wineriesData && wineriesData.wineryCreateds) {
      const convertedWineries = wineriesData.wineryCreateds.map(winery => ({
        ...winery,
        latitude: fromFixedPoint(parseInt(winery.latitude)),
        longitude: fromFixedPoint(parseInt(winery.longitude)),
      }));
      setWineries(convertedWineries);
      setMapCenter({
        lat: convertedWineries[0].latitude,
        lng: convertedWineries[0].longitude,
      });
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
    </div>
  );
}
