const path = require('path')
const webpack = require('webpack')
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
	require('dotenv').config({ path: '.env.development' })
}

module.exports = env => {
	const isProduction = env === 'production'

	return {
		mode: isProduction ? 'production' : 'development',
		entry: ['babel-polyfill', './src/app.js', 'webpack-plugin-serve/client'],
		output: {
			path: path.join(__dirname, 'public'),
			filename: 'bundle.js',
			publicPath: 'public/',
		},

		module: {
			rules: [
				{
					loader: 'babel-loader',
					test: /\.js$/,
					exclude: /node_modules/,
				},
				{
					test: /\.(png|jpg)$/,
					loader: 'url-loader',
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: ['style-loader', 'css-loader', 'sass-loader'],
				},
			],
		},
		plugins: [
			new Serve({}),
			new webpack.DefinePlugin({
				FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
				FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
				FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
				FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
				FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
				FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
			}),
		],
		watch: true,
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true,
		},
	}
}
