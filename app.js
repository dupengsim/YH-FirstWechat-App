//app.js
App({
  globalData: {
    chooseImgUrl: '' // 全局变量，保存从相册中上传的图片路径
  },
  onLaunch: function () {

  },
  /** 
  * 自定义get请求函数，返回Promise
  */
  http_get: function (url, data) {
    var promise = new Promise((resolve, reject) => {
      //init
      var that = this;
      var postData = data;
      //网络请求
      wx.request({
        url: url,
        data: postData,
        method: 'GET',
        header: { 'content-type': 'application/json' },
        success: function (res) {//返回取得的数据
          resolve(res);
        },
        error: function (e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  }
})

// 测试提交