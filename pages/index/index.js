var imglist = require('../../mock/mock-data.js');
// var commonJs = require("../../common_Js/common.js");
import { onPublicTab, onCreationTab, onShareTab } from '../../common_Js/common.js'

Page({

  data: {
    // imgUrls: [],
    index: 1,
    isflag:true
  },
  onLoad: function () {
    this.setData({
      imgUrls: imglist.imageList
    })
  },
  swiperChange: function (event) {
    this.setData({
      index: event.detail.current + 1
    });
  },
  onConversationTap: function (event) {
    wx.navigateTo({
      url: '/pages/public/public',
    })
  },
  Show: function (event) {
    this.setData({
      isflag:false
    })
  },
  isShow: function(event){
    this.setData({
      isflag:true
    })
  },
  onPublicTab: function () {
    onPublicTab();
  },
  onCreationTab: function () {
    onCreationTab();
  },
  onShareTab: function () {
    onShareTab();
  }

})