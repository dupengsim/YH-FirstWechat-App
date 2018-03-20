var onPublicTab = function () {
  console.log(123)
  wx.navigateTo({
    url: '/pages/public/public',
  })
}
var onCreationTab = function () {
  wx.navigateTo({
    url: '/pages/creation/creation',
  })
}
var onShareTab = function () {
  wx.navigateTo({
    url: '/pages/share/share',
  })
}
var onArraySort = function (array) {//数组随机排序
  var tmp, current, top = array.length;
  if (top) while (--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}


module.exports = {
  onPublicTab,
  onCreationTab,
  onShareTab,
  onArraySort
}