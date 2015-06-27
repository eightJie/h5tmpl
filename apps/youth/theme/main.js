require.config({
	baseUrl: './',
	paths: {
		zepto : 'theme/common/lib/zepto.min',
		swiper : 'theme/common/lib/swiper.min',
		underscore : 'theme/common/lib/underscore.min',
		jweixin : 'theme/common/lib/jweixin-1.0.0',
		// -------
		wutil : 'theme/common/wlib/w_shower_util',
		wplugin : 'theme/common/wlib/w_shower_plugin',
	},
	shim : {
		'zepto' : {
			// deps : [ 'jquery' ],
			exports : '$'
		},
		'underscore' : {
			exports : '_'
		},
		'swiper' : {
			exports : 'Swiper',
		},
		'jweixin' : {
			exports : 'wx',
		},
	},
});

require([ 'theme/index' ], function(index) {
	index.run();
});