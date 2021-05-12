<template>
  <div style="position: relative">
    <el-button @click="back" class="detailbutton detail-back-tab" >返回</el-button>
    <!-- <div class="inline-block" v-if="p.actpoint != 'look'"> -->
    <el-button class="detailbutton detail-back-tab save-btn" v-if="!p.type&&p.actpoint != 'look'&&p.actpoint != 'task'"
               type="primary"
               @click="saveInfo('detailform')"
    >保存</el-button>

    <el-button class="detailbutton detail-back-tab save-btn" v-if="p.type == 'fq'&&p.actpoint != 'look'&&p.actpoint != 'task'"
               type="primary"
               @click="saveInfofq('detailform')"
    >保存</el-button>

    <el-button class="detailbutton detail-back-tab save-btn" v-if="p.type == 'end'&&p.actpoint != 'look'&&p.actpoint != 'task'"
               type="primary"
               @click="saveInfoend('detailform')"
    >保存</el-button>
    <!-- </div> -->

    <!--<el-button v-show="p.actpoint != 'look'" @click="submit" class="detailbutton">提交</el-button>-->
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.topInfoOrg.flowStatus==1||detailform.topInfoOrg.flowStatus==4)" @click="submit('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <!--<FileUpload :businessCode='"01"' :businessType='"bidInfo"' ></FileUpload>-->
    <!--<span class="detailSpan" v-if="!p.type"><b>项目信息跟踪</b></span>-->
    <!--<span class="detailSpan" v-if="p.type == 'fq'&&p.actpoint != 'look'&&p.actpoint != 'task'"><b>放弃跟踪</b></span>-->
    <!--<span class="detailSpan" v-if="p.type == 'end'&&p.actpoint != 'look'&&p.actpoint != 'task'"><b>结束跟踪</b></span>-->
    <el-tabs type="border-card" >
      <el-tab-pane label="项目信息跟踪">
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
                disabled
                clearable

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>
            <el-form-item
              label="外文名称:"
            >
              <el-input
                disabled
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <br>
            <div>
              <el-form-item
                class="inline-formitem xmbk-item"
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
                <!---->
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
                <template>
                  <el-radio-group class="detail-radio-group" v-model="detailform.topInfor.moduleId"  @change="getName(detailform.topInfor.moduleId, projectPlate, 'moduleName','moduleCode')">
                    <el-radio disabled  v-for="(item, index) in projectPlate" :label="item.id" :key="index">{{item.detailName}}</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </div>
            <el-form-item
              v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null"
              label="工程类别(一级):"
              prop="topInfor.enginTypeFirstId"
            >
              <el-select
                disabled
                clearable
                filterable
                placeholder="请选择"
                @change="getTwo"

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
              v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null"
              label="工程类别(二级):"
              prop="topInfor.enginTypeSecondId"
            >
              <el-select
                disabled
                clearable
                filterable
                placeholder="请选择"
                @clear="clear(detailform.topInfor.enginTypeSecondId,detailform.topInfor.enginTypeSecondName)"
                @change="
                getName(
                  detailform.topInfor.enginTypeSecondId,
                  xqprojectType,
                  'enginTypeSecondName',
                  'enginTypeSecondCode'
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
              v-if="(detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null)&&detailform.topInfor.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
              label="所属线路:"
              prop="topInfor.belongLineId"
            >
              <el-select
                disabled
                filterable
                clearable
                placeholder="请选择或直接填写所属现路"

                @change="
                getName(
                  detailform.topInfor.belongLineId,
                  railwayLine,
                  'belongLineName',
                  'belongLineCode'
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
            <br v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null">
            <el-form-item
              v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null"
              label="项目性质(一级):"
              prop="topInfor.projectNatureFirstId"
            >
              <el-select
                disabled
                clearable
                filterable
                placeholder="请选择"
                @change="getTwoXZ"

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
              v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null"
              label="项目性质(二级):"
              prop="topInfor.projectNatureSecondId"
            >
              <el-select
                disabled
                clearable
                filterable
                placeholder="请选择"
                @clear="clear(detailform.topInfor.projectNatureSecondId,detailform.topInfor.projectNatureSecondName)"
                @change="
                  getName(
                    detailform.topInfor.projectNatureSecondId,
                    projectNatureTwo,
                    'projectNatureSecondName',
                    'projectNatureSecondCode'

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
            <br v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null">
            <el-form-item
              v-if="detailform.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
              label="供应产品"
              prop="topInfor.supplyProductName"
              :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
            >
              <el-input
                disabled

                v-model="detailform.topInfor.supplyProductName"
              />
            </el-form-item>
            <el-form-item
              v-if="detailform.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
              label="采购性质:"
              prop="topInfor.purchaseNatureId"
            >
              <el-select
                disabled
                filterable
                clearable
                @change="
                getName(
                  detailform.topInfor.purchaseNatureId,
                  purchaseNature,
                  'purchaseNatureName',
                  'purchaseNatureCode'
                )
              "
                v-model="detailform.topInfor.purchaseNatureId"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in purchaseNature"
                ></el-option>
              </el-select>
            </el-form-item>
            <br v-if="detailform.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'">
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
                disabled
                filterable
                clearable
                placeholder="请选择"
                @change="getTwoSC"

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
            >
              <el-select
                disabled
                filterable
                clearable
                placeholder="请选择"

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
              :label="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'建设单位:':'客户名称:'"
              prop="topInfor.constructionOrg"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                clearable

                v-model="detailform.topInfor.constructionOrg"
              />
            </el-form-item>
            <el-form-item
              v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'||detailform.topInfor.moduleId==null"
              label="设计单位:"
              prop="topInfor.designOrg"
              :rules="{
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                clearable
                disabled
                v-model="detailform.topInfor.designOrg"
              />
            </el-form-item>
            <br>
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
                disabled
                clearable
                filterable
                placeholder="请选择"

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
              prop="topInfor.noticeTypeName"
            >
              <el-input
                disabled
                clearable
                placeholder="请输入"
                v-model="detailform.topInfor.noticeTypeName=='资审公告'?detailform.topInfor.verifyTypeName='资格预审':detailform.topInfor.noticeTypeName=='招标公告'?detailform.topInfor.verifyTypeName='资格后审':detailform.topInfor.noticeTypeName=='竞争性谈判'?detailform.topInfor.verifyTypeName='竞争性谈判':detailform.topInfor.verifyTypeName=''"
              />

            </el-form-item>
            <br>
            <el-form-item
              v-if="detailform.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="招标人:"
              prop="topInfor.bidPerson"
              :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
            >
              <el-input
                disabled
                clearable

                v-model="detailform.topInfor.bidPerson"
              />
            </el-form-item>
            <el-form-item
              v-if="detailform.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="招标代理公司:"
              prop="topInfor.bidAgentCompany"
              :rules="{
              message: '此项不能为空',
              trigger: 'blur',
            }"
            >
              <el-input
                disabled

                v-model="detailform.topInfor.bidAgentCompany"
              />
            </el-form-item>
            <el-form-item
              v-if="detailform.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="预计招标时间:"
              prop="topInfor.planBidTime"
              :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"

            >
              <el-date-picker
                disabled
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="detailform.topInfor.planBidTime"

              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              :label="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'投资额（万元）:':'项目规模:'"
              prop="topInfor.investment"
              :rules="rules.contractAmount"
            >
              <el-tooltip popper-class="tooltip-class" :content="String(detailform.topInfor.investment)" placement="bottom" :disabled="p.actpoint !== 'look'" effect="dark">
                <el-input
                  disabled
                  clearable
                  placeholder=""
                  v-model="detailform.topInfor.investment"
                  @input="detailform.topInfor.investment>maxMoney?detailform.topInfor.isMajorProject='0':detailform.topInfor.isMajorProject='1'"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-tooltip>

            </el-form-item>
            <el-form-item label="资金来源:" prop="value1"  :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',}"
            >
              <el-select
                class="multiple-sel"
                disabled
                filterable
                clearable
                multiple
                placeholder="请选择"

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
              <!---->
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
                disabled
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
              v-show="detailform.topInfor.investment<maxMoney&&detailform.topInfor.isMajorProject=='0'"
              label="重大项目说明"
            >
              <el-input
                clearable
                placeholder=""
                disabled
                v-model="detailform.topInfor.majorProjectExplain"
              />
            </el-form-item>

            <div v-if="p.type||(!p.type&&p.trackStatus !=1&&p.trackStatus !=null)" >
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
                  :disabled="p.type =='fq' || p.type =='end'||p.actpoint === 'look'"
                  clearable
                  placeholder=""
                  v-model="detailform.topInfoOrg.projectTrackResponPerson"
                />
              </el-form-item>
              <el-form-item  class="formItem"
                             label="联系电话:"
                             prop="topInfoOrg.contactMode"
                             :rules="rules.phone"
              >
                <el-input
                  :disabled="p.type =='fq' || p.type =='end'||p.actpoint === 'look'"
                  clearable
                  placeholder=""

                  v-model="detailform.topInfoOrg.contactMode"
                />
              </el-form-item>
              <el-form-item  class="formItem"
                             label="预计中标概率:"
                             prop="topInfoOrg.bidProbId"
                             :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-select
                  :disabled="p.type =='fq' || p.type =='end'||p.actpoint === 'look'"
                  filterable
                  clearable
                  placeholder="请选择"

                  @change="
                  getNameZb(
                    detailform.topInfoOrg.bidProbId,
                    probability,
                    'bidProbName'
                  )
                "
                  v-model="detailform.topInfoOrg.bidProbId"
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
            <div >
              <el-form-item
                class="neirong"
                label="项目内容:"
                prop="topInfor.inforContent"
                style="width: 100%"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  disabled
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  v-model="detailform.topInfor.inforContent"
                />
              </el-form-item>
            </div>
            <div>
              <p class="detail-title" style="overflow: hidden;margin-right: 30px">
                <span>项目地点: </span>
                <!-- <el-button
                  disabled
                  @click="add('dd')"
                  class="detatil-flie-btn"
                  type="primary"
                >新增
                </el-button> -->

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
                class="detailTable"
                ref="table"
                style="width: 98%;"
              >
                <el-table-column
                  disabled
                  :width="80"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column
                  disabled
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
                  disabled
                  :resizable="false"
                  label="项目规模(万元)"
                  prop="contractAmount"
                  align="center"
                  width="350"
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm" :prop="'topInfoSiteList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                      <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                      <el-tooltip popper-class="tooltip-class" :content="String(scope.row.contractAmount)" placement="bottom" disabled effect="dark">
                        <el-input
                          clearable
                          disabled
                          v-model="scope.row.contractAmount"
                        >
                          <template slot="prepend">¥</template>
                          <template slot="append">(万元)</template>
                        </el-input>
                      </el-tooltip>

                    </el-form-item>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <el-table-column
                  disabled
                  :resizable="false"
                  label="是否为主地点"
                  prop="contractAmount"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope" >
                    <el-radio v-model="scope.row.isMain" label="1" disabled>是</el-radio>
                    <el-radio v-model="scope.row.isMain" label="0" disabled>否</el-radio>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <el-table-column
                  :disabled="p.actpoint !== 'look'"
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  align="center"
                  width="80"
                  show-overflow-tooltip

                >
                  <template slot-scope="scope">
                    <el-link
                      :underline="false"
                      disabled
                      @click="del(scope.$index,scope.row,detailform.topInfoSiteList)"
                      type="warning"
                    >删除
                    </el-link
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div  v-if="p.type||(!p.type&&p.trackStatus !=1&&p.trackStatus !=null)">
              <p  v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"  class="detail-title" style="overflow: hidden;margin-right:30px" >
                <span>标段信息: </span>
                <el-button
                  :disabled="p.actpoint !== 'look'||p.type !='fq'||p.type !='end'"
                  @click="add('bd')"
                  class="detatil-flie-btn"
                  type="primary"
                >新增
                </el-button
                >
              </p>
              <el-table
                v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
                :disabled="p.type =='fq' || p.type =='end'||p.actpoint === 'look'"
                :data="detailform.topInfoSectionList"
                :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
                @selection-change="handleSelectionChange"
                align="center"
                border
                class="detailTable"
                ref="table"
                style="width: 98%;"
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
                  <template slot="header">
                    <p>
                      <span class="red-star">*</span>
                      标段名
                    </p>
                  </template>
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm" :prop="'topInfoSectionList.' + scope.$index + '.sectionName'"     :rules="{
           required: true, message: '此项不能为空', trigger: 'blur'
        }">
                      <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                      <el-input
                        clearable
                        :disabled="p.type =='fq' || p.type =='end'||p.actpoint === 'look'"
                        v-model="scope.row.sectionName"
                      ></el-input>
                    </el-form-item>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <el-table-column
                  :resizable="false"
                  label="项目规模(万元)"
                  align="center"
                  prop="projectScale"
                  width="350"
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm" :prop="'topInfoSectionList.' + scope.$index + '.projectScale'" :rules='rules.contractAmount'>
                      <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                      <el-tooltip popper-class="tooltip-class" :content="String(scope.row.projectScale)" placement="bottom" :disabled="p.actpoint !== 'look'" effect="dark">
                        <el-input
                          class="input-el-input-group"
                          v-model="scope.row.projectScale"
                          clearable
                          :disabled="p.type =='fq' || p.type =='end'||p.actpoint === 'look'"
                        >
                          <template slot="prepend">¥</template>
                          <template slot="append">(万元)</template>
                        </el-input>
                      </el-tooltip>

                    </el-form-item>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <el-table-column

                  :resizable="false"
                  fixed="right"
                  label="操作"
                  align="center"
                  show-overflow-tooltip

                  width="80">
                  <template slot-scope="scope">
                    <el-link
                      :disabled="p.type =='fq' || p.type =='end'||p.actpoint == 'look'"
                      :underline="false"
                      @click="del(scope.$index,scope.row,detailform.topInfoSectionList,'bd')"
                      type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div>
              <el-divider content-position="left" class="detailDivider" >跟踪信息</el-divider>
              <!-- v-if="(p.trackStatus !=2 && p.trackStatus !=3)||p.type==''" -->
              <div v-if="(!p.type&&p.actpoint!='look')||(p.actpoint=='look'&&p.trackStatus !=2 && p.trackStatus !=3)">

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
                    v-model="detailform.topInfoOrg.projectTrackResponPerson"
                  />
                </el-form-item>
                <el-form-item  class="formItem"
                               label="联系电话:"
                               prop="topInfoOrg.contactMode"
                               :rules="rules.phone"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'"
                    clearable
                    placeholder=""

                    v-model="detailform.topInfoOrg.contactMode"
                  />
                </el-form-item>
                <el-form-item  class="formItem"
                               label="预计中标概率:"
                               prop="topInfoOrg.bidProbId"
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

                    @change="
                  getNameZb(
                    detailform.topInfoOrg.bidProbId,
                    probability,
                    'bidProbName'
                  )
                "
                    v-model="detailform.topInfoOrg.bidProbId"
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

              <div v-if="p.type == 'fq'||p.trackStatus ==2">

                <el-form-item class="neirong" label="放弃原因:" style="width: 100%"
                              prop="topInfoOrg.reason"
                              :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }">
                  <el-input
                    :disabled="p.trackStatus ==2"
                    type="textarea"
                    clearable
                    placeholder="请输入"
                    v-model="detailform.topInfoOrg.reason"
                  />
                </el-form-item>
              </div>
              <el-row v-if="p.type == 'end'||p.trackStatus ==3">
                <p class="detail-title">
                  <span><span v-if="detailform.topInfor.isMajorProject=='0'" class="red-star">*</span>项目总结附件: </span>
                  <el-upload
                    class="upload-demo detailUpload"
                    :action="'/api/contract/topInfo/CommonFiles/topInfoTrack/01/uploadFile'"
                    :on-success="handleChange"
                    :on-error="handleChange"
                    :on-remove="handleRemove1"
                    :show-file-list="false"
                    :file-list="detailform.topInfoTrack_01"
                    :disabled="p.actpoint === 'look'"
                    multiple
                  >
                    <el-button
                      size="small"
                      type="primary"
                      v-show="p.actpoint != 'look'||p.trackStatus !=3">点击上传

                    </el-button>
                  </el-upload>
                </p>

                <el-table
                  :data="detailform.topInfoTrack_01"
                  :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
                  align="center"
                  border
                  ref="table"
                  style="width: 100%; min-height: calc(100vh - 370px)"
                >
                  <el-table-column
                    :width="55"
                    align="center"
                    label="序号"
                    show-overflow-tooltip
                    type="index"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    :resizable="false"
                    label="文件名"
                    prop="fileName"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                  <el-table-column
                    align="center"
                    :resizable="false"
                    label="大小(KB)"
                    prop="fileSize"
                    show-overflow-tooltip
                    width="160"
                  >
                    <template slot-scope="scope">
                      {{ (scope.row.fileSize / 1024).toFixed(2) }}
                    </template>

                  </el-table-column>
                  <el-table-column
                    align="center"
                    :resizable="false"
                    label="类型"
                    prop="fileType"
                    show-overflow-tooltip
                    width="100"
                  >
                  </el-table-column>

                  <el-table-column
                    align="center"
                    :resizable="false"
                    fixed="right"
                    label="操作"
                    show-overflow-tooltip
                    v-if="p.actpoint !== 'look'"
                    width="60"
                  >
                    <template slot-scope="scope">
                      <el-link
                        :underline="false"
                        @click="handleRemove1(scope.row, scope.$index)"
                        type="warning"
                      >删除</el-link
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <div v-if="!p.type&& p.trackStatus !=2&&p.trackStatus !=3 ">
                <p v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>标段信息: </span>
                  <el-button
                    v-show="p.actpoint == 'add'"
                    @click="add('bd')"
                    class="detatil-flie-btn"
                    type="primary"
                  >新增
                  </el-button
                  >
                </p>
                <el-table
                  v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
                  :data="detailform.topInfoSectionList"
                  :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
                  @selection-change="handleSelectionChange"
                  align="center"
                  border
                  class="detailTable"
                  ref="table"
                  style="width: 98%;"
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
                    <template slot="header">
                      <p>
                        <span class="red-star">*</span>
                        标段名
                      </p>
                    </template>
                    <template slot-scope="scope">
                      <el-form-item class="tabelForm" :prop="'topInfoSectionList.' + scope.$index + '.sectionName'"     :rules="{
           required: true, message: '此项不能为空', trigger: 'blur'
        }">
                        <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                        <el-input
                          clearable
                          :disabled="scope.row.uuid!=null"
                          v-model="scope.row.sectionName"
                        ></el-input>
                      </el-form-item>
                      <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                    </template>
                  </el-table-column>

                  <el-table-column
                    :resizable="false"
                    label="项目规模(万元)"
                    align="center"
                    prop="projectScale"
                    width="350"

                  >
                    <template slot-scope="scope">
                      <el-form-item class="tabelForm" :prop="'topInfoSectionList.' + scope.$index + '.projectScale'" :rules='rules.contractAmount'>
                        <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                        <el-tooltip popper-class="tooltip-class" :content="String(scope.row.projectScale)" placement="bottom" :disabled="p.actpoint !== 'look'" effect="dark">
                          <el-input
                            class="input-el-input-group"
                            v-model="scope.row.projectScale"
                            clearable
                            :disabled="scope.row.uuid!=null"
                          >
                            <template slot="prepend">¥</template>
                            <template slot="append">(万元)</template>
                          </el-input>
                        </el-tooltip>

                      </el-form-item>
                      <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                    </template>
                  </el-table-column>

                  <el-table-column
                    :resizable="false"
                    fixed="right"
                    label="操作"
                    align="center"
                    show-overflow-tooltip
                    v-if="p.actpoint=='add'"
                    width="80">
                    <template slot-scope="scope">
                      <el-link
                        :disabled="scope.row.uuid!=null"
                        :underline="false"
                        @click="del(scope.$index,scope.row,detailform.topInfoSectionList,'bd')"
                        type="warning">删除</el-link>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    fixed="right"
                    label="是否为跟踪标段"
                    align="center"
                    show-overflow-tooltip
                    v-if="p.actpoint!='add'"
                    width="80">
                    <template slot-scope="scope">
                      <el-switch
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        class="inline-formitem-switch"
                        v-model="scope.row.isTrack"
                        active-color="#409EFF"
                        inactive-color="#ddd"
                        active-value="1"
                        inactive-value="0"

                      >
                        <!--@change="setMain(scope.$index,detailform.topInfoSectionList)"-->
                      </el-switch>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'">
        <Audit-Process :task="p.task||{businessId:p.topOrgId,businessType:' contract_project_new'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import FileUpload from '@/components/fileUpload'
  import { isMoney, isMobile} from '@/utils/validate'
  import AuditProcess from '@/components/auditProcess'

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
      };
      var validatePhone = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMobile(value)) {
          callback(new Error('请输入正确的手机格式'))
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
          topInfoOrg: {
            projectTrackResponPerson:"",
          },
          topInfoSiteList: [],
          topInfoSectionList: [],
          value1: [],
          topInfoTrack_01: [],
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
          ],
          phone: [
            { required: true,validator: validatePhone, trigger: 'blur' }
          ]
        },//表单验证规则
      };
    },
    components: {
      Tree,
      FileUpload,
      AuditProcess
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
        return this.$store.state.category.projectNature;
      },
      certificationType(){
        return this.$store.state.certificationType;
      },
      bizCode() {
        return this.$store.state.bizCode;
      },
      projectPlate(){
        return this.$store.state.projectPlate;
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
      // window.onresize = () => {
      //   return (() => {
      //     window.screenWidth = document.body.clientWidth
      //   console.log( window.screenWidth)
      // })()
      // }
      // this.$store.commit("setCategory", 'projectDomainType');
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
      console.log(this.p)
      this.id=this.p.instid;
      if (this.p.actpoint === "edit"||this.id||this.p.actpoint === "task") {
        this.getDetail();
      }
      if (this.p.actpoint === "add"||this.uuid) {
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

      // eslint-disable-next-line no-unde
    },
    methods: {
      //流程操作
      operation(type){
        this.$http
          .post(
            '/api/contract/topInfo/TopInfor/process/'+type,
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
      },
      //设置是否为跟踪标段
      setMain(i,list){
        list.forEach((item,index)=>{
          if(index!=i){
            item.isTrack="0"
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
            this.detailform.topInfoTrack_01.push(response.data);
            console.log(fileList);
          },
        });
      } else {
        this.$message.error(response.msg);
      }
    },
       // 上传删除
    handleRemove1(file, index) {
      this.$http
        .post("/api/contract/topInfo/CommonFiles/list/delete", {
          ids: [file.uuid],
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.detailform.topInfoTrack_01.splice(index, 1);
          }
        });
    },
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
      getTwoXZ(id){
        this.detailform.topInfor.projectNatureSecondId='';
        this.projectNatureTwo=[];
        if(id!=''){
          this.projectNature.find(
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
      //获取下拉框id和name的公共方法
      getNameZb(id, list, name) {
        if(id){
          this.$forceUpdate()
          this.detailform.topInfoOrg[name] = list.find(
            (item) => item.id == id
        ).detailName;
          console.log(this.detailform.topInfoOrg[name]);
        }
      },

        submit(formName,type) {
            var url='';
            if(type=='save'){
                url="/api/contract/topInfo/TopInfor/detail/saveOrUpdate"
            }else{
                url="/api/contract/topInfo/TopInfor/process/start"
            }
            var topInforCapitalList = [];
            this.amountSource.forEach((item) => {
                if (this.detailform.value1&&this.detailform.value1.indexOf(item.id) != -1) {
                    var v = {
                        capitalId: item.id,
                        capitalName: item.detailName,
                        capitalCode: item.detailCode
                    };
                    topInforCapitalList.push(v);
                }
            });
            this.detailform.topInforCapitalList=topInforCapitalList;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http
                        .post(
                            url,
                            JSON.stringify(this.detailform),
                            {useJson: true}
                        )
                        .then((res) => {
                            if (res.data.code === 200) {
                                this.$message({
                                  message:  `${type=='save'?'保存':'提交'}成功`,
                                    type: "success",
                                });
                              this.$router.back()
                            }
                        });
                } else {
                    this.$message.error("请添加必填项");
                    return false;
                }
            });
        },

      //跟踪接口
      saveInfo(formName) {
        // if(this.detailform.topInfor.isMajorProject=='0'&&this.detailform.topInfoTrack_01==''){
        //   this.$message.error("重大项目必须上传项目总结附件");
        // }
        var topInforCapitalList = [];
        this.amountSource.forEach((item) => {
          if (this.detailform.value1&&this.detailform.value1.indexOf(item.id) != -1) {
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
                "/api/contract/topInfo/TopInfor/detail/saveOrUpdateForTrack",
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
                    path: "/manage/proposal/track_list",
                  });
                }
              });
          } else {
            this.$message.error("请添加必填项");
            return false;
          }
        });
      },


