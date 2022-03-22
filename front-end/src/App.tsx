import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';
import Header from './components/common/Header';
import { Global } from '@emotion/react';
import { globalStyles } from '_/styles/global-styles';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 60 * 1_000,
      cacheTime: 300 * 1_000,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyles} />
      <Header />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
