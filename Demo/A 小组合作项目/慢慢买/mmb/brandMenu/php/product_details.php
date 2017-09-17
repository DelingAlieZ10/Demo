<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>商品详情页</title>
    <script>
        document.querySelector('html').style.fontSize = window.screen.width / 10 + 'px';
    </script>
    <link rel="stylesheet" type="text/css" href="http://192.168.72.86/mmbuy/mmb/brandMenu/scss/product_details.css" />
</head>

<body>
    <div class="container">
        <div class="nav">
            <ul>
                <li>首页</li>
                <span> ></span>
                <li>平板电视</li>
                <span> ></span>
                <li>TCL D43A810</li>
            </ul>
        </div>
        <div class="product-detail">
           
        </div>
        <div class="price-list">
            <div class="title">
                <ul>
                    <li>比价购买</li>
                    <li>产品参数</li>
                    <li>优选评价</li>
                </ul>
            </div>
            <div class="content">
                <ul>
                    <li>
                        <div class="left">
                            <img src="http://sf.manmanbuy.com/images/sitelogo/8.png" alt="">
                            <span class="supermarket">我很帅</span>
                            <span class="other">自营</span>
                        </div>
                        <div class="right">
                            <span>¥ 2099.00</span>
                            <span> ></span>
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            <img src="http://sf.manmanbuy.com/images/sitelogo/1.png" alt="">
                            <span class="supermarket">京东商城</span>
                            <span class="other">自营</span>
                        </div>
                        <div class="right">
                            <span>¥ 2099.00</span>
                            <span> ></span>
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            <img src="http://sf.manmanbuy.com/images/sitelogo/13.png" alt="">
                            <span class="supermarket">你很美</span>
                            <span class="other">自营</span>
                        </div>
                        <div class="right">
                            <span>¥ 1099.00</span>
                            <span> ></span>
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            <img src="http://sf.manmanbuy.com/images/sitelogo/6.png" alt="">
                            <span class="supermarket">苏宁商城</span>
                            <span class="other">自营</span>
                        </div>
                        <div class="right">
                            <span>¥ 2129.00</span>
                            <span> ></span>
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            <img src="http://sf.manmanbuy.com/images/sitelogo/278.png" alt="">
                            <span class="supermarket">天猫官方</span>
                            <span class="other">自营</span>
                        </div>
                        <div class="right">
                            <span>¥ 3999.00</span>
                            <span> ></span>
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            <img src="http://sf.manmanbuy.com/images/sitelogo/1.png" alt="">
                            <span class="supermarket">京东商城</span>
                            <span class="other">自营</span>
                        </div>
                        <div class="right">
                            <span>¥ 2099.00</span>
                            <span> ></span>
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            <img src="http://sf.manmanbuy.com/images/sitelogo/1.png" alt="">
                            <span class="supermarket">京东商城</span>
                            <span class="other">自营</span>
                        </div>
                        <div class="right">
                            <span>¥ 2099.00</span>
                            <span> ></span>
                        </div>
                    </li>
                </ul>
                <div class="footer">
                    <a>该商品的历史最低价：3949.00   ></a>
                    <p> * 实际价格以各网站列出的实时售价为准，我们提供的价格可能有数小时至数日的延迟。</p>
                </div>
            </div>
            <div class="comment">
                <div class="title">优选网友评价</div>
                <ul class="list">
                   
                </ul>
            </div>
        </div>
    </div>
</body>
<!--商品详情-->
<script type="text/html" id='product-detail'>
{{each result}}
    <div class="pic">
        {{#$value.productImg}}
        <img src="http://www.zuyushop.com/wap/images/sc.jpg" alt="">
    </div>
    <div class="introduce">
        <p>{{$value.productName}}</p>
    </div>
    <div class="footer">
        <span class="price">当前最低: ¥1999.00 </span>
        <span class="comment">优选评论: 3130条</span>
    </div>
    {{/each}}
</script>
<!--评论区-->
<script type="text/html" id='comment'>
{{each result}}
    <li>
        <div class="user-info clearfix">
            <div class="left fl">
                <span class="mobile">{{$value.comName}}</span>
                <span class="start">🦍🦍🦍🦍🦍</span>
            </div>
            <div class="right fr">
                <span class="date">{{$value.comTime}}</span>
                <span class="from">{{$value.comFrom}}</span>
            </div>
        </div>
        <div class="comment-details">
            <p>{{$value.comContent}}</p>
        </div>
    </li>
    {{/each}}
</script>
<script type="text/javascript" src="http://192.168.72.86/mmbuy/mmb/lib/jQuery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="http://192.168.72.86/mmbuy/mmb/lib/template-web.js/template-web.js"></script>
<script>
                // Math.floor(Math.random()*10)    
    $(function(){
                var productId = <?php $hello = $_GET['productId']; if($hello){echo $hello;}else{echo 10;}?> ;      
        // 商品详情
        $.ajax({
            url:'http://139.199.192.48:9090/api/getproduct',
            data:{
                productid:productId
            },
            success:function(data) {
                // console.log(data);
                var result = template('product-detail',data);
                $('.product-detail').append(result);
                var titleStr = data.result[0]['productName'];
                $('.nav ul li').eq(2).html(titleStr.slice(0,10));
                $('.nav ul li').eq(1).html(titleStr.slice(titleStr.length-4,titleStr.length));
            }
        })
        // 评论区域
        $.ajax({
            url:'http://139.199.192.48:9090/api/getproductcom',
            data:{
                productid:productId
            },
            success:function(data) {
                var result = template('comment',data);
                $('.comment .list').append(result);
            }
        })
       
        
    });
</script>
</html>