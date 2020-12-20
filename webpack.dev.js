const common = require("./webpack.common.js");
const { mergeWithRules } = require("webpack-merge");

module.exports =
	mergeWithRules({
		module: { rules: { test: "match", use: "prepend" } },
	})(common, {
			devtool: "inline-source-map",
			mode: "development",
			module: {
				rules: [
					{
						test: /\.s?css$/,
						exclude: /node_modules/,
						use: ["style-loader"],
					}
				],
			},
			output: {
				filename: "[name].bundle.js",
			},
			resolve: {
				alias: {
					vue: 'vue/dist/vue.esm.js'
				}
			}
		}
	);
