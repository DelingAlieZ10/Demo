/**
 * Created by Administrator on 2017/4/23.
 */
/**
 * 封装了一个缓动(先快后慢)的运动函数
 * @param obj
 * @param target
 */

function animate(obj, json, fn) {
  clearInterval(obj.timeId);
  obj.timeId = setInterval(function () {
    var flag = true;
    for (var key  in  json) {
      // key就是json对象里面的属性   json[key]是属性值 也就是要到达的目标位置
      var leader = parseInt(getStyle(obj, key)) || 0;
      var target = json[key];//这个就是要达到的目标位置
      var step = (target - leader) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      leader = leader + step;
      obj.style[key] = leader + 'px';
      // 通过调试发现，只要有一个到达了目标位置，就清掉了定时器，不符合我们的要求
      // 我们的需求是，所有的属性都到达目标位置才能够清掉定时器
      // 因此只要有一个属性没有到达目标位置，就不能清掉定时器，当所有的属性都到达目标位置，才能够清掉定器
      if (leader != target) {
        flag = false;
      }
    }
    if (flag) {  // flag为true的时候，就说明所有的属性都到达了目标位置，这个时候才能够清掉定时器
      clearInterval(obj.timeId);
      // 如果有函数传进来，要执行回调函数里面的代码
      if (typeof fn == "function") {
        fn();
      }
    }

  }, 15)
}

function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return window.getComputedStyle(obj, null)[attr];
  }
}