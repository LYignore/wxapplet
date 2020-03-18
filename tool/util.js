import config from 'config.js' 
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const compareVersion = (useVersion, systemVersion) => {
    if (!useVersion) {
        useVersion = "1.1.0"
    }
    useVersion = useVersion.split('.')
    systemVersion = systemVersion.split('.')
    var len = Math.max(useVersion.length, systemVersion.length)
    while (useVersion.length < len) {
        useVersion.push('0')
    }
    while (systemVersion.length < len) {
        systemVersion.push('0')
    }
    for (var i = 0; i < len; i++) {
        var num1 = parseInt(useVersion[i])
        var num2 = parseInt(systemVersion[i])
        if (num1 > num2) {
            return true
        } else if (num1 < num2) {
            return false
        }
    }
    return true
}

const animationListOpStart = (that, txt) => {
    var midBtnTxt
    if (txt == config.config.midBtnDeleteAll) {
        midBtnTxt = config.config.midBtnComfirmDelete
    } else if (txt == config.config.rightBtnExcelExport) {
        midBtnTxt = config.config.midBtnComfirmExport
    }
    var animationA = wx.createAnimation({
        timingFunction: "ease-in-out"
    });
    animationA.width("240rpx").left("255rpx").step({ duration: that.data.moveTime });
    that.setData({ animationDel: animationA.export(), operationBtnTxtDel: midBtnTxt });
    var animationB = wx.createAnimation({
        timingFunction: "ease-in-out"
    });
    animationB.width("160rpx").right("60rpx").step({ duration: that.data.moveTime });
    that.setData({ animationExp: animationB.export(), operationBtnTxtExp: config.config.rightBtnCancel });
    var animationC = wx.createAnimation({
        timingFunction: "ease-in-out"
    });
    animationC.left("112rpx").width("375rpx").step({ duration: that.data.moveTime - that.data.moveDelayTime, delay: that.data.moveDelayTime });
    that.setData({ animationCardMove: animationC.export() });
    var animationD = wx.createAnimation({
        timingFunction: "ease-in-out"
    });
    animationD.opacity(1).width("160rpx").step({ duration: that.data.moveTime - that.data.moveDelayTime, delay: that.data.moveDelayTime });
    that.setData({ animationCheckAll: animationD.export() });
}

const animationListOpEnd = (that) => {
    var animationD = wx.createAnimation({
        timingFunction: "ease-in-out"
    });
    animationD.opacity(0).width("0rpx").step({ duration: that.data.moveTime });
    that.setData({ animationCheckAll: animationD.export() });
    var animationA = wx.createAnimation({
        timingFunction: "ease-in-out"
    });
    animationA.width("260rpx").left("80rpx").step({ duration: that.data.moveTime - that.data.moveDelayTime, delay: that.data.moveDelayTime });
    that.setData({ animationDel: animationA.export(), operationBtnTxtDel: config.config.midBtnDeleteAll });
    var animationB = wx.createAnimation({
        timingFunction: "ease-in-out"
    });
    animationB.width("260rpx").right("80rpx").step({ duration: that.data.moveTime - that.data.moveDelayTime, delay: that.data.moveDelayTime });
    that.setData({ animationExp: animationB.export(), operationBtnTxtExp: config.config.rightBtnExcelExport });
    var animationC = wx.createAnimation({
        timingFunction: "ease-in-out"
    });
    animationC.left("30rpx").width("457rpx").step({ duration: that.data.moveTime - that.data.moveDelayTime, delay: that.data.moveDelayTime });
    that.setData({ animationCardMove: animationC.export() });

    setTimeout(function () {
        that.setData({
            animationConfirmTxt: config.config.leftBtnCheckAllText
        })
    }.bind(that), that.data.moveTime)
}

const getUserWXInfo = (callback) => {
    try {
        if (wx.canIUse("openSetting")) {
            wx.openSetting({
                success: (res) => {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: (res) => {
                            callback(null, res);
                        },
                        fail: (res) => {
                            wx.hideToast()
                            wx.showToast({
                                title: '获取用户信息失败！',
                                icon: 'loading',
                                duration: 3000,
                                mask: true
                            })
                            callback(e);
                        }
                    })
                },
                fail: (res) => {
                    wx.hideToast()
                    wx.showToast({
                        title: '获取用户信息失败！',
                        icon: 'loading',
                        duration: 3000,
                        mask: true
                    })
                    return false
                }
            })
        } else {
            wx.hideToast()
            wx.showToast({
                title: '无法获取用户信息,当前微信版本过低,请升级到最新版本。',
                icon: 'loading',
                duration: 3000,
                mask: true
            })
            return false
        }
    } catch (e) {
        wx.hideToast()
        wx.showToast({
            title: '无法获取用户信息,当前微信版本过低,请升级到最新版本。',
            icon: 'loading',
            duration: 3000,
            mask: true
        })
        return false
    }
};

const errFun = (res) => {
    if (typeof res.data == "string") {
        res.data = JSON.parse(res.data)
    }
    if (res.data.return_code === 200) {
        return res.data.data
    } else {
        wx.showToast({
            title: res.data.return_msg,
            icon: "none"
        })
        if (getCurrentPages().length >= 2) {
            wx.navigateBack()
        }

    }
};

const errFunNew = (err, res) => {
    if (err) return false;
    if (typeof res.data == "string") {
        res.data = JSON.parse(res.data)
    }
    return res
};

const fetch = (method, url, data, callback) => {
    let token = wx.getStorageSync('token')
    wx.request({
        url,
        data: data,
        method: method,
        header: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + token
        },
        success(res) {
            // console.log("==========================接口=======" + url)
            // console.log(res)
            callback(null, res.data);
        },
        fail(e) {
            callback(e);
        }
    })
};

const upLoadFile = (method, url, filePath, callback) => {
    let token = wx.getStorageSync('token')
    wx.uploadFile({
        method: method,
        url: url,
        filePath: filePath,
        name: 'file',
        header: { "Content-Type": "multipart/form-data", "Authorization": 'Bearer ' + token },
        formData: {},
        success(res) {
            callback(null, res.data);
        },
        fail(e) {
            callback(e);
        }
    })
};

module.exports = {
    formatTime: formatTime,
    errFun: errFun,
    errFunNew: errFunNew,
    compareVersion: compareVersion,
    animationListOpStart: animationListOpStart,
    animationListOpEnd: animationListOpEnd,
    getUserWXInfo: getUserWXInfo,
    fetch: fetch,
    upLoadFile: upLoadFile
}
