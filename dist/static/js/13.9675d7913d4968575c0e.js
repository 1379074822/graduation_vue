webpackJsonp([13],{"/UAI":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"MessageList",data:function(){return{dialogVisible:!1,reverse:!0,activities:[],form:{text:""}}},methods:{handleClose:function(e){this.$confirm("确认关闭？").then(function(t){e()}).catch(function(e){})},submitForm:function(){var e=this;this.$axios.post("/message/saveMessage",{text:this.form.text,userId:JSON.parse(window.localStorage.getItem("user")).id,level:1}).then(function(t){e.dialogVisible=!1,e.form.text="",e.getMessage()}).catch(function(e){})},getMessage:function(){var e=this;this.$axios.get("/message/getMessage",{}).then(function(t){console.log("1",t),e.activities=t.data}).catch(function(e){})}},mounted:function(){this.getMessage()}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"block"},[i("div",{staticClass:"radio"},[e._v("\n    排序：\n    "),i("el-radio-group",{model:{value:e.reverse,callback:function(t){e.reverse=t},expression:"reverse"}},[i("el-radio",{attrs:{label:!0}},[e._v("倒序")]),e._v(" "),i("el-radio",{attrs:{label:!1}},[e._v("正序")])],1)],1),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("留下足迹")]),e._v(" "),i("el-timeline",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.load,expression:"load"}],staticStyle:{overflow:"auto","margin-top":"100px"},attrs:{reverse:e.reverse}},e._l(e.activities,function(t,s){return i("el-timeline-item",{key:s,staticClass:"infinite-list-item",attrs:{timestamp:t.timestamp}},[e._v("\n      "+e._s(t.content)+"\n\n    ")])}),1),e._v(" "),i("el-dialog",{attrs:{title:"添加留言",visible:e.dialogVisible,width:"30%","modal-append-to-body":!1,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-form",{model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},[i("el-form-item",{attrs:{label:"留言内容",prop:"text"}},[i("el-input",{attrs:{rows:2,type:"textarea"},model:{value:e.form.text,callback:function(t){e.$set(e.form,"text",t)},expression:"form.text"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var a=i("VU/8")(s,o,!1,function(e){i("pBTd")},"data-v-155b9821",null);t.default=a.exports},pBTd:function(e,t){}});
//# sourceMappingURL=13.9675d7913d4968575c0e.js.map