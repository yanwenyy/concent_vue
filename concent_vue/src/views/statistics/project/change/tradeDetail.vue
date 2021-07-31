<!--物资贸易项目变更-->

<template>
  <div style="position: relative">
 <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailForm','save')" class="detailbutton detail-back-tab save-btn">
          保存
        </el-button>
        <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailForm.project.flowStatus==1||detailForm.project.flowStatus==4)" @click="saveInfo('detailForm','sub')" class="detailbutton detail-back-tab sub-btn">提交
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.projectName"/>
              </el-form-item>
              <el-form-item
                label="外文名称:"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.projectForeginName"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="合同号:"
                prop="project.contractNumber"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  v-model="detailForm.project.contractNumber"/>
              </el-form-item>
              <el-form-item
                label="合同甲方:"
                prop="project.contractFirstParty"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.contractFirstParty"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="合同所属板块:"
                prop="project.ocontractModel"
                style="width: 32.5%">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
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
                label="合同金额(万元):"
                prop="project.contractMoney"
                :rules="rules.project.isMoney"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  v-model="detailForm.project.contractMoney">
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  clearable
                  placeholder="请输入"
                  v-model="detailForm.project.valueAddedTax">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <!--<el-form-item-->
                <!--label="供方地点"-->
                <!--style="width: 32.5%"-->
                <!--prop="project.topInfoSiteList[0].path"-->
                <!--:rules="rules.project.must"-->
              <!--&gt;-->
                <!--<el-input v-model="detailForm.project.topInfoSiteList[0].path" placeholder="供方地点"-->
                          <!--:disabled="p.actpoint === 'look'||p.actpoint === 'look'" clearable>-->
                  <!--<el-button slot="append" :disabled="p.actpoint === 'look'||p.actpoint === 'look'" icon="el-icon-search"-->
                             <!--@click="selectPosition()"></el-button>-->
                <!--</el-input>-->
              <!--</el-form-item>-->
              <el-form-item
                label="合同签订时间:"
                prop="project.contractSignTime"
                style="width: 32.5%">
                <el-date-picker
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  placeholder="请输入"
                  v-model="detailForm.project.amountCompanyName"/>
              </el-form-item>
              <el-form-item
                label="所属单位:"
                prop="companyBelongName"
                style="width:32.5%;">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  placeholder="请输入"
                  v-model="detailForm.project.companyBelongName"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="预期收益率(%):"
                prop="project.projectExpectedReturn"
                :rules="rules.project.isNumber"
                style="width:32.5%;">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  placeholder="请输入"
                  v-model="detailForm.project.projectExpectedReturn"/>
              </el-form-item>
              <el-form-item
                label="收益额:"
                prop="project.projectYieid"
                :rules="rules.project.isNumber"
                style="width:32.5%;">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  placeholder="请输入"
                  v-model="detailForm.project.projectYieid">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="系统内外:"
                prop="isSystemIn"
                style="width:32.5%;">
                <el-select
                  clearable
                  filterable
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  placeholder="请选择"
                  v-model="detailForm.project.isSystemIn">
                  <el-option
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in inOut"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="路内路外:"
                prop="isRoadIn"
                style="width:32.5%;">
                <el-select
                  clearable
                  filterable
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  placeholder="请选择"
                  v-model="detailForm.project.isRoadIn">
                  <el-option
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in inOutRoad"
                  ></el-option>
                </el-select>
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  placeholder="请选择"
                  @change="getName(detailForm.project.categoryFirstId, material, 'categoryFirstName')"
                  v-model="detailForm.project.categoryFirstId">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in material"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="是否框架协议:"
                prop="isFrameIn"
                class="inline-formitem"
                style="width:32.5%;">
                <el-switch
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  class="inline-formitem-switch"
                  v-model="detailForm.project.isFrameIn"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'||detailForm.project.marketFirstId==='00b87acd71784c3ba860b9513789724e'"
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
                :rules="rules.project.isPercent"
                style="width: 32.5%">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
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
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
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

            <!--<el-row>-->
              <!--<el-form-item-->
                <!--label="推送人:"-->
                <!--prop="project.projectPusher"-->
                <!--style="width:32.5%;">-->
                <!--<el-input-->
                  <!--clearable-->
                  <!--placeholder="请输入"-->
                  <!--:disabled="p.actpoint === 'look'||p.actpoint === 'look'"-->
                  <!--v-model="detailForm.project.projectPusher"/>-->
              <!--</el-form-item>-->
              <!--<el-form-item-->
                <!--label="联系方式:"-->
                <!--prop="project.projectPusherPhone"-->
                <!--:rules="rules.project.isMobile"-->
                <!--style="width:32.5%;">-->
                <!--<el-input-->
                  <!--clearable-->
                  <!--placeholder="请输入"-->
                  <!--:disabled="p.actpoint === 'look'||p.actpoint === 'look'"-->
                  <!--v-model="detailForm.project.projectPusherPhone"/>-->
              <!--</el-form-item>-->
            <!--</el-row>-->
            <!--备注(最多2000字)-->
            <el-row>
              <el-form-item
                class="neirong"
                label="备注(最多2000字):"
                :rules="{ min: 0, max: 2000, message: '最多输入2000字', trigger: 'blur' }"
                prop="project.projectRemark">
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint === 'look'"
                  type="textarea"
                  placeholder="请输入"
                  v-model="detailForm.project.projectRemark"/>
              </el-form-item>
            </el-row>
            <div>
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
                      >
                        <!--@input="getPositionMoney(scope.$index,detailForm.project.topInfoSiteList)"-->
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
              <p class="detail-title" style="overflow:hidden;margin-right:30px">
                <span>标的物信息:</span>
                <el-button
                  v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                  @click="addProduct()"
                  class="upload-demo detailUpload detatil-flie-btn"
                  type="primary">
                  新增
                </el-button>
              </p>
              <el-table
                :data="detailForm.project.infoSubjectMatterList"
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
                  label="标的物名称"
                  align="center"
                  prop="subjectMatterName"
                  min-width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <!--:prop="'project.productInfoList[' + scope.$index + '].productName'"-->
                    <!--:rules="{required: true, message: '此项不能为空', trigger: 'blur'}"-->
                    <el-form-item class="tabelForm">
                      <el-input
                        v-model="scope.row.subjectMatterName"
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint === 'task'"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="标的物数量"
                  width="200"
                  align="center"
                  prop="subjectMatterNo"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm"
                                  :prop="'project.infoSubjectMatterList[' + scope.$index + '].subjectMatterNo'"
                                  :rules="rules.project.isNumber">
                      <el-input
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                        v-model="scope.row.subjectMatterNo"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="标的物单位"
                  width="150"
                  align="center"
                  prop="subjectMatterUnit"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm">
                      <el-input
                        clearable
                        :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                        v-model="scope.row.subjectMatterUnit"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="总价(万元)"
                  align="center"
                  prop="totalPrice"
                  width="300"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm"
                                  :prop="'project.infoSubjectMatterList[' + scope.$index + '].totalPrice'"
                                  :rules="rules.project.isMustMoney">
                      <el-input
                        class="group-no-padding"
                        v-model="scope.row.totalPrice"
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
                      @click="del(scope.$index,scope.row,detailForm.project.infoSubjectMatterList)"
                      type="warning">删除
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
                label="合同号:"
                style="width:32.5%;">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.contractNumber"/>
              </el-form-item>
              <el-form-item
                label="合同甲方:"
                style="width: 32.5%">
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="showDetailForm.project.contractFirstParty"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="合同所属板块:"
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
                label="合同金额(万元):"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  disabled
                  v-model="showDetailForm.project.contractMoney">
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
                  v-model="showDetailForm.project.projectStatusName">
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
            </el-row>
            <el-row>
              <!--<el-form-item-->
                <!--label="供方地点"-->
                <!--style="width: 32.5%"-->
              <!--&gt;-->
                <!--<el-input v-model="showDetailForm.project.supplierAddress" placeholder="供方地点" disabled>-->
                  <!--<el-button slot="append" disabled icon="el-icon-search" @click="selectPosition()"></el-button>-->
                <!--</el-input>-->
              <!--</el-form-item>-->
              <el-form-item
                label="合同签订时间:"
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
                label="预期收益率(%):"
                style="width:32.5%;">
                <el-input
                  clearable
                  disabled
                  placeholder="请输入"
                  v-model="showDetailForm.project.projectExpectedReturn"/>
              </el-form-item>
              <el-form-item
                label="收益额:"
                style="width:32.5%;">
                <el-input
                  clearable
                  disabled
                  placeholder="请输入"
                  v-model="showDetailForm.project.projectYieid">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="系统内外:"
                prop="isSystemIn"
                style="width:32.5%;">
                <el-select
                  clearable
                  filterable
                  disabled
                  placeholder="请选择"
                  v-model="showDetailForm.project.isSystemIn">
                  <el-option
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in inOut"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="路内路外:"
                prop="isRoadIn"
                style="width:32.5%;">
                <el-select
                  clearable
                  filterable
                  disabled
                  placeholder="请选择"
                  v-model="showDetailForm.project.isRoadIn">
                  <el-option
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in inOutRoad"
                  ></el-option>
                </el-select>
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
                  v-model="showDetailForm.project.categoryFirstName">
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in material"/>
                </el-select>
              </el-form-item>
              <el-form-item
                label="是否框架协议:"
                prop="isFrameIn"
                class="inline-formitem"
                style="width:32.5%;">
                <el-switch
                  disabled
                  class="inline-formitem-switch"
                  v-model="showDetailForm.project.isFrameIn"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"/>
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
                  clearable
                  disabled
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
                  v-model="detailForm.project.assemblyRate">
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
                  v-model="showDetailForm.project.fieldName">
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
                label="推送人:"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  disabled
                  v-model="showDetailForm.project.projectPusher"/>
              </el-form-item>
              <el-form-item
                label="联系方式:"
                style="width:32.5%;">
                <el-input
                  clearable
                  placeholder="请输入"
                  disabled
                  v-model="showDetailForm.project.projectPusherPhone"/>
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
            <div>
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
              <p class="detail-title" style="overflow:hidden;margin-right:30px">
                <span>标的物信息:</span>
              </p>
              <el-table
                :data="showDetailForm.project.infoSubjectMatterList"
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
                  label="标的物名称"
                  align="center"
                  prop="subjectMatterName"
                  min-width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <!--:prop="'project.productInfoList[' + scope.$index + '].productName'"-->
                    <!--:rules="{required: true, message: '此项不能为空', trigger: 'blur'}"-->
                    <el-form-item class="tabelForm">
                      <el-input
                        v-model="scope.row.subjectMatterName"
                        clearable
                        disabled/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="标的物数量"
                  width="200"
                  align="center"
                  prop="subjectMatterNo"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm">
                      <el-input
                        clearable
                        disabled
                        v-model="scope.row.subjectMatterNo"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="标的物单位"
                  width="150"
                  align="center"
                  prop="subjectMatterUnit"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm">
                      <el-input
                        clearable
                        disabled
                        v-model="scope.row.subjectMatterUnit"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  :resizable="false"
                  label="总价(万元)"
                  align="center"
                  prop="totalPrice"
                  width="300"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm">
                      <el-input
                        class="group-no-padding"
                        v-model="scope.row.totalPrice"
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
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import { isMoney, isMobile, isPhone } from '@/utils/validate'

  export default {
    name: 'change',
    components: {
      Tree
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
        uuid: null,
        switchvalue: true,
        treeStatas: false,
        emergingMarketTwo: [],
        bizTypeCodeTwo: [],
        inOut: [
          { label: '系统内', value: '0' },
          { label: '系统外', value: '1' }
        ],
        inOutRoad: [
          { label: '路内', value: '0' },
          { label: '路外', value: '1' }
        ],
        detailForm: {
          project: {
            projectSubContractList: [], // 分包字段
            infoProductList: [], // 产品列表
            infoSubjectMatterList: [], // 标的信息
            commonFilesList: [], // 文件列表
            topInfoSiteList: [], // 项目所在地
            projectModuleId: '510ba0d79593418493eb1a11ea4e7af4', // 项目板块
            projectModuleCode:"material",//项目板块code
            projectModuleName: '物资贸易', // 项目板块
            projectName: '',
            projectForeginName: '',
            contractFirstParty: '',
            contractNumber: '',
            contractMoney: '',
            supplierAddress: '', // 供方地点
            categoryFirstId: '', // 业务类别（一级）
            contractSignTime: '',
            ocontractStartTime: '',
            ocontractEndTime: '',
            valueAddedTax: '', // 增值税
            ocontractModel: '', // 合同所属板块
            projectExpectedReturn: '', // 1
            projectYieid: '', // 2
            isSystemIn: '', // 3
            isRoadIn: '', // 4
            isFrameIn: '', // 5
            companyBelongName: '', // 6
            projectStatusId: '',
            amountCompanyName: '',
            marketFirstId: '',
            marketSecondId: '',
            assemblyRate: '',
            assemblyTypeId: '',
            architectureTypeId: '',
            houseTypeId: '',
            fieldId: '',
            projectPusher: '',
            projectRemark: '',
            projectPusherPhone: ''
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
            ], // 项目所在地
            projectModuleId: '510ba0d79593418493eb1a11ea4e7af4', // 项目板块
            projectModuleCode:"material",//项目板块code
            projectModuleName: '物资贸易', // 项目板块
            projectName: '',
            projectForeginName: '',
            contractFirstParty: '',
            contractNumber: '',
            contractMoney: '',
            supplierAddress: '', // 供方地点
            categoryFirstId: '', // 业务类别（一级）
            contractSignTime: '',
            ocontractStartTime: '',
            ocontractEndTime: '',
            valueAddedTax: '', // 增值税
            ocontractModel: '', // 合同所属板块
            projectExpectedReturn: '', // 1
            projectYieid: '', // 2
            isSystemIn: '', // 3
            isRoadIn: '', // 4
            isFrameIn: '', // 5
            companyBelongName: '', // 6
            projectStatusId: '',
            amountCompanyName: '',
            marketFirstId: '',
            marketSecondId: '',
            assemblyRate: '',
            assemblyTypeId: '',
            architectureTypeId: '',
            houseTypeId: '',
            fieldId: '',
            projectPusher: '',
            projectRemark: '',
            projectPusherPhone: ''
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
      material() {
        return this.$store.state.material
      }
    },
    mounted() {
      this.$store.dispatch('getConfig', {})
      this.$store.dispatch('getCategory', { name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3' })
      this.$store.dispatch('getCategory', { name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e' })
      this.$store.dispatch('getCategory', { name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72' })
      if (this.p.actpoint === 'edit' || this.p.actpoint === 'look' || this.p.actpoint === 'task') {
        this.getDetail()
      }
      if (this.p.actpoint === 'add') {
        this.getAddDetail()
      }
    },
    methods: {
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
      addProduct() {
        let v = {
          uuid: '', // ID新增为空，但必须传
          subjectMatterId: '', // ID新增为空，但必须传
          projectInfoId: '', // ID新增为空，但必须传
          subjectMatterName: '',
          subjectMatterNo: '',
          subjectMatterUnit: '',
          totalPrice: ''
        }
        this.detailForm.project.infoSubjectMatterList.push(v)
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
                '/api/statistics/StatisticsProject/detail/deleteBySubId',
                { subjectId: item.uuid }
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
      //   //this.detailForm.project.supplierAddress = data.fullDetailName
      //   this.detailForm.project.topInfoSiteList[0].placeId = data.id
      //   this.detailForm.project.topInfoSiteList[0].path = data.fullDetailName
      //   this.detailForm.project.topInfoSiteList[0].ffid = data.fullDetailCode
      // },
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

        var url='';
        if(type=='save'){
          url=`/api/statistics/StatisticsProject/detail/${this.p.actpoint === "add"?'saveChangeRecord':'updateChangeRecord'}`;
        }else{
          url="/api/statistics/StatisticsProject/changeProcess/start"
        }

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
                  if (!item.topInfoSiteList|| item.topInfoSiteList=='') {
                    this.showDetailForm.project.topInfoSiteList = [{
                      path: '',
                      placeId: '',
                      ffid:'',
                      uuid: ''
                    }]
                  }
                } else if (item.project.changeStatus == '2') {
                  this.changeRecordUuid=item.changeRecordUuid;
                  this.detailForm.project = item.project
                  this.detailForm.project.beforeId = this.p.beforeId
                  this.detailForm.project.afterId = this.p.afterId
                  if (!this.detailForm.project.projectSubContractList) {
                    this.detailForm.project.projectSubContractList = []
                  }
                  if (!item.topInfoSiteList|| item.topInfoSiteList=='') {
                    this.showDetailForm.project.topInfoSiteList = [{
                      path: '',
                      placeId: '',
                      ffid:'',
                      uuid: ''
                    }]
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
