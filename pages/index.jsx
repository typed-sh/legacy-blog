import * as React from 'react'
import * as PropTypes from 'prop-types'
import Head from 'next/head'
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
import Post from '../components/Post'

import * as author from '../fns/author'
import * as post from '../fns/post'
import * as site from '../fns/site'

const Page = props => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Box
        background='black'
      >
        <Head>
          <title>{site.name}</title>
        </Head>
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
            paddingTop='25px'
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
      <Container>
        <VStack
          margin='24px 0'
          divider={<Divider />}
          spacing={4}
          align='stretch'
        >
          {
            props.posts.map((article, key) => {
              return <Post key={key} {...article} />
            })
          }
        </VStack>
      </Container>
    </>
  )
}

Page.propTypes = {
  posts: PropTypes.array
}

export const getStaticProps = async ctx => {
  const posts = Object
    .keys(post.getList())
    .map(slug => {
      const { data } = post.bySlug(slug)
      const user = author.byId(data.author)

      return {
        data,
        user
      }
    })
    .sort((a, b) => {
      return b.date - a.date
    })

  return {
    props: {
      posts
    }
  }
}

export default Page
