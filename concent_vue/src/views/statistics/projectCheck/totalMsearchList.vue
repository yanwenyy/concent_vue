<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <!--<el-form class="search-form" :inline="true" :model="searchform" @keyup.enter.native="init()">
        <el-form-item label="填报年月:">
          <el-date-picker
            v-model="searchform.fillDate"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
      </el-form>-->
      <el-button-group style="float: left">
        <!--<el-button @click="add" plain type="primary"><i class="el-icon-plus"></i>创建</el-button>-->
        <!--<el-button @click="totop" plain type="primary"><i class="el-icon-edit"></i>修改</el-button>-->
        <!--<el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>-->
        <el-button @click="Reply" type="primary" plain><i class="el-icon-edit"></i>批复</el-button>
        <el-button @click="writeOpinion" type="primary" plain><i class="el-icon-edit"></i>填写意见</el-button>
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        <el-button  @click="back" type="info"  style="color:black;background:none" plain><i class="el-icon-search"></i>返回</el-button>
      </div>
    </div>

    <div style="margin-top: 10px">
      <!--row-key="uuid"-->
      <!--:tree-props="{children: 'chirldList', hasChildren: 'hasChildren'}"-->
      <!--lazy-->
      <!--:load="load"-->
      <el-table
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="tableData"
        :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        tooltip-effect="dark"
        default-expand-all
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
          :width="500"
          label="填报单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
       <!--   <template slot="header" slot-scope="scope">
            <span>填报单位</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.createOrgName"
                size="mini"
              />
            </div>
          </template>-->
          <template slot-scope="scope">
            <spam class="blue pointer" v-if="scope.row.reportType != null && scope.row.reportType != ''">
              {{scope.row.createOrgName+"("+(scope.row.reportType==1?'自揽':scope.row.reportType==2?'工区':'')+")"}}
            </spam>
            <span class="blue pointer"v-if="scope.row.reportType== null || scope.row.reportType == ''">
              {{scope.row.createOrgName}}
            </span>
          </template>

        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="年月"
          prop="enginTypeFirstName"
          show-overflow-tooltip
        >
          <template slot="header"
                    slot-scope="scope">
            <span>填报年月</span>
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
            <div v-if="scope.row.reportYear != null && scope.row.reportYear !=''">
              {{
              scope.row.reportYear+"-"+scope.row.reportMonth
              }}
            </div>
            <div v-else>{{mrTime}}</div>
          </template>
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="所属单位"
          prop="companyBelongName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="本月上报产值"
          prop="monthValue"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="本年上报产值"
          prop="yearValue"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="批复状态"
          prop="pfStatus"
          show-overflow-tooltip

        >
