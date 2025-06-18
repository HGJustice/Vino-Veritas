import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useUserAddress from '../../hooks/useUserAddress';
import useCustomQuery from '../../hooks/useCustomQuery.js';
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
import { GET_WINERY_DATA } from '../../queries/queries';
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
  const userAddress = useUserAddress();
  const [wineryName, setWineryName] = useState(null);
  const location = useLocation();
  const batchNumber = location.state?.batchNumber;
  const { data, loading } = useCustomQuery(
    GET_WINERY_DATA,
    { owner: userAddress, wineryBatchCount: batchNumber },
    { skip: !userAddress },
  );
  const storedWineryName =
    location.state?.wineryName || localStorage.getItem('wineryName');

  useEffect(() => {
    if (
      data &&
      data.humidityDataPusheds &&
      data.humidityDataPusheds.length > 0
    ) {
      const fetchedWineryName = data.humidityDataPusheds[0].wineryName;
      console.log('Fetched wineryName:', fetchedWineryName);
      setWineryName(fetchedWineryName);
      localStorage.setItem('wineryName', fetchedWineryName); // Save to localStorage
    } else {
      console.log('Data not ready yet or no humidityDataPusheds:', data);
    }
  }, [data]);

  console.log('Navigating with wineryName:', storedWineryName);

  if (!userAddress) return <div>Loading user address...</div>;
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
        state={{ wineryName: storedWineryName }}
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
