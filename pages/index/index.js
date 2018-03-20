var imglist = require('../../mock/mock-data.js');
// var commonJs = require("../../common_Js/common.js");
import { onPublicTab, onCreationTab, onShareTab } from '../../common_Js/common.js'

Page({

  data: {
    // imgUrls: [],
    index: 1
  },
  onLoad: function () {
    this.setData({
      imgUrls: imglist.imageList
    })
  },
  swiperChange: function (event) {
    this.setData({
      index: event.detail.current + 1
    });
  },
  onConversationTap: function (event) {
    wx.navigateTo({
      url: '/pages/public/public',
    })
  },
  onShareBtnTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "保存到本地相册"
    ]
    wx.showActionSheet({
      itemList: itemList,
      success(res) {
        if (res.tapIndex === 1) {
          wx.saveImageToPhotosAlbum({
            filePath: 'res.tempFilePath',
            success: function (res) {
              console.log(res)
            }
          })
        }
      }
    })
  },
  onPublicTab: function () {
    onPublicTab();
  },
  onCreationTab: function () {
    onCreationTab();
  },
  onShareTab: function () {
    onShareTab();
  }

})