<!--总设计量-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-popover v-if="isPrompt"
        placement="top"
        trigger="hover">
        <span style="font-size: 12px;">双击列表行操作更方便。<label @click="doNotPopover" style="color:#67c23a;cursor:pointer;">不再提示</label></span>
        <el-button slot="reference" style="float: left;margin-right: 5px" icon="el-icon-edit" @click="edit" type="primary" plain>编制总设计量</el-button>
      </el-popover>
      <el-button v-else style="float: left;margin-right: 5px" icon="el-icon-edit" @click="edit" type="primary" plain>编制总设计量</el-button>
      <el-button-group style="float: left">
        <!-- <el-button icon="el-icon-circle-plus-outline" @click="add" type="primary" plain>新增</el-button>
        <el-button icon="el-icon-edit" @click="edit" type="primary" plain>修改</el-button> -->
        <el-button icon="el-icon-delete" @click="del" type="primary" plain>删除编制</el-button>
        <el-button icon="el-icon-refresh" @click="searchformSubmit" type="primary" plain>刷新</el-button>
      </el-button-group>
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
        style="width: 100%;"
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
          align="left"
          label="项目简称"
          prop="projectOmit"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :min-width="200"
          align="left"
          label="项目名称"
          prop="projectName"
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
            <span v-else>未编制</span>
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
    name: 'plan-all',
    components: {
    },
    data() {
      return {
        status: [{ id: 0, detailName: '已提交' }, { id: 1, detailName: '未提交' }],
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          current: 1,
          size: 20,
          // projectId: '73b70e18b192214bb5e4d4626c5e7ed9', //
          planType: '3'
        },
        proNameHover: false,
        projectName: '请选择项目',
        multipleSelection: [],
        isPrompt: true
      }
    },
    computed: {
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 新增
      add() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info('请选择一个项目进行新增操作！')
          return false
        }
        let p = {actpoint: 'add', planInfo: {planId: this.multipleSelection[0].uuid, projectName: this.multipleSelection[0].projectName, planType: 3, planTypeName: '开累计划'}}
        this.$router.push({
          path: './proTjxDetail/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
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
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  duration: 1000,
                  type: 'success',
                  onClose: () => { this.getData() }
                })
              }
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
        let projectName = this.multipleSelection[0].status
        let projecttypeCode = this.multipleSelection[0].projecttypeCode
        let projectId = this.multipleSelection[0].projectId
        if (planId == null || planId === '') {
          status = '0'
        }
        let p = {actpoint: 'edit', planInfo: {planId: planId, projectName: projectName, planTypeName: '开累计划', projectStatus: status, planProjectTjx: {projectId: projectId, projecttypeCode: projecttypeCode, planType: 3}}}
        this.$router.push({
          path: './proTjxDetail/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 双击事件
      rowEdit(row) {
        let status = row.status
        if (row.uuid == null || row.uuid === '' || status !== '1') {
          status = '0'
        }
        let p = {actpoint: 'edit', planInfo: {planId: row.uuid, projectName: row.projectName, planTypeName: '开累计划', projectStatus: status, planProjectTjx: {projectId: row.projectId, projecttypeCode: row.projecttypeCode, planType: 3}}}
        this.$router.push({
          path: './proTjxDetail/',
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
      // 获取分页数据
      getData() {
        this.$http
          .post('/api/statistics/PlanProjectTjx/list/loadPageData', this.searchform)
          .then(res => {
            this.page = res.data.data
          })
      },
      // 不再提示
      doNotPopover() {
        this.isPrompt = false
        localStorage.setItem('isPrompt', false)
      }
    },
    created() {
      this.getData()
      let promptVal = localStorage.getItem('isPrompt')
      if (promptVal != null && promptVal !== '') {
        if (promptVal === 'true') {
          this.isPrompt = true
        } else {
          this.isPrompt = false
        }
      }
    },
    mounted() {
    }
  }
</script>
<style scoped>
  .pro_name {
    color:#000;
  }
  .pro_name_hover{
    color: #fd9b08!important;
    font-weight: bold;
  }
</style>
