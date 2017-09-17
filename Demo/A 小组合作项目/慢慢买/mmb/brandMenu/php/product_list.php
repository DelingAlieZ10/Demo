<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>商品列表页</title>
    <link rel="stylesheet" type="text/css" href="http://192.168.72.86/mmbuy/mmb/lib/Font-Awesome-3.2.1/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="http://192.168.72.86/mmbuy/mmb/brandMenu/scss/product_list.css" />
    <script>
        document.querySelector('html').style.fontSize = window.screen.width / 10 + 'px';
    </script>
</head>

<body>
    <div class="container">
        <div class="nav">
            <ul>
                <li>综合</li>
                <li>销量</li>
                <li>价格</li>
                <li><i class="icon-filter" aria-hidden="true"></i>筛选</li>
            </ul>
        </div>
        <div class="product-list">
            <ul class="list">
                <li>
                    <div class="left">
                        <img src="http://pro.zuyushop.com:8015/ProPic/20158/small80/Thumb_2015080010223719207.jpg" alt="">
                    </div>
                    <div class="right">
                        <h3>海信(Hisense) LED55EC520UA 55英寸 超高清4K 智能网络LED液晶电视</h3>
                        <span class="price"><i>¥</i>2999</span>
                        <footer class="clearfix">
                            <span class="quoted-price fl">8商城报价</span>
                            <span class="comment fr">有5874人评论</span>
                        </footer>
                    </div>
                </li>
            </ul>
        </div>
        <div class="jump">
            <span class="pre">上一页</span>
            <select>
                <option  class="first" value="">1/2</option>
                <option class="second" value="">2/2</option>
            </select>
            <span class="next">下一页</span>
        </div>
    </div>
</body>
<script type="text/javascript" src="http://192.168.72.86/mmbuy/mmb/lib/jQuery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="http://192.168.72.86/mmbuy/mmb/lib/template-web.js/template-web.js"></script>
<script type="text/html" id="product-list">
    {{each result}}
    <li>
        <a href="http://192.168.72.86/mmbuy/mmb/brandMenu/php/product_details.php?productId={{$value.productId}}" style='display:flex;'>
            <div class="left">
                {{#$value.productImg}}
            </div>
            <div class="right">
                <h3>{{$value.productName}}</h3>
                <span class="price">{{$value.productPrice}}</span>
                <footer class="clearfix">
                    <span class="quoted-price fl">{{$value.productQuote}}</span>
                    <span class="comment fr">{{$value.productCom}}</span>
                </footer>
            </div>
        </a>
    </li>
    {{/each}}
</script>
<script>
    $(function () {
        // 商品列表数据请求
        function getData (num){
            $.ajax({
            url: 'http://139.199.192.48:9090/api/getbrandproductlist',
            data:{
                brandtitleid:num,
                limit:10
            },
            success: function (data) {
                console.log(data);
                var result = template('product-list', data);
                $('.product-list .list').html(result);
                flag = flag?false:true;
            }
            });
        }
        getData(7);
         // 导航切换
        $('.nav li').click(function(){
            $(this).css({
                color:'red'
            }).siblings().css({
                color:'#5a5a5a'
            });
            $('.product-list .list').html('');
            if($(this).index()!=0){
                getData($(this).index()-1);
            }else{
                getData(7);
            }
        });
        var flag = true;
        // 上一页
        $('.pre').click(function(){
                if(flag) {
                    getData(7); 
                    $('select option').eq(0).prop('selected',true);                    
                }
        });
        // 下一页
        $('.next').click(function(){
            if(!flag){
                getData(1);
                $('select option').eq(1).prop('selected',true);
            }
        });
    });
</script>

</html>