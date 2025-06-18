import React, { useState, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import { useQuery } from '@apollo/client';
import { traceabilityContractAddress } from '../../constants/contractAddresses';
import {
  GET_WINERIES2,
  GET_BATCHES2,
  GET_WINE_ITEMS,
  GET_WINE_ITEM_PROGRESSEDS,
} from '../../queries/queries';
import useUserAddress from '../../hooks/useUserAddress';
import traceabilityABI from '../../ABI/WineTraceability.json';
import './TraceabilityPage.css';

export default function TraceabilityPage() {
  const userAddress = useUserAddress();
  const [selectedWinery, setSelectedWinery] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [tankInputs, setTankInputs] = useState({});
  const [barrelInputs, setBarrelInputs] = useState({});

  const {
    loading: wineriesLoading,
    error: wineriesError,
    data: wineriesData,
  } = useQuery(GET_WINERIES2, {
    variables: { userAddress: userAddress },
    skip: !userAddress,
  });

  const {
    loading: batchesLoading,
    error: batchesError,
    data: batchesData,
  } = useQuery(GET_BATCHES2, {
    variables: { wineryName: selectedWinery?.name },
    skip: !selectedWinery,
  });

  const {
    loading: wineItemsLoading,
    error: wineItemsError,
    data: wineItemsData,
    refetch: refetchWineItems,
  } = useQuery(GET_WINE_ITEMS, {
    variables: { userAddress: userAddress },
    skip: !userAddress,
  });

  const {
    loading: progressedsLoading,
    error: progressedsError,
    data: progressedsData,
    refetch: refetchProgresseds,
  } = useQuery(GET_WINE_ITEM_PROGRESSEDS, {
    fetchPolicy: 'network-only',
  });

  const combinedWineItems = useMemo(() => {
    if (!wineItemsData || !progressedsData) return null;

    return wineItemsData.wineItemCreateds.map(createdItem => {
      const progressedItems = progressedsData.wineItemProgresseds.filter(
        p => p.wineID.toString() === createdItem.wineID.toString(),
      );

      if (progressedItems.length === 0) {
        return createdItem;
      }

      const latestProgressedItem = progressedItems.reduce((prev, current) => {
        return parseInt(current.stage, 10) > parseInt(prev.stage, 10)
          ? current
          : prev;
      }, progressedItems[0]);

      return {
        ...createdItem,
        stage:
          latestProgressedItem?.stage !== undefined
            ? latestProgressedItem.stage
            : createdItem.stage,
        tankID:
          latestProgressedItem?.tankID !== undefined
            ? latestProgressedItem.tankID
            : createdItem.tankID,
        barrelID:
          latestProgressedItem?.barrelID !== undefined
            ? latestProgressedItem.barrelID
            : createdItem.barrelID,
        bottleID:
          latestProgressedItem?.bottleID !== undefined
            ? latestProgressedItem.bottleID
            : createdItem.bottleID,
      };
    });
  }, [wineItemsData, progressedsData]);

  useEffect(() => {
    if (wineItemsData) {
      console.log('Wine Items Data:', wineItemsData.wineItemCreateds);
    }
  }, [wineItemsData]);

  useEffect(() => {
    if (progressedsData) {
      console.log('Progressed Data:', progressedsData.wineItemProgresseds);
    }
  }, [progressedsData]);

  useEffect(() => {
    if (combinedWineItems) {
      console.log('Combined Wine Items:', combinedWineItems);
    }
  }, [combinedWineItems]);

  const handleWineryClick = winery => {
    setSelectedWinery(winery);
    setSelectedBatch(null);
  };

  const handleBatchClick = batch => {
    setSelectedBatch(batch);
  };

  const createWineItem = async () => {
    setIsCreating(true);
    setError(null);
    alert('Creating wine item... please refresh the page');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const pk = import.meta.env.VITE_PRIVATE_KEY;
      const wallet = new ethers.Wallet(pk, provider);
      const contract = new ethers.Contract(
        traceabilityContractAddress,
        traceabilityABI,
        wallet,
      );

      const tx = await contract.createWineItem(
        selectedWinery.wineryNumber,
        selectedBatch.wineryBatchCount,
      );
      await tx.wait();

      await refetchWineItems();
      await refetchProgresseds();
    } catch (err) {
      console.error('Error creating Wine Item:', err);
      setError('Failed to create Wine Item. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const progressWineItemTank = async (wineID, tankID) => {
    try {
      alert('Updating the Tank ID... please refresh');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const pk = import.meta.env.VITE_PRIVATE_KEY;
      const wallet = new ethers.Wallet(pk, provider);
      const contract = new ethers.Contract(
        traceabilityContractAddress,
        traceabilityABI,
        wallet,
      );

      const tx = await contract.progressToTank(wineID, tankID);
      await tx.wait();
      alert(`Wine Item ${wineID} progressed to Tank ${tankID} successfully!`);

      await refetchWineItems();
      await refetchProgresseds();
    } catch (err) {
      console.error('Error progressing Wine Item to Tank:', err);
      setError('Failed to progress Wine Item to Tank. Please try again.');
    }
  };

  const progressWineItemBarrel = async (wineID, barrelID) => {
    try {
      alert('Updating the Barrel ID... please refresh');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const pk = import.meta.env.VITE_PRIVATE_KEY;
      const wallet = new ethers.Wallet(pk, provider);
      const contract = new ethers.Contract(
        traceabilityContractAddress,
        traceabilityABI,
        wallet,
      );

      const tx = await contract.progressToBarrel(wineID, barrelID);
      await tx.wait();
      // alert(
      //   `Wine Item ${wineID} progressed to Barrel ${barrelID} successfully!`,
      // );

      await refetchWineItems();
      await refetchProgresseds();
    } catch (err) {
      console.error('Error progressing Wine Item to Barrel:', err);
      setError('Failed to progress Wine Item to Barrel. Please try again.');
    }
  };

  const progressWineItemBottle = async wineID => {
    try {
      alert('Progressing wine to final stage... please refresh');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const pk = import.meta.env.VITE_PRIVATE_KEY;
      const wallet = new ethers.Wallet(pk, provider);
      const contract = new ethers.Contract(
        traceabilityContractAddress,
        traceabilityABI,
        wallet,
      );

      const tx = await contract.progressToBottle(wineID);
      await tx.wait();
      alert(`Wine Item ${wineID} progressed to Bottle successfully!`);

      await refetchWineItems();
      await refetchProgresseds();
    } catch (err) {
      console.error('Error progressing Wine Item to Bottle:', err);
      setError('Failed to progress Wine Item to Bottle. Please try again.');
    }
  };

  const handleInputChange = (wineID, stage, value) => {
    if (stage === 'Tank') {
      setTankInputs(prev => ({ ...prev, [wineID]: value }));
    } else if (stage === 'Barrel') {
      setBarrelInputs(prev => ({ ...prev, [wineID]: value }));
    }
  };

  if (wineriesLoading || wineItemsLoading || progressedsLoading)
    return <p>Loading...</p>;
  if (wineriesError || wineItemsError || progressedsError)
    return (
      <div>
        {wineriesError && (
          <p>Error loading wineries: {wineriesError.message}</p>
        )}
        {wineItemsError && (
          <p>Error loading wine items: {wineItemsError.message}</p>
        )}
        {progressedsError && (
          <p>Error loading progress data: {progressedsError.message}</p>
        )}
      </div>
    );

  return (
    <div className="traceability-container">
      <h2>Select a Winery</h2>
      <div className="winery-list">
        {wineriesData?.wineryCreateds.map(winery => (
          <div
            key={winery.id}
            className={`winery-item ${
              selectedWinery?.id === winery.id ? 'selected' : ''
            }`}
            onClick={() => handleWineryClick(winery)}
          >
            {winery.name} (#{winery.wineryNumber})
          </div>
        ))}
      </div>

      {selectedWinery && (
        <>
          <h2>Select a Batch for {selectedWinery.name}</h2>
          {batchesLoading && <p>Loading batches...</p>}
          {batchesError && <p>Error loading batches: {batchesError.message}</p>}
          {batchesData && (
            <div className="batch-list">
              {batchesData.batchCreateds.map(batch => (
                <div
                  key={batch.wineryBatchCount}
                  className={`batch-item ${
                    selectedBatch?.wineryBatchCount === batch.wineryBatchCount
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleBatchClick(batch)}
                >
                  {batch.batchName} (ID: {batch.wineryBatchCount})
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {selectedWinery && selectedBatch && (
        <div className="selection-info">
          <p>
            Selected Winery: {selectedWinery.name} (#
            {selectedWinery.wineryNumber})
          </p>
          <p>
            Selected Batch: {selectedBatch.batchName} (ID:{' '}
            {selectedBatch.wineryBatchCount})
          </p>
          <button
            className="create-wine-item-button"
            onClick={createWineItem}
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Wine Item'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}

      <h2>Your Wine Items</h2>
      <div className="wine-item-list">
        {combinedWineItems?.map(item => (
          <div key={item.wineID} className="wine-item-card">
            <h3>Wine Item #{item.wineID}</h3>
            <p>Batch: {item.batchData_batchName}</p>
            <p>Stage: {item.stage}</p>
            <p>Tank ID: {item.tankID || 'N/A'}</p>
            <p>Barrel ID: {item.barrelID || 'N/A'}</p>
            <p>
              Bottle ID: {item.bottleID !== undefined ? item.bottleID : 'N/A'}
            </p>
            <div className="progression-buttons">
              <div>
                <input
                  type="text"
                  placeholder="Enter Tank ID"
                  value={tankInputs[item.wineID] || ''}
                  onChange={e =>
                    handleInputChange(item.wineID, 'Tank', e.target.value)
                  }
                />
                <button
                  onClick={() =>
                    progressWineItemTank(item.wineID, tankInputs[item.wineID])
                  }
                >
                  Progress to Tank
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Barrel ID"
                  value={barrelInputs[item.wineID] || ''}
                  onChange={e =>
                    handleInputChange(item.wineID, 'Barrel', e.target.value)
                  }
                />
                <button
                  onClick={() =>
                    progressWineItemBarrel(
                      item.wineID,
                      barrelInputs[item.wineID],
                    )
                  }
                >
                  Progress to Barrel
                </button>
              </div>
              <button onClick={() => progressWineItemBottle(item.wineID)}>
                Progress to Bottle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
