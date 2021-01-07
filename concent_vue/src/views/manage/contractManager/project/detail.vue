<template>
  <div style="position: relative">
    <el-button v-show="p.actpoint != 'look'" class="detail-back-tab detailbutton save-btn" type="primary" @click="saveInfo('detailform')">保存</el-button>
    <el-button v-show="p.actpoint != 'look'" class="detail-back-tab detailbutton sub-btn" @click="submit">提交</el-button>
    <el-button class="detail-back-tab" @click="back" type="text">返回</el-button>
    <el-form
      :inline="false"
      :model="detailform"
      :rules="rules"
      class="gcform"
      ref="detailform"
    >
    <el-tabs type="border-card">
      <el-tab-pane label="工程承包合同">
        <div class="detailBoxBG">
              <el-form-item
                label="项目名称(中文):"
                prop="contractInfo.inforName"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input placeholder="请输入内容" v-model="detailform.contractInfo.inforName" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                label="项目名称(外文):"
                prop="contractInfo.inforNameForeign"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input placeholder="请输入内容" v-model="detailform.contractInfo.inforNameForeign" class="input-with-select">

                </el-input>
              </el-form-item>
              <el-form-item
                label="工程类别(一级):"
                prop="contractInfo.enginTypeFirstId"
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
                  @change="getTwo"
                  size="mini"
                  v-model="detailform.contractInfo.enginTypeFirstId"
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
                prop="contractInfo.enginTypeSecondId"
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
                  @change="
                  getName(
                    detailform.contractInfo.enginTypeSecondId,
                    xqprojectType,
                    'enginTypeSecondName'
                  )
                "
                  v-model="detailform.contractInfo.enginTypeSecondId"
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
                label="合同名称(中文):"
                prop="contractInfo.contractName"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input placeholder="请输入内容" v-model="detailform.contractInfo.contractName" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                label="合同名称(外文):"
                prop="contractInfo.contractNameForeign"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input placeholder="请输入内容" v-model="detailform.contractInfo.contractNameForeign" class="input-with-select">

                </el-input>
              </el-form-item>
              <el-form-item
                label="合同编号:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder=""
                  size="mini"
                  v-model="detailform.contractInfo.contractNo"
                />
              </el-form-item>
              <el-form-item
                label="合同签订日期:"
              >
                <el-date-picker
                  :disabled="p.actpoint === 'look'"
                  filterable
                  clearable
                  type="date"
                  value-format="timestamp"
                  v-model="detailform.contractInfo.contractSignTime"

                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                label="施工单位:"
              >
                <el-input placeholder="请输入内容" v-model="detailform.contractInfo.buildOrgNames" class="input-with-select">
                  <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('施工单位',detailform.contractInfo.buildOrgIds)" ></el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                label="使用资质单位:"
                prop="contractInfo.qualityOrgNames"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'change',
              }"
              >
                <el-input placeholder="请输入内容" v-model="detailform.contractInfo.qualityOrgNames" class="input-with-select">
                  <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('使用资质单位',detailform.contractInfo.qualityOrgIds)" ></el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                v-if="detailform.contractInfo.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
                label="建设单位:"
                prop="contractInfo.constructionOrgId"
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
                  @change="
                  getName(
                    detailform.contractInfo.constructionOrgId,
                    xqprojectType,
                    'constructionOrg'
                  )
                "
                  v-model="detailform.contractInfo.constructionOrgId"
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
                v-if="detailform.contractInfo.enginTypeFirstId!='17ff5c08d36b41ea8f2dc2e9d3029cac'"
                label="建设单位:"
                prop="contractInfo.constructionOrg"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform.contractInfo.constructionOrg"
                />
              </el-form-item>
              <el-form-item
                label="建设单位性质:"
                prop="contractInfo.constructionNatureId"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-select
                  :disabled="p.actpoint==='look'"
                  clearable
                  filterable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.constructionNatureId"
                  @change="
                  getName(
                    detailform.contractInfo.constructionNatureId,
                    constructionUnitNature,
                    'constructionNature'
                  )
                "
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in constructionUnitNature"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="铁路分类:"
                v-if="detailform.contractInfo.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'||detailform.contractInfo.enginTypeFirstId==null"
              >
                <el-select
                  :disabled="p.actpoint==='look'"
                  filterable
                  clearable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.designRailwayClassifyId"
                >
                  <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="detailform.contractInfo.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'||
                  detailform.contractInfo.enginTypeFirstId=='24ebba9f2f3447579d0086209aff6ecd'||
                  detailform.contractInfo.enginTypeFirstId=='0f16c387f17b402db45c4de58e1cf8b4'||
                  detailform.contractInfo.enginTypeFirstId=='f6f5188458ab4c5ba1e0bc12a9a4188b'"
                label="线路长度(千米):"
                prop="contractInfo.lineLength"
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
                  v-model="detailform.contractInfo.lineLength"
                />
              </el-form-item>
              <el-form-item
                label="是否导入清单:"
                prop="contractInfo.isImport"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-select
                  :disabled="p.actpoint==='look'"
                  clearable
                  filterable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.isImport"
                >
                  <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="detailform.contractInfo.enginTypeFirstId=='193b4d4003d04899a1d09c8d5f7877fe'||detailform.contractInfo.enginTypeFirstId==null"
                label="建筑面积(平方米):"
                prop="contractInfo.contractBuiltArea"
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
                  v-model="detailform.contractInfo.contractBuiltArea"
                />
              </el-form-item>
              <el-form-item
                label="合同总金额(万元):"
                prop="contractInfo.contractAmount"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  @input="getOurAmount"
                  clearable
                  placeholder=""
                  size="mini"
                  v-model="detailform.contractInfo.contractAmount"
                />
              </el-form-item>
              <el-form-item
                label="铁建金额(万元):"
                prop="contractInfo.crccCash"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="true"
                  v-model="detailform.contractInfo.crccCash"
                />
              </el-form-item>
              <el-form-item
                label="我方份额(万元):"
                prop="contractInfo.ourAmount"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="true"
                  v-model="detailform.contractInfo.ourAmount"
                />
              </el-form-item>
              <el-form-item
                label="增值税(万元):"
                prop="contractInfo.valueAddedTax"
                :rules="rules.contractAmount"

              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder=""
                  size="mini"
                  v-model="detailform.contractInfo.valueAddedTax"
                />
              </el-form-item>
              <el-form-item
                label="系统外份额(万元):"
                prop="contractInfo.outSystemAmount"
                :rules="rules.contractAmount"

              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder=""
                  size="mini"
                  v-model="detailform.contractInfo.outSystemAmount"
                />
              </el-form-item>
              <el-form-item
                label="暂定金(万元):"
                prop="contractInfo.designTempPrice"
                :rules="rules.contractAmount"

              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder=""
                  size="mini"
                  v-model="detailform.contractInfo.designTempPrice"
                />
              </el-form-item>
              <el-form-item
                label="新兴市场类别(一级):"
                prop="contractInfo.marketFirstNameId"
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
                  v-model="detailform.contractInfo.marketFirstNameId"
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
                label="新兴市场类别(二级):"
                prop="contractInfo.marketSecondId"
                :rules="detailform.contractInfo.marketFirstNameId&&emergingMarketTwo?{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }:{}"
              >
                <el-select
                  :disabled="p.actpoint === 'look'"
                  filterable
                  clearable
                  placeholder="请选择"
                  size="mini"
                  @change="
                  getName(
                    detailform.contractInfo.marketSecondId,
                    emergingMarketTwo,
                    'marketSecondName'
                  )
                "
                  v-model="detailform.contractInfo.marketSecondId"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in emergingMarketTwo"
                  ></el-option>
                </el-select>
              </el-form-item>

            <el-form-item
              label="装配率(%):"
              prop="contractInfo.otherAssemblyRate"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              v-if="detailform.contractInfo.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

            >
              <el-input
                :disabled="p.actpoint === 'look'"
                size="mini"
                v-model="detailform.contractInfo.otherAssemblyRate"
              />
            </el-form-item>
            <el-form-item
              label="装配类型:"
              prop="zplx"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              v-if="detailform.contractInfo.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

            >
              <el-select
                :disabled="p.actpoint==='look'"
                multiple
                @change="getMultipleName(detailform.zplx,assemblyType,'otherAssemblyTypeId','otherAssemblyType')"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.zplx"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in assemblyType"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="建筑类型:"
              prop="jzlx"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              v-if="detailform.contractInfo.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

            >
              <el-select
                :disabled="p.actpoint==='look'"
                multiple
                @change="getMultipleName(detailform.jzlx,architecturalType,'otherBuildingTypeId','otherBuildingType')"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.jzlx"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in architecturalType"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="建筑结构类型:"
              prop="jzjglx"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              v-if="detailform.contractInfo.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

            >
              <el-select
                :disabled="p.actpoint==='look'"
                multiple
                @change="getMultipleName(detailform.jzjglx,buildingStructure,'otherBuildingStructureTypeId','otherBuildingStructureType')"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.jzjglx"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in buildingStructure"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="场地名称:"
              prop="cdmc"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              v-if="detailform.contractInfo.marketFirstNameId=='50cd5e9992ac4653920fac8c1f2eb2e3'"

            >
              <el-select
                :disabled="p.actpoint==='look'"
                multiple
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.cdmc"
                @change="getMultipleName(detailform.cdmc,siteName,'siteNameId','siteName')"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in siteName"
                ></el-option>
              </el-select>
            </el-form-item>
              <el-form-item
                label="项目性质(一级):"
                prop="contractInfo.projectNatureFirstId"
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
                  @change="getTwoXZ"
                  size="mini"
                  v-model="detailform.contractInfo.projectNatureFirstId"
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
                prop="contractInfo.projectNatureSecondId"
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
                  @change="
                  getName(
                    detailform.contractInfo.projectNatureSecondId,
                    projectNatureTwo,
                    'projectNaturetSecondName'
                  )
                "
                  v-model="detailform.contractInfo.projectNatureSecondId"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectNatureTwo"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="是否为系统内联合体:"
                prop="contractInfo.isInSystemUnion"
                :rules="{
                    required: true,
                    message: '此项不能为空',
                    trigger: 'blur',
                  }"
              >
                <el-select
                  :disabled="p.actpoint==='look'"
                  clearable
                  filterable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.isInSystemUnion"
                >
                  <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="是否含系统内分包:"
                prop="contractInfo.isInSystemSub"
                :rules="{
                    required: true,
                    message: '此项不能为空',
                    trigger: 'blur',
                  }"
              >
                <el-select
                  :disabled="p.actpoint==='look'"
                  filterable
                  clearable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.isInSystemSub"
                >
                  <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="是否为系统外联合体:"
                prop="contractInfo.isOutSystemUnion"
                :rules="{
                    required: true,
                    message: '此项不能为空',
                    trigger: 'blur',
                  }"
              >
                <el-select
                  :disabled="p.actpoint==='look'"
                  clearable
                  filterable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.isOutSystemUnion"
                >
                  <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="是否含系统外分包:"
                prop="contractInfo.isOutSystemSub"
                :rules="{
                    required: true,
                    message: '此项不能为空',
                    trigger: 'blur',
                  }"
              >
                <el-select
                  :disabled="p.actpoint==='look'"
                  filterable
                  clearable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.isOutSystemSub"
                >
                  <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="detailform.contractInfo.projectNatureFirstId==='7031076e7a5f4225b1a89f31ee017802'"
                label="建安和勘察设计费(万元):"
                prop="contractInfo.installDesignFee"
                :rules="rules.contractAmount"
              >
                <el-input
                  @blur="getOther"
                  :disabled="p.actpoint === 'look'"
                  clearable
                  size="mini"
                  v-model="detailform.contractInfo.installDesignFee"/>
              </el-form-item>
              <el-form-item
                v-if="detailform.contractInfo.projectNatureFirstId==='7031076e7a5f4225b1a89f31ee017802'"
                label="其他投资(万元):"
                prop="contractInfo.otherInvest"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="true"
                  clearable
                  size="mini"
                  v-model="detailform.contractInfo.otherInvest"/>
              </el-form-item>
            <el-form-item
              v-if="detailform.contractInfo.projectNatureFirstId==='7031076e7a5f4225b1a89f31ee017802'"
              label="本企业实际应投入资本金:"
              prop="contractInfo.actualInvest"
              :rules="rules.contractAmount"
            >
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                size="mini"
                v-model="detailform.contractInfo.actualInvest"/>
            </el-form-item>
            <el-form-item
              v-if="detailform.contractInfo.projectNatureFirstId==='7031076e7a5f4225b1a89f31ee017802'"
              label="本企业建安部分已分配:"
              prop="contractInfo.installDesignAllocated"
              :rules="rules.contractAmount"
            >
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                size="mini"
                v-model="detailform.contractInfo.installDesignAllocated"/>
            </el-form-item>
            <el-form-item
              v-if="detailform.contractInfo.projectNatureFirstId==='7031076e7a5f4225b1a89f31ee017802'"
              label="本企业建安部分未分配:"
              prop="contractInfo.installDesignUnallocat"
              :rules="rules.contractAmount"
            >
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                size="mini"
                v-model="detailform.contractInfo.installDesignUnallocat"/>
            </el-form-item>
              <el-form-item
                v-if="detailform.contractInfo.isInSystemUnion==='0'"
                label="未分配(万元):"
                prop="contractInfo.unAllocatedFee"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  size="mini"
                  v-model="detailform.contractInfo.unAllocatedFee"/>
              </el-form-item>
              <el-form-item
                v-if="detailform.contractInfo.isInSystemUnion==='0'"
                label="自留份额(万元):"
                prop="contractInfo.selfCash"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  size="mini"
                  v-model="detailform.contractInfo.selfCash"/>
              </el-form-item>
              <el-form-item
                label="承揽所属机构:"

              >
                <el-select
                  :disabled="p.actpoint==='look'"
                  filterable
                  clearable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.contractOrgId"
                >
                  <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="承揽所属省市:"

              >
                <el-select
                  :disabled="p.actpoint==='look'"
                  clearable
                  filterable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.contractProvinceId"
                  @change="
                  getName(
                    detailform.contractInfo.contractProvinceId,
                    ssList,
                    'contractProvinceName'
                  )
                "
                >
                  <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in ssList"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="开工日期:"
              >
                <el-date-picker
                  :disabled="p.actpoint === 'look'"
                  filterable
                  clearable
                  type="date"
                  value-format="timestamp"
                  v-model="detailform.contractInfo.startTime"

                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                label="设计单位:"
              >
                <el-input
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform.contractInfo.designOrg"
                />
              </el-form-item>
              <el-form-item
                label="起讫地点:"
              >
                <el-input
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform.contractInfo.beginEndPlace"
                />
              </el-form-item>
              <el-form-item
                label="竣工日期:"
              >
                <el-date-picker
                  :disabled="p.actpoint === 'look'"
                  filterable
                  clearable
                  type="date"
                  value-format="timestamp"
                  v-model="detailform.contractInfo.endTime"

                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                label="录入单位:"
                prop="contractInfo.createOrgName"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform.contractInfo.createOrgName"
                />
              </el-form-item>
              <el-form-item
                label="录入时间:"
                prop="contractInfo.createTime"
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
                  v-model="detailform.contractInfo.createTime"

                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                label="合同类型:"
              >
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform.contractInfo.contractType=='2'?'补充合同':'主合同'"
                />
              </el-form-item>
              <el-form-item
                label="中标日期:"
                prop="contractInfo.bidTime"
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
                  v-model="detailform.contractInfo.bidTime"

                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                label="工期(天):"
              >
                <el-input
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform.contractInfo.contractPeriod"
                />
              </el-form-item>
              <div>
                <el-form-item
                  class="neirong"
                  label="项目内容(最多600字):"
                 >
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-input
                    type="textarea"
                    clearable
                    placeholder="请输入"
                    size="mini"
                    v-model="detailform.contractInfo.inforContent"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  class="neirong"
                  label="备注(最多600字):"
                >
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-input
                    type="textarea"
                    clearable
                    placeholder="请输入"
                    v-model="detailform.contractInfo.remarks"
                  />
                </el-form-item>
              </div>
              <p class="detail-p">
                <span>中标通知书(最大10MB): </span>

                <el-upload
                  class="upload-demo detailUpload detatil-flie-btn"
                  :action="'/api/contract/topInfo/CommonFiles/contractInfo/01/uploadFile'"
                  :on-success="handleChange1"
                  :on-error="handleChange1"
                  :on-remove="handleRemove1"
                  :show-file-list="false"
                  multiple
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </p>
                <el-table
                  :data="detailform.fileList1"
                  :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                  @selection-change="handleSelectionChange"
                  align="center"
                  border
                  class="contractInfoTable"
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
                    fixed="right"
                    label="操作"
                    show-overflow-tooltip
                    v-if="p.actpoint!=='look'"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <el-link :underline="false" @click="handleRemove1(scope.row,scope.$index)" type="warning">删除</el-link>
                    </template>
                  </el-table-column>
                </el-table>
              <p>
                <span>合同附件(最大10MB): </span>
                <el-upload
                  class="upload-demo detailUpload detatil-flie-btn"
                  :action="'/api/contract/topInfo/CommonFiles/contractInfo/02/uploadFile'"
                  :on-success="handleChange2"
                  :on-error="handleChange2"
                  :on-remove="handleRemove2"
                  :show-file-list="false"
                  multiple
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </p>
              <el-table
                :data="detailform.fileList2"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                @selection-change="handleSelectionChange"
                align="center"
                border
                class="contractInfoTable"
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
                  fixed="right"
                  label="操作"
                  show-overflow-tooltip
                  v-if="p.actpoint!=='look'"
                  width="200"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="handleRemove2(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
              <p >
                <span>工程量清单和劳材机附件(两种文件都要)(最大10MB): </span>
                <el-upload
                  class="upload-demo detailUpload detatil-flie-btn"
                  :action="'/api/contract/topInfo/CommonFiles/contractInfo/03/uploadFile'"
                  :on-success="handleChange3"
                  :on-error="handleChange3"
                  :on-remove="handleRemove3"
                  :show-file-list="false"
                  multiple
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </p>
              <el-table
                :data="detailform.fileList3"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                @selection-change="handleSelectionChange"
                align="center"
                border
                class="contractInfoTable"
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
                  fixed="right"
                  label="操作"
                  show-overflow-tooltip
                  v-if="p.actpoint!=='look'"
                  width="200"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="handleRemove3(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
              <p>
                <span >标段信息: </span>
                <el-button
                  class="detatil-flie-btn"
                  @click="openBd('add')"
                  type="primary"
                >新增</el-button >
              </p>
              <el-table
                :data="detailform.contractInfoSectionList"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                @selection-change="handleSelectionChange"
                align="center"
                border
                class="contractInfoTable"
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
                <el-table-column align="center" :width="200" :resizable="false" label="标段名称" prop="sectionName" show-overflow-tooltip>
                  <!--<template slot-scope="scope">-->
                  <!--<el-form-item-->
                  <!--:prop="'topInfoSectionList.'+scope.$index+'.inforName'"-->
                  <!--:rules="{-->
                  <!--required: true, message: '此项不能为空', trigger: 'blur'-->
                  <!--}"-->
                  <!--label-width="0"-->
                  <!--&gt;-->
                  <!--<el-input max-length=50 clearable :disabled="p.actpoint==='look'" size="mini" v-model="scope.row.inforName"></el-input>-->
                  <!--</el-form-item>-->
                  <!--&lt;!&ndash; <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> &ndash;&gt;-->
                  <!--</template>-->
                </el-table-column>

                <el-table-column align="center" :width="200" :resizable="false" label="风险费(万元)" prop="riskFee" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :width="200" :resizable="false" label="安全费(万元)" prop="safetyCost" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :width="200" :resizable="false" label="投标限价(万元)" prop="biddingPriceLimit" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :width="200" :resizable="false" label="投标保证金(万元)" prop="tenderSecurity" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :width="200" :resizable="false" label="投标价(万元)" prop="bidPrice" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :width="200" :resizable="false" label="投标费率(百分比)" prop="tenderRate" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :width="200" :resizable="false" label="开标地点" prop="openBidPlaceName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :width="200" :resizable="false" label="评标办法" prop="bidEvaluationMethodName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :width="200" :resizable="false" label="开标日期" prop="dateOfBidOpeningName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :width="200" :resizable="false" label="参与投标单位" prop="participatingUnitsName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="其他投标单位(系统内)" prop="part" show-overflow-tooltip>
                  <template slot-scope="scope">
                <span v-for="(item,index ) in scope.row.contractInfoSectionOrgList">
                    {{item.orgType==1?item.orgName:''}}
                    {{scope.row.contractInfoSectionOrgList[index+1]&& index>0&&scope.row.contractInfoSectionOrgList[index-1].orgType==1 && scope.row.contractInfoSectionOrgList[index+1].orgType==1? ',':''}}
                </span>

                  </template>
                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="其他投标单位(系统外)" prop="part" show-overflow-tooltip>
                  <template slot-scope="scope">
               <span v-for="(item,index ) in scope.row.contractInfoSectionOrgList">
                  {{item.orgType==2?item.orgName:''}}
                  {{scope.row.contractInfoSectionOrgList[index+1]&&index>0&&scope.row.contractInfoSectionOrgList[index-1].orgType==2 && scope.row.contractInfoSectionOrgList[index+1].orgType==2? ',':''}}
                </span>
                  </template>
                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="其他未列单位" prop="otherUnitsNotListed" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="项目经理" prop="projectManager" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="项目副经理" prop="deputyProjectManager	" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="技术负责人" prop="technicalDirector" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="安全负责人" prop="personInChargeOfSafety" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="财务负责人" prop="personInChargeOfFinance" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="成本负责人" prop="costOwner" show-overflow-tooltip>

                </el-table-column>

                <el-table-column
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  show-overflow-tooltip
                  v-if="p.actpoint!=='look'"
                  align="center"
                  width="100"
                >
                  <template slot-scope="scope">
                    <el-link
                      :underline="false"
                      @click="del(scope.$index,scope.row,detailform.topInfoSectionList,'bd')"
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
              <p>
                <span >项目地点: </span>
                <el-button
                  class="detatil-flie-btn"
                  @click="add('dd')"
                  type="primary"
                >新增</el-button >
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
                class="contractInfoTable"
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
                      ></el-input>
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

          </div>
      </el-tab-pane>
      <el-tab-pane v-if="detailform.contractInfo.isInSystemUnion==='0'||detailform.contractInfo.isInSystemSub==='0'||detailform.contractInfo.isOutSystemUnion==='0'||detailform.contractInfo.isOutSystemSub==='0'" label="合同附属信息">
        <div class="detailBoxBG">
          <div  v-if="detailform.contractInfo.isInSystemUnion==='0'">
            <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
              <span>系统内其他联合体单位列表: </span>
              <el-button
                v-show="p.actpoint != 'look'"
                @click="addfs('nlht',1,1)"
                size="mini"
                style="
                  width: 70px;
                  height: 32px;
                  background: #5c8bfa;
                  font-size: 16px;
                "
                type="primary"
              >新增
              </el-button
              >
            </p>
            <el-table
              :data="detailform.contractInfoAttachBO.unionContractInfoAttachList"
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
                label="单位名称"
                prop="orgName"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.orgName"
                  ></el-input>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="板块名称"
                prop="moduleName"
                align="center"
                show-overflow-tooltip
              >
                <!--<template slot-scope="scope">-->
                <!--<el-input-->
                <!--clearable-->
                <!--:disabled="p.actpoint === 'look'"-->
                <!--v-model="scope.row.contractInfoId"-->
                <!--&gt;</el-input>-->
                <!--&lt;!&ndash; <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> &ndash;&gt;-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="项目性质"
                prop="projectNature"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  系统内联合体
                </template>
              </el-table-column>
              <el-table-column
                :resizable="false"
                label="各方份额(万元)"
                align="center"
                prop="contractAmount"

                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.unionContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                    <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                    <el-input
                      @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.unionContractInfoAttachList,'nlht')"
                      v-model="scope.row.contractAmount"
                      clearable
                      :disabled="p.actpoint === 'look'"
                    ></el-input>
                  </el-form-item>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="是否为补充"
                prop="isAdd"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  否
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
                    @click="del(scope.$index,scope.row,detailform.contractInfoAttachBO.unionContractInfoAttachList,'lht')"
                    type="warning">删除
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div  v-if="detailform.contractInfo.isInSystemSub==='0'">
            <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
              <span>系统内分包单位列表: </span>
              <el-button
                v-show="p.actpoint != 'look'"
                @click="addfs('nfb',2,1)"
                size="mini"
                style="
                  width: 70px;
                  height: 32px;
                  background: #5c8bfa;
                  font-size: 16px;
                "
                type="primary"
              >新增
              </el-button
              >
            </p>
            <el-table
              :data="detailform.contractInfoAttachBO.innerContractInfoAttachList"
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
                label="单位名称"
                prop="orgName"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.orgName"
                  ></el-input>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="板块名称"
                prop="moduleName"
                align="center"
                show-overflow-tooltip
              >
                <!--<template slot-scope="scope">-->
                <!--<el-input-->
                <!--clearable-->
                <!--:disabled="p.actpoint === 'look'"-->
                <!--v-model="scope.row.contractInfoId"-->
                <!--&gt;</el-input>-->
                <!--&lt;!&ndash; <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> &ndash;&gt;-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="项目性质"
                prop="projectNature"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  系统内分包
                </template>
              </el-table-column>
              <el-table-column
                :resizable="false"
                label="各方份额(万元)"
                align="center"
                prop="contractAmount"

                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.innerContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                    <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                    <el-input
                      @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.innerContractInfoAttachList,'nfb')"
                      v-model="scope.row.contractAmount"
                      clearable
                      :disabled="p.actpoint === 'look'"
                    ></el-input>
                  </el-form-item>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="是否为补充"
                prop="isAdd"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  否
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
                    @click="del(scope.$index,scope.row,detailform.contractInfoAttachBO.innerContractInfoAttachList,'fb')"
                    type="warning">删除
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div  v-if="detailform.contractInfo.isOutSystemUnion==='0'">
            <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
              <span>系统外其他联合体单位列表: </span>
              <el-button
                v-show="p.actpoint != 'look'"
                @click="addfs('wlht',3,1)"
                size="mini"
                style="
                  width: 70px;
                  height: 32px;
                  background: #5c8bfa;
                  font-size: 16px;
                "
                type="primary"
              >新增
              </el-button
              >
            </p>
            <el-table
              :data="detailform.contractInfoAttachBO.outUnionContractInfoAttachList"
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
                label="单位名称"
                prop="orgName"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.orgName"
                  ></el-input>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="板块名称"
                prop="moduleName"
                align="center"
                show-overflow-tooltip
              >
                <!--<template slot-scope="scope">-->
                <!--<el-input-->
                <!--clearable-->
                <!--:disabled="p.actpoint === 'look'"-->
                <!--v-model="scope.row.contractInfoId"-->
                <!--&gt;</el-input>-->
                <!--&lt;!&ndash; <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> &ndash;&gt;-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="项目性质"
                prop="projectNature"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  系统外联合体
                </template>
              </el-table-column>
              <el-table-column
                :resizable="false"
                label="各方份额(万元)"
                align="center"
                prop="contractAmount"

                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.outUnionContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                    <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                    <el-input
                      @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.outUnionContractInfoAttachList,'wlht')"
                      v-model="scope.row.contractAmount"
                      clearable
                      :disabled="p.actpoint === 'look'"
                    ></el-input>
                  </el-form-item>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="是否为补充"
                prop="isAdd"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  否
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
                    @click="del(scope.$index,scope.row,detailform.contractInfoAttachBO.outUnionContractInfoAttachList,'lht')"
                    type="warning">删除
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div  v-if="detailform.contractInfo.isOutSystemSub==='0'">
            <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
              <span>系统外分包单位列表: </span>
              <el-button
                v-show="p.actpoint != 'look'"
                @click="addfs('wfb',4,1)"
                size="mini"
                style="
                  width: 70px;
                  height: 32px;
                  background: #5c8bfa;
                  font-size: 16px;
                "
                type="primary"
              >新增
              </el-button
              >
            </p>
            <el-table
              :data="detailform.contractInfoAttachBO.outContractInfoAttachList"
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
                label="单位名称"
                prop="orgName"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.orgName"
                  ></el-input>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="板块名称"
                prop="moduleName"
                align="center"
                show-overflow-tooltip
              >
                <!--<template slot-scope="scope">-->
                <!--<el-input-->
                <!--clearable-->
                <!--:disabled="p.actpoint === 'look'"-->
                <!--v-model="scope.row.contractInfoId"-->
                <!--&gt;</el-input>-->
                <!--&lt;!&ndash; <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> &ndash;&gt;-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="项目性质"
                prop="projectNature"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  系统外分包
                </template>
              </el-table-column>
              <el-table-column
                :resizable="false"
                label="各方份额(万元)"
                align="center"
                prop="contractAmount"

                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.outContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                    <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                    <el-input
                      @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.outContractInfoAttachList,'wfb')"
                      v-model="scope.row.contractAmount"
                      clearable
                      :disabled="p.actpoint === 'look'"
                    ></el-input>
                  </el-form-item>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="是否为补充"
                prop="isAdd"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  否
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
                    @click="del(scope.$index,scope.row,detailform.contractInfoAttachBO.outContractInfoAttachList,'fb')"
                    type="warning">删除
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    </el-form>
    <search-name  v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></search-name>
    <add-bd  v-if="BDCSVisible" ref="infoBD" @refreshBD="getBdInfo"></add-bd>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import { isMoney } from '@/utils/validate'
  import SearchName from '../searchName'
  import AddBd from '../addBd'
  import CompanyTree from '../companyTree'
  import datas from '@/utils/position'
