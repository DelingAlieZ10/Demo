/**
 * Created by user on 2017/6/5.
 */
$(function(){
    $(".img-all").hover(function () {
        $(this).find(".bg-imgJ").stop().animate({
            width: 244,
            height: 158,
            marginLeft:-122,
            marginTop:-79,
            opacity:0.3
        },1000)
    }, function () {
        $(this).find(".bg-imgJ").stop().animate({
            width: 0,
            height: 0,
            marginLeft:0,
            marginTop:0,
            opacity:0
        },300)
    })

})