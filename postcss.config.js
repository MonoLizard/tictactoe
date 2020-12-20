module.exports = {
	parser:'postcss-scss',
	plugins:{
		'postcss-assets': {cachebuster: true, loadPaths: ['font/', 'image/'], basePath: 'src'},
		autoprefixer: {},
		cssnano: {zindex: false, reduceIdents: false}
	}
};
