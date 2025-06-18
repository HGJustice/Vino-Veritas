import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_WINE_DETAILS } from '../../queries/queries';
import useCustomQuery from '../../hooks/useCustomQuery.js';
import './WineDetailsPage.css';

const WineDetailsPage = () => {
  const { wineID } = useParams();
  const { data, loading, error } = useCustomQuery(
    GET_WINE_DETAILS,
    { wineID },
    { skip: !wineID },
  );

  if (!wineID) return <p className="error-message">No Wine ID provided.</p>;
  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;

  return (
    <div className="wine-details-container">
      <h1>Wine Details for ID: {wineID}</h1>

      {data.wineItemCreateds.map((item, idx) => (
        <div key={idx}>
          <h2 className="batch-name">{item.batchData_batchName}</h2>
          <div className="details">
            <p>
              <strong>Winery:</strong> {item.batchData_wineryName}
            </p>
            <p>
              <strong>Humidity:</strong> {item.batchData_humidity.join(', ')}
            </p>
            <p>
              <strong>Temperature:</strong>{' '}
              {item.batchData_temperature.join(', ')}
            </p>
            <p>
              <strong>Wind Speed:</strong> {item.batchData_windSpeed.join(', ')}
            </p>
            <p>
              <strong>Soil Conductivity:</strong>{' '}
              {item.batchData_soilConductivity.join(', ')}
            </p>
            <p>
              <strong>Rain Fall:</strong> {item.batchData_rainFall.join(', ')}
            </p>{' '}
          </div>
        </div>
      ))}

      {data.wineItemProgresseds.map((item, idx) => (
        <div key={idx} className="progressed-items">
          <p>
            <strong>Tank ID:</strong> {item.tankID}
          </p>
          <p>
            <strong>Barrel ID:</strong> {item.barrelID}
          </p>
          <p>
            <strong>Bottle ID:</strong> {item.bottleID}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WineDetailsPage;
