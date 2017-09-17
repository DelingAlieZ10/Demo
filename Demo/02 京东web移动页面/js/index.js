window.onload = function(){
    scrollChangeColor();
    secondKilltime();
}

function scrollChangeColor(){
    var headerDom = document.querySelector("header");
    var bannerHeight = document.querySelector(".top_Banner").offsetHeight;
    window.onscroll =function(){
        var alpha = document.body.scrollTop / bannerHeight;
        console.log(alpha);
        if(alpha > 0.8){
            alpha = 0.8;
        }
        headerDom.style.background = "rgba(201,21,35,"+alpha+")";
        }
}



function secondKilltime(){
    var alltime = 5* 60*60;
    var lis = document.querySelectorAll(".click li");
    var intervalId = setInterval(function(){
        alltime--;
        if(alltime < 0){
            clearInterval(intervalId);
            alert("手速慢了哦，下次再来吧！");
            return;
        }
        var hour = Math.floor(alltime/3600);
        var minute =　Math.floor(alltime%3600/60);
        var second = alltime%60;

        lis[0].innerHTML=Math.floor(hour/10);
        lis[1].innerHTML=hour%10;
        lis[3].innerHTML=Math.floor(minute/10);
        lis[4].innerHTML=minute%10;
        lis[6].innerHTML=Math.floor(second/10);
        lis[7].innerHTML=second%10;

    },1)
}