/**
 * Created by Maggie on 17/9/8
 */

var path = require('path');
var glob = require('glob');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var commonPlugins = [];
var getEntry = function(){
    var entry = {};
    glob.sync('./src/**/*.js').forEach(function(name){
        var n = name.slice(name.lastIndexOf('src/') + 4, name.length - 3);
        n = n.slice(0, n.lastIndexOf('/'));
        entry[n] = name;
        commonPlugins.push(
            new HtmlWebpackPlugin({
                title:n,
                filename: `${n}/index.html`,
                template: 'common/index.html',
                inject: 'body'
            })
        )
    });
    return entry;
}


module.exports = {
    entry: getEntry(),
    output:{
        path: path.resolve(__dirname, "./build/"),
        filename: '[name]/index.js'
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    module:{
        loaders:[
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },{
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader!less-loader')
            }
        ]
    },
    plugins: commonPlugins
}
 