$(function () {
    scrollChangeColor();
    intervaltime();
});


function scrollChangeColor() {
    var $header = $("header");
    var bannerHeight = $(".top_Banner").height();
    $(window).scroll(function () {
        var alpha = $(document.body).scrollTop() / bannerHeight;
        console.log(alpha);
        if (alpha > 0.8) {
            alpha = 0.8;
        }
        $header.css("background", "rgba(201,21,35," + alpha + ")");
    })
}

function intervaltime() {
    var alltime = 5 * 60 * 60;
    var $lis = $(".clock li");
    console.log($lis);
    var interId = setInterval(function () {
        alltime--;
        if (alltime < 0) {
            clearInterval(interId);
            alert("你来晚了，宝贝都被别人抢走了哦！");
            return;
        }
        var hour = Math.floor(alltime / 3600);
        var minute = Math.floor(alltime % 3600 / 60);
        var second = alltime % 60;

        $lis.eq(0).html(Math.floor(hour / 10));
        $lis.eq(1).html(hour % 10);
        $lis.eq(3).html(Math.floor(minute / 10));
        $lis.eq(4).html(minute % 10);
        $lis.eq(6).html(Math.floor(second / 10));
        $lis.eq(7).html(second % 10);
    },100)

}
// //  入口函数
// $(function () {
//     // 滚动改变颜色
//     scrollChangeColor();
//     // 倒计时
//     countDownTime();
// })
// //  拆分为 函数
// // 滚动改变颜色
// /*
//     1.修改布局 ，让我们滚动时 header始终在顶部
//     2.修改颜色 让header的透明度为0 rgba(201, 21, 35,0)
//     3.获取headerdom元素
//     4.获取轮播图的高度
//     5.绑定滚动事件
//      5.1获取滚动的距离 换算为 0-1的值
//       5.2 滚动距离 / 轮播图的高度  = 0-1的值
//       5.3 可能会大于1 最大只能到 0.8
//       5.4 修正的值 如果大于0.8 改回0.8即可
//       5.5 改变header的透明度
// */
// function scrollChangeColor() {
//     // 获取header元素 返回的是jQuery对西昂
//     var $header = $('header');
//     // 获取轮播图的高度
//     var bannerHeight = $('.jd-banner').height();
//     // 滚动事件
//     $(window).scroll(function () {
//         // 计算透明度
//         var alpha = $(document.body).scrollTop() / bannerHeight;
//         // 修正透明度的值
//         if (alpha > 0.8) {
//             alpha = 0.8;
//         }
//         // 设置给背景色
//         $header.css('backgroundColor', ' rgba(201, 21, 35,' + alpha + ')');
//     })
// }
// // 倒计时
// /*
//   1.使用定时器来实现 一直倒计时的效果

//   2. 定义总的时间
//   3. 获取需要修改的 li标签
//   3. 定时器中
//     递减总时间
//     判断是否倒计时结束
//       关闭定时器
//       提示用户
//       return
//     修改页面的显示效果 修改 倒计时的li标签的内容
//     真是的网站中 倒计时 会更为紧张一些 其实就是 定时器执行的时间间隔 更短一些即可
// */
// function countDownTime() {
//     // 总时间
//     var totalSec = 4 * 60 *60;
//     // 获取需要修改的li标签--jQuery对象中
//     var $liList = $('.clock li');

//     // 定时器
//     var interId =setInterval(function(){
//         // 递减时间
//         totalSec --;

//         // 判断是否倒计时结束
//         if(totalSec<0){
//             clearInterval(interId);
//             // 提示用户
//             alert('哥们，618没了，还有双11.你的钱包还好吗？');
//             // 跳出
//             return;
//         }
//         // 格式化时间 3888 / 3600 = 1.x
//         var hour =Math.floor(totalSec/3600);
//         // 分 3888 %3600 = 288 / 60 =4.x
//         var minute = Math.floor(totalSec%3600/60);
//         // 秒 3888 % 3600 %60   3800 %60  
//         var second = totalSec % 60;
//         console.log(hour+'|'+minute+'|'+second);

//         // 设置给li标签
//         // 为了使用方便 使用 .eq方法 获取 返回的时 jQuery对象
//         // console.log($liList.eq(0));
//         // [0]虽然能够获取dom元素 但是 返回的时 dom对象
//         // console.log($liList[0]);
//         // 小时的 十位  29 / 10 = 2.x
//         $liList.eq(0).html(Math.floor(hour/10));
//         // 小时的个位
//         $liList.eq(1).html(hour%10);
//         // 分的 十位  29 / 10 = 2.x
//         $liList.eq(3).html(Math.floor(minute/10));
//         // 分的个位
//         $liList.eq(4).html(minute%10);
//         // 秒的 十位  29 / 10 = 2.x
//         $liList.eq(6).html(Math.floor(second/10));
//         // 秒的个位
//         $liList.eq(7).html(second%10);
//     },1000)

// }