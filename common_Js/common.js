
var onCreationTab = function () {
  wx.navigateTo({
    url: '/pages/creation/creation',
  })
}
//数组随机排序
var onArraySort = function (array) {
  var tmp, current, top = array.length;
  if (top) while (--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}
//从数组中查找某个元素的扩展方法
var firstOrDefault = Array.prototype.firstOrDefault = function (id) {
  for (var i = 0; i < this.length; i++) {
    var item = this[i];
    if (item.Id == id) {
      return item;
      break;
    }
  }
  return null;
}
// 生成随机数
var buildRandom = function (n) {
  var rnd = '';
  for (var i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 10);
  }
  return rnd;
}
// 获取设备窗口的宽和高
var getSystemInfo = function () {
  var _width = 0, _height = 0;
  wx.getSystemInfo({
    success: function (res) {
      _width = res.windowWidth;
      _height = res.windowHeight;
    }
  })
  return { clientWidth: _width, clientHeight: _height };
}

module.exports = {
  onCreationTab,
  onArraySort,
  firstOrDefault,
  buildRandom,
  getSystemInfo
}