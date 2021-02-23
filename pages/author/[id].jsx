import * as React from 'react'
import * as PropTypes from 'prop-types'
import CryptoJS from 'crypto-js'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import {
  Box,
  Avatar,
  Heading,
  Text,
  VStack,
  HStack,
  Link as StyledLink,
  Divider,
  Badge
} from '@chakra-ui/react'
import {
  RiPushpinLine
} from 'react-icons/ri'

import Container from '../../components/Container'
import Footer from '../../components/Footer'

import * as author from '../../fns/author'
import * as post from '../../fns/post'
import * as site from '../../fns/site'

const Page = ({ user, posts }) => {
  const avatarURL = user.avatar || `https://www.gravatar.com/avatar/${CryptoJS.MD5(user.email)}`

  return (
    <>
      <NextSeo
        title={`${user.name} | ${site.name}`}
        description={user.bio}
        twitter={{
          cardType: 'summary',
          site: site.twitter,
          handle: user.twitter || site.twitter
        }}
        openGraph={{
          type: 'article',
          title: `${user.name} on ${site.title}`,
          description: user.bio
        }}
      />
      <Container>
        <VStack
          align='stretch'
          margin='24px 0'
        >
          <VStack
            align='stretch'
            spacing={1}
          >
            <Avatar
              size='xl'
              name={user.name}
              src={avatarURL}
              background='transparent'
            />
            <Heading>
              {user.name}
            </Heading>
            <Text>
              {user.bio}
            </Text>
          </VStack>
          <HStack
            divider={<RiPushpinLine />}
            spacing={2.5}
          >
            <Box marginRight='12px'>
              {posts.length} Post{posts.length > 1 ? 's' : ''}
            </Box>
            {
              user.email && (
                <Badge as={StyledLink} href={`mailto:${user.email}`} marginLeft='4px' marginRight='8px'>
                  Email
                </Badge>
              )
            }
          </HStack>
        </VStack>
        <Divider
          margin='8px 0'
        />
        <VStack
          margin='12px 0'
          divider={<Divider />}
          spacing={4}
          align='stretch'
        >
          {
            posts.map((article, key) => {
              return (
                <StyledLink key={key} href={'/post/' + article.slug}>
                  <Link href={'/post/' + article.slug}>
                    <Box>
                      <Heading size='md'>
                        {article.title}
                      </Heading>
                      <Text margin='4px 0'>
                        {article.sort}
                      </Text>
                    </Box>
                  </Link>
                </StyledLink>
              )
            })
          }
        </VStack>
      </Container>
      <Footer />
    </>
  )
}

Page.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array
}

export const getStaticProps = async ctx => {
  const {
    id
  } = ctx.params

  const user = author.byId(id)
  const posts = post.byAuthor(id, 1)

  return {
    props: {
      user,
      posts
    }
  }
}

export const getStaticPaths = () => {
  const paths = author
    .getList()
    .map(id => {
      return {
        params: {
          id
        }
      }
    })

  return {
    paths,
    fallback: false
  }
}

export default Page
