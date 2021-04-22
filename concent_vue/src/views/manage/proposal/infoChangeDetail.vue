<template>
  <div style="position: relative">
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.topInfor.flowStatus==1||detailform.topInfor.flowStatus==4)" @click="saveInfo('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" class="detail-back-tab detailbutton save-btn" type="primary" @click="saveInfo('detailform','save')">保存</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <el-button  class="detail-back-tab detailbutton" @click="back" type="text">返回</el-button>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="变更前" name="before">
          <div class="detailBoxBG detailBoxBGBefore">
            <el-form
              :inline="false"
              :model="detailFormBefore"
              class="gcform"
            >
              <el-form-item
                label="项目名称:"
              >
                <el-input v-model="detailFormBefore.topInfor.inforName" disabled></el-input>
              </el-form-item>

              <el-form-item
                label="外文名称:"
              >
                <el-input v-model="detailFormBefore.topInfor.inforNameForeign" disabled></el-input>
              </el-form-item>
              <br>
              <div>
                <el-form-item
                  class="inline-formitem"
                  style="width:100%;"
                  label="项目板块:"
                >
                  <template>
                    <el-radio-group class="detail-radio-group" v-model="detailFormBefore.topInfor.moduleId">
                      <el-radio disabled  v-for="(item, index) in projectPlate" :label="item.id" :key="index" v-if="item.id=='7f4fcba4255b43a8babf15afd6c04a53'||item.id=='f6823a41e9354b81a1512155a5565aeb'||item.id=='510ba0d79593418493eb1a11ed3e7df4'">{{item.detailName}}</el-radio>
                    </el-radio-group>
                  </template>
                  <!--<el-input v-model="detailFormBefore.topInfor.moduleName" disabled></el-input>-->
                </el-form-item>
              </div>
              <el-form-item
                v-if="detailFormBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailFormBefore.topInfor.moduleId==null"
                label="工程类别(一级):"
              >
                <el-input v-model="detailFormBefore.topInfor.enginTypeFirstName" disabled></el-input>
              </el-form-item>

              <el-form-item
                v-if="detailFormBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailFormBefore.topInfor.moduleId==null"
                label="工程类别(二级):"
              >
                <el-input v-model="detailFormBefore.topInfor.enginTypeSecondName" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="所属线路:"
                v-if="(detailFormBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailFormBefore.topInfor.moduleId==null)&&detailFormBefore.topInfor.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
              >
                <el-input v-model="detailFormBefore.topInfor.belongLineName" disabled></el-input>
              </el-form-item>
              <br v-if="detailFormBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailFormBefore.topInfor.moduleId==null">
              <el-form-item
                v-if="detailFormBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailFormBefore.topInfor.moduleId==null"
                label="项目性质(一级):"
              >
                <el-input v-model="detailFormBefore.topInfor.projectNatureFirstName" disabled></el-input>
              </el-form-item>
              <el-form-item
                v-if="detailFormBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailFormBefore.topInfor.moduleId==null"
                label="项目性质(二级):"
              >
                <el-input v-model="detailFormBefore.topInfor.projectNatureSecondName" disabled></el-input>
              </el-form-item>
              <br v-if="detailFormBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailFormBefore.topInfor.moduleId==null">
              <el-form-item
                v-if="detailFormBefore.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
                label="供应产品:"
              >
                <el-input v-model="detailFormBefore.topInfor.supplyProductName" disabled></el-input>
              </el-form-item>
              <el-form-item
                v-if="detailFormBefore.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
                label="采购性质:"
              >
                <el-input v-model="detailFormBefore.topInfor.purchaseNatureName" disabled></el-input>
              </el-form-item>
              <br v-if="detailFormBefore.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'">
              <el-form-item
                label="新兴市场(一级):"
              >
                <el-input v-model="detailFormBefore.topInfor.marketFirstName" disabled></el-input>
              </el-form-item>

              <el-form-item
                label="新兴市场(二级):"
              >
                <el-input v-model="detailFormBefore.topInfor.marketSecondName" disabled></el-input>
              </el-form-item>

              <br>
              <el-form-item
                label="建设单位:"
              >
                <el-input v-model="detailFormBefore.topInfor.constructionOrg" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="设计单位:"
              >
                <el-input v-model="detailFormBefore.topInfor.designOrg	" disabled></el-input>
              </el-form-item>
              <br>


              <!-- 下拉 -->
              <el-form-item
                label="招标人:"
              >
                <el-input v-model="detailFormBefore.topInfor.bidPerson" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="招标代理公司:"
              >
                <el-input v-model="detailFormBefore.topInfor.bidAgentCompany	" disabled></el-input>
              </el-form-item>
              <el-form-item
                label="预计招标时间:"
              >
                <el-date-picker
                  :disabled="true"
                  filterable
                  clearable
                  type="date"
                  value-format="timestamp"
                  v-model="detailFormBefore.topInfor.planBidTime"

                >
                </el-date-picker>
              </el-form-item>
              <br>
              <el-form-item
                label="投资额（万元）:"
                prop="topInfor.investment"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-tooltip popper-class="tooltip-class" :content="String(detailFormBefore.topInfor.investment)" placement="bottom" :disabled="p.actpoint !== 'look'" effect="dark">
                  <el-input v-model="detailFormBefore.topInfor.investment" disabled>
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-tooltip>

              </el-form-item>

              <el-form-item label="资金来源:" prop="capitalId">
                <el-input v-model="detailFormBefore.capitalName" disabled></el-input>
              </el-form-item>

              <el-form-item
                label="是否为重大项目:"
                prop="topInfor.isMajorProject"
              >
            <el-switch
              disabled
              class="inline-formitem-switch"
              v-model="detailFormBefore.topInfor.isMajorProject"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
            >
            </el-switch>
                <!-- <el-select
                  :disabled="true"
                  filterable
                  clearable
                  placeholder="请选择"

                  v-model="detailFormBefore.topInfor.isMajorProject"
                >
                  <el-option
                    :key="index+'__'"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in yesOrNo"
                  ></el-option>
                </el-select> -->
              </el-form-item>
              <br>

              <el-form-item
                label="公告类型:"
              >
                <el-input v-model="detailFormBefore.topInfor.noticeTypeName" disabled></el-input>
              </el-form-item>

              <el-form-item
                label="资审方式:"
              >
                <el-input v-model="detailFormBefore.topInfor.verifyTypeName" disabled></el-input>
              </el-form-item>

              <el-form-item
                v-show="detailFormBefore.topInfor.investment<maxMoney&&detailFormBefore.topInfor.isMajorProject=='0'"
                label="重大项目说明"
              >
                <el-input
                  disabled
                  clearable
                  placeholder=""

                  v-model="detailFormBefore.topInfor.majorProjectExplain"
                />
              </el-form-item>
              <br>
              <!-- 下拉 -->


              <!-- --------------------------------------------------------------- -->


                <el-form-item
                  label="项目跟踪负责人:"
                >
                  <el-input v-model="detailFormBefore.topInfoOrg.projectTrackResponPerson" disabled></el-input>
                </el-form-item>
                <el-form-item
                  label="联系电话:"
                >
                  <el-input v-model="detailFormBefore.topInfoOrg.contactMode" disabled></el-input>
                </el-form-item>

              <el-form-item
                label="预计中标概率:"
              >
                <el-input v-model="detailFormBefore.topInfoOrg.bidProbName" disabled></el-input>
              </el-form-item>
              <!-- <el-form-item
                label="投资额（万元）:"
                prop="topInfor.investment"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input
                  clearable
                  placeholder=""

                  v-model="detailform.topInfor.investment"
                />
              </el-form-item> -->


              <el-form-item
                class="neirong"
                label="项目内容:"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  :disabled="true"
                  type="textarea"
                  clearable
                  placeholder="请输入"

                  v-model="detailFormBefore.topInfor.inforContent"
                />
              </el-form-item>
              <p class="detail-title" style="overflow: hidden；margin-right: 30px">
                <span>项目地点: </span>
              </p>
              <el-table
                :data="detailFormBefore.topInfoSiteList"
                :disabled="true"
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
                  :resizable="false"
                  label="项目地点"
                  align="center"
                  prop="inforName"
                >
                  <template slot-scope="scope">
                    <div class="positon-path">{{scope.row.path}}</div>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <el-table-column
                  :resizable="false"
                  label="项目规模"
                  prop="contractAmount"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-tooltip popper-class="tooltip-class" :content="String(scope.row.contractAmount)" placement="bottom" :disabled="p.actpoint !== 'look'" effect="dark">
                      <el-input
                        class="listInput"
                        clearable
                        :disabled="true"
                        v-model="scope.row.contractAmount"
                      >
                        <template slot="prepend">¥</template>
                        <template slot="append">(万元)</template>
                      </el-input>
                    </el-tooltip>

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
                      disabled
                      class="inline-formitem-switch"
                      v-model="scope.row.isMain"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="1"
                      inactive-value="0"
                    >
                    </el-switch>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>
              </el-table>
              <p style="overflow: hidden；margin-right: 30px">
                <span style="float: left">标段信息: </span>
              </p>
              <el-table
                :data="detailFormBefore.topInfoSectionList"
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
                  label="标段名"
                  prop="sectionName"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      clearable
                      :disabled="true"
                      v-model="scope.row.sectionName"
                    ></el-input>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <el-table-column
                  :resizable="false"
                  label="项目规模"
                  align="center"
                  width="350"
                  prop="contractAmount"
                >
                  <template slot-scope="scope">
                    <el-tooltip popper-class="tooltip-class" :content="String(scope.row.projectScale)" placement="bottom" :disabled="p.actpoint !== 'look'" effect="dark">
                      <el-input
                        @input="scope.row.projectScale=getMoney(scope.row.projectScale)"
                        clearable
                        :disabled="true"
                        v-model="scope.row.projectScale"
                      >
                        <template slot="prepend">¥</template>
                        <template slot="append">(万元)</template>
                      </el-input>
                    </el-tooltip>

                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>
              </el-table>

            </el-form>
          </div>
      </el-tab-pane>
      <el-tab-pane label="变更后" name="after">
          <div class="detailBoxBG">
            <el-form
              :inline="false"
              :model="detailform"
              :rules="rules"
              class="gcform"
              ref="detailform"
            >
            <el-form-item
                label="项目名称:"
                prop="topInfor.inforName"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input
                  disabled
                  clearable

                  v-model="detailform.topInfor.inforName"/>
              </el-form-item>

              <el-form-item
                label="外文名称:"
              >
                <el-input
                  disabled
                  clearable

                  v-model="detailform.topInfor.inforNameForeign"/>
              </el-form-item>
              <br>
              <div>
                <el-form-item
                  class="inline-formitem xmbk-item"
                  style="width:100%;"
                  label="项目板块:"
                  prop="topInfor.moduleId"
                  :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
                >
                  <!--@change="chg('bulletinType')"-->
                  <!--<el-select-->
                  <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                  <!--clearable-->
                  <!--filterable-->
                  <!--style="width: 100%"-->
                  <!--placeholder="请选择"-->
                  <!---->
                  <!--@change="-->
                  <!--getName(detailform.topInfor.moduleId, bizCode, 'moduleName')-->
                  <!--"-->
                  <!--v-model="detailform.topInfor.moduleId"-->
                  <!--&gt;-->
                  <!--<el-option-->
                  <!--:key="index"-->
                  <!--:label="item.detailName"-->
                  <!--:value="item.id"-->
                  <!--v-for="(item, index) in bizCode"-->
                  <!--&gt;</el-option>-->
                  <!--</el-select>-->

                  <template>
                    <el-radio-group class="detail-radio-group" v-model="detailform.topInfor.moduleId"  @change="getName(detailform.topInfor.moduleId, projectPlate, 'moduleName','moduleCode')">
                      <el-radio disabled  v-for="(item, index) in projectPlate" :label="item.id" :key="index" v-if="item.id=='7f4fcba4255b43a8babf15afd6c04a53'||item.id=='f6823a41e9354b81a1512155a5565aeb'||item.id=='510ba0d79593418493eb1a11ed3e7df4'">{{item.detailName}}</el-radio>
                    </el-radio-group>
                  </template>
                </el-form-item>
              </div>
              <el-form-item
                v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null"
                label="工程类别(一级):"
                prop="topInfor.enginTypeFirstId"
              >
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  @change="getTwo"

                  v-model="detailform.topInfor.enginTypeFirstId"
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
                v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null"
                label="工程类别(二级):"
                prop="topInfor.enginTypeSecondId"
              >
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  @clear="clear(detailform.topInfor.enginTypeSecondId,detailform.topInfor.enginTypeSecondName)"
                  @change="
                getName(
                  detailform.topInfor.enginTypeSecondId,
                  xqprojectType,
                  'enginTypeSecondName',
                  'enginTypeSecondCode'
                )
              "
                  v-model="detailform.topInfor.enginTypeSecondId"
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
                v-if="(detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null)&&detailform.topInfor.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
                label="所属线路:"
                prop="topInfor.belongLineId"
              >
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择或直接填写所属现路"

                  @change="
                getName(
                  detailform.topInfor.belongLineId,
                  railwayLine,
                  'belongLineName',
                  'belongLineCode'
                )
              "
                  v-model="detailform.topInfor.belongLineId"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in railwayLine"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null">
              <el-form-item
                v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null"
                label="项目性质(一级):"
                prop="topInfor.projectNatureFirstId"
              >
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  @change="getTwoXZ"

                  v-model="detailform.topInfor.projectNatureFirstId"
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
                v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null"
                label="项目性质(二级):"
                prop="topInfor.projectNatureSecondId"
              >
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"
                  @clear="clear(detailform.topInfor.projectNatureSecondId,detailform.topInfor.projectNatureSecondName)"
                  @change="
                  getName(
                    detailform.topInfor.projectNatureSecondId,
                    projectNatureTwo,
                    'projectNatureSecondName',
                    'projectNatureSecondCode'

                  )
                "
                  v-model="detailform.topInfor.projectNatureSecondId"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in projectNatureTwo"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null">
              <el-form-item
                v-if="detailform.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
                label="供应产品"
                prop="topInfor.supplyProductName"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input
                  disabled

                  v-model="detailform.topInfor.supplyProductName"
                />
              </el-form-item>
              <el-form-item
                v-if="detailform.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
                label="采购性质:"
                prop="topInfor.purchaseNatureId"
              >
                <el-select
                  disabled
                  filterable
                  clearable
                  @change="
                getName(
                  detailform.topInfor.purchaseNatureId,
                  purchaseNature,
                  'purchaseNatureName',
                  'purchaseNatureCode'
                )
              "
                  v-model="detailform.topInfor.purchaseNatureId"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in purchaseNature"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br v-if="detailform.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'">
                <br>
              <el-form-item
                label="新兴市场(一级):"
                prop="topInfor.marketFirstNameId"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  @change="getTwoSC"

                  v-model="detailform.topInfor.marketFirstNameId"
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
                label="新兴市场(二级):"
                prop="topInfor.marketSecondId"
                :rules="detailform.topInfor.marketFirstNameId&&emergingMarketTwo?{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }:{}"
              >
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"

                  @change="
                  getName(
                    detailform.topInfor.marketSecondId,
                    emergingMarketTwo,
                    'marketSecondName',
                    'marketSecondCode'
                  )
                "
                  v-model="detailform.topInfor.marketSecondId"
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
              <el-form-item
                label="建设单位:"
                prop="topInfor.constructionOrg"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input
                  disabled
                  clearable

                  v-model="detailform.topInfor.constructionOrg"
                />
              </el-form-item>
              <el-form-item
                label="设计单位:"
                prop="topInfor.designOrg"
                :rules="{
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input
                  clearable
                  disabled

                  v-model="detailform.topInfor.designOrg"
                />
              </el-form-item>
              <br>
              <el-form-item
                label="招标人:"
                prop="topInfor.bidPerson"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input
                  disabled
                  clearable

                  v-model="detailform.topInfor.bidPerson"
                />
              </el-form-item>

              <el-form-item
                label="招标代理公司:"
                prop="topInfor.bidAgentCompany"
                :rules="{
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input
                  disabled

                  v-model="detailform.topInfor.bidAgentCompany"
                />
              </el-form-item>

              <el-form-item
                label="预计招标时间:"
                prop="topInfor.planBidTime"
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
                  v-model="detailform.topInfor.planBidTime"

                >
                </el-date-picker>
              </el-form-item>
              <br>

              <el-form-item
                label="投资额（万元）:"
                prop="topInfor.investment"
                :rules="rules.contractAmount"
              >
                <el-tooltip popper-class="tooltip-class" :content="String(detailform.topInfor.investment)" placement="bottom" :disabled="p.actpoint !== 'look'" effect="dark">
                  <el-input
                    disabled
                    clearable
                    placeholder=""
                    @input="detailform.topInfor.investment>=maxMoney?detailform.topInfor.isMajorProject='0':detailform.topInfor.isMajorProject='1'"
                    v-model="detailform.topInfor.investment"
                  >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-tooltip>

              </el-form-item>

              <el-form-item label="资金来源:" prop="value1"  :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
                <el-select
                  class="multiple-sel"
                  disabled
                  filterable
                  clearable
                  multiple
                  placeholder="请选择"

                  v-model="detailform.value1"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in amountSource"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="是否为重大项目:"
                prop="topInfor.isMajorProject"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
            <el-switch
              disabled
              class="inline-formitem-switch"
              v-model="detailform.topInfor.isMajorProject"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
            >
            </el-switch>
                <!-- <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  filterable
                  clearable
                  placeholder="请选择"

                  v-model="detailform.topInfor.isMajorProject"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in yesOrNo"
                  ></el-option>
                </el-select> -->
              </el-form-item>
                <br>
              <el-form-item
                label="公告类型:"
                prop="topInfor.noticeTypeId"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-select
                  disabled
                  clearable
                  filterable
                  placeholder="请选择"

                  v-model="detailform.topInfor.noticeTypeId"
                  @change="
                  getName(
                    detailform.topInfor.noticeTypeId,
                    bulletinType,
                    'noticeTypeName',
                    'noticeTypeCode'
                  )
                "
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in bulletinType"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="资审方式:"
                prop="topInfor.noticeTypeName"
              >
                <el-input
                  disabled
                  clearable
                  placeholder="请输入"
                  v-model="detailform.topInfor.noticeTypeName=='资审公告'?detailform.topInfor.verifyTypeName='资格预审':detailform.topInfor.noticeTypeName=='招标公告'?detailform.topInfor.verifyTypeName='资格后审':detailform.topInfor.noticeTypeName=='竞争性谈判'?detailform.topInfor.verifyTypeName='竞争性谈判':detailform.topInfor.verifyTypeName=''"
                />
                <!--<el-select-->
                  <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                  <!--clearable-->
                  <!--filterable-->
                  <!--placeholder="请选择"-->
                  <!---->
                  <!--@change="-->
                  <!--getName(-->
                    <!--detailform.topInfor.verifyTypeId,-->
                    <!--certificationType,-->
                    <!--'verifyTypeName'-->
                  <!--)-->
                <!--"-->
                  <!--v-model="detailform.topInfor.verifyTypeId"-->
                <!--&gt;-->
                  <!--<el-option-->
                    <!--:key="index"-->
                    <!--:label="item.detailName"-->
                    <!--:value="item.id"-->
                    <!--v-for="(item, index) in certificationType"-->
                  <!--&gt;</el-option>-->
                <!--</el-select>-->
              </el-form-item>
              <el-form-item
                v-show="detailform.topInfor.investment<maxMoney&&detailform.topInfor.isMajorProject=='0'"
                label="重大项目说明"
              >
                <el-input
                  clearable
                  placeholder=""
                  disabled
                  v-model="detailform.topInfor.majorProjectExplain"
                />
              </el-form-item>
              <br>
                <el-form-item
                  label="项目跟踪负责人:"
                  prop="topInfoOrg.projectTrackResponPerson"
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

                    v-model="detailform.topInfoOrg.projectTrackResponPerson"
                  />
                </el-form-item>
                <el-form-item
                  label="联系电话:"
                  prop="topInfoOrg.contactMode"
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

                    v-model="detailform.topInfoOrg.contactMode"
                  />
                </el-form-item>

              <el-form-item
                label="预计中标概率:"
                prop="topInfoOrg.bidProbId"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  filterable
                  clearable
                  placeholder="请选择"

                  @change="
                  getNameZb(
                    detailform.topInfoOrg.bidProbId,
                    probability,
                    'bidProbName',
                    'bidProbCode'
                  )
                "
                  v-model="detailform.topInfoOrg.bidProbId"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in probability"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                class="neirong"
                label="项目内容:"
                prop="topInfor.inforContent"
                style="width: 100%"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  disabled
                  type="textarea"
                  clearable
                  placeholder="请输入"

                  v-model="detailform.topInfor.inforContent"
                />
              </el-form-item>
              <p class="detail-title" style="overflow: hidden；margin-right: 30px">
                <span>项目地点: </span>
                <!--<el-button-->
                  <!--v-show="p.actpoint != 'look'&&p.actpoint != 'task'"-->
                  <!--@click="add('dd')"-->
                  <!--class="detatil-flie-btn"-->
                  <!--type="primary"-->
                <!--&gt;新增-->
                <!--</el-button-->
                <!--&gt;-->
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
                class="detailTable detailTable"
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
                  :resizable="false"
                  label="项目地点"
                  align="center"
                  prop="inforName"
                >
                  <template slot-scope="scope">
                    <!--<i class="el-icon-circle-plus"  v-show="p.actpoint != 'look'&&p.actpoint != 'task'" @click="selectPosition(),positionIndex=scope.$index"></i>-->
                   <span>{{scope.row.path}}</span>
                    <!--<el-button v-show="p.actpoint != 'look'" @click="selectPosition(),positionIndex=scope.$index">选择</el-button>-->
                  </template>
                </el-table-column>

                <el-table-column
                  :resizable="false"
                  label="项目规模(万元)"
                  prop="contractAmount"
                  align="center"
                  width="350"
                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm" :prop="'topInfoSiteList.' + scope.$index + '.contractAmount'" :rules='rules.contractAmount'>
                      <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                      <el-tooltip popper-class="tooltip-class" :content="String(scope.row.contractAmount)" placement="bottom" :disabled="p.actpoint !== 'look'" effect="dark">
                        <el-input
                          clearable
                          disabled
                          v-model="scope.row.contractAmount"
                        >
                          <template slot="prepend">¥</template>
                          <template slot="append">(万元)</template>
                        </el-input>
                      </el-tooltip>

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
                      disabled
                      class="inline-formitem-switch"
                      v-model="scope.row.isMain"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="1"
                      inactive-value="0"
                      @change="setMain(scope.$index,detailform.topInfoSiteList)"
                    >
                    </el-switch>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <!--<el-table-column-->
                  <!--v-show="!p.actpoint === 'look'"-->
                  <!--:resizable="false"-->
                  <!--fixed="right"-->
                  <!--label="操作"-->
                  <!--align="center"-->
                  <!--width="80"-->
                  <!--show-overflow-tooltip-->
                  <!--v-if="p.actpoint !== 'look'&&p.actpoint != 'task'"-->
                <!--&gt;-->
                  <!--<template slot-scope="scope">-->
                    <!--<el-link-->
                      <!--:underline="false"-->
                      <!--@click="del(scope.$index,scope.row,detailform.topInfoSiteList)"-->
                      <!--type="warning"-->
                    <!--&gt;删除-->
                    <!--</el-link-->
                    <!--&gt;-->
                  <!--</template>-->
                <!--</el-table-column>-->
              </el-table>
              <p  class="detail-title" style="overflow: hidden；margin-right: 30px">
                <span>标段信息: </span>
                <!--<el-button-->
                  <!--v-show="p.actpoint != 'look'&&p.actpoint != 'task'"-->
                  <!--@click="add('bd')"-->
                  <!--class="detatil-flie-btn"-->
                  <!--type="primary"-->
                <!--&gt;新增-->
                <!--</el-button-->
                <!--&gt;-->
              </p>
              <el-table
                :row-class-name="tableRowClassName"
                :data="detailform.topInfoSectionList"
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
                  label="标段名"
                  prop="sectionName"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot="header">
                    <p>
                      <span class="red-star">*</span>
                      标段名
                    </p>
                  </template>
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm" :prop="'topInfoSectionList.' + scope.$index + '.sectionName'"     :rules="{
           required: true, message: '此项不能为空', trigger: 'blur'
        }">
                      <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                      <el-input
                        clearable
                        disabled
                        v-model="scope.row.sectionName"
                      ></el-input>
                    </el-form-item>
                    <!--<el-input-->
                      <!--clearable-->
                      <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                      <!--v-model="scope.row.sectionName"-->
                    <!--&gt;</el-input>-->
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <el-table-column
                  :resizable="false"
                  label="项目规模(万元)"
                  align="center"
                  prop="projectScale"
                  width="350"

                >
                  <template slot-scope="scope">
                    <el-form-item class="tabelForm" :prop="'topInfoSectionList.' + scope.$index + '.projectScale'" :rules='rules.contractAmount'>
                      <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
                      <el-tooltip popper-class="tooltip-class" :content="String(scope.row.projectScale)" placement="bottom" :disabled="p.actpoint !== 'look'" effect="dark">
                        <el-input
                          v-model="scope.row.projectScale"
                          clearable
                          disabled
                          class="input-el-input-group"
                        >
                          <template slot="prepend">¥</template>
                          <template slot="append">(万元)</template>
                        </el-input>
                      </el-tooltip>

                    </el-form-item>
                    <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                  </template>
                </el-table-column>

                <!--<el-table-column-->
                  <!--v-show="!p.actpoint === 'look'"-->
                  <!--:resizable="false"-->
                  <!--fixed="right"-->
                  <!--label="操作"-->
                  <!--align="center"-->
                  <!--show-overflow-tooltip-->
                  <!--v-if="p.actpoint !== 'look'&&p.actpoint != 'task'"-->
                  <!--width="80">-->
                  <!--<template slot-scope="scope">-->
                    <!--<el-link-->
                      <!--:underline="false"-->
                      <!--@click="del(scope.$index,scope.row,detailform.topInfoSectionList,'bd')"-->
                      <!--type="warning">删除-->
                    <!--</el-link>-->
                  <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column
                  :resizable="false"
                  fixed="right"
                  label="是否为跟踪标段"
                  align="center"
                  show-overflow-tooltip
                  v-if="p.actpoint!= 'look'&&p.actpoint!='task'"
                  width="80">
                  <template slot-scope="scope">
                    <el-switch
                      :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                      class="inline-formitem-switch"
                      v-model="scope.row.isTrack"
                      active-color="#409EFF"
                      inactive-color="#ddd"
                      active-value="1"
                      inactive-value="0"

                    >
                      <!--@change="setTrack(scope.$index,detailform.topInfoSectionList)"-->
                    </el-switch>
                  </template>
                </el-table-column>
              </el-table>

            </el-form>
          </div>

        <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
      </el-tab-pane>
      <el-tab-pane label="审批流程" name="lc" v-if="p.actpoint == 'task'||p.actpoint == 'look'">
        <Audit-Process :task="p.task||{businessId:p.uuid,businessType:' contract_project_change'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import { isMoney } from '@/utils/validate'
  import AuditProcess from '@/components/auditProcess'
  export default {
    // name: "详情",
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
        activeName:"after",
        maxMoney:1000000,
        id:'',
        afterId:'',
        key: 0,
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index

        options2: [],
        options: [],
        detailform: {
          changeRecordUuid:'',
          topInfor: {},
          topInfoOrg: {},
          topInfoSiteList: [],
          topInfoSectionList: [],
          value1: [],
        },
        detailFormBefore:{
          topInfor: {
            marketSecondId:''
          },
          topInfoOrg: {},
          topInfoSiteList: [],
          topInfoSectionList: [],
        },
        detailformrules: {},
        projectNatureTwo:[],//项目性质二级
        xqprojectType: [],//工程类别二级
        emergingMarketTwo:[],//新兴市场二级
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
          ]
        },//表单验证规则
      };
    },
    components: {
      Tree,
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
    },
    mounted() {
      // this.$store.commit("setCategory", 'projectDomainType');
      this.id=this.p.instid,this.afterId=this.p.afterId;
      if (this.p.actpoint === "edit"||this.p.actpoint === "look"||this.p.actpoint === "task") {
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
      //隐藏标段信息某些行
      tableRowClassName: function (row, index) {
        if (row.row.isDelete=='1') {
          return 'hidden-row';
        }
        return '';
      },
      //流程操作
      operation(type){
        this.$http
          .post(
            '/api/contract/topInfo/TopInfor/changeProcess/'+type,
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
      //设置是否为跟踪标段
      setTrack(i,list){
        list.forEach((item,index)=>{
          list.forEach((item,index)=>{
            if(index!=i){
              item.isTrack="0"
            }
          });
        });
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
        this.detailform.topInfor.enginTypeSecondId='';
        this.xqprojectType=[];
        if(id!=''){
          this.projectDomainType.find(
            (item) => {
            if (item.id == id) {
            this.detailform.topInfor.enginTypeFirstName = item.detailName;
            this.detailform.topInfor.enginTypeFirstCode = item.detailCode;
            this.xqprojectType = item.children;
          }
        }
        )
        }
      },
      //新兴市场二级
      getTwoSC(id) {
        this.detailform.topInfor.marketSecondId='';
        this.emergingMarketTwo=[];
        if(id!=''){
          this.emergingMarket.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.topInfor.marketFirstName = item.detailName;
            this.detailform.topInfor.marketFirstCode = item.detailCode;
            this.emergingMarketTwo = item.children;
          }
        }
        )
        }
      },
      //项目性质二级
      getTwoXZ(id){
        this.detailform.topInfor.projectNatureSecondId='';
        this.projectNatureTwo=[];
        if(id!=''){
          this.projectNature.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.topInfor.projectNatureFirstName = item.detailName;
            this.detailform.topInfor.projectNatureFirstCode = item.detailCode;
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
          this.detailform.topInfor[name] = list.find(
            (item) => item.id == id
        ).detailName;
            this.detailform.topInfor[code] = list.find(
                (item) => item.id == id
            ).detailCode;
          console.log(this.detailform.topInfor[name]);
        }
      },
      //获取下拉框id和name的公共方法
      getNameZb(id, list, name,code) {
        if(id){
          this.$forceUpdate()
          this.detailform.topInfoOrg[name] = list.find(
            (item) => item.id == id
        ).detailName;
            this.detailform.topInfoOrg[code] = list.find(
                (item) => item.id == id
            ).detailCode;
          console.log(this.detailform.topInfoOrg[name]);
        }
      },
      saveInfo(formName,type) {

        var topInforCapitalList = [];
        this.amountSource.forEach((item) => {
          if (this.detailform.value1&&this.detailform.value1.indexOf(item.id) != -1) {
          var v = {
            capitalId: item.id,
            capitalName: item.detailName,
            capitalCode:item.detailCode
          };
          topInforCapitalList.push(v);
        }
      });
        this.detailform.topInforCapitalList=topInforCapitalList;
        this.detailform.srcId=this.id;
        var url='';
        if(type=='save'){
          url=`/api/contract/topInfo/TopInfor/detail/${this.p.actpoint === "add"?'saveChangeRecord':'updateChangeRecord'}`
        }else{
          url="/api/contract/topInfo/TopInfor/changeProcess/start"
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                url,
                // JSON.stringify(this.detailform),
                {
                  'afterTopInforBO':this.detailform,
                  'beforeTopInforBO':this.detailFormBefore
                },
                {useJson: true}
              )
              .then((res) => {
              if (res.data.code === 200) {
              this.$message({
                message:  `${type=='save'?'保存':'提交'}成功`,
                type: "success",
              });
              this.$refs[formName].resetFields();
              this.$router.push({
                path: "/manage/proposal/infoChangeList",
              });
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
        this.$router.push({
          path: "/manage/proposal/infoChangeList",
        });
      },
      del(index,item,list,type) {
        console.log(index);
        // if(item.uuid&&type=='bd'){
        if(type=='bd'){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            list[index].isDelete=1;
            console.log(list)
            // this.$http
            // .post(
            //   "/api/contract/topInfo/TopInfoSection/list/delete",
            //   {ids: [item.uuid]}
            // )
            // .then((res) => {
            // if (res.data && res.data.code === 200) {
            // list.splice(index, 1);
            // console.log(list)
            // } else {
            //   this.$message.error(data.msg)
            // }
          //});
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
            isMain: '',
          }
          this.detailform.topInfoSiteList.push(v);
        } else {
          v = {
            sectionName: '',
            projectScale: '',
            isDelete:'0'
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
      // 修改的时候详情
      getDetail() {
        this.$http
          .post("/api/contract/topInfo/TopInfor/detail/entityInfoBychangeRecordUuid", {beforeId:this.id,afterId:this.afterId,uuid:this.p.task?this.p.instid:this.p.uuid})
          .then((res) => {
          var datas=res.data.data;
          var beforData=[],afterData=[];
        if(datas[0].topInfoOrg.changeStatus==1){
          beforData=datas[0];
          afterData=datas[1];
        }else{
          beforData=datas[1];
          afterData=datas[0];
        }
        this.getTwo(afterData.topInfor.enginTypeFirstId||'');
        this.getTwoSC(afterData.topInfor.marketFirstNameId||'');
        this.getTwoXZ(afterData.topInfor.projectNatureFirstId||'');
        // afterData.topInforCapitalList.forEach((item)=>{
        //   this.value1.push(item.capitalId);
        // });
        console.log(afterData)
        this.detailform={
          afterId: afterData.afterId,
          changeRecordUuid:afterData.changeRecordUuid,
          topInfor: afterData.topInfor,
          topInfoOrg: afterData.topInfoOrg,
          topInfoSiteList: afterData.topInfoSiteList,
          topInfoSectionList: afterData.topInfoSectionList,
          value1:[],
        };
        afterData.topInforCapitalList.forEach((item)=>{
          this.detailform.value1.push(item.capitalId)
      });
          this.detailFormBefore={
            capitalName: beforData.capitalName,
            topInfor: beforData.topInfor,
            topInfoOrg: beforData.topInfoOrg,
            topInfoSiteList: beforData.topInfoSiteList,
            topInfoSectionList: beforData.topInfoSectionList
          }
      });
      },
      //新增的时候详情
      getAddDetail(){
        console.log(111)
          this.$http
            .post("/api/contract/topInfo/TopInfor/detail/entityInfo", {topOrgId:this.id})
            .then((res) => {
            var datas=res.data.data;
          this.getTwo(datas.topInfor.enginTypeFirstId||'');
          this.getTwoSC(datas.topInfor.marketFirstNameId||'');
          this.getTwoXZ(datas.topInfor.projectNatureFirstId||'');

          this.detailform={
            changeRecordUuid:datas.changeRecordUuid,
            topInfor: datas.topInfor,
            topInfoOrg: datas.topInfoOrg,
            topInfoSiteList: datas.topInfoSiteList,
            topInfoSectionList: datas.topInfoSectionList,
            value1:[],
          };
        datas.topInforCapitalList.forEach((item)=>{
          this.detailform.value1.push(item.capitalId);
      });
          for(var i in this.detailform){
            this.detailFormBefore[i]=JSON.parse(JSON.stringify(this.detailform[i]));
          }
          this.detailFormBefore.capitalName=datas.capitalName;
          // this.detailFormBefore={
          //   capitalName:datas.capitalName,
          //   topInfor: datas.topInfor,
          //   topInfoOrg: datas.topInfoOrg,
          //   topInfoSiteList: datas.topInfoSiteList,
          //   topInfoSectionList: datas.topInfoSectionList,
          // }
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
  .detailBoxBGBefore {
    .detailTable .el-input-group{
      margin-top: 0px;
    }
    >>>.detailTable td{
      padding: 5px 0!important;
    }
  }
</style>

