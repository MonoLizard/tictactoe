const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: {
		main: "./src/index.ts"
	},
	module: {
		rules: [
			{ test: /\.ts$/, exclude: /node_modules/, use: ["ts-loader"] },
			{ test: /\.html$/, exclude: /node_modules/, use: ["html-loader"] },
			{
				test: /\.s?css$/,
				exclude: /node_modules/,
				use: [
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			}
		]
	},
	resolve: {
		alias: {
			interface: path.resolve(__dirname, 'src/app/interface'),
			enum: path.resolve(__dirname, 'src/app/enum'),
			component: path.resolve(__dirname, 'src/app/component'),
			state: path.resolve(__dirname, 'src/app/state')
		},
		extensions: [
			".ts",
			".js",
			".css",
			".scss",
			".html",
			".webpack.js",
			".web.js",
			".tsx",
			".jsx",
			".json"
		]
	},
	target: 'web',
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: "src/index.html",
			filename: "index.html"
		})
	]
};
