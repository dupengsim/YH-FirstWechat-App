var creationList = require('../../../mock/mock-data.js');

Page({

  data: {
    noteMaxLen: "48",
    limitNoteLen: "48",
    imgUrl: ''
  },
  onLoad: function (options) {
    let that = this;
    var postId = options.id;
    var tempList = creationList.creationList;
    for (var i = 0; i < tempList.length; i++) {
      var item = tempList[i];
      if (item.id == postId) {
        that.setData({
          imgUrl: item.url
        });
      }
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