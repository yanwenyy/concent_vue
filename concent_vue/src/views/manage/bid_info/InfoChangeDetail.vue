<template>
<div style="position: relative">
  <!-- <el-button class="detail-back-tab detailbutton save-btn" type="primary" @click="saveInfo('detailform')" v-if="p.actpoint!='look'">保存</el-button>
  <el-button class="detail-back-tab detailbutton sub-btn" @click="submit" v-if="p.actpoint!='look'">提交</el-button>
  <el-button class="detail-back-tab detailbutton" @click="back"  type="text">返回</el-button> -->
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.bidInfo.flowStatus=='notpass'||detailform.bidInfo.flowStatus=='check')" @click="saveInfo('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" class="detail-back-tab detailbutton save-btn" type="primary" @click="saveInfo('detailform','save')">保存</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <el-button  class="detail-back-tab detailbutton" @click="back" type="text">返回</el-button>

  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane label="变更前" name="before">

      <div class="detailBoxBG">
        <el-divider content-position="left" class="detailDivider">项目前期信息</el-divider>
        <!--<div class="detailBox">-->
        <el-form
        :inline="false"
        :model="detailFormBefore"
        class="gcform"
        ref="detailform">
          <el-form-item label="项目名称:"
           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.inforName"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="外文名称:">

            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.inforNameForeign"
              disabled
            ></el-input>
          </el-form-item>
          <br>


          <el-form-item label="项目板块:"
           class="inline-formitem"
           style="width:100%"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
              <template >
                <el-radio-group class="detail-radio-group" disabled v-model="detailform.topInforBO.topInfor.moduleId">
                  <el-radio v-for="(item, index) in projectPlate" :label="item.id" :key="index">{{item.detailName}}</el-radio>
                </el-radio-group>
              </template>
            <!-- <el-input
              v-model="detailFormBefore.topInforBO.topInfor.moduleName"
              disabled
            ></el-input> -->
          </el-form-item>

          <br>

          <el-form-item
            v-if="detailFormBefore.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            label="工程类别(一级):">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.enginTypeFirstName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="detailFormBefore.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            label="工程类别(二级):">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.enginTypeSecondName"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="所属线路:"
          v-if="(detailFormBefore.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb')&&detailFormBefore.topInforBO.topInfor.enginTypeFirstName=='17ff5c08d36b41ea8f2dc2e9d3029cac'">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.belongLineName"
              disabled
            ></el-input>
          </el-form-item>

          <br>
          <el-form-item
            v-if="detailFormBefore.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            label="项目性质(一级):">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.projectNatureFirstName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="detailFormBefore.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            label="项目性质(二级):">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.projectNatureSecondName"
              disabled
            ></el-input>
          </el-form-item>

          <br v-if="detailFormBefore.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailFormBefore.topInforBO.topInfor.moduleId==null">
          <el-form-item
            v-if="detailFormBefore.topInforBO.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
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

              v-model="detailFormBefore.topInforBO.topInfor.supplyProductName"
            />
          </el-form-item>
          <el-form-item
            v-if="detailFormBefore.topInforBO.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
            label="采购性质:"
            prop="topInfor.purchaseNatureId"
          >
            <el-input
              disabled

              v-model="detailFormBefore.topInforBO.topInfor.purchaseNatureName"
            />
          </el-form-item>
          <br v-if="detailFormBefore.topInforBO.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'">
          <el-form-item label="新兴市场(一级):"
                        :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.marketFirstName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="新兴市场(二级):"
           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.marketSecondName"
              disabled
            ></el-input>
          </el-form-item>
          <br>

            <div class="div-item">
              <el-form-item
                label="装配率(%):"

                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
                v-if="detailFormBefore.topInforBO.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"
              >
                <el-input
                  disabled
                  v-model="detailFormBefore.topInforBO.topInfor.otherAssemblyRate"
                />
              </el-form-item>

              <el-form-item
                label="装配类型:"

                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
                v-if="detailFormBefore.topInforBO.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

              >
              <el-input
                  disabled
                  v-model="detailFormBefore.topInforBO.topInfor.otherAssemblyType"
                />
              </el-form-item>
            </div>

            <div class="div-item">
              <el-form-item
                label="建筑类型:"

                :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
                v-if="detailFormBefore.topInforBO.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

              >
              <el-input
                  disabled
                  v-model="detailFormBefore.topInforBO.topInfor.otherBuildingType"
                />
              </el-form-item>

              <el-form-item
                label="建筑结构类型:"

                :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
                v-if="detailFormBefore.topInforBO.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

              >
                <el-input
                  disabled
                  v-model="detailFormBefore.topInforBO.topInfor.otherBuildingStructureType"
                />
              </el-form-item>

              <el-form-item
                label="场地名称:"

                :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
                v-if="detailFormBefore.topInforBO.topInfor.marketFirstNameId=='50cd5e9992ac4653920fac8c1f2eb2e3'"
              >
                <el-input
                  disabled
                  v-model="detailFormBefore.topInforBO.topInfor.siteName"
                />
              </el-form-item>
            </div>

          <el-form-item
            :label="detailFormBefore.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'建设单位:':'客户名称:'"
           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.constructionOrg"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item
            v-if="detailFormBefore.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailFormBefore.topInforBO.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'||detailFormBefore.topInforBO.topInfor.moduleId==null"
            label="设计单位:">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.designOrg"
              disabled
            ></el-input>
          </el-form-item>
          <br>
          <el-form-item label="公告类型:"
                        :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.noticeTypeName"
              disabled
            ></el-input>
          </el-form-item>
          <!-- 下拉 -->
          <el-form-item label="资审方式:">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.verifyTypeName"
              disabled
            ></el-input>
          </el-form-item>
          <br>
          <el-form-item label="招标人:"
                        v-if="detailFormBefore.topInforBO.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.bidPerson"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item
            v-if="detailFormBefore.topInforBO.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
            label="招标代理公司:">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.bidAgentCompany"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item
            v-if="detailFormBefore.topInforBO.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
            label="预计招标时间:"
           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
            <el-date-picker
              :disabled="true"
              filterable
              clearable
              type="date"
              value-format="timestamp"
              v-model="detailFormBefore.topInforBO.topInfor.planBidTime"
            >
            </el-date-picker>
          </el-form-item>
          <br>
          <el-form-item
            :label="detailFormBefore.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'投资额（万元）:':'项目规模:'"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-input
              v-model="detailFormBefore.topInforBO.topInfor.investment"
              disabled
            >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
            </el-input>
          </el-form-item>

          <el-form-item label="资金来源:"
           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
            <el-input
              v-model="detailFormBefore.topInforBO.capitalName"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="是否为重大项目:"
          class="inline-formitem formItem"
           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
            <el-switch

              class="inline-formitem-switch"
              v-model="detailFormBefore.topInforBO.topInfor.isMajorProject"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
              disabled
            >
            </el-switch>
            <!-- <div>
              <el-radio  label="0"
              v-model="detailFormBefore.topInforBO.topInfor.isMajorProject"
              disabled
              style="margin-right:40px"
              >是</el-radio>
              <el-radio  label="1"
              v-model="detailFormBefore.topInforBO.topInfor.isMajorProject"
              disabled
              >否</el-radio>
          </div> -->
          </el-form-item>
          <el-form-item
            v-show="detailFormBefore.topInforBO.topInfor.investment<maxMoney&&detailFormBefore.topInforBO.topInfor.isMajorProject=='0'"
            label="重大项目说明"
          >
            <el-input
              clearable
              placeholder=""
              disabled
              v-model="detailFormBefore.topInforBO.topInfor.majorProjectExplain"
            />
          </el-form-item>

          <br>
          <!-- 下拉 -->


          <!-- --------------------------------------------------------------- -->
            <el-form-item label="项目跟踪负责人:"
             :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
              <el-input
                v-model="detailFormBefore.topInforBO.topInfoOrg.projectTrackResponPerson"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话:"
             :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
              <el-input
                v-model="detailFormBefore.topInforBO.topInfoOrg.contactMode"
                disabled
              ></el-input>
            </el-form-item>

          <el-form-item label="预计中标概率:"
           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
            <el-input
              v-model="detailFormBefore.topInforBO.topInfoOrg.bidProbName"
              disabled
            ></el-input>
          </el-form-item>


          <el-form-item class="neirong" label="项目内容:">
            <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
            <el-input
              :disabled="true"
              type="textarea"
              clearable
              placeholder="请输入"
              v-model="detailFormBefore.topInforBO.topInfor.inforContent"
            />
          </el-form-item>
         <div>
<el-divider content-position="left" class="detailDivider">投标信息</el-divider>
          <el-form-item label="招标方式:">
                <el-select
                  disabled
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="detailFormBefore.bidInfo.bidModeName"
                >
                  <el-option

                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in bidType"
                  ></el-option>
                </el-select>
          </el-form-item>
          <br>

          <el-form-item label="招标公告发布日期:"
          class="formItem"
           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
              <el-date-picker
                disabled
                filterable
                clearable
                value-format="timestamp"
                v-model="detailFormBefore.bidInfo.publishTime"
              >
              </el-date-picker>
          </el-form-item>

          <el-form-item label="招标文件发售截止日期:">
                <el-date-picker
                  disabled
                  value-format="timestamp"
                  filterable
                  clearable
                  v-model="detailform.bidInfo.saleTime"
                >
                </el-date-picker>
          </el-form-item>

          <el-form-item label="投标截止日期:"
           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
                <el-date-picker
                  disabled
                  value-format="timestamp"
                  clearable
                  filterable
                  v-model="detailFormBefore.bidInfo.endTime"
                >
                </el-date-picker>
          </el-form-item>
<br>

          <el-form-item label="是否为费率招标:"
          class="inline-formitem formItem">
           <!-- :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }" -->
            <el-switch
              class="inline-formitem-switch"
              v-model="detailFormBefore.bidInfo.isBidRates"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
              disabled
            >
            </el-switch>
          </el-form-item>

          <el-form-item label="是否联合体投标:"
          class="inline-formitem formItem">
           <!-- :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }" -->
            <el-switch
              class="inline-formitem-switch"
              v-model="detailFormBefore.bidInfo.isCoalitionBid"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
              disabled

            >
            </el-switch>
          </el-form-item>
