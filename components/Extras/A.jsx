import * as React from 'react'
import * as PropTypes from 'prop-types'
import Link from 'next/link'
import { Link as StyledLink } from '@chakra-ui/react'

const A = props => {
  const { href, ...rest } = props

  return (
    <Link href={href}>
      <StyledLink href={href} {...rest} />
    </Link>
  )
}

A.propTypes = {
  href: PropTypes.any
}

export default A
