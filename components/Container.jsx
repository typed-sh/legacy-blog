import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Container as StyledContainer
} from '@chakra-ui/react'

const Container = ({ children, width, ...rest }) => {
  return (
    <StyledContainer
      maxW={width || '1000px'}
      {...rest}
    >
      {children}
    </StyledContainer>
  )
}

Container.propTypes = {
  children: PropTypes.any,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default Container
