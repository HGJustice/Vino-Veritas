import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import HomePage from '../src/pages/HomePage/HomePage';
import MapPage from './pages/MapPage/MapPage';
import DisplayWineriesPage from './pages/DisplayWineriesPage/DisplayWineriesPage';
import DisplayBatchesPage from './pages/DisplayBatchesPage/DisplayBatchesPage';
import DisplayStatistics from './pages/DisplayStatistics/DisplayStatistics';
import './main.css';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/85180/wine-to-chain3/version/latest',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: 'map',
    element: <MapPage />,
  },
  {
    path: 'displayWineries',
    element: <DisplayWineriesPage />,
  },
  {
    path: 'displayBatches/:wineryNumber',
    element: <DisplayBatchesPage />,
  },
  {
    path: 'displayStatistics/:batchNumber',
    element: <DisplayStatistics />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);
