<template>
  <el-dialog
    title="选择单位"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <div class="tree-div" v-if="ifChek==true">
      <!--:data="datas"-->
      <el-tree
        ref="tree"
        show-checkbox
        :check-strictly="true"
        :load="loadNode"
        lazy
        :props="defaultProps"
        :highlight-current="true"
        node-key="code"
        :default-checked-keys="list"
        >
      </el-tree>
    </div>
    <div class="tree-div" v-if="ifChek==false">
      <!--:data="datas"-->
      <el-tree
        ref="tree"
        :load="loadNode"
        lazy
        :props="defaultProps"
        :highlight-current="true"
        node-key="code"
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
        ifChek:true,
        userInfo:{},
        defaultProps: {
          children: 'children',
          label: 'name',
          // isLeaf: 'leaf'
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

      //获取用户信息
      this.$http
        .get(
          '/jsonapi/System/system/v1.0/userinfo',
        )
        .then(res => {
          this.userInfo= res.data.data;
      })
    },
    methods: {
      loadNode(node, resolve) {
          if (node.level === 0) {
            this.getFrist(resolve)
          }
        if (node.level >= 1) {
          // 注意！把resolve传到你自己的异步中去
          this.getChildren(node, resolve);
        }
      },
      getFrist(resolve){
        this.$http
          .get(
            '/jsonapi/System/system/hr/orglist',
          )
          .then(res => {
            var datas= res.data.data;
            resolve(datas);
         })
      },
      getChildren(node, resolve){
        this.$http
          .get(
            '/jsonapi/System/system/supmanage/org/v1.0/tree/'+node.data.code+'/'+this.userInfo.currentPostCode+'?type=orgAuth',
          )
          .then(res => {
              var datas= res.data.data;
              resolve(datas);
          })
      },
      init(type,list,ifChek,index,tableList){
        //type使用组件的名称,
        // list组织树默认勾选的id,
        // ifChek是否可多选
        //index table使用组件时的下标
        //tableList tabel使用组件时的list
        this.dialogVisible = true;
        this.ifChek=ifChek!=undefined?ifChek:true;
        this.type=type;
        this.index=index;
        this.tableList=tableList;
        if(list&&list!=''){
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
        var list=this.$refs.tree.getCheckedNodes();
        list.forEach((item)=>{
          item.detailName=item.name;
          item.id=item.code;
        })
        var data=list;
        data.type=this.type;
        data.index=this.index;
        data.tableList=this.tableList;
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
