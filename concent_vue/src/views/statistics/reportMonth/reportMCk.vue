<!--工程月报-项目部月报-项目部月报查看-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
     <!-- <div style="float: left;">
        <el-form class="search-form" :inline="true" :model="searchform" @keyup.enter.native="init()">
          <el-form-item label="上报年月起:">
            <el-date-picker
              type="month"
              value-format="yyyy-MM"
              v-model="searchform.yearDateS"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="上报年月止:">
            <el-date-picker
              v-model="searchform.yearDatesEnd"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>-->
      <div style="float: right;">
        <el-button
          @click="searchformReset"
          type="info"
          plain
          style="color:black;background:none">
          重置
        </el-button>
        <el-button @click="searchformSubmit" type="primary" plain>查询</el-button>
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
          :min-width="200"
          align="center"
          label="项目简称"
          prop="projectOmit"
          show-overflow-tooltip

        >
          <template slot="header" slot-scope="scope">
            <span>项目简称</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.projectOmit" size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.projectOmit
            }}</template>

        </el-table-column>
        <el-table-column
          :min-width="200"
          align="center"
          label="项目名称"
          prop="projectName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目名称</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.projectName" size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.projectName
            }}</template>
        </el-table-column>
        <el-table-column
          :min-width="450"
          align="center"
          label="上报年月"
          prop="yearDateS"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>上报年月</span>
            <div class="block">
              <el-date-picker
                v-model="setTimes"
                class="list-search-picker"
                type="datetimerange"
                format="yyyy-MM"
                value-format="yyyy-MM"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.reportYear+"-"+scope.row.reportMonth
            }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="合同总额(万元)"
          prop="contractAmountTotal"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>合同总额(万元)</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.contractAmountTotal" size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.contractAmountTotal
            }}</template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="施工产值本月"
          prop="monthValue"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>施工产值本月</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.monthValue" size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">
            <div v-if="scope.row.monthValue==null">
              0
            </div>
            <div v-else>
              {{scope.row.monthValue}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="施工产值本年"
          prop="yearValue"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>施工产值本年</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.yearValue" size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">
            <div v-if="scope.row.yearValue==null">
              0
            </div>
            <div v-else>
              {{scope.row.yearValue}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="施工产值开累"
          prop="totalValue"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>施工产值开累</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.totalValue" size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">
            <div v-if="scope.row.totalValue==null">
              0
            </div>
            <div v-else>
              {{scope.row.totalValue}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="所属单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>所属单位</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.createOrgName" size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.createOrgName
            }}</template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="剩余工程合同额"
          prop="htquantity"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>剩余工程合同额</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.htquantity" size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.htquantity
            }}</template>
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
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <State ref="stateUpdate" :data="projectStatus" @resetState="getData"></State>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import State from '@/components/state'

  export default {
    name: 'proposal-list-look',
    components: {
      Tree, State
    },
    data() {
      return {
        userdata:{},
        setTimes:[],
        treeStatas: false,
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          current: 1,
          size: 20,
          createOrgCode: '',
          createOrgId: '',
          createOrgName: '',
          createOrgType: '',
          createTime: '',
          createUserId: '',
          createUserName: '',
          createOrgName:'',
          totalValue:'',
          yearValue:'',
          monthValue:'',
          contractAmountTotal:'',
          projectStatusName:'',
          projectName:'',
          projectOmit:'',
          projectId:'',
          projectreportuuid:'',
          htquantity:'',
          reportYear:'',
          reportMonth:'',
          yearDatesEnd:'',
          yearDateS:''
        },
        menus: [],
        multipleSelection: [],
        orgTree: []
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
      // 选中查看
      show() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info('请选择一条记录进行查看操作!')
          return false
        }
        let p = { actpoint: 'look', uuid: this.multipleSelection[0].uuid }
        this.$router.push({
          path: '',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
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
      getdatatime(){//默认显示今天
        var date = new Date();
        var y = date.getFullYear();
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var time=y + '-' + m;
        this.searchform.yearDateS= time;
      },
      searchformReset() {
        this.searchform = {
          current: 1,
          size: 20,
          createOrgCode: '',
          createOrgId: '',
          createOrgName: '',
          createOrgType: '',
          createUserId: '',
          createUserName: '',
          createOrgName:'',
          totalValue:'',
          yearValue:'',
          monthValue:'',
          contractAmountTotal:'',
          projectStatusName:'',
          projectName:'',
          projectOmit:'',
          htquantity:'',
          yearDatesEnd:'',
          yearDateS:''
        }
        var date = new Date();
        var y = date.getFullYear();
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var time=y + '-' + m;
        this.searchform.yearDateS=time
        this.getData()
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 获取分页数据
      getData() {
        if(this.setTimes.length>0){
          this.searchform.yearDateS=this.setTimes[0];
          this.searchform.yearDatesEnd=this.setTimes[1];
        }
        this.searchform.reportYear=this.searchform.yearDateS.split("-")[0];
        this.searchform.reportMonth=this.searchform.yearDateS.split("-")[1];
        this.$http
            .post('/api/statistics/projectMonthlyReport/Projectreport/list/reportMQuery', this.searchform)
            .then(res => {
              this.page = res.data.data
            })
      },
      rowShow(row){
        let p = { actpoint: 'look', projectId: row.projectId,uuid:row.projectreportuuid,reportYear:row.reportYear,reportMonth:row.reportMonth,orgCode:row.createOrgCode,projectName:row.projectName,projectStatus:row.status,isCk:'1' }
        this.$router.push({
          path: './reportMDetail/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })

      }
    },

    created() {
      let that = this;
      that.getdatatime();
      this.getData();
      console.log(JSON.parse(sessionStorage.getItem('userdata')))
      this.userdata=JSON.parse(sessionStorage.getItem('userdata'))
    },

  }
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
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
  .list-search-picker >>>.el-input__icon {
    line-height: 28px;
    height: 28px;
  }
  .list-search-picker >>>.el-range-separator{
    line-height: 23px!important;
  }
</style>
