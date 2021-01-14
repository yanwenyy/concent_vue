<!--勘察设计项目登记-->

<template>
  <div>
    <el-card>
      <div class="clearfix el-card__header">
        <span style="color: #2a2a7d;line-height: 32px"><b>勘察设计项目详情</b></span>
        <el-button @click="back" class="detailbutton">返回</el-button>
        <el-button type="primary" class="detailbutton">保存</el-button>
        <el-button @click="submitForm('detailForm')" class="detailbutton">提交</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="detailBox">
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
              style="width: 33%">
              <el-input
                clearable
                :disabled="p.actpoint === 'look'"
                placeholder="请输入"
                v-model="detailForm.project.projectName"/>
            </el-form-item>
            <el-form-item
              label="项目名称(外文):"
              prop="project.projectForeginName"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.projectForeginName"/>
            </el-form-item>
            <el-form-item
              label="项目简称:"
              prop="project.projectOmit"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
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
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
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
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                @change="getName(detailForm.project.projectNatureSecondId, projectNatureTwo, 'projectNatureSecond')"
                placeholder="请选择"
                v-model="detailForm.project.projectNatureSecondId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectNatureTwo"/>
              </el-select>
            </el-form-item>
            <el-form-item
              label="是否为联合体:"
              prop="project.isConsortion"
              style="width: 33%">
              <el-switch
                :disabled="p.actpoint === 'look'"
                class="inline-formitem-switch"
                v-model="detailForm.project.isConsortion"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="0"
                inactive-value="1"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              v-if="detailForm.project.projectNatureFirstId === '7031076e7a5f4225b1a89f31ee017802'"
              label="投资模式:"
              prop="project.investmentModelId"
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                @change="getName(detailForm.project.investmentModelId, investmentModel, 'investmentModel')"
                placeholder="请选择"
                v-model="detailForm.project.investmentModelId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in investmentModel"/>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="detailForm.project.projectNatureFirstId === '7031076e7a5f4225b1a89f31ee017802'"
              label="投资合同总额(万元):"
              prop="project.investmentContract"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.investmentContract"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              :label="detailForm.project.projectNatureFirstId === '7031076e7a5f4225b1a89f31ee017802'?'投资单位:':'承建单位:'"
              prop="project.companyBuiltName"
              style="width: 33%">
              <el-input
                clearable
                :disabled="p.actpoint === 'look'"
                placeholder="请输入"
                v-model="detailForm.project.companyBuiltName"/>
            </el-form-item>
            <el-form-item
              label="所属铁路局:"
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                @change="getName(detailForm.project.railwayId, railwayBureau, 'railwayName')"
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
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
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
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                @change="getName(detailForm.project.projectTypeSecondId, projectTypeTwo, 'projectTypeSecond')"
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
              v-if="detailForm.project.projectTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
              label="所属线路:"
              prop="project.projectLine"
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.projectLineId, railwayLine, 'projectLine')"
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
              style="width: 33%">
              <el-select
                disabled
                clearable
                filterable
                placeholder="请选择"
                @change="getName(detailForm.project.projectModuleId, projectPlate, 'projectModuleName')"
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
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                @change="resetFuDai(detailForm.project.projectTypeId, projectType, 'projectTypeName')"
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
              v-if="detailForm.project.projectTypeId==='22038e576c2242d5acc93f6c3c8e48ad'"
              label="父项目名称:"
              prop="project.fatherProjectId"
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                placeholder="请选择"
                v-model="detailForm.project.fatherProjectId">
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options1"/>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="detailForm.project.projectTypeId==='625a3ee0728a4f45b792d022b8bb36d9'"
              label="是否代局指:"
              prop="project.isBureauIndex"
              style="width: 33%">
              <el-switch
                :disabled="p.actpoint === 'look'"
                class="inline-formitem-switch"
                v-model="detailForm.project.isBureauIndex"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="0"
                inactive-value="1"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="计量单位:"
              prop="project.unitId"
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.unitId, unit, 'unitName')"
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
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.signedNumber"/>
            </el-form-item>
            <el-form-item
              label="工程合同数量:"
              prop="project.contractCount"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.contractCount"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="项目状态:"
              prop="project.projectStatusId"
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.projectStatusId, projectStatus, 'projectStatusName')"
                placeholder="请选择"
                v-model="detailForm.project.projectStatusId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectStatus"/>
              </el-select>
            </el-form-item>
            <!--所在地、使用资质单位暂无-->
            <el-form-item
              label="项目所在地"
              prop="project.qualityOrgNames"
              style="width: 33%">
              <el-input :disabled="p.actpoint === 'look'" placeholder="请输入内容"
                        v-model="detailForm.topInfoSiteList.ffName" class="input-with-select">
                <el-button slot="append" icon="el-icon-circle-plus-outline"
                           @click="addDw('项目所在地',detailForm.topInfoSiteList.ffid)"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item
              label="签约/使用资质单位:"
              prop="project.companyId"
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                v-model="detailForm.project.companyId">
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options1"/>
              </el-select>
            </el-form-item>
          </el-row>
          <!--新兴市场(一级)-->
          <el-row>
            <el-form-item
              label="新兴市场类别(一级):"
              prop="project.marketFirstId"
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
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
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.marketSecondId, emergingMarketTwo, 'marketSecondName')"
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
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.assemblyRate"/>
            </el-form-item>
            <el-form-item
              v-if="detailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
              label="装配类型:"
              prop="project.assemblyTypeId"
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
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
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
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
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
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
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
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
          <!--勘察设计里才有业务板块和实物工程量，先注释掉-->
          <!--<el-form-item-->
          <!--label="实物工程量:"-->
          <!--prop="physicalQuantity"-->
          <!--style="width: 33%">-->
          <!--<el-input-->
          <!--:disabled="p.actpoint === 'look'"-->
          <!--clearable-->
          <!--placeholder="请输入"-->
          <!--v-model="detailForm.project.physicalQuantity"/>-->
          <!--</el-form-item>-->
          <!--<el-row>-->
          <!--<el-form-item-->
          <!--label="业务板块:"-->
          <!--prop="businessId"-->
          <!--style="width: 33%">-->
          <!--<el-select-->
          <!--:disabled="p.actpoint === 'look'"-->
          <!--filterable-->
          <!--clearable-->
          <!--placeholder="请选择"-->
          <!--v-model="detailForm.project.businessId">-->
          <!--<el-option-->
          <!--:key="index"-->
          <!--:label="item.detailName"-->
          <!--:value="item.id"-->
          <!--v-for="(item, index) in bizCode"/>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-row>-->
          <!--初始合同额-->
          <el-row>
            <el-form-item
              label="初始合同额(万元):"
              prop="project.contractAmountInitial"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.contractAmountInitial"/>
            </el-form-item>
            <el-form-item
              label="工程合同额(万元):"
              prop="project.contractAmountEngine"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.contractAmountEngine"/>
            </el-form-item>
          </el-row>
          <!--合同总额(万元)-->
          <el-row>
            <el-form-item
              label="合同额增减(万元):"
              prop="project.contractAmountChange"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.contractAmountChange"/>
            </el-form-item>
            <el-form-item
              label="合同总额(万元):"
              prop="project.contractAmountTotal"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.contractAmountTotal"/>
            </el-form-item>
          </el-row>
          <!--增值税-->
          <el-row>
            <el-form-item
              label="增值税(万元):"
              prop="project.valueAddedTax"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.valueAddedTax"/>
            </el-form-item>
            <el-form-item
              label="实际投资额(万元):"
              prop="project.realInvest"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.realInvest"/>
            </el-form-item>
            <el-form-item
              label="上报产值是否含税:"
              prop="project.isOutputTax"
              style="width: 33%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                v-model="detailForm.project.isOutputTax">
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.label"
                  v-for="(item, index) in isOutputTax"/>
              </el-select>
            </el-form-item>
          </el-row>
          <!--合同开工期-->
          <el-row>
            <el-form-item
              label="合同开工日期:"
              prop="project.contractStartTime"
              style="width: 33%">
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.contractStartTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期时间"/>
            </el-form-item>
            <el-form-item
              label="合同竣工日期:"
              prop="project.contractEndTime"
              style="width: 33%">
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.contractEndTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期时间"/>
            </el-form-item>
            <el-form-item
              label="是否托管:"
              prop="project.isTrusteeship"
              style="width: 33%">
              <el-switch
                :disabled="p.actpoint === 'look'"
                class="inline-formitem-switch"
                v-model="detailForm.project.isTrusteeship"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="0"
                inactive-value="1"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="合同签订日期:"
              prop="project.contractSignTime"
              style="width: 33%">
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.contractSignTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期时间"/>
            </el-form-item>
            <el-form-item
              label="竣工日期:"
              prop="project.projectEndTime"
              style="width: 33%">
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.projectEndTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期时间"/>
            </el-form-item>
            <el-form-item
              label="是否代管:"
              prop="project.isEscrow"
              style="width: 33%">
              <el-switch
                :disabled="p.actpoint === 'look'"
                class="inline-formitem-switch"
                v-model="detailForm.project.isEscrow"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="0"
                inactive-value="1"/>
            </el-form-item>
          </el-row>
          <!--实际开工日期-->
          <el-row>
            <el-form-item
              label="实际开工日期:"
              prop="project.realStartTime"
              style="width: 33%">
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.realStartTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期时间"/>
            </el-form-item>
            <el-form-item
              label="实际竣工日期:"
              prop="project.realEndTime"
              style="width: 33%">
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.realEndTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期时间"/>
            </el-form-item>
            <el-form-item
              label="竣工产值:"
              prop="project.completedOutputValue"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
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
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.companyBuild"/>
            </el-form-item>
            <el-form-item
              label="设计单位:"
              prop="project.companyDesign"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.companyDesign"/>
            </el-form-item>
            <el-form-item
              label="监理单位:"
              prop="project.companySupervisor"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.companySupervisor"/>
            </el-form-item>
          </el-row>
          <!--项目经理-->
          <el-row>
            <el-form-item
              label="项目经理:"
              prop="project.projectManagerName"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.projectManagerName"/>
            </el-form-item>
            <el-form-item
              label="工程标段:"
              prop="project.projectBidSection"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.projectBidSection"/>
            </el-form-item>
            <el-form-item
              label="起讫地点(标段):"
              prop="project.beginAddress"
              style="width: 33%">
              <el-input
                :disabled="p.actpoint === 'look'"
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
                :disabled="p.actpoint === 'look'"
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
                :disabled="p.actpoint === 'look'"
                type="textarea"
                placeholder="请输入"
                v-model="detailForm.project.projectRemark"/>
            </el-form-item>
          </el-row>
          <!--相关附件(最多10MB)-->
          <el-row>
            <el-form-item
              label="相关附件(最多10MB):"
              prop="project.bcTypeId">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <company-tree v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
  </div>
