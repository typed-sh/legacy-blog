import * as React from 'react'
import * as PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'
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
import '../styles/selection.css'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const [show, setShow] = React.useState(false)
  const [child, setChild] = React.useState(null)

  React.useEffect(() => {
    setShow('visible')

    if (!window.__typedsh_analytics) {
      ReactGA.initialize(site.analytics)

      window.__typedsh_analytics = 1
    }

    ReactGA.pageview(window.location.pathname)

    router.events.on('beforeHistoryChange', pathname => {
      ReactGA.pageview(pathname)
    })
  }, [])
  React.useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setChild(<Component {...pageProps} />)
      setShow('hidden')
    })
    router.events.on('routeChangeComplete', () => {
      setTimeout(() => {
        setShow('visible')
      }, 0.5 * 1000)
    })
  }, [router])

  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        title={site.name}
        description='Just a blog, __init__?'
      />
      <Box
        background='black'
        marginBottom='25px'
      >
        <Container>
          <Header />
        </Container>
      </Box>
      <motion.div
        initial='hidden'
        animate={show}
        variants={{
          hidden: {
            opacity: 0
          },
          visible: {
            opacity: 1
          }
        }}
        transition={{ duration: 0.27 }}
      >
        {
          show === 'visible'
            ? <Component {...pageProps} />
            : child
        }
      </motion.div>
    </ChakraProvider>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default App
