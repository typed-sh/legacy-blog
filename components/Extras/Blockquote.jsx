import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Alert } from '@chakra-ui/react'

const Blockquote = props => {
  const { children, ...rest } = props

  return (
    <Alert status='info' margin='12px 0' variant='left-accent' {...rest}>
      {children}
    </Alert>
  )
}

Blockquote.propTypes = {
  children: PropTypes.any
}

export default Blockquote
