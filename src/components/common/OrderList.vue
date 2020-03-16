<template>
<div>
  <el-table
  :data="Ordertable"
  height="100vh"
  border
  style="width: 100%">
  <el-table-column prop="orderNum" label="订单编号" width="240px">
  </el-table-column>
  <el-table-column prop="consignee" label="买家昵称" >
  </el-table-column>
  <el-table-column prop="orderAmount" label="订单总金额" width="109px">
  </el-table-column>
  <el-table-column prop="orderStatus" label="订单状态" width="96px">
    <template slot-scope="scope">
      <el-tag type="warning" effect="dark" v-if="scope.row.orderStatus==0">待支付</el-tag>
      <el-tag type="success" effect="dark" v-if="scope.row.orderStatus==1">已完成</el-tag>
      <el-tag type="danger" effect="dark" v-if="scope.row.orderStatus==-1">已取消</el-tag>
    </template>
  </el-table-column>
  <el-table-column prop="createTime" label="创建时间">
  </el-table-column>
  <el-table-column prop="updateTime" label="修改时间">
  </el-table-column>
  <el-table-column  label="操作">
    <template slot-scope="scope">
      <el-button  size="small" @click="viewdetails(Ordertable[scope.$index].orderId)">查看详情</el-button>
      <el-dialog title="订单详情" :visible.sync="dialogTableVisible" :before-close="handleDialogClose">
        <el-table :data="detailtable">
          <el-table-column property="productName" label="商品名称"></el-table-column>
          <el-table-column property="productQuantity" label="商品数量" width="100px"></el-table-column>
          <el-table-column property="productPrice" label="商品单价" width="100px"></el-table-column>
          <el-table-column property="productAmount" label="商品总价" width="100px"></el-table-column>
          <el-table-column property="createTime" label="下单时间"></el-table-column>
        </el-table>
      </el-dialog>
    </template>
  </el-table-column>

</el-table></div>
</template>

<script>
    export default {
      data() {
        return {
          Ordertable:[{
          }],
          detailtable: [{
          }],
          dialogTableVisible: false,
          dialogFormVisible: false,
        };
      },

      created(){
        this.mounted();
      },
      mounted(){
        this.$axios.get('/order/findall')
          .then(res => {
            if (res.data) {
              this.Ordertable=res.data
            }
          })
          .catch(failResponse => {
          })
      },
      methods: {
        viewdetails(num) {
          this.$axios.post('/order/detail', {
            orderid:num
          }).then(res => {
              if (res.data) {
                this.detailtable=res.data
              }
            }
          ).catch(failres => {
          })
          this.dialogTableVisible = true
        }
      }
    }
</script>

<style scoped>

</style>
