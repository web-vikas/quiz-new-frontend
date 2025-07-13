import React from 'react'
import { Navigation } from './navigation'
import { Provider } from 'react-redux'
import store from './providers/redux/store'
import { Providers } from './providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Providers>
          <Navigation />
        </Providers>
      </QueryClientProvider>
    </Provider>
  )
}

export default App