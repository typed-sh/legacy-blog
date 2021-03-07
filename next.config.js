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
          source: '/',
          destination: '/page/1'
        },
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap'
        },
        {
          source: '/post/:slug/:filename',
          destination: '/api/assets/:slug/:filename'
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
    poweredByHeader: false,
    trailingSlash: true // NOTE: Where seamless image magic happens!
  }
)
