import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import store from '@/store/index'

Vue.use(VueRouter)
// 引入路由组件



const router = new VueRouter({
    routes,
    scrollBehavior(to,from,savedPosition){
        return { y : 0 }
    }
})

//全局前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to,from,next) => {
        //to：可以获取到你要跳转到哪个路由信息
        //from：可以获取到你从哪个路由1而来的信息
        //next：放行函数
    
        //用户登陆了，一定有token,未登录一定不会有token
        let token = store.state.user.token
        let name = store.state.user.userInfo.name
        //已登陆
        if(token){
            //用户已经登陆还想去login(不能去，停留在首页)
            if(to.path == '/login'){
                next('/home')
            }else{
            //登陆了，去的不是login
                if(name){
                    next()
                }else{
                    //没有用户信息，派发action让仓库存储用户信息再跳转
                    try {
                    //获取用户信息成功
                       await store.dispatch('getUserInfo')
                       next()
                    } catch (error) {
                        //token失效了,获取不到用户信息
                        //清除token
                        await store.dispatch('userLogout')
                        next('/login')
                    }
                }
                next()
            }
        }else{
        //未登录,不能去交易相关(trade),不能去支付相关(pay,paysuccess),不能去个人中心(center)  || '/pay' || '/paysuccess' || '/center'
        let topath = to.path
        if(topath.indexOf('trade') !== -1 || topath.indexOf('pay') !== -1 || topath.indexOf('center') !== -1){
            //把未登录的时候想去而没有去成的信息，存储在地址栏中
            next('/login?redirect='+topath)
        }else{
            next()
        }
        }
    
        
    })

export default router

//路由独享守卫
//只有从 购物车界面 才能跳转到  交易页面
//只有从 交易页面   才能跳转到  支付页面
//只有从 支付页面   才能跳转到  支付成功页面