<br>

          <el-form-item label="内部联合体单位:">
          <el-input disabled  placeholder="请输入内容" v-model="detailFormBefore.bidInfo.innerOrgName" class="input-with-select">
          </el-input>
          </el-form-item>

          <el-form-item label="外部联合体单位:">
            <el-input
              v-model="detailFormBefore.bidInfo.outOrg"
              disabled
            ></el-input>
          </el-form-item>
</div>

          <el-form-item class="neirong" label="投标说明(最多1000字):">
            <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
            <el-input
              :disabled="true"
              type="textarea"
              clearable
              placeholder="请输入"
              v-model="detailFormBefore.bidInfo.bidExplain"
            />
          </el-form-item>

          <el-row>
            <p><span >附件: </span>
                <el-upload
                  class="upload-demo detailUpload"
                  :action="'/api/contract/topInfo/CommonFiles/bidInfo/01/uploadFile'"
                  :on-success="handleChange"
                  :on-error="handleChange"
                  :on-remove="handleRemove"
                  :show-file-list="false"
                  :file-list="detailFormBefore.bidInfo_01"
                  disabled
                  multiple
                >
                  <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                </el-upload>
              </p>
<el-table
                :data="detailFormBefore.bidInfo_01"
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

                <el-table-column align="center" :resizable="false" label="大小" prop="fileSize" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

                </el-table-column>

                <!-- <el-table-column
                  align="center"
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  show-overflow-tooltip
                  v-if="p.actpoint!=='look'"
                  width="60"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column> -->
              </el-table>
          </el-row>
          <el-row>
            <p><span >开标记录（最大10MB）: </span>
                <el-upload
                  class="upload-demo detailUpload"
                  :action="'/api/contract/topInfo/CommonFiles/bidInfo/02/uploadFile'"
                  :on-success="handleChange_02"
                  :on-error="handleChange_02"
                  :on-remove="handleRemove_02"
                  :show-file-list="false"
                  :file-list="detailFormBefore.bidInfo_02"
                  disabled
                  multiple
                >
                  <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                </el-upload>
              </p>
              <el-table
                :data="detailFormBefore.bidInfo_02"
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

                <el-table-column align="center" :resizable="false" label="大小" prop="fileSize" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

                </el-table-column>

                <!-- <el-table-column
                  align="center"
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  show-overflow-tooltip
                  v-if="p.actpoint!=='look'"
                  width="60"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column> -->
              </el-table>
          </el-row>

          <p v-if="detailFormBefore.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'" class="detail-title" style="overflow: hidden；">
            <span style="float: left">标段信息:</span>
          </p>
          <el-table
            v-if="detailFormBefore.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailFormBefore.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
          :key="key"
          @row-dblclick="openBd('look')"
            :data="detailFormBefore.bidInfoSectionList"
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
              label="标段名称"
              prop="bidInfoSection.sectionName"
              align="center"
              :width="180"
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="风险费(万元)"
              align="center"
              prop="bidInfoSection.riskFee"
              show-overflow-tooltip
              :width="180"
              v-if="detailFormBefore.bidInfo.isBidRates==='1'||detailFormBefore.bidInfo.isBidRates ==null"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="安全费(万元)"
              prop="bidInfoSection.safetyCost"
              show-overflow-tooltip
              align="center"
              :width="180"
              v-if="detailFormBefore.bidInfo.isBidRates==='1'||detailFormBefore.bidInfo.isBidRates ==null"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标限价(万元)"
              prop="bidInfoSection.biddingPriceLimit"
              show-overflow-tooltip
              align="center"
              :width="180"
              v-if="detailFormBefore.bidInfo.isBidRates==='1'||detailFormBefore.bidInfo.isBidRates ==null"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标保证金(万元)"
              prop="bidInfoSection.tenderSecurity"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

              <el-table-column
              :resizable="false"
              label="投标费率(百分比)"
              prop="bidInfoSection.tenderRate"
              show-overflow-tooltip
              align="center"
              :width="180"
              v-if="detailFormBefore.bidInfo.isBidRates==='0'"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标价(万元)"
              prop="bidInfoSection.bidPrice"
              show-overflow-tooltip
              align="center"
              :width="180"
              v-if="detailFormBefore.bidInfo.isBidRates==='1'||detailFormBefore.bidInfo.isBidRates ==null"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="开标地点"
              prop="bidInfoSection.openBidPlaceName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="评标办法"
              prop="bidInfoSection.bidEvaluationMethodName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="开标金额"
              prop="bidInfoSection.openBidAmount"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            <template slot-scope="scope">{{
              scope.row.bidInfoSection.openBidAmount
            }}</template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="开标日期"
              prop="bidInfoSection.dateOfBidOpeningName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
          <template slot-scope="scope">{{
            scope.row.bidInfoSection.dateOfBidOpeningName | dateformat
          }}</template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="参与投标单位"
              prop="bidInfoSection.participatingUnitsName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="其他投标单位(系统内)"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <!-- <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.bidInfoSectionOrgList">{{item.orgType==1?item.orgName:''}}{{index <scope.row.bidInfoSectionOrgList.length-1? ',':''}}</span>

              </template> -->
                <template slot-scope="scope">
                <span v-for="(item,index ) in scope.row.bidInfoSectionOrgList">
                    {{item.orgType==1?item.orgName:''}}
                    {{scope.row.bidInfoSectionOrgList[index+1]&& index>0&&scope.row.bidInfoSectionOrgList[index-1].orgType==1 && scope.row.bidInfoSectionOrgList[index+1].orgType==1? ',':''}}
                </span>

                  </template>

            </el-table-column>

            <!-- <el-table-column
              :resizable="false"
              label="其他投标单位(系统内)"
              prop="openBidTime"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.openBidTime"
                ></el-input>
              </template>
            </el-table-column> -->

            <el-table-column
              :resizable="false"
              label="其他投标单位(系统外)"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
                <!-- <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.bidInfoSectionOrgList">{{item.orgType==2?item.orgName:''}}{{index < scope.row.bidInfoSectionOrgList.length-1? ',':''}}</span>
              </template> -->
               <template slot-scope="scope">
                <span v-for="(item,index ) in scope.row.bidInfoSectionOrgList">
                    {{item.orgType==2?item.orgName:''}}
                    {{scope.row.bidInfoSectionOrgList[index+1]&& index>0&&scope.row.bidInfoSectionOrgList[index-1].orgType==2 && scope.row.bidInfoSectionOrgList[index+1].orgType==2? ',':''}}
                </span>

                  </template>
            </el-table-column>

            <!-- <el-table-column
              :resizable="false"
              label="其他投标单位(系统外)"
              prop="openBidTime"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.openBidTime"
                ></el-input>
              </template>
            </el-table-column> -->

            <el-table-column
              :resizable="false"
              label="其他未列出单位"
              prop="bidInfoSection.otherUnitsNotListed"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目经理"
              prop="bidInfoSection.projectManager"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目副经理"
              prop="bidInfoSection.deputyProjectManager"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="技术负责人"
              prop="bidInfoSection.technicalDirector"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="安全负责人"
              prop="bidInfoSection.personInChargeOfSafety"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="财务负责人"
              prop="bidInfoSection.personInChargeOfFinance"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="成本负责人"
              prop="bidInfoSection.costOwner"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="编标拟配合单位"
              prop="bidInfoSection.orgName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投资估算"
              prop="bidInfoSection.investmentReckon"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="其中建安投资"
              prop="bidInfoSection.jananInvestment"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

          </el-table>
        </el-form>
        </div>

    </el-tab-pane>


    <el-tab-pane label="变更后" name="after">

        <div class="detailBoxBG">
          <el-divider content-position="left" class="detailDivider">项目前期信息</el-divider>
          <el-form
            :inline="false"
            :model="detailform"
            :rules="detailformrules"
            class="gcform"
            ref="detailform"
          >
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
                v-model="detailform.topInforBO.topInfor.inforName"/>
            </el-form-item>

            <el-form-item  label="外文名称:">


              <el-input
                disabled
                clearable
                v-model="detailform.topInforBO.topInfor.inforNameForeign"/>
            </el-form-item>
            <br>
            <el-form-item label="项目板块:"
            class="inline-formitem"
            style="width:100%"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <template >
                <el-radio-group class="detail-radio-group" disabled v-model="detailform.topInforBO.topInfor.moduleId">
                  <el-radio v-for="(item, index) in projectPlate" :label="item.id" :key="index">{{item.detailName}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <br>

            <el-form-item
              v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="工程类别(一级):">
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.enginTypeFirstName"
              >
              </el-input>
            </el-form-item>

            <el-form-item
              v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="工程类别(二级):"
            >
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.enginTypeSecondName"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="所属线路:"
            v-if="(detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb')&&detailform.topInforBO.topInfor.enginTypeFirstName=='17ff5c08d36b41ea8f2dc2e9d3029cac'"
            >
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.belongLineName"
              >

              </el-input>
            </el-form-item>
            <br>
            <el-form-item
              v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="项目性质(一级):"
            >
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.projectNatureFirstName"
              >
              </el-input>
            </el-form-item>



            <el-form-item
              v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
              label="项目性质(二级):"
            >
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.projectNatureSecondName"
              >
              </el-input>
            </el-form-item>
            <br v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInforBO.topInfor.moduleId==null">
            <el-form-item
              v-if="detailform.topInforBO.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
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

                v-model="detailform.topInforBO.topInfor.supplyProductName"
              />
            </el-form-item>
            <el-form-item
              v-if="detailform.topInforBO.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
              label="采购性质:"
              prop="topInfor.purchaseNatureId"
            >
              <el-input
                disabled

                v-model="detailform.topInforBO.topInfor.purchaseNatureName"
              />
            </el-form-item>
            <br v-if="detailform.topInforBO.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'">
            <el-form-item  label="新兴市场(一级):"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.marketFirstName"
              >
              </el-input>
            </el-form-item>



            <el-form-item  label="新兴市场(二级):"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.marketSecondName"
              >
              </el-input>
            </el-form-item>
            <br>

            <div class="div-item">
              <el-form-item
                label="装配率(%):"

                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
                v-if="detailform.topInforBO.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"
              >
                <el-input
                  disabled
                  v-model="detailform.topInforBO.topInfor.otherAssemblyRate"
                />
              </el-form-item>

              <el-form-item
                label="装配类型:"

                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
                v-if="detailform.topInforBO.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

              >
              <el-input
                  disabled
                  v-model="detailform.topInforBO.topInfor.otherAssemblyType"
                />
              </el-form-item>
            </div>

            <div class="div-item">
              <el-form-item
                label="建筑类型:"

                :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
                v-if="detailform.topInforBO.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

              >
              <el-input
                  disabled
                  v-model="detailform.topInforBO.topInfor.otherBuildingType"
                />
              </el-form-item>

              <el-form-item
                label="建筑结构类型:"

                :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
                v-if="detailform.topInforBO.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

              >
                <el-input
                  disabled
                  v-model="detailform.topInforBO.topInfor.otherBuildingStructureType"
                />
              </el-form-item>

              <el-form-item
                label="场地名称:"

                :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
                v-if="detailform.topInforBO.topInfor.marketFirstNameId=='50cd5e9992ac4653920fac8c1f2eb2e3'"
              >
                <el-input
                  disabled
                  v-model="detailform.topInforBO.topInfor.siteName"
                />
              </el-form-item>
            </div>

            <el-form-item
              :label="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'建设单位:':'客户名称:'"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.constructionOrg"
              />
            </el-form-item>

            <el-form-item
              v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInforBO.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'||detailform.topInforBO.topInfor.moduleId==null"
              label="设计单位:">
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.designOrg"
              />
            </el-form-item>
            <br>
            <el-form-item label="公告类型:"
                          :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.noticeTypeName"
              >

              </el-input>
            </el-form-item>
            <el-form-item label="资审方式:">
              <el-input
                disabled
                clearable
                placeholder="资审方式"
                v-model="detailform.topInforBO.topInfor.verifyTypeName"
              />
            </el-form-item>
            <br>
            <el-form-item
              v-if="detailform.topInforBO.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="招标人:"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.bidPerson"
              />
            </el-form-item>

            <el-form-item
              v-if="detailform.topInforBO.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="招标代理公司:">
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.bidAgentCompany"
              />
            </el-form-item>

            <el-form-item
              v-if="detailform.topInforBO.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="预计招标时间:"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-date-picker
                disabled
                type="date"
                value-format="timestamp"
                v-model="detailform.topInforBO.topInfor.planBidTime"
              >
              </el-date-picker>
            </el-form-item>
            <br>
              <el-form-item
                :label="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'投资额（万元）:':'项目规模:'"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                v-model="detailform.topInforBO.topInfor.investment"
              >
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
                </el-input>
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
                v-model="detailform.topInforBO.capitalName"
              >
              </el-input>
            </el-form-item>

            <el-form-item  label="是否为重大项目:"
            class="inline-formitem formItem"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
            <el-switch
              class="inline-formitem-switch"
              v-model="detailform.topInforBO.topInfor.isMajorProject"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
              disabled
            >
            </el-switch>
            </el-form-item>
            <el-form-item
              v-show="detailform.topInforBO.topInfor.investment<maxMoney&&detailform.topInforBO.topInfor.isMajorProject=='0'"
              label="重大项目说明"
            >
              <el-input
                clearable
                placeholder=""
                disabled
                v-model="detailform.topInforBO.topInfor.majorProjectExplain"
              />
            </el-form-item>
           <br>
              <el-form-item   class="formItem" label="项目跟踪负责人:"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">

              <el-input

                disabled
                placeholder="请选择"
                v-model="detailform.topInforBO.topInfoOrg.projectTrackResponPerson"
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
                v-model="detailform.topInforBO.topInfoOrg.contactMode"
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
                v-model="detailform.topInforBO.topInfoOrg.bidProbName"
              >
              </el-input>
            </el-form-item>

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
                v-model="detailform.topInforBO.topInfor.inforContent"
              />
            </el-form-item>


            <div>
              <el-divider content-position="left" class="detailDivider">投标信息</el-divider>
              <el-form-item label="招标方式:"
              class="formItem">
                <el-select
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="detailform.bidInfo.bidModeId"
                  @change="getName(
                    detailform.bidInfo.bidModeId,
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
              <br>

            <el-form-item
            class="formItem"
              label="招标公告发布日期:"
              prop="bidInfo.publishTime"
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
                value-format="timestamp"
                v-model="detailform.bidInfo.publishTime"
              >
              </el-date-picker>
            </el-form-item>

              <el-form-item
              class="formItem"
              label="招标文件发售截止日期"
              prop="saleTime"
              >
                <el-date-picker
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  value-format="timestamp"
                  filterable
                  clearable
                  v-model="detailform.bidInfo.saleTime"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                label="投标截止日期:"
                prop="bidInfo.endTime"
              >
                <el-date-picker
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  value-format="timestamp"
                  clearable
                  filterable
                  v-model="detailFormBefore.bidInfo.endTime"
                >
                </el-date-picker>
              </el-form-item>
              <br>

              <el-form-item
              class="inline-formitem formItem"
                label="是否为费率招标:"
                prop="bidInfo.isBidRates">
              <el-switch
              class="inline-formitem-switch"
              v-model="detailform.bidInfo.isBidRates"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
            >
            </el-switch>
              </el-form-item>

              <el-form-item
              class="inline-formitem formItem"
                label="是否联合体投标:"
                prop="bidInfo.isCoalitionBid">
                <!-- :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }" -->

            <el-switch
              class="inline-formitem-switch"
              v-model="detailform.bidInfo.isCoalitionBid"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
              :disabled="p.actpoint === 'look'||p.actpoint=='task'||(detailform.topInforBO.topInfor.noticeTypeName=='资审公告'&&detailform.bidInfo.bidFlowStatus=='3')"
              @change="detailform.bidInfo.isCoalitionBid=='1'?(detailform.bidInfo.innerOrgName='',detailform.bidInfo.outOrg=''):''"
            >
            </el-switch>
              </el-form-item>
              <br>
              <el-form-item label="内部联合体单位:"
              class="formItem"
              >

              <el-input v-model="detailform.bidInfo.innerOrgName" class="input-with-select"
              :disabled="p.actpoint === 'look'|| detailform.bidInfo.isCoalitionBid === '1' ||detailform.bidInfo.isCoalitionBid ==''||p.actpoint=='task'">
                <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('内部联合体单位',detailform.bidInfo.innerOrgId)"
                 v-if="p.actpoint != 'look'&& detailform.bidInfo.isCoalitionBid != '1' && detailform.bidInfo.isCoalitionBid != ''"
                ></el-button>
              </el-input>
            </el-form-item>

            <el-form-item class="formItem"
                label="外部联合体单位:"
              >
                <el-input
                  :disabled="p.actpoint === 'look'|| detailform.bidInfo.isCoalitionBid === '1' ||detailform.bidInfo.isCoalitionBid ==''||p.actpoint=='task'"
                  clearable
                  placeholder=""
                  v-model="detailform.bidInfo.outOrg"
                >
                  <el-button v-if="p.actpoint!='task'&&p.actpoint!='look'&&detailform.bidInfo.isCoalitionBid != '1'&&detailform.bidInfo.isCoalitionBid !=''" slot="append" icon="el-icon-circle-plus-outline" @click="openComMul(detailform.bidInfo.outOrgId,detailform.bidInfo.outOrg,'/api/contract/Companies/detail/findCompanies','外部联合体单位',detailform.bidInfo.outOrgCode)"></el-button>
                </el-input>
              </el-form-item>




            </div>

            <el-row>
              <el-form-item
                class="neirong"
                label="投标说明(最多1000字):"
                prop="bidInfo.bidExplain">
                <!-- :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }" -->

                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  v-model="detailform.bidInfo.bidExplain"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                  class="neirong"
                  label="变更原因(最多1000字):"
                  prop="bidInfo.changeReason"
                  :rules="{
                    required: true,
                    message: '此项不能为空',
                    trigger: 'blur',
                  }"
                  style="width: 100%"
                >
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-input

                    type="textarea"
                    clearable
                    placeholder="请输入"

                    v-model="detailform.bidInfo.changeReason"
                  />
                </el-form-item>
            </el-row>
            <el-row>
                <p>
                  <span >附件: </span>
                  <!-- <span>开标记录: </span> -->
                  <!-- <span span v-if="p.from!='kblist'">附件: </span>
                  <span v-if="p.from=='kblist'">开标记录（最大10MB）: </span> -->
                  <el-button
                    v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                    size="small"
                    type="primary"
                    @click="openFileUp('/api/contract/topInfo/CommonFiles/bidInfo/01/uploadFile','bidInfo_01')">
                    点击上传
                  </el-button>
                <!--<el-upload-->
                  <!--class="upload-demo detailUpload"-->
                  <!--:action="'/api/contract/topInfo/CommonFiles/bidInfo/01/uploadFile'"-->
                  <!--:on-success="handleChange"-->
                  <!--:on-error="handleChange"-->
                  <!--:on-remove="handleRemove"-->
                  <!--:show-file-list="false"-->
                  <!--:file-list="detailform.bidInfo_01"-->
                  <!--:disabled="p.actpoint === 'look'"-->
                  <!--multiple-->
                <!--&gt;-->
                  <!--<el-button size="small" type="primary" v-show="p.actpoint != 'look'">点击上传</el-button>-->
                <!--</el-upload>-->
              </p>

              <el-table
                :data="detailform.bidInfo_01"
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


                  label="操作"
                  v-if="p.actpoint!=='look'&&p.actpoint!=='task'"
                  width="60"
                >
                  <template slot-scope="scope">
                    <el-link @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
                <p>
                  <!-- <span >附件: </span> -->
                  <span>开标记录（最大10MB）: </span>
                  <!-- <span span v-if="p.from!='kblist'">附件: </span>
                  <span v-if="p.from=='kblist'">开标记录（最大10MB）: </span> -->
                  <el-button
                    v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                    size="small"
                    type="primary"
                    @click="openFileUp('/api/contract/topInfo/CommonFiles/bidInfo/02/uploadFile','bidInfo_02')">
                    点击上传
                  </el-button>
              </p>
              <el-table
                :data="detailform.bidInfo_02"
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


                  label="操作"
                  v-if="p.actpoint!=='look'&&p.actpoint!=='task'"
                  width="60"
                >
                  <template slot-scope="scope">
                    <el-link @click="handleRemove_02(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <p v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'" class="detail-title" style="overflow: hidden；margin-right: 30px">
              <span >标段信息: </span>
              <el-button
                v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                @click="openBd('add')"
                size="mini"
                style="
                  width: 70px;
                  height: 32px;
                  background: #5c8bfa;
                  font-size: 16px;
                "
                type="primary"
                class="detatil-flie-btn"
                >新增
              </el-button>
            </p>
            <el-table
              v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            :key="key"
            @row-dblclick="lookBd"
              :data="detailform.bidInfoSectionList"
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
                label="标段名称"
                prop="bidInfoSection.sectionName"
                align="center"
                show-overflow-tooltip
                :width="180"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="风险费(万元)"
                prop="bidInfoSection.riskFee"
                show-overflow-tooltip
                align="center"
                :width="180"
                v-if="detailform.bidInfo.isBidRates==='1'||detailform.bidInfo.isBidRates ==''"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="安全费(万元)"
                prop="bidInfoSection.safetyCost"
                show-overflow-tooltip
                align="center"
                :width="180"
                v-if="detailform.bidInfo.isBidRates==='1'||detailform.bidInfo.isBidRates ==''"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="投标限价(万元)"
                prop="bidInfoSection.biddingPriceLimit"
                show-overflow-tooltip
                align="center"
                :width="180"
                v-if="detailform.bidInfo.isBidRates==='1'||detailform.bidInfo.isBidRates ==''"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="投标保证金(万元)"
                prop="bidInfoSection.tenderSecurity"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
              </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标费率(百分比)"
              prop="bidInfoSection.tenderRate"
              show-overflow-tooltip
              align="center"
              :width="180"
               v-if="detailform.bidInfo.isBidRates==='0'"
            >

            </el-table-column>

              <el-table-column
                :resizable="false"
                label="投标价(万元)"
                prop="bidInfoSection.bidPrice"
                show-overflow-tooltip
                align="center"
                :width="180"
                v-if="detailform.bidInfo.isBidRates==='1'||detailform.bidInfo.isBidRates ==''"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="开标地点"
                prop="bidInfoSection.openBidPlaceName"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="评标办法"
                prop="bidInfoSection.bidEvaluationMethodName"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
              </el-table-column>
              <el-table-column
                :resizable="false"
                label="开标金额"
                prop="bidInfoSection.openBidAmount"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">{{
                  scope.row.bidInfoSection.openBidAmount
                }}</template>
              </el-table-column>
              <el-table-column
                :resizable="false"
                label="开标日期"
                prop="bidInfoSection.dateOfBidOpeningName"
                show-overflow-tooltip
                align="center"
                :width="180"
                value-format="timestamp"
              >
               <template slot-scope="scope">{{
            scope.row.bidInfoSection.dateOfBidOpeningName | dateformat
          }}</template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="参与投标单位"
                prop="bidInfoSection.participatingUnitsName"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
              </el-table-column>

            <el-table-column
              :resizable="false"
              label="其他投标单位(系统内)"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <!-- <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.bidInfoSectionOrgList">{{item.orgType==1?item.orgName:''}}{{index <scope.row.bidInfoSectionOrgList.length-1? ',':''}}</span>

              </template> -->
                <template slot-scope="scope">
                <span v-for="(item,index ) in scope.row.bidInfoSectionOrgList">
                    {{item.orgType==1?item.orgName:''}}
                    {{(item.orgType==1&&scope.row.bidInfoSectionOrgList[index+1]&&scope.row.bidInfoSectionOrgList[index+1].orgType==2)||(item.orgType==1&&!scope.row.bidInfoSectionOrgList[index+1])||item.orgType==2?'':','}}
                    <!-- {{scope.row.bidInfoSectionOrgList[index+1]&& index>0&&scope.row.bidInfoSectionOrgList[index-1].orgType==1 && scope.row.bidInfoSectionOrgList[index+1].orgType==1? ',':''}} -->
                </span>

                  </template>

            </el-table-column>

            <el-table-column
              :resizable="false"
              label="其他投标单位(系统外)"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
                <!-- <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.bidInfoSectionOrgList">{{item.orgType==2?item.orgName:''}}{{index < scope.row.bidInfoSectionOrgList.length-1? ',':''}}</span>
              </template> -->
               <template slot-scope="scope">
                <span v-for="(item,index ) in scope.row.bidInfoSectionOrgList">
                    {{item.orgType==2?item.orgName:''}}
                    {{item.orgType==2&&scope.row.bidInfoSectionOrgList[index+1]?',':''}}
                    <!-- {{scope.row.bidInfoSectionOrgList[index+1]&& index>0&&scope.row.bidInfoSectionOrgList[index-1].orgType==2 && scope.row.bidInfoSectionOrgList[index+1].orgType==2? ',':''}} -->
                </span>

                  </template>
            </el-table-column>

              <el-table-column
                :resizable="false"
                label="其他未列出单位"
                prop="bidInfoSection.otherUnitsNotListed"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="项目经理"
                prop="bidInfoSection.projectManager"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="项目副经理"
                prop="bidInfoSection.deputyProjectManager"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="技术负责人"
                prop="bidInfoSection.technicalDirector"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="安全负责人"
                prop="bidInfoSection.personInChargeOfSafety"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="财务负责人"
                prop="bidInfoSection.personInChargeOfFinance"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="成本负责人"
                prop="bidInfoSection.costOwner"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
              </el-table-column>

