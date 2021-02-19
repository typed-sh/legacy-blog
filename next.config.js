const withPlugins = require('next-compose-plugins')
const mdxProvider = require('@next/mdx')
const withImages = require('next-images')

const withMdx = mdxProvider({
  extension: /\.mdx?$/
})

module.exports = withPlugins(
  [
    [withMdx],
    [withImages]
  ],
  {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }

      config.module.rules.push(
        {
          test: /\.ya?ml$/,
          use: 'js-yaml-loader'
        }
      )

      return config
    },
    pageExtensions: [
      'js',
      'jsx',
      'mdx'
    ],
    poweredByHeader: false
  }
)
