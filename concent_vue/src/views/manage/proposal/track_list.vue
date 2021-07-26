<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add('')" plain :disabled="trackStatus!=null" type="primary"><i class="el-icon-circle-check"></i>跟踪</el-button>
        <el-button @click="totop" :disabled="trackStatus!='1'||flowStatus==2||flowStatus==3"  plain type="primary"><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="add('fq')" :disabled="trackStatus!='1'" plain type="primary"><i class="el-icon-warning-outline"></i>放弃跟踪</el-button>
        <el-button @click="add('end')" :disabled="trackStatus!='1'" plain type="primary"><i class="el-icon-circle-close"></i>结束跟踪</el-button>
        <el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
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
          label="预计招标日期"
          prop="state"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>预计招标日期</span>
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
          label="跟踪状态"
          prop="trackStatus"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.trackStatus==1?'持续跟踪中':scope.row.trackStatus==2?'放弃跟踪':scope.row.trackStatus==3?'结束跟踪':scope.row.trackStatus==4?'资审中':scope.row.trackStatus==5?'资审通过待投标':scope.row.trackStatus==6?'资审未通过':scope.row.trackStatus==7?'投标中':scope.row.trackStatus==8?'已开标':scope.row.trackStatus==9?'中标未新签':scope.row.trackStatus==10?'中标已新签':scope.row.trackStatus==11?'未中标':scope.row.trackStatus==12?'废标':scope.row.trackStatus==13?'流标':'待跟踪'}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>跟踪状态</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.trackStatus"
              >
                <el-option label="持续跟踪中" value="1"></el-option>
                <el-option label="放弃跟踪" value="2"></el-option>
                <el-option label="结束跟踪" value="3"></el-option>
                <el-option label="资审中" value="4"></el-option>
                <el-option label="资审通过待投标" value="5"></el-option>
                <el-option label="资审未通过" value="6"></el-option>
                <el-option label="投标中" value="7"></el-option>
                <el-option label="已开标" value="8"></el-option>
                <el-option label="中标未新签" value="9"></el-option>
                <el-option label="中标已新签" value="10"></el-option>
                <el-option label="未中标" value="11"></el-option>
                <el-option label="废标" value="12"></el-option>
                <el-option label="流标" value="13"></el-option>
                <el-option label="待跟踪" value="14"></el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="审核状态"
          prop="flowStatus"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'审核通过':scope.row.flowStatus==4?'审核退回':'待登记'}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>审核状态</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.flowStatus"
              >
                <el-option label="草稿" value="1"></el-option>
                <el-option label="审核中" value="2"></el-option>
                <el-option label="审核通过" value="3"></el-option>
                <el-option label="审核退回" value="4"></el-option>
                <el-option label="待登记" value="0"></el-option>
              </el-select>
              <!--<el-input-->
              <!--class="list-search-picker"-->
              <!--style=" width: 100%"-->
              <!--v-model="searchform.flowStatus"-->
              <!--size="mini"-->
              <!--/>-->
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="版本标识"
          prop="version"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>版本标识</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.version"
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
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="80"
          align="center"
          label="预计中标概率"
          prop="bidProbName"
          show-overflow-tooltip
        ></el-table-column>
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
        xqprojectType:[],//工程二级列表
        trackStatus:'',
        flowStatus:''
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
      // 修改
      totop() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        if(this.multipleSelection[0].flowStatus=='2'||this.multipleSelection[0].flowStatus=='3'){
          this.$message.info("此条数据不可修改！");
          return false;
        }
        let p = {actpoint: "edit", instid: this.multipleSelection[0].uuid};
        this.$router.push({
          path: "./track_detail/",
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
          if(item.flowStatus==1||item.flowStatus==4){
            uuids.push(item.topOrgId);
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
                "/api/contract/topInfo/TopInfor/list/deleteByOrgIds",{ids: uuids}

              )
              .then((res) => {
                this.getData()
              });
          }).catch(() => {})
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
          this.flowStatus=row.flowStatus;
        }else{
          this.trackStatus='';
        }
      },

      // 查看
      rowshow(row) {
        let p = {actpoint: "look", instid: row.uuid,end:'addjs',trackStatus:row.trackStatus,topOrgId:row.topOrgId};
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
        let p = {actpoint: "look", instid: this.multipleSelection[0].uuid,topOrgId: this.multipleSelection[0].topOrgId};
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
        this.searchform={
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
