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
            position: fixe;
            "
          type="text">返回
          </el-button>
      </div>

      <div style="overflow: scroll; max-height: 55vh;padding-bottom: 10px">
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
              label="项目模式:"
            >
              <el-input
                 disabled
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInforBO.topInfor.projectModelName"
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

            <el-form-item
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
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                size="mini"
                v-model="detailform. bidInfo.bidModeName"
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
                v-model="detailform. bidInfo.isCoalitionBid"
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

            <!-- <div>
              <el-form-item  label="项目跟踪负责人:" >
                <el-input
                   disabled
                  clearable
                  placeholder=""
                  size="mini"
                  v-if="detailform.topInforBO"
                  v-model="detailform.topInforBO.topInfoOrg.projectTrackResponPerson"
                />
              </el-form-item>
              <el-form-item label="联系电话:">
                <el-input
                   disabled
                  clearable
                  placeholder=""
                  size="mini"
                  v-model="detailform.topInforBO.topInfoOrg.contactMode"
                />
              </el-form-item>
            </div> -->
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

          <el-row>
            <!-- <el-form-item
              class="neirong"
              label="工程概况(最多1000字):"
              prop="clothSize.bcPlateTypeId"
              style="width: 100%"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                type="textarea"
                clearable
                placeholder="请输入"
                size="mini"
                v-model="detailform.clothSize.bcPlateTypeId"
              />
            </el-form-item> -->
          </el-row>
          <el-row>
            <el-form-item
              class="neirong"
              label="投标说明(最多1000字):"
              prop="bidInfo.bidExplain"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                type="textarea"
                clearable
                placeholder="请输入"
                size="mini"
                v-model="detailform. bidInfo.bidExplain"
              />
            </el-form-item>
          </el-row>
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
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false">

            <div>
          <el-button display="block" slot="trigger" size="small" type="primary">选取文件</el-button>
          </div>
          </el-upload>

            </el-form-item>
          </el-row>

          <p style="overflow: hidden">
            <span style="float: left">标段信息: </span>
            <el-button
              @click="add('bd')"
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
              prop="part"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    disabled
                    v-model="scope.row.bidInfoSection.sectionName"
                  ></el-input>
              </template>
            </el-table-column>
<!-- prop在table时回显 ,在from里面判断-->
            <el-table-column
              :resizable="false"
              label="风险费(万元)"
              prop="riskFee"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.riskFee"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="安全费(万元)"
              prop="safetyFee"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.safetyFee"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标限价(万元)"
              prop="bidPriceLimit"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.bidPriceLimit"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标保证金(万元)"
              prop="bidEarnestMoney"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.bidEarnestMoney"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标价(万元)"
              prop="bidMoney"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.bidMoney"
                  ></el-input>
              </template>
            </el-table-column>

              <el-table-column
              :resizable="false"
              label="开标地点"
              prop="openBidAddress"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.openBidAddress"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="评标办法"
              prop="evaluationBidId"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.evaluationBidId"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="开标日期"
              prop="openBidTime"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    value-format="timestamp"
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.openBidTime"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="参与投标单位"
              prop="openBidTime"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.openBidTime"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="其他投标单位(系统内)"
              prop="openBidTime"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.openBidTime"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="其他投标单位(系统外)"
              prop="openBidTime"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.openBidTime"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="其他未列出单位"
              prop="openBidTime"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.openBidTime"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目经理"
              prop="projectManager"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.projectManager"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目副经理"
              prop="projectDeputyManager"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.projectDeputyManager"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="技术负责人"
              prop="technicalDirector"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.technicalDirector"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="安全负责人"
              prop="securityDirector"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.securityDirector"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="财务负责人"
              prop="financeDirector"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.financeDirectorr"
                  ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="成本负责人"
              prop="costDirector"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.costDirector"
                  ></el-input>
              </template>
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
  </div>

</template>

<script>

export default {
  data() {
    return {
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
        ]
    };
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
      var v = {};
      v = {
            bidInfoSection:{},
            bidInfoSectionOrgList:{},
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
        var q=this.p.actpoint === "edit"?{id:this.id}:{topInfoOrgId:this.id};
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
              bidInfoSectionList: datas.bidInfoSectionList,
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
    .el-form-item__label:before {
      position: initial;
      left: -10px;
    }
    .el-form-item__error {
      padding-top: 0px;
      width: 95%;
      margin-left: 0;
      text-align: right;
      top: 0%;
    }
    .el-form-item {
      // float: left;
      display: inline-block;
      width: 32.5%;
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
    padding: 0 100px;
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

