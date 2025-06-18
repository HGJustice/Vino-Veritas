import { React } from 'react';
import { Link } from 'react-router-dom';
import { DISPLAY_WINERIES } from '../../queries/queries.js';
import RegisterWinery from '../../components/RegisterWinery/RegisterWinery';
import useCustomQuery from '../../hooks/useCustomQuery.js';
import useUserAddress from '../../hooks/useUserAddress';
import './DisplayWineriesPage.css';

export default function DisplayWineriesPage() {
  const userAddress = useUserAddress();
  const { data, loading } = useCustomQuery(
    DISPLAY_WINERIES,
    { userAddress },
    { skip: !userAddress },
  );

  if (loading) return <h2 className="winery__loading">Loading...</h2>;
  if (!data || !data.wineryCreateds) return <p>No winery data available</p>;

  return (
    <div className="winery__container">
      <RegisterWinery />
      <h1 className="winery__title">My Wineries</h1>
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
