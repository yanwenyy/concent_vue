<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color: #2a2a7d"><b>投标管理详情</b></span>
        <el-button
          @click="back"
          style="
            float: right;
            padding: 10px 20px;
            border: 1px solid #ddd;
            color: black;
            "
          type="text">返回
          </el-button>
      </div>

      <div class="detailBox">
      <div class="detail-class-tltle">项目前期信息:</div>
        <el-form
          :inline="false"
          :model="detailform"
          class="gcform"
          ref="detailform"
          style="background: white； height: ceil(100%-300px)"
        >

            <el-form-item label="项目板块:">
              <el-input
                disabled
                filterable
                size="mini"
                v-model="detailform.topInforBO.topInfor.moduleName">
              </el-input>
            </el-form-item>

            <el-form-item label="工程类别(一级):">
              <el-input
                 disabled
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInforBO.topInfor.enginTypeFirstName"
              >
              </el-input>
            </el-form-item>

            <el-form-item
              label="工程类别(二级):"
            ><!-- :disabled="p.actpoint === 'look'" -->
              <el-input
                disabled
                placeholder="工程类别(二级)"
                v-model="detailform.topInforBO.topInfor.enginTypeSecondName"
              >
              </el-input>
            </el-form-item>
            <el-form-item  label="项目名称:">
              <el-input
                disabled
                clearable
                size="mini"
                v-model="detailform.topInforBO.topInfor.inforName"/>
            </el-form-item>

            <el-form-item  label="建设单位:">
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.constructionOrg"
              />
            </el-form-item>
            <el-form-item label="公告类型:">
              <el-input
                disabled
                placeholder="公告类型"
                v-model="detailform.topInforBO.topInfor.noticeTypeName"
              >

              </el-input>
            </el-form-item>
          <!-- 下拉 -->
            <el-form-item label="预计招标时间:">
              <el-date-picker
                disabled
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="detailform.topInforBO.topInfor.planBidTime"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="所属线路:">
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.belongLineName"
              >

              </el-input>
            </el-form-item>
            <!-- --------------------------------------------------------------- -->
            <el-form-item label="招标人:">
              <el-input
                disabled
                size="mini"
                v-model="detailform.topInforBO.topInfor.bidPerson"
              />
            </el-form-item>
            <el-form-item label="设计单位:">
              <el-input
                disabled
                size="mini"
                v-model="detailform.topInforBO.topInfor.designOrg"
              />
            </el-form-item>

            <el-form-item label="招标代理公司:">
              <el-input
                disabled
                size="mini"
                v-model="detailform.topInforBO.topInfor.bidAgentCompany"
              />
            </el-form-item>
            <el-form-item
              label="项目性质(一级):"
            >
              <el-input
                 disabled
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInforBO.topInfor.projectNatureFirstName"
              >
              </el-input>
            </el-form-item>

                        <el-form-item
              label="项目性质(二级):"
            >
              <el-input
                 disabled
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInforBO.topInfor.projectNatureSecondName"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="资审方式:">
              <el-input
                disabled
                clearable
                placeholder="资审方式"
                size="mini"
                v-model="detailform.topInforBO.topInfor.verifyTypeName"
              />
            </el-form-item>

            <el-form-item label="资金来源:">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailform.topInforBO.capitalName.capitalName"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="投资额（万元）:">
              <el-input
                disabled
                clearable
                placeholder="投资额（万元）:"
                v-model="detailform.topInforBO.topInfor.investment"
              />
            </el-form-item>
            <el-form-item  label="新兴市场(一级):">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailform.topInforBO.topInfor.marketFirstName"
              >
              </el-input>
            </el-form-item>

            <el-form-item  label="新兴市场(二级):">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailform.topInforBO.topInfor.marketSecondName"
              >
              </el-input>
            </el-form-item>

            <el-form-item  label="是否为重大项目:">
              <el-input
                disabled
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInforBO.topInfor.bidProbName"
              >
              </el-input>
            </el-form-item>

            <el-form-item  label="预计中标概率:">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailform.topInforBO.topInfor.bidProbName"
              >
              </el-input>
            </el-form-item>

            <div>
              <el-form-item   class="formItem" label="项目跟踪负责人:">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailform.topInforBO.topInfoOrg.projectTrackResponPerson"
              >
              </el-input>
              </el-form-item>

              <el-form-item  class="formItem"  label="联系电话:">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailform.topInforBO.topInfoOrg.contactMode"
              >
              </el-input>
              </el-form-item>

            </div>


            <div>
            <el-form-item
              class="neirong"
              label="项目内容:"
              style="width: 100%"
            >
              <el-input
                disabled
                type="textarea"
                clearable
                placeholder="请输入"
                size="mini"
                v-model="detailform.topInforBO.topInfor.inforContent"
              />
            </el-form-item>
            </div>
