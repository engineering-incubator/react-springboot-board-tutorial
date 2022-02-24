import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';
import Header from './components/common/Header';

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
      <Header />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
