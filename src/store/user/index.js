import {reqGetCode , reqUserRegister , reqUserLogin , reqUserInfo , reqLogout} from '@/api/index'
import {setToken , getToken , removeToken} from '@/utils/token'

const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const actions = {
    //获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        console.log(result)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录(token)
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        console.log(result)
        //服务器下发token,用户唯一标识符
        if(result.code == 200){
            commit("USERLOGIN",result.data.token)
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
            //提交用户的信息
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
        // if(result.code == 200){
        //     commit('GETUSERINFO',result.data)
        // }
        
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        console.log(result)
        if(result.code == 200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //清除数据
    CLEAR(state){
        //把仓库中相关用户信息清空
        state.token = ''
        state.userInfo = {} 
        //本地存储数据清空
        removeToken()
    }
}
const getters = {}

export default{
    state,
    actions,
    mutations,
    getters
}