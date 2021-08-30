<template>
  <el-dialog
    @close="visible = false,selList=[],searchform.current=1,selIdList=[]"
    :visible.sync="visible"
    :append-to-body="true">
    <div>
      <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="init()">
        <el-form-item label="公司名称:">
          <el-input v-model="searchform.companyName" placeholder="项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="init()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :max-height="$dialogTableHeight"
        :height="$dialogTableHeight"
        class="mulTabel"
        ref="listTabel"
        :data="dataList"
        :key="key"
        border
        v-loading="dataListLoading"
        highlight-current-row
        @selection-change="rowSel"
        @select="rowSelSelf"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        style="width: 100%;">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="companyName"
          show-overflow-tooltip
          label="公司名称">
        </el-table-column>
      </el-table>
      <div class="tags-div" style="height:calc( 100vh - 370px );">
        <el-tag
          v-for="(tag,index) in selList"
          :key="index"
          @close="delTag(tag,index)"
          closable>
          {{tag}}
        </el-tag>
      </div>
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[20, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 5px"
        v-if="page.total !== 0"
      ></el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false,selList=[],searchform.current=1,selIdList=[]">取消</el-button>
      <el-button type="primary" @click="sub()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        key:0,
        page: { current: 1, size: 20, total: 0, records: [] },
        visible: false,
        searchform: {
          inforName: '',
          current:1,
          size:20,
        },
        type:'',
        selList:[],
        selIdList:[],
        selCodeList:[],
        httpUrl:'',
        ids:'',
        names:'',
        codes:'',
        dataList: [],
        pageIndex: 1,
        pagesize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        currentRow: ''
      }
    },
    mounted() {
      Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
    },
    methods: {
      //选中数据
      sub() {
        this.visible = false;
        var data={
          selList:this.selList,
          selIdList:this.selIdList,
          selCodeList:this.selCodeList,
          type:this.type
        };
        this.$emit('getComList', data);
        // this.key+=1;
        this.selList=[];
        this.selIdList=[];
        this.searchform.current=1;
        // this.$refs.listTabel.clearSelection();
      },
      // 初始化
      init(ids,names,url,type,from,codes) {

        this.visible = true;
        this.type=type;
        this.httpUrl=url;
        this.ids=ids;
        this.names=names;
        this.codes=codes;
        // this.selList=[];
        this.$http
          .post(
            this.httpUrl,
            this.searchform,
            {isLoading: false}
          )
          .then((res) => {
          var datas = res.data.data;
          if (res.data && res.data.code === 200) {
            this.dataList = datas.records||datas;
            this.page = datas;

          } else {
            this.dataList = []
          }
          this.dataListLoading = false;
          this.$nextTick(() => {
            var idList=[];
            if(from!='sizeChange'){
              idList=names?names.split(","):[];
              this.dataList.forEach((item,index)=>{
                if(idList.indexOf(item.companyName)!=-1){
                  // console.log(idList,item.uuid)
                  // item.checked=true;
                  this.$refs.listTabel.toggleRowSelection(item, true);
                  this.selList=idList;
                  this.selIdList=ids?ids.split(","):[];
                  this.selCodeList=codes?codes.split(","):[];
                  console.log(this.selCodeList)
                }
              });

            }else{
              if(Array.isArray(ids)){
                idList=ids;
                this.dataList.forEach((item,index)=>{
                  idList.forEach((v)=>{
                    if(v==item.companyName){
                      item.checked=true;
                      this.$refs.listTabel.toggleRowSelection(item, true);
                    }
                  })
                });
              }
            }
          })
        })
      },
      handleSizeChange(val) {
        this.searchform.size = val;
        this.init(this.selList,this.names,this.httpUrl,this.type,'sizeChange',this.codes);
      },
      handleCurrentChange(val) {
        this.searchform.current = val;
        this.init(this.selList,this.names,this.httpUrl,this.type,'sizeChange',this.codes);
      },
      rowSel(selection){
        // this.selList=[];
        // console.log(selection)
        if(this.selList.length==0){
          // this.selList = selection;
          selection.forEach((item)=>{
            this.selList.push(item.companyName);
            this.selIdList.push(item.uuid);
            this.selCodeList.push(item.createOrgCode);
          });
          // console.log(111)
        }else{
          // console.log(222)
          selection.forEach((item)=>{
            this.selList.forEach((v)=>{
              if(!item.checked&&this.selList.indexOf(item.companyName)==-1){
                // console.log(selection,item)
                item.checked=true;
                this.selList.push(item.companyName);
                this.selIdList.push(item.uuid);
                this.selCodeList.push(item.createOrgCode);
              }
            })
          })
        }
      },
      rowSelSelf(selection, row){
        if(selection.indexOf(row)==-1&&this.selList.indexOf(row.companyName)!=-1){
          this.selList.remove(row.companyName);
          this.selIdList.remove(row.uuid);
          this.selCodeList.remove(row.createOrgCode);
          row.checked=false;
        }
        // console.log(this.selList)
        // if(this.selList.length==0){
        //   this.selList=selection;
        // }else{
        //   var ifHas=false;
        //   this.selList.forEach((item)=>{
        //     if(item.uuid==row.uuid){
        //       ifHas=true;
        //       return false;
        //
        //     }else{
        //       ifHas=false;
        //     }
        //   });
        //   if(!ifHas){
        //     this.selList.push(row)
        //   }
        // }
      },
      getIndexById(id) {
        let index;
        for (let i = 0; i < this.dataList.length; i++) {
          if (id === this.dataList[i].companyName) {
            index = i;
            break;
          }
        }
        return index;
      },
      delTag(val,D_index){
        // this.selList=this.selList.filter((item)=> item.companyName!=val);
        // this.selIdList=this.selList.filter((item)=> item.uuid!=val);

        let index = this.getIndexById(val);
        this.$refs.listTabel.toggleRowSelection(this.dataList[index], false);
        this.selList.remove(val);
        for(var i=0;i<this.selIdList.length;i++){
          if(i==D_index){
            this.selIdList.remove(this.selIdList[i])
          }
        }
        for(var j=0;j<this.selCodeList.length;j++){
          if(j==D_index){
            this.selCodeList.remove(this.selCodeList[j])
          }
        }
      },
    }
  }
</script>
<style scoped>
  >>>.el-dialog__header{
    padding: 0 20px;
  }
  .dialog-footer {
    margin-top: 10px;
    text-align: center;
  }
  .mulTabel{
    display: inline-block;
    width: 60%!important;
    box-sizing: border-box;
  }
  >>>.el-dialog {
    width: 80%;
  }

  >>>.el-form-item__label {
    width: auto;
  }

  .inline-block {
    display: inline-block;
  }

  .dr-notice-warn {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background: #FFE5E0;
    color: red;
  }

  .dr-notice-body {
    padding: 10px;
  }

  .dr-notice-body > div {
    margin-bottom: 20px;
  }

  .sumWeigh {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  >>>.el-input--mini .el-input__inner {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
  }
  .tags-div{
    display: inline-block;
    width: 39%;
    height: 100%;
    overflow: scroll;
    box-sizing: border-box;
    vertical-align: top;
    padding:0 10px;
  }
  .tags-div >>>.el-tag{
    margin: 0 5px 10px 0;
  }
</style>
