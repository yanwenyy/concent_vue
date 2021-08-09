<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" type="primary" plain><i class="el-icon-plus"></i>新增</el-button>
        <el-button @click="totop" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
        <el-button @click="batchSub" type="primary" plain><i class="el-icon-plus"></i>批量提交</el-button>
      </el-button-group>
      <div style="float: right;">
        <el-form class="search-form" :inline="true" :model="searchFrom" @keyup.enter.native="init()">
          <el-form-item label="合同名称:">
            <el-input  class="list-search-picker" v-model="searchFrom.contractName" placeholder="合同名称" clearable></el-input>
          </el-form-item>
          <el-form-item
            label="审核状态:"
          >
            <el-select
              class="list-search-picker"
              clearable
              filterable
              placeholder="请选择"
              size="mini"
              v-model="searchFrom.flowStatus"
            >
              <el-option label="待登记" value="edit"></el-option>
              <el-option label="草稿" value="edit"></el-option>
              <el-option label="审核中" value="check"></el-option>
              <el-option label="审核通过" value="pass"></el-option>
              <el-option label="审核退回" value="reject"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="searchFromReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        <!--<el-button type="primary" plain><i class="el-icon-upload2"></i>导出</el-button>-->
      </div>
    </div>
    <div style="margin-top: 10px">
      <el-table
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        tooltip-effect="dark"
      >
        <el-table-column
          :width="50"
          align="center"
          show-overflow-tooltip
          type="selection"
        ></el-table-column>
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>
        <el-table-column
          label="合同板块"
          prop="moduleName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.moduleName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="200"
          label="合同名称"
          prop="contractName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="合同号"
          prop="contractCode"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="核减原因"
          prop="cutResion"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="核减类型"
          prop="createOrgType"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="核减单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="核减人"
          prop="createUserName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="状态"
          prop="flowStatus"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'审核通过':scope.row.flowStatus==4?'审核退回':''}}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.createTime | dateformat
            }}</template>
        </el-table-column>
        <!--<el-table-column-->
          <!--:width="150"-->
          <!--align="center"-->
          <!--label="核减通过时间"-->
          <!--prop="approveTime"-->
          <!--show-overflow-tooltip-->
        <!--&gt;-->
          <!--<template slot-scope="scope">{{-->
            <!--scope.row.approveTime | dateformat-->
            <!--}}</template>-->
        <!--</el-table-column>-->
      </el-table>
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
    <change-search v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></change-search>
  </div>
</template>

