const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlug = require('mini-css-extract-plugin');
const path = require('path');




module.exports = {


  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module:{
      rules:[
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
      },
      {

        test: /\.scss/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
    },
      {
          test: /\.html$/,
            use: [
                {
                  loader: "html-loader",
                  options: {minimize: true}
                }
             ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            },
          ]
        },

        //Basic img pack
        // {
        //   test: /\.(gif|png|jpe?g|svg)$/i,
        //   use: [
        //     'file-loader'
        //   ]
        // },
      ]
  },
  
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html", //from
      filename: "./index.html" //lo mete en Dist
    }),
    new MiniCssExtractPlug({
      template: "[name].css", //from
      filename: "[id].css" //lo mete en Dist
    }),
  ],


}