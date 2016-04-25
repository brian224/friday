$(function () {
	var Datas = [{
		'name'  : '新世紀福爾摩斯：地獄新娘',
		'cover' : '01.jpg'
	}, {
		'name'  : '驚爆焦點',
		'cover' : '02.jpg'
	}, {
		'name'  : '愛睡在一起',
		'cover' : '03.jpg'
	}, {
		'name'  : '玩命快遞：肆意橫行',
		'cover' : '04.jpg'
	}, {
		'name'  : '關鍵救援：巴士657',
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