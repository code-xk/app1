<template>
  <div id="app">
    <my-header></my-header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>

import MyHeader from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    Footer
  },
  mounted(){
        //通知vuex发请求，获取数据，存储于仓库之中
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>
