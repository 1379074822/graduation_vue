webpackJsonp([4],{Ec20:function(t,e){},RzJC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={data:function(){return{tableData:[{}],countWorks:[],ruleForm:{worksName:"",createName:""},TypeList:[{}],amendForm:{productName:"",productPrice:"",productIcon:"",productStatus:"",categoryCode:""},modification:!1,dialogVisible:!1,dialogImageUrl:"",notamend:[],StatusList:[{value:0,label:"上架"},{value:1,label:"下架"}]}},mounted:function(){var t=this;this.$axios.get("/works/getCount",{}).then(function(e){console.log(e.data),t.countWorks=e.data,t.initChart()}).catch(function(t){})},methods:{initChart:function(){this.$echarts.init(document.getElementById("homeChart")).setOption({backgroundColor:"#2c343c",title:{text:"作品数统计",left:"center",top:20,textStyle:{color:"#ccc"}},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},visualMap:{show:!0,min:0,max:2,inRange:{colorLightness:[0,.5]},color:["red","green","yellow","blue"]},series:[{name:"作品类型",type:"pie",radius:"55%",center:["50%","50%"],data:this.countWorks.sort(function(t,e){return t.value-e.value}),roseType:"radius",label:{color:"rgba(255, 255, 255, 0.3)"},labelLine:{lineStyle:{color:"rgba(255, 255, 255, 0.3)"},smooth:.2,length:10,length2:20},itemStyle:{shadowBlur:200,shadowColor:"rgba(0, 0, 0, 0.5)"},animationType:"scale",animationEasing:"elasticOut",animationDelay:function(t){return 200*Math.random()}}]})}}},n={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{style:{width:"100%",height:"100%",margin:"0 auto"},attrs:{id:"homeChart"}})},staticRenderFns:[]};var r=a("VU/8")(o,n,!1,function(t){a("Ec20")},"data-v-7aeaef1d",null);e.default=r.exports}});
//# sourceMappingURL=4.69cd15acffa787bdaffb.js.map