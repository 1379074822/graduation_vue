
<template>
  <div>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px"  background-color="#545c64" text-color="#fff"  active-text-color="#ffd04b">
      <el-menu router :default-active="$route.name" background-color="#545c64" text-color="#fff"
               active-text-color="#ffd04b" style="width: 200px">
        <el-menu-item index="/product/productCount"><i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/product">
          <template slot="title"><i class="el-icon-goods"></i>作品信息管理</template>
          <el-menu-item-group>
            <el-menu-item index="/product/productlist">作品列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/system">
          <template slot="title"><i class="el-icon-s-order"></i>系统留言板管理</template>
          <el-menu-item-group>
            <el-menu-item index="/message/messagelist">留言板列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/audit">
          <template slot="title"><i class="el-icon-s-custom"></i>评委库管理</template>
          <el-menu-item-group>
            <el-menu-item index="/audit/auditList">评委列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/admin">
          <template slot="title"><i class="el-icon-edit-outline"></i>管理员信息管理</template>
          <el-menu-item-group>
            <el-menu-item index="/admin/adminList">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/user">
          <template slot="title"><i class="el-icon-user-solid"></i>用户信息管理</template>
          <el-menu-item-group>
            <el-menu-item index="/user/userlist">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-aside>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex2"
        mode="horizontal"
        @select="handleSelect"
        background-color="#fff"
        text-color="#B3C0D1"
        active-text-color="#B3C0D1"
        style="width:100%;height: 70px">
        <Breadcrumb></Breadcrumb>
        <el-dropdown @command="handleCommand">
          <el-avatar icon="el-icon-user-solid"  ></el-avatar>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="a">首页</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>
    </el-header>

    <el-main>

      <router-view v-if="isRouterAlive"></router-view>

    </el-main>
  </el-container>

</el-container>
  </div>
</template>

<style>
.el-header {
background-color:#ffffff;
color: #B3C0D1;
height: 70px;
  width: 100%;
}
.el-submenu{
  width: 200px;
}

.el-aside {
background-color: #545c64;
line-height: 100vh;
}
.el-dropdown{
  position: fixed;
  right: 25px;
  top:15px;
}
</style>

<script>
import Breadcrumb from '@/components/views/Breadcrumb'



export default{
  name:'Home',
  components:{Breadcrumb},
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  computed:{
    // ...mapGetters([
    //   'user'
    // ])
  },
  methods:{
    reload(){
      this.isRouterAlive=false,
        this.$nextTick(function () {
          this.isRouterAlive=true;
        })
    },
    handleCommand(command) {
      if(command==="a"){
        this.$router.push("/home")
      }else if(command==="b"){
        localStorage.removeItem("user")
        this.$router.push("/login")
      }
    }

  },
  mounted() {


  }
}

</script>