<!--          <template slot="header" slot-scope="scope">
            <span>审核状态</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.status"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in flowStatusList"
                ></el-option>
              </el-select>
              &lt;!&ndash;<el-input&ndash;&gt;
              &lt;!&ndash;class="list-search-picker"&ndash;&gt;
              &lt;!&ndash;style=" width: 100%"&ndash;&gt;
              &lt;!&ndash;v-model="searchform.flowStatus"&ndash;&gt;
              &lt;!&ndash;size="mini"&ndash;&gt;
              &lt;!&ndash;/>&ndash;&gt;
            </div>
          </template>-->
          <template slot-scope="scope">
            <div>{{scope.row.pfStatus==1?'已批复':scope.row.pfStatus==0?'未批复':''}}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="填写意见" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="意见" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="批复金额(万元):" :label-width="formLabelWidth">
          <el-input v-model="form.pfMoney" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subOpinion">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    // inject:['reload'],
    //name: "proposal-list-look",
    data() {
      return {
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        dialogFormVisible:false,
        formLabelWidth: '120px',
        form:{},
        Authorization:sessionStorage.getItem("token"),
        page: {current: 1, size: 20, total: 0, records: []},
        mrTime:'',
        tableData: [],
        userdata:{},
        showinput: false,
        sousuo: "",
        searchform: {
          current: 1,
          size: 20,
          uuid:"",
        },
        menus: [],
        multipleSelection: [],
        orgTree: [],
        xqprojectType:[],//工程二级列表
        flowStatusList:[
          {
            detailName:"草稿",
            id:'1'
          },
          {
            detailName:"审核中",
            id:'2'
          },
          {
            detailName:"审核通过",
            id:'3'
          },
          {
            detailName:"审核驳回",
            id:'4'
          },
          {
            detailName:"未创建",
            id:''
          }
        ]
      };
    },
    computed: {

    },
    methods: {
      //批复
      Reply(){
        if (this.multipleSelection.length !=1) {
          this.$message.info("请选择一条记录进行批复操作！");
          return false;
        }
        if (this.multipleSelection[0].pfStatus!=0) {
          this.$message.info("请选择有效数据进行批复操作！");
          return false;
        }
        this.$http
          .post(
            "/api/statistics/engineerMonthlyReport/list/reply",
            JSON.stringify({uuid:this.multipleSelection[0].uuid}),
            {useJson: true,timeout:600000}
          )
          .then((res) => {
           this.getData()
          });
      },
      //填写意见点击
      writeOpinion(){
        // this.multipleSelection[0]
        if (this.multipleSelection.length !=1) {
          this.$message.info("请选择一条记录进行填写操作！");
          return false;
        }
        if (this.multipleSelection[0].pfStatus!=0) {
          this.$message.info("请选择有效数据进行批复操作！");
          return false;
        }
        this.dialogFormVisible=true;
        this.form={
          uuid:this.multipleSelection[0].uuid
        };
      },
      //提交意见
      subOpinion(){
        this.$http
          .post(
            "/api/statistics/engineerMonthlyReport/list/saveOrUpdateSuggestion",
            JSON.stringify(this.form),
            {useJson: true}
          )
          .then((res) => {
            if(res.data.code==200){
              this.dialogFormVisible=false;
              this.getData()
            }else{
              this.$message.error(res.data.msg);
            }

          });
      },
      // 返回上一页
      back() {
        this.$router.back()
      },
      exportdata() {
      },
      load(tree, treeNode, resolve) {
        this.searchform.statisticsProject.uuid=tree.uuid;
        setTimeout(() => {
          this.$http
              .post(
                  "/api/statistics/inspectMonthReportFill/list/queryProject",
                JSON.stringify(this.searchform),
                {useJson: true,timeout:600000}
              )
              .then((res) => {
                var datas=res.data.data.records
                resolve(datas)
              });

        }, 1000)
      },
      getdatatime(){//默认显示今天
        var date = new Date();
        var y = date.getFullYear();
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var time=y + '-' + m;
        this.searchform.yearDateS= time;
        this.mrTime=time;
      },
      search() {
        this.showinput = false;
      },
      queryList(){
        this.searchform.current = 1;
        this.searchform.current = 1;
        if(this.searchform.yearDateS!='' && this.searchform.yearDateS!=null && this.searchform.yearDateS!=undefined){
          this.mrTime=this.searchform.yearDateS;
          this.searchform.reportYear= this.searchform.yearDateS.split("-")[0];
          this.searchform.reportMonth= this.searchform.yearDateS.split("-")[1];
        }
        this.getData();
      },
      //查询项目详细列表
      queryGsXq(row){
        row.reportYear=this.searchform.yearDateS.split("-")[0];
        row.reportMonth=this.searchform.yearDateS.split("-")[1];
        row.yearDateS=this.searchform.yearDateS;
        let p = row;
        this.$router.push({
          path: "./jTMList/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      // 增加
      add() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行创建操作！");
          return false;
        }
        if (this.multipleSelection[0].createOrgCode==this.userdata.managerOrgCode && (this.multipleSelection[0].flowStatus!='' && this.multipleSelection[0].flowStatus!=null)) {
          this.$message.info("本单位月报已经创建！");
          return false;
        }
        if(this.multipleSelection[0].createOrgCode!=this.userdata.managerOrgCode){
          this.$message.info("无权操作下级单位月报！");
          return false;
        }
        //判断是否存在未上报的数据，如果存在就提示，不存在就创建
        if(this.tableData.length>0){
          for (var i=0; i < this.tableData.length; i++) {
            if((this.tableData[i].flowStatus ==''||this.tableData[i].flowStatus ==null)){
              this.$message.info('该单位下存在未提交的月报,请提交该单位下所有项目月报后再进行尝试！')
              return false;
            }
          };
        }
        if (this.multipleSelection[0].createOrgCode==this.userdata.managerOrgCode && (this.multipleSelection[0].flowStatus==''||this.multipleSelection[0].flowStatus==null)) {
          var url = '/api/statistics/projectMonthlyReport/Projectreport/detail/jtReportEntityInfo';
        var params =  this.multipleSelection[0];
        this.$http.post(
            url,
            JSON.stringify(params),
            {useJson: true}
        ).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: '创建成功'
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
        });}
      },
      // 修改
      totop() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
         if(this.multipleSelection[0].createOrgCode!=this.userdata.managerOrgCode){
           this.$message.info("无权操作下级单位数据！");
           return false;
        }
        if (this.multipleSelection[0].createOrgCode==this.userdata.managerOrgCode && (this.multipleSelection[0].flowStatus!='' && this.multipleSelection[0].flowStatus!=null)){
          let p = {actpoint: "edit", params: this.multipleSelection[0]};
          this.$router.push({
            path: "./jTMDetail/",
            query: {p: this.$utils.encrypt(JSON.stringify(p))},
          });
        }


      },
      // 查看
      rowshow(row) {
        let p = { actpoint: 'look', projectId: row.projectId,uuid:row.uuid,reportYear:row.reportYear,reportMonth:row.reportMonth,orgCode:row.createOrgCode,projectName:row.reportProjectName,projectStatus:row.status };
        this.$router.push({
          path: '../totalMsearchDetail/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 删除
      remove() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let uuids = [],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.createOrgCode==this.userdata.managerOrgCode && (item.flowStatus=='1'||item.flowStatus!=''||item.flowStatus=='4'|| item.flowStatus!=null)){
            uuids.push(item.uuid);
          }else{
          this.$message.info("当前所选数据中包含不可删除的选项,请检查后进行操作");
          return itemStatus=false;
        }
      })

        if(itemStatus){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
               '/api/statistics/projectMonthlyReport/Projectreport/list/delete',{ids: uuids}

            )
            .then((res) => {
            this.getData()
        });
        }).catch(() => {})
        }

      },
      // 重新汇总
      summary() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请先选中要生成月报的工程公司！");
          return false;
        }
        if (this.multipleSelection.length > 1) {
          this.$message.info("只能选择一条记录！");
          return false;
        }

        // this.multipleSelection[0].status='3'//集团创建
        // this.multipleSelection[0].flowStatus='3'
        this.multipleSelection[0].projectId=this.multipleSelection[0].createOrgId
        this.multipleSelection[0].reportYear= this.searchform.yearDateS.split("-")[0]
        this.multipleSelection[0].reportMonth= this.searchform.yearDateS.split("-")[1]
        // let datas=this.multipleSelection[0];
        var datas={
          status:'3',
          flowStatus:'3',
          projectId:this.multipleSelection[0].projectId,
          createOrgId:this.multipleSelection[0].createOrgId,
          createOrgCode:this.multipleSelection[0].createOrgCode,
          createOrgName:this.multipleSelection[0].createOrgName,
          createOrgType:this.multipleSelection[0].createOrgType,
          uuid:this.multipleSelection[0].uuid,
          reportYear:this.multipleSelection[0].reportYear,
          reportMonth:this.multipleSelection[0].reportMonth,
          hasChildren:this.multipleSelection[0].hasChildren,
        }
          this.$confirm(`该操作会重新生成工程公司月报 如果该公司已经上报过月报 将被新生成的月报替代 确认重新生成月报?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
                .post(
                    '/api/statistics/projectMonthlyReport/Projectreport/detail/summaryReportM',datas

                )
                .then((res) => {
                  if (res.data.code === 200) {
                    this.$message({
                      message: '汇总成功'
                    });
                    this.getData();
                  }
                });
          }).catch(() => {})

      },
/*      // 展示
      show() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let p = {actpoint: "look", instid: this.multipleSelection[0].uuid};
        this.$router.push({
          path: "../detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      }, */
      // list通用方法开始
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
        this.searchform={
          current: 1,
          size: 20,
          uuid:this.p.projectId
        };
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询
      getData() {
        // if(this.searchform.yearDateS!='' && this.searchform.yearDateS!=null && this.searchform.yearDateS!=undefined) {
        //   this.searchform.reportYear = this.searchform.yearDateS.split("-")[0];
        //   this.searchform.reportMonth = this.searchform.yearDateS.split("-")[1];
        // }
        this.$http
          .post(
            "/api/statistics/inspectMonthReportFill/detail/queryCollect",
            this.searchform
          )
          .then((res) => {
          this.tableData = res.data.data.records;
      });
      },
    },
    mounted() {
      let that = this;
      // that.getdatatime();
      this.searchform.uuid=this.p.projectId;
      this.getData();
      this.userdata=JSON.parse(sessionStorage.getItem('userdata'))
    },
  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
  .add-group .new-add-btn{
    border-radius: 0;
  }
  .search-form{
    display: inline-block;
    float: left;
  }
  .search-form >>>.el-form-item{
    margin-bottom: 0;
  }
  .search-form >>>.el-form-item__content,.search-form >>>.el-form-item__label{
    line-height: 30px;
  }
  .search-form{
    display: inline-block;
    float: left;
  }
  >>>.search-form .el-form-item__label{
    width:auto;
  }
  >>>.search-form .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  >>>.el-icon-date{
    line-height: 30px;
  }
</style>
