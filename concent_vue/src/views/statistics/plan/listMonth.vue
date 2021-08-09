<!--年计划列表-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="edit" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="del" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
        <el-button @click="batchSub" type="primary" plain><i class="el-icon-plus"></i>批量提交</el-button>
        <!--<el-button @click="searchformSubmit" type="primary" plain><i class="el-icon-refresh-right"></i>刷新</el-button>-->
        <el-button @click="back" type="primary" plain>返回</el-button>
      </el-button-group>
      <!--<label style="margin-left: 10px;line-height: 32px;font-size: 15px;">项目名称：{{p.projectName}}</label>-->
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
          label="计划年月"
          prop="planMonth"
          show-overflow-tooltip
        >
          <template v-if="scope.row.planYear && scope.row.planMonth" slot-scope="scope">{{
            scope.row.planYear + '年' + scope.row.planMonth + '月'
            }}</template>
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
            <!--<span v-if="scope.row.flowStatus=='pass'" style="color:#909399;">未提交</span>
            <span v-else-if="scope.row.flowStatus=='notpass'" style="color:#67c23a;">已提交</span>
            <span v-else>未填报</span>-->
            <div>{{scope.row.flowStatus=='notpass'?'草稿':scope.row.flowStatus=='edit'?'审核中':scope.row.flowStatus=='reject'?'审核通过':scope.row.flowStatus=='check'?'审核驳回':'未创建'}}
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
          planType: '1'
        },
        menus: [],
        multipleSelection: [],
        orgTree: []
      }
    },
    computed: {
    },
    methods: {
      // //批量提交
      // batchSub(){
      //   if (this.multipleSelection.length <1) {
      //     this.$message.info("请选择一条记录进行提交操作！");
      //     return false;
      //   }
      //   var list=[],itemStatus=true;
      //   this.multipleSelection.forEach((item) => {
      //     if(item.flowStatus=='notpass'||item.flowStatus=='check'){
      //       var v={
      //         businessId:item.uuid,
      //         businessName:item.projectName,
      //         businessType:'project_plan'
      //       }
      //       list.push(v);
      //     }else{
      //       this.$message.info("当前所选数据中包含不可提交的选项,请检查后进行操作");
      //       return itemStatus=false;
      //     }
      //   })
      //   if(itemStatus){
      //     this.$confirm(`确认提交这些数据吗`, '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       this.$http
      //         .post(
      //           "/api/statistics/StatisticsProject/commonProcess/start",
      //           JSON.stringify(list),
      //           {useJson: true}
      //
      //         )
      //         .then((res) => {
      //           if(res.data.code==200){
      //             this.$message({
      //               message: "操作成功",
      //               type: "success",
      //             });
      //             this.getData()
      //           }else{
      //             this.$message.error(res.data.msg);
      //           }
      //
      //         });
      //     }).catch(() => {})
      //   }
      // },
      // 删除
      del() {
        if (this.multipleSelection.length < 1) {
          this.$message.info('请选择一条记录进行删除操作！')
          return false
        }
        let uuids = []
        var isSubmit=true
        this.multipleSelection.forEach((item) => {
          uuids.push(item.uuid)
          if (item.flowStatus === '1'||item.flowStatus === '4') {
            isSubmit = false
            return false
          }
          if (item.flowStatus ===null) {
            isSubmit = false
            return false
          }
        })
        if (isSubmit) {
          this.$message({
            message: '选中项包含已提交项目或者未填报的项目，请重新选择',
            duration: 2000,
            type: 'warning',
            onClose: () => { this.getData() }
          })
        } else {
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
      }},
      // 修改
      edit() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info('请选择一条记录进行查看操作！')
          return false
        }
        if ((this.multipleSelection[0].flowStatus!=null || this.multipleSelection[0].flowStatus!='') && (this.multipleSelection[0].flowStatus=='edit'||this.multipleSelection[0].flowStatus=='reject')) {
          this.$message.info('只可以编编未创建的和草稿状态的数据！')
          return false
        }
        let planId = this.multipleSelection[0].uuid
        let flowStatus = this.multipleSelection[0].flowStatus
        let projectName = this.multipleSelection[0].projectName
        let projecttypeCode = this.multipleSelection[0].projectTypeFirstId
        let projectId = this.multipleSelection[0].projectId
        let planYear = this.multipleSelection[0].planYear
        let planMonth = this.multipleSelection[0].planMonth
        if (planId == null || planId === '') {
          flowStatus = '0'
        }
        let p = {actpoint: 'edit', planInfo: {planId: planId, projectName: projectName, planTypeName: '月计划', projectStatus: flowStatus, planProjectTjx: {projectId: projectId, planYear: planYear, planMonth: planMonth, planType: 1, projecttypeCode: projecttypeCode}}}
        this.$router.push({
          path: '../proTjxDetail/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 双击事件
      rowEdit(row) {
        let flowStatus = row.flowStatus
        if (row.uuid == null || row.uuid === '' || flowStatus !== '1') {
          flowStatus = '0'
        }
        let p = {actpoint: 'look', planInfo: {planId: row.uuid, projectName: row.projectName, planTypeName: '月计划', projectStatus: flowStatus, planProjectTjx: {projectId: row.projectId, planYear: row.planYear, planMonth: row.planMonth, planType: 1, projecttypeCode: row.projectTypeFirstId}}}
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
          planType: '1'
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
        planType: '1'
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
