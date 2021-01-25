<template>
<!-- 国标库 -->
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" plain type="primary">新增</el-button>
        <el-button @click="totop" plain type="primary">修改</el-button>
        <el-button @click="remove" type="primary" plain>删除</el-button>
        <!-- <el-button @click="searchformReset" type="primary" plain>刷新</el-button> -->
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
        <el-button @click="getData" type="primary" plain>查询</el-button>
        <!-- <el-button @click="Importdata" type="primary" plain>导入</el-button> -->
        <!-- <el-upload
                class="upload-demo detailUpload"
                :action="'/api/contract/topInfo/CommonFiles/bidInfo/01/uploadFile'"
                :on-success="handleChange"
                :on-error="handleChange"
                :show-file-list="false"
                accept=".xls,.xlsx"
                multiple
              >
                <el-button
                  type="primary"
                  plain
                  >导入
                  </el-button>
                  </el-upload> -->
        <!-- <el-button @click="exportdata" type="primary" plain>导出</el-button> -->
      </div>
    </div>

    <div style="margin-top: 10px">
      <el-table
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="page.records"
        :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
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
          :width="500"
          label="国标名称"
          prop="name"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>国标名称</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.name"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="300"
          align="center"
          label="子名称"
          prop="childName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>子名称</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.childName"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="标准号"
          prop="standrardId"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>标准号</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.standrardId"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="文号"
          prop="titanic"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>文号</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.titanic"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>


        <el-table-column
          :width="180"
          align="center"
          label="实施日期"
          prop="implementationTime"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>实施日期</span>
            <div>
              <el-date-picker
                class="list-search-picker"
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="searchform.implementationTime"
              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.implementationTime | dateformat
            }}</template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="归口单位"
          prop="underCentralizedUnit"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>归口单位</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.underCentralizedUnit"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <el-pagination
      :current-page="page.current"
      :page-size="page.size"
      :page-sizes="[20, 50, 100]"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    // inject:['reload'],
    name: "proposal-list-look",
    data() {
      return {
        page: {current: 1, size: 20, total: 0, records: []},
        showinput: false,
        sousuo: "",
        searchform: {
          current: 1,
          size: 20,
          orgid: "",
          orgname: "",
          inforName: "",
          enginTypeFirstId: "",
          enginTypeSecondId:'',
          constructionOrg: "",
          noticeTypeId: "",
        },
        menus: [],
        multipleSelection: [],
        orgTree: [],

      };
    },
    computed: {
      projectDomainType() {
        // console.log(this.$store.state.category["projectDomainType"])
        return this.$store.state.category.projectDomainType;
      },
      bulletinType() {
        return this.$store.state.bulletinType;
      },
    },
    methods: {
          //上传附件
    handleChange(response, file, fileList) {
      if (response && response.code === 200) {
        this.$message({
          message: "导入成功",
          type: "success",
          duration: 1500,
          onClose: () => {
            this.getData();
            // console.log(fileList);
          },
        });
      } else {
        this.$message.error(response.msg);
      }
    },
      exportdata() {
      },
      search() {
        this.showinput = false;
      },
      // 增加
      add() {
        let p = {actpoint: "add"};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
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
            "/api/contract/boq/BoqNationalStandard/list/delete",
            {ids: uuids}
          )
          .then((res) => {
          this.getData()
         });
      }).catch(() => {})
        // uuids.join(',')

      },
      // 展示
      show() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let p = {actpoint: "look", instid: this.multipleSelection[0].uuid};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
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
      //   // this.$refs["searchform"].resetFields();
      this.searchform= {
        current: 1,
        size: 20,
        year: "",
        name: "",
        childName: "",
        standrardId: "",
        implementationTime: "",
        underCentralizedUnit: "",
        titanic: "",
      }
        this.getData();
       },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询
      getData() {
        this.$http
          .post(
            "/api/contract/boq/BoqNationalStandard/list/loadPageData",

            this.searchform
          )
          .then((res) => {
            this.page = res.data.data;
          });
      },
      getMenus() {
        this.$http
          .post("api/base/loadcascader", {typecode: "XMLX"})
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
        this.$http.get("/api/contract/base/loadorglist").then((res) => {
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
      this.getData();
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    },
  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
</style>
