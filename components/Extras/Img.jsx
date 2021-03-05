import * as React from 'react'
import {
  Center,
  Image
} from '@chakra-ui/react'

const Img = props => {
  const { src, alt } = Object.assign({}, props) // NOTE: DO NOT REMOVE THIS to retain the object during SSR;

  return (
    <Center>
      <Image
        src={src}
        alt={alt}
        margin='14px 0'
        shadow='md'
        borderRadius='md'
        crossOrigin='anonymous'
        maxHeight='750px'
      />
    </Center>
  )
}

export default Img
