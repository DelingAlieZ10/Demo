/**
 * Created by QQ on 2017/6/3.
 */
$(function () {
    var num = 0;
    setInterval(function () {
        if (num <= 90) {
            $(".text span").text(num);
            num += Math.ceil(Math.random() * 10);
            $(".text img").animate({
                left: Math.ceil(num * 291 / 100 - 17)
            }, 200)
            console.log(num * 291 / 100 - 17);
        } else {
            $(".text span").text(100);
            $(".text img").css("left", 291 - 17);
            setTimeout(function () {
                window.location.href = "https://www.baidu.com";
            }, 500)
        }
    }, 200)
})