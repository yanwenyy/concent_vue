<template>
  <div style="position: relative">
    <el-button v-show="p.actpoint != 'look'" class="detail-back-tab detailbutton save-btn" type="primary" @click="saveInfo('detailform')">保存</el-button>
    <el-button v-show="p.actpoint != 'look'" class="detail-back-tab detailbutton sub-btn">提交</el-button>
    <el-button class="detail-back-tab" @click="back" type="text">返回</el-button>
    <el-form
      :inline="false"
      :model="detailform"
      :rules="rules"
      class="gcform"
      ref="detailform"
      style="background: white;"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="工业制造合同新增">
            <div class="detailBoxBG">

              <el-form-item
                label="合同名称(中文):"
                prop="contractInfo.contractName"
                :rules="{
           required: true, message: '此项不能为空', trigger: 'blur'
        }"
              >
                <!--<el-input-->
                  <!--:disabled="p.actpoint === 'look'"-->
                  <!--clearable-->
                  <!--placeholder="请输入"-->

                  <!--v-model="detailform.contractInfo.contractName"-->
                <!--/>-->
                <el-input :disabled="p.actpoint === 'look'" placeholder="请输入内容" v-model="detailform.contractInfo.contractName" class="input-with-select">
                  <el-button :disabled="detailform.contractInfo.contractType!='2'" slot="append" icon="el-icon-search" @click="searchName"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                label="合同名称(外文):"
                prop="contractInfo.contractNameForeign"
                :rules="{
           required: true, message: '此项不能为空', trigger: 'blur'
        }"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"

                  v-model="detailform.contractInfo.contractNameForeign"
                />
              </el-form-item>
              <br>
              <el-form-item
                label="合同编号:"
                prop="contractInfo.contractNo"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"

              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"

                  v-model="detailform.contractInfo.contractNo"
                />
              </el-form-item>
              <el-form-item
                label="客户名称:"
                prop="contractInfo.constructionOrg"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"

              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable

                  placeholder="请输入"

                  v-model="detailform.contractInfo.constructionOrg"

                />

              </el-form-item>
              <br>
              <el-form-item
                label="合同所属板块:"
                prop="contractInfo.enginTypeFirstId"
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

                  v-model="detailform.contractInfo.enginTypeFirstId"
                  @change="
                  getName(
                    detailform.contractInfo.enginTypeFirstId,
                    emergingMarket,
                    'enginTypeFirstName'
                  )
                "
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
                label="合同签订日期:"
                prop="contractInfo.contractSignTime"

              >
                <el-date-picker
                  v-model="detailform.contractInfo.contractSignTime"
                  :disabled="p.actpoint === 'look'"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <br>
              <el-form-item
                label="合同金额(万元):"
                prop="contractInfo.contractAmount"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  @input="getOurAmount"
                  clearable
                  placeholder=""

                  v-model="detailform.contractInfo.contractAmount"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                label="铁建金额(万元):"
                prop="contractInfo.crccCash"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="true"
                  v-model="detailform.contractInfo.crccCash"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <br>
              <el-form-item
                label="增值税(万元):"
                prop="contractInfo.valueAddedTax"
                :rules="rules.contractAmount"

              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"

                  v-model="detailform.contractInfo.valueAddedTax"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <el-form-item
                label="初始我方份额(万元):"
                prop="contractInfo.ourAmount"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="true"
                  clearable
                  placeholder=""
                  size="mini"
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
              <br>
              <el-form-item
                label="补充金额(万元):"
                prop="contractInfo.extendAmount"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"

                  v-model="detailform.contractInfo.extendAmount"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>

              </el-form-item>
              <el-form-item
                label="海外合同(美元):"
                prop="contractInfo.industryOverseasContract"
                :rules="rules.contractAmount"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"

                  v-model="detailform.contractInfo.industryOverseasContract"
                />
              </el-form-item>
              <br>
              <el-form-item
                label="合同开始日期:"
                prop="contractInfo.contractStartTime"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"

              >
                <el-date-picker
                  :disabled="p.actpoint === 'look'"
                  v-model="detailform.contractInfo.contractStartTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item
                label="合同结束日期:"
                prop="contractInfo.contractEndTime"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"

              >
                <el-date-picker
                  :disabled="p.actpoint === 'look'"
                  v-model="detailform.contractInfo.contractEndTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期时间">
                </el-date-picker>

              </el-form-item>
              <br>
              <el-form-item
                class="inline-formitem"
                label="是否为系统内联合体"
              >
                <el-switch
                  :disabled="p.actpoint === 'look'"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isInSystemUnion"
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

                <!--v-model="detailform.contractInfo.isInSystemUnion"-->
                <!--&gt;-->
                <!--<el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>-->
                <!--</el-select>-->
              </el-form-item>
              <el-form-item
                class="inline-formitem"
                label="是否含系统内分包"
              >
                <el-switch
                  :disabled="p.actpoint === 'look'"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isInSystemSub"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"
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
              <br>
              <el-form-item
                class="inline-formitem"
                label="是否为系统外联合体"
              >
                <el-switch
                  :disabled="p.actpoint === 'look'"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isOutSystemUnion"
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

                <!--v-model="detailform.contractInfo.isOutSystemUnion"-->
                <!--&gt;-->
                <!--<el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>-->
                <!--</el-select>-->
              </el-form-item>
              <el-form-item
                class="inline-formitem"
                label="是否含系统外分包:"
              >
                <el-switch
                  :disabled="p.actpoint === 'look'"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isOutSystemSub"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"
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
                  @clear="clear(detailform.contractInfo.marketSecondId,detailform.contractInfo.marketSecondName)"
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
                    :disabled="p.actpoint === 'look'"

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
                    class="multiple-sel"
                    :disabled="p.actpoint==='look'"
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
              </div>
              <div>
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
                    :disabled="p.actpoint==='look'"
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
                    :disabled="p.actpoint==='look'"
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
                    :disabled="p.actpoint==='look'"
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
              </div>

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
                  :disabled="p.actpoint==='look'"
                  filterable
                  clearable
                  placeholder="请选择"

                  v-model="detailform.contractInfo.businessTypeId"
                  @change="
                  getName(
                    detailform.contractInfo.businessTypeId,
                    bizTypeCode,
                    'businessType'
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
              <el-form-item
                label="使用资质单位:"
                prop="contractInfo.qualityOrgNames"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'change',
              }"
              >
                <el-input :disabled="p.actpoint === 'look'" placeholder="请输入内容" v-model="detailform.contractInfo.qualityOrgNames" class="input-with-select">
                  <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('使用资质单位',detailform.contractInfo.qualityOrgIds)" ></el-button>
                </el-input>
              </el-form-item>
              <br>
              <el-form-item
                label="产品用途(施工项目名称):"
                prop="contractInfo.industryProductUse"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"

              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"

                  v-model="detailform.contractInfo.industryProductUse"
                />
              </el-form-item>
              <el-form-item
                label="供货地点:"
                prop="contractInfo.supplyPlace"

              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"

                  v-model="detailform.contractInfo.supplyPlace"
                />
              </el-form-item>
              <el-form-item
                class="inline-formitem"
                label="是否为系统内的采购:"
                prop="contractInfo.isSystemPurchaseIndustry"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"

              >
                <el-switch
                  :disabled="p.actpoint === 'look'"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isSystemPurchaseIndustry"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"
                >
                </el-switch>
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
                  disabled
                  clearable
                  placeholder="请输入"

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
                  disabled
                  filterable
                  clearable
                  type="date"
                  value-format="timestamp"
                  v-model="detailform.contractInfo.createTime"

                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                class="inline-formitem"
                label="是否区域经营机构承揽:"
                prop="contractInfo.isAreaTakeIndustry"

              >
                <el-switch
                  :disabled="p.actpoint === 'look'"
                  class="inline-formitem-switch"
                  v-model="detailform.contractInfo.isAreaTakeIndustry"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"
                >
                </el-switch>
              </el-form-item>
              <el-form-item
                label="生产工号:"
                prop="contractInfo.industryProduceNu"

              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"

                  v-model="detailform.contractInfo.industryProduceNu"
                />
              </el-form-item>


              <div>
                <el-form-item
                  class="neirong"
                  label="备注(最多600字):"
                >
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-input
                    :disabled="p.actpoint === 'look'"
                    type="textarea"
                    clearable
                    placeholder="请输入"
                    v-model="detailform.contractInfo.remarks"
                  />
                </el-form-item>
              </div>
              <p><span >证明文件: </span>
                <el-button
                  v-show="p.actpoint !== 'look'"
                  size="small"
                  type="primary"
                  @click="openFileUp('/api/contract/topInfo/CommonFiles/contractInfo/01/uploadFile','commonFilesList')">
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
                :data="detailform.commonFilesList"
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
                  v-if="p.actpoint!=='look'"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="handleRemove1(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
              <p style="overflow: hidden">
                <span >产品信息: </span>
                <el-button
                  v-show="p.actpoint != 'look'"
                  @click="addXs()"
                  class="upload-demo detailUpload detatil-flie-btn"
                  type="primary"
                >新增</el-button>
              </p>

              <el-table
                :data="detailform.contractInfoProductInformtList"
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
                  type="index"></el-table-column>

                <el-table-column width="150"  class="listTabel" :resizable="false" label="产品名称" prop="productId" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-form-item
                      class="tabelForm"
                      :prop="'contractInfoProductInformtList.'+scope.$index+'.productId'"
                      :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                      label-width="0"
                    >
                      <el-select
                        :disabled="p.actpoint === 'look'"
                        clearable
                        filterable
                        placeholder="请选择"

                        @change="
                  getNameTable(
                    scope.row.productId,
                    cpxxList,
                    'productName',
                    scope.$index
                  )
                "
                        v-model="scope.row.productId"
                      >
                        <el-option
                          :key="index"
                          :label="item.v_name"
                          :value="item.v_code"
                          v-for="(item, index) in cpxxList"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <el-table-column :resizable="false" label="规格型号" prop="specificationAndModel" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-form-item
                      class="tabelForm"
                      :prop="'contractInfoProductInformtList.'+scope.$index+'.specificationAndModel'"
                      :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                      label-width="0"
                    >
                      <el-input max-length=50 clearable :disabled="p.actpoint==='look'" v-model="scope.row.specificationAndModel"></el-input>
                    </el-form-item>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <el-table-column :resizable="false" label="产品数量" prop="productQuantity" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-form-item
                      class="tabelForm"
                      :prop="'contractInfoProductInformtList.'+scope.$index+'.productQuantity'"
                      :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                      label-width="0"
                    >
                      <el-input max-length=50 clearable :disabled="p.actpoint==='look'" v-model="scope.row.productQuantity"></el-input>
                    </el-form-item>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>


                <el-table-column algin="center" :resizable="false" label="产品单位" prop="productUnit" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-form-item
                      class="tabelForm"
                      label-width="0"
                    >
                      {{scope.row.productUnit}}
                    </el-form-item>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <el-table-column width="400" :resizable="false" label="总价(万元)" prop="productTotalPrice" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-form-item
                      class="tabelForm"
                      :prop="'contractInfoProductInformtList.'+scope.$index+'.productTotalPrice'"
                      :rules="rules.contractAmount"
                      label-width="0"
                    >
                      <el-input max-length=50 clearable :disabled="p.actpoint==='look'" v-model="scope.row.productTotalPrice">
                        <template slot="prepend">¥</template>
                        <template slot="append">(万元)</template>
                      </el-input>
                    </el-form-item>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <el-table-column
                  :resizable="false"
                  align="center"
                  label="操作"
                  show-overflow-tooltip
                  v-if="p.actpoint!=='look'"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false"  @click="del(scope.$index,scope.row,detailform.contractInfoProductInformtList,'cpxx')" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>

            </div>
        </el-tab-pane>
        <el-tab-pane v-if="detailform.contractInfo.isInSystemUnion==='0'||detailform.contractInfo.isInSystemSub==='0'||detailform.contractInfo.isOutSystemUnion==='0'||detailform.contractInfo.isOutSystemSub==='0'" label="合同附属信息">
          <div class="detailBoxBG htfs">
            <div  v-if="detailform.contractInfo.isInSystemUnion==='0'">
              <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
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
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      :disabled="p.actpoint === 'look'"
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
                        @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.unionContractInfoAttachList,'nlht')"
                        v-model="scope.row.contractAmount"
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
                  class="listTabel"
                  :resizable="false"
                  label="是否为补充"
                  prop="isAdd"
                  align="center"
                  show-overflow-tooltip
                  width="100"
                >
                  <template slot-scope="scope">
                    否
                  </template>
                </el-table-column>
                <el-table-column
                  v-show="!p.actpoint === 'look'"
                  :resizable="false"
                  label="操作"
                  align="center"
                  show-overflow-tooltip
                  v-if="p.actpoint !== 'look'"
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
              <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
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
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      :disabled="p.actpoint === 'look'"
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
                        @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.innerContractInfoAttachList,'nfb')"
                        v-model="scope.row.contractAmount"
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
                  class="listTabel"
                  :resizable="false"
                  label="是否为补充"
                  prop="isAdd"
                  align="center"
                  width="100"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    否
                  </template>
                </el-table-column>
                <el-table-column
                  v-show="!p.actpoint === 'look'"
                  :resizable="false"
                  label="操作"
                  align="center"
                  show-overflow-tooltip
                  v-if="p.actpoint !== 'look'"
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
              <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
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
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      :disabled="p.actpoint === 'look'"
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
                        @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.outUnionContractInfoAttachList,'wlht')"
                        v-model="scope.row.contractAmount"
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
                  class="listTabel"
                  :resizable="false"
                  label="是否为补充"
                  prop="isAdd"
                  align="center"
                  width="100"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    否
                  </template>
                </el-table-column>
                <el-table-column
                  v-show="!p.actpoint === 'look'"
                  :resizable="false"
                  label="操作"
                  align="center"
                  show-overflow-tooltip
                  v-if="p.actpoint !== 'look'"
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
              <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
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
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select
                      :disabled="p.actpoint === 'look'"
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
                        @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.outContractInfoAttachList,'wfb')"
                        v-model="scope.row.contractAmount"
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
                  class="listTabel"
                  :resizable="false"
                  label="是否为补充"
                  prop="isAdd"
                  align="center"
                  width="100"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    否
                  </template>
                </el-table-column>
                <el-table-column
                  v-show="!p.actpoint === 'look'"
                  :resizable="false"
                  label="操作"
                  align="center"
                  show-overflow-tooltip
                  v-if="p.actpoint !== 'look'"
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
          </div>
        </el-tab-pane>
      </el-tabs>

    </el-form>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
    <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
    <search-name  v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></search-name>
  </div>
