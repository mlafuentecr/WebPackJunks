const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';
const path = require('path');

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
						loader: 'postcss-loader', // Run post css actions
						options: {
							plugins: function () {
								// post css plugins, can be exported to postcss.config.js
								return [require('precss'), require('autoprefixer')];
							},
						},
					},
					{
						loader: 'sass-loader', // compiles Sass to CSS
					},
				],
			},
			{
				test: /\.svg$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							generator: content => svgToMiniDataURI(content.toString()),
						},
					},
				],
			},
			{
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			// {
			// 	test: /\.(sa|sc|c)ss$/,
			// 	use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			// },
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

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Mariolafuente.com',
			template: './src/index.html',
		}),

		new CopyPlugin({
			patterns: [
				// { from: './src/fonts/', to: './assets/fonts/' },
				{ from: './src/favicon.ico', to: './[name].[ext]' },
				{ from: './src/icons/', to: './icons/[name].[ext]' },
			],
		}),

		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new ImageminWebpWebpackPlugin({
			detailedLogs: true,
			overrideExtension: true,
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