<div>
  <div class="detail-class-tltle">投标信息:</div>
            <el-form-item
            class="formItem"
              label="投标截止日期:"
              prop="bidInfo.endTime"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                value-format="timestamp"
                clearable
                filterable
                size="mini"
                v-model="detailform.bidInfo.endTime"
              >
              </el-date-picker>
            </el-form-item>


            <el-form-item
            class="formItem"
              label="招标公告发布日期:"
              prop="bidInfo.publishTime"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                size="mini"
                value-format="timestamp"
                v-model="detailform.bidInfo.publishTime"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item
             class="formItem"
              label="招标文件发售截止日期"
            >
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                value-format="timestamp"
                filterable
                clearable
                size="mini"
                v-model="detailform.bidInfo.saleTime"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item
              label="招标方式:"
              class="formItem"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                size="mini"
                v-model="detailform.bidInfo.bidModeName"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in bidType"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
            class="formItem"
              label="是否联合体投标:"
              prop="bidInfo.isCoalitionBid"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-select
              :disabled="p.actpoint === 'look'"
                clearable
                size="mini"
                v-model="detailform.bidInfo.isCoalitionBid"
              >
              <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in yesOrNo"
                ></el-option>
                </el-select>
            </el-form-item>


            <el-form-item
            class="formItem"
              label="是否为费率招标:"
              prop="bidInfo.isBidRates"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-select
              :disabled="p.actpoint === 'look'"
                clearable
                placeholder=""
                size="mini"
                v-model="detailform.bidInfo.isBidRates">
              <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in yesOrNo"
                ></el-option>
                </el-select>
            </el-form-item>

              <el-form-item label="内部联合体单位:"
              v-if="detailform.bidInfo.isCoalitionBid==='0'"
              class="formItem1" >
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                multiple
                placeholder="请选择"
                size="mini"
                v-model="detailform.bidInfoInnerOrgList.innerOrgName"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in amountSource"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="formItem1"
            v-if="detailform.bidInfo.isCoalitionBid==='0'"
                label="外部联合体单位:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder=""
                  size="mini"
                  v-model="detailform.bidInfo.outOrg"
                />
              </el-form-item>

</div>


          <div>
            <el-form-item
              class="neirong"
              label="投标说明(最多1000字):"
              prop="bidInfo.bidExplain"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',

              }"
              style="width: 100%"
            >
              <el-input
               :disabled="p.actpoint === 'look'"
                type="textarea"
                clearable
                placeholder="请输入"
                size="mini"
                v-model="detailform.bidInfo.bidExplain"
              />
            </el-form-item>
          </div>
          <el-row>
            <el-form-item
              class="neirong"
              label="附件（最大10MB）:"
              prop=""
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
           <el-upload
              class="upload-demo detailUpload"
              :action="'/api/topInfo/CommonFiles/bidInfo/01/uploadFile'"
              :on-success="handleChange"
              :on-error="handleChange"
              :on-remove="handleRemove"
                multiple
              >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            </el-form-item>
          </el-row>

          <p style="overflow: hidden">
            <span style="float: left">标段信息: </span>
            <!-- @click="add('bd')" -->
            <el-button
              @click="openBd('add')"
              size="mini"
              style="
                float: right;
                width: 70px;
                height: 32px;
                background: #5c8bfa;
                font-size: 16px;
              "
              type="primary"
              >新增</el-button
            >
          </p>

          <el-table
          @row-dblclick="openBd('look')"
            :data="detailform.bidInfoSectionList"
            :header-cell-style="{
              'text-align': 'center',
              'background-color': 'rgba(246,248,252,1)',
              color: 'rgba(0,0,0,1)',
            }"
            @selection-change="handleinputionChange"
           align="center"
            border
            class="clothSizeTable"
            ref="table"
            style="width: 100%; min-height: calc(100vh - 370px)"
          >
            <el-table-column
              :width="80"
             align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="标段名称"
              prop="bidInfoSection.sectionName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>
