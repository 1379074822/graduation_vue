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
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2465691165,596834055&fm=26&gp=0.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584355379801&di=9cfd572b7c914a24d20d1ced964b05df&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F12%2F9f5eeec66d799f7a6e0d80ab19299b46.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584355379798&di=f156ab2ae95e7ec4bb788cb3e4d69b73&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F17%2F08%2F06%2F5f6be0f195024eabd6c14a5cbf5f809e.jpg%2521%2Ffwfh%2F804x804%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584355379797&di=ac4f299a56b17c89e3b85101a92cebfe&imgtype=0&src=http%3A%2F%2Fimg010.hc360.cn%2Fhb%2FMTQ1OTg3MzA2NzMzMC0xMTI1MTkwNDUz.jpg"

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
