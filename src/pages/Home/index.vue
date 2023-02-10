<template>
  <div>
    <Type-Nav></Type-Nav>
    <List-Container></List-Container>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/index.vue'
import Recommend from '@/pages/Home/Recommend/index.vue'
import Rank from '@/pages/Home/Rank/index.vue'
import Like from '@/pages/Home/Like/index.vue'
import Floor from '@/pages/Home/Floor/index.vue'
import Brand from '@/pages/Home/Brand/index.vue'

import {mapState} from 'vuex'

export default {
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    //派发action
    this.$store.dispatch('getFloorList')
    this.$store.dispatch('getUserInfo')
  },
  computed:{
    ...mapState({
      floorList: state => state.home.floorList,
    })
  }
}
</script>

<style>

</style>