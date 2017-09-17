/**
 * Created by dl151 on 0003 2017.06.03.
 */

$(function(){

    //鼠标移入改变背景图的宽度
    $(".devdiarycl").hover(function (){
        $(this).stop().animate({
            width:744
        },300).siblings().stop().animate({
            width:125
        },300);

        //改变devdiarycltitle的位置
        $(this).children(".devdiarycltitle").stop().animate({
            marginLeft:300,
            height:200
        },300);

        //添加遮罩层
        $(this).children(".cboxElement").css({
            display:"block"
        })

    },function(){
        $(".devdiarycl").stop().animate({
            width:249
        },300);

        //改变...
        $(this).children(".devdiarycltitle").stop().animate({
            marginLeft:12,
            height:88
        },300);

        //添加遮罩层
        $(this).children(".cboxElement").css({
            display:"none"
        })

    })

    //把字体转换为大写
//    var case1 = $(".devdiarycltitle,span,span b").text();
//    console.log(case1)
//
//console.log(case1.toLocaleUpperCase())

    //点击弹出视频播放器
    $(".cboxElement").on("click",function(){
        $(".movie480").css({
           "display":"block"
       });
    })
    $(".movie480 span").on("click", function () {
        $(".movie480").stop().hide();
        $("#myvideoD")[0].pause();
    })
})