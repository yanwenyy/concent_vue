<template>
  <div style="position: relative">
    <el-button v-show="p.actpoint != 'look'" class="detail-back-tab detailbutton save-btn" type="primary" @click="saveInfo('detailform')">保存</el-button>
    <el-button v-show="p.actpoint != 'look'" class="detail-back-tab detailbutton sub-btn" @click="submit">提交</el-button>
    <el-button class="detail-back-tab" @click="back" type="text">返回</el-button>
    <el-tabs type="border-card">
      <el-tab-pane label="变更前">
        <el-form
          :inline="false"
          class="gcform"
          :model="detailFormBefore"
        >
          <el-tabs type="border-card">
            <el-tab-pane label="房地产合同">
                <div class="detailBoxBG">

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
                      v-model="detailFormBefore.contractInfo.contractNo"
                    />
                  </el-form-item>
                  <el-form-item
                    label="合同签订日期:"
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
                  <br>
                  <el-form-item
                    label="合同总金额(万元):"
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
                    label="我方份额(万元):"
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
                    label="系统外份额(万元):"
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
                    label="增值税(万元):"
                  >
                    <el-input
                      disabled
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
                    class="inline-formitem"
                    label="是否为系统内联合体"
                  >
                    <el-switch
                      disabled
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isInSystemUnion"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="0"
                      inactive-value="1"
                    >
                    </el-switch>
                    <!--<el-input-->
                    <!--disabled-->
                    <!--clearable-->
                    <!--placeholder=""-->
                    <!--v-model="detailFormBefore.contractInfo.isInSystemUnion=='1'?'否':'是'"-->
                    <!--/>-->
                  </el-form-item>
                  <el-form-item
                    label="是否含系统内分包"
                    class="inline-formitem"
                  >
                    <el-switch
                      disabled
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isInSystemSub"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="0"
                      inactive-value="1"
                    >
                    </el-switch>
                    <!--<el-input-->
                    <!--disabled-->
                    <!--clearable-->
                    <!--placeholder=""-->
                    <!--v-model="detailFormBefore.contractInfo.isInSystemSub=='1'?'否':'是'"-->
                    <!--/>-->
                  </el-form-item>
                  <br>
                  <el-form-item
                    class="inline-formitem"
                    label="是否为系统外联合体"
                  >
                    <el-switch
                      disabled
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isOutSystemUnion"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="0"
                      inactive-value="1"
                    >
                    </el-switch>
                    <!--<el-input-->
                    <!--disabled-->
                    <!--clearable-->
                    <!--placeholder=""-->
                    <!--v-model="detailFormBefore.contractInfo.isOutSystemUnion=='1'?'否':'是'"-->
                    <!--/>-->
                  </el-form-item>
                  <el-form-item
                    class="inline-formitem"
                    label="是否含系统外分包"
                  >
                    <el-switch
                      disabled
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isOutSystemSub"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="0"
                      inactive-value="1"
                    >
                    </el-switch>
                    <!--<el-input-->
                    <!--disabled-->
                    <!--clearable-->
                    <!--placeholder=""-->
                    <!--v-model="detailFormBefore.contractInfo.isOutSystemSub=='1'?'否':'是'"-->
                    <!--/>-->
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
                      label="装配类型:"
                      v-if="detailFormBefore.contractInfo.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

                    >
                      <el-input
                        disabled
                        size="mini"
                        v-model="detailFormBefore.contractInfo.otherAssemblyType"
                      />
                    </el-form-item>
                  </div>
                  <div>
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
                  </div>

                  <el-form-item
                      label="控股情况:"

                  >
                    <el-input
                      disabled
                      size="mini"
                      v-model="detailFormBefore.contractInfo.estateHolding"
                    />
                  </el-form-item>
                  <el-form-item
                    label="是否并表:"

                  >
                    <el-switch
                      disabled
                      class="inline-formitem-switch"
                      v-model="detailFormBefore.contractInfo.isMergeEstate"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="0"
                      inactive-value="1"
                    >
                    </el-switch>
                  </el-form-item>
                  <br>
                  <el-form-item
                    label="建设地点:"
                  >
                    <el-input
                      disabled
                      clearable
                      placeholder="请输入"
                      size="mini"
                      v-model="detailFormBefore.contractInfo.estateBuildPlace"
                    />
                  </el-form-item>
                  <el-form-item
                    label="详细建细地点:"
                  >
                    <el-input
                      disabled
                      clearable
                      placeholder="请输入"
                      size="mini"
                      v-model="detailFormBefore.contractInfo.estateDetailedBuildPlace"
                    />
                  </el-form-item>
                  <br>
                  <el-form-item
                    label="建设用地面积（万平方米）:"
                  >
                    <el-input
                      disabled
                      clearable
                      placeholder="请输入"
                      size="mini"
                      v-model="detailFormBefore.contractInfo.estateBuildArea"
                    />
                  </el-form-item>
                  <el-form-item
                    label="签约单位（使用资质单位）:"
                  >
                    <el-input
                      disabled
                      clearable
                      placeholder="请输入"
                      size="mini"
                      v-model="detailFormBefore.contractInfo.signOrgName"
                    />
                  </el-form-item>
                  <br>
                  <el-form-item
                    label="录入时间:"
                  >
                    <el-date-picker
                      disabled
                      filterable
                      clearable
                      type="date"
                      value-format="timestamp"
                      v-model="detailFormBefore.contractInfo.createTime"

                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item
                    label="录入单位:"
                  >
                    <el-input
                      disabled
                      clearable
                      placeholder="请输入"
                      size="mini"
                      v-model="detailFormBefore.contractInfo.createOrgName"
                    />
                  </el-form-item>

                  <p class="detail-p">
                    <span>证明文件: </span>
                  </p>
                  <el-table
                    :data="detailFormBefore.commonFilesList"
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
                  <p>
                    <span >销售业绩: </span>
                  </p>
                  <el-table
                    :data="detailFormBefore.contractInfoHouseSalesList"
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
                      label="本月销售金额(万元)"
                      align="center"
                      prop="monthSales"
                      width="150"
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      label="本月营业收入(万元)"
                      width="150"
                      align="center"
                      prop="monthIncome"
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      label="本年销售金额(万元)"
                      align="center"
                      width="150"
                      prop="yearSales"
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      label="本年营业收入(万元)"
                      width="150"
                      align="center"
                      prop="yearIncome"
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      label="开发进度描述"
                      width="150"
                      align="center"
                      prop="description"
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      label="是否完工"
                      width="150"
                      align="center"
                      prop="isFinish"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-radio disabled v-model="scope.row.isFinish" label="0">是</el-radio>
                        <el-radio disabled v-model="scope.row.isFinish" label="1">否</el-radio>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="detailFormBefore.contractInfo.isInSystemUnion==='0'||detailFormBefore.contractInfo.isInSystemSub==='0'" label="合同附属信息">
              <div class="detailBoxBG">
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
                    class="detailTable"
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
                        否
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
                    class="detailTable"
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
                        否
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
                    class="detailTable"
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
                        否
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
                    class="detailTable"
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
                        否
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="变更后">
        <el-form
          :inline="false"
          :model="detailform"
          :rules="rules"
          class="gcform"
          ref="detailform"
        >
          <el-tabs type="border-card">
            <el-tab-pane label="房地产合同">
              <div class="detailBoxBG">

                <!-- <div style="width: 100%; overflow: hidden">
                 <el-button-group style="float: left">
                   <el-button type="primary" plain>保存</el-button>
                   <el-button type="primary" plain>提交</el-button>
                 </el-button-group>
               </div>
               <p></p> -->

                <el-form-item
                  label="合同名称(中文):"
                  prop="contractInfo.contractName"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'"
                    clearable
                    placeholder="请输入"
                    size="mini"
                    v-model="detailform.contractInfo.contractName"
                  />
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
                    size="mini"
                    v-model="detailform.contractInfo.contractNameForeign"
                  />
                </el-form-item>
                <br>
                <el-form-item
                  label="合同编号:"
                  prop="contractInfo.contractNo"

                  :rules="{
           required: true, message: '此项不能为空', trigger: 'blur'
        }"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'"
                    clearable
                    placeholder="请输入"
                    size="mini"
                    v-model="detailform.contractInfo.contractNo"
                  />
                </el-form-item>
                <el-form-item
                  label="合同签定日期:"
                  prop="contractInfo.contractSignTime"

                >
                  <el-date-picker
                    :disabled="p.actpoint === 'look'"
                    v-model="detailform.contractInfo.contractSignTime"
                    size="mini"
                    type="date"
                    value-format="timestamp"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <br>

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
                <el-form-item
                  label="我方份额(万元):"
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
                  label="系统外份额（万元）:"
                  prop="contractInfo.outSystemAmount"
                  :rules="rules.contractAmount"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'"
                    clearable
                    placeholder="请输入"
                    size="mini"
                    v-model="detailform.contractInfo.outSystemAmount"
                  >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="增值税（万元）:"
                  prop="contractInfo.valueAddedTax"
                  :rules="rules.contractAmount"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'"
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
                <br>
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
                      class="multiple-sel"
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
                      class="multiple-sel"
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
                </div>
                <el-form-item
                  label="控股情况:"
                  prop="contractInfo.estateHolding"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"

                >
                  <el-select
                    :disabled="p.actpoint==='look'"

                    clearable
                    filterable
                    placeholder="请选择"
                    size="mini"
                    v-model="detailform.contractInfo.estateHolding"
                  >
                    <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="是否并表:"
                  prop="contractInfo.isMergeEstate"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"

                >
                  <el-switch
                    :disabled="p.actpoint === 'look'"
                    class="inline-formitem-switch"
                    v-model="detailform.contractInfo.isMergeEstate"
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
                  <!--size="mini"-->
                  <!--v-model="detailform.contractInfo.isMergeEstate"-->
                  <!--&gt;-->
                  <!--<el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>-->
                  <!--</el-select>-->
                </el-form-item>
                <br>
                <el-form-item
                  label="建设地点:"
                  prop="contractInfo.estateBuildPlace"
                  :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'change',
              }"
                >
                  <el-input :disabled="p.actpoint === 'look'" placeholder="请输入内容" v-model="detailform.contractInfo.estateBuildPlace" class="input-with-select">
                    <el-button slot="append" icon="el-icon-circle-plus-outline" @click="selectPosition" ></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="详细建细地点:"

                  prop="contractInfo.estateDetailedBuildPlace"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'"
                    clearable
                    placeholder="请输入"
                    size="mini"
                    v-model="detailform.contractInfo.estateDetailedBuildPlace"
                  />
                </el-form-item>
                <br>
                <el-form-item
                  label="建设用地面积（万平方米）:"

                  prop="contractInfo.estateBuildArea"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'"
                    clearable
                    placeholder="请输入"
                    size="mini"
                    v-model="detailform.contractInfo.estateBuildArea"
                  />
                </el-form-item>
                <el-form-item
                  label="签约单位（使用资质单位）:"
                  prop="contractInfo.signOrgName"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'change'
    }"
                >
                  <el-input :disabled="p.actpoint === 'look'" placeholder="请输入内容" v-model="detailform.contractInfo.signOrgName" class="input-with-select">
                    <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('签约单位',detailform.contractInfo.signOrgId)" ></el-button>
                  </el-input>
                </el-form-item>
                <br>
                <el-form-item
                  label="录入时间:"

                  prop="contractInfo.createTime"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                >
                  <el-date-picker
                    :disabled="true"
                    filterable
                    clearable
                    type="date"
                    v-model="detailform.contractInfo.createTime"
                    value-format="timestamp"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  label="录入单位:"

                  prop="contractInfo.createOrgName"
                  :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                >
                  <el-input
                    disabled
                    clearable
                    placeholder="请输入"
                    size="mini"
                    v-model="detailform.contractInfo.createOrgName"
                  />
                </el-form-item>
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
                <div>
                  <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
                    <span>销售业绩:</span>
                    <el-button
                      v-show="p.actpoint != 'look'"
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
                      show-overflow-tooltip
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
                      label="本月销售金额(万元)"
                      align="center"
                      prop="monthSales"
                      width="400"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-form-item class="tabelForm" :prop="'contractInfoHouseSalesList.' + scope.$index + '.monthSales'" :rules='rules.contractAmount'>
                          <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                          <el-input
                            @blur="setYearSale(scope.row.salesPerforMonth,scope.row.salesPerforYear)"
                            v-model="scope.row.monthSales"
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
                      :resizable="false"
                      label="本月营业收入(万元)"
                      width="400"
                      align="center"
                      prop="monthIncome"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-form-item class="tabelForm" :prop="'contractInfoHouseSalesList.' + scope.$index + '.monthIncome'" :rules='rules.contractAmount'>
                          <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                          <el-input
                            @blur="setYearTurnover(scope.row.salesPerforMonth,scope.row.salesPerforYear)"
                            v-model="scope.row.monthIncome"
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
                      :resizable="false"
                      label="本年销售金额(万元)"
                      align="center"
                      width="200"
                      prop="yearSales"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        {{scope.row.yearSales}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      label="本年营业收入(万元)"
                      width="200"
                      align="center"
                      prop="yearIncome"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        {{scope.row.yearIncome}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      label="开发进度描述"
                      width="150"
                      align="center"
                      prop="description"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-input
                          clearable
                          :disabled="p.actpoint === 'look'"
                          v-model="scope.row.description"
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :resizable="false"
                      label="是否完工"
                      width="150"
                      align="center"
                      prop="isFinish"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-radio v-model="scope.row.isFinish" label="0">是</el-radio>
                        <el-radio v-model="scope.row.isFinish" label="1">否</el-radio>
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
            <el-tab-pane v-if="detailform.contractInfo.isInSystemUnion==='0'||detailform.contractInfo.isInSystemSub==='0'||detailform.contractInfo.isOutSystemUnion==='0'||detailform.contractInfo.isOutSystemSub==='0'" label="合同附属信息">
              <div class="detailBoxBG">
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
                      width="300"
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
                      width="150"
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
                            @blur="getOurAmount(scope.$index,detailform.contractInfoAttachBO.unionContractInfoAttachList,'nlht')"
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
                    >
                      <template slot-scope="scope">
                        否
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
                      v-show="!p.actpoint === 'look'"
                      :resizable="false"
                      fixed="right"
                      label="操作"
                      align="center"
                      show-overflow-tooltip
                      v-if="p.actpoint !== 'look'"
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
                      width="150"
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
                            @blur="getOurAmount(scope.$index,detailform.contractInfoAttachBO.innerContractInfoAttachList,'nfb')"
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
                    >
                      <template slot-scope="scope">
                        否
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
                      v-show="!p.actpoint === 'look'"
                      :resizable="false"
                      fixed="right"
                      label="操作"
                      align="center"
                      show-overflow-tooltip
                      v-if="p.actpoint !== 'look'"
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
                      width="150"
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
                            @blur="getOurAmount(scope.$index,detailform.contractInfoAttachBO.outUnionContractInfoAttachList,'wlht')"
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
                    >
                      <template slot-scope="scope">
                        否
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
                      v-show="!p.actpoint === 'look'"
                      :resizable="false"
                      fixed="right"
                      label="操作"
                      align="center"
                      show-overflow-tooltip
                      v-if="p.actpoint !== 'look'"
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
                    class="detailTable"
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
                      width="150"
                      align="center"
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
                            @blur="getOurAmount(scope.$index,detailform.contractInfoAttachBO.outContractInfoAttachList,'wfb')"
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
                    >
                      <template slot-scope="scope">
                        否
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
                      v-show="!p.actpoint === 'look'"
                      :resizable="false"
                      fixed="right"
                      label="操作"
                      align="center"
                      show-overflow-tooltip
                      v-if="p.actpoint !== 'look'"
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
    </el-tabs>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import { isMoney } from '@/utils/validate'
  import SearchName from '../searchName'
  import AddBd from '../addBd'
  import CompanyTree from '../companyTree'
  import datas from '@/utils/position'
  import FileUpload from '@/components/fileUpload'
  export default {
    // name: "详情",
    data() {
      var validateMoney = (rule, value, callback) => {
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMoney(value)) {
          callback(new Error('请输入正确的金额格式'))
        } else {
          callback()
        }
      }
      return {
        options1:[{label:"值",value:'111'}],
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
          commonFilesList: [],
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
          commonFilesList: [],
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
      };
    },
    components: {
      Tree,
      SearchName,
      AddBd,
      CompanyTree,
      FileUpload
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
      if (this.p.actpoint === "edit"||this.p.actpoint === "look") {
        this.getDetail();
      }
      if(this.p.actpoint === "add"){
        this.getAddDetail()
      }
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
      // eslint-disable-next-line no-unde
    },
    methods: {
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
          list[index].moduleName=this.nameList.find(
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
      //获取我方份额
      getOurAmount(index,list,type){
        var tj_money=0,our_money=0;
        if(type=='wlht'||type=='nlht'){
          //铁建金额计算
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
          //我方份额计算
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
        }else if(type=='nfb'||type=='wfb'){
          //判断内分包和外分包之和是否大于我方份额
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
          this.detailform.contractInfo.ourAmount=this.detailform.contractInfo.crccCash-our_money;
        }
      },
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
          this.detailform.commonFilesList.splice(index,1);
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      saveInfo(formName) {
        this.detailform.srcId=this.id;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var datas=this.p.actpoint === "add"?{
              'afterContractInfoBO':this.detailform,
              'beforeContractInfoBO':this.detailFormBefore
            }:this.detailform;
            this.$http
              .post(
                `/api/contract/contract/ContractInfo/detail/${this.p.actpoint === "add"?'saveChangeRecord':'saveOrUpdate'}`,
                JSON.stringify(datas),
                {useJson: true}
              )
              .then((res) => {
              if (res.data.code === 200) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.$refs[formName].resetFields();
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
          .post("/api/contract/contract/ContractInfo/detail/entityInfoByBeforeAndAfterId", {beforeId:this.id,afterId:this.afterId})
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
        this.getTwoSC(afterData.contractInfo.marketFirstNameId);
        this.detailform={
          commonFilesList: afterData.commonFilesList,
          contractInfo: afterData.contractInfo,
          contractInfoAttachBO: afterData.contractInfoAttachBO,
          contractInfoHouseSalesList: afterData.contractInfoHouseSalesList,
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
        };
        this.detailform.cdmc=afterData.contractInfo.siteNameId&&afterData.contractInfo.siteNameId.split(",");
        this.detailform.zplx=afterData.contractInfo.otherAssemblyTypeId&&afterData.contractInfo.otherAssemblyTypeId.split(",");
        this.detailform.jzlx=afterData.contractInfo.otherBuildingTypeId&&afterData.contractInfo.otherBuildingTypeId.split(",");
        this.detailform.jzjglx=afterData.contractInfo.otherBuildingStructureTypeId&&afterData.contractInfo.otherBuildingStructureTypeId.split(",");
        this.detailFormBefore={
          commonFilesList: beforData.commonFilesList,
          contractInfo: beforData.contractInfo,
          contractInfoAttachBO: beforData.contractInfoAttachBO,
          contractInfoHouseSalesList: beforData.contractInfoHouseSalesList,
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
        }
        this.detailform.cdmc=beforData.contractInfo.siteNameId&&beforData.contractInfo.siteNameId.split(",");
        this.detailform.zplx=beforData.contractInfo.otherAssemblyTypeId&&beforData.contractInfo.otherAssemblyTypeId.split(",");
        this.detailform.jzlx=beforData.contractInfo.otherBuildingTypeId&&beforData.contractInfo.otherBuildingTypeId.split(",");
        this.detailform.jzjglx=beforData.contractInfo.otherBuildingStructureTypeId&&beforData.contractInfo.otherBuildingStructureTypeId.split(",");
      });
      },
      //新增的时候详情
      getAddDetail(){
        this.$http
          .post("/api/contract/contract/ContractInfo/detail/entityInfo", {id:this.id})
          .then((res) => {
          var datas=res.data.data;
        this.getTwoSC(datas.contractInfo.marketFirstNameId);
        this.detailform={
          commonFilesList: datas.commonFilesList,
          contractInfo: datas.contractInfo,
          contractInfoAttachBO: datas.contractInfoAttachBO,
          contractInfoHouseSalesList: datas.contractInfoHouseSalesList,
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
        }
        this.detailform.cdmc=datas.contractInfo.siteNameId&&datas.contractInfo.siteNameId.split(",");
        this.detailform.zplx=datas.contractInfo.otherAssemblyTypeId&&datas.contractInfo.otherAssemblyTypeId.split(",");
        this.detailform.jzlx=datas.contractInfo.otherBuildingTypeId&&datas.contractInfo.otherBuildingTypeId.split(",");
        this.detailform.jzjglx=datas.contractInfo.otherBuildingStructureTypeId&&datas.contractInfo.otherBuildingStructureTypeId.split(",");
        for(var i in this.detailform){
          this.detailFormBefore[i]=JSON.parse(JSON.stringify(this.detailform[i]));
        }
       console.log(this.detailform)
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

  .detailTable {
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

</style>

