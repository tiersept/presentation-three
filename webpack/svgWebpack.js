module.exports = {
  svgrWebpackRule: {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          dimensions: true,
          svgo: false, // Disables any optimization as this should be done manually.
        },
      },
    ],
  },
}
