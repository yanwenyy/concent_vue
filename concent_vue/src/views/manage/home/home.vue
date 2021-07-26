<template>
  <div class="home-body">
    <div class="home-card">
      <el-card class="box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="待办" name="first">
            <div class="dbTabel">
              <el-table
                class="tabel-list"
                :data="page.records"
                :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
                border
                highlight-current-row
                @row-click="rowshow"
                ref="table"
                tooltip-effect="dark"
              >
                <el-table-column
                  :width="70"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column
                  :width="200"
                  label="任务名称"
                  prop="businessName"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span class="blue pointer">{{scope.row.businessName}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :width="150"
                  align="center"
                  label="任务类型"
                  prop="taskType"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  :width="150"
                  align="center"
                  label="申请单位"
                  prop="applyProvider"
                  show-overflow-tooltip

                >
                </el-table-column>
                <el-table-column
                  :width="150"
                  align="center"
                  label="申请人"
                  prop="applier"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  :width="150"
                  align="center"
                  label="提交时间"
                  prop="applyTime"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  :width="150"
                  align="center"
                  label="流程状态"
                  prop="taskName"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已办" name="second">
            <div class="dbTabel">
              <el-table
                class="tabel-list"
                :data="page2.records"
                :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
                border
                @row-click="rowshow"
                highlight-current-row
                ref="table"
                tooltip-effect="dark"
              >
                <el-table-column
                  :width="70"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column
                  :width="200"
                  label="任务名称"
                  prop="businessName"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span class="blue pointer">{{scope.row.businessName}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :width="150"
                  align="center"
                  label="任务类型"
                  prop="taskType"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  :width="150"
                  align="center"
                  label="当前审批人"
                  prop="currentApprover"
                  show-overflow-tooltip

                >
                </el-table-column>
                <el-table-column
                  :width="150"
                  align="center"
                  label="流程状态"
                  prop="taskName"
                  show-overflow-tooltip

                >
                </el-table-column>
                <el-table-column
                  :width="150"
                  align="center"
                  label="申请人"
                  prop="applier"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  :width="150"
                  align="center"
                  label="操作"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-button type="text" :disabled="scope.row.reCall==false" @click="withdraw(scope.row)">撤回</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="inline-block more" @click="$router.push({path:'/manage/home/taskList'})">更多</div>
      </el-card>
    </div>
    <div class="home-card">
      <el-card class="box-card">
        <el-tabs>
          <el-tab-pane label="提示信息">
            <div class="dbTabel">

            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName:'first',
        page: {current: 1, size: 20, total: 0, records: []},
        page2: {current: 1, size: 20, total: 0, records: []},
        searchform: {
          current: 1,
          size: 10,
          sorts:[],
          condition:{
            systemSource:'contract'
          }
        },
      }
    },
  methods: {
    //撤回
    withdraw(val){
      var url='';
      if(val.businessType=='contract_project_new'){
        url='/api/contract/topInfo/TopInfor/process/recall'
      }else  if(val.businessType=='contract_project_change'){
        url='/api/contract/topInfo/TopInfor/changeProcess/recall'
      }else  if(val.businessType=='contract_contract_new'){
        url='/api/contract/contract/ContractInfo/process/recall'
      }else  if(val.businessType=='contract_qual_new'){
        url='/api/contract/topInfo/Verify/process/recall'
      }else  if(val.businessType=='contract_bid_new'){
        url='/api/contract/topInfo/BidInfo/process/recall'
      }else  if(val.businessType=='contract_qual_change'){
        url='/api/contract/topInfo/Verify/changeProcess/recall'
      }else  if(val.businessType=='contract_bid_change'){
        url='/api/contract/topInfo/BidInfo/changeProcess/recall'
      }else  if(val.businessType=='contract_contract_change'){
        url='/api/contract/contract/ContractInfo/changeProcess/recall'
      }else  if(val.businessType=='contract_bid_register'){
        url='/api/contract/topInfo/BidInfo/bidProcess/recall'
      }else  if(val.businessType=='contract_file_manager'||val.businessType=='contract_file_message'||val.businessType=='contract_file_statistical'){
        url='/api/contract/archives/ArchivesInfo/process/recall'
      }else  if(val.businessType=='contract_cut_exam'){
        url='/api/contract/contractInfoCut/process/recall'
      }
      this.$http
        .post(
          url,
          JSON.stringify(val),
          {useJson: true}
        )
        .then((res) => {
        if (res.data.code === 200) {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.getData(this.activeName);
      }
    });
    },
    // 查询
    getData() {
      //代办列表
      this.$http
        .post(
          "/jsonapi/Workflow/process/todo/list",
          this.searchform,
          {useJson: true}
        )
        .then((res) => {
        this.page = res.data.data;
      });
      //已办列表
      this.$http
        .post(
          "/jsonapi/Workflow/process/done/list",
          this.searchform,
          {useJson: true}
        )
        .then((res) => {
        this.page2 = res.data.data;
    });
    },
    // 查看
    rowshow(row) {
      let p = {actpoint: "task", task: row,instid:row.businessId};
      var url='';
      if(row.businessType=='contract_contract_new'){
        this.$http
          .post("/api/contract/contract/ContractInfo/detail/entityInfo", {id:row.businessId})
          .then((res) => {
          var datas=res.data.data;
          url=this.$utils.getUrl[row.businessType+"@"+datas.contractInfo.moduleId];
          this.urlGO(p,url)
      });
      }else if(row.businessType=='contract_contract_change'){
        this.$http
          .post("/api/contract/contract/ContractInfo/detail/entityInfoByBeforeAndAfterId", {uuid:row.businessId})
          .then((res) => {
          var datas=res.data.data;
          url=this.$utils.getUrl[row.businessType+"@"+datas[0].contractInfo.moduleId];
          this.urlGO(p,url)
      });
      }else{
        url=this.$utils.getUrl[row.businessType];
        this.urlGO(p,url)
      }
    },
    urlGO(p,url){
      this.$router.push({
        path: url,
        query: {p: this.$utils.encrypt(JSON.stringify(p))},
      });
    },
  },
  created() {
    this.getData();
  }
  }
</script>
<style scoped>
  >>>.el-table--border::after, >>>.el-table--group::after, >>>.el-table::before{
    background-color: transparent;
  }
  .tabel-list{
    overflow: auto;
    max-height: calc(100vh - 280px)!important;
  }
  .dbTabel{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
  .dbTabel >>>.el-button{
    height: auto!important;
    line-height:inherit!important;
  }
  .home-body{
    width: 100%;
    min-height: calc(100vh - 70px)!important;
    box-sizing: border-box;
  }
  .home-card{
    width: 48%;
    height:calc(100vh - 170px);
    display: inline-block;
    margin: 0 1% 10px 0;
    vertical-align: top;
    position: relative;
  }
  >>>.el-card{
    height: 100%;
  }
  >>>.el-tabs__item:nth-child(2){
    padding-left: 20px!important;
  }
  .more{
    color:#409EFF;
    position: absolute;
    top:10px;
    right:20px;
    cursor: pointer;
  }
</style>
