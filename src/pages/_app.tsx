import '@/styles/globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import store from '../store/store';
import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
          <Analytics />
        </ChakraProvider>
      </Provider>
    </ClerkProvider>
  )
}

export default MyApp