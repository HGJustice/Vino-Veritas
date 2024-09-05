import React from 'react';
import LocationMap from '../../components/LocationMap/LocationMap';
import { Link } from 'react-router-dom';
import './MapPage.css';

export default function MapPage() {
  return (
    <div className="map__container">
      <div className="map__buttonContainer">
        <Link to="/displayWineries" reloadDocument>
          <button className="map__backButton">Back to wineries</button>
        </Link>
      </div>
      <LocationMap />;
    </div>
  );
}
