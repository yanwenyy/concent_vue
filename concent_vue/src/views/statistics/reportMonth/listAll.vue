<!--工程月报-项目部月报-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <div style="float: right;">
        <el-button
          @click="searchformReset"
          type="info"
          plain
          style="color:black;background:none">
          重置
        </el-button>
        <el-button @click="searchformSubmit" type="primary" plain>查询</el-button>
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
        <el-table-column label="projectId" align="center" prop="projectId" v-if="false" />
        <el-table-column label="projectreportuuid" align="center" prop="projectreportuuid" v-if="false" />
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
          label="项目简称"
          prop="projectOmit"
          show-overflow-tooltip

        >
         <template slot="header" slot-scope="scope">
            <span>项目简称</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.projectOmit" size="mini"/>
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
          :min-width="200"
          align="center"
          label="项目状态"
          prop="projectStatusName"
          show-overflow-tooltip
        >
         <template slot="header" slot-scope="scope">
            <span>项目状态</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.projectStatusName" size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="合同总额(万元)"
          prop="contractAmountTotal"
          show-overflow-tooltip
        >
        <template slot="header" slot-scope="scope">
            <span>合同总额(万元)</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.contractAmountTotal" size="mini"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="本月(万元)"
          prop="monthValue"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>本月(万元)</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.monthValue" size="mini"/>
            </div>
          </template>
        </el-table-column>
         <el-table-column
          :width="150"
          align="center"
          label="本年(万元)"
          prop="yearValue"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>本年(万元)</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.yearValue" size="mini"/>
            </div>
          </template>
        </el-table-column>
         <el-table-column
          :width="150"
          align="center"
          label="开累(万元)"
          prop="totalValue"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>开累(万元)</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.totalValue" size="mini"/>
            </div>
          </template>
        </el-table-column>
       <el-table-column
           :width="150"
           align="center"
           label="所属单位"
           prop="createOrgName"
           show-overflow-tooltip
         >
           <template slot="header" slot-scope="scope">
             <span>所属单位</span>
             <div>
               <el-input style=" width: 100%" v-model="searchform.createOrgName" size="mini"/>
             </div>
           </template>
         </el-table-column>
        <el-table-column
           :width="150"
           align="center"
           label="行业类别"
           prop="categorySecondName"
           show-overflow-tooltip
         >
           <template slot="header" slot-scope="scope">
             <span>行业类别</span>
             <div>
               <el-input style=" width: 100%" v-model="searchform.categorySecondName" size="mini"/>
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
                <el-input style=" width: 100%" v-model="searchform.projectTypeName" size="mini"/>
              </div>
            </template>
          </el-table-column>
           <el-table-column
              :width="150"
              align="center"
              label="本月上报"
              prop="status"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>本月上报</span>
                <div>
                  <el-input style=" width: 100%" v-model="searchform.status" size="mini"/>
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
        userdata:{},
        treeStatas: false,
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          current: 1,
          size: 20
        },
        menus: [],
        multipleSelection: [],
        orgTree: [],
        status:'未上报',
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
      // 查看
      rowShow(row) {
        let p = { actpoint: 'look', uuid: row.uuid }
        this.$router.push({
          path: '',
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
          path: '',
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
      debugger
        this.searchform.current = 1
        this.getData()
      },
      searchformReset() {
        this.searchform = {
          current: 1,
          size: 20,
          createOrgCode: '0000100001',
          createOrgId: '7ccea0f4843911ea8bd27927a4b81ba7',
          createOrgName: '十一局一公司',
          createOrgType: '',
          createTime: '',
          createUserId: '359856',
          createUserName: '',
          projectTypeName:'',
          categorySecondName:'',
          createOrgName:'',
          totalValue:'',
          yearValue:'',
          monthValue:'',
          contractAmountTotal:'',
          projectStatusName:'',
          projectName:'',
          projectOmit:'',
          projectId:'',
          projectreportuuid:''
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
          .post('/api/statistics/projectMonthlyReport/Projectreport/list/projectDeptList', this.searchform)
          .then(res => {
            this.page = res.data.data
          })
      },
      rowShow(row){
            let mList = {projectId: row.projectId, orgCode: row.createOrgCode,projectName:row.projectOmit}
              this.$router.push({
                    path: './reportMList/',
                    query: {mList: this.$utils.encrypt(JSON.stringify(mList))}
                  })

      }
    },

    created() {
      this.getData()
       console.log(JSON.parse(sessionStorage.getItem('userdata')))
       this.userdata=JSON.parse(sessionStorage.getItem('userdata'))
    },

  }
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
</style>
