<!--详情-->
<template>
  <div style="position: relative">
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&p.planInfo.projectStatus !== '2'" type="primary" @click="save" class="detailbutton detail-back-tab save-btn">保存</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||p.planInfo.projectStatus !== '2')" @click="submit" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <el-button class="detail-back-tab" @click="back" type="text">返回</el-button>
    <el-tabs type="border-card">
      <el-tab-pane label="项目计划">
        <div class="table-div">
          <el-card class="box-card" v-if="p.actpoint != 'task'">
            <div class="clearfix el-card__header">
              <span style="color: #2a2a7d;line-height: 32px">
                <b style="color:red">计划类型:</b>
                <span style="color:red !important;font-size:14px;margin-right: 20px;">{{p.planInfo.planTypeName}}</span>
                <span style="color:red !important;margin-left: 20px;margin-right: 20px;"><b style="color:red">项目名称:</b><span style="font-size:14px;">{{p.planInfo.projectName}}</span></span>
                <span v-show="p.planInfo.planProjectTjx.planType === 2" style="color:red !important;font-size:14px;"><b style="color:red">年份:</b>{{p.planInfo.planProjectTjx.planYear}}年</span>
                <span v-show="p.planInfo.planProjectTjx.planType === 1" style="color:red !important;font-size:14px;">{{p.planInfo.planProjectTjx.planYear}}年{{p.planInfo.planProjectTjx.planMonth}}月</span>
              </span>
            </div>
          </el-card>
          <div class="table-div">
            <el-table
              class="tableStyle"
              :max-height="$tableHeight"
              :height="$tableHeight"
              :data="data"
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
                  <div v-if="scope.row.veditable === '1' && scope.row.venabled === '1' && p.planInfo&&p.planInfo.projectStatus !== 'check'&& p.planInfo.projectStatus !== 'pass'&&p.actpoint!='task'&&p.actpoint!='look' ">
                    <!--<el-input v-model="scope.row.value" @input="scope.row.value = scope.row.value.replace(/[^\-?\d.]/g,'','')"/>-->
                    <el-input v-model="scope.row.value" @input="formatValue(scope.row.value,scope.$index,data,'value'),checkParnt(data,scope.$index,scope.row.sumTarget)"/>
                  </div>
                  <div v-else-if="p.planInfo&&p.planInfo.projectStatus !== 'check'&& p.planInfo.projectStatus !== 'pass'&& p.actpoint !== 'task'&& p.actpoint !== 'look' " style="text-align: right">
                    <!--<el-input style="visibility: hidden;width: 0" :value="sonCount(scope.row)"/>-->
                    {{sonCount(scope.row,scope.$index,data,'value')}}
                  </div>
                  <!--<div v-else-if="scope.row.uuid != '154'&&scope.row.uuid != '150'&&p.planInfo&&p.planInfo.projectStatus !== '2'&& p.planInfo.projectStatus !== '3' " style="text-align: right">-->
                    <!--&lt;!&ndash;<el-input style="visibility: hidden;width: 0" :value="sonCount(scope.row)"/>&ndash;&gt;-->
                    <!--{{sonCount(scope.row,scope.$index,data,'value')}}-->
                  <!--</div>  -->

                  <!--<div v-else-if="scope.row.uuid == '154'&&p.planInfo&&p.planInfo.projectStatus !== '2'&& p.planInfo.projectStatus !== '3' " style="text-align: right">-->
                    <!--&lt;!&ndash;<el-input style="visibility: hidden;width: 0" :value="sonCount(scope.row)"/>&ndash;&gt;-->
                    <!--{{sonCountSD(scope.row,scope.$index,data,'value','149')}}-->
                  <!--</div>-->
                  <!--<div v-else-if="scope.row.uuid == '150'&&p.planInfo&&p.planInfo.projectStatus !== '2'&& p.planInfo.projectStatus !== '3' " style="text-align: right">-->
                    <!--&lt;!&ndash;<el-input style="visibility: hidden;width: 0" :value="sonCount(scope.row)"/>&ndash;&gt;-->
                    <!--{{sonCountSD(scope.row,scope.$index,data,'value','150')}}-->
                  <!--</div>-->
                  <div v-else>{{scope.row.value}}</div>
                </template>
              </el-table-column>
              <el-table-column
                :width="400"
                align="center"
                label=""
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'&&p.planInfo.projectStatus!='edit'&&p.planInfo.projectStatus!=null">
        <Audit-Process :task="p.task||{businessId:p.planInfo.planId||p.instid,businessType:'project_plan'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import AuditProcess from '@/components/auditProcess'
  export default {
    name: 'plan-all-detail',
    components: {
      AuditProcess
    },
    data() {
      return {
        data: [],
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        proNameHover: false,
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
      },
      sonCount () {
        return (rowData,index,list,name) => {
          var bb = [];
          for (var i in this.data.map(row => row.value)) {
            if (this.data.map(row => row.veditable=='1')[i]&&this.data.map(row => row.venabled=='1')[i]&&this.data.map(row => row.value)[i] && this.data.map(row => row.sumTarget)[i] === rowData.tjxCode) {
              bb.push(this.data.map(row => row.value)[i])
            }
          }
          console.log(bb)
          // console.info(bb, index)
          // veditable，venabled 都为 "1"，则不会参与增加
          // a的sumTarget == b的uuid， a的值会加到b上
          var sum=(bb.reduce((acc, cur) => (parseFloat(cur) + parseFloat(acc)), 0) === 0 ? '' : bb.reduce((acc, cur) => (parseFloat(cur) + parseFloat(acc)), 0));
          list[index][name]=sum;
          // this.$forceUpdate();
          return sum
        }
      },
      sonCountSD () {
        return (rowData,index,list,name,id) => {
          var _sum = 0;
         list.forEach((item)=>{
           if(item.sumTarget==id){
             _sum+=Number(item.value)
           }
         });
          list[index][name]=_sum;
          // this.$forceUpdate();
          return _sum
        }
      },
    },
    methods: {
      //判断是否大于父级值
      checkParnt(list,index,code){
        var treeSum=0,parentNum=0,canCalc=false,parentCanCalc=false;
        list.forEach((item)=>{
          if(item.tjxCode.length>=12&&item.sumTarget==code){
            treeSum+=Number(item.value);
            canCalc=true;
          }
          if(item.uuid==code&&item.tjxCode.length>=9&&item.veditable=='1'&&item.venabled=='1'){
            parentNum=Number(item.value);
            parentCanCalc=true;
          }
        });
        console.log(canCalc,list[index].sumTarget,list[index].tjxCode.length,treeSum,parentNum)
        if(treeSum!=0&&parentNum!=0&&list[index].sumTarget&&canCalc&&parentCanCalc&&list[index].tjxCode.length>=12&&(treeSum>parentNum)){
          this.$message.error("该级计划之和不能大于上级计划");
          list[index].value='';
          return false;
        }
      },
      //判断某些值是否相等
      checkVal(){
        var cansub=true;
        var fjbfsg=0,//房建部分施工产值
            fjbfjg=0,//房建部分竣工产值
            sgcz=0,//施工产值
            jgcz=0;//竣工产值
        this.data.forEach((item,i)=>{
          if(item.tjxCode=='001007'){
            fjbfsg=Number(item.value);
          }
          if(item.tjxCode=='001008'){
            fjbfjg=Number(item.value);
          }
          if(item.tjxCode=='001001'){
            sgcz=Number(item.value);
          }
          if(item.tjxCode=='001009'){
            jgcz=Number(item.value);
          }
        })
        if(fjbfsg!=0&&fjbfjg!=0&&fjbfsg!=fjbfjg){
          this.$message.error("房建部分施工产值应该和房建部分竣工产值相等");
          cansub=false;
        }
        if(sgcz!=0&&jgcz!=0&&sgcz!=jgcz){
          this.$message.error("竣工产值应该和施工产值相等");
          cansub=false;
        }
        if(sgcz!=0&&sgcz>this.p.contractAmountEngine){
          this.$message.error("施工产值不能超过工程合同额");
          cansub=false;
        }
        return cansub;
      },
      // 只允许输入金额类型，最大两位小数（如：3.88）
      formatValue(val,index,list,name){
        val = val.replace(/(^\s*)|(\s*$)/g, "");
        if (!val) return this.value = "";
        val = val.replace(/[^\d.]/g, "");
        val = val.replace(/^\./g, "");
        val = val.replace(/^\b(0{2,})/gi, "0");
        val = val
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
        val = val.replace(/^(\-)*(\d+)\.(\d*).*$/, "$1$2.$3");
        list[index][name]=val;
        this.$forceUpdate();
      },
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
              '/api/statistics/planPrjTjxDetail/process/'+type,
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
      // 保存
      save() {
        var cansub=this.checkVal();
        if(!cansub){
          return false;
        }
        let planId = ''
        if (this.data.length > 0) {
          planId = this.data[0].planId
          let tableData = {
            planId: planId,
            planProjectTjx: {uuid: planId, flowStatus:'edit'},
            planPrjTjxDetailList: this.data
          }
          this.$http
            .post('/api/statistics/planPrjTjxDetail/detail/save', JSON.stringify(tableData), {useJson: true})
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '保存成功',
                  duration: 1000,
                  type: 'success',
                  onClose: () => {
                    // this.$router.back()
                  }
                })
              }
            })
        }
      },
      submit() {
        let planId = ''
        if (this.data.length > 0) {
          planId = this.data[0].planId
          let tableData = {
            planId: planId,
            planProjectTjx: {uuid: planId, flowStatus: 'check',planProjectName:this.p.planInfo.projectName},
            planPrjTjxDetailList: this.data
          }
          this.$http
            .post('/api/statistics/planPrjTjxDetail/process/start', JSON.stringify(tableData), {useJson: true})
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
        }
      },
      rollback() {
        this.$http
          .post('/api/statistics/PlanProjectTjx/detail/save', JSON.stringify({uuid: this.p.planInfo.planId, flowStatus: 0}), {useJson: true})
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '回退成功',
                duration: 1000,
                onClose: () => { this.$router.back() }
              })
            }
          })
      },
      // 返回上一页
      back() {
        this.$router.back()
      },
      // 获取数据
      getData() {
        this.$http
          .post('/api/statistics/planPrjTjxDetail/list/loadPageData', JSON.stringify({
            planId: this.p.planInfo?this.p.planInfo.planId:this.p.instid,
            planType: this.p.planInfo?this.p.planInfo.planProjectTjx.planType:"",
            planProjectTjx: this.p.planInfo&&this.p.planInfo.planProjectTjx
          }), {useJson: true})
          .then(res => {
            this.data = res.data.data
            console.log(JSON.parse(this.$utils.decrypt(this.$route.query.p)));
            if (this.data) {
              this.data.forEach((obj) => {
                if (obj.value === 0) {
                  obj.value = ''
                }
              })
            }
          })
      }
    },
    created() {

    },
    mounted() {
      this.getData();
    }
  }
</script>
<style scoped>
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
  .table-div{
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    max-height: calc(100vh - 80px)!important;
    min-height: calc(100vh - 80px)!important;
    /*overflow: scroll;*/
  }
  .tableStyle{
    width: 100%;
    max-height: calc(100vh - 180px)!important;
    min-height: calc(100vh - 180px)!important;
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
  /deep/ .el-collapse-item__header{
    height:35px !important;
    ling-height:35px !important;
  }

  /deep/ .el-collapse-item__content{
    padding-bottom: 5px !important;
  }
</style>
