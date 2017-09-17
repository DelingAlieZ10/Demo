/**
 * Created by QQ on 2017/7/3.
 */
$(function () {

    //初始化获取数据渲染页面=======================================
    //商店列表
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getgsshop',
        success: function (data) {
            console.log(data);
            var li = template('mod1', data);
            $('#company1').append(li);
            $('#company1').children().eq(0).addClass('active');
        }
    })
    // 地区列表
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getgsshoparea',
        success: function (data) {
            console.log(data);
            var li = template('mod2', data);
            $('#company2').append(li);
            // console.log(li);
            $('#company2').children().eq(0).addClass('active');
        }
    })
    /**
     * 商品列表加载
     * @param shopid
     * @param areaid
     */
    function productLoad(shopid, areaid) {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getgsproduct',
            data: {
                shopid: shopid,
                areaid: areaid
            },
            success: function (data) {
                //判断是哪一家网站
                var href;
                if (shopid == 0) {
                    href = "https://m.jd.com/";
                } else if (shopid == 1) {
                    href = "http://m.yhd.com/1/?tracker_u=10449911441&cityId=1";
                } else if (shopid == 2) {
                    href = "https://chaoshi.m.tmall.com/?from=zebra:offline";
                }
                for (key in data.result) {
                    data.result[key].href = href;
                }
                // 添加渲染
                var pros = template('mod3', data);
                $('.productList').html(pros);
            }
        })
    }


    //初始加载商品列表
    productLoad(0, 0);


    //导航栏绑定点击事件
    $('.nav').on('click', 'a', function () {
        if ($(this).children('i').hasClass('glyphicon-triangle-bottom')) {
            $('.nav .left').find('i').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
            $(this).children('i').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
        } else {
            $(this).children('i').addClass('glyphicon-triangle-bottom').removeClass('glyphicon-triangle-top');
        }
        ;
        var idcurrent = $(this).attr('data-target');
        if ($("#" + idcurrent).hasClass('current')) {
            $("#" + idcurrent).removeClass('current');
        } else {
            $('.nav').find('ul').removeClass('current');
            $("#" + idcurrent).addClass('current');
        }
    })
    //下拉框绑定点击事件
    $('.nav ul').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })


    // 第一页绑定事件===================
    $('#company1').on('click', 'li', function () {
        //隐藏
        $(this).parent().removeClass('current');
        // 替换
        $('.nav .item:nth-of-type(1) a')
            .html($(this).text() + '<i class="glyphicon glyphicon-triangle-bottom company"></i>');
        //更换数据
        productLoad($(this).attr('shopId'), $('#company2 li.active').attr('areaId'));
    })


    //第二页绑定事件
    $('#company2').on('click', 'li', function () {
        //隐藏
        $(this).parent().removeClass('current');
        // 替换
        $('.nav .item:nth-of-type(2) a')
            .html($(this).text().slice(0, 2) + '<i class="glyphicon glyphicon-triangle-bottom company"></i>');
        //更换数据
        productLoad($('#company1 li.active').attr('shopId'), $(this).attr('areaId'));
    })


    //第三页绑定事件
    $('#company3').on('click', 'li', function () {
        //隐藏
        $(this).parent().removeClass('current');
        productLoad(Math.floor(Math.random() * 3), Math.floor(Math.random() * 7));
        $('.nav .item:nth-of-type(3) a')
            .html($(this).text() + '<i class="glyphicon glyphicon-triangle-bottom company"></i>');
    })


    //第四页绑定事件
    $('#company4').find('a').on('click', function () {
        $(this).addClass('nowColor').siblings().removeClass('nowColor');
        console.log($(this));
        productLoad(Math.floor(Math.random() * 3), Math.floor(Math.random() * 7));
        $('#company4').find('input').val('');
    })

    // 触底再次加载
    var flag = true;
    $(window).scroll(function () {
        // console.log($(this).scrollTop());
        // console.log($('.productList').height());
        // console.log($(this).height());
        if ($('.productList').height() - $(this).scrollTop() < $(this).height() && flag) {
            flag = false;
            var shopid = Math.floor(Math.random() * 3),
                areaid = Math.floor(Math.random() * 7)
            $.ajax({
                url: 'http://139.199.192.48:9090/api/getgsproduct',
                data: {
                    shopid: shopid,
                    areaid: areaid
                },
                success: function (data) {
                    //判断是哪一家网站
                    var href;
                    if (shopid == 0) {
                        href = "https://m.jd.com/";
                    } else if (shopid == 1) {
                        href = "http://m.yhd.com/1/?tracker_u=10449911441&cityId=1";
                    } else if (shopid == 2) {
                        href = "https://chaoshi.m.tmall.com/?from=zebra:offline";
                    }
                    for (key in data.result) {
                        data.result[key].href = href;
                    }
                    // 添加渲染
                    var pros = template('mod3', data);
                    $('.productList').append(pros);
                    //完成后重新标记
                    flag = true;
                }
            })
        }
        if ($(this).scrollTop() >= 888) {
            $('#toTop').addClass('xiaoshi');
        }
    })

    //回到顶部====================================
    $('#toTop').click(function () {
        $('html body').animate({scrollTop: 0}, 500);
        setTimeout(function () {
            $("#toTop").removeClass('xiaoshi');
        }, 600);
    })

})