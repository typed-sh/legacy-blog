import * as React from 'react'
import * as PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Heading,
  Image,
  Center,
  VStack,
  HStack,
  Text,
  Divider,
  Flex,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode
} from '@chakra-ui/react'
import {
  RiFileSearchLine,
  RiArrowLeftLine,
  RiArrowRightLine
} from 'react-icons/ri'

import Container from '../../components/Container'
import Footer from '../../components/Footer'
import Post from '../../components/Post'

import * as author from '../../fns/author'
import * as post from '../../fns/post'
import * as site from '../../fns/site'

import useInput from '../../hooks/useInput'

const Page = props => {
  const { colorMode } = useColorMode()
  const [search, setSearch] = useInput()
  const router = useRouter()

  const searchOnGoogle = () => {
    if (!search) {
      return
    }

    window.location = 'https://www.google.com/search?q=' + encodeURIComponent('site:' + site.url + ' ' + search)
  }

  return (
    <>
      <Box
        background='black'
      >
        <Head>
          <title>{site.name}</title>
        </Head>
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
              src='/static/typed.icon.png'
            />
            <Heading
              size='2xl'
            >
              {site.name}
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
            {site.description}
          </Text>
          <HStack
            paddingTop='25px'
          >
            <InputGroup size='md'>
              <InputLeftElement pointerEvents='none'>
                <RiFileSearchLine />
              </InputLeftElement>
              <Input
                variant='filled'
                placeholder='Search...'
                fontSize='14px'
                value={search}
                onInput={setSearch}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    searchOnGoogle()
                  }
                }}
              />
            </InputGroup>
            <IconButton
              onClick={searchOnGoogle}
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
        <Flex>
          <Spacer />
          <ButtonGroup direction='row' spacing={2}>
            {
              props.groups.current > 1 && (
                <Button
                  leftIcon={<RiArrowLeftLine />}
                  variant='outline'
                  onClick={() => router.push('/page/' + (props.groups.current - 1))}
                >
                  Previous
                </Button>
              )
            }
            {
              props.groups.current < props.groups.total && (
                <Button
                  rightIcon={<RiArrowRightLine />}
                  variant='solid'
                  onClick={() => router.push('/page/' + (props.groups.current + 1))}
                >
                  Next
                </Button>
              )
            }
          </ButtonGroup>
        </Flex>
      </Container>
      <Footer />
    </>
  )
}

Page.propTypes = {
  posts: PropTypes.array,
  groups: PropTypes.object
}

export const getStaticProps = ctx => {
  const page = (Number(ctx.params.page) || 1) - 1

  if (isNaN(page) || page < 0) {
    return {
      props: {
        posts: []
      }
    }
  }

  const groupCount = post.getGroupCount()
  const startSize = page * post.groupSize
  const endSize = startSize + post.groupSize

  const posts = Object
    .keys(post.getList())
    .slice(startSize, endSize)
    .map(slug => {
      const { data } = post.bySlug(slug)
      const user = author.byId(data.author)

      return {
        data,
        user
      }
    })
    .sort((a, b) => {
      return b.data.date - a.data.date
    })

  return {
    props: {
      posts,
      groups: {
        current: page + 1,
        total: groupCount
      }
    }
  }
}

export const getStaticPaths = () => {
  const pages = post.getGroupCount()
  const paths = []

  for (let i = 1; i <= pages; i++) {
    paths.push({
      params: {
        page: String(i)
      }
    })
  }

  return {
    paths,
    fallback: false
  }
}

export default Page
