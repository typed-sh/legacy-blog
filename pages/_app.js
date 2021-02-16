import * as React from 'react'
import * as PropTypes from 'prop-types'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../styles/theme'

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default App
