import * as React from 'react'
import {
  Box,
  IconButton,
  Heading,
  Image,
  Center,
  VStack,
  HStack,
  Text,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode
} from '@chakra-ui/react'
import {
  RiFileSearchLine,
  RiArrowRightLine
} from 'react-icons/ri'

import Container from '../components/Container'
import Header from '../components/Header'

const Page = props => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Box
        background='black'
      >
        <Container>
          <Header />
        </Container>
      </Box>
      <Container>
        <VStack
          padding='65px 0'
          textAlign='center'
          spacing={1}
        >
          <Center>
            <Image
              width='95px'
              paddingRight='4px'
              src='/typed.icon.png'
            />
            <Heading
              size='2xl'
            >
              Typed.sh
            </Heading>
          </Center>
          <Text
            fontSize='16px'
            color={
              colorMode === 'light'
                ? 'gray.700'
                : 'gray.300'
            }
          >
            Just a blog, __init__?
          </Text>
          <HStack
            padding='25px 0'
          >
            <InputGroup
              size='md'
            >
              <InputLeftElement pointerEvents='none'>
                <RiFileSearchLine />
              </InputLeftElement>
              <Input
                variant='filled'
                placeholder='Search...'
                fontSize='14px'
              />
            </InputGroup>
            <IconButton
              icon={<RiArrowRightLine />}
            />
          </HStack>
        </VStack>
      </Container>
      <Divider />
    </>
  )
}

export default Page
