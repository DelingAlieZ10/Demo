/**
 * Created by QQ on 2017/6/4.
 */

jQuery(function () {
    setInterval(function () {
        $(".slidedown").animate({
            bottom: 20,
            opcity: 0.4
        }, 600).fadeOut(400);
        $(".slidedown").css({
            bottom: 80,
            opcity: 1
        }).fadeIn(400);
    }, 1400);
    setInterval(function () {
        //吓人的1
        $(".xiarende").animate({
            height: 700
        }, 3000, function () {
            $(".xiarende").animate({
                height: 800
            }, 3000);
        });
        //吓人的2
        $("#ceng2 .xiarende2").animate({
            left: 320,
            bottom: 0,
            width: 800
        }, 3000);
        $("#ceng2 .xiarende2").animate({
            left: 280,
            bottom: -40
        }, 3000);
    }, 6000);
    //第三页，点击切换TAB栏
    $("#ceng3-h3 span:first").on("click", function () {
        $(".pic").css({
            display: "block"
        }).next().css({
            display: "none"
        })
    })
    $("#ceng3-h3 span:last").on("click", function () {
        $(".pic").css({
            display: "none"
        }).next().css({
            display: "block"
        })
    })
    //第四页轮播图效果
    var nowing = 0
//            第一步、布局12个数字
    $(".maonimen p").each(function () {
        var x = $(this).index() % 4 * 160;
        var y = parseInt($(this).index() / 4) * 120;
        $(this).css({
            "left": x,
            "top": y,
            "background-position": (-x) + "px " + (-y) + "px"
        });
    })
//            第二步、写动画函数
    function dong() {
        //过渡动画
        $(".maonimen p").css("transition", "all 1s ease 0s");
        $(".maonimen").addClass("fei");
        $(".zhentu img").attr({
            src: "../images/" + nowing + ".jpg"
        });

        setTimeout(function () {
            //去掉过渡
            $(".maonimen p").css("transition", "none");
            $(".maonimen p").css("background-image", "url(../images/" + nowing + ".jpg)");
            //我们准备下一张图
            $(".maonimen").removeClass("fei");
        }, 1000);

    }

//            第三步、注册事件
    $(".rightbut").on("click", function () {
        if (nowing < 4) {
            nowing++;
        } else {
            nowing = 0;
        }
        dong();
    })
    $(".leftbut").on("click", function () {
        if (nowing > 0) {
            nowing--;
        } else {
            nowing = 4;
        }
        dong();
    })
})

