<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;overflow:auto"
      height="600"
      v-infinite-scroll="load"
    >
      <el-table-column
        prop="worksName"
        label="作品名"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="name"
        label="作品"
        width="auto">
        <template slot-scope="scope">
          <img :src="scope.row.fileUrl" alt="错误" height="100px" width="100px">
        </template>

      </el-table-column>
      <el-table-column
        prop="worksDesc"
        label="作品介绍"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="createName"
        label="作者"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="createTimeDesc"
        label="提交时间"
        width="auto">
      </el-table-column>
      <el-table-column

        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="score(scope.row)">评分</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog title="作品评分" :visible.sync="dialogFormVisible" :modal-append-to-body='false' width="500px" center="">
      <el-form :model="scoreForm" label-width="110px" ref="form" >
        <el-form-item label="作品名" prop="worksName" >
          <el-input disabled=true v-model="scoreForm.worksName" autocomplete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="评分" prop="score" >
        <div class="block">
          <span class="demonstration">评分</span>
          <el-rate
            v-model="value2"
            :colors="colors">
          </el-rate>
        </div>
        </el-form-item>
        <el-form-item label="评分意见" prop="opinion" >
          <el-input type="textarea" v-model="scoreForm.opinion"   autocomplete="off" style="width: auto"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        dialogFormVisible:false,
        value2:'',
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        scoreForm:{
          worksName:'',
          opinion:'',

        },
        worksId:'',
      }

    },
    created() {
      this.mounted();

    },
    mounted() {
      this.getWorks()
    },
    methods: {
      getWorks() {
        this.$axios
          .get('/works/getWorksUnScore?id=' + window.localStorage.getItem("userId"), {})
          .then(successResponse => {
            this.tableData = successResponse.data
          })
          .catch(failResponse => {
          })
      },
      submitForm(){
        this.$axios
          .post('/score/saveScore', {
            batch:window.localStorage.getItem("batch"),
            opinion:this.scoreForm.opinion,
            raterId:window.localStorage.getItem("userId"),
            rounds: window.localStorage.getItem("rounds"),
            score: this.value2,
            worksId: this.worksId
          })
          .then(successResponse => {
            if(successResponse.status==200){
              this.scoreForm.opinion=""
                this.value2=""
              this.dialogFormVisible=false
              this.getWorks()
            }

          })
          .catch(failResponse => {
          })
      },
      score(data){
        this.scoreForm.worksName=data.worksName
        this.worksId = data.id
        this.dialogFormVisible=true
      },
      cancel(){
        this.scoreForm.opinion=""
        this.value2=""
        this.dialogFormVisible=false
      }
    },
    //提交修改

  };
</script>

<style scoped>

</style>
