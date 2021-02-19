import * as PropTypes from 'prop-types'
import { useColorMode } from '@chakra-ui/react'

const TypedColorMode = props => {
  const { colorMode } = useColorMode()

  if (colorMode !== props.only) {
    return null
  }

  return props.children
}

TypedColorMode.propTypes = {
  children: PropTypes.any,
  only: PropTypes.string
}

export default TypedColorMode
