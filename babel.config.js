module.exports = {
    presets: [['@babel/preset-env'], '@babel/preset-typescript'],
    plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-proposal-optional-chaining',
    ],
}
