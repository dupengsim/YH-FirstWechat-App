import { onCreationTab } from '../../common_Js/common.js'
import { BASE_URL } from '../../common_Js/constant.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var _id = options.id;
    wx.request({
      url: BASE_URL + '/course/getimage/' + parseInt(_id),
      header: {
        'Content-Type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        that.setData({
          imgUrl: BASE_URL + res.data.Url
        })
      }
    })
  },
  buildme: function () { //创建我的海报
    onCreationTab();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})