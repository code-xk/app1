
import { reqGetSearchInfo } from "@/api"


const state = {
    searchList:{}
}

const actions = {
    //获取search模块的数据
   async getSearchList({commit},params={}){
    //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await  reqGetSearchInfo(params)
    console.log(result)
    if(result.code == 200){
        commit('GETSEARCHLIST',result.data)
       
    }
    }
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}

// getters主要作用：简化仓库中的数据
const getters = {
    //state是当前仓库中的state,并非大仓库中的state
    goodsList(state){
        return state.searchList.goodsList || [] //防止没有网路的情况
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}



export default {
    state,
    mutations,
    actions,
    getters
}