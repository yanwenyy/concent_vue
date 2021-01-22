<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add('')" plain :disabled="trackStatus!=null" type="primary">跟踪</el-button>
        <el-button @click="add('fq')" :disabled="trackStatus!='1'" plain type="primary">放弃跟踪</el-button>
        <el-button @click="add('end')" :disabled="trackStatus!='1'" plain type="primary">结束跟踪</el-button>
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
        <el-button @click="getData" type="primary" plain>查询</el-button>
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
        @select="rowSelect"
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
          label="截止日期"
          prop="state"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>截止日期</span>
            <div>
              <el-date-picker
                class="list-search-picker"
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="searchform.planBidTime">
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.planBidTime | dateformat
            }}</template>
        </el-table-column>

        <el-table-column
          :width="180"
          align="center"
          label="放弃跟踪时间"
          prop="state"
          show-overflow-tooltip
        >
        <template slot="header" slot-scope="scope">
            <span>放弃跟踪时间</span>
            <div>
              <el-date-picker
                class="list-search-picker"
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="searchform.quitTrackTime">
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.quitTrackTime | dateformat
            }}</template>
        </el-table-column>

        <el-table-column
          :width="180"
          align="center"
          label="结束跟踪时间"
          prop="state"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>结束跟踪时间</span>
            <div>
              <el-date-picker
                class="list-search-picker"
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="searchform.endTrackTime">
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.endTrackTime | dateformat
            }}</template>
          </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="状态"
          prop="trackStatus"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.trackStatus==1?'跟踪中':scope.row.trackStatus==2?'放弃跟踪':scope.row.trackStatus==3?'结束跟踪':'待跟踪'}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-input

                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.flowStatus"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="是否导入"
          prop="importFileRecordId"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.importFileRecordId==1?'是':'否'}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>是否导入</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.importFileRecordId"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          :width="80"
          align="center"
          label="编制人"
          prop="username"
          show-overflow-tooltip
        ></el-table-column> -->
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
        xqprojectType:[],//工程二级列表
        trackStatus:'',
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
      search() {
        this.showinput = false;
      },
      // 增加
      add(type) {
        if (this.multipleSelection.length !== 1||this.multipleSelection.length>1) {
          this.$message.info("请选择一条记录进行登记操作！");
          return false;
        }
        let p = {actpoint: "add",type:type,instid: this.multipleSelection[0].uuid,trackStatus:this.trackStatus};
        this.$router.push({
          path: "./track_detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      //行选择的时候
      rowSelect(selection, row){
        if(selection.indexOf(row)!=-1){
          this.trackStatus=row.trackStatus;
        }else{
          this.trackStatus='';
        }
      },

      // 查看
      rowshow(row) {
        let p = {actpoint: "look", instid: row.uuid,end:'addjs',trackStatus:row.trackStatus};
        this.$router.push({
          path: "./track_detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
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
          path: "../track_detail/",
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
      //重置
      searchformReset() {
        // this.$refs["searchform"].resetFields();
        this.searchform.inforName = "";
        this.searchform.enginTypeFirstId = "";
        this.searchform.constructionOrg = "";
        this.searchform.noticeTypeId = "";
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
            "/api/contract/topInfo/TopInfor/list/loadPageDataTrack",
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
