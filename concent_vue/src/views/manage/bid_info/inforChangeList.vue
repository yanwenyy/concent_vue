<!--投标登记变更列表页面-->
<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button :disabled="btnStatus" @click="add" plain type="primary"><i class="el-icon-plus"></i>新增</el-button>
        <el-button @click="totop" plain type="primary"><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>

        <el-button @click="batchSub" type="primary" plain><i class="el-icon-plus"></i>批量提交</el-button>
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
                style=" width: 100%"
                v-model="searchform.inforName"

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
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>工程类别(一级)</span>
            <el-select
              clearable
              filterable
              placeholder="请选择"
              @change="getTwo"

              v-model="searchform.enginTypeFirstName"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.detailName"
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
              placeholder="请选择"

              v-model="searchform.enginTypeSecondName"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.detailName"
                v-for="(item, index) in xqprojectType"
              ></el-option>
            </el-select>

          </template>
        </el-table-column>

        <el-table-column
          :width="150"
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
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.noticeTypeName"

              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="投标截止时间"
          prop="endTime"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>投标截止时间</span>
            <div>
            <el-date-picker
              style=" width: 100%"
              v-model="searchform.endTime"

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
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>填报人</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.createUserName"

              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="录入时间"

          prop="ccrCreateTime"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>录入时间</span>
            <div>
              <el-date-picker
                style=" width: 100%"

                value-format="timestamp"
                v-model="searchform.ccrCreateTime"
              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.ccrCreateTime | dateformat
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
            {{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核退回':'待登记'}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>审核状态</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"

                v-model="searchform.flowStatus"
              >
                <el-option label="草稿" value="edit"></el-option>
                <el-option label="审核中" value="check"></el-option>
                <el-option label="审核通过" value="pass"></el-option>
                <el-option label="审核退回" value="reject"></el-option>
              </el-select>
              <!--<el-input-->
              <!--class="list-search-picker"-->
              <!--style=" width: 100%"-->
              <!--v-model="searchform.flowStatus"-->
              <!-- -->
              <!--/>-->
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
          enginTypeFirstName: "",
          enginTypeSecondName:'',
          constructionOrg: "",
          noticeTypeId: "",
        },
        xqprojectType:[],
        menus: [],
        multipleSelection: [],
        orgTree: [],
      };
    },
    components: {
      InfoChangeSearch
    },
    computed: {
      projectDomainType() {
        return this.$store.state.category.projectDomainType;
      }
    },
    methods: {
      //批量提交
      batchSub(){
        if (this.multipleSelection.length <1) {
          this.$message.info("请选择一条记录进行提交操作！");
          return false;
        }
        var list=[],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.flowStatus=='edit'||item.flowStatus=='reject'){
            var v={
              businessId:item.uuid,
              businessName:item.inforName,
              businessType:'contract_bid_change'
            }
            list.push(v);
          }else{
            this.$message.info("当前所选数据中包含不可提交的选项,请检查后进行操作");
            return itemStatus=false;
          }
        })
        if(itemStatus){
          this.$confirm(`确认提交这些数据吗`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                "/api/contract/topInfo/Verify/commonProcess/start",
                JSON.stringify(list),
                {useJson: true}

              )
              .then((res) => {
                if(res.data.code==200){
                  this.$message({
                    message: "操作成功",
                    type: "success",
                  });
                  this.getData()
                }else{
                  this.$message.error(res.data.msg);
                }

              });
          }).catch(() => {})
        }
      },
      //去新增详情页面
      goAddDetail(data){
        // console.log(data);
        let p = {from:'', actpoint: "add",instid:data.topInfoOrgId,uuid:data.uuid};
        if (data.flowStatus === "pass") {
          if (data.bidFlowStatus === "pass") {
            p = {from:'kblist', actpoint: "add",instid:data.topInfoOrgId,uuid:data.uuid};
          }
        }
        this.$router.push({
          path: "./InfoChangeDetail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      exportdata() {
        this.searchform.size=1000000000;
        this.$http
          .post(
            "/api/contract/topInfo/BidInfo/list/loadPageDataForChangeRecord",
            this.searchform
          )
          .then((res) => {
            this.searchform.size=20;
            var datas = res.data.data.records;
            this.$exportXls.exportList({
              thead:' <tr>\n' +
              '<th>项目名称</th>\n' +
              '<th>工程类别(一级)</th>\n' +
              '<th>工程类别(二级)</th>\n' +
              '<th>建设单位</th>\n' +
              '<th>公告类型</th>\n' +
              '<th>状态</th>\n' +
              '<th>投标截止日期</th>\n' +
              '<th>填报人</th>\n' +
              '<th>版本标识</th>\n' +
              '<th>录入时间</th>\n' +
              '</tr>',
              jsonData:datas,
              tdstr:['inforName','enginTypeFirstName','enginTypeSecondName',
                'constructionOrg','noticeTypeName','flowStatus','endTime',
                'createUserName','version','ccrCreateTime'],
              tdstrFuc:{
                flowStatus:function (str) {
                  return str==1?'草稿':str==2?'审核中':str==3?'审核通过':str==4?'审核退回':'待登记';
                },
                endTime:function (str) {
                  return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
                },
                ccrCreateTime:function (str) {
                  return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
                },
              }
            })
          });
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
        if(this.multipleSelection[0].flowStatus=='check'||this.multipleSelection[0].flowStatus=='pass'){
          this.$message.info("此条数据不可修改！");
          return false;
        }
        let p = {actpoint: "edit", instid: this.multipleSelection[0].beforeId,afterId:this.multipleSelection[0].afterId,uuid:this.multipleSelection[0].uuid};
        this.$router.push({
          path: "./InfoChangeDetail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

      },

    // rowshow(row) {
    //   var id=row.flowStatus==null?row.topInfoOrgId:row.uuid;
    //   let p = { actpoint: "look", instid: id ,flowStatus:row.flowStatus,uuid:row.uuid};
    //   this.$router.push({
    //     path: "./detail/",
    //     query: { p: this.$utils.encrypt(JSON.stringify(p)) },
    //   });
    // },
      rowshow(row) {
        let p = {actpoint: "look", instid: row.beforeId,afterId:row.afterId,uuid:row.uuid};
        this.$router.push({
          path: "./InfoChangeDetail",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },


      remove() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        if (this.multipleSelection[0].flowStatus == "check") {
          this.$message.info("审核中记录禁止删除！");
          return false;
        }
        let uuids = [],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          uuids.push(item.uuid);
        })

        if(itemStatus){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
              "/api/contract/topInfo/BidInfo/list/deleteChange",{ids:uuids}
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
          path: "/api/contract/topInfo/BidInfo/list/loadPageDataForChangeRecord",
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
        this.searchform.inforName = "";
        this.searchform.enginTypeFirstId = "";
        this.searchform.constructionOrg = "";
        this.searchform.noticeTypeId = "";
        this.searchform.enginTypeFirstName = "";
        this.searchform.enginTypeSecondName = "";
        this.searchform.noticeTypeName = "";
        this.searchform.endTime = "";
        this.searchform.createUserName = "";
        this.searchform.ccrCreateTime = "";
        this.searchform.flowStatus = "";
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      //行选择的时候
      rowSelect(selection,row){
        if(selection.indexOf(row)!=-1&&row.flowStatus==null){
          // this.btnStatus=true;
        }else{
          // this.btnStatus=false;
        }
      },
      //工程类别二级
      getTwo(id) {
        this.searchform.enginTypeSecondName='';
        this.xqprojectType =[];
        if(id!=''){
          this.projectDomainType.find(
            (item) => {
            if (item.detailName == id) {
            this.xqprojectType = item.children;
          }
        }
        )
        }
      },
      // 查询
      getData() {
        console.log(11111)
        this.$http
          .post(
            "/api/contract/topInfo/BidInfo/list/loadPageDataForChangeRecord",
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
       this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    },
  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
  .cx{
    font-size:10px
  }

</style>
