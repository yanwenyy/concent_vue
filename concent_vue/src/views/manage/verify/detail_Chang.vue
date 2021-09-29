<!--资审变更列表-->
<template>
 <div style="position: relative">
  <!-- <el-button
 class="detail-back-tab detailbutton sub-btn"
 @click="saveInfo('detailform','sub')"
 v-show="p.actpoint != 'look'||p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.topInfor.flowStatus=='edit')"
 >提交</el-button>

 <el-button
 class="detail-back-tab detailbutton save-btn"
 type="primary"
 @click="saveInfo('detailformAfter')"
 v-show="p.actpoint != 'look'"
 >保存</el-button>

  <el-button
  v-show="p.actpoint == 'task'&&p.task.edit==false"
  class="detailbutton detail-back-tab bh"
  @click="operation('back')"
  type="warning">驳回</el-button>

  <el-button
  v-show="p.actpoint == 'task'&&p.task.edit==false"
  class="detailbutton detail-back-tab tg"
  @click="operation('complete')"
  type="success">通过</el-button>
 <el-button
   class="detail-back-tab detailbutton"
   @click="back">返回</el-button> -->

<!-- ||detailform.verify.flowStatus=='edit' -->
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||p.flowStatus=='edit'||p.flowStatus=='reject')" @click="saveInfo('detailformAfter','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" class="detail-back-tab detailbutton save-btn" type="primary" @click="saveInfo('detailformAfter','save')">保存</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <el-button  class="detail-back-tab detailbutton" @click="back" type="text">返回</el-button>

  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane label="变更前" name="before">

          <div class="detailBoxBG">
            <el-form
              :inline="false"
              :model="detailformBefore"
              class="gcform"
              ref="detailformBefore"
              style="background: white;width:calc(100% - 4px);">
              <el-divider content-position="left" class="detailDivider">项目前期信息</el-divider>
              <el-form-item  label="项目名称:"
                             :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
              <el-input
                disabled
                clearable
                v-model="detailformBefore.topInfor.inforName"/>
            </el-form-item>

            <el-form-item  label="外文名称:">
              <el-input
                disabled
                clearable
                v-model="detailformBefore.topInfor.inforNameForeign"/>
            </el-form-item>
           <br>
          <div>
            <el-form-item label="项目板块:" class="inline-formitem">
              <template>
                <el-radio-group class="detail-radio-group" disabled v-model="detailformBefore.topInfor.moduleId" @change="getName(detailformBefore.topInfor.moduleId, projectPlate, 'moduleName','moduleCode')">
                  <el-radio v-for="(item, index) in projectPlate" :label="item.id" :key="index">{{item.detailName}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            </div>

            <el-form-item
              v-if="detailformBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="工程类别(一级):">
              <el-input
                disabled
                clearable
                filterable
                placeholder="请选择"
                v-model="detailformBefore.topInfor.enginTypeFirstName"
              >
              </el-input>
            </el-form-item>

            <el-form-item
              v-if="detailformBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="工程类别(二级):"
            >
              <el-input
                disabled
                placeholder="工程类别(二级)"
                v-model="detailformBefore.topInfor.enginTypeSecondName"
              >
              </el-input>
            </el-form-item>


            <el-form-item label="所属线路:"
                          v-if="(detailformBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb')&&detailformBefore.topInfor.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'">
              <el-input
                disabled
                v-model="detailformBefore.topInfor.belongLineName"
              >
              </el-input>
            </el-form-item>
            <br>

            <el-form-item
              v-if="detailformBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="项目性质(一级):"
            >
              <el-input
                disabled
                clearable
                filterable
                placeholder="请选择"
                v-model="detailformBefore.topInfor.projectNatureFirstName"
              >
              </el-input>
            </el-form-item>

            <el-form-item
              v-if="detailformBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="项目性质(二级):"
            >
              <el-input
                disabled
                clearable
                filterable
                placeholder="请选择"
                v-model="detailformBefore.topInfor.projectNatureSecondName"
              >
              </el-input>
            </el-form-item>
              <br  v-if="detailformBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailformBefore.topInfor.moduleId==null">
              <el-form-item
                v-if="detailformBefore.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
                label="供应产品"
              >
                <el-input
                  disabled
                  v-model="detailformBefore.topInfor.supplyProductName"
                />
              </el-form-item>
              <el-form-item
                v-if="detailformBefore.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
                label="采购性质:"
              >
                <el-input
                  disabled
                  v-model="detailformBefore.topInfor.purchaseNatureName"
                />
              </el-form-item>
              <br v-if="detailformBefore.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'">
            <el-form-item  label="新兴市场(一级):"

                           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformBefore.topInfor.marketFirstName"
              >
              </el-input>
            </el-form-item>

            <el-form-item  label="新兴市场(二级):"
            >
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformBefore.topInfor.marketSecondName"
              >
              </el-input>
            </el-form-item>
            <br>

            <div class="div-item">
              <el-form-item
                label="装配率(%)"
                v-if="detailformBefore.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"
              >
                <el-input
                  disabled
                  v-model="detailformBefore.topInfor.otherAssemblyRate"
                />
              </el-form-item>

              <el-form-item
                label="装配类型"
                v-if="detailformBefore.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

              >
              <el-input
                  disabled
                  v-model="detailformBefore.topInfor.otherAssemblyType"
                />
              </el-form-item>

            </div>

            <div class="div-item">
              <el-form-item
                label="建筑类型"
                v-if="detailformBefore.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"
              >
              <el-input
                  disabled
                  v-model="detailformBefore.topInfor.otherBuildingType"
                />
              </el-form-item>

              <el-form-item
                label="建筑结构类型"
                v-if="detailformBefore.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"
              >
                <el-input
                  disabled
                  v-model="detailformBefore.topInfor.otherBuildingStructureType"
                />
              </el-form-item>

              <el-form-item
                label="场地名称"
                v-if="detailformBefore.topInfor.marketFirstNameId=='50cd5e9992ac4653920fac8c1f2eb2e3'"
              >
                <el-input
                  disabled
                  v-model="detailformBefore.topInfor.siteName"
                />
              </el-form-item>
            </div>

            <el-form-item
              :label="detailformBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'建设单位:':'客户名称:'"
                           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                v-model="detailformBefore.topInfor.constructionOrg"
              />
            </el-form-item>

              <el-form-item
                v-if="detailformBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailformBefore.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'||detailformBefore.topInfor.moduleId==null"
                label="设计单位:">
              <el-input
                disabled
                v-model="detailformBefore.topInfor.designOrg"
              />
            </el-form-item>
            <br>

            <el-form-item
              v-if="detailformBefore.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="招标人:"
                          :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                v-model="detailformBefore.topInfor.bidPerson"
              />
            </el-form-item>

            <el-form-item
              v-if="detailformBefore.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="招标代理公司:">
              <el-input
                disabled
                v-model="detailformBefore.topInfor.bidAgentCompany"
              />
            </el-form-item>

            <el-form-item
              v-if="detailformBefore.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="预计招标时间:"
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
                v-model="detailformBefore.topInfor.planBidTime"
              >
              </el-date-picker>
            </el-form-item>
            <br>
            <el-form-item
              :label="detailformBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'投资额（万元）:':'项目规模:'"
                          :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
            <el-input
              disabled
              placeholder=""
              size="mini"
              v-model="detailformBefore.topInfor.investment"
            >
          <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
          </el-input>
<!--              <el-input-->
<!--                disabled-->
<!--                clearable-->
<!--                placeholder="投资额（万元）:"-->
<!--                v-model="detailformBefore.topInfor.investment"-->
<!--              />-->
            </el-form-item>

            <el-form-item label="资金来源:"
                          :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformBefore.capitalName"
              >
              </el-input>
            </el-form-item>

            <el-form-item  label="是否为重大项目:">
              <el-switch

                class="inline-formitem-switch"
                v-model="detailformBefore.topInfor.isMajorProject"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="0"
                inactive-value="1"
                disabled
              >
            </el-switch>
              <!-- <div>
              <el-radio  label="0"
              v-model="detailform.topInfor.bidProbName"
              disabled
              style="margin-right:40px"
              >是</el-radio>
              <el-radio  label="1"
              v-model="detailform.topInfor.bidProbName"
              disabled
              >否</el-radio>
              </div> -->
            </el-form-item>
            <br>


             <el-form-item
               v-show="detailformBefore.topInfor.investment<maxMoney&&detailformBefore.topInfor.isMajorProject=='0'"
               label="重大项目说明"
             >
              <el-input
                disabled
                v-model="detailformBefore.topInfor.majorProjectExplain"
              />
            </el-form-item>
            <br>
              <!-- 下拉 -->

              <el-form-item   class="formItem" label="项目跟踪负责人:"
                              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformBefore.topInfoOrg.projectTrackResponPerson"
              >
              </el-input>
              </el-form-item>

              <el-form-item  class="formItem"  label="联系电话:"
                             :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformBefore.topInfoOrg.contactMode"
              >
              </el-input>
              </el-form-item>

            <el-form-item  label="预计中标概率:"
                           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformBefore.topInfoOrg.bidProbName"
              >
              </el-input>
            </el-form-item>


            <div>
            <el-form-item
              class="neirong"
              label="项目内容:"
              style="width: 100%"
            >
              <el-input
                disabled
                type="textarea"
                clearable
                placeholder="请输入"
                v-model="detailformBefore.topInfor.inforContent"
              />
            </el-form-item>
            </div>
               <el-divider content-position="left" class="detailDivider">资审信息</el-divider>

                 <el-form-item
                   label="招标方式:"
                   class="formItem"
                 >
              <el-select
                disabled
                filterable
                clearable
                placeholder="请选择"
                v-model="detailformBefore.verify.bidModeName"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in bidType"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
          v-if="detailformBefore.verify.lateRegist=='0'"
          label="是否逾期:"
          class="formItem"
        >
          <el-switch
            disabled
            v-model="detailformBefore.verify.lateRegist"
            active-value="0"
            inactive-value="1"
          />
      </el-form-item>
            <el-form-item
              v-if="detailformBefore.verify.lateRegist=='0'"
              label="逾期类型:"
              class="formItem"
            >
              <el-input
                disabled
                v-model="detailformBefore.verify.overdueType"
              />
            </el-form-item>
              <br>
        <el-form-item
          label="资格预审公告发布日期:"
          prop="verify.publishTime"

          :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
        >
          <el-date-picker
            disabled

            value-format="timestamp"
            v-model="detailformBefore.verify.publishTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="资审文件发售截止日期:"
          prop="verify.saleTime"
          :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
        >
          <el-date-picker
            disabled
            value-format="timestamp"
            v-model="detailformBefore.verify.saleTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>

        </el-form-item>

       <el-form-item
         label="递交资格预审申请文件日期:"
         prop="verify.subTime"

         :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
       >

          <el-date-picker
            disabled

            value-format="timestamp"
            v-model="detailformBefore.verify.subTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>

        </el-form-item>


        <br>
         <!-- prop="verify.isCoalitionBid"

           :rules="{
                  required: true, message: '此项不能为空', trigger: 'blur'
                }" -->
         <el-form-item
           label="是否联合体投标:"

         >
          <el-switch
            disabled
            v-model="detailformBefore.verify.isCoalitionBid"
            active-value="是"
            inactive-value="否"
          >
            </el-switch>

      </el-form-item>
        <el-form-item label="内部联合体单位:" :disabled="p.actpoint === 'look'">
          <el-input disabled v-model="detailformBefore.verifyOrgLists" placeholder="内部联合体单位">

          </el-input>
        </el-form-item>

        <el-form-item label="外部联合体单位:">
          <el-input
            disabled
            placeholder=""
            size="mini"
            v-model="detailformBefore.verify.outOrg"
          />

        </el-form-item>

              <div>
                <el-form-item
                  class="neirong"
                  label="资审说明(最多1000字):"
                  prop="verify.verifyExplain"

                  :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
                >
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-input
                    disabled
                    placeholder="请输入"
                    type="textarea"
                    size="mini"
                    v-model="detailformBefore.verify.verifyExplain"
                  />
                </el-form-item>
              </div>
              <div><p class="detail-title"><span  class="uploadSpan">附件: </span>

                </p>
              </div>
              <div>
                  <el-table
                    :data="detailformBefore.commonFilesList"
                    :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                    align="center"
                    border
                    class="contractInfoTable"
                    ref="table"
                    style="width: 98%;height: auto;"
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

                            <el-table-column align="center" :resizable="false" label="大小(KB)" :width="120" prop="fileSize"
                                              show-overflow-tooltip>
                              <template slot-scope="scope">
                                {{(scope.row.fileSize/1024).toFixed(2)}}
                              </template>

                            </el-table-column>
                            <el-table-column align="center" :resizable="false" label="类型" :width="80" prop="fileType"
                                              show-overflow-tooltip>

                            </el-table-column>

                            <el-table-column align="center"
                              :resizable="false"
                              label="操作"
                              show-overflow-tooltip
                              :width="150"
                            >
                              <template slot-scope="scope">
                                <el-link :underline="false" @click="handleDownload(scope.row)" type="warning" :style="(p.actpoint != 'look'&&p.actpoint !== 'task')?'color: #409EFF;margin-right: 33px;':'color: #409EFF;'">下载</el-link>
                                <el-link  v-show="p.actpoint != 'look'&&p.actpoint !== 'task'" :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                              </template>
                            </el-table-column>

                          </el-table>
                </div>
              <p  v-if="detailformBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'" style="overflow:hidden;margin-right: 30px">
                <span style="font-size: 14px">标段信息: </span>
              </p>
              <el-table
                v-if="detailformBefore.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformBefore.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
                :data="detailformBefore.verifySectionList"
                :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
                align="center"
                border
                ref="table"
                style="width: 98%;margin-bottom: 20px "
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
                  prop="verifySection.sectionName"
                  align="center"
                  min-width="500"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column

                  :resizable="false"
                  label="参与投标单位"
                  align="center"
                  prop="verifySectionOrgNameType01"
                  show-overflow-tooltip
                  v-show="p.actpoint != 'look'&&p.actpoint != 'task'"
                  width="500">

          <template slot-scope="scope" v-show="p.actpoint != 'look'&&p.actpoint != 'task'">
            <span  >
              {{scope.row.verifySectionOrgNameType01}}
            </span>
          </template>
        </el-table-column>
        <el-table-column

          :resizable="false"
          label="编标拟配合单位"
          align="center"
          prop="verifySectionOrgNameType02"
          show-overflow-tooltip
          v-show="p.actpoint != 'look'&&p.actpoint != 'task'"
          width="500">

          <template slot-scope="scope" v-show="p.actpoint != 'look'&&p.actpoint != 'task'">

            <span  >
              {{scope.row.verifySectionOrgNameType02}}
            </span>
          </template>
        </el-table-column>
        <el-table-column

          :resizable="false"
          label="投资估算"
          align="center"
          prop="investmentReckon"
          show-overflow-tooltip
          width="260">

          <template slot-scope="scope" >
          <el-input
            disabled
            placeholder=""
            size="mini"
            v-model="scope.row.verifySection.investmentReckon"
          >
          <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
          </el-input>
          </template>
        </el-table-column>
        <el-table-column

          :resizable="false"
          label="其中建安投资"
          align="center"
          prop="jananInvestment"
          show-overflow-tooltip
          v-show="p.actpoint != 'look'&&p.actpoint != 'task'"
          width="260">

          <template slot-scope="scope" >
           <el-input
             disabled
             placeholder=""
             size="mini"
             v-model="scope.row.verifySection.jananInvestment"
           >
          <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
          </el-input>
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
              :model="detailformAfter"
              class="gcform"
              ref="detailformAfter"
              style="background: white;width:calc(100% - 4px);"
            >
             <el-divider content-position="left" class="detailDivider">项目前期信息</el-divider>
              <el-form-item  label="项目名称:"
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
                v-model="detailformAfter.topInfor.inforName"/>
            </el-form-item>

            <el-form-item  label="外文名称:">

              <el-input
                disabled
                clearable
                v-model="detailformAfter.topInfor.inforNameForeign"/>
            </el-form-item>
           <br>
          <div>
            <el-form-item label="项目板块:" class="inline-formitem">
              <template>
                <el-radio-group class="detail-radio-group" disabled v-model="detailformAfter.topInfor.moduleId">
                  <el-radio v-for="(item, index) in projectPlate" :label="item.id" :key="index">{{item.detailName}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            </div>

            <el-form-item
              v-if="detailformAfter.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformAfter.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="工程类别(一级):">
              <el-input
                disabled
                clearable
                filterable
                placeholder="请选择"
                v-model="detailformAfter.topInfor.enginTypeFirstName"
              >
              </el-input>
            </el-form-item>

            <el-form-item
              v-if="detailformAfter.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformAfter.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="工程类别(二级):"
            >
              <el-input
                disabled
                placeholder="工程类别(二级)"
                v-model="detailformAfter.topInfor.enginTypeSecondName"
              >
              </el-input>
            </el-form-item>


            <el-form-item label="所属线路:"
                          v-if="(detailformAfter.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformAfter.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb')&&detailformAfter.topInfor.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'">
              <el-input
                disabled
                v-model="detailformAfter.topInfor.belongLineName"
              >
              </el-input>
            </el-form-item>
            <br>

            <el-form-item
              v-if="detailformAfter.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformAfter.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="项目性质(一级):"
            >
              <el-input
                disabled
                clearable
                filterable
                placeholder="请选择"
                v-model="detailformAfter.topInfor.projectNatureFirstName"
              >
              </el-input>
            </el-form-item>

            <el-form-item
              v-if="detailformAfter.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformAfter.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="项目性质(二级):"
            >
              <el-input
                disabled
                clearable
                filterable
                placeholder="请选择"
                v-model="detailformAfter.topInfor.projectNatureSecondName"
              >
              </el-input>
            </el-form-item>
              <br  v-if="detailformAfter.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformAfter.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailformAfter.topInfor.moduleId==null">
              <el-form-item
                v-if="detailformAfter.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
                label="供应产品"
              >
                <el-input
                  disabled
                  v-model="detailformAfter.topInfor.supplyProductName"
                />
              </el-form-item>
              <el-form-item
                v-if="detailformAfter.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
                label="采购性质:"
              >
                <el-input
                  disabled
                  v-model="detailformAfter.topInfor.purchaseNatureName"
                />
              </el-form-item>
              <br v-if="detailformAfter.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'">

            <el-form-item  label="新兴市场(一级):"
                           prop="topInfor.marketFirstName"
                           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformAfter.topInfor.marketFirstName"
              >
              </el-input>
            </el-form-item>

            <el-form-item  label="新兴市场(二级):"
                           prop="topInfor.marketSecondName"
            >
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformAfter.topInfor.marketSecondName"
              >
              </el-input>
            </el-form-item>
            <br>

              <div class="div-item">
              <el-form-item
                label="装配率(%)"
                v-if="detailformAfter.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"
              >
                <el-input
                  disabled
                  v-model="detailformAfter.topInfor.otherAssemblyRate"
                />
              </el-form-item>

              <el-form-item
                label="装配类型"
                v-if="detailformAfter.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

              >
              <el-input
                  disabled
                  v-model="detailformAfter.topInfor.otherAssemblyType"
                />
              </el-form-item>

            </div>

            <div class="div-item">
              <el-form-item
                label="建筑类型"
                v-if="detailformAfter.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"
              >
              <el-input
                  disabled
                  v-model="detailformAfter.topInfor.otherBuildingType"
                />
              </el-form-item>

              <el-form-item
                label="建筑结构类型"
                v-if="detailformAfter.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"
              >
                <el-input
                  disabled
                  v-model="detailformAfter.topInfor.otherBuildingStructureType"
                />
              </el-form-item>

              <el-form-item
                label="场地名称"
                v-if="detailformAfter.topInfor.marketFirstNameId=='50cd5e9992ac4653920fac8c1f2eb2e3'"
              >
                <el-input
                  disabled
                  v-model="detailformAfter.topInfor.siteName"
                />
              </el-form-item>
            </div>

            <el-form-item
              :label="detailformAfter.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformAfter.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'建设单位:':'客户名称:'"
                          prop="topInfor.constructionOrg"
                           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                v-model="detailformAfter.topInfor.constructionOrg"
              />
            </el-form-item>

              <el-form-item
                v-if="detailformAfter.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformAfter.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailformAfter.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
                label="设计单位:">
              <el-input
                disabled
                v-model="detailformAfter.topInfor.designOrg"
              />
            </el-form-item>
              <br>
            <el-form-item
              v-if="detailformAfter.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
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
                v-model="detailformAfter.topInfor.bidPerson"
              />
            </el-form-item>

            <el-form-item
              v-if="detailformAfter.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="招标代理公司:">
              <el-input
                disabled
                v-model="detailformAfter.topInfor.bidAgentCompany"
              />
            </el-form-item>

            <el-form-item
              v-if="detailformAfter.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              prop="topInfor.planBidTime"
              label="预计招标时间:"
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
                v-model="detailformAfter.topInfor.planBidTime"
              >
              </el-date-picker>
            </el-form-item>
            <br>
            <el-form-item
              prop="topInfor.investment"
              :label="detailformAfter.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformAfter.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'投资额（万元）:':'项目规模:'"
                          :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
             <el-input
               disabled
               placeholder=""
               size="mini"
               v-model="detailformAfter.topInfor.investment"
             >
          <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
          </el-input>
<!--              <el-input-->
<!--                disabled-->
<!--                clearable-->
<!--                placeholder="投资额（万元）:"-->
<!--                v-model="detailformAfter.topInfor.investment"-->
<!--              />-->
            </el-form-item>

            <el-form-item label="资金来源:"
                          prop="capitalName"
                          :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformAfter.capitalName"
              >
              </el-input>
            </el-form-item>

            <el-form-item  label="是否为重大项目:">
              <el-switch

                class="inline-formitem-switch"
                v-model="detailformAfter.topInfor.isMajorProject"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="0"
                inactive-value="1"
                disabled
              >
            </el-switch>
              <!-- <div>
              <el-radio  label="0"
              v-model="detailform.topInfor.bidProbName"
              disabled
              style="margin-right:40px"
              >是</el-radio>
              <el-radio  label="1"
              v-model="detailform.topInfor.bidProbName"
              disabled
              >否</el-radio>
              </div> -->
            </el-form-item>
            <br>

            <el-form-item label="公告类型:"
                          prop="topInfor.noticeTypeName"
                          :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                placeholder="公告类型"
                v-model="detailformAfter.topInfor.noticeTypeName"
              >

              </el-input>
            </el-form-item>

            <el-form-item label="资审方式:">
              <el-input
                disabled
                clearable
                placeholder="资审方式"
                v-model="detailformAfter.topInfor.verifyTypeName"
              />
            </el-form-item>
             <el-form-item
               v-show="detailformAfter.topInfor.investment<maxMoney&&detailformAfter.topInfor.isMajorProject=='0'"
               label="重大项目说明"
             >
              <el-input
                disabled
                v-model="detailformAfter.topInfor.majorProjectExplain"
              />
            </el-form-item>
            <br>
              <!-- 下拉 -->

              <el-form-item   prop="topInfoOrg.projectTrackResponPerson"  class="formItem" label="项目跟踪负责人:"
                              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformAfter.topInfoOrg.projectTrackResponPerson"
              >
              </el-input>
              </el-form-item>

              <el-form-item  class="formItem"  label="联系电话:"
                             prop="topInfoOrg.contactMode"
                  :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformAfter.topInfoOrg.contactMode"
              >
              </el-input>
              </el-form-item>

            <el-form-item  label="预计中标概率:"
                           prop="verify.bidProbName"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformAfter.verify.bidProbName"
              >
              </el-input>
            </el-form-item>


            <div>
            <el-form-item
              class="neirong"
              label="项目内容:"
              style="width: 100%"
            >
              <el-input
                disabled
                type="textarea"
                clearable
                placeholder="请输入"
                v-model="detailformAfter.topInfor.inforContent"
              />
            </el-form-item>
            </div>

               <el-divider content-position="left" class="detailDivider">资审信息</el-divider>

                 <el-form-item
                   label="招标方式:"
                   class="formItem"
                 >
              <el-select
                :class="detailformAfter.verify.bidModeId!=detailformBefore.verify.bidModeId?'changeRed':''"
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                filterable
                clearable
                placeholder="请选择"
                v-model="detailformAfter.verify.bidModeId"
                @change="getName(
                 detailformAfter.verify.bidModeId,
                    bidType,
                    'bidModeName',
                    'bidModeCode'
                )"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in bidType"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
          v-if="detailformAfter.verify.lateRegist=='0'"
          label="是否逾期:"
          class="formItem"
        >
          <el-switch
            disabled
            v-model="detailformAfter.verify.lateRegist"
            active-value="0"
            inactive-value="1"
          />
      </el-form-item>
            <el-form-item
              v-if="detailformAfter.verify.lateRegist=='0'"
              label="逾期类型:"
              class="formItem"
            >
              <el-input
                disabled
                v-model="detailformAfter.verify.overdueType"
              />
            </el-form-item>
            <br>

        <el-form-item
          label="资格预审公告发布日期:"
          prop="verify.publishTime"

          :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
        >
          <el-date-picker
            :class="detailformAfter.verify.publishTime!=detailformBefore.verify.publishTime?'changeRed':''"
            clearable
            :disabled="p.actpoint === 'look'||p.actpoint=='task'"
            value-format="timestamp"
            v-model="detailformAfter.verify.publishTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="资审文件发售截止日期:"
          prop="verify.saleTime"

          :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
        >
          <el-date-picker
            :class="detailformAfter.verify.saleTime!=detailformBefore.verify.saleTime?'changeRed':''"
            @change="ifYq"
            clearable
            :disabled="p.actpoint === 'look'||p.actpoint=='task'"
            value-format="timestamp"
            v-model="detailformAfter.verify.saleTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>

        </el-form-item>

        <el-form-item
         label="递交资格预审申请文件日期:"
         prop="verify.subTime"

         :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
       >

          <el-date-picker
            :class="detailformAfter.verify.subTime!=detailformBefore.verify.subTime?'changeRed':''"
            clearable
            :disabled="p.actpoint === 'look'||p.actpoint=='task'"
            value-format="timestamp"
            v-model="detailformAfter.verify.subTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>

        </el-form-item>


          <br>
                    <!-- prop="verify.isCoalitionBid"
           :rules="{
                  required: true, message: '此项不能为空', trigger: 'blur'
                }" -->
         <el-form-item
           label="是否联合体投标:"

         >
         <el-switch
         :disabled="p.actpoint === 'look'||p.actpoint=='task'"
           v-model="detailformAfter.verify.isCoalitionBid"
           active-value="是"
           inactive-value="否"
           @change="detailformAfter.verify.isCoalitionBid=='否'?(detailformAfter.verifyOrgLists='',detailformAfter.verify.orgName='',detailformAfter.verify.outOrg=''):''"
         >
            </el-switch>
      </el-form-item>
        <el-form-item label="内部联合体单位:">
          <el-input 
          :class="detailformAfter.verify.orgName!=detailformBefore.verify.orgName?'changeRed':''"
          :disabled="p.actpoint === 'look'|| detailformAfter.verify.isCoalitionBid=='否' || detailformAfter.verify.isCoalitionBid==null||p.actpoint=='task'" 
          v-model="detailformAfter.verify.orgName">
            <!--<el-button-->
            <!--v-if="p.actpoint != 'look' &&p.actpoint != 'task'&& detailformAfter.verify.isCoalitionBid != '否' && detailformAfter.verify.isCoalitionBid!=null"-->
            <!--slot="append" icon="el-icon-search" @click="selectOrg()"></el-button>-->
            <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('内部联合体单位',detailformAfter.verify.orgId)"
                       v-if="p.actpoint != 'look'&&p.actpoint != 'task' && detailformAfter.verify.isCoalitionBid != '否' && detailformAfter.verify.isCoalitionBid != null"
            ></el-button>
            <!-- :disabled="p.actpoint === 'look'|| detailformAfter.verify.isCoalitionBid=='否' || detailformAfter.verify.isCoalitionBid==null"  -->
          </el-input>
        </el-form-item>

        <el-form-item  label="外部联合体单位:">
          <el-input
            :class="detailformAfter.verify.outOrg!=detailformBefore.verify.outOrg?'changeRed':''"
            placeholder=""
            :disabled="p.actpoint === 'look'|| detailformAfter.verify.isCoalitionBid=='否' || detailformAfter.verify.isCoalitionBid==null||p.actpoint=='task'"
            size="mini"
            v-model="detailformAfter.verify.outOrg"
          >
            <el-button v-if="p.actpoint != 'look' &&p.actpoint != 'task'&& detailformAfter.verify.isCoalitionBid != '否' && detailformAfter.verify.isCoalitionBid != null" slot="append" icon="el-icon-circle-plus-outline" @click="openComMul(detailformAfter.verify.outOrgId,detailformAfter.verify.outOrg,'/api/contract/Companies/detail/findCompanies','外部联合体单位')"></el-button>
            <!--<el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('外部联合体单位',detailformAfter.verify.outOrgId)"-->
                       <!--v-if="p.actpoint != 'look' &&p.actpoint != 'task'&& detailformAfter.verify.isCoalitionBid != '否' && detailformAfter.verify.isCoalitionBid != null"-->
            <!--&gt;</el-button>-->
          </el-input>

        </el-form-item>

              <div>
                <el-form-item
                  class="neirong"
                  label="资审说明(最多1000字):"
                  prop="verify.verifyExplain"

                  :rules="{
                    required: true,
                    message: '此项不能为空',
                    trigger: 'blur',
                  }"
                >
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-input
                    :class="detailformAfter.verify.verifyExplain!=detailformBefore.verify.verifyExplain?'changeRed':''"
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable
                    placeholder="请输入"
                    type="textarea"
                    size="mini"
                    v-model="detailformAfter.verify.verifyExplain"
                  />
                </el-form-item>
                <el-form-item
                  class="neirong"
                  label="变更原因(最多1000字):"
                  prop="verify.changeReason"
                  :rules="{
                    required: true,
                    message: '此项不能为空',
                    trigger: 'blur',
                  }"
                  style="width: 100%"
                >
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    type="textarea"
                    clearable
                    placeholder="请输入"

                    v-model="detailformAfter.verify.changeReason"
                  />
                </el-form-item>
              </div>
              <div>
                <p class="detail-title"><span  class="uploadSpan">附件: </span>
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-button
                    v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                    size="small"
                    type="primary"
                    @click="openFileUp('/api/contract/topInfo/CommonFiles/verify/01/uploadFile','commonFilesList')">
                    点击上传
                  </el-button>
                  <!--<el-upload-->
                    <!--class="upload-demo detailUpload"-->
                    <!--:action="'/api/contract/topInfo/CommonFiles/verify/01/uploadFile'"-->
                    <!--:on-success="handleChange"-->
                    <!--:on-error="handleChange"-->
                    <!--:on-remove="handleRemove"-->
                    <!--multiple-->
                  <!--&gt;-->
              <!--<el-button size="small" type="primary" v-show="p.actpoint != 'look'">点击上传</el-button>-->
            <!--</el-upload>-->
                </p>
              </div>
               <div>
                  <el-table
                    :data="detailformAfter.commonFilesList"
                    :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                    @selection-change="handleSelectionChange1"
                    align="center"
                    border
                    class="contractInfoTable"
                    ref="table"
                    style="width: 98%;height: auto;"
                  >
                            <el-table-column
                              :width="55"
                              align="center"
                              label="序号"
                              show-overflow-tooltip
                              type="index"
                            ></el-table-column>
                            <el-table-column :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column align="center" :resizable="false" label="大小(KB)" :width="120" prop="fileSize"
                                              show-overflow-tooltip>
                              <template slot-scope="scope">
                                {{(scope.row.fileSize/1024).toFixed(2)}}
                              </template>
                            </el-table-column>
                            <el-table-column  align="center" :resizable="false" label="类型" :width="80" prop="fileType"
                                              show-overflow-tooltip>

                            </el-table-column>

                            <el-table-column align="center"
                              :resizable="false"
                              label="操作"
                              show-overflow-tooltip
                              :width="150"
                            >
                              <template slot-scope="scope">
                                <el-link :underline="false" @click="handleDownload(scope.row)" type="warning" :style="(p.actpoint != 'look'&&p.actpoint !== 'task')?'color: #409EFF;margin-right: 33px;':'color: #409EFF;'">下载</el-link>
                                <el-link  v-show="p.actpoint != 'look'&&p.actpoint !== 'task'" :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                              </template>
                            </el-table-column>
                          </el-table>
                </div>
              <p  v-if="detailformAfter.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformAfter.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'" style="overflow:hidden;margin-right: 30px"><span style="font-size: 14px">标段信息: </span>
                <el-button v-show="p.actpoint != 'look'&&p.actpoint !== 'task'"
                  @click="dialogTopInfoSection = true"
                  size="mini"
                  class="detatil-flie-btn"
                  type="primary"
                >新增
                </el-button>
              </p>

              <el-table
                v-if="detailformAfter.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailformAfter.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
                :data="detailformAfter.verifySectionList"
                :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
                align="center"
                border
                class="clothSizeTable"
                @cell-click="selectOrg1"
                :row-class-name="tableRowClassName"
                ref="table"
                style="width: 98%;margin-bottom: 20px "
              >
                <el-table-column
                  :width="60"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>

                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="标段名"
                  prop="verifySection.sectionName"
                  align="center"
                  min-width="500"
                  show-overflow-tooltip
                >

                </el-table-column>
                <el-table-column

                  :resizable="false"
                  label="参与投标单位"
                  align="center"
                  prop="verifySectionOrgNameType01"
                  show-overflow-tooltip
                  v-show="p.actpoint != 'look'&&p.actpoint !== 'task'"
                  width="500">

          <template slot-scope="scope" v-show="p.actpoint != 'look'&&p.actpoint !== 'task'">
            <span  >
              {{scope.row.verifySectionOrgNameType01}}
            </span>
          </template>
        </el-table-column>
        <el-table-column

          :resizable="false"
          label="编标拟配合单位"
          align="center"
          prop="verifySectionOrgNameType02"
          show-overflow-tooltip
          v-show="p.actpoint != 'look'&&p.actpoint !== 'task'"
          width="500">

          <template slot-scope="scope" v-show="p.actpoint != 'look'&&p.actpoint !== 'task'">

            <span  >
              {{scope.row.verifySectionOrgNameType02}}
            </span>
          </template>
        </el-table-column>
        <el-table-column

          :resizable="false"
          label="投资估算"
          align="center"
          prop="investmentReckon"
          show-overflow-tooltip
          width="260">

          <template slot-scope="scope" >
          <el-input
            :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
            placeholder=""
            size="mini"
            v-model="scope.row.verifySection.investmentReckon"
          >
          <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
          </el-input>
          </template>
        </el-table-column>
        <el-table-column

          :resizable="false"
          label="其中建安投资"
          align="center"
          prop="jananInvestment"
          show-overflow-tooltip

          width="260">

          <template slot-scope="scope" >
           <el-input
             :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
             placeholder=""
             size="mini"
             v-model="scope.row.verifySection.jananInvestment"
           >
          <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
          </el-input>
          </template>
        </el-table-column>
                <el-table-column
                  v-if="p.actpoint != 'look'&&p.actpoint != 'task'"
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  align="center"
                  width="80"
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-link  v-show="p.actpoint != 'look'&&p.actpoint != 'task'"
                      :underline="false"
                      @click="del(scope.$index,scope.row,detailformAfter.verifySectionList,'bd')"
                      type="warning">删除
                    </el-link>
                  </template>
                </el-table-column>
              </el-table>


            </el-form>

          </div>
