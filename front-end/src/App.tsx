import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';
import Header from './components/common/Header';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/global-styles';
import { QueryParamProvider } from 'use-query-params';
import { ReactQueryDevtools } from 'react-query/devtools';

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
      <QueryParamProvider>
        <Global styles={globalStyles} />
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Router />
        </Suspense>
      </QueryParamProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
