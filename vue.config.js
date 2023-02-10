const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  // 代理跨域
  // devServer:{
  //   proxy:{
  //     '/api':{
  //       target:'http://gmall-h5-api.atguigu.cn'
  //     }
  //   }
  // }
})
//跨域问题
//什么是跨域：协议、域名、端口号不同的请求，称之为跨域

//解决方案：JSONP、CROS、代理(上面就是通过代理的方式)