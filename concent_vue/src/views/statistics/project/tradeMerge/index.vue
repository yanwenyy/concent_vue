<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <!-- 按钮 -->
      <el-button-group style="float: left">
        <el-button @click="addMain" type="primary" plain><i class="el-icon-plus"></i>选择主项目</el-button>
        <el-button @click="addSecond" type="primary" plain><i class="el-icon-plus"></i>选择辅项目</el-button>
        <el-button @click="merge" type="primary" plain><i class="el-icon-edit"></i>合并</el-button>
        <el-button @click="change" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="dele" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
      </el-button-group>
      <div style="float: right;">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none">
          <i class="el-icon-refresh-right"></i>重置
        </el-button>
        <el-button @click="searchformSubmit" type="primary" plain>
          <i class="el-icon-search"></i>查询
        </el-button>
      </div>
    </div>
    <!-- 主项目列表 -->
    <el-dialog :visible.sync="showMain" :append-to-body="true">
      <div>
        <el-table
          :max-height="$dialogTableHeight"
          :height="$dialogTableHeight"
          :data="pageMain.records"
          border
          highlight-current-row
          @selection-change="mainSelectionChange"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': 'whitesmoke'
          }"
          style="width: 100%;"
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
            prop="projectName"
            header-align="center"
            align="center"
            label="项目名称"
            :width="200"
          ></el-table-column>
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
          <!-- <el-table-column
            prop="companyBuild"
            header-align="center"
            align="center"
            label="公告类型"
          ></el-table-column> -->
          <el-table-column
            prop="contractEndTime"
            header-align="center"
            align="center"
            label="截止日期"
          ></el-table-column>
          <el-table-column
            prop="flow_status"
            header-align="center"
            align="center"
            label="状态"
          ></el-table-column>
        </el-table>
        <el-pagination
          @size-change="mainSizeChange"
          @current-change="mainCurrentChange"
          :current-page="pageMain.current"
          :page-size="pageMain.size"
          :page-sizes="[20, 50, 100]"
          :total="pageMain.total"
          layout="total, sizes, prev, pager, next, jumper"
          style="margin-top: 5px"
        >
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showMain = false">取消</el-button>
        <el-button type="primary" @click="subMain()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 辅项目列表 -->
    <el-dialog :visible.sync="showSecond" :append-to-body="true">
      <div>
        <el-form
          class="queryForm"
          style="margin-top: -40px;"
          :inline="true"
          :model="secondList"
          @keyup.enter.native="getSecondData()"
        >
          <el-form-item label="项目板块:">
            <el-select v-model="secondList.projectModuleName" placeholder="请选择">
              <el-option
                v-for="item in secondName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="getSecondData()" type="primary" plain>
              <i class="el-icon-search"></i>查询
            </el-button>
          </el-form-item>          
        </el-form>
        <el-table
          :max-height="$dialogTableHeight"
          :height="$dialogTableHeight"
          :data="pageSecond.records"
          border
          highlight-current-row
          @selection-change="secondSelectionChange"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': 'whitesmoke'
          }"
          style="width: 100%;"
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
            prop="projectName"
            header-align="center"
            align="center"
            label="项目名称"
            :width="200"
          ></el-table-column>
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
          <!-- <el-table-column
            prop="companyBuild"
            header-align="center"
            align="center"
            label="公告类型"
          ></el-table-column> -->
          <el-table-column
            prop="contractEndTime"
            header-align="center"
            align="center"
            label="截止日期"
          ></el-table-column>
          <el-table-column
            prop="flow_status"
            header-align="center"
            align="center"
            label="状态"
          ></el-table-column>
        </el-table>
        <el-pagination
          @size-change="secondSizeChange"
          @current-change="secondCurrentChange"
          :current-page="pageSecond.current"
          :page-size="pageSecond.size"
          :page-sizes="[20, 50, 100]"
          :total="pageSecond.total"
          layout="total, sizes, prev, pager, next, jumper"
          style="margin-top: 5px"
        >
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSecond = false">取消</el-button>
        <el-button type="primary" @click="subSecond()">确定</el-button>
      </div>
    </el-dialog>
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
        <!-- <el-table-column
          prop="companyBuild"
          header-align="center"
          align="center"
          label="公告类型"
        ></el-table-column> -->
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
      <!-- <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[20, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 5px"
      ></el-pagination> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      // 主项目 ************************************************
      showMain:false,
      mainList: { // 请求参数
        current: 1,
        size: 20,
      },
      pageMain: { current: 1, size: 20, total: 0, records: [] }, // 列表数据
      mainSelection:[], // 列表多选的数据
      // 辅项目 ************************************************
      showSecond:false,
      secondList: { // 请求参数
        current: 1,
        size: 20,
        projectModuleName:"工程承包"
      },
      pageSecond: { current: 1, size: 20, total: 0, records: [] }, // 列表数据
      secondSelection:[], // 列表多选的数据
      findSecond:[], // 根据这个主项目查询辅项目
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
      // 合并项目列表 ************************************************
      flowStatus: [
        { id: 'edit', detailName: '草稿' }, 
        { id: 'check', detailName: '审核中' }, 
        { id: 'pass', detailName: '审核通过' }, 
        { id: 'reject', detailName: '审核退回' }
      ],
      searchform: { // 请求参数
        // current: 1,
        // size: 20,
        projectName:"",
        projectModuleName:"",
        projectTypeFirst:"",
        companyBelongName:"",
        companyBuild:"",
        contractEndTime:"",
        flowStatus:""
      },
      page: { current: 1, size: 20, total: 0, records: [] }, // 列表数据
      multipleSelection:[], // 列表多选的数据
      mainProject:{},  // 主项目
      draftProject:[],  // 辅项目
    };
  },
  computed: {
    projectDomainType() {
      return this.$store.state.category.projectDomainType
    },
  },
  watch: {},
  methods: {
    // 主项目 ************************************************************************************************
    addMain() { // 显示主项目列表
      this.pageMain = []
      this.getMainData()
      this.showMain = true
    },
    mainSelectionChange (val) { // 列表选项数据
      this.mainSelection = val;
    },
    subMain() { // 确定添加
      if (this.mainSelection.length == 0 ) {
        this.showMain = false
        return false
      }
      if (this.mainSelection.length > 1 ) {
        this.$message({
          showClose: true,
          message: '请选择一个主项目！',
          type: 'warning'
        });
        return false
      }
      let isAdd = true
      if (isAdd) {
        this.$http.post('/api/statistics/StatisticsProject/list/projectUpdateMian',{uuid:this.mainSelection[0].uuid}).then(res => {
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: '主项目添加成功！',
              type: 'success'
            });
            this.getData()
            this.showMain = false
          }
        })
      }
    },
    getMainData() { // 获取主项目数据
      this.$http.post('/api/statistics/StatisticsProject/list/getProjectList',this.mainList).then(res => {
        this.pageMain = res.data.data
      })
    },
    mainSizeChange(val) { // 改变页数尺寸
      this.mainList.size = val
      this.getMainData()
    },
    mainCurrentChange(val) { // 改变页数
      this.mainList.current = val
      this.getMainData()
    },
    // 辅项目 ************************************************************************************************
    addSecond() { // 显示辅项目列表
      this.pageSecond = []
      this.getSecondData()
      this.showSecond = true
    },
    secondSelectionChange (val) { // 列表选项数据
      this.secondSelection = val;
    },
    subSecond() { // 确定添加
      if (this.secondSelection.length == 0 ) {
        this.showSecond = false
        return false
      }
      let uuid = []
      this.secondSelection.forEach((element) => {
        uuid.push(element.uuid)
      })
      this.$http.post('/api/statistics/StatisticsProject/list/projectUpdateDraft',
        uuid,
        { useJson: true }
      ).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: '辅项目添加成功！',
            type: 'success'
          });
          this.getData()
          this.showSecond = false
        }
      })
    },
    getSecondData() { // 获取辅项目数据
      this.$http.post('/api/statistics/StatisticsProject/list/getProjectEdit',this.secondList).then(res => {
        this.pageSecond = res.data.data
      })
    },
    secondSizeChange(val) { // 改变页数尺寸
      this.secondList.size = val
      this.getSecondData()
    },
    secondCurrentChange(val) { // 改变页数
      this.secondList.current = val
      this.getSecondData()
    },
    // 合并项目 ************************************************************************************************
    merge(){ // 合并
      // 判断 是否含有主项目和辅项目 以及 主项目只有一个
      let isMain = true
      let isSecond = true
      let mainNum = 0
      this.mainProject = {}
      this.draftProject = []
      this.multipleSelection.forEach((element) => { 
        if (element.mergeSign == '4') {
          isMain = false
          mainNum += 1
          this.mainProject = element
        }
        if (element.mergeSign == '5') {
          isSecond = false
          this.draftProject.push(element)
        }
      })
      if (isMain || mainNum > 1) {
        this.$message({
          showClose: true,
          message: '请选择一个主项目！',
          type: 'warning'
        });         
        return false
      }
      if (isSecond) {
        this.$message({
          showClose: true,
          message: '请选择辅项目！',
          type: 'warning'
        });
        return false
      }
      // 判断 主项目 辅项目 是否类型一样
      let isSame = false
      for (var i = 0; i < this.multipleSelection.length-1; i++) {
        if (this.multipleSelection[i].projectModuleName !== this.multipleSelection[i+1].projectModuleName) {
          isSame = true
        }
      }
      if (isSame) {
        this.$message({
          showClose: true,
          message: '项目板块不同！',
          type: 'warning'
        });
        return false
      }
      // 是否有合并项目
      let haveMerge = false
      this.multipleSelection.forEach((element) => { 
        if (element.mergeSign !== '4' && element.mergeSign !== '5') {
          haveMerge = true
        }
      })
      if (haveMerge) {
        this.$message({
          showClose: true,
          message: '合并项目不可操作！',
          type: 'warning'
        });
        return false
      }
      this.$http
        .post('/api/statistics/StatisticsProject/list/getProjectMerge', 
          { 'mainProject': this.mainProject ,'draftProject': this.draftProject },
          { useJson: true }
        ).then(res => {
          let p = { actpoint: 'edit', ismerge: true, dataInfor: res.data.data.mainProject, mergeUuid:res.data.data.uuid}
          this.$router.push({
            path: this.mergePath(res.data.data.mainProject.projectModuleName),
            query: { p: this.$utils.encrypt(JSON.stringify(p)) }
          })
        })      
    },
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
      console.info(row)
    },   
    handleSelectionChange(val) { // 列表选项数据
      this.multipleSelection = val;
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
    change() { // 修改
      if (this.multipleSelection.length !== 1) {
        this.$message.info('请选择一条记录进行查看操作！')
        return false
      }
      if(this.multipleSelection[0].flowStatus=='check'||this.multipleSelection[0].flowStatus=='pass'){
        this.$message.info("不能修改正在审核中或审核通过的数据！");
        return false;
      }
      if(this.multipleSelection[0].mergeSign == 4 || this.multipleSelection[0].mergeSign == 5){
        this.$message.info("只可以修改合并项目数据！");
        return false;
      }
      let p = { actpoint: 'edit', uuid: this.multipleSelection[0].uuid  ,contractNumber: this.multipleSelection[0].contractNumber }
      this.$router.push({
        path: this.mergePath(this.multipleSelection[0].projectModuleName),
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      })
    },
    dele() { // 删除
      if (this.multipleSelection.length !== 1) {
        this.$message({
          message: '请选择一个项目！',
          type: 'warning',
          showClose: true
        });
        return false
      }
      this.$http.post('/api/statistics/StatisticsProject/list/deleteProjectMerge', {uuid:this.multipleSelection[0].uuid}).then(res => {
        if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: '删除成功！',
              type: 'success'
            });
            this.getData()
          }
      })
    }
    // handleSizeChange(val) { // 改变页数尺寸
    //   this.searchform.size = va
    //   this.getData()
    // },
    // handleCurrentChange(val) { // 改变页数
    //   this.searchform.current = val
    //   this.getData()
    // },  
  },
  mounted() {
    this.$store.dispatch('getCategory', { name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e' })
    this.getData()
  },
  created() {},
}
</script>
<style lang="scss" scoped>
  /deep/ .el-dialog {
      max-height: 85vh !important;
      margin: 0 auto 30px;
      width: 95% !important;
      margin-top: 9vh !important;
  }
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