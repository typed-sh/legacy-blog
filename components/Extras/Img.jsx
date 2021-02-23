import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Center,
  Image
} from '@chakra-ui/react'

const Img = props => {
  const { src, ...rest } = props

  return (
    <Center>
      <Image
        src={src}
        margin='14px 0'
        shadow='md'
        borderRadius='md'
        crossOrigin='anonymous'
        {...rest}
      />
    </Center>
  )
}

Img.propTypes = {
  src: PropTypes.string
}

export default Img
