const common = require("./webpack.common.js");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { mergeWithRules } = require("webpack-merge");

module.exports = mergeWithRules({
		module: { rules: { test: "match", use: "prepend" } },
	})(common, {
			mode: "production",
			module: {
				rules: [
					{
						test: /\.s?css$/,
						exclude: /node_modules/,
						use: [MiniCssExtractPlugin.loader],
					}
				],
			},
			output: {
				filename: "[chunkhash].bundle.js",
				path: path.resolve(__dirname, "dist")
			},
			resolve: {
				alias: {
					vue: 'vue/dist/vue.esm.js'
				}
			},
			plugins: [
				new MiniCssExtractPlugin({
					filename: "[contenthash].bundle.css"
				})
			],
			optimization: {
				minimizer: [new TerserPlugin({
					terserOptions: {keep_classnames: true}
				})],
			}
		}
	);
