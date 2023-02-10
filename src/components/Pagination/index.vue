<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo == 1}">1</button>
    <button v-if="startAndEndNum.start > 2">···</button>

    <button v-for="(page,index) in startAndEndNum.end" 
    :key="index" v-if="page >= startAndEndNum.start" 
    @click="$emit('getPageNo',page)"
    :class="{active:pageNo == page}">{{page}}</button>

    <button v-if="startAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo == totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  //第几页 、 当前页多少数据 、 总共多少条数据 、连续页数
  props:['pageNo','pageSize','total','continues'],
  computed:{
    //计算出总共多少页
    totalPage(){
        return Math.ceil((this.total / this.pageSize))  // 向上取整
    },
    //计算出连续的页码的起始数字与结束数字[连续的页码数：至少是5
    startAndEndNum(){
        const {pageNo,totalPage,continues} = this //相当于定义变量，不用写 this.
        //先定义两个变量存储其实数字与结束数字
        let start = 0
        let end = 0
        //不正常现象，总页码小于连续页码数 小于5
        if(continues > totalPage){
            start = 1
            end = totalPage
        }else{
            //正常现象，连续为页码5，但你的页数一定大于5
            start = pageNo - parseInt(continues/2)
            end = pageNo + parseInt(continues/2)
            //把不正常情况纠正(start 出现负数|0时)
            if(start < 1){
                start = 1
                end = continues
            }
            //把不正常情况纠正(end 出现大于总页数)
            if(end > totalPage){
                end = totalPage
                start = totalPage - continues + 1
            }
        }
        return {start,end}
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
    background-color: skyblue;
}
</style>
