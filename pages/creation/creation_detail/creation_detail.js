var creationList = require('../../../mock/mock-data.js');
import { firstOrDefault } from '../../../common_Js/common.js'
var app = getApp();

Page({

  data: {
    noteMaxLen: "48",
    limitNoteLen: "48",
    imgUrl: '',
    content: '',//输入的文字内容
    isshow: 1,
    clientWidth: 0,
    clientHeight: 0
  },
  onLoad: function (options) {
    let that = this;
    var postId = options.id;
    if (postId != undefined && postId != '' && postId.length > 0) {
      var currentImage = creationList.creationList.firstOrDefault(postId);
      that.setData({
        imgUrl: currentImage.url
      });
    } else {
      that.setData({
        imgUrl: app.globalData.chooseImgUrl[0]
      });
    }
  },
  //字数限制
  bindWordimit: function (event) {
    var value = event.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.noteMaxLen) {
      return;
    }
    this.setData({
      currentNoteLen: len,  //当前字数 
      limitNoteLen: this.data.noteMaxLen - len,
      content: value
    })
  },
  textAreaBlur: function (evt) {
    this.setData({
      content: evt.detail.value
    })
  },
  createPoster: function () {




    //生成海报
    let that = this;
    var _width = 0;
    var _height = 0;
    wx.getSystemInfo({
      success: function (res) {
        _width = res.windowWidth;
        _height = res.windowHeight;
        that.setData({
          clientWidth: _width,
          clientHeight: _height
        })
      },
    })
    var _imgUrl = that.data.imgUrl;
    var _content = that.data.content;
    var arr = _content.split(/[\n,]/g);
    var context = wx.createCanvasContext('myCanvas');
    context.stroke();
    context.drawImage(_imgUrl, 20, 20, _width - 40, _height - 150);
    //填充文字
    context.setFillStyle('white');
    context.font = "bold 16px Arial";
    context.fillText('#在他人眼里，我竟然是这样的艺术生#', 40, 60);
    var _top = 100;
    for (var i = 0; i < arr.length; i++) {
      that.drawText(arr[i], 40, _top, 240, context);
      _top += 40;
    }
    //绘制图片
    context.draw();
    //输出最终图片的路径
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
            imgUrl: tempFilePath
          });
        },
        fail: function (res) {
          console.log(res);
        }
      }, that)
    }, 1000)

    that.setData({
      isshow: 0
    });
  },
  drawText: function (t, x, y, w, context) { // 设置文本自动换行
    var chr = t.split("");
    var temp = "";
    var row = [];
    context.font = "bold 20px Arial";
    context.fillStyle = "white";
    context.textBaseline = "middle";
    for (var a = 0; a < chr.length; a++) {
      if (context.measureText(temp).width < w) {
        ;
      }
      else {
        row.push(temp);
        temp = "";
      }
      temp += chr[a];
    }
    row.push(temp);
    for (var b = 0; b < row.length; b++) {
      context.fillText(row[b], x, y + (b + 1) * 20 + 30);
    }
  },
  saveImage: function () { //保存海报到相册
    let that = this;
    console.log(that.data.imgUrl);
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imgUrl,
      success: function (res) {
        wx.showModal({
          title: '小提示',
          showCancel: false,
          content: '图片已经保存至相册啦，快秀到朋友圈给大家看吧！',
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '保存到相册失败',
        })
      }
    })
  },
  onShareAppMessage: function (ops) {
    return {
      title: '在亲戚的眼里，你的专业居然是这样的',
      path: '/pages/index/index?id=2',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
})