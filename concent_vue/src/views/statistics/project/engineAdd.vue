<!--工程承包项目登记-->

<template>
  <div style="position: relative">
    <el-button @click="back" class="detail-back-tab">返回</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="submitForm('detailForm','save')"  class="detailbutton detail-back-tab save-btn">
      保存
    </el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailForm.project.flowStatus=='edit'||detailForm.project.flowStatus=='reject')" @click="submitForm('detailForm','sub')"  class="detailbutton detail-back-tab sub-btn">提交
    </el-button>
    <el-button
      v-show="p.actpoint == 'task'&&p.task.edit==false"
      class="detailbutton detail-back-tab tg"
      @click="operation('complete')"
      type="success"
    >通过</el-button>
    <el-button
      v-show="p.actpoint == 'task'&&p.task.edit==false"
      class="detailbutton detail-back-tab bh"
      @click="operation('back')"
      type="warning"
    >驳回</el-button>
      <!--<div class="clearfix el-card__header">-->
        <!--<span style="color: #2a2a7d;line-height: 32px" v-if="p.actpoint === 'add'"><b>工程承包项目新增</b></span>-->
        <!--<span style="color: #2a2a7d;line-height: 32px" v-if="p.actpoint === 'edit'"><b>工程承包项目修改</b></span>-->
        <!--<span style="color: #2a2a7d;line-height: 32px" v-if="p.actpoint === 'look'"><b>工程承包项目查看</b></span>-->
        <!--<span style="color: #2a2a7d;line-height: 32px" v-if="p.actpoint === 'task'"><b>工程承包项目审核</b></span>-->
      <!--</div>-->
      <el-form
        :model="detailForm"
        :rules="rules"
        class="gcform"
        ref="detailForm">
      <el-tabs type="border-card">
        <el-tab-pane label="工程承包项目">
          <div class="detailBox">
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
                <el-form-item
                  label="项目性质(一级):"
                  prop="project.projectNatureFirstId"
                  style="width: 32.5%">
                  <el-select
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
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
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                    clearable
                    filterable
                    @change="getName(detailForm.project.projectNatureSecondId, projectNatureTwo, 'projectNatureSecond','projectNatureSecondCode')"
                    placeholder="请选择"
                    v-model="detailForm.project.projectNatureSecondId">
                    <el-option
                      :key="index"
                      :label="item.detailName"
                      :value="item.id" v-if="item.isUse==1"
                      v-for="(item, index) in projectNatureTwo"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="detailForm.project.projectNatureSecondId === 'd4b6c373a60246a8a5166ddb0bf46c21' || detailForm.project.projectNatureSecondId === '7369abc48e264096a37783de01b0d4cc'"
                  label="是否为联合体:"
                  prop="project.isConsortion"
                  class="inline-formitem"
                  style="width: 32.5%">
                  <el-switch
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    class="inline-formitem-switch"
                    v-model="detailForm.project.isConsortion"
                    active-color="#409EFF"
                    inactive-color="#ddd"
                    active-value="1"
                    inactive-value="0"/>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item
                  v-if="detailForm.project.projectNatureFirstId === '7031076e7a5f4225b1a89f31ee017802'"
                  label="投资模式:"
                  prop="project.investmentModelId"
                  style="width: 32.5%">
                  <el-select
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    clearable
                    filterable
                    @change="getName(detailForm.project.investmentModelId, projectNatureTwo, 'investmentModel','investmentModelCode')"
                    placeholder="请选择"
                    v-model="detailForm.project.investmentModelId">
                    <el-option
                      :key="index"
                      :label="item.detailName"
                      :value="item.id"  v-if="item.isUse==1"
                      v-for="(item, index) in projectNatureTwo"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="detailForm.project.projectNatureFirstId === '7031076e7a5f4225b1a89f31ee017802'"
                  label="投资合同总额(万元):"
                  prop="project.investmentContract"
                  :rules="rules.project.isMustMoney"
                  style="width: 32.5%">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
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
                  label="承建单位"
                  prop="project.companyBuiltName"
                  style="width: 32.5%">
                  <!-- <el-input
                    clearable
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    placeholder="请输入"
                    v-model="detailForm.project.companyBuiltName"/> -->
                  <el-input clearable :disabled="p.actpoint === 'look'||p.actpoint=='task'" placeholder="请输入内容" v-model="detailForm.project.companyBuiltName" class="input-with-select">
                    <el-button  v-if="p.actpoint !== 'look'&&p.actpoint!='task'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('承建单位',detailForm.project.companyBuiltId,false)" ></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="所属铁路局:"
                  style="width: 32.5%">
                  <el-select
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
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
                  <!--@change="getName(detailForm.project.projectTypeSecondId, projectTypeTwo, 'projectTypeSecond','projectTypeSecondCode')"-->
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
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'||detailForm.project.contractInfoList!=''"
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
                <!--父项目暂无-->
                <el-form-item
                  v-if="detailForm.project.projectTypeId==='22038e576c2242d5acc93f6c3c8e48ad' ||
                  detailForm.project.projectTypeId==='625a3ee0728a4f45b792d022b8bb36d9' ||
                  detailForm.project.projectTypeId==='393a07bda2244b03a24590e076a421df'"
                  label="父项目名称:"
                  prop="project.fatherProjectName"
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
                  <!--<el-input-->
                  <!--:disabled="p.actpoint === 'look'||p.actpoint === 'task'"-->
                  <!--clearable-->
                  <!--placeholder="请输入"-->
                  <!--v-model="detailForm.project.fatherProjectName"/>-->
                </el-form-item>
                <el-form-item
                  v-if="detailForm.project.projectTypeId===''||detailForm.project.projectTypeId==='625a3ee0728a4f45b792d022b8bb36d9'"
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
                    active-value="1"
                    inactive-value="0"/>
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
                  label="初始签订数量:"
                  prop="project.signedNumber"
                  :rules="rules.project.isNumber"
                  style="width: 32.5%">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    clearable
                    placeholder="请输入"
                    v-model="detailForm.project.signedNumber"/>
                </el-form-item>
                <el-form-item
                  label="工程合同数量:"
                  prop="project.contractCount"
                  :rules="rules.project.isNumber"
                  style="width: 32.5%">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    clearable
                    placeholder="请输入"
                    v-model="detailForm.project.contractCount"/>
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
                <!--所在地-->
                <!--<el-form-item-->
                <!--label="项目所在地"-->
                <!--prop="project.topInfoSiteList[0].path"-->
                <!--:rules="{-->
                <!--required: true, message: '此项不能为空', trigger: 'change'-->
                <!--}"-->
                <!--style="width: 32.5%"-->
                <!--&gt;-->
                <!--<el-input v-model="detailForm.project.topInfoSiteList[0].path" placeholder="项目所在地"-->
                <!--:disabled="p.actpoint === 'look'||p.actpoint === 'task'" clearable>-->
                <!--<el-button slot="append" :disabled="p.actpoint === 'look'||p.actpoint === 'task'" icon="el-icon-search"-->
                <!--@click="selectPosition()"></el-button>-->
                <!--</el-input>-->
                <!--</el-form-item>-->
                <el-form-item
                  label="签约/使用资质单位:"
                  prop="project.companyName"
                  style="width: 32.5%">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
                    clearable
                    placeholder="请输入"
                    v-model="detailForm.project.companyName">
                    <!--<el-button v-if="p.actpoint!='task'&&p.actpoint!='look'&&detailForm.project.contractInfoList==''" slot="append" icon="el-icon-circle-plus-outline" @click="openComMul(detailForm.project.companyId,detailForm.project.companyName,'/api/contract/Companies/detail/findCompanies','签约/使用资质单位')"></el-button>-->
                    <el-button v-if="p.actpoint!='task'&&p.actpoint!='look'&&detailForm.project.contractInfoList==''" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('签约/使用资质单位',detailForm.project.companyId)"></el-button>
                  </el-input>
                </el-form-item>
              </el-row>
              <!--新兴市场(一级)-->
              <el-row>
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
                  <!--multiple-->
                  <!--collapse-tags-->
                  <el-select
                    :disabled="p.actpoint === 'look'||detailForm.project.contractInfoList!=''||p.actpoint === 'task'||detailForm.project.marketFirstId==='00b87acd71784c3ba860b9513789724e'"
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
                  prop="cdmc"
                  :rules="{
                    required: true,
                    message: '此项不能为空',
                    trigger: 'blur',
                  }"
                  style="width: 32.5%">
                  <el-select
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'||detailForm.project.contractInfoList!=''"
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
              <!--初始合同额-->
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
                <el-form-item
                  label="工程合同额(万元):"
                  prop="project.contractAmountEngine"
                  :rules="rules.project.isMustMoney"
                  style="width: 32.5%">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    @blur="getCount"
                    clearable
                    placeholder="请输入"
                    v-model="detailForm.project.contractAmountEngine">
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
              </el-row>
              <!--合同总额(万元)-->
              <el-row>
                <el-form-item
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
                </el-form-item>
                <el-form-item
                  label="合同总额(万元):"
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
              </el-row>
              <!--增值税-->
              <el-row>
                <el-form-item
                  label="实际投资额(万元):"
                  prop="project.realInvest"
                  :rules="rules.project.isMoney"
                  style="width: 32.5%">
                  <el-input
                    clearable
                    placeholder="请输入"
                    v-model="detailForm.project.realInvest">
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
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
                <el-form-item
                  label="是否托管:"
                  class="inline-formitem"
                  prop="project.isTrusteeship"
                  style="width: 32.5%">
                  <el-switch
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    class="inline-formitem-switch"
                    v-model="detailForm.project.isTrusteeship"
                    active-color="#409EFF"
                    inactive-color="#ddd"
                    active-value="1"
                    inactive-value="0"/>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item
                  label="合同签订日期:"
                  prop="project.contractSignTime"
                  style="width: 32.5%">
                  <el-date-picker
                    :disabled="detailForm.project.contractInfoList!=''"
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
                <el-form-item
                  label="是否代管:"
                  prop="project.isEscrow"
                  class="inline-formitem"
                  style="width: 32.5%">
                  <el-switch
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    class="inline-formitem-switch"
                    v-model="detailForm.project.isEscrow"
                    active-color="#409EFF"
                    inactive-color="#ddd"
                    active-value="1"
                    inactive-value="0"/>
                </el-form-item>
              </el-row>
              <!--实际开工日期-->
              <el-row>
                <el-form-item
                  label="实际开工日期:"
                  prop="project.realStartTime"
                  style="width: 32.5%">
                  <el-date-picker
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    v-model="detailForm.project.realStartTime"
                    type="date"
                    value-format="timestamp"
                    placeholder="选择日期时间"/>
                </el-form-item>
                <el-form-item
                  label="实际竣工日期:"
                  prop="project.realEndTime"
                  style="width: 32.5%">
                  <el-date-picker
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    v-model="detailForm.project.realEndTime"
                    type="date"
                    value-format="timestamp"
                    placeholder="选择日期时间"/>
                </el-form-item>
                <el-form-item
                  label="竣工产值:"
                  prop="project.completedOutputValue"
                  :rules="rules.project.isNumber"
                  style="width: 32.5%">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    clearable
                    placeholder="请输入"
                    v-model="detailForm.project.completedOutputValue"/>
                </el-form-item>
              </el-row>
              <!--建设单位-->
              <el-row>
                <el-form-item
                  label="建设单位:"
                  prop="project.companyBuild"
                  style="width: 32.5%">
                  <el-autocomplete
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    v-model="detailForm.project.companyBuild"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                  ></el-autocomplete>
                  <!--<el-input-->
                  <!--:disabled="p.actpoint === 'look'||p.actpoint === 'task'"-->
                  <!--clearable-->
                  <!--placeholder="请输入"-->
                  <!--v-model="detailForm.project.companyBuild"/>-->
                </el-form-item>
                <el-form-item
                  label="设计单位:"
                  prop="project.companyDesign"
                  style="width: 32.5%">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    clearable
                    placeholder="请输入"
                    v-model="detailForm.project.companyDesign"/>
                </el-form-item>
                <el-form-item
                  label="监理单位:"
                  prop="project.companySupervisor"
                  style="width: 32.5%">
                  <el-input
                    disabled
                    clearable
                    placeholder="请选择监理单位"
                    v-model="detailForm.project.companySupervisor">
                    <el-button slot="append" icon="el-icon-circle-plus-outline" @click="openComMul('','','/api/contract/Companies/detail/findCompanies','监理单位')"></el-button>
                  </el-input>
                </el-form-item>
              </el-row>
              <!--项目经理-->
              <el-row>
                <el-form-item
                  label="项目经理:"
                  prop="project.projectManagerName"
                  style="width: 32.5%">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    clearable
                    placeholder="请输入"
                    v-model="detailForm.project.projectManagerName"/>
                </el-form-item>
                <el-form-item
                  label="工程标段:"
                  prop="project.projectBidSection"
                  style="width: 32.5%">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    clearable
                    placeholder="请输入"
                    v-model="detailForm.project.projectBidSection"/>
                </el-form-item>
                <el-form-item
                  label="起讫地点(标段):"
                  prop="project.beginAddress"
                  style="width: 32.5%">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    clearable
                    placeholder="请输入"
                    v-model="detailForm.project.beginAddress"/>
                </el-form-item>
              </el-row>
              <!--工程概况(最多700字)-->
              <el-row>
                <el-form-item
                  class="neirong"
                  label="工程概况(最多700字):"
                  prop="project.engineSurvey">
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                    clearable
                    type="textarea"
                    placeholder="请输入"
                    v-model="detailForm.project.engineSurvey"/>
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
                    <el-form-item class="tabelForm" :prop="'project.topInfoSiteList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
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
              <!--分包承建单位-->
              <div v-if="detailForm.project.projectNatureSecondId === 'd4b6c373a60246a8a5166ddb0bf46c21' || detailForm.project.projectNatureSecondId === '7369abc48e264096a37783de01b0d4cc'">
                <p class="detail-title" style="overflow:hidden;margin-right:30px">
                  <span>分包承建单位信息:</span>
                  <el-button
                    v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                    @click="addProduct()"
                    class="upload-demo detailUpload detatil-flie-btn"
                    type="primary">
                    新增
                  </el-button>
                  <el-button
                    v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                    @click="addSeparate()"
                    class="upload-demo detailUpload detatil-flie-btn"
                    type="primary">
                    选择分包
                  </el-button>
                </p>
                <el-table
                  :data="detailForm.project.projectSubContractList"
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
                    label="承建单位"
                    width="200"
                    align="center"
                    prop="subContractName"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <el-form-item class="tabelForm">
                        <el-input
                          clearable
                          :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                          v-model="scope.row.subContractName"/>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="项目类型"
                    width="200"
                    align="center"
                    prop="projectTypeId"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <el-form-item class="tabelForm">
                        <el-select
                          :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                          filterable
                          clearable
                          placeholder="请选择"
                          @change="getName2(scope.row.projectTypeId, projectType, 'projectTypeName', scope.$index,'projectTypeCode')"
                          v-model="scope.row.projectTypeId">
                          <el-option
                            :key="index"
                            :label="item.detailName"
                            :value="item.id"
                            v-for="(item, index) in projectType"/>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="项目名称"
                    align="center"
                    prop="projectName"
                    min-width="200"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <!--:prop="'project.productInfoList[' + scope.$index + '].productName'"-->
                      <!--:rules="{required: true, message: '此项不能为空', trigger: 'blur'}"-->
                      <el-form-item class="tabelForm">
                        <el-input
                          v-model="scope.row.projectName"
                          clearable
                          :disabled="p.actpoint === 'look'||p.actpoint === 'task'"/>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="初始合同额(万元)"
                    align="center"
                    prop="contractAmountInitial"
                    width="300"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <el-form-item class="tabelForm"
                                    :prop="'project.projectSubContractList[' + scope.$index + '].contractAmountInitial'"
                                    :rules="rules.project.isMustMoney">
                        <el-input
                          class="group-no-padding"
                          v-model="scope.row.contractAmountInitial"
                          clearable
                          :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                        >
                          <template slot="prepend">¥</template>
                          <template slot="append">(万元)</template>
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="工程合同额(万元)"
                    align="center"
                    prop="contractAmountInitial"
                    width="300"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <el-form-item class="tabelForm"
                                    :prop="'project.projectSubContractList[' + scope.$index + '].contractAmountEngine'"
                                    :rules="rules.project.isMustMoney">
                        <el-input
                          class="group-no-padding"
                          v-model="scope.row.contractAmountEngine"
                          clearable
                          :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                        >
                          <template slot="prepend">¥</template>
                          <template slot="append">(万元)</template>
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                    :resizable="false"
                    fixed="right"
                    label="操作"
                    align="center"
                    show-overflow-tooltip
                    width="80">
                    <template slot-scope="scope">
                      <el-link
                        :underline="false"
                        @click="del(scope.$index,scope.row,detailForm.project.projectSubContractList)"
                        type="warning">删除
                      </el-link>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="detailForm.project.contractInfoList!=''">
                <p  v-if="p.actpoint != 'add'" class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>关联合同: </span>
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
                    width="80">
                    <template slot-scope="scope">
                      <!--<el-link-->
                      <!--:underline="false"-->
                      <!--@click="del(scope.$index,scope.row,detailForm.project.contractInfoList,'glht')"-->
                      <!--type="warning">删除-->
                      <!--</el-link>-->
                      <el-link
                        :underline="false"
                        @click="look(scope.row)"
                        type="warning">查看合同
                      </el-link>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="实物工程量计划">
          <div class="detailBoxBG htfs">
            <div>
              <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                <span>实物工程量列表: </span>
              </p>
              <el-table
                :data="detailForm.project.quantityPlanList"
                :header-cell-style="{
                  'text-align': 'center',
                  'background-color': 'rgba(246,248,252,1)',
                  color: 'rgba(0,0,0,1)',
                }"
                align="center"
                border
                class="detailTable"
                ref="table"
                style="width: 100%; min-height: calc(100vh - 370px)"
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
                  label="统计项名称"
                  prop="vname"
                  width="300"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="计量单位"
                  prop="vjldwName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="计划"
                  prop="planName"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input 
                    :disabled="scope.row.veditable != '1'"
                    v-model="scope.row.planName" 
                    @input="scope.row.vsum=parseInt(scope.row.vsum.replace(/[^\d]/g,''))"/>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'&&(detailForm.project.flowStatus!=1)">
          <Audit-Process :task="p.task||{businessId:p.uuid,businessType:' project_project_new'}"></Audit-Process>
        </el-tab-pane>
      </el-tabs>
      </el-form>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
    <Separate-Dialog v-if="infoCSVisible" ref="infoCS" @refreshDataList="goSeparate"></Separate-Dialog>
    <related-contract  v-if="contractStatas" ref="infoCS" @getPosition="goAddDetail"></related-contract>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
    <!--多选的单位列表组件-->
    <company-mul v-if="companyMulStatus" ref="comAdd" @getComList="getComList"></company-mul>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import CompanyTree from '../companyTree'
  import FileUpload from '@/components/fileUpload'
  import { isMoney, isMobile, isPhone } from '@/utils/validate'
  import SeparateDialog from '@/components/separateDialog'
  import RelatedContract from './relatedContract'
  import companyMul from '@/components/companiesMultiple'
  import AuditProcess from '@/components/auditProcess'
  // import datas from '@/utils/position'
  export default {
    name: 'InvestMode',
    components: {
      Tree, FileUpload, SeparateDialog,RelatedContract,CompanyTree,
      companyMul,//多选的单位列表组件
      AuditProcess
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
        userInfo: JSON.parse(sessionStorage.getItem('userdata')),
        companyMulStatus:false,//设计单位等多选列表状态
        contractStatas:false,//关联合同状态
        fatherList:[],
        uuid: null,
        DwVisible: false,
        infoCSVisible: false,
        treeStatas: false,
        uploadVisible: false,
        emergingMarketTwo: [], // 新兴市场二级类别
        projectTypeTwo: [], // 工程类别二级
        xqprojectTypeThree:[],//工程类别三级
        projectNatureTwo: [], // 项目性质二级
        isOutputTax: [{ label: '是' }, { label: '否' }], // 上报产值是否含税
        options1: [{ label: '测试所在地', value: 'testabcd' }],
        detailForm: {
          cdmc:[],
          project: {
            contractInfoList:[],//关联合同列表
            projectSubContractList: [], // 分包字段
            infoProductList: [], // 产品列表
            infoSubjectMatterList: [], // 标的信息
            commonFilesList: [], // 文件列表
            projectName: '', // 项目名称(中文)
            projectForeginName: '', // 项目名称(外文)
            fatherProjectName: '', // 父项目名称
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
            projectModuleId: '7f4fcba4255b43a8babf15afd6c04a53', // 项目板块
            projectModuleCode:"engineering",//项目板块code
            projectModuleName: '工程承包', // 项目板块
            businessId: '', // 业务板块
            isConsortion: '0', // 是否联合体项目
            projectTypeId: '', // 项目类型
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
            signedNumber: '', // 初始签订数量
            contractCount: '', // 工程合同数量
            contractStartTime: '', // 合同开工日期
            contractEndTime: '', // 合同竣工日期
            contractSignTime: '', // 合同签订日期
            realStartTime: '', // 实际开工日期
            realEndTime: '', // 实际竣工日期
            projectEndTime: '', // 竣工日期
            companyBuild: '', // 建设单位
            companyDesign: '', // 设计单位
            companySupervisor: '', // 监理单位
            projectManagerName: '', // 项目经理
            completedOutputValue: '', // 竣工产值
            isTrusteeship: '', // 是否托管
            projectBidSection: '', // 工程标段
            beginAddress: '', // 起讫地点(标段)
            isEscrow: '', // 是否代管
            realInvest: '', // 实际投资额(万元)
            engineSurvey: '', // 工程概况(最多700字)
            projectRemark: '', // 备注(最多2000字)
            topInfoSiteList: [
              {
                path: '',
                placeId: '',
                ffid:'',
                uuid: '',
                isMain: '1',
                country: '',
              }
            ],
            quantityPlanList: []
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
            engineSurvey: [{ min: 0, max: 700, message: '最多输入700字', trigger: 'blur' }],
            projectRemark: [{ min: 0, max: 2000, message: '最多输入2000字', trigger: 'blur' }],
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
      projectType() {
        return this.$store.state.projectType
      },
      projectStatus() {
        var projectStatusCheck = [];
        this.$store.state.projectStatus.forEach((item) => {
          if(item.detailCode == '028001' || item.detailCode == '028002'){
            projectStatusCheck.push(item);
          }
        });
        return projectStatusCheck
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
      }
    },
    methods: {
      //打开多选的单位列表
      openComMul(ids,names,url,type){
        this.companyMulStatus=true;
        this.$nextTick(() => {
          this.$refs.comAdd.init(ids,names,url,type);
        })
      },
      //获取拿过来的多选单位列表
      getComList(data){
        console.log(data)
        this.$forceUpdate();
        if(data.type=='签约/使用资质单位'){
          this.detailForm.project.companyId=data.selIdList.join(",");
          this.detailForm.project.companyName=data.selList.join(",");
        }else if (data.type == "监理单位") {
          this.detailForm.project.companySupervisor=data.selList.join(",");
          // id数组 = data.selIdList.join(",");
        }
      },
      //根据id跳页面
      getUrl(id){
        var url='';
        if(id=='7f4fcba4255b43a8babf15afd6c04a53'){
          url= '/manage/contractManager/project/detail/';
        }else if(id=='f6823a41e9354b81a1512155a5565aeb'){
          url= '/manage/contractManager/design/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7af6'){
          url=  '/manage/contractManager/house/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7af4'){
          url=  '/manage/contractManager/trade/detail/';
        }else if(id=='510ba0d79593418493eb1a11ed3e7df4'){
          url=  '/manage/contractManager/industrial/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7df4'){
          url=  '/manage/contractManager/finance/detail/';
        }else if(id=='510ba0d79593418493eb1a11ed4e7df4'){
          url=  '/manage/contractManager/operate/detail/';
        }else if(id=='510ba0d79593419493eb1a11ed3e7df4'){
          url=  '/manage/contractManager/other/detail/';
        }
        return url;
      },
      //查看关联合同
      look(row){
        let p = {actpoint: "look", instid : row.uuid};
        var url=this.getUrl(row.moduleId);
        this.$router.push({
          path: url,
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
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
              // this.checkTopInfoSiteList();
            }
          }else{
            this.$message.error("项目地点不能重复");
            ifRepeat=true;
          }

        });
        this.key = this.key + 1;
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

      //新增关联合同
      addContract(){
        this.contractStatas = true;
        this.$nextTick(() => {
          this.$refs.infoCS.init(this.detailForm.project.projectModuleId);
        })
      },
      //获取新增的关联合同
      goAddDetail(data){
        this.$forceUpdate();
        if(!this.detailForm.project.contractInfoList.find((item)=>item.uuid==data.uuid)){
          this.detailForm.project.contractInfoList=this.detailForm.project.contractInfoList.concat(data);
        }
        this.contractStatas = false;
      },
      //建设单位搜索
      querySearchAsync(queryString, cb) {
        var restaurants = this.pubCustomers;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.$forceUpdate();
        cb(results);
      }, 500 * Math.random());
      },
      createStateFilter(queryString) {
        return (restaurants) => {
          return (restaurants.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
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
              '/api/statistics/StatisticsProject/process/'+type,
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
      goSeparate(data) {
        console.log(data)
        let v = {
          uuid: data.uuid, // ID新增为空，但必须传
          subContractName: data.companyBuiltName, // 承包单位名称
          projectName: data.projectName, // 项目名称
          projectTypeId: data.projectTypeId, // 项目类型ID
          projectTypeName: data.projectTypeName, // 项目类型名称
          contractAmountInitial: data.contractAmountInitial, // 初始合同额
          contractAmountEngine: data.contractAmountEngine // 工程合同额
        }
        this.detailForm.project.projectSubContractList.push(v)
      },
      addSeparate() {
        this.infoCSVisible = true
        this.$nextTick(() => {
          this.$refs.infoCS.init()
        })
      },
      addProduct() {
        let v = {
          uuid: '', // ID新增为空，但必须传
          subContractName: '', // 承包单位名称
          projectName: '', // 项目名称
          projectTypeId: '', // 项目类型ID
          projectTypeName: '', // 项目类型名称
          contractAmountInitial: '', // 初始合同额
          contractAmountEngine: '' // 工程合同额
        }
        this.detailForm.project.projectSubContractList.push(v)
      },
      del(index, item, list,name) {
        console.log(index, item, list)
        if (item.uuid && item.uuid !== ''&& !name) {
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                '/api/statistics/StatisticsProject/detail/deleteProjectFb',
                { projectFbId: item.uuid }
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
      // 增值税改变，上报产值是否含税联动
      getOutputTax() {
        if (this.detailForm.project.valueAddedTax && this.detailForm.project.valueAddedTax !== '0') {
          this.detailForm.project.isOutputTax = '1'
        } else {
          this.detailForm.project.isOutputTax = '0'
        }
      },
      handleRemove(file, index) {
        this.$http
          .post(
            '/api/contract/topInfo/CommonFiles/list/delete',
            { ids: [file.uuid] }
          )
          .then((res) => {
            if (res.data.code === 200) {
              this.detailForm.project.commonFilesList.splice(index, 1)
            }
          })
        console.log(this.detailForm.project.commonFilesList)
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
      // // 获取项目地点的值
      // getPositionTree(data) {
      //   this.treeStatas = false
      //   this.detailForm.project.topInfoSiteList[0].placeId = data.id
      //   this.detailForm.project.topInfoSiteList[0].path = data.fullDetailName
      //   this.detailForm.project.topInfoSiteList[0].ffid = data.fullDetailCode
      // },
      resetFuDai(id, list, name,code) {
        this.detailForm.project.fatherProjectName = ''
        this.detailForm.project.isBureauIndex = ''
        this.getName(id, list, name,code)
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
        }
      },
      getName2(id, list, name, index,code) {
        if (id) {
          this.detailForm.project.projectSubContractList[index][name] = list.find(
            (item) => item.id === id
          ).detailName

            this.detailForm.project.projectSubContractList[index][code] = list.find(
                (item) => item.id === id
            ).detailCode
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
        console.log(this.detailForm.project[id])
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
                console.log(this.xqprojectTypeThree)
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
                this.projectNatureTwo = item.children
              }
            }
          )
        }
      },
      // 保存
      submitForm(formName, type) {
         var url='';
        if(type=='save'){
          url="/api/statistics/StatisticsProject/detail/save"
        }else{
          url="/api/statistics/StatisticsProject/process/start"
        }
        if(this.detailForm.project.projectName!=this.detailForm.project.projectOmit){
          this.$message.error("项目简称和项目名称（中文）保持一致。");
          return false;
        }
        if(Number(this.detailForm.project.contractAmountInitial)!=Number(this.detailForm.project.contractAmountEngine)&&this.p.actpoint=='add'){
          this.$message.error("初始合同额要等于工程合同额");
          return false;
        }
        if(this.detailForm.project.topInfoSiteList.length==0){
          this.$message.error("请至少选择一个项目地点");
          return false;
        }
        var hasMain=false;
        this.detailForm.project.topInfoSiteList.forEach((item)=>{
          if(item.isMain=='1'){
            hasMain=true;
          }
        });
        if(!hasMain){
          this.$message.error("请选择一个主地点");
          return false;
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                url,
                JSON.stringify(this.detailForm.project),
                { useJson: true }
              )
              .then((res) => {
                if (res.data.code === 200) {
                  this.$message({
                    message:  `${type=='save'?'保存':'提交'}成功`,
                      type: 'success'
                    })
                    this.$router.push({
                      path: '/statistics/project/engineList'
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
      // 提交
      submit() {
        const id = this.p.uuid || this.uuid
        this.$http
          .post('/api/statistics/StatisticsProject/process/start',
          JSON.stringify(this.detailForm.project),{ useJson: true })
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$router.push({
                path: '/statistics/project/engineList'
              })
            } else {
              this.$message({
                message: '提交失败',
                type: 'error'
              })
            }
          })
      },
      back() {
        this.$router.back()
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
      getShow() {
        let params = { topInfoId: this.p.uuid ||this.p.instid ,contractNumber: this.p.contractNumber}
        this.$http
          .post('/api/statistics/StatisticsProject/detail/entityInfo', params)
          .then((res) => {
            if (res.data.code === 200) {
              this.detailForm.project = res.data.data
              if (!res.data.data.infoProductList) {
                this.detailForm.project.infoProductList = []
              }
              if (!res.data.data.infoSubjectMatterList) {
                this.detailForm.project.infoSubjectMatterList = []
              }
              if (!res.data.data.projectSubContractList) {
                this.detailForm.project.projectSubContractList = []
              }
              if (!res.data.data.contractInfoList) {
                this.detailForm.project.contractInfoList = []
              }
              if (res.data.data.topInfoSiteList.length < 1) {
                this.detailForm.project.topInfoSiteList = [{ path: '', placeId: '', uuid: '' }]
              }
              this.detailForm.cdmc=res.data.data.fieldId&&res.data.data.fieldId.split(",");
              this.getShowTwo();
              if(this.detailForm.project.contractInfoList!=''){
                this.detailForm.project.investmentContract=this.detailForm.project.contractAmountInitial;
                this.detailForm.project.contractAmountTotal=this.detailForm.project.contractAmountInitial;
                this.detailForm.project.projectStatusId='6530437b0a6f49a59b047eb4eb4f9201';
                this.detailForm.project.projectTypeCode='017003';
                this.detailForm.project.projectTypeId='393a07bda2244b03a24590e076a421df';
                this.detailForm.project.projectTypeName='自揽项目';
                this.getCount()
              }
            }
          })
      }
    },
    mounted() {
      this.$store.dispatch('getConfig', {})
      this.$store.dispatch("getPubCustomers", {});
      this.$store.dispatch('getCategory', { name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3' })
      this.$store.dispatch('getCategory', { name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e' })
      this.$store.dispatch('getCategory', { name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72' })
      if (this.p.actpoint === 'look' || this.p.actpoint === 'edit'||this.p.actpoint=='task') {
        this.getShow()
      }
      if(this.p.actpoint == 'add'){
        this.detailForm.project.companyBuiltId=this.userInfo.managerOrgId;
        this.detailForm.project.companyBuiltName=this.userInfo.managerOrgName;
      }
      //获取父项目名称列表
      this.$http
        .post('/api/statistics/StatisticsProject/detail/findProjectFather')
        .then(res => {
        this.fatherList = res.data.data
      })
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

    >>>.el-autocomplete{
      width: 95%!important;
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
</style>
