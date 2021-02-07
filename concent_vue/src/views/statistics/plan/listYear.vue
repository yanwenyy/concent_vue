<!--年计划列表-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="edit" type="primary" plain>修改</el-button>
        <el-button @click="del" type="primary" plain>删除</el-button>
        <el-button @click="searchformSubmit" type="primary" plain>刷新</el-button>
        <el-button @click="back" type="primary" plain>返回</el-button>
      </el-button-group>
      <label style="margin-left: 10px;line-height: 32px;font-size: 15px;">项目名称：{{p.projectName}}</label>
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
        @row-dblclick="rowEdit"
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
          :min-width="200"
          align="center"
          label="项目名称"
          prop="projectName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :min-width="200"
          align="center"
          label="计划年份"
          prop="planYear"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程行业类别"
          prop="projectTypeSecond"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="160"
          align="center"
          label="填报时间"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.createTime | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status=='0'" style="color:#909399;">未提交</span>
            <span v-else-if="scope.row.status=='1'" style="color:#67c23a;">已提交</span>
            <span v-else>未填报</span>
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
    name: 'list-year',
    components: {
    },
    data() {
      return {
        treeStatas: false,
        projectTypeTwo: [], // 工程类别(二级)
        projectStatus: '',
        page: { current: 1, size: 20, total: 0, records: [] },
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        searchform: {
          current: 1,
          size: 20,
          projectId: '',
          planType: '2'
        },
        menus: [],
        multipleSelection: [],
        orgTree: []
      }
    },
    computed: {
    },
    methods: {
      // 删除
      del() {
        if (this.multipleSelection.length < 1) {
          this.$message.info('请选择一条记录进行删除操作！')
          return false
        }
        let uuids = []
        this.multipleSelection.forEach((item) => {
          uuids.push(item.uuid)
        })
        this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http
            .post(
              '/api/statistics/PlanProjectTjx/list/delete',
              { ids: uuids }
            )
            .then((res) => {
              this.getData()
            })
        }).catch(() => {
        })
      },
      // 修改
      edit() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info('请选择一条记录进行查看操作！')
          return false
        }
        let planId = this.multipleSelection[0].uuid
        let status = this.multipleSelection[0].status
        let projectName = this.multipleSelection[0].projectName
        let projecttypeCode = this.multipleSelection[0].projectTypeFirstId
        let projectId = this.multipleSelection[0].projectId
        let planYear = this.multipleSelection[0].planYear
        if (planId == null || planId === '') {
          status = '0'
        }
        let p = {actpoint: 'edit', planInfo: {planId: planId, projectName: projectName, planTypeName: '年计划', projectStatus: status, planProjectTjx: {projectId: projectId, planYear: planYear, planType: 2, projecttypeCode: projecttypeCode}}}
        this.$router.push({
          path: '../proTjxDetail/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 双击事件
      rowEdit(row) {
        let status = row.status
        if (row.uuid == null || row.uuid === '' || status !== '1') {
          status = '0'
        }
        let p = {actpoint: 'edit', planInfo: {planId: row.uuid, projectName: row.projectName, planTypeName: '年计划', projectStatus: status, planProjectTjx: {projectId: row.projectId, planYear: row.planYear, planType: 2, projecttypeCode: row.projectTypeFirstId}}}
        this.$router.push({
          path: '../proTjxDetail/',
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
      searchformReset() {
        this.searchform = {
          current: 1,
          size: 20,
          projectId: JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectId,
          planType: '2'
        }
        this.getData()
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 获取分页数据
      getData() {
        this.$http
          .post('/api/statistics/PlanProjectTjx/list/loadPageData', this.searchform)
          .then(res => {
            this.page = res.data.data
          })
      },
      // 返回上一页
      back() {
        this.$router.back()
      }
    },
    created() {
      this.searchform = {
        current: 1,
        size: 20,
        projectId: JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectId,
        planType: '2'
      }
      this.getData()
    },
    mounted() {
    }
  }
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
</style>
