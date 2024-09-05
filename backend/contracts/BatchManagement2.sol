// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract BatchManagement2 {
  string public batchName;
  address public owner;
  bool public removed;
  uint8[] public temperature;
  uint8[] public windSpeed;
  uint8[] public rainFall;
  uint8[] public soilConductivity;
  uint8[] public humidity;

  error IncorrectAccess();
  error BatchUnAvailable();

  event TempetureDataPushed(address batchAddress, string batchname, uint8 data);
  event WindDataPushed(address batchAddress, string batchname, uint8 data);
  event RainDataPushed(address batchAddress, string batchname, uint8 data);
  event SoilDataPushed(address batchAddress, string batchname, uint8 data);
  event HumidityDataPushed(address batchAddress, string batchname, uint8 data);
  event BatchRemoved(address batchAddress, string batchName);

  modifier checkOwner() {
    if (owner != msg.sender) {
      revert IncorrectAccess();
    }
    _;
  }

  modifier checkRemoved() {
    if (removed == true) {
      revert BatchUnAvailable();
    }
    _;
  }

  constructor(string memory _batchname, address _owner) {
    batchName = _batchname;
    owner = _owner;
  }

  function pushTempetureData(uint8 _tempData) external checkOwner checkRemoved {
    temperature.push(_tempData);
    emit TempetureDataPushed(address(this), batchName, _tempData);
  }

  function pushWindData(uint8 _windData) external checkOwner checkRemoved {
    temperature.push(_windData);
    emit WindDataPushed(address(this), batchName, _windData);
  }

  function pushRainData(uint8 _rainData) external checkOwner checkRemoved {
    temperature.push(_rainData);
    emit RainDataPushed(address(this), batchName, _rainData);
  }

  function pushSoilData(uint8 _soilData) external checkOwner checkRemoved {
    temperature.push(_soilData);
    emit SoilDataPushed(address(this), batchName, _soilData);
  }

  function pushHumidityData(
    uint8 _humidityData
  ) external checkOwner checkRemoved {
    temperature.push(_humidityData);
    emit HumidityDataPushed(address(this), batchName, _humidityData);
  }

  function removeBatch() external checkOwner checkRemoved {
    removed = true;
    emit BatchRemoved(address(this), batchName);
  }
}
