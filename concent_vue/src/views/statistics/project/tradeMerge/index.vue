<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <!-- 按钮 -->
      <el-button-group style="float: left">
        <el-button @click="addMain" type="primary" plain><i class="el-icon-plus"></i>选择主项目</el-button>
        <el-button @click="addSecond" type="primary" plain><i class="el-icon-plus"></i>选择辅项目</el-button>
        <el-button @click="edit" type="primary" plain><i class="el-icon-edit"></i>合并</el-button>
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
            prop="companyBuild"
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
            prop="companyBuild"
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
          placeholder="项目名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="项目名称:">
        <el-input
          v-model="searchform.projectName"
          placeholder="项目名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="项目名称:">
        <el-input
          v-model="searchform.projectName"
          placeholder="项目名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="项目名称:">
        <el-input
          v-model="searchform.projectName"
          placeholder="项目名称"
          clearable
        ></el-input>
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
          prop="companyBuild"
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
        uuid: null,
        projectModuleName:""
      },
      pageSecond: { current: 1, size: 20, total: 0, records: [] }, // 列表数据
      secondSelection:[], // 列表多选的数据
      findSecond:[], // 根据这个主项目查询辅项目
      // 合并项目列表 ************************************************
      searchform: { // 请求参数
        // current: 1,
        // size: 20,
        projectName:"",

      },
      page: { current: 1, size: 20, total: 0, records: [] }, // 列表数据
      multipleSelection:[], // 列表多选的数据
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 主项目 ************************************************
    addMain() { // 显示主项目列表
      this.getMainData()
      this.showMain = true
    },
    mainSelectionChange (val) { // 列表选项数据
      this.mainSelection = val;
    },
    subMain() { // 确定添加
      if (this.mainSelection.length == 0 ) {
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
      this.page.records.forEach((element, index) => {
        if (element.sign == 0) {
          this.page.records[index] = this.mainSelection[0] // 替换主项目
          this.page.records.splice(index,this.page.records.length-1) // 删除所有辅项目
          isAdd = false
        }
      })
      if (isAdd) {
        this.page.records.push(this.mainSelection[0])
      }
      this.$message({
        showClose: true,
        message: '主项目添加成功！',
        type: 'success'
      });
      this.showMain = false
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
    // 辅项目 ************************************************
    addSecond() { // 显示辅项目列表
      let isAdd = true
      this.page.records.forEach((element, index) => {
        if (element.sign == 0) {
          isAdd = false
          this.findSecond = element
        }
      })
      if (isAdd) {
        this.$message({
          showClose: true,
          message: '请选择一个主项目！',
          type: 'warning'
        });        
        return false
      }
      this.getSecondData()
      this.showSecond = true
    },
    secondSelectionChange (val) { // 列表选项数据
      this.secondSelection = val;
    },
    subSecond() { // 确定添加
      if (this.secondSelection.length == 0 ) {
        return false
      }
      this.secondSelection.forEach((element) => {
        this.page.records.push(element)
      })
      this.$message({
        showClose: true,
        message: '辅项目添加成功！',
        type: 'success'
      });
      this.showSecond = false
    },
    getSecondData() { // 获取辅项目数据
      this.secondList.uuid = this.findSecond.uuid
      this.secondList.projectModuleName = this.findSecond.projectModuleName
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
    // 合并项目 ************************************************
    getData() { // 获取分页数据
      this.$http
        .post('/api/statistics/StatisticsProject/list/getProjectNoPass', this.searchform)
        .then(res => {
          this.page.records = res.data.data
        })
    },
    rowShow(row) { // 查看
      let p = { actpoint: "look", uuid: row.uuid };
      let url = this.getRoute(row.projectModuleId);
      if (!url) {
        this.$message({
          message: "该项目存在问题",
          type: "error"
        });
        return;
      }
      console.info(row)
      // this.$router.push({
      //   path: url,
      //   query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      // });
    },   
    // handleSizeChange(val) { // 改变页数尺寸
    //   this.searchform.size = val
    //   this.getData()
    // },
    // handleCurrentChange(val) { // 改变页数
    //   this.searchform.current = val
    //   this.getData()
    // },
    handleSelectionChange(val) { // 列表选项数据
      this.multipleSelection = val;
    },
    searchformReset(){  // 重置
      this.getData()
    },
    searchformSubmit(){  // 查询
      this.getData()
    },
  },
  mounted() {
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