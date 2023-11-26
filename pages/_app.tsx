/* eslint-disable @typescript-eslint/explicit-function-return-type */
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000
    }
  }
})

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Navbar />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />
      </QueryClientProvider>
    </React.Fragment>
  )
}
