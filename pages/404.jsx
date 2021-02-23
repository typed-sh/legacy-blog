import * as React from 'react'
import {
  Heading
} from '@chakra-ui/react'

import Container from '../components/Container'

const Page = props => {
  return (
    <>
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
