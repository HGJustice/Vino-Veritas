import { React, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import RegisterWinery from '../../components/RegisterWinery/RegisterWinery';
import './DisplayWineriesPage.css';

async function getUserAddress() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return await signer.getAddress();
}

const DISPLAY_WINERIES = gql`
  query DisplayWineries($userAddress: String!) {
    wineryCreateds(where: { addy: $userAddress }, orderBy: wineryNumber) {
      wineryNumber
      name
    }
  }
`;

export default function DisplayWineriesPage() {
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getUserAddress();
      setUserAddress(address);
    };

    fetchAddress();
  }, []);

  const { loading, data } = useQuery(DISPLAY_WINERIES, {
    variables: { userAddress: userAddress },
    skip: !userAddress,
  });

  if (loading) return <p>Loading...</p>;
  if (!data || !data.wineryCreateds) return <p>No winery data available</p>;

  return (
    <div className="winery__container">
      <RegisterWinery />
      <h1 className="winery__title">My Wineries</h1>
      <Link to="/map" reloadDocument>
        <button id="winery__viewMapButton">View Map</button>
      </Link>
      <div className="winery__grid">
        {data.wineryCreateds.map(winery => (
          <div key={winery.wineryNumber} className="winery__card">
            <h2 className="winery__subtitle">Winery #{winery.wineryNumber}</h2>
            <p className="winery__content">{winery.name}</p>
            <Link
              to={`/displayBatches/${winery.wineryNumber}`}
              state={{ wineryName: winery.name }}
            >
              <button className="winery__button">Manage Batches</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
