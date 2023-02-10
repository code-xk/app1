import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

//注册全局组件 三级联动
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

//注册全局组件，pagination分页
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

Vue.config.productionTip = false

//引入mockServe.js----mock数据
import '@/mock/mockServe'
//引入轮播图样式
import 'swiper/css/swiper.css'

//统一接口api文件夹里面全部请求函数
import * as API from '@/api'

import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API
  },
  router,
  //注册仓库：组件实例的身上会多一个 $store 属性
  store
}).$mount('#app')
