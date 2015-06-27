define([ 'zepto' ], function($) {
	var ontap = function($el, fn) {
		var ts1, x1, y1, ts2, x2 = -1, y2 = -1;

		$el.on('touchstart', function(event) {

			ts1 = event.timeStamp;
			x1 = event.touches[0].pageX;
			y1 = event.touches[0].pageY;
			x2 = -1;
			y2 = -1;
		});
		$el.on('touchmove', function(event) {

			x2 = event.touches[0].pageX;
			y2 = event.touches[0].pageY;
		});
		$el.on('touchend',
				function(event) {

					ts2 = event.timeStamp;
					// x2=event.touches[0].pageX;
					// y2=event.touches[0].pageY;
					if (ts2 - ts1 < 1000
							&& ((x2 == -1 && y2 == -1) || (x2 - x1 < 10 && y2
									- y1 < 10))) {
						fn();
					}
				});
	};
	var getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	};
	return {
		ontap : ontap,
		getUrlParam : getUrlParam,
	}
});