const mdxProvider = require('@next/mdx')

const withMdx = mdxProvider({
  extension: /\.mdx?$/
})

module.exports = withMdx({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  },
  pageExtensions: [
    'js',
    'jsx',
    'mdx'
  ],
  poweredByHeader: false
})
