<template>
  <div>
    <div style="width: 100%;overflow: hidden;">
      <el-button-group style="float: left">
        <el-button type="primary" @click="addk" plain :disabled="bidFlowStatus==2||bidFlowStatus==3"><i class="el-icon-document-checked"></i>开标登记</el-button>
        <!--<el-button @click="add" :disabled="flowStatus!=null"  plain type="primary"><i class="el-icon-plus"></i>登记</el-button>-->
        <el-button @click="totop" :disabled="flowStatus!=1&&flowStatus!=4" plain type="primary"><i class="el-icon-edit"></i>修改</el-button>


        <el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>

      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain ><i class="el-icon-search"></i>查询</el-button>
        <el-button @click="" type="primary" plain ><i class="el-icon-upload2"></i>导出</el-button>
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
        style="width: 100%"
        tooltip-effect="dark"
      >
        <el-table-column
          :width="50"
          align="center"
          show-overflow-tooltip
          type="selection">
        </el-table-column>
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
          fixed>
        </el-table-column>

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
                style=" width: 100%"
                v-model="searchform.inforName"
                size="mini"/>
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
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>工程类别(一级)</span>
            <el-select
              clearable
              filterable
              placeholder="请选择"
              @change="getTwo"
              size="mini"
              v-model="searchform.enginTypeFirstName"
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
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>工程类别(二级)</span>
            <el-select
              clearable
              filterable
              placeholder="请选择工程类别(一级)"
              size="mini"
              v-model="searchform.enginTypeSecondName"
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
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>建设单位</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.constructionOrg"
                size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="公告类型"
          prop="noticeTypeName"
          show-overflow-tooltip>
          <!-- <template slot-scope="scope">{{
            scope.row.exetime | datetoMonth
          }}</template> -->
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
          :width="150"
          align="center"
          label="状态"
          prop="orgname"

          show-overflow-tooltip>
          <template slot-scope="scope">
              {{scope.row.bidFlowStatus==1?'草稿':scope.row.bidFlowStatus==2?'审核中':scope.row.bidFlowStatus==3?'审核通过':scope.row.bidFlowStatus==4?'审核退回':'待登记'}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.bidFlowStatus"
                size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="投标截止日期"
          prop="endTime"
          show-overflow-tooltip>

          <template slot="header" slot-scope="scope">
            <span>截至投标日期</span>
            <div>
              <el-date-picker
              style=" width: 100%"
              v-model="searchform.endTime"
              size="mini"
              value-format="timestamp"
              >
              </el-date-picker>
            </div>
          </template>
           <template slot-scope="scope">{{
            scope.row.endTime | dateformat
          }}</template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="填报人"
          prop="createUserName"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>填报人</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.createUserName"
                size="mini"/>
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
      </el-table>
    </div>
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[20, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <info-change-search v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></info-change-search>

  </div>
</template>

<script>
import InfoChangeSearch from '../proposal/infoChangeSearch'

export default {
  name: "proposal-list-look",
  data() {

    return {
      bidFlowStatus:'',
      flowStatus:'',
      dialogFormVisible: false,
      infoCSVisible:false,
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      page: { current: 1, size: 20, total: 0, records: [] },
      showinput: false,
      sousuo: "",
      searchform: {
        current: 1,
        size: 20,
        year: "",
        name: "",
        ptype: "",
        orgid: "",
        orgname: "",
        version:''
      },
      zbForm:{},
      menus: [],
      multipleSelection: [],
      orgTree: [],
      xqprojectType:[],//工程二级列表
      formLabelWidth: '120px'
    };
  },
   components: {
      InfoChangeSearch
    },
    computed: {
    projectDomainType() {
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
      //行选择的时候
      rowSelect(selection, row){
        if(selection.indexOf(row)!=-1){
          this.flowStatus=row.bidFlowStatus;
          this.bidFlowStatus=row.bidFlowStatus;
        }else{
          this.flowStatus='';
        }
      },
      //去新增详情页面
      goAddDetail(data){
        console.log(data);
        let p = {actpoint: "add",instid: data.topOrgId};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
    search() {
      this.showinput = false;
    },
    //登记
    add() {
        if (this.multipleSelection.length !== 1||this.multipleSelection.length>1) {
          this.$message.info("请选择一条记录进行登记操作！");
          return false;
        }
        let p = {actpoint: "add", instid: this.multipleSelection[0].topInfoOrgId};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

        // this.infoCSVisible = true;
        // this.$nextTick(() => {
        //   this.$refs.infoCS.init();
        // })
    },


    // 修改
      totop() {
        if (this.multipleSelection.length !== 1||this.multipleSelection.length>1) {
          this.$message.info("请选择一条记录进行修改操作！");uuid
          return false;
        }
        let p = {from:'kblist',actpoint: "edit", instid: this.multipleSelection[0].uuid};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

      },


    //开标结果登记界面
        addk() {
        if (this.multipleSelection.length !== 1||this.multipleSelection.length>1) {
          this.$message.info("请选择一条记录进行登记操作！");
          return false;
        }
        let p = {actpoint: "addk", instid: this.multipleSelection[0].uuid};
        this.$router.push({
          path: "./Winning_bidKB/",
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
          if(item.bidFlowStatus==1||item.bidFlowStatus==4){
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
              "/api/contract/topInfo/BidInfo/list/deleteBid2",{ids: uuids}

            )
            .then((res) => {
            this.getData()
        });
        }).catch(() => {})
        }

      },
    rowshow(row) {
      var id=row.flowStatus==null?row.topInfoOrgId:row.uuid;
      let p = { from:'kblist',actpoint: "look", instid: id ,flowStatus:row.bidFlowStatus,uuid:row.uuid};
      this.$router.push({
        path: "./detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
      });
    },
    // 展示
    show() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info("请选择一条记录进行查看操作！");
        return false;
      }
      let p = { actpoint: "look", instid: this.multipleSelection[0].uuid };
      this.$router.push({
        path: "../detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
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
        this.searchform= {
          current: 1,
          size: 20,
          year: "",
          name: "",
          ptype: "",
          orgid: "",
          orgname: "",
          enginTypeFirstName:"",
          enginTypeSecondName:"",
          version:''
      }

        this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      this.$http
        .post(
         "/api/contract/topInfo/BidInfo/list/loadPageDataOpenBid",
          this.searchform
        )
        .then((res) => {
          this.page = res.data.data;
        });
    },
    getMenus() {
      this.$http
        .post("api/base/loadcascader", { typecode: "XMLX" })
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
    // this.getMenus();
    // this.getOrgTree();
    this.getData();
     this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
  },
};
</script>
<style scoped>
.el-dialog{
  width: 60%;
}
.el-table__row {
  cursor: pointer;
}
</style>