<script>
  import ChangeSearch from './changeSearch'
  export default {
    data() {
      return {
        infoCSVisible:false,
        page: { current: 1, size: 20, total: 0, records: [] },
        searchFrom: {
          current: 1,
          size: 20,
          queryType:'1'
        },
        menus: [],
        multipleSelection: [],
        orgTree: [],
        shztList:[
          {
            id:'1',
            detailName:'变更中'
          },
          {
            id:'2',
            detailName:'待审核'
          },
          {
            id:'3',
            detailName:'退回'
          }
        ],//审核状态下拉框
      };
    },
    components: {
      ChangeSearch
    },
    methods: {
      //批量提交
      batchSub(){
        if (this.multipleSelection.length <1) {
          this.$message.info("请选择一条记录进行提交操作！");
          return false;
        }
        var list=[],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.flowStatus==1||item.flowStatus==4){
            var v={
              businessId:item.uuid,
              businessName:item.contractName,
              businessType:'contract_cut_exam'
            }
            list.push(v);
          }else{
            this.$message.info("当前所选数据中包含不可提交的选项,请检查后进行操作");
            return itemStatus=false;
          }
        })
        if(itemStatus){
          this.$confirm(`确认提交这些数据吗`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                "/api/contract/topInfo/Verify/commonProcess/start",
                JSON.stringify(list),
                {useJson: true}

              )
              .then((res) => {
                if(res.data.code==200){
                  this.$message({
                    message: "操作成功",
                    type: "success",
                  });
                  this.getData()
                }else{
                  this.$message.error(res.data.msg);
                }

              });
          }).catch(() => {})
        }
      },
      //根据id跳页面
      getUrl(id){
        var url='';
        if(id=='7f4fcba4255b43a8babf15afd6c04a53'){
          url= '../project/detail/';
        }else if(id=='f6823a41e9354b81a1512155a5565aeb'){
          url= '../design/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7af6'){
          url=  '../house/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7af4'){
          url=  '../trade/detail/';
        }else if(id=='510ba0d79593418493eb1a11ed3e7df4'){
          url=  '../industrial/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7df4'){
          url=  '../finance/detail/';
        }else if(id=='510ba0d79593418493eb1a11ed4e7df4'){
          url=  '../operate/detail/';
        }else if(id=='510ba0d79593419493eb1a11ed3e7df4'){
          url=  '../other/detail/';
        }
        return url;
      },
      // 增加
      add() {
        this.infoCSVisible = true;
        this.$nextTick(() => {
          this.$refs.infoCS.init();
      })
      },
      //去新增详情页面
      goAddDetail(data){
        // console.log(data);
        if(data.uuid){
          var url=this.getUrl(data.moduleId);
          this.$http
            .post(
              "/api/contract/contractInfoCut/detail/save",
              {uuid: data.uuid}
            )
            .then((res) => {
             var _datas=res.data.data;
               if(res.data.code==200){
                 let p = {actpoint: "add",instid:_datas.uuid};
                 this.$router.push({
                   path: "./detail/",
                   query: {p: this.$utils.encrypt(JSON.stringify(p))},
                 });
               }
            });
        }
      },
      // 删除
      remove() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择一条记录进行删除操作！");
          return false;
        }
        let uuids = []
        this.multipleSelection.forEach((item) => {
          uuids.push(item.uuid)
      });
        this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http
          .post(
            "/api/contract/contractInfoCut/list/delete",
            {ids: uuids}
          )
          .then((res) => {
          this.getData()
      });
      }).catch(() => {})
      },
      // 修改
      totop() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        if(this.multipleSelection[0].flowStatus=='2'||this.multipleSelection[0].flowStatus=='3'){
          this.$message.info("此条数据不可修改！");
          return false;
        }
        let p = {actpoint: "edit", instid: this.multipleSelection[0].uuid};
        var url=this.getUrl(this.multipleSelection[0].moduleId);
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "look", instid : row.contractInfoId};
        var url=this.getUrl(row.moduleId);
        this.$router.push({
          path: url,
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      handleSizeChange(val) {
        this.searchFrom.size = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.searchFrom.current = val;
        this.getData();
      },
      searchFromSubmit() {
        this.searchFrom.current = 1;
        this.getData();
      },
      searchFromReset() {
        // this.$refs["searchFrom"].resetFields();
        this.searchFrom.contractName = "";
        this.searchFrom.state = "";
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getData() {
        this.$http
          .post(
            "/api/contract/contractInfoCut/list/loadPageData",
            this.searchFrom
          )
          .then((res) => {
          this.page = res.data.data;
      });
      },
    },
    created() {
      this.getData();
    },
  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
  .search-form >>>.el-form-item{
    margin-bottom: 0;
  }
  .search-form >>>.el-form-item__content,.search-form >>>.el-form-item__label{
    line-height: 30px;
  }
  .search-form{
    display: inline-block;
    float: left;
  }
  >>>.search-form .el-form-item__label{
    width:auto;
  }
  >>>.el-input--mini .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  /*@media (min-width: 1300px) and (max-width: 1500px) {*/
    /*.tableStyle{*/
      /*max-height: calc(100vh - 250px)!important;*/
      /*min-height: calc(100vh - 250px)!important;*/
    /*}*/
    /*!*.table-div{*!*/
      /*!*max-height: calc(100vh - 180px)!important;*!*/
      /*!*overflow: hidden;*!*/
    /*!*}*!*/
  /*}*/
</style>
