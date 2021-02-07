module.exports = {
  plugins: [
    require('postcss-preset-env')({
      autoprefixer: { grid: true },
      stage: 3,
      features: {
        'nesting-rules': true
      }
    }),
    require('autoprefixer'),
    require('postcss-flexbugs-fixes'),
  ],
}
