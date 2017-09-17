/**
 * Created by yuhuimin on 2017/6/4.
 */

$(function () {
    $(".nav-center>ul>li").on("mouseenter",function(e) {
        $(this).children("a").css("color", "#aaa9a9")
        $(this).children("ul").css("display", "block")
        e.stopPropagation()
        var s = $(this).position().left;
        $(".cloud").stop().animate({left: s-20},400)
        $(".cloud").css({display:"block"})
    })
    $(".nav-center>ul>li").on("mouseleave",function(){
        $(this).children("a").css("color","#fff")
        $(this).children("ul").css("display","none")
        $(".cloud").css({
            display :"none"
        })
    })
    $(".nav-center>ul>li").on("mouseme")
//           分享处字体图标效果
    $(".nav-center>ul>li>span>a").on("mouseenter",function(){
        $(this).children("i").css("color","#aaa9a9")

    })
    $(".nav-center>ul>li>span>a").on("mouseleave",function(){
        $(this).children("i").css("color","#fff")

    })
})
