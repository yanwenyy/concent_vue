<template>
  <el-dialog
    title="选择项目"
    :visible.sync="showDialog"
    width="80%"
    top="10vh"
    :before-close="handleClose"
   >
    <el-form :inline="true" :model="searchForm"  class="queryForm" label-width="70px"  >
      <el-row>
        <el-col span="7">
          <el-form-item label="项目名称">
            <el-input v-model="searchForm.projectName" placeholder="项目名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col span="7">
          <el-form-item label="项目状态">
            <el-select clearable v-model="searchForm.projectStatusId" placeholder="项目状态">
              <el-option label="在建" value="01"></el-option>
              <el-option label="未开工" value="02"></el-option>
              <el-option label="完成" value="03"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="10">
          <el-form-item>
            <el-button type="primary" @click="searchFormSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      class="tableStyle"
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
      height="250"
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
        :width="200"
        align="center"
        label="项目简称"
        prop="projectOmit"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        :width="150"
        align="center"
        label="工程行业类别"
        prop="projectTypeName"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        :min-width="200"
        align="center"
        label="项目名称"
        prop="projectName"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        :width="150"
        align="center"
        label="所属单位"
        prop="companyBelongName"
        show-overflow-tooltip
      >
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="toProjectName(true)">取 消</el-button>
      <el-button type="primary" @click="toProjectName(false)">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  export default {
    props: {
      showDialog: true
    },
    data() {
      return {
        searchForm: {
          current: 1,
          size: 20,
          projectName: '',
          projectStatusId: ''
        },
        page: { current: 1, size: 20, total: 0, records: [] },
        pName: '我是XX项目',
        multipleSelection: []
      }
    },
    mounted() {
    },
    methods: {
      rowShow(val) {
        this.multipleSelection = val
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleCurrentChange(val) {
        this.searchForm.current = val
        this.getData()
      },
      handleSizeChange(val) {
        this.searchForm.size = val
        this.getData()
      },
      searchFormSubmit() {
        this.searchForm.current = 1
        this.getData()
      },
      // 获取分页数据
      getData() {
        this.$http
          .post('/api/statistics/StatisticsProject/list/loadPageData', this.searchForm)
          .then(res => {
            this.page = res.data.data
          })
      },
      toProjectName(isHide) {
        if (isHide) {
          this.$emit('toShowDialog', false)
        } else {
          if (this.multipleSelection.length !== 1) {
            this.$message.info('请选择一条记录进行编辑操作！')
            return false
          }
          this.pName = this.multipleSelection[0].projectName
          this.$emit('toCheckProjectName', this.pName)
        }
      },
      handleClose(done) {
        done()
        this.toProjectName(true)
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
  /deep/ .el-dialog {
    height: 80vh;
    overflow: auto;
  }
  .el-dialog__body{
    padding: 20px 20px;
  }
  /deep/ .el-table {
    height: 50vh !important;
    min-height: 50vh !important;
    overflow: auto;
  }
  /deep/ .dialog-footer{
    padding-top: 12px !important;
    padding-bottom: 0px !important;
  }
</style>
