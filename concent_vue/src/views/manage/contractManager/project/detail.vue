<template>
  <div style="position: relative">
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailform','save')" class="detailbutton detail-back-tab save-btn">保存</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.contractInfo.flowStatus=='edit'||detailform.contractInfo.flowStatus=='reject')" @click="saveInfo('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
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
      <el-tab-pane label="工程承包合同">
        <div class="detailBoxBG">
            <el-form-item
              label="项目名称(中文)"
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
              label="项目名称(外文)"
              prop="contractInfo.inforNameForeign"
            >
              <el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId" placeholder="请输入内容" v-model="detailform.contractInfo.inforNameForeign" class="input-with-select">

              </el-input>
            </el-form-item>
            <br>
            <el-form-item
              label="合同名称(中文)"
              prop="contractInfo.contractName"
              :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
            >
              <el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId||p.type == 'bq'" placeholder="请输入内容" v-model="detailform.contractInfo.contractName" class="input-with-select">
                <el-button v-if="detailform.contractInfo.contractType=='2'" slot="append" icon="el-icon-search" @click="searchName"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item
              label="合同名称(外文)"
              prop="contractInfo.contractNameForeign"
            >
              <el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId" placeholder="请输入内容" v-model="detailform.contractInfo.contractNameForeign" class="input-with-select">

              </el-input>
            </el-form-item>
          <el-form-item
            label="合同编号"
          >
            <el-input
              disabled
              clearable
              placeholder="保存后系统自动生成"

              v-model="detailform.contractInfo.contractCode"
            />
          </el-form-item>
            <br>
            <el-form-item
              label="工程类别(一级)"
              prop="contractInfo.enginTypeFirstId"
              class="inline-formitem form-item-six"
              :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
            >
              <el-select
                :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
                clearable
                filterable
                placeholder="请选择"
                @change="getTwo"
                style="width: 150px"
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
            v-show="detailform.contractInfo.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'||
                    detailform.contractInfo.enginTypeFirstId=='0f16c387f17b402db45c4de58e1cf8b4'||
                    detailform.contractInfo.enginTypeFirstId=='f6f5188458ab4c5ba1e0bc12a9a4188b'||
                    detailform.contractInfo.enginTypeFirstId=='24ebba9f2f3447579d0086209aff6ecd'||
                    detailform.contractInfo.enginTypeFirstId=='193b4d4003d04899a1d09c8d5f7877fe'||
                    detailform.contractInfo.enginTypeFirstId==''"
            class="inline-formitem form-item-six"
            label="是否导入清单"
          >
            <el-switch
              @change="isImportChange"
              :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
              class="inline-formitem-switch"
              v-model="p.pushId?'1':detailform.contractInfo.isImport"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
            >
            </el-switch>
            <!--<el-select-->
            <!--:disabled="p.actpoint==='look'"-->
            <!--clearable-->
            <!--filterable-->
            <!--placeholder="请选择"-->

            <!--v-model="detailform.contractInfo.isImport"-->
            <!--&gt;-->
            <!--<el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>-->
            <!--</el-select>-->
          </el-form-item>
            <el-form-item
              v-show="detailform.contractInfo.enginTypeFirstId!='17ff5c08d36b41ea8f2dc2e9d3029cac'&&
                    detailform.contractInfo.enginTypeFirstId!='0f16c387f17b402db45c4de58e1cf8b4'&&
                    detailform.contractInfo.enginTypeFirstId!='f6f5188458ab4c5ba1e0bc12a9a4188b'&&
                    detailform.contractInfo.enginTypeFirstId!='24ebba9f2f3447579d0086209aff6ecd'&&
                    detailform.contractInfo.enginTypeFirstId!='193b4d4003d04899a1d09c8d5f7877fe'&&detailform.contractInfo.enginTypeFirstId!=''"
              class="inline-formitem form-item-six"></el-form-item>
            <el-form-item
              label="工程类别(二级)"
              prop="contractInfo.enginTypeSecondId"
              class="inline-formitem"
              :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
            >
              <el-select
                :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
                clearable
                filterable
                placeholder="请选择"
                @clear="clear(detailform.contractInfo.enginTypeSecondId,detailform.contractInfo.enginTypeSecondName)"
                @change="getThree"
                v-model="detailform.contractInfo.enginTypeSecondId"
              >
                <!--getName(-->
                <!--detailform.contractInfo.enginTypeSecondId,-->
                <!--xqprojectType,-->
                <!--'enginTypeSecondName',-->
                <!--'enginTypeSecondCode'-->
                <!--)-->
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in xqprojectType"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="detailform.contractInfo.enginTypeFirstId=='193b4d4003d04899a1d09c8d5f7877fe'&&xqprojectTypeThree.length>0"
            label="工程类别(三级)"
            prop="contractInfo.enginTypeThirdId"
            class="inline-formitem"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-select
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              clearable
              filterable
              placeholder="请选择"
              @clear="clear(detailform.contractInfo.enginTypeThirdId,detailform.contractInfo.enginTypeThirdName)"
              @change="
                getName(
                  detailform.contractInfo.enginTypeThirdId,
                  xqprojectTypeThree,
                  'enginTypeThirdName',
                  'enginTypeThirdCode'
                )
              "
              v-model="detailform.contractInfo.enginTypeThirdId"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in xqprojectTypeThree"
              ></el-option>
            </el-select>
          </el-form-item>
            <br>
            <el-form-item
          label="铁路分类"
          class="inline-formitem"
          v-if="detailform.contractInfo.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
        >
          <el-select
            :disabled="p.actpoint==='look'||p.actpoint==='task'"
            filterable
            clearable
            placeholder="请选择"

            v-model="detailform.contractInfo.designRailwayClassifyId"
            @change="getName(
            detailform.contractInfo.designRailwayClassifyId,
                  options2,
                  'designRailwayClassify',
                  'designRailwayClassifyCode'
            )"
          >
            <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options2"></el-option>
          </el-select>
        </el-form-item>
            <el-form-item
            label="所属铁路局"
            class="inline-formitem"
            v-if="detailform.contractInfo.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
          >
            <el-select
              :disabled="p.actpoint==='look'||p.actpoint==='task'"
              filterable
              clearable
              placeholder="请选择"

              v-model="detailform.contractInfo.railwayBureauId"
              @change="getName(
                detailform.contractInfo.railwayBureauId,
                      railwayBureau,
                      'railwayBureauName',
                      'railwayBureauCode'
                )"
            >
              <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in railwayBureau"></el-option>
            </el-select>
          </el-form-item>
            <br>
          <el-form-item
            label="中标日期"
            prop="contractInfo.bidTime"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-date-picker
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              filterable
              clearable
              type="date"
              value-format="timestamp"
              v-model="detailform.contractInfo.bidTime"

            >
            </el-date-picker>
          </el-form-item>
            <el-form-item
              label="合同签订日期"
            >
              <el-date-picker
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="detailform.contractInfo.contractSignTime"

              >
              </el-date-picker>
            </el-form-item>
          <el-form-item
            v-if="detailform.contractInfo.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'||
                    detailform.contractInfo.enginTypeFirstId=='24ebba9f2f3447579d0086209aff6ecd'||
                    detailform.contractInfo.enginTypeFirstId=='0f16c387f17b402db45c4de58e1cf8b4'||
                    detailform.contractInfo.enginTypeFirstId=='f6f5188458ab4c5ba1e0bc12a9a4188b'"
            label="建设里程长度(千米)"
            prop="contractInfo.lineLength"
            :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
          >
            <el-input
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              clearable
              placeholder=""
              @input="detailform.contractInfo.lineLength=detailform.contractInfo.lineLength.replace(/[^\-?\d.]/g,'','')"
              v-model="detailform.contractInfo.lineLength"
            />
          </el-form-item>
          <el-form-item
            v-if="detailform.contractInfo.enginTypeFirstId=='193b4d4003d04899a1d09c8d5f7877fe'"
            label="建筑面积(平方米)"
            prop="contractInfo.contractBuiltArea"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              clearable
              placeholder=""
              @input="detailform.contractInfo.contractBuiltArea=detailform.contractInfo.contractBuiltArea.replace(/[^\-?\d.]/g,'','')"
              v-model="detailform.contractInfo.contractBuiltArea"
            />
          </el-form-item>
          <br>
          <el-form-item
            label="合同开工日期"
          >
            <el-date-picker
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              filterable
              clearable
              type="date"
              value-format="timestamp"
              v-model="detailform.contractInfo.startTime"

            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="合同竣工日期"
          >
            <el-date-picker
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              filterable
              clearable
              type="date"
              value-format="timestamp"
              v-model="detailform.contractInfo.endTime"

            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="工期(天)"
          >
            <el-input
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              clearable
              placeholder="请输入"
              @input="detailform.contractInfo.contractPeriod=detailform.contractInfo.contractPeriod.replace(/[^\-?\d.]/g,'','')"
              v-model="detailform.contractInfo.contractPeriod"
            />
          </el-form-item>
          <br>
            <el-form-item
              label="使用资质单位"
              prop="contractInfo.qualityOrgNames"
              :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: ['blur','change'],
                }"
            >
              <el-input clearable :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId" placeholder="请输入内容" v-model="detailform.contractInfo.qualityOrgNames" class="input-with-select">
                <el-button v-if="p.actpoint !== 'look'&&p.actpoint!='task'&&!p.pushId" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('使用资质单位',detailform.contractInfo.qualityOrgIds)" ></el-button>
              </el-input>
            </el-form-item>
            <el-form-item
              label="参建单位"
            >
              <el-input clearable :disabled="p.actpoint === 'look'||p.actpoint=='task'" placeholder="请输入内容" v-model="detailform.contractInfo.buildOrgNames" class="input-with-select">
                <el-button  v-if="p.actpoint !== 'look'&&p.actpoint!='task'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('施工单位',detailform.contractInfo.buildOrgIds)" ></el-button>
              </el-input>
            </el-form-item>
          <el-form-item
            label="合同类型"
          >
            <el-input
              disabled
              clearable
              placeholder="请输入"
              v-model="detailform.contractInfo.contractType=='2'?'补充合同':'主合同'"
            />
          </el-form-item>
            <el-form-item
                label="建设单位:"
                prop="contractInfo.constructionOrgId"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: ['blur','change'],
              }">
                <el-select
                  v-model="constructionOrgList"
                  v-if="detailform.contractInfo.isClientele=='1'"
                  @change="companyBuildChange"
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
                  v-if="detailform.contractInfo.isClientele!='1'"
                  @change="companyBuildChange"
                  multiple
                  filterable
                  collapse-tags
                  placeholder="请选择">
                    <el-option
                      :key="index"
                      :label="item.customerName"
                      :value="item.customerId"
                      v-for="(item, index) in jsdwList"
                    ></el-option>
                </el-select>
              </el-form-item>
          <el-form-item
            class="inline-formitem"
            label="是否客户:"
            prop="contractInfo.isClientele"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-switch
              :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
              class="inline-formitem-switch"
              v-model="detailform.contractInfo.isClientele"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="1"
              inactive-value="0"
              @change="companyBuildClear"
            >
            </el-switch>
          </el-form-item>
            <el-form-item
              label="建设单位性质"
              prop="contractInfo.constructionNatureId"
              :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
            >
              <el-select
                :disabled="p.actpoint==='look'||p.actpoint=='task'||p.pushId"
                clearable
                filterable
                placeholder="请选择"

                v-model="detailform.contractInfo.constructionNatureId"
                @change="
                getName(
                  detailform.contractInfo.constructionNatureId,
                  constructionUnitNature,
                  'constructionNature',
                  'constructionNatureCode'
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
            v-if="detailform.contractInfo.constructionNatureId=='b5eeb5ab9ea0479ba08d0f7b420a8e77'"
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
          <el-form-item
            label="设计单位:"
            prop="contractInfo.designOrg"
            style="width: 32.5%">
            <el-input
              disabled
              clearable
              placeholder="请选择设计单位"
              v-model="detailform.contractInfo.designOrg">
              <el-button slot="append" icon="el-icon-circle-plus-outline" :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              @click="openComMul(detailform.contractInfo.designOrgId,detailform.contractInfo.designOrg,'/api/contract/Companies/detail/findCompanies','设计单位')"></el-button>
            </el-input>
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
            label="项目性质(一级)"
            prop="contractInfo.projectNatureFirstId"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-select
              :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
              clearable
              filterable
              placeholder="请选择"
              @change="getTwoXZ(detailform.contractInfo.projectNatureFirstId),detailform.contractInfo.contractAmount!=null&&detailform.contractInfo.contractAmount!=''?getOurAmount('','','nfb'):''"

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
            label="项目性质(二级)"
            prop="contractInfo.projectNatureSecondId"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: ['blur'],
            }"
          >
            <el-select
              :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
              clearable
              filterable
              placeholder="请选择"
              @clear="clear(detailform.contractInfo.projectNatureSecondId,detailform.contractInfo.projectNaturetSecondName)"
              @change="
                getName(
                  detailform.contractInfo.projectNatureSecondId,
                  projectNatureTwo,
                  'projectNaturetSecondName',
                  'projectNaturetSecondCode'
                )
              "
              v-model="detailform.contractInfo.projectNatureSecondId"
            >
              <el-option
                v-if="item.isUse==1"
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in projectNatureTwo"
              ></el-option>
            </el-select>
          </el-form-item>
          <br>
            <el-form-item
              label="合同总金额(万元)"
              prop="contractInfo.contractAmount"
              :rules="rules.contractAmount"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
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
          <div>
            <el-form-item
              v-if="detailform.contractInfo.projectNatureFirstId==='7031076e7a5f4225b1a89f31ee017802'"
              label="建安和勘察设计费(万元)"
              prop="contractInfo.installDesignFee"
              :rules="rules.contractAmount"
            >
              <el-input
                @input="getOther"
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.contractInfo.installDesignFee">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="detailform.contractInfo.projectNatureFirstId==='7031076e7a5f4225b1a89f31ee017802'"
              label="其他投资(万元)"
              prop="contractInfo.otherInvest"
              :rules="rules.contractAmount"
            >
              <el-input
                :disabled="true"
                clearable
                v-model="detailform.contractInfo.otherInvest">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>
          </div>
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

          <!--v-if="detailform.contractInfo.isInSystemUnion==='1'"-->
          <el-form-item

            label="暂列金(万元)"
            prop="contractInfo.designTempPrice"

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
              label="新兴市场类别(一级)"
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
              v-show="detailform.contractInfo.marketFirstName!=='军民融合' && emergingMarketTwo !== undefined"
              label="新兴市场类别(二级)"
              prop="contractInfo.marketSecondId"
              :rules="detailform.contractInfo.marketFirstNameId&&emergingMarketTwo?{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
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
            label="场地名称"
            prop="detailform.cdmc"
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
            label="装配类型"
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
            <br>
            <div>
              <el-form-item
                label="装配率(%)"
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

                  v-model="detailform.contractInfo.otherAssemblyRate"
                />
              </el-form-item>
              <el-form-item
                label="建筑类型"
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
                label="建筑结构类型"
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


           <div>
             <el-form-item
               class="long-form-item"
               v-if="detailform.contractInfo.projectNatureFirstId==='7031076e7a5f4225b1a89f31ee017802'"
               label="本企业实际应投入资本金"
             >
               <el-input
                 :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                 clearable
                 @input="detailform.contractInfo.actualInvest=detailform.contractInfo.actualInvest.replace(/^\.+|[^\d.]/g,'')"
                 v-model="detailform.contractInfo.actualInvest"/>
             </el-form-item>
             <el-form-item
               class="long-form-item"
               v-if="detailform.contractInfo.projectNatureFirstId=='7031076e7a5f4225b1a89f31ee017802'"
               label="本企业建安部分已分配"
               prop="contractInfo.installDesignAllocated"
               :rules="rules.contractAmount"
             >
               <el-input
                 disabled
                 clearable
                 v-model="detailform.contractInfo.installDesignAllocated"/>
             </el-form-item>
             <el-form-item
               v-if="detailform.contractInfo.projectNatureFirstId=='7031076e7a5f4225b1a89f31ee017802'"
               class="long-form-item"
               label="本企业建安部分未分配"
               prop="contractInfo.installDesignUnallocat"
               :rules="rules.contractAmount"
             >
               <el-input
                 disabled
                 clearable
                 v-model="detailform.contractInfo.installDesignUnallocat"/>
             </el-form-item>
           </div>
            <el-form-item
              label="承揽所属机构"
              prop="contractInfo.contractOrgName"
              :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
            >
              <el-input clearable :disabled="p.actpoint === 'look'||p.actpoint=='task'" placeholder="请输入内容" v-model="detailform.contractInfo.contractOrgName" class="input-with-select">
                <el-button  v-if="p.actpoint !== 'look'&&p.actpoint!='task'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('承揽所属机构',detailform.contractInfo.contractOrgId,false)" ></el-button>
              </el-input>
              <!--<el-select-->
                <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                <!--filterable-->
                <!--clearable-->
                <!--placeholder="请选择"-->

                <!--v-model="detailform.contractInfo.contractOrgId"-->
              <!--&gt;-->
                <!--<el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options2"></el-option>-->
              <!--</el-select>-->
            </el-form-item>
            <el-form-item
              label="承揽所属省市"
              prop="contractInfo.contractProvinceName"
              :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
            >
              <el-select
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable
                filterable
                placeholder="请选择"

                v-model="detailform.contractInfo.contractProvinceName"
                @change="
                getName(
                  detailform.contractInfo.contractProvinceId,
                  ssList,
                  'contractProvinceName',
                  'contractProvinceCode'
                )
              "
              >
                <el-option :key="index" :label="item.NAME" :value="item.CODE" v-for="(item,index) in ssList"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="起讫地点"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable
                placeholder="请输入"

                v-model="detailform.contractInfo.beginEndPlace"
              />
            </el-form-item>
            <br>
            <el-form-item
              label="扩展字段1"
            >
              <el-select
                :disabled="p.actpoint==='look'||p.actpoint=='task'"
                clearable
                filterable
                placeholder="请选择"

                v-model="detailform.contractInfo.extensionField1"
              >
                <el-option
                  v-if="item.expandType=='1'"
                  :key="index"
                  :label="item.expandName"
                  :value="item.expandName"
                  v-for="(item, index) in extendList"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="扩展字段2"
            >
              <el-select
                :disabled="p.actpoint==='look'||p.actpoint=='task'"
                clearable
                filterable
                placeholder="请选择"

                v-model="detailform.contractInfo.extensionField2"
              >
                <el-option
                  v-if="item.expandType=='2'"
                  :key="index"
                  :label="item.expandName"
                  :value="item.expandName"
                  v-for="(item, index) in extendList"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="扩展字段3"
            >
              <el-select
                :disabled="p.actpoint==='look'||p.actpoint=='task'"
                clearable
                filterable
                placeholder="请选择"

                v-model="detailform.contractInfo.extensionField3"
              >
                <el-option
                  v-if="item.expandType=='3'"
                  :key="index"
                  :label="item.expandName"
                  :value="item.expandName"
                  v-for="(item, index) in extendList"
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
                clearable
                placeholder="请输入"

                v-model="detailform.contractInfo.bidNoticeWebsite"
              />
            </el-form-item>
          </div>
            <div>
              <el-form-item
                class="neirong"
                label="项目内容(最多600字)"
               >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  type="textarea"
                  clearable
                  placeholder="请输入"

                  v-model="detailform.contractInfo.inforContent"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item
                class="neirong"
                label="备注(最多600字)"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  v-model="detailform.contractInfo.remarks"
                />
              </el-form-item>
            </div>
          <p>
            <span >项目地点: </span>
            <el-button
              v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'&&!p.pushId"
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
              prop="path"
            >
              <template slot-scope="scope">
                <el-form-item class="tabelForm" :prop="'topInfoSiteList.' + scope.$index + '.path'"  :rules="{required: true,message: '此项不能为空'}">
                  <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                  <el-input disabled placeholder="请输入内容" v-model="scope.row.path" class="input-with-select group-no-padding">
                    <el-button  v-if="p.actpoint !== 'look'&&p.actpoint!='task'" slot="append" icon="el-icon-circle-plus" @click="selectPosition(),positionIndex=scope.$index"></el-button>
                  </el-input>
                </el-form-item>

                <!--<i class="el-icon-circle-plus"  v-show="p.actpoint != 'look'" @click="selectPosition(),positionIndex=scope.$index"></i><span>{{scope.row.path}}</span>-->
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
                    class="group-no-padding"
                    clearable
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'||scope.$index==0"
                    v-model="scope.row.contractAmount"
                    @input="getPositionMoney(scope.$index,detailform.topInfoSiteList),checkTopInfoSiteList()"
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
            <p class="detail-p">
              <span>中标通知书: </span>
              <!--<el-button-->
                <!--v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"-->
                <!--size="small"-->
                <!--type="primary"-->
                <!--@click="openFileUp('/api/contract/topInfo/CommonFiles/contractInfo/01/uploadFile','fileList1')">-->
                <!--点击上传-->
              <!--</el-button>-->

              <el-upload
                :headers="{'Authorization':Authorization}"
                v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                class="upload-demo detailUpload detatil-flie-btn"
                :action="'/api/contract/topInfo/CommonFiles/contractInfo/01/uploadFile'"
                :on-change="( file, fileList)=>{uploadPorgress( file, fileList,detailform.fileList1)}"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                multiple
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <!--<el-upload-->
                <!--ref="fileList1"-->
                <!--v-show="p.actpoint !== 'look'"-->
                <!--class="upload-demo detailUpload detatil-flie-btn"-->
                <!--:action="'/api/contract/topInfo/CommonFiles/contractInfo/01/uploadFile'"-->
                <!--:on-success="handleChange1"-->
                <!--:on-change="fileChage1"-->
                <!--:on-error="handleChange1"-->
                <!--:on-remove="handleRemove1"-->
                <!--:show-file-list="detailform.fileList1.showFile"-->
                <!--multiple-->
              <!--&gt;-->
                <!--<el-button size="small" type="primary">点击上传</el-button>-->
              <!--</el-upload>-->
              <!--<el-progress v-if="detailform.fileList1.percentage" class="upload-progress" :text-inside="true" :stroke-width="24" :percentage="detailform.fileList1.percentage" :status="detailform.fileList1.status"></el-progress>-->
            </p>
              <el-table
                :data="detailform.fileList1"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                @selection-change="handleSelectionChange"
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
                <el-table-column align="center"  :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

                </el-table-column>
                <el-table-column align="center" width="200" :resizable="false" label="上传进度" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-progress v-if="scope.row.progressFlag=='start'" :percentage="scope.row.loadProgress||0"></el-progress>
                    <el-progress  v-if="scope.row.progressFlag=='fail'" :percentage="100" status="warning"></el-progress>
                    <span v-if="scope.row.progressFlag=='stop'||scope.row.progressFlag==null">已上传</span>
                  </template>
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
                    <el-link :underline="false" @click="handleRemove1(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
            <p>
              <span>招标公告附件: </span>
              <!--<el-button-->
                <!--v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"-->
                <!--size="small"-->
                <!--type="primary"-->
                <!--@click="openFileUp('/api/contract/topInfo/CommonFiles/contractInfo/04/uploadFile','fileList4')">-->
                <!--点击上传-->
              <!--</el-button>-->

              <el-upload
                :headers="{'Authorization':Authorization}"
                v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                class="upload-demo detailUpload detatil-flie-btn"
                :action="'/api/contract/topInfo/CommonFiles/contractInfo/04/uploadFile'"
                :on-change="( file, fileList)=>{uploadPorgress( file, fileList,detailform.fileList4)}"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                multiple
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <!--<el-upload-->
              <!--ref="fileList2"-->
              <!--v-show="p.actpoint !== 'look'"-->
              <!--class="upload-demo detailUpload detatil-flie-btn"-->
              <!--:action="'/api/contract/topInfo/CommonFiles/contractInfo/02/uploadFile'"-->
              <!--:on-success="handleChange2"-->
              <!--:on-error="handleChange2"-->
              <!--:on-remove="handleRemove2"-->
              <!--:show-file-list="detailform.fileList2.showFile"-->
              <!--multiple-->
              <!--&gt;-->
              <!--<el-button size="small" type="primary">点击上传</el-button>-->
              <!--</el-upload>-->
            </p>
            <el-table
              :data="detailform.fileList4"
              :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
              @selection-change="handleSelectionChange"
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
              <el-table-column align="center"  :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

              </el-table-column>

              <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{(scope.row.fileSize/1024).toFixed(2)}}
                </template>
              </el-table-column>
              <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

              </el-table-column>
              <el-table-column align="center" width="200" :resizable="false" label="上传进度" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-progress v-if="scope.row.progressFlag=='start'" :percentage="scope.row.loadProgress||0"></el-progress>
                  <el-progress  v-if="scope.row.progressFlag=='fail'" :percentage="100" status="warning"></el-progress>
                  <span v-if="scope.row.progressFlag=='stop'||scope.row.progressFlag==null">已上传</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :resizable="false"
                fixed="right"
                label="操作"
                show-overflow-tooltip
                width="80"
              >
                <template slot-scope="scope">
                  <el-link :underline="false" @click="attachmentDownload(scope.row)" type="warning" :style="(p.actpoint != 'look'&&p.actpoint !== 'task')?'color: #409EFF;margin-right: 3px;':'color: #409EFF;'">下载</el-link>
                  <el-link v-show="p.actpoint!=='look'&&p.actpoint!=='task'" :underline="false" @click="handleRemove4(scope.row,scope.$index)" type="warning">删除</el-link>
                </template>
              </el-table-column>
            </el-table>
            <p>
              <span>合同附件: </span>
              <!--<el-button-->
                <!--v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"-->
                <!--size="small"-->
                <!--type="primary"-->
                <!--@click="openFileUp('/api/contract/topInfo/CommonFiles/contractInfo/02/uploadFile','fileList2')">-->
                <!--点击上传-->
              <!--</el-button>-->

              <el-upload
                :headers="{'Authorization':Authorization}"
                v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                class="upload-demo detailUpload detatil-flie-btn"
                :action="'/api/contract/topInfo/CommonFiles/contractInfo/02/uploadFile'"
                :on-change="( file, fileList)=>{uploadPorgress( file, fileList,detailform.fileList2)}"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                multiple
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <!--<el-upload-->
                <!--ref="fileList2"-->
                <!--v-show="p.actpoint !== 'look'"-->
                <!--class="upload-demo detailUpload detatil-flie-btn"-->
                <!--:action="'/api/contract/topInfo/CommonFiles/contractInfo/02/uploadFile'"-->
                <!--:on-success="handleChange2"-->
                <!--:on-error="handleChange2"-->
                <!--:on-remove="handleRemove2"-->
                <!--:show-file-list="detailform.fileList2.showFile"-->
                <!--multiple-->
              <!--&gt;-->
                <!--<el-button size="small" type="primary">点击上传</el-button>-->
              <!--</el-upload>-->
            </p>
            <el-table
              :data="detailform.fileList2"
              :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
              @selection-change="handleSelectionChange"
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
              <el-table-column align="center"  :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

              </el-table-column>

              <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{(scope.row.fileSize/1024).toFixed(2)}}
                </template>
              </el-table-column>
              <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

              </el-table-column>
              <el-table-column align="center" width="200" :resizable="false" label="上传进度" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-progress v-if="scope.row.progressFlag=='start'" :percentage="scope.row.loadProgress||0"></el-progress>
                  <el-progress  v-if="scope.row.progressFlag=='fail'" :percentage="100" status="warning"></el-progress>
                  <span v-if="scope.row.progressFlag=='stop'||scope.row.progressFlag==null">已上传</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :resizable="false"
                fixed="right"
                label="操作"
                show-overflow-tooltip
                width="80"
              >
                <template slot-scope="scope">
                  <el-link :underline="false" @click="attachmentDownload(scope.row)" type="warning" :style="(p.actpoint != 'look'&&p.actpoint !== 'task')?'color: #409EFF;margin-right: 3px;':'color: #409EFF;'">下载</el-link>
                  <el-link v-show="p.actpoint!=='look'&&p.actpoint!=='task'" :underline="false" @click="handleRemove2(scope.row,scope.$index)" type="warning">删除</el-link>
                </template>
              </el-table-column>
            </el-table>
            <p >
              <span>工程量清单和劳材机附件(两种文件都要): </span>
              <!--<el-button-->
                <!--v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"-->
                <!--size="small"-->
                <!--type="primary"-->
                <!--@click="openFileUp('/api/contract/topInfo/CommonFiles/contractInfo/03/uploadFile','fileList3')">-->
                <!--点击上传-->
              <!--</el-button>-->

              <el-upload
                :headers="{'Authorization':Authorization}"
                v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                class="upload-demo detailUpload detatil-flie-btn"
                :action="'/api/contract/topInfo/CommonFiles/contractInfo/03/uploadFile'"
                :on-change="( file, fileList)=>{uploadPorgress( file, fileList,detailform.fileList3)}"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                multiple
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <!--<el-upload-->
                <!--ref="fileList3"-->
                <!--v-show="p.actpoint !== 'look'"-->
                <!--class="upload-demo detailUpload detatil-flie-btn"-->
                <!--:action="'/api/contract/topInfo/CommonFiles/contractInfo/03/uploadFile'"-->
                <!--:on-success="handleChange3"-->
                <!--:on-error="handleChange3"-->
                <!--:on-remove="handleRemove3"-->
                <!--:show-file-list="detailform.fileList3.showFile"-->
                <!--multiple-->
              <!--&gt;-->
                <!--<el-button size="small" type="primary">点击上传</el-button>-->
              <!--</el-upload>-->
            </p>
            <el-table
              :data="detailform.fileList3"
              :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
              @selection-change="handleSelectionChange"
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
              <el-table-column align="center"  :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

              </el-table-column>

              <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{(scope.row.fileSize/1024).toFixed(2)}}
                </template>
              </el-table-column>
              <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

              </el-table-column>
              <el-table-column align="center" width="200" :resizable="false" label="上传进度" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-progress v-if="scope.row.progressFlag=='start'" :percentage="scope.row.loadProgress||0"></el-progress>
                  <el-progress  v-if="scope.row.progressFlag=='fail'" :percentage="100" status="warning"></el-progress>
                  <span v-if="scope.row.progressFlag=='stop'||scope.row.progressFlag==null">已上传</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :resizable="false"
                fixed="right"
                label="操作"
                show-overflow-tooltip
                width="80"
              >
                <template slot-scope="scope">
                  <el-link :underline="false" @click="attachmentDownload(scope.row)" type="warning" :style="(p.actpoint != 'look'&&p.actpoint !== 'task')?'color: #409EFF;margin-right: 3px;':'color: #409EFF;'">下载</el-link>
                  <el-link v-show="p.actpoint!=='look'&&p.actpoint!=='task'" :underline="false" @click="handleRemove3(scope.row,scope.$index)" type="warning">删除</el-link>
                </template>
              </el-table-column>
            </el-table>
            <p>
              <span >标段信息: </span>
              <el-button
                v-show="p.actpoint !== 'look'&&detailform.searchProject!=true&&p.actpoint !== 'task'"
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
              <el-table-column align="center" :width="200" :resizable="false" label="标段名称" prop="sectionName" show-overflow-tooltip>
                <!--<template slot-scope="scope">-->
                <!--<el-form-item-->
                <!--:prop="'topInfoSectionList.'+scope.$index+'.inforName'"-->
                <!--:rules="{-->
                <!--required: true, message: '此项不能为空', trigger: 'blur'-->
                <!--}"-->
                <!--label-width="0"-->
                <!--&gt;-->
                <!--<el-input max-length=50 clearable :disabled="p.actpoint==='look'"  v-model="scope.row.inforName"></el-input>-->
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
              <template slot-scope="scope">{{
                    scope.row.dateOfBidOpeningName | dateformat
                  }}</template>
              </el-table-column>

              <el-table-column align="center" :width="200" :resizable="false" label="参与投标单位" prop="participatingUnitsName" show-overflow-tooltip>

              </el-table-column>

              <!-- <el-table-column align="center" width="200" :resizable="false" label="其他投标单位(系统内)" prop="part" show-overflow-tooltip>
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

              </el-table-column> -->

              <el-table-column align="center" width="200" :resizable="false" label="项目经理" prop="projectManager" show-overflow-tooltip>

              </el-table-column>

              <el-table-column align="center" width="200" :resizable="false" label="项目副经理" prop="deputyProjectManager" show-overflow-tooltip>

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
                v-if="p.actpoint!=='look'&&p.actpoint!=='task'"
                align="center"
                width="150"
              >
                <template slot-scope="scope">
                  <el-link
                    v-show="detailform.searchProject!=true"
                    :underline="false"
                    @click="del(scope.$index,scope.row,detailform.contractInfoSectionList,'bd')"
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

        </div>
      </el-tab-pane>
      <el-tab-pane v-if="detailform.contractInfo.isInSystemUnion==='0'||detailform.contractInfo.isInSystemSub==='0'||detailform.contractInfo.isOutSystemUnion==='0'||detailform.contractInfo.isOutSystemSub==='0'||detailform.contractInfo.isInGroupSub==='0'" label="合同附属信息">
        <div class="detailBoxBG htfs">
          <div  v-if="detailform.contractInfo.isInSystemUnion==='0'">
            <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
              <span>系统内其他联合体单位列表: </span>
              <el-button
                v-show="p.actpoint != 'look'&&p.actpoint!='task'"
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
                    disabled
                    v-model="scope.row.orgName"
                    class="input-el-input-group">
                    <el-button  v-if="p.actpoint != 'look'&&p.actpoint!='task'" slot="append" icon="el-icon-circle-plus-outline"  @click="addDw('单位名称','',false,scope.$index,'unionContractInfoAttachList')" ></el-button>
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
                v-if="p.actpoint != 'look'&&p.actpoint!='task'"
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
                    disabled
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
                v-if="p.actpoint != 'look'&&p.actpoint!='task'"
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
                v-if="p.actpoint != 'look'&&p.actpoint!='task'"
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
                v-if="p.actpoint != 'look'&&p.actpoint!='task'"
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
                    disabled
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
      <el-tab-pane label="工程量清单" v-if="isImportChangeVal&&!p.pushId&&(detailform.contractInfo.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'||detailform.contractInfo.enginTypeFirstId=='24ebba9f2f3447579d0086209aff6ecd'||detailform.contractInfo.enginTypeFirstId=='f6f5188458ab4c5ba1e0bc12a9a4188b'||detailform.contractInfo.enginTypeFirstId=='0f16c387f17b402db45c4de58e1cf8b4'||detailform.contractInfo.enginTypeFirstId=='193b4d4003d04899a1d09c8d5f7877fe')">
        <div class="detailBoxBG gclqd">
          <el-tabs v-model="gclName" @tab-click="getRailwayList" v-if="detailform.contractInfo.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'" type="border-card">
            <el-tab-pane name="0" label="第一章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'1','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('铁路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="编码"
                    prop="boqCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="节号"
                    prop="sectionNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="1" label="第二章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'2','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('铁路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="编码"
                    prop="boqCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="节号"
                    prop="sectionNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2" label="第三章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'3','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('铁路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="编码"
                    prop="boqCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="节号"
                    prop="sectionNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="3" label="第四章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden; margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'4','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('铁路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="编码"
                    prop="boqCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="节号"
                    prop="sectionNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="4" label="第五章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'5','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('铁路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="编码"
                    prop="boqCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="节号"
                    prop="sectionNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="5" label="第六章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'6','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('铁路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="编码"
                    prop="boqCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="节号"
                    prop="sectionNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="6" label="第七章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'7','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('铁路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="编码"
                    prop="boqCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="节号"
                    prop="sectionNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="7" label="第八章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'8','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('铁路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="编码"
                    prop="boqCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="节号"
                    prop="sectionNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="8" label="第九章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'9','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('铁路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="编码"
                    prop="boqCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="节号"
                    prop="sectionNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="9" label="第十章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'10','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('铁路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="编码"
                    prop="boqCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="节号"
                    prop="sectionNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="10" label="第十一章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'11','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('铁路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="编码"
                    prop="boqCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="节号"
                    prop="sectionNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-tabs v-model="gclName" @tab-click="getHighwayList" v-if="detailform.contractInfo.enginTypeFirstId=='24ebba9f2f3447579d0086209aff6ecd'" type="border-card">
            <el-tab-pane name="0" label="第100章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'100','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('公路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="子目号"
                    prop="itemNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="子目名称"
                    prop="itemName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单位"
                    prop="measureUnit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="数量"
                    align="center"
                    prop="amount"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="1" label="第200章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'200','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('公路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="子目号"
                    prop="itemNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="子目名称"
                    prop="itemName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单位"
                    prop="measureUnit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="数量"
                    align="center"
                    prop="amount"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2" label="第300章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'300','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('公路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="子目号"
                    prop="itemNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="子目名称"
                    prop="itemName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单位"
                    prop="measureUnit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="数量"
                    align="center"
                    prop="amount"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="3" label="第400章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'400','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('公路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="子目号"
                    prop="itemNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="子目名称"
                    prop="itemName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单位"
                    prop="measureUnit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="数量"
                    align="center"
                    prop="amount"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="4" label="第500章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'500','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('公路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="子目号"
                    prop="itemNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="子目名称"
                    prop="itemName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单位"
                    prop="measureUnit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="数量"
                    align="center"
                    prop="amount"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="5" label="第600章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'600','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('公路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="子目号"
                    prop="itemNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="子目名称"
                    prop="itemName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单位"
                    prop="measureUnit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="数量"
                    align="center"
                    prop="amount"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="6" label="第700章">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'700','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('公路工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="子目号"
                    prop="itemNo"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="子目名称"
                    prop="itemName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单位"
                    prop="measureUnit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="数量"
                    align="center"
                    prop="amount"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-tabs v-model="gclName" @tab-click="getRailList" v-if="detailform.contractInfo.enginTypeFirstId=='f6f5188458ab4c5ba1e0bc12a9a4188b'" type="border-card">
            <el-tab-pane name="0" label="城市轨道工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('城市轨道工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="人工费"
                    align="center"
                    prop="laborCost"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="材料费"
                    prop="materialCost"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="设备费"
                    prop="deviceCost"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="施工机具使用费"
                    prop="toolUsedCost"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="企业管理费"
                    prop="busiManagerCost"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="风险费"
                    prop="riskCost"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="利润"
                    prop="profit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="规费"
                    prop="fees"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="税金"
                    prop="taxes"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-tabs v-model="gclName" @tab-click="getMunicipal" v-if="detailform.contractInfo.enginTypeFirstId=='0f16c387f17b402db45c4de58e1cf8b4'" type="border-card">
            <el-tab-pane name="0" label="市政工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('市政工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="项目分类"
                    prop="projectType"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目编码"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="项目特征"
                    align="center"
                    prop="projectProp"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="计量单位"
                    prop="measureUnit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-tabs v-model="gclName" @tab-click="getHouseList" v-if="detailform.contractInfo.enginTypeFirstId=='193b4d4003d04899a1d09c8d5f7877fe'" type="border-card">
            <el-tab-pane name="0" label="电气工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <span>电气工程列表: </span>
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'ELEC','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('房建工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                :data="gclList"
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
                  label="项目编码"
                  prop="projectCode"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="项目名称"
                  prop="projectName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="项目名称描述"
                  prop="projectProp"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="计量单位"
                  align="center"
                  prop="measureUnit"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="工程量"
                  prop="workAmount"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="综合单价(元)"
                  prop="singlePrice"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="合价(元)"
                  prop="sumPrice"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="暂估价(元)"
                  prop="tempPrice"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>

              </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="1" label="给排水工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <span>给排水工程列表: </span>
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'RUNWATER','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('房建工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="项目编码"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称描述"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2" label="基坑支护工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <span>基坑支护工程列表: </span>
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'PITSUP','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('房建工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="项目编码"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称描述"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="3" label="建筑工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <span>建筑工程列表: </span>
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'BUILD','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('房建工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="项目编码"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称描述"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="4" label="空调水工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <span>空调水工程列表: </span>
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'AIRWATER','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('房建工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="项目编码"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称描述"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="5" label="弱电工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <span>弱电列表: </span>
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'WEAKELEC','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('房建工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="项目编码"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称描述"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="6" label="通风空调工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <span>通风空调列表: </span>
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'VENT','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('房建工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="项目编码"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称描述"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="7" label="土方工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <span>土方工程列表: </span>
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'EARTH','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('房建工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="项目编码"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称描述"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="8" label="消防电工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <span>消防电工程列表: </span>
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'FIREELEC','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('房建工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="项目编码"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称描述"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="9" label="消防工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <span>消防工程列表: </span>
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'FIRE','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('房建工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="项目编码"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称描述"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane name="10" label="装饰工程">
              <div class="htfs">
                <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                  <span>装饰工程列表: </span>
                  <el-upload
                    v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                    class="inline-block"
                    :action="'/api/contract/BoqWorkAmountList/import'"
                    :on-success="importDataGCL"
                    :headers="{'Authorization':Authorization}"
                    :data="{'sectionCode':'DECORATE','typeCode':detailform.contractInfo.enginTypeFirstId,'contractInfoId':id}"
                    :on-error="importDataGCL"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    multiple
                  >
                    <el-button size="small" type="primary">导入</el-button>
                  </el-upload>
                  <el-button @click="exportGcl('房建工程')" type="primary" plain v-if="p.actpoint != 'look'&&p.actpoint != 'task'">下载模板</el-button>
                </p>
                <el-table
                  :data="gclList"
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
                    label="项目编码"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称描述"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="计量单位"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程量"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="综合单价(元)"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合价(元)"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="暂估价(元)"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                </el-table>
                <el-pagination
                  class="gcl-pagination"
                  :current-page="gcl_current"
                  :page-size="gcl_size"
                  :page-sizes="[20, 50, 100]"
                  :total="gcl_total"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 5px"
                  v-if="gcl_total !== 0"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      <el-tab-pane label="实物工程量">
        <div class="detailBoxBG htfs">
          <div>
            <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
              <span>实物工程量列表: </span>
              <el-upload
                v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                class="inline-block"
                :action="'/api/contract/ContractInfoQuantityMachine/list/importQuantityNew'"
                :on-success="importData"
                :headers="{'Authorization':Authorization}"
                :data="{'contractInfoId':p.instid}"
                :on-error="importData"
                :show-file-list="false"
                accept=".xls,.xlsx"
                multiple
                :before-upload="projectUpload"
              >
                <el-button
                  type="primary"
                  plain
                  class="new-add-btn"
                ><i class="el-icon-download"></i>导入
                </el-button>
              </el-upload>
              <el-link @click="getDownload()" v-if="p.actpoint != 'look'&&p.actpoint != 'task'" class="downFile"  type="primary" >实物工程量导入模板下载</el-link>
            </p>
            <el-table
              :data="detailform.contractInfoQuantityMachineList1"
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
                prop="vjldw"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="总量"
                prop="vsum"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.vsum" @input="scope.row.vsum=scope.row.vsum.replace(/[^\d]/g,'')"/>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="旧实物工程量">
        <div class="detailBoxBG htfs">
          <div>
            <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
              <span>旧实物工程量列表: </span>
            </p>
            <el-table
              :data="oldEngineeringList"
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
                label="统计项名称"
                prop="vname"
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
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="劳材机统计">
        <div class="detailBoxBG htfs">
          <div>
            <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
              <span>劳材机统计列表: </span>
              <el-upload
                v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                class="inline-block"
                :action="'/api/contract/ContractInfoQuantityMachine/list/importMachine'"
                :on-success="importData"
                :headers="{'Authorization':Authorization}"
                :data="{'contractInfoId':p.instid}"
                :on-error="importData"
                :show-file-list="false"
                accept=".xls,.xlsx"
                multiple
              >
                <el-button
                  type="primary"
                  plain
                  class="new-add-btn"
                ><i class="el-icon-download"></i>导入
                </el-button>
              </el-upload>
              <!--<el-link v-if="p.actpoint != 'look'&&p.actpoint != 'task'" class="downFile"  type="primary" href="/static/lcjtj.xlsx" download="劳材机统计导入模板.xlsx">劳材机统计导入模板下载</el-link>-->
              <!--<el-link v-if="p.actpoint != 'look'&&p.actpoint != 'task'" class="downFile"  type="primary" @click="downModel('/api/contract/ContractInfoQuantityMachine/wood/downloadTemplate','劳材机统计导入模板')">劳材机统计导入模板下载</el-link>-->
              <el-link v-if="p.actpoint != 'look'&&p.actpoint != 'task'" class="downFile"  type="primary" href="/api/download/woodMachine" >劳材机统计导入模板下载</el-link>
            </p>
            <el-table
              :data="detailform.contractInfoQuantityMachineList2"
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
                label="名称"
                prop="vname"
                align="center"
                width="300"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="单位"
                prop="vjldw"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="数量"
                prop="vsum"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.vsum" @input="scope.row.vsum=scope.row.vsum.replace(/[^\d]/g,'')"/>
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
    <search-name  v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></search-name>
    <add-bd  v-if="BDCSVisible" ref="infoBD" @refreshBD="getBdInfo"></add-bd>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
    <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
    <!--多选的单位列表组件-->
    <company-mul v-if="companyMulStatus" ref="comAdd" @getComList="getComList"></company-mul>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import { isMoney,isURL } from '@/utils/validate'
  import SearchName from '../searchName'
  import AddBd from '../addBd'
  import CompanyTree from '../companyTree'
  import datas from '@/utils/position'
  import FileUpload from '@/components/fileUpload'
  import AuditProcess from '@/components/auditProcess'
  import companyMul from '@/components/companiesMultiple'
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
      oldEngineeringList:[],
      isImportChangeVal:false,
      companyMulStatus:false,//设计单位等多选列表状态
      yqList:[],//所属央企list
      extendList:[],//扩展字段list
      Authorization:sessionStorage.getItem("token"),
      ifOAS:false,
      gclList:[],//工程量清单列表
      gclName:'0',
      gcl_current:1,
      gcl_size:20,
      gcl_total:0,
      id:'',
      key: 0,
      treeStatas: false,
      positionIndex: '',//缓存当前的选中的项目地点的index
      infoCSVisible:false,//项目名称查询的状态
      BDCSVisible:false,//标段新增弹框状态
      DwVisible:false,//选择单位弹框状态
      uploadVisible:false,//上传附件组件状态
      options2: [],
      options: [],
      options1:[{label:"值",value:'111'}],
      constructionOrgList: [],
      detailform: {
        commonFilesList: [],
        contractInfo: {
          moduleId:'7f4fcba4255b43a8babf15afd6c04a53',
          moduleName:'工程承包',
          moduleCode:'engineering',
          marketSecondId:'',
          qualityOrgNames:'',
          enginTypeSecondId:'',
          isClientele:'1',
          designOrg: '',//设计单位
          designOrgId: '',
          constructionOrg:'',//建设单位
          constructionOrgId:'',
          contractOrgName:'',
          isOpenBid:'0'
        },
        contractInfoAttachBO: {
          innerContractInfoAttachList:[],
          unionContractInfoAttachList:[],
          outUnionContractInfoAttachList:[],
          outContractInfoAttachList:[],
          innerGroupContractInfoAttachList:[]
        },
        contractInfoSectionList: [],
        topInfoSiteList:[{
          country: '',
          ffid: '',
          path: '',
          contractAmount: '',
          isMain: '1',
          placeId:''
        }],
        contractInfoQuantityMachineList1:[],//实物工程量列表
        contractInfoQuantityMachineList2:[],//劳材机统计列表
        fileList1:[],
        fileList2:[],
        fileList3:[],
        fileList4:[],
        zplx:[],//装配类型
        jzlx:[],//建筑类型
        jzjglx:[],//建筑结构类型
        cdmc:[],//场地名称
      },
      topInfoSiteListCopy:[],//复制下来的项目地点列表,为了比对合同地点与关联项目地点不一致
      topInfoSiteListDifferent:false,//合同地点与关联项目地点不一致
      timer:'',
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
      sjdwList:[],
      jsdwList:[],
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      xqprojectType: [],//工程类别二级
      xqprojectTypeThree:[],//工程类别三级
      emergingMarketTwo:[],//新兴市场二级
      projectNatureTwo:[],//项目性质二级
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
    SearchName,
    AddBd,
    CompanyTree,
    FileUpload,
    AuditProcess,
    companyMul
  },
  computed: {
    railwayBureau(){//所属铁路局
      return this.$store.state.railwayBureau;
    },
    pubCustomers() {//客户名称
      return this.$store.state.pubCustomers;
    },
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
    projectPlate(){
      return this.$store.state.projectPlate;
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
        // this.ssList.push(_v)
      })
    })
    // this.$store.commit("setCategory", 'projectDomainType');
    this.id=this.p.instid;
    if (this.p.actpoint === "edit"||this.id||this.p.actpoint === "task") {
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
    this.$store.dispatch("getPubCustomers", {});
    this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
    this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
    // eslint-disable-next-line no-unde
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
        this.jsdwList= res.data.data.records;
        this.jsdwList.forEach((item1)=>{
          item1.value=item1.companyName;
          item1.customerName=item1.companyName;
          item1.customerId=item1.uuid;
        })
      });
    //扩展字段列表
    this.$http
      .post(
        "/api/contract/ContractInfoExpand/detail/findExpandByType",
      )
      .then((res) => {
        this.extendList = res.data.data;
      });
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
    // 获取旧实物工程量
    this.$http.post('/api/contract/ContractInfoQuantityMachine/list/showOldTjx').then((res) => {
      if (res.data.code === 200) {
        this.oldEngineeringList = res.data.data
      }
    });
  },
  methods: {
    //判断附件大小
    beforeAvatarUpload(file) {
      var fileLimit=Number(this.fileLimit);
      const isJPG = file.type === 'image/jpeg';
      const isLt100M = file.size / (1024 * fileLimit) < fileLimit;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt100M) {
        this.$message.error('上传文件大小不能超过 '+fileLimit+'MB!');
      }
      // return isJPG && isLt2M;
      return isLt100M;
    },
    //上传附件显示进度条
    uploadPorgress(file, fileList,tableList){
      // console.log(event, file, fileList,tableList);
      // console.log(fileList)
      const len=tableList.length;
      if (file.status === 'ready') {
        file.fileName=file.name;
        file.fileSize=file.size;
        // file.fileType=file.type;
        file.progressFlag = 'start'; // 显示进度条

        file.loadProgress=0;

        tableList.push(file);
        var that=this;
        tableList.forEach((item,index)=>{

          const interval = setInterval(() => {
            if (item&&item.loadProgress >= 90) {
              item.loadProgress = 90;
              if(file.response&&item.fileName==file.response.data.fileName&&file.response.data.progressFlag=='stop'){
                tableList[index]=file.response.data;
                // console.log(index,'==>',tableList[index])
                that.$set(tableList,index,tableList[index])
                // console.log(tableList[index])
              }

              clearInterval(interval);
              return
            }
            if(item.progressFlag == 'start'){
              item.loadProgress += 20;//进度条进度
              // that.$set(tableList[len],tableList[len])
              that.$set(tableList,index,tableList[index])
              // console.log(tableList[len].loadProgress)

            }
            if(file.response&&file.response.data.progressFlag=='fail'){
              tableList[index].progressFlag='fail';
              this.$set(tableList,tableList)
            }
          }, 600);
        });

      }
      if (file.response && file.response.code === 200) {
        // console.log(tableList.length)
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1000,
          onClose: () => {
            // const len=tableList.length;

            file.response.data.progressFlag='stop';
            tableList.forEach((item,index)=>{
              if(item.fileName==file.response.data.fileName&&item.progressFlag!='stop'){
                tableList[index]=file.response.data;
                // console.log(index,'==>',tableList[index])
                this.$set(tableList,index,tableList[index])
                // console.log(tableList[index])
              }
            })
            // tableList[len-1]=file.response.data;

          }
        })
      }else if(file.response && file.response.code !== 200){
        // tableList[len-1].progressFlag = 'fail';
        file.response.data.progressFlag='fail';
        this.$set(tableList,tableList)
        this.$message.error(file.response.msg);
      }

      this.$forceUpdate();
    },
    // 上传模板
    projectUpload(){
      if(this.p.actpoint=='add'){
        this.$message({
          message: '请先保存！',
          type: 'warning',
          showClose: true,
        });
        return false
      }
      if (!this.detailform.contractInfo.enginTypeFirstId) {
        this.$message({
          message: '请选择工程类别（一级）！',
          type: 'warning',
          showClose: true,
        });
        return false
      }
    },
    // 下载模板
     getDownload(){
       if (!this.detailform.contractInfo.enginTypeFirstId) {
         this.$message({
          message: '请选择工程类别（一级）！',
          type: 'warning',
          showClose: true,
        });
         return false
       }
       let name = "实物工程量"
        this.$http
        .post(
          '/api/contract/ContractInfoQuantityMachine/list/exportDataToExcel',
          {enginTypeFirstId: this.detailform.contractInfo.enginTypeFirstId},
          { responseType: 'blob' }
        )
        .then((res) => {
          const content = res.data;
          const blob = new Blob([content])
          let url = window.URL.createObjectURL(blob);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', name+'.xlsx');
          document.body.appendChild(link);
          link.click();
        })
      },
    // 附件下载
    attachmentDownload(file){
      this.$handleDownload(file)
    },
    //劳材机模板下载
    downModel(url,name){
      this.$http
        .post(
          url,
          { responseType:'blob' }
        )
        .then((res) => {
          const content = res.data;
          const blob = new Blob([content])
          let url = window.URL.createObjectURL(blob);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', name+'.xls');
          document.body.appendChild(link);
          link.click();
        })
    },
    //打开多选的单位列表
      openComMul(ids,names,url,type){
        this.companyMulStatus=true;
        this.$nextTick(() => {
          this.$refs.comAdd.init(ids,names,url,type);
        })
      },
      //获取拿过来的多选单位列表
      getComList(data){
        this.$forceUpdate();
         if (data.type == "设计单位") {
          this.detailform.contractInfo.designOrgId=data.selIdList.join(",");
          this.detailform.contractInfo.designOrg=data.selList.join(",");
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
            this.topInfoSiteListCopy[i].contractAmount=Number(this.topInfoSiteListCopy[i].contractAmount);
            this.detailform.topInfoSiteList[i].contractAmount=Number(this.detailform.topInfoSiteList[i].contractAmount);
          };
          if( JSON.stringify(this.topInfoSiteListCopy) != JSON.stringify(this.detailform.topInfoSiteList)){
            this.topInfoSiteListDifferent=true;
          }
        }
      }
    },
     //建设单位下拉赋值
      companyBuildChange(){
        this.detailform.contractInfo.constructionOrgId = this.constructionOrgList.join(",")
        this.getBuildName();
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
          let outside = this.jsdwList.find(item2=>item2.customerId===idCheck)
          if(outside){
            nameList.push(outside.customerName)
          }

        })
        this.detailform.contractInfo.constructionOrg = nameList.join(",")
      },
      //切换是否客户
      companyBuildClear(){
        this.detailform.contractInfo.constructionOrgId = '',
        this.constructionOrgList = []
      },
    //工程量清单下载模板
    exportGcl(name){
      this.$http
        .post(
          '/api/contract/BoqWorkAmountList/import/downloadTemplate',
          {typeCode:this.detailform.contractInfo.enginTypeFirstId},
          { responseType:'blob' }
        )
        .then((res) => {
          // let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
          // let objectUrl = URL.createObjectURL(blob);
          // window.location.href = objectUrl;
          const content = res.data;
          const blob = new Blob([content])
          const fileName = name+new Date().toLocaleDateString()+'.xlsx'
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        })
    },
    //工程量清单导入
    importDataGCL(response, file, fileList) {
      if (response && response.code === 200) {
        this.$message({
          message: "导入成功",
          type: "success",
          duration: 1500,
          onClose: () => {
            this.getGclList(this.detailform.contractInfo.enginTypeFirstId,this.SectionTableName);
          },
        });
      } else {
        this.$message.error(response.msg);
      }
    },
    handleRemove4(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.detailform.fileList4.splice(index,1);
          }

        });
      console.log(this.detailform.fileList1)
    },
    //实物工程量和劳材机统计导入
    importData(response, file, fileList) {
      if (response && response.code === 200) {
        this.$message({
          message: "导入成功",
          type: "success",
          duration: 1500,
          onClose: () => {
            this.getDetail();
          },
        });
      } else {
        this.$message.error(response.msg);
      }
    },
    //设置我方份额含补充
    getOurAmountSupply(){
      if(this.detailform.contractInfo.ourAmountSupply==null||this.ifOAS){
        this.detailform.contractInfo.ourAmountSupply=this.detailform.contractInfo.ourAmount;
        this.ifOAS=true;
      }
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
    //设计单位搜索
    querySjdw(queryString, cb) {
      var restaurants = this.sjdwList;
      var results = queryString ? restaurants.filter(this.createStateFilter2(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.$forceUpdate();
        cb(results);
      }, 500 * Math.random());
    },
    //获取远程搜索的id
    getautoCompleteName(name,id){
      if(name!=null&&name!=''&&name!=undefined&&this.sjdwList.find((item)=>item.value==name)){
        this.detailform.contractInfo[id]=this.sjdwList.find((item)=>item.value==name).uuid;
      }
    },
    createStateFilter2(queryString) {
      return (restaurants) => {
        return (restaurants.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
      };
    },
    //工程量清单页码改变
    handleSizeChange(val) {
      this.gcl_size = val;
      this.getGclList(this.detailform.contractInfo.enginTypeFirstId,this.SectionTableName);
    },
    handleCurrentChange(val) {
      this.gcl_current = val;
      this.getGclList(this.detailform.contractInfo.enginTypeFirstId,this.SectionTableName);
    },
    //判断调用哪个工程量清单列表
    getGclList(id,SectionTableName){
      if(id=='17ff5c08d36b41ea8f2dc2e9d3029cac'){
        this.getRailwayList('','',SectionTableName);
      }else if(id=='24ebba9f2f3447579d0086209aff6ecd'){
        this.getHighwayList('','',SectionTableName);
      }else if(id=='f6f5188458ab4c5ba1e0bc12a9a4188b'){
        this.getRailList();
      }else if(id=='0f16c387f17b402db45c4de58e1cf8b4'){
        this.getMunicipal();
      }else if(id=='193b4d4003d04899a1d09c8d5f7877fe'){
        this.getHouseList('','',SectionTableName);
      }
    },
    //获取铁路工程量清单列表
    getRailwayList(tab, event,SectionTableName){
      this.SectionTableName='';
      var id=event?event.target.getAttribute('id'):'tab-0';
      id=Number(id.split("-")[1])+1;
      // this.SectionTableName=SectionTableName?SectionTableName:'BOQ_WORKAL_RAILWAY_'+id;
      if(!SectionTableName){
        this.gcl_current = 1;
      }
      this.$http
        .post(
          "/api/contract/BoqWorkAmountList/list/loadRailwayPageData",
          {
            "contractInfoId":this.id,
            // 'SectionTableName':this.SectionTableName,
            'sectionCode':id,
            "size":this.gcl_size,
            "current":this.gcl_current
          }
        )
        .then((res) => {
        this.gclList=res.data.data.records;
        this.gcl_total=res.data.data.total;
      });
    },
    //获取公路工程量清单列表
    getHighwayList(tab, event,SectionTableName){
      this.SectionTableName='';
      var id=event?event.target.getAttribute('id'):'tab-0';
      id=Number(id.split("-")[1])+1;
      this.SectionTableName=SectionTableName?SectionTableName:'BOQ_WORKAL_ROAD_'+id+"00";
      if(!SectionTableName){
        this.gcl_current = 1;
      }
      this.$http
        .post(
          "/api/contract/BoqWorkAmountList/list/loadRoadPageData",
          {
            "contractInfoId":this.detailform.contractInfo.uuid,
            // 'SectionTableName':this.SectionTableName,
            'sectionCode':id+"00",
            "size":this.gcl_size,
            "current":this.gcl_current
          }
        )
        .then((res) => {
        this.gclList=res.data.data.records;
      this.gcl_total=res.data.data.total;
    });
    },
    //获取轨道交通工程量清单列表
    getRailList(tab, event){
      this.SectionTableName='';
      var id=event?event.target.getAttribute('id'):'tab-0';
      id=Number(id.split("-")[1])+1;
      this.SectionTableName='BOQ_WORKAL_RAILPATH';
      this.$http
        .post(
          "/api/contract/BoqWorkAmountList/list/loadRailpathPageData",
          {
            "contractInfoId":this.detailform.contractInfo.uuid,
            // 'SectionTableName':this.SectionTableName,
            "size":this.gcl_size,
            "current":this.gcl_current
          }
        )
        .then((res) => {
        this.gclList=res.data.data.records;
      this.gcl_total=res.data.data.total;
    });
    },
    //获取市政工程量清单列表
    getMunicipal(tab, event){
      this.SectionTableName='';
      var id=event?event.target.getAttribute('id'):'tab-0';
      id=Number(id.split("-")[1])+1;
      this.SectionTableName='BOQ_WORKAL_GOV';
      this.$http
        .post(
          "/api/contract/BoqWorkAmountList/list/loadGovPageData",
          {
            "contractInfoId":this.detailform.contractInfo.uuid,
            // 'SectionTableName':this.SectionTableName,
            "size":this.gcl_size,
            "current":this.gcl_current
          }
        )
        .then((res) => {
        this.gclList=res.data.data.records;
        this.gcl_total=res.data.data.total;
    });
    },
    //获取房建工程量清单列表
    getHouseList(tab, event,SectionTableName){
      this.SectionTableName='';
      var id=event?event.target.getAttribute('id'):'tab-0';
      id=Number(id.split("-")[1])+1;
      var nameList={
        '1':'ELEC',
        '2':'RUNWATER',
        '3':'PITSUP',
        '4':'BUILD',
        '5':'AIRWATER',
        '6':'WEAKELEC',
        '7':'VENT',
        '8':'EARTH',
        '9':'FIREELEC',
        '10':'FIRE',
        '11':'DECORATE',
      };
      this.SectionTableName=SectionTableName?SectionTableName:'BOQ_WORKAL_HOUSEBUILD_'+nameList[id];
      if(!SectionTableName){
        this.gcl_current = 1;
      }
      this.$http
        .post(
          "/api/contract/BoqWorkAmountList/list/loadHouseBuildPageData",
          {
            "contractInfoId":this.detailform.contractInfo.uuid,
            // 'SectionTableName':this.SectionTableName,
            'sectionCode':nameList[id],
            "size":this.gcl_size,
            "current":this.gcl_current
          }
        )
        .then((res) => {
        this.gclList=res.data.data.records;
        this.gcl_total=res.data.data.total;
    });
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
    //解决新增的时候二级联动清除不了
    clear(id,name){
      // id='';
      // name='';
      this.detailform.contractInfo[id]='';
      this.detailform.contractInfo[name]='';
      this.$forceUpdate();
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
      this.$forceUpdate();
      this.detailform[data.list]=this.detailform[data.list].concat(data.fileList);
      this.uploadVisible = false;
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
    //获取其他投资
    getOther(){
      this.$forceUpdate();
      this.detailform.contractInfo.otherInvest=this.detailform.contractInfo.ourAmount-this.detailform.contractInfo.installDesignFee>0?this.detailform.contractInfo.ourAmount-this.detailform.contractInfo.installDesignFee:0;
      this.getOurAmount('','','nfb','installDesignFee');
      this.$set(this.detailform.contractInfo,this.detailform.contractInfo)
    },
    //上传改变时
    fileChage1(file, fileList){
      this.$forceUpdate();
      // this.detailform.fileList1.percentage=30;
      // this.detailform.fileList1.percentage=50;
      // this.detailform.fileList1.status='success';
      this.detailform.fileList1.showFile=true;
      if(file.status==='success'){
        // this.detailform.fileList1.percentage=100;
        // this.detailform.fileList1.status='success';
        this.detailform.fileList1.showFile=false;
      }
      if(file.status==='fail'){
        // this.detailform.fileList1.percentage=60;
        // this.detailform.fileList1.status='exception';

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
          // this.detailform.fileList1.percentage=null;
          // this.detailform.fileList1.status=null;
          this.detailform.fileList1.showFile=false;
          this.$refs.fileList1.clearFiles();
      }
      })
      } else {
        this.$message({
          message: '上传失败',
          type: 'error',
          duration: 1500,
          onClose: () => {
            this.$forceUpdate();
            this.detailform.fileList1.percentage=null;
            this.detailform.fileList1.status=null;
          }
        })
      }
    },
    //上传改变时
    fileChage2(file, fileList){
      this.$forceUpdate();
      this.detailform.fileList2.showFile=true;
      if(file.status==='success'){
        this.detailform.fileList2.showFile=false;
      }
      if(file.status==='fail'){
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
          this.detailform.fileList2.showFile=false;
          this.$refs.fileList2.clearFiles();
      }
      })
      } else {
        this.$message({
          message: '上传失败',
          type: 'error',
          duration: 1500,
          onClose: () => {
          this.$forceUpdate();
        this.detailform.fileList2.percentage=null;
        this.detailform.fileList2.status=null;
      }
      })
      }
    },
    //上传改变时
    fileChage3(file, fileList){
      this.$forceUpdate();
      this.detailform.fileList3.showFile=true;
      if(file.status==='success'){
        this.detailform.fileList3.showFile=false;
      }
      if(file.status==='fail'){
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
          this.detailform.fileList3.showFile=false;
          this.$refs.fileList3.clearFiles();
      }
      })
      } else {
        this.$message({
          message: '上传失败',
          type: 'error',
          duration: 1500,
          onClose: () => {
          this.$forceUpdate();
        this.detailform.fileList3.percentage=null;
        this.detailform.fileList3.status=null;
      }
      })
      }
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
      this.$forceUpdate();
      var id=[],name=[];
      if(data&&data.type!='单位名称'&&data.type!='承揽所属机构'){
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
      }else if(data.type=='单位名称'){
        this.detailform.contractInfoAttachBO[data.tableList][data.index].orgId=data.code;
        this.detailform.contractInfoAttachBO[data.tableList][data.index].orgName=data.name;
        this.$set(this.detailform.contractInfoAttachBO[data.tableList][data.index],this.detailform.contractInfoAttachBO[data.tableList][data.index]);
      }else if(data.type=="承揽所属机构"){
        this.detailform.contractInfo.contractOrgId=data.code;
        this.detailform.contractInfo.contractOrgName=data.name;
        this.$http.post("/api/contract/contract/ContractInfo/detail/orgCodeToRegion",{orgCode:data.code},).then((res) => {
          this.ssList = res.data.data
        });
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
      this.$forceUpdate();
      if(data.type=='add'){
        this.detailform.contractInfoSectionList.push(data)
      }else{
        // this.detailform.contractInfoSectionList[data.index]=data;
        this.$set(this.detailform.contractInfoSectionList,data.index,data)
      }
      this.BDCSVisible=false;
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
    //获取模块名字
    getBdName(id, list, index) {
      if(id){
        this.$forceUpdate()
        list[index].moduleName=this.projectPlate.find(
          (item) => item.id == id
      ).detailName;
      }
    },
    //获取系统外联合体,系统外分包的单位名称
    getXtwName(id, list, index){
      if(id){
        this.$forceUpdate()
        list[index].orgName=this.sjdwList.find(
          (item) => item.id == id
        ).detailName;
      }
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
          .post("/api/contract/topInfo/TopInfor/detail/entityInfoByIdForContract", {uuid :data.data.uuid,sectionId:data.data.sectionIdList})
          .then((res) => {
          var datas=res.data.data;
        this.detailform.searchProject=true;
        this.detailform.contractInfo.topInforId=data.data.uuid;
        var _con={};
        this.getTwo(datas.topInfor.enginTypeFirstId);
        this.getTwoSC(datas.topInfor.marketFirstNameId);
        this.getTwoXZ(datas.topInfor.projectNatureFirstId);
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
        this.detailform.cdmc=datas.topInfor.siteNameId&&datas.topInfor.siteNameId.split(",");
        this.detailform.zplx=datas.topInfor.otherAssemblyTypeId&&datas.topInfor.otherAssemblyTypeId.split(",");
        this.detailform.jzlx=datas.topInfor.otherBuildingTypeId&&datas.topInfor.otherBuildingTypeId.split(",");
        this.detailform.jzjglx=datas.topInfor.otherBuildingStructureTypeId&&datas.topInfor.otherBuildingStructureTypeId.split(",");
        this.detailform.contractInfoSectionList=[];
        for(var i in datas.bidInfoSectionBOList){
          var bidInfoSection=datas.bidInfoSectionBOList[i].bidInfoSection,
            bidInfoSectionOrgList=datas.bidInfoSectionBOList[i].bidInfoSectionOrgList;
          this.detailform.contractInfo.bidTime=bidInfoSection.bidTime;
          this.detailform.contractInfo.bidNoticeWebsite=bidInfoSection.bidNoticeWebsite;
          bidInfoSection.uuid='';
          for(var k in bidInfoSection.bidInfoSectionOrgList){
            bidInfoSection.bidInfoSectionOrgList[k].uuid='';
          }
          bidInfoSection.contractInfoSectionOrgList=bidInfoSectionOrgList;
          this.detailform.contractInfoSectionList.push(bidInfoSection);
        }
        for(var i in datas.topInfoSiteList){
          datas.topInfoSiteList[i].uuid='';
          datas.topInfoSiteList[i].contractAmount='';
        }
        this.detailform.topInfoSiteList=datas.topInfoSiteList;

        this.topInfoSiteListDifferent=false;
        this.topInfoSiteListCopy=JSON.parse(JSON.stringify(this.detailform.topInfoSiteList));
        //系统内联合体列表
        if(datas.bidInfoBO.bidInfoInnerOrgList!=null&&datas.bidInfoBO.bidInfoInnerOrgList!=''){
          this.detailform.contractInfo.isInSystemUnion='0';
          datas.bidInfoBO.bidInfoInnerOrgList.forEach((item)=>{
            var v={
              orgName:item.innerOrgName,
              orgId:item.innerOrgId,
              contractInfoId:'',
              projectNature:'1',
              contractAmount:'',
              isAdd:'1'
            }
            this.detailform.contractInfoAttachBO.unionContractInfoAttachList.push(v)
          })
        }
        //系统外联合体列表
        if(datas.bidInfoBO.bidInfo.outOrg!=''&&datas.bidInfoBO.bidInfo.outOrg!=null){
          this.detailform.contractInfo.isOutSystemUnion='0';
          var v={
            orgName:datas.bidInfoBO.bidInfo.outOrg,
            orgId:datas.bidInfoBO.bidInfo.outOrgId,
            contractInfoId:'',
            projectNature:'3',
            contractAmount:'',
            isAdd:'1'
          }
          this.detailform.contractInfoAttachBO.outUnionContractInfoAttachList.push(v)
        }
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
          this.getTwo(datas.contractInfo.enginTypeFirstId);
          this.getTwoSC(datas.contractInfo.marketFirstNameId);
          this.getTwoXZ(datas.contractInfo.projectNatureFirstId);
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
          if(datas.contractInfo.constructionOrgId != '' ||datas.contractInfo.constructionOrgId != null){
            this.constructionOrgList = datas.contractInfo.constructionOrgId.split(",");
          }
          this.detailform.contractInfo.installDesignUnallocat=datas.contractInfo.installDesignUnallocat;
          if (this.detailform.contractInfo.contractOrgName) {
           this.$http.post("/api/contract/contract/ContractInfo/detail/orgCodeToRegion",{orgCode:this.detailform.contractInfo.contractOrgId},).then((res) => {
              this.ssList = res.data.data
            });
          }
        });
        this.$forceUpdate();
        this.infoCSVisible=false;
      }

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
    submit() {
    },
    //工程类别二级
    getTwo(id) {
      this.detailform.contractInfo.enginTypeSecondId='';
      this.xqprojectType=[];
      if(id!=''){
        //加载工程量清单
        if(this.p.actpoint !== "add"){
          this.gcl_current=1;
          this.gcl_size=20;
          this.gclName='0';
         this.getGclList(id)
        }
        this.projectDomainType.find(
          (item) => {
          if (item.id == id) {
          this.detailform.contractInfo.enginTypeFirstName = item.detailName;
          this.detailform.contractInfo.enginTypeFirstCode = item.detailCode;
          this.xqprojectType = item.children;
        }
      }
      )
      }
    },
    //获取工程类别三级
    getThree(id){
      this.detailform.contractInfo.enginTypeThirdId='';
      this.xqprojectTypeThree=[];
      if(id!=''){
        this.xqprojectType.find(
          (item) => {
            if (item.id == id) {
              this.detailform.contractInfo.enginTypeSecondName = item.detailName;
              this.detailform.contractInfo.enginTypeSecondCode = item.detailCode;
              this.xqprojectTypeThree = item.children||[];
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
          this.detailform.contractInfo.marketFirstCode = item.detailCode;
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
          this.detailform.contractInfo.projectNatureFirstCode = item.detailCode;
          this.projectNatureTwo = item.children;
        }
      }
      )
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
    saveInfo(formName,type) {
      this.detailform.commonFilesList=this.detailform.fileList1.concat(this.detailform.fileList2).concat(this.detailform.fileList3).concat(this.detailform.fileList4)
      var url='';
      this.detailform.contractInfo.constructionOrgId = this.constructionOrgList.join(",")
      if(this.detailform.searchProject==true&&(this.p.actpoint === "edit")){
        url='/api/contract/contract/ContractInfo/detail/update';
      }else{
        if(type=='save'){
          url='/api/contract/contract/ContractInfo/detail/saveOrUpdate';
        }else{
          if(this.detailform.searchProject==true){
            url='/api/contract/contract/ContractInfo/updateProcess/start';
          }else{
            url='/api/contract/contract/ContractInfo/process/start';
          }
        }
      }
      if(this.detailform.contractInfo.isClientele === null){
        this.detailform.contractInfo.isClientele = 0
      }
      if(this.detailform.contractInfo.isOpenBid === null){
        this.detailform.contractInfo.isOpenBid = 0
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
          if(this.detailform.fileList1.length==0&&this.detailform.fileList2.length==0){
            this.$message.error("中标通知书和合同附件必须传一个");
            return false;
          }
          if(this.detailform.fileList3.length<2){
            this.$message.error("工程量清单和劳材机两个文件必须都要上传");
            return false;
          }
          if(this.detailform.contractInfo.isImport=='0'&&this.detailform.fileList3.length==0){
            this.$message.error("导入清单为是的时候，工程量清单和劳材机两个文件必须都要上传");
            return false;
          }
          if(this.detailform.contractInfo.isOpenBid=='1'&&this.detailform.fileList4.length==0){
            this.$message.error("请上传招标公告文件");
            return false;
          }
          if(this.detailform.contractInfo.startTime>this.detailform.contractInfo.endTime){
            this.$message.error("合同竣工日期必须大于合同开工日期");
            return false;
          }
          if(this.detailform.contractInfo.isInSystemSub=='0'&&this.detailform.contractInfoAttachBO.innerContractInfoAttachList.length=='0'){
            this.$message.error("系统内分包单位列表不能为空");
            return false;
          }
          if(this.detailform.contractInfo.isInGroupSub=='0'&&this.detailform.contractInfoAttachBO.innerGroupContractInfoAttachList.length=='0'){
            this.$message.error("集团内分包单位列表不能为空");
            return false;
          }
          if(this.detailform.contractInfo.valueAddedTax<=0){
            this.$message.error("增值税需要大于0");
            return false;
          }
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
                if (type=='save') {
                  this.detailform.contractInfo.uuid = res.data.data.contractInfo.uuid
                } else {
                  this.$router.back()
                }
              }
            });

        } else {
          this.$message.error("请添加必填项和正确的数据格式");
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
          isMain: '',
          placeId:''
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
      }else if(type=='jtfb'){
        this.detailform.contractInfoAttachBO.innerGroupContractInfoAttachList.push(v);
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
      var fileList1=[],fileList2=[],fileList3=[],fileList4=[];
      this.$http
        .post("/api/contract/contract/ContractInfo/detail/entityInfo", {id:this.id})
        .then((res) => {
        var datas=res.data.data;

          datas.commonFilesList.forEach((item) => {
            if(item.businessCode=='01'||item.businessCode=='zb'){
               fileList1.push(item)
              }else if(item.businessCode=='02'||item.businessCode=='htfj'){
                fileList2.push(item)
              }else if(item.businessCode=='04'){
                fileList4.push(item)
              }else if(item.businessCode=='03'||item.businessCode=='gclc'){
                fileList3.push(item)
              }
          });
          this.detailform.contractInfo.uuid= datas.contractInfo.uuid;
          this.getTwo(datas.contractInfo.enginTypeFirstId);
          this.getThree(datas.contractInfo.enginTypeSecondId);
          this.getTwoSC(datas.contractInfo.marketFirstNameId);
          this.getTwoXZ(datas.contractInfo.projectNatureFirstId);
          this.detailform={
            commonFilesList: datas.commonFilesList,
            contractInfo: datas.contractInfo,
            contractInfoAttachBO: datas.contractInfoAttachBO,
            contractInfoSectionList: datas.contractInfoSectionList,
            topInfoSiteList:datas.topInfoSiteList,
            contractInfoQuantityMachineList1:datas.contractInfoQuantityMachineList1,
            contractInfoQuantityMachineList2:datas.contractInfoQuantityMachineList2,
            fileList1:fileList1,
            fileList2:fileList2,
            fileList3:fileList3,
            fileList4:fileList4,
            zplx:[],//装配类型
            jzlx:[],//建筑类型
            jzjglx:[],//建筑结构类型
            cdmc:[],//场地名称
          };
      this.detailform.cdmc=datas.contractInfo.siteNameId&&datas.contractInfo.siteNameId.split(",");
      this.detailform.zplx=datas.contractInfo.otherAssemblyTypeId&&datas.contractInfo.otherAssemblyTypeId.split(",");
      this.detailform.jzlx=datas.contractInfo.otherBuildingTypeId&&datas.contractInfo.otherBuildingTypeId.split(",");
      this.detailform.jzjglx=datas.contractInfo.otherBuildingStructureTypeId&&datas.contractInfo.otherBuildingStructureTypeId.split(",");
      if(datas.contractInfo.constructionOrgId != '' ||datas.contractInfo.constructionOrgId != null){
        this.constructionOrgList = datas.contractInfo.constructionOrgId.split(",");
      }
      if (this.detailform.contractInfo.contractOrgName) {
        this.$http.post("/api/contract/contract/ContractInfo/detail/orgCodeToRegion",{orgCode:this.detailform.contractInfo.contractOrgId},).then((res) => {
          this.ssList = res.data.data
        });
      }
    });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 是否导入清单
    isImportChange(val) {
      if(val == "1") {
        this.isImportChangeVal = false
      }else {
        this.isImportChangeVal = true
      }
    }
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
  >>>.gcl-pagination{
    margin: 20px 0!important;
  }
  >>>.gcl-pagination .el-input{
    width: auto!important;
  }
  >>>.gcl-pagination .el-select{
    width: 100px!important;
  }
  .form-item-six{
    width: 16.25%!important;
  }
</style>
