webpackJsonp([8],{XbI7:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={data:function(){return{dialogImageUrl:"",dialogVisible:!1,disabled:!1,addForm:{productname:"",productprice:"",producticon:"",productcategory:"",TypeList:[{}]},createid:"",createname:""}},methods:{sendprice:function(e){/^\d+\.?\d{0,2}$/.test(e)||(this.$message.error("请正确输入数字"),this.addForm.productprice="")},SubmitFrom:function(){var e=this;this.$axios.post("/product/save",{productname:this.addForm.productname,productprice:this.addForm.productprice,producticon:this.picture,productcategory:this.addForm.productcategory,createId:localStorage.getItem("userId"),createName:JSON.parse(window.localStorage.getItem("user")).username}).then(function(t){200===t.data.code?(alert(t.data.message),e.$refs.addForm.resetFields()):400===t.data.code&&(alert(t.data.message),e.$refs.addForm.resetFields())})},resetForm:function(){this.$refs.addForm.resetFields()},selectCode:function(e){var t=this;this.$axios.get("/category/findall").then(function(e){e.data&&(t.addForm.TypeList=e.data)}).catch(function(e){})},handleSuccess:function(e,t){this.$message.success("图片上传成功"),200===t.response.code&&(this.picture=t.response.message,console.log(this.picture))},handleRemove:function(e,t){this.$message.success("删除成功")},handlePreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},onExceed:function(e,t){this.$message({type:"info",message:"最多只能上传一个图片",duration:2e3})},beforeUpload:function(e){var t="image/jpeg"===e.type,o="image/gif"===e.type,r="image/png"===e.type,a="image/bmp"===e.type,d=e.size/1024/1024<2;return t||o||r||a||alert("上传图片必须是JPG/GIF/PNG/BMP 格式!"),d||alert("上传图片大小不能超过 2MB!"),(t||a||o||r)&&d}}},a={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-card",{staticClass:"box-card"},[o("el-form",{ref:"addForm",staticStyle:{margin:"60px"},attrs:{model:e.addForm,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"商品名称",prop:"productname"}},[o("el-input",{model:{value:e.addForm.productname,callback:function(t){e.$set(e.addForm,"productname",t)},expression:"addForm.productname"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"商品价格",prop:"productprice"}},[o("el-input",{on:{blur:function(t){return e.sendprice(e.addForm.productprice)}},model:{value:e.addForm.productprice,callback:function(t){e.$set(e.addForm,"productprice",t)},expression:"addForm.productprice"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"商品图片",prop:"producticon"}},[o("el-upload",{ref:"upload",attrs:{action:"http://localhost:8081/product/upload",name:"picture","list-type":"picture-card",limit:1,"file-list":e.fileList,"on-exceed":e.onExceed,"before-upload":e.beforeUpload,"on-preview":e.handlePreview,"on-success":e.handleSuccess,"on-remove":e.handleRemove},model:{value:e.addForm.producticon,callback:function(t){e.$set(e.addForm,"producticon",t)},expression:"addForm.producticon"}},[o("i",{staticClass:"el-icon-plus"})]),e._v(" "),o("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[o("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),o("el-form-item",{attrs:{label:"商品类型",prop:"productcategory"}},[o("el-select",{attrs:{placeholder:"商品类型"},on:{focus:function(t){return e.selectCode(e.addForm.productcategory)}},model:{value:e.addForm.productcategory,callback:function(t){e.$set(e.addForm,"productcategory",t)},expression:"addForm.productcategory"}},e._l(e.addForm.TypeList,function(e){return o("el-option",{key:e.categoryid,attrs:{label:e.categoryName,value:e.categoryCode}})}),1)],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:e.SubmitFrom}},[e._v("立即创建")]),e._v(" "),o("el-button",{on:{click:e.resetForm}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]};var d=o("VU/8")(r,a,!1,function(e){o("gGp8")},"data-v-557504cc",null);t.default=d.exports},gGp8:function(e,t){}});
//# sourceMappingURL=8.ac2ac7cc9eccec892557.js.map