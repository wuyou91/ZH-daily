// news.js
Page({
  data: {
    news: ''
  },
  onLoad: function onLoad(options) {
    wx.cloud.callFunction({
      name: 'getnews',
      data: {
        id: options.id
      },
      success:(res) => {
        this.setData({
          news: JSON.parse(res.result).body
        })
        console.log(this.data.news)
      }
    });
  }
})