import * as React from 'react'
import Link from 'next/link'
import {
  Flex,
  Spacer,
  Heading,
  Link as StyledLink,
  ButtonGroup,
  IconButton,
  useColorMode
} from '@chakra-ui/react'
import {
  RiSunLine,
  RiMoonLine,
  RiTwitterFill
} from 'react-icons/ri'

import { headers } from '../config'
import * as site from '../fns/site'

const Header = props => {
  const { colorMode, toggleColorMode } = useColorMode()
  const iconButtonHoverStyles = {
    backgroundColor: 'gray.800'
  }

  return (
    <Flex
      padding='9px 0'
      align='center'
    >
      {
        headers.map((header, hKey) => {
          return (
            <Heading
              key={hKey}
              size='xs'
              paddingRight='16px'
              fontWeight='bold'
              color='gray.200'
            >
              <StyledLink as={Link} href={header.href || '#'}>
                {header.name}
              </StyledLink>
            </Heading>
          )
        })
      }
      <Spacer />
      <ButtonGroup
        size='sm'
        variant='ghost'
        color='gray.200'
        background='black'
        spacing='0.2rem'
      >
        <IconButton
          icon={
            colorMode === 'light'
              ? <RiSunLine />
              : <RiMoonLine />
          }
          onClick={toggleColorMode}
          _hover={iconButtonHoverStyles}
        />
        <IconButton
          icon={<RiTwitterFill />}
          onClick={() => window.open(`https://twitter.com/${site.twitter}`, '_blank')}
          _hover={iconButtonHoverStyles}
        />
      </ButtonGroup>
    </Flex>
  )
}

export default Header