export default {
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
      id:'',
      key: 0,
      treeStatas: false,
      positionIndex: '',//缓存当前的选中的项目地点的index
      infoCSVisible:false,//项目名称查询的状态
      BDCSVisible:false,//标段新增弹框状态
      DwVisible:false,//选择单位弹框状态
      options2: [],
      options: [],
      options1:[{label:"值",value:'111'}],
      detailform: {
        commonFilesList: [],
        contractInfo: {
          moduleId:'7f4fcba4255b43a8babf15afd6c04a53'
        },
        contractInfoAttachBO: {
          innerContractInfoAttachList:[],
          unionContractInfoAttachList:[],
          outUnionContractInfoAttachList:[],
          outContractInfoAttachList:[],
        },
        contractInfoSectionList: [],
        topInfoSiteList:[],
        fileList1:[],
        fileList2:[],
        fileList3:[],
        zplx:[],//装配类型
        jzlx:[],//建筑类型
        jzjglx:[],//建筑结构类型
        cdmc:[],//场地名称
      },
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
      ssList:[],//所属省市list
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      xqprojectType: [],//工程类别二级
      emergingMarketTwo:[],//新兴市场二级
      projectNatureTwo:[],//项目性质二级
      rules:{
        contractAmount: [
          { required: true,validator: validateMoney, trigger: 'change' }
        ]
      },//表单验证规则
    }
  },
  components: {
    Tree,
    SearchName,
    AddBd,
    CompanyTree
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
    constructionUnitNature(){
      return this.$store.state.constructionUnitNature;
    },
    amountSource() {
      return this.$store.state.amountSource;
    },
    assemblyType(){
      return this.$store.state.assemblyType;//装配类型
    },
    architecturalType(){
      return this.$store.state.architecturalType;//建筑类型
    },
    buildingStructure(){
      return this.$store.state.buildingStructure;//建筑结构类型
    },
    siteName(){
      return this.$store.state.siteName;//场地名称
    },
  },
  mounted() {
    var list=datas[0].children;
    list.forEach((item)=>{
      item.children.forEach((i)=>{
        var _v={
          detailName:i.detailName,
          id:i.id
        }
        this.ssList.push(_v)
      })
    })
    // this.$store.commit("setCategory", 'projectDomainType');
    this.id=this.p.instid;
    if (this.p.actpoint === "edit"||this.id) {
      this.getDetail();
    }
    this.$store.dispatch("getConfig", {});
    this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
    this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
    // eslint-disable-next-line no-unde
  },
  methods: {
    //复选下拉框框获取name
    getMultipleName(valueList,list,id,name){
      var _id=[],_name=[];
      list.forEach((item)=>{
        if(valueList.indexOf(item.id)!=-1){
        _id.push(item.id);
        _name.push(item.detailName)
      }
    });
      this.detailform.contractInfo[id]=_id.join(",");
      this.detailform.contractInfo[name]=_name.join(",");
      console.log(this.detailform.contractInfo[id])
    },
    //合同总金额获取我方份额和铁建
    getOurAmount(index,list,type){
      var tj_money=0,our_money=0;
      if(type=='wlht'||type=='nlht'){

        this.detailform.contractInfoAttachBO.outUnionContractInfoAttachList.forEach((item)=>{
          tj_money+=Number(item.contractAmount);
        });
        var ourAmount=this.detailform.contractInfo.contractAmount-tj_money;

        if(ourAmount>0){
          // this.$set( this.detailform, "contractInfo.crccCash", ourAmount);
          this.$forceUpdate();
          this.detailform.contractInfo.crccCash=ourAmount;

        }else{
          this.$message.error('铁建份额需要大于0');
          list[index].contractAmount=''
        }
        this.detailform.contractInfoAttachBO.unionContractInfoAttachList.forEach((item)=>{
          our_money+=Number(item.contractAmount);
        });
        var ourAmount2=this.detailform.contractInfo.crccCash-our_money;
        if(ourAmount2>0){
          this.$forceUpdate();
          this.detailform.contractInfo.ourAmount=ourAmount2;
          // this.$set( this.detailform, "contractInfo.ourAmount", ourAmount2);
        }else{
          this.$message.error('我方份额需要大于0');
          list[index].contractAmount=''
        }
      }else if(type=='nfb'||type=='wfb'){
        this.detailform.contractInfoAttachBO.innerContractInfoAttachList.forEach((item)=>{
          our_money+=Number(item.contractAmount);
        });
        this.detailform.contractInfoAttachBO.outContractInfoAttachList.forEach((item)=>{
          our_money+=Number(item.contractAmount);
        });
        var ourAmount=this.detailform.contractInfo.ourAmount-our_money;
        if(ourAmount<0){
          this.$message.error('我方份额需要大于0');
          list[index].contractAmount=''
        }
      }else{

        this.detailform.contractInfoAttachBO.outUnionContractInfoAttachList.forEach((item)=>{
          tj_money+=Number(item.contractAmount);
        });
        this.$forceUpdate();
        this.detailform.contractInfo.crccCash=this.detailform.contractInfo.contractAmount-tj_money;
        this.detailform.contractInfoAttachBO.unionContractInfoAttachList.forEach((item)=>{
          our_money+=Number(item.contractAmount);
        });
        this.$forceUpdate();
        this.detailform.contractInfo.ourAmount=this.detailform.contractInfo.crccCash-our_money;
      }
    },
    //获取其他投资
    getOther(){
      this.$forceUpdate();
      this.detailform.contractInfo.otherInvest=this.detailform.contractInfo.ourAmount-this.detailform.contractInfo.installDesignFee>0?this.detailform.contractInfo.ourAmount-this.detailform.contractInfo.installDesignFee:0;
    },
    handleRemove1(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
        if (res.data.code === 200) {
        this.detailform.fileList1.splice(index,1);
        }

    });
      console.log(this.detailform.fileList1)
    },
    //上传附件
    handleChange1(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
          this.detailform.fileList1.push(response.data);
      }
      })
      } else {
        this.$message.error(response.msg)
      }
    },
    handleRemove2(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
        if (res.data.code === 200) {
        this.detailform.fileList2.splice(index,1);
      }

    });
      console.log(this.detailform.fileList1)
    },
    //上传附件
    handleChange2(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
          this.detailform.fileList2.push(response.data);
      }
      })
      } else {
        this.$message.error(response.msg)
      }
    },
    handleRemove3(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
        if (res.data.code === 200) {
        this.detailform.fileList3.splice(index,1);
      }

    });
      console.log(this.detailform.fileList1)
    },
    //上传附件
    handleChange3(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
          this.detailform.fileList3.push(response.data);
      }
      })
      } else {
        this.$message.error(response.msg)
      }
    },
    //打开单位弹框
    addDw(type,list){
      this.DwVisible = true;
      this.$nextTick(() => {
        this.$refs.infoDw.init(type,list);
      })
    },
    //获取单位的值
    getDwInfo(data){
      console.log(data);
      var id=[],name=[];
      if(data){
        data.forEach((item)=>{
          id.push(item.id);
          name.push(item.detailName);
        })
      }
      if(data.type=="施工单位"){
        this.detailform.contractInfo.buildOrgIds=id.join(",");
        this.detailform.contractInfo.buildOrgNames=name.join(",");
      }else if(data.type=="使用资质单位"){
        this.detailform.contractInfo.qualityOrgIds=id.join(",");
        this.detailform.contractInfo.qualityOrgNames=name.join(",");
      }
      this.DwVisible=false;
    },
    //打开标段弹框
    openBd(type,detail,index){
      this.BDCSVisible = true;
      this.$nextTick(() => {
        this.$refs.infoBD.init(type,detail,index);
      })
    },
    //获取新增的标段
    getBdInfo(data){
      console.log(data);
      if(data.type=='add'){
        this.detailform.contractInfoSectionList.push(data)
      }else{
        this.detailform.contractInfoSectionList[data.index]=data;
      }
      this.BDCSVisible=false;
    },
    // 搜索名字
    searchName() {
      this.infoCSVisible = true;
      this.$nextTick(() => {
        this.$refs.infoCS.init();
      })
    },
    //项目名称查询回来的数据
    goAddDetail(data){
      console.log(data);
      this.infoCSVisible=false;
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
    submit() {
    },
    //工程类别二级
    getTwo(id) {
      this.detailform.contractInfo.enginTypeSecondId='';
      this.xqprojectType=[];
      if(id!=''){
        this.projectDomainType.find(
          (item) => {
          if (item.id == id) {
          this.detailform.contractInfo.enginTypeFirstName = item.detailName;
          this.xqprojectType = item.children;
        }
      }
      )
      }
    },
    //新兴市场二级
    getTwoSC(id) {
      this.detailform.contractInfo.marketSecondId='';
      this.emergingMarketTwo=[];
      if(id!=''){
        this.emergingMarket.find(
          (item)=>{
          if (item.id == id) {
          this.detailform.contractInfo.marketFirstName = item.detailName;
          this.emergingMarketTwo = item.children;
        }
      }
      )
      }
    },
    //项目性质二级
    getTwoXZ(id){
      this.detailform.contractInfo.projectNatureSecondId='';
      this.projectNatureTwo=[];
      if(id!=''){
        this.projectNature.find(
          (item)=>{
          if (item.id == id) {

          this.detailform.contractInfo.projectNatureFirstName = item.detailName;
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
        this.detailform.contractInfo[name] = list.find(
          (item) => item.id == id
      ).detailName;
        console.log(this.detailform.contractInfo[name]);
      }
    },
    saveInfo(formName) {
      this.detailform.commonFilesList=this.detailform.fileList1.concat(this.detailform.fileList2).concat(this.detailform.fileList3)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post(
              "/api/contract/contract/ContractInfo/detail/saveOrUpdate",
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
            this.$router.back()
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
            "/api/contract/contract/ContractInfo/list/deleteSection",
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
      }else if(item.uuid&&(type=='lht'||type=='fb')){
        this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http
          .post(
            "/api/contract/contract/ContractInfo/list/deleteAttach",
            {ids: [item.uuid]}
          )
          .then((res) => {
          if (res.data && res.data.code === 200) {
          list.splice(index, 1);
          this.getOurAmount()
        } else {
          this.$message.error(data.msg)
        }
      });
      }).catch(() => {})
      }else{

        list.splice(index, 1);
        this.getOurAmount()
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
    //新增附属合同
    addfs(type,projectNature,isAdd){
      var v={
        orgName:'',
        orgId:'',
        contractInfoId:'',
        projectNature:projectNature,
        contractAmount:'',
        isAdd:isAdd
      }
      if(type=='nlht'){
        this.detailform.contractInfoAttachBO.unionContractInfoAttachList.push(v);
      }else if(type=='nfb'){
        this.detailform.contractInfoAttachBO.innerContractInfoAttachList.push(v);
      }else if(type=='wlht'){
        this.detailform.contractInfoAttachBO.outUnionContractInfoAttachList.push(v);
      }else if(type=='wfb'){
        this.detailform.contractInfoAttachBO.outContractInfoAttachList.push(v);
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
      var fileList1=[],fileList2=[],fileList3=[];
      this.$http
        .post("/api/contract/contract/ContractInfo/detail/entityInfo", {id:this.id})
        .then((res) => {
        var datas=res.data.data;
          this.getTwo(datas.contractInfo.enginTypeFirstId);
          this.getTwoSC(datas.contractInfo.marketFirstNameId);
          this.getTwoXZ(datas.contractInfo.projectNatureFirstId);
          datas.commonFilesList.forEach((item) => {
            if(item.businessCode=='01'){
               fileList1.push(item)
              }else if(item.businessCode=='02'){
                fileList2.push(item)
              }else{
                fileList3.push(item)
              }
          });
          this.detailform={
            commonFilesList: datas.commonFilesList,
            contractInfo: datas.contractInfo,
            contractInfoAttachBO: datas.contractInfoAttachBO,
            contractInfoSectionList: datas.contractInfoSectionList,
            topInfoSiteList:datas.topInfoSiteList,
            fileList1:fileList1,
            fileList2:fileList2,
            fileList3:fileList3,
            zplx:[],//装配类型
            jzlx:[],//建筑类型
            jzjglx:[],//建筑结构类型
            cdmc:[],//场地名称
          }
      this.detailform.cdmc=datas.contractInfo.siteNameId&&datas.contractInfo.siteNameId.split(",");
      this.detailform.zplx=datas.contractInfo.otherAssemblyTypeId&&datas.contractInfo.otherAssemblyTypeId.split(",");
      this.detailform.jzlx=datas.contractInfo.otherBuildingTypeId&&datas.contractInfo.otherBuildingTypeId.split(",");
      this.detailform.jzjglx=datas.contractInfo.otherBuildingStructureTypeId&&datas.contractInfo.otherBuildingStructureTypeId.split(",");
    });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
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
  .detatil-flie-btn{
    margin-left: 30px;
  }
  .btn-group{
    text-align: center;
    margin-top: 20px;
  }
  .gcform {
    /*margin-top: 10px;*/
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
    .el-form-item,>>>.formItem{
      /**/
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

  .contractInfoTable {
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
  .detailUpload{
    display: inline-block;
  }
</style>
