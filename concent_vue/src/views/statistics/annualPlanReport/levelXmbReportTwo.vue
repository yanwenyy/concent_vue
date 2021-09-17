<!--工程月报-公司月报自揽或工区-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group v-if="!p.ifjtList" style="float: left">
     <!--   <el-button @click="searchformSubmit"
                   type="primary" plain>查询</el-button>-->
        <el-button @click="add"
                   type="primary" plain><i class="el-icon-plus"></i>新增</el-button>
        <el-button @click="edit"
                   type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="del"
                   type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
      <!--  <el-button @click="searchformReset"
                   type="info" plain
                   style="color:black;background:none">
          重置
        </el-button>-->

      </el-button-group>

      <div style="float: right;">
        <el-button  @click="back" type="info"  style="color:black;background:none" plain><i class="el-icon-search"></i>返回</el-button>
        <!--<el-button @click="searchformSubmit"-->
                   <!--type="primary" plain><i class="el-icon-search"></i>查询</el-button>-->
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
                         label="计划年份"
                         prop="years" show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column :min-width="200"
                         align="center"
                         label="项目简称"
                         prop="projectOmit" show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="项目名称"
          prop="projectName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="120"
          align="center"
          label="所属单位"
          prop="companyBuiltName"
          show-overflow-tooltip
        >
          <!--<template slot-scope="scope">{{-->
            <!--scope.row.checkfinishTime | dateformat-->
            <!--}}</template>-->
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程行业类别"
          prop="projectTypeSecond"
          show-overflow-tooltip
        >
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>填报类型</span>-->
            <!--<div>-->
              <!--<el-input style=" width: 100%" v-model="searchform.monthReportType" size="mini"/>-->
            <!--</div>-->
          <!--</template>-->
          <!--<template  slot-scope="scope">-->
            <!-- {{scope.row.monthReportType=='1'?'工程公司':scope.row.monthReportType=='2'?'局指挥部':'全部'}}-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="本年计划完成产值"
          prop="yearValue"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报类型"
          prop=""
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报人"
          prop="createUserName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报时间"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
          scope.row.createTime | dateformat
          }}</template>
        </el-table-column>
        <el-table-column :width="150"
                         align="center"
                         label="审核状态"
                         prop="flowStatus" show-overflow-tooltip
        >
          <template slot-scope="scope">
               <div>{{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核驳回':'未创建'}}
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
    </div>
    <el-dialog :title="addTitle" :visible.sync="showYMDialog" append-to-body @close="closeAdd">
      <div>
        <div>
          <table>
            <tr>
              <td><span style="color: red;font-weight:bold">*</span>填报时间:</td>
              <td style="width:70%;text-align:left;padding:10px">
                <el-date-picker
                  v-model="form1.year"
                  type="year"
                  format="yyyy"
                  value-format="yyyy"
                  placeholder="填报时间">
                </el-date-picker>
              </td>
            </tr>
            <!--    <tr>
                     <td><span style="color: red;font-weight:bold">*</span>填报月:</td>
                     <td style="width:70%;text-align:left;padding:10px">
                        <el-date-picker
                             v-model="form1.month"
                              type="month"
                              format="MM"
                               value-format="MM"
                             placeholder="填报月">
                           </el-date-picker>
                     </td>
               </tr>-->
          </table>
        </div>
        <div style="text-align:right;margin-top:10px">
          <el-button @click="submit" type="primary">确认</el-button>
          <el-button @click="closeAdd" type="primary">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: 'proposal-list-look',
    components: {

    },
    data() {
      return {
        p:JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        userdata:{},
        mrTime:'',
        showYMDialog:false,
        addTitle:'选择填报年',
        form1:{
          year:''
        },
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          projectId:""
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
          },
          {
            detailPrjStaName:'正在开展',
            id:'正在开展'
          }, {
            detailPrjStaName:'未开工',
            id:'未开工'
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
      // 返回上一页
      back() {
        if(this.p.fromPath){
          this.$router.push({
            path: this.p.fromPath,
          })
        }else{
          this.$router.back()
        }
      },
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
        this.type = 'add';
        this.showYMDialog=true;

      },
      //未上报批量填0
      batchT(){
        this.showTqDialog=true;
      },
      submit(){
        if(this.form1.year==''||this.form1.year==null){
          this.$message.error("请选择填报年份");
          return false;
        }
        var canAdd=true;
        this.data.forEach((item)=>{
          console.log(item.years,this.form1.year)
          if(item.years==this.form1.year){
            canAdd=false;
            this.$message.error("该年份已经填报过计划,不能再填");
            return false;
          }
        });
        if(!canAdd){
          return false;
        }
        this.type = 'add';
        let p = {
          actpoint: 'add', reportYear:this.form1.year,projectId:this.p.params.uuid
        };
        this.$router.push({
          path: '../projectDetail/',
          query: {p: this.$utils.encrypt(JSON.stringify(p))}
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
          if(item.flowStatus!='edit'&&item.flowStatus!=null&&item.flowStatus!='reject'){
            this.$message.info('只允许删除未上报的数据！');
            return itemStatus=false;
          }else{
            uuids.push(item.uuid);
          }
          if(itemStatus){
            this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http
                  .post(
                      '/api/statistics/yearPlan/list/delete',
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
          this.$message.info('请选择需要编辑的数据', '提示');
          return false;
        }
        if (this.multipleSelection.length >1) {
          this.$message.info('请选择一条数据，进行编辑', '提示');
          return false;
        }
        // if(this.multipleSelection[0].projectId!=''&&this.multipleSelection[0].projectId!=null){
        //   this.$message.info('不允许对下级进行任何操作', '提示');
        //   return false;
        // }
       if(this.multipleSelection[0].flowStatus==''&& this.multipleSelection[0].flowStatus==null &&this.multipleSelection[0].flowStatus!='edit'&&this.multipleSelection[0].flowStatus!='reject'){
          this.$message.info('只允许修改草稿和审核驳回状态的数据', '提示');
          return false;
        }
          if((this.multipleSelection[0].flowStatus==''||this.multipleSelection[0].flowStatus==null) && (this.multipleSelection[0].projectId!=''||this.multipleSelection[0].projectId!=null)){
            this.$message.info('该项目月报还未进行创建，无法进行操作', '提示');
            return false;
          }else{
            this.type = 'edit';
            this.form1 = JSON.parse(JSON.stringify(this.multipleSelection[0]));
            let p = {
              actpoint: 'edit', reportYear:this.multipleSelection[0].years,projectId:this.multipleSelection[0].projectId,uuid:this.multipleSelection[0].uuid
            };
            this.$router.push({
              path: '../projectDetail/',
              query: {p: this.$utils.encrypt(JSON.stringify(p))}
            });
          }

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
        this.searchform.projectId=this.p.params.uuid;
        this.$http
            .post('/api/statistics/yearPlan/list/loadPageData', this.searchform)
            .then(res => {
              this.data = res.data.data.records;
            });
      },
      rowShow(row) {
        let p = {
          actpoint: 'look', reportYear: row.years, projectId: row.projectId, uuid: row.uuid
        };
        this.$router.push({
          path: '../projectDetail/',
          query: {p: this.$utils.encrypt(JSON.stringify(p))}
        });
      }
    },
    created() {
      // let that = this;
      // that.getdatatime();
      this.getData();
      this.userdata=JSON.parse(sessionStorage.getItem('userdata'));
    }

  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
</style>
