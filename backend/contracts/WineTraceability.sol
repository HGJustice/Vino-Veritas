// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;
import 'contracts/WineryManagement.sol';
import 'contracts/BatchManagement1.sol';

contract WineTraceability {
  WineryManagement private wineryContract;
  BatchManagement1 private batchContract;

  enum WineStage {
    Harvested,
    Tank,
    Barrel,
    Bottle
  }

  struct WineItem {
    uint256 wineID;
    WineStage stage;
    WineryManagement.Winery wineryData;
    BatchManagement1.Batch batchData;
    uint256 tankID;
    uint256 barrelID;
    uint256 bottleID;
    uint16 wineItemCount;
  }

  error BatchNotRemoved();
  error WineryDoesntExist();
  error BatchDoesntExist();
  error NotBatchOwner();
  error IncorrectProgress();

  uint256 currentWineId = 1;
  uint256 currentBottleID = 1;
  mapping(address => mapping(uint256 => WineItem)) items;
  mapping(address => uint16) wineCounts;

  event WineItemCreated(
    uint256 wineID,
    WineStage stage,
    WineryManagement.Winery wineryData,
    BatchManagement1.Batch batchData,
    uint256 tankID,
    uint256 barrelID,
    uint256 bottleID,
    uint16 wineItemCount
  );

  event WineItemProgressed(
    uint256 wineID,
    WineStage stage,
    uint256 tankID,
    uint256 barrelID,
    uint256 bottleID
  );

  constructor(address _wineryContract, address _batchContract) {
    wineryContract = WineryManagement(_wineryContract);
    batchContract = BatchManagement1(_batchContract);
  }

  function createWineItem(uint16 wineryCount, uint256 batchID) external {
    WineryManagement.Winery memory currentWinery = wineryContract.getWinery(
      msg.sender,
      wineryCount
    );
    if (currentWinery.wineryAddress == address(0)) {
      revert WineryDoesntExist();
    }
    BatchManagement1.Batch memory currentBatch = batchContract.getBatch(
      msg.sender,
      batchID
    );
    if (currentBatch.owner == address(0)) {
      revert BatchDoesntExist();
    }
    if (currentBatch.owner != msg.sender) {
      revert NotBatchOwner();
    }
    if (currentBatch.removed == false) {
      revert BatchNotRemoved();
    }

    uint16 wineItemCount = wineCounts[msg.sender] + 1;

    WineItem memory newWineItem = WineItem(
      currentWineId,
      WineStage.Harvested,
      currentWinery,
      currentBatch,
      0,
      0,
      0,
      wineItemCount
    );

    wineCounts[msg.sender] = wineItemCount;
    items[msg.sender][wineItemCount] = newWineItem;
    emit WineItemCreated(
      currentWineId,
      WineStage.Harvested,
      currentWinery,
      currentBatch,
      0,
      0,
      0,
      wineItemCount
    );
    currentWineId++;
  }

  function getWineItem(uint256 wineID) external view returns (WineItem memory) {
    return items[msg.sender][wineID];
  }

  function progressToTank(uint256 wineID, uint256 tankID) external {
    WineItem storage currentItem = items[msg.sender][wineID];
    if (currentItem.stage != WineStage.Harvested) {
      revert IncorrectProgress();
    }
    currentItem.tankID = tankID;

    currentItem.stage = WineStage(uint(currentItem.stage) + 1);
    emit WineItemProgressed(wineID, currentItem.stage, tankID, 0, 0);
  }

  function progressToBarrel(uint256 wineID, uint256 barrelID) external {
    WineItem storage currentItem = items[msg.sender][wineID];
    if (currentItem.stage != WineStage.Tank) {
      revert IncorrectProgress();
    }
    currentItem.barrelID = barrelID;

    currentItem.stage = WineStage(uint(currentItem.stage) + 1);
    emit WineItemProgressed(
      wineID,
      currentItem.stage,
      currentItem.tankID,
      barrelID,
      0
    );
  }

  function progressToBottle(uint256 wineID) external {
    WineItem storage currentItem = items[msg.sender][wineID];
    if (currentItem.stage != WineStage.Barrel) {
      revert IncorrectProgress();
    }
    currentItem.bottleID = currentBottleID;

    currentItem.stage = WineStage(uint(currentItem.stage) + 1);
    currentBottleID++;
    emit WineItemProgressed(
      wineID,
      currentItem.stage,
      currentItem.tankID,
      currentItem.barrelID,
      currentItem.bottleID
    );
  }
}
