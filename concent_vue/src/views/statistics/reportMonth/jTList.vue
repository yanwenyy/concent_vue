<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <!--<el-form class="search-form" :inline="true" :model="searchform" @keyup.enter.native="init()">
        <el-form-item label="填报年月:">
          <el-date-picker
            v-model="searchform.fillDate"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
      </el-form>-->
      <el-button-group style="float: left">
        <el-button @click="add" plain type="primary"><i class="el-icon-plus"></i>创建</el-button>
        <el-button @click="totop" plain type="primary"><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        <!-- <el-button @click="Importdata" type="primary" plain>导入</el-button> -->
      </div>
    </div>

    <div style="margin-top: 10px">
      <el-table
        row-key="uuid"
        :tree-props="{children: 'chirldList', hasChildren: 'hasChildren'}"
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="tableData"
        :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        tooltip-effect="dark"
        lazy
        :load="load"
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
          label="填报单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>填报单位</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.createOrgName"
                size="mini"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <spam class="blue pointer" v-if="scope.row.reportType != null && scope.row.reportType != ''">
              {{scope.row.createOrgName+"("+(scope.row.reportType==1?'自揽':scope.row.reportType==2?'工区':'')+")"}}
            </spam>
            <span class="blue pointer"v-if="scope.row.reportType== null || scope.row.reportType == ''">
              {{scope.row.createOrgName}}
            </span>
          </template>

        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="年月"
          prop="enginTypeFirstName"
          show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>填报年月</span>
            <div>
              <el-date-picker class="list-search-picker" filterable clearable
                              type="month"
                              @change="queryList"
                              v-model="searchform.yearDateS"
              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <div>{{scope.row.monthValue}}</div>-->
            <div v-if="scope.row.reportYear != null && scope.row.reportMonth != null ">
              {{
              scope.row.reportYear+"-"+scope.row.reportMonth
              }}
            </div>
            <div v-else>{{searchform.yearDateS}}</div>
          </template>
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="审核状态"
          prop="stauts"
          show-overflow-tooltip

        >
          <template slot="header" slot-scope="scope">
            <span>审核状态</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.status"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in flowStatusList"
                ></el-option>
              </el-select>
              <!--<el-input-->
              <!--class="list-search-picker"-->
              <!--style=" width: 100%"-->
              <!--v-model="searchform.flowStatus"-->
              <!--size="mini"-->
              <!--/>-->
            </div>
          </template>
          <template slot-scope="scope">
            <div>{{scope.row.status==1?'草稿':scope.row.status==2?'审核中':scope.row.status==3?'审核通过':scope.row.status==4?'审核退回':'未创建'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>创建时间</span>
            <div>
              <el-date-picker
                class="list-search-picker"
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="searchform.createTime"

              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.createTime | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="审核通过时间"
          prop="state"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>审核通过时间</span>
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
            scope.row.auditDate | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="查看详细"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span @click="queryGsXq(scope.row)"   class="blue pointer" v-if="scope.row.createOrgType=='13'">
            查看详细
           </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    // inject:['reload'],
    //name: "proposal-list-look",
    data() {
      return {
        Authorization:sessionStorage.getItem("token"),
        page: {current: 1, size: 20, total: 0, records: []},
        tableData: [],
        userdata:{},
        showinput: false,
        sousuo: "",
        searchform: {
          createOrgName: "",
          status: "",
          createTime: "",
          yearDateS: "",
        },
        menus: [],
        multipleSelection: [],
        orgTree: [],
        xqprojectType:[],//工程二级列表
        flowStatusList:[
          {
            detailName:"草稿",
            id:'1'
          },
          {
            detailName:"审核中",
            id:'2'
          },
          {
            detailName:"审核通过",
            id:'3'
          },
          {
            detailName:"审核驳回",
            id:'4'
          },
          {
            detailName:"未创建",
            id:''
          }
        ]
      };
    },
    computed: {

    },
    methods: {
      exportdata() {
      },
      load(tree, treeNode, resolve) {
        tree.reportYear= this.searchform.yearDateS.split("-")[0];
        tree.reportMonth= this.searchform.yearDateS.split("-")[1];
        setTimeout(() => {
          this.$http
              .post(
                  "/api/statistics/projectMonthlyReport/Projectreport/list/jtClickQueryEntInfo",
                  tree
              )
              .then((res) => {
                var datas=res.data.data.list
                resolve(datas)
              });

        }, 1000)
      },
      getdatatime(){//默认显示今天
        var date = new Date();
        var y = date.getFullYear();
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var time=y + '-' + m;
        this.searchform.yearDateS= time;
      },
      search() {
        this.showinput = false;
      },
      queryList(){
        this.searchform.current = 1;
        this.searchform.current = 1;
        this.searchform.reportYear= this.searchform.yearDateS.split("-")[0];
        this.searchform.reportMonth= this.searchform.yearDateS.split("-")[1];
        this.getData();
      },
      //查询项目详细列表
      queryGsXq(row){
        debugger
        let mList = row;
        this.$router.push({
          path: "./reportMList/",
          query: {p: this.$utils.encrypt(JSON.stringify(mList))},
        });
      },
      // 增加
      add() {
      debugger
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行创建操作！");
          return false;
        }
        if (this.multipleSelection[0].createOrgCode==this.userdata.managerOrgCode && (this.multipleSelection[0].status!='' && this.multipleSelection[0].status!=null)) {
          this.$message.info("本单位月报已经创建！");
          return false;
        }
        if(this.multipleSelection[0].createOrgCode!=this.userdata.managerOrgCode){
          this.$message.info("无权操作下级单位月报！");
          return false;
        }
        //判断是否存在未上报的数据，如果存在就提示，不存在就创建
     /*   if(this.tableData.length>0){
          for (var i=0; i < this.tableData.length; i++) {
            if((this.tableData[i].status ==''||this.tableData[i].status ==null) && this.tableData[i].projectId!=this.tableData.managerOrgId){
              this.$message.info('该单位下存在未提交的月报,请提交该单位下所有项目月报后再进行尝试！')
              return false;
            }
          };
        }*/
        if (this.multipleSelection[0].createOrgCode==this.userdata.managerOrgCode && (this.multipleSelection[0].status==''||this.multipleSelection[0].status==null)) {
          var url = '/api/statistics/projectMonthlyReport/Projectreport/detail/jtReportEntityInfo';
        var params =  this.multipleSelection[0];
        this.$http.post(
            url,
            JSON.stringify(params),
            {useJson: true}
        ).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: '创建成功'
            });
            this.getData();
          }else if(res.data.code === 400){
            this.$message({
              message: '该单位已在本月创建过月报请尝试修改或于下月再进行尝试'
            });
            this.getData();
          }else{
            this.$message({
              message: '创建失败'
            });
          }
        });}
      },
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
        let mList = {actpoint: "edit", instid: this.multipleSelection[0]};
        this.$router.push({
          path: "./jTMDetail/",
          query: {p: this.$utils.encrypt(JSON.stringify(mList))},
        });

      },
      // 查看
      rowshow(row) {
        debugger
        let mList = {actpoint: "look", params: row};
        if(row.status==''||row.status==null){
          this.$message.info("该项目月报还未完成上报,无法查看");
          return false;
        }else{
          this.$router.push({
            path: "./jTMDetail/",
            query: {mList: this.$utils.encrypt(JSON.stringify(mList))},
          });
        }
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
        this.searchform.reportYear= this.searchform.yearDateS.split("-")[0];
        this.searchform.reportMonth= this.searchform.yearDateS.split("-")[1];
        this.$http
          .post(
            "/api/statistics/projectMonthlyReport/Projectreport/list/jtQueryEntInfo",
            this.searchform
          )
          .then((res) => {
          this.tableData = res.data.data;
      });
      },
    },
    created() {
      let that = this;
      that.getdatatime();
      this.getData();
      this.userdata=JSON.parse(sessionStorage.getItem('userdata'))
    },
  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
  .add-group .new-add-btn{
    border-radius: 0;
  }
  .search-form{
    display: inline-block;
    float: left;
  }
  .search-form >>>.el-form-item{
    margin-bottom: 0;
  }
  .search-form >>>.el-form-item__content,.search-form >>>.el-form-item__label{
    line-height: 30px;
  }
  .search-form{
    display: inline-block;
    float: left;
  }
  >>>.search-form .el-form-item__label{
    width:auto;
  }
  >>>.search-form .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  >>>.el-icon-date{
    line-height: 30px;
  }
</style>
