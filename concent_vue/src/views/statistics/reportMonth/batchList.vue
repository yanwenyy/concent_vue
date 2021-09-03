<!--工程月报-项目部月报-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-form class="search-form" :inline="true" :model="searchform" @keyup.enter.native="init()">
        <el-form-item label="填报年月:">
          <el-date-picker
            v-model="searchform.fullDate"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目简称:">
          <el-input v-model="searchform.projectOmit" placeholder="项目简称" clearable></el-input>
        </el-form-item>
        <el-button
          @click="searchformReset"
          type="info"
          plain
          style="color:black;background:none">
          <i class="el-icon-refresh-right"></i>重置
        </el-button>
        <el-button @click="searchformSubmit" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        <el-button @click="remove" type="primary" plain><i class="el-icon-plus"></i>提交</el-button>
      </el-form>
    </div>

    <div style="margin-top: -10px">
      <el-table
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke'
        }"
        @row-dblclick="rowShow"
        @selection-change="handleSelectionChange"
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
          type="selection"
        ></el-table-column>
        <el-table-column label="projectId" align="center" prop="projectId" v-if="false" />
        <el-table-column label="projectreportuuid" align="center" prop="projectreportuuid" v-if="false" />
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          label="月报日期"
          prop="projectOmit"
        >
          <template slot-scope="scope">
            <span >{{scope.row.reportYear+"-"+scope.row.reportMonth}}</span>
          </template>
          </el-table-column>
           <el-table-column
            :min-width="200"
            align="center"
            label="填报单位"
            prop="projectName"
            show-overflow-tooltip
          >
            </el-table-column>
         <el-table-column
          :min-width="200"
          align="center"
          label="项目状态"
          prop="projectStatusName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="项目类型"
          prop="projectTypeName"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="审核状态"
          prop="flowStatus"
        >
          <template slot-scope="scope">
             {{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核退回':'待登记'}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[20, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 5px"
        v-if="page.total !== 0"
      ></el-pagination>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'proposal-list-look',
    components: {

    },
    data() {
      return {
        userdata:{},
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          current: 1,
          size: 20,
          fullDate:'',
          projectOmit:''
        },
        menus: [],
        multipleSelection: [],
      }
    },
    computed: {
      projectDomainType() {
        return this.$store.state.category.projectDomainType
      },
      projectNature() {
        return this.$store.state.category.projectNature
      },
      projectType() {
        return this.$store.state.projectType
      },
      projectStatus() {
        return this.$store.state.projectStatus
      }
    },
    methods: {
      // 批量提交
      remove() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择一条记录进行提交操作！");
          return false;
        }
        let uuids = [],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.flowStatus=='edit'||item.flowStatus=='reject'){
            var v={
              uuid:item.projectreportuuid,
              reportYear:item.reportYear,
              reportMonth:item.reportMonth,
              reportProjectName:item.projectName,
              projectId:item.projectId,
            };
            uuids.push(v);
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
                "/api/statistics/projectMonthlyReport/Projectreport/process/allCommit",JSON.stringify(uuids), {useJson: true}

              )
              .then((res) => {
                this.getData()
              });
          }).catch(() => {})
        }

      },
      handleSizeChange(val) {
        this.searchform.size = val
        this.getData()
      },
      handleCurrentChange(val) {
        this.searchform.current = val
        this.getData()
      },
      searchformSubmit() {
        this.searchform.current = 1
        this.getData()
      },
      searchformReset() {
        this.searchform = {
          fullDate:'',
          projectOmit:'',
          current: 1,
          size: 20,
        }
        this.getData()
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 获取分页数据
      getData() {

        this.searchform.flowStatus="edit";

        this.$http
          .post('/api/statistics/projectMonthlyReport/Projectreport/list/reportMQueryCommit', this.searchform)
          .then(res => {
            this.page = res.data.data
          })
      },
      rowShow(row){
        this.type = 'edit'
        let p = {projectId:JSON.parse(JSON.stringify(row)).projectId,uuid:JSON.parse(JSON.stringify(row)).projectreportuuid,
          yearDates:JSON.parse(JSON.stringify(row)).yearDates||(row.reportYear+"-"+row.reportMonth),orgCode:JSON.parse(JSON.stringify(row)).createOrgCode,
          projectStatus:JSON.parse(JSON.stringify(row)).status,projectName:row.reportProjectName
        }
        this.$router.push({
          path: './reportMDetail/',
          query: {p: this.$utils.encrypt(JSON.stringify(p))}
        })

      }
    },

    created() {
      //获取当前月份
      // var sj=new Date().toLocaleDateString().split('/');
      // sj[1]=sj[1]<10?'0'+sj[1]:sj[1];
      // this.searchform.fullDate=sj[0]+"-"+sj[1];

      var date = new Date();
      var y = date.getFullYear();
      var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      var time=y + '-' + m;
      // var time="2004-06";
      //this.searchform.reportYear= y;
      this.searchform.fullDate=time;
      this.getData()
       this.userdata=JSON.parse(sessionStorage.getItem('userdata'))
    },

  }
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
  .search-form >>>.el-form-item__label{
    width: auto!important;
  }
</style>
