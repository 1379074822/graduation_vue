<template>
  <div class="block">
    <div class="radio">
      排序：
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>
    <el-button type="text" @click="dialogVisible = true">留下足迹</el-button>
    <el-timeline :reverse="reverse" v-infinite-scroll="load" style="overflow:auto;margin-top: 100px">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
        class="infinite-list-item">
        {{activity.content}}

      </el-timeline-item>
    </el-timeline>


    <el-dialog
      title="添加留言"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body='false'
      :before-close="handleClose">
      <el-form v-model="form">
        <el-form-item label="留言内容" prop="text">
          <el-input v-model="form.text" :rows="2" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
    </el-dialog>

  </div>

</template>

<script>
  export default {
    name: "MessageList",
    data() {
      return {
        dialogVisible: false,
        reverse: true,
        activities: [],
        form: {
          text: ''
        }
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      submitForm() {
        this.$axios
          .post('/message/saveMessage', {    //初始化页面时，按动态查询条件都为空
            text: this.form.text,
            userId: JSON.parse(window.localStorage.getItem("user")).id,
            level: 1
          })
          .then(successResponse => {
            this.dialogVisible = false
            this.form.text = ''
            this.getMessage()
          })
          .catch(failResponse => {

          })
      },
      getMessage() {
        this.$axios
          .get('/message/getMessage', {    //初始化页面时，按动态查询条件都为空

          })
          .then(successResponse => {
            console.log("1", successResponse)
            this.activities = successResponse.data

          })
          .catch(failResponse => {

          })
      }
    },

    mounted() {
      this.getMessage()
    }
  }
</script>

<style scoped>

</style>
