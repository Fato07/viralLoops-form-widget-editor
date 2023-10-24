import '@/styles/globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import store from '../store/store';
import { AppProps } from 'next/app';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </ClerkProvider>
  )
}

export default MyApp