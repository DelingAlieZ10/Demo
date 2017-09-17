/**
 * Created by luohang on 2017/6/3.
 */
$(function () {
    textOne();
    function textOne() {
        $('.dbd-com').animate({
            opacity: 0.5
        }, 500, function () {
            $('.dbd-com').animate({
                opacity: 1
            }, 500, function () {
                textOne();
            })
        })
    }

    textTwo();
    function textTwo() {
        $('.buttom-red').animate({
            //'border':'2px solid hotpink',
            'fontSize': '18px',
            'fontWidth': 900
        }, 500, function () {
            $('.buttom-red').animate({
                'color': 'white',
                'fontSize': '12px',
                //'fontWidth':400
            }, 500, function () {
                textTwo();
            })
        })
    }

    //var changeOne = $('.dbd-realfooter-left');
    //var changeTwo = $('.dbd-realfooter-center');
    $('.buttom-red').hover(function () {
        $('.footer-bglogo').stop().animate({
            'opacity':1
        },2000)
    }, function () {
        $('.footer-bglogo').stop().animate({
            'opacity':0
        },2000)
    })

// ” œ‰µÿ÷∑—È÷§
    var regEmail = /[^\w\-\.]+\@[\w]+\.[\w]{2,4}$/;
    var inputOne = $('.footer-right-top input:first');
    //check(inputOne,regEmail);
    //function check(inp, reg) {
        inputOne.on('blur', function () {
            if (regEmail.test(this.value)||this.value=='') {
                $('.footer-right-top span').css({
                    'opacity': 0
                })
            } else {
                $('.footer-right-top span').css({
                    'opacity': 1
                })
            }
        })
    //}
})
