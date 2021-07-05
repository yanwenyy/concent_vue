<template>
  <div>
    <div style="width: 100%; overflow: hidden">

      <el-button-group style="float: left">
        <!--<el-button @click="add" plain type="primary">新增</el-button>-->
        <el-button @click="add" plain type="primary">新增</el-button>
        <el-button @click="totop" plain type="primary">修改</el-button>
        <el-button @click="remove" type="primary" plain>删除</el-button>
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
                style=" width: 100%"
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
                style=" width: 100%"
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
                style=" width: 100%"
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
                style=" width: 100%"
                v-model="searchform.feature"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程类别"
          prop="projectTypeName"
          show-overflow-tooltip
        >
        </el-table-column>
        <!--<el-table-column-->
          <!--:width="150"-->
          <!--align="center"-->
          <!--label="国标表中上级节点id"-->
          <!--prop="parentCode"-->
          <!--show-overflow-tooltip-->
        <!--&gt;-->
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>国标表中上级节点id</span>-->
            <!--<div>-->
              <!--<el-input-->
                <!--style=" width: 100%"-->
                <!--v-model="searchform.parentCode"-->
                <!--size="mini"-->
              <!--/>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->

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

    <!--国标库新增对话框-->
    <el-dialog  title="标准库维护" :visible.sync="dialogResult" class="dialog_gb">
      <el-form
        :inline="false"
        :model="form"
        class="gcform"
        ref="detailform"
      >
      <div v-if="whStatus">

          <el-form-item
            label="项目编号:"
            prop="boqOrdinaryStandard.importCode"
          >
            <el-input
              :disabled="ifLook==true"
              clearable
              size="mini"
              v-model="form.boqOrdinaryStandard.importCode"/>
          </el-form-item>

          <el-form-item
            label="项目名称:"
            prop="boqOrdinaryStandard.name"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-input
              :disabled="ifLook==true"
              clearable
              size="mini"
              v-model="form.boqOrdinaryStandard.name"/>
          </el-form-item>

          <el-form-item
            label="单位:"
            prop="boqOrdinaryStandard.unit"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-input
              :disabled="ifLook==true"
              clearable
              size="mini"
              v-model="form.boqOrdinaryStandard.unit"/>
          </el-form-item>

          <!-- 下拉 -->

          <el-form-item
            label="启用状态:"
            prop="boqOrdinaryStandard.enable"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-select
              :disabled="ifLook==true"
              filterable
              clearable
              placeholder=""
              size="mini"
              v-model="form.boqOrdinaryStandard.enable"
            >
              <el-option
                :key="index"
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in qyzt"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="工程类别:"

          >
            <el-select
              :disabled="ifLook==true"
              clearable
              filterable
              placeholder="请选择"
              size="mini"
              @change="
                  getName(
                    form.boqOrdinaryStandard.projectType,
                    projectType,
                    'projectTypeName'
                  )
                "
              v-model="form.boqOrdinaryStandard.projectType"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in projectType"
              ></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-form-item
              label="标准库项目特征:"
              prop="boqOrdinaryStandard.feature"
            >
              <el-input
                :disabled="ifLook==true"
                type="textarea"
                :rows="2"
                clearable
                v-model="form.boqOrdinaryStandard.feature"/>
            </el-form-item>
          </div>

        <!--<p style="overflow: hidden; margin-right:30px">-->
          <!--<span style="float: left">项目特征修改: </span>-->
          <!--<el-button-->
            <!--@click="whStatus=false,dialogResult1=true"-->
            <!--size="mini"-->
            <!--style="-->
                  <!--float: right;-->
                  <!--width: 60px;-->
                  <!--height: 32px;-->
                  <!--background: #5c8bfa;-->
                  <!--font-size: 12px;-->
                <!--"-->
            <!--type="primary"-->
          <!--&gt;修改</el-button>-->
        <!--</p>-->
        <!--<el-table-->
          <!--:data="form.boqFeatureStandardList"-->
          <!--:key="key"-->
          <!--:header-cell-style="{-->
                <!--'text-align': 'center',-->
                <!--'background-color': 'rgba(246,248,252,1)',-->
                <!--color: 'rgba(0,0,0,1)',-->
              <!--}"-->
          <!--@selection-change="handleSelectionChange"-->
          <!--align="center"-->
          <!--border-->
          <!--class="clothSizeTable"-->
          <!--ref="table"-->
          <!--style="width: 98%; min-height: calc(100vh - 370px)"-->
        <!--&gt;-->
          <!--<el-table-column-->
            <!--:width="80"-->
            <!--align="center"-->
            <!--label="序号"-->
            <!--show-overflow-tooltip-->
            <!--type="index"-->
          <!--&gt;</el-table-column>-->
          <!--<el-table-column-->
            <!--:resizable="false"-->
            <!--label="特征描述"-->
            <!--prop="feature"-->
            <!--show-overflow-tooltip-->
            <!--align="center"-->
          <!--&gt;-->
            <!--<template slot-scope="scope">-->
              <!--<el-input-->
                <!--class="listInput"-->
                <!--clearable-->
                <!--v-model="scope.row.feature"-->
              <!--&gt;</el-input>-->
            <!--</template>-->
          <!--</el-table-column>-->

          <!--<el-table-column-->
            <!--:resizable="false"-->
            <!--label="启用状态"-->

            <!--align="center"-->
            <!--show-overflow-tooltip-->
          <!--&gt;-->
            <!--<template slot-scope="scope">-->
              <!--<el-form-item class="tabelForm"  :prop="'boqFeatureStandardList.' + scope.$index + '.enable'"-->
                            <!--:rules="{-->
                <!--required: true,-->
                <!--message: '此项不能为空',-->
                <!--trigger: 'blur',-->
              <!--}">-->
                <!--&lt;!&ndash;@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"&ndash;&gt;-->
                <!--<el-select-->
                  <!--clearable-->
                  <!--filterable-->
                  <!--placeholder="请选择"-->
                  <!--v-model="scope.row.enable"-->
                <!--&gt;-->
                  <!--<el-option-->
                    <!--:key="index"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id"-->
                    <!--v-for="(item, index) in qyzt"-->
                  <!--&gt;</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
              <!--&lt;!&ndash; <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> &ndash;&gt;-->
            <!--</template>-->

          <!--</el-table-column>-->
        <!--</el-table>-->
        <div slot="footer" class="dialog-footer" v-if="!ifLook">
          <el-button type="primary" @click="saveOrUpdate()">保 存</el-button>
          <el-button @click="dialogResult = false">关 闭</el-button>
        </div>
      </div>
      <div v-if="dialogResult1">
        <div style="width: 100%; overflow: hidden">
          <el-button-group style="float: left">
            <el-button @click="addtz" plain type="primary">新增</el-button>
            <el-button @click="totop" plain type="primary">修改</el-button>
            <el-button @click="remove" type="primary" plain>删除</el-button>
          </el-button-group>
          <el-button @click="dialogResult1 = false,whStatus=true" plain  type="primary" class="dialog-footer">返 回</el-button>
        </div>
        <div style="margin-top: 20px">
          <el-table
            class="tableStyle"
            :max-height="$tableHeight"
            :height="$tableHeight"
            :data="form.boqFeatureStandardList"
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
              label="项目特征"
              prop="feature"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-if="dialogResult2">
        <el-form-item
            label="标准库项目特征:"
          >
            <el-input
              type="textarea"
              :rows="2"
              clearable
              v-model="form.addTzForm.feature"/>
          </el-form-item>
        <el-form-item
          label="启用状态:"
        >
          <el-select
            filterable
            clearable
            v-model="form.addTzForm.enable"
          >
            <el-option
              :key="index"
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in qyzt"
            ></el-option>
          </el-select>
        </el-form-item>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveTz()">保 存</el-button>
          <el-button @click="dialogResult2 = false,dialogResult1=true">返 回</el-button>
        </div>
      </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    // inject:['reload'],
    name: "proposal-list-look",
    data() {
      return {
          ifLook:false,
          key:0,
          railwayLine:[],
          whStatus:true,
          dialogResult1:false,
          dialogResult2:false,
          page: {current: 1, size: 20, total: 0, records: []},
          showinput: false,
          sousuo: "",
          searchform: {
              current: 1,
              size: 20,
              importCode: "",
              parentCode: "",
              name: "",
              unit: "",
              feature: "",
              code: "",
              projectType: "",
              uuid: "",
          },
          form:{
              boqOrdinaryStandard:{
                  importCode:"",
                  name:"",
                  unit:"",
                  projectType:"",
                  enable:"",
                  feature:"",
                  uuid:"",
                  projectTypeName:''
              },
              boqFeatureStandardList:[],
              addTzForm:{
                  feature:'',
                  enable:''
              },
          },

          qyzt:[
              {
                  id:'0',
                  name:'启用'
              },
              {
                  id:'1',
                  name:'禁用'
              }
          ],
          menus: [],
          multipleSelection: [],
          orgTree: [],
          dialogResult: false,
          dialogResult1:false,
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
    computed: {
      projectType(){
        return this.$store.state.category.projectDomainType;
      },
    },
    methods: {
      //获取下拉框id和name的公共方法
      getName(id, list, name,code) {
        if(id){
          this.$forceUpdate()
          this.form.boqOrdinaryStandard[name] = list.find(
            (item) => item.id == id
          ).detailName;
        }
      },
        //保存特征
        saveTz(){

        },
        //新增特征
        addtz(){
            this.dialogResult1=false;
            this.dialogResult2=true;
            this.form.addTzForm={
                feature:'',
                enable:''
            }
        },
      exportdata() {
      },
        //保存按钮
        saveOrUpdate(){
            this.$http
                .post(
                    "/api/contract/boq/BoqOrdinaryStandard/detail/save",
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
                          boqOrdinaryStandard:{
                            importCode:"",
                            name:"",
                            unit:"",
                            projectType:"",
                            enable:"",
                            feature:"",
                            uuid:"",
                          },
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
      search() {
        this.showinput = false;
      },
        //Dialog保存按钮方法
      /*  saveOrUpdate(){

        },*/
      // 增加
      add() {
          this.ifLook=false;
          this.dialogResult=true;
          this.whStatus=true;
          this.dialogResult1=false;
          this.dialogResult2=false;
          this.form={
              boqOrdinaryStandard:{
                  importCode:"",
                      name:"",
                      unit:"",
                      projectType:"",
                      enable:"",
                      feature:"",
                      uuid:"",
                      projectTypeName:''
              },
              boqFeatureStandardList:[],
              addTzForm:{
                  feature:'',
                  enable:''
              },
          }
      },
      // 修改
      totop() {
        this.ifLook=false;
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行修改操作！");
          return false;
        }
        // let p = {actpoint: "edit", instid: this.multipleSelection[0].topOrgId};

        // this.$router.push({
        //   path: "./detail/",
        //   query: {p: this.$utils.encrypt(JSON.stringify(p))},
        // });
        var row=this.multipleSelection[0];
        this.dialogResult=true;
        this.whStatus=true;
        this.dialogResult1=false;
        this.dialogResult2=false;
        this.form={
          boqOrdinaryStandard:{
            importCode:row.importCode,
            name:row.name,
            unit:row.unit,
            projectType:row.projectType,
            enable:row.enable,
            feature:row.feature,
            uuid:row.uuid,
            projectTypeName:row.projectTypeName
          },
          boqFeatureStandardList:row.boqFeatureStandardList,
          addTzForm:{
            feature:row.feature,
            enable:row.enable
          },
        }
      },
      // 查看
      rowshow(row) {
        this.dialogResult=true;
        this.ifLook=true;
        this.form={
          boqOrdinaryStandard:{
            importCode:row.importCode,
            name:row.name,
            unit:row.unit,
            projectType:row.projectType,
            enable:row.enable,
            feature:row.feature,
            uuid:row.uuid,
            projectTypeName:row.projectTypeName
          },
          boqFeatureStandardList:row.boqFeatureStandardList,
          addTzForm:{
            feature:row.feature,
            enable:row.enable
          },
        }
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
                      '/api/contract/boq/BoqOrdinaryStandard/list/delete',
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
            "/api/contract/boq/BoqOrdinaryStandard/list/loadPageDataByCondition",
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
    mounted() {
      this.getData();
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    },
  };
</script>
<style scoped>
  >>>.dialog-footer{
    float: right;
  }

  >>>.el-form-item__error{
    right:0;
  }
  .el-table__row {
    cursor: pointer;
  }
  >>>.dialog_gb .el-dialog__body{
    width: 80%;
    margin: 0 auto;
    height: 350px;
    box-sizing: border-box;
    overflow: auto;
    padding-bottom: 50px;
  }
</style>