<el-table-column
              :resizable="false"
              label="编标拟配合单位"
              prop="bidInfoSection.orgName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投资估算"
              prop="bidInfoSection.investmentReckon"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="其中建安投资"
              prop="bidInfoSection.jananInvestment"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

              <el-table-column
                v-if="p.actpoint!=='look'&&p.actpoint!=='task'"
                :resizable="false"
                fixed="right"
                label="操作"
                align="center"
                show-overflow-tooltip
                width="100"
              >
                <template slot-scope="scope">
                  <el-link
                    :underline="false"
                    @click="del(scope.$index,scope.row,detailform.bidInfoSectionList,'bd')"
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
          </el-form>

        </div>
      <add-bd  v-if="BDCSVisible" ref="infoBD" @refreshBD="getBdInfo"></add-bd>
       <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
      <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
      <!--多选的单位列表组件-->
      <company-mul v-if="companyMulStatus" ref="comAdd" @getComList="getComList"></company-mul>
    </el-tab-pane>
    <el-tab-pane label="审批流程" name="lc" v-if="p.actpoint == 'task'||p.actpoint == 'look'">
        <Audit-Process :task="p.task||{businessId:p.uuid,businessType:'contract_bid_change'}"></Audit-Process>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import CompanyTree from '../contractManager/companyTree'
