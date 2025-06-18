import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { GET_ALL_WINES } from '../../queries/queries';
import useUserAddress from '../../hooks/useUserAddress';
import useCustomQuery from '../../hooks/useCustomQuery.js';
import { Link } from 'react-router-dom';
import './WineListPage.css';

const WineListPage = () => {
  const userAddress = useUserAddress();
  const { data, loading, error } = useCustomQuery(
    GET_ALL_WINES,
    { userAddress },
    { skip: !userAddress },
  );

  if (!userAddress) {
    return <p className="message">Connecting to MetaMask...</p>;
  }

  if (loading) return <p className="message">Loading wines...</p>;
  if (error)
    return (
      <p className="message error-message">
        Error loading wines: {error.message}
      </p>
    );

  return (
    <div className="wine-list-container">
      <h1>Wine List</h1>

      {data.wineItemCreateds.length === 0 ? (
        <p className="message">No wines found for your account.</p>
      ) : (
        <table className="wine-table">
          <thead>
            <tr>
              <th>Wine ID</th>
              <th>Winery</th>
              <th>Batch Name</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {data.wineItemCreateds.map(wine => (
              <tr key={wine.wineID}>
                <td>{wine.wineID}</td>
                <td>{wine.wineryData_name}</td>
                <td>{wine.batchData_batchName}</td>
                <td>
                  <div className="qr-code-container">
                    <QRCodeSVG
                      value={`${window.location.origin}/wine-details/${wine.wineID}`}
                      size={100}
                      level="H"
                    />
                    <Link
                      to={`/wine-details/${wine.wineID}`}
                      className="view-details-link"
                    >
                      View Details
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WineListPage;
