<template>
<div>
  <H3>最新作品</H3>
  <el-carousel align="center" :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="item in imageList" :key="item">
      <img style="width: 400px;height:300px" class="carousel-image" :src="item" />
    </el-carousel-item>
  </el-carousel>
  <H3>优秀作品展示</H3>
  <el-row>
    <el-col :span="6" v-for="item in highScore" :key="item" :offset="index > 0 ? 2 : 0" style="margin-left: 80px">
      <el-card :body-style="{ padding: '0px' }">
        <img align="center" style="width: 250px;height:250px"  :src="item.fileUrl" class="image">
        <div style="padding: 14px;">
          <span>作品名：{{item.worksName}}</span><br/>
          <span>作品介绍：{{item.worksDesc}}</span><br/>
          <span>总得分：{{item.score}}</span><br/>
          <div class="bottom clearfix">
            <time class="time">创建时间: {{item.createTimeDesc}}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
  export default {
    inject:['reload'],
    data() {
      return {
        imageList:[

        ],
        highScore:[],
        currentDate: new Date()
      }

    },
    created(){
      this.mounted();

    },
    mounted(){
      this.$axios
        .post('/works/getNew', {    //初始化页面时，按动态查询条件都为空

        })
        .then(successResponse => {

            this.imageList=successResponse.data

        })
        .catch(failResponse => {

        })

      this.$axios
        .post('/works/getHighScore', {    //初始化页面时，按动态查询条件都为空

        })
        .then(successResponse => {
console.log(successResponse)
            this.highScore=successResponse.data

        })
        .catch(failResponse => {

        })
    },
    methods:{

      },
      //提交修改

  };
</script>

<style scoped>

</style>