import AddBd from './addBd'
import Tree from "@/components/tree";
import { isMoney } from "@/utils/validate";
import AuditProcess from '@/components/auditProcess'
import FileUpload from '@/components/fileUpload'
import companyMul from '@/components/companiesMultiple'
export default {
  // name: "详情",
  data() {
    return {
      companyMulStatus:false,//设计单位等多选列表状态
      maxMoney:1000000,
      uploadVisible:false,//上传附件组件状态
      activeName:"after",
      key:0,
       BDCSVisible:false,//标段新增弹框状态
       DwVisible:false,//选择单位弹框状态
      id: "",
      uuid:'',
      afterId: "",
      key: 0,
      treeStatas: false,
      positionIndex: "", //缓存当前的选中的项目地点的index
      options2: [],
      options: [],
      detailform: {
        bidInfo: {},
        bidInfoInnerOrgList:[],
        bidInfoSectionList: [],
        bidInfoSectionOrgList:[],
        bidInfo_01: [],
        bidInfo_02: [],
        value1: [],
        topInforBO:{
          topInfor:{},
          topInfoOrg:{},
        }
      },
      detailFormBefore: {
        bidInfo: {},
        bidInfoInnerOrgList:[],
        bidInfoSectionList: [],
        bidInfoSectionOrgList:[],
        bidInfo_01: [],
        bidInfo_02: [],
        topInforBO:{
          topInfor:{},
          topInfoOrg:{},

        },
        value1:[],
        nblht:[],//内部联合体单位列表
      },
      detailformrules: {},
      xqprojectType: [], //工程类别二级
      emergingMarketTwo: [], //新兴市场二级
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      sizeform: { projectScale: "", sectionName: "" },
      yesOrNo: [
        {
          id: "0",
          detailName: "是",
        },
        {
          id: "1",
          detailName: "否",
        },
      ],
    };
  },
  components: {
    Tree,
    AddBd,
    CompanyTree,
    AuditProcess,
    FileUpload,
    companyMul,//多选的单位列表组件
  },
  computed: {
    projectDomainType() {
      // console.log(this.$store.state.category["projectDomainType"])
      return this.$store.state.category.projectDomainType;
    },
    emergingMarket() {
      // console.log(this.$store.state.category.emergingMarket)
      return this.$store.state.category.emergingMarket;
    },
    bizCode() {
      return this.$store.state.bizCode;
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
    bidType(){
      return this.$store.state.bidType;
    },
    projectPlate(){
        return this.$store.state.projectPlate;
    },
    bidEvaluationMethodName(){
      return this.$store.state.bidEvaluationMethodName;
    },
  },
  mounted() {
    // this.$store.commit("setCategory", 'projectDomainType');
    (this.id = this.p.instid), (this.afterId = this.p.afterId);
    this.uuid=this.p.uuid;
    if (this.p.actpoint === "edit" || this.p.actpoint === "look"||this.p.actpoint === "task") {
      this.getDetail();
    }
    if (this.p.actpoint === "add") {

      this.getAddDetail();
    }
    this.$store.dispatch("getConfig", {});
    this.$store.dispatch("getCategory", {
      name: "projectDomainType",
      id: "238a917eb2b111e9a1746778b5c1167e",
    });
    this.$store.dispatch("getCategory", {
      name: "emergingMarket",
      id: "33de2e063b094bdf980c77ac7284eff3",
    });
    // eslint-disable-next-line no-unde
  },
  methods: {
    //打开多选的单位列表
    openComMul(ids,names,url,type,codes){
      this.companyMulStatus=true;
      this.$nextTick(() => {
        this.$refs.comAdd.init(ids,names,url,type,codes);
      })
    },
    //获取拿过来的多选单位列表
    getComList(data){
      this.$forceUpdate();
      if(data.type=='外部联合体单位'){
        this.detailform.bidInfo.outOrgId=data.selIdList.join(",");
        this.detailform.bidInfo.outOrg=data.selList.join(",");
        this.detailform.bidInfo.outOrgCode=data.selCodeList.join(",");
      }
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
      this.detailform[data.list]=this.detailform[data.list].concat(data.fileList);
      this.uploadVisible = false;
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
              '/api/contract/topInfo/BidInfo/changeProcess/'+type,
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
      var list=[];
      var id=[],name=[];
      if(data){
        data.forEach((item)=>{
          id.push(item.id);
          name.push(item.detailName);
          var _v={
            innerOrgId:item.id,
            innerOrgName:item.detailName
          }
          list.push(_v)
        });
        this.detailform.bidInfoInnerOrgList=list;
        this.detailform.bidInfo.innerOrgId=id.join(",");
        this.detailform.bidInfo.innerOrgName=name.join(",");
      }

      this.DwVisible=false;
    },
    //上传附件
    handleChange(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
          this.detailform.bidInfo_01.push(response.data);
          console.log(fileList)
        }
      })
      } else {
        this.$message.error(response.msg)
      }
    },
    handleChange_02(response, file, fileList) {
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.detailform.bidInfo_02.push(response.data);
            console.log(fileList)
          }
        })
      } else {
        this.$message.error(response.msg)
      }
    },
