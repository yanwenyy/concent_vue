<!--工程月报-集团月报二级页面-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: right">
        <el-button @click="back"
                   type="primary" plain>返回</el-button>
      </el-button-group>
    </div>

    <div style="margin-top: 10px">
      <el-table class="tableStyle"
                :max-height="$tableHeight"
                :height="$tableHeight"
                :data="data"
                :header-cell-style="{
          'text-align' : 'center',
          'background-color' : 'whitesmoke'
        }"
                @row-dblclick="rowShow"
                @selection-change="handleSelectionChange" border highlight-current-row
                ref="table"
                style="width: 100%"
                tooltip-effect="dark"
      >
        <el-table-column :width="50"
                         align="center" show-overflow-tooltip
                         type="selection"
        ></el-table-column>
        <el-table-column label="projectId"
                         align="center"
                         prop="projectId"
                         v-if="false" />
        <el-table-column label="projectreportuuid"
                         align="center"
                         prop="projectreportuuid"
                         v-if="false" />
        <el-table-column :width="70"
                         align="center"
                         label="序号" show-overflow-tooltip
                         type="index"
        ></el-table-column>
        <el-table-column
          :min-width="200"
          align="center"
          label="月报日期"
          prop="yearDateS"
          show-overflow-tooltip
        >
      <!--    <template slot="header" slot-scope="scope">
            <span>月报日期</span>
            <div>
              <el-date-picker
                class="list-search-picker"
                filterable
                clearable
                type="month"
                v-model="yearDateS"
                readonly
                value-format="yyyy-MM"
                @change="queryList"
              >
              </el-date-picker>
            </div>
          </template>-->
          <template slot-scope="scope">
            <div v-if="scope.row.reportYear!=''&& scope.row.reportYear!=null">
              {{
              scope.row.reportYear+"-"+scope.row.reportMonth
              }}
            </div>
            <div v-else>
              {{
              searchform.reportYear+"-"+searchform.reportMonth
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :min-width="200"
                         align="center"
                         label="项目名称"
                         prop="projectName" show-overflow-tooltip
        >
    <!--      <template slot="header"
                    slot-scope="scope">
            <span>填报单位</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.projectName"
                        size="mini"/>
            </div>
          </template>-->
        </el-table-column>
        <el-table-column :min-width="200"
                         align="center"
                         label="项目状态"
                         prop="projectStatusName" show-overflow-tooltip
        >
     <!--     <template slot="header"
                    slot-scope="scope">
            <span>项目状态</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.projectStatusName"
                        size="mini"/>
            </div>
          </template>-->
    <!--      <template slot="header"
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
          </template>-->
        </el-table-column>
        <el-table-column :width="150"
                         align="center"
                         label="合同总额(万元)"
                         prop="contractAmountTotal" show-overflow-tooltip
        >
  <!--        <template slot="header"
                    slot-scope="scope">
            <span>合同总额(万元)</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.contractAmountTotal"
                        size="mini"/>
            </div>
          </template>-->
        </el-table-column>

        <el-table-column :width="150"
                         align="center"
                         label="本月(万元)"
                         prop="monthValue" show-overflow-tooltip
        >
      <!--    <template slot="header"
                    slot-scope="scope">
            <span>本月(万元)</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.monthValue"
                        size="mini"/>
            </div>
          </template>-->
        </el-table-column>
        <el-table-column :width="150"
                         align="center"
                         label="本年(万元)"
                         prop="yearValue" show-overflow-tooltip
        >
         <!-- <template slot="header"
                    slot-scope="scope">
            <span>本年(万元)</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.yearValue"
                        size="mini"/>
            </div>
          </template>-->
        </el-table-column>
        <el-table-column :width="150"
                         align="center"
                         label="开累(万元)"
                         prop="totalValue" show-overflow-tooltip
        >
      <!--    <template slot="header"
                    slot-scope="scope">
            <span>开累(万元)</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.totalValue"
                        size="mini"/>
            </div>
          </template>-->
        </el-table-column>
      <!--  <el-table-column
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
        </el-table-column>-->
        <el-table-column :width="150"
                         align="center"
                         label="状态"
                         prop="flowStatus" show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>{{scope.row.flowStatus=='notpass'?'草稿':scope.row.flowStatus=='edit'?'审核中':scope.row.flowStatus=='reject'?'审核通过':scope.row.flowStatus=='check'?'审核退回':'未创建'}}
            </div>
          </template>
     <!--     <template slot="header"
                    slot-scope="scope">
            <span>状态</span>
            <div>
              <el-select class="list-search-picker" clearable filterable
                         placeholder="请选择"
                         size="mini"
                         v-model="searchform.flowStatus"
              >
                <el-option :key="index"
                           :label="item.detailName"
                           :value="item.id"
                           v-for="(item, index) in flowStatusList"
                ></el-option>
              </el-select>
            </div>
          </template>-->
        </el-table-column>
      </el-table>
    </div>
    <Tree v-if="treeStatas"
          ref="addOrUpdate"
          @getPosition="getPositionTree"></Tree>
    <State ref="stateUpdate"
           :data="projectStatus"
           @resetState="getData"></State>
  </div>
</template>

<script>
  import Tree from '@/components/tree';
  import State from '@/components/state';

  export default {
    name: 'proposal-list-look',
    components: {
      Tree, State
    },
    data() {
      return {
        data:{},
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        yearDateS:JSON.parse(this.$utils.decrypt(this.$route.query.p)).reportYear+'-'+JSON.parse(this.$utils.decrypt(this.$route.query.p)).reportMonth,        userdata:{},
        treeStatas: false,
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          createOrgCode: '',
          createOrgId: '',
          createOrgName: '',
          createOrgType: '',
          createTime: '',
          createUserId: '',
          createUserName: '',
          projectTypeName:'',
          reportType:'',
          yearDates:'',
          reportMonth:'',
          reportYear:''
        },
        data:[],
        flowStatusList:[
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
            id:'edit'
          }
        ],
        flowStatusNameList:[
          {
            detailPrjStaName:'在建',
            id:'在建'
          },
          {
            detailPrjStaName:'竣工未结算',
            id:'竣工未结算'
          }
        ],
        menus: [],
        multipleSelection: [],
        orgTree: []
      };
    },
    computed: {
      projectDomainType() {
        return this.$store.state.category.projectDomainType;
      },
      projectNature() {
        return this.$store.state.category.projectNature;
      },
      projectType() {
        return this.$store.state.projectType;
      },
      projectStatus() {
        return this.$store.state.projectStatus;
      }
    },
    methods: {
      handleSizeChange(val) {
        this.searchform.size = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.searchform.current = val;
        this.getData();
      },
      searchformSubmit() {
        this.searchform.current = 1;
        this.getData();
      },
      searchformReset() {
        this.searchform = {
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
          reportType:'',
        };
        this.getData();
      },
    queryList(){
      this.searchform.current = 1;
      this.searchform.current = 1;
      this.searchform.reportYear= this.searchform.yearDateS.split("-")[0];
      this.searchform.reportMonth= this.searchform.yearDateS.split("-")[1];
      this.getData();
    },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 获取分页数据
      getData() {
        //this.searchform=this.p.params;
        this.searchform.createOrgCode=this.p.createOrgCode
        this.searchform.createOrgId=this.p.createOrgId
        //this.searchform.createOrgName=this.p.createOrgName
        this.searchform.createOrgType=this.p.createOrgType
        this.searchform.createUserId=this.p.createUserId
        this.searchform.createUserName=this.p.createUserName
        this.searchform.reportYear=this.p.reportYear
        this.searchform.reportMonth=this.p.reportMonth
        this.searchform.reportType=this.p.reportType
        this.searchform.yearDateS=this.p.reportYear+'-'+this.p.reportMonth
        this.$http
            .post('/api/statistics/projectMonthlyReport/Projectreport/list/companyMonthlyReportList', this.searchform)
            .then(res => {
              this.data = res.data.data;
            });
      },
      rowShow(row){
        if(row.uuid==''||row.uuid==null||row.uuid==undefined){
          row.uuid=row.projectreportuuid
        }
        let p = {actpoint: "look", params: row};
        if((row.flowStatus==''||row.flowStatus==null) && row.projectId!=this.userdata.managerOrgId){
          this.$message.info("该项目月报还未进行创建，无法进行操作", "提示")
          return false
        }else{
        this.$router.push({
          path: '../jTMDetail/',
          query: {p: this.$utils.encrypt(JSON.stringify(p))}
        });

      }},
      // 返回上一页
      back() {
        this.$router.back()
      }
    },
    created() {
      this.getData();
      console.log(JSON.parse(sessionStorage.getItem('userdata')));
      this.userdata=JSON.parse(sessionStorage.getItem('userdata'));
    }

  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
</style>
