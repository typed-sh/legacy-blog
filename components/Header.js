import * as React from 'react'
import Link from 'next/link'
import {
  Flex,
  Spacer,
  Heading,
  Link as StyledLink
} from '@chakra-ui/react'

import { headers } from '../config'

const Header = props => {
  return (
    <Flex
      padding='20px 0'
    >
      {
        headers.map((header, hKey) => {
          return (
            <Heading
              key={hKey}
              as={StyledLink}
              size='xs'
              paddingRight='16px'
              fontWeight='700'
            >
              <Link href={header.href || '#'}>
                {header.name}
              </Link>
            </Heading>
          )
        })
      }
      <Spacer />
    </Flex>
  )
}

export default Header
