import { React } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CreateBatch from '../../components/CreateBatch/CreateBatch';
import { DISPLAY_BATCHES } from '../../queries/queries';
import { batchManagementAddress } from '../../constants/contractAddresses';
import BatchManagementABI from '../../ABI/BatchManagement.json';
import useCustomQuery from '../../hooks/useCustomQuery.js';
import './DisplayBatchesPage.css';

export default function DisplayBatchesPage() {
  const location = useLocation();
  const wineryName = location.state?.wineryName;
  const { data, loading } = useCustomQuery(
    DISPLAY_BATCHES,
    { wineryName },
    { skip: !wineryName },
  );

  async function removeBatchHandler(batchId) {
    alert('Batch being removed from IOT Data');
    const provider = new ethers.BrowserProvider(window.ethereum);
    const pk = import.meta.env.VITE_PRIVATE_KEY;
    const wallet = new ethers.Wallet(pk, provider);
    const batchContract = new ethers.Contract(
      batchManagementAddress,
      BatchManagementABI,
      wallet,
    );

    const tx = await batchContract.removeBatch(batchId);
    await tx.wait();
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="batches__container">
      <div>
        <CreateBatch />
      </div>
      <h1 className="batches__title">Batches for Winery: {wineryName}</h1>
      <Link to="/displayWineries" reloadDocument>
        <button className="batch__backButton">Back to wineries</button>
      </Link>
      <div className="batches__grid">
        {data.batchCreateds.map((batch, index) => (
          <div key={index} className="batch__card">
            <h2 className="batch__subtitle">Batch #{index + 1}</h2>
            <p className="batch__content">{batch.batchName}</p>
            <p className="batch__content">
              IOT Script ID: {batch.wineryBatchCount}
            </p>
            {console.log('Winery Name in DisplayBatchesPage:', wineryName)}
            <Link
              to={`/displayStatistics/${batch.wineryBatchCount}`}
              state={{
                batchNumber: batch.wineryBatchCount,
                wineryName,
              }}
            >
              <button className="batch__button">View Statistics</button>
            </Link>

            <button
              className="batch__button"
              onClick={() => removeBatchHandler(batch.wineryBatchCount)}
            >
              Remove Batch
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
