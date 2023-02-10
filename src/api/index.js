// 当前这个模块：API进行统一管理
import requests from './request'
import mockrequests from './mock'

//三级联动接口
///api/product/getBaseCategoryList   get请求


//获取数据、获取数据、获取数据、获取数据、获取数据

// 1. 获取主页数据

export const reqCategoryList = () => {
    //发请求：axios 发请求返回的结果时Promise对象
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
// 2. 获取banner (home首页轮播图接口)
export const reqBannerList = () => {
    //发请求：axios 发请求返回的结果时Promise对象
    return mockrequests({
        url:'/banner',
        method:'get'
    })
}

// 3. 获取floor数据
export const reqFloorList = () => {
    return mockrequests({
        url:'/floor',
        method:'get'
    })
}

// 4. 获取搜索模块数据 地址：/api/list    请求方式：POST 
// 需要带参数、例如：
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }
// POST 请求传参 data
// 到时候调用这个函数的时候，必须要传参(至少传一个空对象),否则会404
// 例：reqGetSearchInfo()

export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params})

//5.获取产品详情信息的接口 URL: /api/item/{skuId} 请求方式：get

export const reqGoodsInfo = (skuId) => {
    return requests({
        url:`/item/${skuId}`,
        mothod:'get'
    })
}

//6.将产品添加到购物车中 接口 URL: /api/cart/addToCart/{ skuId }/{ skuNum }  请求方式：post


export const reqAddOrUpdateShopCart = (skuId,skuNum) => {
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}

//7.获取购物车列表数据的接口  URL：/api/cart/cartList  请求方式：get

export const reqCartList = () => {
    return requests({
        url:`/cart/cartList `,
        method:'get'
    })
}

//8.删除购物车商品 URL：/api/cart/deleteCart/{skuId} 请求方式：delete
export const reqDeleteCartById = (skuId) => {
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}

//9.修改商品选中状态 URL：/api/cart/checkCart/{skuId}/{isChecked} 请求方式：get
export const reqUpdataCheckedById = (skuId,isChecked) => {
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

//10.获取验证码 URL:/api/user/passport/sendCode/ {phone}  请求方式：get
export const reqGetCode = (phone) => {
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

//11.注册接口 URL:/api/user/passport/register 请求方式：post 参数：phone code password
export const reqUserRegister = (data) => {   //对象data
    return requests({
        url:`/user/passport/register`,
        data,
        method:'post'
    })
}

//12.登录接口 URL:/api/user/passport/login 请求方式：post 参数：phone password
export const reqUserLogin = (data) => {
    return requests({
        url:'/user/passport/login',
        data,
        method:'post'
    })
}

//13.获取用户信息 URL:/api/user/passport/auth/getUserInfo 请求方式：get
export const reqUserInfo = () => {
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}

//14.退出登录 URL:/api/user/passport/logout 请求方式：get
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'})

//15.获取用户地址信息 URL:/api/user/userAddress/auth/findUserAddressList 请求方式：get
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//16.获取商品清单 URL:/api/order/auth/trade 请求方式：get
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})

//17.提交订单的接口 URL:/api/order/auth/submitOrder?tradeNo={tradeNo} 请求方式：post
export const reqSubmitOrder =(tradeNo,data) => {
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data
    })
}

//18.获取支付信息 URL:/api/payment/weixin/createNative/{orderId} 请求方式：get
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//19.获取支付订单状态 URL:/api/payment/weixin/queryPayStatus/{orderId} 请求方式：get
export const reqPayStatus =(orderId) => {
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get',
    })
}

//20.获取个人中心数据 URL:/api/order/auth/{page}/{limit} 请求方式：get
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})
