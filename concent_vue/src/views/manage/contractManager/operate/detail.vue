<template>
  <div style="position: relative">
    <el-button
      class="detail-back-tab"
      @click="back"
      type="text">返回</el-button>
    <el-form
      :inline="false"
      :model="detailform"
      :rules="rules"
      class="gcform"
      ref="detailform"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="运营维管新增">
          <el-card>
            <div class="detailBox">
              <el-form-item
                label="合同名称(中文):"
                prop="contractInfo.contractName"
                :rules="{
           required: true, message: '此项不能为空', trigger: 'blur'
        }"
              >
                <el-input
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
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform.contractInfo.contractNameForeign"
                />
              </el-form-item>

              <el-form-item
                label="合同编号:"
                prop="contractInfo.contractNo"
              >
                <el-input
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform.contractInfo.contractNo"
                />
              </el-form-item>

              <el-form-item
                label="合同总金额（万元）:"
                :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                prop="contractInfo.contractAmount"

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
                label="我方份额（万元）:"
                prop="contractInfo.ourAmount"
                :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
              >
                <el-input
                  :disabled="true"
                  clearable
                  placeholder=""
                  v-model="detailform.contractInfo.ourAmount"
                />
              </el-form-item>
              <el-form-item
                label="合同签定日期:"
                prop="contractInfo.contractSignTime"
              >
                <el-date-picker
                  v-model="detailform.contractInfo.contractSignTime"
                  size="mini"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item
                label="签约单位（使用资质单位）:"
                prop="contractInfo.signOrgName"
                :rules="{
      required: true, message: '此项不能为空', trigger: 'change'
    }"
              >
                <el-input placeholder="请输入内容" v-model="detailform.contractInfo.signOrgName" class="input-with-select">
                  <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('签约单位',detailform.contractInfo.signOrgId)" ></el-button>
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
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform.contractInfo.valueAddedTax"
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
                  size="mini"
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
                label="甲方单位:"
                prop="contractInfo.constructionOrg"
                :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
              >
                <el-input placeholder="请输入内容" v-model="detailform.contractInfo.constructionOrg" class="input-with-select">

                </el-input>
              </el-form-item>
              <el-form-item
                label="乙方单位:"
                prop="contractInfo.buildOrgNames"
                :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
              >
                <el-input placeholder="请输入内容" v-model="detailform.contractInfo.buildOrgNames" class="input-with-select">

                </el-input>
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
                label="合同类型:"
                prop="contractInfo.enginTypeFirstId"
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
                  v-model="detailform.contractInfo.enginTypeFirstId"
                  @change="
                  getName(
                    detailform.contractInfo.enginTypeFirstId,
                    contractType,
                    'enginTypeFirstName'
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
                label="是否年度合同:"
                prop="contractInfo.isYearContract"
                :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
              >
                <el-select
                  :disabled="p.actpoint==='look'"
                  filterable
                  clearable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform.contractInfo.isYearContract"
                >
                  <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>
                </el-select>
              </el-form-item>
              <p><span >证明文件: </span>
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
                :data="detailform.commonFilesList"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"

                @selection-change="handleSelectionChange"
                align="center"
                border
                class="clothSizeTable"
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
          </el-card>
        </el-tab-pane>
        <el-tab-pane v-if="detailform.contractInfo.isInSystemUnion==='0'||detailform.contractInfo.isInSystemSub==='0'" label="合同附属信息">
          <div  v-if="detailform.contractInfo.isInSystemUnion==='0'">
            <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
              <span>系统内其他联合体单位列表: </span>
              <el-button
                v-show="p.actpoint != 'look'"
                @click="addfs('lht',1,1)"
                size="mini"
                style="
                  float: right;
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
                label="合同名称"
                prop="contractInfoId"
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
                  联合体
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
                      @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.unionContractInfoAttachList)"
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
                @click="addfs('fb',2,1)"
                size="mini"
                style="
                  float: right;
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
                label="合同名称"
                prop="contractInfoId"
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
                  联合体
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
                      @input="getOurAmount(scope.$index,detailform.contractInfoAttachBO.innerContractInfoAttachList)"
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
        </el-tab-pane>
      </el-tabs>

    </el-form>
    <div class="btn-group" v-show="p.actpoint != 'look'">
      <el-button type="primary" @click="saveInfo('detailform')">保存</el-button>
      <el-button>提交</el-button>
    </div>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import CompanyTree from '../companyTree'
  import { isMoney } from '@/utils/validate'
  export default {
    data() {
      var validateMoney = (rule, value, callback) => {
        console.log(value)
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
        DwVisible:false,//选择单位弹框状态
        treeStatas: false,
        detailform: {
          contractInfo: {},
          commonFilesList: [],
          contractInfoAttachBO: {
            innerContractInfoAttachList:[],
            unionContractInfoAttachList:[]
          },
          topInfoSiteList:[],
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
        },
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
          ]
        },//表单验证规则
      }
    },
    components: {
      Tree,
      CompanyTree
    },
    computed: {
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
      }
    },
    methods: {
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
        if(type=='lht'){
          this.detailform.contractInfoAttachBO.unionContractInfoAttachList.push(v);
        }else{
          this.detailform.contractInfoAttachBO.innerContractInfoAttachList.push(v);
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
        if(data.type=="签约单位"){
          this.detailform.contractInfo.signOrgId=id.join(",");
          this.detailform.contractInfo.signOrgName=name.join(",");
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
      //获取我方份额
      getOurAmount(index,list){
        var money=0;
        this.detailform.contractInfoAttachBO.innerContractInfoAttachList.forEach((item)=>{
          money+=Number(item.contractAmount);
      })
        this.detailform.contractInfoAttachBO.unionContractInfoAttachList.forEach((item)=>{
          money+=Number(item.contractAmount);
      });
        var ourAmount=this.detailform.contractInfo.contractAmount-money;
        if(ourAmount>0){
          this.detailform.contractInfo.ourAmount=ourAmount;
        }else{
          this.$message.error('我方份额需要大于0');
          list[index].contractAmount=''
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
      saveInfo(formName) {
        console.log(this.detailform.contractInfo.createTime)
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
        this.detailform={
          commonFilesList: datas.commonFilesList,
          contractInfo: datas.contractInfo,
          contractInfoAttachBO: datas.contractInfoAttachBO,
          topInfoSiteList:datas.topInfoSiteList,
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
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.detailform.contractInfo.createOrgName='股份公司';
      this.detailform.contractInfo.createTime = new Date().getTime();
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
    margin-left: 30px;
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
    .el-form-item,>>>.formItem{

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
  .detailBox{
    max-height:calc(100vh - 410px)!important;
  }
  .detailUpload{
    display: inline-block;
  }
</style>
