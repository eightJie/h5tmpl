define([ 'jweixin', 'underscore', 'zepto' ], function(wx, _, $) {
	var onShareObject = {};

	var sigsuc = function(data) {
		var jdata = {};
		try {
			jdata = JSON.parse(data);
		} catch (e) {
			return;
		}
		if (jdata.code != "1000")
			return;

		wx.config({
			debug : false,
			appId : 'wx75b4cd808d4527ee',
			timestamp : jdata.timestamp,
			nonceStr : jdata.noncestr,
			signature : jdata.signature,
			jsApiList : [ 'checkJsApi', 'onMenuShareTimeline',
					'onMenuShareAppMessage', 'onMenuShareQQ',
					'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems',
					'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem',
					'translateVoice', 'startRecord', 'stopRecord',
					'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice',
					'uploadVoice', 'downloadVoice', 'chooseImage',
					'previewImage', 'uploadImage', 'downloadImage',
					'getNetworkType', 'openLocation', 'getLocation',
					'hideOptionMenu', 'showOptionMenu', 'closeWindow',
					'scanQRCode', 'chooseWXPay', 'openProductSpecificView',
					'addCard', 'chooseCard', 'openCard' ]
		});
		wx.ready(function() {
			wx.onMenuShareAppMessage(onShareObject);
			wx.onMenuShareTimeline(onShareObject);
			wx.onMenuShareQQ(onShareObject);
			wx.onMenuShareWeibo(onShareObject);
		});
	};
	var http_relative2absolute = function(rpath) {
		var i;
		if (_.isUndefined(rpath))
			return window.location.href;
		i = rpath.indexOf('http://');
		if (i >= 0)
			return rpath;

		var href = window.location.href;
		i = href.indexOf('?');
		if (i >= 0) {
			href = href.substr(0, i);
		}
		i = href.lastIndexOf('/');
		if (i >= 0) {
			href = href.substr(0, i);
		}
		href = href + '/' + rpath;
		return href;
	};
	var init = function() {
		if (!wx) {
			console.log('wexin bridge not found');
			return;
		}
		var title = $('#hidden_project_title').val();
		var desc = $('#hidden_project_desc').val();
		var img = $('#hidden_project_img').val();
		var imgurl = http_relative2absolute(img);

		onShareObject.title = title;
		onShareObject.desc = desc;
		onShareObject.imgUrl = imgurl;
		onShareObject.link = window.location.href;
		wx.error(function(res) {
			// alert(res.errMsg);
			// alert(JSON.stringify(res));
		});
		$.ajax({
			type : 'get',
			url : 'http://app.iwasai.com/api/common/wxSignature',
			success : sigsuc,
		});
	};

	return {
		init : init
	};
});
