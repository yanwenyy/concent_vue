<!--集团月报详情-->
<template>
  <div style="position: relative">
    <!--<el-button  @click="save" v-if="dataReport.status!='1'" type="primary"  class="detailbutton detail-back-tab" style="float: left; margin-right: 185px;"plain>保存</el-button>-->
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||dataReport.flowStatus=='edit'||dataReport.flowStatus=='reject')" @click="save('sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button  @click="back" type="primary"  class="detailbutton detail-back-tab " plain>返回</el-button>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane v-if="projectList.uuid!=''&& projectList.uuid!=null" label="整体进度" name="ztjd">
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
            >
              <div v-if="dataReport.reportProjectName==''">
                <el-input v-model="dataReport.reportProjectName" disabled></el-input>
              </div>
              <div v-else>
                <el-input v-model="projectName" disabled></el-input>
              </div>
            </el-form-item>
            <div>
              <el-form-item
                label="本月计划:"
              ><el-input  :disabled="p.actpoint=='look'" v-model="dataReport.thisPlan" type="textarea" ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item
                label="完成情况:"
              ><el-input :disabled="p.actpoint=='look'" v-model="dataReport.finishedPlan" type="textarea" ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item
                label="下月计划:"
              ><el-input :disabled="p.actpoint=='look'" v-model="dataReport.nextPlan" type="textarea" ></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="产物及实物工程量" name="cwjswgcl">
        <div class="detailBoxBG table-div">
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
            :row-class-name="tableRowClassName"
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
                <div :title="scope.row.tjxCode=='002009004'?'房建折合面积 = 本月完成产值/工程合同额*建筑面积':scope.row.tjxCode=='002009001'?'房建新开工面积 = 房建施工面积':scope.row.tjxCode=='002009001001'?'其中:新开工面积 = 房建施工面积投标承包面积中的当年新开工面积':''" :class="vnameMarginLeft(scope.row.tjxCode,scope.row.veditable)">{{scope.row.tjxName}}</div>
                <!--                        <div :class="scope.row.tjxCode.length>3&&scope.row.tjxCode.length<6?'':''">{{scope.row.tjxName}}</div>-->
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
              label="本月完成"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="textRight">{{scope.row.monthValue}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本月计划"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="textRight">{{scope.row.monthPlan}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本月%"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="textRight" v-if="scope.row.monthPlan&&scope.row.monthValue">{{Math.round(scope.row.monthPlan /scope.row.monthValue) / 100+"%"}}
                </div>
                <div class="textRight" v-if="scope.row.monthRate!=null">{{scope.row.monthRate+"%"}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本年完成"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="textRight">{{scope.row.yearValue}}</div>
                <!-- <el-input style="text-align: right"  v-model="scope.row.yearValue" :disabled="scope.row.yearValue=='0'"  />-->
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本年计划"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="textRight">{{scope.row.yearPlan}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="本年%"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="textRight" v-if="scope.row.yearPlan&&scope.row.yearValue">{{Math.round(scope.row.yearPlan /scope.row.yearValue) / 100+"%"}}
                </div>
                <div class="textRight" v-if="scope.row.yearRate!=null">{{scope.row.yearRate+"%"}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="showKL"
              :width="150"
              align="center"
              label="开累完成"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="textRight">{{scope.row.totalValue}}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="showKL"
              :width="150"
              align="center"
              label="开累计划"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="textRight">{{scope.row.totalPlan}}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="showKL"
              :width="150"
              align="center"
              label="开累%"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="textRight" v-if="scope.row.totalPlan&&scope.row.totalValue">{{Math.round(scope.row.totalPlan /scope.row.totalValue) / 100+"%"}}
                </div>
                <div class="textRight" v-if="scope.row.totalRate!=null">{{scope.row.totalRate+"%"}}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <i :title="!showKL?'点击显示开累':'点击隐藏开累'" :class="!showKL?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" class=" tabel-show-icon" @click="setShowKl()"></i>
          <div class="cwjswgcl-bottom">
            <div class="inline-block" v-for="(item,index) in data" v-if="item.tjxCode=='002009003'"><span>{{item.tjxName+"("+item.jldw+")"}}:<el-input disabled v-model="item.monthValue"  disabled/></span></div>
            <div class="inline-block" v-for="(item,index) in data" v-if="item.tjxCode=='002009003001'"><span>{{item.tjxName}}:<el-input disabled  v-model="item.monthValue"  disabled/></span></div>
            <div title="房建新开工面积（开累产值) - 房建竣工面积（开累产值） + 房建竣工面积（本年产值）" class="inline-block" v-for="(item,index) in data" v-if="item.tjxCode=='002009005'"><span>{{item.tjxName+"("+item.jldw+")"}}:<el-input  disabled :value="item.monthValue"/></span></div>
            <div title="其中：新开工面积（开累产值 - 其中：投标承包面积（开累产值） + 其中：投标承包面积（本年产值）" class="inline-block" v-for="(item,index) in data" v-if="item.tjxCode=='002009005001'"><span>{{item.tjxName}}:<el-input  disabled  :value="item.monthValue"/></span></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="下月计划" v-if="projectList.uuid!=''&& projectList.uuid!=null" name="xyjh">
        <div class="detailBoxBG">
          <el-table
            class="tableStyle"
            :max-height="$tableHeight"
            :height="$tableHeight"
            :data="nextData"
            :header-cell-style="{
                    'text-align': 'center',
                    'background-color': 'whitesmoke'
                  }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
            cell-style="padding:5px 0"
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
            </el-table-column>

            <el-table-column
              :width="150"
              align="center"
              label="计划"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="textRight">{{scope.row.value}}</div>
              </template>
            </el-table-column>
            <el-table-column
              :width="400"
              align="center"
              label=""
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目概况" name="xmgk" v-if="projectList.uuid!=''&& projectList.uuid!=null">
        <!--v-if="projectList.uuid!=''&& projectList.uuid!=null"-->
        <div class="detailBoxBG">
          <el-form
            :inline="false"
            :model="projectList"
            class="gcform"
          >
            <el-form-item
              label="项目名称:"
            ><el-input v-model="projectList.projectName" disabled ></el-input>
            </el-form-item>
            <el-form-item
              label="项目简称:"
            ><el-input v-model="projectList.projectOmit" disabled ></el-input>
            </el-form-item>
            <br>
            <el-form-item
              label="承建单位:"
            ><el-input v-model="projectList.companyBuiltName" disabled ></el-input>
            </el-form-item>
            <el-form-item
              label="所属铁路局:"
            ><el-input v-model="projectList.railwayName" disabled ></el-input>
            </el-form-item>
            <br>
            <el-form-item
              label="工程行业类别:"
            ><el-input v-model="projectList.projectTypeSecond" disabled ></el-input>
            </el-form-item>
            <el-form-item
              label="项目板块:"
              prop="projectList.projectModuleName"
              style="width: 32.5%">
              <el-input
                disabled
                v-model="projectList.projectModuleName">
              </el-input>
            </el-form-item>
            <el-form-item
              label="项目类型:"
            >
              <el-input v-model="projectList.projectTypeName" disabled></el-input>
            </el-form-item>
            <el-form-item
              label="计量单位:"
            ><el-input v-model="projectList.unitName" disabled ></el-input>
            </el-form-item>
            <!-- <el-form-item
               label="初始签订数量:"
             ><el-input v-model="projectList.projectName" disabled ></el-input>
             </el-form-item>-->
            <el-form-item
              label="工程合同数量:"
            ><el-input v-model="projectList.contractCount" disabled ></el-input>
            </el-form-item>
            <br>
            <el-form-item
              label="项目状态:"
              prop="projectList.projectStatusName"
              style="width: 32.5%">
              <el-input
                disabled
                v-model="projectList.projectStatusName">
              </el-input>
            </el-form-item>
            <el-form-item
              label="项目所在地:"
            ><el-input v-model="projectList.projectLocationMonth" disabled ></el-input>
            </el-form-item>
            <br>
            <el-form-item
              label="初始合同额(万元):"
            ><el-input v-model="projectList.contractAmountInitial" disabled ></el-input>
            </el-form-item>
            <el-form-item
              label="工程合同额(万元):"
            ><el-input v-model="projectList.contractAmountEngine" disabled ></el-input>
            </el-form-item>
            <!--    <el-form-item
                  label="合同额增减(万元):"
                ><el-input v-model="projectList.projectName" disabled ></el-input>
                </el-form-item>-->
            <br>

            <el-form-item
              label="合同签订日期:"
            >
              <el-date-picker
                disabled="true"
                class="list-search-picker"
                filterable
                clearable
                type="month"
                v-model="projectList.contractSignTime"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="合同竣工日期:"
            >
              <el-date-picker
                disabled="true"
                class="list-search-picker"
                filterable
                clearable
                type="month"
                v-model="projectList.contractEndTime"
              >
              </el-date-picker>
            </el-form-item>
            <br>
            <el-form-item
              label="实际开工日期:"
            >
              <el-date-picker
                disabled="true"
                class="list-search-picker"
                filterable
                clearable
                type="month"
                v-model="projectList.realStartTime"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="实际竣工日期:"
            >
              <el-date-picker
                disabled="true"
                class="list-search-picker"
                filterable
                clearable
                type="month"
                v-model="projectList.realEndTime"
              >
              </el-date-picker>
            </el-form-item>
            <br>
            <el-form-item
              label="竣工产值:"
            ><el-input v-model="projectList.completedOutputValue" disabled ></el-input>
            </el-form-item>
            <el-form-item
              label="建设单位:"
            ><el-input v-model="projectList.companyBuild" disabled ></el-input>
            </el-form-item>
            <el-form-item
              label="设计单位:"
            ><el-input v-model="projectList.companyDesign" disabled ></el-input>
            </el-form-item>
            <el-form-item
              label="监理单位:"
            ><el-input v-model="projectList.companySupervisor" disabled ></el-input>
            </el-form-item>
            <el-form-item
              label="项目经理:"
            ><el-input v-model="projectList.projectManagerName" disabled ></el-input>
            </el-form-item>
            <el-form-item
              label="工程标段:"
            ><el-input v-model="projectList.projectBidSection" disabled ></el-input>
            </el-form-item>

            <el-form-item
              label="起讫地点(标段):"
            ><el-input v-model="projectList.beginAddress" disabled ></el-input>
            </el-form-item>
            <div>
              <el-form-item
                label="工程概况(最多700字):"
              ><el-input v-model="projectList.engineSurvey" type="textarea"disabled ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item
                label="备 注(最多200字):"
              ><el-input v-model="projectList.projectRemark" type="textarea" disabled ></el-input>
              </el-form-item>
            </div>
            <!--     <el-form-item
                   label="相关附件(最大10 MB):"
                 ><el-input v-model="projectList.projectName" disabled ></el-input>
                 </el-form-item>-->
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="dataReport.flowStatus!='edit'&&(p.actpoint == 'task'||p.actpoint == 'look')">
        <Audit-Process :task="p.task||{businessId:p.params.uuid||p.instid,businessType:' engineering_monthly_report'}"></Audit-Process>
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
        showKL:false,//是否显示开累
        key:0,
        data:[],
        projectList:{},
        dataReport:{
        },
        nextData:[],
        yearDateS:'',
        activeName:"ztjd",
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        proNameHover: false,
        projectName: JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectName,
        projectreport: {},
        projectreportDetaiList: [],
        planPrjTjxDetailList: [],
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
      //隐藏某些行
      tableRowClassName: function (row, index) {
        if (row.row.tjxCode=='002009003'||row.row.tjxCode=='002009003001'||row.row.tjxCode=='002009005'||row.row.tjxCode=='002009005001') {
          return 'hidden-row';
        }
        return '';
      },
      //点击显示或隐藏开累
      setShowKl(){
        this.showKL=!this.showKL;
        this.$nextTick(() => {
          this.$refs.table.doLayout();
          // el-table添加ref="tableName"
        });
      },
      //计算房建施工面积和其中投标承包面积
      clacFjsg(list){
        var sgVal=0,qztbVal=0;
        list.forEach((item,index)=>{
          if(item.tjxCode=='002009001'){
            sgVal+=Number(item.totalValue)
          }
          if(item.tjxCode=='002009002'){
            sgVal+=Number(item.yearValue)
          }
          if(item.tjxCode=='002009001001'){
            qztbVal+=Number(item.totalValue)
          }
          if(item.tjxCode=='002009002001'){
            qztbVal+=Number(item.yearValue)
          }
        });
        list.forEach((item,index)=>{
          if(item.tjxCode=='002009002'){
            sgVal=sgVal-Number(item.totalValue)
          }
          if(item.tjxCode=='002009002001'){
            qztbVal=qztbVal-Number(item.totalValue)
          }
        });
        list.forEach((item,index)=>{

          if(item.tjxCode=='002009005'){
            item.monthValue=sgVal;
          }
          if(item.tjxCode=='002009005001'){
            item.monthValue=qztbVal;
          }
        });
      },
      // 保存
      save(type) {
        this.dataReport.status="3"//集团创建
        this.dataReport.flowStatus="edit"
        let tableData = {
          projectReportDetaiList:this.data,
          projectreport:this.dataReport,
          planPrjTjxDetailList:this.nextData
        }
        var url='';
        if(type=='save'){
          url="/api/statistics/projectMonthlyReport/Projectreport/detail/saveOrUpdate";
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
                'reportType':'1',
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
        this.dataReport.status="3"
        this.dataReport.flowStatus="check"
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
        if(this.p.selfPath){
          let _p={fromDate:this.p.fromDate,fromPath:this.p.fromPath};
          // console.log(this.p)
          this.$router.push({
            path: this.p.selfPath,
            query: {p: this.$utils.encrypt(JSON.stringify(_p))},

          })
        }else{
          this.$router.back()
        }
      },
      // 获取数据
      getData() {
        var url='';
        if(this.p.ifjtList){
          url='/api/statistics/projectMonthlyReport/Projectreport/detail/getJtReportDetail'
        }else if(this.p.selfPath=='../gfList'){
          url='/api/statistics/projectMonthlyReport/Projectreport/detail/getGfReportDetail'
        }else{
          url='/api/statistics/projectMonthlyReport/Projectreport/detail/queryMonthReportEntityInfo'
        }
        this.$http
            .post(url, this.p.params, {useJson: true})
            .then(res => {
              this.data = res.data.data.projectReportDetaiList
              this.dataReport=res.data.data.projectreport
              this.dataReport.yearDateS=this.dataReport.reportYear+"-"+this.dataReport.reportMonth
              this.nextData=res.data.data.planPrjTjxDetailList
              this.projectList=res.data.data.projectList||{}
              console.log('data', this.data)
              if(this.projectList.uuid!=''&& this.projectList.uuid!=null){
                this.activeName="ztjd"
              }else{
                this.activeName="cwjswgcl"
              }
              this.clacFjsg(this.data);
              // this.reportVo=this.data;
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
    //text-align: right;
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
    //text-align: right;
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
  .table-div{
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    max-height: calc(100vh - 110px)!important;
    min-height: calc(100vh - 110px)!important;
    overflow: scroll;
  }
  .sub-btn{
    right: 95px!important;
  }
  .tableStyle{
    min-height: calc(100vh - 160px)!important;
    height:calc(100vh - 160px)!important;
    max-height: calc(100vh - 160px)!important;
    overflow: auto;
  }
  /**/
</style>
