<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
       <!-- <el-button @click="add" plain type="primary">新增</el-button>
        <el-button @click="totop" plain type="primary">修改</el-button>
        <el-button @click="remove" type="primary" plain>删除</el-button>-->
        <!-- <el-button @click="searchformReset" type="primary" plain>刷新</el-button> -->
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
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
    <el-dialog  title="新增报表" :visible.sync="dialogResult" width="30%" >
      <el-form :model="form" style="height:30%">
        <el-form-item label="报表名称:" :label-width="formLabelWidth" :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',}">
<!--          :disabled="type=='look'"-->
<!--          查看时不让编辑-->
          <el-input
            :disabled="type=='look'"
            v-model="form.reportName"

          />
        </el-form-item>

        <el-form-item label="报表类型:" :label-width="formLabelWidth">
          <el-select v-model="form.reportType" placeholder="请选择报表类型"
                     :disabled="type=='look'"
                     :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',}">
            <el-option label="在建项目报表" value="01"></el-option>
            <el-option label="竣工项目报表" value="02"></el-option>
            <el-option label="年度报表" value="03"></el-option>
            <el-option label="季度报表" value="04"></el-option>
            <el-option label="勘察设计报表" value="05"></el-option>
            <el-option label="产值报表" value="06"></el-option>
            <el-option label="股份公司报表" value="07"></el-option>
            <el-option label="新签报表" value="08"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="报表层级:" prop="value1" :label-width="formLabelWidth"  >
          <el-select v-model="form.reportHeyComb"
                     @change="getMultipleName(form.reportHeyComb,options,'reportHierarchyId','reportHierarchy')"
                     multiple
                     placeholder="请选择报表层级"
                     :disabled="type=='look'"
                     filterable
                     clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
        <el-form-item label="启用状态:" :label-width="formLabelWidth">
          <el-select v-model="form.enableStatus" placeholder="请选择启用状态"
                     :disabled="type=='look'">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="排序码:" :label-width="formLabelWidth">
          <el-input
            :disabled="type=='look'"
            v-model="form.reportSort"

          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :disabled="type=='look'"  type="primary" @click="save()">保 存</el-button>
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
          reportType: "02",
          reportHierarchy: "",
          reportHierarchyId:"",
          reportSort: "",
          enableStatus:"",
          constructionOrg: "",
          noticeTypeId: "",
        },
          form:{
              reportName: "",
              reportType: "",
              reportHierarchy: "",
              reportHierarchyId:"",
              reportSort: "",
              enableStatus:"",
              reportHeyComb: [],
              reportHeyCombId:[],
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
        menus: [],
        multipleSelection: [],
        orgTree: [],
        dialogResult: false,
        formLabelWidth: '120px',
        type:'',
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
        //复选下拉框框获取name
        getMultipleName(valueList,list,id,name){
            var _id=[],_name=[];
            list.forEach((item)=>{
                if(valueList.indexOf(item.value)!=-1){
                    _id.push(item.value);
                    _name.push(item.label)
                }
            });
            this.form[id]=_id.join(",");
            this.form[name]=_name.join(",");
            /*console.log(this.form[name])
            console.log(this.form[id])*/
        },
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
                        reportHeyComb:this.form.reportHierarchy.split(","),
                        reportHeyCombId:this.form.reportHeyComb,
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
                            reportName: "",
                            reportType: "",
                            reportHierarchy: "",
                            reportHierarchyId:"",
                            reportSort: "",
                            enableStatus: "",
                            reportHeyComb: [],
                            reportHeyCombId:[],
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
            this.type='add';
            this.dialogResult=true;
            this.form={
                reportName: "",
                reportType: "",
                reportHierarchy:"",
                reportHierarchyId:"",
                enableStatus: "",
                reportSort: "",
                reportHeyComb: [],
                reportHeyCombId:[],
                uuid:''
            }
        },
      // 修改
        totop() {
            this.type='edit';
            if (this.multipleSelection.length !== 1 ||this.multipleSelection.length>1) {
                this.$message.info("请选择一条记录进行查看操作！");
                return false;
            }
            var list= this.multipleSelection[0];
            console.log(list)
            this.form={
                reportName: list.reportName,
                reportType: list.reportType,
                reportHierarchy:list.reportHierarchy,
                reportHierarchyId:list.reportHierarchyId,
                reportSort:list.reportSort,
                enableStatus:list.enableStatus,
                uuid:list.uuid,
                reportHeyComb:list.reportHierarchyId?list.reportHierarchyId.split(","):[],
            };
            this.dialogResult = true;

        },
        // 查看
        rowshow(row) {
            // this.type='look';
            // this.$http
            //     .post("/api/contract/ReportManage/detail/entityInfo", {
            //         id: row.uuid,
            //     })
            //     .then((res) => {
            //         var datas = res.data.data;
            //         this.form.reportName = datas.reportName;
            //         this.form.reportType = datas.reportType;
            //         // this.form.reportHeyComb = datas.reportHeyComb;
            //         this.form.reportHeyCombId = datas.reportHeyCombId;
            //         this.form.enableStatus = datas.enableStatus;
            //         this.form.reportSort = datas.reportSort;
            //         this.dialogResult = true;
            //         this.form.reportHeyComb=datas.reportHierarchyId?datas.reportHierarchyId.split(","):[];
            //     });
          this.$router.push({
            path: "/reportForm/list",
            query: {resid: row.smartbi},
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
        reportName: "",
        reportType: "",
        reportHierarchy: "",
        reportHierarchyId:"",
        reportSort: "",
        enableStatus:"",
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
