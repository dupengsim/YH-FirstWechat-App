import { firstOrDefault, buildRandom, getSystemInfo } from '../../common_Js/common.js'
import { BASE_URL } from '../../common_Js/constant.js'

var app = getApp();

Page({

  data: {
    noteMaxLen: 48,
    limitNoteLen: 48,
    imgUrl: '',
    newImageUrl: '',// 生成海报的图片地址
    content: '',//输入的文字内容
    isshow: 1,
    clientWidth: 0,
    clientHeight: 0,
    codeImageUrl: '',//带二维码的最终图片地址
    isHide: false, //与二维码合并后临时显示的canvas是否隐藏
    conuter: 0, // 设置输入内容自动换行时，记录换行的次数
    saveImageId: 0// 保存到服务器上的图片编号
  },
  onLoad: function (options) {
    let that = this;
    var postId = options.id;
    if (postId != undefined && postId != '' && postId.length > 0) {
      var _url = BASE_URL + '/course/getsinglebgimage/' + postId;
      app.http_get(_url, null).then((res) => {
        that.setData({
          imgUrl: BASE_URL + res.data.Url
        });
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
    if (len >= this.data.noteMaxLen) {
      wx.showModal({
        title: '小提示',
        content: "最多可输入48个字符",
        showCancel: false
      })
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
  createPoster: function (event) {
    let that = this;
    var len = that.data.content.length;
    if (len === 0) {
      wx.showModal({
        title: '小提示',
        content: "快来输入你的那句话吧",
        showCancel: false
      })
    } else {
      //生成海报
      var rnd = buildRandom(5);//随机生成唯一标识
      var wh = getSystemInfo();
      var _width = wh.clientWidth;
      var _height = wh.clientHeight;
      that.setData({
        clientWidth: _width,
        clientHeight: _height
      })
      var _imgUrl = that.data.imgUrl;
      var _content = that.data.content;
      var arr = _content.split(/[\n,]/g);
      if (_imgUrl.indexOf('https') > -1) {//选取服务器上的空白模板
        wx.downloadFile({
          url: _imgUrl,
          success: function (ress) {
            that.drawImage(that, ress.tempFilePath, arr, _width - 50, _height - 120);
          }
        });
      } else {//从相册中选取
        that.drawImage(that, _imgUrl, arr, _width, _height);
      }
      that.setData({
        isshow: 0,
        saveImageId: rnd
      });
    }
  },
  drawImage: function (that, imgUrl, arr, _width, _height) {
    var context = wx.createCanvasContext('myCanvas');
    context.stroke();
    context.drawImage(imgUrl, 0, 10, _width, _height);
    //填充文字
    context.setFillStyle('white');
    context.font = "bold 14px Arial";
    context.fillText('#在他人眼里，我竟然是这样的艺术生#', 20, 60);
    var _top = 90;
    for (var i = 0; i < arr.length; i++) {
      that.drawText(arr[i], 20, _top, 260, context);
      _top = _top + 35 * parseInt(that.data.counter);
    }
    //绘制图片
    context.draw(true, setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            newImageUrl: tempFilePath
          });
        },
        fail: function (res) {
          console.log(res);
        }
      }, that)
    }, 1000));
    //输出最终图片的路径

  },
  drawText: function (t, x, y, w, context) { // 设置文本自动换行
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.platform === 'ios') {//针对iOS系统，过滤掉emoji
          var ranges = [
            '\ud83c[\udf00-\udfff]',
            '\ud83d[\udc00-\ude4f]',
            '\ud83d[\ude80-\udeff]'
          ];
          t = t.replace(new RegExp(ranges.join('|'), 'g'), '☒');
        }
      },
    })
    var chr = t.split("");
    var temp = "";
    var row = [];
    context.font = "bold 26px Arial";
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
    var n = 0;
    for (var i = 0; i < row.length; i++) {
      context.fillText(row[i], x, y + (i + 1) * 35, w);
      n++;
    }
    that.setData({
      counter: n
    });
  },
  saveImage: function () { //保存海报到相册
    let that = this;
    var wh = getSystemInfo();
    var _width = wh.clientWidth;
    var _height = wh.clientHeight + 60;
    that.setData({
      clientWidth: _width,
      clientHeight: _height
    });
    setTimeout(() => {
      var context = wx.createCanvasContext('tempCanvas');
      context.stroke();
      context.setFillStyle('white');
      context.fillRect(0, 0, _width, _height);
      context.drawImage(that.data.newImageUrl, 10, 15, _width - 20, _height - 150);
      // 绘制二维码
      var codeImg = '/images/code.jpg';
      context.drawImage(codeImg, (_width - 80) / 2, _height - 120, 80, 80);
      // 填充文字
      context.setFillStyle('black');
      context.font = "normal 12px Arial";
      context.fillText('艺术类专业遇到过哪些误解呢？识别二维码查看', (_width - 250) / 2, _height - 20);
      //绘制图片
      context.draw(true);
    }, 500);
    //输出最终图片的路径
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'tempCanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            codeImageUrl: tempFilePath
          });
        },
        fail: function (res) {
          console.log(res);
        }
      }, that)
    }, 1000);
    wx.showLoading({
      title: '正在保存中...',
    })
    setTimeout(() => {
      that.saveToAlbum();
      wx.hideLoading();
    }, 2200);
  },
  saveToAlbum: function () {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.codeImageUrl,
      success: function (res) {
        wx.showModal({
          title: '小提示',
          showCancel: false,
          content: '已保存至相册，快去分享给你的票友吧！',
          success: function (res) {
            if (res.confirm) {
              that.setData({
                isHide: true
              })
            }
          }
        })
      },
      fail: function (res) {//接口调用失败的回调函数
        console.log(res);
        that.saveToAlbum();
      },
      complete: function (res) {//接口调用结束的回调函数（调用成功、失败都会执行）
        console.log(res);
      }
    })
  },
  upload:function(){
    let that = this;
    wx.uploadFile({
      url: BASE_URL + '/course/uploadfile',
      filePath: that.data.newImageUrl,
      name: 'uploadfile',
      formData: {
        'cno': that.data.saveImageId
      },
      success: function (res) {
        var jsonData = JSON.parse(res.data);
        var newId = parseInt(jsonData.ResultContent);
        console.log(newId);
      },
      fail: function (res) {
        that.upload();
      }
    });
  },
  onShareAppMessage: function (ops) {
    let that = this;
    if (ops.from == "menu") {//右上角的转发
      return {
        title: '在他人眼里，我竟然是这样的艺术生（已哭晕）......',
        path: '/pages/index/index?id=-1',
        success: function (res) {

        },
        fail: function (res) {

        }
      }
    } else {
      // 保存图片到百度云服务器
      that.upload();
      return {
        title: '在他人眼里，我竟然是这样的艺术生（已哭晕）......',
        path: '/pages/poster/poster?id=' + parseInt(that.data.saveImageId),
        success: function (res) {

        },
        fail: function (res) {

        }
      }
    }
  }

})