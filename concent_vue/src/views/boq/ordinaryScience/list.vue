<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
       <!-- <el-button @click="add" plain type="primary">新增</el-button>-->
        <!--<el-button @click="add" plain type="primary">新增</el-button>-->
        <!--<el-button @click="totop" plain type="primary">修改</el-button>-->
        <!--<el-button @click="remove" type="primary" plain>删除</el-button>-->
       <!-- <el-button @click="searchformReset" type="primary" plain>刷新</el-button>-->
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
        <el-button @click="getData" type="primary" plain>查询</el-button>
        <!--<el-button @click="exportdata" type="primary" plain>导出</el-button>-->
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
          label="基础项目名称"
          prop="nameImport"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>基础项目名称</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.nameImport"

              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="500"
          align="center"
          label="标准项目名称"
          prop="nameStandard"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>标准项目名称</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.nameStandard"

              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          width="200"
          align="center"
          label="基础单位"
          prop="unitImport"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>基础单位</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.unitImport"

              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          label="标准单位"
          prop="unitStandard"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>标准单位</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.unitStandard"

              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          label="基础项目特征"
          prop="featureImport"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>基础项目特征</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.featureImport"

              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          label="标准项目特征"
          prop="featureStandard"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>标准项目特征</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.featureStandard"

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
    <el-dialog  title="知识库维护" :visible.sync="dialogResult" width="50%" >
      <el-form :model="form" style="height:30%">
        <el-form-item label="项目基础名称:" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="form.nameImport"

          />
        </el-form-item>

        <el-form-item label="标准项目名称:" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="form.nameStandard"

          />
        </el-form-item>

        <el-form-item label="基础单位:" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="form.unitImport"

          />
        </el-form-item>
        <el-form-item label="标准单位:" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="form.unitStandard"

          />
        </el-form-item>
        <el-form-item label="基础项目特征:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            disabled
            v-model="form.featureImport"

          />
        </el-form-item>
        <el-form-item label="标准项目特征:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            disabled
            v-model="form.featureStandard"

          />
        </el-form-item>
      </el-form>
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button type="primary" @click="save()">保 存</el-button>-->
        <!--<el-button @click="dialogResult = false">关 闭</el-button>-->
      <!--</div>-->
    </el-dialog>
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
              nameImport: "",
              nameStandard: "",
              unitImport: "",
              unitStandard: "",
              featureImport: "",
              featureStandard: "",
          },
          form:{
              standardName: "",
              nearName: "",
              sortNo: "",
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
        save(){
            this.$http
                .post(
                    "/api/contract/boq/BoqStandardSynonym/detail/save",
                    JSON.stringify(this.form),
                    {useJson: true}
                )
                .then((res) => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: "保存成功",
                            type: "success",
                        });
                        //清空输入框
                        this.form={
                            standardName: "",
                            nearName: "",
                            sortNo: "",
                            uuid:''
                        };
                        //关闭dialog对话框
                        this.dialogResult = false;
                        //查询列表数据
                        this.getData();
                    }
                    else {
                        this.$message.error("请添加必填项");
                        return false;
                    }
                });
        },
        search() {
            this.showinput = false;
        },
      // 增加
      add() {
          this.dialogResult=true;
          this.form={
              code: "",
              parentId: "",
              feature:"",
              name: "",
              unit: "",
              sortNo: "",
              uuid:''
          }
      },
      // 修改
      totop() {
        if (this.multipleSelection.length !== 1 ||this.multipleSelection.length>1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        var list= this.multipleSelection[0];
          this.form={
              standardName: list.standardName,
              nearName: list.nearName,
              sortNo:list.sortNo,
              uuid:list.uuid
          };
          this.dialogResult = true;

      },
      // 查看
      rowshow(row) {
        this.form=row;
        this.dialogResult = true;
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
                      '/api/contract/boq/BoqStandardSynonym/list/delete',
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
        this.searchform={
            current: 1,
            size: 20,
            nameImport: "",
            nameStandard: "",
            unitImport: "",
            unitStandard: "",
            featureImport: "",
            featureStandard: "",
        };
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
            "/api/contract/boq/BoqOrdinaryScience/list/loadPageData",
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
    },
  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
  .el-form-item el-input{

    width: 60%;
  }
</style>