</template>

<script>
  import CompanyTree from '../../manage/contractManager/companyTree'
  export default {
    name: 'InvestMode',
    components: {
      CompanyTree
    },
    data() {
      return {
        DwVisible: false,
        emergingMarketTwo: [], // 新兴市场二级类别
        projectTypeTwo: [], // 工程类别二级
        projectNatureTwo: [], // 项目性质二级
        isOutputTax: [{ label: '是' }, { label: '否' }], // 上报产值是否含税
        value1: '',
        options1: [{ label: '值1', value: '111' }],
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        detailForm: {
          project: {
            projectName: '', // 项目名称(中文)
            projectForeginName: '', // 项目名称(外文)
            fatherProjectId: '', // 父项目名称
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
            projectLineId: '', // 所属线路ID
            projectModuleId: '7f4fcba4255b43a8babf15afd6c04a53', // 项目板块
            businessId: '', // 业务板块
            isConsortion: '', // 是否联合体项目
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
            projectRemark: '' // 备注(最多2000字)
          },
          topInfoSiteList: [
            {
              contractAmount: 0,
              country: '1',
              ffid: '1',
              fifthId: '1',
              firstId: '1',
              fourthId: '1',
              isMain: '1',
              path: '1',
              placeId: '1',
              secondId: '1',
              thirdId: '1',
              topInfoId: '1',
              uuid: ''
            }
          ]
        },
        rules: {
          project: {
            projectName: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            projectForeginName: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
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
            valueAddedTax: [{ required: true, message: '此项不能为空', trigger: 'blur' }]
          }
        },
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p))
      }
    },
    computed: {
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
      }
    },
    methods: {
      resetFuDai(id, list, name) {
        this.detailForm.project.fatherProjectId = ''
        this.detailForm.project.isBureauIndex = ''
        this.getName(id, list, name)
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
        this.projectDomainType.find((item) => {
          if (item.id === this.detailForm.project.projectTypeFirstId) {
            this.projectTypeTwo = item.children
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
                this.projectTypeTwo = item.children
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
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除${file.name}?`)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.detailForm, formName, valid)
          if (valid) {
            this.$http
              .post(
                '/api/statistics/StatisticsProject/detail/save',
                JSON.stringify(this.detailForm),
                { useJson: true }
              )
              .then((res) => {
                if (res.data.code === 200) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                  this.$router.push({
                    path: '/statistics/project/engineList'
                  })
                } else {
                  console.log('error submit!')
                }
              })
          } else {
            console.log('error submit!')
            return false
          }
        })
      },
      back() {
        this.$router.back()
      },
      // 打开单位弹框
      addDw(type, list) {
        this.DwVisible = true
        this.$nextTick(() => {
          this.$refs.infoDw.init(type, list)
        })
      },
      // 获取所在地的值
      getDwInfo(data) {
        console.log(data)
        let id = []
        let name = []
        if (data) {
          data.forEach((item) => {
            id.push(item.id)
            name.push(item.detailName)
          })
        }
        if (data.type === '项目所在地') {
          this.detailForm.topInfoSiteList.ffid = id.join(',')
          this.detailForm.topInfoSiteList.ffName = name.join(',')
        }
        // else if(data.type=="使用资质单位"){
        //   this.detailform.contractInfo.qualityOrgIds=id.join(",");
        //   this.detailform.contractInfo.qualityOrgNames=name.join(",");
        // }
        this.DwVisible = false
      },
      getShow() {
        let data = { topInfoId: this.p.uuid }
        this.$http
          .post('/api/statistics/StatisticsProject/detail/entityInfo', data)
          .then((res) => {
            if (res.data.code === 200) {
              this.detailForm.project = res.data.data.project
              this.detailForm.topInfoSiteList = res.data.data.topInfoSiteList
              this.getShowTwo()
            }
          })
      }
    },
    mounted() {
      if (this.p.actpoint === 'look' || this.p.actpoint === 'edit') {
        this.getShow()
      }
      this.$store.dispatch('getConfig', {})
      this.$store.dispatch('getCategory', { name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3' })
      this.$store.dispatch('getCategory', { name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e' })
      this.$store.dispatch('getCategory', { name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72' })
    }
  }
</script>
<style lang="scss" scoped>
  .gcform {
    > > > .el-form-item__error {
      padding-top: 0px;
      width: 95%;
      margin-left: 0;
      text-align: right;
      top: 0%;
    }

    > > > .el-form-item__label:before {
      position: initial;
      left: -10px;
    }

    .el-form-item {
      float: left;

      .el-input {
        width: 95%;
      }

      .el-select {
        width: 95%;
      }
    }
  }
</style>
