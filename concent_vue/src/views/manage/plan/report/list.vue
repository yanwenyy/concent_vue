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
          label="报表名称"
          prop="reportName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>报表名称</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.reportName"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="报表类型"
          prop="reportType"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>报表类型</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.reportType"
                size="mini"
              />
            </div>
          </template>
          <template slot-scope="scope">
             {{scope.row.reportType=='01'?'在建项目报表':scope.row.reportType=='02'?'竣工项目报表':scope.row.reportType=='03'
            ?'年度报表':scope.row.reportType=='04'?'季度报表':scope.row.reportType=='05'?'勘察设计报表':scope.row.reportType=='06'?'产值报表':'其它'}}
          </template>
        </el-table-column>

        <el-table-column
          :width="300"
          align="center"
          label="报表层级"
          prop="reportHierarchy"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>报表层级</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.reportHierarchy"
                size="mini"
              />
            </div>
          </template>
          <template slot-scope="scope">
             {{scope.row.enableStatus==11?'股份公司':scope.row.enableStatus==12?'集团公司':scope.row.enableStatus==13?'工程公司,局指挥部':scope.row.enableStatus==18?'分公司'
            :scope.row.enableStatus==17?'项目部':scope.row.enableStatus==14?'部门':scope.row.enableStatus==16?'项目节点':scope.row.enableStatus==24?'区域指挥部':'其它'}}
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="状态"
          prop="enableStatus"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.enableStatus"
                size="mini"
              />
            </div>
          </template>
          <template slot-scope="scope">
             {{scope.row.enableStatus==0?'禁用':scope.row.enableStatus==1?'启用':'其它'}}
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
    <el-dialog  title="新增报表" :visible.sync="dialogResult" width="30%" >
      <el-form :model="form" style="height:30%">
        <el-form-item label="报表名称:" :label-width="formLabelWidth" :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',}">
          <el-input
            v-model="form.reportName"
            size="mini"
          />
        </el-form-item>

        <el-form-item label="报表类型:" :label-width="formLabelWidth">
          <el-select v-model="form.reportType" placeholder="请选择报表类型" size="mini" :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',}">
            <el-option label="在建项目报表" value="01"></el-option>
            <el-option label="竣工项目报表" value="02"></el-option>
            <el-option label="年度报表" value="03"></el-option>
            <el-option label="季度报表" value="04"></el-option>
            <el-option label="勘察设计报表" value="05"></el-option>
            <el-option label="产值报表" value="06"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="报表层级:" prop="value1" :label-width="formLabelWidth" size="mini">
          <el-select v-model="reportHeyComb" multiple placeholder="请选择报表层级" filterable clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
        <el-form-item label="启用状态:" :label-width="formLabelWidth">
          <el-select v-model="form.enableStatus" placeholder="请选择启用状态" size="mini">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="排序码:" :label-width="formLabelWidth">
          <el-input
            v-model="form.reportSort"
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
    name: "proposal-list-look",
    data() {
      return {
        page: {current: 1, size: 20, total: 0, records: []},
        showinput: false,
        sousuo: "",
        searchform: {
          current: 1,
          size: 20,
          reportName: "",
          reportType: "",
          reportHierarchy: "",
          reportSort: "",
          enableStatus:"",
          constructionOrg: "",
          noticeTypeId: "",
        },
          form:{
              reportName: "",
              reportType: "",
              reportHierarchy: "",
              reportSort: "",
              enableStatus:"",
          },
          options: [{
              value: '11',
              label: '股份公司'
          }, {
              value: '12',
              label: '集团公司'
          }, {
              value: '13',
              label: '工程公司，局指挥部'
          }, {
                  value: '18',
                  label: '分公司'
              }, {
              value: '17',
              label: '项目部'
          }, {
                  value: '14',
                  label: '部门'
              },{
              value: '16',
              label: '项目节点'
          },{
              value: '24',
              label: '区域指挥部'
          },
          ],
        reportHeyComb: [],
        menus: [],
        multipleSelection: [],
        orgTree: [],
        dialogResult: false,
        formLabelWidth: '120px'

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
      amountSource() {
        return this.$store.state.amountSource;
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
        exportdata() {
        },
        search() {
            this.showinput = false;
        },
        //Dialog保存按钮方法
        save(){
        // console.log(this.reportHeyComb)
            this.$http
                .post(
                    "/api/contract/ReportManage/detail/save",
                    JSON.stringify({
                        reportHeyComb:this.reportHeyComb,
                        reportManage:this.form
                    }),
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
                /*code: "",
                parentId: "",
                feature:"",
                name: "",
                unit: "",
                sortNo: "",
                uuid:''*/
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
                        '/api/contract/ReportManage/list/delete',
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
            "/api/contract/ReportManage/list/loadPageData",

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
