// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    p0: {
      t1: "1 票据采集范围",
      t2: "您的票据属于以下范围吗？",
      img: "https://download.aikaka.com.cn/e229f0391a1257c16f9e11d3b1c5579a",
      btn: "是的",
      light:"https://download.aikaka.com.cn/ba30a4be8e802dc12748bf7d91208953"
    },
    p1: {
      t1: "1 票据采集范围",
      t2: "您的票据属于以下范围吗？",
      img: "https://download.aikaka.com.cn/e229f0391a1257c16f9e11d3b1c5579a",
      btn: "是的",
      light: "https://download.aikaka.com.cn/ba30a4be8e802dc12748bf7d91208953"
    },
    p2: {
      t1: "2 票据有效界定",
      t2: "您的票据是有效票据吗？",
      img: "https://download.aikaka.com.cn/893727c8e3241991e8145ca623d6cb74",
      btn: "符合要求",
      light: "https://download.aikaka.com.cn/da40355b9bb7ae34dba2c76632553bae"
    },
    p3: {
      t1: "3 图片拍摄要求",
      t2: "如何拍摄才算有效采集？",
      img: "https://download.aikaka.com.cn/c654d5921877231a50561a77f4d1603d",
      btn: "我学会了！去拍摄",
      light: "https://download.aikaka.com.cn/b8293df8599602b0d138bcdf9782719e"
    },
    p:1,
    back_btn: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  next: function(){
    if (this.data.p == 1){
      this.setData({
        p0: this.data.p2,
        p: 2,
        back_btn: "block"
      })
    }
    else if (this.data.p == 2){
      this.setData({
        p0: this.data.p3,
        p: 3,
        show: "none",
        back_btn: "block"
      })
    }
    else{
      wx.navigateTo({ 'url': '/pages/invoiceCopy/invoiceCopy' });
    }
  },
  last: function() {
    if (this.data.p == 2) {
      this.setData({
        p0: this.data.p1,
        p: 1,
        show: "block",
        back_btn: "none"
      })
    } else {
      this.setData({
        p0: this.data.p2,
        p: 2,
        show: "block",
        back_btn: "block"
      })
    }
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