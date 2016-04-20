(function (window, document, jQuery, undefined) {
	'use strict';

	var Projects = {
		Factory : {
			W            : $(window),
			D            : $(document),
			HB           : $('html , body'),
			H            : $('html'),
			B            : $('body'),
			Location     : $('.m-nav .location'),
			MainContent  : $('.main-content'),
			LContent     : $('.l-content'),
			LContentData : $('.l-content').data('location'),
			Device       : /Android|webOS|iPad|BlackBerry/i,
			IOS          : /iPhone|iPad|iPod/i,
			UserAgent    : null,
			Dynamic      : null,
			GetUserAgent : function() {
				var $this = this;
				
				if ( $this.W.width() < 768 ) {
					$this.UserAgent = 'Mobile';
				} else {
					if ( $this.Device.test(navigator.userAgent) ) {
						$this.UserAgent = 'Tablet';
					} else {
						$this.UserAgent = 'PC';
					}
				}

				if (navigator.userAgent.indexOf('MSIE 10') > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
					$this.UserAgent = 'IE';
				} else if (navigator.userAgent.indexOf('MSIE 8') > 0 || navigator.userAgent.indexOf('MSIE 9') > 0) {
					$this.UserAgent = 'IE89';
				}
				
				$this.OS = $this.UserAgent !== 'PC' ? ( /iPad|iPhone|iPod/i.test(navigator.userAgent) ? 'IOS' : 'Android' ) : null;
				$this.Dynamic = $this.Device.test(navigator.userAgent) ? 'webkitAnimationEnd webkitTransitionEnd' : 'animationend transitionend';
			},
			Menu         : {
				Init  : function() {
					Projects.Factory.Location.text(Projects.Factory.LContentData);
				},
				Click : function(e , Element) {
					$(Element).parents('.m-nav').toggleClass('is-active');
				}
			},
			MovieLoad    : function() {
				var _str = '';

				for (var i = 0; i < Datas.length; i++) {
					_str += '<li class="list">';
					_str += '	<span class="img-wrap">';
					_str += '		<img src="/Content/img/index/cover/' + Datas[i].cover + '" alt="' + Datas[i].name + '">';
					_str += '	</span>';
					_str += '	<em class="movie-name">' + Datas[i].name + '</em>';
					_str += '</li>';
				}

				$('.js-movies').html(_str);
				Projects.Factory.OwlCarousel.Init();
			},
			OwlCarousel  : {
				Init    : function() {
					var $this = this;

					if ( $('.jq-owl-slide').length !== 0 ) {
						$this.Setting($('.jq-owl-slide .movie-list'));
					}
				},
				Setting : function(Element) {
					for ( var i = 0 ; i < Element.length ; i ++ ) {
						if (Element.eq(i).data('init') !== false) {
							if (Element.eq(i).data('dotscontainer') !== '') {
								var _str = '';

								for (var j = 0; j < Element.eq(i).find('li').length; j++) {
									_str += '<div class="page"><a href="javascript:;">' + (j + 1) + '</a></div>';
								}
								$(Element.eq(i).data('dotscontainer')).html(_str);
							} else {
								Element.eq(i).siblings('.pagination').remove();
							}

							Element.eq(i).owlCarousel({
								items              : parseInt(Element.eq(i).data('items'), 10),
								nav                : ( Element.eq(i).data('nav') === true ) ? true : false,
								navText            : Element.eq(i).data('navtext') ? Element.eq(i).data('navtext').split(',') : ['', ''],
								navClass           : Element.eq(i).data('navclass') ? Element.eq(i).data('navclass').split(',') : ['', ''],
								navContainer       : Element.eq(i).data('navcontainer'),
								navContainerClass  : Element.eq(i).data('navcontainerclass'),
								loop               : ( Element.eq(i).find('li').length > 1 ) ? ( ( Element.eq(i).data('loop') === true ) ? true : false ) : false,
								dots               : ( Element.eq(i).data('dots') === true ) ? true : false,
								autoplay           : ( Element.eq(i).data('autoplay') === true ) ? true : false,
								autoplayTimeout    : 5000,
								autoplayHoverPause : true,
								dotsContainer      : Element.eq(i).data('dotscontainer'),
								mouseDrag          : true,
								slideBy            : 3
							});
						}
					}
				}
			},
			Slideshow    : function() {
				if (Projects.Factory.UserAgent === 'IE89') {
					var $list = $('.award-list .list'),
						i     = 0;

					$list.eq(i).addClass('is-show');
					setInterval(function(){
						if (i === $list.length - 1) {
							i = 0;
						} else {
							i += 1;
						}
						$list.eq(i).addClass('is-show').siblings().removeClass('is-show');
					}, 1500);
				}
			},
			Checked      : {
				OpenChecked : function() {
					if ( Projects.Factory.IOSChrome() ) {
						alert('請使用 iOS Safari 開啟此活動網站，以免導致轉轉賺翻天抽獎無法正常運作，謝謝您的配合。');
					}
				}
			},
			FB           : {
				UserID         : null,
				UserEMail      : null,
				Init           : function() {
					window.fbAsyncInit = function(){
						FB.init({
							appId   : 471818043022804,
							status  : true,
							cookie  : true,
							xfbml   : true,
							version : 'v2.5'
						});
					};

					(function(d, s, id){
						var js,
							fjs = d.getElementsByTagName(s)[0];

						if ( d.getElementById(id) ) {return;}

						js     = d.createElement(s);
						js.id  = id;
						js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.5&appId=471818043022804";

						fjs.parentNode.insertBefore(js, fjs);
					}(document, 'script', 'facebook-jssdk'));
				},
				GetLoaginState : function(Functions) {
					var $this = this;

					$('.btn-play').addClass('disable');
					Projects.Factory.MainContent.removeClass('before').addClass('loading');
					FB.getLoginStatus(function (response) {
						if ( response.authResponse ) {
							$this.UserID = response.authResponse.userID;
							Projects.Factory.Play.Click($this.UserID, $this.UserEMail);
						} else {
							$this.Login(Functions);
						}
					});
				},
				Login          : function(Functions) {
					var $this = this;

					FB.login(function (response) {
						if ( response.authResponse ) {
							$this.UserID = response.authResponse.userID;
							Projects.Factory.Play.Click($this.UserID, $this.UserEMail);
						} else {
							alert('須同意應用程式');
							$('.btn-play').removeClass('disable');
							Projects.Factory.MainContent.removeClass('loading').addClass('before');
						}
					} , {scope : 'email'});
				}
			},
			Play         : {
				Ul      : $('.award-list'),
				List    : $('.award-list .list'),
				Wording : $('.get-award'),
				BtnLink : $('.btn-link'),
				Check   : false,
				Award   : null,
				End     : null,
				Label   : null,
				Click   : function(e, Element) {
					var $this = this,
						i     = 0;

					$(Element).addClass('b-cloak');

					if ($this.Check === false) {
						$this.Check = true;

						var runIt = setInterval(function(){
							if (i === $this.List.length - 1) {
								i = 0;
							} else if (i === $this.End) {
								this.clearInterval(runIt);

								$this.Ul.addClass('is-shine');
								$this.Finish();
							} else {
								i += 1;
							}

							$this.List.eq(i).addClass('is-show').siblings().removeClass('is-show');
						}, 50);

						$('body').on('keydown', function(e){
							if (e.keyCode === 49 || e.keyCode === 97) {
								$this.End = 0;
								$this.Award = '180';
							} else if (e.keyCode === 50 || e.keyCode === 98) {
								$this.End = 6;
								$this.Award = '60';
							} else if (e.keyCode === 51 || e.keyCode === 99) {
								$this.End = 3;
								$this.Award = '37';
							}

							sessionStorage.setItem('award', $this.Award);
						});
					}
				},
				Finish  : function() {
					var $this = this;

					$this.Wording.text($this.Award + '天免費看');

					if (Projects.Factory.UserAgent === 'IE') {
						$this.Ul.delay(0).queue(function(){
							$(this).addClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).removeClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).addClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).removeClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).addClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).removeClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).addClass('is-shine').dequeue();
						}).delay(350).queue(function(){
							$(this).removeClass('is-shine').dequeue();
							Projects.Factory.HB.animate({
								scrollTop : $this.BtnLink.offset().top
							});
							$('.main-content-bd').addClass('show-result');
						});
					} else if (Projects.Factory.UserAgent === 'IE89') {
						$this.Ul.removeClass('is-shine');
						Projects.Factory.HB.animate({
							scrollTop : $this.BtnLink.offset().top
						});
						$('.main-content-bd').addClass('show-result');
					} else {
						$this.Ul.delay(3200).queue(function(){
							$this.Ul.removeClass('is-shine');
							Projects.Factory.HB.animate({
								scrollTop : $this.BtnLink.offset().top
							});
							$('.main-content-bd').addClass('show-result');
						});
					}
				}
			},
			GetSession   : {
				// serial    : $('.serial'),
				// recommand : $('.recommand'),
				award     : $('.award'),
				Init      : function() {
					var $this   = this,
						// _serial = sessionStorage.getItem('serial') || '',
						_award  = sessionStorage.getItem('award') || '';

					// $this.serial.text(_serial);
					$this.award.text(_award);
				}
			},
			PrivateMode  : {
				Init : function() {
					if (Projects.Factory.UserAgent !== 'IE' && Projects.Factory.UserAgent !== 'IE89') {
						if (typeof(FB) === 'undefined') {
							alert('提醒您，您目前正在使用私密瀏覽模式，請關閉此模式，以免導致轉轉賺翻天抽獎無法正常運作，謝謝您的配合。');
						}
						try { localStorage.test = 2; } catch (e) {
							alert('提醒您，您目前正在使用私密瀏覽模式，請關閉此模式，以免導致轉轉賺翻天抽獎無法正常運作，謝謝您的配合。');
						}
					}
				}
			},
			IOSChrome    : function () {
				if ( Projects.Factory.IOS.test(navigator.userAgent) && navigator.userAgent.toLowerCase().split('version/')[1] === undefined ) {
					return true;
				} else {
					return false;
				}
			},
			Validate     : {
				FormElement : $('form'),
				Init        : function() {
					var $this = this;

					$this.FormElement.find('.input-box').each(function(){
						$(this).on('focusout', function(){
							if($(this).parent().hasClass('required')) {
								$this.Required($(this));
							}
						});
					});
				},
				Click       : function(Element) {
					var $this = this;

					$this.FormElement.find('.input-box').each(function(){
						if($(this).parent().hasClass('required')) {
							$this.Required($(this));
						}
					});
				},
				Required    : function(Element) {
					var $this = this;

					if($(Element).val() === '' || $(Element).val() === $(Element).attr('placeholder')) {
						$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('empty'));
					} else {
						$(Element).parent().removeClass('error');

						if ($(Element).parent().hasClass('cust-id')) {
							if ( $this.CheckID($(Element), $(Element).val()) ) {
								$(Element).parent().removeClass('error');
							} else {
								$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('error'));
							}
						} else if ($(Element).parent().hasClass('phone-num')) {
							$this.CheckTel($(Element), $(Element).val());
						} else if ($(Element).parent().hasClass('email')) {
							$this.CheckMail($(Element), $(Element).val());
						}
					}
				},
				CheckID     : function(Element, ID) {
					var CountyCode = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z', 'I', 'O');
					var Multiply   = new Array(1, 9, 8, 7, 6, 5, 4, 3, 2, 1);
					var Nums       = new Array(2);
					var Total      = 0;
					var RegExps    = /^[a-z](1|2)\d{8}$/i;
					var CountyEN , FirstNum , LastNum;

					if ( ID.search(RegExps) == -1 ) {
						console.log(0);
						return false;
					} else {
						CountyEN = ID.charAt(0).toUpperCase();
						LastNum  = ID.charAt(9);
					}

					for ( var i = 0 ; i < 26 ; i ++ ) {
						if ( CountyEN === CountyCode[i] ) {
							FirstNum = i + 10;
							Nums[0]  = Math.floor( FirstNum / 10 );
							Nums[1]  = FirstNum - ( Nums[0] * 10 );
							break;
						} 
					}

					for( var i = 0 ; i < Multiply.length ; i ++ ) {
						if ( i < 2 ) {
							Total += Nums[i] * Multiply[i];
						} else {
							Total += parseInt( ID.charAt( i - 1 ) ) * Multiply[i];
						}
					}

					if ( ( 10 - ( Total % 10 ) ) !== parseInt(LastNum , 10) ) {
						return false;
					}

					return true;
				},
				CheckTel    : function(Element, Tel) {
					if(/^09[0-9]{8}$/.test(Tel)) {
						$(Element).parent().removeClass('error');
					} else {
						$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('error'));
					}
				},
				CheckMail   : function(Element, mail) {
					var _mailArr = mail.split('@');

					if (_mailArr.length === 1 || _mailArr[0] === '' || _mailArr[1] === '') {
						$(Element).parent().addClass('error').find('.warning').text($(Element).parent().data('error'));
					} else {
						$(Element).parent().removeClass('error');
					}
				}
			}
		}
	}

	if ( ! window.Projects ) {
		window.Projects = Projects;
	} else {
		window.Projects = $.extend( {} , window.Projects , Projects );
	}
}(window, document, $));