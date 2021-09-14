<!--勘察设计项目变更-->

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
            :model="detailForm"
            :rules="rules"
            class="gcform"
            ref="detailForm">
            <!--项目名称-->
            <el-row>
              <el-form-item
                label="项目名称(中文):"
                prop="project.projectName"
                style="width: 32.5%">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  placeholder="请输入"
                  v-model="detailForm.project.projectName"/>
              </el-form-item>
              <el-form-item
                label="项目名称(外文):"
                prop="project.projectForeginName"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.projectForeginName"/>
              </el-form-item>
              <el-form-item
                label="项目简称:"
                prop="project.projectOmit"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.projectOmit"/>
              </el-form-item>
            </el-row>
            <!--项目性质-->
            <el-row>
              <!-- <el-form-item
                label="项目性质(一级):"
                prop="project.projectNatureFirstId"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  clearable
                  filterable
                  placeholder="请选择"
                  @change="getTwoXZ"
                  v-model="detailForm.project.projectNatureFirstId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectNature"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="项目性质(二级):"
                prop="project.projectNatureSecondId"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  clearable
                  filterable
                  @change="getName(detailForm.project.projectNatureSecondId, projectNatureTwo, 'projectNatureSecond','projectNatureSecondCode')"
                  placeholder="请选择"
                  v-model="detailForm.project.projectNatureSecondId">
                  <el-option
                    v-if="item.isUse==1"
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectNatureTwo"/>
                </el-select>
              </el-form-item> -->
              <el-form-item
                v-if="detailForm.project.projectNatureSecondId === 'd4b6c373a60246a8a5166ddb0bf46c21' || detailForm.project.projectNatureSecondId === '7369abc48e264096a37783de01b0d4cc'"
                label="是否为联合体:"
                class="inline-formitem"
                prop="project.isConsortion"
                style="width: 32.5%">
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  class="inline-formitem-switch"
                  v-model="detailForm.project.isConsortion"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item>
            </el-row>
            <el-row>
              <!-- <el-form-item
                v-if="detailForm.project.projectNatureFirstId === '7031076e7a5f4225b1a89f31ee017802'"
                label="投资模式:"
                prop="project.investmentModelId"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  clearable
                  filterable
                  @change="getName(detailForm.project.investmentModelId, investmentModel, 'investmentModel','investmentModelCode')"
                  placeholder="请选择"
                  v-model="detailForm.project.investmentModelId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in investmentModel"/>
                </el-select>
              </el-form-item> -->
              <el-form-item
                v-if="detailForm.project.projectNatureFirstId === '7031076e7a5f4225b1a89f31ee017802'"
                label="投资合同总额(万元):"
                prop="project.investmentContract"
                :rules="rules.project.isMustMoney"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.investmentContract">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                :label="detailForm.project.projectNatureFirstId === '7031076e7a5f4225b1a89f31ee017802'?'投资单位:':'承建单位:'"
                prop="project.companyBuiltName"
                style="width: 32.5%">
                <el-input clearable disabled placeholder="请输入内容" v-model="detailForm.project.companyBuiltName" class="input-with-select">
                  <el-button  v-if="p.actpoint !== 'look'&&p.actpoint!='task'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('承建单位',detailForm.project.companyBuiltId,false)" ></el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                v-if="detailForm.project.projectTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
                label="所属铁路局:"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  clearable
                  filterable
                  @change="getName(detailForm.project.railwayId, railwayBureau, 'railwayName','railwayCode')"
                  placeholder="请选择"
                  v-model="detailForm.project.railwayId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in railwayBureau"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="是否代局指:"
                class="inline-formitem"
                prop="project.isBureauIndex"
                style="width: 32.5%">
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  class="inline-formitem-switch"
                  v-model="detailForm.project.isBureauIndex"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item>
            </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="建设单位:"
                prop="project.companyBuildId"
                :rules="{
                    required: true,
                    message: '此项不能为空',
                    trigger: 'blur',
                  }">
                  <el-select
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                    v-model="constructionOrgList"
                    @change="companyBuildChange"
                    v-if="detailForm.project.isClientele=='1'"
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
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                    v-model="constructionOrgList"
                    @change="companyBuildChange"
                    v-if="detailForm.project.isClientele!='1'"
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
              </el-col>
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
            <!--工程类别(一级)-->
            <el-row>
              <el-form-item
                label="工程类别(一级):"
                prop="project.projectTypeFirstId"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  clearable
                  filterable
                  placeholder="请选择"
                  @change="getProjectTwo"
                  v-model="detailForm.project.projectTypeFirstId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectDomainType"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="工程类别(二级):"
                prop="project.projectTypeSecondId"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  clearable
                  filterable
                  @change="getThree"
                  placeholder="请选择"
                  v-model="detailForm.project.projectTypeSecondId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectTypeTwo"/>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="detailForm.project.projectTypeFirstId=='193b4d4003d04899a1d09c8d5f7877fe'&&xqprojectTypeThree.length>0"
                label="工程类别(三级)"
                prop="project.enginTypeThirdId"
                style="width: 32.5%"
                :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
              >
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  clearable
                  filterable
                  placeholder="请选择"
                  @change="
                getName(
                  detailForm.project.enginTypeThirdId,
                  xqprojectTypeThree,
                  'enginTypeThirdName',
                  'enginTypeThirdCode'
                )
              "
                  v-model="detailForm.project.enginTypeThirdId"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in xqprojectTypeThree"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="detailForm.project.projectTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
                label="所属线路:"
                prop="project.projectLine"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  @change="getName(detailForm.project.projectLineId, railwayLine, 'projectLine','projectLineCode')"
                  placeholder="请选择或直接填写所属现路"
                  v-model="detailForm.project.projectLineId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in railwayLine"/>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="项目板块:"
                prop="project.projectModuleId"
                style="width: 32.5%">
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  @change="getName(detailForm.project.projectModuleId, projectPlate, 'projectModuleName','projectModuleCode')"
                  v-model="detailForm.project.projectModuleId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectPlate"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="业务类别:"
                prop="categorySecondId"
                style="width: 32.5%">
                <el-select
                  filterable
                  clearable
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  placeholder="请选择"
                  @change="getName(detailForm.project.categorySecondId, bizTypeCodeTwo, 'categorySecondName','categorySecondCode')"
                  v-model="detailForm.project.categorySecondId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in bizTypeCodeTwo"/>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                  label="设计单位:"
                  prop="project.companyDesign"
                  style="width: 32.5%">
                  <el-input
                    disabled
                    clearable
                    placeholder="请选择设计单位"
                    v-model="detailForm.project.companyDesign">
                    <el-button slot="append" icon="el-icon-circle-plus-outline"  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                    @click="openComMul(detailForm.project.companyDesignId,detailForm.project.companyDesign,'/api/contract/Companies/detail/findCompanies','设计单位')"></el-button>
                  </el-input>
                </el-form-item>
              <el-form-item
                label="签约/使用资质单位:"
                prop="project.companyName"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.companyName">
                  <el-button v-if="p.actpoint!='task'&&p.actpoint!='look'&&detailForm.project.contractInfoList==''" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('签约/使用资质单位',detailForm.project.companyId)"></el-button>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="计量单位:"
                prop="project.unitId"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  @change="getName(detailForm.project.unitId, unit, 'unitName','unitCode')"
                  placeholder="请选择"
                  v-model="detailForm.project.unitId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in unit"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="实物工程量:"
                prop="project.physicalQuantity"
                :rules="rules.project.isNumber"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.physicalQuantity"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="项目状态:"
                prop="project.projectStatusId"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  @change="getName(detailForm.project.projectStatusId, projectStatus, 'projectStatusName','projectStatusCode')"
                  placeholder="请选择"
                  v-model="detailForm.project.projectStatusId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectStatus"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="项目类型:"
                prop="project.projectTypeId"
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
                    :value="item.id"
                    v-for="(item, index) in projectType"/>
                </el-select>
              </el-form-item>
              <el-form-item
                  label="父项目名称:"
                  prop="project.fatherProjectId"
                  style="width: 32.5%"
                  >
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
            <!--新兴市场(一级)-->
            <el-row>
              <el-form-item
                label="合同号:"
                prop="project.contractNumber"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  disabled
                  v-model="detailForm.project.contractNumber"/>
              </el-form-item>
              <el-form-item
                label="新兴市场类别(一级):"
                prop="project.marketFirstId"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  clearable
                  filterable
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
                prop="project.marketSecondId"
                :rules="detailForm.project.marketFirstId&&emergingMarketTwo?{
                  required: true,
                  message: '此项不能为空',
                  trigger: ['blur','change']
                }:{}"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.marketFirstId==='00b87acd71784c3ba860b9513789724e'||detailForm.project.contractInfoList!=''"
                  filterable
                  clearable
                  @change="getName(detailForm.project.marketSecondId, emergingMarketTwo, 'marketSecondName','marketSecondCode')"
                  placeholder="请选择"
                  v-model="detailForm.project.marketSecondId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in emergingMarketTwo"/>
                </el-select>
              </el-form-item>
            </el-row>
            <!--装配率-->
            <el-row>
              <el-form-item
                v-if="detailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
                label="装配率(%):"
                prop="project.assemblyRate"
                :rules="rules.project.isPercent"
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
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  @change="getName(detailForm.project.assemblyTypeId, assemblyType, 'assemblyTypeName','assemblyTypeCode')"
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
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  @change="getName(detailForm.project.architectureTypeId, architecturalType, 'architectureTypeName','architectureTypeCode')"
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
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  filterable
                  clearable
                  @change="getName(detailForm.project.houseTypeId, buildingStructure, 'houseTypeName','houseTypeCode')"
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
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint==='look'||p.actpoint==='task'||detailForm.project.contractInfoList!=''"
                  multiple
                  filterable
                  clearable
                  @change="getMultipleName(detailForm.cdmc,siteName,'fieldId','fieldName')"
                  placeholder="请选择"
                  v-model="detailForm.cdmc">
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
                label="初始合同额(万元):"
                prop="project.contractAmountInitial"
                :rules="rules.project.isMustMoney"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  @change="getCount"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.contractAmountInitial">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <!-- <el-form-item
                label="工程合同额(万元):"
                prop="project.contractAmountEngine"
                :rules="rules.project.isMustMoney"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  @change="getCount"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.contractAmountEngine">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item> -->
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
            <!--合同总额(万元)-->
            <el-row>
              <!-- <el-form-item
                label="合同额增减(万元):"
                prop="project.contractAmountChange"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.contractAmountChange">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item> -->
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
            <!--增值税-->
            <el-row>
              <!--<el-form-item-->
                <!--label="实际投资额(万元):"-->
                <!--prop="project.realInvest"-->
                <!--:rules="rules.project.isMoney"-->
                <!--style="width: 32.5%">-->
                <!--<el-input-->
                  <!--:disabled="p.actpoint === 'look'||p.actpoint === 'task'"-->
                  <!--clearable-->
                  <!--placeholder="请输入"-->
                  <!--v-model="detailForm.project.realInvest">-->
                  <!--<template slot="prepend">¥</template>-->
                  <!--<template slot="append">(万元)</template>-->
                <!--</el-input>-->
              <!--</el-form-item>-->
              <el-form-item
                label="增值税(万元):"
                prop="project.valueAddedTax"
                :rules="rules.project.isMustMoney"
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
                class="inline-formitem"
                prop="project.isOutputTax"
                style="width: 32.5%">
                <el-switch
                  disabled
                  v-model="detailForm.project.isOutputTax"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item>
            </el-row>
            <!--合同开工期-->
            <el-row>
              <el-form-item
                label="合同开工日期:"
                prop="project.contractStartTime"
                style="width: 32.5%">
                <el-date-picker
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  v-model="detailForm.project.contractStartTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
              <el-form-item
                label="合同竣工日期:"
                prop="project.contractEndTime"
                style="width: 32.5%">
                <el-date-picker
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  v-model="detailForm.project.contractEndTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
              <!-- <el-form-item
                label="是否托管:"
                class="inline-formitem"
                prop="project.isTrusteeship"
                style="width: 32.5%">
                <el-switch
                  :disabled="p.actpoint === 'look'"
                  class="inline-formitem-switch"
                  v-model="detailForm.project.isTrusteeship"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item> -->
            </el-row>
            <el-row>
              <el-form-item
                label="合同签订日期:"
                prop="project.contractSignTime"
                style="width: 32.5%">
                <el-date-picker
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                  v-model="detailForm.project.contractSignTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
              <el-form-item
                label="竣工日期:"
                prop="project.projectEndTime"
                style="width: 32.5%">
                <el-date-picker
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  v-model="detailForm.project.projectEndTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
              <!-- <el-form-item
                label="是否代管:"
                class="inline-formitem"
                prop="project.isEscrow"
                style="width: 32.5%">
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  class="inline-formitem-switch"
                  v-model="detailForm.project.isEscrow"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item> -->
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
            </el-row>
            <!--备注(最多2000字)-->
            <el-row>
              <el-form-item
                class="neirong"
                label="备注(最多2000字):"
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
                prop="project.changeReason"
                :rules="rules.project.must"
                label="变更原因:">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  type="textarea"
                  placeholder="请输入"
                  v-model="detailForm.project.changeReason"/>
              </el-form-item>
            </el-row>
            <p>
              <span >项目地点: </span>
              <el-button
                v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'&&detailForm.project.contractInfoList==''"
                class="detatil-flie-btn"
                @click="add('dd')"
                type="primary"
              >新增</el-button >
            </p>
            <el-table
              :data="detailForm.project.topInfoSiteList"
              :header-cell-style="{
              'text-align': 'center',
              'background-color': 'rgba(246,248,252,1)',
              color: 'rgba(0,0,0,1)',
            }"
              align="center"
              border
              class="detailTable"
              ref="table"
              style="width: 100%;height: auto;"
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
                prop="path"
              >
                <template slot-scope="scope">
                  <el-form-item class="tabelForm" :prop="'project.topInfoSiteList.' + scope.$index + '.path'"  :rules="{required: true,message: '此项不能为空'}">
                    <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                    <el-input disabled placeholder="请输入内容" v-model="scope.row.path" class="input-with-select group-no-padding">
                      <el-button  v-if="p.actpoint !== 'look'&&p.actpoint!='task'&&detailForm.project.contractInfoList==''" slot="append" icon="el-icon-circle-plus" @click="selectPosition(),positionIndex=scope.$index"></el-button>
                    </el-input>
                  </el-form-item>
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
                  <el-form-item class="tabelForm" :prop="'project.topInfoSiteList.' + scope.$index + '.contractAmount'" :rules="{required: true,message: '此项不能为空'}">
                    <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                    <el-input
                      class="group-no-padding"
                      clearable
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'||detailForm.project.contractInfoList!=''"
                      v-model="scope.row.contractAmount"
                      @input="getPositionMoney(scope.$index,detailForm.project.topInfoSiteList)"
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
                  <el-switch
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'||detailForm.project.contractInfoList!=''"
                    class="inline-formitem-switch"
                    v-model="scope.row.isMain"
                    active-color="#409EFF"
                    inactive-color="#ddd"
                    active-value="1"
                    inactive-value="0"
                    @change="setMain(scope.$index,detailForm.project.topInfoSiteList)"
                  >
                  </el-switch>
                  <!--<el-radio v-model="scope.row.isMain" label="1">是</el-radio>-->
                  <!--<el-radio v-model="scope.row.isMain" label="0">否</el-radio>-->
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                fixed="right"
                label="操作"
                align="center"
                width="80"
                show-overflow-tooltip
                v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'&&detailForm.project.contractInfoList==''"
              >
                <template slot-scope="scope">
                  <el-link
                    :underline="false"
                    @click="del(scope.$index,scope.row,detailForm.project.topInfoSiteList)"
                    type="warning"
                  >删除
                  </el-link
                  >
                </template>
              </el-table-column>
            </el-table>
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
                v-if="p.actpoint!=='look'&&p.actpoint!=='task'"
                width="80"
              >
                <template slot-scope="scope">
                  <el-link :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                </template>
              </el-table-column>
            </el-table>
            <div >
                <p class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>关联合同: </span>
                  <el-button
                    v-show="p.actpoint != 'look'&&p.actpoint != 'task'"
                    @click="addContract()"
                    class="detatil-flie-btn"
                    type="primary">新增
                  </el-button>
                </p>
                <el-table
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
                    :resizable="false"
                    fixed="right"
                    label="操作"
                    align="center"
                    show-overflow-tooltip
                    v-if="p.actpoint !== 'task'"
                    width="150">
                    <template slot-scope="scope">
                      <el-link
                        v-if="p.actpoint !== 'look'"
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
            :model="showDetailForm"
            class="gcform"
            ref="showDetailForm">
            <!--项目名称-->
            <el-row>
              <el-form-item
                label="项目名称(中文):"
                style="width: 32.5%">
                <el-input
                  disabled
                  placeholder="请输入"
                  v-model="showDetailForm.project.projectName"/>
              </el-form-item>
              <el-form-item
                label="项目名称(外文):"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.projectForeginName"/>
              </el-form-item>
              <el-form-item
                label="项目简称:"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.projectOmit"/>
              </el-form-item>
            </el-row>
            <!--项目性质-->
            <el-row>
              <!-- <el-form-item
                label="项目性质(一级):"
                style="width: 32.5%">
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  @change="getTwoXZ"
                  v-model="showDetailForm.project.projectNatureFirstId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectNature"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="项目性质(二级):"
                style="width: 32.5%">
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  v-model="showDetailForm.project.projectNatureSecond">
                  <el-option
                    v-if="item.isUse==1"
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectNatureTwo"/>
                </el-select>
              </el-form-item> -->
              <el-form-item
                v-if="showDetailForm.project.projectNatureSecondId === 'd4b6c373a60246a8a5166ddb0bf46c21' || showDetailForm.project.projectNatureSecondId === '7369abc48e264096a37783de01b0d4cc'"
                label="是否为联合体:"
                class="inline-formitem"
                style="width: 32.5%">
                <el-switch
                  disabled
                  class="inline-formitem-switch"
                  v-model="showDetailForm.project.isConsortion"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item>
            </el-row>
            <el-row>
              <!-- <el-form-item
                v-if="showDetailForm.project.projectNatureFirstId === '7031076e7a5f4225b1a89f31ee017802'"
                label="投资模式:"
                style="width: 32.5%">
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  v-model="showDetailForm.project.investmentModel">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in investmentModel"/>
                </el-select>
              </el-form-item> -->
              <el-form-item
                v-if="showDetailForm.project.projectNatureFirstId === '7031076e7a5f4225b1a89f31ee017802'"
                label="投资合同总额(万元):"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.investmentContract">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                :label="showDetailForm.project.projectNatureFirstId === '7031076e7a5f4225b1a89f31ee017802'?'投资单位:':'承建单位:'"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.companyBuiltName"/>
              </el-form-item>
              <el-form-item
                v-if="detailForm.project.projectTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
                label="所属铁路局:"
                style="width: 32.5%">
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  v-model="showDetailForm.project.railwayName">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in railwayBureau"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="是否代局指:"
                class="inline-formitem"
                style="width: 32.5%">
                <el-switch
                  disabled
                  class="inline-formitem-switch"
                  v-model="showDetailForm.project.isBureauIndex"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item>
            </el-row>
            <el-form-item
                label="建设单位:"
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
            <!--工程类别(一级)-->
            <el-row>
              <el-form-item
                label="工程类别(一级):"
                style="width: 32.5%">
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  v-model="showDetailForm.project.projectTypeFirstId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectDomainType"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="工程类别(二级):"
                style="width: 32.5%">
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  v-model="showDetailForm.project.projectTypeSecond">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectTypeTwo"/>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="showDetailForm.project.enginTypeThirdId!=''&&showDetailForm.project.enginTypeThirdId!=null"
                label="工程类别(三级):"
                style="width: 32.5%">
                <el-select
                  disabled
                  placeholder="请选择"
                  v-model="showDetailForm.project.enginTypeThirdId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in xqprojectTypeThree"/>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="showDetailForm.project.projectTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
                label="所属线路:"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择或直接填写所属现路"
                  v-model="showDetailForm.project.projectLine">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in railwayLine"/>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="项目板块:"
                style="width: 32.5%">
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  v-model="showDetailForm.project.projectModuleId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectPlate"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="业务类别:"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.categorySecondName">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in bizTypeCodeTwo"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="设计单位:"
                prop="project.companyDesign"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请选择设计单位"
                  v-model="showDetailForm.project.companyDesign">
                </el-input>
              </el-form-item>
              <el-form-item
                label="签约/使用资质单位:"
                prop="project.companyName"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.companyName"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="计量单位:"
                prop="project.unitId"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.unitId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in unit"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="实物工程量:"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.physicalQuantity"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="项目状态:"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.projectStatusId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectStatus"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="项目类型:"
                style="width: 32.5%">
                <el-select
                  disabled
                  placeholder="请选择"
                  @change="resetFuDai(showDetailForm.project.projectTypeId, projectType, 'projectTypeName')"
                  v-model="showDetailForm.project.projectTypeId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectType"/>
                </el-select>
              </el-form-item>

              <el-form-item
                  label="父项目名称:"
                  prop="project.fatherProjectId"
                  style="width: 32.5%"
                  >
                  <el-select
                    disabled
                    filterable
                    clearable
                    placeholder="请选择"
                    @change="getFatherName(showDetailForm.project.fatherProjectId, fatherList, 'fatherProjectName')"
                    v-model="showDetailForm.project.fatherProjectId">
                    <el-option
                      :key="index"
                      :label="item.projectName"
                      :value="item.uuid"
                      v-for="(item, index) in fatherList"/>
                  </el-select>
                </el-form-item>
            </el-row>
            <!--新兴市场(一级)-->
            <el-row>
              <el-form-item
                label="合同号:"
                style="width:32.5%;">
                <el-input
                  clearable
                  disabled
                  placeholder="请输入"
                  v-model="showDetailForm.project.contractNumber"/>
              </el-form-item>
              <el-form-item
                label="新兴市场类别(一级):"
                style="width: 32.5%">
                <el-select
                  disabled
                  clearable
                  filterable
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
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
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
            <!--装配率-->
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
                prop="project.assemblyTypeId"
                style="width: 32.5%">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="showDetailForm.project.assemblyTypeId">
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
                prop="project.architectureTypeId"
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
                prop="project.houseTypeId"
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
                prop="project.fieldName"
                style="width: 32.5%">
                <el-input
                  disabled
                  v-model="detailForm.project.fieldName"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="初始合同额(万元):"
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
              <!-- <el-form-item
                label="工程合同额(万元):"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.contractAmountEngine">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item> -->
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
            <!--合同总额(万元)-->
            <el-row>
              <!-- <el-form-item
                label="合同额增减(万元):"
                prop="project.contractAmountChange"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.contractAmountChange">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item> -->
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
            <!--增值税-->
            <el-row>
              <!--<el-form-item-->
                <!--label="实际投资额(万元):"-->
                <!--style="width: 32.5%">-->
                <!--<el-input-->
                  <!--disabled-->
                  <!--clearable-->
                  <!--placeholder="请输入"-->
                  <!--v-model="showDetailForm.project.realInvest">-->
                  <!--<template slot="prepend">¥</template>-->
                  <!--<template slot="append">(万元)</template>-->
                <!--</el-input>-->
              <!--</el-form-item>-->
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
                class="inline-formitem"
                prop="project.isOutputTax"
                style="width: 32.5%">
                <el-switch
                  disabled
                  v-model="showDetailForm.project.isOutputTax"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item>
            </el-row>
            <!--合同开工期-->
            <el-row>
              <el-form-item
                label="合同开工日期:"
                prop="project.contractStartTime"
                style="width: 32.5%">
                <el-date-picker
                  disabled
                  v-model="showDetailForm.project.contractStartTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
              <el-form-item
                label="合同竣工日期:"
                prop="project.contractEndTime"
                style="width: 32.5%">
                <el-date-picker
                  disabled
                  v-model="showDetailForm.project.contractEndTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
              <!-- <el-form-item
                label="是否托管:"
                class="inline-formitem"
                prop="project.isTrusteeship"
                style="width: 32.5%">
                <el-switch
                  disabled
                  class="inline-formitem-switch"
                  v-model="showDetailForm.project.isTrusteeship"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item> -->
            </el-row>
            <el-row>
              <el-form-item
                label="合同签订日期:"
                prop="project.contractSignTime"
                style="width: 32.5%">
                <el-date-picker
                  disabled
                  v-model="showDetailForm.project.contractSignTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
              <el-form-item
                label="竣工日期:"
                prop="project.projectEndTime"
                style="width: 32.5%">
                <el-date-picker
                  disabled
                  v-model="showDetailForm.project.projectEndTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间"/>
              </el-form-item>
              <!-- <el-form-item
                label="是否代管:"
                class="inline-formitem"
                prop="project.isEscrow"
                style="width: 32.5%">
                <el-switch
                  disabled
                  class="inline-formitem-switch"
                  v-model="showDetailForm.project.isEscrow"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
              </el-form-item> -->
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
            </el-row>
            <!--备注(最多2000字)-->
            <el-row>
              <el-form-item
                class="neirong"
                label="备注(最多2000字):"
                prop="project.projectRemark">
                <el-input
                  disabled
                  type="textarea"
                  placeholder="请输入"
                  v-model="showDetailForm.project.projectRemark"/>
              </el-form-item>
            </el-row>
            <p>
              <span >项目地点: </span>
            </p>
            <el-table
              :data="showDetailForm.project.topInfoSiteList"
              :key="key"
              :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
              align="center"
              border
              class="detailTable"
              ref="table"
              style="width: 100%;height: auto;"
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
                prop="path"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="份额(万元)"
                prop="contractAmount"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="是否为主地点"
                prop="contractAmount"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-switch
                    disabled
                    class="inline-formitem-switch"
                    v-model="scope.row.isMain"
                    active-color="#409EFF"
                    inactive-color="#ddd"
                    active-value="1"
                    inactive-value="0"
                  >
                  </el-switch>
                </template>
              </el-table-column>
            </el-table>
            <!--附件-->
            <p>
              <span>相关附件: </span>
              <!--<el-button-->
                <!--disabled-->
                <!--size="small"-->
                <!--type="primary"-->
                <!--@click="openFileUp('/api/contract/topInfo/CommonFiles/contractInfo/02/uploadFile','commonFilesList')">-->
                <!--点击上传-->
              <!--</el-button>-->
            </p>
            <el-table
              :data="showDetailForm.project.commonFilesList"
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
      <!-- <el-tab-pane label="审批流程" >
         <Audit-Process :task="p.task||{businessId:p.uuid,businessType:'project_project_change'}"></Audit-Process>
      </el-tab-pane> -->
    </el-tabs>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
    <related-contract  v-if="contractStatas" ref="infoCS" @getPosition="goAddDetail"></related-contract>
    <!--多选的单位列表组件-->
    <company-mul v-if="companyMulStatus" ref="comAdd" @getComList="getComList"></company-mul>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import FileUpload from '@/components/fileUpload'
  import { isMoney, isMobile, isPhone } from '@/utils/validate'
  import CompanyTree from '../../companyTree'
  import RelatedContract from '../relatedContract'
  import companyMul from '@/components/companiesMultiple'
  import AuditProcess from '@/components/auditProcess'
  export default {
    name: 'change',
    components: {
      Tree, FileUpload,CompanyTree,RelatedContract,companyMul,AuditProcess
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
        key:0,
        companyMulStatus:false,//设计单位等多选列表状态
        uuid: null,
        DwVisible: false,
        treeStatas: false,
        uploadVisible: false,
        contractStatas:false,//关联合同状态
        emergingMarketTwo: [], // 新兴市场二级类别
        projectTypeTwo: [], // 工程类别二级
        projectNatureTwo: [], // 项目性质二级
        xqprojectTypeThree:[],//工程类别三级
        bizTypeCodeTwo: [], // 业务类别二级
        constructionOrgList: [],
        sjdwList: [],
        projectType:[], //项目类型下拉
        fatherList:[],
        detailForm: {
          cdmc:[],
          project: {
            projectSubContractList: [], // 分包承建
            infoProductList: [], // 产品列表
            infoSubjectMatterList: [], // 标的信息
            commonFilesList: [],
            projectName: '', // 项目名称(中文)
            projectForeginName: '', // 项目名称(外文)
            projectOmit: '', // 项目简称
            projectNatureId: '', // 项目性质
            projectNatureFirstId: '', // 项目性质(一级)
            projectNatureSecondId: '', // 项目性质(二级)
            companyId: '', // 签约/使用资质单位
            companyName: '', // 签约/使用资质名称
            companyBuiltName: '', // 承建单位
            railwayId: '', // 所属铁路局
            projectTypeFirstId: '', // 工程类别（一级）
            projectTypeSecondId: '', // 工程类别（二级）
            enginTypeThirdId: '', // 工程类别（三级）
            projectLineId: '', // 所属线路ID
            projectModuleId: 'f6823a41e9354b81a1512155a5565aeb', // 项目板块
            projectModuleCode:"design",//项目板块code
            projectModuleName: '勘察设计咨询', // 项目板块
            categoryFirstId: '0f333a962655480c8ef668a8ce129d41', // 业务类别（一级）
            categorySecondId: '', // 业务类别二级
            isConsortion: '', // 是否联合体项目
            projectStatusId: '', // 项目状态
            projectLocationId: '', // 项目所在地
            investmentModelId: '', // 投资模式
            investmentContract: '', // 投资合同总额(万元)
            isBureauIndex: '', // 是否代局指
            marketFirstId: '', // 新兴市场类别(一级)
            marketSecondId: '', // 新兴市场类别(二级)
            assemblyRate: '', // 装配率(%)
            assemblyTypeId: '', // 装配类型
            architectureTypeId: '', // 建筑类型
            fieldId: '', // 场地ID
            houseTypeId: '', // 房屋结构类型
            contractAmountInitial: '', // 初始合同额(万元)
            contractAmountEngine: '', // 工程合同额(万元)
            contractAmountTotal: '', // 合总同额(万元)
            contractAmountChange: '', // 合总额增减(万元)
            valueAddedTax: '', // 增值税(万元)
            isOutputTax: '', // 上报产值是否含税
            unitId: '', // 计量单位
            physicalQuantity: '', // 实物工程量
            contractStartTime: '', // 合同开工日期
            contractEndTime: '', // 合同竣工日期
            contractSignTime: '', // 合同签订日期
            isTrusteeship: '', // 是否托管
            isEscrow: '', // 是否代管
            realInvest: '', // 实际投资额(万元)
            projectRemark: '', // 备注(最多2000字)
            fatherProjectName: '', // 父项目名称
            fatherProjectId: '', // 父项目名称id
            topInfoSiteList: [
              {
                path: '',
                placeId: '',
                uuid: ''
              }
            ],
            isClientele:'1',
            companyBuild:'',
            companyBuildId:'',
            projectTypeId:'',
            fatherProjectId:''
          }
        },
        showDetailForm: {
          project: {
            projectSubContractList: [], // 分包承建
            infoProductList: [], // 产品列表
            infoSubjectMatterList: [], // 标的信息
            commonFilesList: [],
            projectName: '', // 项目名称(中文)
            projectForeginName: '', // 项目名称(外文)
            projectOmit: '', // 项目简称
            projectNatureId: '', // 项目性质
            projectNatureFirstId: '', // 项目性质(一级)
            projectNatureSecondId: '', // 项目性质(二级)
            // companyId: '', // 签约/使用资质单位
            companyName: '', // 签约/使用资质名称
            companyBuiltName: '', // 承建单位
            railwayId: '', // 所属铁路局
            projectTypeFirstId: '', // 工程类别（一级）
            projectTypeSecondId: '', // 工程类别（二级）
            enginTypeThirdId: '', // 工程类别（三级）
            projectLineId: '', // 所属线路ID
            projectModuleId: 'f6823a41e9354b81a1512155a5565aeb', // 项目板块
            projectModuleCode:"design",//项目板块code
            projectModuleName: '勘察设计咨询', // 项目板块
            categoryFirstId: '0f333a962655480c8ef668a8ce129d41', // 业务类别（一级）
            categorySecondId: '', // 业务类别二级
            isConsortion: '', // 是否联合体项目
            projectStatusId: '', // 项目状态
            projectLocationId: '', // 项目所在地
            investmentModelId: '', // 投资模式
            investmentContract: '', // 投资合同总额(万元)
            isBureauIndex: '', // 是否代局指
            marketFirstId: '', // 新兴市场类别(一级)
            marketSecondId: '', // 新兴市场类别(二级)
            assemblyRate: '', // 装配率(%)
            assemblyTypeId: '', // 装配类型
            architectureTypeId: '', // 建筑类型
            fieldId: '', // 场地ID
            houseTypeId: '', // 房屋结构类型
            contractAmountInitial: '', // 初始合同额(万元)
            contractAmountEngine: '', // 工程合同额(万元)
            contractAmountTotal: '', // 合总同额(万元)
            contractAmountChange: '', // 合总额增减(万元)
            valueAddedTax: '', // 增值税(万元)
            isOutputTax: '', // 上报产值是否含税
            unitId: '', // 计量单位
            physicalQuantity: '', // 实物工程量
            contractStartTime: '', // 合同开工日期
            contractEndTime: '', // 合同竣工日期
            contractSignTime: '', // 合同签订日期
            isTrusteeship: '', // 是否托管
            isEscrow: '', // 是否代管
            realInvest: '', // 实际投资额(万元)
            projectRemark: '', // 备注(最多2000字)
            fatherProjectName: '', // 父项目名称
            fatherProjectId: '', // 父项目名称id
            topInfoSiteList: [
              {
                path: '',
                placeId: '',
                ffid:'',
                uuid: ''
              }
            ],
            isClientele:'1',
            companyBuild:'',
            companyBuildId:'',
            projectTypeId:'',
            fatherProjectId:''
          }
        },
        rules: {
          project: {
            projectName: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            projectOmit: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            projectNatureFirstId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            investmentModelId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            investmentContract: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            companyBuiltId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            projectTypeFirstId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            projectTypeSecondId: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            projectLineId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            projectModuleId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            projectTypeId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            fatherProjectId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            projectStatusId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            assemblyRate: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            assemblyTypeId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            architectureTypeId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            houseTypeId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            fieldId: [{ required: true, message: '此项不能为空', trigger: 'change' }],
            contractAmountInitial: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            contractAmountEngine: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            contractAmountChange: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            valueAddedTax: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            companyBuiltName: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            marketFirstId: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            physicalQuantity: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            projectRemark: [{ min: 0, max: 2000, message: '最多输入2000字', trigger: 'blur' }],
            isMoney: [{ validator: validateMoney, trigger: ['blur', 'change'] }],
            isMustMoney: [{ required: true, validator: validateMustMoney, trigger: ['blur', 'change'] }],
            isMobile: [{ validator: validateMobile, trigger: ['blur', 'change'] }],
            isPercent: [{ required: true, validator: validatePercent, trigger: ['blur', 'change'] }],
            isNumber: [{ validator: validateNumber, trigger: ['blur', 'change'] }],
            must: [{ required: true, message: '此项不能为空', trigger: ['blur', 'change'] }]
          }
        },
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p))
      }
    },
    computed: {
      pubCustomers() {//客户名称
        return this.$store.state.pubCustomers;
      },
      emergingMarket() {
        return this.$store.state.category.emergingMarket
      },
      assemblyType() {
        return this.$store.state.assemblyType
      },
      railwayBureau() {
        return this.$store.state.railwayBureau
      },
      projectDomainType() {
        return this.$store.state.category.projectDomainType
      },
      railwayLine() {
        return this.$store.state.railwayLine
      },
      projectStatus() {
        return this.$store.state.projectStatus
      },
      architecturalType() {
        return this.$store.state.architecturalType
      },
      siteName() {
        return this.$store.state.siteName
      },
      buildingStructure() {
        return this.$store.state.buildingStructure
      },
      unit() {
        return this.$store.state.unit
      },
      projectProperties() {
        return this.$store.state.projectProperties
      },
      projectPlate() {
        return this.$store.state.projectPlate
      },
      bizCode() {
        return this.$store.state.bizCode
      },
      investmentModel() {
        return this.$store.state.investmentModel
      },
      projectNature() {
        return this.$store.state.category.projectNature
      },
      bizTypeCode() {
        return this.$store.state.bizTypeCode
      }
    },
    mounted() {
      // this.uuid = this.p.uuid, this.afterId = this.p.afterId;
      if (this.p.actpoint === 'edit' || this.p.actpoint === 'look' || this.p.actpoint === 'task') {
        this.getDetail()
      }
      if (this.p.actpoint === 'add') {
        this.getAddDetail()
      }
      this.$store.dispatch('getConfig', {})
      this.$store.dispatch("getPubCustomers", {});
      this.$store.dispatch('getCategory', { name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e' })
      this.$store.dispatch('getCategory', { name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3' })
      this.$store.dispatch('getCategory', { name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72' })
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
      //获取项目类型
      this.$http
        .post(
          ' /api/statistics/StatisticsProject/detail/findProjectType',
          {projectId: this.p.uuid}
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.projectType = []
            var list = res.data.data
            list.forEach(item=>{
              var type = {id:'',detailName:''}
              type.id = item.DETAIL_CODE
              type.detailCode = item.DETAIL_CODE
              type.detailName = item.DETAIL_NAME
              this.projectType.push(type)
            })
          }else{
            this.projectType = []
          }
        });
    },
    methods: {
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
      //打开多选的单位列表
      openComMul(ids,names,url,type){
        this.companyMulStatus=true;
        this.$nextTick(() => {
          this.$refs.comAdd.init(ids,names,url,type);
        })
      },
      //设置主地点
      setMain(i,list){
        list.forEach((item,index)=>{
          if(index==i){
            item.isMain="1"
          }else{
            item.isMain="0"
          }
        });
      },
      // 获取项目地点的值
      getPositionTree(data) {
        console.log(data)
        this.treeStatas = false;
        var country = '', _data = data;
        if (_data.fullDetailName.indexOf("境内") != -1) {
          country = '01';
        } else if (_data.fullDetailName.indexOf("境外") != -1) {
          country = '02';
        }
        var ifRepeat=false;
        this.detailForm.project.topInfoSiteList.forEach((item, index) => {
          if(item.ffid!=_data.fullDetailCode&&!ifRepeat){
            if (index == this.positionIndex) {
              // item.detailName = _data.detailName;
              item.country = country;
              item.ffid = _data.fullDetailCode;
              item.path = _data.fullDetailName;
              item.placeId=_data.id;
            }
          }else{
            this.$message.error("项目地点不能重复");
            ifRepeat=true;
          }

        });
        this.key = this.key + 1;
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
            isMain: '',
            placeId:''
          }
          this.detailForm.project.topInfoSiteList.push(v);
        }
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
      // 工程合同额-初始合同额=合同额增减
      getCount() {
        var money=Number(this.detailForm.project.contractAmountEngine) - Number(this.detailForm.project.contractAmountInitial);
        if(money<0){
          this.$message.error("工程合同额减去初始合同额不能小于0");
          this.detailForm.project.contractAmountEngine='';
        }else{
          this.detailForm.project.contractAmountChange = money
        }

      },

      //项目地点份额变动的时候
      getPositionMoney(index,list){
        if(list.length==1){
          list[0].contractAmount=this.detailForm.project.contractAmountEngine
        }else{
          var money=0;
          list.forEach((item,i)=>{
            if(i>0){
              money+=Number(item.contractAmount);
            }
          });
          if(this.detailForm.project.contractAmountEngine-money>0){
            list[0].contractAmount=this.detailForm.project.contractAmountEngine-money;
          }else{
            list[index].contractAmount='';
            this.$message.error('项目地点份额之和不能大于初始我方份额');
          }
        }

      },
      // 增值税改变，上报产值是否含税联动
      getOutputTax() {
        if (this.detailForm.project.valueAddedTax && this.detailForm.project.valueAddedTax !== '0') {
          this.detailForm.project.isOutputTax = '0'
        } else {
          this.detailForm.project.isOutputTax = '1'
        }
      },

      del(index, item, list) {
        list.splice(index, 1)
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
        //console.log(this.detailForm.project.commonFilesList)
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
      // 选择项目地点
      selectPosition() {
        this.treeStatas = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
        })
      },
      resetFuDai(id, list, name,code) {
        this.fatherList = [];
        this.detailForm.project.fatherProjectId = '';
        this.detailForm.project.fatherProjectName = '';
        this.detailForm.project.isBureauIndex = '';
        this.detailForm.project.projectTypeCode = id;
        this.getName(id, list, name,code);
        this.getProjectFather();
      },
      //获取父项目名称列表
      getProjectFather(){
        this.$http
          .post('/api/statistics/StatisticsProject/detail/findProjectFather',
              {projectTypeCode:this.detailForm.project.projectTypeCode,projectModuleId:this.detailForm.project.projectModuleId}
          )
          .then(res => {
            if(res.data.code  === 200){
              this.fatherList = res.data.data
            }else{
              this.fatherList = []
            }
        })
      },
      getFatherName(id, list, name) {
        if (id) {
          this.$forceUpdate()
          this.detailForm.project[name] = list.find(
            (item) => item.uuid === id
        ).projectName
        }
      },
      getName(id, list, name,code) {
        if (id) {
          this.$forceUpdate()
          this.detailForm.project[name] = list.find(
            (item) => item.id === id
          ).detailName
            this.detailForm.project[code] = list.find(
                (item) => item.id === id
            ).detailCode

          console.log(this.detailForm)
        }
      },
        //复选下拉框框获取name
      getMultipleName(valueList,list,id,name){
        var _id=[],_name=[];
        list.forEach((item)=>{
          if(valueList.indexOf(item.id)!=-1){
            _id.push(item.id);
            _name.push(item.detailName)
          }
        });
        this.detailForm.project[id]=_id.join(",");
        this.detailForm.project[name]=_name.join(",");
      },
      getShowTwo() {
        this.emergingMarket.find((item) => {
          if (item.id === this.detailForm.project.marketFirstId) {
            this.emergingMarketTwo = item.children
          }
        })
        this.projectDomainType.find((item) => {
          if (item.id === this.detailForm.project.projectTypeFirstId) {
            this.projectTypeTwo = item.children
          }
        })
        this.projectTypeTwo.find((item) => {
          if (item.id === this.detailForm.project.projectTypeSecondId) {
            this.xqprojectTypeThree = item.children||[]
          }
        })
        this.projectNature.find((item) => {
          if (item.id === this.detailForm.project.projectNatureFirstId) {
            this.projectNatureTwo = item.children
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
                  this.detailForm.project.marketFirstCode = item.detailCode
                this.emergingMarketTwo = item.children
              }
            }
          )
        }
      },
      getProjectTwo(id) {
        this.detailForm.project.projectTypeSecondId = ''
        this.detailForm.project.projectTypeSecond = ''
        this.detailForm.project.projectLineId = ''
        this.detailForm.project.projectLine = ''
        this.projectTypeTwo = []
        if (id !== '') {
          this.projectDomainType.find(
            (item) => {
              if (item.id === id) {
                this.detailForm.project.projectTypeFirst = item.detailName
                  this.detailForm.project.projectTypeFirstCode = item.detailCode
                this.projectTypeTwo = item.children
              }
            }
          )
        }
      },
      //获取工程类别三级
      getThree(id){
        this.detailForm.project.enginTypeThirdId='';
        this.xqprojectTypeThree=[];
        if(id!=''){
          this.projectTypeTwo.find(
            (item) => {
              if (item.id == id) {
                this.detailForm.project.projectTypeSecond = item.detailName;
                this.detailForm.project.projectTypeSecondCode = item.detailCode;
                this.xqprojectTypeThree = item.children||[];
              }
            }
          )
        }
      },
      getTwoXZ(id) {
        this.detailForm.project.projectNatureSecondId = ''
        this.detailForm.project.projectNatureSecond = ''
        this.detailForm.project.investmentModelId = ''
        this.detailForm.project.investmentContract = ''
        this.projectNatureTwo = []
        if (id !== '') {
          this.projectNature.find(
            (item) => {
              if (item.id === id) {
                this.detailForm.project.projectNatureFirst = item.detailName
                  this.detailForm.project.projectNatureFirstCode = item.detailCode
                this.projectNatureTwo = item.children
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
          return false;
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

      //打开单位弹框
      addDw(type,list,ifChek,index,tableList){
        this.DwVisible = true;
        this.$nextTick(() => {
          this.$refs.infoDw.init(type,list,ifChek,index,tableList);
        })
      },
      //获取单位的值
      getDwInfo(data){
        this.$forceUpdate();
        var id=[],name=[];
        if(data&&data.type!='承建单位'){
          data.forEach((item)=>{
            id.push(item.id);
            name.push(item.detailName);
          })
        }
        if(data.type=="承建单位"){
          this.detailForm.project.companyBuiltName=data.name;
          this.detailForm.project.companyBuiltId=data.id;
        }else if(data.type=="签约/使用资质单位"){
          this.detailForm.project.companyId=id.join(",");
          this.detailForm.project.companyName=name.join(",");
        }
        this.DwVisible=false;
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
                } else if (item.project.changeStatus == '2') {
                  this.changeRecordUuid=item.changeRecordUuid;
                  this.detailForm.project = item.project
                  this.detailForm.cdmc=this.detailForm.project.fieldId&&this.detailForm.project.fieldId.split(",");
                  this.getProjectFather()
                  this.detailForm.project.beforeId = this.p.beforeId
                  this.detailForm.project.afterId = this.p.afterId
                  if (!this.detailForm.project.projectSubContractList) {
                    this.detailForm.project.projectSubContractList = []
                  }
                  if (!item.project.topInfoSiteList|| item.project.topInfoSiteList=='') {
                    this.detailForm.project.topInfoSiteList = [{
                      path: '',
                      placeId: '',
                      ffid:'',
                      uuid: ''
                    }]
                  }
                  if(this.detailForm.project.companyBuildId != ''&& this.detailForm.project.companyBuildId != null ){
                    this.constructionOrgList = this.detailForm.project.companyBuildId.split(",");
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
              this.getProjectFather();
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
