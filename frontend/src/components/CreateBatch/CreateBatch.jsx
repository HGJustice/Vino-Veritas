import { React, useState } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import BatchManagementABI from '../../ABI/BatchManagement.json';
import './CreateBatch.css';

const batchManagementAddress = '0x7D3B6F745A91E6ac6d9e29068594799548fA336f';

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

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const batchContract = new ethers.Contract(
      batchManagementAddress,
      BatchManagementABI,
      signer,
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
