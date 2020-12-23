<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" plain type="primary">新增</el-button>
       <!-- <el-button @click="dialogResult=true" plain type="primary">新增</el-button>-->
        <el-button @click="totop" plain type="primary">修改</el-button>
        <el-button @click="remove" type="primary" plain>删除</el-button>
       <!-- <el-button @click="searchformReset" type="primary" plain>刷新</el-button>-->
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
        <el-button @click="getData" type="primary" plain>查询</el-button>
        <el-button @click="exportdata" type="primary" plain>导出</el-button>
      </div>
    </div>

    <div style="margin-top: 20px">
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
          :width="500"
          align="center"
          label="项目编号"
          prop="importCode"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目编号</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.importCode"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="500"
          align="center"
          label="项目名称"
          prop="name"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目名称</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.name"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="单位"
          prop="unit"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>单位</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.unit"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="标准库项目特征"
          prop="feature"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>标准库项目特征</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.feature"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="国标表中上级节点id"
          prop="parentCode"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>国标表中上级节点id</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.parentCode"
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
      :page-sizes="[10, 50, 100]"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

   <!-- <el-dialog  title="标准库维护" :visible.sync="dialogResult">
      <el-form :model="resultform">
        <el-form-item label="项目编号:" :label-width="formLabelWidth">
          <el-input
            style="float: left; width: 60%"
            v-model="searchform.importCode"
            size="mini"
          />
        </el-form-item>

        <el-form-item label="项目名称:" :label-width="formLabelWidth">
          <el-input
            style="float: left; width: 60%"
            v-model="searchform.name"
            size="mini"
          />
        </el-form-item>

        <el-form-item label="单位:" :label-width="formLabelWidth">
          <el-input
            style="float: left; width: 60%"
            v-model="searchform.unit"
            size="mini"
          />
        </el-form-item>

        <el-form-item label="标准库项目特征:" :label-width="formLabelWidth">
          &lt;!&ndash;<el-input
            style="float: left; width: 100%"
            v-model="searchform.feature"
            size="mini"
          />&ndash;&gt;
          <el-input
            type="textarea"
            style="float: left; width: 60%"
            :rows="4"
            placeholder="请输入内容"
            v-model="searchform.feature">
          </el-input>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveOrUpdate()">保 存</el-button>
        <el-button @click="dialogResult = false">关 闭</el-button>
      </div>
    </el-dialog>-->

  </div>
</template>

<script>
  export default {
    // inject:['reload'],
    name: "proposal-list-look",
    data() {
      return {
          page: {current: 1, size: 10, total: 0, records: []},
          showinput: false,
          sousuo: "",
          searchform: {

              importCode: "",
              parentCode: "",
              name: "",
              unit: "",
              feature: "",
              code: "",
              projectType: "",
              uuid: "",
          },
          menus: [],
          multipleSelection: [],
          orgTree: [],
          dialogResult: false,
          resultform: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
          },
          formLabelWidth: '120px'
      }
    },
    methods: {
      exportdata() {
      },
      search() {
        this.showinput = false;
      },
        //Dialog保存按钮方法
      /*  saveOrUpdate(){

        },*/
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
        let p = {actpoint: "edit", instid: this.multipleSelection[0].topOrgId};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "look", instid: row.topOrgId};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      // 删除
      remove() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
          let uuids = []
          this.multipleSelection.forEach((item) => {
              if (item.uuid != null) {
                  uuids.push(item.uuid);
              }

          })
          this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.$http
                  .post(
                      '/api/ boq/BoqOrdinaryStandard/list/delete',
                      {ids: uuids}
                  )
                  .then(res => {
                      this.getData();
                  })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
      },
      // 展示
      show() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let p = {actpoint: "look", instid: this.multipleSelection[0].uuid};
        this.$router.push({
          path: "../detail/",
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
        // this.$refs["searchform"].resetFields();
        this.searchform.importCode = "";
        this.searchform.parentCode = "";
        this.searchform.name = "";
        this.searchform.unit = "";
        this.searchform.feature = "";
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
            "/api/ boq/BoqOrdinaryStandard/list/loadPageDataByCondition",
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
      this.getData();
    },
  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
</style>