<!--        <div class="btn-group" v-show="p.actpoint != 'look'">-->
<!--          <el-button type="primary" @click="saveInfo('detailformAfter')">保存</el-button>-->
<!--        </div>-->
        <el-dialog title="前期项目标段列表" :visible.sync="dialogTopInfoSection">
          <el-table
            :data="detailform1.topInfoSectionList"
            :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
            @selection-change="handleSelectionChange"
            :row-class-name="tableSection"
            align="center"
            border
            ref="table"
            style="width: 98%;"
          >
            <el-table-column
              :width="50"
              align="center"
              show-overflow-tooltip
              type="selection"
            ></el-table-column>
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
              min-width="260"
              show-overflow-tooltip
            >

            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTopInfoSection = false">取 消</el-button>
    <el-button type="primary" @click="addSection()">确 定</el-button>
  </span>
        </el-dialog>

      <TreeOrg v-if="treeOrgStatas" ref="addOrUpdate" @getPosition="getTreeOrg"></TreeOrg>
      <TreeOrg v-if="treeOrgStatas1" ref="addOrUpdate1" @getPosition="getTreeOrg1"></TreeOrg>
    <TreeOrg v-if="treeOrgStatas2" ref="addOrUpdate2" @getPosition="getTreeOrg2"></TreeOrg>
      <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
      <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
      <!--多选的单位列表组件-->
      <company-mul v-if="companyMulStatus" ref="comAdd" @getComList="getComList"></company-mul>
    </el-tab-pane>
    <el-tab-pane label="审批流程" name="lc" v-if="p.actpoint == 'task'||p.actpoint == 'look'&&detailformAfter.verify.flowStatus!='edit'&&detailformAfter.verify.flowStatus!=null">
      <Audit-Process :task="p.task||{businessId:(p.changRecorUUid+'-'+p.topinfoid),businessType:'contract_qual_change'}"></Audit-Process>
    </el-tab-pane>
  </el-tabs>
 </div>
