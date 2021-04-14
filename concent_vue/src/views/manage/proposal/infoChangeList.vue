<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button :disabled="btnStatus" @click="add" plain type="primary"><i class="el-icon-plus"></i>新增</el-button>
        <el-button @click="totop" plain type="primary"><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="searchformReset" type="primary" plain><i class="el-icon-refresh-left"></i>刷新</el-button>
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        <el-button @click="exportdata" type="primary" plain><i class="el-icon-upload2"></i>导出</el-button>
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
        @select="rowSelect"
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
          fixed="left"
          show-overflow-tooltip
          type="index"
        ></el-table-column>
        <el-table-column
          :width="500"
          label="项目名称"
          fixed="left"
          prop="inforName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目名称</span>
            <div>
              <el-input
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
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.moduleName"
                size="mini"
              />
            </div>
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
          :width="150"
          align="center"
          label="录入单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>录入单位</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.createOrgName"
                size="mini"
              />
            </div>
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
          prop="planBidTime"
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
        <el-table-column
          :width="150"
          align="center"
          label="状态"
          prop="flowStatus"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'审核通过':scope.row.flowStatus==4?'审核退回':'待登记'}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="sousuo"
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
    <info-change-search v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></info-change-search>
  </div>
</template>

<script>
  import InfoChangeSearch from './infoChangeSearch'
  export default {
    // inject:['reload'],
    data() {
      return {
        btnStatus:false,
        infoCSVisible:false,
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
          planBidTime:'',
          noticeTypeId: "",
        },
        menus: [],
        multipleSelection: [],
        orgTree: [],
        xqprojectType:[],//工程二级列表
      };
    },
    components: {
      InfoChangeSearch
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
      //去新增详情页面
      goAddDetail(data){
        // console.log(data);
        if(data.topOrgId){
          let p = {actpoint: "add",instid:data.topOrgId};
          this.$router.push({
            path: "./infoChangeDetail/",
            query: {p: this.$utils.encrypt(JSON.stringify(p))},
          });
        }
      },
      exportdata() {
      },
      search() {
        this.showinput = false;
      },
      // 增加
      add() {
        this.infoCSVisible = true;
        this.$nextTick(() => {
          this.$refs.infoCS.init();
        })
      },
      // 修改
      totop() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行修改操作！");
          return false;
        }
        if(this.multipleSelection[0].flowStatus=='2'||this.multipleSelection[0].flowStatus=='3'){
          this.$message.info("此条数据不可修改！");
          return false;
        }
        let p = {actpoint: "edit", instid: this.multipleSelection[0].beforeId,afterId:this.multipleSelection[0].afterId,uuid:this.multipleSelection[0].uuid};
        this.$router.push({
          path: "./infoChangeDetail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "look", instid: row.beforeId,afterId:row.afterId,uuid:row.uuid};
        this.$router.push({
          path: "./infoChangeDetail/",
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
          uuids.push(item.topOrgId)
      })
        // uuids.join(',')
        this.$http
          .post(
            "/api/contract/topInfo/TopInfor/list/delete",
            {ids: uuids}
          )
          .then((res) => {
          this.getData()
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
          orgid: "",
          orgname: "",
          inforName: "",
          enginTypeFirstId: "",
          enginTypeSecondId:'',
          constructionOrg: "",
          planBidTime:'',
          noticeTypeId: "",
        }
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //行选择的时候
      rowSelect(selection,row){
        if(selection.indexOf(row)!=-1&&row.flowStatus==null){
          // this.btnStatus=true;
        }else{
          // this.btnStatus=false;
        }
      },
      // 查询
      getData() {
        this.$http
          .post(
            "/api/contract/topInfo/TopInfor/list/loadPageDataForChangeRecord",
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
