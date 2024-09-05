import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { useQuery, gql } from '@apollo/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './DisplayStatistics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

async function getUserAddress() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return await signer.getAddress();
}

const GET_WINERY_DATA = gql`
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

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Batch Data',
    },
  },
};

const createChartData = (label, data) => ({
  labels: data.map((_, index) => `Reading:  ${index + 1}`),
  datasets: [
    {
      label,
      data: data.map(item => parseFloat(item.data)),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
});

export default function DisplayStatistics() {
  const [userAddress, setUserAddress] = useState(null);
  const [wineryName, setWineryName] = useState(null);
  const location = useLocation();
  const batchNumber = location.state.batchNumber;

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getUserAddress();
      setUserAddress(address);
    };

    fetchAddress();
  }, []);

  const { loading, data } = useQuery(GET_WINERY_DATA, {
    variables: { owner: userAddress, wineryBatchCount: batchNumber },
  });

  useEffect(() => {
    if (
      data &&
      data.humidityDataPusheds &&
      data.humidityDataPusheds.length > 0
    ) {
      setWineryName(data.humidityDataPusheds[0].wineryName);
    }
  }, [data]);

  if (loading) return <div>Loading data...</div>;

  const charts = [
    { label: 'Humidity', data: data?.humidityDataPusheds },
    { label: 'Rain', data: data?.rainDataPusheds },
    { label: 'Soil', data: data?.soilDataPusheds },
    { label: 'Temperature', data: data?.temperatureDataPusheds },
    { label: 'Wind', data: data?.windDataPusheds },
  ];

  return (
    <div className="statistics__container">
      <h1>Batch Data Statistics</h1>
      <Link
        to={`/displayBatches/${batchNumber}`}
        state={{ wineryName: wineryName }}
      >
        <button className="statistics__backButton">Back to batches</button>
      </Link>
      {charts.map(({ label, data }) =>
        data && data.length > 0 ? (
          <div key={label} className="statistics__chart">
            <h2 className="statistics__chart">{label} Data</h2>
            <Line options={chartOptions} data={createChartData(label, data)} />
          </div>
        ) : (
          <div key={label}>No data available for {label}</div>
        ),
      )}
    </div>
  );
}
