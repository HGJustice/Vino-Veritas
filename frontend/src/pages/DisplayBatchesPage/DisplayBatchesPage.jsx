import { React } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import CreateBatch from '../../components/CreateBatch/CreateBatch';
import BatchManagementABI from '../../ABI/BatchManagement.json';
import './DisplayBatchesPage.css';

const batchManagementAddress = '0x7D3B6F745A91E6ac6d9e29068594799548fA336f';

const DISPLAY_BATCHES = gql`
  query DisplayBatches($wineryName: String!) {
    batchCreateds(
      where: { wineryName: $wineryName }
      orderBy: wineryBatchCount
    ) {
      wineryBatchCount
      batchName
    }
  }
`;

export default function DisplayBatchesPage() {
  const location = useLocation();
  const { wineryName } = location.state;

  const { loading, data } = useQuery(DISPLAY_BATCHES, {
    variables: { wineryName },
  });

  async function removeBatchHandler(batchId) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const batchContract = new ethers.Contract(
      batchManagementAddress,
      BatchManagementABI,
      signer,
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
            <Link
              to={`/displayStatistics/${batch.wineryBatchCount}`}
              state={{ batchNumber: batch.wineryBatchCount }}
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
