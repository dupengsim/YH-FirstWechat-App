var creationList = require('../../../mock/mock-data.js');
var app = getApp();

Page({

  data: {
    noteMaxLen: "48",
    limitNoteLen: "48",
    imgUrl: ''
  },
  onLoad: function (options) {
    let that = this;
    var postId = options.id;
    if (postId != undefined && postId != '' && postId.length > 0) {
      var tempList = creationList.creationList;
      for (var i = 0; i < tempList.length; i++) {
        var item = tempList[i];
        if (item.id == postId) {
          that.setData({
            imgUrl: item.url
          });
        }
      }
    } else {
      that.setData({
        imgUrl: app.globalData.chooseImgUrl
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
      limitNoteLen: this.data.noteMaxLen - len
    })
  }
})