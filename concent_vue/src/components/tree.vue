<template>
  <el-dialog
    title="选择地点"
    :visible.sync="dialogVisible"
    width="30%"
   >
    <div class="tree-div">
      <el-tree :data="datas" :props="defaultProps" :highlight-current="true"  @node-click="handleNodeClick"></el-tree>
    </div>
    <div style="text-align: center">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import datas from '@/utils/position'
    export default {
      data() {
        return {
          datas: [],
          dialogVisible:true,
          defaultProps: {
            children: 'children',
            label: 'detailName'
          },
          notSelect:['0','1','01','02','03','04','05','06','101','102','103','105','106','108']
        };
      },
      mounted(){
        //json方法引入数据
        // this.$http.get('/static/jsonData/position.json', { isLoading: false }).then(res =>{
        //   // console.log(res.data.data);
        //   this.datas=res.data.data
        // });

        //js方法引入数据
        this.datas=datas;
        console.log(datas)
      },
      methods: {
        init(){

          this.dialogVisible = true;
        },
        handleNodeClick(data) {
          // console.log(data);
          if(this.notSelect.indexOf(data.detailCode)=='-1'){
            this.dialogVisible = false;
            this.$emit('getPosition',data)
          }
        }
      }
    }
</script>

<style scoped>
  .el-dialog{
    z-index: 999999999999999999;
  }
  .tree-div{
    height: 300px;
    overflow: auto;
    margin-bottom: 20px;
  }
</style>
