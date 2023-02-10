import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

// //state:仓库存储数据的地方
// const state = {}
// //mutations:修改state的唯一手段
// const mutations = {}
// //action:处理action,可以书写自己的业务逻辑，也可以处理异步
// const actions = {}
// //getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// const getters = {}

//导入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart  from './shopcart'
import user from './user'
import trade from './trade'

const store = new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})

export default store        