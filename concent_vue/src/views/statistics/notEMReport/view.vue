<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-form class="search-form" :inline="true" :model="searchform" @keyup.enter.native="init()">
        <el-form-item label="填报年月:">
          <el-date-picker
            v-model="searchform.reportDate"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
      </div>
    </div>

    <div style="margin-top: 10px">
      <el-table
        default-expand-all
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
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>填报单位</span>-->
            <!--<div>-->
              <!--<el-input-->
                <!--class="list-search-picker"-->
                <!--style=" width: 100%"-->
                <!--v-model="searchform.createOrgName"-->
                <!--size="mini"-->
              <!--/>-->
            <!--</div>-->
          <!--</template>-->
          <!--<template slot-scope="scope">-->
            <!--<span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="年月"
          prop="reportDate"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="审核状态"
          prop="stauts"
          show-overflow-tooltip

        >
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>审核状态</span>-->
            <!--<div>-->
              <!--<el-select-->
                <!--class="list-search-picker"-->
                <!--clearable-->
                <!--filterable-->
                <!--placeholder="请选择"-->
                <!--size="mini"-->
                <!--v-model="searchform.stauts"-->
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
          <template slot-scope="scope">
            {{scope.row.stauts=='edit'?'草稿':scope.row.stauts=='check'?'审核中':scope.row.stauts=='pass'?'审核通过':scope.row.stauts=='reject'?'审核退回':scope.row.stauts==0?'未创建':''}}
          </template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
        >
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>创建时间</span>-->
            <!--<div>-->
              <!--<el-date-picker-->
                <!--class="list-search-picker"-->
                <!--filterable-->
                <!--clearable-->
                <!--type="date"-->
                <!--value-format="timestamp"-->
                <!--v-model="searchform.createTime"-->

              <!--&gt;-->
              <!--</el-date-picker>-->
            <!--</div>-->
          <!--</template>-->
          <template slot-scope="scope">{{
            scope.row.createTime | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="250"
          align="center"
          label="审核通过时间"
          prop="state"
          show-overflow-tooltip
        >
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>审核通过时间</span>-->
            <!--<div>-->
              <!--<el-date-picker-->
                <!--class="list-search-picker"-->
                <!--filterable-->
                <!--clearable-->
                <!--type="daterange"-->
                <!--range-separator="-"-->
                <!--start-placeholder="开始日期"-->
                <!--end-placeholder="结束日期"-->
                <!--value-format="timestamp"-->
                <!--v-model="prossDate"-->

              <!--&gt;-->
              <!--</el-date-picker>-->
            <!--</div>-->
          <!--</template>-->
          <template slot-scope="scope">{{
            scope.row.auditDate | dateformat
            }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    // inject:['reload'],
    name: "proposal-list-look",
    data() {
      return {
        Authorization:sessionStorage.getItem("token"),
        userdata:JSON.parse(sessionStorage.getItem('userdata')),
        page: {current: 1, size: 20, total: 0, records: []},
        tableData: [],
        showinput: false,
        sousuo: "",
        prossDate:'',
        searchform: {
          reportDate:'',
          createOrgName: "",
          stauts: "",
          createTime: "",
          auditStartDate: "",
          auditEndDate: "",
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
          },
          {
            detailName:"未创建",
            id:'0'
          }
        ]
      };
    },
    computed: {

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
          if(item.stauts=='edit'||item.stauts=='reject'){
            var v={
              businessId:item.uuid,
              businessName:'非工程月报——'+item.reportDate+item.createOrgName,
              businessType:'engineering_monthly_report_not'
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
                "/api/statistics/StatisticsProject/commonProcess/start",
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
      load(tree, treeNode, resolve) {
        setTimeout(() => {
          this.$http
          .post(
            "/api/statistics/unProjectReport/list/checkEntInfo",
            JSON.stringify(tree),
            {useJson: true}
          )
          .then((res) => {
            var datas=res.data.data.list
            resolve(datas)
          });

        }, 1000)
      },
      exportdata() {
      },
      search() {
        this.showinput = false;
      },
      // 查看
      rowshow(row) {
        console.log(row)
        if (row.stauts == "0") {
          this.$message.info("该公司月报还未完成上报 无法查看！");
          return false
        }
        let p = {'stauts':row.stauts,'gyType': this.userdata.managerOrgList[0].principalCode||'2',actpoint: "look", statId: row.uuid,reportDate: row.reportDate,stauts:row.stauts,createOrgCode:row.createOrgCode };
        this.$router.push({
          path: "./detailView/",
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
          // uuids.push(item.uuid);
          if(item.stauts=='edit'||item.stauts=='reject'){
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
              "/api/statistics/unProjectReport/list/delete",{ids: uuids}

            )
            .then((res) => {
            if (res.data && res.data.code == 200) {
            this.getData()
            } else {
              this.$message.error(data.message)
            }

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
        if(this.searchform.importFileRecordName!=''){
          if(this.searchform.importFileRecordName=='是'){
            this.searchform.importFileRecordId='1';
          }else if(this.searchform.importFileRecordName=='否'){
            this.searchform.importFileRecordId='0';
          }
        }
        if(this.prossDate){
          this.searchform.auditStartDate=this.prossDate[0];
          this.searchform.auditEndDate=this.prossDate[0];
        }
        this.$http
          .post(
            "/api/statistics/unProjectReport/list/loadPageData",
            this.searchform
          )
          .then((res) => {
          this.tableData = res.data.data;
      });
      },
    },
    created() {
      //获取当前月份
      var sj=new Date().toLocaleDateString().split('/');
      sj[1]=sj[1]<10?'0'+sj[1]:sj[1];
      this.searchform.reportDate=sj[0]+"-"+sj[1];
      this.getData();
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
