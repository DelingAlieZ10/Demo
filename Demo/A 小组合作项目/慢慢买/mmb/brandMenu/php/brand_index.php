<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="http://192.168.72.86/mmbuy/mmb/brandMenu/scss/brand_index.css" />
    <title>品牌大全</title>
</head>
<script>
    document.querySelector('html').style.fontSize = window.screen.width / 10 + 'px';
</script>

<body>
    <div class="container">
        <!--导航模块-->
        <div class="nav">
            <a href="javascript:void(0)">首页</a><span>></span>
            <a href="javascript:void(0)">品牌大全</a><span>></span>
            <a href="javascript:void(0)" class="current">平板电视哪个牌子好</a>
        </div>
        <!--标题模块-->
        <div class="title">
            <h3>平板电视哪个牌子好</h3>
        </div>
        <!--品牌列表模块-->
        <ul class="brand_list">
        </ul>
        <!--产品排行模块-->
        <div id="product-ranking">
            <h3><a href="javascript:void(0)">LED电视产品销量排行</a></h3>
            <div class="product-ranking-list">
                <ul class="list">
                    <!--<li>
                        <div class="left">
                            <img src="" alt="">
                        </div>
                        <div class="right">
                            <h5>TCL D43A810 42英寸 高清720P 智能网络LED液晶电视</h5>
                            <p class="one"><span class="price">￥1999.00</span><span class="start"></span></p>
                            <p class="two">
                                <span class="quoted-price">报价(7)</span>
                                <span class="comment">全网评论(52207)</span>
                            </p>
                        </div>
                    </li>-->
                </ul>
            </div>
        </div>
        <!--最新评论-->
        <div id="lasted-comment">
            <h3><a href="javascript:void(0)">平板电视最新评论</a></h3>
            <div class="lasted-comment-details">
                <ul class="list">
                    <li>
                        <a href="javascript:void(0)">
                            <div class="product">
                                <div class="left">
                                    <img src="http://www.zuyushop.com:8013/ProPic/20172/small80/Thumb_2017020010262862032.jpg" alt="">
                                </div>
                                <div class="right">
                                    <p>海信(Hisense) LED55EC550UA 55英寸 超高清4K HDR 智能液晶电视</p>
                                </div>
                            </div>
                        </a>
                        <div class="comment">
                            <div class="comment-top clearfix">
                                <span>j***t：</span>
                                <span></span>
                                <span>2017/7/2</span>
                            </div>
                            <div class="comment-bottom">
                                <p>不错，刚开始还有点担心，不过还好总算不会失望，海信还是没有让我失望</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</body>
<script type="text/javascript" src="http://192.168.72.86/mmbuy/mmb/lib/jQuery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="http://192.168.72.86/mmbuy/mmb/lib/template-web.js/template-web.js"></script>
<!--<script type="text/javascript" src="http://192.168.72.100:80/group/js/jquery-3.1.1.min.js"></script>-->
<!--品牌列表模板-->
<script type='text/html' id='brand_list'>
    {{each result}}
    <li>
        <a href="http://192.168.72.86/mmbuy/mmb/brandMenu/php/product_list.php?brandtitleid={{$value.brandtitleid}}">
            <div class="left">
                <span class="num"></span>
                <div class="details">
                    <h4>{{$value.brandName}}</h4>
                    <p>{{$value.brandInfo}}</p>
                </div>
            </div>
            <div class="right"> ></div>
        </a>
    </li>
    {{/each}}
