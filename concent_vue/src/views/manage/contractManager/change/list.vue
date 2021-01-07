<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" type="primary" plain>新增</el-button>
        <el-button @click="totop" type="primary" plain>修改</el-button>
        <el-button type="primary" plain>提交</el-button>
        <el-button @click="remove" type="primary" plain>删除</el-button>
      </el-button-group>
    </div>
    <div style="float: right; margin: -40px 0 0 0">
      <el-form class="search-form" :inline="true" :model="searchFrom" @keyup.enter.native="init()">
        <el-form-item label="合同名称:">
          <el-input v-model="searchFrom.contractName" placeholder="项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="审核状态:"
        >
          <el-select
            clearable
            filterable
            placeholder="请选择"
            size="mini"
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

    <div style="margin-top: 20px">
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
        style="width: 100%"
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
          prop="inforName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>
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
          let p = {actpoint: "add",instid:data.uuid};
          this.$router.push({
            path: "../other/changeDetail/",
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
            "/api/contract/contract/ContractInfo/list/delete",
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
        this.$router.push({
          path: "../project/changeDetail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "look", instid: row.uuid};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      // 查看
      rowshow(row) {
        let p = { actpoint: "look", instid: row.uuid };
        this.$router.push({
          path: "./detail/",
          query: { p: this.$utils.encrypt(JSON.stringify(p)) },
        });
      },
      show() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let p = { actpoint: "look", instid: this.multipleSelection[0].uuid };
        this.$router.push({
          path: "./detail/",
          query: { p: this.$utils.encrypt(JSON.stringify(p)) },
        });
      }, // list通用方法开始
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
        this.$refs["searchFrom"].resetFields();
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
</style>
