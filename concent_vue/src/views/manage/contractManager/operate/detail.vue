<template>
  <div style="position: relative">
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailform','save')" class="detailbutton detail-back-tab save-btn">保存</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.contractInfo.flowStatus==1||detailform.contractInfo.flowStatus==4)" @click="saveInfo('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <el-button class="detail-back-tab" @click="back" type="text">返回</el-button>
    <el-form
      :inline="false"
      :model="detailform"
      :rules="rules"
      class="gcform"
      ref="detailform"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="运营维管新增">
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
                <el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId" placeholder="请输入内容" v-model="detailform.contractInfo.inforName" class="input-with-select">
                  <el-button v-if="detailform.contractInfo.contractType!='2'&&p.actpoint!='task'&&p.actpoint!='look'" slot="append" icon="el-icon-search" @click="searchName"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                label="项目名称(外文):"
                prop="contractInfo.inforNameForeign"
              >
                <el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId" placeholder="请输入内容" v-model="detailform.contractInfo.inforNameForeign" class="input-with-select">

                </el-input>
              </el-form-item>
              <br>
              <el-form-item
                label="合同名称(中文):"
                prop="contractInfo.contractName"
                :rules="{
           required: true, message: '此项不能为空', trigger: 'blur'
        }"
              >
                <!--<el-input-->
                  <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                  <!--clearable-->
                  <!--placeholder="请输入"-->
                  <!--size="mini"-->
                  <!--v-model="detailform.contractInfo.contractName"-->
                <!--/>-->
                <el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId" placeholder="请输入内容" v-model="detailform.contractInfo.contractName" class="input-with-select">
                  <el-button v-if="detailform.contractInfo.contractType=='2'" slot="append" icon="el-icon-search" @click="searchName"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                label="合同名称(外文):"
                prop="contractInfo.contractNameForeign"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform.contractInfo.contractNameForeign"
                />
              </el-form-item>
              <el-form-item
                label="合同编号:"
                prop="contractInfo.contractCode"
              >
                <el-input
                  disabled
                  clearable
                  placeholder="保存后系统自动生成"
                  size="mini"
                  v-model="detailform.contractInfo.contractCode"
                />
              </el-form-item>
              <el-form-item
                label="合同签定日期:"
                prop="contractInfo.contractSignTime"
              >
                <el-date-picker
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  v-model="detailform.contractInfo.contractSignTime"
                  size="mini"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item
                label="客户名称:"
                prop="contractInfo.constructionOrg"
                :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
              >
                <el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'" placeholder="请输入内容" v-model="detailform.contractInfo.constructionOrg" class="input-with-select">

                </el-input>
              </el-form-item>
              <el-form-item
                v-if="false"
                label="乙方单位:"
                prop="contractInfo.buildOrgNames"
                :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
              >
                <el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'" placeholder="请输入内容" v-model="detailform.contractInfo.buildOrgNames" class="input-with-select">

                </el-input>
              </el-form-item>
