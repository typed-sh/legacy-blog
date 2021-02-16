import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../styles/theme'

import Container from '../components/Container'

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}

export default App
