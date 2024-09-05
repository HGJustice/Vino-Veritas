// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract WineryManagement {
  struct Winery {
    uint256 id;
    string name;
    address wineryAddress;
    int256 latitude;
    int256 longitude;
  }

  uint8 currentWineryId = 1;
  mapping(address => mapping(uint16 => Winery)) wineries;
  mapping(address => uint16) userWineryCount;

  event WineryCreated(
    uint8 id,
    string name,
    address addy,
    int256 latitude,
    int256 longitude,
    uint16 wineryNumber
  );

  function createWinery(
    string calldata _name,
    int256 _latitude,
    int256 _longitude
  ) external {
    uint16 wineryNumber = userWineryCount[msg.sender] + 1;

    Winery memory newWinery = Winery(
      currentWineryId,
      _name,
      msg.sender,
      _latitude,
      _longitude
    );

    wineries[msg.sender][wineryNumber] = newWinery;
    userWineryCount[msg.sender] = wineryNumber;

    emit WineryCreated(
      currentWineryId,
      _name,
      msg.sender,
      _latitude,
      _longitude,
      wineryNumber
    );
    currentWineryId++;
  }

  function getWineryCount(address userAddy) external view returns (uint16) {
    return userWineryCount[userAddy];
  }

  function getWinery(
    address addy,
    uint16 wineryCount
  ) external view returns (Winery memory) {
    return wineries[addy][wineryCount];
  }
}
