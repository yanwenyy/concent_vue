<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" type="primary" plain>新增</el-button>
        <el-button @click="totop" type="primary" plain>修改</el-button>
        <el-button type="primary" plain>提交</el-button>
        <el-button @click="remove" type="primary" plain>删除</el-button>
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
              v-model="searchFrom.state"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in shztList"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="searchFromReset" type="info" plain style="color:black;background:none">重置</el-button>
        <el-button @click="getData" type="primary" plain>查询</el-button>
        <el-button type="primary" plain>导出</el-button>
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
        stripe
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
          label="合同类型"
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
          prop="contractNo"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="主推单位"
          prop="contractMianOrg"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报人"
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
             {{scope.row.state==1?'变更中':scope.row.state==2?'待审核':scope.row.state==3?'退回':''}}
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
      </el-table>
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[10, 50, 100]"
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
        page: { current: 1, size: 10, total: 0, records: [] },
        searchFrom: {
          current: 1,
          size: 10,
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
      //根据id跳页面
      getUrl(id){
        var url='';
        if(id=='7f4fcba4255b43a8babf15afd6c04a53'){
          url= '../project/changeDetail/';
        }else if(id=='f6823a41e9354b81a1512155a5565aeb'){
          url= '../design/changeDetail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7af6'){
          url=  '../house/changeDetail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7af4'){
          url=  '../trade/changeDetail/';
        }else if(id=='510ba0d79593418493eb1a11ed3e7df4'){
          url=  '../industrial/changeDetail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7df4'){
          url=  '../finance/changeDetail/';
        }else if(id=='510ba0d79593418493eb1a11ed4e7df4'){
          url=  '../operate/changeDetail/';
        }else if(id=='510ba0d79593419493eb1a11ed3e7df4'){
          url=  '../other/changeDetail/';
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
          let p = {actpoint: "add",instid:data.uuid};
          this.$router.push({
            path: url,
            query: {p: this.$utils.encrypt(JSON.stringify(p))},
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
            "/api/contract/contract/ContractInfo/list/deleteChangeRecordIds",
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
        let p = {actpoint: "edit", instid: this.multipleSelection[0].beforeId,afterId:this.multipleSelection[0].afterId};
        var url=this.getUrl(this.multipleSelection[0].moduleId);
        this.$router.push({
          path: url,
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "look", instid: row.beforeId,afterId:row.afterId};
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
            "/api/contract/contract/ContractInfo/list/loadPageDataForChangeRecord",
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
  @media (min-width: 1300px) and (max-width: 1500px) {
    .tableStyle{
      max-height: calc(100vh - 250px)!important;
      min-height: calc(100vh - 250px)!important;
    }
    /*.table-div{*/
      /*max-height: calc(100vh - 180px)!important;*/
      /*overflow: hidden;*/
    /*}*/
  }
</style>
