<!--总设计量-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-popover v-if="isPrompt"
        placement="top"
        trigger="hover">
        <span style="font-size: 12px;">双击列表行填报更方便。<label @click="doNotPopover(1)" style="color:#67c23a;cursor:pointer;">不再提示</label></span>
        <el-button slot="reference" style="float: left;margin-right: 5px" icon="el-icon-edit" @click="edit" type="primary" plain>填报总设计量</el-button>
      </el-popover>
      <el-button v-else style="float: left;margin-right: 5px" icon="el-icon-edit" @click="edit" type="primary" plain>填报总设计量</el-button>
      <el-button-group style="float: left">
        <el-button icon="el-icon-delete" @click="del" type="primary" plain>删除</el-button>
        <!--<el-button @click="batchSub" type="primary" plain><i class="el-icon-plus"></i>批量提交</el-button>-->
      </el-button-group>

      <div style="float: right;">
        <el-button
          @click="searchformReset"
          type="info"
          plain
          style="color:black;background:none">
          <i class="el-icon-refresh-right"></i>重置
        </el-button>
        <el-popover v-if="isSearchPrompt"
                    placement="top"
                    trigger="hover">
          <span style="font-size: 12px;">项目简称、项目名称等输入项支持回车搜索。<label @click="doNotPopover(2)" style="color:#67c23a;cursor:pointer;">不再提示</label></span>
          <el-button slot="reference" @click="searchformSubmit" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        </el-popover>
        <el-button v-else @click="searchformSubmit" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
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
          :width="250"
          align="left"
          label="项目简称"
          prop="projectOmit"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目简称</span>
            <div>
                <el-input @keypress.native.enter="searchformSubmit"  v-model="searchform.projectOmit" size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="250"
          align="left"
          label="项目名称"
          prop="projectName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目名称</span>
            <div>
              <el-input @keypress.native.enter="searchformSubmit" v-model="searchform.projectName" size="mini"/>
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
              @change="searchformSubmit"
              placeholder="请先选择一级类别"
              size="mini"
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
          prop="companyBelongName"
          label="所属单位"
          show-overflow-tooltip
          clearable
        >
          <template slot="header" slot-scope="scope">
            <span>所属单位</span>
            <div>
              <el-input @keypress.native.enter="searchformSubmit"  v-model="searchform.companyBelongName" size="mini"/>
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
                @clear="searchform.flowStatus=''"
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
  </div>
</template>

<script>
  export default {
    name: 'plan-all',
    components: {
    },
    data() {
      return {
        userdata:JSON.parse(sessionStorage.getItem('userdata')),
        projectTypeTwo: [], // 工程类别(二级)
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
          },
          {
            detailName:"未创建",
            id:'0'
          }
        ],
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          current: 1,
          size: 20,
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
          projectStatus: '',
          projectLocation: '',
          planType: '3',
          flowStatus:''
        },
        proNameHover: false,
        projectName: '请选择项目',
        multipleSelection: [],
        isPrompt: true,
        isSearchPrompt: true
      }
    },
    computed: {
      projectDomainType() {
        return this.$store.state.category.projectDomainType
      }
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
      //     if(item.flowStatus=='edit'||item.flowStatus=='reject'){
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
        var isSubmit = true
        let uuids = []
        this.multipleSelection.forEach(function(item) {
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
        }
      },
      // 修改
      edit() {
        // debugger;
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
        let projecttypeCode = this.multipleSelection[0].projecttypeCode
        let projectId = this.multipleSelection[0].projectId
        let createOrgCode=this.multipleSelection[0].createOrgCode
        let contractAmountEngine=this.multipleSelection[0].contractAmountEngine
        if (planId == null || planId === '') {
          flowStatus = '1'
        }
        let p = {contractAmountEngine:contractAmountEngine,actpoint: 'edit', planInfo: {planId: planId, projectName: projectName, planTypeName: '开累计划', projectStatus: flowStatus, planProjectTjx: {projectId: projectId, projecttypeCode: projecttypeCode, planType: 3,createOrgCode:createOrgCode}}}
        this.$router.push({
          path: './proTjxDetail/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 双击事件
      rowEdit(row) {
        var isShow = true
        if (row.uuid == null || row.uuid === '') {
          isShow=false
        }
        if(isShow){
        let p = {actpoint: 'look', planInfo: {planId: row.uuid, projectName: row.projectName, planTypeName: '开累计划', projectStatus:row.flowStatus, planProjectTjx: {projectId: row.projectId, projecttypeCode: row.projecttypeCode, planType: 3}}}
        this.$router.push({
          path: './proTjxDetail/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })}
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
          projectStatus: '',
          projectLocation: '',
          planType: '3'
        }
        this.getData()
      },
      // 获取分页数据
      getData() {
        this.$http
          .post('/api/statistics/PlanProjectTjx/list/loadPageTjxAllData', this.searchform)
          .then(res => {
            this.page = res.data.data
          })
      },
      // 不再提示
      doNotPopover(type) {
        if (type === 1) {
          this.isPrompt = false
          localStorage.setItem('isPrompt', false)
        }
        if (type === 2) {
          this.isSearchPrompt = false
          localStorage.setItem('isSearchPrompt', false)
        }
      },
      // 获取工程类别二级
      getProjectTwo(id) {
        this.projectTypeTwo = []
        this.searchform.projectTypeSecond = ''
        this.searchform.projectTypeSecondId = ''
        if (id !== '') {
          this.projectDomainType.find(
            (item) => {
              if (item.id === id) {
                this.projectTypeTwo = item.children
              }
            }
          )
        }
        this.searchformSubmit()
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
      let searchPromptVal = localStorage.getItem('isSearchPrompt')
      if (searchPromptVal != null && searchPromptVal !== '') {
        if (searchPromptVal === 'true') {
          this.isSearchPrompt = true
        } else {
          this.isSearchPrompt = false
        }
      }
    },
    mounted() {
      this.$store.dispatch('getCategory', { name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e' })
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
