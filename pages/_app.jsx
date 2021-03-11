import * as React from 'react'
import * as PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import {
  ChakraProvider,
  Box
} from '@chakra-ui/react'
import ReactGA from 'react-ga'

import Container from '../components/Container'
import Header from '../components/Header'

import * as site from '../fns/site'

import theme from '../styles/theme'

import '../styles/fonts.css'
import '../styles/scrollbar.css'
import '../styles/selection.css'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  React.useEffect(() => {
    if (!window.__typedsh_analytics) {
      ReactGA.initialize(site.analytics)

      window.__typedsh_analytics = 1
    }

    ReactGA.pageview(window.location.pathname)

    router.events.on('beforeHistoryChange', pathname => {
      ReactGA.pageview(pathname)
    })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        title={site.name}
        description='Just a blog, __init__?'
      />
      <Head>
        <link rel='shortcut icon' href='/static/typed.icon.png' />
      </Head>
      <Box
        background='black'
        marginBottom='25px'
      >
        <Container>
          <Header />
        </Container>
      </Box>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default App
