module.exports = {
  audioWebpackRule: ({ config, isServer }) => ({
    test: /\.(ogg|mp3|wav|mpe?g)$/i,
    exclude: config.exclude,
    use: [
      {
        loader: require.resolve('url-loader'),
        options: {
          limit: config.inlineImageLimit,
          fallback: require.resolve('file-loader'),
          publicPath: `${config.assetPrefix}/_next/static/images/`,
          outputPath: `${isServer ? '../' : ''}static/images/`,
          name: '[name]-[hash].[ext]',
          esModule: config.esModule || false,
        },
      },
    ],
  }),
}
