<template>
  <div style="position: relative">
    <el-button @click="back" class="detailbutton detail-back-tab" >返回</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailform','save')" class="detailbutton detail-back-tab save-btn">保存</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.topInfoOrg.flowStatus==1||detailform.topInfoOrg.flowStatus==4)" @click="saveInfo('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <!--<el-button v-show="p.actpoint == 'task'&&p.task.edit==true" @click="operation('recall')" class="detailbutton" type="danger">撤销</el-button>-->
    <el-tabs type="border-card" >
      <el-tab-pane label="勘察设计板块">
        <el-tabs type="border-card">
          <el-tab-pane label="产值">
            <div class="detailBox">
              <el-form
                :inline="false"
                :model="detailform"
                :rules="rules"
                class="gcform"
                ref="detailform"
              >
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>当月: </span>
                </p>
                <el-form-item
                  label="合计:"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_0.kcsjMonth||0)+(detailform.sumByMon_0.gcjlMonth||0)+(detailform.sumByMon_0.jszxMonth||0)+(detailform.sumByMon_0.qtMonth||0)"/>
                </el-form-item>
                <el-form-item
                  label="其中勘察设计:"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_0.kcsjMonth"/>
                </el-form-item>
                <el-form-item
                  label="工程监理:"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_0.gcjlMonth"/>
                </el-form-item>
                <el-form-item
                  label="技术咨询与转让:"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_0.jszxMonth"/>
                </el-form-item>
                <el-form-item
                  label="其他:"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_0.qtMonth"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>当年: </span>
                </p>
                <el-form-item
                  label="合计:"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_0.kcsjMonth||0)+(detailform.sumByMon_0.gcjlMonth||0)+(detailform.sumByMon_0.jszxMonth||0)+(detailform.sumByMon_0.qtMonth||0)+(detailform.sumByYear_0.kcsjMonth||0)+(detailform.sumByYear_0.gcjlMonth||0)+(detailform.sumByYear_0.jszxMonth||0)+(detailform.sumByYear_0.qtMonth||0)"/>
                </el-form-item>
                <el-form-item
                  label="其中勘察设计:"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByYear_0.kcsjYear"/>
                </el-form-item>
                <el-form-item
                  label="工程监理:"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByYear_0.gcjlYear"/>
                </el-form-item>
                <el-form-item
                  label="技术咨询与转让:"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByYear_0.jszxYear"/>
                </el-form-item>
                <el-form-item
                  label="其他:"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByYear_0.qtYear"/>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要项目管理">
            <div class="table-div">
              <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
                <el-form-item label="项目简称:">
                  <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
                </el-form-item>
                <el-form-item
                  label="工程类别(一级):"
                >
                  <el-select
                    clearable
                    filterable
                    placeholder="请选择"
                    @change="getTwo"
                    size="mini"
                    v-model="searchform.enginTypeFirstId"
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
                >
                  <el-select
                    clearable
                    filterable
                    placeholder="请选择工程类别(一级)"
                    size="mini"
                    v-model="searchform.enginTypeSecondId"
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
                  label="项目状态:"
                >
                  <el-select
                    clearable
                    filterable
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.flowStatus"
                  >
                    <el-option
                      :key="index"
                      :label="item.detailName"
                      :value="item.id"
                      v-for="(item, index) in projectStatus"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="业务板块:"
                >
                  <el-select
                    clearable
                    filterable
                    placeholder="请选择"
                    size="mini"
                    v-model="searchform.flowStatus"
                  >
                    <el-option
                      :key="index"
                      :label="item.detailName"
                      :value="item.id"
                      v-for="(item, index) in projectStatus"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
                <el-button @click="getData" type="primary" plain>查询</el-button>
                <el-button @click="exportdata" type="primary" plain>导出</el-button>
              </el-form>
              <el-table
                :data="detailform.kc_list"
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
                  prop="amountCompanyName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="项目简称"
                  prop="projectOmit"
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
                  label="工程合同额"
                  align="center"
                  prop="contractAmountEngine"
                  show-overflow-tooltip
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="年初进度%"
                  prop="yearStart"
                  align="center"
                  show-overflow-tooltip
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="月初进度%"
                  prop="monthStart"
                  align="center"
                  show-overflow-tooltip
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="上月进度%"
                  prop="monthBefore"
                  align="center"
                  show-overflow-tooltip
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="月末进度%"
                  prop="monthValue"
                  align="center"
                  show-overflow-tooltip
                  width="150"
                >
                  <template slot-scope="scope">
                    <el-input
                      @input="setCcsjYmjd(detailform.kc_list,detailform.sumByMon_0,'categorySecondName',scope.$index)"
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      clearable
                      v-model="scope.row.monthValue"/>
                  </template>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="本月产值(万元)"
                  prop="monthFinish"
                  align="center"
                  show-overflow-tooltip
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="本年产值(万元)"
                  prop="yearValue"
                  align="center"
                  show-overflow-tooltip
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="实物工程量"
                  prop="physicalQuantity"
                  align="center"
                  show-overflow-tooltip
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="计量单位"
                  prop="unitName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="本月完成(万元)"
                  prop="monthComplete"
                  align="center"
                  show-overflow-tooltip
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="本年完成(万元)"
                  prop="yearComplete"
                  align="center"
                  show-overflow-tooltip
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="备注"
                  prop="remark"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>

              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="工业制造板块">
        <el-tabs type="border-card">
          <el-tab-pane label="产值">
            <div class="detailBox">
              <el-form
                :inline="false"
                :model="detailform"
                :rules="rules"
                class="gcform"
                ref="detailform"
              >
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>合计:</span>
                </p>
                <el-form-item
                  label="工业总产值(万元):"
                  >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.industry||0)+(detailform.sumByMon_1.industryHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="工业总产值年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.industry||0)+(detailform.sumByMon_1.industryHw||0)+(detailform.sumByYear_1.industry||0)+(detailform.sumByYear_1.industryHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="装备制造(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.equipmentManufacturin||0)+(detailform.sumByMon_1.equipmentManufacturinHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="装备制造年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.equipmentManufacturin||0)+(detailform.sumByMon_1.equipmentManufacturinHw||0)+(detailform.sumByYear_1.equipmentManufacturin||0)+(detailform.sumByYear_1.equipmentManufacturinHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="预构件(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.componentManufacturin||0)+(detailform.sumByMon_1.componentManufacturinHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="预构件年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.componentManufacturin||0)+(detailform.sumByMon_1.componentManufacturinHw||0)+(detailform.sumByYear_1.componentManufacturin||0)+(detailform.sumByYear_1.componentManufacturinHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.otherIndustrayProduct||0)+(detailform.sumByMon_1.otherIndustrayProductHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.otherIndustrayProduct||0)+(detailform.sumByMon_1.otherIndustrayProductHw||0)+(detailform.sumByYear_1.otherIndustrayProduct||0)+(detailform.sumByYear_1.otherIndustrayProductHw||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境内数据: </span>
                </p>
                <el-form-item
                  label="工业总产值(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_1.industry"/>
                </el-form-item>
                <el-form-item
                  label="工业总产值年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.industry||0)+(detailform.sumByYear_1.industry||0)"/>
                </el-form-item>
                <el-form-item
                  label="装备制造(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_1.equipmentManufacturin"/>
                </el-form-item>
                <el-form-item
                  label="装备制造年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.equipmentManufacturin||0)+(detailform.sumByYear_1.equipmentManufacturin||0)"/>
                </el-form-item>
                <el-form-item
                  label="预构件(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_1.componentManufacturin"/>
                </el-form-item>
                <el-form-item
                  label="预构件年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.componentManufacturin||0)+(detailform.sumByYear_1.componentManufacturin||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_1.otherIndustrayProduct"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.otherIndustrayProduct||0)+(detailform.sumByYear_1.otherIndustrayProduct||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境外数据: </span>
                </p>
                <el-form-item
                  label="工业总产值(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_1.industryHw"/>
                </el-form-item>
                <el-form-item
                  label="工业总产值年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.industryHw||0)+(detailform.sumByYear_1.industryHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="装备制造(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_1.equipmentManufacturinHw"/>
                </el-form-item>
                <el-form-item
                  label="装备制造年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.equipmentManufacturinHw||0)+(detailform.sumByYear_1.equipmentManufacturinHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="预构件(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_1.componentManufacturinHw"/>
                </el-form-item>
                <el-form-item
                  label="预构件年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.componentManufacturinHw||0)+(detailform.sumByYear_1.componentManufacturinHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_1.otherIndustrayProductHw"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_1.otherIndustrayProductHw||0)+(detailform.sumByYear_1.otherIndustrayProductHw||0)"/>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要项目管理">
            <div class="table-div">
              <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
                <el-form-item label="项目名称:">
                  <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
                </el-form-item>
                <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
                <el-button @click="getData" type="primary" plain>查询</el-button>
                <el-button @click="exportdata" type="primary" plain>导出</el-button>
              </el-form>
              <el-table
                :data="detailform.gy_list"
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
                  label="项目信息"
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
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同号"
                    prop="contractNumber"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="所属单位"
                    prop="companyBelongName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="境/内外"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{scope.row.country=='01'?'境内':'境外'}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目内容"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="推送人"
                    prop="projectPusher"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="联系方式"
                    prop="projectPusherPhone"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同额"
                    prop="contractAmountTotal"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="剩余合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="上报产值是否含增值税"
                    prop="isOutputTax"
                    align="center"
                    show-overflow-tooltip
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="税额"
                    prop="vat"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="本月完成"
                >
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工业总产值"
                    prop="industry"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.gy_list,detailform.sumByMon_1,'industry')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.industry"/>
                      <el-input
                        @input="getGyzzCz(detailform.gy_list,detailform.sumByMon_1,'industryHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.industryHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="装备制造"
                    prop="equipmentManufacturin"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.gy_list,detailform.sumByMon_1,'equipmentManufacturin')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.equipmentManufacturin"/>
                      <el-input
                        @input="getGyzzCz(detailform.gy_list,detailform.sumByMon_1,'equipmentManufacturinHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.equipmentManufacturinHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="预购件"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.gy_list,detailform.sumByMon_1,'componentManufacturin')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.componentManufacturin"/>
                      <el-input
                        @input="getGyzzCz(detailform.gy_list,detailform.sumByMon_1,'componentManufacturinHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.componentManufacturinHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="其他工业产品"
                    prop="otherIndustrayProduct"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.gy_list,detailform.sumByMon_1,'otherIndustrayProduct')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.otherIndustrayProduct"/>
                      <el-input
                        @input="getGyzzCz(detailform.gy_list,detailform.sumByMon_1,'otherIndustrayProductHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.otherIndustrayProductHw"/>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="物资贸易板块">
        <el-tabs type="border-card">
          <el-tab-pane label="产值">
            <div class="detailBox">
              <el-form
                :inline="false"
                :model="detailform"
                :rules="rules"
                class="gcform"
                ref="detailform"
              >
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>合计:</span>
                </p>
                <el-form-item
                  label="物资贸易产值(万元):"
                 >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_2.materialTrade||0)+(detailform.sumByMon_2.materialTradeHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="物资贸易产值年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_2.materialTrade||0)+(detailform.sumByMon_2.materialTradeHw||0)+(detailform.sumByYear_2.materialTrade||0)+(detailform.sumByYear_2.materialTradeHw||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境内数据: </span>
                </p>
                <el-form-item
                  label="物资贸易产值(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_2.materialTrade"/>
                </el-form-item>
                <el-form-item
                  label="物资贸易产值年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_2.materialTrade||0)+(detailform.sumByYear_2.materialTrade||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境外数据: </span>
                </p>
                <el-form-item
                  label="物资贸易产值(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_2.materialTradeHw"/>
                </el-form-item>
                <el-form-item
                  label="物资贸易产值年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_2.materialTradeHw||0)+(detailform.sumByYear_2.materialTradeHw||0)"/>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要项目管理">
            <div class="table-div">
              <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
                <el-form-item label="项目名称:">
                  <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
                </el-form-item>
                <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
                <el-button @click="getData" type="primary" plain>查询</el-button>
                <el-button @click="exportdata" type="primary" plain>导出</el-button>
              </el-form>
              <el-table
                :data="detailform.wz_list"
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
                  label="项目信息"
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
                    label="合同编号"
                    prop="contractNumber"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectName	"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="所属单位"
                    prop="companyBelongName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目内容"
                    prop="projectContent"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="境/内外"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{scope.row.country=='01'?'境内':'境外'}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="推送人"
                    prop="projectPusher"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="联系方式"
                    prop="projectPusherPhone"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同额"
                    prop="contractAmountTotal"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="剩余合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="上报产值是否含增值税"
                    prop="isOutputTax"
                    align="center"
                    show-overflow-tooltip
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="税额"
                    prop="vat"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="本月完成"
                >
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="物资贸易产值"
                    prop="materialTrade"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.wz_list,detailform.sumByMon_2,'materialTrade')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.materialTrade"/>
                      <el-input
                        @input="getGyzzCz(detailform.wz_list,detailform.sumByMon_2,'materialTradeHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.materialTradeHw"/>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="房地产板块">
        <el-tabs type="border-card">
          <el-tab-pane label="产值">
            <div class="detailBox">
              <el-form
                :inline="false"
                :model="detailform"
                :rules="rules"
                class="gcform"
                ref="detailform"
              >
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>合计:</span>
                </p>
                <el-form-item
                  label="房地产营业收入(万元):"
                  prop="sumByMon_3.inforName"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.realEstateIncome||0)+(detailform.sumByMon_3.realEstateIncomeHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="房地产营业收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.realEstateIncome||0)+(detailform.sumByMon_3.realEstateIncomeHw||0)+(detailform.sumByYear_3.realEstateIncome||0)+(detailform.sumByYear_3.realEstateIncomeHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="表内营收(万元)::"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.inRevenue||0)+(detailform.sumByMon_3.inRevenue||0)"/>
                </el-form-item>
                <el-form-item
                  label="表内营收年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.inRevenue||0)+(detailform.sumByMon_3.inRevenue||0)+(detailform.sumByYear_3.inRevenue||0)+(detailform.sumByYear_3.inRevenue||0)"/>
                </el-form-item>
                <el-form-item
                  label="表外权益(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.offRevenue||0)+(detailform.sumByMon_3.offRevenueHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="表外权益年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.offRevenue||0)+(detailform.sumByMon_3.offRevenueHw||0)+(detailform.sumByYear_3.offRevenue||0)+(detailform.sumByYear_3.offRevenueHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.offRevenueNon||0)+(detailform.sumByMon_3.offRevenueNonHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.offRevenueNon||0)+(detailform.sumByMon_3.offRevenueNonHw||0)+(detailform.sumByYear_3.offRevenueNon||0)+(detailform.sumByYear_3.offRevenueNonHw||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境内数据: </span>
                </p>
                <el-form-item
                  label="房地产营业收入(万元):"
                  prop="sumByMon_3.inforName"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_3.realEstateIncome"/>
                </el-form-item>
                <el-form-item
                  label="房地产营业收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.realEstateIncome||0)+(detailform.sumByYear_3.realEstateIncome||0)"/>
                </el-form-item>
                <el-form-item
                  label="表内营收(万元)::"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_3.inRevenue"/>
                </el-form-item>
                <el-form-item
                  label="表内营收年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.inRevenue||0)+(detailform.sumByYear_3.inRevenue||0)"/>
                </el-form-item>
                <el-form-item
                  label="表外权益(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_3.offRevenue"/>
                </el-form-item>
                <el-form-item
                  label="表外权益年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.offRevenue||0)+(detailform.sumByYear_3.offRevenue||0)"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_3.offRevenueNon"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.offRevenueNon||0)+(detailform.sumByYear_3.offRevenueNon||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境外数据: </span>
                </p>
                <el-form-item
                  label="房地产营业收入(万元):"
                  prop="sumByMon_3.inforName"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_3.realEstateIncomeHw"/>
                </el-form-item>
                <el-form-item
                  label="房地产营业收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.realEstateIncomeHw||0)+(detailform.sumByYear_3.realEstateIncomeHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="表内营收(万元)::"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_3.inRevenueHw"/>
                </el-form-item>
                <el-form-item
                  label="表内营收年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.inRevenueHw||0)+(detailform.sumByYear_3.inRevenueHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="表外权益(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_3.offRevenueHw"/>
                </el-form-item>
                <el-form-item
                  label="表外权益年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.offRevenueHw||0)+(detailform.sumByYear_3.offRevenueHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_3.offRevenueNonHw"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_3.offRevenueNonHw||0)+(detailform.sumByYear_3.offRevenueNonHw||0)"/>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要项目管理">
            <div class="table-div">
              <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
                <el-form-item label="项目名称:">
                  <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
                </el-form-item>
                <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
                <el-button @click="getData" type="primary" plain>查询</el-button>
                <el-button @click="exportdata" type="primary" plain>导出</el-button>
              </el-form>
              <el-table
                :data="detailform.fdc_list"
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
                  label="项目信息"
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
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同号"
                    prop="contractNumber"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="所属单位"
                    prop="companyBelongName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="境/内外"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{scope.row.country=='01'?'境内':'境外'}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目内容"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="推送人"
                    prop="projectPusher"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="联系方式"
                    prop="projectPusherPhone"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同额"
                    prop="contractAmountTotal"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="剩余合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="上报产值是否含增值税"
                    prop="isOutputTax"
                    align="center"
                    show-overflow-tooltip
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="税额"
                    prop="vat"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="本月完成"
                >
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="房地产营业收入"
                    prop="realEstateIncome"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.fdc_list,detailform.sumByMon_3,'realEstateIncome')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.realEstateIncome"/>
                      <el-input
                        @input="getGyzzCz(detailform.fdc_list,detailform.sumByMon_3,'realEstateIncomeHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.realEstateIncomeHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="表内营收"
                    prop="inRevenue"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.fdc_list,detailform.sumByMon_3,'inRevenue')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.inRevenue"/>
                      <el-input
                        @input="getGyzzCz(detailform.fdc_list,detailform.sumByMon_3,'inRevenueHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.inRevenueHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="表外权益"
                    prop="offRevenue"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.fdc_list,detailform.sumByMon_3,'offRevenue')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.offRevenue"/>
                      <el-input
                        @input="getGyzzCz(detailform.fdc_list,detailform.sumByMon_3,'offRevenueHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.offRevenueHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="表外非权益"
                    prop="offRevenueNon"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.fdc_list,detailform.sumByMon_3,'offRevenueNon')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.offRevenueNon"/>
                      <el-input
                        @input="getGyzzCz(detailform.fdc_list,detailform.sumByMon_3,'offRevenueNonHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.offRevenueNonHw"/>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="金融保险">
        <el-tabs type="border-card">
          <el-tab-pane label="产值">
            <div class="detailBox">
              <el-form
                :inline="false"
                :model="detailform"
                :rules="rules"
                class="gcform"
                ref="detailform"
              >
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>合计:</span>
                </p>
                <el-form-item
                  label="合计(万元):"
                  prop="sumByMon_3.inforName"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.jnyl||0)+(detailform.sumByMon_4.jwyl||0)"/>
                </el-form-item>
                <el-form-item
                  label="合计年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.jnyl||0)+(detailform.sumByMon_4.jwyl||0)+(detailform.sumByMon_4.jnnl||0)+(detailform.sumByMon_4.jwnl||0)"/>
                </el-form-item>
                <el-form-item
                  label="金融收入(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.financialIncome||0)+(detailform.sumByMon_4.financialIncomeHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="金融收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.financialIncome||0)+(detailform.sumByMon_4.financialIncomeHw||0)+(detailform.sumByYear_4.financialIncome||0)+(detailform.sumByYear_4.financialIncomeHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="保险收入(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.insuranceIncome||0)+(detailform.sumByMon_4.insuranceIncomeHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="保险收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.insuranceIncome||0)+(detailform.sumByMon_4.insuranceIncomeHw||0)+(detailform.sumByYear_4.insuranceIncome||0)+(detailform.sumByYear_4.insuranceIncomeHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他金融收入(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.otherFinance||0)+(detailform.sumByMon_4.otherFinanceHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他金融收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.otherFinance||0)+(detailform.sumByMon_4.otherFinanceHw||0)+(detailform.sumByYear_4.otherFinance||0)+(detailform.sumByYear_4.otherFinanceHw||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境内数据: </span>
                </p>
                <el-form-item
                  label="合计(万元):"
                  prop="sumByMon_3.inforName"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_4.jnyl"/>
                </el-form-item>
                <el-form-item
                  label="合计年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.jnyl||0)+(detailform.sumByYear_4.jnnl||0)"/>
                </el-form-item>
                <el-form-item
                  label="金融收入(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_4.financialIncome"/>
                </el-form-item>
                <el-form-item
                  label="金融收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.financialIncome||0)+(detailform.sumByYear_4.financialIncome||0)"/>
                </el-form-item>
                <el-form-item
                  label="保险收入(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_4.insuranceIncome"/>
                </el-form-item>
                <el-form-item
                  label="保险收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.insuranceIncome||0)+(detailform.sumByYear_4.insuranceIncome||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他金融收入(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_4.otherFinance"/>
                </el-form-item>
                <el-form-item
                  label="其他金融收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.otherFinance||0)+(detailform.sumByYear_4.otherFinance||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境外数据: </span>
                </p>
                <el-form-item
                  label="合计(万元):"
                  prop="sumByMon_3.inforName"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_4.jwyl"/>
                </el-form-item>
                <el-form-item
                  label="合计年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.jwyl||0)+(detailform.sumByYear_4.jwnl||0)"/>
                </el-form-item>
                <el-form-item
                  label="金融收入(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_4.financialIncomeHw"/>
                </el-form-item>
                <el-form-item
                  label="金融收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.financialIncomeHw||0)+(detailform.sumByYear_4.financialIncomeHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="保险收入(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_4.insuranceIncomeHw"/>
                </el-form-item>
                <el-form-item
                  label="保险收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.insuranceIncomeHw||0)+(detailform.sumByYear_4.insuranceIncomeHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他金融收入(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_4.otherFinanceHw"/>
                </el-form-item>
                <el-form-item
                  label="其他金融收入年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_4.otherFinanceHw||0)+(detailform.sumByYear_4.otherFinanceHw||0)"/>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要项目管理">
            <div class="table-div">
              <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
                <el-form-item label="项目名称:">
                  <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
                </el-form-item>
                <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
                <el-button @click="getData" type="primary" plain>查询</el-button>
                <el-button @click="exportdata" type="primary" plain>导出</el-button>
              </el-form>
              <el-table
                :data="detailform.jrbx_list"
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
                  label="项目信息"
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
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同号"
                    prop="contractNumber"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="所属单位"
                    prop="companyBelongName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="境/内外"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{scope.row.country=='01'?'境内':'境外'}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="推送人"
                    prop="projectPusher"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="联系方式"
                    prop="projectPusherPhone"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同额"
                    prop="contractAmountTotal"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="剩余合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="上报产值是否含增值税"
                    prop="isOutputTax"
                    align="center"
                    show-overflow-tooltip
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="税额"
                    prop="vat"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="本月完成"
                >
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="金融收入"
                    prop="financialIncome"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.jrbx_list,detailform.sumByMon_4,'financialIncome')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.financialIncome"/>
                      <el-input
                        @input="getGyzzCz(detailform.jrbx_list,detailform.sumByMon_4,'financialIncomeHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.financialIncomeHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="保险收入"
                    prop="insuranceIncome"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.jrbx_list,detailform.sumByMon_4,'insuranceIncome')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.insuranceIncome"/>
                      <el-input
                        @input="getGyzzCz(detailform.jrbx_list,detailform.sumByMon_4,'insuranceIncomeHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.insuranceIncomeHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="其他金融收入"
                    prop="otherFinance"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.jrbx_list,detailform.sumByMon_4,'otherFinance')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.otherFinance"/>
                      <el-input
                        @input="getGyzzCz(detailform.jrbx_list,detailform.sumByMon_4,'otherFinanceHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.otherFinanceHw"/>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="运营维管">
        <el-tabs type="border-card">
          <el-tab-pane label="产值">
            <div class="detailBox">
              <el-form
                :inline="false"
                :model="detailform"
                :rules="rules"
                class="gcform"
                ref="detailform"
              >
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>合计:</span>
                </p>
                <el-form-item
                  label="合计(万元):"
                  prop="sumByMon_3.inforName"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.jnyl||0)+(detailform.sumByMon_5.jwyl||0)"/>
                </el-form-item>
                <el-form-item
                  label="合计年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.jnyl||0)+(detailform.sumByMon_5.jwyl||0)+(detailform.sumByYear_5.jnnl||0)+(detailform.sumByYear_5.jwnl||0)"/>
                </el-form-item>
                <el-form-item
                  label="工程运营维管(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.engineeringOperation||0)+(detailform.sumByMon_5.engineeringOperationHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="工程运营维管年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.engineeringOperation||0)+(detailform.sumByMon_5.engineeringOperationHw||0)+(detailform.sumByYear_5.engineeringOperation||0)+(detailform.sumByYear_5.engineeringOperationHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="信息化运营维管(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.informationOperation||0)+(detailform.sumByMon_5.informationOperationHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="信息化运营维管年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.informationOperation||0)+(detailform.sumByMon_5.informationOperationHw||0)+(detailform.sumByYear_5.informationOperation||0)+(detailform.sumByYear_5.informationOperationHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="物业管理(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.estateManagement||0)+(detailform.sumByMon_5.estateManagementHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="物业管理年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.estateManagement||0)+(detailform.sumByMon_5.estateManagementHw||0)+(detailform.sumByYear_5.estateManagement||0)+(detailform.sumByYear_5.estateManagementHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他运营维管(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.otherOperation||0)+(detailform.sumByMon_5.overseasOtherOperation||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他运营维管年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.otherOperation||0)+(detailform.sumByMon_5.overseasOtherOperation||0)+(detailform.sumByYear_5.otherOperation||0)+(detailform.sumByYear_5.overseasOtherOperation||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境内数据: </span>
                </p>
                <el-form-item
                  label="合计(万元):"
                  prop="sumByMon_3.inforName"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_5.jnyl"/>
                </el-form-item>
                <el-form-item
                  label="合计年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.jnyl||0)+(detailform.sumByYear_5.jnnl||0)"/>
                </el-form-item>
                <el-form-item
                  label="工程运营维管(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_5.engineeringOperation"/>
                </el-form-item>
                <el-form-item
                  label="工程运营维管年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.engineeringOperation||0)+(detailform.sumByYear_5.engineeringOperation||0)"/>
                </el-form-item>
                <el-form-item
                  label="信息化运营维管(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_5.informationOperation"/>
                </el-form-item>
                <el-form-item
                  label="信息化运营维管年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.informationOperation||0)+(detailform.sumByYear_5.informationOperation||0)"/>
                </el-form-item>
                <el-form-item
                  label="物业管理(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_5.estateManagement"/>
                </el-form-item>
                <el-form-item
                  label="物业管理年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.estateManagement||0)+(detailform.sumByYear_5.estateManagement||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他运营维管(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_5.otherOperation"/>
                </el-form-item>
                <el-form-item
                  label="其他运营维管年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.otherOperation||0)+(detailform.sumByYear_5.otherOperation||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境外数据: </span>
                </p>
                <el-form-item
                  label="合计(万元):"
                  prop="sumByMon_3.inforName"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_5.jwyl"/>
                </el-form-item>
                <el-form-item
                  label="合计年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.jwyl||0)+(detailform.sumByYear_5.jwnl||0)"/>
                </el-form-item>
                <el-form-item
                  label="工程运营维管(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_5.engineeringOperationHw"/>
                </el-form-item>
                <el-form-item
                  label="工程运营维管年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.engineeringOperationHw||0)+(detailform.sumByYear_5.engineeringOperationHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="信息化运营维管(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_5.informationOperationHw"/>
                </el-form-item>
                <el-form-item
                  label="信息化运营维管年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.informationOperationHw||0)+(detailform.sumByYear_5.informationOperationHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="物业管理(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_5.estateManagementHw"/>
                </el-form-item>
                <el-form-item
                  label="物业管理年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.estateManagementHw||0)+(detailform.sumByYear_5.estateManagementHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="其他运营维管(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_5.overseasOtherOperation"/>
                </el-form-item>
                <el-form-item
                  label="其他运营维管年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_5.overseasOtherOperation||0)+(detailform.sumByYear_5.overseasOtherOperation||0)"/>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要项目管理">
            <div class="table-div">
              <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
                <el-form-item label="项目名称:">
                  <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
                </el-form-item>
                <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
                <el-button @click="getData" type="primary" plain>查询</el-button>
                <el-button @click="exportdata" type="primary" plain>导出</el-button>
              </el-form>
              <el-table
                :data="detailform.yy_list"
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
                  label="项目信息"
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
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同号"
                    prop="contractNumber"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="所属单位"
                    prop="companyBelongName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="境/内外"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{scope.row.country=='01'?'境内':'境外'}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="推送人"
                    prop="projectPusher"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="联系方式"
                    prop="projectPusherPhone"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同额"
                    prop="contractAmountTotal"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="剩余合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="上报产值是否含增值税"
                    prop="isOutputTax"
                    align="center"
                    show-overflow-tooltip
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="税额"
                    prop="vat"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="本月完成"
                >
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工程运营维管"
                    prop="engineeringOperation"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.yy_list,detailform.sumByMon_5,'engineeringOperation')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.engineeringOperation"/>
                      <el-input
                        @input="getGyzzCz(detailform.yy_list,detailform.sumByMon_5,'engineeringOperationHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.engineeringOperationHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="信息化运营维管"
                    prop="informationOperation"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.yy_list,detailform.sumByMon_5,'informationOperation')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.informationOperation"/>
                      <el-input
                        @input="getGyzzCz(detailform.yy_list,detailform.sumByMon_5,'informationOperationHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.informationOperationHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="物业管理"
                    prop="estateManagement"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.yy_list,detailform.sumByMon_5,'estateManagement')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.estateManagement"/>
                      <el-input
                        @input="getGyzzCz(detailform.yy_list,detailform.sumByMon_5,'estateManagementHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.estateManagementHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="其他运营收入"
                    prop="otherOperation"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.yy_list,detailform.sumByMon_5,'otherOperation')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.otherOperation"/>
                      <el-input
                        @input="getGyzzCz(detailform.yy_list,detailform.sumByMon_5,'overseasOtherOperation')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.overseasOtherOperation"/>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="其他产值板块">
        <el-tabs type="border-card">
          <el-tab-pane label="产值">
            <div class="detailBox">
              <el-form
                :inline="false"
                :model="detailform"
                :rules="rules"
                class="gcform"
                ref="detailform"
              >
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>合计:</span>
                </p>
                <el-form-item
                  label="合计(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.jnyl||0)+(detailform.sumByMon_6.jwyl||0)"/>
                </el-form-item>
                <el-form-item
                  label="合计年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.jnyl||0)+(detailform.sumByMon_6.jwyl||0)+(detailform.sumByYear_6.jnnl||0)+(detailform.sumByYear_6.jwnl||0)"/>
                </el-form-item>
                <el-form-item
                  label="设备租赁(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.equipmentLeasing||0)+(detailform.sumByMon_6.equipmentLeasingHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="设备租赁年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.equipmentLeasing||0)+(detailform.sumByMon_6.equipmentLeasingHw||0)+(detailform.sumByYear_6.equipmentLeasing||0)+(detailform.sumByYear_6.equipmentLeasingHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="房屋租赁(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.leaseHouses||0)+(detailform.sumByMon_6.leaseHousesHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="房屋租赁年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.leaseHouses||0)+(detailform.sumByMon_6.leaseHousesHw||0)+(detailform.sumByYear_6.leaseHouses||0)+(detailform.sumByYear_6.leaseHousesHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="交通运输(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.transportation||0)+(detailform.sumByMon_6.transportationHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="交通运输年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.transportation||0)+(detailform.sumByMon_6.transportationHw||0)+(detailform.sumByYear_6.transportation||0)+(detailform.sumByYear_6.transportationHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="住宿餐饮(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.accommodationCatering||0)+(detailform.sumByMon_6.accommodationCateringHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="住宿餐饮年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.accommodationCatering||0)+(detailform.sumByMon_6.accommodationCateringHw||0)+(detailform.sumByYear_6.accommodationCatering||0)+(detailform.sumByYear_6.accommodationCateringHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="教育培训(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.educationTraining||0)+(detailform.sumByMon_6.educationTrainingHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="教育培训年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.educationTraining||0)+(detailform.sumByMon_6.educationTrainingHw||0)+(detailform.sumByYear_6.educationTraining||0)+(detailform.sumByYear_6.educationTrainingHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="信息化建设(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.informationConstruction||0)+(detailform.sumByMon_6.informationConstructionHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="信息化建设年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.informationConstruction||0)+(detailform.sumByMon_6.informationConstructionHw||0)+(detailform.sumByYear_6.informationConstruction||0)+(detailform.sumByYear_6.informationConstructionHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="其它项目(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.other||0)+(detailform.sumByMon_6.otherHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="其它项目年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.other||0)+(detailform.sumByMon_6.otherHw||0)+(detailform.sumByYear_6.other||0)+(detailform.sumByYear_6.otherHw||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境内数据: </span>
                </p>
                <el-form-item
                  label="合计(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.jnyl"/>
                </el-form-item>
                <el-form-item
                  label="合计年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.jnyl||0)+(detailform.sumByYear_6.jnnl||0)"/>
                </el-form-item>
                <el-form-item
                  label="设备租赁(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.equipmentLeasing"/>
                </el-form-item>
                <el-form-item
                  label="设备租赁年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.equipmentLeasing||0)+(detailform.sumByYear_6.equipmentLeasing||0)"/>
                </el-form-item>
                <el-form-item
                  label="房屋租赁(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.leaseHouses"/>
                </el-form-item>
                <el-form-item
                  label="房屋租赁年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.leaseHouses||0)+(detailform.sumByYear_6.leaseHouses||0)"/>
                </el-form-item>
                <el-form-item
                  label="交通运输(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.transportation"/>
                </el-form-item>
                <el-form-item
                  label="交通运输年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.transportation||0)+(detailform.sumByYear_6.transportation||0)"/>
                </el-form-item>
                <el-form-item
                  label="住宿餐饮(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.accommodationCatering"/>
                </el-form-item>
                <el-form-item
                  label="住宿餐饮年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.accommodationCatering||0)+(detailform.sumByYear_6.accommodationCatering||0)"/>
                </el-form-item>
                <el-form-item
                  label="教育培训(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.educationTraining"/>
                </el-form-item>
                <el-form-item
                  label="教育培训年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.educationTraining||0)+(detailform.sumByYear_6.educationTraining||0)"/>
                </el-form-item>
                <el-form-item
                  label="信息化建设(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.informationConstruction"/>
                </el-form-item>
                <el-form-item
                  label="信息化建设年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.informationConstruction||0)+(detailform.sumByYear_6.informationConstruction||0)"/>
                </el-form-item>
                <el-form-item
                  label="其它项目(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.other"/>
                </el-form-item>
                <el-form-item
                  label="其它项目年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.other||0)+(detailform.sumByYear_6.other||0)"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境外数据: </span>
                </p>
                <el-form-item
                  label="合计(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.jwyl"/>
                </el-form-item>
                <el-form-item
                  label="合计年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.jwyl||0)+(detailform.sumByYear_6.jwnl||0)"/>
                </el-form-item>
                <el-form-item
                  label="设备租赁(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.equipmentLeasingHw"/>
                </el-form-item>
                <el-form-item
                  label="设备租赁年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.equipmentLeasingHw||0)+(detailform.sumByYear_6.equipmentLeasingHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="房屋租赁(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.leaseHousesHw"/>
                </el-form-item>
                <el-form-item
                  label="房屋租赁年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.leaseHousesHw||0)+(detailform.sumByYear_6.leaseHousesHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="交通运输(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.transportationHw"/>
                </el-form-item>
                <el-form-item
                  label="交通运输年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.transportationHw||0)+(detailform.sumByYear_6.transportationHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="住宿餐饮(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.accommodationCateringHw"/>
                </el-form-item>
                <el-form-item
                  label="住宿餐饮年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.accommodationCateringHw||0)+(detailform.sumByYear_6.accommodationCateringHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="教育培训(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.educationTrainingHw"/>
                </el-form-item>
                <el-form-item
                  label="教育培训年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.educationTrainingHw||0)+(detailform.sumByYear_6.educationTrainingHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="信息化建设(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.informationConstructionHw"/>
                </el-form-item>
                <el-form-item
                  label="信息化建设年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.informationConstructionHw||0)+(detailform.sumByYear_6.informationConstructionHw||0)"/>
                </el-form-item>
                <el-form-item
                  label="其它项目(万元):"
                >
                  <el-input
                    disabled
                    v-model="detailform.sumByMon_6.otherHw"/>
                </el-form-item>
                <el-form-item
                  label="其它项目年累(万元):"
                >
                  <el-input
                    disabled
                    :value="(detailform.sumByMon_6.otherHw||0)+(detailform.sumByYear_6.otherHw||0)"/>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要项目管理">
            <div class="table-div">
              <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
                <el-form-item label="项目名称:">
                  <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
                </el-form-item>
                <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
                <el-button @click="getData" type="primary" plain>查询</el-button>
                <el-button @click="exportdata" type="primary" plain>导出</el-button>
              </el-form>
              <el-table
                :data="detailform.qt_list"
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
                  label="项目信息"
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
                    label="项目名称"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同号"
                    prop="contractNumber"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="所属单位"
                    prop="companyBelongName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="境/内外"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{scope.row.country=='01'?'境内':'境外'}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="推送人"
                    prop="projectPusher"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="联系方式"
                    prop="projectPusherPhone"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同额"
                    prop="contractAmountTotal"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="剩余合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="上报产值是否含增值税"
                    prop="isOutputTax"
                    align="center"
                    show-overflow-tooltip
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="税额"
                    prop="vat"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="本月完成"
                >
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="设备租赁"
                    prop="equipmentLeasing"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'equipmentLeasing')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.equipmentLeasing"/>
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'equipmentLeasingHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.equipmentLeasingHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="交通运输"
                    prop="transportation"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'transportation')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.transportation"/>
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'transportationHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.transportationHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="住宿餐饮"
                    prop="accommodationCatering"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'accommodationCatering')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.accommodationCatering"/>
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'accommodationCateringHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.accommodationCateringHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="教育培训"
                    prop="educationTraining"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'educationTraining')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.educationTraining"/>
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'educationTrainingHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.educationTrainingHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="信息化建设"
                    prop="informationConstruction"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'informationConstruction')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.informationConstruction"/>
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'informationConstructionHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.informationConstructionHw"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="其它项目"
                    prop="other"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'other')"
                        v-if="scope.row.country=='01'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.other"/>
                      <el-input
                        @input="getGyzzCz(detailform.qt_list,detailform.sumByMon_6,'otherHw')"
                        v-if="scope.row.country=='02'"
                        :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                        clearable
                        v-model="scope.row.otherHw"/>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'">
        <Audit-Process :task="p.task||{businessId:p.instid,businessType:' contract_project_new'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import FileUpload from '@/components/fileUpload'
  import { isMoney, isMobile} from '@/utils/validate'
  import AuditProcess from '@/components/auditProcess'
  export default {
    // name: "详情",
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
      var validatePhone = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMobile(value)) {
          callback(new Error('请输入正确的手机格式'))
        } else {
          callback()
        }
      }
      return {
        projectStatus:[],//项目状态
        timeout:  null,
        maxMoney:1000000,
        id:'',
        key: 0,
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index
        options2: [],
        options: [],
        searchform:{},
        detailform: {
          fdc_list:[],
          sumByMon_3:{},
          sumByYear_3:{},
          gy_list:[],
          sumByMon_1:{},
          sumByYear_1:{},
          jrbx_list:[],
          sumByMon_4:{},
          sumByYear_4:{},
          kc_list:[],
          sumByMon_0:{},
          sumByYear_0:{},
          qt_list:[],
          sumByMon_6:{},
          sumByYear_6:{},
          wz_list:[],
          sumByMon_2:{},
          sumByYear_2:{},
          yy_list:[],
          sumByMon_5:{},
          sumByYear_5:{},
        },
        xqprojectType: [],//工程类别二级
        emergingMarketTwo:[],//新兴市场二级
        projectNatureTwo:[],//项目性质二级
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        sizeform: {projectScale: "", sectionName: ""},
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
        rules:{
          contractAmount: [
            { required: true,validator: validateMoney, trigger: 'change' }
          ],
          phone: [
            { required: true,validator: validatePhone, trigger: 'blur' }
          ]
        },//表单验证规则
      };
    },
    components: {
      Tree,
      FileUpload,
      AuditProcess
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
      certificationType(){
        return this.$store.state.certificationType;
      },
      bizCode() {
        return this.$store.state.bizCode;
      },
      projectPlate(){
        return this.$store.state.projectPlate;
      },
      bulletinType() {
        return this.$store.state.bulletinType;
      },
      projectModel() {
        return this.$store.state.projectModel;
      },
      amountSource() {
        return this.$store.state.amountSource;
      },
      // yesOrNo() {
      //   return this.$store.state.yesOrNo;
      // },
      position() {
        return this.$store.state.position;
      },
      probability() {
        return this.$store.state.probability;
      },
      railwayLine() {
        return this.$store.state.railwayLine;
      },
      pubCustomers() {//客户名称
        return this.$store.state.pubCustomers;
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

      this.$store.dispatch("getConfig", {});
      this.$store.dispatch("getPubCustomers", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
      this.id=this.p.instid;
      this.getDetail();
      // eslint-disable-next-line no-unde
    },
    methods: {
      addNum(){
        this.detailform.sumByMon_1.industry=Number(this.detailform.sumByMon_1.industry||0)+1;
        this.$forceUpdate();
      },
      //勘察设计月末进度
      setCcsjYmjd(list,obj,name,index){
        console.log(index)
      },
      //修改产值
      getGyzzCz(list,obj,name){
      //  list 列表数据 obj 修改哪个对象 name 修改对象里的哪个值
        var num=0;
        list.forEach((item)=>{
          num=num+Number(item[name]||0);
        })
        obj[name]=num;
        this.$forceUpdate();
      },
      //重置
      searchformReset() {
        this.searchform={
          current: 1,
          size: 20
        };
        this.getData();
      },
      //查询
      getData(){},
      //导出
      exportdata(){},
      //复选下拉框框获取name
      getMultipleName(valueList,list,id,name){
        var _id=[],_name=[];
        list.forEach((item)=>{
          if(valueList.indexOf(item.id)!=-1){
          _id.push(item.id);
          _name.push(item.detailName)
        }
      });
        this.detailform.sumByMon_3[id]=_id.join(",");
        this.detailform.sumByMon_3[name]=_name.join(",");
      },
      //流程操作
      operation(type){
        this.$http
          .post(
            '/api/contract/topInfo/TopInfor/process/'+type,
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
      //解决新增的时候二级联动清除不了
      clear(id,name){
        id='';
        name='';
        this.$forceUpdate();
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
        this.detailform.sumByMon_3.enginTypeSecondId='';
        this.detailform.sumByMon_3.enginTypeSecondName='';
        this.detailform.sumByMon_3.enginTypeFirstName='';
        this.xqprojectType=[];
        if(id!=''){
          this.projectDomainType.find(
            (item) => {
            if (item.id == id) {
            this.detailform.sumByMon_3.enginTypeFirstName = item.detailName;
            this.xqprojectType = item.children;
          }
        }
        )
        }
      },
      //新兴市场二级
      getTwoSC(id) {
        this.detailform.sumByMon_3.marketSecondId='';
        this.detailform.sumByMon_3.marketSecondName='';
        this.detailform.sumByMon_3.marketFirstName='';
        this.emergingMarketTwo=[];
        if(id!=''){
          this.emergingMarket.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.sumByMon_3.marketFirstName = item.detailName;
            this.emergingMarketTwo = item.children;
          }
        }
        )
        }
      },
      //项目性质二级
      getTwoXZ(id){
        this.detailform.sumByMon_3.projectNatureSecondId='';
        this.detailform.sumByMon_3.projectNatureSecondName='';
        this.detailform.sumByMon_3.projectNatureFirstName='';
        this.projectNatureTwo=[];
        if(id!=''){
          this.projectNature.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.sumByMon_3.projectNatureFirstName = item.detailName;
            this.projectNatureTwo = item.children;
          }
        }
        )
        }
      },
      //获取下拉框id和name的公共方法
      getName(id, list, name) {
        if(id){
          this.$forceUpdate();
          this.detailform.sumByMon_3[name] = list.find(
            (item) => item.id == id
        ).detailName;
          console.log(this.detailform.sumByMon_3[name]);
        }
      },
      //获取下拉框id和name的公共方法
      getNameZb(id, list, name) {
        if(id){
          this.$forceUpdate()
          this.detailform.topInfoOrg[name] = list.find(
            (item) => item.id == id
        ).detailName;
          console.log(this.detailform.topInfoOrg[name]);
        }
      },
      saveInfo(formName,type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                '/api/statistics/unProjectReport/save/batch/addDetail',
                JSON.stringify(this.detailform),
                {useJson: true}
              )
              .then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.back();
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
              "/api/contract/topInfo/TopInfoSection/list/delete",
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
        }else{
          list.splice(index, 1);
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
      resetinfo() {
        this.sizeform = {
          id: "",
          part: "",
          showinput: true,
        };
      },
      // 加载列表
      getDetail() {
        var data={};
        if(this.p.actpoint=='add'){
          data={reportDate: this.p.reportDate}
        }else if(this.p.actpoint=='edit'){
          data={reportUuid: this.p.reportUuid,isAdd:'1'}
        }
        this.$http
          .post("/api/statistics/unProjectReport/list/queryAllInfo",data )
          .then((res) => {
          var datas=res.data.data;
          this.detailform=datas;
          this.detailform.sumByMon_0=datas.sumByMon_0||{};
          this.detailform.sumByYear_0=datas.sumByYear_0||{};
          this.detailform.sumByMon_1=datas.sumByMon_1||{};
          this.detailform.sumByYear_1=datas.sumByYear_1||{};
          this.detailform.sumByMon_2=datas.sumByMon_2||{};
          this.detailform.sumByYear_2=datas.sumByYear_2||{};
          this.detailform.sumByMon_3=datas.sumByMon_3||{};
          this.detailform.sumByYear_3=datas.sumByYear_3||{};
          this.detailform.sumByMon_4=datas.sumByMon_4||{};
          this.detailform.sumByYear_4=datas.sumByYear_4||{};
          this.detailform.sumByMon_5=datas.sumByMon_5||{};
          this.detailform.sumByYear_5=datas.sumByYear_5||{};
          this.detailform.sumByMon_6=datas.sumByMon_6||{};
          this.detailform.sumByYear_6=datas.sumByYear_6||{};
          this.detailform.statId=this.p.statId;
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
  };
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
  .save-btn{
    right: 95px;
    background: #409EFF;
    color:#fff;
  }
  .sub-btn{
    right: 175px;
  }
  .btn-group{
    text-align: center;
    margin-top: 20px;
  }
  .gcform {
    margin-top: 10px;
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
    >.el-form-item,>>>.formItem{

      display: inline-block;
      width: 32.5%!important;
    }
    .div-item >>>.el-form-item{
      display: inline-block;
      width: 32.5%!important;
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
  .table-div{
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  .queryForm>.el-button{
    margin-top: 5px;
  }
  .queryForm >>>.el-form-item__label{
    width: auto;
  }
  .queryForm >>>.el-input--mini .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  .detailTable >>>.el-input input{
    width: 100%;
    height: 30px;
    margin: 5px 0;
    box-sizing: border-box;
  }
</style>

