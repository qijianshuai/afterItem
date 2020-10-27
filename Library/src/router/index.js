import Vue from 'vue'
import VueRouter from 'vue-router'
import Author from '../pages/Author'
import Book from '../pages/Book'
import AddBook from '../pages/AddBook'
import Home from '../pages/Home/index.vue'
import Dictionaries from '../pages/Dictionaries'
import Login from '../components/Login'
import AddUser from '../pages/addUser'
Vue.use(VueRouter)
const router = new VueRouter({
    mode:'history',
    routes:[
        //登录
        {
            path:'/login',
            component:Login
        },
        //图书列表
        {
            path:'/book',
            component:Book
        },
        //作者列表
        {
            path:'/author',
            component:Author,
            //因为作者数据是从vuex获取，action是在home组件分发
            beforeEnter: (to, from, next) => {
                let fromPath = from.path
                if(fromPath.indexOf('/home')!==-1 || fromPath.indexOf('/book')!==-1|| fromPath.indexOf('/dictionaries')!==-1){
                    next()
                }else{
                    next('/home')
                }
            }
        },
        //首页
        {
            path:'/home',
            component:Home
        },    
        //添加图书    
        {
            path:'/addbook',
            component:AddBook,
            props:(route) =>({book:route.query}),
            beforeEnter: (to, from, next) => {
                let fromPath = from.path
                if(fromPath.indexOf('/book')!==-1){
                    next()
                }else{
                    next('/book')
                }
            }
        },
        //用户管理
        {
            path:'/dictionaries',
            component:Dictionaries,
            // //因为字典配置数据是从vuex获取，action是在home组件分发
            // beforeEnter: (to, from, next) => {
            //     let fromPath = from.path
            //     if(fromPath.indexOf('/home')!==-1 || fromPath.indexOf('/book')!==-1|| fromPath.indexOf('/author')!==-1){
            //         next()
            //     }else{
            //         next('/home')
            //     }
            // }
        },
        //路径重定向
        {
            redirect:'/home',
            path:'/'
        },
        //添加用户
        {
            path:'/addAuthor',
            component:AddUser,
            props:state =>{
                console.log(state)
               return {userInfo:state.query}
            }
        }
    ]
})
//前置守卫
router.beforeEach((to, from, next) => {
    let arr = [ '/home','/book','/author','/dictionaries']
    //获取缓存中用户灯枯状态
    let res = localStorage.getItem('reader')
    //判断前往的路径是否属于arr中的路径
    let res1 = arr.filter((item)=>item === to.path)
    if(res1.length){
        //登录了 去目的页
        if(res){
            next()
        }else{
        //未登录去登陆
            next('/login')
        }    
    }else{
        next()
    }
  })

export default router