// 上传附件的删除
    handleRemove(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
        if (res.data.code === 200) {
        this.detailform.bidInfo_01.splice(index,1);
      }

    });
    },
    handleRemove_02(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
        if (res.data.code === 200) {
        this.detailform.bidInfo_02.splice(index,1);
      }
    });
    },
     //打开标段弹框
    openBd(type,detail,index){
      this.BDCSVisible = true;
      var tableList=[],bdList=[];
      this.detailform.bidInfoSectionList.forEach((item)=>{
        tableList.push(item.bidInfoSection.sectionName)
      });
      bdList=this.detailform.topInforBO.topInfoSectionList.filter(item => tableList.indexOf(item.sectionName)==-1);
      if (bdList.length < 1) {
        this.$message({
          message: '无标段新增!',
          type: 'warning'
        });
        return false
      }
      this.$nextTick(() => {
        this.$refs.infoBD.init(bdList,this.detailform.bidInfo.isBidRates,type,detail,index);
      })
    },
    //查看标段弹框
    lookBd(row){
       this.BDCSVisible = true;
      this.$nextTick(() => {
        this.$refs.infoBD.init(this.detailform.topInforBO.topInfoSectionList,this.detailform.bidInfo.isBidRates,'look',row);
      })
    },
    //获取新增的标段
    getBdInfo(data){
      console.log(data);
      if(data.type=='add'){
        this.detailform.bidInfoSectionList.push(data)
      }else if(data.type=='edit'){
        this.detailform.bidInfoSectionList[data.index]=data;
      }
      console.log(this.detailform.bidInfoSectionList)
      this.BDCSVisible=false;
       this.key = this.key + 1;
    },

    //金额过滤
    getMoney(value) {
      return isMoney(value);
    },
    //获取项目地点的值
    getPositionTree(data) {
      console.log(data);
      this.treeStatas = false;
      var country = "",
        _data = data;
      if (_data.fullDetailName.indexOf("境内") != -1) {
        country = "01";
      } else if (_data.fullDetailName.indexOf("境外") != -1) {
        country = "02";
      }
      this.detailform.topInfoSiteList.forEach((item, index) => {
        if (index == this.positionIndex) {
          // item.detailName = _data.detailName;
          item.country = country;
          item.ffid = _data.fullDetailCode;
          item.path = _data.fullDetailName;
        }
      });

    },
    //选择项目地点
    selectPosition() {
      this.treeStatas = true;
      console.log(this.positionIndex);
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init();
      });
    },
    //工程类别二级
    getTwo(id) {
      if (id != "") {
        this.detailform.topInfor.enginTypeSecondId = "";
        // console.log(this.projectDomainType)
        this.projectDomainType.find((item) => {
          if (item.id == id) {
            this.detailform.topInfor.enginTypeFirstName = item.detailName;
            this.xqprojectType = item.children;
          }
        });
      }
    },
    //新兴市场二级
    getTwoSC(id) {
      if (id != "") {
        this.detailform.topInfor.marketSecondId = "";
        this.emergingMarket.find((item) => {
          if (item.id == id) {
            this.detailform.topInfor.marketFirstName = item.detailName;
            this.emergingMarketTwo = item.children;
          }
        });
      }
    },
    //获取下拉框id和name的公共方法
    getName(id, list, name,code) {
      if (id) {
        this.$forceUpdate();
        this.detailform.bidInfo[name] = list.find(
          (item) => item.id == id
        ).detailName;
          this.detailform.bidInfo[code] = list.find(
              (item) => item.id == id
          ).detailCode;
        console.log(this.detailform.topInfor[name]);
      }
    },
    saveInfo(formName,type) {
      // var bidInfoInnerOrgList = [];
      //   //内部联合体单位
      //   this.amountSource.forEach((item) => {
      //     if (this.detailform.value1&&this.detailform.value1.indexOf(item.id) != -1) {
      //       var v = {
      //         innerOrgId: item.id,
      //         innerOrgName: item.detailName,
      //       };
      //       bidInfoInnerOrgList.push(v);
      //     }
      //   });
      // this.detailform.bidInfoInnerOrgList=bidInfoInnerOrgList;
      this.detailform.srcId = this.id;
      var url='';
        if(type=='save'){
          url=`/api/contract/topInfo/BidInfo/detail/${this.p.actpoint === "add"? "saveChangeRecord": "updateChangeRecord"}`
        }else{
          url="/api/contract/topInfo/BidInfo/changeProcess/start"
        }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post(
              // `/api/contract/topInfo/BidInfo/detail/${this.p.actpoint === "add"? "saveChangeRecord": "updateChangeRecord"}`,
              url,
              //JSON.stringify(this.detailform),
                {
                    'afterBidInfoBO':this.detailform,
                    'beforeBidInfoBO':this.detailFormBefore
                },
              { useJson: true }
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message:  `${type=='save'?'保存':'提交'}成功`,
                  type: "success",
                });
                // this.$refs[formName].resetFields();
                this.$router.back();
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
        path: "/manage/bid_info/inforChangeList",
      });
    },

    // 删除
    del(index, item, list, type) {
      console.log(index);
      if (item.uuid && type == "bd") {
        this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$http
              .post("/api/contract/topInfo/BidInfo/list/delete", {
                ids: [item.uuid],
              })
              .then((res) => {
                if (res.data && res.data.code === 200) {
                  list.splice(index, 1);
                  console.log(list);
                } else {
                  this.$message.error(data.msg);
                }
              });
          })
          .catch(() => {});
      } else {
        list.splice(index, 1);
      }
      // var _self = this;
      // _self.detailform.topInfoSectionList.splice(index, 1);
    },
    //新增标段和地点
    add(type) {
      var v = {};
      v = {
        bidInfoSection: {},
        bidInfoSectionOrgList: {},
      };
      this.detailform.bidInfoSectionList.push(v);
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
        .post("/api/contract/topInfo/BidInfo/detail/entityInfoByBeforeAndAfterId", {
          beforeId: this.id,
          afterId: this.afterId,
          uuid:this.p.task?this.p.instid:this.p.uuid
        })
        .then((res) => {
          var datas = res.data.data;
          var beforData = [],
            afterData = [];
          if (datas[0].bidInfo.changeStatus == 1) {
            beforData = datas[0];
            afterData = datas[1];
          } else {
            beforData = datas[1];
            afterData = datas[0];
          }
          // console.log(afterData);
          this.detailform = {
            bidInfo: afterData.bidInfo,
            afterId: afterData.afterId,
            changeRecordUuid:afterData.changeRecordUuid,
            bidInfoInnerOrgList: afterData.bidInfoInnerOrgList,
            bidInfoSectionList: afterData.bidInfoSectionList,
            bidInfo_01: afterData.bidInfo_01||[],
            bidInfo_02: afterData.bidInfo_02||[],
            topInforBO:afterData.topInforBO,
            value1:[]
          };
          // afterData.bidInfoInnerOrgList.forEach((item)=>{
          //   this.detailform.value1.push(item.innerOrgId)
          //   });
          this.detailFormBefore = {
             bidInfo: beforData.bidInfo,
            bidInfoInnerOrgList: beforData.bidInfoInnerOrgList,
            bidInfoSectionList: beforData.bidInfoSectionList,
            bidInfo_01: beforData.bidInfo_01||[],
            bidInfo_02: beforData.bidInfo_02||[],
            topInforBO:beforData  .topInforBO,
            value1:[],
            nblht:[],
          };
            //变更后内部联合体回显
            var id=[],name=[];
            afterData.bidInfoInnerOrgList.forEach((item)=>{
              id.push(item.innerOrgId);
              name.push(item.innerOrgName);
            });
            this.detailform.bidInfo.innerOrgId=id.join(",");
            this.detailform.bidInfo.innerOrgName=name.join(",");
             //变更前内部联合体回显
            var id2=[],name2=[];
            beforData.bidInfoInnerOrgList.forEach((item)=>{
              id2.push(item.innerOrgId);
              name2.push(item.innerOrgName);
            });
            this.detailFormBefore.bidInfo.innerOrgId=id2.join(",");
            this.detailFormBefore.bidInfo.innerOrgName=name2.join(",");
          //  beforData.bidInfoInnerOrgList.forEach((item)=>{
          //   this.detailFormBefore.value1.push(item.innerOrgId)
          //   });

        });
    },
    //新增的时候详情
    getAddDetail() {
      // console.log(111);
      this.$http
        .post("/api/contract/topInfo/BidInfo/detail/entityInfo", { topInfoOrgId: this.id ,id:this.uuid})
        .then((res) => {
          var datas = res.data.data;
          this.detailform = {
            bidInfo: datas.bidInfo,
            bidInfoInnerOrgList: datas.bidInfoInnerOrgList,
            bidInfoSectionList: datas.bidInfoSectionList,
            bidInfo_01: datas.bidInfo_01||[],
            bidInfo_02: datas.bidInfo_02||[],
            topInforBO:datas.topInforBO,
            value1:[],
            nblht:[],
          };
          //  datas.bidInfoInnerOrgList.forEach((item)=>{
          //   this.detailform.value1.push(item.innerOrgId)
          //   });

          this.detailFormBefore.capitalName = datas.capitalName;

            //内部联合体回显
            var id=[],name=[];
            datas.bidInfoInnerOrgList.forEach((item)=>{
              id.push(item.innerOrgId);
              name.push(item.innerOrgName);
            });
            this.detailform.bidInfo.innerOrgId=id.join(",");
            this.detailform.bidInfo.innerOrgName=name.join(",");
          for (var i in this.detailform) {
            this.detailFormBefore[i] = JSON.parse(
              JSON.stringify(this.detailform[i])
            );
          }
          // console.log(this.detailFormBefore.topInforBO.topInfor.moduleName)
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
    .div-item >>>.el-form-item{
      display: inline-block;
      width: 32.5%!important;
    }
>>>.gcform .el-form-item__error{
  margin: 0 0 0 365px;
}
  .el-tlm-main{
    overflow: hidden!important;
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
.positon-path {
  word-wrap: break-word;
  word-break: break-all;
  width: 90%;
}
.btn-group {
  text-align: center;
  margin-top: 20px;
}
.gcform {
  // margin-top: 10px;
  >>> .el-form-item__label:before {
    position: initial;
    left: -10px;
  }
  .el-form-item__error {
    padding-top: 0px;
    width: 95%;
    margin-left: 0;
    text-align: right;
    top: 0%;
  }
  .el-form-item {

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


.el-input--mini .el-input__inner {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  // margin: 10px 0 0 10px;
}

.gcform .el-input ,.gcform .el-select{
  width: 95%;
}
.listInput {
  width: auto !important;
}
.gcform .listInput input {
  width: 100px !important;
  padding: 10px !important;
  box-sizing: border-box;
}
.neirong {
  width: 100% !important;
}

.gcform .el-form-item {
  margin-bottom: 0px;
}

.neirong .el-input--mini .el-input__inner {
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
// .box-card{
//   padding: 0 100px;
// }
.el-main{
  overflow: hidden;
}
</style>

