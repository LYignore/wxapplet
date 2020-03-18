const config = {
    //APIticket
    token: "",
    ticket:"",
    //测试服务器API地址
  apiUrl: "https://invoice.aikaka.cc/api/",
  //apiUrl: "https://report.aikaka.cc/api/",
    //图片CDN地址
  webImage: "https://invoice.aikaka.cc/images/",
    //获取当前用户信息
    user: {
        systemInfo: {},//SDKVersion
        userInfo: {},
        is_register:false
    },
    //微信小程序选中照片后地址
    imgUrlWX: {
        obj: {},
        status: "none"
    }
}
//接口列表
const api = {
  login: config.apiUrl + 'user/login',//用户登录授权,获取用户手机信息
}
module.exports = {
    config: config,
    api: api
}