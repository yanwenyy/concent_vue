<template>

  <el-dialog
    :lock-scroll="true"
    :visible.sync="visible"
    :append-to-body="true">
    <el-card>
      <div class="clearfix el-card__header">
        <span style="color: #2a2a7d;line-height: 32px"><b>标段信息</b></span>
        <el-button @click="visible = false" style="float: right;">返回</el-button>
      </div>
    </el-card>
    <div style="height: calc(100% - 50px);overflow: auto;padding: 0 50px;">
      <el-form :inline="true" :model="detailForm" :rules="rules" ref="detailform" @keyup.enter.native="init()"  class="gcform">
        <el-form-item label="标段名称:" class="list-item" >
          <el-select
            clearable
            placeholder=""
            v-model="detailForm.bidInfoSection.sectionId"
            :disabled="type === 'look'">
          <el-option
              :key="index"
              :label="item.sectionName"
              :value="item.sectionName"
              v-for="(item, index) in bdName"
            ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="评标办法:" class="list-item">
                <template slot-scope="scope">
                 <el-select
                clearable
                placeholder="评标办法"
                size="mini"
                :disabled="type === 'look'"
                @change="
                getName(
                  detailForm.bidInfoSection.bidEvaluationMethodId,
                  bidMethod,
                  'bidEvaluationMethodName'
                )
              "
                v-model="detailForm.bidInfoSection.bidEvaluationMethodId">
                 <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in bidMethod"

                ></el-option>
                </el-select>
              </template>
        </el-form-item>

        <el-form-item label="开标地点:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.openBidPlaceName"
          placeholder="开标地点"
          clearable
          :disabled="type === 'look'"
          @clear="searchform.openBidPlaceId=''"
          >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="selectPosition()"
          ></el-button>
          </el-input>
        </el-form-item>
