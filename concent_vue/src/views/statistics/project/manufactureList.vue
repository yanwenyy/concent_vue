<!--工业制造项目列表-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" type="primary" plain>新增</el-button>
        <el-button @click="edit" type="primary" plain>修改</el-button>
        <el-button @click="del" type="primary" plain>删除</el-button>
        <!--<el-button @click="show" type="primary" plain>查看详细设置</el-button>-->
      </el-button-group>
      <div style="float: right;">
        <el-button
          @click="searchformReset"
          type="info"
          plain
          style="color:black;background:none">
          重置
        </el-button>
        <el-button @click="searchformSubmit" type="primary" plain>查询</el-button>
        <!--<el-button @click="exportdata" type="primary" plain>导出</el-button>-->
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
        stripe
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
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="合同号"
          prop="contractNumber"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>合同号</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.contractNumber" size="mini"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="所属单位"
          prop="companyBelongName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>所属单位</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.companyBelongName" size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="项目状态"
          prop="projectStatusName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目状态</span>
            <div>
              <el-select
                filterable
                clearable
                size="mini"
                placeholder="请选择"
                v-model="searchform.projectStatusId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectStatus"/>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="客户名称"
          prop="customerName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>客户名称</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.customerName" size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="合同金额(万元)"
          prop="contractMoney"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>合同金额(万元)</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.contractMoney" size="mini"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="推送人"
          prop="projectPusher"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>推送人</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.projectPusher" size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="推送人联系方式"
          prop="projectPusherPhone"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>推送人联系方式</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.projectPusherPhone" size="mini"/>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[10, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 5px"
        v-if="page.total !== 0"
      ></el-pagination>
    </div>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'

  export default {
    name: 'proposal-list-look',
    components: {
      Tree
    },
    data() {
      return {
        treeStatas: false,
        projectTypeTwo: [], // 工程类别(二级)
        projectNatureTwo: [], // 项目性质(二级)
        yesOrNo: [{ id: 0, detailName: '是' }, { id: 1, detailName: '否' }],
        sousuo: '',
        page: { current: 1, size: 10, total: 0, records: [] },
        searchform: {
          current: 1,
          size: 10,
          projectModuleId: '510ba0d79593418493eb1a11ed3e7df4', // 工业制造
          projectName: '', // 项目名称
          contractNumber: '', // 合同号
          companyBelongName: '', // 所属单位
          contractMoney: '', // 合同金额
          customerName: '', // 客户名称
          projectStatusId: '',
          projectPusher: '',
          projectPusherPhone: ''
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
      selectPosition() {
        this.treeStatas = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
        })
      },
      // 获取项目地点的值
      getPositionTree(data) {
        this.treeStatas = false
        // this.searchform.placeId = data.id
        this.searchform.projectLocationName = data.fullDetailName
      },
      getProjectTwo(id) {
        this.searchform.projectTypeSecond = ''
        this.projectTypeTwo = []
        if (id !== '') {
          this.projectDomainType.find(
            (item) => {
              if (item.id === id) {
                this.projectTypeTwo = item.children
              }
            }
          )
        }
      },
      getTwoXZ(id) {
        this.searchform.projectNatureSecondId = ''
        this.projectNatureTwo = []
        if (id !== '') {
          this.projectNature.find(
            (item) => {
              if (item.id === id) {
                this.projectNatureTwo = item.children
              }
            }
          )
        }
      },
      // 新增
      add() {
        let p = { actpoint: 'add' }
        this.$router.push({
          path: './manufactureAdd/',
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
              '/api/statistics/StatisticsProject/list/delete',
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
        let p = { actpoint: 'edit', uuid: this.multipleSelection[0].uuid }
        this.$router.push({
          path: './manufactureAdd/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 查看
      rowShow(row) {
        let p = { actpoint: 'look', uuid: row.uuid }
        this.$router.push({
          path: './manufactureAdd/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 选中查看
      show() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info('请选择一条记录进行查看操作!')
          return false
        }
        let p = { actpoint: 'look', uuid: this.multipleSelection[0].uuid }
        this.$router.push({
          path: './manufactureAdd/',
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
          size: 10,
          projectModuleId: '510ba0d79593418493eb1a11ed3e7df4', // 工业制造
          projectName: '', // 项目名称
          contractNumber: '', // 合同号
          companyBelongName: '', // 所属单位
          contractMoney: '',
          customerName: '',
          projectStatusId: '',
          projectPusher: '',
          projectPusherPhone: ''
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
          .post('/api/statistics/StatisticsProject/list/loadPageData', this.searchform)
          .then(res => {
            this.page = res.data.data
          })
      }
    },
    created() {
      this.getData()
    },
    mounted() {
      this.$store.dispatch('getConfig', {})
      this.$store.dispatch('getCategory', { name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3' })
      this.$store.dispatch('getCategory', { name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e' })
      this.$store.dispatch('getCategory', { name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72' })
    }
  }
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
</style>
