Page({

  data: {
    noteMaxLen:"48",
    limitNoteLen:"48",
    cardImgs: [
      '../../../images/in_1.jpg',
      '../../../images/in_2.jpg',
      '../../../images/in_3.jpg',
      '../../../images/in_4.jpg',
      '../../../images/in_5.jpg',
      '../../../images/in_1.jpg',
      '../../../images/in_2.jpg',
      '../../../images/in_1.jpg',
      '../../../images/in_2.jpg',
      '../../../images/in_3.jpg',
      '../../../images/in_4.jpg',
      '../../../images/in_5.jpg',
      '../../../images/in_1.jpg',
      '../../../images/in_2.jpg',
    ]
  },
  onLoad: function(options) {
    var postId = options.id;
    this.setData({
      postId: postId
    })
  },
  //字数限制
  bindWordimit: function (event) {
    var value = event.detail.value;
    var len = parseInt(value.length);
    if(len > this.data.noteMaxLen) {
      return;
    }
    this.setData({
      currentNoteLen: len,  //当前字数 
      limitNoteLen: this.data.noteMaxLen - len
    })
  }

})