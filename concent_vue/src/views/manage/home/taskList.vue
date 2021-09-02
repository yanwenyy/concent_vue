<template>
  <div>
    <div style="margin-top: 10px">
      <el-tabs v-model="activeName" @tab-click="getData(activeName)">
        <el-tab-pane label="待办" name="first">
          <div class="dbTabel">
            <el-button class="sub-btn" @click="submit" plain type="primary"><i class="el-icon-plus"></i>批量审核</el-button>
            <el-table
              class="tableStyle"
              :max-height="$tableHeight"
              :height="$tableHeight"
              :data="page.records"
              :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
              border
              @row-click="rowshow"
              @selection-change="handleSelectionChange"
              highlight-current-row
              ref="table"
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
                :width="300"
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
              class="tableStyle"
              :max-height="$tableHeight"
              :height="$tableHeight"
              :data="page.records"
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
                :width="300"
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
                  <el-button type="text" :disabled="scope.row.reCall==false" @click.stop="withdraw(scope.row)">撤回</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-pagination
      :current-page="page.current"
      :page-size="page.size"
      :page-sizes="[20, 50, 100]"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    // inject:['reload'],
    data() {
      return {
        activeName:'first',
        page: {current: 1, size: 20, total: 0, records: []},
        searchform: {
          current: 1,
          size: 20,
          sorts:[],
          condition:{
            systemSource:'contract'
          }
        },
      };
    },
    methods: {
      //批量审核
      submit(){
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择一条记录进行审核操作！");
          return false;
        }
        this.$confirm(`确认审核这些数据吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http
            .post(
              "/api/contract/topInfo/Verify/commonProcess/complete",
              JSON.stringify(this.multipleSelection), {useJson: true}

            )
            .then((res) => {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.getData()
            });
        }).catch(() => {})
      },
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
          if(val.businessId.indexOf("-sale")!=-1){
            url='/api/contract/contract/ContractInfo/saleChangeProcess/recall'
          }else{
            url='/api/contract/contract/ContractInfo/changeProcess/recall'
          }
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
      // 修改
      totop() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let p = {actpoint: "edit", instid: this.multipleSelection[0].topOrgId};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
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
          var id='',url='',datas={};
          if(row.businessId.indexOf("-sale")!=-1){
            id=row.businessId.split("-sale")[0];
            url='/api/contract/contract/ContractInfo/detail/saleEntityInfoById';
            datas={
              id:id
            }
          }else{
            id=row.businessId;
            url='/api/contract/contract/ContractInfo/detail/entityInfoByBeforeAndAfterId';
            datas={
              uuid:id
            }
          }
          this.$http
            .post(url, datas)
            .then((res) => {
            var datas=res.data.data;
              if(row.businessId.indexOf("-sale")!=-1){
                url=this.$utils.getUrl["contract_contract_new@"+datas.contractInfo.moduleId];
              }else{
                url=this.$utils.getUrl[row.businessType+"@"+datas[0].contractInfo.moduleId];
              }

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
      handleSizeChange(val) {
        this.searchform.size = val;
        this.getData(this.activeName);
      },
      handleCurrentChange(val) {
        this.searchform.current = val;
        this.getData(this.activeName);
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询
      getData(type) {
        this.page.records=[];
        var url='';
        if(type=='first'){
          url='/jsonapi/Workflow/process/todo/list';
        }else{
          url='/jsonapi/Workflow/process/done/list';
        }
        //代办列表
        this.$http
          .post(
            url,
            this.searchform,
            {useJson: true,isLoading:false}
          )
          .then((res) => {
          this.page = res.data.data;
        });
      },
    },
    created() {
      this.getData(this.activeName);
    }
  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
  .add-group .new-add-btn{
    border-radius: 0;
  }
  .tableStyle{
    min-height:calc(100vh - 166px)!important;
    max-height:calc(100vh - 166px)!important ;
  }
  .sub-btn{
    float: right;
    margin-bottom: 10px;
  }
</style>
