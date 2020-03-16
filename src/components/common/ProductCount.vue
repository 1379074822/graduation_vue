<template>
  <div  id="homeChart" :style="{width: '100%', height: '100%' ,margin:'0 auto'}"></div>
</template>

<script>
  export default {

    data() {
      return {
        tableData:[{    //查询时返回的数据绑定

        }],
        countWorks:[],

        ruleForm:{    //按条件动态查询时的数据绑定
          worksName:'',
          createName:'',

        },
        TypeList:[{
          // categoryName:'',
          // categoryCode:''
        }], //用来接收从接口中获取出来的值
        amendForm:{    //修改商品数据时的数据绑定
          productName:'',
          productPrice:'',
          productIcon:'',
          productStatus:'',
          categoryCode:'',
        },
        modification:false,
        dialogVisible: false,
        dialogImageUrl: '',
        notamend:[], //用来接受回滚时的数据
        StatusList:[
          {
            value:0,
            label:'上架'
          },
          {
            value:1,
            label:'下架'
          }
        ],
      }

    },

    mounted(){
      this.$axios
        .get('/works/getCount', {    //初始化页面时，按动态查询条件都为空

        })
        .then(successResponse => {
          console.log(successResponse.data)
          this.countWorks=successResponse.data
          this.initChart();
        })
        .catch(failResponse => {

        });


    },
    methods: {
      initChart(){
        var myChart = this.$echarts.init(document.getElementById('homeChart'));
        myChart.setOption({
          backgroundColor: '#2c343c',

          title: {
            text: '作品数统计',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },

          visualMap: {
            show: true,
            min: 0,
            max: 2,
            inRange: {
              colorLightness: [0, 0.5]
            },
            color:['red', 'green','yellow','blue']
          },
          series: [
            {
              name: '作品类型',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: this.countWorks.sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                // color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        });
      }
    }}
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
  .el-form-item{

  }
  .box-card {
    width: 100%;
    /*height: 300px;*/

  }
  .el-button{
    padding: 6px;
  }
  .el-switch{
    height: 52px;

  }
  .select{
    margin-bottom: 10px;
  }
</style>
