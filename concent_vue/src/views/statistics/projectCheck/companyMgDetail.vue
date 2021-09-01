<!--工程月报验工计价公司月报自揽或工区详情-->
<template>
  <div style="position: relative">
      <div style="margin-top: 9px;color: red;position: absolute;top: 1px;right: 279px;z-index: 999999999;font-size: 15px;">项目名称：<span style="color: red !important;margin-right: 50px;">{{projectName}}</span></div>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||dataReport.flowStatus=='edit'||dataReport.flowStatus=='reject')" @click="save('sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
      <el-button  @click="back" type="primary"  class="detailbutton detail-back-tab " plain>返回</el-button>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="整体进度" name="ztjd">
        <div class="detailBox">
          <el-form
            :inline="false"
            :model="dataReport"
            class="gcform"
          >
            <el-form-item
              label="报表年月:"
            ><el-input v-model="dataReport.yearDateS" disabled ></el-input>
            </el-form-item>
            <el-form-item
              label="所属单位:"
            ><el-input v-model="dataReport.createOrgName" disabled></el-input>
            </el-form-item>
            <el-form-item
              label="项目名称:"
            ><el-input v-model="dataReport.projectName" disabled></el-input>
            </el-form-item>
            <div>
              <el-form-item
                label="本月备注:"
              ><el-input  :disabled="actpoint!='look'" v-model="dataReport.thisPlan" type="textarea" disabled></el-input>
              </el-form-item>
            </div>
            <!--<div>
            <el-form-item
              label="完成情况:"
            ><el-input :disabled="isCk=='1'" v-model="dataReport.finishedPlan" type="textarea" ></el-input>
            </el-form-item>
            </div>-->
            <div>
              <el-form-item
                label="上月备注:"
              ><el-input :disabled="actpoint!='look'" v-model="dataReport.nextPlan" type="textarea" disabled></el-input>
              </el-form-item>
            </div>
            <p>
              <span>上传附件: </span>
              <el-button
                class="detatil-flie-btn"
                size="small"
                type="primary"
                :disabled="actpoint=='look'"
                @click="openFileUp('/api/statistics/projectCheck/CommonFiles/projectCheck/01/uploadFile','fileList')">
                点击上传

              </el-button>
            </p>
            <el-table
              :data="commonFilesList"
              :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
              align="center"
              border
              class="detailTable"
              ref="table"
              style="width: 100%;height: auto;"
            >
              <el-table-column
                :width="55"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>
              <el-table-column align="center"  :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

              </el-table-column>

              <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{(scope.row.fileSize/1024).toFixed(2)}}
                </template>
              </el-table-column>
              <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

              </el-table-column>

              <el-table-column
                align="center"
                :resizable="false"
                fixed="right"
                label="操作"
                show-overflow-tooltip
                width="80"
              >
                <template slot-scope="scope">
                  <el-link :underline="false" @click="handleRemove1(scope.row,scope.$index)" type="warning">删除</el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="产值(验工计价)" name="cwjswgcl">
        <div class="detailBoxBG">
          <el-table
            class="tableStyle"
            :max-height="$tableHeight"
            :height="$tableHeight"
            :data="data"
            :key="key"
            :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"

            tooltip-effect="dark"
          >
            <el-table-column
              :width="50"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :width="250"
              align="left"
              label="统计项名称"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div :class="vnameMarginLeft(scope.row.tjxCode,scope.row.veditable)">{{scope.row.tjxName}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="90"
              align="center"
              prop="jldw"
              label="计量单位"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>{{scope.row.jldw}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本月计划"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>{{scope.row.monthPlan}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本月合计"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.monthValue}}
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本月计价额"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-if="scope.row.veditable == '1' && actpoint!='look' ">
                  <el-input v-model="scope.row.valuationFee" @input="scope.row.value = scope.row.valuationFee.replace(/[^\-?\d.]/g,'','')" @blur="getYear(data,scope.$index,scope.row.sumTarget)"/>
                </div>
                <div  v-if="scope.row.veditable != '1'">{{scope.row.valuationFee}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本月税额"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-if="scope.row.veditable == '1' && actpoint!='look' ">
                  <el-input v-model="scope.row.taxFee"  @input="scope.row.value = scope.row.taxFee.replace(/[^\-?\d.]/g,'','')" @blur="getYearSe(data,scope.$index,scope.row.sumTarget)"/>
                </div>
                <div  v-if="scope.row.veditable != '1'">{{scope.row.taxFee}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本年计划"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>{{scope.row.yearPlan}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本年合计"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>{{scope.row.yearValue}}</div>
                <!-- <el-input style="text-align: right"  v-model="scope.row.yearValue" :disabled="scope.row.yearValue=='0'" size="mini"/>-->
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本年计价额"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>{{scope.row.yearValuationFee}}</div>
                <!-- <el-input style="text-align: right"  v-model="scope.row.yearValue" :disabled="scope.row.yearValue=='0'" size="mini"/>-->
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本年税额"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>{{scope.row.yearTaxFee}}</div>
                <!-- <el-input style="text-align: right"  v-model="scope.row.yearValue" :disabled="scope.row.yearValue=='0'" size="mini"/>-->
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本年%"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-if="scope.row.yearPlan&&scope.row.yearValue">{{Math.round(scope.row.yearPlan /scope.row.yearValue) / 100+"%"}}
                </div>
                <div v-if="scope.row.yearRate!=null">{{scope.row.yearRate+"%"}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="总设计量"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>{{scope.row.totalPlan}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="开累合计"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>{{scope.row.totalValue}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="开累计价额"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>{{scope.row.totalValuationFee}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="开累税额"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>{{scope.row.totalTaxFee}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="开累%"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-if="scope.row.totalPlan && scope.row.totalValue">{{Math.round(scope.row.totalPlan /scope.row.totalValue) / 100+"%"}}
                </div>
                <div v-if="scope.row.totalRate!=null">{{scope.row.totalRate+"%"}}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="dataReport.flowStatus!='edit'&&(p.actpoint == 'task'||p.actpoint == 'look')">
        <Audit-Process :task="p.task||{businessId:p.uuid,businessType:'emr_valuation'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
  import AuditProcess from '@/components/auditProcess'
  export default {
    name: 'reportM-all-detail',
    components: {
      AuditProcess
    },
    data() {
      return {
        userdata:JSON.parse(sessionStorage.getItem('userdata')),
        key:0,
        data:[],
        dataReport:{
        },
        nextData:[],
        commonFilesList:[],
        yearDateS:'',
        activeName:"ztjd",
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        proNameHover: false,
        projectName: JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectName,
        actpoint: JSON.parse(this.$utils.decrypt(this.$route.query.p)).actpoint,
        projectreport: {},
        projectreportDetaiList: [],
        planPrjTjxDetailList: [],
        projectStatus: JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectStatus,
      }
    },
    computed: {
      vnameMarginLeft() {
        return (vcode, veditable) => {
          var vnameClass = ''
          if (vcode && veditable) {
            if (veditable === '1') {
              vnameClass += 'editable'
            }
            if (vcode.length === 6) {
              vnameClass += ' margin-left-25'
            } else if (vcode.length === 9) {
              vnameClass += ' margin-left-50'
            } else if (vcode.length === 12) {
              vnameClass += ' margin-left-75'
            } else if (vcode.length === 15) {
              vnameClass += ' margin-left-100'
            }
          }
          return vnameClass
        }
      }
    },
    methods: {
      //设置当年的完成值
      getYear(list,index,code){
        var num=0;
        var num1=0;
        var num2=0;
        list[index].yearValue=list[index].oldYearValue?Number(list[index].oldYearValue)+Number(list[index].monthValue):list[index].monthValue;
        list[index].totalValue=list[index].oldTotalValue?Number(list[index].oldTotalValue)+Number(list[index].monthValue):list[index].monthValue;
        list[index].yearRate=Math.round(Number(list[index].yearPlan) /Number(list[index].yearValue)) / 100;
        list[index].monthRate=Math.round(Number(list[index].monthPlan) /Number(list[index].monthValue)) / 100;
        list[index].totalRate=Math.round(Number(list[index].totalPlan) /Number(list[index].totalValue)) / 100;
        console.log(list[index])
        list.forEach((item,i)=>{
          if(item.sumTarget==code) {
            num= Number(item.monthValue)+num;
            num1=Number(item.yearValue)+num1;
            num2=Number(item.totalValue)+num2;
          }
        });
        this.data.forEach((item,i)=>{
          if(item.tjxCode==list[index].sumTarget){
            item.monthValue=num;
            item.yearValue=num1;
            item.totalValue=num2;
          }
        });
      },
      getPlanYear(list,index,code){
        var num=0;
        list.forEach((item,i)=>{
          if(item.sumTarget==code) {
            num= Number(item.value)+num;
          }
        });
        this.data.forEach((item,i)=>{
          if(item.tjxCode==list[index].sumTarget){
            item.value=num;
          }
        });
      },
      getNextPlanYear(list,index,code){
        var num=0;
        list.forEach((item,i)=>{
          if(item.sumTarget==code) {
            num= Number(item.value)+num;
          }
        });
        this.nextData.forEach((item,i)=>{
          if(item.tjxCode==list[index].sumTarget){
            item.value=num;
          }
        });
      },
      // 保存
      save(type) {
        // this.dataReport.status="1"
        // this.dataReport.flowStatus="1"
        let tableData = {
          projectReportDetaiList:this.data,
          projectreport:this.dataReport,
          planPrjTjxDetailList:this.nextData
        }
        var url='';
        if(type=='save'){
          url="/api/statistics/projectMonthlyReport/Projectreport/detail/saveOrUpdate"
          this.$http
            .post(url, JSON.stringify(tableData), {useJson: true})
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message:  `${type=='save'?'保存':'提交'}成功`,
                  duration: 1000,
                  type: 'success',
                  onClose: () => { this.$router.back() }
                })
              }
            })
        }else{
          url="/api/statistics/projectMonthlyReport/Projectreport/process/start";
          var sj=new Date().toLocaleDateString().split('/');
          // sj[1]=sj[1]<10?'0'+sj[1]:sj[1];
          this.$http
            .post('/api/statistics/projectMonthlyReport/ReportEndtime/detail/checkReportTime',
              JSON.stringify({
                'restrictedobjectsType':this.userdata.managerOrgType,
                'reportType':'2',
                'endreporttime':sj[2],
              }),
              {useJson: true})
            .then(res => {
              if (res.data.data=='0') {
                this.$http
                  .post(url, JSON.stringify(tableData), {useJson: true})
                  .then(res => {
                    if (res.data.code === 200) {
                      this.$message({
                        message:  `${type=='save'?'保存':'提交'}成功`,
                        duration: 1000,
                        type: 'success',
                        onClose: () => { this.$router.back() }
                      })
                    }
                  })
              }else{
                this.$message.error('当前月报已经过了上报截止日期,不能提交!')
              }
            })
        }


      },
      submit() {
        this.dataReport.status="2"
        let tableData = {
          projectReportDetaiList:this.data,
          projectreport:this.dataReport,
          planPrjTjxDetailList:this.nextData
        }
          this.$http
            .post('/api/statistics/projectMonthlyReport/Projectreport/detail/saveOrUpdate', JSON.stringify(tableData), {useJson: true})
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '提交成功',
                  duration: 1000,
                  type: 'success',
                  onClose: () => { this.$router.back() }
                })
              }
            })
      },
  /*    rollback() {
        this.$http
          .post('/api/statistics/PlanProjectTjx/detail/save', JSON.stringify({uuid: this.p.planInfo.planId, status: 0}), {useJson: true})
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '回退成功',
                duration: 1000,
                onClose: () => { this.$router.back() }
              })
            }
          })
      },*/
      // 返回上一页
      back() {
        this.$router.back()
      },
      // 获取数据
      getData() {
        this.$http
          .post('/api/statistics/Projectcheck/detail/queryEntityInfoDetail', JSON.stringify({
            projectId: this.p.projectId,
            uuid: this.p.uuid,
            reportYear: this.p.reportYear,
            reportMonth:this.p.reportMonth,
            createOrgCode: this.p.orgCode
          }), {useJson: true})
          .then(res => {
            this.data = res.data.data.tjxDetailList
            this.dataReport=res.data.data.projectcheck
            this.dataReport.yearDateS=this.dataReport.reportYear+"-"+this.dataReport.reportMonth
            this.dataReport.projectName=JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectName
            this.commonFilesList=res.data.data.commonFilesList
          })
      }
    },
    created() {

    },
    mounted() {
      this.getData()
    }
  }
