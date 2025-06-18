import React from 'react';
import LocationMap from '../../components/LocationMap/LocationMap';
import './MapPage.css';

export default function MapPage() {
  return (
    <div className="map__container">
      <LocationMap />;
    </div>
  );
}
