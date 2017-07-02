var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'src', 'main.js'),
    output: {
        path: __dirname + '/',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1'],
            }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, 
         ]
    },
    
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        alias: {
            joi: 'joi-browser'
        }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
    }
};