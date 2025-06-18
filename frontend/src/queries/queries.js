import { gql } from '@apollo/client';

export const DISPLAY_WINERIES = gql`
  query DisplayWineries($userAddress: String!) {
    wineryCreateds(where: { addy: $userAddress }, orderBy: wineryNumber) {
      wineryNumber
      name
    }
  }
`;

export const DISPLAY_BATCHES = gql`
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

export const GET_WINERY_DATA = gql`
  query GetWineryData($owner: String!, $wineryBatchCount: String!) {
    humidityDataPusheds(
      where: { owner: $owner, wineryBatchCount: $wineryBatchCount }
    ) {
      data
      wineryName
    }
    rainDataPusheds(
      where: { owner: $owner, wineryBatchCount: $wineryBatchCount }
    ) {
      data
    }
    soilDataPusheds(
      where: { owner: $owner, wineryBatchCount: $wineryBatchCount }
    ) {
      data
    }
    temperatureDataPusheds(
      where: { owner: $owner, wineryBatchCount: $wineryBatchCount }
    ) {
      data
    }
    windDataPusheds(
      where: { owner: $owner, wineryBatchCount: $wineryBatchCount }
    ) {
      data
    }
  }
`;

export const GET_WINERIES = gql`
  query GetWineries($userAddress: String!) {
    wineryCreateds(where: { addy: $userAddress }) {
      name
      latitude
      longitude
    }
  }
`;

export const GET_BATCHES = gql`
  query GetBatches($wineryName: String!) {
    batchCreateds(where: { wineryName: $wineryName }) {
      wineryName
      batchName
    }
  }
`;

export const GET_WINERIES2 = gql`
  query GetWineries($userAddress: String!) {
    wineryCreateds(where: { addy: $userAddress }, orderBy: wineryNumber) {
      id
      wineryNumber
      name
    }
  }
`;

export const GET_BATCHES2 = gql`
  query GetBatches($wineryName: String!) {
    batchCreateds(
      where: { wineryName: $wineryName }
      orderBy: wineryBatchCount
    ) {
      wineryBatchCount
      batchName
    }
  }
`;

export const GET_WINE_ITEMS = gql`
  query GetWineItems($userAddress: String!) {
    wineItemCreateds(
      where: { wineryData_wineryAddress: $userAddress }
      orderBy: wineID
    ) {
      batchData_batchName
      stage
      wineID
      barrelID
      tankID
      bottleID
    }
  }
`;

export const GET_WINE_ITEM_PROGRESSEDS = gql`
  query GetWineItemProgresseds {
    wineItemProgresseds {
      wineID
      stage
      tankID
      barrelID
      bottleID
    }
  }
`;

export const GET_WINE_DETAILS = gql`
  query GetWineDetails($wineID: String!) {
    wineItemCreateds(where: { wineID: $wineID }) {
      batchData_wineryName
      batchData_batchName
      batchData_humidity
      batchData_rainFall
      batchData_soilConductivity
      batchData_temperature
      batchData_windSpeed
    }
    wineItemProgresseds(
      where: { wineID: $wineID }
      first: 1
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      tankID
      barrelID
      bottleID
    }
  }
`;

export const GET_ALL_WINES = gql`
  query GetAllWines($userAddress: String!) {
    wineItemCreateds(
      where: { wineryData_wineryAddress: $userAddress }
      orderBy: wineID
    ) {
      wineID
      wineryData_name
      batchData_batchName
    }
  }
`;
