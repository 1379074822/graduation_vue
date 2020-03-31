<template>
  <div>
    <div class="select">
      <el-card class="box-card" style="height: auto">
        <div><i class="el-icon-search"></i><span style="margin: 10px">筛选搜索</span></div>

        <el-form :inline="true" ref="ruleForm" :model="ruleForm">
          <el-form-item label="用户名" prop="userName">
            <el-input placeholder="用户名" v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone_num">
            <el-input placeholder="电话" v-model="ruleForm.phoneNum"></el-input>
          </el-form-item>
          <el-form-item label="职称" prop="phone_num">
            <el-input placeholder="职称" v-model="ruleForm.level"></el-input>
          </el-form-item>
          <el-form-item>
            专业
            <el-select v-model="ruleForm.profession" label="专业" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
            <el-button style=" height:40px;width: 66px;" type="primary" @click="submitForm('ruleForm')">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <el-button type="primary" @click="exportResult(2)">导出数据</el-button>
    <el-button type="primary" @click="exportResult(1)">导出模板</el-button>
    <el-upload
      class=""
      action="http://47.103.29.16:8081/user/upload"
      :on-remove="handleRemove"
      accept=".xls,.xlsx"
      :on-success="success"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button type="primary">导入</el-button>
    </el-upload>

    <el-table
      :data="tableData"
      height="100vh"
      border
      style="width: 100%;overflow:auto"
      v-infinite-scroll="load"
    >
      <el-table-column sortable prop="userName" label="用户名">
      </el-table-column>
      <el-table-column  prop="phoneNum" label="电话号码">
      </el-table-column>
      <el-table-column sortable prop="age" label="年龄">
      </el-table-column>
      <el-table-column sortable prop="professionDesc" label="专业领域">
      </el-table-column>
      <el-table-column sortable prop="level" label="职称">
      </el-table-column>
      <el-table-column sortable prop="genderDesc" label="性别">
      </el-table-column>
      <el-table-column sortable prop="statusDesc" label="用户状态">
      </el-table-column>
      <el-table-column sortable prop="createTimeDesc" label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">

          <el-button v-if="scope.row.status ==1" style="" size="medium"
                     type="danger"
                     @click="changeStatus(tableData[scope.$index].id,2)">冻结
          </el-button>
          <el-button v-if="scope.row.status ==2" style="" size="medium"
                     type="success"
                     @click="changeStatus(tableData[scope.$index].id,1)">解除
          </el-button>
        </template>

      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        options: [{
          value: '0',
          label: '全部',
        }, {
          value: '1',
          label: '有效'
        }, {
          value: '2',
          label: '无效'
        },],

        options1: [{
          value: '0',
          label: '全部',
        }, {
          value: '1',
          label: '理论'
        }, {
          value: '2',
          label: '新闻'
        }, {
          value: '3',
          label: '出版'
        }, {
          value: '4',
          label: '文艺'
        }, {
          value: '5',
          label: '文化经营管理'
        },
        ],
        value: '',
        tableData: [{    //查询时返回的数据绑定

        }],
        ruleForm: {    //按条件动态查询时的数据绑定
          userName: '',
          phoneNum: '',
          status: '0',
          level: '',
          profession: '0'
        },
        TypeList: [{}], //用来接收从接口中获取出来的值

        modification: false,
        dialogVisible: false,
        dialogImageUrl: '',

      }

    },
    created() {
      this.mounted();

    },
    mounted() {
      var that = this;
      this.$axios
        .post('/user/getUserListSearch', {    //初始化页面时，按动态查询条件都为空
          type: 3
        })
        .then(successResponse => {
          if (successResponse.data) {
            this.tableData = successResponse.data
          }
        })
        .catch(failResponse => {

        })
    },

    methods: {
      changeStatus(id, status) {
        this.$axios.post('/user/changeInfo', {
          id: id,
          status: status
        }).then(response => {
          this.submitForm();
        })

      },

      //点击取消按钮 dom元素中的事务回滚
      callOff() {
        this.modification = false
        this.amendForm = JSON.parse(JSON.stringify(this.notamend))
      },
      //点击关闭按钮 dom元素中的事务回滚
      handleDialogClose() {
        this.callOff()
      },
      exportResult(a) {
        if (a == 2) {
          // window.open('http://47.103.29.16:8081/export/userExcel?status='+ this.ruleForm.status+'&userName=' + this.ruleForm.userName==null?null:this.ruleForm.userName + "&phoneNum=" + this.ruleForm.phoneNum==null?null:this.ruleForm.phoneNum
          // + "&level=" + this.ruleForm.level==null?null:this.ruleForm.level+ "&profession=" + this.ruleForm.profession)
          this.open2()
        } else {
          window.open('http://localhost:8081/export/userExcel?isTemplate=' + a)

        }
      },
      open2(){
        var winHeight = window.document.documentElement.clientHeight-10;
        var url = 'http://localhost:8081/export/userExcel';

        var formStr = '<form style="visibility:hidden;" method="POST" action="' + url + '">' +
          '<input type="hidden" name="profession" value="' + encodeURIComponent(this.ruleForm.profession == 0 ? 0 : this.ruleForm.profession) + '" />' +
          '<input type="hidden" name="userName" value="' + encodeURIComponent(this.ruleForm.userName == null ? null : this.ruleForm.userName) + '" />'+
          '<input type="hidden" name="phoneNum" value="' + encodeURIComponent(this.ruleForm.phoneNum == null ? null : this.ruleForm.phoneNum) + '" />'+
          '<input type="hidden" name="level" value="' + encodeURIComponent(this.ruleForm.level == null ? null : this.ruleForm.level) + '" />'+
          '<input type="hidden" name="status" value="' + encodeURIComponent(this.ruleForm.status) + '" />'+
          '<input type="hidden" name="isTemplate" value="' + encodeURIComponent(2) + '" />'+
          '<input type="hidden" name="type" value="' + encodeURIComponent(3) + '" />'+
          '</form>';

        var win = window.open("", "_blank", "height=" + winHeight
          + ",top=80,left=80,toolbar=no, menubar=no, scrollbars=yes, resizable=yes");
        win.document.body.innerHTML = formStr;
        win.document.forms[0].submit();
        // 监听窗口关闭事件
         window.close()
      },
      open() {
        var url = "'http://localhost:8081/export/userExcel";
        // 请求参数 postData
        var postData = {};
        postData.profession =this.ruleForm.profession == 0 ? 0 : this.ruleForm.profession;
        postData.userName = this.ruleForm.userName == null ? null : this.ruleForm.userName;
        postData.phoneNum = this.ruleForm.phoneNum == null ? null : this.ruleForm.phoneNum;
        postData.level =this.ruleForm.level == null ? null : this.ruleForm.level;
        postData.status = this.ruleForm.status;
        this.openNewWindow(url, postData);
      },

      /**
       *
       * @param url 请求地址
       * @param postData 请求参数
       */
      openNewWindow(url, postData) {

        var newWin = window.open("", "_blank");

        // 组装form表单
        var html = "<form action='" + url + "' method='post'>";
        jQuery.each(postData, function (i, obj) {
          html += "<input type='text' name='" + i + "' value='" + obj + "' style='display: none'>";
        });
        html += "</form>";
        newWin.document.body.innerHTML = html;
        newWin.document.forms[0].submit();


      },

      //正则表达式  判断该输入框是否为正整数 且最多输入小数点后两位
      sendid: function (num) {
        var regId = /^\d+\.?\d{0,2}$/;
        if (!regId.test(num)) {
          this.$message.error("请正确输入数字");
          this.ruleForm.selectid = '';
          this.amendForm.productPrice = '';
        }
      },

      //清除表单 当点击取消或者重置时
      resetForm() {
        this.$refs.ruleForm.resetFields();
      },
      success(){
        this.submitForm()
      },
      //按条件动态查询结果
      submitForm() {

        this.$axios
          .post('/user/getUserListSearch', {
            userName: this.ruleForm.worksName,
            phoneNum: this.ruleForm.createName,
            status: this.ruleForm.status,
            type: 3,
            level: this.ruleForm.level,
            profession: this.ruleForm.profession
          })
          .then(successResponse => {
            if (successResponse.data) {

              this.tableData = successResponse.data
            }
          })
          .catch(failResponse => {
          })
      },
      //文件上传成功的钩子函数
      handleSuccess(res, file) {
        this.$message.success("图片上传成功");
        if (file.response.code === 200) {
          this.amendForm.productIcon = file.response.message
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
      //上传的文件个数超出设定时触发的函数
      onExceed(files, fileList) {
        this.$message({
          type: 'info',
          message: '最多只能上传一个图片',
          duration: 2000
        });
      },
      //文件上传前的前的钩子函数
      //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          alert('上传图片必须是JPG/GIF/PNG/BMP 格式!');
        }
        if (!isLt2M) {
          alert('上传图片大小不能超过 2MB!');
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
      },
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

  .el-form-item {

  }

  .box-card {
    width: 100%;
    /*height: 300px;*/

  }

  .el-button {
    padding: 6px;
  }

  .el-switch {
    height: 52px;

  }

  .select {
    margin-bottom: 10px;
  }
</style>
