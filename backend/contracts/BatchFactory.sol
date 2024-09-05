// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import 'contracts/BatchManagement2.sol';
import 'contracts/WineryManagement.sol';

contract BatchFactory {
  WineryManagement private wineryContract;

  error WineryNotCreated();

  uint256 currentBatchId = 1;
  mapping(uint256 => address) batches;

  event BatchCreated(
    address batchAddress,
    uint256 batchId,
    string name,
    address owner
  );

  constructor(address wineryAddy) {
    wineryContract = WineryManagement(wineryAddy);
  }

  function createBatch(string calldata _batchName) external {
    WineryManagement.Winery memory currentWinery = wineryContract.getWinery(
      msg.sender
    );
    if (currentWinery.wineryAddress == address(0)) {
      revert WineryNotCreated();
    }

    BatchManagement2 newBatch = new BatchManagement2(_batchName, msg.sender);
    batches[currentBatchId] = address(newBatch);
    emit BatchCreated(
      address(newBatch),
      currentBatchId,
      _batchName,
      msg.sender
    );
    currentBatchId++;
  }

  function getBatch(uint256 id) external view returns (address) {
    return batches[id];
  }
}
