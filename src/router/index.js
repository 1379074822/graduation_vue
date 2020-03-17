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
      name: 'Login2',
      component:Login
    },
    {
      path:'/audit/auditMain',
      name:'评委页面',
      component:()=>import('@/components/common/AuditMain'),
      children:[
        {
          path:'/audit/userCenter',
          name:'评委用户中心',
          component:()=>import('@/components/common/UserCenter')
        }, {
          path:'/audit/productScore',
          name:'评委评分',
          component:()=>import('@/components/common/ProductScore')
        },
        {
          path:'/audit/userMessageList',
          name:'留言列表',
          component:()=>import('@/components/common/UserMessageList')
        },]
    },
    {
      path:'/user/userMain',
      name:'用户页面',
      component:()=>import('@/components/common/UserMain'),
      children:[
        {
          path:'/user/userCenter',
          name:'用户中心',
          component:()=>import('@/components/common/UserCenter')
        }, {
          path:'/user/userProduct',
          name:'用户查看产品',
          component:()=>import('@/components/common/UserProductList')
        },{
          path:'/user/productShow',
          name:'产品展示页',
          component:()=>import('@/components/common/ProductShow')
        },
        {
          path:'/user/userMessageList',
          name:'留言列表',
          component:()=>import('@/components/common/UserMessageList')
        },]
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
