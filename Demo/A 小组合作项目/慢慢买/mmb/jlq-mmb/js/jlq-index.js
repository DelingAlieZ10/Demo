//比价第一个页面

/**
 * 声明一个函数，加载分类标题部分
 */
sorttitle();

function sorttitle() {
  $.ajax({
    url: 'http://139.199.192.48:9090/api/getcategorytitle',
    success: function (data) {
      // console.log(data.result); // 难点1：获取到titleId分别给每个a标签添加属性，然后下面就能拿到这titleId;
      // console.log(titleId);
      var res = template('title-template', data);
      $('.jlq-sorttitle').append(res);
      // console.log($('.jlq-sorttitle p a'));
    }
  })
}

// 给标题注册点击事件
$('.jlq-sorttitle').on('click', 'p a', function () {
  $('.jlq-sorttitle p a').css('background-image', 'url(http://www.zuyushop.com/wap/images/arrow1.gif)');
  $(this).css('background-image', 'url(http://www.zuyushop.com/wap/images/arrow2.gif)');
  if ($(this).hasClass('show') == false) {
    $('.jlq-sorttitle a').removeClass('show');
    $(this).addClass('show');
    var titleid = $(this).attr('data-titleid');
    var $that = $(this);
    $.ajax({
      url: 'http://139.199.192.48:9090/api/getcategory',
      data: {
        titleid: titleid
      },
      success: function (data) {
        // console.log(data);
        var res = template('list-template', data);
        $that.parent().next('ul').append(res).siblings('ul').empty();
        $(this).css('background-image', 'url(http://www.zuyushop.com/wap/images/arrow2.gif)');
      }
    })
  } else {
    $(this).parent().nextAll('ul').empty();
    $('.jlq-sorttitle a').removeClass('show');
    $(this).css('background-image', 'url(http://www.zuyushop.com/wap/images/arrow1.gif)');
  }
})

//难点2 结构的拼接，理清楚嵌套关系，两个后台数据。







