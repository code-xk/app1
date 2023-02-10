
import {reqCartList , reqDeleteCartById , reqUpdataCheckedById} from '@/api/index'


const state = {
    cartList:[]
}
const actions = {
    //获取购物车数据列表
    async getCartList({commit}){
       let result = await reqCartList()
       if(result.code == 200){
            commit('GETCARTLIST',result.data)
       }
    },
    //删除购物车某一个产品
    async deleteCartList({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车选中状态
    async updataCheckById({commit},{skuId,isChecked}){
       let result = await reqUpdataCheckedById(skuId,isChecked)
       if(result.code == 200){
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
    },
    //删除所有选中产品
    deleteAllCheckedCart({dispatch,getters}){
        //context:小仓库、commit：提交mutations修改state、getters：计算属性、dispatch：派发action、state：当前仓库数据
        //获取购物车中全部的产品(是一个数组){dispatch,getters}
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(value => {
            let promise = value.isChecked == 1 ? dispatch('deleteCartList',value.skuId) : ''
            PromiseAll.push(promise)
        })

        return Promise.all(PromiseAll)
    },
    //修改全部产品状态
    updataAllCartChecked({dispatch,state},isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(value => {
           let promise = dispatch('updataCheckById',{skuId:value.skuId,isChecked})
           PromiseAll.push(promise)
        })
        //最终返回结果
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const getters = {
    cartList(state){
        // return state.cartList[0].cartInfoList[0]
        return state.cartList[0] || {}
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}