</template>

<script>
  import { isMoney } from '@/utils/validate'
  import CompanyTree from '../companyTree'
  import FileUpload from '@/components/fileUpload'
  import SearchName from '../searchName'
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
      DwVisible:false,//选择单位弹框状态
      uploadVisible:false,//上传附件组件状态
      infoCSVisible:false,//项目名称查询的状态
      options1:[{label:"值",value:'111'}],
      detailform: {
        contractInfo: {
          moduleId:'510ba0d79593418493eb1a11ed3e7df4',
          moduleName:'工业制造'
        },
        commonFilesList: [],
        contractInfoProductInformtList:[],
        contractInfoAttachBO: {
          innerContractInfoAttachList:[],
          unionContractInfoAttachList:[],
          outUnionContractInfoAttachList:[],
          outContractInfoAttachList:[],
        },
        zplx:[],//装配类型
        jzlx:[],//建筑类型
        jzjglx:[],//建筑结构类型
        cdmc:[],//场地名称
      },
      emergingMarketTwo:[],
      cpxxList:[
        {"v_measureunitname":"吨","v_code":"01","v_name":"钢筋"},
        {"v_measureunitname":"吨","v_code":"02","v_name":"水泥"}
        ],//产品信息列表
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
        ]
      },//表单验证规则
    }
  },
  components: {
    CompanyTree,
    FileUpload,
    SearchName,
  },
  computed: {
    emergingMarket() {
      // console.log(this.$store.state.category.emergingMarket)
      return this.$store.state.category.emergingMarket;
    },
    bizTypeCode(){
      return this.$store.state.bizTypeCode;//业务类别
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
          bidInfoSection.uuid='';
          for(var k in bidInfoSection.bidInfoSectionOrgList){
            bidInfoSection.bidInfoSectionOrgList[k].uuid='';
          }
          bidInfoSection.contractInfoSectionOrgList=bidInfoSectionOrgList;
          this.detailform.contractInfoSectionList.push(bidInfoSection);
        }
        for(var i in datas.topInfoSiteList){
          datas.topInfoSiteList[i].uuid='';
        }
        this.detailform.topInfoSiteList=datas.topInfoSiteList;
      });
        this.$forceUpdate();
        this.infoCSVisible=false;
      }else{//合同名称查找回来的信息
        this.$http
          .post("/api/contract/contract/ContractInfo/detail/entityInfo", {id :data.data.uuid})
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
          if(datas.contractInfo[i]&&i!='contractType'&&i!='uuid'&&i!='contractAmount'&&i!='crccCash'&&i!='ourAmount'&&i!='outSystemAmount'&&i!='valueAddedTax'&&i!='designTempPrice'&&i!='unAllocatedFee'&&i!='selfCash'&&i!='extendAmount'&&i!='industryOverseasContract'){
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
    //获取模块名字
    getBdName(id, list, index) {
      if(id){
        this.$forceUpdate()
        list[index].moduleName=this.projectPlate.find(
          (item) => item.id == id
      ).detailName;
      }
    },
    //新增产品信息
    addXs(){
      var v={
        productName:'',
        productId:'',
        specificationAndModel:'',
        productQuantity:'',
        productUnit:'',
        productTotalPrice	:'',
      };
      this.detailform.contractInfoProductInformtList.push(v);
    },
    back() {
      this.$router.back();
    },
    //table获取name
    getNameTable(id,list,name,index){
      if(id){
        this.$forceUpdate()
        this.detailform.contractInfoProductInformtList[index].productName= list.find(
          (item) => item.v_code == id
      ).v_name;
        this.detailform.contractInfoProductInformtList[index].productUnit= list.find(
          (item) => item.v_code == id
      ).v_measureunitname;
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
    handleRemove1(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
        if (res.data.code === 200) {
        this.detailform.commonFilesList.splice(index,1);
      }

    });
      console.log(this.detailform.commonFilesList)
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
    getName(id, list, name) {
      if(id){
        this.$forceUpdate()
        this.detailform.contractInfo[name] = list.find(
          (item) => item.id == id
      ).detailName;
        console.log(this.detailform.contractInfo[name]);
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
    del(index,item,list,type) {
      if(item.uuid&&type=='cpxx'){
        this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http
          .post(
            "/api/contract/contract/ContractInfo/list/deleteProductInformt",
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
    submitForm(formName) {
      if ([...new Set(this.detailform.clothSizePartList.map(item => item.part))].length < this.detailform.clothSizePartList.length) {
        this.$message.error('部位填写重复')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              '/api/contract/basicConfig/ClothSize/detail/save',
              JSON.stringify(this.detailform), {useJson: true}
            )
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.$store.dispatch('clearToolBar', {
                  detail: this.$route.fullPath
                })
                this.$store.dispatch('clearCache', this.$route.name)
                let p = { actpoint: 'edit', uuid: res.data.data.contractInfo.id }
                this.$router.push({
                  path: '/app/base/tailsize/detailedit',
                  query: { p: this.$utils.encrypt(JSON.stringify(p)) }
                })
              }
              if (res.data.code === 10) {
                this.errorMsg = Math.random()
                this.errorMsg0 = Math.random()
                this.$nextTick(() => {
                  this.errorMsg = res.data.msg
                  this.errorMsg0 = ' '
                })
              }
            })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    sure() {
      console.log(this.sizeform)
      this.$refs['sizeform'].validate(valid => {
        if (valid) {
          this.detailform.clothSizePartList.push(this.sizeform)
          this.dialogVisibleAdd = false
        } else {
          console.log('error submit!')
          return false
        }
      })
    },


    saveInfo(formName) {
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
            this.$router.back()
          }
        });
        } else {
          this.$message.error("请添加必填项");
      return false;
    }
    });
    },
// 加载列表
    getDetail() {
      this.$http
        .post("/api/contract/contract/ContractInfo/detail/entityInfo", {id:this.id})
        .then((res) => {
        var datas=res.data.data;
      this.getTwoSC(datas.contractInfo.marketFirstNameId);
      this.detailform={
        commonFilesList: datas.commonFilesList,
        contractInfo: datas.contractInfo,
        contractInfoAttachBO: datas.contractInfoAttachBO,
        contractInfoProductInformtList: datas.contractInfoProductInformtList,
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
  }
}
</script>
<style lang="scss" scoped>
  .detailTable .el-input-group{
    margin-top:5px!important;
  }
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
