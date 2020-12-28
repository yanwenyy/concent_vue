<template>
  <el-dialog
    title="选择地点"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <div class="tree-div">
      <el-tree
        ref="tree"
        show-checkbox
        :check-strictly="true"
        :data="datas"
        :props="defaultProps"
        :highlight-current="true"
        node-key="id"
        :default-checked-keys="list"
        >
      </el-tree>
    </div>
    <div style="text-align: center">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button @click="getCheckedNodes"  type="primary">确定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import datas from '@/utils/position'
  export default {
    data() {
      return {
        datas: [],
        list:[],
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
      // console.log(datas)
    },
    methods: {
      init(type,list){
        this.dialogVisible = true;
        this.type=type;
        if(list){
          this.list=list.split(",")
        }
      },
      handleNodeClick(data) {
        // console.log(data);
        if(this.notSelect.indexOf(data.detailCode)=='-1'){
          this.dialogVisible = false;
          this.$emit('getPosition',data)
        }
      },
      getCheckedNodes() {
        var data=this.$refs.tree.getCheckedNodes();
        data.type=this.type;
        // console.log(this.$refs.tree.getCheckedNodes());
        this.$emit('refreshBD',data)
      },
    }
  }
</script>

<style scoped>
  /deep/ .el-tree > .el-tree-node > .el-tree-node__content .el-checkbox {

    display: none;
  }
  .tree-div{
    height: 300px;
    overflow: auto;
    margin-bottom: 20px;
  }
</style>
