//比价第三个页面
//给三个橙色按钮注册点击事件
$('.jlq-goodsinfo').on('click', '.jlq-goodstab li', function() {
    $(this).addClass('cur').siblings().removeClass('cur');
})

/**
 * 封装一个渲染商品详情的函数
 */
goodsinfo()

function goodsinfo() {
    var productId = window.location.search.substr(2);
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getproduct',
        data: {
            productid: productId
        },
        success: function(data) {
            console.log(data.result[0]);
            var result = template('info-head', data.result[0]);
            $('.jlq-goodsmenu').after(result);
            $('#secondtab').attr('href', 'jlq-goodslist.html?=' + data.result[0].categoryId + '');
            $('#special').html(data.result[0].productName);
            var cateId = data.result[0].categoryId;
            // console.log(cateId);
            $.ajax({
                url: 'http://139.199.192.48:9090/api/getcategorybyid',
                data: {
                    categoryid: cateId
                },
                success: function(data) {
                    // console.log(data);
                    $('#secondtab').html(data.result[0].category)
                }
            })
        }
    })
}

/**
 * 评论函数
 */
goodscomment()

function goodscomment() {
    var productId = window.location.search.substr(2);
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getproductcom',
        data: {
            productid: productId
        },
        success: function(data) {
            // console.log(data);
            var result = template('jlq-goodscomment', data);
            $('.jlq-more').before(result);
        }
    })
}