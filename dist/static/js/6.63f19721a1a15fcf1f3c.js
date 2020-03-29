webpackJsonp([6],{"68Oq":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o("mvHQ"),a=o.n(s),r={inject:["reload"],data:function(){return{options:[{value:"0",label:"全部"},{value:"1",label:"有效"},{value:"2",label:"无效"}],value:"",tableData:[{}],ruleForm:{userName:"",phoneNum:"",status:"0"},TypeList:[{}],form:{userName:"",loginAccount:"",password:"",phoneNum:"",type:2},modification:!1,dialogVisible:!1,dialogImageUrl:"",dialogTableVisible:!1,dialogFormVisible:!1,user:0}},created:function(){this.user=window.localStorage.getItem("userId")},mounted:function(){var e=this;this.$axios.post("/user/getUserListSearch",{type:2}).then(function(t){t.data&&(e.tableData=t.data)}).catch(function(e){})},methods:{changeStatus:function(e,t){var o=this;this.$axios.post("/user/changeInfo",{id:e,status:t}).then(function(e){o.submitForm()})},handleClose:function(e){this.$confirm("确认关闭？").then(function(t){e()}).catch(function(e){})},callOff:function(){this.modification=!1,this.amendForm=JSON.parse(a()(this.notamend))},handleDialogClose:function(){this.callOff()},sendid:function(e){/^\d+\.?\d{0,2}$/.test(e)||(this.$message.error("请正确输入数字"),this.ruleForm.selectid="",this.amendForm.productPrice="")},resetForm:function(){this.$refs.ruleForm.resetFields()},submitForm:function(){var e=this;this.$axios.post("/user/getUserListSearch",{userName:this.ruleForm.worksName,phoneNum:this.ruleForm.createName,status:this.ruleForm.status,type:2}).then(function(t){t.data&&(e.tableData=t.data)}).catch(function(e){})},handleSuccess:function(e,t){this.$message.success("图片上传成功"),200===t.response.code&&(this.amendForm.productIcon=t.response.message)},handleRemove:function(e,t){this.$message.success("删除成功")},handlePreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},resetRegister:function(){this.form()},register:function(){var e=this;this.$axios.post("/user/register",this.$qs.stringify({userName:this.form.userName,loginAccount:this.form.loginAccount,password:this.form.password,phoneNum:this.form.phoneNum,age:this.form.age,gender:this.form.gender,profession:this.form.profession,type:this.form.type})).then(function(t){200!=t.status&&(e.$message({message:"注册失败！",type:"error"}),e.dialogFormVisible=!1,e.$refs.form.resetFields()),t.data?(e.$message("注册成功"),e.submitForm(),e.dialogFormVisible=!1,e.$refs.form.resetFields()):(e.$message({message:"注册失败！",type:"error"}),e.dialogFormVisible=!1,e.$refs.form.resetFields())}).catch(function(e){})}}},i={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"select"},[o("el-card",{staticClass:"box-card",staticStyle:{height:"auto"}},[o("div",[o("i",{staticClass:"el-icon-search"}),o("span",{staticStyle:{margin:"10px"}},[e._v("筛选搜索")])]),e._v(" "),o("el-form",{ref:"ruleForm",attrs:{inline:!0,model:e.ruleForm}},[o("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[o("el-input",{attrs:{placeholder:"用户名"},model:{value:e.ruleForm.userName,callback:function(t){e.$set(e.ruleForm,"userName",t)},expression:"ruleForm.userName"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"电话",prop:"phone_num"}},[o("el-input",{attrs:{placeholder:"电话"},model:{value:e.ruleForm.phoneNum,callback:function(t){e.$set(e.ruleForm,"phoneNum",t)},expression:"ruleForm.phoneNum"}})],1),e._v(" "),o("el-form-item",[e._v("\n          用户状态\n          "),o("el-select",{attrs:{label:"用户状态",placeholder:"请选择"},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},e._l(e.options,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),o("el-form-item",[o("el-button",{staticStyle:{"margin-left":"500px",height:"40px",width:"66px"},on:{click:e.resetForm}},[e._v("重置")]),e._v(" "),o("el-button",{staticStyle:{height:"40px",width:"66px"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("查询")])],1)],1)],1)],1),e._v(" "),7==this.user?o("el-button",{staticStyle:{height:"40px",width:"66px","margin-bottom":"10px"},attrs:{type:"success"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("添加")]):e._e(),e._v(" "),o("el-table",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.load,expression:"load"}],staticStyle:{width:"100%",overflow:"auto"},attrs:{data:e.tableData,height:"100vh",border:""}},[o("el-table-column",{attrs:{prop:"userName",label:"用户名"}}),e._v(" "),o("el-table-column",{attrs:{prop:"phoneNum",label:"电话号码"}}),e._v(" "),o("el-table-column",{attrs:{prop:"statusDesc",label:"用户状态"}}),e._v(" "),o("el-table-column",{attrs:{prop:"createTimeDesc",sortable:"",label:"创建时间"}}),e._v(" "),o("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?o("el-button",{attrs:{size:"medium",type:"danger"},on:{click:function(o){return e.changeStatus(e.tableData[t.$index].id,2)}}},[e._v("冻结")]):e._e(),e._v(" "),2==t.row.status?o("el-button",{attrs:{size:"medium",type:"success"},on:{click:function(o){return e.changeStatus(e.tableData[t.$index].id,1)}}},[e._v("解除")]):e._e()]}}])})],1),e._v(" "),o("el-dialog",{attrs:{title:"添加管理员账号",visible:e.dialogFormVisible,"modal-append-to-body":!1,width:"500px",center:""},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[o("el-form",{ref:"form",attrs:{model:e.form,"label-width":"110px"}},[o("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[o("el-input",{staticStyle:{width:"auto"},attrs:{autocomplete:"off"},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName",t)},expression:"form.userName"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"账号",prop:"loginAccount"}},[o("el-input",{staticStyle:{width:"auto"},attrs:{autocomplete:"off"},model:{value:e.form.loginAccount,callback:function(t){e.$set(e.form,"loginAccount",t)},expression:"form.loginAccount"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"密码",prop:"password"}},[o("el-input",{staticStyle:{width:"auto"},attrs:{type:"password",autocomplete:"off"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"电话",prop:"phoneNum"}},[o("el-input",{staticStyle:{width:"auto"},attrs:{type:"tel",autocomplete:"off"},model:{value:e.form.phoneNum,callback:function(t){e.$set(e.form,"phoneNum",t)},expression:"form.phoneNum"}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.register}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=o("VU/8")(r,i,!1,function(e){o("TIb1")},"data-v-56d93de9",null);t.default=l.exports},TIb1:function(e,t){}});
//# sourceMappingURL=6.63f19721a1a15fcf1f3c.js.map