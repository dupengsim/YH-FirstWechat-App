import { onCreationTab, onArraySort, firstOrDefault, getSystemInfo } from '../../common_Js/common.js';
import { BASE_URL } from '../../common_Js/constant.js'
var app = getApp();

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
    imgUrl: '',//合并后带有二维码的待保存图片地址
    isShow: false, //canvas画布是否显示
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
  onShareTab: function () {
    this.setData({
      mengShow: false,
      aniStyle: false
    })
  },
  onLoad: function (options) {
    let that = this;
    var _url = BASE_URL + "/course/getimagelist/1";
    app.http_get(_url, null).then((res) => {
      var sharedlist = [];//被分享的那张海报信息
      var leftlist = [];//剩余的海报列表
      var postId = options.id;
      // 没经过分享或是来自右上角的转发操作
      if (postId == -1 || postId == undefined
        || postId == '' || postId.length <= 0) {
        that.setData({
          imgUrls: onArraySort(res.data)
        })
      } else {
        for (var i = 0; i < res.data.length; i++) {
          var item = res.data[i];
          if (item.Id == postId) {
            sharedlist = [{ "Id": postId, "Url": item.Url }];
          } else {
            leftlist.push(item);
          }
        }
        //被分享的海报与剩余的列表随机排序后合并，且保证已分享的在第一个显示
        var result = sharedlist.concat(onArraySort(leftlist));
        that.setData({
          imgUrls: result
        });
      }
      //页面加载后，即保存当前第一个显示的海报id，否则直接保存时会有问题
      that.setData({
        currentId: that.data.imgUrls[0].Id
      });
    });
  },
  swiperChange: function (event) {
    let that = this;
    var _index = event.detail.current + 1;
    that.setData({
      index: _index,
      currentId: event.detail.currentItemId
    });
  },
  saveImage: function () {
    let that = this;
    // 获取当前显示的图片
    var _imgUrl = BASE_URL + that.data.imgUrls.firstOrDefault(that.data.currentId).Url;
    var wh = getSystemInfo();
    var _width = wh.clientWidth;
    var _height = wh.clientHeight + 60;
    that.setData({
      clientWidth: _width,
      clientHeight: _height
    });
    wx.downloadFile({
      url: _imgUrl,
      success: function (ress) {
        var context = wx.createCanvasContext('myCanvas');
        context.stroke();
        context.setFillStyle('white');
        context.fillRect(0, 0, _width, _height);
        context.drawImage(ress.tempFilePath, 10, 15, _width - 20, _height - 150);
        // 绘制二维码
        var codeImg = '/images/code.jpg';
        context.drawImage(codeImg, (_width - 80) / 2, _height - 120, 80, 80);
        // 填充文字
        context.setFillStyle('black');
        context.font = "normal 12px Arial";
        context.fillText('艺术类专业遇到过哪些误解呢？识别二维码查看', (_width - 250) / 2, _height - 20);
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
        }, 1200);
      }
    });
    wx.showLoading({
      title: '正在保存中...',
    })
    setTimeout(() => {
      that.savePhoto();
      wx.hideLoading();
    }, 2200);
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
    var that = this;
    var _currentId = this.data.currentId;
    that.setData({
      mengShow: false
    });
    if (ops.from == "menu") {
      _currentId = -1;
    }
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
  },
  redirect:function(){
    wx.redirectTo({
      url: '/pages/logs/logs',
    })
  }
})