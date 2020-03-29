<template>

  <div>
    <div class="select"><el-card class="box-card" style="height: auto">
      <div><i class="el-icon-search"></i><span style="margin: 10px">筛选搜索</span></div>

      <el-form :inline="true" ref="ruleForm" :model="ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input placeholder="用户名"  v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone_num" >
          <el-input placeholder="电话" v-model="ruleForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item>
          用户状态
          <el-select v-model="ruleForm.status" label="用户状态" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
        <el-button style="margin-left:500px;height:40px;width: 66px; " @click="resetForm">重置</el-button>
        <el-button  style=" height:40px;width: 66px;" type="primary" @click="submitForm('ruleForm')" >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card></div>

    <el-button v-if="this.user==7" type="success" style="height:40px;width: 66px; margin-bottom: 10px" @click="dialogFormVisible = true">添加</el-button>
  <el-table
    :data="tableData"
    height="100vh"
    border
    style="width: 100%;overflow:auto"
    v-infinite-scroll="load"
    >
  <el-table-column prop="userName" label="用户名"  >
  </el-table-column>
  <el-table-column prop="phoneNum" label="电话号码" >
  </el-table-column>

    <el-table-column prop="statusDesc" label="用户状态" >
    </el-table-column>
    <el-table-column prop="createTimeDesc" sortable label="创建时间">
    </el-table-column>
    <el-table-column  label="操作" >
      <template slot-scope="scope">

      <el-button v-if="scope.row.status ==1" style="" size="medium"
                 type="danger"
                 @click="changeStatus(tableData[scope.$index].id,2)">冻结</el-button>
        <el-button v-if="scope.row.status ==2" style="" size="medium"
                   type="success"
                   @click="changeStatus(tableData[scope.$index].id,1)">解除</el-button>
      </template>

    </el-table-column>

</el-table>


    <el-dialog title="添加管理员账号" :visible.sync="dialogFormVisible" :modal-append-to-body='false' width="500px" center="">
      <el-form :model="form" label-width="110px" ref="form" >
        <el-form-item label="用户名" prop="userName" >
          <el-input v-model="form.userName" autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="loginAccount">
          <el-input v-model="form.loginAccount" autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNum">
          <el-input type="tel" v-model="form.phoneNum" autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>
  </div>



</template>

<script>
  export default {
    inject:['reload'],
    data() {
      return {
        options: [{
          value: '0',
          label: '全部',
        },{
          value: '1',
          label: '有效'
        }, {
          value: '2',
          label: '无效'
        }, ],
        value: '',
        tableData:[{    //查询时返回的数据绑定

        }],
        ruleForm:{    //按条件动态查询时的数据绑定
          userName:'',
          phoneNum:'',
          status:'0'
        },
        TypeList:[{

        }], //用来接收从接口中获取出来的值
        form:{
          userName: '',
          loginAccount: '',
          password: '',
          phoneNum: '',
          type:2
        },
        modification:false,
        dialogVisible: false,
        dialogImageUrl: '',
        dialogTableVisible: false,
        dialogFormVisible: false,
        user:0
      }
    },
    created(){

      this.user = window.localStorage.getItem("userId")
    },
    mounted(){
      var that = this;
      this.$axios
        .post('/user/getUserListSearch', {    //初始化页面时，按动态查询条件都为空
          type:2
        })
        .then(successResponse => {
          if (successResponse.data) {
            this.tableData=successResponse.data
          }
        })
        .catch(failResponse => {

        })

    },
    methods:{
      changeStatus(id,status){
        this.$axios.post('/user/changeInfo',{
            id:id,
          status:status
        }).then(response=>{
            this.submitForm();
        })

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //点击取消按钮 dom元素中的事务回滚
      callOff(){
        this.modification=false
        this.amendForm=JSON.parse(JSON.stringify(this.notamend))
      },
      //点击关闭按钮 dom元素中的事务回滚
      handleDialogClose(){
        this.callOff()
      },

      //正则表达式  判断该输入框是否为正整数 且最多输入小数点后两位
      sendid:function(num){
        var regId= /^\d+\.?\d{0,2}$/;
        if(!regId.test(num)){
          this.$message.error("请正确输入数字");
          this.ruleForm.selectid='';
          this.amendForm.productPrice='';
        }
      },

      //清除表单 当点击取消或者重置时
      resetForm() {
        this.$refs.ruleForm.resetFields();
      },
      //按条件动态查询结果
      submitForm(){

        this.$axios
          .post('/user/getUserListSearch', {
            userName:  this.ruleForm.worksName,
            phoneNum: this.ruleForm.createName,
            status: this.ruleForm.status,
            type:2
          })
          .then(successResponse => {
            if (successResponse.data) {

              this.tableData=successResponse.data
            }
          })
          .catch(failResponse => {
          })
      },
      //文件上传成功的钩子函数
      handleSuccess(res, file){
        this.$message.success("图片上传成功");
        if (file.response.code===200) {
          this.amendForm.productIcon=file.response.message
          //将返回的文件储存路径赋值picture字段
        }
      },
      handleRemove(file, fileList) {
        this.$message.success("删除成功");
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      resetRegister(){
        this.form()
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
              this.dialogFormVisible = false
              this.$refs['form'].resetFields();
            }
            if (successResponse.data) {
              this.$message('注册成功');
              this.submitForm();
              this.dialogFormVisible = false
              this.$refs['form'].resetFields();
            }else{
              this.$message({
                message:'注册失败！',
                type:'error'
              });
              this.dialogFormVisible = false
              this.$refs['form'].resetFields();
            }
          })
          .catch(failResponse => {
          })
      }
    }
  };
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-form-item{

  }
  .box-card {
    width: 100%;
    /*height: 300px;*/

  }
  .el-button{
    padding: 6px;
  }
  .el-switch{
    height: 52px;

  }
  .select{
    margin-bottom: 10px;
  }
</style>
