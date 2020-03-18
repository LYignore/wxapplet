import config from '../../tool/config.js'
import util from '../../tool/util.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        showToastDisplay: 'none',
        weburl: config.config.webImage,
        totalTime: config.config.totalTime,
        statusRe: false,
        errorToastShow:"none",
        errorWord:""
    },
  onReady: function () {

  },
  gotoPhoto: function () {
    if (!config.config.ticket) {
      wx.showToast({
        title: "您尚未注册，暂时无法使用",
        icon: 'none',
        duration: 2000
      })
    }
  },
  gotoGuide: function () {
    wx.navigateTo({ 'url': '/pages/guide/guide' })
  }
})