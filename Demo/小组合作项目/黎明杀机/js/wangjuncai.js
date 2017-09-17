/**
 * Created by wangxiaosao on 6/3/17.
 */

$(function () {
    $('.sliderW .main li').eq(0).css('opacity', 1).siblings().css('opacity', 0);
    $('.sliderW .dot li').eq(0).css('backgroundColor','#fff');
    // 自动轮播效果
    var index = 0,
        num = 1,
        timer = null;

    function playAuto() {
        if (index < 6) {
            index++;
        } else {
            index = 0;
        }
        num++;
        $('.sliderW .main li').eq(index).css('zIndex', num);

        $('.sliderW .main li').eq(index).animate({opacity: 1}, 2000).siblings().animate({opacity: 0});

    }

    // 开启自动轮播
    timer = setInterval(playAuto, 2000);
    // dot 圆点同步函数
    function dotChange(obj) {
        obj.css({
            // borderWidth: '0px',
            borderColor:'#fff',
            backgroundColor: '#fff'
            // width:'18px',
            // height:'18px'
        }).siblings().css({
            borderWidth: '2px',
            borderColor: '#eee',
            backgroundColor: '#7d7d7d'
        });
    }
    // 鼠标悬停停止自动轮播
    $('.sliderW').on('mouseenter', function () {
        clearInterval(timer);
        dotChange($('.sliderW .dot').show().children().eq(index));
    });
    $('.sliderW').on('mouseleave', function () {
        timer = setInterval(playAuto, 2000);
        $('.sliderW .dot').hide();
        console.log($('.sliderW .dot li').eq(index));
    });

    // 小圆点导航轮播效果
    $('.sliderW .dot li').on('click', function () {
        num++;
        dotChange($(this));
        $('.sliderW .main li').eq($(this).index()).animate({opacity: 1}, 300).css('zIndex', num).siblings().animate({opacity: 0});

    })
    //内部span 标签移入变亮
    $(".buy_1").hover(function(){
        $(this).css({
            backgroundColor:"rgba(255,255,255,0.85)",
            color:"#000"
        });
    },function(){
        $(this).css({
            backgroundColor:"rgba(170,1,1,0.75)",
            color:"#fff"
        })
    })
    $(".buy").hover(function(){
        $(this).css({
            backgroundColor:"rgba(255,255,255,0.85)",
            color:"#000"
        });
    },function(){
        $(this).css({
            backgroundColor:"rgba(0,0,0,0.85)",
            color:"#fff"
        })
    })
    $(".readme").hover(function(){
        $(this).css({
            backgroundColor:"rgba(255,255,255,0.85)",
            color:"#000"
        });
    },function(){
        $(this).css({
            backgroundColor:"rgba(0,0,0,0.85)",
            color:"#fff"
        })
    })
});