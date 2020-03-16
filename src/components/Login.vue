<template>
  <body id="poster">

  <el-form class="login-container" label-position="left"
           >
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="登录账号">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item >
    <el-form-item  label="用户类型">
    <el-select style="width: 350px " v-model="loginForm.type" placeholder="角色选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    </el-form-item >
    <el-form-item >
      <el-button type="primary"  style="width:100px;margin:10px;background: #505458;border: none" @click="login">登录</el-button>
      <el-button type="primary" style="float:right;width:100px;margin:10px;background: cornflowerblue;border: none"  @click="dialogFormVisible = true">注册</el-button>

    </el-form-item>

  </el-form>


  <el-dialog title="注册新用户" :visible.sync="dialogFormVisible" :modal-append-to-body='false' width="500px" center="">
    <el-form :model="form" label-width="110px">
      <el-form-item label="用户名" >
        <el-input v-model="form.userName" autocomplete="off" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="账号" >
        <el-input v-model="form.loginAccount" autocomplete="off" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input type="password" v-model="form.password" autocomplete="off" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="电话" >
        <el-input type="tel" v-model="form.phoneNum" autocomplete="off" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="年龄" >
        <el-input type="number" v-model="form.age" autocomplete="off" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="性别" >
        <el-select v-model="form.gender" placeholder="请选择性别" style="width: auto">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" >
        <el-select v-model="form.type" placeholder="请选择用户类型" style="width: auto">
          <el-option label="用户" value="1"></el-option>
          <el-option label="评委" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type==2" label="专业" >
        <el-select v-model="form.profession" placeholder="请选择专业类型" style="width: auto">
          <el-option label="自然" value="1"></el-option>
          <el-option label="地理" value="2"></el-option>
          <el-option label="美学" value="3"></el-option>
          <el-option label="科技" value="4"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="register">确 定</el-button>
    </div>
  </el-dialog>
  </body>
</template>





<script>

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: '',
          password: '',
          type:''
        },
        form:{
          userName: '',
          loginAccount: '',
          password: '',
          phoneNum: '',
          age: '',
          gender: '',
          profession: '',
          type: ''
        },
        userId:'',
        responseResult: [],
          options:[{
            value:'1',
              label:'用户'
          },{
              value:'2',
              label:'管理员'
          }, {
              value:'3',
              label:'评委'
              }
          ],
        dialogTableVisible: false,
        dialogFormVisible: false,
      }
    },
    methods: {
      login () {
        var _this = this
        this.$axios
          .post('/user/login', {
            loginAccount: this.loginForm.username,
            password: this.loginForm.password,
            type: this.loginForm.type,
          })
          .then(successResponse => {
            if(successResponse.status!=200){
              this.$message({
                message:'登录失败！',
                type:'error'
              });

              return;
            }
            if (successResponse.data!="") {
              if(successResponse.data.status==2){
                this.$message({
                  message:'账户已被冻结！',
                  type:'error'
                });
                return
              }
              console.error(successResponse)
              this.userId=successResponse.data.id
              _this.$store.commit('save',this.userId)
              _this.$store.commit('login', _this.loginForm)

              var path = this.$route.query.redirect
              console.log(path);
              this.$router.replace({path: path === '/' || path === undefined ? '/product/productCount' : path})
            }else{
              this.$message({
                message:'账号、密码或用户类型错误！',
                type:'error'
              });
            }
          })
          .catch(failResponse => {
          })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      register(){
        var _this = this
        this.$axios
          .post('/user/register', this.$qs.stringify({
            userName:  this.form.userName,
            loginAccount:  this.form.loginAccount,
            password:  this.form.password,
            phoneNum:  this.form.phoneNum,
            age:  this.form.age,
            gender:  this.form.gender,
            profession: this.form.profession,
            type: this.form.type
          }))
          .then(successResponse => {
            if(successResponse.status!=200){
              this.$message({
                message:'注册失败！',
                type:'error'
              });

            }
            if (successResponse.data) {
              this.$message('注册成功');
              window.location.reload();
            }else{
              this.$message({
                message:'注册失败！',
                type:'error'
              });

            }
          })
          .catch(failResponse => {
          })
      }
    }
  }
</script>


<style>
  #poster {
    background:url("../assets/beijing.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    opacity: 0.8;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
