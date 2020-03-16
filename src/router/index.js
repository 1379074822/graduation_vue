import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/Home'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component:Login
    },
    {
      path: '/login',
      name: 'Login',
     component:Login
    },
    {
      path:'/home',
      name:'首页',
      component:Home,
      meta:{
        requireAuth:false
      },
      children:[
        {
          path:'/product/productlist',
          name:'商品列表',
          component:()=>import('@/components/common/ProductList')
        },
        {
          path:'/product/productCount',
          name:'商品统计',
          component:()=>import('@/components/common/ProductCount')
        },
        {
          path:'/product/productadd',
          name:'添加商品',
          component:()=>import('@/components/common/AddProduct')
        },
        {
          path:'/product/productcategory',
          name:'商品分类',
          component:()=>import('@/components/common/CategoryProduct')
        },
        {
          path:'/admin/adminList',
          name:'管理员列表',
          component:()=>import('@/components/common/AdminList')
        },
        {
          path:'/audit/auditlist',
          name:'评委列表',
          component:()=>import('@/components/common/AuditList')
        },
         {
          path:'/message/messagelist',
          name:'留言列表',
          component:()=>import('@/components/common/MessageList')
        },
        {
          path:'/user/userlist',
          name:'用户列表',
          component:()=>import('@/components/common/UserList')
        },
      ]}
  ]
})
