define([ 'zepto', 'wutil' ], function($, WUtil) {
	return {
		init : function() {
			var source = WUtil.getUrlParam('utm_source');
			if (source == null) {
				$('.wf_share_slide').remove();
			} else {
				WUtil.ontap($('#download_url'), function() {
					$('#download_url'.click());
				});
			}
		}
	};
});
