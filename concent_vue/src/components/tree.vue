<template>
  <el-dialog
    title="选择地点"
    :visible.sync="dialogVisible"
    width="30%"
   >
    <div class="tree-div">
      <el-tree :data="datas" :props="defaultProps"  @node-click="handleNodeClick"></el-tree>
    </div>
    <div style="text-align: center">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>

  </el-dialog>
</template>

<script>
    export default {
      data() {
        return {
          datas: [],
          dialogVisible:true,
          defaultProps: {
            children: 'children',
            label: 'detailName'
          },
        };
      },
      mounted(){
        this.$http.get('/static/position.json', { isLoading: false }).then(res =>{
          // console.log(res.data.data);
          this.datas=res.data.data
        })
      },
      methods: {
        init(){

          this.dialogVisible = true;
        },
        handleNodeClick(data) {
          // console.log(data);
          this.dialogVisible = false;
          this.$emit('getPosition',data)
        }
      }
    }
</script>

<style scoped>
  .tree-div{
    height: 300px;
    overflow: auto;
    margin-bottom: 20px;
  }
</style>
