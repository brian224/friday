(function (window, document, jQuery, undefined) {
	'use strict';

	$('.jq-menu').on('click' , function(e){
		e.preventDefault();
		Projects.Factory.Menu.Click(e, this);
	});

	$('.jq-submit').on('click' , function(e){
		e.preventDefault();
		Projects.Factory.Validate.Click(e, this);
	});

	$(window).load(function(e){
		$('.jq-play').on('click' , function(e){
			if (!$(this).hasClass('disable')) {
				e.preventDefault();
				Projects.Factory.Play.Click(e, this);
				// Projects.Factory.FB.GetLoaginState();
			}
		});

		if (Projects.Factory.LContent.hasClass('index')) {
			Projects.Factory.MovieLoad();
			Projects.Factory.Slideshow();
		} else if (Projects.Factory.LContent.hasClass('game')) {
			Projects.Factory.Checked.OpenChecked();
			// Projects.Factory.PrivateMode.Init();
		} else if (Projects.Factory.LContent.hasClass('getcode')) {
			Projects.Factory.GetSession.Init();
		} else if (Projects.Factory.LContent.hasClass('formstep')) {
			Projects.Factory.Validate.Init();
		}
	});

	$(document).ready(function(e){
		// Projects.Factory.FB.Init();
		Projects.Factory.GetUserAgent();
		Projects.Factory.Menu.Init();
	});
}(window, document, $));