<!--工程承包项目-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" type="primary" plain><i class="el-icon-plus"></i>新增</el-button>
        <el-button @click="edit" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="del" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
        <el-button @click="batchSub" type="primary" plain><i class="el-icon-plus"></i>批量提交</el-button>
        <!--<el-button @click="show" type="primary" plain>查看详细设置</el-button>-->
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
          :width="200"
          align="center"
          label="项目简称"
          prop="projectOmit"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目简称</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.projectOmit"  />
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
              <el-input style=" width: 100%" v-model="searchform.projectName"  />
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
              <el-input style=" width: 100%" v-model="searchform.projectCode"  />
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

              :disabled="searchform.projectTypeFirstId==''"
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
          :width="150"
          align="center"
          label="工程合同额(万元)"
          prop="contractAmountEngine"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>工程合同额(万元)</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.contractAmountEngine"  />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="承建单位"
          prop="companyBuiltName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>承建单位</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.companyBuiltName"  />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="项目性质(一级)"
          prop="projectNatureFirst"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目性质(一级)</span>
            <div>
              <el-select
                clearable
                filterable
                placeholder="请选择"
                @change="getTwoXZ"

                v-model="searchform.projectNatureFirstId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectNature"/>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="项目性质(二级)"
          prop="projectNatureSecond"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目性质(二级)</span>
            <div>
              <el-select
                :disabled="searchform.projectNatureFirstId==''"
                clearable
                filterable
                placeholder="请先选择一级类别"

                v-model="searchform.projectNatureSecondId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectNatureTwo"/>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="项目类型"
          prop="projectTypeName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目类型</span>
            <div>
              <el-select
                filterable
                clearable
                placeholder="请选择"

                v-model="searchform.projectTypeId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectType"/>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="120"
          align="center"
          label="是否联合体"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>是否联合体</span>
            <div>
              <el-select
                placeholder="请选择"

                v-model="searchform.isConsortion">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in yesOrNo"/>
              </el-select>
            </div>
          </template>
          <template slot-scope="scope">
            <span> {{ scope.row.isConsortion == 1?'是':'否' }} </span>
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
              <el-input style=" width: 100%" v-model="searchform.contractNumber"  />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="项目所在地"
          prop="projectLocation"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目所在地</span>
            <div>
              <el-input v-model="searchform.projectLocation" placeholder="项目所在地"   clearable>
                <el-button slot="append" icon="el-icon-search"   @click="selectPosition()"></el-button>
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
            <span> {{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核退回':''}}</span>
          </template>
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
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
        yesOrNo: [{ id: 1, detailName: '是' }, { id: 0, detailName: '否' }],
        flowStatus: [{ id: 'edit', detailName: '草稿' }, { id: 'check', detailName: '审核中' }, { id: 'pass', detailName: '审核通过' }, { id: 'reject', detailName: '审核退回' }],
        sousuo: '',
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          current: 1,
          size: 20,
          projectModuleId: '7f4fcba4255b43a8babf15afd6c04a53', // 工程承包
          projectOmit: '',
          projectName: '',
          projectTypeFirstId: '',
          projectTypeSecondId: '',
          contractAmountEngine: '',
          companyBuiltName: '',
          projectNatureFirstId: '',
          projectNatureSecondId: '',
          projectTypeId: '',
          isConsortion: '',
          createTime: '',
          flowStatus: '',
          projectLocation: ''
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
      }
    },
    methods: {
      //批量提交
      batchSub(){
        if (this.multipleSelection.length <1) {
          this.$message.info("请选择一条记录进行提交操作！");
          return false;
        }
        var list=[],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.flowStatus=='edit'||item.flowStatus=='reject'){
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
        this.searchform.projectLocation = data.fullDetailName
      },
      getProjectTwo(id) {
        this.searchform.projectTypeSecond = ''
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
          path: './engineAdd/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 删除
      del() {
        if (this.multipleSelection.length < 1) {
          this.$message.info('请选择一条记录进行删除操作！')
          return false
        }
        if(this.multipleSelection[0].flowStatus == 'check'|| this.multipleSelection[0].flowStatus == 'pass'){
          this.$message.info('不能删除审核中或审核通过的数据！')
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
        if(this.multipleSelection[0].flowStatus=='check'||this.multipleSelection[0].flowStatus=='pass'){
          this.$message.info("不能修改正在审核中或审核通过的数据！");
          return false;
        }
        let p = { actpoint: 'edit', uuid: this.multipleSelection[0].uuid  ,contractNumber: this.multipleSelection[0].contractNumber }
        this.$router.push({
          path: './engineAdd/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 查看
      rowShow(row) {
        let p = { actpoint: 'look', uuid: row.uuid }
        this.$router.push({
          path: './engineAdd/',
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
          path: './engineAdd/',
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
          projectModuleId: '7f4fcba4255b43a8babf15afd6c04a53', // 工程承包
          projectOmit: '',
          projectName: '',
          projectTypeFirstId: '',
          projectTypeSecondId: '',
          contractAmountEngine: '',
          companyBuiltName: '',
          projectNatureFirstId: '',
          projectNatureSecondId: '',
          projectTypeId: '',
          isConsortion: '',
          createTime: '',
          flowStatus: '',
          projectLocation: ''
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
