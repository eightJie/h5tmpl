define(['./common/wlib/w_shower_plugin', './common/share_0/share_0',
	'./common/loading_0/loading_0', './common/audio_0/audio_0',
	'./common/wxbridge_0/wxbridge_0', 'zepto', 'swiper'
], function(
	wplugin, share, loading, audio, wxbridge, $, Swiper) {

	return {
		run: function() {
			wplugin.init();
			wplugin.trigger('on_start_init');
			this.init(_.bind(function() {
				loading.finish();

				this._run();
			}, this));
		},
		init: function(callback) {
			loading.init();
			share.init();
			audio.init();
			wxbridge.init();
			// resloader.init();
			callback();
		},
		_run: function() {
			audio.run();

			if (winLoaded) {
				initPage();
			} else {
				$(window).on('load', initPage);
			}

			function initPage() {

				var SLIDER_NUM = $('#swiper-container .swiper-slide').length;

				var mySwiper = new Swiper('#swiper-container', {
					direction: 'vertical',
					onInit: function(s) {

						$('#loading').remove();
						showSwiper();

					},
					onSlideChangeEnd: function(s) {
						showAni();
					},
					loop: true,
					// loopedSlides: SLIDER_NUM
				});

				/**
				 * 显示swiper
				 */
				function showSwiper() {
					$('#swiper-container').css('visibility', 'visible');
					showAni();
				}

				/**
				 * 播放每个slide里的动画
				 */
				function showAni() {
					var $active = $('.swiper-slide-active');

					$active.find('.animated').addClass('block');
					$('.swiper-slide-prev, .swiper-slide-next').find('.animated').removeClass('block');
					sevenHandler($active);
				}

				/**
				 * 第七页处理
				 * @return {[type]} [description]
				 */
				function sevenHandler($active) {
					var $pre = $('.swiper-slide-prev');
					var $next = $('.swiper-slide-next');

					if ($active.hasClass('swiper-7')) {

						$active.find('.img-c-1').on('tap', imgTap);
						$active.find('.img-c-2').on('tap', imgTap);
						$active.find('.view-img-c').on('tap', function() {
							$active.removeClass('state-view');
						});

					} else {
						if ($pre.hasClass('swiper-7')) {
							sevenClear($pre);
						} else if ($next.hasClass('swiper-7')) {
							sevenClear($next);
						}
					}

					function imgTap(evt) {
						var $ele = $(evt.target);
						var viewImg = $active.find('.view-img-c');

						viewImg.css('backgroundImage', $ele.css('backgroundImage'));
						$active.addClass('state-view');
					}
				}



				function sevenClear($active) {
					$active.removeClass('state-view');
					$active.find('.img-c-1').off('tap');
					$active.find('.img-c-2').off('tap');
					$active.find('.view-img-c').off('tap');
				}

			}

		},

	};
});