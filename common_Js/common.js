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

module.exports = {
  onPublicTab, onCreationTab, onShareTab
}