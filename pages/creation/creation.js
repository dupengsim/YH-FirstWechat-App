var creationList = require('../../mock/mock-data.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardImgs: []
  },
  onLoad: function () {
    this.setData({
      cardImgs: creationList.creationList
    });
  },
  onCreationTap: function (event) {
    var postId = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/creation_detail/creation_detail?id=' + postId,
    })
  },
  //图片上传
  onImgUp: function (event) {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album','camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        app.globalData.chooseImgUrl = tempFilePaths;
        wx.navigateTo({
          url: '/pages/creation_detail/creation_detail',
        })
      },
    })
  }
})