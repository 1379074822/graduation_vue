<template>
  <el-container style="background-image: url('http://photo.loveyd.com/uploads/allimg/080519/10352220.jpg');background-image-moz-background-size:cover;  ;opacity: 0.8" >
    <el-header>
      <el-menu  router :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect"
               style="width: 100%">
        <el-menu-item index="productShow"  style="width: auto;margin-left: 100px">作品展示</el-menu-item>
        <el-submenu index="/product" style="width: auto;margin-left: 100px">
          <template slot="title">作品管理</template>
          <el-menu-item index="userProduct">作品查看</el-menu-item>
          <el-menu-item v-if="loginUserType==1" @click="dialogFormVisible = true">作品上传</el-menu-item>
          <el-submenu index="" v-if="loginUserType==3">
            <template slot="title">评委操作</template>
            <el-menu-item index="/user/productScore">作品评分</el-menu-item>
            <el-menu-item index="/user/advance">晋级操作</el-menu-item>
            <el-menu-item index="/user/report">评审区</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="/user/userMessageList" style="width: auto;margin-left: 100px">留言板</el-menu-item>
        <el-menu-item index="/user/userCenter" style="width: auto;margin-left: 100px">个人中心</el-menu-item>
        <el-dropdown @command="handleCommand" style="float: right">
          <el-avatar  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar><span>{{loginUserName}}</span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">首页</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>


      </el-menu>

    </el-header>

    <el-main >

      <router-view v-if="isRouterAlive" style="width: 87%;height:600px;margin-left: 100px"></router-view>
      <el-dialog title="上传新作品" :visible.sync="dialogFormVisible" :modal-append-to-body='false' width="500px" center="">
        <el-form v-model="form" label-width="110px">
          <el-form-item label="作品名"  prop="worksName">
            <el-input v-model="form.worksName" autocomplete="off" style="width: auto"></el-input>
          </el-form-item>
          <el-form-item label="上传图片(单次一张)" prop="fileUrl">
            <el-upload
              v-model="form.fileUrl"
              action="http://47.103.29.16:8081/works/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="onSuccess"
              :file-list = imgFileList
              accept="png;jpg;jpeg;"
              :limit="1">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible2">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="作品类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="作品介绍"  prop="worksDesc">
            <el-input  type="textarea"
                       :autosize="{ minRows:4, maxRows:6}"
                       placeholder="请输入内容"
                       v-model="form.worksDesc" autocomplete="off" style="width: 200px"></el-input>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createWorks">确 定</el-button>
        </div>
      </el-dialog>
      <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    </el-main>
    <el-footer height="100%" style="background-color: bisque">
      <span style="margin-left: 100px">优秀作品评定系统</span>
    </el-footer>
  </el-container>



</template>

<script>
  export default {
    name: "UserMain",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible2: false,
        loginUserName: '',
        loginUserType: '',
        isRouterAlive: true,
        showCenter:false,
        activeIndex: 'productShow',
        dialogTableVisible: false,
        dialogFormVisible: false,
        imgFileList:[],
        form:{
         fileUrl:'',
         worksDesc:"",
         worksName:"",
          type:"1",

        },
        options: [{
          value: '1',
          label: '自然'
        }, {
          value: '2',
          label: '地理'
        }, {
          value: '3',
          label: '美学'
        }, {
          value: '4',
          label: '科技'
        }, ],

      }
    },
    provide(){
      return{
        reload:this.reload
      }
    },
    created() {
      this.loginUserName = JSON.parse(window.localStorage.getItem("user")).userName
      this.loginUserType = JSON.parse(window.localStorage.getItem("user")).type
    },
    mounted() {
      if (window.localStorage.getItem('batch') == null) {
        window.localStorage.setItem('batch',1)
      }
      if (window.localStorage.getItem('rounds') == null) {
        window.localStorage.setItem('rounds', 1)
      }
    },

    methods: {
      reload() {
        this.isRouterAlive = false,
          this.$nextTick(function () {
            this.isRouterAlive = true;
          })
      },
      resetForm() {
        this.form.type='1';
        this.form.worksDesc ='';
        this.form.worksName = '';
        this.imgFileList =[];
      },
      createWorks(){
        this.$axios
          .post('/works/saveWorks', {
            fileUrl:this.form.fileUrl,
            createId:JSON.parse(window.localStorage.getItem("user")).id,
            createName:JSON.parse(window.localStorage.getItem("user")).userName,
            worksDesc:this.form.worksDesc,
            worksName:this.form.worksName,
            type:this.form.type
          })
          .then(successResponse => {
            if(successResponse.status!=200){
              this.$message({
                message:'上传作品失败！',
                type:'error'
              });

              return;
            }else{
              this.$message('上传作品成功');
              this.dialogFormVisible = false
              this.resetForm()
            }
          })
          .catch(failResponse => {
          })
      },
      onSuccess(response, file, fileList){
        this.form.fileUrl = response
        this.fileList = []
      },
      handleSelect(key, keyPath) {

      },
      handleRemove(file, fileList) {

      },
      handlePictureCardPreview(file) {

        this.dialogImageUrl = file.url;
        this.dialogVisible2 = true;
      },
      handleCommand(command) {
        if (command === "a") {
          this.$router.push("/user/productShow")
        } else if (command === "b") {
          localStorage.removeItem("user")
          this.$router.push("/login")
        } else if (command === "c") {
          this.showCenter= true
          this.$router.push("/user/userCenter")
          this.activeIndex='/user/userCenter';
        }
      }

    },
  }
</script>

<style scoped>

</style>
