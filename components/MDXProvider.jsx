import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as ChakraModules from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import MDXRuntime from '@mdx-js/runtime'

import { initialToLowerCase } from '../utils/text'

import * as MDXModules from './Extras'
import * as TypedModules from './Typed'

const components = {}

const extrasNS = Object.keys(MDXModules)

for (let i = 0, l = extrasNS.length; i < l; i++) {
  const file = extrasNS[i]

  components[initialToLowerCase(file)] = dynamic(() => import('./Extras/' + file))
}

const typedNS = Object.keys(TypedModules)

for (let i = 0, l = typedNS.length; i < l; i++) {
  const file = typedNS[i]

  components[file] = dynamic(() => import('./Typed/' + file))
}

const chakraNS = Object.keys(ChakraModules)

for (let i = 0, l = chakraNS.length; i < l; i++) {
  const key = chakraNS[i]
  const first = key[0]

  if (first !== first.toUpperCase()) {
    continue
  }

  components[key] = ChakraModules[key]
}

const MDXProvider = props => {
  const { colorMode, toggleColorMode } = ChakraModules.useColorMode()
  const toast = ChakraModules.useToast()

  const scope = {
    isLightMode: colorMode === 'light',
    toast,
    toggleColorMode
  }

  return (
    <MDXRuntime
      components={components}
      scope={scope}
    >
      {props.children}
    </MDXRuntime>
  )
}

MDXProvider.propTypes = {
  children: PropTypes.any
}

export default MDXProvider
