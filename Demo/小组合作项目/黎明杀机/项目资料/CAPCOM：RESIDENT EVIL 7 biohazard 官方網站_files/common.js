var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

$(function() {
	$(".lang .btnSelect").click(function(){
		$(this).next(".langList").slideToggle();
		$(this).toggleClass("open");
	});
});

//プロダクト PC SPEC
$(function() {
	$(".btnPcSpec").click(function(){
		$(this).next(".pcSpec").fadeToggle();
		$(this).toggleClass("open");
	});
});

$(document).ready(function(){
	$(".btnVideo").colorbox({iframe:true, innerWidth:853, innerHeight:479, onClosed: function() {
		indexPage.unPause();
	}});
});

//更新リスト
var updateListOpened = false;

$(function() {
	$(".updateList .btn").click(function(){
		//$(this).parent(".updateList").animate({height: "auto"}, "slow" );
		if(updateListOpened) {
			$(this).parent(".updateList").removeClass("opend");
			$(this).parent(".updateList").addClass("closed");
		}else{
			$(this).parent(".updateList").addClass("opend");
			$(this).parent(".updateList").removeClass("closed");
		}
		updateListOpened = !updateListOpened;
		$(this).toggleClass("open");
	});


});

//ニューススライダー
var newsSlider;
var mediaSlider;
$(document).ready(function(){
	newsSlider = $('.bx-slider').bxSlider({
		minSlides: 4,
		maxSlides: 4,
		moveSlides: 4,
		slideWidth: 230,
		slideMargin: 20,
		infiniteLoop: false,
		hideControlOnEnd: true,
	})
});

// Media slider.

var mediaSlider;
var screenListCount = 0;
var firstScreenLabel = "";
$(document).ready(function(){
	
	screenListCount = $(".screenList li").length;
	firstScreenLabel = $($(".screenList li img").get(0)).data("label");
	mediaSlider = $('.screenList ul').bxSlider({
		moveSlides: 1,
		slideWidth: 700,
		slideMargin: 20,
		infiniteLoop: true,
		hideControlOnEnd: true,
		pager: false,
		minSlides: 3,
		maxSlides: 3,

        onSliderLoad:function(currentIndex){
			var index = 0;
			$("#contents .bx-viewport li").each(function() {
				
				if(index != 3) {
					$(this).find("img").animate({opacity:1},
					{
						duration:500,
						step:function(now){
							$(this).parent().css({transform:'scale(' + (1 - now*0.1)  + ')'});
						}
					})
				}
				index++;
			});
			
			$($("#contents .bx-viewport li").get(3)).stop(true).css({transform:'scale(1.0)'});
			$($("#contents .bx-viewport li").get(3)).find("img").stop(true).css({opacity:0});

			// スライド枚数更新.
			$(".count").text("1 / " + screenListCount);
			//$("#media .mediaScreen .inner .text").text(Base64.decode(firstScreenLabel));
        },
        onSlideAfter:function(slideElement, oldIndex, newIndex){
        },
        onSlideBefore: function(slideElement, oldIndex, newIndex){
			
			$("#contents .bx-viewport li").each(function() {
				$(this).find("img").stop(true).animate({opacity:1},
				{
					duration:500,
					step:function(now){
						$(this).parent().css({transform:'scale(' + (1 - now*0.1)  + ')'});
					}
				})
			});
			
			$("." + $(slideElement).attr("class")).find("img").stop(true).animate({opacity:0}, 1000);
			$("." + $(slideElement).attr("class")).stop(true).css({transform:'scale(1.0)'});
			
			// テキスト更新.
			$(".count").text((newIndex+1) + " / " + screenListCount);
			// $("#media .mediaScreen .inner .text").text(Base64.decode($(slideElement).find("img").data("label")));
        },
        onSlideNext: function(slideElement, oldIndex, newIndex){
			
        },
        onSlidePrev: function(slideElement, oldIndex, newIndex){
        }
	})
});

		
/*-------------------------------------
  gotop
-------------------------------------*/
$.easing.quart = function (x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
};
 
$(document).ready(function() {
	$("#pagetop").hide();

	$(window).scroll(function () {
		if ($(this).scrollTop() > 150) {
			$('#pagetop').fadeIn();
		} else {
			$('#pagetop').fadeOut();
		}
	});

	$('#pagetop a').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 1000, 'quart');
		return false;
	});
	
});

function setUpLazy() {

    // 遅延表示
    var lazys = $('.lazy,.lazyStep');
    $(window).scroll(function(){
        var scrolledAreaBottom = $(window).scrollTop() + $(window).height();
        lazys.each(function(){
            if ($(this).hasClass("lazyAnimated") || $(this).is(':animated')) {
                return;
            }
            var elmShowLine = $(this).offset().top + ($(this).height() * 0.55);
            if (scrolledAreaBottom > elmShowLine) {
                if ($(this).hasClass('lazyStep')) {
                    $(this).stop().css("padding-top","50px").delay(400).animate({opacity:1, paddingTop:0}, {duration: 800, easing: 'easeOutCubic', complete:function()					  {
                        $(this).removeClass("lazy");
                        $(this).addClass("lazyAnimated");
                    }});
                } else {
                    $(this).stop().delay(400).animate({opacity:1}, {duration: 800, easing: 'easeOutCubic', complete:function()					  {
                        $(this).removeClass("lazy");
                        $(this).addClass("lazyAnimated");
                    }});
                }
            }
        });
    });
    // 初期表示
    $(window).trigger('scroll');
}

function changeGlobalMenu(elm) {
	var lang = $(elm).val();
	if(lang == "ja") {
		location.href = "../../biohazard7/index.html";
	}else{
		location.href = "../" + lang + "/index.html";
	}
}

$(function() {
	$('.tab li').click(function() {

		var index = $('.tab li').index(this);
		$('.content li').css('display','none');
		$('.content li').eq(index).css('display','block');
		$('.tab li').removeClass('select');
		$(this).addClass('select')
	});
});