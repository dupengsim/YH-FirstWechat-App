var imglist = require('../../mock/mock-data.js');
import { onCreationTab, onArraySort } from '../../common_Js/common.js'

Page({

  data: {
    imgUrls: [],
    index: 1,
    isflag: true
  },
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      imgUrls: onArraySort(imglist.imageList)
    })
  },
  swiperChange: function (event) {
    this.setData({
      index: event.detail.current + 1
    });
  },
  onShareBtnTap: function (event) {
    let that = this;
    var itemList = [
      "分享给微信好友",
      "保存到本地相册"
    ]
    wx.showActionSheet({
      itemList: itemList,
      success(res) {
        if (res.tapIndex === 1) {
          // 当前显示的图片
          var _imgUrl = that.data.imgUrls[that.data.index].url;
          // TODO:在图片底部加上“艺路帮”公众号二维码，并加上一行文字，然后合并保存
          wx.saveImageToPhotosAlbum({
            filePath: _imgUrl,
            success: function (res) {
              wx.showModal({
                title: '小提示',
                showCancel: false,
                content: '图片已经保存至相册啦，快秀到朋友圈给大家看吧！',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
            }
          })
        } else {
          // 分享给微信好友

        }
      }
    })
  },

  onCreationTab: function () {
    onCreationTab();
  },
  onShareTab: function () {
    onShareTab();
  },
  onShareAppMessage: function (ops) {
    return {
      title: '在亲戚的眼里，你的专业居然是这样的',
      path: 'pages/index/index',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }

})