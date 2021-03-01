<template>
  <div>
    <div style="width: 100%;overflow: hidden;">
      <el-button-group style="float: left">
        <el-button @click="setZB" plain type="primary" :disabled="isWinBid==1">中标结果登记</el-button>
      </el-button-group>
    </div>

    <div style="margin-top: 10px">
      <el-table
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        @select="rowSelect"
        border
        highlight-current-row
        ref="table"
        tooltip-effect="dark"
      >
        <el-table-column
          :width="50"
          align="center"
          show-overflow-tooltip
          type="selection">
        </el-table-column>
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
          >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="是否中标"
          prop="isWinBid"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span> {{scope.row.isWinBid==1?'中标':scope.row.isWinBid==2?'废标':scope.row.isWinBid==3?'流标':scope.row.isWinBid==4?'未中标':'待操作'}}</span>
          </template>
        </el-table-column>

        <el-table-column
          :width="500"
          label="标段名称"
          prop="sectionName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.sectionName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          :width="500"
          label="项目名称"
          prop="inforName"
          show-overflow-tooltip
        >
        <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="中标价"
          prop="winBidPrice"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="工程类别(一级)"
          prop="enginTypeFirstName"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="工程类别(二级)"
          prop="enginTypeSecondName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="建设单位"
          prop="constructionOrg"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="项目地点"
          prop="path"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="300"
          align="center"
          label="参与投标单位"
          prop="participatingUnitsName"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="300"
          align="center"
          label="录入单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="公告类型"
          prop="noticeTypeName"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="投标截止日期"
          prop="endTime"
          show-overflow-tooltip
        >
         <template slot-scope="scope">{{
            scope.row.endTime | dateformat
            }}</template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="开标日期"
          prop="dateOfBidOpeningName"
          show-overflow-tooltip
        >
        <template slot-scope="scope">{{
            scope.row.dateOfBidOpeningName | dateformat
            }}</template>
        </el-table-column>

      </el-table>
    </div>
    <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[20, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    <info-change-search v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></info-change-search>
    <el-dialog title="中标结果登记" :visible.sync="dialogFormVisible" >
      <div>
      <el-form :inline="true" :model="zbForm" :rules="rules" ref="zbForm" @keyup.enter.native="init()"  class="gcform">
        <el-form-item label="标段名称:" class="list-item" >
          <el-select
            clearable
            placeholder=""
            v-model="zbForm.bidInfoSection.sectionName"
            disabled>
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
                disabled
                @change="
                getName(
                  zbForm.bidInfoSection.bidEvaluationMethodId,
                  bidMethod,
                  'bidEvaluationMethodName'
                )
              "
                v-model="zbForm.bidInfoSection.bidEvaluationMethodName">
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
          <el-input v-model="zbForm.bidInfoSection.openBidPlaceName"
          placeholder="开标地点"
          clearable
          disabled
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
            width="100%"
            filterable
            clearable
            type="date"
            value-format="timestamp"
            disabled
            v-model="zbForm.bidInfoSection.dateOfBidOpeningName"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="参与投标单位:" class="list-item">
          <el-input  placeholder="请输入内容" v-model="zbForm.bidInfoSection.participatingUnitsName" class="input-with-select" disabled>
            <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('参与投标单位',zbForm.bidInfoSection.participatingUnitsId)" ></el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="编标拟配合单位:" class="list-item">
           <el-input  placeholder="请输入内容" v-model="zbForm.bidInfoSection.orgName" class="input-with-select" disabled>
            <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('编标拟配合单位',zbForm.bidInfoSection.orgId)" ></el-button>
          </el-input>
        </el-form-item>
        <br>

        <el-form-item label="投标保证金(万元):" class="list-item" prop="bidInfoSection.tenderSecurity"  :rules="rules.contractAmount">
                <el-input
                    v-model="zbForm.bidInfoSection.tenderSecurity"
                    clearable
                    placeholder="投标保证金(万元)"
                    disabled
                  >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
        </el-form-item>

        <el-form-item label="投标价(万元):" class="list-item" prop="bidInfoSection.bidPrice"  :rules="rules.contractAmount">
                <el-input
                    v-model="zbForm.bidInfoSection.bidPrice"
                    clearable
                    placeholder="投标价(万元)"
                    disabled
                  >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
        </el-form-item>

        <el-form-item v-if="isBidRates=='0'" label="投标费率(百分比):" class="list-item" prop="bidInfoSection.tenderRate"  :rules="rules.contractAmount">
                <el-input
                    v-model="zbForm.bidInfoSection.tenderRate"
                    clearable
                    placeholder="投标费率(百分比)"
                    disabled
                  >
              </el-input>
        </el-form-item>
          <br>
        <el-form-item label="项目经理:" class="list-item">
          <el-input v-model="zbForm.bidInfoSection.projectManager" placeholder="项目经理" clearable disabled></el-input>
        </el-form-item>

        <el-form-item label="项目副经理:" class="list-item">
          <el-input v-model="zbForm.bidInfoSection.deputyProjectManager	" placeholder="项目副经理" clearable disabled></el-input>
        </el-form-item>

        <el-form-item v-if="isBidRates=='1'" label="风险费(万元):" class="list-item"  prop="bidInfoSection.riskFee"  :rules="rules.contractAmount">
                <el-input
                      v-model="zbForm.bidInfoSection.riskFee"
                      clearable
                      placeholder="风险费(万元)"
                      disabled
                    >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
        </el-form-item>
        <br>
        <el-form-item label="技术负责人:" class="list-item">
          <el-input v-model="zbForm.bidInfoSection.technicalDirector" placeholder="技术负责人" clearable disabled></el-input>
        </el-form-item>

        <el-form-item label="安全负责人:" class="list-item">
          <el-input v-model="zbForm.bidInfoSection.personInChargeOfSafety" placeholder="安全负责人" clearable disabled></el-input>
        </el-form-item>

        <el-form-item v-if="isBidRates=='1'" label="安全费(万元):" class="list-item"  prop="bidInfoSection.safetyCost"  :rules="rules.contractAmount">
                <el-input
                    v-model="zbForm.bidInfoSection.safetyCost"
                    clearable
                    placeholder="安全费(万元)"
                    disabled
                  >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
        </el-form-item>
          <br>

        <el-form-item label="财务负责人:" class="list-item">
          <el-input v-model="zbForm.bidInfoSection.personInChargeOfFinance" placeholder="财务负责人" clearable disabled></el-input>
        </el-form-item>

        <el-form-item label="成本负责人:" class="list-item">
          <el-input v-model="zbForm.bidInfoSection.costOwner" placeholder="成本负责人" clearable disabled></el-input>
        </el-form-item>

        <el-form-item v-if="isBidRates=='1'" label="投标限价(万元):" class="list-item" prop="bidInfoSection.biddingPriceLimit"  :rules="rules.contractAmount">
                <el-input
                    v-model="zbForm.bidInfoSection.biddingPriceLimit"
                    clearable
                    placeholder="投标限价(万元)"
                    disabled
                  >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
        </el-form-item>
          <br>
          <el-form-item label="投资估算:" class="list-item" >
          <el-input v-model="zbForm.bidInfoSection.investmentReckon" placeholder="投资估算" clearable disabled>
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
          </el-input>
        </el-form-item>
          <el-form-item label="其中建安投资:" class="list-item" >
          <el-input v-model="zbForm.bidInfoSection.jananInvestment" placeholder="其中建安投资" clearable disabled >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
          </el-input>
        </el-form-item>
<br>
        <el-form-item label="其他未列出单位(单位与单位之间用英文逗号隔开):" >
          <el-input
          class="textarea_qt"
          v-model="zbForm.bidInfoSection.otherUnitsNotListed"
          placeholder="其他未列出单位(单位与单位之间用英文逗号隔开)"
          clearable
          disabled
          :autosize="{ minRows: 2, maxRows: 4}"
          type="textarea"></el-input>
        </el-form-item>

        <div class="detail-title">
          其他投标单位(系统内):
        </div>
        <el-table class="detailTable"
          :data="zbForm.dataList"
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

            prop="orgName"
            show-overflow-tooltip
            label="其他投标单位(系统内)">
          </el-table-column>

        </el-table>

        <div class="detail-title">
          其他投标单位(系统外):
        </div>

        <el-table class="detailTable"
          :data="zbForm.dataList2"
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
            prop="orgName"
            show-overflow-tooltip
            label="其他投标单位(系统外)">
          </el-table-column>
          </el-table>


        <el-divider content-position="left" class="detailDivider">中标登记</el-divider>
    <el-form ref="zbForm" :model="zbForm" :rules="rules">
        <el-form-item label="是否中标" :label-width="formLabelWidth" >
          <template>
            <el-radio-group @change="zbForm.bidInfoSection.isOutBidOrg='1'" class="detail-radio-group" v-model="zbForm.bidInfoSection.isWinBid"  :disabled="zbType=='look'">
              <el-radio  label="1" value="1">中标</el-radio>
              <el-radio  label="2" value="2">废标</el-radio>
              <el-radio  label="3" value="3">流标</el-radio>
              <el-radio  label="4" value="4">未中标</el-radio>
            </el-radio-group>
          </template>
      <!-- <el-select v-model="zbForm.bidInfoSection.isWinBid" placeholder="请选择"> -->
        <!-- <el-option label="中标" value="1"></el-option>
        <el-option label="废标" value="2"></el-option>
        <el-option label="流标" value="3"></el-option>
        <el-option label="未中标" value="4"></el-option> -->
        <!-- <el-option label="待操作" :value="null"></el-option> -->

      <!-- </el-select> -->

    </el-form-item>
          <el-form-item
              class="list-item"
              label="中标公示网站:"
            >
              <el-input
                :disabled="zbType === 'look'"
                clearable
                placeholder="中标公示网站"
                v-model="zbForm.bidInfoSection.bidNoticeWebsite"
              />
            </el-form-item>

           <el-form-item
           label="是否系统外单位中标:"
            class="inline-formitem formItem"
            v-if="zbForm.bidInfoSection.isWinBid==='4'">
              <el-switch
              class="inline-formitem-switch"
              v-model="zbForm.bidInfoSection.isOutBidOrg"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
              :disabled="zbType=='look'"
            >
            </el-switch>
            </el-form-item>

          <el-form-item
              class="list-item"
              v-if="zbForm.bidInfoSection.isOutBidOrg === '0'"
              label="系统外中标单位:"
            >
              <el-input
                :disabled="zbType === 'look'"
                clearable
                placeholder="系统外中标单位"
                v-model="zbForm.bidInfoSection.outBidOrg"
              />
            </el-form-item>

      <el-form-item
    label="系统外中标金额"
    v-if="zbForm.bidInfoSection.isOutBidOrg==='0'"
    class="list-item"
    prop="bidInfoSection.outOrgBidMoney"
    :rules="rules.contractAmount"
    >
      <el-input
      v-model="zbForm.bidInfoSection.outOrgBidMoney"
      :disabled="zbType=='look'">
      <template slot="prepend">¥</template>
      <template slot="append">(万元)</template>
      </el-input>
    </el-form-item>

          <el-form-item
          width="100%"
              class="list-item_textarea"
              v-if="zbForm.bidInfoSection.isOutBidOrg === '0'"
              label="未中标原因:"
            >
              <el-input
              type="textarea"

                :disabled="zbType === 'look'"
                clearable
                placeholder="未中标原因"
                v-model="zbForm.bidInfoSection.notBidReason"
              />
            </el-form-item>

    <el-form-item
    label="中标价(万元)"
    v-if="zbForm.bidInfoSection.isWinBid==='1'"
    class="list-item"
    prop="bidInfoSection.winBidPrice"
    :rules="rules.contractAmount"
    >
      <el-input
      v-model="zbForm.bidInfoSection.winBidPrice"
      :disabled="zbType=='look'">
      <template slot="prepend">¥</template>
      <template slot="append">(万元)</template>
      </el-input>
    </el-form-item>

    <el-form-item
    label="中标时间"
    class="list-item"
    v-if="zbForm.bidInfoSection.isWinBid==='1'">
      <el-date-picker
      :disabled="zbType=='look'"
      width="100%"
      v-model="zbForm.bidInfoSection.bidTime"
      type="date"
      value-format="timestamp"
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>
    </el-form>
    <el-form v-if="zbForm.bidInfoSection.isWinBid==='1'">
    <p ><span >文件公示: </span>
                <el-upload

                v-show="zbType=='add'"
                  class="upload-demo detailUpload"
                  :action="'/api/contract/topInfo/CommonFiles/bidInfo/03/uploadFile'"
                :headers="{'Authorization':Authorization}"
                  :on-success="handleChange"
                  :on-error="handleChange"
                  :on-remove="handleRemove"
                  :show-file-list="false"
                  multiple
                >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    </p>

              <el-table
                :data="zbForm.bidInfo_03"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                align="center"
                border
                class="detailTable"
                ref="table"
                style="width: 98%;"
              >
                <el-table-column
                  :width="55"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column align="center" :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

                </el-table-column>

                <el-table-column
                  align="center"
                  :resizable="false"
                  label="操作"
                  width="100"
                  v-if="zbType=='add'"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
</el-form>
    </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-show="zbType=='add'" type="primary" @click="saveInfo('zbForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InfoChangeSearch from "../proposal/infoChangeSearch";
import { isMoney } from "@/utils/validate";
export default {
  name: "proposal-list-look",
  data() {
    var validateMoney = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else if (!isMoney(value)) {
        callback(new Error("请输入正确的金额格式"));
      } else {
        callback();
      }
    };
    return {
      Authorization:sessionStorage.getItem("token"),
      key: 0,
      isWinBid: "",
      dialogFormVisible: false,
      infoCSVisible: false,
      detailform: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        bidInfoSectionOrgList:[],
        bidInfo_03: [],
      },
      zbType: "add", //中标弹框打开的方式
      zbForm: {
        bidInfoSection: {},
        bidInfo_03: [],
        dataList:[],
        dataList2:[]
      },
      page: { current: 1, size: 20, total: 0, records: [] },
      showinput: false,
      sousuo: "",
      searchform: {
        current: 1,
        size: 20,
        year: "",
        name: "",
        ptype: "",
        orgid: "",
        orgname: "",
      },
      menus: [],
      multipleSelection: [],
      orgTree: [],
      bdName: [],
      isBidRates: "",
      dataListLoading: false,
      formLabelWidth: "120px",
      rules: {
        contractAmount: [
          { required: true, validator: validateMoney, trigger: "change" },
        ],
      }, //表单验证规则
    };
  },
  components: {
    InfoChangeSearch,
  },
  computed: {
    bidMethod() {
      // console.log(this.$store.state.bidMethod)
      return this.$store.state.bidMethod;
    },
  },
  methods: {
    //打开中标弹框
    setZB(isBidRates, list) {
      if (
        this.multipleSelection.length !== 1 ||
        this.multipleSelection.length > 1
      ) {
        this.$message.info("请选择一条记录进行登记操作！");
        return false;
      }
      this.$http
        .post("/api/contract/topInfo/BidInfoSection/detail/entityInfo", {
          id: this.multipleSelection[0].uuid,
        })
        .then((res) => {
          var datas = res.data.data;
          this.zbForm.dataList=[];
          this.zbForm.dataList2=[];
          this.zbType = "add";
          this.bdName = list || [];
          this.isBidRates = isBidRates;
          this.dialogFormVisible = true;
          this.zbForm.bidInfoSection = datas.bidInfoSection;
          // this.zbForm.bidInfoSectionOrgList = datas.bidInfoSectionOrgList;
          datas.bidInfoSectionOrgList.forEach((item)=>{
            if(item.orgType=='1'){
              this.zbForm.dataList.push(item);
            }else{
              this.zbForm.dataList2.push(item);
            }
          })
        });

      // this.zbForm=this.multipleSelection[0];
      // this.zbForm.bidInfoSection = JSON.parse(
      //   JSON.stringify(this.multipleSelection[0])
      // );

      // var _val=this.multipleSelection[0];
      // for (var i in _val) {
      //    this.zbForm[i]=_val[i]
      //   }
      // this.zbForm.bidInfo_03=[];
      // console.log(this.zbForm)
    },
    // 上传删除

    handleRemove(file, index) {
      this.$http
        .post("/api/contract/topInfo/CommonFiles/list/delete", {
          ids: [file.uuid],
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.zbForm.bidInfo_03.splice(index, 1);
          }
        });
    },

    //上传附件
    handleChange(response, file, fileList) {
      if (response && response.code === 200) {
        this.$message({
          message: "上传成功",
          type: "success",
          duration: 1500,
          onClose: () => {
            this.zbForm.bidInfo_03.push(response.data);
            console.log(fileList);
          },
        });
      } else {
        this.$message.error(response.msg);
      }
    },

    //行选择的时候
    rowSelect(selection, row) {
      if (selection.indexOf(row) != -1) {
        this.isWinBid = row.isWinBid;
      } else {
        this.isWinBid = "";
      }
    },
    //去新增详情页面
    goAddDetail(data) {
      console.log(data);
      let p = { actpoint: "add", instid: data.topOrgId };
      this.$router.push({
        path: "./detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
      });
    },
    search() {
      this.showinput = false;
    },
    //登记
    add() {
      if (
        this.multipleSelection.length !== 1 ||
        this.multipleSelection.length > 1
      ) {
        this.$message.info("请选择一条记录进行登记操作！");
        return false;
      }
      let p = {
        actpoint: "add",
        instid: this.multipleSelection[0].topInfoOrgId,
      };
      this.$router.push({
        path: "./detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
      });

      // this.infoCSVisible = true;
      // this.$nextTick(() => {
      //   this.$refs.infoCS.init();
      // })
    },

    // 查看
    getData() {
      this.$http
        .post(
          "/api/contract/topInfo/BidInfo/detail/loadPageDataForReg",
          this.searchform
        )
        .then((res) => {
          this.page = res.data.data;
        });
    },
    // 保存
    saveInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post(
              "/api/contract/topInfo/BidInfoSection/detail/save",
              JSON.stringify(this.zbForm),
              { useJson: true }
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.dialogFormVisible = false;
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.getData();
              }
            });
        } else {
          this.$message.error("请添加必填项");
          return false;
        }
      });
    },
    rowshow(row) {
      this.$http
        .post("/api/contract/topInfo/BidInfoSection/detail/entityInfo", {
          id: row.uuid,
        })
        .then((res) => {
          var datas = res.data.data;
          console.log(datas);
          this.zbType = "look";
          this.dialogFormVisible = true;
          this.zbForm.bidInfoSection = datas.bidInfoSection;
          this.zbForm.bidInfo_03 = datas.bidInfo_03;
        });
    },
    // 展示
    show() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info("请选择一条记录进行查看操作！");
        return false;
      }
      let p = { actpoint: "look", instid: this.multipleSelection[0].uuid };
      this.$router.push({
        path: "../detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
      });
    },
    // list通用方法开始
    handleSizeChange(val) {
      this.searchform.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.searchform.current = val;
      this.getData();
    },

    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      this.$http
        .post(
          "/api/contract/topInfo/BidInfoSection/list/loadPageDataForZb",
          this.searchform
        )
        .then((res) => {
          this.page = res.data.data;
        });
    },
    getMenus() {
      this.$http
        .post("api/base/loadcascader", { typecode: "XMLX" })
        .then((res) => {
          if (res.data.code === 0) {
            this.menus = res.data.data;
          }
        });
    },
    // 获取上级单位树信息
    getOrgTree() {
      this.$http.get("/api/contract/base/loadorglist").then((res) => {
        this.orgTree = res.data.data;
      });
    },
    // 确定单位
    orgChange() {
      let selectLabelArr = this.$refs["porgCascader"].getCheckedNodes()[0]
        .pathLabels;
      this.searchform.orgname = selectLabelArr[selectLabelArr.length - 1];
    },

    // list通用方法结束
  },
  created() {
       window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
        console.log( window.screenWidth)
      })()
      }

    // this.getMenus();
    // this.getOrgTree();
    this.getData();
  },
};
</script>
<style scoped>
.el-date-editor{
  width: 100%!important;
}
.el-table__row {
  cursor: pointer;
}
>>> .el-dialog {
  width: 80% !important;
  height: 80%;
  overflow: hidden;
  /* overflow: auto; */
}
>>> .el-dialog__body {
  height: 70%;
  overflow: auto;
}
>>>.el-dialog__wrapper{
  height: 100vh!important;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.list-item{
  width: 32%;
}
>>>.el-form--inline .el-form-item__content {
    width: 100%;
    margin-left: 0px !important;
}
/* >>>.el-input{
  width: 100%;
} */
>>>.list-item_textarea{
  width:100%;
}
/* >>>.el-pagination__editor.el-input .el-input__inner{
  width: auto;
} */
>>>.dialog-footer {
    padding-top: 14px;
    margin: 0;
    text-align: center;
    background-color: #fafafa;
}
/* >>>.el-dialog__header{
  display: none;
} */

  @media (min-width: 1200px) and (max-width: 1500px) {
    >>>.el-dialog__body{
      height: 65%!important;
      overflow: auto;

    }
     >>>.el-form-item__label{
        width: 365px;
      }
  }
  @media (min-width: 1500px) and (max-width: 2000px) {
    >>>.el-dialog__body{
      height: 73%!important;
      overflow: auto;
    }
  }
</style>
