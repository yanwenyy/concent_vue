<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
       <!-- <el-button @click="add" plain type="primary">新增</el-button>-->
        <el-button @click="add" plain type="primary">新增</el-button>
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
          :width="150"
          align="center"
          label="编码"
          prop="code"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>编码</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.code"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="父编码"
          prop="parentId"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>父编码</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.parentId"
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
          :width="500"
          align="center"
          label="特征描述"
          prop="feature"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>特征描述</span>
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
          label="排序"
          prop="sortNo"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>排序</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.sortNo"
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

    <el-dialog  title="国标库维护" :visible.sync="dialogResult"  class="dialog_gb">
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="编码:"
          :label-width="formLabelWidth"
          prop="code"
          :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
        >
          <el-input
            v-model="form.code"
            size="mini"
          />
        </el-form-item>

        <el-form-item label="父编码:" :label-width="formLabelWidth">
          <el-input
            v-model="form.parentId"
            size="mini"
          />
        </el-form-item>

        <el-form-item
          label="项目名称:"
          :label-width="formLabelWidth"

          prop="name"
          :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
        >
          <el-input
            v-model="form.name"
            size="mini"
          />
        </el-form-item>


        <el-form-item label="项目特征:" :label-width="formLabelWidth">
          <el-input
            v-model="form.feature"
            size="mini"
          />
        </el-form-item>

        <el-form-item label="单位:" :label-width="formLabelWidth">
          <el-input
            v-model="form.unit"
            size="mini"
          />
        </el-form-item>

        <el-form-item label="排序:" :label-width="formLabelWidth">
          <el-input
            v-model="form.sortNo"
            size="mini"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save()">保 存</el-button>
        <el-button @click="dialogResult = false">关 闭</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
  export default {
    // inject:['reload'],
   // name: "proposal-list-look",
    data() {
      return {
          page: {current: 1, size: 10, total: 0, records: []},
          showinput: false,
          sousuo: "",
          searchform: {
              code: "",
              parentId: "",
              name: "",
              unit: "",
              feature: "",
              sortNo: "",
              uuid: "",
          },
          form:{
              code: "",
              parentId: "",
              feature:"",
              name: "",
              unit: "",
              sortNo: "",
              uuid:''
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
          formLabelWidth: '120px',
      }

    },
    methods: {
      exportdata() {

      },
        //Dialog保存按钮方法
        save(){
            this.$http
                .post(
                    "/api/ boq/BoqNationalStandard/detail/save",
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
                            code: "",
                            parentId: "",
                            feature:"",
                            name: "",
                            unit: "",
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
        if (this.multipleSelection.length !== 1||this.multipleSelection.length>1) {
          this.$message.info("请选择一条记录进行修改操作！");
          return false;
        }
        var list=this.multipleSelection[0];
          this.form={
              code: list.code,
              parentId: list.parentId,
              feature:list.feature,
              name: list.name,
              unit: list.unit,
              sortNo:list.sortNo,
              uuid:list.uuid
          };
          this.dialogResult = true;
      },
      // 查看
      rowshow(row) {
          if (this.multipleSelection.length !== 1||this.multipleSelection.length>1) {
              this.$message.info("请选择一条记录进行查看操作！");
              return false;
          }
        //let p = {actpoint: "look", instid: row.uuid};
          var list=this.multipleSelection[0];
          this.form={
              code: list.code,
              parentId: list.parentId,
              feature:list.feature,
              name: list.name,
              unit: list.unit,
              sortNo:list.sortNo,
              uuid:list.uuid
          };
          this.dialogResult = true;
         // query: {p: this.$utils.encrypt(JSON.stringify(p))}
       /* this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });*/
      },
      // 删除
      remove() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择至少一条记录进行删除操作！");
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
                      '/api/ boq/BoqNationalStandard/list/delete',
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
        this.searchform.code = "";
        this.searchform.parentId = "";
        this.searchform.name = "";
        this.searchform.unit = "";
        this.searchform.feature = "";
          this.searchform.sortNo = "";
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
            "/api/ boq/BoqNationalStandard/list/loadPageData",
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
  >>>.dialog_gb .el-dialog__body{
    width: 80%;
    margin: 0 auto;
    height: 300px;
    box-sizing: border-box;
    overflow: auto;
  }
</style>
