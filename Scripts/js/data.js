$(function () {
	var Datas = [{
		'name'  : '福爾摩斯',
		'cover' : '01.jpg'
	}, {
		'name'  : '驚爆焦點',
		'cover' : '02.jpg'
	}, {
		'name'  : '追婚日記',
		'cover' : '03.jpg'
	}, {
		'name'  : '玩命快遞',
		'cover' : '04.jpg'
	}, {
		'name'  : '關鍵救援',
		'cover' : '05.jpg'
	}, {
		'name'  : '愛情失控點',
		'cover' : '06.jpg'
	}]

	if ( ! window.Datas ) {
		window.Datas = Datas;
	} else {
		window.Datas = $.extend({}, window.Datas, Datas);
	}
});