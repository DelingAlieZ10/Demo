$(function () {
    var data = [
        {
            'right': 0,
            'top': 310,
            'opacity':1
        },
        {
            'right': 0,
            'top': 20,
            'opacity': 0.8
        },
        {
            'right': 20,
            'top': 200,
            'opacity':1
        }
    ];
    var pdata = {
        'one': '<h3><img src="images/dbd-newslider-title1.png" alt=""></h3><p style="margin-top: 30px;">Four real humans try to escape another who plays an unstoppable killer.</p><h5>A Deadly Hunt</h5> <p>Hunt down and slaughter survivors as they scramble to escape.</p><h5>FEAR IS REAL</h5> <p>Team up with your friends and equip your loadout to try and escape the killer before he gets you.</p> <h5>THE SMARTEST PREY</h5> <p> Outwit, out-think and outmaneuver the killer to stay ahead of the game.</p> <p style="margin-left: 300px;margin-top: 30px">[haipa害怕]</p>',

        'two': '<h3 style="margin-top: 100px;"><img src="images/dbd-newslider-title2.png" alt=""></h3><p style="margin-top: 40px;">Dead by Daylight is both an action and survival horror game where you can play as either side.</p><h5>PREDATOR AND PREY</h5> <p>Both sides see the world differently. The killer stalks in 1st person using power and speed. The survivors are in 3rd person with better awareness and agility.</p><h5>DUELING CO-OPERATION</h5><p>Dead by Daylight encourages co-operation that creates emergent strategies.</p><p style="margin-left: 300px;margin-top: 30px">[fchaipa非常害怕]</p>',
        'three':'<h3><img src="images/dbd-newslider-title3.png" alt=""></h3><p style="margin-top: 40px;">The game features killers and victims in procedurally generated locations that are never the same twice.</p><h5>THE FEAR OF THE UNKNOWN</h5><p>Each level is procedurally generated ensuring survivors never know where they are, what they are facing or where the objectives are hidden.</p><h5>MULTIPLE KELLERS</h5><p>Every killer brings their own unique skill and ability to the game. Survivors must learn and adapt if they are going to live.</p><h5>PURE HORROR</h5><p>Dead by Daylight is a game that mixes killers from all horror genres, from brutal slashers to terrifying paranormal entities and psychopathic maniacs.</p><p style="margin-left: 300px;margin-top: 30px">[bzhaipa不再害怕]</p>'
    };
    var timer = null;
    var b = 0;
    var flag = false;
    var jishi = 0;
    //鼠标移入显示小圆点
    $(".showLunbo").on("mouseenter", function () {
        $(".square i").animate({
            'opacity':1
        },1000);
    })
    //鼠标离开隐藏
    $(".showLunbo").on("mouseleave", function () {
        $(".square i").animate({
            'opacity':0
        },1000);
    })

    //定时器开启
    timer = setInterval(function () {
        if(flag){
            jishi = b;
            flag = false;
        }
        if(jishi==3){
            b = 0;
            jishi = 0;
        }
        move(jishi);
        jishi++;
        //console.log(jishi+"加了一过后");
    },3000);

    //轮播函数
    function move(a){
        var index = a;

        // 小 圆点背景和a同步
        $(".square i").eq(index).css({
            'backgroundImage':'url(images/kuloulogo2.jpg)'
        })
        $(".square i").eq(index).siblings().css({
            'backgroundImage':'url(images/kuloulogo1.jpg)'
        })

        $(".img_lunbo li").eq(index).stop().animate({
            'opacity': 1
        },1500)
        $(".img_lunbo li").eq(index).siblings().stop().animate({
            'opacity': 0
        },1500)

        if (index == 0) {
            $(".box_p").html(pdata.one);
            $(".box_p").css(data[0]);
            $(".box_p").hide();
            $(".box_p").fadeIn(2000);
        }
        else if(index == 1){
            $(".box_p").html(pdata.two);
            $(".box_p").css(data[1]);
            $(".box_p").hide();
            $(".box_p").fadeIn(2000);
        }
        else if (index == 2) {
            $(".box_p").html(pdata.three);
            $(".box_p").css(data[2]);
            $(".box_p").hide();
            $(".box_p").fadeIn(2000);
        }
    }
    //鼠标划过小圆点调用函数
    $(".square i").on("mouseenter", function () {
        clearInterval(timer);
        $(this).css({
            'backgroundImage':'url(images/kuloulogo2.jpg)'
        }).siblings().css({
            'backgroundImage':'url(images/kuloulogo1.jpg)'
        })
        flag = true;
        b = $(this).index();
        var i = $(this).index();
        move(i);
    })

    //鼠标离开小圆点开启定时器
    $(".square i").on("mouseleave", function () {
        timer = setInterval(function () {
            if(flag){
                jishi = b;
                flag = false;
            }
            jishi++;
            if(jishi == 3){
                b = 0;
                jishi = 0;
            }
            move(jishi);
        },3000);
    })
})
