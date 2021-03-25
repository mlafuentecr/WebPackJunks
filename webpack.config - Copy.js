const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const dotenv = require('dotenv').config({
	path: path.join(__dirname, '.env'),
});

module.exports = {
	entry: '/src/js/index.js',
	//entry: ['./src/file_1.js', './src/file_2.js'],
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true },
					},
				],
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						loader: 'style-loader', // inject CSS to page
					},
					{
						loader: 'css-loader', // translates CSS into CommonJS modules
					},
					{
						loader: 'postcss-loader', // Run postcss actions
						options: {
							plugins: function () {
								// postcss plugins, can be exported to postcss.config.js
								return [require('autoprefixer')];
							},
						},
					},
					{
						loader: 'sass-loader', // compiles Sass to CSS
					},
				],
			},
			,
			{
				test: /\.(jpeg|jpg|png|gif|svg)$/i,
				use: {
					loader: 'file-loader',
					options: {
						name: 'assets/images/[name].webp',
					},
				},
			},
		],
	},
	devServer: {
		contentBase: './dist',
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				// { from: './src/fonts/', to: './assets/fonts/' },
				{ from: './src/favicon.ico', to: './[name].[ext]' },
				{ from: './src/icons/', to: './icons/[name].[ext]' },
			],
		}),

		new ImageminWebpWebpackPlugin({
			detailedLogs: true,
			overrideExtension: true,
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html', //from
			filename: './index.html', //lo mete en Dist
			inject: 'body',
			minify: {
				html5: true,
				removeComments: true,
				collapseWhitespace: true,
			},
		}),
		// new MiniCssExtractPlugin({
		// 	template: '[name].css', //from
		// 	filename: '/[id].css', //lo mete en Dist
		// }),
		new ImageminWebpWebpackPlugin({
			config: [
				{
					test: /\.(jpe?g|png)/,
					options: {
						quality: 85,
					},
				},
			],

			overrideExtension: true,
			detailedLogs: true,
			silent: true,
			strict: true,
		}),
	],
};