<!-- prop在table时回显 ,在from里面判断-->
            <el-table-column
              :resizable="false"
              label="风险费(万元)"
              prop="bidInfoSection.riskFee"
              show-overflow-tooltip
              align="center"
              :width="180"
              v-if="detailform.bidInfo.isBidRates==='1'"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="安全费(万元)"
              prop="bidInfoSection.safetyCost"
              show-overflow-tooltip
              align="center"
              :width="180"
              v-if="detailform.bidInfo.isBidRates==='1'"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标限价(万元)"
              prop="bidInfoSection.biddingPriceLimit"
              show-overflow-tooltip
              align="center"
              :width="180"
               v-if="detailform.bidInfo.isBidRates==='1'"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标保证金(万元)"
              prop="bidInfoSection.tenderSecurity"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标费率(百分比)"
              prop="bidInfoSection.tenderRate"
              show-overflow-tooltip
              align="center"
              :width="180"
               v-if="detailform.bidInfo.isBidRates==='0'"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标价(万元)"
              prop="bidInfoSection.bidPrice"
              show-overflow-tooltip
              align="center"
              :width="180"
               v-if="detailform.bidInfo.isBidRates==='1'"
            >

            </el-table-column>

              <el-table-column
              :resizable="false"
              label="开标地点"
              prop="bidInfoSection.openBidPlaceName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="评标办法"
              prop="bidInfoSection.bidEvaluationMethodName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="开标日期"
              prop="bidInfoSection.dateOfBidOpeningName"
              show-overflow-tooltip
              align="center"
              :width="180"
              value-format="timestamp"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="参与投标单位"
              prop="bidInfoSection.participatingUnitsName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="其他投标单位(系统内)"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.bidInfoSectionOrgList">{{item.orgType==1?item.orgName:''}}{{index < scope.row.bidInfoSectionOrgList.length-1? ',':''}}</span>

              </template>

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="其他投标单位(系统外)"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
                <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.bidInfoSectionOrgList">{{item.orgType==2?item.orgName:''}}{{index < scope.row.bidInfoSectionOrgList.length-1? ',':''}}</span>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="其他未列出单位"
              prop="bidInfoSection.otherUnitsNotListed"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目经理"
              prop="bidInfoSection.projectManager"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目副经理"
              prop="bidInfoSection.deputyProjectManager"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="技术负责人"
              prop="bidInfoSection.technicalDirector"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="安全负责人"
              prop="bidInfoSection.personInChargeOfSafety"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="财务负责人"
              prop="bidInfoSection.personInChargeOfFinance"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="成本负责人"
              prop="bidInfoSection.costOwner"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

              <el-table-column
                v-show="!p.actpoint === 'look'"
                :resizable="false"
                fixed="right"
                label="操作"
                align="center"
                show-overflow-tooltip
                v-if="p.actpoint !== 'look'"
                width="200">
                <template slot-scope="scope">
                  <el-link
                    :underline="false"
                    @click="del(scope.$index,scope.row,detailform.bidInfoSectionList,'bd')"
                    type="warning">删除
                  </el-link>
                    <el-link
                    :underline="false"
                    @click="openBd('edit',scope.row,scope.$index)"
                    type="warning">修改
                  </el-link>
                </template>
              </el-table-column>

          </el-table>
        </el-form>
      </div>
    </el-card>
        <div class="btn-group" v-show="p.actpoint != 'look'">
      <el-button type="primary" @click="saveInfo('detailform')">保存</el-button>
      <el-button @click="saveInfo('detailform')">提交</el-button>
    </div>
    <add-bd  v-if="BDCSVisible" ref="infoBD" @refreshBD="getBdInfo"></add-bd>
  </div>

</template>

<script>
import { isMoney } from '@/utils/validate'
 import AddBd from './addBd'
