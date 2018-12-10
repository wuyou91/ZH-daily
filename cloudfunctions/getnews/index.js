// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let data = await new Promise(resolve => {
    request.get(`https://news-at.zhihu.com/api/4/news/${event.id}`, (error,res,body) => {
      resolve(body)
    })
  })
  return data
}