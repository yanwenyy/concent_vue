<template>
  <el-dialog
    :destroy-on-close="true"
    title="联合体选择"
    :visible.sync="dialogVisible"
    width="30%"
   >
    <div class="tree-div">
      <el-tree show-checkbox @check-change="handleCheckChange" lazy  :load="loadNode" :props="props"

      ></el-tree>
    </div>
    <div style="text-align: center">
      <el-button @click="result()">确 认</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import datas from '@/utils/positionOrg'
    export default {
      data() {
        return {
          props: {
            label: 'name',
            children: 'zones',
            isLeaf: 'leaf'
          },
          resultData:[],
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
        //this.datas=datas;
        console.log(datas)
      },
      methods: {
        init(){

          this.dialogVisible = true;
        },
        handleCheckChange(data, checked, indeterminate) {

          if(checked)
          {
            this.resultData.push(data);
          }
          console.log(data, checked, indeterminate);
        },
        handleNodeClick(data) {
          // console.log(data);
          if(this.notSelect.indexOf(data.detailCode)=='-1'){
            this.dialogVisible = false;
            //this.$emit('getPosition',data)
          }
        },
        result(){
          this.dialogVisible = false;
          this.$emit('getPosition',this.resultData)
          this.resultData=[];
        },
        loadNode(node, resolve) {
          if (node.level === 0) {
            return resolve([{ name: '股份公司' }]);
          }
          if (node.level > 1) return resolve([]);

          setTimeout(() => {
            const data = [{
              name: '中土集团'
            }, {
              name: '十一局'
            }];

            resolve(data);
          }, 500);
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