<br>
        <el-form-item label="开标日期:" class="list-item">
          <el-date-picker
            filterable
            clearable
            type="date"
            value-format="timestamp"
            :disabled="type === 'look'"
            v-model="detailForm.bidInfoSection.dateOfBidOpeningName"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="参与投标单位:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.participatingUnitsName" placeholder="参与投标单位" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item label="编标拟配合单位:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.orgName" placeholder="编标拟配合单位" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>
        <br>

        <el-form-item label="投标保证金(万元):" class="list-item" prop="bidInfoSection.tenderSecurity"  :rules="rules.contractAmount">
                <el-input
                    v-model="detailForm.bidInfoSection.tenderSecurity"
                    clearable
                    placeholder="投标保证金(万元)"
                    :disabled="type === 'look'"
                  >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.tenderSecurity" placeholder="投标保证金(万元)" clearable></el-input> -->
        </el-form-item>

        <el-form-item label="投标价(万元):" class="list-item" prop="bidInfoSection.bidPrice"  :rules="rules.contractAmount">
                <el-input
                    v-model="detailForm.bidInfoSection.bidPrice"
                    clearable
                    placeholder="投标价(万元)"
                    :disabled="type === 'look'"
                  >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.bidPrice" placeholder="投标价(万元)" clearable></el-input> -->
        </el-form-item>

        <el-form-item v-if="isBidRates=='0'" label="投标费率(百分比):" class="list-item" prop="bidInfoSection.tenderRate"  :rules="rules.contractAmount">
                <el-input
                    v-model="detailForm.bidInfoSection.tenderRate"
                    clearable
                    placeholder="投标费率(百分比)"
                    :disabled="type === 'look'"
                  >
                <!-- <template slot="prepend">¥</template>
                <template slot="append">(万元)</template> -->
              </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.tenderRate" placeholder="投标费率(百分比)" clearable></el-input> -->
        </el-form-item>
          <br>
        <el-form-item label="项目经理:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.projectManager" placeholder="项目经理" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item label="项目副经理:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.deputyProjectManager	" placeholder="项目副经理" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item v-if="isBidRates=='1'" label="风险费(万元):" class="list-item"  prop="bidInfoSection.riskFee"  :rules="rules.contractAmount">
                <el-input
                      v-model="detailForm.bidInfoSection.riskFee"
                      clearable
                      placeholder="风险费(万元)"
                      :disabled="type === 'look'"
                    >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.riskFee" placeholder="风险费(万元)" clearable></el-input> -->
        </el-form-item>
        <br>
        <el-form-item label="技术负责人:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.technicalDirector" placeholder="技术负责人" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item label="安全负责人:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.personInChargeOfSafety" placeholder="安全负责人" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item v-if="isBidRates=='1'" label="安全费(万元):" class="list-item"  prop="bidInfoSection.safetyCost"  :rules="rules.contractAmount">
                <el-input
                    v-model="detailForm.bidInfoSection.safetyCost"
                    clearable
                    placeholder="安全费(万元)"
                    :disabled="type === 'look'"
                  >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.safetyCost" placeholder="安全费(万元)" clearable></el-input> -->
        </el-form-item>
          <br>

        <el-form-item label="财务负责人:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.personInChargeOfFinance" placeholder="财务负责人" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item label="成本负责人:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.costOwner" placeholder="成本负责人" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item v-if="isBidRates=='1'" label="投标限价(万元):" class="list-item" prop="bidInfoSection.biddingPriceLimit"  :rules="rules.contractAmount">
                <el-input
                    v-model="detailForm.bidInfoSection.biddingPriceLimit"
                    clearable
                    placeholder="投标限价(万元)"
                    :disabled="type === 'look'"
                  >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.biddingPriceLimit" placeholder="投标限价(万元)" clearable></el-input> -->
        </el-form-item>
          <br>
          <el-form-item label="投资估算:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.investmentReckon" placeholder="投资估算" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>
          <el-form-item label="其中建安投资:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.jananInvestment" placeholder="其中建安投资" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>
        <div class="detail-title">
          其他投标单位(系统内):
          <el-button
            @click="add('inside',1)"
            class="detatil-flie-btn"
            type="primary"
            :disabled="type === 'look'"
          >新增</el-button >
        </div>
        <el-table class="detailTable"
          :data="detailForm.dataList"
          border
          v-loading="dataListLoading"
          :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
          style="width: 100%;">
          <el-table-column
            type="index"
            header-align="center"
            align="center"
            width="80"
            label="序号">
          </el-table-column>
          <el-table-column

            prop="inforName"
            show-overflow-tooltip
            label="其他投标单位(系统内)">
            <template slot-scope="scope">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                v-model="scope.row.orgName"
                :disabled="type === 'look'"

              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.detailName"
                  v-for="(item, index) in nameList"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="bidAmount"
            header-align="center"
            align="center"
            label="投标价"
            width="475"
            >
             <template slot-scope="scope">
                <el-form-item class="tabelForm bd-table-item" :prop="'dataList.' + scope.$index + '.bidAmount'" :rules='rules.contractAmount'>
                  <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                 <el-input type="text" v-model="scope.row.bidAmount" :disabled="type === 'look'">
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
              </template>
            <!-- <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.bidAmount"></el-input>
            </template> -->
          </el-table-column>
          <el-table-column
            :resizable="false"
            fixed="right"
            label="操作"
            show-overflow-tooltip
            align="center"
            width="100"
            :disabled="type === 'look'"
          >
            <template slot-scope="scope" >
              <el-link :underline="false" @click="del(scope.$index,'inside')" type="warning" :disabled="type === 'look'">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <div class="detail-title">
          其他投标单位(系统外):
          <el-button
            @click="add('outside',2)"
            class="detatil-flie-btn"
            type="primary"
            :disabled="type === 'look'"
          >新增</el-button >
        </div>
        <el-table class="detailTable"
          :data="detailForm.dataList2"
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
            label="序号">
          </el-table-column>
          <el-table-column
            prop="inforName"
            show-overflow-tooltip
            label="其他投标单位(系统外)">
            <template slot-scope="scope">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                v-model="scope.row.orgName"
                :disabled="type === 'look'"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.detailName"
                  v-for="(item, index) in nameList"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column
            prop="bidAmount"
            header-align="center"
            align="center"
            label="投标价"
            width="475"
            :disabled="type === 'look'">
             <template slot-scope="scope">
                <el-form-item class="tabelForm bd-table-item" :prop="'dataList2.' + scope.$index + '.bidAmount'" :rules='rules.contractAmount'>
                  <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                 <el-input type="text" v-model="scope.row.bidAmount" :disabled="type === 'look'">
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
            :disabled="type === 'look'"
          >
            <template slot-scope="scope">
              <el-link :underline="false" @click="del(scope.$index,'outside')" type="warning" :disabled="type === 'look'">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button v-if="type!='look'" type="primary" @click="sub()">确定</el-button>
    </div>
    <Tree
      v-if="treeStatas"
      ref="addOrUpdate"
      @getPosition="getPositionTree"
    ></Tree>
  </el-dialog>

