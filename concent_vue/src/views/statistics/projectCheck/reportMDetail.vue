<!--工程月报验工计价详情-->
<template>
  <div style="position: relative">
      <div  v-if="dataReport.status==1" style="margin-top: 9px;color: red;position: absolute;top: 1px;right: 279px;z-index: 999;font-size: 15px;">项目名称：<span style="color: red !important;margin-right: 50px;">{{projectName.length>20?projectName.slice(0,20)+'...':projectName}}</span></div>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||dataReport.flowStatus=='edit'||dataReport.flowStatus=='reject')||(dataReport.uuid!=''&&dataReport.isEdit=='1')" @click="save('sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'||(dataReport.uuid!=''&&dataReport.isEdit=='1')" type="primary" @click="save('save')" class="detailbutton detail-back-tab save-btn">保存</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
      <el-button  @click="back" type="primary"  class="detailbutton detail-back-tab " plain>返回</el-button>
     <el-tabs type="border-card" v-model="activeName">
         <el-tab-pane label="整体进度" v-if="dataReport.status==1" name="ztjd">
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
                    ><el-input v-model="dataReport.reportProjectName" disabled></el-input>
                    </el-form-item>
                  <div>
                  <el-form-item
                    label="本月备注:"
                  ><el-input  :disabled="isCk=='1'||p.actpoint=='task'||p.actpoint=='look'" v-model="dataReport.thisPlan" type="textarea" ></el-input>
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
                    ><el-input :disabled="isCk=='1'||p.actpoint=='task'||p.actpoint=='look'" v-model="dataReport.nextPlan" type="textarea" ></el-input>
                    </el-form-item>
                    </div>
                  <p>
                    <span>上传附件: </span>
                    <el-button
                      v-if="isCk!='1'&&p.actpoint!=='task'&&p.actpoint!='look'"
                      class="detatil-flie-btn"
                      size="small"
                      type="primary"
                      @click="openFileUp('/api/statistics/projectCheck/CommonFiles/projectCheck/01/uploadFile','fileList')">
                      点击上传
                    </el-button>
                  </p>
                  <el-table
                    :data="commonFilesList"
                    :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                    @selection-change="handleSelectionChange"
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
                      label="操作"
                      show-overflow-tooltip
                      width="80"
                      v-if="isCk!='1'&&p.actpoint!=='task'&&p.actpoint!='look'"
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
              <!--   <el-table-column
                   :width="150"
                   align="center"
                   label="本月计划"
                   show-overflow-tooltip
                 >
                   <template slot-scope="scope">
                     <div>{{scope.row.monthPlan}}</div>
                   </template>
                 </el-table-column>-->
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
                   <div v-if="scope.row.veditable == '1' && isCk!='1'&&p.actpoint!='task' ">
                     <el-input v-model="scope.row.valuationFee" @input="scope.row.value = scope.row.valuationFee.replace(/[^\-?\d.]/g,'','')" @blur="getYear(data,scope.$index,scope.row.sumTarget,'valuationFee','计价额')"/>
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
               <div v-if="scope.row.veditable == '1' && isCk!='1' &&p.actpoint!='task'">
                 <el-input v-model="scope.row.taxFee"  @input="scope.row.value = scope.row.taxFee.replace(/[^\-?\d.]/g,'','')" @blur="getYearSe(data,scope.$index,scope.row.sumTarget,'taxFee','税额')"/>
               </div>
               <div  v-if="scope.row.veditable != '1'">{{scope.row.taxFee}}</div>
             </template>
           </el-table-column>
            <!--   <el-table-column
                 :width="150"
                 align="center"
                 label="本年计划"
                 show-overflow-tooltip
               >
                 <template slot-scope="scope">
                   <div>{{scope.row.yearPlan}}</div>
                 </template>
               </el-table-column>-->
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
             <!--  <el-table-column
                 :width="150"
                 align="center"
                 label="本年%"
                 show-overflow-tooltip
               >
                 <template slot-scope="scope">
                 &lt;!&ndash;<div v-if="scope.row.yearPlan&&scope.row.yearValue">{{Math.round(scope.row.yearPlan /scope.row.yearValue) / 100+"%"}}
                   </div>&ndash;&gt;
                   <div v-if="scope.row.yearRate!=null">{{scope.row.yearRate+"%"}}
                   </div>
                 </template>
               </el-table-column>-->
         <!--  <el-table-column
             :width="150"
             align="center"
             label="总设计量"
             show-overflow-tooltip
           >
             <template slot-scope="scope">
               <div>{{scope.row.totalPlan}}</div>
             </template>
           </el-table-column>-->
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
         <!--  <el-table-column
             :width="150"
             align="center"
             label="开累%"
             show-overflow-tooltip
           >
             <template slot-scope="scope">
               &lt;!&ndash;<div v-if="scope.row.totalPlan&&scope.row.totalValue">{{Math.round(scope.row.totalPlan /scope.row.totalValue) / 100+"%"}}
               </div>&ndash;&gt;
               <div v-if="scope.row.totalRate!=null">{{scope.row.totalRate+"%"}}
               </div>
             </template>
           </el-table-column>-->
              </el-table>
       </div>
    </el-tab-pane>
         <el-tab-pane label="审批流程" v-if="dataReport.flowStatus!='edit'&&(p.actpoint == 'task'||p.actpoint == 'look')">
             <Audit-Process :task="p.task||{businessId:p.uuid,businessType:'emr_valuation'}"></Audit-Process>
           </el-tab-pane>
    </el-tabs>
    <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
    </div>
</template>

<script>
  import AuditProcess from '@/components/auditProcess'
  import FileUpload from '@/components/fileUpload'
  export default {
    name: 'reportM-all-detail',
    components: {
      FileUpload,
      AuditProcess
    },
    data() {
      return {
        userdata:JSON.parse(sessionStorage.getItem('userdata')),
        key:0,
        data:[],
        dataReport:{
        },
        projectList:{},
        commonFilesList:[],
        uploadVisible:false,//上传附件组件状态
        nextData:[],
        yearDateS:'',
        activeName:"ztjd",
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        proNameHover: false,
        projectName: '',
        isCk:JSON.parse(this.$utils.decrypt(this.$route.query.p)).isCk,
        projectcheck: {},
        tjxDetailList:[],
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
      //流程操作
      operation(type){
        var msg='',that=this;
        this.$prompt('请输入审核意见', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(type=='back'){
            if(value==null||value==''){
              this.$message.error('审核意见不能为空');
              return false;
            }
          }else{
            if(value==null||value==''){
              value=that.examineReviewMsg;
            }
          }
          this.p.task.remark=value;
          this.$http
            .post(
              '/api/statistics/Projectcheck/process/'+type,
              JSON.stringify(this.p.task),
              {useJson: true}
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                });
                this.$router.back()
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });

      },
      //检查是否大于上级产值
      checkCz(list,index,code,scopeName,messageName){
        var treeSum=0,parentNum=0,canCalc=false,parentCanCalc=false;
        list.forEach((item)=>{
          if(item.tjxCode.length>=12&&item.sumTarget==code){
            treeSum+=Number(item[scopeName]);
            canCalc=true;
          }
          if(item.tjxId==code&&item.tjxCode.length==9){
            parentNum=Number(item[scopeName]);
            parentCanCalc=true;
            // console.log(item.tjxName)
          }
        });
        if(list[index].sumTarget&&canCalc&&parentCanCalc&&list[index].tjxCode.length>=12&&(treeSum>parentNum)){
          this.$message.error("该级本月"+messageName+"不能大于上级本月"+messageName);
          list[index][scopeName]='';
          return false;
        }
      },
      //设置当月额度，计算计价额
      getYear(list,index,code,scopeName,messageName){
       this.checkCz(list,index,code,scopeName,messageName);
        var num=0;
        var num1=0;
        var num2=0;
        var num3=0;
        list[index].yearValuationFee=list[index].oldYearJje?Number(list[index].oldYearJje)+Number(list[index].valuationFee):list[index].valuationFee;
        list[index].totalValuationFee=list[index].oldTotalJje?Number(list[index].oldTotalJje)+Number(list[index].valuationFee):list[index].valuationFee;
       /* //list[index].yearRate=Math.round(Number(list[index].yearPlan) /Number(list[index].yearValue)) / 100;
        list[index].yearRate=list[index].yearValue&&list[index].yearPlan?(Number(list[index].yearValue)/Number(list[index].yearPlan)/ 100).toFixed(4):0;
        //list[index].monthRate=Math.round(Number(list[index].monthPlan) /Number(list[index].monthValue)) / 100;
        //list[index].totalRate=Math.round(Number(list[index].totalPlan) /Number(list[index].totalValue)) / 100;
        list[index].totalRate=list[index].totalValue&&list[index].totalPlan?(Number(list[index].totalValue)/Number(list[index].totalPlan) / 100).toFixed(4):0;
        console.log(list[index])*/
        list.forEach((item,i)=>{
          if(item.sumTarget==code) {
            num= Number(item.valuationFee)+num;
            num1=Number(item.yearValuationFee)+num1;
            num2=Number(item.totalValuationFee)+num2;
          }
        });
        this.data.forEach((item,i)=>{
          if(item.tjxId==code&&item.veditable=='0'){
            item.valuationFee=num;
            item.yearValuationFee=num1;
            item.totalValuationFee=num2;
            item.monthValue=item.valuationFee+item.taxFee;
            item.yearValue=item.yearValuationFee+item.yearTaxFee;
            item.totalValue=item.totalValuationFee+item.totalTaxFee;
          }
        });
        this.data.forEach((item,i)=>{
          item.monthValue=Number(item.valuationFee)+Number(item.taxFee);
          item.yearValue=Number(item.yearValuationFee)+Number(item.yearTaxFee);
          item.totalValue=Number(item.totalValuationFee)+Number(item.totalTaxFee);
        });
      },
      //设置当月额度，计算税额
      getYearSe(list,index,code,scopeName,messageName){
        this.checkCz(list,index,code,scopeName,messageName);
        var num=0;
        var num1=0;
        var num2=0;
        var num3=0;
        list[index].yearTaxFee=list[index].oldYearSe?Number(list[index].oldYearSe)+Number(list[index].taxFee):list[index].taxFee;
        list[index].totalTaxFee=list[index].oldTotalSe?Number(list[index].oldTotalSe)+Number(list[index].taxFee):list[index].taxFee;
     /*   //list[index].yearRate=Math.round(Number(list[index].yearPlan) /Number(list[index].yearValue)) / 100;
        list[index].yearRate=list[index].yearValue&&list[index].yearPlan?(Number(list[index].yearValue)/Number(list[index].yearPlan)/ 100).toFixed(4):0;
        //list[index].monthRate=Math.round(Number(list[index].monthPlan) /Number(list[index].monthValue)) / 100;
        //list[index].totalRate=Math.round(Number(list[index].totalPlan) /Number(list[index].totalValue)) / 100;
        list[index].totalRate=list[index].totalValue&&list[index].totalPlan?(Number(list[index].totalValue)/Number(list[index].totalPlan) / 100).toFixed(4):0;
        console.log(list[index])*/
        list.forEach((item,i)=>{
          if(item.sumTarget==code) {
            num= Number(item.taxFee)+num;
            num1=Number(item.yearTaxFee)+num1;
            num2=Number(item.totalTaxFee)+num2;
          }
        });
        this.data.forEach((item,i)=>{
          if(item.tjxId==list[index].sumTarget&&item.veditable=='0'){
            item.taxFee=num;
            item.yearTaxFee=num1;
            item.totalTaxFee=num2;
            item.monthValue=item.valuationFee+item.taxFee;
            item.yearValue=item.yearValuationFee+item.yearTaxFee;
            item.totalValue=item.totalValuationFee+item.totalTaxFee;
          }
        });
        this.data.forEach((item,i)=>{
          item.monthValue=Number(item.valuationFee)+Number(item.taxFee);
          item.yearValue=Number(item.yearValuationFee)+Number(item.yearTaxFee);
          item.totalValue=Number(item.totalValuationFee)+Number(item.totalTaxFee);
        });
      },
      // 保存
      save(type) {
        // this.dataReport.status="1"
        // this.dataReport.flowStatus="1"
        this.commonFilesList.businessId=this.dataReport.uuid
        let tableData = {
          tjxDetailList:this.data,
          projectcheck:this.dataReport,
          commonFilesList:this.commonFilesList,
        }
        var url='';
        if(this.projectList.projectTypeCode=='017002'||this.projectList.projectTypeCode=='017003'){
          var money=0;
          this.data.forEach((item)=>{
            if(item.tjxCode=='001001'){
              money=Number(item.monthValue);
            }
          });
          if(money==0&&this.commonFilesList.length==0){
            this.$message.error("请上传附件!");
            return false;
          }
        }
        if(type=='save'){
          url="/api/statistics/Projectcheck/detail/saveOrUpdate";
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
          url="/api/statistics/Projectcheck/process/start";
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
              if (res.data.data === null||res.data.data == '') {
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
      getPlanYear(list,index,code){
        var num=0;
        list.forEach((item,i)=>{
          if(item.sumTarget==code) {
            num= Number(item.value)+num;
          }
        });
        this.data.forEach((item,i)=>{
          if(item.tjxId==list[index].sumTarget){
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
          if(item.tjxId==list[index].sumTarget){
            item.value=num;
          }
        });
      },
      //打开附件上传的组件
      openFileUp(url,list){
        this.uploadVisible = true;
        this.$nextTick(() => {
          this.$refs.infoUp.init(url,list);
        })
      },
      //获取上传的附件列表
      getUpInfo(data){
        this.$forceUpdate();
        //this.commonFilesList=data.fileList;
        this.commonFilesList=this.commonFilesList.concat(data.fileList);
        this.uploadVisible = false;
      },
      submit(type) {

        this.dataReport.status="1"
        this.dataReport.flowStatus="check"
        this.commonFilesList.businessId=this.dataReport.uuid
        let tableData = {
          tjxDetailList:this.data,
          projectcheck:this.dataReport,
          commonFilesList:this.commonFilesList
        }
          this.$http
            .post(url, JSON.stringify(tableData), {useJson: true})
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
      handleRemove1(file,index) {
        this.$http
            .post(
                "/api/statistics/projectCheck/CommonFiles/list/delete",
                {ids:[file.uuid]},
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.commonFilesList.splice(index,1);
              }

            });
      },
      // 返回上一页
      back() {
        this.$router.back()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 获取数据
      getData() {
        this.$http
          .post('/api/statistics/Projectcheck/detail/queryEntityInfoDetail', JSON.stringify({
            projectId: this.p.projectId,
            uuid: this.p.uuid||this.p.instid,
            reportYear: this.p.reportYear,
            reportMonth:this.p.reportMonth,
            createOrgCode: this.p.orgCode
          }), {useJson: true})
          .then(res => {

            var datas=res.data.data;
            this.projectName=datas.projectList&&datas.projectList.projectName;
            this.data = datas.tjxDetailList
            this.dataReport=datas.projectcheck
            this.dataReport.yearDateS=this.dataReport.reportYear+"-"+this.dataReport.reportMonth
            this.commonFilesList=datas.commonFilesList;
            this.projectList=datas.projectList;
            if(this.dataReport.status==1){
              this.activeName='ztjd'
            }else{
              this.activeName='cwjswgcl'
            }
          })
      },
    },
    created() {

    },
    mounted() {
      this.getData();

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
  .detailBoxBG{
    overflow: hidden!important;
  }
  .sub-btn{
    right: 175px;
  }
  /**/
</style>
