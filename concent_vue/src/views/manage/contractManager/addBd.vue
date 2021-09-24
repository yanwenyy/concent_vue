<template>
  <div>
    <el-dialog
      class="bdClass"
      :visible.sync="visible"
      :append-to-body="true">
      <el-card>
        <div class="clearfix el-card__header">
          <span style="color: #2a2a7d;line-height: 32px"><b>标段信息</b></span>
          <el-button @click="close" style="float: right;">返回</el-button>
        </div>
      </el-card>
      <div style="height: calc(100% - 50px);overflow: auto;padding: 0 50px;">
        <el-form class="gcform" :inline="true"  :model="detailForm" :rules="rules" ref="detailForm" @keyup.enter.native="init()">
          <el-form-item label="标段名称:" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.sectionName" placeholder="标段名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="riskFee" :rules="rules.contractAmount"  label="风险费(万元):" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.riskFee" placeholder="风险费(万元)" clearable>
              <template slot="prepend">¥</template>
              <template slot="append">(万元)</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="safetyCost" :rules="rules.contractAmount" label="安全费(万元):" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.safetyCost" placeholder="安全费(万元)" clearable>
              <template slot="prepend">¥</template>
              <template slot="append">(万元)</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="biddingPriceLimit" :rules="rules.contractAmount" label="投标限价(万元):" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.biddingPriceLimit" placeholder="投标限价(万元)" clearable>
              <template slot="prepend">¥</template>
              <template slot="append">(万元)</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="tenderSecurity" :rules="rules.contractAmount" label="投标保证金(万元):" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.tenderSecurity" placeholder="投标保证金(万元)" clearable>
              <template slot="prepend">¥</template>
              <template slot="append">(万元)</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="bidPrice" :rules="rules.contractAmount" label="投标价(万元):" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.bidPrice" placeholder="投标价(万元)" clearable>
              <template slot="prepend">¥</template>
              <template slot="append">(万元)</template>
            </el-input>
          </el-form-item>
          <el-form-item label="投标费率(百分比):" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.tenderRate" placeholder="投标费率(百分比)" clearable></el-input>
          </el-form-item>
          <el-form-item label="开标地点:" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.openBidPlaceName" placeholder="开标地点" clearable>
              <el-button v-if="type!='look'" slot="append" icon="el-icon-search" @click="selectPosition"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="评标办法:" class="list-item">
            <!--@change="-->
            <!--getName(-->
            <!--detailForm.bidEvaluationMethodName,-->
            <!--bidMethod,-->
            <!--'bidEvaluationMethodName',-->
            <!--'bidEvaluationMethodCode'-->
            <!--)-->
            <!--"-->
            <el-select
              clearable
              placeholder="评标办法"
              :disabled="type === 'look'"
              v-model="detailForm.bidEvaluationMethodName">
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.detailName"
                v-for="(item, index) in bidMethod"

              ></el-option>
            </el-select>
            <!--<el-input v-model="detailForm.bidEvaluationMethodName" placeholder="评标办法" clearable></el-input>-->
          </el-form-item>
          <el-form-item label="开标日期:" class="list-item">
            <el-date-picker
              filterable
              clearable
              type="date"
              value-format="timestamp"
              :disabled="type === 'look'"
              v-model="detailForm.dateOfBidOpeningName"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="开标金额(万元):" class="list-item" prop="openBidAmount"
                        :rules="rules.contractAmount">
            <el-input
              v-model="detailForm.openBidAmount"
              clearable
              placeholder="开标金额(万元)"
              :disabled="type === 'look'"
            >
              <template slot="prepend">¥</template>
              <template slot="append">(万元)</template>
            </el-input>
            <!-- <el-input v-model="detailForm.bidInfoSection.tenderSecurity" placeholder="投标保证金(万元)" clearable></el-input> -->
          </el-form-item>
          <el-form-item label="参与投标单位:" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.participatingUnitsName" placeholder="参与投标单位" clearable>
              <el-button v-if="type!='look'" slot="append" icon="el-icon-search" @click="addDw('参与投标单位',detailForm.participatingUnitsId)"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="项目经理:" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.projectManager" placeholder="项目经理" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目副经理:" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.deputyProjectManager	" placeholder="项目副经理" clearable></el-input>
          </el-form-item>
          <el-form-item label="技术负责人:" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.technicalDirector" placeholder="技术负责人" clearable></el-input>
          </el-form-item>
          <el-form-item label="安全负责人:" class="list-item">
            <el-input  :disabled="type === 'look'" v-model="detailForm.personInChargeOfSafety" placeholder="安全负责人" clearable></el-input>
          </el-form-item>
          <el-form-item label="财务负责人:" class="list-item">
            <el-input :disabled="type === 'look'"  v-model="detailForm.personInChargeOfFinance" placeholder="财务负责人" clearable></el-input>
          </el-form-item>
          <el-form-item label="成本负责人:" class="list-item">
            <el-input :disabled="type === 'look'" v-model="detailForm.costOwner" placeholder="成本负责人" clearable></el-input>
          </el-form-item>
          <el-form-item label="其他未列出单位(单位与单位之间用英文逗号隔开):" >
            <el-input
              class="textarea_qt"
              v-model="detailForm.otherUnitsNotListed"
              placeholder="其他未列出单位(单位与单位之间用英文逗号隔开)"
              clearable
              :disabled="type === 'look'"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"></el-input>
          </el-form-item>
          <div class="list-title">
            其他投标单位(系统内):
            <el-button
              v-if="type!='look'"
              @click="add('inside',1)"
              class="detatil-flie-btn"
              size="mini"
              type="primary"
            >新增</el-button >
          </div>
          <el-table
            class="detailTable"
            :data="detailForm.dataList"
            border
            v-loading="dataListLoading"
            :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
            style="width: 100%;">
            <el-table-column
              type="index"
              header-align="center"
              align="center"
              width="80"
              label="ID">
            </el-table-column>
            <el-table-column
              class="bdList"
              :width="500"
              prop="inforName"
              show-overflow-tooltip
              label="其他投标单位(系统内)">
              <template slot-scope="scope">
                <el-input  placeholder="请输入内容" v-model="scope.row.orgName" class="input-with-select" :disabled="type === 'look'||type=='eidtnew'">
                  <el-button v-if="type!='look'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('其他投标单位(系统内)',scope.row.orgId,false,scope.$index,detailForm.dataList)" ></el-button>
                </el-input>
                <!--<el-select-->
                  <!--class="tabelForm-dete"-->
                  <!--clearable-->
                  <!--filterable-->
                  <!--placeholder="请选择"-->
                  <!--v-model="scope.row.orgId"-->
                  <!--@change="-->
                  <!--getBdName(-->
                    <!--scope.row.orgId,-->
                    <!--detailForm.dataList,-->
                    <!--scope.$index-->
                  <!--)-->
                <!--"-->
                <!--&gt;-->
                  <!--<el-option-->
                    <!--:key="index"-->
                    <!--:label="item.detailName"-->
                    <!--:value="item.id"-->
                    <!--v-for="(item, index) in nameList"-->
                  <!--&gt;</el-option>-->
                <!--</el-select>-->
              </template>
            </el-table-column>
            <el-table-column
              class="bdList"
              prop="enginTypeSecondName"
              header-align="center"
              align="center"
              label="投标价">
              <template slot-scope="scope">
                <el-form-item class="tabelForm" :prop="'dataList.' + scope.$index + '.bidAmount'" :rules='rules.contractAmount'>
                  <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                  <el-input :disabled="type === 'look'" type="text" v-model="scope.row.bidAmount">
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              :resizable="false"
              fixed="right"
              label="操作"
              show-overflow-tooltip
              align="center"
              width="100"
              v-if="type!='look'"
            >
              <template slot-scope="scope">
                <el-link :underline="false" @click="del(scope.$index,'inside',scope.row)" type="warning">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <div class="list-title">
            其他投标单位(系统外):
            <el-button
              v-if="type!='look'"
              @click="add('outside',2)"
              class="detatil-flie-btn"
              size="mini"
              type="primary"
            >新增</el-button >
          </div>
          <el-table
            :data="detailForm.dataList2"
            class="detailTable"
            border
            v-loading="dataListLoading"
            :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
            style="width: 100%;">
            <el-table-column
              type="index"
              header-align="center"
              align="center"
              width="80"
              label="ID">
            </el-table-column>
            <el-table-column
              :width="500"
              prop="inforName"
              show-overflow-tooltip
              label="其他投标单位(系统外)">
              <template slot-scope="scope">
                <el-select
                  :disabled="type === 'look'"
                  class="tabelForm-dete"
                  clearable
                  filterable
                  placeholder="请选择"
                  v-model="scope.row.orgId"
                  @focus="getBdNameSel"
                  @change="
                  getBdName(
                    scope.row.orgId,
                    detailForm.dataList2,
                    scope.$index
                  )
                "
                >
                  <el-option
                    :key="index"
                    :label="item.companyName"
                    :value="item.uuid"
                    v-if="sjdwList!=[]&&selectSjdw.indexOf(item.companyName)==-1"
                    v-for="(item, index) in sjdwList"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="enginTypeSecondName"
              header-align="center"
              align="center"
              label="投标价">
              <template slot-scope="scope">
                <el-form-item class="tabelForm" :prop="'dataList2.' + scope.$index + '.bidAmount'" :rules='rules.contractAmount'>
                  <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                  <el-input :disabled="type === 'look'" type="text" v-model="scope.row.bidAmount">
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>

              </template>
            </el-table-column>
            <el-table-column
              :resizable="false"
              fixed="right"
              label="操作"
              show-overflow-tooltip
              align="center"
              width="100"
              v-if="type!='look'"
            >
              <template slot-scope="scope">
                <el-link :underline="false" @click="del(scope.$index,'outside',scope.row)" type="warning">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button  v-if="type!='look'" type="primary" @click="sub()">确定</el-button>
      </div>

    </el-dialog>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import CompanyTree from './companyTree'
  import { isMoney } from '@/utils/validate'
  export default {
    data() {
      var validateMoney = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          // callback(new Error('不能为空'))
        }else if (value!=''&&value!=null&&!isMoney(value)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        key: 0,
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index
        DwVisible:false,//选择单位弹框状态
        visible: false,
        detailForm: {
          dataList: [],
          dataList2: [],
          isDelete: "0"
        },
        type:'',
        index:'',
        pageIndex: 1,
        pagesize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        currentRow: '',
        sjdwList:[],//共享单位库
        selectSjdw:[],//已选择的共享单位库
        nameList:[
          {
          id:'0',
          detailName:'测试设施上'
          },
          {
            id:'1',
            detailName:'啦啦啦啦啦'
          },
        ],
        rules:{
          contractAmount: [
            { required: true,validator: validateMoney, trigger: 'change' }
          ]
        },//表单验证规则
      }
    },
    components: {
      Tree,
      CompanyTree
    },
    mounted() {
      //删除数组内某项的构造函数
      Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      //共享单位库列表
      this.$http
        .post(
          "/api/contract/Companies/detail/findCompanies",
        )
        .then((res) => {
          this.sjdwList = res.data.data.records;

        });
    },
    computed:{
      bidMethod (){
        // console.log(this.$store.state.bidMethod)
        return this.$store.state.bidMethod;
      },
    },
    methods: {
      close(){
        this.$refs['detailForm'].clearValidate();
        this.visible = false;
      },
      //打开单位弹框
      addDw(type,list,ifChek,index,tableList){
        this.DwVisible = true;
        this.$nextTick(() => {
          this.$refs.infoDw.init(type,list,ifChek,index,tableList);
        })
      },
      //获取单位的值
      getDwInfo(data){
        console.log(data);

        var id=[],name=[],code=[];
        if(data&&data.type!="其他投标单位(系统内)"){
          data.forEach((item)=>{
            id.push(item.id);
            name.push(item.detailName);
            code.push(item.detailCode);
          })
        }
        if(data.type=="参与投标单位"){
          this.detailForm.participatingUnitsId=code.join(",");
          this.detailForm.participatingUnitsName=name.join(",");
          this.$forceUpdate();
        }else if(data.type=="其他投标单位(系统内)"){
          this.$forceUpdate();
          var ifRepeat=false;
          this.detailForm.dataList.forEach((item, index) => {
            if(item.orgId!=data.code&&!ifRepeat){
              if (index == data.index) {
                // item.detailName = _data.detailName;
                item.orgId = data.code;
                item.orgName = data.name;
              }
            }else{
              this.$message.error("其他投标单位(系统内)不能重复");
              ifRepeat=true;
            }
          });
          // this.detailForm.dataList[data.index].orgId=data.code;
          // this.detailForm.dataList[data.index].orgName=data.name;
        }
        this.DwVisible=false;
      },
      //获取项目地点的值
      getPositionTree(data) {
        console.log(data)
        this.treeStatas = false;
        var country = '', _data = data;
        this.detailForm.openBidPlaceId = _data.fullDetailCode;
        this.detailForm.openBidPlaceName = _data.fullDetailName;
        this.key = this.key + 1;
      },
      //选择项目地点
      selectPosition() {
        this.treeStatas = true;
        console.log(this.positionIndex);
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
      })
      },
      //获取已选择的共享单位库
      getBdNameSel(){
        this.selectSjdw=[];
        this.detailForm.dataList2.forEach((item)=>{
          this.selectSjdw.push(item.orgName)
        });
      },
      //获取标段名字
      getBdName(id, list, index) {
        if(id){
          this.$forceUpdate()
          list[index].orgName=this.sjdwList.find(
            (item) => item.uuid == id).companyName;
          this.getBdNameSel();
        }
      },
      //选中数据
      sub() {
        this.$refs.detailForm.validate((valid) => {
          if (valid) {
            var contractInfoSectionOrgList=this.detailForm.dataList.concat(this.detailForm.dataList2);
            this.detailForm.contractInfoSectionOrgList=contractInfoSectionOrgList;
            this.visible = false;
            this.detailForm.type=this.type;
            if(this.type=='edit'){
              this.detailForm.index=this.index;
            }
            this.$emit('refreshBD', this.detailForm)
          }
        });

      },
      // 初始化
      init(type,detail,index) {
        console.log(detail)
        this.visible = true;
        this.type=type;
        if(type!='add'){
          this.detailForm=detail;
          this.detailForm.dataList=[];
          this.detailForm.dataList2=[];
          // this.selectSjdw=[];
          this.index=index;
          if(detail.contractInfoSectionOrgList){
            detail.contractInfoSectionOrgList.forEach((item, index) => {
              if (item.orgType == '1') {
              // item.detailName = _data.detailName;
              this.detailForm.dataList.push(item)
              }else{
                  this.detailForm.dataList2.push(item);
                  // this.selectSjdw.push(item.orgName)
              }
            });
            // this.getBdName();
          }
        }else{
          this.detailForm={
            dataList: [],
            dataList2: [],
            isDelete: '0'
          };
        }
      },
      //新增列表
      add(type,orgType){
        var v={
          orgId:'',
          orgName:'',
          bidAmount:'',
          orgType:orgType
        };
        if(type=='inside'){
          this.detailForm.dataList.push(v)
        }else{
          this.detailForm.dataList2.push(v)
        }
      },
      del(index,type,value){
        console.log(value)
        if(value.uuid){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
              "/api/contract/contract/ContractInfo/list/deleteSectionOrg",
              {ids: [value.uuid]}
            )
            .then((res) => {
            if (res.data && res.data.code === 200) {
              if(type=='inside'){
                this.detailForm.dataList.splice(index, 1);
              }else{
                this.detailForm.dataList2.splice(index, 1);
                this.selectSjdw.remove(value.orgName)
              }
          } else {
            this.$message.error(data.msg)
          }
        });
        }).catch(() => {})
        }else{
          if(type=='inside'){
            this.detailForm.dataList.splice(index, 1);
          }else{
            this.detailForm.dataList2.splice(index, 1);
            this.selectSjdw.remove(value.orgName)
          }
        }

      }
    }
  }
