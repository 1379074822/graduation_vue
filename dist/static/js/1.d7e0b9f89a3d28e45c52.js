webpackJsonp([1],{"1mrr":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"Report",data:function(){return{highScore:[],voteTime:""}},mounted:function(){var t=this;this.getHighRate(),this.$axios.get("/config/getConfig",{}).then(function(e){console.log(e),t.voteTime=e.data.voteStatus,window.localStorage.setItem("batch",e.data.batch)}).catch(function(t){})},methods:{vote:function(t){var e=this;this.$axios.post("/works/vote",{batch:window.localStorage.getItem("batch"),id:t,createId:window.localStorage.getItem("userId")}).then(function(t){200==t.status&&(e.getHighRate(),e.$message({showClose:!0,message:t.data}))}).catch(function(t){})},exportReport:function(){window.open("http://47.103.29.16:8081/export/getHigh?batch="+window.localStorage.getItem("batch"))},stopVote:function(){var t=this;this.$axios.post("/config/updateVote",{id:1,voteStatus:2}).then(function(e){console.log(e),t.voteTime=e.data.voteStatus}).catch(function(t){})},startVote:function(){var t=this;this.$axios.post("/config/updateVote",{id:1,voteStatus:1,batch:window.localStorage.getItem("batch")+1}).then(function(e){console.log(e),t.voteTime=e.data.voteStatus}).catch(function(t){})},getHighRate:function(){var t=this;this.$axios.post("/works/getHighRate",{}).then(function(e){t.highScore=e.data}).catch(function(t){})}}},i={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("H3",[t._v("优秀作品展示")]),t._v(" "),o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",round:""},on:{click:t.stopVote}},[t._v("终止投票")]),t._v(" "),o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",round:""},on:{click:t.exportReport}},[t._v("导出评审报告")]),t._v(" "),o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",round:""},on:{click:t.startVote}},[t._v("开启下一轮评选")]),t._v(" "),o("el-row",t._l(t.highScore,function(e){return o("el-col",{key:e,staticStyle:{"margin-left":"80px","margin-top":"30px"},attrs:{span:6,offset:t.index>0?2:0}},[o("el-card",{attrs:{align:"center","body-style":{padding:"0px"}}},[o("img",{staticClass:"image",staticStyle:{width:"250px",height:"250px"},attrs:{align:"center",src:e.fileUrl}}),t._v(" "),o("div",{staticStyle:{padding:"14px"}},[o("span",[t._v("作品名："+t._s(e.worksName))]),o("br"),t._v(" "),o("span",[t._v("作品介绍："+t._s(e.worksDesc))]),o("br"),t._v(" "),o("span",[t._v("总票数："+t._s(e.score))]),o("br"),t._v(" "),o("div",{staticClass:"bottom clearfix"},[1==t.voteTime?o("el-button",{staticClass:"button",attrs:{type:"primary"},on:{click:function(o){return t.vote(e.id)}}},[t._v("投他一票")]):t._e()],1)])])],1)}),1)],1)},staticRenderFns:[]};var n=o("VU/8")(a,i,!1,function(t){o("tM+g")},"data-v-f5e70cce",null);e.default=n.exports},"tM+g":function(t,e){}});
//# sourceMappingURL=1.d7e0b9f89a3d28e45c52.js.map