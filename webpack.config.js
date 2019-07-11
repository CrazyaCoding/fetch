const path = require('path');

module.exports = {
    entry: './src/test.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist',
        filename: 'test.js'
	},
	mode: 'production'
}