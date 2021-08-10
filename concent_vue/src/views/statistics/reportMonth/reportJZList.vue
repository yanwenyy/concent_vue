<!--工程月报-公司月报自揽或工区-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
     <!--   <el-button @click="searchformSubmit"
                   type="primary" plain>查询</el-button>-->
        <!--<el-button @click="add"-->
                   <!--type="primary" plain><i class="el-icon-plus"></i>新增</el-button>-->
        <el-button @click="edit"
                   type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
        <!--<el-button @click="del"-->
                   <!--type="primary" plain><i class="el-icon-delete"></i>删除</el-button>-->
        <!--<el-button @click="batchT"-->
                   <!--type="primary" plain><i class="el-icon-thumb"></i>未上报批量填0</el-button>-->
      <!--  <el-button @click="searchformReset"
                   type="info" plain
                   style="color:black;background:none">
          重置
        </el-button>-->

      </el-button-group>
      <div style="float: right;">
        <el-button @click="searchformSubmit"
                   type="primary" plain><i class="el-icon-search"></i>查询</el-button>
      </div>
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
        <el-table-column :min-width="200"
                         align="center"
                         label="月报日期"
                         prop="yearDateS" show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>月报日期</span>
            <div>
              <el-date-picker class="list-search-picker" filterable clearable
                              type="month"
                              value-format="yyyy-MM"
                              @change="queryList"
                              v-model="searchform.yearDateS"
              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <div>{{scope.row.monthValue}}</div>-->
            <div v-if="scope.row.reportYear != null && scope.row.reportMonth != null">
              {{
              scope.row.reportYear+'-'+scope.row.reportMonth
              }}
            </div>
            <div v-else>{{mrTime}}</div>
          </template>
        </el-table-column>
        <el-table-column :min-width="200"
                         align="center"
                         label="填报单位"
                         prop="projectName" show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>填报单位</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.projectName"
                        size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column :width="150"
                         align="center"
                         label="所属单位"
                         prop="contractAmountTotal" show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>所属单位</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.contractAmountTotal"
                        size="mini"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column :width="150"
                         align="center"
                         label="状态"
                         prop="monthValue" show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>状态</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.monthValue"
                        size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column :width="150"
                         align="center"
                         label="批复状态"
                         prop="yearValue" show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>批复状态</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.yearValue"
                        size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column :width="150"
                                           align="center"
                                           label="批复金额(万元)"
                                           prop="totalValue" show-overflow-tooltip
      >
        <template slot="header"
                  slot-scope="scope">
          <span>批复金额(万元)</span>
          <div>
            <el-input style=" width: 100%"
                      v-model="searchform.totalValue"
                      size="mini"/>
          </div>
        </template>
      </el-table-column>
        <el-table-column
         :width="120"
         align="center"
         label="审核通过时间"
         prop="checkfinishTime"
         show-overflow-tooltip
       >
         <template slot-scope="scope">{{
           scope.row.checkfinishTime | dateformat
         }}</template>
       </el-table-column>
      </el-table>
      <el-dialog :title="addTitle"
                 :visible.sync="showTqDialog" append-to-body
                 @close="closeAdd">
        <div>
          <div>
          此操作将为当月所有未上报的项目月报创建当月完成值为0的月报并提交。
          如果项目已经创建了当月月报 则直接提交。
          确认批量填充?
          </div>
          <div style="text-align:right;margin-top:10px">
            <el-button @click="submit"
                       type="primary">是</el-button>
            <el-button @click="closeAdd"
                       type="primary">否</el-button>
          </div>
        </div>
      </el-dialog>
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
        userdata:{},
        mrTime:'',
        treeStatas: false,
        showTqDialog:false,
        addTitle:'请注意',
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
          //fillDate:'',
          reportType:'1',
          yearDateS:''
        },
        data:[],
        flowStatusList:[
          {
            detailName:'草稿',
            id:'1'
          },
          {
            detailName:'审核中',
            id:'2'
          },
          {
            detailName:'审核通过',
            id:'3'
          },
          {
            detailName:'审核驳回',
            id:'4'
          },
          {
            detailName:'未创建',
            id:'0'
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
      getdatatime(){//默认显示今天
        var date = new Date();
        var y = date.getFullYear();
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var time=y + '-' + m;
        this.searchform.yearDateS= time;
        this.mrTime=time;
      },
        //新增
      add(){
        //判断是否存在未上报的数据，如果存在就提示，不存在就创建
        if(this.data.length>0){
          for (var i=0; i < this.data.length; i++) {
            if((this.data[i].flowStatus ==''||this.data[i].flowStatus ==null) && (this.data[i].projectId!=''||this.data[i].projectId!=null )){
              this.$message.info('该单位下存在未提交的月报,请提交该单位下所有项目月报后再进行尝试！');
              return false;
            }else if((this.data[i].projectId==''|| this.data[i].projectId==null) && this.data[i].reportType=='1'){
              this.$message.info('该单位已在本月创建过月报请尝试修改或下月再进行尝试！');
              return false;
            };
          };
        }
        var url = '/api/statistics/projectMonthlyReport/Projectreport/detail/companyMonthlyReportEntityInfo';
        var params = {};
        //params.fillDate = this.searchform.fillDate;
        params.reportYear=this.searchform.yearDateS.split('-')[0];
        params.reportMonth=this.searchform.yearDateS.split('-')[1];
        params.reportType='1';
        params.status='2';
        params.flowStatus='1';
        this.$http.post(
            url,
            JSON.stringify(params),
            {useJson: true}
        ).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: '新增成功'
            });
            this.getData();
          }else if(res.data.code === 400){
            this.$message({
              message: '该单位已在本月创建过月报请尝试修改或于下月再进行尝试'
            });
            this.getData();
          }else{
            this.$message({
              message: '创建失败'
            });
          }
        });
      },
      // 查看
      rowShow(row) {
        let p = { actpoint: 'look', projectId: row.projectId,uuid:row.uuid,reportYear:row.reportYear,reportMonth:row.reportMonth,orgCode:row.createOrgCode,projectName:row.reportProjectName,projectStatus:row.status }
        this.$router.push({
          path: '../reportMDetail/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      //未上报批量填0
      batchT(){
        this.showTqDialog=true;
      },
      //未上报批量填0点击是
      submit(){
        var dataInfo=[];
        this.data.forEach((item) => {
          if(item.projectId!=''&&item.projectId!=null ){
            dataInfo.push(item);
          }
        })
        let tableData = {
          prjAndPrjReportAndDetailList:dataInfo,
          yearVo:this.searchform.yearDateS.split('-')[0],
          monthVo:this.searchform.yearDateS.split('-')[1],
          reportTypeVo:'1'
        }
        var url = '/api/statistics/projectMonthlyReport/Projectreport/detail/batchUpdateValue';
        this.$http.post(
            url,
            JSON.stringify(tableData),
            {useJson: true}
        ).then((res) => {
          if (res.data.code === 200) {
            this.showTqDialog=false;
            this.$message({
              message: '批量上报成功'
            });
            this.getData();
          }else{
            this.$message({
              message: '批量处理失败'
            });
          }
        });
      },
      // 删除
      del() {
        if (this.multipleSelection.length < 1) {
          this.$message.info('请选择一条记录进行删除操作！');
          return false;
        }
        let uuids = [],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          let a=this.userdata.managerOrgId;
          if(item.projectId==null||item.projectId==''){
            if(item.flowStatus!='1'&&item.flowStatus!=null&&item.flowStatus!='4'){
            this.$message.info('只允许删除未上报的数据！');
            return itemStatus=false;
            }else{
              uuids.push(item.projectreportuuid);
            }
          }else{
            this.$message.info('无权删除下级单位月报！');
            return itemStatus=false;
          }
          if(itemStatus){
            this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http
                  .post(
                      '/api/statistics/projectMonthlyReport/Projectreport/list/delete',
                      { ids: uuids }
                  )
                  .then((res) => {
                    if (res.data.code === 200) {
                      this.getData();
                    }else if(res.data.code === 400){

                    }else{

                    }

                  });
            }).catch(() => {
            });
          }
        });
      },
      //点击否
      closeAdd() {
        this.showTqDialog = false;
        this.query();
      },
      // 选中查看
      show() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info('请选择一条记录进行查看操作!');
          return false;
        }
        let p = { actpoint: 'look', uuid: this.multipleSelection[0].uuid };
        this.$router.push({
          path: '',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        });
      },
      //编辑
      edit() {
        if (this.multipleSelection.length == 0) {
          this.$message.info("请选择需要编辑的数据", "提示")
          return false
        }
        if (this.multipleSelection.length >1) {
          this.$message.info("请选择一条数据，进行编辑", "提示")
          return false
        }
        if ((this.multipleSelection[0].flowStatus!=null||this.multipleSelection[0].flowStatus!='')&& this.multipleSelection[0].flowStatus!='1'&& this.multipleSelection[0].flowStatus!='4'){
          this.$message.info("只允许修改草稿和审核驳回数据", "提示")
          return false
        }
        this.type = 'edit'
        this.form1 = JSON.parse(JSON.stringify(this.multipleSelection[0]))
        let p = {projectId:JSON.parse(JSON.stringify(this.multipleSelection[0])).projectId,uuid:JSON.parse(JSON.stringify(this.multipleSelection[0])).uuid,
          yearDates:JSON.parse(JSON.stringify(this.multipleSelection[0])).yearDates,orgCode:JSON.parse(JSON.stringify(this.multipleSelection[0])).createOrgCode,
          projectStatus:JSON.parse(JSON.stringify(this.multipleSelection[0])).status,projectName:this.multipleSelection[0].reportProjectName
        }
        this.$router.push({
          path: '../reportMDetail/',
          query: {p: this.$utils.encrypt(JSON.stringify(p))}
        })
      },
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
        if(this.searchform.yearDateS!='' && this.searchform.yearDateS!=null && this.searchform.yearDateS!=undefined){
        this.searchform.reportYear= this.searchform.yearDateS.split('-')[0];
        this.searchform.reportMonth= this.searchform.yearDateS.split('-')[1];
        }
        this.getData();
      },
      queryList(){
        this.searchform.current = 1;
        if(this.searchform.yearDateS!='' && this.searchform.yearDateS!=null && this.searchform.yearDateS!=undefined){
          this.mrTime=this.searchform.yearDateS;
          this.searchform.reportYear= this.searchform.yearDateS.split('-')[0];
          this.searchform.reportMonth= this.searchform.yearDateS.split('-')[1];
        }
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
          reportType:'1'
        };
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 获取分页数据
      getData() {
        if(this.searchform.yearDateS!='' && this.searchform.yearDateS!=null && this.searchform.yearDateS!=undefined) {
          this.searchform.reportYear = this.searchform.yearDateS.split('-')[0];
          this.searchform.reportMonth = this.searchform.yearDateS.split('-')[1];
        }
        this.$http
            .post('/api/statistics/projectMonthlyReport/Projectreport/list/companyMonthlyReportList', this.searchform)
            .then(res => {
              this.data = res.data.data;
            });
      },
      rowShow(row){
        let p = {actpoint: 'look',projectId: row.projectId, orgCode: row.createOrgCode,projectName:row.projectName,createOrgId:row.createOrgId,createOrgName:row.createOrgName,
          reportYear:row.reportYear,reportMonth:row.reportMonth,projectreportuuid:row.projectreportuuid,reportType:row.reportType,createOrgType:row.createOrgType
        };
        if((row.flowStatus==''||row.flowStatus==null) && (row.projectId!=''||row.projectId!=null)){
          this.$message.info('该项目月报还未进行创建，无法进行操作', '提示');
          return false;
        }else{
        this.$router.push({
          path: './companyMDetail/',
          query: {p: this.$utils.encrypt(JSON.stringify(p))}
        });

      }}
    },
    created() {
      let that = this;
      that.getdatatime();
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
