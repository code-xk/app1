
import { reqGoodsInfo , reqAddOrUpdateShopCart} from "@/api"
//封装游客身份模块uuid---生成一个随机字符串(不能再变了)
import {getUUID} from '@/utils/uuid_token.js'
const state = {
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
}
const actions = {
    //获取产品信息
    async getGoodInfo({commit},skuId){
       let result = await reqGoodsInfo(skuId)
       if(result.code == 200){
        commit('GETGOODINFO',result.data)
       }
    },
    //将产品添加到购物车中
    async addShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        //代表加入购物车成功
        if(result.code == 200){
            return '200'
        }else{
        //代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
    
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const getters = {
    //路径导航简化数据
    categoryView(state){
        return state.goodInfo.categoryView || {}  //当前计算的 categoryView 至少是一个空对象，报错就不会有了
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}