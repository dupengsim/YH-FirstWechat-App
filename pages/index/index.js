var imglist = require('../../mock/mock-data.js');
import { onCreationTab, onArraySort } from '../../common_Js/common.js'

Page({

  data: {
    imgUrls: [],
    index: 1,
    isflag: true,
    currentId: 0
  },
  onLoad: function (options) {
    console.log(options.id);
    let that = this;
    var sharedlist = [];//被分享的那张海报信息
    var leftlist = [];//剩余的海报列表
    var postId = options.id;
    if (postId != undefined && postId != '' && postId.length > 0) {
      var tempList = imglist.imageList;
      for (var i = 0; i < tempList.length; i++) {
        var item = tempList[i];
        if (item.id == postId) {
          sharedlist = [{ "id": postId, "url": item.url }];
        } else {
          leftlist.push(item);
        }
      }
      //被分享的海报与剩余的列表随机排序后合并，且保证已分享的在第一个显示
      var result = sharedlist.concat(onArraySort(leftlist));
      that.setData({
        imgUrls: result
      });
    } else {
      that.setData({
        imgUrls: onArraySort(imglist.imageList)
      })
    }
  },
  swiperChange: function (event) {
    let that = this;
    var _index = event.detail.current + 1;
    var currentImage = that.data.imgUrls[_index - 1];
    this.setData({
      index: _index,
      currentId: currentImage.id
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
  show: function () {
    this.setData({
      isflag: false
    })
  },
  onHide: function () {
    this.setData({
      isflag: true
    })
  },
  onCreationTab: function () {
    onCreationTab();
  },
  onShareTab: function () {
    onShareTab();
  },
  onShareAppMessage: function (ops) {//自定义分享信息
    var _currentId = this.data.currentId
    return {
      title: '在他们眼里，我的专业居然是这样的......',
      path: 'pages/index/index?id=' + _currentId,
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }

})