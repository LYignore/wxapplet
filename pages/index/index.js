import config from '../../tool/config.js'
import util from '../../tool/util.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    wxShow: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showToastDisplay: 'none',
    weburl: config.config.webImage,
    totalTime: config.config.totalTime,
    statusReturn: false,
    errorToastShow: "none",
    errorWord: "",
    protocolChecked: false,
    showLogin: true
  },
  //事件处理函数
  bindViewTap: function () {
    
  },
  onLoad: function (option) {
    let ticket = decodeURIComponent(option.scene)
    if(app.globalData.ticket.length == 0){
      if (ticket!='undefined'){
        app.globalData.ticket = ticket
        this.setData({
          wxShow: true
        })
      }else{
        wx.navigateTo({ 'url': '/pages/invoiceCopy/invoiceCopy' });
      }
    }else{
      this.setData({
        wxShow: true
      })
    }
  },
  onShow: function () {
    let _self = this
    wx.login({
      success: res => {
        app.globalData.code = res.code
      }
    })
  },
  /**
   * 用户点击按钮获取时候号码
   */
  getPhoneNumber: function (res) {
    let _self = this
    let detail = res.detail
    if (detail.errMsg == 'getPhoneNumber:ok') {
      console.log(detail)
      let code = app.globalData.code
      util.fetch('POST', config.api.login, {
        'code': code,
        'encryptedData': detail.encryptedData,
        'iv': detail.iv,
        'ticket': app.globalData.ticket
      }, (err, data) => {
        let dataSource = util.errFunNew(err, data)
        if (dataSource.status_code == 200){
          wx.showToast({
            title: '登录成功！',
            icon: 'success',
            duration: 3000,
            mask: true,
            success: function(){
              _self.setData({
                showLogin: false
              })
            }
          })
        }else{
          wx.showToast({
            title: '登录失败！',
            icon: 'none',
            duration: 3000,
            mask: true,
            success:function(){
              wx.navigateTo({
                url: "/pages/index/index",
              })
            }
          })
        }
      })
    }
  }
})
