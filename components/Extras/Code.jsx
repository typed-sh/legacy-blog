import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import Highlight, { defaultProps } from 'prism-react-renderer'

import dracula from 'prism-react-renderer/themes/dracula'

const Code = ({ children, className = '', ...rest }) => {
  const language = className.replace(/language-/, '')

  return (
    <Box
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
              backgroundColor: 'inherit',
              overflowX: 'auto'
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
    </Box>
  )
}

Code.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export default Code
