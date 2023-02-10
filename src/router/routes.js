
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import paySucess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'

//引入二级路由组件

// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'


//当打包构建应用时，JavaScript 包会变得非常大，影响页面加载
//如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

export default [
    {
        path:'/center',
        component:() => import('@/pages/Center'),
        meta:{show:true},
        children:[    //二级路由一定不能加斜杠
            {
                path:'/',
                redirect:'myOrder'
            },
            {  
                path:'myorder',
                component:() => import('@/pages/Center/myOrder')
            },
            {
                path:'grouporder',
                component:() => import('@/pages/Center/groupOrder')
            }
        ]
    },
    {
        path:'/',
        redirect:'/home',
        meta:{show:true}
    },
    {
        path:'/home',
        component:() => import('@/pages/Home'),
        meta:{show:true}   // 设置元信息
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component:() => import('@/pages/Search'),
        meta:{show:true},
    },
    {
        path:'/login',
        component:() => import('@/pages/Login'),
        meta:{show:false}
    },
    {
        path:'/register',
        component:() => import('@/pages/Register'),
        meta:{show:false}
    },
    {
        path:'/detail/:skuid?',
        component:() => import('@/pages/Detail'),
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:() => import('@/pages/AddCartSuccess'),
        meta:{show:true}
    },
    {
        path:'/shopcart',
        component:() => import('@/pages/ShopCart'),
        meta:{show:true}
    },
    {
        path:'/trade',
        component:() => import('@/pages/Trade'),
        meta:{show:true},
        beforeEnter:(to,from,next) =>{  //路由独享首卫
            //去交易页面，必须是从购物车而来
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false) //从哪来回哪儿去，类似from.path
            }
        }
    },
    {
        path:'/pay',
        component:() => import('@/pages/Pay'),
        meta:{show:true},
        beforeEnter:(to,from,next) =>{  //路由独享首卫
            //去支付页面，必须是从交易而来
            if(from.path == '/trade'){
                next()
            }else{
                next(false) //从哪来回哪儿去，类似from.path
            }
        }
    },
    {
        path:'/paysuccess',
        component:() => import('@/pages/PaySuccess'),
        meta:{show:true},
        beforeEnter:(to,from,next) =>{  //路由独享首卫
            //去支付成功页面，必须是从支付而来
            if(from.path == '/pay'){
                next()
            }else{
                next(false) //从哪来回哪儿去，类似from.path
            }
        }
    }
]