<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" plain type="primary"><i class="el-icon-plus"></i>新增</el-button>
        <el-button @click="totop" plain type="primary"><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
         <!--<el-button @click="searchformReset" type="primary" plain><i class="el-icon-plus"></i>批量提交</el-button> -->

        <el-upload
        style="float:left"
        class="upload-demo detailUpload detail-back-tab add-group "
        :action="'/api/contract/topInfo/TopInfor/list/importExcel'"
        :on-success="handleChange"
        :headers="{'Authorization':Authorization}"
        :on-error="handleChange"
        :show-file-list="false"
        accept=".xls,.xlsx"
        multiple
        >
        <el-button
        type="primary"
        plain
        class="new-add-btn"
        ><i class="el-icon-download"></i>导入
        </el-button>
        </el-upload>
        <el-link class="downFile"  type="primary" :href="downLoadUrl+'/importList.xlsx'" download="信息导入模板.xlsx">信息导入模板下载</el-link>
        <!--<el-button @click="exportdata" type="primary" plain><i class="el-icon-upload2"></i>导出</el-button>-->
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        <!-- <el-button @click="Importdata" type="primary" plain>导入</el-button> -->
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
                v-model="searchform.inforName"
                size="mini"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          label="项目编码"
          prop="inforCode"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目编码</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.inforCode"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          label="项目板块"
          prop="moduleName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目板块</span>
            <el-select
              class="list-search-picker"
              clearable
              filterable
              placeholder="请选择"
              @change="getTwo"
              size="mini"
              v-model="searchform.moduleName"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.detailName"
                v-for="(item, index) in projectPlate"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="工程类别(一级)"
          prop="enginTypeFirstName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>工程类别(一级)</span>
            <el-select
              class="list-search-picker"
              clearable
              filterable
              placeholder="请选择"
              @change="getTwo"
              size="mini"
              v-model="searchform.enginTypeFirstId"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in projectDomainType"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="工程类别(二级)"
          prop="enginTypeSecondName"
          show-overflow-tooltip

        >
          <template slot="header" slot-scope="scope">
            <span>工程类别(二级)</span>
            <el-select
              class="list-search-picker"
              :disabled="searchform.enginTypeFirstId==''"
              clearable
              filterable
              placeholder="请选择工程类别(一级)"
              size="mini"
              v-model="searchform.enginTypeSecondId"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in xqprojectType"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="建设单位"
          prop="constructionOrg"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>建设单位</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.constructionOrg"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="公告类型"
          prop="noticeTypeName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>公告类型</span>
            <el-select
              class="list-search-picker"
              clearable
              filterable
              placeholder="请选择"
              size="mini"
              v-model="searchform.noticeTypeId"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in bulletinType"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="预计招标时间"
          prop="state"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>预计招标时间</span>
            <div>
              <el-date-picker
                class="list-search-picker"
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="searchform.planBidTime"

              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.planBidTime | dateformat
            }}</template>
        </el-table-column>
        <!--<el-table-column-->
          <!--:width="150"-->
          <!--align="center"-->
          <!--label="状态"-->
          <!--prop="flowStatus"-->
          <!--show-overflow-tooltip-->
        <!--&gt;-->
          <!--<template slot-scope="scope">-->
            <!-- {{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核退回':'待登记'}}-->
          <!--</template>-->
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>状态</span>-->
            <!--<div>-->
              <!--<el-select-->
                <!--class="list-search-picker"-->
                <!--clearable-->
                <!--filterable-->
                <!--placeholder="请选择"-->
                <!--size="mini"-->
                <!--v-model="searchform.flowStatus"-->
              <!--&gt;-->
                <!--<el-option-->
                  <!--:key="index"-->
                  <!--:label="item.detailName"-->
                  <!--:value="item.id"-->
                  <!--v-for="(item, index) in flowStatusList"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
              <!--&lt;!&ndash;<el-input&ndash;&gt;-->
              <!--&lt;!&ndash;class="list-search-picker"&ndash;&gt;-->
              <!--&lt;!&ndash;style=" width: 100%"&ndash;&gt;-->
              <!--&lt;!&ndash;v-model="searchform.flowStatus"&ndash;&gt;-->
              <!--&lt;!&ndash;size="mini"&ndash;&gt;-->
              <!--&lt;!&ndash;/>&ndash;&gt;-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column
          :width="150"
          align="center"
          label="是否导入"
          prop="importFileRecordId"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.importFileRecordId==1?'是':scope.row.importFileRecordId==0?'否':scope.row.importFileRecordId==2?'历史数据':"其他"}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>是否导入</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.importFileRecordId"
              >
                <el-option
                  label="是"
                  value="1"
                ></el-option>
                <el-option
                  label="否"
                  value="0"
                ></el-option>
              </el-select>
              <!--<el-input-->
              <!--class="list-search-picker"-->
              <!--style=" width: 100%"-->
              <!--v-model="searchform.importFileRecordId"-->
              <!--size="mini"-->
              <!--/>-->
            </div>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--width="150"-->
          <!--align="center"-->
          <!--label="版本标识"-->
          <!--prop="version"-->
          <!--show-overflow-tooltip-->
        <!--&gt;-->
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>版本标识</span>-->
            <!--<div>-->
              <!--<el-input-->
                <!--class="list-search-picker"-->
                <!--style=" width: 100%"-->
                <!--v-model="searchform.version"-->
                <!--size="mini"-->
              <!--/>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!-- <el-table-column
          :width="120"
          align="center"
          label="编制时间"
          prop="createtime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.createtime | dateformat
          }}</template>
        </el-table-column> -->
        <el-table-column
          :width="150"
          align="center"
          label="是否提交"
          prop="isSubmit"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.isSubmit==1?'是':'否'}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>是否提交</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.isSubmit"
              >
                <el-option
                  label="是"
                  value="1"
                ></el-option>
                <el-option
                  label="否"
                  value="0"
                ></el-option>
              </el-select>
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
        Authorization:sessionStorage.getItem("token"),
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
          isSubmit:""
        },
        menus: [],
        multipleSelection: [],
        orgTree: [],
        xqprojectType:[],//工程二级列表
        flowStatusList:[
          {
            detailName:"草稿",
            id:'edit'
          },
          {
            detailName:"审核中",
            id:'check'
          },
          {
            detailName:"审核通过",
            id:'pass'
          },
          {
            detailName:"审核驳回",
            id:'reject'
          }
        ]
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
      projectPlate(){
        return this.$store.state.projectPlate;
      },
    },
    mounted() {
      this.$store.dispatch("getConfig", {});
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
          // this.$message.error(response.msg);
          this.$message.error("文件上传类型不符！");
        }
      },
      //工程类别二级
      getTwo(id) {
        this.searchform.enginTypeSecondId='';
        this.xqprojectType =[];
        if(id!=''){
          this.projectDomainType.find(
            (item) => {
            if (item.id == id) {
            this.xqprojectType = item.children;
          }
        }
        )
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
          path: "./importDetail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      // 修改
      totop() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        if(this.multipleSelection[0].flowStatus=='check'||this.multipleSelection[0].flowStatus=='pass' || this.multipleSelection[0].isSubmit == "1"){
          this.$message.info("此条数据不可修改！");
          return false;
        }
        let p = {actpoint: "edit", instid: this.multipleSelection[0].uuid};
        this.$router.push({
          path: "./importDetail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "look", instid: row.uuid};
        this.$router.push({
          path: "./importDetail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      // 删除
      remove() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let uuids = [],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.flowStatus=='edit'||item.flowStatus=='reject'||item.flowStatus==null && item.isSubmit!== "1"){
            uuids.push(item.uuid);
          }else{
            this.$message.info("当前所选数据中包含不可删除的选项,请检查后进行操作");
            return itemStatus=false;
          }
        })
        if(itemStatus){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                "/api/contract/topInfo/TopInfor/list/delete",{ids: uuids}

              )
              .then((res) => {
                this.getData()
              });
          }).catch(() => {})
        }

      },
      // 展示
      show() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let p = {actpoint: "look", instid: this.multipleSelection[0].uuid};
        this.$router.push({
          path: "./importDetail/",
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
        // this.searchform.inforName = "";
        // this.searchform.enginTypeFirstId = "";
        // this.searchform.constructionOrg = "";
        // this.searchform.noticeTypeId = "";
        this.searchform={
          current: 1,
          size: 20
        };
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询
      getData() {
        if(this.searchform.importFileRecordName!=''){
          if(this.searchform.importFileRecordName=='是'){
            this.searchform.importFileRecordId='1';
          }else if(this.searchform.importFileRecordName=='否'){
            this.searchform.importFileRecordId='0';
          }
        }
        this.$http
          .post(
            "/api/contract/topInfo/TopInfor/list/loadPageDataForImport",
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
  .add-group .new-add-btn{
    border-radius: 0;
    border-top-right-radius: 4px!important;
    border-bottom-right-radius: 4px!important;
    border-right: 1px solid #08459c!important;
  }
  .downFile{
    vertical-align: bottom;
    margin-left: 5px;
    margin-top: 10px;
  }
</style>
