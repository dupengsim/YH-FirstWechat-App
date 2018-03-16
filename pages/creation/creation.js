var creationList = require('../../mock/mock-data.js');

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
    console.log(postId);
    wx.navigateTo({
      url: '/pages/creation/creation_detail/creation_detail?id=' + postId,
    })
  },
  //图片上传
  onImgUp: function (event) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
      },
    })
  },



})