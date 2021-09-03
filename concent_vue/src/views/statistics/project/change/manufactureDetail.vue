<!--工业制造项目变更-->

<template>
  <div style="position: relative">
  <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailForm','save')" class="detailbutton detail-back-tab save-btn">
          保存
        </el-button>
        <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailForm.project.flowStatus=='edit'||detailForm.project.flowStatus=='reject')" @click="saveInfo('detailForm','sub')" class="detailbutton detail-back-tab sub-btn">提交
        </el-button>
        <el-button
            v-show="p.actpoint == 'task'&&p.task.edit==false"
            class="detailbutton detail-back-tab bh"
            @click="operation('back')"
            type="warning"
          >驳回</el-button>
          <el-button
            v-show="p.actpoint == 'task'&&p.task.edit==false"
            class="detailbutton detail-back-tab tg"
            @click="operation('complete')"
            type="success"
          >通过</el-button>
    <el-button class="detail-back-tab detailbutton" @click="back" type="text">返回</el-button>
    <el-tabs type="border-card">
      <el-tab-pane label="变更后">
        <div class="detailBoxBG">
          <el-form
            :inline="false"
            :model="detailForm"
            class="gcform"
            ref="detailForm"
            style="background: white">
            <el-row>
              <el-form-item
                label="项目名称:"
                prop="project.projectName"
                :rules="rules.project.must"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.projectName"/>
              </el-form-item>
              <el-form-item
                label="外文名称:"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.projectForeginName"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="项目类型:"
                prop="project.projectTypeId"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: ['blur','change'],
                }"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  placeholder="请选择"
                  @change="resetFuDai(detailForm.project.projectTypeId, projectType, 'projectTypeName','projectTypeCode')"
                  v-model="detailForm.project.projectTypeId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.detailCode"
                    v-for="(item, index) in projectType"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="父项目名称:"
                prop="project.fatherProjectId"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: ['blur','change'],
                }"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  placeholder="请选择"
                  @change="getFatherName(detailForm.project.fatherProjectId, fatherList, 'fatherProjectName')"
                  v-model="detailForm.project.fatherProjectId">
                  <el-option
                    :key="index"
                    :label="item.projectName"
                    :value="item.uuid"
                    v-for="(item, index) in fatherList"/>
                </el-select>
              </el-form-item>
            </el-row>             
            <el-row>
              <!-- <el-form-item
                label="产品名称:"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.productName"/>
              </el-form-item> -->
              <el-form-item
                label="客户名称:"
                prop="project.companyBuildId"
                :rules="{
                    required: true,
                    message: '此项不能为空',
                    trigger: 'blur',
                  }"
                style="width: 32.5%">
                  <el-select
                    v-model="constructionOrgList"
                    @change="companyBuildChange"
                    v-if="detailForm.project.isClientele=='1'"
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                    multiple
                    filterable
                    collapse-tags
                    placeholder="请选择">
                    <el-option
                      v-for="item in pubCustomers"
                      :key="item.customerId"
                      :label="item.customerName"
                      :value="item.customerId">
                    </el-option>
                  </el-select>
                  <el-select
                    v-model="constructionOrgList"
                    @change="companyBuildChange"
                    v-if="detailForm.project.isClientele!='1'"
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                    multiple
                    filterable
                    collapse-tags
                    placeholder="请选择">
                      <el-option
                        :key="index"
                        :label="item.customerName"
                        :value="item.customerId"
                        v-for="(item, index) in sjdwList"
                      ></el-option>
                  </el-select>
              </el-form-item>
              <el-col :span="8">
                <el-form-item
                  class="inline-formitem"
                  label="是否客户:"
                  prop="project.isClientele"
                  :rules="{
                      required: true,
                      message: '此项不能为空',
                      trigger: 'blur',
                    }"
                >
                  <el-switch
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                    class="inline-formitem-switch"
                    v-model="detailForm.project.isClientele"
                    active-color="#409EFF"
                    inactive-color="#ddd"
                    active-value="1"
                    inactive-value="0"
                    @change="companyBuildClear"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item
                label="合同号:"
                prop="project.contractNumber"
                style="width:32.5%;">
                <el-input
                  clearable
                  disabled
                  v-model="detailForm.project.contractNumber"/>
              </el-form-item>
            <el-form-item
              v-show="detailForm.project.contractInfoList!=''"
              label="合同总金额(万元):" 
              prop="project.contractAmountTotal"
              :rules="rules.project.isMoney"
              style="width: 32.5%">
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.contractAmountTotal">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>
            <el-form-item
              v-show="detailForm.project.contractInfoList == ''"
              label="合同金额(万元):" 
              prop="project.contractMoney"
              :rules="rules.project.isMoney"
              style="width: 32.5%">
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.contractMoney">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>

            </el-row>
            <el-row>
              <!-- <el-form-item
                label="合同所属板块:"
                prop="project.ocontractModel"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="detailForm.project.ocontractModel">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.detailName"
                    v-for="(item, index) in wumoveType"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="合同补充金额(万元):"
                prop="project.contractAmountSupplement"
                :rules="rules.project.isMoney"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  v-model="detailForm.project.contractAmountSupplement">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item> -->
              <el-form-item
                label="是否系统内采购:"
                prop="isSystemPurchase"
                class="inline-formitem"
                style="width:32.5%;">
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  class="inline-formitem-switch"
                  v-model="detailForm.project.isSystemPurchase"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="初始合同额(万元):"
                prop="project.contractAmountInitial"
                :rules="rules.project.isMustMoney"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.contractAmountInitial">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                  label="初始我方份额(万元)"
                  prop="project.ourAmount"
                  :rules="rules.project.isMustMoney"
                  style="width: 32.5%"
                >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  v-model="detailForm.project.ourAmount"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                  label="我方份额(万元)"
                  prop="project.amountWe"
                  :rules="rules.project.isMustMoney"
                  style="width: 32.5%"
                >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  v-model="detailForm.project.amountWe"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
            </el-row>           
            <el-row>
              <el-form-item
                label="项目状态:"
                prop="project.projectStatusId"
                :rules="rules.project.must"
                style="width:32.5%;">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  @change="getName(detailForm.project.projectStatusId, projectStatus, 'projectStatusName')"
                  v-model="detailForm.project.projectStatusId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectStatus"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="增值税(万元):"
                prop="project.valueAddedTax"
                :rules="rules.project.isMoney"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  clearable
                  placeholder="请输入"
                  @change="getOutputTax"
                  v-model="detailForm.project.valueAddedTax">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                  label="上报产值是否含税:"
                  prop="project.isOutputTax"
                  class="inline-formitem"
                  style="width: 32.5%">
                  <el-switch
                    disabled
                    class="inline-formitem-switch"
                    v-model="detailForm.project.isOutputTax"
                    active-color="#409EFF"
                    inactive-color="#ddd"
                    active-value="1"
                    inactive-value="0"/>
                </el-form-item>
            </el-row>
            <el-row>
              <!-- <el-form-item
                label="供方地点"
                style="width: 32.5%"
                prop="project.topInfoSiteList[0].path"
                :rules="rules.project.must"
              >
                <el-input v-model="detailForm.project.topInfoSiteList[0].path" placeholder="供方地点"
                          :disabled="p.actpoint === 'look'||p.actpoint === 'task'" clearable>
                  <el-button slot="append" :disabled="p.actpoint === 'look'||p.actpoint === 'task'" icon="el-icon-search"
                             @click="selectPosition()"></el-button>
                </el-input>
              </el-form-item> -->
              <el-form-item
                label="合同签订时间:"
                prop="project.contractSignTime"
                style="width: 32.5%">
                <el-date-picker
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  v-model="detailForm.project.contractSignTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="合同开始时间:"
                prop="project.ocontractStartTime"
                style="width: 32.5%">
                <el-date-picker
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  v-model="detailForm.project.ocontractStartTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
              <el-form-item
                label="合同结束时间:"
                prop="project.ocontractEndTime"
                style="width: 32.5%">
                <el-date-picker
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  v-model="detailForm.project.ocontractEndTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="签约单位:"
                prop="amountCompanyName"
                style="width:32.5%;">
                <el-input
                  clearable
                  disabled
                  placeholder="请输入"
                  v-model="detailForm.project.amountCompanyName"/>
              </el-form-item>
              <el-form-item
                label="所属单位:"
                prop="companyBelongName"
                style="width:32.5%;">
                <el-input
                  clearable
                  disabled
                  placeholder="请输入"
                  v-model="detailForm.project.companyBelongName"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="业务类别:"
                prop="categorySecondId"
                style="width: 32.5%">
                <el-select
                  filterable
                  clearable
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  placeholder="请选择"
                  @change="getName(detailForm.project.categorySecondId, bizTypeCodeTwo, 'categorySecondName')"
                  v-model="detailForm.project.categorySecondId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in bizTypeCodeTwo"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="海外合同(美元):"
                prop="project.ocontractAmountTotal"
                :rules="rules.project.isMoney"
                style="width:32.5%;">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  placeholder="请输入"
                  v-model="detailForm.project.ocontractAmountTotal">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="新兴市场类别(一级):"
                prop="marketFirstId"
                style="width: 32.5%">
                <el-select
                  clearable
                  filterable
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  placeholder="请选择"
                  @change="getMarketTwo"
                  v-model="detailForm.project.marketFirstId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in emergingMarket"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="新兴市场类别(二级):"
                prop="marketSecondId"
                style="width: 32.5%">
                <el-select
                  filterable
                  clearable
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.marketFirstId==='00b87acd71784c3ba860b9513789724e'||detailForm.project.contractInfoList!=''"
                  placeholder="请选择"
                  @change="getName(detailForm.project.marketSecondId, emergingMarketTwo, 'marketSecondName')"
                  v-model="detailForm.project.marketSecondId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in emergingMarketTwo"/>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                v-if="detailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
                label="装配率(%):"
                prop="project.assemblyRate"
                :rules="rules.project.isMustMoney"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.assemblyRate">
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
              <el-form-item
                v-if="detailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
                label="装配类型:"
                prop="project.assemblyTypeId"
                :rules="rules.project.must"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  @change="getName(detailForm.project.assemblyTypeId, assemblyType, 'assemblyTypeName')"
                  placeholder="请选择"
                  v-model="detailForm.project.assemblyTypeId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in assemblyType"/>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                v-if="detailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
                label="建筑类型:"
                prop="project.architectureTypeId"
                :rules="rules.project.must"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  @change="getName(detailForm.project.architectureTypeId, architecturalType, 'architectureTypeName')"
                  placeholder="请选择"
                  v-model="detailForm.project.architectureTypeId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in architecturalType"/>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="detailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
                label="房屋结构类型:"
                prop="project.houseTypeId"
                :rules="rules.project.must"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  @change="getName(detailForm.project.houseTypeId, buildingStructure, 'houseTypeName')"
                  placeholder="请选择"
                  v-model="detailForm.project.houseTypeId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in buildingStructure"/>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                v-if="detailForm.project.marketFirstId === '50cd5e9992ac4653920fac8c1f2eb2e3'"
                label="场地名称:"
                prop="project.fieldId"
                :rules="rules.project.must"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  filterable
                  clearable
                  @change="getName(detailForm.project.fieldId, siteName, 'fieldName')"
                  placeholder="请选择"
                  v-model="detailForm.project.fieldId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in siteName"/>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                v-if="detailForm.project.projectPusher"
                label="推送人:"
                prop="project.projectPusher"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  disabled
                  v-model="detailForm.project.projectPusher"/>
              </el-form-item>
              <!-- <el-form-item
                label="联系方式:"
                prop="project.projectPusherPhone"
                :rules="rules.project.isMobile"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  v-model="detailForm.project.projectPusherPhone"/>
              </el-form-item> -->
            </el-row>
            <!--备注(最多2000字)-->
            <el-row>
              <el-form-item
                class="neirong"
                label="备注(最多2000字):"
                :rules="{ min: 0, max: 2000, message: '最多输入2000字', trigger: 'blur' }"
                prop="project.projectRemark">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  type="textarea"
                  placeholder="请输入"
                  v-model="detailForm.project.projectRemark"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                class="neirong"
                label="变更原因:">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  type="textarea"
                  placeholder="请输入"
                  v-model="detailForm.project.changeReason"/>
              </el-form-item>
            </el-row>
            <div>
              <p class="detail-title" style="overflow:hidden;margin-right:30px">
                <span>产品信息:</span>
                <el-button
                  v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                  @click="addProduct()"
                  class="upload-demo detailUpload detatil-flie-btn"
                  type="primary">
                  新增
                </el-button>
              </p>
              <el-table
                :data="detailForm.project.infoProductList"
                :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
                align="center"
                border
                class="detailTable"
                ref="table"
                style="width: 100%;"
              >
                <el-table-column
                  :width="80"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"/>
                <el-table-column
                  :resizable="false"
                  label="产品名称"
                  align="center"
                  prop="productName"
                  min-width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <!--:prop="'project.productInfoList[' + scope.$index + '].productName'"-->
                    <!--:rules="{required: true, message: '此项不能为空', trigger: 'blur'}"-->
                    <el-form-item class="tabelForm">
                      <el-input
                        v-model="scope.row.productName"
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint === 'task'"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="规格型号"
                  width="200"
                  align="center"
                  prop="specificationAndModel"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm">
                      <el-input
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                        v-model="scope.row.specificationAndModel"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="产品数量"
                  width="150"
                  align="center"
                  prop="productQuantity"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm"
                                  :prop="'project.infoProductList[' + scope.$index + '].productQuantity'"
                                  :rules="rules.project.isNumber">
                      <el-input
                        clearable
                       :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                        v-model="scope.row.productQuantity"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="产品单位"
                  width="150"
                  align="center"
                  prop="productUnit"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm">
                      <el-input
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                        v-model="scope.row.productUnit"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="总金额(万元)"
                  align="center"
                  prop="productTotalPrice"
                  width="300"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm"
                                  :prop="'project.infoProductList[' + scope.$index + '].productTotalPrice'"
                                  :rules="rules.project.isMustMoney">
                      <el-input
                        class="group-no-padding"
                        v-model="scope.row.productTotalPrice"
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                      >
                        <template slot="prepend">¥</template>
                        <template slot="append">(万元)</template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'&&detailForm.project.contractInfoList==''"
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  align="center"
                  show-overflow-tooltip
                  width="80">
                  <template slot-scope="scope">
                    <el-link
                      :underline="false"
                      @click="del(scope.$index,scope.row,detailForm.project.infoProductList)"
                      type="warning">删除
                    </el-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!--附件-->
              <p>
                <span>相关附件: </span>
                <el-button
                  v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                  size="small"
                  type="primary"
                  @click="openFileUp('/api/contract/topInfo/CommonFiles/contractInfo/02/uploadFile','commonFilesList')">
                  点击上传
                </el-button>
              </p>
              <el-table
                :data="detailForm.project.commonFilesList"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                align="center"
                border
                class="detailTable"
                ref="table"
                style="width: 100%;height: auto;"
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

                <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize"
                                show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType"
                                show-overflow-tooltip>

                </el-table-column>

                <el-table-column
                  align="center"
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  show-overflow-tooltip
                  v-if="p.actpoint!=='look'&&p.actpoint !== 'task'"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
              <div >
                <p  v-if="p.actpoint != 'add'" class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>关联合同: </span>
                  <el-button
                    v-show="p.actpoint != 'look'&&p.actpoint != 'task'"
                    @click="addContract()"
                    class="detatil-flie-btn"
                    type="primary">新增
                  </el-button>
                </p>
                <el-table
                  v-if="p.actpoint != 'add'"
                  :data="detailForm.project.contractInfoList"
                  :header-cell-style="{
                  'text-align': 'center',
                  'background-color': 'rgba(246,248,252,1)',
                  color: 'rgba(0,0,0,1)',
                }"
                  align="center"
                  border
                  class="detailTable"
                  ref="table"
                  style="width: 100%;"
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
                    label="合同名称"
                    prop="contractName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同编号"
                    prop="contractCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同金额"
                    prop="contractAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    v-show="!p.actpoint === 'add'"
                    :resizable="false"
                    fixed="right"
                    label="操作"
                    align="center"
                    show-overflow-tooltip
                    v-if="p.actpoint !== 'add'&&p.actpoint !== 'task'"
                    width="150">
                    <template slot-scope="scope">
                      <el-link
                        :underline="false"
                        @click="removeContract(scope.$index,scope.row)"
                        type="warning">删除
                      </el-link>
                      <el-link
                        :underline="false"
                        @click="look(scope.row)"
                        type="warning">查看合同
                      </el-link>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="变更前">
        <div class="detailBoxBG">
          <el-form
            :inline="false"
            :model="showDetailForm"
            class="gcform"
            ref="showDetailForm"
            style="background: white">
            <el-row>
              <el-form-item
                label="项目名称:"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.projectName"/>
              </el-form-item>
              <el-form-item
                label="外文名称:"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.projectForeginName"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="项目类型:"
                prop="project.projectTypeId"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: ['blur','change'],
                }"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.projectTypeId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.detailCode"
                    v-for="(item, index) in projectType"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="父项目名称:"
                prop="project.fatherProjectId"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: ['blur','change'],
                }"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.fatherProjectId">
                  <el-option
                    :key="index"
                    :label="item.projectName"
                    :value="item.uuid"
                    v-for="(item, index) in fatherList"/>
                </el-select>
              </el-form-item>
            </el-row>              
            <el-row>
              <!-- <el-form-item
                label="产品名称:"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.productName"/>
              </el-form-item> -->
              <el-form-item
                label="客户名称:"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.companyBuild"/>
              </el-form-item>
              <el-col :span="8">
                <el-form-item
                  class="inline-formitem"
                  label="是否客户:"
                  prop="project.isClientele"
                  :rules="{
                      required: true,
                      message: '此项不能为空',
                      trigger: 'blur',
                    }"
                >
                  <el-switch
                    disabled
                    class="inline-formitem-switch"
                    v-model="showDetailForm.project.isClientele"
                    active-color="#409EFF"
                    inactive-color="#ddd"
                    active-value="1"
                    inactive-value="0"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item
                label="合同号:"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  disabled
                  v-model="showDetailForm.project.contractNumber"/>
              </el-form-item>
            <el-form-item
              v-show="detailForm.project.contractInfoList!=''"
              label="合同总金额(万元):" 
              prop="project.contractAmountTotal"
              :rules="rules.project.isMoney"
              style="width: 32.5%">
              <el-input
                disabled
                clearable
                placeholder="请输入"
                v-model="showDetailForm.project.contractAmountTotal">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>
            <el-form-item
              v-show="detailForm.project.contractInfoList == ''"
              label="合同金额(万元):" 
              prop="project.contractMoney"
              :rules="rules.project.isMoney"
              style="width: 32.5%">
              <el-input
                disabled
                clearable
                placeholder="请输入"
                v-model="showDetailForm.project.contractMoney">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>

            </el-row>
            <el-row>
              <!-- <el-form-item
                label="合同所属板块:"
                prop="project.ocontractModel"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.ocontractModel">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.detailName"
                    v-for="(item, index) in wumoveType"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="合同补充金额(万元):"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  disabled
                  v-model="showDetailForm.project.contractAmountSupplement">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item> -->
              <el-form-item
                label="是否系统内采购:"
                class="inline-formitem"
                style="width:32.5%;">
                <el-switch
                  disabled
                  class="inline-formitem-switch"
                  v-model="showDetailForm.project.isSystemPurchase"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="初始合同额(万元):"
                prop="project.contractAmountInitial"
                :rules="rules.project.isMustMoney"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.contractAmountInitial">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                  label="初始我方份额(万元)"
                  prop="project.ourAmount"
                  :rules="rules.project.isMustMoney"
                  style="width: 32.5%"
                >
                <el-input
                  disabled
                  v-model="showDetailForm.project.ourAmount"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                  label="我方份额(万元)"
                  prop="project.amountWe"
                  :rules="rules.project.isMustMoney"
                  style="width: 32.5%"
                >
                <el-input
                  disabled
                  v-model="showDetailForm.project.amountWe"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
            </el-row>           
            <el-row>
              <el-form-item
                label="项目状态:"
                style="width:32.5%;">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  disabled
                  v-model="showDetailForm.project.projectStatusId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectStatus"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="增值税(万元):"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.valueAddedTax">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                  label="上报产值是否含税:"
                  prop="project.isOutputTax"
                  class="inline-formitem"
                  style="width: 32.5%">
                  <el-switch
                    disabled
                    class="inline-formitem-switch"
                    v-model="showDetailForm.project.isOutputTax"
                    active-color="#409EFF"
                    inactive-color="#ddd"
                    active-value="1"
                    inactive-value="0"/>
                </el-form-item>
            </el-row>
            <el-row>
              <!-- <el-form-item
                label="供方地点"
                style="width: 32.5%"
              >
                <el-input v-model="showDetailForm.project.supplierAddress" placeholder="供方地点"
                          disabled clearable>
                  <el-button slot="append" disabled icon="el-icon-search"
                             @click="selectPosition()"></el-button>
                </el-input>
              </el-form-item> -->
              <el-form-item
                label="合同签订时间:"
                prop="project.contractSignTime"
                style="width: 32.5%">
                <el-date-picker
                  disabled
                  v-model="showDetailForm.project.contractSignTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="合同开始时间:"
                prop="project.ocontractStartTime"
                style="width: 32.5%">
                <el-date-picker
                  disabled
                  v-model="showDetailForm.project.ocontractStartTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
              <el-form-item
                label="合同结束时间:"
                prop="project.ocontractEndTime"
                style="width: 32.5%">
                <el-date-picker
                  disabled
                  v-model="showDetailForm.project.ocontractEndTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="签约单位:"
                prop="amountCompanyName"
                style="width:32.5%;">
                <el-input
                  clearable
                  disabled
                  placeholder="请输入"
                  v-model="showDetailForm.project.amountCompanyName"/>
              </el-form-item>
              <el-form-item
                label="所属单位:"
                prop="companyBelongName"
                style="width:32.5%;">
                <el-input
                  clearable
                  disabled
                  placeholder="请输入"
                  v-model="showDetailForm.project.companyBelongName"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="业务类别:"
                prop="categorySecondId"
                style="width: 32.5%">
                <el-select
                  filterable
                  clearable
                  disabled
                  placeholder="请选择"
                  v-model="showDetailForm.project.categorySecondId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in bizTypeCodeTwo"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="海外合同(美元):"
                style="width:32.5%;">
                <el-input
                  clearable
                  disabled
                  placeholder="请输入"
                  v-model="showDetailForm.project.ocontractAmountTotal">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="新兴市场类别(一级):"
                prop="marketFirstId"
                style="width: 32.5%">
                <el-select
                  clearable
                  filterable
                  disabled
                  placeholder="请选择"
                  v-model="showDetailForm.project.marketFirstId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in emergingMarket"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="新兴市场类别(二级):"
                prop="marketSecondId"
                style="width: 32.5%">
                <el-select
                  filterable
                  disabled
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.marketSecondName">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in emergingMarketTwo"/>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                v-if="showDetailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
                label="装配率(%):"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.assemblyRate">
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
              <el-form-item
                v-if="showDetailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
                label="装配类型:"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.assemblyTypeName">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in assemblyType"/>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                v-if="showDetailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
                label="建筑类型:"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.architectureTypeId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in architecturalType"/>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="showDetailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
                label="房屋结构类型:"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.houseTypeId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in buildingStructure"/>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                v-if="showDetailForm.project.marketFirstId === '50cd5e9992ac4653920fac8c1f2eb2e3'"
                label="场地名称:"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.fieldId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in siteName"/>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                v-if="showDetailForm.project.projectPusher"
                label="推送人:"
                prop="project.projectPusher"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  disabled
                  v-model="showDetailForm.project.projectPusher"/>
              </el-form-item>
              <!-- <el-form-item
                label="联系方式:"
                style="width:32.5%;">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.projectPusherPhone"/>
              </el-form-item> -->
            </el-row>
            <!--备注(最多2000字)-->
            <el-row>
              <el-form-item
                class="neirong"
                label="备注(最多2000字):">
                <el-input
                  type="textarea"
                  placeholder="请输入"
                  disabled
                  v-model="showDetailForm.project.projectRemark"/>
              </el-form-item>
            </el-row>
            <div>
              <p class="detail-title" style="overflow:hidden;margin-right:30px">
                <span>产品信息:</span>
              </p>
              <el-table
                :data="showDetailForm.project.infoProductList"
                :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
                align="center"
                border
                class="detailTable"
                ref="table"
                style="width: 100%;"
              >
                <el-table-column
                  :width="80"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"/>
                <el-table-column
                  :resizable="false"
                  label="产品名称"
                  align="center"
                  prop="productName"
                  min-width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <!--:prop="'project.productInfoList[' + scope.$index + '].productName'"-->
                    <!--:rules="{required: true, message: '此项不能为空', trigger: 'blur'}"-->
                    <el-form-item class="tabelForm">
                      <el-input
                        v-model="scope.row.productName"
                        clearable
                        disabled/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="规格型号"
                  width="200"
                  align="center"
                  prop="specificationAndModel"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm">
                      <el-input
                        clearable
                        disabled
                        v-model="scope.row.specificationAndModel"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="产品数量"
                  width="150"
                  align="center"
                  prop="productQuantity"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm">
                      <el-input
                        clearable
                        disabled
                        v-model="scope.row.productQuantity"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="产品单位"
                  width="150"
                  align="center"
                  prop="productUnit"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm">
                      <el-input
                        clearable
                        disabled
                        v-model="scope.row.productUnit"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="总金额(万元)"
                  align="center"
                  prop="productTotalPrice"
                  width="300"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm">
                      <el-input
                        class="group-no-padding"
                        v-model="scope.row.productTotalPrice"
                        clearable
                        disabled
                      >
                        <template slot="prepend">¥</template>
                        <template slot="append">(万元)</template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!--附件-->
              <p>
                <span>相关附件: </span>
              </p>
              <el-table
                :data="detailForm.project.commonFilesList"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                align="center"
                border
                class="detailTable"
                ref="table"
                style="width: 100%;height: auto;"
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

                <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize"
                                show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType"
                                show-overflow-tooltip>

                </el-table-column>
              </el-table>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
    <related-contract  v-if="contractStatas" ref="infoCS" @getPosition="goAddDetail"></related-contract>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import { isMoney, isMobile, isPhone } from '@/utils/validate'
  import FileUpload from '@/components/fileUpload'
  import RelatedContract from '../relatedContract'

  export default {
    name: 'change',
    components: {
      Tree,FileUpload,RelatedContract
    },
    data() {
      const validateMoney = (rule, value, callback) => {
        if (!value || value === '') {
          callback()
        } else if (!isMoney(value)) {
          callback(new Error('请输入正确的金额格式'))
        } else {
          callback()
        }
      }
      const validateMustMoney = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('此项不能为空'))
        } else if (!isMoney(value)) {
          callback(new Error('请输入正确的金额格式'))
        } else {
          callback()
        }
      }
      const validateNumber = (rule, value, callback) => {
        if (!value || value === '') {
          callback()
        } else if (!isMoney(value)) {
          callback(new Error('请输入正确的数字格式'))
        } else {
          callback()
        }
      }
      const validateMobile = (rule, value, callback) => {
        if (!value || value === '') {
          callback()
        } else if (!isMobile(value) && !isPhone(value)) {
          callback(new Error('请输入正确的联系方式'))
        } else {
          callback()
        }
      }
      const validatePercent = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('此项不能为空'))
        } else if (!isMoney(value) || value < 0 || value > 100) {
          callback(new Error('请输入正确的装配率百分比'))
        } else {
          callback()
        }
      }
      return {
        fatherList:[],
        uuid: null,
        switchvalue: true,
        treeStatas: false,
        uploadVisible: false,
        contractStatas:false,//关联合同状态
        emergingMarketTwo: [],
        bizTypeCodeTwo: [],
        constructionOrgList: [], 
        sjdwList: [],
        inOut: [
          { label: '系统内', value: 0 },
          { label: '系统外', value: 1 }
        ],
        inOutRoad: [
          { label: '路内', value: 0 },
          { label: '路外', value: 1 }
        ],
        detailForm: {
          project: {
            projectSubContractList: [], // 分包字段
            infoProductList: [], // 产品列表
            infoSubjectMatterList: [], // 标的信息
            commonFilesList: [], // 文件列表
            topInfoSiteList: [],
            projectModuleId: '510ba0d79593418493eb1a11ed3e7df4', // 项目板块
            projectModuleCode:"industry",//项目板块code
            projectModuleName: '工业制造', // 项目板块
            projectName: '',
            projectForeginName: '',
            productName: '', // 产品名称
            customerName: '',
            contractNumber: '',
            contractMoney: '',
            contractAmountSupplement: '',
            supplierAddress: '', // 供方地点
            contractSignTime: '',
            ocontractStartTime: '',
            ocontractEndTime: '',
            valueAddedTax: '', // 增值税
            categoryFirstId: 'f01fc41388d14663ac8873113f55cdd5', // 业务类别（一级）
            categorySecondId: '', // 业务类别（二级）
            ocontractModel: '', // 合同所属板块
            isSystemPurchase: '', // 5
            companyBelongName: '股份公司', // 6
            projectStatusId: '',
            amountCompanyName: '',
            ocontractAmountTotal: '',
            marketFirstId: '',
            marketSecondId: '',
            assemblyRate: '',
            assemblyTypeId: '',
            architectureTypeId: '',
            houseTypeId: '',
            fieldId: '',
            projectPusher: '',
            projectRemark: '',
            projectPusherPhone: '',
            isClientele:'1',
            companyBuild:'',
            companyBuildId:'',
            isOutputTax:'1',
            projectTypeId:'',
            fatherProjectId:''
          }
        },
        showDetailForm: {
          project: {
            projectSubContractList: [], // 分包字段
            infoProductList: [], // 产品列表
            infoSubjectMatterList: [], // 标的信息
            commonFilesList: [], // 文件列表
            topInfoSiteList: [
              {
                path: '',
                placeId: '',
                ffid:'',
                uuid: ''
              }
            ],
            projectModuleId: '510ba0d79593418493eb1a11ed3e7df4', // 项目板块
            projectModuleCode:"industry",//项目板块code
            projectModuleName: '工业制造', // 项目板块
            projectName: '',
            projectForeginName: '',
            productName: '', // 产品名称
            customerName: '',
            contractNumber: '',
            contractMoney: '',
            contractAmountSupplement: '',
            supplierAddress: '', // 供方地点
            contractSignTime: '',
            ocontractStartTime: '',
            ocontractEndTime: '',
            valueAddedTax: '', // 增值税
            categoryFirstId: 'f01fc41388d14663ac8873113f55cdd5', // 业务类别（一级）
            categorySecondId: '', // 业务类别（二级）
            ocontractModel: '', // 合同所属板块
            isSystemPurchase: '', // 5
            companyBelongName: '股份公司', // 6
            projectStatusId: '',
            amountCompanyName: '',
            ocontractAmountTotal: '',
            marketFirstId: '',
            marketSecondId: '',
            assemblyRate: '',
            assemblyTypeId: '',
            architectureTypeId: '',
            houseTypeId: '',
            fieldId: '',
            projectPusher: '',
            projectRemark: '',
            projectPusherPhone: '',
            isClientele:'1',
            companyBuild:'',
            companyBuildId:'',
            isOutputTax:'1',
            projectTypeId:'',
            fatherProjectId:''
          }
        },
        rules: {
          project: {
            must: [{ required: true, message: '此项不能为空', trigger: ['blur', 'change'] }],
            isMoney: [{ validator: validateMoney, trigger: ['blur', 'change'] }],
            isMustMoney: [{ required: true, validator: validateMustMoney, trigger: ['blur', 'change'] }],
            isMobile: [{ validator: validateMobile, trigger: ['blur', 'change'] }],
            isPercent: [{ required: true, validator: validatePercent, trigger: ['blur', 'change'] }],
            isNumber: [{ validator: validateNumber, trigger: ['blur', 'change'] }]
          }
        },
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p))
      }
    },
    computed: {
      projectType() {//项目类型
        var projectTypeList = [];
        this.$store.state.projectType.forEach((item) => {
          if(item.detailCode == '017003' || item.detailCode == '017004'){
            projectTypeList.push(item);
          }
        });
        return projectTypeList
      },        
      pubCustomers() {//客户名称
        return this.$store.state.pubCustomers;
      },
      wumoveType() {
        return this.$store.state.wumoveType
      },
      projectStatus() {
        return this.$store.state.projectStatus
      },
      emergingMarket() {
        return this.$store.state.category.emergingMarket
      },
      assemblyType() {
        return this.$store.state.assemblyType
      },
      architecturalType() {
        return this.$store.state.architecturalType
      },
      buildingStructure() {
        return this.$store.state.buildingStructure
      },
      siteName() {
        return this.$store.state.siteName
      },
      bizTypeCode() {
        return this.$store.state.bizTypeCode
      }
    },
    mounted() {
      this.$store.dispatch('getConfig', {})
      this.$store.dispatch("getPubCustomers", {});
      this.$store.dispatch('getCategory', { name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3' })
      this.$store.dispatch('getCategory', { name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e' })
      this.$store.dispatch('getCategory', { name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72' })
      if (this.p.actpoint === 'edit' || this.p.actpoint === 'look'  || this.p.actpoint === 'task') {
        this.getDetail()
      }
      if (this.p.actpoint === 'add') {
        this.getAddDetail()
      }
      this.getProjectFather()
      // 业务类别数据格式不对，已处理
      this.bizTypeCode.find((item) => {
        if (item.parentDetailId === this.detailForm.project.categoryFirstId) {
          this.bizTypeCodeTwo.push(item)
        }
      })
       //设计单位列表
      this.$http
        .post(
          "/api/contract/Companies/detail/findCompanies",
        )
        .then((res) => {
          this.sjdwList = res.data.data.records;
          this.sjdwList.forEach((item)=>{
            item.value=item.companyName;
            item.customerName=item.companyName;
            item.customerId=item.uuid;
          })
        });
    },
    methods: {
      resetFuDai(id) {
        this.fatherList = [];
        this.detailForm.project.fatherProjectId = '';
        this.detailForm.project.fatherProjectName = '';
        this.detailForm.project.isBureauIndex = '';
        this.detailForm.project.projectTypeCode = id;
        this.detailForm.project.projectTypeName = this.projectType.find(
            (item) => item.detailCode === id
        ).detailName
        this.getProjectFather();
      },
      getFatherName(id, list, name) {
        if (id) {
          this.$forceUpdate()
          this.detailForm.project[name] = list.find(
            (item) => item.uuid === id
        ).projectName
        }
      },
      //获取父项目名称列表
      getProjectFather(){
        this.$http
          .post('/api/statistics/StatisticsProject/detail/findProjectFather',
            {
              projectTypeCode:this.detailForm.project.projectTypeCode,
              projectModuleId:this.detailForm.project.projectModuleId
            }
          )
          .then(res => {
            if(res.data.code  === 200){
              this.fatherList = res.data.data
            }else{
              this.fatherList = []
            }
        })
      },
      //建设单位下拉赋值
      companyBuildChange(){
        this.detailForm.project.companyBuildId = this.constructionOrgList.join(",")
      },
      //建设单位通过ID查找NAME
      getBuildName(){
        var nameList = []
        var customerList = this.pubCustomers
        this.constructionOrgList.forEach(idCheck => {
          let customer = customerList.find(item1=>item1.customerId===idCheck)
          if(customer){
            nameList.push(customer.customerName)
          }
          let outside = this.sjdwList.find(item2=>item2.customerId===idCheck)
          if(outside){
            nameList.push(outside.customerName)
          }

        })
        this.detailForm.project.companyBuild = nameList.join(",")
      },
      //切换是否客户
      companyBuildClear(){
        this.detailForm.project.companyBuildId = '',
        this.constructionOrgList = []
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
              '/api/statistics/StatisticsProject/changeProcess/'+type,
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
      //新增关联合同
      addContract(){
        this.contractStatas = true;
        this.$nextTick(() => {
          this.$refs.infoCS.init(this.detailForm.project.projectModuleId);
        })
      },
      //删除关联合同
      removeContract(row){
        this.$confirm(`确认删除该关联合同吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.detailForm.project.contractInfoList.splice(row,1);
          }).catch(() => {
                  this.$message.error('删除失败')
          })
      },
      //获取新增的关联合同
      goAddDetail(data){
        this.$forceUpdate();
        this.detailForm.project.contractInfoList.push(data);
        console.info(this.detailForm.project.contractInfoList)
        this.contractStatas = false;
      },
      addProduct() {
        let v = {
          uuid: '', // ID新增为空，但必须传
          productId: '', // ID新增为空，但必须传
          projectInfoId: '', // ID新增为空，但必须传
          productName: '',
          specificationAndModel: '',
          productQuantity: '',
          productUnit: '',
          productTotalPrice: ''
        }
        this.detailForm.project.infoProductList.push(v)
      },
      del(index, item, list) {
        console.log(index)
        if (item.uuid && item.uuid !== '') {
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                '/api/statistics/StatisticsProject/detail/deleteByProductId',
                { productId: item.uuid }
              )
              .then((res) => {
                if (res.data && res.data.code === 200) {
                  list.splice(index, 1)
                  console.log(list)
                } else {
                  this.$message.error('删除失败')
                }
              })
          }).catch(() => {
          })
        } else {
          list.splice(index, 1)
        }
      },
      handleRemove(file, index) {


        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除


        this.$http
          .post(
            '/api/contract/topInfo/CommonFiles/list/delete',
            { ids: [file.uuid] }
          )
          .then((res) => {
            if (res.data.code === 200) {
              this.detailForm.project.commonFilesList.splice(index, 1)
              
              
              this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
            }


          })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          }); 
        });       
        // console.log(this.detailForm.project.commonFilesList)

        
      },
      // 打开附件上传的组件
      openFileUp(url, list) {
        this.uploadVisible = true
        this.$nextTick(() => {
          this.$refs.infoUp.init(url, list)
        })
      },
      // 获取上传的附件列表
      getUpInfo(data) {
        this.$forceUpdate()
        this.detailForm.project[data.list] = this.detailForm.project[data.list].concat(data.fileList)
        this.uploadVisible = false
      },
      // 增值税改变，上报产值是否含税联动
      getOutputTax() {
        console.info(this.detailForm.project.valueAddedTax)
        if (this.detailForm.project.valueAddedTax && this.detailForm.project.valueAddedTax !== '0') {
          this.detailForm.project.isOutputTax = '1'
        } else {
          this.detailForm.project.isOutputTax = '0'
        }
      },
      // 选择项目地点
      selectPosition() {
        this.treeStatas = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
        })
      },
      // 获取项目地点的值
      getPositionTree(data) {
        this.treeStatas = false
        //this.detailForm.project.supplierAddress = data.fullDetailName
        this.detailForm.project.topInfoSiteList[0].placeId = data.id
        this.detailForm.project.topInfoSiteList[0].path = data.fullDetailName
        this.detailForm.project.topInfoSiteList[0].ffid = data.fullDetailCode
      },
      getName(id, list, name) {
        if (id) {
          this.$forceUpdate()
          this.detailForm.project[name] = list.find(
            (item) => item.id === id
          ).detailName
          console.log(this.detailForm)
        }
      },
      getShowTwo() {
        this.emergingMarket.find((item) => {
          if (item.id === this.detailForm.project.marketFirstId) {
            this.emergingMarketTwo = item.children
          }
        })
        if(this.detailForm.project.companyBuildId != ''&& this.detailForm.project.companyBuildId != null ){
          this.constructionOrgList = this.detailForm.project.companyBuildId.split(",");
        }
      },
      getMarketTwo(id) {
        this.detailForm.project.marketSecondId = ''
        this.detailForm.project.marketSecondName = ''
        this.detailForm.project.assemblyRate = ''
        this.detailForm.project.assemblyTypeId = ''
        this.detailForm.project.assemblyTypeName = ''
        this.detailForm.project.architectureTypeId = ''
        this.detailForm.project.architectureTypeName = ''
        this.detailForm.project.houseTypeId = ''
        this.detailForm.project.houseTypeName = ''
        this.detailForm.project.fieldId = ''
        this.detailForm.project.fieldName = ''
        this.emergingMarketTwo = []
        if (id !== '') {
          this.emergingMarket.find(
            (item) => {
              if (item.id === id) {
                this.detailForm.project.marketFirstName = item.detailName
                this.emergingMarketTwo = item.children
              }
            }
          )
        }
      },
      back() {
        this.$router.back()
      },
      saveInfo(formName, type) {


         let isMain = true
        this.detailForm.project.topInfoSiteList.forEach((element)=> {
          if (element.isMain == 1) {
            isMain = false
          }
        })
        if (isMain || this.detailForm.project.topInfoSiteList.length < 1) {
          this.$message({
            message: '必须有主项目地点',
            type: 'warning',
            showClose: true
          });
          return false
        }


        this.getBuildName();
        var url='';
        if(type=='save'){
          url=`/api/statistics/StatisticsProject/detail/${this.p.actpoint === "add"?'saveChangeRecord':'updateChangeRecord'}`;
        }else{
          url="/api/statistics/StatisticsProject/changeProcess/start"
        }
        this.detailForm.project.companyBuildId = this.constructionOrgList.join(",")
        var nameList = []
        var customerList = this.pubCustomers
        this.constructionOrgList.forEach(idCheck => {
          let customer = customerList.find(item1=>item1.customerId===idCheck)
          if(customer){
            nameList.push(customer.customerName)
          }
          let outside = this.sjdwList.find(item2=>item2.customerId===idCheck)
          if(outside){
            nameList.push(outside.customerName)
          }

        })
        this.detailForm.project.companyBuild = nameList.join(",")
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {afterProjectBo: {project: this.detailForm.project}, beforeProjectBo: {project: this.showDetailForm.project},changeRecordUuid: this.changeRecordUuid}
            this.$http
              .post(
                url,
                JSON.stringify(params),
                { useJson: true }
              )
              .then((res) => {
                if (res.data.code === 200) {
                  this.$message({
                    message:  `${type=='save'?'保存':'提交'}成功`,
                    type: 'success'
                  })
                  this.$router.push({
                    path: '/statistics/project/changeList'
                  })
                } else {
                  this.$message({
                    message:  `${type=='save'?'保存':'提交'}失败`,
                    type: 'error'
                  })
                }
              })
          } else {
            this.$message({
              message: '请正确填写信息',
              type: 'error'
            })
            return false
          }
        })
      },

      // 修改和查看时的时候详情
      getDetail() {
        this.$http
          .post('/api/statistics/StatisticsProject/detail/entityInfoByBeforeAndAfterId', {
            beforeId: this.p.beforeId,
            afterId: this.p.afterId,
            uuid:this.p.actpoint==='task'?this.p.instid:this.p.uuid
          })
          .then((res) => {
            if (res.data.code === 200) {
              let data = res.data.data
              data.forEach(item => {
                if (item.project.changeStatus == '1') {
                  this.showDetailForm.project = JSON.parse(JSON.stringify(item.project))
                  this.showDetailForm.project.beforeId = this.p.beforeId
                  this.showDetailForm.project.afterId = this.p.afterId
                  if (!item.project.topInfoSiteList|| item.project.topInfoSiteList=='') {
                    this.showDetailForm.project.topInfoSiteList = [{
                      path: '',
                      placeId: '',
                      ffid:'',
                      uuid: ''
                    }]
                  }
                  //上报产值是否含税
                  if(this.showDetailForm.project.valueAddedTax > 0){
                     this.showDetailForm.project.isOutputTax = '1';
                  }else{
                     this.showDetailForm.project.isOutputTax = '0';
                  }
                } else if (item.project.changeStatus == '2') {
                  this.changeRecordUuid=item.changeRecordUuid;
                  this.detailForm.project = item.project
                  this.detailForm.project.beforeId = this.p.beforeId
                  this.detailForm.project.afterId = this.p.afterId
                  if (!this.detailForm.project.projectSubContractList) {
                    this.detailForm.project.projectSubContractList = []
                  }
                  if (!item.project.topInfoSiteList|| item.project.topInfoSiteList=='') {
                    this.showDetailForm.project.topInfoSiteList = [{
                      path: '',
                      placeId: '',
                      ffid:'',
                      uuid: ''
                    }]
                  }
                  if(this.detailForm.project.companyBuildId != ''&& this.detailForm.project.companyBuildId != null ){
                    this.constructionOrgList = this.detailForm.project.companyBuildId.split(",");
                  }
                  //上报产值是否含税
                  if(this.detailForm.project.valueAddedTax > 0){
                     this.detailForm.project.isOutputTax = '1';
                  }else{
                     this.detailForm.project.isOutputTax = '0';
                  }
                }
              })
              this.getShowTwo()
            }
          })
      },
      // 新增的时候详情
      getAddDetail() {
        console.log('新增')
        let params = { topInfoId: this.p.uuid }
        this.$http
          .post('/api/statistics/StatisticsProject/detail/entityInfo', params)
          .then((res) => {
            if (res.data.code === 200) {
              this.detailForm.project = res.data.data
              this.showDetailForm.project = JSON.parse(JSON.stringify(res.data.data))
              if (!res.data.data.infoProductList) {
                this.detailForm.project.infoProductList = []
              }
              if (!res.data.data.infoSubjectMatterList) {
                this.detailForm.project.infoSubjectMatterList = []
              }
              if (!res.data.data.projectSubContractList) {
                this.detailForm.project.projectSubContractList = []
              }
              if (!res.data.data.topInfoSiteList|| res.data.data.topInfoSiteList=='') {
                this.detailForm.project.topInfoSiteList = [{
                  path: '',
                  placeId: '',
                  ffid:'',
                  uuid: ''
                }]
                this.showDetailForm.project.topInfoSiteList = [{
                  path: '',
                  placeId: '',
                  ffid:'',
                  uuid: ''
                }]
              }
              this.getShowTwo()
            }
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
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
  .gcform {
    margin-top: 10px;
    .group-no-padding{
      vertical-align: middle;
    }
    .neirong {
      > > > .el-form-item__error {
        top: 4% !important;
      }
    }

    > > > .el-form-item__error {
      padding-top: 0px;
      width: 95%;
      margin-left: 0;
      text-align: right;
      top: 0%;
    }

    > > > .el-main {
      overflow: hidden;
    }

    > > > .el-form-item__label:before {
      position: initial;
      left: -10px;
    }

    > > > .inline-formitem {
      margin-top: 30px;
    }

    .el-form-item {
      float: left;
      margin-bottom: 0;
      margin-right: 0.5%;

      .el-input {
        width: 95%;
      }

      .el-select {
        width: 95%;
      }
    }
  }


    /*按钮样式*/
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
  /**/
</style>
