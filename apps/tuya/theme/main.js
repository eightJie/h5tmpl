// require.config({
// 	baseUrl: '../../',
// 	paths: {
// 		zepto: 'lib/eraser/zepto.min',
// 		underscore: 'lib/underscore/underscore-min',
// 		eraser: 'lib/eraser/jquery.eraser',
// 		coffee: 'lib/coffee/coffee',
// 		swiper: 'lib/swiper/js/swiper.min',
// 		shower: 'common/shower',
// 		index: 'src/tuya/index'
// 	},
// 	shim: {
// 		'eraser': ['zepto'],
// 		'coffee': ['zepto'],
// 		'shower': ['zepto'],
// 		'index': ['zepto']
// 	}
// });

// require(['zepto', 'underscore', 'eraser', 'coffee', 'swiper', 'shower', 'index'], function(zepto, underscore, eraser, coffee, swiper, shower, index) {
// 	index();
// 	shower();
// });

require.config({
	baseUrl: './',
	paths: {
		zepto : 'theme/common/lib/eraser/zepto.min',
		swiper : 'theme/common/lib/swiper.min',
		underscore : 'theme/common/lib/underscore.min',
		eraser: 'theme/common/lib/eraser/jquery.eraser',
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