
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
    if (item.id == id) {
      return item;
      break;
    }
  }
  return null;
}

module.exports = {
  onCreationTab,
  onArraySort,
  firstOrDefault
}