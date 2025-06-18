import React from 'react';
import './HomePage.css';

export default function HomePage() {
  return (
    <div>
      <div className="HomePage__container">
        <h1> Welcome to Wine-To-Chain </h1>
        <h3>
          Your solution to Wine audits and transparant supply chain management
          dApp
        </h3>
        <p className="HomePage__details">
          - If you wish to create a winery or manage/view your wine patches and
          their IoT device satistics, please head to the Winery section. Here
          you can also remove batches from the IoT data which will get the patch
          ready for the next step in the supply chain.
        </p>
        <p className="HomePage__details">
          - To view the location on a world map of all of your wineries, please
          visit the Map section. It will also tell you the patches of wine
          available at each location.
        </p>
        <p className="HomePage__details">
          - Within the tracebility stage, you as the winery manager can progress
          the patch into an Wine Item. This is where the manager inputs data
          from the different stages of the wine lifecycle such as tanks, barrel
          and finallly bottle.
        </p>
        <p className="HomePage__details">
          - The QR section enables wine managers to print QR codes for their
          final wine products. These codes are labeled on each bottle, allowing
          customers to scan them and access detailed information about the
          wine's journey. When scanned, the QR code redirects users to the site,
          displaying details such as the originating winery, barrel, tank, and
          associated IoT sensor data.
        </p>
        <img src="/wineField.jpg" alt="Wine field" />
      </div>
    </div>
  );
}
