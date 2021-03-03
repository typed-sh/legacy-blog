import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Center,
  Image
} from '@chakra-ui/react'

const Img = props => {
  const { src, alt } = Object.assign({}, props)

  return (
    <Center>
      <Image
        src={src}
        alt={alt}
        margin='14px 0'
        shadow='md'
        borderRadius='md'
        crossOrigin='anonymous'
      />
    </Center>
  )
}

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
}

export default Img
