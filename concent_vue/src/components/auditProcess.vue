<template>
  <div class="detailBox">
    <el-steps :active="histroy.step" align-center finish-status="success">
      <el-step v-for="(item,index) in histroy.img" :key="index" :title="item.nodeName" :description="item.nodeUsers&&item.nodeUsers[0].authInfo"></el-step>
    </el-steps>
    <el-table
    :data="histroy.list"
    :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
    border
    highlight-current-row
    ref="table"
    tooltip-effect="dark"
    >
    <el-table-column
    align="center"
    label="审批环节"
    prop="nodeName"
    show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
    align="center"
    label="审批人"
    prop="assign"
    show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
    align="center"
    label="审批时间"
    prop="time"
    show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
    align="center"
    label="审批意见"
    prop="remark"
    show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
    align="center"
    label="审批类型"
    prop="processType"
    show-overflow-tooltip
    >
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          histroy:{},//审批历史记录
        }
      },
      props:['task'],
      mounted(){
        this.getHistroy();
      },
      methods: {
        //审批历史记录
        getHistroy(){
          var task=this.task;
          this.$http
            .post(
              "/jsonapi/Workflow/process/record",
              {businessId:task.businessId,businessType:task.businessType},
              {useJson: true,isLoading:false}
            )
            .then((res) => {
            this.histroy = res.data.data;
            this.histroy.img.forEach((item,index)=>{
              if(item.type=='1'){
              this.histroy.step=index+1;
              }
            });
          });
        },
      }
    }
</script>

<style scoped>
  >>>.el-steps{
    padding: 40px 0;
  }
  >>>.el-step__title{
    margin: 10px 0 20px 0;
  }
</style>
