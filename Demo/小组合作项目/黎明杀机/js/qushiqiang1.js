/**
 * Created by QQ on 2017/6/3.
 */
$(function () {
    setInterval(function () {
        $(".bg_main").animate({
            opacity: 0.8
        }, 1000).animate({
            opacity: 1
        }, 1000)
    }, 2000)

    $(".enter").on("mouseenter", function () {
        $(this).css("background", "#ef7800").find("a").css("color", "#fff").find("a:after").css("color", "#fff");
    }).on("mouseleave", function () {
        $(this).css("background", "").find("a").css("color", "#ef7800").find("a:after").css("color", "#ef7800");
    })
    //设置语言选择变更入口

    setInterval(function () {
        if ($(".language_sel option:selected").index() != 0 && $(".language_sel option:selected").index() != 2 && $(".language_sel option:selected").index() != 1) {
            $(".enter a").text("瞅啥呢，快进来");
        } else {
            $(".enter a").text("ENTER");
        }
    }, 1000)

})
