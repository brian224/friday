(function(c,a,d,e){var b={Factory:{W:$(c),D:$(a),HB:$("html , body"),H:$("html"),B:$("body"),Location:$(".m-nav .location"),MNavMenuList:$(".m-nav-menu .list"),MainContent:$(".main-content"),LContent:$(".l-content"),LContentData:$(".l-content").data("location"),Device:/Android|webOS|iPad|BlackBerry/i,IOS:/iPhone|iPad|iPod/i,UserAgent:null,Dynamic:null,OS:null,GaLabel:"",GetUserAgent:function(){var f=this;if(f.W.width()<768){f.UserAgent="Mobile"}else{if(f.Device.test(navigator.userAgent)){f.UserAgent="Tablet"}else{f.UserAgent="PC"}}if(navigator.userAgent.indexOf("MSIE 10")>0||!!navigator.userAgent.match(/Trident.*rv\:11\./)){f.UserAgent="IE"}else{if(navigator.userAgent.indexOf("MSIE 8")>0||navigator.userAgent.indexOf("MSIE 9")>0){f.UserAgent="IE89"}}f.OS=f.UserAgent!=="PC"?(/iPad|iPhone|iPod/i.test(navigator.userAgent)?"IOS":"Android"):null;f.Dynamic=f.Device.test(navigator.userAgent)?"webkitAnimationEnd webkitTransitionEnd":"animationend transitionend"},Menu:{Init:function(){b.Factory.Location.text(b.Factory.LContentData);if(b.Factory.UserAgent==="Mobile"){$(".m-nav-menu .friday .link").attr("href","//video.friday.tw/m/sn");if(b.Factory.LContent.hasClass("getcode")){$(".slogan .link").attr("href","//video.friday.tw/m/sn")}}if(b.Factory.LContent.hasClass("index")){b.Factory.GaLabel="A"}else{if(b.Factory.LContent.hasClass("game")){b.Factory.GaLabel="B"}else{if(b.Factory.LContent.hasClass("getcode")){b.Factory.GaLabel="C"}else{if(b.Factory.LContent.hasClass("action")){b.Factory.GaLabel="D"}}}}$(".jq-menu").attr("ga_label","menu_"+b.Factory.GaLabel);b.Factory.MNavMenuList.each(function(){var h=$(this),g=h.find(".link"),f=h.index();if(f===0){g.attr("ga_label","menu_"+b.Factory.GaLabel+"_home")}else{if(f===1){g.attr("ga_label","menu_"+b.Factory.GaLabel+"_activity")}else{if(f===2){g.attr("ga_label","menu_"+b.Factory.GaLabel+"_Richart")}else{if(f===3){g.attr("ga_label","menu_"+b.Factory.GaLabel+"_luckdraw")}else{if(f===4){g.attr("ga_label","menu_"+b.Factory.GaLabel+"_friDay")}}}}}})},Click:function(g,f){$(f).parents(".m-nav").toggleClass("is-active")}},MovieLoad:function(){var g="";for(var f=0;f<Datas.length;f++){g+='<div class="list">';g+='	<span class="img-wrap">';g+='		<img src="/Content/img/index/cover/'+Datas[f].cover+'?img=20160421" alt="'+Datas[f].name+'">';g+="	</span>";g+='	<em class="movie-name">'+Datas[f].name+"</em>";g+="</div>"}$(".js-movies").html(g);b.Factory.OwlCarousel.Init()},OwlCarousel:{Init:function(){var f=this;if($(".jq-owl-slide").length!==0){f.Setting($(".jq-owl-slide .movie-list"))}},Setting:function(f){f.siblings(".pagination").remove();f.owlCarousel({items:parseInt(f.data("items"),10),nav:(f.data("nav")===true)?true:false,navText:f.data("navtext")?f.data("navtext").split(","):["",""],navClass:f.data("navclass")?f.data("navclass").split(","):["",""],navContainer:f.data("navcontainer"),navContainerClass:f.data("navcontainerclass"),loop:(f.find(".list").length>1)?((f.data("loop")===true)?true:false):false,dots:(f.data("dots")===true)?true:false,autoplay:(f.data("autoplay")===true)?true:false,autoplayTimeout:5000,autoplayHoverPause:true,dotsContainer:f.data("dotscontainer"),mouseDrag:true,slideBy:3})}},Slideshow:function(){if(b.Factory.UserAgent==="IE89"){var f=$(".award-list .list"),g=0;f.eq(g).addClass("is-show");setInterval(function(){if(g===f.length-1){g=0}else{g+=1}f.eq(g).addClass("is-show").siblings().removeClass("is-show")},1500)}},Checked:{OpenChecked:function(){if(b.Factory.IOSChrome()){alert("請使用 iOS Safari 開啟此活動網站，以免導致轉轉賺翻天抽獎無法正常運作，謝謝您的配合。")}}},FB:{UserID:null,UserEMail:null,Init:function(){c.fbAsyncInit=function(){FB.init({appId:628830867268760,status:true,cookie:true,xfbml:true,version:"v2.5"})};(function(i,f,j){var h,g=i.getElementsByTagName(f)[0];if(i.getElementById(j)){return}h=i.createElement(f);h.id=j;h.src="//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.5&appId=628830867268760";g.parentNode.insertBefore(h,g)}(a,"script","facebook-jssdk"))},GetLoaginState:function(g){var f=this;$(".btn-start").addClass("b-cloak disable");b.Factory.MainContent.addClass("loading");FB.getLoginStatus(function(h){if(h.authResponse){f.UserID=h.authResponse.userID;b.Factory.Play.Click(f.UserID,f.UserEMail)}else{f.Login(g)}})},Login:function(g){var f=this;FB.login(function(h){if(h.authResponse){f.UserID=h.authResponse.userID;b.Factory.Play.Click(f.UserID,f.UserEMail)}else{alert("須同意應用程式");$(".btn-start").removeClass("b-cloak disable");b.Factory.MainContent.removeClass("loading")}},{scope:"email"})}},Play:{Ul:$(".award-list"),List:$(".award-list .list"),Wording:$(".get-award"),BtnLink:$(".btn-link"),Check:false,Award:null,End:null,I:0,Speed:50,Click:function(g,f){var h=this;b.Factory.MainContent.removeClass("loading");if(h.Check===false){h.Check=true;h.Loop();$.ajax({type:"POST",url:"//"+c.location.host+"/api/lottery",data:{fbid:g,email:""},dataType:"json",success:function(i){if(i.prize==="180"){h.End=0}else{if(i.prize==="60"){h.End=6}else{if(i.prize==="37"){h.End=3}}}h.Award=i.prize;sessionStorage.setItem("award",h.Award);sessionStorage.setItem("serial",i.serial);sessionStorage.setItem("ACT_NO",i.ACT_NO)}})}},Loop:function(){var g=this;var f=setTimeout(function(){g.I+=1;if(g.I===g.List.length-1){g.I=-1}if(g.I===g.End){g.Speed=g.Speed*2.5;if(g.Speed>700&&g.I===g.End){g.Ul.addClass("is-shine");g.Finish()}else{g.Loop()}}else{g.Loop()}g.List.eq(g.I).addClass("is-show").siblings().removeClass("is-show")},g.Speed)},Finish:function(){var f=this;f.Wording.text(f.Award+"天免費看");if(b.Factory.UserAgent==="IE"){f.Ul.delay(0).queue(function(){$(this).addClass("is-shine").dequeue()}).delay(350).queue(function(){$(this).removeClass("is-shine").dequeue()}).delay(350).queue(function(){$(this).addClass("is-shine").dequeue()}).delay(350).queue(function(){$(this).removeClass("is-shine").dequeue()}).delay(350).queue(function(){$(this).addClass("is-shine").dequeue()}).delay(350).queue(function(){$(this).removeClass("is-shine").dequeue()}).delay(350).queue(function(){$(this).addClass("is-shine").dequeue()}).delay(350).queue(function(){$(this).removeClass("is-shine").dequeue()});b.Factory.HB.animate({scrollTop:f.BtnLink.offset().top});$(".main-content-bd").addClass("show-result")}else{if(b.Factory.UserAgent==="IE89"){f.Ul.removeClass("is-shine");b.Factory.HB.animate({scrollTop:f.BtnLink.offset().top});$(".main-content-bd").addClass("show-result")}else{f.Ul.delay(3200).queue(function(){f.Ul.removeClass("is-shine")});b.Factory.HB.animate({scrollTop:f.BtnLink.offset().top});$(".main-content-bd").addClass("show-result")}}}},GetSession:{serial:$(".serial"),award:$(".award"),money:$(".money"),ACT_NO:$(".ACT_NO"),Init:function(){var i=this,h=sessionStorage.getItem("serial")||"",g=sessionStorage.getItem("ACT_NO")||"",f=sessionStorage.getItem("award")||"";i.serial.text(h);i.award.text(f);i.ACT_NO.val(g);if(f==="37"){i.money.text("領NT$300")}}},Submit:function(g,f){},PrivateMode:{Init:function(){if(b.Factory.UserAgent!=="IE"&&b.Factory.UserAgent!=="IE89"){if(typeof(FB)==="undefined"){alert("提醒您，您目前正在使用私密瀏覽模式，請關閉此模式，以免導致轉轉賺翻天抽獎無法正常運作，謝謝您的配合。")}try{localStorage.test=2}catch(f){alert("提醒您，您目前正在使用私密瀏覽模式，請關閉此模式，以免導致轉轉賺翻天抽獎無法正常運作，謝謝您的配合。")}}}},IOSChrome:function(){if(b.Factory.IOS.test(navigator.userAgent)&&navigator.userAgent.toLowerCase().split("version/")[1]===e){return true}else{return false}},Validate:{FormElement:$("form"),Init:function(){var f=this;f.FormElement.find(".input-box").each(function(){$(this).on("focusout",function(){if($(this).parent().hasClass("required")){f.Required($(this))}})})},Click:function(f){var g=this;g.FormElement.find(".input-box").each(function(){if($(this).parent().hasClass("required")){g.Required($(this))}})},Required:function(f){var g=this;if($(f).val()===""||$(f).val()===$(f).attr("placeholder")){$(f).parent().addClass("error").find(".warning").text($(f).parent().data("empty"))}else{$(f).parent().removeClass("error");if($(f).parent().hasClass("cust-id")){if(g.CheckID($(f),$(f).val())){$(f).parent().removeClass("error")}else{$(f).parent().addClass("error").find(".warning").text($(f).parent().data("error"))}}else{if($(f).parent().hasClass("phone-num")){g.CheckTel($(f),$(f).val())}else{if($(f).parent().hasClass("email")){g.CheckMail($(f),$(f).val())}}}}},CheckID:function(g,n){var p=new Array("A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","X","Y","W","Z","I","O");var q=new Array(1,9,8,7,6,5,4,3,2,1);var j=new Array(2);var l=0;var o=/^[a-z](1|2)\d{8}$/i;var f,m,h;if(n.search(o)==-1){console.log(0);return false}else{f=n.charAt(0).toUpperCase();h=n.charAt(9)}for(var k=0;k<26;k++){if(f===p[k]){m=k+10;j[0]=Math.floor(m/10);j[1]=m-(j[0]*10);break}}for(var k=0;k<q.length;k++){if(k<2){l+=j[k]*q[k]}else{l+=parseInt(n.charAt(k-1))*q[k]}}if((10-(l%10))!==parseInt(h,10)){return false}return true},CheckTel:function(f,g){if(/^09[0-9]{8}$/.test(g)){$(f).parent().removeClass("error")}else{$(f).parent().addClass("error").find(".warning").text($(f).parent().data("error"))}},CheckMail:function(g,f){var h=f.split("@");if(h.length===1||h[0]===""||h[1]===""){$(g).parent().addClass("error").find(".warning").text($(g).parent().data("error"))}else{$(g).parent().removeClass("error")}}},Box:{Open:function(){var f=this;b.Factory.B.addClass("show-box");f.OffClick()},Close:function(){b.Factory.B.removeClass("show-box")},OffClick:function(){var f=this;b.Factory.D.on("click",function(g){g.stopPropagation();if(!d(g.target).is(".m-lightbox , .m-lightbox * , .jq-submit , .jq-submit *")){f.Close()}})}}}};if(!c.Projects){c.Projects=b}else{c.Projects=$.extend({},c.Projects,b)}}(window,document,$));