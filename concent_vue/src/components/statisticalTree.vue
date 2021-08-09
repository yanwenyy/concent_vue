<template>
  <el-dialog
    title="请选择"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <div class="tree-search-input">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
    </div>
    <div class="tree-div">
      <el-tree  :default-checked-keys="list" show-checkbox class="filter-tree" ref="tree" :data="datas" :props="defaultProps" :highlight-current="true"></el-tree>
    </div>
    <div style="text-align: center">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button @click="getCheckedNodes"  type="primary">确定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  // import datas from '@/utils/position'
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    data() {
      return {
        filterText: '',
        datas: [],
        list:[],
        dialogVisible:true,
        defaultProps: {
          children: 'children',
          label: 'vname'
        },
        notSelect:['0','1','01','02','03','04','05','06','101','102','103','105','106','108']
      };
    },
    computed: {

      // datas () {
      //   return this.$store.state.category.position
      // },
    },
    mounted(){
      //json方法引入数据
      this.$http.post('/api/statistics/projectMonthlyReport/Projectreport/list/getBjxTree', { isLoading: false }).then(res =>{
        // console.log(res.data.data);
        this.datas=res.data.data
      });

      //js方法引入数据
      // this.datas=datas;
      // console.log(datas)

      // this.$store.dispatch('getCategory', {name: 'position', id: '321a917eb2b111e9a1746778b5c1176e'});
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.detailName.indexOf(value) !== -1;
      },
      init(type,list){
        if(list&&list!=''){
          this.list=list.split(",")
        }
        this.type=type;
        this.dialogVisible = true;
      },
      handleNodeClick(data) {
        // console.log(data);
        if(this.notSelect.indexOf(data.detailCode)=='-1'){
          this.dialogVisible = false;
          this.$emit('getStatistical',data)
        }
      },
      getCheckedNodes() {
        var list=this.$refs.tree.getCheckedNodes();
        list.type=this.type;
        this.dialogVisible = false;
        // list.forEach((item)=>{
        //   item.detailName=item.name;
        //   item.id=item.code;
        // })
        // var data=list;
        // data.type=this.type;
        // data.index=this.index;
        // data.tableList=this.tableList;
        // console.log(this.$refs.tree.getCheckedNodes());
        this.$emit('getStatistical',list)
      },
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
