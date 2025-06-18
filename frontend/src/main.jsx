import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import HomePage from '../src/pages/HomePage/HomePage';
import MapPage from './pages/MapPage/MapPage';
import DisplayWineriesPage from './pages/DisplayWineriesPage/DisplayWineriesPage';
import DisplayBatchesPage from './pages/DisplayBatchesPage/DisplayBatchesPage';
import DisplayStatistics from './pages/DisplayStatistics/DisplayStatistics';
import WineDetailsPage from './pages/WineDetailsPage/WineDetailsPage';
import WineListPage from './pages/WineListPage/WineListPage';
import TraceabilityPage from './pages/TraceabilityPage/TraceabilityPage';
import NavBar from './components/NavBar/NavBar';
import './main.css';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/71573/wine-to-arbitrum/version/latest',
  cache: new InMemoryCache(),
});

// Create a wrapper component that includes NavBar and the page content
const PageWrapper = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PageWrapper>
        <HomePage />
      </PageWrapper>
    ),
    errorElement: (
      <PageWrapper>
        <div>404 Not Found</div>
      </PageWrapper>
    ),
  },
  {
    path: 'map',
    element: (
      <PageWrapper>
        <MapPage />
      </PageWrapper>
    ),
  },
  {
    path: 'displayWineries',
    element: (
      <PageWrapper>
        <DisplayWineriesPage />
      </PageWrapper>
    ),
  },
  {
    path: 'displayBatches/:wineryNumber',
    element: (
      <PageWrapper>
        <DisplayBatchesPage />
      </PageWrapper>
    ),
  },
  {
    path: 'displayStatistics/:batchNumber',
    element: (
      <PageWrapper>
        <DisplayStatistics />
      </PageWrapper>
    ),
  },
  {
    path: 'traceability',
    element: (
      <PageWrapper>
        <TraceabilityPage />
      </PageWrapper>
    ),
  },
  {
    path: 'wine-details/:wineID',
    element: (
      <PageWrapper>
        <WineDetailsPage />
      </PageWrapper>
    ),
  },
  {
    path: 'wineList',
    element: (
      <PageWrapper>
        <WineListPage />
      </PageWrapper>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);
