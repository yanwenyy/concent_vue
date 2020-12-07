<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" plain type="primary">新增</el-button>
        <el-button @click="totop" plain type="primary">修改</el-button>
        <el-button type="primary" plain>删除</el-button>
        <el-button type="primary" style="height: 40px" plain
          ><input placeholder="请输入项目名称"
        /></el-button>
      </el-button-group>
      <div style="float: right">
        <el-button @click="reset" type="primary" plain>重置</el-button>
        <el-button @click="search" type="primary" plain>查询</el-button>
        <el-button @click="exportdata" type="primary" plain>导出</el-button>
      </div>
    </div>

    <div style="margin-top: 20px">
      <el-table
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        @row-click="rowshow"
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
          :width="200"
          label="项目名称"
          prop="name"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目名称</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="sousuo"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程类别"
          prop="ptypename"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>工程类别</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="sousuo"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="建设单位"
          prop="unitname"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>建设单位</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="sousuo"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="公告类型"
          prop="exetime"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">{{
            scope.row.exetime | datetoMonth
          }}</template> -->
          <template slot="header" slot-scope="scope">
            <span>公告类型</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="sousuo"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="状态"
          prop="orgname"
          fixed="right"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="sousuo"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="投标截止日期"
          prop="state"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">{{
            scope.row.state === '0' ? '草稿' : '已上报'
          }}</template> -->
          <template slot="header" slot-scope="scope">
            <span>截至投标日期</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="sousuo"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="填报人"
          prop="username"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>填报人</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="sousuo"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="登记时间"
          prop="createtime"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">{{
            scope.row.createtime | dateformat
          }}</template> -->
          <template slot="header" slot-scope="scope">
            <span>登记时间</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="sousuo"
                size="mini"
              />
            </div>
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
      showinput: false,
      sousuo: "",
      searchform: {
        current: 1,
        size: 10,
        year: "",
        name: "",
        ptype: "",
        orgid: "",
        orgname: "",
      },
      menus: [],
      multipleSelection: [],
      orgTree: [],
    };
  },
  methods: {
    search() {
      this.showinput = false;
    },
    add() {
      let p = { actpoint: "add" };
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
        path: "../detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
      });
    }, // list通用方法开始
    handleSizeChange(val) {
      this.searchform.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.searchform.current = val;
      this.getData();
    },
    searchformSubmit() {
      this.searchform.current = 1;
      this.getData();
    },
    searchformReset() {
      this.$refs["searchform"].resetFields();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      this.$http
        .post(
          "/api" + this.$route.path.substr(0, this.$route.path.length - 1),
          this.searchform
        )
        .then((res) => {
          this.page = res.data.data;
        });
    },
    getMenus() {
      this.$http
        .post("api/base/loadcascader", { typecode: "XMLX" })
        .then((res) => {
          if (res.data.code === 0) {
            this.menus = res.data.data;
          }
        });
    },
    currentMenu(selVal) {
      let selMenuObj = this.menus.filter((item) => item.value === selVal);
      this.searchform.menu = selMenuObj[0].label;
    },
    // 获取上级单位树信息
    getOrgTree() {
      this.$http.get("/api/base/loadorglist").then((res) => {
        this.orgTree = res.data.data;
      });
    },
    // 确定单位
    orgChange() {
      let selectLabelArr = this.$refs["porgCascader"].getCheckedNodes()[0]
        .pathLabels;
      this.searchform.orgname = selectLabelArr[selectLabelArr.length - 1];
    },

    // list通用方法结束
  },
  created() {
    this.getMenus();
    this.getOrgTree();
    this.getData();
  },
};
</script>
<style scoped>
.el-table__row {
  cursor: pointer;
}
</style>
