Page({
  data: {
    data: {},
    index:0,
    beforeNews:[]
  },
  onLoad() {
    wx.cloud.callFunction({
      name: 'getindexdata',
      data: {
        url:'https://news-at.zhihu.com/api/4/news/latest'
      },
      success: (res) => {
        this.setData({
          data: JSON.parse(res.result)
        });
      }
    });
  },
  addData(){
    let x = this.data.index
    let before = new Date().getTime() - 86400000*x
    x++
    wx.cloud.callFunction({
      name: 'getindexdata',
      data: {
        url: `https://news-at.zhihu.com/api/4/news/before/${dateToString(before)}`
      },
      success: (res) => {
        let n = [...this.data.beforeNews]
        n.push(JSON.parse(res.result))
        this.setData({
          beforeNews:[...n] // 获取news列表
        })
      }
    })

    this.setData({
      index:x
    })
  }
})

function dateToString(d) {
  let date = new Date(d)
  let year = String(date.getFullYear())
  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + String(month)
  } else {
    month = String(month)
  }
  let day = date.getDate()
  if (day < 10) {
    day = '0' + String(day)
  } else {
    day = String(day)
  }
  let formDate = year + month + day
  return formDate
}