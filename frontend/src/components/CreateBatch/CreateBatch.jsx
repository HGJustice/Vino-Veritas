import { React, useState } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import { batchManagementAddress } from '../../constants/contractAddresses';
import BatchManagementABI from '../../ABI/BatchManagement.json';
import './CreateBatch.css';

export default function CreateBatch() {
  const [formData, setFormData] = useState({
    wineryName: '',
  });
  let { wineryNumber } = useParams();

  const handleInputChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function createBatchHandler(event) {
    event.preventDefault();
    alert('Batch being created... please refresh page');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const pk = import.meta.env.VITE_PRIVATE_KEY;
    const wallet = new ethers.Wallet(pk, provider);
    const batchContract = new ethers.Contract(
      batchManagementAddress,
      BatchManagementABI,
      wallet,
    );

    const tx = await batchContract.createBatch(
      formData.batchName,
      wineryNumber,
    );
    await tx.wait();
  }
  return (
    <div className="createBatch__container">
      <h1 className="createBatch__title">Create New Batch</h1>
      <form onSubmit={createBatchHandler} className="createBatch__form">
        <div className="createBatch__input-group">
          <label htmlFor="batchName" className="createBatch__label">
            Batch Name
          </label>
          <input
            type="text"
            id="batchName"
            name="batchName"
            placeholder="Batch name"
            value={formData.batchName}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="createBatch__button">
          Create Batch
        </button>
      </form>
    </div>
  );
}
