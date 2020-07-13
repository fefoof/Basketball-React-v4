const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: {
        'to-do-list': './app/client/to-do-list.js',
        'players': './app/client/players.js',
        'users': './app/client/users.js',         
        'games': './app/client/games.js' ,
        'autentication': './app/client/autentication.js'            
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".js", ".jsx"]
                },
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(sass|scss)$/,
                loader: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loader: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                    },
                },
            },
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin()
    ]
};
