import * as React from 'react'
import {
  Box,
  Heading
} from '@chakra-ui/react'

import Container from '../components/Container'
import Header from '../components/Header'

const Page = props => {
  return (
    <>
      <Box
        background='black'
        marginBottom='25px'
      >
        <Container>
          <Header />
        </Container>
      </Box>
      <Container>
        <Heading size='2xl' padding='8px 0'>
          {'>'}_ EOT
        </Heading>
        <Heading size='md'>
          End of Typed! Shhhhh~
        </Heading>
      </Container>
    </>
  )
}

export default Page
