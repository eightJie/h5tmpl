define(['./common/wlib/w_shower_plugin', './common/share_0/share_0',
	'./common/loading_0/loading_0', './common/audio_0/audio_0',
	'./common/wxbridge_0/wxbridge_0', 'zepto', 'swiper', 'eraser'
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
					loopedSlides: SLIDER_NUM
				});

				// });

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

					sixHandler($active);
				}

				/**
				 * 第六页处理
				 * @return {[type]} [description]
				 */
				function sixHandler($active) {
					var $pre = $('.swiper-slide-prev');
					var $next = $('.swiper-slide-next');

					if ($active.hasClass('swiper-6')) { //第六页时

						//涂抹
						var $ele = $active.find('.t-up-up');
						$ele.eraser({
							isStopPropagation: true,
							width: 390,
							height: 127,
							size: 60,
							progressFunction: function(p) {
								if (p * 100 > 60) {
									var $ele = $active.find('.t-up-up');

									$ele.eraser('resetStopPropagation')
									$ele.eraser('clear');

									setTimeout(function() {
										showPhotos($active);
									}, 500);
								}
							}
						});

						//初始化swiper
						var mySwiper = new Swiper('.swiper-container-2', {
							nextButton: '.swiper-button-next',
							prevButton: '.swiper-button-prev'
						});

					} else {
						if ($pre.hasClass('swiper-6')) {
							sixClear($pre);
						} else if ($next.hasClass('swiper-6')) {
							sixClear($next);
						}
					}
				}

				//重置第六页页面状态
				function sixClear($active) {
					$active.find('.t-up-up').eraser('reset');
					$active.removeClass('state-list').removeClass('state-view');
					$active.off('touchstart');
					$active.find('.img-wrap').off('touchstart');
				}

				/**
				 * 第六页，切换至图片列表
				 */
				function showPhotos($active) {
					$active.addClass('state-list');

					//显示左右滑动浏览图片swiper
					$active.find('.img-wrap').on('touchstart', function(evt) {
						$active.addClass('state-view');
					});
				}

				/**
				 * 获取动画结束事件的名字
				 */
				function getAniEndName() {
					var transElement = document.createElement('trans');
					var transitionEndEventNames = {
						'WebkitTransition': 'webkitTransitionEnd',
						'MozTransition': 'transitionend',
						'OTransition': 'oTransitionEnd',
						'transition': 'transitionend'
					};
					var animationEndEventNames = {
						'WebkitTransition': 'webkitAnimationEnd',
						'MozTransition': 'animationend',
						'OTransition': 'oAnimationEnd',
						'transition': 'animationend'
					};

					function findEndEventName(endEventNames) {
						for (var name in endEventNames) {
							if (transElement.style[name] !== undefined) {
								return endEventNames[name];
							}
						}
					}
					return {
						transEvtName: findEndEventName(transitionEndEventNames),
						aniEvtName: findEndEventName(animationEndEventNames)
					};
				}
			}

		},

	};
});