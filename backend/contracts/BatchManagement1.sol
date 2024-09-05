// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import 'contracts/WineryManagement.sol';

contract BatchManagement1 {
  WineryManagement private wineryContract;

  struct Batch {
    uint256 id;
    string batchName;
    string wineryName;
    address owner;
    uint16[] temperature;
    uint16[] windSpeed;
    uint16[] rainFall;
    uint16[] soilConductivity;
    uint16[] humidity;
    bool removed;
    uint32 batchCount;
  }

  error WineryNotCreated();
  error IncorrectAccess();
  error BatchUnavailable();

  uint256 currentBatchId = 1;
  mapping(address => mapping(uint256 => Batch)) public batches;
  mapping(address => uint16) winieryBatchCount;

  event BatchCreated(
    uint256 id,
    address owner,
    string batchName,
    string wineryName,
    uint32 wineryBatchCount
  );
  event TemperatureDataPushed(
    uint256 batchId,
    string batchname,
    string wineryName,
    uint16 data,
    address owner,
    uint32 wineryBatchCount
  );
  event WindDataPushed(
    uint256 batchId,
    string batchname,
    string wineryName,
    uint16 data,
    address owner,
    uint32 wineryBatchCount
  );
  event RainDataPushed(
    uint256 batchId,
    string batchname,
    string wineryName,
    uint16 data,
    address owner,
    uint32 wineryBatchCount
  );
  event SoilDataPushed(
    uint256 batchId,
    string batchname,
    string wineryName,
    uint16 data,
    address owner,
    uint32 wineryBatchCount
  );
  event HumidityDataPushed(
    uint256 batchId,
    string batchname,
    string wineryName,
    uint16 data,
    address owner,
    uint32 wineryBatchCount
  );
  event BatchRemoved(
    uint256 batchId,
    string batchName,
    string wineryName,
    address owner
  );

  constructor(address wineryAddy) {
    wineryContract = WineryManagement(wineryAddy);
  }

  modifier checkOwner(uint256 _batchCount) {
    Batch storage currentBatch = batches[msg.sender][_batchCount];
    if (currentBatch.owner != msg.sender) {
      revert IncorrectAccess();
    }
    _;
  }

  modifier checkRemoved(uint256 _batchCount) {
    Batch storage currentBatch = batches[msg.sender][_batchCount];
    if (currentBatch.removed == true) {
      revert BatchUnavailable();
    }
    _;
  }

  function createBatch(string calldata _batchname, uint8 wineryCount) external {
    WineryManagement.Winery memory currentWinery = wineryContract.getWinery(
      msg.sender,
      wineryCount
    );
    if (currentWinery.wineryAddress == address(0)) {
      revert WineryNotCreated();
    }

    uint16 batchCount = winieryBatchCount[msg.sender] + 1;

    Batch memory newBatch = Batch(
      currentBatchId,
      _batchname,
      wineryContract.getWinery(msg.sender, wineryCount).name,
      msg.sender,
      new uint16[](0),
      new uint16[](0),
      new uint16[](0),
      new uint16[](0),
      new uint16[](0),
      false,
      batchCount
    );

    batches[msg.sender][batchCount] = newBatch;
    winieryBatchCount[msg.sender] = batchCount;
    emit BatchCreated(
      currentBatchId,
      msg.sender,
      _batchname,
      currentWinery.name,
      batchCount
    );
    currentBatchId++;
  }

  function removeBatch(uint256 _id) external checkOwner(_id) {
    Batch storage currentBatch = batches[msg.sender][_id];
    currentBatch.removed = true;
    emit BatchRemoved(
      _id,
      currentBatch.batchName,
      currentBatch.wineryName,
      msg.sender
    );
  }

  function batchPushData(
    uint32 _id,
    uint16 _tempData,
    uint16 _rainData,
    uint16 _windData,
    uint16 _soilData,
    uint16 _humidityData
  ) external checkOwner(_id) checkRemoved(_id) {
    Batch storage currentBatch = batches[msg.sender][_id];

    currentBatch.temperature.push(_tempData);
    emit TemperatureDataPushed(
      _id,
      currentBatch.batchName,
      currentBatch.wineryName,
      _tempData,
      msg.sender,
      currentBatch.batchCount
    );
    currentBatch.rainFall.push(_rainData);
    emit RainDataPushed(
      _id,
      currentBatch.batchName,
      currentBatch.wineryName,
      _rainData,
      msg.sender,
      currentBatch.batchCount
    );
    currentBatch.windSpeed.push(_windData);
    emit WindDataPushed(
      _id,
      currentBatch.batchName,
      currentBatch.wineryName,
      _windData,
      msg.sender,
      currentBatch.batchCount
    );
    currentBatch.soilConductivity.push(_soilData);
    emit SoilDataPushed(
      _id,
      currentBatch.batchName,
      currentBatch.wineryName,
      _soilData,
      msg.sender,
      currentBatch.batchCount
    );
    currentBatch.humidity.push(_humidityData);
    emit HumidityDataPushed(
      _id,
      currentBatch.batchName,
      currentBatch.wineryName,
      _humidityData,
      msg.sender,
      currentBatch.batchCount
    );
  }

  function pushTemperatureData(
    uint32 _id,
    uint16 _tempData
  ) external checkOwner(_id) checkRemoved(_id) {
    Batch storage currentBatch = batches[msg.sender][_id];
    currentBatch.temperature.push(_tempData);
    emit TemperatureDataPushed(
      _id,
      currentBatch.batchName,
      currentBatch.wineryName,
      _tempData,
      msg.sender,
      currentBatch.batchCount
    );
  }

  function pushRainFallData(
    uint32 _id,
    uint16 _rainData
  ) external checkOwner(_id) checkRemoved(_id) {
    Batch storage currentBatch = batches[msg.sender][_id];
    currentBatch.rainFall.push(_rainData);
    emit RainDataPushed(
      _id,
      currentBatch.batchName,
      currentBatch.wineryName,
      _rainData,
      msg.sender,
      currentBatch.batchCount
    );
  }

  function pushWindSpeedData(
    uint32 _id,
    uint16 _windData
  ) external checkOwner(_id) checkRemoved(_id) {
    Batch storage currentBatch = batches[msg.sender][_id];
    currentBatch.windSpeed.push(_windData);
    emit WindDataPushed(
      _id,
      currentBatch.batchName,
      currentBatch.wineryName,
      _windData,
      msg.sender,
      currentBatch.batchCount
    );
  }

  function pushSoilConductivityData(
    uint32 _id,
    uint16 _soilData
  ) external checkOwner(_id) checkRemoved(_id) {
    Batch storage currentBatch = batches[msg.sender][_id];
    currentBatch.soilConductivity.push(_soilData);
    emit SoilDataPushed(
      _id,
      currentBatch.batchName,
      currentBatch.wineryName,
      _soilData,
      msg.sender,
      currentBatch.batchCount
    );
  }

  function pushHumidityData(
    uint32 _id,
    uint16 _humidityData
  ) external checkOwner(_id) checkRemoved(_id) {
    Batch storage currentBatch = batches[msg.sender][_id];
    currentBatch.humidity.push(_humidityData);
    emit HumidityDataPushed(
      _id,
      currentBatch.batchName,
      currentBatch.wineryName,
      _humidityData,
      msg.sender,
      currentBatch.batchCount
    );
  }
}
