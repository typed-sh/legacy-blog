import * as React from 'react'
import * as PropTypes from 'prop-types'
import Link from 'next/link'
import dayjs from 'dayjs'
import CryptoJS from 'crypto-js'
import {
  Box,
  Center,
  Heading,
  Text,
  Image,
  Link as StyledLink,
  HStack,
  Avatar
} from '@chakra-ui/react'

const Post = ({ user, data, ...props }) => {
  return (
    <Box
      flexShrink={1}
      margin='14px 0'
      display={['block', 'flex']}
    >
      <Center
        flexGrow={1}
        flexShrink={2}
        maxWidth={[
          '100%',
          '200px',
          '250px'
        ]}
      >
        <Link href={'/post/' + data.slug}>
          <StyledLink href={'/post/' + data.slug}>
            {
              data.thumbnail && (
                <Image
                  src={'/post/' + data.slug + '/' + data.thumbnail}
                  fallbackSrc='../../static/thumbnails/another-warmness.png'
                  shadow='lg'
                  borderRadius='md'
                  crossOrigin='anonymous'
                  height={[
                    '200px',
                    '175px',
                    '150px'
                  ]}
                  width='100%'
                  objectFit='cover'
                />
              )
            }
          </StyledLink>
        </Link>
      </Center>
      <Box
        flexGrow={0}
        flexShrink={1}
        marginTop={[2, 0]}
        marginLeft={[0, 4, 6]}
      >
        <Link href={'/post/' + data.slug}>
          <StyledLink href={'/post/' + data.slug}>
            <Heading size='md'>
              {data.title}
            </Heading>
            <Text margin='4px 0'>
              {data.sort}
            </Text>
          </StyledLink>
        </Link>
        <HStack
          margin='9px 0'
        >
          <Avatar
            src={user.avatar || `https://www.gravatar.com/avatar/${CryptoJS.MD5(user.email)}`}
            name={user.name}
            background='transparent'
            size='sm'
          />
          <Box>
            <Link href={`/author/${data.author}`}>
              <StyledLink href={`/author/${data.author}`}>
                <Heading
                  as={StyledLink}
                  size='sm'
                >
                  {user.name}
                </Heading>
              </StyledLink>
            </Link>
            <Text fontSize='sm'>
              {dayjs(data.date).format('DD/MM/YYYY')}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  )
}

Post.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object
}

export default Post
