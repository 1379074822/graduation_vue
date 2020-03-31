<template>
<div style="background-color: white;width: 80%;height: 200px;">
  <el-form v-if="active==0"  :model="formInline" class="demo-form-inline" style="margin-left: 140px;width: 35%;margin-top: 10px">
    <el-form-item label="优秀作品数">
      <el-input type="number" v-model="formInline.number" placeholder="优秀作品数"></el-input>
    </el-form-item>
  </el-form>
  <el-steps :active="active" finish-status="success" style="width: 60%;margin-left: 140px;margin-top: 50px">
    <el-step title="评分阶段" description="请到评分处进行评分"></el-step>
    <el-step title="投票阶段" description="请进行二次投票"></el-step>
    <el-step title="结果产出" description="结果已生成，请查看"></el-step>
  </el-steps>

  <el-button v-if="active==0" style="margin-top: 12px;margin-left: 140px;margin-top: 100px" @click="onSubmit">提交</el-button>
  <el-button v-if="active!=0" style="margin-top: 12px;margin-left: 140px;margin-top: 100px" @click="goReport">前往评审区</el-button>
</div>
</template>

<script>
    export default {
      data() {
        return {
          formInline: {
            number: ''
          },
          active: window.localStorage.getItem("rounds")-1
        }
        },
      methods: {
        onSubmit() {
          this.$axios
            .post('/config/updateConfig', {
              id:1,
              passNum:this.formInline.number,
              numStatus:1,
              batch:window.localStorage.getItem("batch")
            })
            .then(successResponse => {
              if(successResponse.status==200){
                this.$message({
                  message: '已提交优秀作品数，请进行投票！',
                  type: 'success'
                });
               window.localStorage.setItem("rounds",2)
                this.$router.push("/user/report")
              }
            })
            .catch(failResponse => {
            })
        },
        goReport(){
          this.$router.push("/user/report")
        }
      }
    }
</script>

<style scoped>

</style>