// 放弃跟踪接口
            saveInfofq(formName) {
        // if(this.detailform.topInfor.isMajorProject=='0'&&this.detailform.topInfoTrack_01==''){
        //   this.$message.error("重大项目必须上传项目总结附件");
        // }
        var topInforCapitalList = [];
        this.amountSource.forEach((item) => {
          if (this.detailform.value1&&this.detailform.value1.indexOf(item.id) != -1) {
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
                "/api/contract/topInfo/TopInfor/detail/saveOrUpdateForGiveUpTrack",
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
                    path: "/manage/proposal/track_list",
                  });
                }
              });
          } else {
            this.$message.error("请添加必填项");
            return false;
          }
        });
      },

// 结束跟踪接口
            saveInfoend(formName) {
        if(this.detailform.topInfor.isMajorProject=='0'&&this.detailform.topInfoTrack_01==''){
          this.$message.error("重大项目必须上传项目总结附件");
        }
        var topInforCapitalList = [];
        this.amountSource.forEach((item) => {
          if (this.detailform.value1&&this.detailform.value1.indexOf(item.id) != -1) {
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
                "/api/contract/topInfo/TopInfor/detail/saveOrUpdateForEndTrack",
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
                    path: "/manage/proposal/track_list",
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
                "/api/contract/topInfo/TopInfoSection/list/delete",
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
        var url='',data={};
        if(this.p.actpoint!='task'){
          url="/api/contract/topInfo/TopInfor/detail/entityInfoForTrack";
          data={topInfoId:this.id}
        }else{
          url="/api/contract/topInfo/TopInfor/detail/entityInfo";
          data={topOrgId:this.id}
        }
        this.$http
          .post(url, data)
          .then((res) => {
            var datas=res.data.data;
            this.getTwo(datas.topInfor.enginTypeFirstId);
            this.getTwoSC(datas.topInfor.marketFirstNameId);
            this.getTwoXZ(datas.topInfor.projectNatureFirstId);
            this.detailform={
              topInfor: datas.topInfor||{},
              topInfoOrg: datas.topInfoOrg||{},
              topInfoSiteList: datas.topInfoSiteList||[],
              topInfoSectionList: datas.topInfoSectionList||[],
              value1:[],
              topInfoTrack_01: datas.topInfoTrack_01||[],
            }
            datas.topInforCapitalList.forEach((item)=>{
              this.detailform.value1.push(item.capitalId)
            });
            console.log(this.detailform)
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

>>>.detailDivider {
    margin: 60px 0 20px 0 !important;
}
>>>.el-form-item__error {
    margin: -6px 0px 0 20px;
}
// >>>.el-form-item__content{
//   margin-top: -15px!important;
// }
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
</style>

