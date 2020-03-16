<template>
  <div class="block">
    <div class="radio">
      排序：
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>

    <el-timeline :reverse="reverse" v-infinite-scroll="load" style="overflow:auto;margin-top: 100px">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
        class="infinite-list-item">
        {{activity.content}}

      </el-timeline-item>
    </el-timeline>
  </div>

</template>

<script>
    export default {
        name: "MessageList",
      data() {
        return {
          reverse: true,
          activities: []
        };
        },
      mounted(){
        var that = this;
        this.$axios
          .get('/message/getMessage', {    //初始化页面时，按动态查询条件都为空

          })
          .then(successResponse => {
            console.log("1",successResponse)
              this.activities=successResponse.data
          })
          .catch(failResponse => {

          })
      }
    }
</script>

<style scoped>

</style>
