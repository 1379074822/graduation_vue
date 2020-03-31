<template>
  <div>
  <H3>优秀作品展示</H3>
    <el-button type="primary" round style="margin-top: 20px" @click="stopVote">终止投票</el-button>
    <el-button type="primary" round style="margin-top: 20px" @click="exportReport">导出评审报告</el-button>
    <el-button type="primary" round style="margin-top: 20px" @click="startVote">开启下一轮评选</el-button>
  <el-row>
    <el-col :span="6" v-for="item in highScore" :key="item" :offset="index > 0 ? 2 : 0" style="margin-left: 80px;margin-top: 30px">
      <el-card align="center" :body-style="{ padding: '0px' }">
        <img align="center" style="width: 250px;height:250px"  :src="item.fileUrl" class="image">
        <div  style="padding: 14px;">
          <span>作品名：{{item.worksName}}</span><br/>
          <span>作品介绍：{{item.worksDesc}}</span><br/>
          <span>总票数：{{item.score}}</span><br/>
          <div class="bottom clearfix">
            <el-button v-if="voteTime==1" type="primary" class="button" @click="vote(item.id)">投他一票</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script>
    export default {
        name: "Report",
      data(){
          return{
            highScore:[],
            voteTime:''
          }
      },
      mounted(){
          if( window.localStorage.getItem("rounds")==1){
            this.$message('还未到达投票阶段');
            this.$router.push("/user/advance")
          }
       this.getHighRate()
        this.$axios
          .get('/config/getConfig', {    //初始化页面时，按动态查询条件都为空

          })
          .then(successResponse => {
            console.log(successResponse)
            this.voteTime = successResponse.data.voteStatus
            window.localStorage.setItem("batch",successResponse.data.batch)
          })
          .catch(failResponse => {

          })

      },
      methods:{
          vote(id){
            this.$axios
              .post('/works/vote', {    //初始化页面时，按动态查询条件都为空
                batch:window.localStorage.getItem("batch"),
                id:id,
                createId:window.localStorage.getItem("userId")
              })
              .then(successResponse => {
                if(successResponse.status ==200){
                  this.getHighRate()
                  this.$message({
                    showClose: true,
                    message: successResponse.data
                  });
                }
              })
              .catch(failResponse => {

              })
        },
        exportReport(){
          window.open('http://localhost:8081/export/getHigh?batch='+window.localStorage.getItem("batch"))

        },
        stopVote(){
          this.$axios
            .post('/config/updateVote', {    //初始化页面时，按动态查询条件都为空
              id:1,
              voteStatus:2
            })
            .then(successResponse => {
              console.log(successResponse)
              this.voteTime = successResponse.data.voteStatus
              window.localStorage.setItem("rounds",3)
            })
            .catch(failResponse => {

            })
        },
        startVote(){
          this.$axios
            .post('/works/deleteGood', {    //初始化页面时，按动态查询条件都为空
            })
            .then(successResponse => {
              this.getHighRate()
            })
            .catch(failResponse => {

            })
          this.$axios
            .post('/config/updateVote', {    //初始化页面时，按动态查询条件都为空
              id:1,
              voteStatus:1,
              batch:1
            })
            .then(successResponse => {
              console.log(successResponse)
              this.voteTime = successResponse.data.voteStatus
              window.localStorage.setItem("rounds",1)
              window.localStorage.setItem("batch",1)
              this.$router.push("/user/advance")
            })
            .catch(failResponse => {

            })
          this.$axios
            .post('/user/init', {    //初始化页面时，按动态查询条件都为空
            })
            .then(successResponse => {

            })
            .catch(failResponse => {

            })
        },
        getHighRate(){
          this.$axios
            .post('/works/getHighRate', {    //初始化页面时，按动态查询条件都为空

            })
            .then(successResponse => {

              this.highScore=successResponse.data

            })
            .catch(failResponse => {

            })
        }
      }
    }
</script>

<style scoped>

</style>
