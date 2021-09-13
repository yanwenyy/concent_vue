<!--年计划列表-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="dialogFormVisible=true" type="primary" plain><i class="el-icon-plus "></i>新增</el-button>
        <el-button @click="edit" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="del" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
        <el-button @click="searchformSubmit" type="primary" plain><i class="el-icon-refresh-right"></i>刷新</el-button>
        <el-button @click="batchBack" type="primary" plain>批量退回</el-button>
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
          :width="100"
          align="center"
          label="状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>{{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核驳回':'未创建'}}
            </div>
          </template>
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-select
                filterable
                clearable
                size="mini"
                @change="searchformSubmit"
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
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="searchform">
        <el-form-item label="填报时间"  :label-width="formLabelWidth">
          <el-date-picker
            v-model="searchform.year"
            value-format="yyyy"
            type="year"
            placeholder="填报时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'list-year',
    components: {
    },
    data() {
      return {
        userdata:JSON.parse(sessionStorage.getItem('userdata')),
        dialogFormVisible:false,
        formLabelWidth:'150px',
        treeStatas: false,
        projectTypeTwo: [], // 工程类别(二级)
        projectStatus: '',
        page: { current: 1, size: 20, total: 0, records: [] },
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        flowStatus:[
          {
            detailName:"草稿",
            id:'edit'
          },
          {
            detailName:"审核中",
            id:'check'
          },
          {
            detailName:"审核通过",
            id:'pass'
          },
          {
            detailName:"审核驳回",
            id:'reject'
          }
        ],
        searchform: {
          current: 1,
          size: 20,
          projectId: '',
          planType: '2',
          flowStatus:''
        },
        menus: [],
        multipleSelection: [],
        orgTree: []
      }
    },
    computed: {
    },
    methods: {
      //批量退回
      batchBack(){
        if (this.multipleSelection.length <1) {
          this.$message.info("请选择一条记录进行提交操作！");
          return false;
        }
        var list=[],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.flowStatus=='pass'){
            list.push(item);
          }else{
            this.$message.info("当前所选数据中包含不可退回的选项,请检查后进行操作");
            return itemStatus=false;
          }
        })
        if(itemStatus){
          this.$confirm(`确认退回这些数据吗`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                "/api/statistics/planPrjTjxDetail/process/return",
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
      // 删除
      del() {
        if (this.multipleSelection.length < 1) {
          this.$message.info('请选择一条记录进行删除操作！')
          return false
        }
        if(this.userdata.managerOrgCode!=this.multipleSelection[0].createOrgCode&&this.multipleSelection[0].flowStatus!=null){
          this.$message.info('不能删除非本单位创建的计划！')
          return false
        }
        let uuids = []
        var isSubmit=true
        this.multipleSelection.forEach((item) => {
          uuids.push(item.uuid)
          if (item.flowStatus === 'edit'||item.flowStatus === 'reject') {
            isSubmit = false
          }else{
            this.$message.info("当前所选数据中包含不可删除的选项,请检查后进行操作");
            return isSubmit=true;
          }
        });
        if(!isSubmit){
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
        }

      },
      add(){
        this.dialogFormVisible = false;
        console.log(this.p)
        if(this.searchform.year==''||this.searchform.year==null){
          this.$message.error("请选择填报时间");
          return false;
        }
        this.$http
          .post(
            '/api/statistics/planPrjTjxDetail/list/checkIsCreate',
            JSON.stringify({ planYear: this.searchform.year,projectId: this.p.projectId,planType:'2'}),
            {useJson: true}
          )
          .then((res) => {
            if(res.data.data==null||res.data.data==''){
              var row=this.p.row;
              let planId ='';
              let flowStatus = row.flowStatus;
              let projectName = row.projectName;
              let projecttypeCode = row.projectTypeFirstId;
              let projectId = row.projectPlanId;
              let createOrgCode=row.createOrgCode;
              if (planId == null || planId === '') {
                flowStatus = '1'
              }
              //修改成当前选择的年月-20210805-aty修改
             let currentYear=this.searchform.year;
              let p = {actpoint: 'edit', planInfo: {planId: planId, projectName: projectName, planTypeName: '年计划', projectStatus: flowStatus, planProjectTjx: {projectId: projectId, planYear: currentYear, planType: 2, projecttypeCode: projecttypeCode,createOrgCode:createOrgCode}}}
              this.$router.push({
                path: '../proTjxDetail/',
                query: { p: this.$utils.encrypt(JSON.stringify(p)) }
              })
              this.searchform.year='';
            }else{
              this.$message.error('当前年已经创建项目,不能再创建了')
            }
          })
      },
      // 修改
      edit() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info('请选择一条记录进行查看操作！')
          return false
        }
        if ((this.multipleSelection[0].flowStatus!=null || this.multipleSelection[0].flowStatus!='') && (this.multipleSelection[0].flowStatus=='check'||this.multipleSelection[0].flowStatus=='pass')) {
          this.$message.info('只可以编编未创建的和草稿状态的数据！')
          return false
        }
        if(this.userdata.managerOrgCode!=this.multipleSelection[0].createOrgCode){
          this.$message.info('不能修改非本单位创建的计划！')
          return false
        }
        let planId = this.multipleSelection[0].uuid
        let flowStatus = this.multipleSelection[0].flowStatus
        let projectName = this.multipleSelection[0].projectName
        let projecttypeCode = this.multipleSelection[0].projectTypeFirstId
        let projectId = this.multipleSelection[0].projectId
        let planYear = this.multipleSelection[0].planYear
        if (planId == null || planId === '') {
          flowStatus = '1'
        }
        let p = {actpoint: 'edit', planInfo: {planId: planId, projectName: projectName, planTypeName: '年计划', projectStatus: flowStatus, planProjectTjx: {projectId: projectId, planYear: planYear, planType: 2, projecttypeCode: projecttypeCode}}}
        this.$router.push({
          path: '../proTjxDetail/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 双击事件
      rowEdit(row) {
        let flowStatus = row.flowStatus
        if (row.uuid == null || row.uuid === '') {
          flowStatus = '1'
        }
        let p = {actpoint: 'look', planInfo: {planId: row.uuid, projectName: row.projectName, planTypeName: '年计划', projectStatus: flowStatus, planProjectTjx: {projectId: row.projectId, planYear: row.planYear, planType: 2, projecttypeCode: row.projectTypeFirstId}}}
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
          .post('/api/statistics/PlanProjectTjx/list/loadPageDataYear', this.searchform)
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
