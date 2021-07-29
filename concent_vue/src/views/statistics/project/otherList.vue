<!--其他项目-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" type="primary" plain><i class="el-icon-plus"></i>新增</el-button>
        <el-button @click="edit" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="del" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
        <el-button @click="editState" type="primary" plain><i class="el-icon-document-copy"></i>批量修改项目状态</el-button>
        <el-button @click="batchSub" type="primary" plain><i class="el-icon-plus"></i>批量提交</el-button>
      </el-button-group>
      <div style="float: right;">
        <el-button
          @click="searchformReset"
          type="info"
          plain
          style="color:black;background:none">
          <i class="el-icon-refresh-right"></i>重置
        </el-button>
        <el-button @click="searchformSubmit" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
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
          :min-width="200"
          align="center"
          label="项目编码"
          prop="projectCode"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目编码</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.projectCode" size="mini"/>
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
          label="合同金额(万元)"
          prop="contractMoney"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>签约总金额(万元)</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.contractMoney" size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="我方份额(万元)"
          prop="amountWe"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>我方份额(万元)</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.amountWe" size="mini"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
              <span> {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'审核通过':scope.row.flowStatus==4?'审核退回':''}}</span>
          </template>
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-select
                filterable
                clearable
                size="mini"
                placeholder="请选择"
                v-model="searchform.flowStatus">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectStatusType"/>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--:width="150"-->
          <!--align="center"-->
          <!--label="推送人"-->
          <!--prop="projectPusher"-->
          <!--show-overflow-tooltip-->
        <!--&gt;-->
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>推送人</span>-->
            <!--<div>-->
              <!--<el-input style=" width: 100%" v-model="searchform.projectPusher" size="mini"/>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--:width="150"-->
          <!--align="center"-->
          <!--label="推送人联系方式"-->
          <!--prop="projectPusherPhone"-->
          <!--show-overflow-tooltip-->
        <!--&gt;-->
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>推送人联系方式</span>-->
            <!--<div>-->
              <!--<el-input style=" width: 100%" v-model="searchform.projectPusherPhone" size="mini"/>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
        treeStatas: false,
        projectTypeTwo: [], // 工程类别(二级)
        projectNatureTwo: [], // 项目性质(二级)
        projectStatusType:[{ id: 1, detailName: '草稿' }, { id: 2, detailName: '审核中' }, { id: 3, detailName: '审核通过' }, { id: 4, detailName: '审核退回' }],
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          current: 1,
          size: 20,
          companyBelongName: '',
          amountWe: '',
          projectPusher: '',
          projectPusherPhone: '',
          projectModuleId: '510ba0d79593419493eb1a11ed3e7df4', // 其他
          projectName: '',
          contractMoney: '',
          flowStatus: '',
          projectStatusId: ''
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
      //批量提交
      batchSub(){
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行提交操作！");
          return false;
        }
        var list=[],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.flowStatus==1||item.flowStatus==4){
            var v={
              businessId:item.uuid,
              businessName:item.projectName,
              businessType:'project_project_new'
            }
            list.push(v);
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
                "/api/statistics/StatisticsProject/commonProcess/start",
                JSON.stringify(list),
                {useJson: true}

              )
              .then((res) => {
                if(res.data.code==200){
                  this.$message({
                    message: "操作成功",
                    type: "success",
                  });
                  this.getData()
                }else{
                  this.$message.error(res.data.msg);
                }

              });
          }).catch(() => {})
        }
      },
      // 批量修改项目状态
      editState() {
        if (this.multipleSelection.length < 1) {
          this.$message.info('请选择至少一条记录进行修改操作！')
          return false
        }
        if(this.multipleSelection[0].flowStatus == '2' || this.multipleSelection[0].flowStatus == '3'){
          this.$message.info('不可修改审核中或者审核通过的项目状态！')
          return false
        }
        let uuids = []
        this.multipleSelection.forEach((item) => {
          uuids.push(item.uuid)
        })
        const _this = this.$refs.stateUpdate
        _this.dialog = true
        _this.ids = uuids
        _this.newStatusId = ''
        _this.newStatusName = ''
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
          path: './otherAdd/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 删除
      del() {
        if (this.multipleSelection.length < 1) {
          this.$message.info('请选择一条记录进行删除操作！')
          return false
        }
        if(this.multipleSelection[0].flowStatus == '2' || this.multipleSelection[0].flowStatus == '3'){
          this.$message.info('不可删除审核中或者审核通过的数据！')
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
        if(this.multipleSelection[0].flowStatus == '2' || this.multipleSelection[0].flowStatus == '3'){
          this.$message.info('不可修改审核中或者审核通过的数据！')
          return false
        }
        let p = { actpoint: 'edit', uuid: this.multipleSelection[0].uuid }
        this.$router.push({
          path: './otherAdd/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 查看
      rowShow(row) {
        let p = { actpoint: 'look', uuid: row.uuid }
        this.$router.push({
          path: './otherAdd/',
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
          path: './otherAdd/',
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
          companyBelongName: '',
          amountWe: '',
          projectPusher: '',
          projectPusherPhone: '',
          projectModuleId: '510ba0d79593419493eb1a11ed3e7df4', // 其他
          projectName: '',
          contractMoney: '',
          flowStatus: '',
          projectStatusId: ''
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