</template>

<script>
import Tree from "@/components/tree";
import { isMoney } from '@/utils/validate'

  export default {
    components: {
      Tree,
      },
    data() {
        var validateMoney = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMoney(value)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        treeStatas:false,
        visible: false,
        detailForm: {
          bidInfoSection:{},
          verifySection:{},
          bidInfoSectionOrgList:[],
          dataList: [],
          dataList2: []

        },
        type:'',
        index:'',
        bdName:[],
        isBidRates:'',
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        currentRow: '',
        nameList:[
          {
          id:'0',
          detailName:'测试设施上'
          },
          {
            id:'1',
            detailName:'22222222222222测试'
          },
        ],
         rules:{
          contractAmount: [
            { required: true,validator: validateMoney, trigger: 'change' }
          ]
        },//表单验证规则
      }
    },
    mounted() {

    },
    computed:{
      bidMethod (){
        // console.log(this.$store.state.bidMethod)
        return this.$store.state.bidMethod;
      },
    },
    methods: {
    //获取项目地点的值
    getPositionTree(data) {
      this.treeStatas = false;
      this.searchform.openBidPlaceId = data.fullDetailCode;
      this.searchform.openBidPlaceName = data.fullDetailName;
      this.key = this.key + 1;
    },
    getName(id, list, name) {
      if(id){
        this.$forceUpdate()
        this.detailForm.bidInfoSection[name] = list.find(
          (item) => item.id == id
      ).detailName;
        console.log(this.detailForm.bidInfoSection[name]);
      }
    },
        //选择项目地点
    selectPosition() {
      this.treeStatas = true;
      console.log(this.positionIndex);
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init();
      });
    },
      //选中数据
      sub() {
        var bidInfoSectionOrgList=this.detailForm.dataList.concat(this.detailForm.dataList2);
        this.detailForm.bidInfoSectionOrgList=bidInfoSectionOrgList;

         this.detailForm.type=this.type;
        if(this.type=='edit'){
          this.detailForm.index=this.index;

        }
          this.$refs.detailform.validate((valid) => {
          if (valid) {
            this.visible = false;
            this.$emit('refreshBD', this.detailForm);
          }
        });

      },
      // 初始化
      init(list,isBidRates,type,detail,index) {
        this.detailForm={
            bidInfoSection:{},
            verifySection:{},
            bidInfoSectionOrgList:{},
            dataList: [],
            dataList2: []
          };
        this.type=type;
        this.index=index;
        console.log(isBidRates)
        this.visible = true;
        this.bdName=list||[];
        this.isBidRates=isBidRates;
        if(type=='edit'||type=='look'){

          detail.bidInfoSectionOrgList.forEach((item, index) => {
          if (item.orgType == '1') {
            // item.detailName = _data.detailName;
            this.detailForm.dataList.push(item)
          }else{
            this.detailForm.dataList2.push(item)
          }
         });
         this.detailForm.bidInfoSection=detail.bidInfoSection;
          console.log(this.detailForm)
        }else{
          this.detailForm={
            bidInfoSection:{},
            verifySection:{},
            bidInfoSectionOrgList:{},
            dataList: [],
            dataList2: []
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
      del(index,type){
        if(type=='inside'){
          this.detailForm.dataList.splice(index, 1);
        }else{
          this.detailForm.dataList2.splice(index, 1);
        }
      }
    }
  }
</script>
<style scoped>
>>>.el-dialog{
    height: 70vh!important;
  }
>>>.el-card__header{
  padding: 8px 20px !important;
}
>>>.el-dialog__header{
  display: none;
}
>>>.el-dialog__body{
  padding: 0;
  height: calc(100% - 60px)!important;
  width: 100%;
  overflow: hidden;
}
>>>.dialog-footer{
  padding-top: 14px;
  margin:0;
  text-align: center;
  background-color: #fafafa;
}
>>>.gcform .el-form-item{
  margin-bottom: 0px!important;
}
>>>.gcform .el-form-item__error{
  margin: -25px -7px 0 335px!important;
}
.bd-table-item  >>>.el-form-item__error{
  margin: -13px -7px 0 310px!important;
}
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
>>>.el-dialog{
  position: fixed;
  left: 10%;
  width: 80%;
}
</style>
