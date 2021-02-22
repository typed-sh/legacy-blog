import * as React from 'react'
import * as PropTypes from 'prop-types'
import Link from 'next/link'
import {
  Box,
  Center,
  Heading,
  Text,
  Image,
  Link as StyledLink
} from '@chakra-ui/react'

const Post = props => {
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
        <Link href={'/post/' + props.data.slug}>
          <StyledLink href={'/post/' + props.data.slug}>
            {
              props.data.thumbnail && (
                <Image
                  src={props.data.thumbnail}
                  shadow='lg'
                  borderRadius='md'
                  crossOrigin='anonymous'
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
        <Link href={'/post/' + props.data.slug}>
          <StyledLink href={'/post/' + props.data.slug}>
            <Heading size='md'>
              {props.data.title}
            </Heading>
            <Text margin='4px 0'>
              {props.data.sort}
            </Text>
          </StyledLink>
        </Link>
      </Box>
    </Box>
  )
}

Post.propTypes = {
  data: PropTypes.object
}

export default Post
