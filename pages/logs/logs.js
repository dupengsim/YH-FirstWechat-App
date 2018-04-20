//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    imgUrl: ''
  },
  onLoad: function (options) {
    let that = this;
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
