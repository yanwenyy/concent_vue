<template>
  <div>
    <!-- 合并项目列表 -->
    <el-form
      class="queryForm"
      :inline="true"
      :model="searchform"
      @keyup.enter.native="getData()"
    >
      <el-form-item label="项目名称:">
        <el-input
          v-model="searchform.projectName"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="项目板块:">
        <el-select 
          clearable 
          v-model="searchform.projectModuleName" 
          placeholder="请选择">
          <el-option
            v-for="item in secondName"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工程类别:">
        <el-select
          clearable
          filterable
          placeholder="请选择"
          v-model="searchform.projectTypeFirst">
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.detailName"
            v-for="(item, index) in projectDomainType"/>
        </el-select>
      </el-form-item>
      <el-form-item label="录入单位:">
        <el-input
          v-model="searchform.companyBelongName"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="建设单位:">
        <el-input
          v-model="searchform.companyBuild"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="截止日期:">
        <el-date-picker
          v-model="searchform.contractEndTime"
          type="date"
          style=" width: 100%"
          value-format="timestamp"
          placeholder="选择日期时间"/>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select
          filterable
          clearable
          placeholder="请选择"
          v-model="searchform.flowStatus">
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in flowStatus"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none">
          <i class="el-icon-refresh-right"></i>重置
        </el-button>
        <el-button @click="searchformSubmit" type="primary" plain>
          <i class="el-icon-search"></i>查询
        </el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 10px">
      <el-table
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
        tooltip-effect="dark"
        :max-height="$tableHeight"
        :height="$tableHeight"
      >
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          header-align="center"
          align="center"
          label="项目名称"
          :width="200"
        ></el-table-column>
        <el-table-column
          prop="mergeSign"
          header-align="center"
          align="center"
          label="项目类型"
          :width="100"
        >
          <template slot-scope="scope">
            <span> {{scope.row.mergeSign==5?'辅项目':scope.row.mergeSign==4?'主项目':scope.row.mergeSign==3?'合并项目':''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="projectModuleName"
          header-align="center"
          align="center"
          label="项目板块"
          :width="120"
        ></el-table-column>
        <el-table-column
          prop="projectTypeFirst"
          header-align="center"
          align="center"
          label="工程类别"
        ></el-table-column>
        <el-table-column
          prop="companyBelongName"
          header-align="center"
          align="center"
          label="录入单位"
        ></el-table-column>
        <el-table-column
          prop="companyBuild"
          header-align="center"
          align="center"
          label="建设单位"
        ></el-table-column>
        <el-table-column
          prop="contractEndTime"
          header-align="center"
          align="center"
          label="截止日期"
        ></el-table-column>
        <el-table-column
          prop="flowStatus"
          header-align="center"
          align="center"
          label="状态"
        >
          <template slot-scope="scope">
            <span> {{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核退回':''}}</span>
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
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      secondName:[  // 项目名称筛选的值
        {
          value: '工程承包',
          label: '工程承包'
        },{
          value: '勘察设计咨询',
          label: '勘察设计咨询'
        },{
          value: '房地产开发',
          label: '房地产开发'
        },{
          value: '物资贸易',
          label: '物资贸易'
        },{
          value: '工业制造',
          label: '工业制造'
        },{
          value: '金融保险',
          label: '金融保险'
        },{
          value: '运营维管',
          label: '运营维管'
        },{
          value: '其他',
          label: '其他'
        }
      ],
      flowStatus: [
        { id: 'edit', detailName: '草稿' }, 
        { id: 'check', detailName: '审核中' }, 
        { id: 'pass', detailName: '审核通过' }, 
        { id: 'reject', detailName: '审核退回' }
      ],
      searchform: { // 请求参数
        current: 1,
        size: 20,
        projectName:"",
        projectModuleName:"",
        projectTypeFirst:"",
        companyBelongName:"",
        companyBuild:"",
        contractEndTime:"",
        flowStatus:""
      },
      page: { current: 1, size: 20, total: 0, records: [] }, // 列表数据
    };
  },
  computed: {
    projectDomainType() {
      return this.$store.state.category.projectDomainType
    },
  },
  watch: {},
  methods: {
    getData() { // 获取项目数据
      this.$http
      .post('/api/statistics/StatisticsProject/list/getProjectNoPass', this.searchform)
      .then(res => {
        this.page.records = res.data.data.merge.concat(res.data.data.merged)
        this.page.records.forEach((element) => {
          element.contractEndTime = this.dateTrans(element.contractEndTime)
        })
      })
    },
    mergePath(val) { // 选择路由
      switch (val) {
        case "工程承包":
          return "./engineAdd"
        case "勘察设计咨询":
          return "./designAdd"                                                                                                                                                                                                                                                                                                  
        case "房地产开发":
          return "./estateAdd"        
        case "物资贸易":
          return "./tradeAdd"
        case "工业制造":
          return "./manufactureAdd"
        case "金融保险":
          return "./financeAdd"
        case "运营维管":
          return "./maintenanceAdd"
        case "其他":
          return "./otherAdd"
        default:
          break;
      } 
    },
    dateTrans(date) { // 转换时间戳
      let _date = new Date(parseInt(date));
      let y = _date.getFullYear(); 
      let m = _date.getMonth() + 1; 
      m = m < 10 ? ('0' + m) : m;
      let d = _date.getDate(); 
      d = d < 10 ? ('0' + d) : d;
      let dates = y + '-' + m + '-' + d;
      if (date == '' || date == null) {
        return ''
      } else {
        return dates;
      }
    },
    rowShow(row) { // 查看
      let p = { actpoint: 'look', uuid: row.uuid } 
      this.$router.push({
        path: this.mergePath(row.projectModuleName),
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      })
    },   
    searchformReset(){  // 重置
      this.searchform = { // 请求参数
        projectName:"",
        projectModuleName:"",
        projectTypeFirst:"",
        companyBelongName:"",
        companyBuild:"",
        contractEndTime:"",
        flowStatus:""
      },
      this.getData()
    },
    searchformSubmit(){  // 查询
      this.getData()
    },
    handleSizeChange(val) { // 改变页数尺寸
      this.searchform.size = va
      this.getData()
    },
    handleCurrentChange(val) { // 改变页数
      this.searchform.current = val
      this.getData()
    },  
  },
  mounted() {
    this.$store.dispatch('getCategory', { name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e' })
    this.getData()
  },
  created() {},
}
</script>
<style lang="scss" scoped>
  .queryForm {
    margin-top: 10px;
  }
  .queryForm .el-input-group {
    margin-top: 5px;
    width: 230px;
  }
  /deep/ .queryForm .el-form-item__label {
    width: 75px;
  }
  .queryForm .el-form-item {
    margin-bottom: 3px !important;
  }
  .queryForm > .el-button {
    margin-top: 5px;
  }
</style>