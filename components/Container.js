import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Container as StyledContainer
} from '@chakra-ui/react'

const Container = props => {
  return (
    <StyledContainer>
      {props.children}
    </StyledContainer>
  )
}

Container.propTypes = {
  children: PropTypes.any
}

export default Container
