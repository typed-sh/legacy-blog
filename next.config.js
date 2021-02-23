const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

module.exports = withPlugins(
  [
    [withImages]
  ],
  {
    rewrites: async () => {
      return [
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap'
        }
      ]
    },
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
