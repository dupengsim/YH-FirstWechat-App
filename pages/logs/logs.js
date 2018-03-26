//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    imgUrl: ''
  },
  onLoad: function (options) {
    let that = this;
    // var _key = options.id;
    // console.log(_key);
    // wx.getStorage({
    //   key: "" + _key + "",
    //   success: function (res) {
    //     console.log(2)
    //     console.log(res.data[0].url)
    //     that.setData({
    //       imgUrl: res.data[0].url
    //     })
    //   },
    // })
    
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
