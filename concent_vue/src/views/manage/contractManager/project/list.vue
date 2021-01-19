<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add()" type="primary" plain >新增</el-button>
        <el-button @click="add('bq')" type="primary" plain >新增补签</el-button>
        <el-button @click="totop" type="primary" plain>修改</el-button>
        <el-button type="primary" plain>提交</el-button>
        <el-button @click="remove" type="primary" plain>删除</el-button>
      </el-button-group>
      <div style="float: right;">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
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
          :width="500"
          label="项目名称"
          prop="inforName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目名称</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchFrom.inforName"
                size="mini"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          label="合同名称"
          prop="contractName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>合同名称</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchFrom.contractName"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="合同号"
          prop="contractNo"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>合同号</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchFrom.contractNo"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报单位"
          prop="createOrgId"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>填报单位</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchFrom.createOrgId"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="主推单位"
          prop="contractMianOrg"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>主推单位</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchFrom.contractMianOrg"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="合同金额(万元)"
          prop="contractAmount"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">{{
            scope.row.exetime | datetoMonth
          }}</template> -->
          <template slot="header" slot-scope="scope">
            <span>合同金额（万元）</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchFrom.contractAmount"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报人"
          prop="createUserName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>填报人</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchFrom.createUserName"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="录入时间"
          prop="createTime"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">{{
            scope.row.createtime | dateformat
          }}</template> -->
          <template slot="header" slot-scope="scope">
            <span>录入时间</span>
            <div>
              <el-date-picker
                class="list-search-picker"
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="searchFrom.createTime"

              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.createTime | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="状态"
          prop="flowStatus"
          fixed="right"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">{{
            scope.row.state === '0' ? '草稿' : '已上报'
          }}</template> -->
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchFrom.id"
                size="mini"
              />
            </div>
          </template>
          <template slot-scope="scope">
             {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'审核通过':scope.row.flowStatus==4?'审核退回':'待登记'}}
          </template>
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
  </div>
</template>

<script>
export default {
  name: "proposal-list-look",
  data() {
    return {
      page: { current: 1, size: 10, total: 0, records: [] },
      searchFrom: {
        current: 1,
        size: 10,
        changeStatus:'0',
        moduleId:'7f4fcba4255b43a8babf15afd6c04a53'
      },
      menus: [],
      multipleSelection: [],
      orgTree: [],
    };
  },
  methods: {
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
      let p = {actpoint: "edit", instid: this.multipleSelection[0].uuid};
      this.$router.push({
        path: "./detail/",
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
    add(type) {
      let p = { actpoint: "add" ,type:type};
      this.$router.push({
        path: "./detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
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
    searchformSubmit() {
      this.searchFrom.current = 1;
      this.getData();
    },
    searchformReset() {
      this.$refs["searchFrom"].resetFields();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      this.$http
        .post(
          "/api/contract/contract/ContractInfo/list/loadPageData",
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
</style>
