<template>
  <div>
    <!--<FileUpload :businessCode='"01"' :businessType='"bidInfo"' ></FileUpload>-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color: #2a2a7d;line-height: 37px;"><b>信息管理详情</b></span>
        <el-button
          @click="back"
          style="
            float: right;
            padding: 10px 20px;
            border: 1px solid #ddd;
            color: black;
          "
          type="text"
        >返回
        </el-button
        >
      </div>
      <div class="detailBox">
        <el-form
          :inline="false"
          :model="detailform"
          :rules="rules"
          class="gcform"
          ref="detailform"
        >
          <el-form-item
            label="项目名称:"
            prop="topInfor.inforName"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-input
              :disabled="p.actpoint === 'look'"
              clearable
              size="mini"
              v-model="detailform.topInfor.inforName"/>
          </el-form-item>
          <el-form-item
            label="外文名称:"
            prop="topInfor.inforNameForeign"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-input
              :disabled="p.actpoint === 'look'"
              clearable
              size="mini"
              v-model="detailform.topInfor.inforNameForeign"/>
          </el-form-item>
          <br>
          <div>
            <el-form-item
              label="项目板块:"
              prop="topInfor.moduleId"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <!--<el-select-->
                <!--:disabled="p.actpoint === 'look'"-->
                <!--clearable-->
                <!--filterable-->
                <!--style="width: 100%"-->
                <!--placeholder="请选择"-->
                <!--size="mini"-->
                <!--@change="-->
                  <!--getName(detailform.topInfor.moduleId, bizCode, 'moduleName')-->
                <!--"-->
                <!--v-model="detailform.topInfor.moduleId"-->
              <!--&gt;-->
                <!--<el-option-->
                  <!--:key="index"-->
                  <!--:label="item.detailName"-->
                  <!--:value="item.id"-->
                  <!--v-for="(item, index) in bizCode"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
              <br>
              <template>
                <el-radio-group v-model="detailform.topInfor.moduleId"  @change="
                  getName(detailform.topInfor.moduleId, bizCode, 'moduleName')">
                  <el-radio v-for="(item, index) in bizCode" :label="item.id">{{item.detailName}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </div>
          <el-form-item
            label="工程类别(一级):"
            prop="topInfor.enginTypeFirstId"
          >
            <el-select
              :disabled="p.actpoint === 'look'"
              clearable
              filterable
              placeholder="请选择"
              @change="getTwo"
              size="mini"
              v-model="detailform.topInfor.enginTypeFirstId"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in projectDomainType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="工程类别(二级):"
            prop="topInfor.enginTypeSecondId"
          >
            <el-select
              :disabled="p.actpoint === 'look'"
              clearable
              filterable
              placeholder="请选择"
              size="mini"
              @change="
                getName(
                  detailform.topInfor.enginTypeSecondId,
                  xqprojectType,
                  'enginTypeSecondName'
                )
              "
              v-model="detailform.topInfor.enginTypeSecondId"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in xqprojectType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="detailform.topInfor.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
          label="所属线路:"
          prop="topInfor.belongLineId"
        >
          <el-select
            :disabled="p.actpoint === 'look'"
            filterable
            clearable
            placeholder="请选择或直接填写所属现路"
            size="mini"
            @change="
                getName(
                  detailform.topInfor.belongLineId,
                  railwayLine,
                  'belongLineName'
                )
              "
            v-model="detailform.topInfor.belongLineId"
          >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in railwayLine"
            ></el-option>
          </el-select>
        </el-form-item>
          <br>
          <el-form-item
            label="项目性质(一级):"
            prop="topInfor.projectNatureFirstId"
          >
            <el-select
              :disabled="p.actpoint === 'look'"
              clearable
              filterable
              placeholder="请选择"
              @change="getTwoXZ"
              size="mini"
              v-model="detailform.topInfor.projectNatureFirstId"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in projectNature"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="项目性质(二级):"
            prop="topInfor.projectNatureSecondId"
          >
            <el-select
              :disabled="p.actpoint === 'look'"
              clearable
              filterable
              placeholder="请选择"
              size="mini"
              @change="
                  getName(
                    detailform.topInfor.projectNatureSecondId,
                    projectNatureTwo,
                    'projectNatureSecondName'
                  )
                "
              v-model="detailform.topInfor.projectNatureSecondId"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in projectNatureTwo"
              ></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item
            label="新兴市场(一级):"
            prop="topInfor.marketFirstNameId"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-select
              :disabled="p.actpoint === 'look'"
              filterable
              clearable
              placeholder="请选择"
              @change="getTwoSC"
              size="mini"
              v-model="detailform.topInfor.marketFirstNameId"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in emergingMarket"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="新兴市场(二级):"
            prop="topInfor.marketSecondId"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-select
              :disabled="p.actpoint === 'look'"
              filterable
              clearable
              placeholder="请选择"
              size="mini"
              @change="
                  getName(
                    detailform.topInfor.marketSecondId,
                    emergingMarketTwo,
                    'marketSecondName'
                  )
                "
              v-model="detailform.topInfor.marketSecondId"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in emergingMarketTwo"
              ></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item
              label="建设单位:"
              prop="topInfor.constructionOrg"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                size="mini"
                v-model="detailform.topInfor.constructionOrg"
              />
            </el-form-item>
          <el-form-item
            label="设计单位:"
            prop="topInfor.designOrg"
            :rules="{
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-input
              clearable
              :disabled="p.actpoint === 'look'"
              size="mini"
              v-model="detailform.topInfor.designOrg"
            />
          </el-form-item>
          <br>
          <el-form-item
            label="招标人:"
            prop="topInfor.bidPerson"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              :disabled="p.actpoint === 'look'"
              clearable
              size="mini"
              v-model="detailform.topInfor.bidPerson"
            />
          </el-form-item>
          <el-form-item
            label="招标代理公司:"
            prop="topInfor.bidAgentCompany"
            :rules="{
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              :disabled="p.actpoint === 'look'"
              size="mini"
              v-model="detailform.topInfor.bidAgentCompany"
            />
          </el-form-item>
          <el-form-item
          label="预计招标时间:"
          prop="topInfor.planBidTime"
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
            type="date"
            value-format="timestamp"
            v-model="detailform.topInfor.planBidTime"

          >
          </el-date-picker>
        </el-form-item>
          <el-form-item
            label="投资额（万元）:"
            prop="topInfor.investment"
            :rules="rules.contractAmount"
          >
            <el-input
              :disabled="p.actpoint === 'look'"
              clearable
              placeholder=""
              size="mini"
              v-model="detailform.topInfor.investment"
              @input="detailform.topInfor.investment>maxMoney?detailform.topInfor.isMajorProject='0':detailform.topInfor.isMajorProject='1'"
            />
          </el-form-item>
          <el-form-item label="资金来源:" prop="value1"  :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',}"
            >
            <el-select
              :disabled="p.actpoint === 'look'"
              filterable
              clearable
              multiple
              placeholder="请选择"
              size="mini"
              v-model="detailform.value1"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in amountSource"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="inline-formitem"
            label="是否为重大项目:"
            prop="topInfor.isMajorProject"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <!--<el-select-->
              <!--:disabled="p.actpoint === 'look'"-->
              <!--filterable-->
              <!--clearable-->
              <!--placeholder="请选择"-->
              <!--size="mini"-->
              <!--v-model="detailform.topInfor.isMajorProject"-->
            <!--&gt;-->
              <!--<el-option-->
                <!--:key="index"-->
                <!--:label="item.detailName"-->
                <!--:value="item.id"-->
                <!--v-for="(item, index) in yesOrNo"-->
              <!--&gt;</el-option>-->
            <!--</el-select>-->
            <el-switch
              class="inline-formitem-switch"
              v-model="detailform.topInfor.isMajorProject"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
            >
            </el-switch>
          </el-form-item>
          <el-form-item
          label="公告类型:"
          prop="topInfor.noticeTypeId"
          :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
        >
          <el-select
            :disabled="p.actpoint === 'look'"
            clearable
            filterable
            placeholder="请选择"
            size="mini"
            v-model="detailform.topInfor.noticeTypeId"
            @change="
                getName(
                  detailform.topInfor.noticeTypeId,
                  bulletinType,
                  'noticeTypeName'
                )
              "
          >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in bulletinType"
            ></el-option>
          </el-select>
        </el-form-item>
            <el-form-item
              label="资审方式:"
              prop="topInfor.verifyTypeId"
            >
              <el-input
                disabled
                clearable
                placeholder="请输入"
                v-model="detailform.topInfor.verifyTypeName"
              />
              <!--<el-select-->
                <!--:disabled="p.actpoint === 'look'"-->
                <!--clearable-->
                <!--filterable-->
                <!--placeholder="请选择"-->
                <!--size="mini"-->
                <!--@change="-->
                  <!--getName(-->
                    <!--detailform.topInfor.verifyTypeId,-->
                    <!--certificationType,-->
                    <!--'verifyTypeName'-->
                  <!--)-->
                <!--"-->
                <!--v-model="detailform.topInfor.verifyTypeId"-->
              <!--&gt;-->
                <!--<el-option-->
                  <!--:key="index"-->
                  <!--:label="item.detailName"-->
                  <!--:value="item.id"-->
                  <!--v-for="(item, index) in certificationType"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
            </el-form-item>

            <el-form-item
              v-show="detailform.topInfor.investment<maxMoney&&detailform.topInfor.isMajorProject=='0'"
              label="重大项目说明"
            >
              <el-input
                clearable
                placeholder=""
                size="mini"
                v-model="detailform.topInfor.majorProjectExplain"
              />
            </el-form-item>
            <div>
              <el-form-item class="formItem"
                label="项目跟踪负责人:"
                prop="topInfoOrg.projectTrackResponPerson"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder=""
                  size="mini"
                  v-model="detailform.topInfoOrg.projectTrackResponPerson"
                />
              </el-form-item>
              <el-form-item  class="formItem"
                label="联系电话:"
                prop="topInfoOrg.contactMode"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder=""
                  size="mini"
                  v-model="detailform.topInfoOrg.contactMode"
                />
              </el-form-item>
              <el-form-item  class="formItem"
                label="预计中标概率:"
                prop="topInfor.bidProbId"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-select
                  :disabled="p.actpoint === 'look'"
                  filterable
                  clearable
                  placeholder="请选择"
                  size="mini"
                  @change="
                  getName(
                    detailform.topInfor.bidProbId,
                    probability,
                    'bidProbName'
                  )
                "
                  v-model="detailform.topInfor.bidProbId"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in probability"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item
                class="neirong"
                label="项目内容:"
                prop="topInfor.inforContent"
                style="width: 100%"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  :disabled="p.actpoint === 'look'"
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform.topInfor.inforContent"
                />
              </el-form-item>
            </div>
            <p class="detail-title" style="overflow: hidden；margin-right: 30px">
              <span>项目地点: </span>
              <el-button
                v-show="p.actpoint != 'look'"
                @click="add('dd')"
                class="detatil-flie-btn"
                type="primary"
              >新增
              </el-button
              >
            </p>
            <el-table
            :data="detailform.topInfoSiteList"
            :key="key"
            :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
            @selection-change="handleSelectionChange"
            align="center"
            border
            class="clothSizeTable"
            ref="table"
            style="width: 98%; min-height: calc(100vh - 370px)"
          >
            <el-table-column
              :width="80"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :resizable="false"
              label="项目地点"
              align="center"
              prop="inforName"
            >
              <template slot-scope="scope">
                <i class="el-icon-circle-plus"  v-show="p.actpoint != 'look'" @click="selectPosition(),positionIndex=scope.$index"></i><span>{{scope.row.path}}</span>
                <!--<el-button v-show="p.actpoint != 'look'" @click="selectPosition(),positionIndex=scope.$index">选择</el-button>-->
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="份额(万元)"
              prop="contractAmount"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-form-item class="tabelForm" :prop="'topInfoSiteList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                  <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.contractAmount"
                  >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
                <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="是否为主地点"
              prop="contractAmount"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-radio v-model="scope.row.isMain" label="1">是</el-radio>
                <el-radio v-model="scope.row.isMain" label="0">否</el-radio>
                <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
              </template>
            </el-table-column>

            <el-table-column
              v-show="!p.actpoint === 'look'"
              :resizable="false"
              fixed="right"
              label="操作"
              align="center"
              width="200"
              show-overflow-tooltip
              v-if="p.actpoint !== 'look'"
            >
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  @click="del(scope.$index,scope.row,detailform.topInfoSiteList)"
                  type="warning"
                >删除
                </el-link
                >
              </template>
            </el-table-column>
          </el-table>
            <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
              <span>标段信息: </span>
              <el-button
                v-show="p.actpoint != 'look'"
                @click="add('bd')"
                class="detatil-flie-btn"
                type="primary"
              >新增
              </el-button
              >
            </p>
            <el-table
              :data="detailform.topInfoSectionList"
              :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
              @selection-change="handleSelectionChange"
              align="center"
              border
              class="clothSizeTable"
              ref="table"
              style="width: 98%; min-height: calc(100vh - 370px)"
            >
              <el-table-column
                :width="80"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>

              <el-table-column
                class="listTabel"
                :resizable="false"
                label="标段名"
                prop="sectionName"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.sectionName"
                  ></el-input>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="项目份额(万元)"
                align="center"
                prop="projectScale"
                width="300"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-form-item class="tabelForm" :prop="'topInfoSectionList.' + scope.$index + '.projectScale'" :rules='rules.contractAmount'>
                    <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                    <el-input
                      v-model="scope.row.projectScale"
                      clearable
                      :disabled="p.actpoint === 'look'"
                    >
                      <template slot="prepend">¥</template>
                      <template slot="append">(万元)</template>
                    </el-input>
                  </el-form-item>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
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
                    @click="del(scope.$index,scope.row,detailform.topInfoSectionList,'bd')"
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
      <el-button @click="submit">提交</el-button>
    </div>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import FileUpload from '@/components/fileUpload'
  import { isMoney } from '@/utils/validate'
  export default {
    // name: "详情",
    data() {
      var validateMoney = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMoney(value)) {
          callback(new Error('请输入正确的金额格式'))
        } else {
          callback()
        }
      }
      return {
        maxMoney:1000000,
        id:'',
        key: 0,
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index
        options2: [],
        options: [],
        detailform: {
          topInfor: {},
          topInfoOrg: {},
          topInfoSiteList: [],
          topInfoSectionList: [],
          value1: [],
        },
        xqprojectType: [],//工程类别二级
        emergingMarketTwo:[],//新兴市场二级
        projectNatureTwo:[],//项目性质二级
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        sizeform: {projectScale: "", sectionName: ""},
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
      Tree,
      FileUpload
    },
    computed: {
      projectDomainType() {
        // console.log(this.$store.state.category.projectDomainType)
        return this.$store.state.category.projectDomainType;
      },
      emergingMarket() {
        // console.log(this.$store.state.category.emergingMarket)
        return this.$store.state.category.emergingMarket;
      },
      projectNature(){
        return this.$store.state.projectNature;
      },
      certificationType(){
        return this.$store.state.certificationType;
      },
      bizCode() {
        return this.$store.state.bizCode;
      },
      bulletinType() {
        return this.$store.state.bulletinType;
      },
      projectModel() {
        return this.$store.state.projectModel;
      },
      amountSource() {
        return this.$store.state.amountSource;
      },
      // yesOrNo() {
      //   return this.$store.state.yesOrNo;
      // },
      position() {
        return this.$store.state.position;
      },
      probability() {
        return this.$store.state.probability;
      },
      railwayLine() {
        return this.$store.state.railwayLine;
      },
    },
    mounted() {
      // this.$store.commit("setCategory", 'projectDomainType');
      this.id=this.p.instid;
      if (this.p.actpoint === "edit"||this.id) {
        this.getDetail();
      }
      if (this.p.actpoint === "add") {
        this.detailform.topInfoSiteList=[{
          country: '',
          ffid: '',
          path: '',
          contractAmount: '',
          isMain: ''
        }];
        this.detailform.topInfoSectionList=[{
          sectionName: '',
          projectScale: '',
        }]
      }
      this.$store.dispatch("getConfig", {});

      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
      // eslint-disable-next-line no-unde
    },
    methods: {
      //金额过滤
      getMoney(value){
        return isMoney(value);
      },
      //获取项目地点的值
      getPositionTree(data) {
        console.log(data)
        this.treeStatas = false;
        var country = '', _data = data;
        if (_data.fullDetailName.indexOf("境内") != -1) {
          country = '01';
        } else if (_data.fullDetailName.indexOf("境外") != -1) {
          country = '02';
        }
        this.detailform.topInfoSiteList.forEach((item, index) => {
          if (index == this.positionIndex) {
            // item.detailName = _data.detailName;
            item.country = country;
            item.ffid = _data.fullDetailCode;
            item.path = _data.fullDetailName;
          }
        });
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
      submit() {
      },
      //工程类别二级
      getTwo(id) {
        this.detailform.topInfor.enginTypeSecondId='';
        this.xqprojectType=[];
        if(id!=''){
          this.projectDomainType.find(
            (item) => {
              if (item.id == id) {
                this.detailform.topInfor.enginTypeFirstName = item.detailName;
                this.xqprojectType = item.children;
              }
            }
          )
        }
      },
      //新兴市场二级
      getTwoSC(id) {
        this.detailform.topInfor.marketSecondId='';
        this.emergingMarketTwo=[];
        if(id!=''){
          this.emergingMarket.find(
            (item)=>{
              if (item.id == id) {
                this.detailform.topInfor.marketFirstName = item.detailName;
                this.emergingMarketTwo = item.children;
              }
            }
          )
        }
      },
      //项目性质二级
      getTwoXZ(){
        this.detailform.topInfor.projectNatureSecondId='';
        this.projectNatureTwo=[];
        if(id!=''){
          this.emergingMarket.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.topInfor.projectNatureFirstName = item.detailName;
            this.projectNatureTwo = item.children;
          }
        }
        )
        }
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

        var topInforCapitalList = [];
        this.amountSource.forEach((item) => {
          if (this.detailform.value1.indexOf(item.id) != -1) {
            var v = {
              capitalId: item.id,
              capitalName: item.detailName,
            };
            topInforCapitalList.push(v);
          }
        });
        this.detailform.topInforCapitalList=topInforCapitalList;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                "/api/topInfo/TopInfor/detail/saveOrUpdate",
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
                    path: "/manage/proposal/list",
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
      back() {
        this.$router.back()
        // this.$router.push({
        //   path: "/manage/proposal/list",
        // });
      },
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
                "/api/topInfo/TopInfoSection/list/delete",
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
      //新增标段和地点
      add(type) {
        var v = {};
        if (type == 'dd') {
          v = {
            country: '',
            ffid: '',
            path: '',
            contractAmount: '',
            isMain: ''
          }
          this.detailform.topInfoSiteList.push(v);
        } else {
          v = {
            sectionName: '',
            projectScale: '',
          }
          this.detailform.topInfoSectionList.push(v);
        }
      },
      resetinfo() {
        this.sizeform = {
          id: "",
          part: "",
          showinput: true,
        };
      },
      // 加载列表
      getDetail() {
        this.$http
          .post("/api/topInfo/TopInfor/detail/entityInfo", {topOrgId:this.id})
          .then((res) => {
            var datas=res.data.data;
            this.getTwo(datas.topInfor.enginTypeFirstId);
            this.getTwoSC(datas.topInfor.marketFirstNameId);
            datas.topInforCapitalList.forEach((item)=>{
              this.detailform.value1.push(item.capitalId)
            });
            this.detailform={
              topInfor: datas.topInfor,
              topInfoOrg: datas.topInfoOrg,
              topInfoSiteList: datas.topInfoSiteList,
              topInfoSectionList: datas.topInfoSectionList,
            }
          });
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
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
    >.el-form-item,>>>.formItem{

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
    /*padding: 0 100px;*/
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
  .detailBox{
    max-height:calc(100vh - 410px)!important;
  }
</style>

