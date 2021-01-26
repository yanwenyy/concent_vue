<!--物资贸易项目列表-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" type="primary" plain>新增</el-button>
        <el-button @click="edit" type="primary" plain>修改</el-button>
        <el-button @click="searchformReset" type="primary" plain>刷新</el-button>
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
          :width="150"
          align="center"
          label="项目板块"
          prop="projectModuleName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目板块</span>
            <div>
              <el-select
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.projectModuleId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectPlate"/>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="200"
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
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程类别(一级)"
          prop="projectTypeFirst"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>工程类别(一级)</span>
            <div>
              <el-select
                clearable
                filterable
                placeholder="请选择"
                @change="getProjectTwo"
                size="mini"
                v-model="searchform.projectTypeFirstId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectDomainType"/>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程类别(二级)"
          prop="projectTypeSecond"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>工程类别(二级)</span>
            <el-select
              clearable
              filterable
              placeholder="请先选择一级类别"
              size="mini"
              :disabled="!searchform.projectTypeFirstId"
              v-model="searchform.projectTypeSecondId">
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in projectTypeTwo"/>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="项目所在地区"
          prop="projectLocation"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目所在地区</span>
            <div>
              <el-input v-model="searchform.projectLocation" placeholder="项目所在地" size="mini" clearable>
                <el-button slot="append" icon="el-icon-search" size="mini" @click="selectPosition()"></el-button>
              </el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="160"
          align="center"
          label="创建时间"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>创建时间</span>
            <div>
              <el-date-picker
                v-model="searchform.createTime"
                type="date"
                size="mini"
                style=" width: 100%"
                value-format="timestamp"
                placeholder="选择日期时间"/>
            </div>
          </template>
          <template slot-scope="scope">
            <span> {{ scope.row.createTime | dateformat }} </span>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span> {{ scope.row.projectStatus=='0'?'已提交':'未提交'}} </span>
          </template>
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-select
                filterable
                clearable
                size="mini"
                placeholder="请选择"
                v-model="searchform.projectStatus">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectStatusType"/>
              </el-select>
            </div>
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
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <Change-Dialog v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></Change-Dialog>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import ChangeDialog from '@/components/changeDialog'

  export default {
    name: 'proposal-list-look',
    components: {
      Tree, ChangeDialog
    },
    data() {
      return {
        treeStatas: false,
        infoCSVisible: true,
        projectTypeTwo: [], // 工程类别(二级)
        projectNatureTwo: [], // 项目性质(二级)
        projectStatusType: [{ id: 0, detailName: '已提交' }, { id: 1, detailName: '未提交' }],
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          current: 1,
          size: 20,
          projectModuleId: '', // 项目板块
          companyBelongName: '', // 所属单位
          projectName: '', // 项目名称
          projectTypeFirstId: '', // 工程类别(一级)
          projectTypeSecondId: '', // 工程类别(二级)
          projectLocation: '', // 项目所在地
          createTime: '', // 创建时间
          projectStatus: '' // 状态
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
      projectPlate() {
        return this.$store.state.projectPlate
      }
    },
    methods: {
      getRoute(id) {
        var url = ''
        if (id === '7f4fcba4255b43a8babf15afd6c04a53') {
          url = './change/engineDetail/'
        } else if (id === 'f6823a41e9354b81a1512155a5565aeb') {
          url = './change/engineDetail/'
        } else if (id === '510ba0d79593418493eb1a11ea4e7af6') {
          url = './change/engineDetail/'
        } else if (id === '510ba0d79593418493eb1a11ea4e7af4') {
          url = './change/engineDetail/'
        } else if (id === '510ba0d79593418493eb1a11ed3e7df4') {
          url = './change/engineDetail/'
        } else if (id === '510ba0d79593418493eb1a11ea4e7df4') {
          url = './change/engineDetail/'
        } else if (id === '510ba0d79593418493eb1a11ed4e7df4') {
          url = './change/engineDetail/'
        } else if (id === '510ba0d79593419493eb1a11ed3e7df4') {
          url = './change/engineDetail/'
        }
        return url
      },
      goAddDetail(data) {
        console.log(data.projectModuleId, data)
        if (data.uuid) {
          let url = this.getRoute(data.projectModuleId)
          let p = { actpoint: 'add', uuid: data.uuid }
          this.$router.push({
            path: url,
            query: { p: this.$utils.encrypt(JSON.stringify(p)) }
          })
        }
      },
      selectPosition() {
        this.treeStatas = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
        })
      },
      // 获取项目地点的值
      getPositionTree(data) {
        this.treeStatas = false
        this.searchform.projectLocationName = data.fullDetailName
      },
      // 获取工程类别(二级)
      getProjectTwo(id) {
        this.searchform.projectTypeSecondId = ''
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
      // 新增
      add() {
        this.infoCSVisible = true
        this.$nextTick(() => {
          this.$refs.infoCS.init()
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
        let p = {
          actpoint: 'edit',
          afterId: this.multipleSelection[0].afterId,
          beforeId: this.multipleSelection[0].beforeId
        }
        this.$router.push({
          path: './changeAdd/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 查看
      rowShow(row) {
        let p = { actpoint: 'look', afterId: row.afterId, beforeId: row.beforeId }
        this.$router.push({
          path: './changeAdd/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val
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
          projectModuleId: '', // 项目板块
          companyBelongName: '', // 所属单位
          projectName: '', // 项目名称
          projectTypeFirstId: '', // 工程类别(一级)
          projectTypeSecondId: '', // 工程类别(二级)
          projectLocation: '', // 项目所在地
          createTime: '', // 创建时间
          projectStatus: '' // 状态
        }
        this.getData()
      },
      // 获取分页数据
      getData() {
        this.$http
          .post('/api/statistics/StatisticsProject/list/loadPageDataChangeRecord', this.searchform)
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
