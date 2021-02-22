import * as React from 'react'
import {
  Flex
} from '@chakra-ui/react'

import * as site from '../fns/site'

const Footer = props => {
  return (
    <Flex
      padding='24px 0'
      align='center'
      justify='center'
    >
      Copyright {new Date().getFullYear()} {site.name} contributors.
    </Flex>
  )
}

export default Footer
