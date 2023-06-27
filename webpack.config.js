const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Template } = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


module.exports = {
    entry: {
        index: './src/js/index.js',
        styles: './src/css/style.css'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'] 
        },
        {
            test: /\.(jpeg|jpg|png)$/i,
            type: 'asset/resource', 
        },
        {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }
    ] },
    plugins: [
        new HtmlWebpackPlugin({ 
            title: 'Applicazione webpack',
            template: './src/index.html',
        }),
        new FaviconsWebpackPlugin({
            logo: './src/favicon/green-city.ico'
        }),
    ],
    devServer: {
        port: 3000,
        open: true,
        static: path.resolve(__dirname, 'dist')

    },
    mode: 'development'
};

