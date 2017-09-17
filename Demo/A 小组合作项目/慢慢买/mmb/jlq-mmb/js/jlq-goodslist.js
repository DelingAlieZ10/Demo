//比价第二页

goodslist();
var jlqAllPage;  //总页数
var jlqOnepage = 1;  // 对应单页

//下一页注册事件
$('.goodsbottom-next').click(function () {
  jlqOnepage++;
  if (jlqOnepage < jlqAllPage+1) {
    goodslist();
  } else {
    jlqOnepage = jlqAllPage;
  }
  $('#jlq-page li').eq(0).html(jlqOnepage);
})

//上一页注册事件
$('.goodsbottom-prev').click(function () {
  jlqOnepage--;
  if (jlqOnepage > 0) {
    goodslist();
  } else {
    jlqOnepage = 1;
  }
  $('#jlq-page li').eq(0).html(jlqOnepage);
})

//给底部按钮分页标签注册事件
$('#checkPage').on('click','a',function () {
  jlqOnepage = $(this).html();
  $('#jlq-page li').eq(0).html(jlqOnepage);
  goodslist();
})

/**
 * 封装一个渲染货物表单的函数
 */
function goodslist() {
    //dom方法：拿到url后面传进来的参数
  var categoryId = window.location.search.substr(2);
  $.ajax({
    url: 'http://139.199.192.48:9090/api/getproductlist',
    data: {
      categoryid: categoryId,
      pageid: jlqOnepage
    },
    success: function (data) {
      var res = template('jlq-goodslist', data);
      jlqAllPage =Math.ceil(data.totalCount / data.pagesize); 
      // console.log(jlqAllPage);
      $('.jlq-goodslist ul').html(res);
      $('#jlq-page li').eq(2).html(jlqAllPage);
      //根据页面总数动态生成分页器
      var arr =[];
      // console.log(jlqAllPage);
      for(var i = 1;i<jlqAllPage+1;i++){
       arr.push('<li><a href="#">'+i+'</a></li>')
      }
      $('.btn-menu').html(arr.join(''));
    }
  })
}

/**
 * 渲染三级菜单
 */
goodsmenu()
function goodsmenu(){
  var categoryId = window.location.search.substr(2);
  // console.log(categoryId);
  $.ajax({
    url:'http://139.199.192.48:9090/api/getcategorybyid',
    data:{
      categoryid: categoryId
    },
    success:function(data){
      $('.jlq-goodsmenu ul li').eq(4).html(data.result[0].category );
      // $('#secondtab').html(data.result[0].category);
    }
  })
}