// 引入axios
import axios from 'axios'
// 引入进度条的插件Nprogress
import Nprogress from 'nprogress'
// 引入该进度条的样式
import 'nprogress/nprogress.css'

// 设置请求的路径的前缀及超时时间
const ajax = axios.create({
    // 设置请求的前置路径
    baseURL: '/api',
    // 设置超时的时间
    timeOut: 20000
})

// 设置请求拦截器
ajax.interceptors.request.use(config => {
    // 显示进度条
    Nprogress.start()
    // 把用户的临时凭证嵌入到请求头中
    // config.headers['userTempId'] = store.state.user.userTempId
    // 在请求头中携带token数据
    // const token = store.state.user.userInfo.token
    // if (token) {
    //     config.headers['token'] = token
    // }
    // 暂且先不做任何的请求头的处理
    return config
})
// 设置响应的拦截器
ajax.interceptors.response.use(response => {
    // 隐藏当前的进度条
    Nprogress.done()
    // 直接就把数据响应回去
    return response.data
}, error => {
    // 隐藏当前的进度条
    Nprogress.done()
    // 提示错误信息
    alert('错误信息:' + error.message || '未知错误')
    // 不处理错误
    // return new Promise(()=>{}) // 外部不再做错误的处理,中断了Promise链
    // 外部处理这个错误,
    return Promise.reject(error) // 改成error即可
})
export default ajax
