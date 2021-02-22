<!--工程月报-公司月报自揽或工区-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="searchformSubmit"
                   type="primary" plain>查询</el-button>
        <el-button @click="add"
                   type="primary" plain>新增</el-button>
        <el-button @click="edit"
                   type="primary" plain>修改</el-button>
        <el-button @click="del"
                   type="primary" plain>删除</el-button>
        <el-button @click="batchT"
                   type="primary" plain>未上报批量填0</el-button>
        <el-button @click="searchformReset"
                   type="info" plain
                   style="color:black;background:none">
          重置
        </el-button>

      </el-button-group>
    <!--  <div style="float: right;">
        <el-button
          @click="searchformReset"
          type="info"
          plain
          style="color:black;background:none">
          重置
        </el-button>
      </div>-->
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
                         label="填报年月"
                         prop="fillDate" show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>填报年月</span>
            <div>
              <el-date-picker class="list-search-picker" filterable clearable
                              type="month"
                              v-model="searchform.fillDate"
              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <div>{{scope.row.monthValue}}</div>-->
            <div v-if="scope.row.fillDate != null">
              {{
              scope.row.fillDate | monthdateformat
              }}
            </div>
            <div v-else>{{searchform.fillDate | monthdateformat}}</div>
          </template>
        </el-table-column>
        <el-table-column :min-width="200"
                         align="center"
                         label="项目名称"
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
        <el-table-column :min-width="200"
                         align="center"
                         label="项目状态"
                         prop="projectStatusName" show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>项目状态</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.projectStatusName"
                        size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column :width="150"
                         align="center"
                         label="合同总额(万元)"
                         prop="contractAmountTotal" show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>合同总额(万元)</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.contractAmountTotal"
                        size="mini"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column :width="150"
                         align="center"
                         label="本月(万元)"
                         prop="monthValue" show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>本月(万元)</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.monthValue"
                        size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column :width="150"
                         align="center"
                         label="本年(万元)"
                         prop="yearValue" show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>本年(万元)</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.yearValue"
                        size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column :width="150"
                         align="center"
                         label="开累(万元)"
                         prop="totalValue" show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>开累(万元)</span>
            <div>
              <el-input style=" width: 100%"
                        v-model="searchform.totalValue"
                        size="mini"/>
            </div>
          </template>
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
                         prop="status" show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.status==2?'已上报':'未上报'}}
          </template>
          <template slot="header"
                    slot-scope="scope">
            <span>状态</span>
            <div>
              <el-select class="list-search-picker" clearable filterable
                         placeholder="请选择"
                         size="mini"
                         v-model="searchform.status"
              >
                <el-option :key="index"
                           :label="item.detailName"
                           :value="item.id"
                           v-for="(item, index) in flowStatusList"
                ></el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="addTitle" :visible.sync="showTqDialog" append-to-body @close="closeAdd">
        <div>
          <div>
          此操作将为当月所有未上报的项目月报创建当月完成值为0的月报并提交。
          如果项目已经创建了当月月报 则直接提交。
          确认批量填充?
          </div>
          <div style="text-align:right;margin-top:10px">
            <el-button @click="submit" type="primary">是</el-button>
            <el-button @click="closeAdd" type="primary">否</el-button>
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
        treeStatas: false,
        showTqDialog:false,
        addTitle:'请注意!!!!!!',
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
          fillDate:''
        },
        data:[],
        flowStatusList:[
          {
            detailName:'已上报',
            id:'2'
          },
          {
            detailName:'未上报',
            id:'0'
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
        var time1 = new Date(time);
        var time2 = time1.getTime();
      this.searchform.fillDate= time2;
      },
        //新增
      add(){
        //判断是否存在未上报的数据，如果存在就提示，不存在就创建
        if(this.data.length>0){
          for (var i=0; i < this.data.length; i++) {
            if(this.data[i].status !='1'){
              this.$message({
                message: '该单位下存在未提交的月报,请提交该单位下所有项目月报后再进行尝试'
              });
              return false;
            };
          };
        }
        var url = '/api/statistics/projectMonthlyReport/Projectreport/detail/companyMonthlyReportEntityInfo';
        var params = {};
        params.fillDate = this.searchform.fillDate;
        params.reportType='1';
        this.$http.post(
            url,
            JSON.stringify(params),
            {useJson: true}
        ).then((res) => {
          if (res.data.code === 200) {
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
        let p = { actpoint: 'look', uuid: row.uuid };
        this.$router.push({
          path: '',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        });
      },
      //未上报批量填0
      batchT(){
        this.showTqDialog=true;
      },
      //未上报批量填0点击是
      submit(){

      },
      //点击否
      closeAdd() {
        this.showTqDialog = false
        this.query()
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
        var time1 = new Date(this.searchform.fillDate);
        var time2 = time1.getTime();
        this.searchform.fillDate= time2;
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
          projectId:''
        };
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 获取分页数据
      getData() {
        this.$http
            .post('/api/statistics/projectMonthlyReport/Projectreport/list/companyMonthlyReportList', this.searchform)
            .then(res => {
              this.data = res.data.data;
            });
      },
      rowShow(row){
        let mList = {projectId: row.projectId, orgCode: row.createOrgCode,projectName:row.projectName,createOrgId:row.createOrgId,createOrgName:row.createOrgName,
          fillDate:row.fillDate,projectreportuuid:row.projectreportuuid,reportType:row.reportType,createOrgType:row.createOrgType
        };
        this.$router.push({
          path: './companyMDetail/',
          query: {mList: this.$utils.encrypt(JSON.stringify(mList))}
        });

      }
    },
    created() {
      this.getData();
      let that = this;
      that.getdatatime();
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