<br>
              <el-form-item
                class="inline-formitem form-item-five"
                label="是否为系统内联合体"
              >
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isInSystemUnion"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"
                  @change="changeMoney('unionContractInfoAttachList','nlht')"
                >
                </el-switch>
                <!--<el-select-->
                <!--:disabled="p.actpoint==='look'"-->
                <!--clearable-->
                <!--filterable-->
                <!--placeholder="请选择"-->

                <!--v-model="detailform.contractInfo.isInSystemUnion"-->
                <!--&gt;-->
                <!--<el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>-->
                <!--</el-select>-->
              </el-form-item>
              <el-form-item
                class="inline-formitem form-item-five"
                label="是否含系统内分包"
              >
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isInSystemSub"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"
                  @change="changeMoney('innerContractInfoAttachList','nfb')"
                >
                </el-switch>
                <!--<el-select-->
                <!--:disabled="p.actpoint==='look'"-->
                <!--filterable-->
                <!--clearable-->
                <!--placeholder="请选择"-->

                <!--v-model="detailform.contractInfo.isInSystemSub"-->
                <!--&gt;-->
                <!--<el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>-->
                <!--</el-select>-->
              </el-form-item>
              <el-form-item
                class="inline-formitem form-item-five"
                label="是否为系统外联合体"
              >
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isOutSystemUnion"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"
                  @change="changeMoney('outUnionContractInfoAttachList','wlht')"
                >
                </el-switch>
                <!--<el-select-->
                <!--:disabled="p.actpoint==='look'"-->
                <!--clearable-->
                <!--filterable-->
                <!--placeholder="请选择"-->

                <!--v-model="detailform.contractInfo.isOutSystemUnion"-->
                <!--&gt;-->
                <!--<el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>-->
                <!--</el-select>-->
              </el-form-item>
              <el-form-item
                class="inline-formitem form-item-five"
                label="是否含系统外分包:"
              >
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isOutSystemSub"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"
                  @change="changeMoney('outUnionContractInfoAttachList','wfb')"
                >
                </el-switch>
                <!--<el-select-->
                <!--:disabled="p.actpoint==='look'"-->
                <!--filterable-->
                <!--clearable-->
                <!--placeholder="请选择"-->

                <!--v-model="detailform.contractInfo.isOutSystemSub"-->
                <!--&gt;-->
                <!--<el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>-->
                <!--</el-select>-->
              </el-form-item>
              <el-form-item
                class="inline-formitem form-item-five"
                label="是否集团内分包:"
              >
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isInGroupSub"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"
                  @change="changeMoney('innerGroupContractInfoAttachList','jtnfb')"
                >
                </el-switch>
                <!--<el-select-->
                <!--:disabled="p.actpoint==='look'"-->
                <!--filterable-->
                <!--clearable-->
                <!--placeholder="请选择"-->

                <!--v-model="detailform.contractInfo.isOutSystemSub"-->
                <!--&gt;-->
                <!--<el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>-->
                <!--</el-select>-->
              </el-form-item>
              <br>
              <el-form-item
                label="合同总金额(万元)"
                prop="contractInfo.contractAmount"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  @input="getOurAmount(),getOurAmount('','','nfb')"
                  clearable
                  placeholder=""

                  v-model="detailform.contractInfo.contractAmount"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                label="铁建金额(万元)"
                prop="contractInfo.crccCash"
              >
                <el-input
                  :disabled="true"
                  v-model="detailform.contractInfo.crccCash"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                v-if="detailform.contractInfo.isOutSystemUnion==='0'"
                label="系统外份额(万元)"
                prop="contractInfo.outSystemAmount"
                :rules="rules.contractAmount"

              >
                <el-input
                  disabled
                  clearable
                  placeholder=""

                  v-model="detailform.contractInfo.outSystemAmount"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <br>
              <el-form-item
                v-if="detailform.contractInfo.contractType!='2'"
                label="我方份额含补充(万元)"
              >
                <el-input
                  :disabled="true"
                  v-model="detailform.contractInfo.ourAmountSupply"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                label="初始我方份额(万元)"
                prop="contractInfo.ourAmount"
              >
                <el-input
                  :disabled="true"
                  v-model="detailform.contractInfo.ourAmount"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                label="增值税(万元)"
                prop="contractInfo.valueAddedTax"
                :rules="rules.contractAmount"

              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  placeholder=""

                  v-model="detailform.contractInfo.valueAddedTax"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <br>

              <el-form-item
                v-if="detailform.contractInfo.isInSystemSub==='0'||detailform.contractInfo.isInGroupSub==='0'||detailform.contractInfo.isOutSystemSub==='0'"
                label="未分配(万元)"
                prop="contractInfo.unAllocatedFee"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  @input="getOurAmount('','','nfb','unAllocatedFee')"
                  v-model="detailform.contractInfo.unAllocatedFee">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                v-if="detailform.contractInfo.isInSystemSub==='0'||detailform.contractInfo.isInGroupSub==='0'||detailform.contractInfo.isOutSystemSub==='0'"
                label="自留份额(万元)"
                prop="contractInfo.selfCash"
                :rules="rules.contractAmount"
              >
                <el-input
                  disabled
                  clearable
                  v-model="detailform.contractInfo.selfCash">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                v-if="detailform.contractInfo.isInSystemUnion==='1'"
                label="暂定金(万元)"
                prop="contractInfo.designTempPrice"
                :rules="rules.contractAmount"

              >
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  clearable
                  placeholder=""

                  v-model="detailform.contractInfo.designTempPrice"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <br>
              <el-form-item
                label="签约单位（使用资质单位）:"
                prop="contractInfo.signOrgName"
                :rules="{
      required: true, message: '此项不能为空', trigger: ['blur','change']
    }"
              >
                <el-input clearable :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId" placeholder="请输入内容" v-model="detailform.contractInfo.signOrgName" class="input-with-select">
                  <el-button v-if="p.actpoint !== 'look'&&p.actpoint!='task'&&!p.pushId" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('签约单位',detailform.contractInfo.signOrgId)" ></el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                label="合同类型:"
                prop="contractInfo.enginTypeFirstId"
                :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
              >
                <el-select
                  :disabled="p.actpoint==='look'||p.actpoint==='task'"
                  clearable
                  filterable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.enginTypeFirstId"
                  @change="
                  getName(
                    detailform.contractInfo.enginTypeFirstId,
                    contractType,
                    'enginTypeFirstName',
                    'enginTypeFirstCode'
                  )
                "
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in contractType"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="业务类别:"
                prop="contractInfo.businessTypeId"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"

              >
                <el-select
                  :disabled="p.actpoint==='look'||p.actpoint==='task'"
                  filterable
                  clearable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.businessTypeId"
                  @change="
                  getName(
                    detailform.contractInfo.businessTypeId,
                    bizTypeCode,
                    'businessType',
                    'businessTypeCode'
                  )
                "
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in bizTypeCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br>
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
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
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
                trigger: ['blur','change']
              }:{}"
              >

                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
                  filterable
                  clearable
                  placeholder="请选择"
                  @clear="clear(detailform.contractInfo.marketSecondId,detailform.contractInfo.marketSecondName)"
                  @change="
                    getName(
                      detailform.contractInfo.marketSecondId,
                      emergingMarketTwo,
                      'marketSecondName',
                      'marketSecondCode'
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
                  class="multiple-sel"
                  :disabled="p.actpoint==='look'||p.actpoint==='task'"
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
                  class="multiple-sel"
                  :disabled="p.actpoint==='look'||p.actpoint==='task'"
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
              <div>
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
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    size="mini"
                    v-model="detailform.contractInfo.otherAssemblyRate"
                  />
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
                    class="multiple-sel"
                    :disabled="p.actpoint==='look'||p.actpoint==='task'"
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
                    class="multiple-sel"
                    :disabled="p.actpoint==='look'||p.actpoint==='task'"
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

              </div>
              <el-form-item
                class="inline-formitem"
                label="是否年度合同:"
                prop="contractInfo.isYearContract"
                :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
              >
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isYearContract"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"
                >
                </el-switch>
              </el-form-item>
              <el-form-item
                class="inline-formitem"
                label="是否公开招标:"
                prop="contractInfo.isOpenBid"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isOpenBid"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="1"
                  inactive-value="0"
                >
                </el-switch>
              </el-form-item>
              <el-form-item
                class="inline-formitem"
                label="客户性质:"
                prop="contractInfo.customerNatureId"
                :rules="{
               required: true, message: '此项不能为空', trigger: 'blur'
            }"

              >
                <el-select
                  class="multiple-sel"
                  :disabled="p.actpoint==='look'||p.actpoint=='task'"
                  @change="getName(detailform.contractInfo.customerNatureId,customerNature ,'customerNature')"
                  clearable
                  filterable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.customerNatureId"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in customerNature"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="detailform.contractInfo.customerNatureId=='9f19652f27a911ebad4bc5ee92e1a03f'"
                class="inline-formitem"
                label="所属央企:"
                prop="contractInfo.belongEnterPrisesId"
                :rules="{
               required: true, message: '此项不能为空', trigger: 'blur'
            }"

              >
                <el-select
                  class="multiple-sel"
                  :disabled="p.actpoint==='look'||p.actpoint=='task'||p.pushId"
                  @change="getName(detailform.contractInfo.belongEnterPrisesId,yqList ,'belongEnterPrises')"
                  clearable
                  filterable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.belongEnterPrisesId"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in yqList"
                  ></el-option>
                </el-select>
              </el-form-item>
              <div>
                <el-form-item
                  class="neirong not-error"
                  label="中标公示网站"
                  prop="contractInfo.bidNoticeWebsite"
                  :rules="rules.bidNoticeWebsite"
                >
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    type="textarea"
                    clearable
                    placeholder="请输入"

                    v-model="detailform.contractInfo.bidNoticeWebsite"
                  />
                </el-form-item>
              </div>
              <p><span >证明文件: </span>
                <el-button
                  v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                  size="small"
                  type="primary"
                  @click="openFileUp('/api/contract/topInfo/CommonFiles/contractInfo/01/uploadFile','commonFilesList1')">
                  点击上传
                </el-button>
                <!--<el-upload-->
                  <!--v-show="p.actpoint != 'look'"-->
                  <!--class="upload-demo detailUpload detatil-flie-btn"-->
                  <!--:action="'/api/contract/topInfo/CommonFiles/contractInfo/01/uploadFile'"-->
                  <!--:on-success="handleChange1"-->
                  <!--:on-error="handleChange1"-->
                  <!--:on-remove="handleRemove1"-->
                  <!--:show-file-list="false"-->
                  <!--multiple-->
                <!--&gt;-->
                  <!--<el-button size="small" type="primary">点击上传</el-button>-->
                <!--</el-upload>-->
              </p>
              <el-table
                :data="detailform.commonFilesList1"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"

                @selection-change="handleSelectionChange"
                align="center"
                border
                class="detailTable"
                ref="table"
                style="width: 100%;min-height: calc(100vh - 370px);"
              >
                <el-table-column
                  :width="55"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column align="center"  :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

                </el-table-column>

                <el-table-column
                  align="center"
                  :resizable="false"
                  label="操作"
                  show-overflow-tooltip
                  v-if="p.actpoint!=='look'&&p.actpoint!=='task'"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="handleRemove1(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
              <p><span >招标公告文件: </span>
                <el-button
                  v-show="p.actpoint !== 'look'&&p.actpoint!='task'&&p.actpoint!='Yjedit'"
                  size="small"
                  type="primary"
                  @click="openFileUp('/api/contract/topInfo/CommonFiles/contractInfo/02/uploadFile','commonFilesList2')">
                  点击上传
                </el-button>
                <!--<el-upload-->
                <!--v-show="p.actpoint != 'look'"-->
                <!--class="upload-demo detailUpload detatil-flie-btn"-->
                <!--:action="'/api/contract/topInfo/CommonFiles/contractInfo/01/uploadFile'"-->
                <!--:on-success="handleChange1"-->
                <!--:on-error="handleChange1"-->
                <!--:on-remove="handleRemove1"-->
                <!--:show-file-list="false"-->
                <!--multiple-->
                <!--&gt;-->
                <!--<el-button size="small" type="primary">点击上传</el-button>-->
                <!--</el-upload>-->
              </p>
              <el-table
                :data="detailform.commonFilesList2"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"

                @selection-change="handleSelectionChange"
                align="center"
                border
                class="detailTable"
                ref="table"
                style="width: 100%;min-height: calc(100vh - 370px);"
              >
                <el-table-column
                  :width="55"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column align="center"  :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

                </el-table-column>

                <el-table-column
                  align="center"
                  :resizable="false"
                  label="操作"
                  show-overflow-tooltip
                  v-if="p.actpoint!=='look'&&p.actpoint!='Yjedit'&&p.actpoint!='task'"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="handleRemove2(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
              <p>
                <span >项目地点: </span>
                <el-button
                  v-show="p.actpoint != 'look'&&p.actpoint !== 'task'&&!p.pushId"
                  class="detatil-flie-btn"
                  @click="add('dd'),checkTopInfoSiteList()"
                  type="primary"
                >新增</el-button >
                <span class="red" v-if="topInfoSiteListDifferent">合同地点与关联项目地点不一致</span>
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
                    <i class="el-icon-circle-plus"  v-show="p.actpoint != 'look'&&p.actpoint !== 'task'" @click="selectPosition(),positionIndex=scope.$index"></i><span>{{scope.row.path}}</span>
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
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        v-model="scope.row.contractAmount"
                        @input="checkTopInfoSiteList()"
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
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
                      class="inline-formitem-switch"
                      v-model="scope.row.isMain"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="1"
                      inactive-value="0"
                      @change="setMain(scope.$index,detailform.topInfoSiteList),checkTopInfoSiteList()"
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
                  v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'&&!p.pushId"
                >
                  <template slot-scope="scope">
                    <el-link
                      :underline="false"
                      @click="del(scope.$index,scope.row,detailform.topInfoSiteList),checkTopInfoSiteList()"
                      type="warning"
                    >删除
                    </el-link
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div v-if="detailform.contractInfo.isYearContract=='0'">
                <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
                  <span>年度合同收益:</span>
                  <el-button
                    v-show="p.actpoint != 'look'&&p.actpoint !== 'task'"
                    @click="addXs()"
                    class="upload-demo detailUpload detatil-flie-btn"
                    type="primary"
                  >新增
                  </el-button
                  >
                </p>
                <el-table
                  :data="detailform.contractInfoHouseSalesList"
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
                  style="width: 100%; min-height: calc(100vh - 370px)"
                >
                  <el-table-column
                    :width="80"
                    align="center"
                    label="序号"
                    type="index"
                  ></el-table-column>

                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="年份"
                    prop="salesPerforYear"
                    align="center"
                    width="150"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <el-date-picker
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        v-model="scope.row.salesPerforYear"
                        type="year"
                        value-format="yyyy"
                        placeholder="选择年">
                      </el-date-picker>
                      <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="月份"
                    width="150"
                    prop="salesPerforMonth"
                    align="center"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <el-date-picker
                        @change="checkRepeat(scope.row.salesPerforMonth,scope.row.salesPerforYear,detailform.contractInfoHouseSalesList,scope.$index)"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        v-model="scope.row.salesPerforMonth"
                        type="month"
                        format="MM"
                        value-format="MM"
                        placeholder="选择月">
                      </el-date-picker>
                      <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                    </template>
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="本月收益(万元)"
                    align="center"
                    prop="monthSales"
                    width="400"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <el-form-item class="tabelForm" :prop="'contractInfoHouseSalesList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                        <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                        <el-input
                          @blur="setYearSale(scope.row.salesPerforYear)"
                          v-model="scope.row.contractAmount"
                          clearable
                          :disabled="p.actpoint === 'look'||p.actpoint=='task'"
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
                    label="年累(万元)"
                    align="center"
                    prop="yearSales"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{scope.row.totalAmount}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="操作"
                    align="center"
                    show-overflow-tooltip
                    v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                    width="80">
                    <template slot-scope="scope">
                      <el-link
                        :underline="false"
                        @click="del(scope.$index,scope.row,detailform.contractInfoHouseSalesList,'yj')"
                        type="warning">删除
                      </el-link>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
        </el-tab-pane>
        <el-tab-pane v-if="detailform.contractInfo.isInSystemUnion==='0'||detailform.contractInfo.isInSystemSub==='0'||detailform.contractInfo.isOutSystemUnion==='0'||detailform.contractInfo.isOutSystemSub==='0'||detailform.contractInfo.isInGroupSub==='0'" label="合同附属信息">
          <div class="detailBoxBG htfs">
            <div  v-if="detailform.contractInfo.isInSystemUnion==='0'">
              <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                <span>系统内其他联合体单位列表: </span>
                <el-button
                  v-show="p.actpoint != 'look'"
                  @click="addfs('nlht',1,1)"

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
                  label="单位名称"
                  prop="orgName"
                  align="center"
                  width="300"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      clearable
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      v-model="scope.row.orgName"
                      class="input-el-input-group">
                      <el-button slot="append" icon="el-icon-circle-plus-outline"  @click="addDw('单位名称','',false,scope.$index,'unionContractInfoAttachList')" ></el-button>
                    </el-input>
                    <!--<el-input-->
                    <!--class="input-el-input-group"-->
                    <!--clearable-->
                    <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                    <!--v-model="scope.row.orgName"-->
                    <!--&gt;</el-input>-->
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="板块名称"
                  prop="moduleName"
                  align="center"
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      class="input-el-input-group"
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable
                      filterable
                      placeholder="请选择"
                      size="mini"
                      v-model="scope.row.moduleId"
                      @change="
                    getBdName(
                      scope.row.moduleId,
                      detailform.contractInfoAttachBO.unionContractInfoAttachList,
                      scope.$index
                    )
                  "
                    >
                      <el-option
                        :key="index"
                        :label="item.detailName"
                        :value="item.id"
                        v-for="(item, index) in projectPlate"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="项目性质"
                  prop="projectNature"
                  width="150"
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
                  width="400"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.unionContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                      <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                      <el-input
                        class="group-no-padding"
                        @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.unionContractInfoAttachList,'nlht')"
                        v-model="scope.row.contractAmount"
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      >
                        <template slot="prepend">¥</template>
                        <template slot="append">(万元)</template>
                      </el-input>
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
                  width="100"
                >
                  <template slot-scope="scope">
                    <el-switch
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      class="inline-formitem-switch"
                      v-model="scope.row.isAdd"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="0"
                      inactive-value="1"
                    >
                    </el-switch>
                    <!--{{scope.row.isAdd=='1'?'否':'是'}}-->
                  </template>
                </el-table-column>
                <el-table-column
                  v-show="!p.actpoint === 'look'"
                  :resizable="false"
                  label="操作"
                  align="center"
                  show-overflow-tooltip
                  v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                  width="80">
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
              <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                <span>系统内分包单位列表: </span>
                <el-button
                  v-show="p.actpoint != 'look'"
                  @click="addfs('nfb',2,1)"

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
                  label="单位名称"
                  prop="orgName"
                  align="center"
                  width="300"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      clearable
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      v-model="scope.row.orgName"
                      class="input-el-input-group">
                      <el-button v-if="p.actpoint !== 'look'&&p.actpoint!='task'" slot="append" icon="el-icon-circle-plus-outline"  @click="addDw('单位名称','',false,scope.$index,'innerContractInfoAttachList')" ></el-button>
                    </el-input>
                    <!--<el-input-->
                    <!--class="input-el-input-group"-->
                    <!--clearable-->
                    <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                    <!--v-model="scope.row.orgName"-->
                    <!--&gt;</el-input>-->
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="板块名称"
                  prop="moduleName"
                  align="center"
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      class="input-el-input-group"
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable
                      filterable
                      placeholder="请选择"
                      size="mini"
                      v-model="scope.row.moduleId"
                      @change="
                    getBdName(
                      scope.row.moduleId,
                      detailform.contractInfoAttachBO.innerContractInfoAttachList,
                      scope.$index
                    )
                  "
                    >
                      <el-option
                        :key="index"
                        :label="item.detailName"
                        :value="item.id"
                        v-for="(item, index) in projectPlate"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="项目性质"
                  prop="projectNature"
                  align="center"
                  width="150"
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
                  width="400"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.innerContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                      <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                      <el-input
                        class="group-no-padding"
                        @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.innerContractInfoAttachList,'nfb')"
                        v-model="scope.row.contractAmount"
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      >
                        <template slot="prepend">¥</template>
                        <template slot="append">(万元)</template>
                      </el-input>
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
                  width="100"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-switch
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      class="inline-formitem-switch"
                      v-model="scope.row.isAdd"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="0"
                      inactive-value="1"
                    >
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                  v-show="!p.actpoint === 'look'"
                  :resizable="false"
                  label="操作"
                  align="center"
                  show-overflow-tooltip
                  v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                  width="80">
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
              <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                <span>系统外其他联合体单位列表: </span>
                <el-button
                  v-show="p.actpoint != 'look'"
                  @click="addfs('wlht',3,1)"

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
                  label="单位名称"
                  prop="orgName"
                  align="center"
                  width="300"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      class="input-el-input-group"
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable
                      filterable
                      placeholder="请选择"
                      size="mini"
                      v-model="scope.row.orgId"
                      @change="
                    getXtwName(
                      scope.row.orgId,
                      sjdwList,
                      scope.$index
                    )
                  "
                    >
                      <el-option
                        :key="index"
                        :label="item.detailName"
                        :value="item.id"
                        v-for="(item, index) in sjdwList"
                      ></el-option>
                    </el-select>
                    <!--<el-input-->
                    <!--clearable-->
                    <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                    <!--v-model="scope.row.orgName"-->
                    <!--class="input-el-input-group">-->
                    <!--<el-button slot="append" icon="el-icon-circle-plus-outline"  @click="addDw('单位名称','',false,scope.$index,'outUnionContractInfoAttachList')" ></el-button>-->
                    <!--</el-input>-->


                    <!--<el-input-->
                    <!--class="input-el-input-group"-->
                    <!--clearable-->
                    <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                    <!--v-model="scope.row.orgName"-->
                    <!--&gt;</el-input>-->
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="板块名称"
                  prop="moduleName"
                  align="center"
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      class="input-el-input-group"
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable
                      filterable
                      placeholder="请选择"
                      size="mini"
                      v-model="scope.row.moduleId"
                      @change="
                    getBdName(
                      scope.row.moduleId,
                      detailform.contractInfoAttachBO.outUnionContractInfoAttachList,
                      scope.$index
                    )
                  "
                    >
                      <el-option
                        :key="index"
                        :label="item.detailName"
                        :value="item.id"
                        v-for="(item, index) in projectPlate"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="项目性质"
                  prop="projectNature"
                  align="center"
                  width="150"
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
                  width="400"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.outUnionContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                      <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                      <el-input
                        class="group-no-padding"
                        @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.outUnionContractInfoAttachList,'wlht')"
                        v-model="scope.row.contractAmount"
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      >
                        <template slot="prepend">¥</template>
                        <template slot="append">(万元)</template>
                      </el-input>
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
                  width="100"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-switch
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      class="inline-formitem-switch"
                      v-model="scope.row.isAdd"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="0"
                      inactive-value="1"
                    >
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                  v-show="!p.actpoint === 'look'"
                  :resizable="false"
                  label="操作"
                  align="center"
                  show-overflow-tooltip
                  v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                  width="80">
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
              <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                <span>系统外分包单位列表: </span>
                <el-button
                  v-show="p.actpoint != 'look'"
                  @click="addfs('wfb',4,1)"

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
                  label="单位名称"
                  prop="orgName"
                  align="center"
                  width="300"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      class="input-el-input-group"
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable
                      filterable
                      placeholder="请选择"
                      size="mini"
                      v-model="scope.row.orgId"
                      @change="
                    getXtwName(
                      scope.row.orgId,
                      sjdwList,
                      scope.$index
                    )
                  "
                    >
                      <el-option
                        :key="index"
                        :label="item.detailName"
                        :value="item.id"
                        v-for="(item, index) in sjdwList"
                      ></el-option>
                    </el-select>
                    <!--<el-input-->
                    <!--clearable-->
                    <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                    <!--v-model="scope.row.orgName"-->
                    <!--class="input-el-input-group">-->
                    <!--<el-button slot="append" icon="el-icon-circle-plus-outline"  @click="addDw('单位名称','',false,scope.$index,'outContractInfoAttachList')" ></el-button>-->
                    <!--</el-input>-->


                    <!--<el-input-->
                    <!--class="input-el-input-group"-->
                    <!--clearable-->
                    <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                    <!--v-model="scope.row.orgName"-->
                    <!--&gt;</el-input>-->
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="板块名称"
                  prop="moduleName"
                  align="center"
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      class="input-el-input-group"
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable
                      filterable
                      placeholder="请选择"
                      size="mini"
                      v-model="scope.row.moduleId"
                      @change="
                    getBdName(
                      scope.row.moduleId,
                      detailform.contractInfoAttachBO.outContractInfoAttachList,
                      scope.$index
                    )
                  "
                    >
                      <el-option
                        :key="index"
                        :label="item.detailName"
                        :value="item.id"
                        v-for="(item, index) in projectPlate"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="项目性质"
                  prop="projectNature"
                  align="center"
                  show-overflow-tooltip
                  width="150"
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
                  width="400"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.outContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                      <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                      <el-input
                        class="group-no-padding"
                        @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.outContractInfoAttachList,'wfb')"
                        v-model="scope.row.contractAmount"
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      >
                        <template slot="prepend">¥</template>
                        <template slot="append">(万元)</template>
                      </el-input>
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
                  width="100"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-switch
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      class="inline-formitem-switch"
                      v-model="scope.row.isAdd"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="0"
                      inactive-value="1"
                    >
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                  v-show="!p.actpoint === 'look'"
                  :resizable="false"
                  label="操作"
                  align="center"
                  show-overflow-tooltip
                  v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                  width="80">
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
            <div  v-if="detailform.contractInfo.isInGroupSub==='0'">
              <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                <span>集团内分包单位列表: </span>
                <el-button
                  v-show="p.actpoint != 'look'"
                  @click="addfs('jtfb',5,1)"

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
                :data="detailform.contractInfoAttachBO.innerGroupContractInfoAttachList"
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
                  label="单位名称"
                  prop="orgName"
                  align="center"
                  width="300"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      clearable
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      v-model="scope.row.orgName"
                      class="input-el-input-group">
                      <el-button v-if="p.actpoint !== 'look'&&p.actpoint!='task'" slot="append" icon="el-icon-circle-plus-outline"  @click="addDw('单位名称','',false,scope.$index,'innerGroupContractInfoAttachList')" ></el-button>
                    </el-input>
                    <!--<el-input-->
                    <!--class="input-el-input-group"-->
                    <!--clearable-->
                    <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                    <!--v-model="scope.row.orgName"-->
                    <!--&gt;</el-input>-->
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="板块名称"
                  prop="moduleName"
                  align="center"
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      class="input-el-input-group"
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable
                      filterable
                      placeholder="请选择"
                      size="mini"
                      v-model="scope.row.moduleId"
                      @change="
                    getBdName(
                      scope.row.moduleId,
                      detailform.contractInfoAttachBO.innerGroupContractInfoAttachList,
                      scope.$index
                    )
                  "
                    >
                      <el-option
                        :key="index"
                        :label="item.detailName"
                        :value="item.id"
                        v-for="(item, index) in projectPlate"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="项目性质"
                  prop="projectNature"
                  align="center"
                  show-overflow-tooltip
                  width="150"
                >
                  <template slot-scope="scope">
                    集团内分包
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="各方份额(万元)"
                  align="center"
                  prop="contractAmount"
                  width="400"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.innerGroupContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                      <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                      <el-input
                        class="group-no-padding"
                        v-model="scope.row.contractAmount"
                        @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.innerGroupContractInfoAttachList,'jtnfb')"
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      >
                        <template slot="prepend">¥</template>
                        <template slot="append">(万元)</template>
                      </el-input>
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
                  width="100"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-switch
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      class="inline-formitem-switch"
                      v-model="scope.row.isAdd"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="0"
                      inactive-value="1"
                    >
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                  v-show="!p.actpoint === 'look'"
                  :resizable="false"
                  label="操作"
                  align="center"
                  show-overflow-tooltip
                  v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                  width="80">
                  <template slot-scope="scope">
                    <el-link
                      :underline="false"
                      @click="del(scope.$index,scope.row,detailform.contractInfoAttachBO.innerGroupContractInfoAttachList,'fb')"
                      type="warning">删除
                    </el-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'">
          <Audit-Process :task="p.task||{businessId:p.instid,businessType:' contract_contract_new'}"></Audit-Process>
        </el-tab-pane>
      </el-tabs>

    </el-form>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
    <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
    <search-name  v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></search-name>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import CompanyTree from '../companyTree'
  import { isMoney  ,isURL} from '@/utils/validate'
  import FileUpload from '@/components/fileUpload'
  import SearchName from '../searchName'
  import AuditProcess from '@/components/auditProcess'
  export default {
    data() {
      var validateMoney = (rule, value, callback) => {
        console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (value!=null&&!isMoney(value)) {
          callback(new Error('请输入正确的金额格式'))
        } else {
          callback()
        }
      };
      var validateUrl = (rule, value, callback) => {
        // console.log(value)
        if (value!=''&&value&&!isURL(value)) {
          callback(new Error('请输入正确的网址格式'))
        } else {
          callback()
        }
      }
      return {
        sjdwList:[],
        ifOAS:false,
        key:0,
        options1:[{label:"值",value:'111'}],
        DwVisible:false,//选择单位弹框状态
        uploadVisible:false,//上传附件组件状态
        infoCSVisible:false,//项目名称查询的状态
        treeStatas: false,
        detailform: {
          contractInfo: {
            moduleId:'510ba0d79593418493eb1a11ed4e7df4',
            moduleName:'运营维管',
            moduleCode:'operation',
            marketSecondId:'',
            signOrgName:''
          },
          commonFilesList1: [],
          commonFilesList2: [],
          contractInfoHouseSalesList:[],
          contractInfoAttachBO: {
            innerContractInfoAttachList:[],
            unionContractInfoAttachList:[],
            outUnionContractInfoAttachList:[],
            outContractInfoAttachList:[],
            innerGroupContractInfoAttachList:[]
          },
          topInfoSiteList:[{
            country: '',
            ffid: '',
            path: '',
            contractAmount: '',
            isMain: '1',
            placeId:''
          }],
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
        },
        topInfoSiteListCopy:[],//复制下来的项目地点列表,为了比对合同地点与关联项目地点不一致
        topInfoSiteListDifferent:false,//合同地点与关联项目地点不一致
        emergingMarketTwo:[],
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
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        rules:{
          contractAmount: [
            { required: true,validator: validateMoney, trigger: 'change' }
          ],
          bidNoticeWebsite:[
            { required: true,validator: validateUrl, trigger: 'change' }
          ]
        },//表单验证规则
      }
    },
    components: {
      Tree,
      CompanyTree,
      FileUpload,
      SearchName,
      AuditProcess
    },
    computed: {
      //客户性质
      customerNature() {
        return this.$store.state.customerNature;
      },
      emergingMarket() {
        // console.log(this.$store.state.category.emergingMarket)
        return this.$store.state.category.emergingMarket;
      },
      bizTypeCode(){
        return this.$store.state.bizTypeCode;//业务类别
      },
      contractType(){
        return this.$store.state.contractType;//合同类型
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
      projectPlate(){
        return this.$store.state.projectPlate;
      },
    },
    methods: {
      //获取系统外联合体,系统外分包的单位名称
      getXtwName(id, list, index){
        if(id){
          this.$forceUpdate()
          list[index].orgName=this.sjdwList.find(
            (item) => item.id == id
          ).detailName;
        }
      },
      //检查合同地点与关联项目地点是否不一致
      checkTopInfoSiteList(){
        if(this.detailform.searchProject==true){
          this.topInfoSiteListDifferent=false;
          if(this.topInfoSiteListCopy.length!=this.detailform.topInfoSiteList.length){
            this.topInfoSiteListDifferent=true;
          }else{
            var i=0,len=this.topInfoSiteListCopy.length;
            for(;i<len;i++){
              if(this.topInfoSiteListCopy[i].isMain==null){
                this.topInfoSiteListCopy[i].isMain='0'
              }
              this.topInfoSiteListCopy[i].contractAmount=Number(this.topInfoSiteListCopy[i].contractAmount);
              this.detailform.topInfoSiteList[i].contractAmount=Number(this.detailform.topInfoSiteList[i].contractAmount);
            };
            if( JSON.stringify(this.topInfoSiteListCopy) != JSON.stringify(this.detailform.topInfoSiteList)){
              this.topInfoSiteListDifferent=true;
            }
          }
        }
      },
      //查询销售业绩是否有同年同月
      checkRepeat(mval,yval,list,index){
        list.forEach((item,i)=>{
          if(index!=i&&item.salesPerforYear==yval&&item.salesPerforMonth==mval){
            this.$message.error("不能添加同年同月的年度合同收益");
            list[index].salesPerforMonth='';
            return false;
          }
        })
      },
      //设置我方份额含补充
      getOurAmountSupply(){
        if(this.detailform.contractInfo.ourAmountSupply==null||this.ifOAS){
          this.detailform.contractInfo.ourAmountSupply=this.detailform.contractInfo.ourAmount;
          this.ifOAS=true;
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
              '/api/contract/contract/ContractInfo/process/'+type,
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
      // 搜索名字
      searchName() {
        this.infoCSVisible = true;
        this.$nextTick(() => {
          this.$refs.infoCS.init(this.detailform.contractInfo.moduleId,this.detailform.contractInfo.contractType);
      })
      },
      //项目名称查询回来的数据
      goAddDetail(data){
        if(data.type=='1'){//项目名称查找回来的信息
          this.$http
            .post("/api/contract/topInfo/TopInfor/detail/entityInfoByIdForContract", {uuid :data.data.uuid})
            .then((res) => {
            var datas=res.data.data;
          this.detailform.searchProject=true;
          var _con={};
          // this.getTwo(datas.topInfor.enginTypeFirstId);
          this.getTwoSC(datas.topInfor.marketFirstNameId);
          for(var i in this.detailform.contractInfo){
            // i!='isImport'
            _con[i]=JSON.parse(JSON.stringify(this.detailform.contractInfo[i]));
          }
          for(var i in datas.topInfor){
            // i!='isImport'
            if(datas.topInfor[i]&&i!='uuid'){
              _con[i]=JSON.parse(JSON.stringify(datas.topInfor[i]));
            }
          }
          this.detailform.contractInfo=_con;
          this.detailform.contractInfoSectionList=[];
          for(var i in datas.bidInfoSectionBOList){
            var bidInfoSection=datas.bidInfoSectionBOList[i].bidInfoSection,
              bidInfoSectionOrgList=datas.bidInfoSectionBOList[i].bidInfoSectionOrgList;
            // debugger;
            bidInfoSection.uuid='';
            for(var k in bidInfoSection.bidInfoSectionOrgList){
              bidInfoSection.bidInfoSectionOrgList[k].uuid='';
            }
            bidInfoSection.contractInfoSectionOrgList=bidInfoSectionOrgList;
            this.detailform.contractInfoSectionList.push(bidInfoSection);
          }
          for(var m in datas.topInfoSiteList){
            datas.topInfoSiteList[m].uuid='';
          }
          this.detailform.topInfoSiteList=datas.topInfoSiteList;
          this.topInfoSiteListDifferent=false;
          this.topInfoSiteListCopy=JSON.parse(JSON.stringify(this.detailform.topInfoSiteList));
        });
          this.$forceUpdate();
          this.infoCSVisible=false;
        }else{//合同名称查找回来的信息
          this.$http
            .post("/api/contract/contract/ContractInfo/detail/entityInfo", {id :data.data.uuid,queryType:'1'})
            .then((res) => {
            var datas=res.data.data;
          this.detailform.contractInfo.supplyContractId=data.data.uuid;
          var _con={};
          // this.getTwo(datas.contractInfo.enginTypeFirstId);
          this.getTwoSC(datas.contractInfo.marketFirstNameId);
          for(var i in this.detailform.contractInfo){
            // i!='isImport'
            _con[i]=JSON.parse(JSON.stringify(this.detailform.contractInfo[i]));
          }
          for(var i in datas.contractInfo){
            // i!='isImport'
            if(datas.contractInfo[i]&&i!='contractType'&&i!='uuid'&&i!='contractAmount'&&i!='crccCash'&&i!='ourAmount'&&i!='outSystemAmount'&&i!='valueAddedTax'&&i!='designTempPrice'&&i!='unAllocatedFee'&&i!='selfCash'){
              _con[i]=JSON.parse(JSON.stringify(datas.contractInfo[i]));
            }
          }
          this.detailform.contractInfo=_con;
          this.detailform.cdmc=datas.contractInfo.siteNameId&&datas.contractInfo.siteNameId.split(",");
          this.detailform.zplx=datas.contractInfo.otherAssemblyTypeId&&datas.contractInfo.otherAssemblyTypeId.split(",");
          this.detailform.jzlx=datas.contractInfo.otherBuildingTypeId&&datas.contractInfo.otherBuildingTypeId.split(",");
          this.detailform.jzjglx=datas.contractInfo.otherBuildingStructureTypeId&&datas.contractInfo.otherBuildingStructureTypeId.split(",");
          for(var i in datas.topInfoSiteList){
            datas.topInfoSiteList[i].uuid='';
          }
          this.detailform.topInfoSiteList=datas.topInfoSiteList;
        });
          this.$forceUpdate();
          this.infoCSVisible=false;
        }

      },
      //解决新增的时候二级联动清除不了
      clear(id,name){
        // id='';
        // name='';
        this.detailform.contractInfo[id]='';
        this.detailform.contractInfo[name]='';
        this.$forceUpdate();
      },
      //设置各方份额
      getOurAmountGfwt(index,list,type){
        var tj_money=0
        list.forEach((item)=>{
          tj_money+=Number(item.contractAmount);
        });
        if(tj_money>0){
          // this.$set( this.detailform, "contractInfo.crccCash", ourAmount);
          this.$forceUpdate();
          //this.detailform.contractInfoAttachBO.outContractInfoAttachList.contractAmount=tj_money;
          if(type=='wfb') {
            this.detailform.contractInfoAttachBO.outContractInfoAttachList.contractAmount = tj_money;
          }
          if(type=='wlht') {
            this.detailform.contractInfoAttachBO.outUnionContractInfoAttachList.contractAmount = tj_money;
          }
          if(type=='nfb') {
            this.detailform.contractInfoAttachBO.innerContractInfoAttachList.contractAmount = tj_money;
          }
          if(type=='nlht') {
            this.detailform.contractInfoAttachBO.unionContractInfoAttachList.contractAmount = tj_money;
          }

        }else{
          this.$message.error('各方份额需要大于0');
          list[index].contractAmount=''
        }
      },
      //年销售额
      setYearSale(year){
        var yearSale=0;
        this.detailform.contractInfoHouseSalesList.forEach((item)=>{
          if(item.salesPerforYear==year){
          yearSale+=Number(item.contractAmount);
        }
      });
        this.detailform.contractInfoHouseSalesList.forEach((item)=>{
          if(item.salesPerforYear==year){
          item.totalAmount=yearSale;
        }
      });
      },
      //新增销售业绩
      addXs(){
        var v={
          salesPerforYear:'',
          salesPerforMonth:'',
          contractAmount:'',
          totalAmount:'',
        };
        this.detailform.contractInfoHouseSalesList.push(v);
      },
      //打开附件上传的组件
      openFileUp(url,list){
        this.uploadVisible = true;
        this.$nextTick(() => {
          this.$refs.infoUp.init(url,list);
      })
      },
      //获取上传的附件列表
      getUpInfo(data){
        console.log(data)
        this.$forceUpdate();
        this.detailform[data.list]=this.detailform[data.list].concat(data.fileList);
        this.uploadVisible = false;
      },
      //获取模块名字
      getBdName(id, list, index) {
        if(id){
          this.$forceUpdate()
          list[index].moduleName=this.projectPlate.find(
            (item) => item.id == id
        ).detailName;
        }
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
      back() {
        this.$router.back();
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
        }else if(type=='jtfb'){
          this.detailform.contractInfoAttachBO.innerGroupContractInfoAttachList.push(v);
        }
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
        var ifRepeat=false;
        this.detailform.topInfoSiteList.forEach((item, index) => {
          if(item.ffid!=_data.fullDetailCode&&!ifRepeat){
            if (index == this.positionIndex) {
              // item.detailName = _data.detailName;
              item.country = country;
              item.ffid = _data.fullDetailCode;
              item.path = _data.fullDetailName;
              item.placeId=_data.id;
              this.checkTopInfoSiteList();
            }
          }else{
            this.$message.error("项目地点不能重复");
            ifRepeat=true;
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
      //打开单位弹框
      addDw(type,list,ifChek,index,tableList){
        this.DwVisible = true;
        this.$nextTick(() => {
          this.$refs.infoDw.init(type,list,ifChek,index,tableList);
      })
      },
      //获取单位的值
      getDwInfo(data){
        console.log(data);
        var id=[],name=[];
        if(data&&data.type!='单位名称'){
          data.forEach((item)=>{
            id.push(item.id);
          name.push(item.detailName);
        })
        }
        if(data.type=="签约单位"){
          this.detailform.contractInfo.signOrgId=id.join(",");
          this.detailform.contractInfo.signOrgName=name.join(",");
        }else if(data.type=='单位名称'){
          this.detailform.contractInfoAttachBO[data.tableList][data.index].orgId=data.code;
          this.detailform.contractInfoAttachBO[data.tableList][data.index].orgName=data.name;
          this.$set(this.detailform.contractInfoAttachBO[data.tableList][data.index],this.detailform.contractInfoAttachBO[data.tableList][data.index]);

        }
        this.DwVisible=false;
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
        this.detailform.contractInfo[id]=_id.join(",");
        this.detailform.contractInfo[name]=_name.join(",");
        console.log(this.detailform.contractInfo[id])
      },
      //内联合体,内分包,外联合体,外分包,集团内分包改变计算金额
      changeMoney(list,name){
        this.detailform.contractInfoAttachBO[list]=[];
        this.getOurAmount('','',name,'','switch');
        this.$set(this.detailform,this.detailform)
      },
      //合同总金额获取我方份额和铁建
      getOurAmount(index,list,type,name,ifswitch){
        var tj_money=0,our_money=0;
        if(this.detailform.contractInfo.contractAmount>0){
          if(type=='wlht'||type=='nlht' ){
            //铁建金额计算
            this.detailform.contractInfoAttachBO.outUnionContractInfoAttachList.forEach((item)=>{
              tj_money+=Number(item.contractAmount);
            });
            this.detailform.contractInfo.outSystemAmount=tj_money;
            var ourAmount=this.detailform.contractInfo.contractAmount-tj_money;

            if(ourAmount>0){
              // this.$set( this.detailform, "contractInfo.crccCash", ourAmount);
              this.$forceUpdate();
              this.detailform.contractInfo.crccCash=ourAmount;

            }else{
              this.$message.error('铁建份额需要大于0');
              list[index].contractAmount=''
            }
            //我方份额计算
            this.detailform.contractInfoAttachBO.unionContractInfoAttachList.forEach((item)=>{
              our_money+=Number(item.contractAmount);
            });
            var ourAmount2=this.detailform.contractInfo.crccCash-our_money;
            if(ourAmount2>0){
              this.$forceUpdate();
              this.detailform.contractInfo.ourAmount=ourAmount2;
              //项目地点的第一条数据金额默认是我方份额
              this.getPositionMoney(0,this.detailform.topInfoSiteList);
              // this.$set( this.detailform, "contractInfo.ourAmount", ourAmount2);
            }else{
              this.$message.error('我方份额需要大于0');
              list[index].contractAmount=''
            }
          }else if(type=='nfb'||type=='jtnfb'|| type=='wfb'){
            var jtnfbTotal=0;
            //计算系统内分包和集团内分包的和
            this.detailform.contractInfoAttachBO.innerContractInfoAttachList.forEach((item)=>{
              our_money+=Number(item.contractAmount);
            });
            //计算系统外分包的和
            this.detailform.contractInfoAttachBO.outContractInfoAttachList.forEach((item)=>{
              our_money+=Number(item.contractAmount);
            });
            //计算集团内分包的和
            this.detailform.contractInfoAttachBO.innerGroupContractInfoAttachList.forEach((item)=>{
              our_money+=Number(item.contractAmount);
              jtnfbTotal+=Number(item.contractAmount);
            });
            if(this.detailform.contractInfo.unAllocatedFee&&jtnfbTotal>this.detailform.contractInfo.contractAmount-(this.detailform.contractInfo.unAllocatedFee)){
              this.$message.error('集团内分包之和需要大于总金额-未分配金额');
              if(list){
                list[index].contractAmount='';
                this.$forceUpdate();
              }else{
                this.detailform.contractInfo[name]='';
                this.$forceUpdate();
                // this.$set(this.detailform.contractInfo,this.detailform.contractInfo)
              }
            }else{
              //计算自留份额 初始我方份额 （非投融资，投融资使用建安和勘察设计费）- 未分配 - 系统内分包份额-集团内分包-系统外分包
              var zile=Number((this.detailform.contractInfo.projectNatureFirstId=='7031076e7a5f4225b1a89f31ee017802'?this.detailform.contractInfo.installDesignFee||0:this.detailform.contractInfo.ourAmount||0)-(this.detailform.contractInfo.unAllocatedFee||0)-our_money);
              if(zile<0){
                if(this.detailform.contractInfo.projectNatureFirstId==='7031076e7a5f4225b1a89f31ee017802'){
                  this.$message.error('自留份额+未分配+系统内分包份额之和+系统外分包份额之和+集团内分包份额之和不能大于建安和勘察设计费');
                }else{
                  this.$message.error('自留份额+未分配+系统内分包份额之和+系统外分包份额之和+集团内分包份额之和不能大于初始我方份额');
                }
                if(list){
                  list[index].contractAmount='';
                  this.$forceUpdate();
                }else{
                  this.detailform.contractInfo[name]='';
                  this.$forceUpdate();
                }
              }else{
                this.detailform.contractInfo.selfCash=zile;
                //计算本企业建安已分配和本企业建安未分配
                if(this.detailform.contractInfo.isInSystemSub!='0'&&this.detailform.contractInfo.isOutSystemSub!='0'&&this.detailform.contractInfo.isInGroupSub!='0'){
                  //系统内分包和系统外分包和集团内分包都为否时,本企业建安已分配=建安和勘察设计费,本企业建安未分配等于0
                  this.detailform.contractInfo.installDesignAllocated=this.detailform.contractInfo.installDesignFee;
                  this.detailform.contractInfo.installDesignUnallocat=0;
                }else{
                  //系统内分包和系统外分包和集团内分包其中一个为是时,本企业建安已分配=集团内分包和+系统内分包和+系统外分包和+自留份额,本企业建安未分配等于建安和勘察设计费-本企业建安已分配(未分配=本企业建安未分配)
                  this.detailform.contractInfo.installDesignAllocated=Number(our_money+zile);
                  this.detailform.contractInfo.installDesignUnallocat=this.detailform.contractInfo.unAllocatedFee||0;
                }
                this.$forceUpdate();
              }
            }
            // else if(type=='nfb'||type=='wfb'){
            //   //判断内分包和外分包之和是否大于我方份额
            //   this.detailform.contractInfoAttachBO.innerContractInfoAttachList.forEach((item)=>{
            //     our_money+=Number(item.contractAmount);
            //   });
            //   this.detailform.contractInfoAttachBO.outContractInfoAttachList.forEach((item)=>{
            //     our_money+=Number(item.contractAmount);
            //   });
            //   var ourAmount=this.detailform.contractInfo.ourAmount-our_money;
            //   if(!ourAmount>0){
            //     this.$message.error('我方份额需要大于0');
            //     list[index].contractAmount=''
            //   }
          }else{
            this.detailform.contractInfo.contractAmount=this.detailform.contractInfo.contractAmount.replace(/[^\-?\d.]/g,'','');
            //合同总金额输入计算我方份额和铁建金额
            this.detailform.contractInfoAttachBO.outUnionContractInfoAttachList.forEach((item)=>{
              tj_money+=Number(item.contractAmount);
            });
            this.$forceUpdate();
            this.detailform.contractInfo.crccCash=this.detailform.contractInfo.contractAmount!=''?this.detailform.contractInfo.contractAmount-tj_money:'';
            this.detailform.contractInfoAttachBO.unionContractInfoAttachList.forEach((item)=>{
              our_money+=Number(item.contractAmount);
            });
            this.$forceUpdate();
            this.detailform.contractInfo.ourAmount=this.detailform.contractInfo.contractAmount!=''?this.detailform.contractInfo.crccCash-our_money:'';
            //项目地点的第一条数据金额默认是我方份额
            this.getPositionMoney(0,this.detailform.topInfoSiteList);

          }
          this.getOurAmountSupply();
        }else if(ifswitch!='switch'){
          this.$message.error('合同总金额需要大于0');
        }
      },
      //项目地点份额变动的时候
      getPositionMoney(index,list){
        if(list.length==1){
          list[0].contractAmount=this.detailform.contractInfo.ourAmount
        }else{
          var money=0;
          list.forEach((item,i)=>{
            if(i>0){
              money+=Number(item.contractAmount);
            }
          });
          // console.log(this.detailform.contractInfo.ourAmount,money)
          if(this.detailform.contractInfo.ourAmount-money>0){
            list[0].contractAmount=this.detailform.contractInfo.ourAmount-money;
          }else{
            list[index].contractAmount='';
            this.$message.error('项目地点份额之和不能大于初始我方份额');
          }
        }

      },
      handleRemove1(file,index) {
        this.$http
          .post(
            "/api/contract/topInfo/CommonFiles/list/delete",
            {ids:[file.uuid]},
          )
          .then((res) => {
          if (res.data.code === 200) {
          this.detailform.commonFilesList1.splice(index,1);
        }

      });
        console.log(this.detailform.commonFilesList)
      },
      handleRemove2(file,index) {
        this.$http
          .post(
            "/api/contract/topInfo/CommonFiles/list/delete",
            {ids:[file.uuid]},
          )
          .then((res) => {
            if (res.data.code === 200) {
              this.detailform.commonFilesList2.splice(index,1);
            }

          });
      },
      //上传附件
      handleChange1(response, file, fileList){
        if (response && response.code === 200) {
          this.$message({
            message: '上传成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
            this.detailform.commonFilesList.push(response.data);
        }
        })
        } else {
          this.$message.error(response.msg)
        }
      },
      //获取下拉框id和name的公共方法
      getName(id, list, name,code) {
        if(id){
          this.$forceUpdate()
          this.detailform.contractInfo[name] = list.find(
            (item) => item.id == id
        ).detailName;
            this.detailform.contractInfo[code] = list.find(
                (item) => item.id == id
            ).detailCode;
          console.log(this.detailform.contractInfo[name]);
        }
      },
      //新兴市场二级
      getTwoSC(id) {
        this.detailform.contractInfo.marketSecondId='';
        this.detailform.contractInfo.marketSecondName='';
        this.emergingMarketTwo=[];
        if(id!==''){
          this.emergingMarket.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.contractInfo.marketFirstName = item.detailName;
            this.detailform.contractInfo.marketFirstCode = item.detailCode;
            this.emergingMarketTwo = item.children;
          }
        }
        )
        }
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
        }else if(item.uuid&&type=='yj'){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
              "/api/contract/contract/ContractInfo/list/deleteHouseSales",
              {ids: [item.uuid]}
            )
            .then((res) => {
            if (res.data && res.data.code === 200) {
            list.splice(index, 1);
            this.setYearSale(item.salesPerforYear);
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
      saveInfo(formName,type) {
        var url='';
        if(type=='save'){
          url='/api/contract/contract/ContractInfo/detail/saveOrUpdate';
        }else{
          url='/api/contract/contract/ContractInfo/process/start';
        }
        if(this.detailform.contractInfo.isOpenBid=='1'&&this.detailform.commonFilesList2.length==0){
          this.$message.error("请上传招标公告文件");
          return false;
        }
        if(this.detailform.topInfoSiteList.length==0){
          this.$message.error("请至少选择一个项目地点");
          return false;
        }
        var hasMain=false;
        this.detailform.topInfoSiteList.forEach((item)=>{
          if(item.isMain=='1'){
            hasMain=true;
          }
        });
        if(!hasMain){
          this.$message.error("请选择一个主地点");
          return false;
        }
        if(this.detailform.contractInfo.valueAddedTax<=0){
          this.$message.error("增值税需要大于0");
          return false;
        }
        if(this.detailform.contractInfo.isYearContract=='0'&&this.detailform.contractInfoHouseSalesList.length=='0'){
          this.$message.error("请至少添加一条年度合同收益");
          return false;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.detailform.commonFilesList=this.detailform.commonFilesList1.concat(this.detailform.commonFilesList2)
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
            this.$message.error("请添加必填项和正确的数据格式");
        return false;
      }
      });
      },
      show(type) {
        this.type = type
        if (type === 'add') {
          this.resetinfo()
          this.title = '新增'
          this.detailform.clothSizePartList.push(this.sizeform)
          // this.dialogVisibleAdd = true
        }
      },
      resetinfo() {
        this.sizeform = {
          'id': '',
          'part': '',
          showinput: true

        }
      },
      resetform(formName) {
        this.$refs[formName].resetFields()
      },

      // 加载列表
      getDetail() {
        this.$http
          .post("/api/contract/contract/ContractInfo/detail/entityInfo", {id:this.id})
          .then((res) => {
          var datas=res.data.data;
        this.getTwoSC(datas.contractInfo.marketFirstNameId);
            var fileList1=[],fileList2=[];
            datas.commonFilesList.forEach((item) => {
              if(item.businessCode=='01'){
                fileList1.push(item)
              }else if(item.businessCode=='02'){
                fileList2.push(item)
              }
            });
        this.detailform={
          commonFilesList1: fileList1,
          commonFilesList2: fileList2,
          contractInfo: datas.contractInfo,
          contractInfoAttachBO: datas.contractInfoAttachBO,
          topInfoSiteList:datas.topInfoSiteList,
          contractInfoHouseSalesList:datas.contractInfoHouseSalesList,
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
        this.multipleSelection = val
      }

    },
    mounted() {
      // eslint-disable-next-line no-unde
      this.id=this.p.instid;
      if (this.p.actpoint === "edit"||this.id) {
        this.getDetail();
      }
      if(this.p.actpoint=='add'){
        if(this.p.type=='bq'){
          this.detailform.contractInfo.contractType="2"
        }else{
          this.detailform.contractInfo.contractType="1"
        }
      }
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.detailform.contractInfo.createOrgName='股份公司';
      this.detailform.contractInfo.createTime = new Date().getTime();
      //获取所属央企列表
      this.$http
        .post(
          '/api/contract/Companies/detail/findCompaniesById',
          {typeId:'9f19652f27a911ebad4bc5ee92e1a03f'}
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.yqList=res.data.data
            this.yqList.forEach((item)=>{
              item.detailName=item.companyName;
              item.id=item.uuid;
            })
          }
        });
      //设计单位列表
      this.$http
        .post(
          "/api/contract/Companies/detail/findCompanies",
        )
        .then((res) => {
          this.sjdwList = res.data.data.records;
          this.sjdwList.forEach((item)=>{
            item.value=item.companyName;
            item.detailName=item.companyName;
            item.id=item.uuid;
          })
        });
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
  .detatil-flie-btn{
    /*margin-left: 30px;*/
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