</script>
<style scoped>
  .bdClass >>>.el-dialog{
    height: 70vh!important;
  }
  .bdClass >>>.el-card__header{
    padding: 8px 20px !important;
  }
  .bdClass >>>.el-dialog__header{
    display: none;
  }
  .bdClass >>>.el-dialog__body{
    padding: 0;
    height: calc(100% - 60px)!important;
    width: 100%;
    overflow: hidden;
  }
  .bdClass >>>.dialog-footer{
    padding-top: 14px;
    margin:0;
    text-align: center;
    background-color: #fafafa;
  }
  >>>.gcform .el-form-item{
    margin-bottom: 0px!important;
  }
  /* >>>.gcform .el-form-item__error{
    margin: -25px -7px 0 335px!important;
  }
  .bd-table-item  >>>.el-form-item__error{
    margin: -13px -7px 0 310px!important;
  } */
  >>>.el-form--inline .el-form-item__content{
    width: 100%;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
  .list-title{
    margin: 20px 0;
  }
  .list-item{
    width: 32%;
  }

  .dr-notice-warn {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background: #FFE5E0;
    color: red;
  }

  .dr-notice-body {
    padding: 10px;
  }

  .dr-notice-body > div {
    margin-bottom: 20px;
  }

  .sumWeigh {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  >>>.el-input--mini .el-input__inner {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
  }

  >>>form{
    height: 500px;
    padding: 0 10px 0 0;
  }
  p{
    font-size: 18px;
    font-weight:bolder;
  }
  .bdClass >>>.el-dialog{
    position: fixed;
    left: 10%;
    width: 80%;
  }
  /* @media (min-width: 1300px) and (max-width: 1400px) {
    .xmbk-item .el-form-item__error{
      top:-20px!important;
    }
  } */
  .gcform >>>.el-form-item__error {
    top: -20px!important;
    right:80px;
    text-align: right;
  }
  .tabelForm >>>.el-form-item__error {
    top: -10px!important;
    right:80px;
    text-align: right;
  }
  .detailTable >>>.el-input-group{
    margin-top: 0;
  }
  .tabelForm-dete{
    margin-top: 10px!important;
  }
  /*.bdList{*/
    /*padding: 20px 0 0 0!important;*/
  /*}*/
</style>