</template>

<script>
import TreeOrg from '@/components/treeOrg'
import AuditProcess from '@/components/auditProcess'
import FileUpload from '@/components/fileUpload'
import CompanyTree from '../contractManager/companyTree'
import companyMul from '@/components/companiesMultiple'
export default {
  // name: '详情',
  components: {
    TreeOrg,
    AuditProcess,
    FileUpload,
    CompanyTree,
    companyMul,//多选的单位列表组件
  },
  data() {
    return {
      companyMulStatus:false,//设计单位等多选列表状态
      DwVisible:false,//选择单位弹框状态
      uploadVisible:false,//上传附件组件状态
      activeName:"after",
      maxMoney:1000000,
      treeOrgStatas: false,
      treeOrgStatas1: false,
      treeOrgStatas2: false,
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      detailformBefore: {
        'verify': {
          bidModeName: '',
          isCoalitionBid: '',
          verifyTypeName: '',
          verifyExplain: '',
          saleTime: '',
          subTime: '',
          designOrg: '',
          publishTime: '',
          flowStatus: ''
        },
        'topInfor': {},
        'topInfoOrg':{},
        'sectionStr': [],
        'verifySectionList': [],
        'verifyOrgList': [],
        verifyOrgLists:"111",
        commonFilesList:[]
      },
      detailformAfter: {
        'verify': {
          bidModeName: '',
          isCoalitionBid: '',
          verifyTypeName: '',
          verifyExplain: '',
          saleTime: '',
          subTime: '',
          designOrg: '',
          publishTime: '',
          flowStatus: ''
        },
        'topInfor': {
          noticeTypeName:'',
          marketSecondName:''
        },
        'topInfoOrg':{},
        'sectionStr': [],
        'verifySectionList': [],
        'verifyOrgList': [],
        verifyOrgLists:"111",
        commonFilesList:[]

      },
      detailform1: {
        topInfor: {},
        topInfoOrg: {},
        topInfoSiteList: [],
        topInfoSectionList: [],
      },
      coalitionBid:[
        {
          id:'是',
          detailName:'是'
        },
        {
          id:'否',
          detailName:'否'
        }
      ],//联合投标选择
      dialogTopInfoSection: false,
      myVerifySection:{},
      myVerifySection1:{},
      multipleSelection:[],
      multipleSelection1:[]

    }
  },
  computed: {
    topInfoSectionList(){
      return this.detailform1.topInfoSectionList.filter((data) => {
        return data.isTrack== '1'
      })
    },
    bidType() {
      return this.$store.state.bidType
    },
    yesOrNo() {
      return this.$store.state.yesOrNo
    },
    projectPlate(){
      return this.$store.state.projectPlate;
    },

  },
  methods: {
    //打开多选的单位列表
    openComMul(ids,names,url,type){
      this.companyMulStatus=true;
      this.$nextTick(() => {
        this.$refs.comAdd.init(ids,names,url,type);
      })
    },
    //获取拿过来的多选单位列表
    getComList(data){
      console.log(data)
      this.$forceUpdate();
      if(data.type=='外部联合体单位'){
        this.detailformAfter.verify.outOrgId=data.selIdList.join(",");
        this.detailformAfter.verify.outOrg=data.selList.join(",");
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
      this.$forceUpdate();
      var id=[],name=[];
      if(data&&data.type!='参与投标单位'&&data.type!='编标拟配合单位'){
        data.forEach((item)=>{
          id.push(item.id);
          name.push(item.detailName);
        })
      }
      if(data.type=="内部联合体单位"){
        this.detailformAfter.verify.orgId=id.join(",");
        this.detailformAfter.verify.orgName=name.join(",");
      }else if(data.type=="外部联合体单位"){
        this.detailformAfter.verify.outOrgId=id.join(",");
        this.detailformAfter.verify.outOrg=name.join(",");
      }else if(data.type=='参与投标单位'){
        var _list=[];
        data.forEach((item)=>{
          _list.push({ orgId:item.id,orgName:item.detailName,orgType:"01"});
          name.push(item.detailName);
        })
        this.detailformAfter.verifySectionList[data.index].verifySectionOrgNameType01=name.join(",");
        this.detailformAfter.verifySectionList[data.index].verifySectionOrgListType01=_list;
        this.$set(this.detailformAfter.verifySectionList,this.detailformAfter.verifySectionList);
      }else if(data.type=="编标拟配合单位"){
        var _list=[];
        data.forEach((item)=>{
          _list.push({ orgId:item.id,orgName:item.detailName,orgType:"02"});
          name.push(item.detailName);
        })
        this.detailformAfter.verifySectionList[data.index].verifySectionOrgNameType02=name.join(",");
        this.detailformAfter.verifySectionList[data.index].verifySectionOrgListType02=_list;
        this.$set(this.detailformAfter.verifySectionList,this.detailformAfter.verifySectionList);
      }
      this.DwVisible=false;
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
      this.detailformAfter[data.list]=this.detailformAfter[data.list].concat(data.fileList);
      this.uploadVisible = false;
    },

      //获取下拉框id和name的公共方法
      getName(id, list, name,code) {
          if(id){
              this.$forceUpdate()
              this.detailformAfter.verify[name] = list.find(
                  (item) => item.id == id
              ).detailName;
              this.detailformAfter.verify[code] = list.find(
                  (item) => item.id == id
              ).detailCode;
              console.log(this.detailformAfter.topInfor[name]);
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
              '/api/contract/topInfo/Verify/changeProcess/'+type,
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
    selectOrg(){
      this.treeOrgStatas = true;
      console.log(this.positionIndex);
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    getTreeOrg(data) {

      console.log(data)
      this.treeStatas = false;
      this.detailformAfter.verifyOrgList=[];
      var resultStr = "";
      data.forEach((item, index) => {

        var verifyOrg={ orgId:item.name,orgName:item.name};
        this.detailformAfter.verifyOrgList.push(verifyOrg)
        resultStr+=item.name+",";
      });
      this.detailformAfter.verifyOrgLists =resultStr.substring(0,resultStr.length-1);
      console.log(this.detailformAfter.verifyOrgLists)
      // this.key = this.key + 1;
    },
    getTreeOrg1(data) {

      console.log(data)
      this.treeStatas1 = false;

      var resultStr = "";
      this.myVerifySection.verifySectionOrgList= [];
      console.log(this.myVerifySection)
      data.forEach((item, index) => {

        var VerifySectionOrg={ orgId:item.name,orgName:item.name,orgType:"01"};
        this.myVerifySection.verifySectionOrgList.push(VerifySectionOrg)
        resultStr+=item.name+",";
      });
      // this.detailformAfter.verifySectionList[this.myVerifySection.index]={
      //   verifySectionOrgName:resultStr.substring(0,resultStr.length-1),
      //   verifySectionOrgList:this.myVerifySection.verifySectionOrgList
      // };
      this.detailformAfter.verifySectionList[this.myVerifySection.index].verifySectionOrgNameType01
        =resultStr.substring(0,resultStr.length-1);
      this.detailformAfter.verifySectionList[this.myVerifySection.index].verifySectionOrgListType01=this.myVerifySection.verifySectionOrgList;
      //this.detailformAfter.verifySectionList[this.myVerifySection.index].verifySectionOrgList=this.myVerifySection.verifySectionOrgList;
      // this.detailformAfter.verifyOrgLists=resultStr;
      // alert(this.detailformAfter.verifyOrgLists);
      console.log(this.detailformAfter.verifySectionList)
      this.$forceUpdate();
      // this.key = this.key + 1;
    },
    getTreeOrg2(data) {

      console.log(data)
      this.treeOrgStatas2 = false;

      var resultStr = "";
      this.myVerifySection1.verifySectionOrgList= [];
      data.forEach((item, index) => {

        var VerifySectionOrg={ orgId:item.name,orgName:item.name,orgType:"02"};
        this.myVerifySection1.verifySectionOrgList.push(VerifySectionOrg)
        resultStr+=item.name+",";
      });
      this.detailformAfter.verifySectionList[this.myVerifySection1.index].verifySectionOrgNameType02
        =resultStr.substring(0,resultStr.length-1);
      this.detailformAfter.verifySectionList[this.myVerifySection1.index].verifySectionOrgListType02=this.myVerifySection1.verifySectionOrgList;
      // this.detailform.verifyOrgLists=resultStr;
      // alert(this.detailform.verifyOrgLists);
      console.log(this.detailformAfter.verifySectionList)
      // this.key = this.key + 1;
    },
    selectOrg1(row, column, cell, event){
      if (this.p.actpoint === 'look') {
        return false
      }
      if(column.label==="参与投标单位")
      {
        // this.myVerifySection=row;
        // this.treeOrgStatas1 = true;
        // console.log(this.positionIndex);
        // this.$nextTick(() => {
        //   this.$refs.addOrUpdate1.init()
        // })
        var id=[];
        if(row.verifySectionOrgListType01!=''){
          row.verifySectionOrgListType01.forEach((item)=>{
            id.push(item.orgId)
          });
        }
        this.addDw('参与投标单位',id.join(","),true,row.index,'verifySectionList')
      }else if(column.label==="编标拟配合单位") {
        // this.myVerifySection1 = row;
        // this.treeOrgStatas2 = true;
        // //console.log(this.positionIndex);
        // this.$nextTick(() => {
        //   this.$refs.addOrUpdate2.init()
        // })
        var id=[];
        if(row.verifySectionOrgListType02!=''){
          row.verifySectionOrgListType02.forEach((item)=>{
            id.push(item.orgId)
          });
        }
        this.addDw('编标拟配合单位',id.join(","),true,row.index,'verifySectionList')
      }

    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
      if (row.verifySection.isDelete == '1') {
        return 'none-show';
      } else {
        return '';
      }
    },
    back() {
      this.$router.back()
      // this.$router.push({
      //   path: "/manage/proposal/list",
      // });
    },
    //判断是否逾期
    ifYq(){
      if(this.detailformAfter.verify.saleTime||this.detailformAfter.verify.subTime){
        if(this.detailformAfter.verify.saleTime>=this.detailform1.topInfoOrg.flowTime){
          this.detailformAfter.verify.lateRegist='1';
          if(this.detailformAfter.verify.subTime<this.detailform1.topInfoOrg.flowTime){
            this.detailformAfter.verify.lateRegist='0';
            this.detailformAfter.verify.overdueType='资审登记逾期';
          }
        }else{
          this.detailformAfter.verify.lateRegist='0';
          this.detailformAfter.verify.overdueType=this.detailformAfter.verify.saleTime<this.detailform1.topInfoOrg.flowTime?'跟踪逾期':this.detailformAfter.verify.subTime<this.detailform1.topInfoOrg.flowTime?'资审登记逾期':''
        }
      }
    },
    //判断是否逾期
    ifYqBefore(){
      if(this.detailformBefore.verify.saleTime||this.detailformBefore.verify.subTime){
        if(this.detailformBefore.verify.saleTime>=this.detailform1.topInfoOrg.flowTime){
          this.detailformBefore.verify.lateRegist='1';
          if(this.detailformBefore.verify.subTime<this.detailform1.topInfoOrg.flowTime){
            this.detailformBefore.verify.lateRegist='0';
            this.detailformBefore.verify.overdueType='资审登记逾期';
          }
        }else{
          this.detailformBefore.verify.lateRegist='0';
          this.detailformBefore.verify.overdueType=this.detailformBefore.verify.saleTime<this.detailform1.topInfoOrg.flowTime?'跟踪逾期':this.detailformBefore.verify.subTime<this.detailform1.topInfoOrg.flowTime?'资审登记逾期':''
        }
      }
    },
    saveInfo(formName,type) {
      //alert(formName);
      //alert(this.$refs.formName.validate())

        var url='';
        if(type=='save'){
          url=`/api/contract/topInfo/Verify/detail/${this.p.actpoint === "add"? "saveChange": "updateChangeRecord"}`
          this.detailformAfter.verify.flowStatus = "edit";
        }else{
          url="/api/contract/topInfo/Verify/changeProcess/start";
          this.detailformAfter.verify.flowStatus = "check";
        }
      if(this.detailformAfter.verify.publishTime > this.detailformAfter.verify.saleTime){
        this.$message.error("资格预审公告发布日期不能大于资审文件发售截止日期");
        return false;
      }
      if(this.detailformAfter.verify.publishTime > this.detailformAfter.verify.subTime){
        this.$message.error("资格预审公告发布日期不能大于递交资格预审申请文件日期");
        return false;
      }
      if(this.detailformAfter.commonFilesList.length==0){
        this.$message.error("附件必须上传");
        return false;
      }
      if(this.detailformAfter.verifySectionList.length==0){
        this.$message.error("标段信息不能为空");
        return false;
      }
      this.detailformAfter.verifyOrgList=[{orgId:this.detailformAfter.verify.orgId,orgName:this.detailformAfter.verify.orgName}];
      this.$refs[formName].validate((valid) => {
        //alert(valid);
        if (valid) {
          //alert(JSON.stringify(this.detailform));
          // console.log(JSON.stringify(this.detailformAfter));

          this.$http
            .post(
              // "/api/contract/topInfo/Verify/detail/saveChange",
              url,
              //JSON.stringify(this.detailformAfter),
                {
                    'afterVerifyBO':this.detailformAfter,
                    'beforeVerifyBO':this.detailformBefore
                },
              {useJson: true}
            )
            .then((res) => {
              if (res.data.msg === "SUCCESS") {
                this.$message({
                  message:  `${type=='save'?'保存':'提交'}成功`,
                  type: "success",
                });
                if (type=='save') {
                  // this.detailform.verify.uuid = res.data.data.verify.uuid
                }else{
                  this.$router.back();
                }
                // this.$refs[formName].resetFields();
                // this.$router.push({
                //   path: "/manage/verify/listChange",
                // });
              }

            });
        } else {
          this.$message.error("请添加必填项");
          return false;
        }
      });
    },
    pageGo() {
      this.searchParam.current = this.current
      this.getuserlist()
    },
    showinputchg() {
    },
    partchg(row) {
      row.showinput = false
    },
    del(index,item,list,type) {
      this.$confirm('确认删除该标段吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(list.length == 1){
          this.$message({
            type: 'info',
            message: '必须保留一个标段'
          });
        }else{
          if(item.verifySection.uuid!=''){
            item.verifySection.isDelete='1';
            // this.detailform.verifySectionList=list.filter((item)=> item.verifySection.isDelete!='1')
            // console.log(this.detailform.verifySectionList)
            this.verifySectionListSplit=list.splice(index, 1);
            // list.splice(index, 1);
            this.$set(this.detailformAfter,this.detailformAfter)
          }else{
            list.splice(index, 1);
          }
          // this.$set(this.detailform.verifySectionList,list);
          this.$forceUpdate();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

      // console.log(index);
      // list.splice(index, 1);

    },
    addSection()
    {
      this.dialogTopInfoSection = false;
      this.multipleSelection.forEach((item, index) => {
        console.log(item.uuid)
        console.log(index)

        var vsl = {
          sectionId: item.uuid,
          verifyId:this.detailformAfter.verify.uuid,
          sectionName: item.sectionName
        }
        var vsBo={
          verifySection:{},
          verifySectionOrgListType01:[],
          verifySectionOrgNameType01:'',
          verifySectionOrgListType02:[],
          verifySectionOrgNameType02:''
        }
        var isadd = true;
        this.detailformAfter.verifySectionList.forEach((item1, index1) => {
          if (item.uuid == item1.verifySection.sectionId) {
            isadd = false;
          }
        })
        if (isadd) {
          vsBo.verifySection=vsl;
          this.detailformAfter.verifySectionList.push(vsBo);
        } else {
          this.$message.error('请不要重复添加')
        }
      });
    },

    show(type) {
      let p1 = {actpoint: 'add', instid: this.p.topinfoid}
      this.$router.push({
        path: '../list_Section/',
        query: {p: this.$utils.encrypt(JSON.stringify(p1))}
      })
    },
    resetinfo() {
      this.sizeform = {
        'id': '',
        'part': '',
        showinput: true

      }
    },
    handleClose(done) {
      this.resetform('form')
      done()
    },
    resetform(formName) {
      this.$refs[formName].resetFields()
    },
    //上传附件
    handleChange(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            console.log(response.data)
            console.log( JSON.stringify(this.detailformAfter.commonFilesList))
            console.log( JSON.stringify(this.detailformAfter))
            if(response.data.uuid!=null) {
              //var list =[];
              //this.detailformAfter.commonFilesList = list;
              var commonFile = {

                uuid: response.data.uuid,
                businessId: response.data.businessId,
                businessType: response.data.businessType,
                businessCode: response.data.businessCode,
                fileName: response.data.fileName,
                fileType: response.data.fileType,
                fileSize: response.data.fileSize,
                filePath: response.data.filePath,
                remarks: response.data.remarks,
                createTime: response.data.createTime,
                createUserId: response.data.createUserId,
                createUserName: response.data.createUserName,
                createOrgId: response.data.createOrgId,
                createOrgName: response.data.createOrgName
              }
              if(this.detailformAfter.commonFilesList==null)
              {
                var list =[];
                list.push(commonFile);
                this.detailformAfter.commonFilesList = list;
              }else {
                this.detailformAfter.commonFilesList.push(commonFile);
              }
              // this.detailformAfter.commonFilesList.push(commonFile);
            }
            console.log( JSON.stringify(this.detailformAfter.commonFilesList))
          }
        })
      } else {
        this.$message.error(response.msg)
      }
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val
    },
    
    tableSection({ row, rowIndex }){
      if(this.detailform1.topInfoSectionList[rowIndex] != null && this.detailform1.topInfoSectionList[rowIndex].isTrack === "0"){
        return "none-show"
      }else{
        return "";
      }
    },
    //加载本页面数据


    // 加载列表
    getDetail() {

      if(this.p.actpoint=="add") {


        //alert(this.p.topinfoid);
        this.$http
          .post(
            '/api/contract/topInfo/Verify/detail/entityInfo',
            // '/api' + this.$route.path.substr(0, this.$route.path.length - 1),
            {"id": this.p.topinfoid}
          )
          .then(res => {
            this.detailformBefore = res.data.data;
            var datas=res.data.data;
            // this.detailformAfter = res.data.data
            this.detailformBefore.verify.orgId=datas.verifyOrgList[0].orgId;
            this.detailformBefore.verify.orgName=datas.verifyOrgList[0].orgName;
            for(var i in this.detailformBefore){
              this.detailformAfter[i]=JSON.parse(JSON.stringify(this.detailformBefore[i]));
            }
                
            this.ifYq();
            this.ifYqBefore();
            // alert( JSON.stringify(this.detailformAfter.verifySectionList))
          })
      }else
      {

        this.$http
          .post(
            '/api/contract/topInfo/Verify/detail/entityInfoChange',
            // '/api' + this.$route.path.substr(0, this.$route.path.length - 1),
            // {"id": this.uuid}
             {"id": this.p.task?this.p.instid.split("-")[0]:this.p.changRecorUUid}
          )
          .then(res => {
            var data = res.data.data;
            data.forEach((item, index) => {
              //alert(item.verify.changeStatus)
              if(item.verify.changeStatus==1) // 第一个是之前
              {
                this.detailformBefore =item;
                this.ifYqBefore();
              }else if(item.verify.changeStatus==2) // 第二个是之后
              {
                this.detailformAfter =item
                this.detailformAfter.topInfor.noticeTypeName=item.topInfor.noticeTypeName;
                this.detailformAfter.verify.orgId=item.verifyOrgList[0].orgId;
                this.detailformAfter.verify.orgName=item.verifyOrgList[0].orgName;
                this.ifYq();
                console.log( this.detailformAfter)
              }
            })



            //alert( JSON.stringify(this.detailform))
          })
      }
    },
    getTopInforDetail() {

      this.$http
        .post("/api/contract/topInfo/TopInfor/detail/entityInfo",
        // {topOrgId: this.p.topinfoid})
        {topOrgId: this.p.task?this.p.instid.split("-")[1]:this.p.topinfoid})
        .then((res1) => {
          var datas = res1.data.data;
          this.detailform1 = {
            topInfor: datas.topInfor,
            topInfoOrg: datas.topInfoOrg,
            topInfoSiteList: datas.topInfoSiteList,
            topInfoSectionList: datas.topInfoSectionList,
          }
        this.ifYq();
        this.ifYqBefore();
          //alert( JSON.stringify(this.detailform1.topInfoSiteList))
        });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleRemove(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.detailformAfter.commonFilesList.splice(index,1);
          }

        });
      console.log(this.detailformAfter.commonFilesList)
    },
    // 下载
    handleDownload(file) {
      var uuid = file.uuid;
      this.$http
        .post(
          '/api/contract/topInfo/CommonFiles/detail/downloadFile',
          {uuid:uuid},
          { responseType:'blob' }
        )
        .then((res) => {
          const content = res.data;
          const blob = new Blob([content])
          let url = window.URL.createObjectURL(blob);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', file.fileName);
          document.body.appendChild(link);
          link.click();
        })
        // window.open('/api/contract/topInfo/CommonFiles/detail/downloadFile?uuid='+ uuid);
    }

  },
  mounted() {
    //alert(2);
    this.$store.dispatch('getConfig', { })
    // eslint-disable-next-line no-unde
    console.log(this.p)
    this.getDetail()
    this.getTopInforDetail();

  }
}
</script>
<style lang="scss" scoped>
    .div-item >>>.el-form-item{
      display: inline-block;
      width: 32.5%!important;
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
  >.el-form-item,>>>.formItem{

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

>>>.el-form-item__label{
  width: auto;
}
.uploadSpan{
  font-size: 16px;
  color: #303133;
}
.neirong >>>.el-form-item__error
{
  padding-top:0px !important;
}
    >>>.none-show{
      display: none!important;
    }

    
  .changeRed >>>input,.changeRed >>>select,.changeRed >>>textarea,.changeRed{
    color:red!important;
  }
</style>

