<template>
  <div>
     <el-dialog
     class="bdClass"
    :lock-scroll="true"
    :visible.sync="visible"
    :append-to-body="true">
    <el-card>
      <div class="clearfix el-card__header">
        <span style="color: #2a2a7d;line-height: 32px"><b>标段信息</b></span>
        <el-button @click="close" style="float: right;">返回</el-button>
      </div>
    </el-card>
    <div style="height: calc(100% - 50px);overflow: auto;padding: 0 50px;">
      <el-form :inline="true" :model="detailForm" :rules="rules" ref="detailForm" @keyup.enter.native="init()"  class="gcform">
        <el-form-item label="标段名称:" class="list-item" :class="ifkb=='kbxq'?'not-error':''" prop="bidInfoSection.sectionName"
                      :rules="{
                required: true,
                message: '此项不能为空',
                trigger: ['blur'],
              }">
          <el-input v-show="type!='add'" v-model="detailForm.bidInfoSection.sectionName" disabled></el-input>
          <el-select
            v-show="type=='add'"
            clearable
            placeholder=""
            v-model="detailForm.bidInfoSection.sectionId"
            @change="
                getName2(
                  detailForm.bidInfoSection.sectionId,
                  bdName,
                  'sectionName'
                )"
            :disabled="type === 'look'||type=='eidtnew'">
          <el-option
              :key="index"
              :label="item.sectionName"
              :value="item.uuid"
              v-for="(item, index) in bdName"
            ></el-option>
            </el-select>

        </el-form-item>

          <el-form-item label="参与投标单位:" class="list-item"
           prop="bidInfoSection.participatingUnitsName"
          >
          <el-input  placeholder="请输入内容" v-model="detailForm.bidInfoSection.participatingUnitsName" class="input-with-select" disabled>
            <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('参与投标单位',detailForm.bidInfoSection.participatingUnitsId)" ></el-button>
          </el-input>
          <!-- <el-input
          v-model="detailForm.bidInfoSection.participatingUnitsName"
          placeholder="参与投标单位"
          clearable :disabled="type === 'look'">
            <el-button
            slot="append"
            icon="el-icon-search"
            @click="selectPosition()"
          ></el-button>
          </el-input> -->
        </el-form-item>
        <el-form-item label="编标拟配合单位:" class="list-item">
          <el-input  placeholder="请输入内容" v-model="detailForm.bidInfoSection.orgName" class="input-with-select" disabled>
            <el-button v-if="type != 'look'&&type != 'eidtnew'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('编标拟配合单位',detailForm.bidInfoSection.orgId)" ></el-button>
          </el-input>
          <!-- <el-input
          v-model="detailForm.bidInfoSection.orgName"
          placeholder="编标拟配合单位"
          clearable
          :disabled="type === 'look'">
            <el-button
            slot="append"
            icon="el-icon-search"
            @click="selectPosition()"
          ></el-button>
          </el-input> -->
        </el-form-item>
        <el-form-item label="投资估算:" class="list-item not-error" prop="bidInfoSection.investmentReckon" :rules="rules.contractAmount2">
          <el-input @input="onInput()" v-model="detailForm.bidInfoSection.investmentReckon" placeholder="投资估算" clearable :disabled="type === 'look'" >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
          </el-input>
        </el-form-item>
          <el-form-item label="其中建安投资:" class="list-item not-error" prop="bidInfoSection.jananInvestment" :rules="rules.contractAmount2">
          <el-input @input="onInput()" v-model="detailForm.bidInfoSection.jananInvestment" placeholder="其中建安投资" clearable :disabled="type === 'look'" >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
          </el-input>
        </el-form-item>

        <el-form-item v-if="ifkb!='kbxq'" label="评标办法:" class="list-item">
                <template slot-scope="scope">
                 <el-select
                clearable
                placeholder="评标办法"
                :disabled="type === 'look'"
                @change="
                getName(
                  detailForm.bidInfoSection.bidEvaluationMethodId,
                  bidMethod,
                  'bidEvaluationMethodName',
                  'bidEvaluationMethodCode'
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
        <el-form-item v-if="ifkb=='kbxq'" label="评标办法:" class="list-item">
          <template slot-scope="scope">
            <el-select
              clearable
              placeholder="评标办法"
              :disabled="type === 'look'&&ifkb!='kbxq'"
              @change="
                getName(
                  detailForm.bidInfoSection.bidEvaluationMethodId,
                  bidMethod,
                  'bidEvaluationMethodName',
                  'bidEvaluationMethodCode'
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
        <el-form-item
          v-if="ifkb=='kbxq'||ifkb=='pass'"
          label="开标金额(万元):"
          class="list-item"
          prop="bidInfoSection.openBidAmount"
          :rules="ifkb=='kbxq'?rules.isMustMoney:type=='eidtnew'?rules.contractAmount:''"
        >
          <el-input
            v-model="detailForm.bidInfoSection.openBidAmount"
            clearable
            placeholder="开标金额(万元)"
            :disabled="type === 'look'&&ifkb!='kbxq'"
          >
            <template slot="prepend">¥</template>
            <template slot="append">(万元)</template>
          </el-input>
          <!-- <el-input v-model="detailForm.bidInfoSection.tenderSecurity" placeholder="投标保证金(万元)" clearable></el-input> -->
        </el-form-item>
        <el-form-item label="开标地点:" class="list-item" :class="ifkb=='kbxq'?'not-error':''" prop="bidInfoSection.openBidPlaceName"
                      :rules="{
                required: true,
                message: '此项不能为空',
                trigger: ['blur'],
              }">
          <el-input v-model="detailForm.bidInfoSection.openBidPlaceName"
          placeholder="开标地点"
          clearable
          disabled
          @clear="searchform.openBidPlaceId=''"
          >
          <el-button
            v-if="type != 'look'&&type != 'eidtnew'"
            slot="append"
            icon="el-icon-search"
            @click="selectPosition()"
          ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="开标日期:" :class="ifkb=='kbxq'?'not-error':''" class="list-item"  prop="bidInfoSection.dateOfBidOpeningName"
                      :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
        >
          <el-date-picker
            width="100%"
            filterable
            clearable
            type="date"
            value-format="timestamp"
            :disabled="type === 'look'||type=='eidtnew'"
            v-model="detailForm.bidInfoSection.dateOfBidOpeningName"
          >
          </el-date-picker>
        </el-form-item>


        <br>

        <el-form-item label="投标保证金(万元):" class="list-item not-error" prop="bidInfoSection.tenderSecurity"  :rules="rules.contractAmount2">
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

        <el-form-item label="投标价(万元):"  v-if="isBidRates=='1'||isBidRates==''" class="list-item" :class="type!='eidtnew'&&type!='add'?'not-error':''" prop="bidInfoSection.bidPrice"  :rules="rules.contractAmount">
          <span style="color:#F56C6C;position: absolute;top: -31px;left: 0px;">*</span>
          <el-input
              v-model="detailForm.bidInfoSection.bidPrice"
              clearable
              placeholder="投标价(万元)"
              :disabled="type === 'look'"
            >
          <template slot="prepend">¥</template>
          <template slot="append">(万元)</template>
        </el-input>
        </el-form-item>
        <el-form-item label="投标限价(万元):" class="list-item" v-if="isBidRates=='1'||isBidRates==''" :class="type!='eidtnew'?'not-error':''" prop="bidInfoSection.biddingPriceLimit" :rules="rules.contractAmount">
          <span style="color:#F56C6C;position: absolute;top: -31px;left: 0px;">*</span>
          <el-input
              v-model="detailForm.bidInfoSection.biddingPriceLimit"
              clearable
              placeholder="投标限价(万元)"
              :disabled="type === 'look'"
            >
          <template slot="prepend">¥</template>
          <template slot="append">(万元)</template>
        </el-input>
        </el-form-item>


        <el-form-item v-if="isBidRates=='0'" label="投标费率(百分比):" class="list-item" prop="bidInfoSection.tenderRate"
                      :rules="isBidRates=='0'?{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }:{}"
        >
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
        <el-form-item label="项目经理:" class="list-item"
                prop="bidInfoSection.projectManager"
                      :rules="type=='eidtnew'?{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }:{}"
              >
          <el-input v-model="detailForm.bidInfoSection.projectManager" placeholder="项目经理" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item label="项目副经理:" class="list-item"
                prop="bidInfoSection.deputyProjectManager"
               >
          <el-input v-model="detailForm.bidInfoSection.deputyProjectManager	" placeholder="项目副经理" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item v-if="isBidRates=='1'||isBidRates==''" label="风险费(万元):" class="list-item not-error"  prop="bidInfoSection.riskFee"  :rules="rules.contractAmount">
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
        <el-form-item label="技术负责人:" class="list-item"
                prop="bidInfoSection.technicalDirector"
                      :rules="type=='eidtnew'?{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }:{}"
        >
          <el-input v-model="detailForm.bidInfoSection.technicalDirector" placeholder="技术负责人" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item label="安全负责人:" class="list-item"
                prop="bidInfoSection.personInChargeOfSafety"
                      :rules="type=='eidtnew'?{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }:{}"
        >
          <el-input v-model="detailForm.bidInfoSection.personInChargeOfSafety" placeholder="安全负责人" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item v-if="isBidRates=='1'||isBidRates==''" label="安全费(万元):" class="list-item not-error"  prop="bidInfoSection.safetyCost"  :rules="rules.contractAmount">
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

        <el-form-item label="财务负责人:" class="list-item"
                prop="bidInfoSection.personInChargeOfFinance"
                >
          <el-input v-model="detailForm.bidInfoSection.personInChargeOfFinance" placeholder="财务负责人" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <el-form-item label="成本负责人:" class="list-item"
                prop="bidInfoSection.costOwner"
                >
          <el-input v-model="detailForm.bidInfoSection.costOwner" placeholder="成本负责人" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <!--<el-form-item v-if="isBidRates=='1'||isBidRates==''" label="投标限价(万元):" class="list-item not-error" prop="bidInfoSection.biddingPriceLimit"  :rules="rules.contractAmount">-->
                <!--<el-input-->
                    <!--v-model="detailForm.bidInfoSection.biddingPriceLimit"-->
                    <!--clearable-->
                    <!--placeholder="投标限价(万元)"-->
                    <!--:disabled="type === 'look'"-->
                  <!--&gt;-->
                <!--<template slot="prepend">¥</template>-->
                <!--<template slot="append">(万元)</template>-->
              <!--</el-input>-->
          <!--&lt;!&ndash; <el-input v-model="detailForm.bidInfoSection.biddingPriceLimit" placeholder="投标限价(万元)" clearable></el-input> &ndash;&gt;-->
        <!--</el-form-item>-->
<br>
        <el-form-item label="其他未列出单位(单位与单位之间用英文逗号隔开):" >
          <el-input
          class="textarea_qt"
          v-model="detailForm.bidInfoSection.otherUnitsNotListed"
          placeholder="其他未列出单位(单位与单位之间用英文逗号隔开)"
          clearable
          :disabled="type === 'look'"
          :autosize="{ minRows: 2, maxRows: 4}"
          type="textarea"></el-input>
        </el-form-item>

        <div class="detail-title">
          其他投标单位(系统内):
          <el-button
            @click="add('inside',1)"
            class="detatil-flie-btn"
            type="primary"
            :disabled="type === 'look'"
            v-if="!(type === 'look')"
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
              <!--<el-select-->
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
                <!--:disabled="type === 'look'"-->

              <!--&gt;-->
                <!--<el-option-->
                  <!--:key="index"-->
                  <!--:label="item.detailName"-->
                  <!--:value="item.id"-->
                  <!--v-for="(item, index) in nameList"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
              <el-input  placeholder="请输入内容" v-model="scope.row.orgName" class="input-with-select" :disabled="type === 'look'">
                <el-button v-if="type != 'look'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('其他投标单位(系统内)',scope.row.orgId,false,scope.$index,detailForm.dataList)" ></el-button>
              </el-input>
            </template>
          </el-table-column>

          <el-table-column
            prop="bidAmount"
            header-align="center"
            align="center"
            label="开标价"
            width="475"
            v-if="ifkb=='kbxq'||ifkb == 'pass'"
            >
             <template slot-scope="scope">
                <el-form-item class="tabelForm bd-table-item not-error" :prop="'dataList.' + scope.$index + '.bidAmount'" :rules='rules.contractAmount'>
                 <el-input type="text" v-model="scope.row.bidAmount" :disabled="type === 'look'&&ifkb!='kbxq'">
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
            :disabled="type === 'look'||type=='eidtnew'"
            v-if="!(type === 'look')"
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
            v-if="!(type === 'look')"
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
                v-model="scope.row.orgId"
                  @change="
                  getBdName(
                    scope.row.orgId,
                    detailForm.dataList2,
                    scope.$index
                  )
                "
                :disabled="type === 'look'"
              >
                <el-option
                  :key="index"
                  :label="item.companyName"
                  :value="item.uuid"
                  v-for="(item, index) in sjdwList"
                ></el-option>
              </el-select>

            </template>
          </el-table-column>

          <!-- <el-table-column
            prop="bidAmount"
            header-align="center"
            align="center"
            label="投标价"
            width="475"
            :disabled="type === 'look'">
             <template slot-scope="scope">
                <el-form-item class="tabelForm bd-table-item" :prop="'dataList2.' + scope.$index + '.bidAmount'" :rules='rules.contractAmount'>
                 <el-input type="text" v-model="scope.row.bidAmount" :disabled="type === 'look'">
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
              </template>
          </el-table-column> -->
          <el-table-column
            prop="bidAmount"
            header-align="center"
            align="center"
            label="开标价"
            width="475"
            v-if="ifkb=='kbxq'||ifkb == 'pass'"
          >
            <template slot-scope="scope">
              <el-form-item class="tabelForm bd-table-item not-error" :prop="'dataList.' + scope.$index + '.bidAmount'" :rules='rules.contractAmount'>
                <el-input type="text" v-model="scope.row.bidAmount" :disabled="type === 'look'&&ifkb!='kbxq'">
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
            :disabled="type === 'look'||type=='eidtnew'"
            v-if="!(type === 'look')"
          >
            <template slot-scope="scope">
              <el-link :underline="false" @click="del(scope.$index,'outside')" type="warning" :disabled="type === 'look'">删除</el-link>
            </template>
          </el-table-column>
          </el-table>

      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button v-if="type!='look'&&type!='eidtnew'" type="primary" @click="sub()">确定</el-button>
      <el-button v-if="ifkb=='kbxq'&&type=='eidtnew'" type="primary" @click="sub()">确定</el-button>
    </div>

    </el-dialog>
    <Tree v-if="treeStatas" ref="addOrUpdate"  @getPosition="getPositionTree" ></Tree>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>




  </div>


</template>

<script>
import CompanyTree from '../contractManager/companyTree'
import Tree from "@/components/tree";
import { isMoney } from '@/utils/validate'

  export default {
  components: {
    Tree,
    CompanyTree,
    },
    data() {
        const validateMustMoney = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('此项不能为空'))
          } else if (!isMoney(value)) {
            callback(new Error('请输入正确的金额格式'))
          } else {
            callback()
          }
        }
        var validateMoney = (rule, value, callback) => {
        // console.log(this.type)
        if((this.type=='add'||this.type=='eidtnew'||this.type=='edit')&&value===''){
          callback(new Error('不能为空'))
        }else if (value!=''&&value!=null&&!isMoney(value)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      var validateMoney2= (rule, value, callback) => {
        // console.log(this.type)
       if (value!=''&&value!=null&&!isMoney(value)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        treeStatas:false,
        visible: false,
        DwVisible:false,//选择单位弹框状态
        detailForm: {
          bidInfoSection:{
            sectionName:'',
            participatingUnitsName:'',
            participatingUnitsId:'',
            openBidPlaceName:'',
            biddingPriceLimit:'',
            jananInvestment:'',
            investmentReckon:'',
            orgId:'',
            orgName:'',
          },
          verifySection:{},
          bidInfoSectionOrgList:[],
          dataList: [],
          dataList2: []

        },
        ifkb:'',
        type:'',
        index:'',
        bdName:[],
        isBidRates:'',
        pageIndex: 1,
        pagesize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        currentRow: '',
        sjdwList:[],//共享单位库
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
          ],
           contractAmount2: [
             { required: true,validator: validateMoney2, trigger: 'change' }
           ],
           isMustMoney: [{ required: true, validator: validateMustMoney, trigger: ['blur', 'change'] }],
        },//表单验证规则
      }
    },
    mounted() {
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
      //获取标段名字
      getBdName(id, list, index) {
        // console.log(id,list,index)
        if(id){
          this.$forceUpdate()
          list[index].orgName=this.sjdwList.find(
            (item) => item.uuid == id).companyName;
        }
      },
      onInput(){
        this.$forceUpdate();
      },
      //获取标段名称
      getName2(id, list, name,code) {
        if (id) {
          this.$forceUpdate();
          this.detailForm.bidInfoSection[name] = list.find(
            (item) => item.uuid == id
          ).sectionName;
          // 填入相关数据
          let data = []
          data = list.find( (item) => item.uuid == id )
          this.detailForm.bidInfoSection.participatingUnitsName  = data.verifySectionOrgNameType01
          this.detailForm.bidInfoSection.participatingUnitsId  = data.verifySectionOrgCodeType01
          this.detailForm.bidInfoSection.orgId  = data.verifySectionOrgCodeType02
          this.detailForm.bidInfoSection.orgName  = data.verifySectionOrgNameType02
          this.detailForm.bidInfoSection.investmentReckon  = data.investmentReckon
          this.detailForm.bidInfoSection.jananInvestment  = data.jananInvestment
        }
      },
    close(){
        // this.$refs['detailForm'].clearValidate();
        this.visible = false;
        // 回传参与投标单位
        // console.info(this.detailForm.bidInfoSection.participatingUnitsName)
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
      // console.log(data);
      var id=[],name=[];
      if(data&&data.type!="其他投标单位(系统内)"){
        data.forEach((item)=>{
          id.push(item.id);
          name.push(item.detailName);
        })
      }
      if(data.type=="参与投标单位"){
        this.detailForm.bidInfoSection.participatingUnitsId=id.join(",");
        this.detailForm.bidInfoSection.participatingUnitsName=name.join(",");
        this.$forceUpdate();
      }else if(data.type=="编标拟配合单位"){
        this.$forceUpdate();
        this.detailForm.bidInfoSection.orgId=id.join(",");
        this.detailForm.bidInfoSection.orgName=name.join(",");
      }else if(data.type=="其他投标单位(系统内)"){
        this.$forceUpdate()
        this.detailForm.dataList[data.index].orgId=data.code;
        this.detailForm.dataList[data.index].orgName=data.name;
      }
      this.DwVisible=false;
    },
    //获取项目地点的值
    getPositionTree(data) {
      this.treeStatas = false;
      // console.log(data)
      this.detailForm.bidInfoSection.openBidPlaceId = data.fullDetailCode;
      this.detailForm.bidInfoSection.openBidPlaceName = data.fullDetailName;
      this.key = this.key + 1;
    },
    getName(id, list, name ,code) {
      if(id){
        this.$forceUpdate()
        this.detailForm.bidInfoSection[name] = list.find(
          (item) => item.id == id
      ).detailName;
          this.detailForm.bidInfoSection[code] = list.find(
              (item) => item.id == id
          ).detailCode;
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
        if(this.type=='edit'||this.type=='eidtnew'){
          this.detailForm.index=this.index;
        }
        if((this.type=='add'||this.type=='eidtnew'||this.type=='edit')&&(this.isBidRates=='1'||this.isBidRates=='')) {
          // detailForm.bidInfoSection.bidPrice
          if (this.detailForm.bidInfoSection.biddingPriceLimit == '' ||this.detailForm.bidInfoSection.biddingPriceLimit == null) {
            this.$message({
              showClose: true,
              message: '请填写投标限价！',
              type: 'error'
            });
            return false            
          } else if (this.detailForm.bidInfoSection.bidPrice == ''|| this.detailForm.bidInfoSection.bidPrice == null) {
            this.$message({
              showClose: true,
              message: '请填写投标价！',
              type: 'error'
            });
            return false   
          }

        }
        this.$refs.detailForm.validate((valid) => {
          console.log(this.detailForm)
          if (valid) {
            this.visible = false;
            this.$emit('refreshBD', this.detailForm);
            // 回传参与投标单位
            // console.info(this.detailForm.bidInfoSection.participatingUnitsName)
            this.$message({
              showClose: true,
              message: '保存成功！',
              type: 'success'
            });
          } else {
            this.$message.error("请添加必填项");
            return false;
          }
        });
      },
      // 初始化
      init(list,isBidRates,type,detail,index,ifkb) {
        this.detailForm={
            bidInfoSection:{ participatingUnitsName:'',openBidPlaceName:''},
            verifySection:{},
            bidInfoSectionOrgList:{},
            dataList: [],
            dataList2: []
          };
        this.type=type;
        this.index=index;
        this.visible = true;
        this.bdName=list||[];
        this.isBidRates=isBidRates;
        this.ifkb=ifkb;
        // console.info(type,'type')
        // console.info(ifkb,'ifkb')
        if(type=='edit'||type=='look'||type=="eidtnew"){
          detail.bidInfoSectionOrgList.forEach((item, index) => {
          if (item.orgType == '1') {
            this.detailForm.dataList.push(item)
          }else{
            this.detailForm.dataList2.push(item)
          }
         });
         this.detailForm.bidInfoSection=detail.bidInfoSection;
        }else{
          this.detailForm={
            bidInfoSection:{participatingUnitsName:'',openBidPlaceName:''},
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
>>>.el-date-editor{
  width: 100%!important;
}
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
>>>.el-table .cell.el-tooltip{
padding: 10px 10px;
}
  >>>.el-form-item__label:before{
    left:0!important;
  }
  >>>.is-required .el-form-item__label{
    padding-left: 10px!important;
  }
</style>
