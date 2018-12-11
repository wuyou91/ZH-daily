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
        let d = JSON.parse(res.result)
        let date = new Date(d.date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'))
        let month = date.getMonth()+1
        let day = date.getDate()
        let week = date.getDay()
        switch(week){
          case 1 : week = '一' 
            break;
          case 2 : week = '二' 
            break;
          case 3 : week = '三'
            break;
          case 4 : week = '四'
            break;
          case 5 : week = '五'
            break;
          case 6 : week = '六'
            break;
          default:
            week = '日'
        }
        d.date = month + '月' + day + '日 ' + '  星期' + week
        let n = [...this.data.beforeNews]
        n.push(d)
        this.setData({
          beforeNews:[...n]
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