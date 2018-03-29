var imglist = require('../../mock/mock-data.js');
import { onCreationTab, onArraySort, firstOrDefault, getSystemInfo } from '../../common_Js/common.js';

Page({

  data: {
    imgUrls: [],//页面海报列表
    index: 1,
    isflag: true,
    mengShow: false,
    aniStyle: true,
    currentId: 0, //当前显示的海报id
    clientWidth: 0,//窗口可视区域的宽度
    clientHeight: 0,//窗口可视区域的高度
    imgUrl: '',//当前显示的海报url
    isShow: false, //canvas画布是否显示
    imgUrl: '',//带有二维码的最终图片地址
    isShow: false //canvas画布是否显示
  },
  showMeng: function (e) {
    this.setData({
      mengShow: true,
      aniStyle: true
    })
  },
  outbtn: function (e) {
    this.setData({
      mengShow: false,
      aniStyle: false
    });
  },
  onLoad: function (options) {
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
    //页面加载后，即保存当前第一个显示的海报id，否则直接保存时会有问题
    that.setData({
      currentId: that.data.imgUrls[0].id
    });
  },

  onShareTab: function () {
    this.setData({
      mengShow: false
    })
  },
  swiperChange: function (event) {
    let that = this;
    var _index = event.detail.current + 1;
    var currentImage = that.data.imgUrls[_index - 1];
    that.setData({
      index: _index,
      currentId: currentImage.id
    });
  },
  saveImage: function () {
    let that = this;
    // 获取当前显示的图片
    var _imgUrl = that.data.imgUrls.firstOrDefault(that.data.currentId).url;
    var wh = getSystemInfo();
    var _width = wh.clientWidth;
    var _height = wh.clientHeight + 60;
    that.setData({
      clientWidth: _width,
      clientHeight: _height
    })
    var context = wx.createCanvasContext('myCanvas');
    context.stroke();
    context.setFillStyle('white');
    context.fillRect(0, 0, _width, _height);
    context.drawImage(_imgUrl, 10, 15, _width - 20, _height - 150);
    // 绘制二维码
    var codeImg = '/images/code.jpg';
    context.drawImage(codeImg, 150, _height - 120, 80, 80);
    // 填充文字
    context.setFillStyle('black');
    context.font = "normal 12px Arial";
    context.fillText('艺术类专业遇到过哪些误解呢？识别二维码查看', 60, _height - 20);
    //绘制图片
    context.draw();
    //输出最终图片的路径
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imgUrl: tempFilePath
          });
        },
        fail: function (res) {
          that.setData({
            mengShow: false,
            aniStyle: false,
            isShow: true
          });
        }
      }, that)
    }, 1000);
    wx.showLoading({
      title: '正在保存中...',
    })
    setTimeout(() => {
      that.savePhoto();
      wx.hideLoading();
    }, 2000);
  },
  savePhoto: function () {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imgUrl,
      success: function (res) {
        wx.showModal({
          title: '小提示',
          showCancel: false,
          content: '已保存到相册，快去分享给你的票友吧！',
          success: function (res) {
            if (res.confirm) {
              that.setData({
                mengShow: false,
                aniStyle: false,
                isShow: true
              });
            }
          }
        })
      }
    })
  },
  onCreationTab: function () {
    onCreationTab();
  },
  onShareAppMessage: function (ops) {//自定义分享信息
    var _currentId = this.data.currentId;
    var that = this;
    return {
      title: '在他人眼里，我竟然是这样的艺术生（已哭晕）......',
      path: '/pages/index/index?id=' + _currentId,
      success: function (res) {
        that.setData({
          mengShow: false,
          aniStyle: false
        });
      },
      fail: function (res) {

      }
    }
  }
})