</script>
<style lang="scss" scoped>
  .two-left{
    margin-left: 50px!important;
  }
  .two-left{
    margin-left: 100px!important;
  }
  .detail-back-tab{
    padding: 10px 20px ;
    border:1px solid #ddd;
    color: black;
    position: absolute;
    top:1px;
    right:15px;
    z-index: 999999999;
    background: #fff;
  }
  .save-btn{
    right: 95px;
    background: #409EFF;
    color:#fff;
  }
  .sub-btn{
    right: 175px;
  }
  .btn-group{
    text-align: center;
    margin-top: 20px;
  }
  .gcform {
     margin-top: 10px;
     >>>.el-form-item__label:before {
       position: initial;
       left: -10px;
     }
     >>>.el-form-item__error {
       padding-top: 0px;
       width: 95%;
       margin-left: 0;
       text-align: right;
       top: 0%;
     }
   >.el-form-item,>>>.formItem{

         display: inline-block;
         width: 32.5%!important;
       }
  .div-item >>>.el-form-item{
       display: inline-block;
       width: 32.5%!important;
     }
     .detailformfooter1 {
       margin-top: 5px;
       width: 100%;
       .el-button {
         margin: 0 30px;
         width: 140px;
         height: 42px;
         font-size: 18px;
         font-family: Microsoft YaHei;
       }
       .el-button--primary {
         background: #5c8bfa;
       }
       .el-button--default {
         border: 1px solid #5c8bfa;
         color: #5c8bfa;
       }
     }
     .errorMsg >>>.el-form-item__label {
       color: red;
     }
     >>>.el-input {
       width: 300px;
     }
     >>>.el-input >>>.el-input_inner {
       width: 300px;
       height: 500px;
     }
  }

  .el-input .el-input_inner {
    width: 300px;
    height: 500px;
  }

  .el-table thead.is-group th {
    background: #fff;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .el-card__body {
    /*padding: 0 100px;*/
    // height: 400px;
    // border: 1px solid black;
    // height: 200px;
  }

