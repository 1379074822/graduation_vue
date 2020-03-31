<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"> 个人信息</span>
        <el-card class="box-card"

                 style="width: 80%;height: 700px;margin-left: 100px;">
          <div slot="header" class="clearfix">

            <el-button style="float: right; padding: 3px 0" type="text" @click="changeInfo">修改个人信息</el-button>
          </div>
          <div class="text item" style="margin-top: 50px;font-size: 20px;margin-left: 230px">
            用户名：{{userInfo.userName}}
          </div>
          <div class="text item" style="font-size: 20px;margin-left: 230px">联系电话：{{userInfo.phoneNum}}</div>

          <div class="text item" style="font-size: 20px;margin-left: 230px">年龄：{{userInfo.age}}</div>
          <div class="text item" style="font-size: 20px;margin-left: 230px">性别：{{userInfo.gender==1?"男":"女"}}</div>
          <div class="text item" style="font-size: 20px;margin-left: 230px">状态：{{userInfo.status==1?"有效":"冻结"}}</div>
          <div class="text item" style="font-size: 20px;margin-left: 230px">
            类别：{{userInfo.type==1?"用户":userInfo.type==2?"管理员":"评委"}}
          </div>
          <div class="text item" v-if="userInfo.type==3" style="font-size: 20px;margin-left: 230px">职称：{{userInfo.level}}</div>
          <div class="text item" v-if="userInfo.type==3" style="font-size: 20px;margin-left: 230px">工作业绩：{{userInfo.workPerform}}</div>
          <div class="text item" v-if="userInfo.type==3" style="font-size: 20px;margin-left: 230px">研究成果：{{userInfo.researchResult}}</div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="密码修改">
        <el-form :label-position="labelPosition" label-width="80px" :model="passwordChange" style="width: 35%;margin-left: 200px " align="center">
          <el-form-item label="登陆账号" style="margin-top: 80px">
            <el-input v-model="passwordChange.loginAccount"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" style="margin-top: 80px">
            <el-input type="password" v-model="passwordChange.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" style="margin-top: 80px">
            <el-input type="password" v-model="passwordChange.newPassword"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 80px">
            <el-button type="primary" @click="changePassword">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if='loginType===1' label="我的作品" style="height: 500px">
        <el-table
          :data="tableData"
          style="width: 100%;margin-left: 200px;overflow:auto"
          height="400"
          v-infinite-scroll="load"
        >
          <el-table-column
            prop="worksName"
            label="作品名"
            width="300">
          </el-table-column>
          <el-table-column
            prop="name"
            label="作品"
            width="400">
            <template slot-scope="scope">
              <img :src="scope.row.fileUrl" alt="错误" height="100px" width="100px">
            </template>

          </el-table-column>
          <el-table-column

            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showWorks(scope.row)">编辑</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>

    </el-tabs>
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible" :modal-append-to-body='false' width="500px" center="">
      <el-form :model="userInfo" label-width="110px" ref="form" >
        <el-form-item label="用户名" prop="userName" >
          <el-input v-model="userInfo.userName" autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age" >
          <el-input v-model="userInfo.age" type="number" autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phoneNum" >
          <el-input v-model="userInfo.phoneNum"  autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item v-if="userInfo.type==3" label="职称" prop="level" >
          <el-input v-model="userInfo.level"  autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" >
          <el-select v-model="userInfo.gender" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="userInfo.type==3" label="专业" >
          <el-select v-model="userInfo.profession" placeholder="请选择专业类型" style="width: auto">
            <el-option label="理论" value="1"></el-option>
            <el-option label="新闻" value="2"></el-option>
            <el-option label="出版" value="3"></el-option>
            <el-option label="文艺" value="4"></el-option>
            <el-option label="文化经营管理" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="userInfo.type==3" label="工作业绩" prop="workPerform" >
          <el-input v-model="userInfo.workPerform"  autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item v-if="userInfo.type==3" label="研究成果" prop="researchResult" >
          <el-input v-model="userInfo.researchResult"  autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item v-if="userInfo.type==3" label="证书照片" prop="paperworks">
          <el-upload
            v-model="userInfo.paperworks"
            action="http://47.103.29.16:8081/works/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview2"
            :on-remove="handleRemove2"
            :on-success="onSuccess2"
            :file-list = imgFileList2
            accept="png;jpg;jpeg;"
            >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible3">
            <img  width="100%" :src="dialogImageUrl2" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>

    </el-dialog>

    <el-dialog title="修改作品" :visible.sync="dialogWorksVisible" :modal-append-to-body='false ' width="500px" center="" @close="dialogClose">
      <el-form v-model="worksFrom" label-width="110px">
        <el-form-item label="作品名"  prop="worksName">
          <el-input v-model="worksFrom.worksName" autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="上传图片(单次一张)" prop="fileUrl">
          <el-upload
            v-model="worksFrom.fileUrl"
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
          <el-select v-model="worksFrom.type" placeholder="请选择">
            <el-option
              v-for="item in options2"
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
                     v-model="worksFrom.worksDesc" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogWorksVisible = false">取 消</el-button>
        <el-button type="primary" @click="createWorks">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "UserMain",
    data() {
      return {
        isCollapse: true,
        activeName: 'first',
        userInfo: {},
        imgFileList:[],
        imgFileList2:[],
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogWorksVisible:false,
        checkedId:'',
        loginType:'',
        dialogImageUrl: '',
        dialogVisible2: false,
        dialogVisible3: false,
        form:{},
        worksFrom:{
        },
        options2: [{
          value: 1,
          label: '自然'
        }, {
          value: 2,
          label: '地理'
        }, {
          value: 3,
          label: '美学'
        }, {
          value: 4,
          label: '科技'
        }, ],
        passwordChange:{
          userName:"",
          password:"",
          newPassword:""
        },
        tableData: [],
        options: [{
          value: 1,
          label: '男'
        }, {
          value: 2,
          label: '女'
        } ],
      };
    },
    methods: {
      handleOpen(key, keyPath) {
      },
      dialogClose() {
        this.imgFileList=[];
      },
      dialogClose2() {
        this.imgFileList2=[];
      },
      handleClick(tab, event) {
      },
      handleRemove(file, fileList) {
        this.imgFileList = []
      },
      handleRemove2(file, fileList) {
        this.imgFileList2 = []
        this.userInfo.paperworks =[]
      },
      onSuccess(response, file, fileList){
        console.log(response)
        this.form.fileUrl = response
        this.worksFrom.fileUrl = response
        this.fileList = []
      },
      onSuccess2(response, file, fileList){
        this.userInfo.paperworks.push(response)
        this.fileList = []
        console.log("===============", this.userInfo.paperworks)
      },
      handlePictureCardPreview(file) {

        this.dialogImageUrl = file.url;
        this.dialogVisible2 = true;
      },
      handlePictureCardPreview2(file) {

        this.dialogImageUrl2 = file.url;
        this.dialogVisible3 = true;
      },
      showWorks(data) {
        this.dialogWorksVisible =true;
        this.checkedId=data.id;
        this.worksFrom=data;
        this.dialogImageUrl= data.fileUrl;
        let obj = new Object();
        obj.url = data.fileUrl
        this.imgFileList.push(obj)
      },
      changeInfo(){
        this.getInfo()
        this.dialogFormVisible = true
        this.imgFileList2 = []
        for (let i = 0; i < this.userInfo.paperworks.length; i++) {
          let obj = new Object();
          obj.url = this.userInfo.paperworks[i]
          this.imgFileList2.push(obj)
        }
      },
      changePassword(){
        this.$axios
          .post('/user/changePassword', {
              id:window.localStorage.getItem("userId"),
              loginAccount:this.passwordChange.loginAccount,
              password:this.passwordChange.password,
              newPassword: this.passwordChange.newPassword
          })
          .then(successResponse => {
            if(successResponse.data){
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
                localStorage.removeItem("user")
                this.$router.push("/login")
            }else{
              this.$message.error('密码错误');
            }

          })
          .catch(failResponse => {
          })
      },
      createWorks(){
        this.$axios
          .post('/works/updateWorks', {
            id:this.checkedId,
            fileUrl:this.worksFrom.fileUrl,
            modifyId:JSON.parse(window.localStorage.getItem("user")).id,
            modifyName:JSON.parse(window.localStorage.getItem("user")).userName,
            worksDesc:this.worksFrom.worksDesc,
            worksName:this.worksFrom.worksName,
            type:this.worksFrom.type
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
              this.dialogWorksVisible = false
            }
          })
          .catch(failResponse => {
          })
      },
      getInfo(){
        this.$axios
          .get('/user/getInfo?userId='+window.localStorage.getItem("userId"), {

          })
          .then(successResponse => {
          window.localStorage.setItem("user",JSON.stringify(successResponse.data))
          this.userInfo = successResponse.data
          this.loginType = successResponse.data.type
        })
          .catch(failResponse => {
          })
      },
      getWorks(){
        this.$axios
          .get('/works/getWorksByUser?createId='+window.localStorage.getItem("userId"), {

          })
          .then(successResponse => {
            this.tableData = successResponse.data
          })
          .catch(failResponse => {
          })
      },
      //按条件动态查询结果
      submitForm() {

        this.$axios
          .post('/user/changeInfo', {
            id:this.userInfo.id,
            userName: this.userInfo.userName,
            phoneNum: this.userInfo.phoneNum,
            age:this.userInfo.age,
            gender:this.userInfo.gender,
            profession:this.userInfo.profession,
            workPerform:this.userInfo.workPerform,
            researchResult:this.userInfo.researchResult,
            paperworks:this.userInfo.paperworks
          })
          .then(successResponse => {
              this.getInfo()
              this.dialogFormVisible =false
          })
          .catch(failResponse => {
          })
      },
    },
    mounted() {
      this.getInfo()
      this.getWorks()
    }
  }
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

  .box-card {
    width: 300px;
  }
</style>
