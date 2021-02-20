import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as ChakraModules from '@chakra-ui/react'
import Link from 'next/link'
import MDXRuntime from '@mdx-js/runtime'
import Highlight, { defaultProps } from 'prism-react-renderer'

import dracula from 'prism-react-renderer/themes/dracula'

import * as TypedModules from './Typed'

const a = props => {
  const { href, ...rest } = props

  return (
    <Link href={href}>
      <ChakraModules.Link href={href} {...rest} />
    </Link>
  )
}

a.propTypes = {
  href: PropTypes.any
}

const code = ({ children, className, ...rest }) => {
  const language = className.replace(/language-/, '')

  return (
    <ChakraModules.Box
      background='gray.700'
      padding='15px'
      margin='22.5px 15px'
      shadow='xl'
      borderRadius='xl'
    >
      <Highlight
        {...defaultProps}
        theme={dracula}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              backgroundColor: 'inherit'
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </ChakraModules.Box>
  )
}

code.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

const blockquote = props => {
  const { children, ...rest } = props

  return (
    <ChakraModules.Alert status='info' margin='12px 0' variant='left-accent' {...rest}>
      {children}
    </ChakraModules.Alert>
  )
}

blockquote.propTypes = {
  children: PropTypes.any
}

const img = props => {
  const { src, ...rest } = props

  return (
    <ChakraModules.Center>
      <ChakraModules.Image
        src={src}
        margin='14px 0'
        shadow='md'
        borderRadius='md'
        crossOrigin='anonymous'
        {...rest}
      />
    </ChakraModules.Center>
  )
}

img.propTypes = {
  src: PropTypes.string
}

const components = {
  h1: props => <ChakraModules.Heading as='h1' size='2xl' margin='26px 0' {...props} />,
  h2: props => <ChakraModules.Heading as='h2' size='xl' margin='20px 0' {...props} />,
  h3: props => <ChakraModules.Heading as='h3' size='lg' margin='16px 0' {...props} />,
  h4: props => <ChakraModules.Heading as='h4' size='md' margin='12px 0' {...props} />,
  h5: props => <ChakraModules.Heading as='h5' size='sm' margin='9px 0' {...props} />,
  h6: props => <ChakraModules.Heading as='h6' size='xs' margin='7px 0' {...props} />,
  a,
  p: props => <ChakraModules.Text {...props} />,
  hr: props => <ChakraModules.Divider margin='9px 0' {...props} />,
  inlineCode: props => <ChakraModules.Code {...props} />,
  code,
  blockquote,
  img,
  ...TypedModules
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