</script>
<!--产品销量排行-->
<script type="text/html" id="brand_rank_list">
    {{each result}}
        <li>
            <a href="http://192.168.72.86/mmbuy/mmb/brandMenu/php/product_details.php?productId={{$value.productId}}">
                <div class="left">
                {{#$value.productImg}}
            </div>
            <div class="right">
                <h5>{{$value.productName}}</h5>
                <p class="one"><span class="price">{{$value.productPrice}}</span><span class="start"></span></p>
                <p class="two">
                    <span class="quoted-price">{{$value.productQuote}}</span>
                    <span class="comment">{{$value.productCom}}</span>
                </p>
            </div>
            </a>
        </li>
    {{/each}}
</script>
<!--最新评论-->
<script type="text/html" id="lasted-comment-list">
    {{each result}}
        <li>
            <a href="javascript:void(0)">
                <div class="product">
                    <div class="left">
                        <img src="" alt="">
                    </div>
                    <div class="right">
                        <p>海信(Hisense) LED55EC550UA 55英寸 超高清4K HDR 智能液晶电视</p>
                    </div>
                </div>
            </a>
            <div class="comment">
                <div class="comment-top clearfix">
                    <span>{{$value.comName}}</span>
                    <span></span>
                    <span>{{$value.comTime}}</span>
                </div>
                <div class="comment-bottom">
                    <p>{{$value.comContent}}</p>
                </div>
            </div>
        </li>
    {{/each}}
</script>
<script>
    $(function () {
        // 导航标题数据
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getbrandtitle',
            success: function (data) {
                $('.nav a').eq(2).html(data.result[<?php $hello = $_GET['id']; echo $hello;?>]['brandTitle']);
                $('.title h3').html(data.result[<?php $hello = $_GET['id']; echo $hello;?>]['brandTitle']);
                $('#product-ranking h3').html(data.result[<?php $hello = $_GET['id']; echo $hello;?>]['brandTitle'].replace('十大','')+'销量排行');
            }
        })
        // 品牌列表页的数据
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getbrand?',
            data:{
                brandtitleid:<?php $hello = $_GET['id']; echo $hello;?>
            },
            success: function (data) {
                var result = template('brand_list', data);
                $('.brand_list').append(result);
                $('.brand_list').children().each(function(idx, element) {
                    $(element).find('.num').html(idx + 1);
                    this.className = 'list'+(idx+1);
                });
            }
        });
        // 商品排行
        var commentId = 0;
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getbrandproductlist',
            data: {
                brandtitleid: <?php 
                                $num = $_GET['id'];
                                echo $num;
                              ?>,
                limit: 10
            },
            success: function (data) {
                commentId = data.result[0]['productId'];
                $.ajax({
                        url: 'http://139.199.192.48:9090/api/getproductcom',
                        data: {
                            productid: commentId
                        },
                        success: function (data) {
                            // console.log(data);
                            var result = template('lasted-comment-list', data);
                            $('#lasted-comment .list').append(result);
                            $('#lasted-comment .list img').each(function (idx, element) {
                                element.src = imgArr[Math.floor(Math.random() * 6)];
                            })
                        }
                    });
                var result = template('brand_rank_list', data);
                $('#product-ranking .list').append(result);
                $('#product-ranking .list li a').css({
                    display:'flex'
                });
                $('.brand_list li a').each(function(idx,element){
                    element.href = 'http://192.168.72.86/mmbuy/mmb/brandMenu/php/product_list.php?categoryid='+data.result['brandtitleid']+'&pageid=4';
                })
            }
        })
        
        // 最新评论
        var imgArr = ['http://www.zuyushop.com:8013/ProPic/201612/small80/Thumb_2016120016545049735.jpg',
            'http://pro.zuyushop.com:8015/ProPic/20169/small80/Thumb_2016090008504840382.jpg',
            'http://www.zuyushop.com:8013/ProPic/20172/small80/Thumb_2017020014273069843.jpg',
            'http://www.zuyushop.com:8013/ProPic/20172/small80/Thumb_2017020014273069843.jpg',
            'http://www.zuyushop.com:8013/ProPic/20172/small80/Thumb_2017020010262862032.jpg',
            'http://pro.zuyushop.com:8015/ProPic/20169/small80/Thumb_2016090012580179883.jpg'
        ]
    });
</script>

</html>