//  * Plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const ImageminPlugin = require("imagemin-webpack");

//  ! Basic constants
const mode =
	process.env.NODE_ENV === "production" ? "production" : "development";

const target = mode === "production" ? "browserslist" : "web";

const optimization = {
	splitChunks: { chunks: "all" },
	minimize: true,
	minimizer: ["..."],
};

mode === "production"
	? (optimization.minimize = true)
	: (optimization.minimize = false);

const filename = (ext) =>
	mode === "production"
		? `[name].[contenthash].bundle.${ext}`
		: `[name].bundle.${ext}`;

const plugins = [
	new CleanWebpackPlugin(),
	new MiniCssExtractPlugin({
		filename: `./styles/${filename("css")}`,
	}),
	new HtmlWebpackPlugin({
		title: "Webpack Project",
		filename: "index.html",
		publicPath: "auto",
		favicon: "./src/assets/favicon.ico",
		minify: mode === "production",
		meta: {
			viewport: "width=device-width, initial-scale=1",
			charset: "UTF-8",
		},
		showErrors: true,
		template: "./src/index.html",
	}),
];

mode === "production"
	? plugins.push(
			new ImageminPlugin({
				bail: false, // Ignore errors on corrupted images
				cache: true,
				imageminOptions: {
					plugins: [
						["gifsicle", { interlaced: true }],
						["jpegtran", { progressive: true }],
						["optipng", { optimizationLevel: 5 }],
						[
							"svgo",
							{
								plugins: [
									{
										removeViewBox: false,
									},
								],
							},
						],
					],
				},
			}),
	  )
	: plugins;

//  ! Path module
const path = require("path");

// ! Main Config
module.exports = {
	mode: mode,
	target: target,
	entry: "./src/js/main.js",
	output: {
		filename: `./js/${filename("js")}`,
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							// name:
							// 	mode === "production"
							// 		? "[contenthash].[ext]"
							// 		: "[name].[ext]",
							name: "[name].[ext]",
							outputPath: "img",
						},
					},
				],
			},
			{
				test: /\.woff2$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							// name:
							// 	mode === "production"
							// 		? "[contenthash].[ext]"
							// 		: "[name].[ext]",
							name: "[name].[ext]",
							outputPath: "fonts",
						},
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { publicPath: ".." },
					},
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
		],
	},
	optimization: optimization,
	plugins: plugins,
	devtool: "source-map",
	devServer: {
		historyApiFallback: true,
		contentBase: "./dist",
		open: true,
		compress: true,
		hot: true,
		port: 3000,
		host: "localhost",
	},
};
