<!--工程月报验工计价-项目部月报-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-form class="search-form" :inline="true" :model="searchform" @keyup.enter.native="init()">
        <!--<el-form-item label="填报年月:">-->
          <!--<el-date-picker-->
            <!--v-model="searchform.fullDate"-->
            <!--type="month"-->
            <!--value-format="yyyy-MM"-->
            <!--placeholder="选择月">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <el-button
          @click="searchformReset"
          type="info"
          plain
          style="color:black;background:none">
          <i class="el-icon-refresh-right"></i>重置
        </el-button>
        <el-button @click="searchformSubmit" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
      </el-form>
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
           <template slot="header"
                     slot-scope="scope">
             <span>项目状态</span>
             <div>
               <el-select class="list-search-picker" clearable filterable
                          placeholder="请选择"
                          size="mini"
                          v-model="searchform.projectStatusName"
               >
                 <el-option :key="index"
                            :label="item.detailPrjStaName"
                            :value="item.id"
                            v-for="(item, index) in flowStatusNameList"
                 ></el-option>
               </el-select>
             </div>
           </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程合同额(万元)"
          prop="contractAmountEngine"
          show-overflow-tooltip
        >
        <!--<template slot="header" slot-scope="scope">-->
            <!--<span>工程合同额(万元)</span>-->
            <!--<div>-->
              <!--<el-input style=" width: 100%" v-model="searchform.contractAmountEngine" size="mini"/>-->
            <!--</div>-->
          <!--</template>-->
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
           prop="projectTypeFirst"
           show-overflow-tooltip
         >
           <template slot="header" slot-scope="scope">
             <span>行业类别</span>
             <div>
               <el-input style=" width: 100%" v-model="searchform.projectTypeFirst" size="mini"/>
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
              label="填报类型"
              prop="monthReportType"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>填报类型</span>
                <div>
                  <el-input style=" width: 100%" v-model="searchform.monthReportType" size="mini"/>
                </div>
              </template>
              <template  slot-scope="scope">
                 {{scope.row.monthReportType=='1'?'工程公司':scope.row.monthReportType=='2'?'局指挥部':'全部'}}
              </template>
            </el-table-column>
           <el-table-column
              :width="150"
              align="center"
              label="本月上报"
              prop="flowStatus"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>本月上报</span>
                <div>
                  <el-input style=" width: 100%" v-model="searchform.flowStatus" size="mini"/>
                </div>
              </template>
             <template  slot-scope="scope">
                {{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核驳回':'未创建'}}
             </template>
            </el-table-column>
            <el-table-column
              :width="200"
              align="center"
              label="批复意见"
              prop="remark"
              show-overflow-tooltip
            >
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
          flowStatusNameList:[
            {
              detailPrjStaName:'在建',
              id:'在建'
            },
            {
              detailPrjStaName:'竣工未结算',
              id:'竣工未结算'
            },
            {
              detailPrjStaName:'正在开展',
              id:'正在开展'
            }, {
              detailPrjStaName:'未开工',
              id:'未开工'
            }
      ],
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          // fullDate:'',
          current: 1,
          size: 20
        },
        menus: [],
        multipleSelection: [],
        orgTree: [],
        flowStatus:'未上报',
        status:'未上报'
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
        this.searchform.current = 1
        this.getData()
      },
      searchformReset() {
        this.searchform = {
          // fullDate:'',
          current: 1,
          size: 20,
          createOrgCode: '',
          createOrgId: '',
          createOrgName: '',
          createOrgType: '',
          createTime: '',
          createUserId: '',
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
        var date = new Date();
        var y = date.getFullYear();
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var time=y + '-' + m;
        //this.searchform.reportYear= y;
        this.searchform.yearDateS=time;
        this.searchform.beginDate=y + '-' +"01";
        this.$http
          .post('/api/statistics/Projectcheck/list/projectDeptList', this.searchform)
          .then(res => {
            this.page = res.data.data
          })
      },
      rowShow(row){
        var url='';
        if(row.projectTypeName=='局指项目'){
          url='./reportJZList/';
        }else{
          url='./reportMList/';
        }
        let p = {projectId: row.projectId, orgCode: row.createOrgCode,projectName:row.projectName}
        this.$router.push({
          path: url,
          query: {p: this.$utils.encrypt(JSON.stringify(p))}
        })

      }
    },

    created() {
      // //获取当前月份
      // var sj=new Date().toLocaleDateString().split('/');
      // sj[1]=sj[1]<10?'0'+sj[1]:sj[1];
      // this.searchform.fullDate=sj[0]+"-"+sj[1];
      this.getData()
       this.userdata=JSON.parse(sessionStorage.getItem('userdata'))
    },

  }
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
  .search-form >>>.el-form-item__label{
    width: auto!important;
  }
</style>
