import React, { useState, useRef } from 'react';
import { ethers } from 'ethers';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import WineryABI from '../../ABI/WineryManagement.json';
import './RegisterWinery.css';

const wineryManagementAddress = '0x24d01e4D4c92648B50F6E7b7715E19044A6ca8B3';

export default function RegisterWinery() {
  const [formData, setFormData] = useState({
    wineryName: '',
    wineryAddress: '',
  });
  const inputRef = useRef();

  const handleInputChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handlePlacesChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  const toFixedPoint = (floatValue, decimals = 5) => {
    return Math.round(floatValue * 10 ** decimals);
  };

  async function createWineryHandler(event) {
    event.preventDefault();
    const [place] = inputRef.current.getPlaces();

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const wineryContract = new ethers.Contract(
      wineryManagementAddress,
      WineryABI,
      signer,
    );

    const fixedLatitude = toFixedPoint(place.geometry.location.lat());
    const fixedLongitude = toFixedPoint(place.geometry.location.lng());

    const tx = await wineryContract.createWinery(
      formData.wineryName,
      fixedLatitude,
      fixedLongitude,
    );
    await tx.wait();
  }

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      libraries={['places']}
    >
      <div className="registry__container">
        <h1 className="registry__title">Register Winery</h1>
        <form onSubmit={createWineryHandler} className="registry__form">
          <div className="registry__input-group">
            <label className="registry__label" htmlFor="wineryName">
              Winery Name
            </label>
            <input
              type="text"
              id="wineryName"
              name="wineryName"
              placeholder="Winery Name"
              value={formData.wineryName}
              onChange={handleInputChange}
            />
          </div>
          <div className="registry__input-group">
            <label className="registry__label" htmlFor="wineryAddress">
              Winery Address
            </label>
            <StandaloneSearchBox
              onLoad={ref => (inputRef.current = ref)}
              onPlacesChanged={handlePlacesChanged}
            >
              <input
                type="text"
                id="wineryAddress"
                name="wineryAddress"
                value={formData.wineryAddress}
                onChange={handleInputChange}
                placeholder="Location"
              />
            </StandaloneSearchBox>
          </div>
          <button type="submit" className="registry__button">
            Create Winery
          </button>
        </form>
      </div>
    </LoadScript>
  );
}
