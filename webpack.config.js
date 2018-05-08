let webpack = require('webpack')
let path = require('path')

module.exports = {
    entry: ['./src/helper.js', './src/init.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'draw.js'
    }
}