<template>
  <el-dialog
    :visible.sync="visible"
    :append-to-body="true">
    <div>
    <p>标段信息</p>
      <el-form :inline="true" :model="detailForm" :rules="rules" @keyup.enter.native="init()">
        <el-form-item label="标段名称:" class="list-item">
          <el-select
            clearable
            placeholder=""
            v-model="detailForm.bidInfoSection.sectionId">
          <el-option
              :key="index"
              :label="item.sectionName"
              :value="item.sectionName"
              v-for="(item, index) in bdName"
            ></el-option>
            </el-select>
        </el-form-item>


        <el-form-item v-if="isBidRates=='1'" label="风险费(万元):" class="list-item"  prop="bidInfoSection.riskFee"  :rules="rules.contractAmount">
                <el-input
                      v-model="detailForm.bidInfoSection.riskFee"
                      clearable
                      placeholder="风险费(万元)"
                    >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.riskFee" placeholder="风险费(万元)" clearable></el-input> -->
        </el-form-item>

        <el-form-item v-if="isBidRates=='1'" label="安全费(万元):" class="list-item"  prop="bidInfoSection.safetyCost"  :rules="rules.contractAmount">
                <el-input
                    v-model="detailForm.bidInfoSection.safetyCost"
                    clearable
                    placeholder="安全费(万元)"
                  >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.safetyCost" placeholder="安全费(万元)" clearable></el-input> -->
        </el-form-item>

        <el-form-item v-if="isBidRates=='1'" label="投标限价(万元):" class="list-item" prop="bidInfoSection.biddingPriceLimit"  :rules="rules.contractAmount">
                <el-input
                    v-model="detailForm.bidInfoSection.biddingPriceLimit"
                    clearable
                    placeholder="投标限价(万元)"
                  >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.biddingPriceLimit" placeholder="投标限价(万元)" clearable></el-input> -->
        </el-form-item>

        <el-form-item label="投标保证金(万元):" class="list-item" prop="bidInfoSection.tenderSecurity"  :rules="rules.contractAmount">
                <el-input
                    v-model="detailForm.bidInfoSection.tenderSecurity"
                    clearable
                    placeholder="投标保证金(万元)"
                  >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.tenderSecurity" placeholder="投标保证金(万元)" clearable></el-input> -->
        </el-form-item>

        <el-form-item v-if="isBidRates=='1'" label="投标价(万元):" class="list-item" prop="bidInfoSection.bidPrice"  :rules="rules.contractAmount">
                <el-input
                    v-model="detailForm.bidInfoSection.bidPrice"
                    clearable
                    placeholder="投标价(万元)"
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
                  >
                <!-- <template slot="prepend">¥</template>
                <template slot="append">(万元)</template> -->
              </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.tenderRate" placeholder="投标费率(百分比)" clearable></el-input> -->
        </el-form-item>
        <el-form-item label="开标地点:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.openBidPlaceName" placeholder="开标地点" clearable></el-input>
        </el-form-item>
        <el-form-item label="评标办法:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.bidEvaluationMethodName" placeholder="评标办法" clearable></el-input>
        </el-form-item>
        <el-form-item label="开标日期:" class="list-item">
          <el-date-picker
            filterable
            clearable
            type="date"
            value-format="timestamp"
            v-model="detailForm.bidInfoSection.dateOfBidOpeningName"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="参与投标单位:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.participatingUnitsName" placeholder="评标办法" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目经理:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.projectManager" placeholder="项目经理" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目副经理:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.deputyProjectManager	" placeholder="项目副经理" clearable></el-input>
        </el-form-item>
        <el-form-item label="技术负责人:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.technicalDirector" placeholder="技术负责人" clearable></el-input>
        </el-form-item>
        <el-form-item label="安全负责人:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.personInChargeOfSafety" placeholder="安全负责人" clearable></el-input>
        </el-form-item>
        <el-form-item label="财务负责人:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.personInChargeOfFinance" placeholder="财务负责人" clearable></el-input>
        </el-form-item>
        <el-form-item label="成本负责人:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.costOwner" placeholder="成本负责人" clearable></el-input>
        </el-form-item>
          <el-form-item label="编标拟配合单位:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.costOwner" placeholder="成本负责人" clearable></el-input>
        </el-form-item>
          <el-form-item label="投资估算:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.costOwner" placeholder="成本负责人" clearable></el-input>
        </el-form-item>
          <el-form-item label="其中建安投资:" class="list-item">
          <el-input v-model="detailForm.bidInfoSection.costOwner" placeholder="成本负责人" clearable></el-input>
        </el-form-item>
        <div class="list-title">
          其他投标单位(系统内):
          <el-button
            @click="add('inside',1)"
            class="detatil-flie-btn"
            size="mini"
            type="primary"
          >新增</el-button >
        </div>
        <el-table
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
            :width="500"
            prop="inforName"
            show-overflow-tooltip
            label="其他投标单位(系统内)">
            <template slot-scope="scope">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                v-model="scope.row.orgName"
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
            label="投标价">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.bidAmount"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            fixed="right"
            label="操作"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <el-link :underline="false" @click="del(scope.$index,'inside')" type="warning">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <div class="list-title">
          其他投标单位(系统外):
          <el-button
            @click="add('outside',2)"
            class="detatil-flie-btn"
            size="mini"
            type="primary"
          >新增</el-button >
        </div>
        <el-table
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
            label="ID">
          </el-table-column>
          <el-table-column
            :width="500"
            prop="inforName"
            show-overflow-tooltip
            label="其他投标单位(系统外)">
            <template slot-scope="scope">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                v-model="scope.row.orgName"
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
            :rules="rules.contractAmount">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.bidAmount"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            fixed="right"
            label="操作"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <el-link :underline="false" @click="del(scope.$index,'outside')" type="warning">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button v-if="type!='look'" type="primary" @click="sub()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { isMoney } from '@/utils/validate'
  export default {
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
        visible: false,
        detailForm: {
          bidInfoSection:{},
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
    mounted() {

    },
    methods: {
          //获取下拉框id和name的公共方法
    getName(id, list, name) {
      if(id){
        this.$forceUpdate()
        this.detailForm.bidInfoSection[name] = list.find(
          (item) => item.uuid == id
      ).sectionName;
        console.log(this.detailForm.bidInfoSection[name]);
      }
    },
      //选中数据
      sub() {
        var bidInfoSectionOrgList=this.detailForm.dataList.concat(this.detailForm.dataList2);
        this.detailForm.bidInfoSectionOrgList=bidInfoSectionOrgList;
        this.visible = false;
         this.detailForm.type=this.type;
        if(this.type=='edit'){
          this.detailForm.index=this.index;

        }
        this.$emit('refreshBD', this.detailForm)
      },
      // 初始化
      init(list,isBidRates,type,detail,index) {
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
  .list-title{
    margin: 20px 0;
  }
  .detatil-flie-btn{
    float: right;
  }
  .list-item{
    width: 45%;
  }
  .dialog-footer {
    margin-top: 50px;
    text-align: center;
  }

  >>>.el-dialog {
    width: 60%;
  }

  >>>.el-form-item__label {
    width: auto;
  }

  .inline-block {
    display: inline-block;
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
  overflow: auto;
}
p{
 font-size: 18px;
 font-weight:bolder;
}
</style>
