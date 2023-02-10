// 对 axios 进行封装

// 导入 axios
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
//nprogress 属性上的方法： start方法：进度条开始；done方法：进度条结束
// console.log(nprogress)






// 利用 axios 对象的方法 create,去创建一个 axios 实例
// http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
const requests = axios.create({
    //配置对象
    //基础路径
    baseURL:'/mock',
    //代表请求超时的时间 5s
    timeout:5000,
})

//请求拦截器，在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //进度条开始动
    nprogress.start()
    //config：配置对象，对象里面有一个属性很重要，headers 请求头
    return config
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //服务器响应成功的回调函数 服务器响应数据回来，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done()
    return res.data
},(err) => {
    //服务器响应失败的回调函数 
    return Promise.reject(new err('faile'))
})

//对外暴露
export default requests