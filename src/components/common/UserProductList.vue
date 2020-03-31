<template>
  <div>
    <div class="select">
      <el-card class="box-card" style="height: auto">
        <div><i class="el-icon-search"></i><span style="margin: 10px">筛选搜索</span></div>

        <el-form :inline="true" ref="ruleForm" :model="ruleForm">
          <el-form-item label="作品名称" prop="worksName">
            <el-input placeholder="作品名称" v-model="ruleForm.worksName"></el-input>
          </el-form-item>
          <el-form-item label="作品提交人" prop="createName">
            <el-input placeholder="提交人" v-model="ruleForm.createName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left:500px;height:40px;width: 66px; " @click="resetForm">重置</el-button>
            <el-button style=" height:40px;width: 66px;" type="primary" @click="submitForm('ruleForm')">查询</el-button>
            <el-button style=" height:40px;width: 66px;" type="primary" @click="exportList">导出</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>


    <el-table
      :data="tableData"
      height="600px"
      border
      style="width: 100%;overflow:auto"
      v-infinite-scroll="load"
    >
      <el-table-column prop="worksName" sortable label="作品名" :index="productId">
      </el-table-column>
      <el-table-column prop="worksDesc" label="作品介绍">
      </el-table-column>
      <el-table-column label="作品图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.fileUrl" alt="错误" height="100px" width="100px">
        </template>
      </el-table-column>
      <el-table-column prop="score"  sortable label="作品得分">
      </el-table-column>
      <el-table-column prop="statusDesc" sortable   label="作品状态">
      </el-table-column>
      <el-table-column prop="createTimeDesc" sortable label="创建时间">
      </el-table-column>
      <el-table-column prop="createName" sortable label="创建人">
      </el-table-column>
      <el-table-column prop="batch" label="批次">
      </el-table-column>


    </el-table>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        tableData: [{    //查询时返回的数据绑定

        }],
        ruleForm: {    //按条件动态查询时的数据绑定
          worksName: '',
          createName: '',

        },
        TypeList: [{
          // categoryName:'',
          // categoryCode:''
        }], //用来接收从接口中获取出来的值
        amendForm: {    //修改商品数据时的数据绑定
          productName: '',
          productPrice: '',
          productIcon: '',
          productStatus: '',
          categoryCode: '',
        },
        modification: false,
        dialogVisible: false,
        dialogImageUrl: '',
        notamend: [], //用来接受回滚时的数据
        StatusList: [
          {
            value: 0,
            label: '上架'
          },
          {
            value: 1,
            label: '下架'
          }
        ],
      }

    },
    created() {
      this.mounted();

    },
    mounted() {
      var that = this;
      this.$axios
        .post('/works/getAllWithScoreSearch', {    //初始化页面时，按动态查询条件都为空

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
        this.$axios.post('/works/updateWorks', {
          id: id,
          status: status
        }).then(response => {

          this.submitForm();

        })

      },
      openPostWindow(url, data, name) {
        var tempForm = document.createElement("form");
        tempForm.id = "tempForm1";
        tempForm.method = "post";
        tempForm.action = url;
        tempForm.target = name;

        var hideInput = document.createElement("input");
        hideInput.type = "hidden";
        hideInput.name = "worksName"
        hideInput.value = this.ruleForm.worksName;
        tempForm.appendChild(hideInput);

        var hideInput2 = document.createElement("input");
        hideInput2.type = "hidden";
        hideInput2.name = "createName"
        hideInput2.value = this.ruleForm.createName;
        tempForm.appendChild(hideInput2);
        tempForm.attachEvent("onsubmit", function () {
          openWindow(name);
        });
        document.body.appendChild(tempForm);

        tempForm.fireEvent("onsubmit");
        tempForm.submit();
        document.body.removeChild(tempForm);
      },
      openWindow(name) {
        window.open('about:blank', name, 'height=400, width=400, top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes,location=yes, status=yes');
      },
      exportList() {
        window.open('http://localhost:8081/export/excel?worksName=' + this.ruleForm.worksName + "&createName=" + this.ruleForm.createName)
      },
      //提交修改
      SubmitFrom() {
        this.$axios.post('/product/amend', {
          productId: this.amendForm.productId,
          productName: this.amendForm.productName,
          productPrice: this.amendForm.productPrice,
          productIcon: this.amendForm.productIcon,
          productStatus: this.amendForm.productStatus,
          categoryCode: this.amendForm.categoryCode,
          amendId: localStorage.getItem("userId"),
          amendName: JSON.parse(window.localStorage.getItem('user')).username
        }).then(response => {
          if (response.data.code === 200) {
            // alert(response.data.message)
            this.$message.info("修改成功");
            this.reload();
          } else if (response.data.code === 400) {
            alert(response.data.message)
            this.$message.error("修改失败");
            this.modification = false;
            this.reload();
          }
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

      //正则表达式  判断该输入框是否为正整数 且最多输入小数点后两位
      sendid: function (num) {
        var regId = /^\d+\.?\d{0,2}$/;
        if (!regId.test(num)) {
          this.$message.error("请正确输入数字");
          this.ruleForm.selectid = '';
          this.amendForm.productPrice = '';
        }
      },
      //下拉框动态查询商品类型
      selectCode(num) {
        this.$axios.get('/category/findall')
          .then(res => {
            if (res.data) {
              this.ruleForm.CodeList = res.data
            }
          })
          .catch(failResponse => {
          })
      },
      //清除表单 当点击取消或者重置时
      resetForm() {
        this.$refs.ruleForm.resetFields();
      },
      //按条件动态查询结果
      submitForm() {

        this.$axios
          .post('/works/getAllWithScoreSearch', {
            worksName: this.ruleForm.worksName,
            createName: this.ruleForm.createName,
            // page:this.page,
            // rows:20
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
