module.exports = {
  shaderWebpackRule: {
    test: /\.(glsl|vs|fs|vert|frag)$/,
    exclude: /node_modules/,
    use: ['raw-loader', 'glslify-loader'],
  },
}