/*  >>>.el-input--mini .el-input__inner {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    // margin: 10px 0 0 10px;
  }*/

  .gcform >>>.el-input {
    width: 95%;
  }
  .listInput{
    width: auto!important;
  }
  .gcform .listInput input{
    width: 100px!important;
    padding:10px!important;
    box-sizing: border-box;
  }
  .neirong {
    width: 100% !important;
  }

  .gcform >>>.el-form-item {
    margin-bottom: 0px;
  }

  .neirong >>>.el-input--mini .el-input__inner {
    height: 100px;
  }

  .detail_bottom {
    margin: 20px 0 0 0;
    // border: 1px solid #ddd;
  }

  .el-card,
  .el-message {
    overflow: hidden;
  }

  .el-scrollbar__wrap.default-scrollbar__wrap {
    overflow: hidden;
  }

  .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    overflow: auto;
    // height: 500px ;
    /*height: 44vh;*/
  }

  .el-button--mini,
  .el-button--mini.is-round {
    margin: 0 27px 5px 0;
  }

  .el-table--border {
    min-height: auto !important;
  }
  /deep/ .el-input__inner{
    height: 25px;
    text-align: right;
    padding-right:2px;
  }
  .margin-left-25{
    margin-left: 25px;
  }
  .margin-left-50{
    margin-left: 50px;
  }
  .margin-left-75{
    margin-left: 75px;
  }
  .margin-left-100{
    margin-left: 100px;
  }
  .editable{
    color: #0e45a1;
  }
  /deep/ .el-collapse-item__header{
    height:35px !important;
    ling-height:35px !important;
  }

  /deep/ .el-collapse-item__content{
    padding-bottom: 5px !important;
  }
  /deep/ .el-input__inner{
    height: 25px;
    text-align: right;
    padding-right:2px;
  }
  /*按钮样式*/
  .detail-back-tab{
    padding: 10px 20px ;
    border:1px solid #ddd;
    color: black;
    position: absolute;
    top:1px;
    right:15px;
    z-index: 999999999;
    background: #fff;
  }
  .save-btn{
    right: 95px;
    background: #409EFF;
    color:#fff;
  }
  .sub-btn{
    right: 95px!important;
  }
  /**/
</style>
