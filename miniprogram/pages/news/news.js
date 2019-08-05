// news.js
Page({
  data: {
    news: '',
    content:''
  },
  onLoad: function onLoad(options) {
    wx.cloud.callFunction({
      name: 'getnews',
      data: {
        id: options.id
      },
      success: (res) => {
        let data = JSON.parse(res.result)
        let img = data.body.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:0 auto;" ')
        let p = img.replace(/\<p/gi, '<p style="margin: 20px 0;font-size:16px;line-height:1.5"')
        let strong = p.replace(/\<strong/gi, '<strong style="font-weight:bold;"')
        this.setData({
          news: data,
          content:strong
        })
        console.log(data)
      }
    });
  }
})