export default {
  data() {
  var validateMoney = (rule, value, callback) => {
      if(value===''){
        callback(new Error('不能为空'))
      }else if (!isMoney(value)) {
        callback(new Error('请输入正确的金额格式'))
      } else {
        callback()
      }
    }
    return {
       BDCSVisible:false,//标段新增弹框状态
      options1: [{ label: "值", value: "111" }],
      detailform: {
        bidInfo: {},
        bidInfoInnerOrgList: [],
        bidInfoSectionList:[],
        topInforBO:{
          capitalName:'',
          topInfor:{}
        }
      },
      fileList:[],
      bidInfoSection:[],
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      yesOrNo:[
          {
            id:'0',
            detailName:'是'
          },
          {
            id:'1',
            detailName:'否'
          }
        ],
        rules:{
          contractAmount: [
            { required: true,validator: validateMoney, trigger: 'change' }
          ]
        },//表单验证规则
    };
  },
  components: {
    AddBd,
  },
  computed: {
      bidType() {
        return this.$store.state.bidType;
      },
      // yesOrNo(){
      //   return this.$store.state.yesOrNo;
      // }

  },
  methods: {
     //打开标段弹框
    openBd(type,detail,index){
      this.BDCSVisible = true;
      this.$nextTick(() => {
        this.$refs.infoBD.init(this.detailform.topInforBO.topInfoSectionList,this.detailform.bidInfo.isBidRates,type,detail,index);
      })
    },
    //获取新增的标段
    getBdInfo(data){
      console.log(data);
      if(data.type=='add'){
        this.detailform.bidInfoSectionList.push(data)
      }else if(data.type=='edit'){
        this.detailform.bidInfoSectionList[data.index]=data;
      }

      this.BDCSVisible=false;
    },
    handleRemove(file, fileList) {
         this.$http
          .post(
            "/api/topInfo/CommonFiles/list/delete",
            {ids:[file.response.data.uuid]},
          )
          .then((res) => {
            if (res.data.code === 200) {
               this.fileList=fileList;
            }
          });
        console.log(this.fileList)
      },
    //上传附件
    handleChange(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
          this.fileList.push(response.data.fileName);
          console.log(fileList)
        }
      })
      } else {
        this.$message.error(response.msg)
      }
    },
    //null转空字符串
    nullToStr(data){
      // console.log('1111111',data)
        for (let x in data) {
        if (data[x] === null) { // 如果是null 把直接内容转为 ''
          data[x] = '';
        } else {
          if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
            data[x] = data[x].map(z => {
              return this.nullToStr(z);
            });
          }
          if(typeof(data[x]) === 'object'){ // 是json 递归继续处理
            data[x] = this.nullToStr(data[x])
          }
        }
      }
      //  console.log('2222222',data)
      return data;
    },
    //新增标段
    add(type) {
      var v = {
        bidInfoSection:{}
      };
      v = {
            riskFee:""
          }
          this.detailform.bidInfoSectionList.push(v);
          console.log(v)
      },
      //获取下拉框id和name的公共方法
    getName(id, list, name) {
        if(id){
          this.$forceUpdate()
          this.detailform.topInfor[name] = list.find(
            (item) => item.id == id
          ).detailName;
          console.log(this.detailform.topInfor[name]);
        }
      },
      saveInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                "/api/topInfo/BidInfo/detail/saveOrUpdate",
                JSON.stringify(this.detailform),
                {useJson: true}
              )
              .then((res) => {
                if (res.data.code === 200) {
                  this.$message({
                    message: "保存成功",
                    type: "success",
                  });
                  this.$refs[formName].resetFields();
                  this.$router.push({
                    path: "/manage/bid_info/list",
                  });
                }
              });
          } else {
            this.$message.error("请添加必填项");
            return false;
          }
        });
      },

    pageGo() {
      this.searchParam.current = this.current;
      this.getuserlist();
    },
    showinputchg() {},
    partchg(row) {
      row.showinput = false;
    },

    // 删除
      del(index,item,list,type) {
        console.log(index);
        if(item.uuid&&type=='bd'){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                "/api/topInfo/BidInfo/list/delete",
                {ids: [item.uuid]}
              )
              .then((res) => {
                if (res.data && res.data.code === 200) {
                  list.splice(index, 1);
                  console.log(list)
                } else {
                  this.$message.error(data.msg)
                }
              });
          }).catch(() => {})
        }else{
          list.splice(index, 1);
        }
        // var _self = this;
        // _self.detailform.topInfoSectionList.splice(index, 1);
      },

    back() {
      this.$router.push({
        path: "/manage/bid_info/list",
      });
    },


    show(type) {
      this.type = type;
      if (type === "add") {
        this.resetinfo();
        this.title = "新增";
        this.detailform.clothSizePartList.push(this.sizeform);
        // this.dialogVisibleAdd = true
      }
    },
    resetinfo() {
      this.sizeform = {
        id: "",
        part: "",
        showinput: true,
      };
    },
    handleClose(done) {
      this.resetform("form");
      done();
    },
    resetform(formName) {
      this.$refs[formName].resetFields();
    },
    carry(formName) {
      if (
        [...new Set(this.detailform.clothSizePartList.map((item) => item.part))]
          .length < this.detailform.clothSizePartList.length
      ) {
        this.$message.error("部位填写重复");
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post(
              "/api/topInfo/BidInfo/detail/saveOrUpdate",
              JSON.stringify(this.detailform),
              { useJson: true }
            )
            .then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.$refs[formName].resetFields();
              }
              if (res.data.code === 10) {
                this.errorMsg = Math.random();
                this.errorMsg0 = Math.random();
                this.$nextTick(() => {
                  this.errorMsg = res.data.msg;
                  this.errorMsg0 = " ";
                });
              }
            });
        } else {
          this.$message.error("请添加必填项");
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post(
              "/api/basicConfig/ClothSize/detail/save",
              JSON.stringify(this.detailform),
              { useJson: true }
            )
            .then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
              }
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    sure() {
      console.log(this.sizeform);
      this.$refs["sizeform"].validate((valid) => {
        if (valid) {
          this.detailform.clothSizePartList.push(this.sizeform);
          this.dialogVisibleAdd = false;
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },

    // 详情信息
    getDetail() {

        console.log(this.p.actpoint)
        var q=this.p.actpoint === "edit"||(this.p.actpoint === "look"&&this.p.flowStatus!=null)?{id:this.id}:{topInfoOrgId:this.id};
        console.log(q)
        this.$http
          .post("/api/topInfo/BidInfo/detail/entityInfo", q)
          .then((res) => {
            var datas=res.data.data;
            datas.bidInfo=this.nullToStr(datas.bidInfo);
            // cons ole.log(datas.bidInfo)
            this.detailform={
              bidInfo:datas.bidInfo,
              bidInfoInnerOrgList: datas.bidInfoInnerOrgList,
              bidInfoSectionList: datas.bidInfoSectionList||[],
              topInforBO: this.nullToStr(datas.topInforBO),
            }
            console.log(this.detailform.topInforBO)
          });


    },

    handleinputionChange(val) {
      this.multipleinpution = val;
    },
  },
  mounted() {
    // this.id=this.p.instid;
    this.id=this.p.instid;
    this.$store.dispatch("getConfig", {});
      if (this.p.actpoint === "edit"||this.id) {
        this.getDetail();
      }
  },
};
</script>
<style lang="scss" scoped>
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
    >.el-form-item,>>>.formItem {
      // float: left;
      display: inline-block;
      width: 32.5% !important;
    }
        >.el-form-item,>>>.formItem1 {
      // float: left;
      display: inline-block;
      width: 32.5% !important;
      // display: none;
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
    .errorMsg .el-form-item__label {
      color: red;
    }
    .el-input {
      width: 300px;
    }
    .el-input .el-input_inner {
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

  .clothSizeTable {
    /*td {*/
      /*padding: 0;*/
    /*}*/
    .el-form-item__content {
      height: 60px;
      line-height: 60px;
      .el-form-item__error {
        top: 42px;
      }
    }
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
    // padding: 0 100px;
    // height: 400px;
    // border: 1px solid black;
    // height: 200px;
  }

  >>>.el-input--mini .el-input__inner {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    // margin: 10px 0 0 10px;
  }

  .gcform >>>.el-input {
    width: 95% ;
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

  .gcform .el-form-item {
    margin-bottom: 0px;
  }

  .neirong .el-input--mini .el-input__inner {
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

</style>

