import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Box,
  Heading,
  Divider
} from '@chakra-ui/react'

import Container from '../../components/Container'
import Header from '../../components/Header'
import MDXProvider from '../../components/MDXProvider'

import * as post from '../../fns/post'

const Page = ({ data, mdxModule }) => {
  return (
    <>
      <Box
        background='black'
        marginBottom='25px'
      >
        <Container>
          <Header />
        </Container>
      </Box>
      <Container width='750px'>
        <Heading size='3xl' padding='8px 0'>
          {data.title}
        </Heading>
        <Divider margin='9px 0' />
        <MDXProvider>
          {mdxModule}
        </MDXProvider>
      </Container>
    </>
  )
}

Page.propTypes = {
  data: PropTypes.object,
  mdxModule: PropTypes.any
}

export const getStaticProps = async ctx => {
  const {
    slug
  } = ctx.params

  const { data, content } = post.bySlug(slug)

  return {
    props: {
      data,
      mdxModule: content
    }
  }
}

export const getStaticPaths = () => {
  const posts = post.getList()
  const paths = Object
    .keys(posts)
    .map(slug => {
      return {
        params: {
          slug
        }
      }
    })

  return {
    paths,
    fallback: false
  }
}

export default Page
