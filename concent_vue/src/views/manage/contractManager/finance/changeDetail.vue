<template>
  <div style="position: relative">
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailform','save')" class="detailbutton detail-back-tab save-btn">保存</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.contractInfo.flowStatus=='edit'||detailform.contractInfo.flowStatus=='reject')" @click="saveInfo('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <el-button class="detail-back-tab" @click="back" type="text">返回</el-button>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="变更前" name="before">
        <el-form
          :inline="false"
          class="gcform"
          :model="detailFormBefore"
        >
          <el-tabs type="border-card">
            <el-tab-pane label="金融保险合同">
                <div class="detailBoxBG">
                  <el-form-item
                    label="项目名称(中文)"
                  >
                    <el-input disabled placeholder="请输入内容" v-model="detailFormBefore.contractInfo.inforName" class="input-with-select">

                    </el-input>
                  </el-form-item>
                  <el-form-item
                    label="项目名称(外文)"
                  >
                    <el-input disabled placeholder="请输入内容" v-model="detailFormBefore.contractInfo.inforNameForeign" class="input-with-select">

                    </el-input>
                  </el-form-item>
                  <br>
                  <el-form-item
                    label="合同名称(中文):"
                  >
                    <el-input disabled placeholder="请输入内容" v-model="detailFormBefore.contractInfo.contractName" class="input-with-select">

                    </el-input>
                  </el-form-item>
                  <el-form-item
                    label="合同名称(外文):"
                  >
                    <el-input disabled placeholder="请输入内容" v-model="detailFormBefore.contractInfo.contractNameForeign" class="input-with-select">

                    </el-input>
                  </el-form-item>
                  <br>
                  <el-form-item
                    label="合同编号:"
                  >
                    <el-input
                      disabled
                      clearable
                      placeholder=""
                      size="mini"
                      v-model="detailFormBefore.contractInfo.contractCode"
                    />
                  </el-form-item>
                  <br>
                  <el-form-item
                    class="inline-formitem form-item-five"
                    label="是否为系统内联合体"
                  >
                    <el-switch
                      disabled="disabled"
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isInSystemUnion"
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
                    class="inline-formitem form-item-five"
                    label="是否含系统内分包"
                  >
                    <el-switch
                      disabled="disabled"
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isInSystemSub"
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
                  <el-form-item
                    class="inline-formitem form-item-five"
                    label="是否为系统外联合体"
                  >
                    <el-switch
                      disabled="disabled"
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isOutSystemUnion"
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
                    class="inline-formitem form-item-five"
                    label="是否含系统外分包:"
                  >
                    <el-switch
                      disabled="disabled"
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isOutSystemSub"
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
                  <el-form-item
                    class="inline-formitem form-item-five"
                    label="是否集团内分包:"
                  >
                    <el-switch
                      disabled="disabled"
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isInGroupSub"
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
                    label="合同规模（万元）:"
                  >
                    <el-input
                      disabled
                      clearable
                      placeholder=""
                      size="mini"
                      v-model="detailFormBefore.contractInfo.contractAmount"
                    >
                      <template slot="prepend">¥</template>
                      <template slot="append">(万元)</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    label="合同收益（万元）:"
                  >
                    <el-input
                      disabled
                      clearable
                      placeholder=""
                      size="mini"
                      v-model="detailFormBefore.contractInfo.insureIncome"
                    >
                      <template slot="prepend">¥</template>
                      <template slot="append">(万元)</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    label="增值税（万元）:"
                  >
                    <el-input
                      :disabled="true"
                      clearable
                      placeholder=""
                      size="mini"
                      v-model="detailFormBefore.contractInfo.valueAddedTax"
                    >
                      <template slot="prepend">¥</template>
                      <template slot="append">(万元)</template>
                    </el-input>
                  </el-form-item>
                  <br>
                  <el-form-item
                    v-if="detailFormBefore.contractInfo.isInSystemSub==='0'||detailFormBefore.contractInfo.isInGroupSub==='0'||detailFormBefore.contractInfo.isOutSystemSub==='0'"
                    label="未分配(万元)"
                  >
                    <el-input
                      disabled
                      clearable
                      size="mini"
                      v-model="detailFormBefore.contractInfo.unAllocatedFee">
                      <template slot="prepend">¥</template>
                      <template slot="append">(万元)</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    v-if="detailFormBefore.contractInfo.isInSystemSub==='0'||detailFormBefore.contractInfo.isInGroupSub==='0'||detailFormBefore.contractInfo.isOutSystemSub==='0'"
                    label="自留份额(万元)"
                  >

                    <el-input
                      disabled
                      clearable
                      size="mini"
                      v-model="detailFormBefore.contractInfo.selfCash">
                      <template slot="prepend">¥</template>
                      <template slot="append">(万元)</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    label="铁建金额(万元):"
                  >
                    <el-input
                      :disabled="true"
                      v-model="detailFormBefore.contractInfo.crccCash"
                    >
                      <template slot="prepend">¥</template>
                      <template slot="append">(万元)</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    v-if="detailFormBefore.contractInfo.isOutSystemUnion==='0'"
                    label="系统外份额(万元)"

                  >
                    <el-input
                      disabled
                      clearable
                      placeholder=""

                      v-model="detailFormBefore.contractInfo.outSystemAmount"
                    >
                      <template slot="prepend">¥</template>
                      <template slot="append">(万元)</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    label="初始我方份额(万元)"
                  >
                    <el-input
                      :disabled="true"
                      clearable
                      placeholder=""
                      size="mini"
                      v-model="detailFormBefore.contractInfo.ourAmount"
                    >
                      <template slot="prepend">¥</template>
                      <template slot="append">(万元)</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    v-if="detailFormBefore.contractInfo.contractType!='2'"
                    label="我方份额含补充(万元)"
                  >
                    <el-input
                      :disabled="true"
                      v-model="detailFormBefore.contractInfo.ourAmountSupply"
                    >
                      <template slot="prepend">¥</template>
                      <template slot="append">(万元)</template>
                    </el-input>
                  </el-form-item>
                  <br>
                  <!--<el-form-item-->
                    <!--label="合同生效地点:"-->
                  <!--&gt;-->
                    <!--<el-input-->
                      <!--disabled-->
                      <!--clearable-->
                      <!--placeholder=""-->
                      <!--size="mini"-->
                      <!--v-model="detailFormBefore.contractInfo.insureEffPlace"-->
                    <!--/>-->
                  <!--</el-form-item>-->
                  <el-form-item
                    label="合同签定日期:"
                  >
                    <el-date-picker
                      disabled
                      filterable
                      clearable
                      type="date"
                      value-format="timestamp"
                      v-model="detailFormBefore.contractInfo.contractSignTime"

                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item
                    label="合同有效期:"
                  >
                    <el-date-picker
                      disabled
                      filterable
                      clearable
                      type="date"
                      value-format="timestamp"
                      v-model="detailFormBefore.contractInfo.insureValidityTime"

                    >
                    </el-date-picker>
                  </el-form-item>
                  <br>
                  <el-form-item
                    label="新兴市场类别(一级):"
                  >
                    <el-input
                      disabled
                      clearable
                      placeholder=""
                      size="mini"
                      v-model="detailFormBefore.contractInfo.marketFirstName"
                    />
                  </el-form-item>
                  <el-form-item
                    label="新兴市场类别(二级):"
                  >
                    <el-input
                      disabled
                      clearable
                      placeholder=""
                      size="mini"
                      v-model="detailFormBefore.contractInfo.marketSecondName"
                    />
                  </el-form-item>
                  <el-form-item
                    label="场地名称:"
                    v-if="detailFormBefore.contractInfo.marketFirstNameId=='50cd5e9992ac4653920fac8c1f2eb2e3'"

                  >
                    <el-input
                      disabled
                      size="mini"
                      v-model="detailFormBefore.contractInfo.siteName"
                    />
                  </el-form-item>
                  <el-form-item
                    label="装配类型:"
                    v-if="detailFormBefore.contractInfo.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

                  >
                    <el-input
                      disabled
                      size="mini"
                      v-model="detailFormBefore.contractInfo.otherAssemblyType"
                    />
                  </el-form-item>
                  <div>
                    <el-form-item
                      label="装配率(%):"
                      v-if="detailFormBefore.contractInfo.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

                    >
                      <el-input
                        disabled
                        size="mini"
                        v-model="detailFormBefore.contractInfo.otherAssemblyRate"
                      />
                    </el-form-item>
                    <el-form-item
                      label="建筑类型:"
                      v-if="detailFormBefore.contractInfo.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

                    >
                      <el-input
                        disabled
                        size="mini"
                        v-model="detailFormBefore.contractInfo.otherBuildingType"
                      />
                    </el-form-item>
                    <el-form-item
                      label="建筑结构类型:"
                      v-if="detailFormBefore.contractInfo.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

                    >
                      <el-input
                        disabled
                        size="mini"
                        v-model="detailFormBefore.contractInfo.otherBuildingStructureType"
                      />
                    </el-form-item>
                  </div>
                  <el-form-item
                    label="业务类别:"

                  >
                    <el-input
                      disabled
                      size="mini"
                      v-model="detailFormBefore.contractInfo.businessType"
                    />
                  </el-form-item>
                  <el-form-item
                    label="签约单位（使用资质单位）:"

                  >
                    <el-input
                      disabled
                      size="mini"
                      v-model="detailFormBefore.contractInfo.signOrgName"
                    />
                  </el-form-item>
                  <el-form-item
                    label="合同类型"
                  >
                    <el-input
                      disabled
                      clearable
                      placeholder="请输入"
                      size="mini"
                      v-model="detailFormBefore.contractInfo.contractType=='2'?'补充合同':'主合同'"
                    />
                  </el-form-item>
                  <br>
                  <el-form-item
                    label="客户名称:"

                  >
                    <el-input
                      disabled
                      size="mini"
                      v-model="detailFormBefore.contractInfo.insureOtherName"
                    />
                  </el-form-item>
                  <el-form-item
                    class="inline-formitem"
                    label="是否年度合同:"

                  >
                    <el-switch
                      disabled
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isYearContract"
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
                  >
                    <el-switch
                      disabled
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isOpenBid"
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
                  >
                    <el-select
                      class="multiple-sel"
                      disabled
                      clearable
                      filterable
                      placeholder="请选择"
                      size="mini"
                      v-model="detailFormBefore.contractInfo.customerNatureId"
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
                    v-if="detailFormBefore.contractInfo.customerNatureId=='9f19652f27a911ebad4bc5ee92e1a03f'"
                    class="inline-formitem"
                    label="所属央企:"

                  >
                    <el-select
                      class="multiple-sel"
                      disabled
                      clearable
                      filterable
                      placeholder="请选择"
                      size="mini"
                      v-model="detailFormBefore.contractInfo.belongEnterPrisesId"
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
                    >
                      <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                      <el-input
                        disabled
                        type="textarea"
                        clearable
                        placeholder="请输入"
                        v-model="detailFormBefore.contractInfo.bidNoticeWebsite"
                      />
                    </el-form-item>
                  </div>
                  <p>
                    <span >合同生效地点: </span>
                  </p>
                  <el-table
                    :data="detailFormBefore.topInfoSiteList"
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
                        <!--<el-radio disabled v-model="scope.row.isMain" label="1">是</el-radio>-->
                        <!--<el-radio disabled v-model="scope.row.isMain" label="0">否</el-radio>-->
                        <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                      </template>
                    </el-table-column>
                  </el-table>
                  <p class="detail-p">
                    <span>证明文件: </span>
                  </p>
                  <el-table
                    :data="detailFormBefore.commonFilesList1"
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
                    <el-table-column align="center" :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

                    </el-table-column>

                    <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{(scope.row.fileSize/1024).toFixed(2)}}
                      </template>
                    </el-table-column>
                    <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

                    </el-table-column>
                  </el-table>
                  <p class="detail-p">
                    <span>招标公告文件: </span>
                  </p>
                  <el-table
                    :data="detailFormBefore.commonFilesList2"
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
                    <el-table-column align="center" :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

                    </el-table-column>

                    <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{(scope.row.fileSize/1024).toFixed(2)}}
                      </template>
                    </el-table-column>
                    <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

                    </el-table-column>
                  </el-table>
                  <div v-if="detailFormBefore.contractInfo.isYearContract=='0'">
                    <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
                      <span>年度合同收益:</span>
                    </p>
                    <el-table
                      :data="detailFormBefore.contractInfoHouseSalesList"
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
                      </el-table-column>
                      <el-table-column
                        :resizable="false"
                        label="本月收益(万元)"
                        align="center"
                        prop="contractAmount"
                        width="400"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        :resizable="false"
                        label="年累(万元)"
                        align="center"
                        prop="totalAmount"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="detailFormBefore.contractInfo.isInSystemUnion==='0'||detailFormBefore.contractInfo.isInSystemSub==='0'||detailFormBefore.contractInfo.isOutSystemUnion==='0'||detailFormBefore.contractInfo.isOutSystemSub==='0'||detailFormBefore.contractInfo.isInGroupSub==='0'" label="合同附属信息">
              <div class="detailBoxBG htfs">
                <div  v-if="detailFormBefore.contractInfo.isInSystemUnion==='0'">
                  <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
                    <span>系统内其他联合体单位列表: </span>
                  </p>
                  <el-table
                    :data="detailFormBefore.contractInfoAttachBO.unionContractInfoAttachList"
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
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      class="listTabel"
                      :resizable="false"
                      label="板块名称"
                      prop="moduleName"
                      align="center"
                      show-overflow-tooltip
                    >
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
                        {{scope.row.isAdd=='1'?'否':'是'}}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div  v-if="detailFormBefore.contractInfo.isInSystemSub==='0'">
                  <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
                    <span>系统内分包单位列表: </span>
                  </p>
                  <el-table
                    :data="detailFormBefore.contractInfoAttachBO.innerContractInfoAttachList"
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
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      class="listTabel"
                      :resizable="false"
                      label="板块名称"
                      prop="moduleName"
                      align="center"
                      show-overflow-tooltip
                    >
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
                        {{scope.row.isAdd=='1'?'否':'是'}}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div  v-if="detailFormBefore.contractInfo.isOutSystemUnion==='0'">
                  <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
                    <span>系统外其他联合体单位列表: </span>
                  </p>
                  <el-table
                    :data="detailFormBefore.contractInfoAttachBO.outUnionContractInfoAttachList"
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
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      class="listTabel"
                      :resizable="false"
                      label="板块名称"
                      prop="moduleName"
                      align="center"
                      show-overflow-tooltip
                    >
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
                        {{scope.row.isAdd=='1'?'否':'是'}}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div  v-if="detailFormBefore.contractInfo.isOutSystemSub==='0'">
                  <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
                    <span>系统外分包单位列表: </span>
                  </p>
                  <el-table
                    :data="detailFormBefore.contractInfoAttachBO.outContractInfoAttachList"
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
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      class="listTabel"
                      :resizable="false"
                      label="板块名称"
                      prop="moduleName"
                      align="center"
                      show-overflow-tooltip
                    >
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
                        {{scope.row.isAdd=='1'?'否':'是'}}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div  v-if="detailFormBefore.contractInfo.isInGroupSub==='0'">
                  <p  class="detail-title" style="overflow: hidden;margin-right: 30px">
                    <span>集团内分包单位列表: </span>
                    <el-button
                      v-show="p.actpoint != 'look'&&p.actpoint !== 'task'"
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
                    :data="detailFormBefore.contractInfoAttachBO.innerGroupContractInfoAttachList"
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
                        {{scope.row.isAdd=='1'?'否':'是'}}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="变更后" name="after">
        <el-form
          :inline="false"
          :model="detailform"
          :rules="rules"
          class="gcform"
          ref="detailform"
        >
          <el-tabs type="border-card">
            <el-tab-pane label="金融保险合同">
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
                  <el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'||detailform.searchProject||p.pushId" placeholder="请输入内容" v-model="detailform.contractInfo.inforName" class="input-with-select">
                    <el-button v-if="detailform.contractInfo.contractType!='2'&&p.actpoint!='task'&&p.actpoint!='look'&&!detailform.searchProject&&!p.pushId" slot="append" icon="el-icon-search" @click="searchName"></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="项目名称(外文)"
                  prop="contractInfo.inforNameForeign"
                >
                  <el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'||detailform.searchProject||p.pushId" placeholder="请输入内容" v-model="detailform.contractInfo.inforNameForeign" class="input-with-select">

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
                  <el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'||detailform.searchProject||p.pushId" placeholder="请输入内容" v-model="detailform.contractInfo.contractName" class="input-with-select">
                    <el-button v-if="detailform.contractInfo.contractType=='2'&&!detailform.searchProject&&!p.pushId" slot="append" icon="el-icon-search" @click="searchName"></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="合同名称(外文):"
                  prop="contractInfo.contractNameForeign"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'||detailform.searchProject||p.pushId"
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
                <br>
                <el-form-item
                  class="inline-formitem form-item-five"
                  label="是否为系统内联合体"
                >
                  <el-switch
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'||detailform.searchProject||p.pushId"
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
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'||detailform.searchProject||p.pushId"
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
                  label="合同规模（万元）:"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                  prop="contractInfo.contractAmount"

                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
                    @input="getOurAmount(),getOurAmount('','','nfb')"
                    clearable
                    placeholder=""
                    size="mini"
                    v-model="detailform.contractInfo.contractAmount"
                  >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="合同收益（万元）:"
                  prop="contractInfo.insureIncome"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    placeholder="请输入"
                    size="mini"
                    v-model="detailform.contractInfo.insureIncome"
                  >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="增值税（万元）:"
                  prop="contractInfo.valueAddedTax"
                  :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    placeholder="请输入"
                    size="mini"
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
                  label="铁建金额(万元):"
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
                <el-form-item
                  label="初始我方份额(万元):"
                  prop="contractInfo.ourAmount"
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
                <el-form-item
                  label="变更后我方份额(万元)"
                  prop="contractInfo.changeOurAmount"
                >
                  <el-input
                    :disabled="true"
                    v-model="detailform.contractInfo.changeOurAmount"
                  >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
                <!--<el-form-item-->
                  <!--label="合同生效地点:"-->
                  <!--prop="contractInfo.path"-->
                  <!--:rules="{-->
                <!--required: true,-->
                <!--message: '此项不能为空',-->
                <!--trigger: 'change',-->
              <!--}"-->
                <!--&gt;-->
                  <!--<el-input :disabled="p.actpoint === 'look'||p.actpoint=='task'" placeholder="请输入内容" v-model="detailform.contractInfo.path" class="input-with-select">-->
                    <!--<el-button  v-if="p.actpoint !== 'look'&&p.actpoint!='task'" slot="append" icon="el-icon-circle-plus-outline" @click="selectPosition" ></el-button>-->
                  <!--</el-input>-->
                <!--</el-form-item>-->
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
                  label="合同有效期:"
                  prop="contractInfo.insureValidityTime"
                >
                  <el-date-picker
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    v-model="detailform.contractInfo.insureValidityTime"
                    type="date"
                    value-format="timestamp"
                    placeholder="选择日期">
                  </el-date-picker>
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
                    size="mini"
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
                    :disabled="p.actpoint==='look'||p.actpoint == 'task'"
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
                    :disabled="p.actpoint==='look'||p.actpoint == 'task'"
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
                      :disabled="p.actpoint==='look'||p.actpoint == 'task'"
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
                      :disabled="p.actpoint==='look'||p.actpoint == 'task'"
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
                  label="业务类别:"
                  prop="contractInfo.businessTypeId"
                  :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"

                >
                  <el-select
                    :disabled="p.actpoint==='look'||p.actpoint == 'task'"
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
                    v-if="item.parentDetailId=='41829bce85db42c1be8f5e763678b855'"
                      :label="item.detailName"
                      :value="item.id"
                      v-for="(item, index) in bizTypeCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="签约单位（使用资质单位）:"
                  prop="contractInfo.signOrgName"
                  :rules="{
      required: true, message: '此项不能为空', trigger:['blur','change']
    }"
                >
                  <el-input clearable :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId" placeholder="请输入内容" v-model="detailform.contractInfo.signOrgName" class="input-with-select">
                    <el-button  v-if="p.actpoint !== 'look'&&p.actpoint!='task'&&!p.pushId" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('签约单位',detailform.contractInfo.signOrgId)" ></el-button>
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
                <br>
                <el-form-item
                label="合同性质"
                prop="contractInfo.contractCharacterCode"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-select
                  :disabled="p.actpoint==='look'||p.actpoint=='task'"
                  filterable
                  clearable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.contractCharacterCode"
                  @change="
                  getName(
                    detailform.contractInfo.contractCharacterCode,
                    contractCharacterCode,
                    'contractCharacter',
                    'contractCharacterId'
                  )
                "
                >
                  <el-option
                    :key="index"
                    v-if="item.parentDetailId=='7e96367ff36211eb9cbfa7cb978cd0c5'"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in contractCharacterCode"
                  ></el-option>
                </el-select>
              </el-form-item>
                <!-- <el-form-item
                  label="客户名称:"
                  prop="contractInfo.insureOtherName"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    placeholder="请输入"
                    size="mini"
                    v-model="detailform.contractInfo.insureOtherName"
                  />
                </el-form-item> -->
                <el-form-item
                  label="客户名称:"
                  prop="contractInfo.constructionOrgId"
                  :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: ['blur','change'],
                }">
                  <el-select
                   :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    v-model="constructionOrgList"
                    v-if="detailform.contractInfo.isClientele=='1'"
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
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    v-model="constructionOrgList"
                    v-if="detailform.contractInfo.isClientele!='1'"
                    multiple
                    filterable
                    collapse-tags
                    placeholder="请选择">
                      <el-option
                        :key="index"
                        :label="item.detailName"
                        :value="item.id"
                        v-for="(item, index) in sjdwList"
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
                   :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    class="inline-formitem-switch"
                    v-model="detailform.contractInfo.isClientele"
                    active-color="#409EFF"
                    inactive-color="#ddd"
                    active-value="1"
                    inactive-value="0"
                    @change="constructionOrgList=''"
                  >
                  </el-switch>
                </el-form-item>

                <el-form-item
                  class="inline-formitem"
                  label="是否年度合同:"
                  prop="contractInfo.isYearContract"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                >
                  <el-switch
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.isYearContract=='0'"
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
                <p>
                  <span >合同生效地点: </span>
                  <el-button
                    v-show="p.actpoint != 'look'&&p.actpoint !== 'task'&&!p.pushId"
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
                      <i class="el-icon-circle-plus"  v-show="p.actpoint != 'look'&&p.actpoint !== 'task'&&!p.pushId" @click="selectPosition(),positionIndex=scope.$index"></i><span>{{scope.row.path}}</span>
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
                          :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                          v-model="scope.row.contractAmount"
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
                        @change="setMain(scope.$index,detailform.topInfoSiteList)"
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
                        @click="del(scope.$index,scope.row,detailform.topInfoSiteList)"
                        type="warning"
                      >删除
                      </el-link
                      >
                    </template>
                  </el-table-column>
                </el-table>
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
                    width="80"
                  >
                    <template slot-scope="scope">
                      <el-link :underline="false" @click="attachmentDownload(scope.row)" type="warning" :style="(p.actpoint != 'look'&&p.actpoint !== 'task')?'color: #409EFF;margin-right: 3px;':'color: #409EFF;'">下载</el-link>
                      <el-link  v-if="p.actpoint!=='look'&&p.actpoint !== 'task'" :underline="false" @click="handleRemove1(scope.row,scope.$index)" type="warning">删除</el-link>
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
                    width="80"
                  >
                    <template slot-scope="scope">
                      <el-link :underline="false" @click="attachmentDownload(scope.row)" type="warning" :style="(p.actpoint != 'look'&&p.actpoint !== 'task')?'color: #409EFF;margin-right: 3px;':'color: #409EFF;'">下载</el-link>
                      <el-link v-if="p.actpoint!=='look'&&p.actpoint!='Yjedit'&&p.actpoint!='task'" :underline="false" @click="handleRemove2(scope.row,scope.$index)" type="warning">删除</el-link>
                    </template>
                  </el-table-column>
                </el-table>
                <div v-if="detailform.contractInfo.isYearContract=='0'">
                  <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
                    <span>年度合同收益:</span>
                    <el-button
                      v-show="p.actpoint != 'look'&&p.actpoint !== 'task'&&p.isYearContract!='0'"
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
                    style="width: 100%;height: auto"
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
                          class="tabelForm-dete"
                          :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.isYearContract=='0'"
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
                          class="tabelForm-dete"
                          :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.isYearContract=='0'"
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
                            @blur="setYearSale(scope.row.salesPerforYear,scope.$index)"
                            v-model="scope.row.contractAmount"
                            clearable
                            :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.isYearContract=='0'"
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
                      v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'&&p.isYearContract!='0'"
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
                  <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
                    <span>系统内其他联合体单位列表: </span>
                    <el-button
                      v-show="p.actpoint != 'look'&&p.actpoint !== 'task'&&!p.pushId"
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
                    :row-class-name="tableRowClassName"
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
                      show-overflow-tooltip
                      width="300"
                    >
                      <template slot-scope="scope">
                        <el-input
                          clearable
                          disabled
                          v-model="scope.row.orgName"
                          class="input-el-input-group">
                          <el-button v-if="p.actpoint !== 'look'&&p.actpoint!='task'" slot="append" icon="el-icon-circle-plus-outline"  @click="addDw('单位名称','',false,scope.$index,'unionContractInfoAttachList')" ></el-button>
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
                      width="150"
                    >
                      <template slot-scope="scope">
                        <el-select
                          class="input-el-input-group"
                          :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
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
                      align="center"
                      width="150"
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
                            @blur="getOurAmount(scope.$index,detailform.contractInfoAttachBO.unionContractInfoAttachList,'nlht')"
                            v-model="scope.row.contractAmount"
                            clearable
                            :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
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
                    >
                      <template slot-scope="scope">
                        <el-switch
                          :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
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
                      class="listTabel"
                      :resizable="false"
                      label="合同金额是否变化"
                      prop="isAmountChange"
                      align="center"
                      show-overflow-tooltip
                    >
                      <!--<template slot-scope="scope">-->
                      <!--{{detailFormBefore.contractInfoAttachBO.unionContractInfoAttachList[scope.$index]&&detailFormBefore.contractInfoAttachBO.unionContractInfoAttachList[scope.$index].uuid==scope.row.uuid&&scope.row.contractAmount!=detailFormBefore.contractInfoAttachBO.unionContractInfoAttachList[scope.$index].contractAmount?'是':'否'}}-->
                      <!--<span v-show="false">{{detailFormBefore.contractInfoAttachBO.unionContractInfoAttachList[scope.$index]&&scope.row.contractAmount!=detailFormBefore.contractInfoAttachBO.unionContractInfoAttachList[scope.$index].contractAmount?scope.row.isAmountChange=0:scope.row.isAmountChange=1}}</span>-->
                      <!--</template>-->
                      <template slot-scope="scope">
                        {{scope.row.isAmountChange=='1'?'否':scope.row.isAmountChange=='0'?'是':''}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      class="listTabel"
                      :resizable="false"
                      label="该单位是否确认"
                      prop="isVerify"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        {{scope.row.isVerify==='1'?'否':scope.row.isVerify==='0'?'是':''}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      fixed="right"
                      label="操作"
                      align="center"
                      show-overflow-tooltip
                      v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'&&!p.pushId"
                      width="80">
                      <template slot-scope="scope">
                        <el-link
                          v-show="!scope.row.uuid"
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
                      v-show="p.actpoint != 'look'&&p.actpoint !== 'task'"
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
                    :row-class-name="tableRowClassName"
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
                      width="150"
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
                            @blur="getOurAmount(scope.$index,detailform.contractInfoAttachBO.innerContractInfoAttachList,'nfb')"
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
                      class="listTabel"
                      :resizable="false"
                      label="合同金额是否变化"
                      prop="isAmountChange"
                      align="center"
                      show-overflow-tooltip
                    >
                      <!--<template slot-scope="scope">-->
                      <!--{{detailFormBefore.contractInfoAttachBO.innerContractInfoAttachList[scope.$index]&&scope.row.contractAmount!=detailFormBefore.contractInfoAttachBO.innerContractInfoAttachList[scope.$index].contractAmount?'是':'否'}}-->
                      <!--<span v-show="false">{{detailFormBefore.contractInfoAttachBO.innerContractInfoAttachList[scope.$index]&&scope.row.contractAmount!=detailFormBefore.contractInfoAttachBO.innerContractInfoAttachList[scope.$index].contractAmount?scope.row.isAmountChange=0:scope.row.isAmountChange=1}}</span>-->
                      <!--</template>-->
                      <template slot-scope="scope">
                        {{scope.row.isAmountChange=='1'?'否':scope.row.isAmountChange=='0'?'是':''}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      class="listTabel"
                      :resizable="false"
                      label="该单位是否确认"
                      prop="isVerify"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        {{scope.row.isVerify==='1'?'否':scope.row.isVerify==='0'?'是':''}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      fixed="right"
                      label="操作"
                      align="center"
                      show-overflow-tooltip
                      v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                      width="80">
                      <template slot-scope="scope">
                        <el-link
                          v-show="!scope.row.uuid"
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
                      v-show="p.actpoint != 'look'&&p.actpoint !== 'task'&&!p.pushId"
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
                    :row-class-name="tableRowClassName"
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
                          :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
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
                      width="150"
                    >
                      <template slot-scope="scope">
                        <el-select
                          class="input-el-input-group"
                          :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
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
                      width="150"
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
                      width="400"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.outUnionContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                          <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                          <el-input
                            class="group-no-padding"
                            @blur="getOurAmount(scope.$index,detailform.contractInfoAttachBO.outUnionContractInfoAttachList,'wlht')"
                            v-model="scope.row.contractAmount"
                            clearable
                            :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
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
                    >
                      <template slot-scope="scope">
                        <el-switch
                          :disabled="p.actpoint === 'look'||p.actpoint=='task'||p.pushId"
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
                      class="listTabel"
                      :resizable="false"
                      label="合同金额是否变化"
                      prop="isAmountChange"
                      align="center"
                      show-overflow-tooltip
                    >
                      <!--<template slot-scope="scope">-->
                      <!--{{detailFormBefore.contractInfoAttachBO.outUnionContractInfoAttachList[scope.$index]&&scope.row.contractAmount!=detailFormBefore.contractInfoAttachBO.outUnionContractInfoAttachList[scope.$index].contractAmount?'是':'否'}}-->
                      <!--<span v-show="false">{{detailFormBefore.contractInfoAttachBO.outUnionContractInfoAttachList[scope.$index]&&scope.row.contractAmount!=detailFormBefore.contractInfoAttachBO.outUnionContractInfoAttachList[scope.$index].contractAmount?scope.row.isAmountChange=0:scope.row.isAmountChange=1}}</span>-->
                      <!--</template>-->
                      <template slot-scope="scope">
                        {{scope.row.isAmountChange=='1'?'否':scope.row.isAmountChange=='0'?'是':''}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      class="listTabel"
                      :resizable="false"
                      label="该单位是否确认"
                      prop="isVerify"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        {{scope.row.isVerify==='1'?'否':scope.row.isVerify==='0'?'是':''}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      fixed="right"
                      label="操作"
                      align="center"
                      show-overflow-tooltip
                      v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'&&!p.pushId"
                      width="80">
                      <template slot-scope="scope">
                        <el-link
                          v-show="!scope.row.uuid"
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
                      v-show="p.actpoint != 'look'&&p.actpoint !== 'task'"
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
                    :row-class-name="tableRowClassName"
                    :data="detailform.contractInfoAttachBO.outContractInfoAttachList"
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
                      width="150"
                      align="center"
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
                      width="150"
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
                      width="400"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.outContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                          <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                          <el-input
                            class="group-no-padding"
                            @blur="getOurAmount(scope.$index,detailform.contractInfoAttachBO.outContractInfoAttachList,'wfb')"
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
                      class="listTabel"
                      :resizable="false"
                      label="合同金额是否变化"
                      prop="isAmountChange"
                      align="center"
                      show-overflow-tooltip
                    >
                      <!--<template slot-scope="scope">-->
                      <!--{{detailFormBefore.contractInfoAttachBO.outContractInfoAttachList[scope.$index]&&scope.row.contractAmount!=detailFormBefore.contractInfoAttachBO.outContractInfoAttachList[scope.$index].contractAmount?'是':'否'}}-->
                      <!--<span v-show="false">{{detailFormBefore.contractInfoAttachBO.outContractInfoAttachList[scope.$index]&&scope.row.contractAmount!=detailFormBefore.contractInfoAttachBO.outContractInfoAttachList[scope.$index].contractAmount?scope.row.isAmountChange=0:scope.row.isAmountChange=1}}</span>-->
                      <!--</template>-->
                      <template slot-scope="scope">
                        {{scope.row.isAmountChange=='1'?'否':scope.row.isAmountChange=='0'?'是':''}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      class="listTabel"
                      :resizable="false"
                      label="该单位是否确认"
                      prop="isVerify"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        {{scope.row.isVerify==='1'?'否':scope.row.isVerify==='0'?'是':''}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      fixed="right"
                      label="操作"
                      align="center"
                      show-overflow-tooltip
                      v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                      width="80">
                      <template slot-scope="scope">
                        <el-link
                          v-show="!scope.row.uuid"
                          :underline="false"
                          @click="del(scope.$index,scope.row,detailform.contractInfoAttachBO.outContractInfoAttachList,'fb')"
                          type="warning">删除
                        </el-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div  v-if="detailform.contractInfo.isInGroupSub==='0'">
                  <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
                    <span>集团内分包单位列表: </span>
                    <el-button
                      v-show="p.actpoint != 'look'&&p.actpoint !== 'task'"
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
                    :row-class-name="tableRowClassName"
                    :data="detailform.contractInfoAttachBO.innerGroupContractInfoAttachList"
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
                      width="150"
                      align="center"
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
                      width="150"
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
                      width="400"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-form-item class="tabelForm" :prop="'contractInfoAttachBO.innerGroupContractInfoAttachList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                          <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                          <el-input
                            class="group-no-padding"
                            @blur="getOurAmount(scope.$index,detailform.contractInfoAttachBO.innerGroupContractInfoAttachList,'jtnfb')"
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
                      class="listTabel"
                      :resizable="false"
                      label="合同金额是否变化"
                      prop="isAmountChange"
                      align="center"
                      show-overflow-tooltip
                    >
                      <!--<template slot-scope="scope">-->
                      <!--{{detailFormBefore.contractInfoAttachBO.outContractInfoAttachList[scope.$index]&&scope.row.contractAmount!=detailFormBefore.contractInfoAttachBO.outContractInfoAttachList[scope.$index].contractAmount?'是':'否'}}-->
                      <!--<span v-show="false">{{detailFormBefore.contractInfoAttachBO.outContractInfoAttachList[scope.$index]&&scope.row.contractAmount!=detailFormBefore.contractInfoAttachBO.outContractInfoAttachList[scope.$index].contractAmount?scope.row.isAmountChange=0:scope.row.isAmountChange=1}}</span>-->
                      <!--</template>-->
                      <template slot-scope="scope">
                        {{scope.row.isAmountChange=='1'?'否':scope.row.isAmountChange=='0'?'是':''}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      class="listTabel"
                      :resizable="false"
                      label="该单位是否确认"
                      prop="isVerify"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        {{scope.row.isVerify==='1'?'否':scope.row.isVerify==='0'?'是':''}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      fixed="right"
                      label="操作"
                      align="center"
                      show-overflow-tooltip
                      v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                      width="80">
                      <template slot-scope="scope">
                        <el-link
                          v-show="!scope.row.uuid"
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
          </el-tabs>
        </el-form>
        <search-name  v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></search-name>
        <add-bd  v-if="BDCSVisible" ref="infoBD" @refreshBD="getBdInfo"></add-bd>
        <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
        <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
        <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'">
        <Audit-Process :task="p.task||{businessId:p.uuid,businessType:' contract_contract_change'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import { isMoney ,isURL} from '@/utils/validate'
  import SearchName from '../searchName'
  import AddBd from '../addBd'
  import CompanyTree from '../companyTree'
  import datas from '@/utils/position'
  import FileUpload from '@/components/fileUpload'
  import AuditProcess from '@/components/auditProcess'
  import companyMul from '@/components/companiesMultiple'
  export default {
    // name: "详情",
    data() {
      var validateMoney = (rule, value, callback) => {
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
        constructionOrgList: [],
        companyMulStatus:false,//设计单位等多选列表状态
        sjdwList:[],
        activeName:"after",
        id:'',
        key: 0,
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index
        infoCSVisible:false,//项目名称查询的状态
        BDCSVisible:false,//标段新增弹框状态
        DwVisible:false,//选择单位弹框状态
        uploadVisible:false,//上传附件组件状态
        afterId:'',
        options2: [],
        options: [],
        detailform: {
          commonFilesList1: [],
          commonFilesList2: [],
          contractInfo: {},
          contractInfoAttachBO: {
            innerContractInfoAttachList:[],
            unionContractInfoAttachList:[]
          },
          contractInfoSectionList: [],
          topInfoSiteList:[],
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
        },
        detailFormBefore:{
          commonFilesList1: [],
          commonFilesList2: [],
          contractInfo: {},
          contractInfoAttachBO: {
            innerContractInfoAttachList:[],
            unionContractInfoAttachList:[]
          },
          contractInfoSectionList: [],
          contractInfoHouseSalesList:[],
          topInfoSiteList:[],
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
        },
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
        ssList:[],//所属省市list
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        xqprojectType: [],//工程类别二级
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
      };
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
       pubCustomers() {//客户名称
        return this.$store.state.pubCustomers;
      },
      //客户性质
      customerNature() {
        return this.$store.state.customerNature;
      },

    contractCharacterCode(){

      return this.$store.state.ContractCharacter;//合同性质
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
      this.id=this.p.instid,this.afterId=this.p.afterId;
      if (this.p.actpoint === "edit"||this.p.actpoint === "look"||this.p.actpoint === "task") {
        this.getDetail();
      }
      if(this.p.actpoint === "add"){
        this.getAddDetail()
      }
      this.$store.dispatch("getPubCustomers", {});
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
      // eslint-disable-next-line no-unde
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
    },
    methods: {
      // 附件下载
      attachmentDownload(file){
        this.$handleDownload(file)
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
      //获取系统外联合体,系统外分包的单位名称
      getXtwName(id, list, index){
        if(id){
          this.$forceUpdate()
          list[index].orgName=this.sjdwList.find(
            (item) => item.id == id
          ).detailName;
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
      //隐藏标段信息某些行
      tableRowClassName: function (row, index) {
        if (row.row.isDelete=='1') {
          return 'hidden-row';
        }
        return '';
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
              '/api/contract/contract/ContractInfo/changeProcess/'+type,
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
      //年销售额
      setYearSale(year,index){
        var yearSale=0,yearSaleNext=0;
        this.detailform.contractInfoHouseSalesList.forEach((item,i)=>{
          if(item.salesPerforYear==year&&(i<index||i==index)){
            yearSale+=Number(item.contractAmount);
          }else if(i>index){
            yearSaleNext+=Number(item.contractAmount);
          }
        });
        this.detailform.contractInfoHouseSalesList.forEach((item,i)=>{
          if(item.salesPerforYear==year&&index==i){
            item.totalAmount=yearSale;
          }else if(i>index){
            item.totalAmount=yearSale+yearSaleNext;
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
          if(type=='wlht'||type=='nlht'){
            //铁建金额计算
            this.detailform.contractInfoAttachBO.outUnionContractInfoAttachList.forEach((item)=>{
              tj_money+=Number(item.contractAmount);
            });
            var changeOurAmount=this.detailform.contractInfo.contractAmount-tj_money;

            if(changeOurAmount>0){
              // this.$set( this.detailform, "contractInfo.crccCash", changeOurAmount);
              this.$forceUpdate();
              this.detailform.contractInfo.crccCash=changeOurAmount;

            }else{
              this.$message.error('铁建份额需要大于0');
              list[index].contractAmount=''
            }
            //我方份额计算
            this.detailform.contractInfoAttachBO.unionContractInfoAttachList.forEach((item)=>{
              our_money+=Number(item.contractAmount);
            });
            var changeOurAmount2=this.detailform.contractInfo.crccCash-our_money;
            if(changeOurAmount2>0){
              this.$forceUpdate();
              this.detailform.contractInfo.changeOurAmount=changeOurAmount2;
              //项目地点的第一条数据金额默认是我方份额
              this.getPositionMoney(0,this.detailform.topInfoSiteList);
              // this.$set( this.detailform, "contractInfo.changeOurAmount", changeOurAmount2);
            }else{
              this.$message.error('我方份额需要大于0');
              list[index].contractAmount=''
            }
            //变更后的内联合体金额是否有变化
            this.detailFormBefore.contractInfoAttachBO.unionContractInfoAttachList.forEach((item)=>{
              if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount==list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=1
              }else if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount!=list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=0
              }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount==list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=1
              }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount!=list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=0;
              }
            });
            //变更后的外联合题金额是否有变化
            this.detailFormBefore.contractInfoAttachBO.outUnionContractInfoAttachList	.forEach((item)=>{
              if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount==list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=1
              }else if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount!=list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=0
              }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount==list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=1
              }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount!=list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=0;
              }
            });
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
              var zile=Number((this.detailform.contractInfo.projectNatureFirstId=='7031076e7a5f4225b1a89f31ee017802'?this.detailform.contractInfo.installDesignFee||0:this.detailform.contractInfo.changeOurAmount||0)-(this.detailform.contractInfo.unAllocatedFee||0)-our_money);
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
            // //判断内分包和外分包之和是否大于我方份额
            // this.detailform.contractInfoAttachBO.innerContractInfoAttachList.forEach((item)=>{
            //   our_money+=Number(item.contractAmount);
            // });
            // this.detailform.contractInfoAttachBO.outContractInfoAttachList.forEach((item)=>{
            //   our_money+=Number(item.contractAmount);
            // });
            // var changeOurAmount=this.detailform.contractInfo.changeOurAmount-our_money;
            // if(!changeOurAmount>0){
            //   this.$message.error('我方份额需要大于0');
            //   list[index].contractAmount=''
            // }
            //变更后的内分包金额是否有变化
            this.detailFormBefore.contractInfoAttachBO.innerContractInfoAttachList.forEach((item)=>{
              if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount==list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=1
              }else if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount!=list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=0
              }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount==list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=1
              }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount!=list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=0;
              }
            });
            //变更后的外联合题金额是否有变化
            this.detailFormBefore.contractInfoAttachBO.outContractInfoAttachList	.forEach((item)=>{
              if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount==list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=1
              }else if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount!=list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=0
              }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount==list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=1
              }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount!=list[index].contractAmount){
                this.$forceUpdate();
                list[index].isAmountChange=0;
              }
            });
          }else{
            //合同总金额输入计算我方份额和铁建金额
            this.detailform.contractInfoAttachBO.outUnionContractInfoAttachList.forEach((item)=>{
              tj_money+=Number(item.contractAmount);
            });
            this.$forceUpdate();
            this.detailform.contractInfo.crccCash=this.detailform.contractInfo.contractAmount-tj_money;
            this.detailform.contractInfoAttachBO.unionContractInfoAttachList.forEach((item)=>{
              our_money+=Number(item.contractAmount);
            });
            this.$forceUpdate();
            this.detailform.contractInfo.changeOurAmount=this.detailform.contractInfo.crccCash-our_money;
            //项目地点的第一条数据金额默认是我方份额
            this.getPositionMoney(0,this.detailform.topInfoSiteList);
          }
        }else if(ifswitch!='switch'){
          this.$message.error('合同总金额需要大于0');
        }
      },
      // getOurAmount(index,list,type){
      //   var tj_money=0,our_money=0;
      //   if(type=='wlht'||type=='nlht'){
      //     //铁建金额计算
      //     this.detailform.contractInfoAttachBO.outUnionContractInfoAttachList.forEach((item)=>{
      //       tj_money+=Number(item.contractAmount);
      //     });
      //     var ourAmount=this.detailform.contractInfo.contractAmount-tj_money;
      //
      //     if(ourAmount>0){
      //       // this.$set( this.detailform, "contractInfo.crccCash", ourAmount);
      //       this.$forceUpdate();
      //       this.detailform.contractInfo.crccCash=ourAmount;
      //
      //     }else{
      //       this.$message.error('铁建份额需要大于0');
      //       list[index].contractAmount=''
      //     }
      //     //我方份额计算
      //     this.detailform.contractInfoAttachBO.unionContractInfoAttachList.forEach((item)=>{
      //       our_money+=Number(item.contractAmount);
      //     });
      //     var ourAmount2=this.detailform.contractInfo.crccCash-our_money;
      //     if(ourAmount2>0){
      //       this.$forceUpdate();
      //       this.detailform.contractInfo.ourAmount=ourAmount2;
      //       // this.$set( this.detailform, "contractInfo.ourAmount", ourAmount2);
      //     }else{
      //       this.$message.error('我方份额需要大于0');
      //       list[index].contractAmount=''
      //     }
      //     //变更后的内联合体金额是否有变化
      //     this.detailFormBefore.contractInfoAttachBO.unionContractInfoAttachList.forEach((item)=>{
      //       if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount==list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=1
      //       }else if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount!=list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=0
      //       }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount==list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=1
      //       }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount!=list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=0;
      //       }
      //     });
      //     //变更后的外联合题金额是否有变化
      //     this.detailFormBefore.contractInfoAttachBO.outUnionContractInfoAttachList	.forEach((item)=>{
      //       if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount==list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=1
      //       }else if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount!=list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=0
      //       }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount==list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=1
      //       }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount!=list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=0;
      //       }
      //     });
      //   }else if(type=='nfb'||type=='wfb'){
      //     //判断内分包和外分包之和是否大于我方份额
      //     this.detailform.contractInfoAttachBO.innerContractInfoAttachList.forEach((item)=>{
      //       our_money+=Number(item.contractAmount);
      //     });
      //     this.detailform.contractInfoAttachBO.outContractInfoAttachList.forEach((item)=>{
      //       our_money+=Number(item.contractAmount);
      //     });
      //     var ourAmount=this.detailform.contractInfo.ourAmount-our_money;
      //     if(!ourAmount>0){
      //       this.$message.error('我方份额需要大于0');
      //       list[index].contractAmount=''
      //     }
      //     //变更后的内分包金额是否有变化
      //     this.detailFormBefore.contractInfoAttachBO.innerContractInfoAttachList.forEach((item)=>{
      //       if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount==list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=1
      //       }else if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount!=list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=0
      //       }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount==list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=1
      //       }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount!=list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=0;
      //       }
      //     });
      //     //变更后的外联合题金额是否有变化
      //     this.detailFormBefore.contractInfoAttachBO.outContractInfoAttachList	.forEach((item)=>{
      //       if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount==list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=1
      //       }else if(this.p.actpoint == 'add'&&item.uuid==list[index].uuid&&item.contractAmount!=list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=0
      //       }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount==list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=1
      //       }else if(this.p.actpoint == 'edit'&&item.srcUuid==list[index].srcUuid&&item.contractAmount!=list[index].contractAmount){
      //         this.$forceUpdate();
      //         list[index].isAmountChange=0;
      //       }
      //     });
      //   }else{
      //     //合同总金额输入计算我方份额和铁建金额
      //     this.detailform.contractInfoAttachBO.outUnionContractInfoAttachList.forEach((item)=>{
      //       tj_money+=Number(item.contractAmount);
      //     });
      //     this.$forceUpdate();
      //     this.detailform.contractInfo.crccCash=this.detailform.contractInfo.contractAmount-tj_money;
      //     this.detailform.contractInfoAttachBO.unionContractInfoAttachList.forEach((item)=>{
      //       our_money+=Number(item.contractAmount);
      //     });
      //     this.$forceUpdate();
      //     this.detailform.contractInfo.ourAmount=this.detailform.contractInfo.crccCash-our_money;
      //   }
      // },
      //获取其他投资
      getOther(){
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
          this.detailform.commonFilesList1.splice(index,1);
        }

      });
        console.log(this.detailform.fileList1)
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
          this.$refs.infoCS.init(this.detailform.contractInfo.moduleId,this.detailform.contractInfo.contractType);
        })
      },
      //项目名称查询回来的数据
      goAddDetail(data){
        this.$http
          .post("/api/contract/topInfo/TopInfor/detail/entityInfoByIdForContract", {uuid :data.data.uuid})
          .then((res) => {
            var datas=res.data.data;
            this.detailform.searchProject=true;
            var _con={};
            // this.getTwo(datas.topInfor.enginTypeFirstId);
            // this.getThree(datas.topInfor.enginTypeSecondId);
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
              //参见单位把前期中标中的施工单位直接带过来
              this.detailform.contractInfo.buildOrgNames=bidInfoSection.constructionUnitName;
              this.detailform.contractInfo.buildOrgIds=bidInfoSection.constructionUnitId;
              bidInfoSection.uuid='';
              for(var k in bidInfoSection.bidInfoSectionOrgList){
                bidInfoSection.bidInfoSectionOrgList[k].uuid='';
              }
              bidInfoSection.bidInfoSectionOrgList=bidInfoSectionOrgList;
              this.detailform.contractInfoSectionList.push(bidInfoSection);
            }

            for(var i in datas.topInfoSiteList){
              datas.topInfoSiteList[i].uuid='';
              datas.topInfoSiteList[i].contractAmount='';
            }
            this.detailform.topInfoSiteList=datas.topInfoSiteList;
          });
        this.$forceUpdate();
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
                this.detailform.contractInfo.enginTypeFirstCode = item.detailCode;
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
        if(item.uuid&&type=='yj'){
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
        // }else if(item.uuid&&(type=='lht'||type=='fb')){
        }else if(type=='lht'||type=='fb'){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            list[index].isDelete=1;
        //     this.$http
        //     .post(
        //       "/api/contract/contract/ContractInfo/list/deleteAttach",
        //       {ids: [item.uuid]}
        //     )
        //     .then((res) => {
        //     if (res.data && res.data.code === 200) {
        //     list.splice(index, 1);
        //     this.getOurAmount()
        //   } else {
        //     this.$message.error(data.msg)
        //   }
        // });
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      saveInfo(formName,type) {
        this.detailform.srcId=this.id;
        this.detailform.commonFilesList=this.detailform.commonFilesList1.concat(this.detailform.commonFilesList2)
        var url='';
        this.detailform.contractInfo.constructionOrgId = this.constructionOrgList.join(",")
        if(type=='save'){
          url=`/api/contract/contract/ContractInfo/detail/${this.p.actpoint === "add"?'saveChangeRecord':'updateChangeRecord'}`;
        }else{
          url='/api/contract/contract/ContractInfo/changeProcess/start';
        }
        if(this.detailform.contractInfo.isOpenBid=='1'&&this.detailform.commonFilesList2.length==0){
          this.$message.error("请上传招标公告文件");
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
        if(this.detailform.contractInfo.isYearContract=='0'){
          var ddMoney=0,syMoney=0;
          this.detailform.topInfoSiteList.forEach((item)=>{
            ddMoney+=Number(item.contractAmount)
          });
          this.detailform.contractInfoHouseSalesList.forEach((item)=>{
            syMoney+=Number(item.contractAmount)
          });
          if(ddMoney!=syMoney){
            this.$message.error("项目地点金额之和应等于年度合同收益列表中本月收益之和");
            return false;
          }
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var datas=this.p.actpoint === "add"||(type!='save'&&this.detailform.contractInfo.flowStatus=='edit'||this.detailform.contractInfo.flowStatus=='reject')?{
              'afterContractInfoBO':this.detailform,
              'beforeContractInfoBO':this.detailFormBefore
            }:this.detailform;
            this.$http
              .post(
                url,
                JSON.stringify(datas),
                {useJson: true}
              )
              .then((res) => {
              if (res.data.code === 200) {
              this.$message({
                message:  `${type=='save'?'保存':'提交'}成功`,
                type: "success",
              });
              this.$router.back();
            }
          });
          } else {
            this.$message.error("请添加必填项");
        return false;
      }
      });
      },
      getDetail() {
        this.$http
          .post("/api/contract/contract/ContractInfo/detail/entityInfoByBeforeAndAfterId", {beforeId:this.id,afterId:this.afterId,uuid:this.p.task?this.p.instid:this.p.uuid})
          .then((res) => {
          var datas=res.data.data;
        var beforData=[],afterData=[];
        if(datas[0].contractInfo.changeStatus==1){
          beforData=datas[0];
          afterData=datas[1];
        }else{
          beforData=datas[1];
          afterData=datas[0];
        }
            afterData.commonFilesList=afterData.commonFilesList||[];
            beforData.commonFilesList=beforData.commonFilesList||[];
            var fileList1=[],fileList2=[];
            afterData.commonFilesList.forEach((item) => {
              if(item.businessCode=='01'||item.businessCode=='zmcl'){
                fileList1.push(item)
              }else if(item.businessCode=='02'){
                fileList2.push(item)
              }
            });
            var _fileList1=[],_fileList2=[];
            beforData.commonFilesList.forEach((item) => {
              if(item.businessCode=='01'||item.businessCode=='zmcl'){
                _fileList1.push(item)
              }else if(item.businessCode=='02'){
                _fileList2.push(item)
              }
            });
        this.getTwoSC(afterData.contractInfo.marketFirstNameId);
        this.detailform={
          changeRecordUuid:afterData.changeRecordUuid,
          commonFilesList1: fileList1,
          commonFilesList2: fileList2,
          contractInfo: afterData.contractInfo,
          contractInfoAttachBO: afterData.contractInfoAttachBO,
          contractInfoHouseSalesList:afterData.contractInfoHouseSalesList,
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
          topInfoSiteList:afterData.topInfoSiteList
        };
        this.detailform.cdmc=afterData.contractInfo.siteNameId&&afterData.contractInfo.siteNameId.split(",");
        this.detailform.zplx=afterData.contractInfo.otherAssemblyTypeId&&afterData.contractInfo.otherAssemblyTypeId.split(",");
        this.detailform.jzlx=afterData.contractInfo.otherBuildingTypeId&&afterData.contractInfo.otherBuildingTypeId.split(",");
        this.detailform.jzjglx=afterData.contractInfo.otherBuildingStructureTypeId&&afterData.contractInfo.otherBuildingStructureTypeId.split(",");
        this.detailFormBefore={
          commonFilesList1: _fileList1,
          commonFilesList2: _fileList2,
          contractInfo: beforData.contractInfo,
          contractInfoAttachBO: beforData.contractInfoAttachBO,
          contractInfoHouseSalesList:beforData.contractInfoHouseSalesList,
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
          topInfoSiteList:beforData.topInfoSiteList
        }
        this.detailFormBefore.cdmc=beforData.contractInfo.siteNameId&&beforData.contractInfo.siteNameId.split(",");
        this.detailFormBefore.zplx=beforData.contractInfo.otherAssemblyTypeId&&beforData.contractInfo.otherAssemblyTypeId.split(",");
        this.detailFormBefore.jzlx=beforData.contractInfo.otherBuildingTypeId&&beforData.contractInfo.otherBuildingTypeId.split(",");
        this.detailFormBefore.jzjglx=beforData.contractInfo.otherBuildingStructureTypeId&&beforData.contractInfo.otherBuildingStructureTypeId.split(",");
        if(datas.contractInfo.constructionOrgId != '' ||datas.contractInfo.constructionOrgId != null){
          this.constructionOrgList = datas.contractInfo.constructionOrgId.split(",");
        }
        this.detailform.contractInfo.changeOurAmount = this.detailform.contractInfo.ourAmount;
      });
      },
      //新增的时候详情
      getAddDetail(){
        this.$http
          .post("/api/contract/contract/ContractInfo/detail/entityInfo", {id:this.id})
          .then((res) => {
          var datas=res.data.data;
        this.getTwoSC(datas.contractInfo.marketFirstNameId);
            var fileList1=[],fileList2=[];
            datas.commonFilesList.forEach((item) => {
              if(item.businessCode=='01'||item.businessCode=='zmcl'){
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
          contractInfoHouseSalesList:datas.contractInfoHouseSalesList,
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
          topInfoSiteList:datas.topInfoSiteList
        }
        this.detailform.cdmc=datas.contractInfo.siteNameId&&datas.contractInfo.siteNameId.split(",");
        this.detailform.zplx=datas.contractInfo.otherAssemblyTypeId&&datas.contractInfo.otherAssemblyTypeId.split(",");
        this.detailform.jzlx=datas.contractInfo.otherBuildingTypeId&&datas.contractInfo.otherBuildingTypeId.split(",");
        this.detailform.jzjglx=datas.contractInfo.otherBuildingStructureTypeId&&datas.contractInfo.otherBuildingStructureTypeId.split(",");
        for(var i in this.detailform){
          this.detailFormBefore[i]=JSON.parse(JSON.stringify(this.detailform[i]));
        }
        this.detailform.contractInfo.changeOurAmount = this.detailform.contractInfo.ourAmount;
      });
      },
    }
  };
</script>
<style lang="scss" scoped>
  .detailBoxBG{
    max-height:calc(100vh - 232px)!important;
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
  .positon-path{
    word-wrap: break-word;
    word-break: break-all;
    width: 90%;
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
    >>>.el-form-item {
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
    .errorMsg >>>.el-form-item__label {
      color: red;
    }
    >>>.el-input {
      width: 300px;
    }
    >>>.el-input >>>.el-input_inner {
      width: 300px;
      height: 500px;
    }
  }

  .el-input >>>.el-input_inner {
    width: 300px;
    height: 500px;
  }

  .el-table thead.is-group th {
    background: #fff;
  }

  .clothSizeTable {
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

  .gcform .el-form-item {
    margin-bottom: 0px;
  }

  .neirong  >>>.el-input--mini >>>.el-input__inner {
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
  .detailTable >>>.el-input-group{
    margin-top: 0;
  }
</style>

