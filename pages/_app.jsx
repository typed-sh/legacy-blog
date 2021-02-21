import * as React from 'react'
import * as PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'

import * as site from '../fns/site'

import theme from '../styles/theme'

import '../styles/fonts.css'
import '../styles/selection.css'

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        title={site.name}
        description='Just a blog, __init__?'
      />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default App
