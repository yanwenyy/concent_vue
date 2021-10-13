<template>
  <div  style="position: relative">
      <div slot="header" class="clearfix">
        <el-button @click="back" class="detailbutton detail-back-tab">返回</el-button>
        <el-button
          v-if="p.actpoint != 'look' && p.actpoint !== 'searchLook'&&p.actpoint != 'task'"
          type="primary"
          @click="saveInfo('detailform','save')"
          class="detailbutton detail-back-tab save-btn"
          >保存</el-button
        >
        <el-button
        v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.bidInfo.flowStatus=='edit'||detailform.bidInfo.flowStatus=='reject'||detailform.bidInfo.bidFlowStatus==1||detailform.bidInfo.bidFlowStatus==4)"
          @click="saveInfo('detailform','sub')"
          class="detailbutton detail-back-tab sub-btn"
          >提交</el-button>
<!-- v-if="p.actpoint != 'look' && p.actpoint !== 'searchLook'" -->
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
        <!--<el-button v-show="p.actpoint == 'task'&&p.task.edit==true" @click="operation('recall')" class="detailbutton" type="danger">撤销</el-button>-->
      </div>

    <el-tabs type="border-card" >
      <el-tab-pane label="开标信息详情">
      <div class="detailBox">
        <el-divider content-position="left" class="detailDivider"
          >项目前期信息</el-divider
        >
        <el-form
          :inline="false"
          :model="detailform"
          class="gcform"
          ref="detailform"
          style="background: white； height: ceil(100%-300px)"
        >
          <el-form-item
            label="项目名称:"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              disabled
              clearable
              v-model="detailform.topInforBO.topInfor.inforName"
            />
          </el-form-item>

          <el-form-item
            label="外文名称:"
          >
            <el-input
              disabled
              clearable
              v-model="detailform.topInforBO.topInfor.inforNameForeign"
            />
          </el-form-item>
          <br />
          <div>
            <el-form-item label="项目板块:" class="inline-formitem">
              <template>
                <el-radio-group
                  class="detail-radio-group"
                  disabled
                  v-model="detailform.topInforBO.topInfor.moduleId"
                >
                  <el-radio
                    v-for="(item, index) in projectPlate"
                    :label="item.id"
                    :key="index"
                    >{{ item.detailName }}</el-radio
                  >
                </el-radio-group>
              </template>
            </el-form-item>
          </div>

          <el-form-item
            v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            label="工程类别(一级):">
            <el-input
              disabled
              clearable
              filterable
              placeholder="请选择"
              v-model="detailform.topInforBO.topInfor.enginTypeFirstName"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            label="工程类别(二级):">
            <el-input
              disabled
              placeholder="工程类别(二级)"
              v-model="detailform.topInforBO.topInfor.enginTypeSecondName"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            label="所属线路:"
            v-if="
            (detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb')&&
              detailform.topInforBO.topInfor.enginTypeFirstId ==
              '17ff5c08d36b41ea8f2dc2e9d3029cac'
            "
          >
            <el-input
              disabled
              v-model="detailform.topInforBO.topInfor.belongLineName"
            >
            </el-input>
          </el-form-item>
          <br />

          <el-form-item
            v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            label="项目性质(一级):">
            <el-input
              disabled
              clearable
              filterable
              placeholder="请选择"
              v-model="detailform.topInforBO.topInfor.projectNatureFirstName"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            label="项目性质(二级):">
            <el-input
              disabled
              clearable
              filterable
              placeholder="请选择"
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
          <el-form-item
            label="新兴市场(一级):"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              disabled
              placeholder="请选择"
              v-model="detailform.topInforBO.topInfor.marketFirstName"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            label="新兴市场(二级):"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              disabled
              placeholder="请选择"
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
          <br />
          <el-form-item
            label="公告类型:"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              disabled
              placeholder="公告类型"
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
              filterable
              clearable
              type="date"
              value-format="timestamp"
              v-model="detailform.topInforBO.topInfor.planBidTime"
            >
            </el-date-picker>
          </el-form-item>
          <br />
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
              clearable
              placeholder="投资额（万元）:"
              v-model="detailform.topInforBO.topInfor.investment"
            >
              <template slot="prepend">¥</template>
              <template slot="append">(万元)</template>
            </el-input>
          </el-form-item>

          <el-form-item
            label="资金来源:"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              disabled
              placeholder="请选择"
              v-model="detailform.topInforBO.capitalName"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            label="是否为重大项目:"
            class="inline-formitem formItem"
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
          <br />


          <el-form-item
            v-show="
              detailform.topInforBO.topInfor.investment < maxMoney &&
              detailform.topInforBO.topInfor.isMajorProject == '0'
            "
            label="重大项目说明"
          >
            <el-input
              disabled
              v-model="detailform.topInforBO.topInfor.majorProjectExplain"
            />
          </el-form-item>
          <br />
          <!-- 下拉 -->

          <el-form-item
            class="formItem"
            label="项目跟踪负责人:"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              disabled
              placeholder="请选择"
              v-model="
                detailform.topInforBO.topInfoOrg.projectTrackResponPerson
              "
            >
            </el-input>
          </el-form-item>

          <el-form-item
            class="formItem"
            label="联系电话:"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              disabled
              placeholder="请选择"
              v-model="detailform.topInforBO.topInfoOrg.contactMode"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            label="预计中标概率:"
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

          <div>
            <el-form-item class="neirong" label="项目内容:" style="width: 100%">
              <el-input
                disabled
                type="textarea"
                clearable
                placeholder="请输入"
                v-model="detailform.topInforBO.topInfor.inforContent"
              />
            </el-form-item>
          </div>
          <div>
            <el-divider content-position="left" class="detailDivider">投标信息</el-divider>
            <el-form-item label="招标方式:" class="formItem">
              <el-select
                :disabled="p.actpoint === 'look' || p.actpoint === 'searchLook'||p.actpoint=='task'||p.actpoint==='edit'"
                filterable
                clearable
                placeholder="请选择"
                v-model="detailform.bidInfo.bidModeId"
                @change="
                getName(
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
            <el-form-item
              v-if="detailform.bidInfo.lateRegist=='0'"
              label="是否逾期记录:"
              class="formItem"
            >
              <el-switch
                disabled
                v-model="detailform.bidInfo.lateRegist"
                active-value="0"
                inactive-value="1"
              />
            </el-form-item>
            <el-form-item
              v-if="detailform.bidInfo.lateRegist=='0'"
              label="逾期类型:"
              class="formItem"
            >
              <el-input
                disabled
                v-model="detailform.bidInfo.overdueType"
              />
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
                :disabled="p.actpoint === 'look' || p.actpoint === 'searchLook'||p.actpoint=='task'"
                filterable
                clearable
                value-format="timestamp"
                v-model="detailform.bidInfo.publishTime"
              >
              </el-date-picker>
            </el-form-item>

              <el-form-item class="formItem"
                            prop="bidInfo.saleTime"
                            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
                            label="招标文件发售截止日期">
              <el-date-picker
                @change="ifYq"
                :disabled="p.actpoint === 'look' || p.actpoint === 'searchLook'||p.actpoint=='task'"
                value-format="timestamp"
                filterable
                clearable
                v-model="detailform.bidInfo.saleTime"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item
              class="formItem"
              label="投标截止日期:"
              prop="bidInfo.endTime"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-date-picker
                @change="ifYq"
                :disabled="p.actpoint === 'look' || p.actpoint === 'searchLook'||p.actpoint=='task'"
                value-format="timestamp"
                clearable
                filterable
                v-model="detailform.bidInfo.endTime"
              >
              </el-date-picker>
            </el-form-item>
            <br>

            <el-form-item
              class="inline-formitem formItem"
              label="是否为费率招标:"
              prop="bidInfo.isBidRates"
            >
              <el-switch
                class="inline-formitem-switch"
                v-model="detailform.bidInfo.isBidRates"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="0"
                inactive-value="1"
                :disabled="p.actpoint === 'look' || p.actpoint === 'searchLook'||p.actpoint=='task'||p.actpoint==='edit'"
              >
              </el-switch>
            </el-form-item>

            <el-form-item
              class="inline-formitem formItem"
              label="是否联合体投标:"
              prop="bidInfo.isCoalitionBid"
            >
              <el-switch
                class="inline-formitem-switch"
                v-model="detailform.bidInfo.isCoalitionBid"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="0"
                inactive-value="1"
                :disabled="p.actpoint === 'look' || p.actpoint === 'searchLook'||p.actpoint=='task'||p.actpoint==='edit'||detailform.topInforBO.topInfor.noticeTypeId=='864ceb6732d611eb8271459ce63f10a7'"
                @change="detailform.bidInfo.isCoalitionBid=='1'?(detailform.bidInfo.innerOrgName='',detailform.bidInfo.outOrg=''):''"
              >
              </el-switch>
            </el-form-item>
            <br>
            <el-form-item
              label="内部联合体单位:"
              class="formItem1"
              prop="bidInfo.innerOrgName"
              :rules="detailform.bidInfo.isCoalitionBid=='0'?rules.innerOrgName:{}"
            >
              <!-- :disabled="p.actpoint === 'look' || p.actpoint === 'searchLook' || detailform.bidInfo.isCoalitionBid === '1' ||detailform.bidInfo.isCoalitionBid ==''||p.actpoint=='task'" -->
              <el-input
                disabled
                placeholder="请输入内容"
                v-model="detailform.bidInfo.innerOrgName"
                class="input-with-select"
              >
                <!-- :disabled="p.actpoint === 'look' || p.actpoint === 'searchLook' || detailform.bidInfo.isCoalitionBid === '1' ||detailform.bidInfo.isCoalitionBid ==''" -->
                <el-button
                  v-if="p.actpoint != 'look' && p.actpoint != 'searchLook' && detailform.bidInfo.isCoalitionBid != '1' &&detailform.bidInfo.isCoalitionBid != ''&&p.actpoint!='task'"
                  slot="append"
                  icon="el-icon-circle-plus-outline"
                  :disabled="p.actpoint ==='look'"
                  @click="
                    addDw('内部联合体单位', detailform.bidInfo.innerOrgId)
                  "
                ></el-button>
              </el-input>
            </el-form-item>

            <el-form-item
              class="formItem1"
              label="外部联合体单位:"
              prop="bidInfo.outOrgId"
              :rules="detailform.bidInfo.isCoalitionBid=='0'?{
                required: true,
                message: '此项不能为空',
                trigger: 'change',
              }:{}"
            >
              <!-- :disabled="p.actpoint === 'look' || p.actpoint === 'searchLook' || detailform.bidInfo.isCoalitionBid === '1' ||detailform.bidInfo.isCoalitionBid ==''||p.actpoint=='task'" -->
              <el-input
                disabled
                clearable
                placeholder="外部联合体单位"
                v-model="detailform.bidInfo.outOrg"
              >
                <el-button :disabled="p.actpoint ==='look'" v-if="p.actpoint!='task'&&p.actpoint!='look'&&detailform.bidInfo.isCoalitionBid != '1'&&p.actpoint != 'searchLook'&&detailform.bidInfo.isCoalitionBid !=''" slot="append" icon="el-icon-circle-plus-outline" @click="openComMul(detailform.bidInfo.outOrgId,detailform.bidInfo.outOrg,'/api/contract/Companies/detail/findCompanies','外部联合体单位',detailform.bidInfo.outOrgCode)"></el-button>
              </el-input>
              <!--<el-select-->
                <!--:disabled="p.actpoint === 'look' || p.actpoint === 'searchLook' || detailform.bidInfo.isCoalitionBid === '1' ||detailform.bidInfo.isCoalitionBid ==''||p.actpoint=='task'"-->
                <!--clearable-->
                <!--filterable-->
                <!--placeholder="请选择"-->
                <!--v-model="detailform.bidInfo.outOrgId"-->
                <!--@change="-->
                <!--getName(-->
                  <!--detailform.bidInfo.outOrgId,-->
                  <!--sjdwList,-->
                  <!--'outOrg',-->
                  <!--'outOrgCode'-->
                <!--)"-->
              <!--&gt;-->
                <!--<el-option-->
                  <!--:key="index"-->
                  <!--:label="item.detailName"-->
                  <!--:value="item.id"-->
                  <!--v-for="(item, index) in sjdwList"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
            </el-form-item>

          </div>

          <div>
            <el-form-item
              class="neirong"
              label="投标说明(最多1000字):"
              prop="bidInfo.bidExplain"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              style="width: 100%"
            >
              <el-input
                :disabled="p.actpoint === 'look' || p.actpoint === 'searchLook'||p.actpoint=='task'"
                type="textarea"
                clearable
                placeholder="请输入"
                v-model="detailform.bidInfo.bidExplain"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item
              v-if="detailform.bidInfo.lateRegist=='0'"
              class="neirong"
              label="逾期原因:"
              prop="bidInfo.overdueReason"
              :rules="{
                      required: true,
                      message: '此项不能为空',
                      trigger: 'blur',
                    }"
            >
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable
                placeholder="请输入"
                type="textarea"

                v-model="detailform.bidInfo.overdueReason"
              />
            </el-form-item>
          </div>
          <el-row>
            <p class="detail-title">
              <span>附件: </span>
              <!-- <el-button
                v-show="p.actpoint != 'look' && p.actpoint !== 'searchLook'&& p.actpoint !== 'task'"
                size="small"
                type="primary"
                @click="openFileUp('/api/contract/topInfo/CommonFiles/bidInfo/01/uploadFile','bidInfo_01')">
                点击上传
              </el-button> -->
              <el-upload
                :headers="{'Authorization':Authorization}"
                v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                class="upload-demo detailUpload detatil-flie-btn"
                :action="'/api/contract/topInfo/CommonFiles/bidInfo/01/uploadFile'"
                :on-change="( file, fileList)=>{uploadPorgress( file, fileList,detailform.bidInfo_01)}"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                multiple
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </p>
            <el-table
              :data="detailform.bidInfo_01"
              :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
              align="center"
              border
              ref="table"
              style="width: 100%; min-height: calc(100vh - 370px)"
            >
              <el-table-column
                :width="55"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>
              <el-table-column
                align="center"
                :resizable="false"
                label="文件名"
                prop="fileName"
                show-overflow-tooltip
              >
              </el-table-column>

              <el-table-column
                align="center"
                :resizable="false"
                label="大小(KB)"
                prop="fileSize"
                show-overflow-tooltip
                width="160"
              >
                <template slot-scope="scope">
                  {{ (scope.row.fileSize / 1024).toFixed(2) }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :resizable="false"
                label="类型"
                prop="fileType"
                show-overflow-tooltip
                width="100"
              >
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
                width="120"
              >
                <template slot-scope="scope">
                  <el-link :underline="false" @click="attachmentDownload(scope.row)" type="success">下载</el-link>
                  <el-link
                    v-if="p.actpoint !== 'look' && p.actpoint !== 'searchLook'&& p.actpoint !== 'task'"
                    :underline="false"
                    @click="handleRemove(scope.row, scope.$index)"
                    type="warning"
                    >删除
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row v-if="p.from=='kblist'">
            <p class="detail-title">
              <span >开标记录（最大10MB）: </span>
              <el-button
                v-show="p.actpoint != 'look' && p.actpoint !== 'searchLook'&& p.actpoint !== 'task'"
                size="small"
                type="primary"
                @click="openFileUp('/api/contract/topInfo/CommonFiles/bidInfo/02/uploadFile','bidInfo_02')">
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
                <!--:disabled="p.actpoint === 'look' || p.actpoint === 'searchLook'"-->
                <!--multiple-->
                  <!--size="small"-->
                  <!--type="primary"-->
                  <!--v-show="p.actpoint != 'look' && p.actpoint !== 'searchLook'"-->
                  <!--:disabled=" p.actpoint === 'look' || p.actpoint === 'searchLook'">点击上传-->
                  <!--</el-button>-->
                  <!--</el-upload>-->
                </p>

            <el-table
              :data="detailform.bidInfo_02"
              :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
              align="center"
              border
              ref="table"
              style="width: 100%; min-height: calc(100vh - 370px)"
            >
              <el-table-column
                :width="55"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>
              <el-table-column
                align="center"
                :resizable="false"
                label="文件名"
                prop="fileName"
                show-overflow-tooltip
              >
              </el-table-column>

              <el-table-column
                align="center"
                :resizable="false"
                label="大小(KB)"
                prop="fileSize"
                show-overflow-tooltip
                width="160"
              >
                <template slot-scope="scope">
                  {{ (scope.row.fileSize / 1024).toFixed(2) }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :resizable="false"
                label="类型"
                prop="fileType"
                show-overflow-tooltip
                width="100"
              >
              </el-table-column>

              <el-table-column
                align="center"
                :resizable="false"
                fixed="right"
                label="操作"
                show-overflow-tooltip

                v-if="p.actpoint !== 'look' && p.actpoint !== 'searchLook'&& p.actpoint !== 'task'"
                width="60"
              >
                <template slot-scope="scope">
                  <el-link
                    :underline="false"
                    @click="handleRemove1(scope.row, scope.$index)"
                    type="warning"
                    >删除</el-link
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-row>

          <p  v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'" class="detail-title" style="overflow: hidden; margin-right: 30px">
            <span>标段信息:</span>
            <!-- @click="add('bd')" -->
            <el-button
              v-show="p.actpoint != 'look' && p.actpoint !== 'searchLook'&& p.actpoint !== 'task'"
              @click="openBd('add')"
              class="detatil-flie-btn"
              type="primary"
              >新增</el-button
            >
          </p>

          <el-table
            v-if="detailform.topInforBO.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInforBO.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            :key="key"
            @row-dblclick="openBd2"
            :data="detailform.bidInfoSectionList"
            :header-cell-style="{
              'text-align': 'center',
              'background-color': 'rgba(246,248,252,1)',
              color: 'rgba(0,0,0,1)',
            }"
            @selection-change="handleinputionChange"
            align="center"
            border
            ref="table"
            style="width: 100%; min-height: calc(100vh - 370px)"
          >
            <el-table-column
              :width="80"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="标段名称"
              prop="bidInfoSection.sectionName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>
            <!-- prop在table时回显 ,在from里面判断-->
            <el-table-column
              :resizable="false"
              label="风险费(万元)"
              prop="bidInfoSection.riskFee"
              show-overflow-tooltip
              align="center"
              :width="180"
              v-if="detailform.bidInfo.isBidRates === '1'||detailform.bidInfo.isBidRates ==''"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="安全费(万元)"
              prop="bidInfoSection.safetyCost"
              show-overflow-tooltip
              align="center"
              :width="180"
              v-if="detailform.bidInfo.isBidRates === '1'||detailform.bidInfo.isBidRates ==''"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标限价(万元)"
              prop="bidInfoSection.biddingPriceLimit"
              show-overflow-tooltip
              align="center"
              :width="180"
              v-if="detailform.bidInfo.isBidRates === '1'||detailform.bidInfo.isBidRates ==''"
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
              v-if="detailform.bidInfo.isBidRates === '0'"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标价(万元)"
              prop="bidInfoSection.bidPrice"
              show-overflow-tooltip
              align="center"
              :width="180"
              v-if="detailform.bidInfo.isBidRates === '1'||detailform.bidInfo.isBidRates ==''"
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

            <!-- <el-table-column
              :resizable="false"
              label="其他投标单位(系统内)"
              show-overflow-tooltip
              align="center"
              :width="180"
            > -->
              <!-- <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.bidInfoSectionOrgList">{{item.orgType==1?item.orgName:''}}{{index <scope.row.bidInfoSectionOrgList.length-1? ',':''}}</span>
              </template> -->
              <!-- <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.bidInfoSectionOrgList">
                  {{ item.orgType == 1 ? item.orgName : "" }}
                  {{
                    scope.row.bidInfoSectionOrgList[index + 1] &&
                    index > 0 &&
                    scope.row.bidInfoSectionOrgList[index - 1].orgType == 1 &&
                    scope.row.bidInfoSectionOrgList[index + 1].orgType == 1
                      ? ","
                      : ""
                  }}
                </span>
              </template>
            </el-table-column> -->

            <!-- <el-table-column
              :resizable="false"
              label="其他投标单位(系统外)"
              show-overflow-tooltip
              align="center"
              :width="180"
            > -->
              <!-- <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.bidInfoSectionOrgList">{{item.orgType==2?item.orgName:''}}{{index < scope.row.bidInfoSectionOrgList.length-1? ',':''}}</span>
              </template> -->
              <!-- <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.bidInfoSectionOrgList">
                  {{ item.orgType == 2 ? item.orgName : "" }}
                  {{
                    scope.row.bidInfoSectionOrgList[index + 1] &&
                    index > 0 &&
                    scope.row.bidInfoSectionOrgList[index - 1].orgType == 2 &&
                    scope.row.bidInfoSectionOrgList[index + 1].orgType == 2
                      ? ","
                      : ""
                  }}
                </span>
              </template>
            </el-table-column> -->

            <!-- <el-table-column
              :resizable="false"
              label="其他未列出单位"
              prop="bidInfoSection.otherUnitsNotListed"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column> -->

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
              v-if="p.actpoint !== 'look' && p.actpoint !== 'searchLook'&& p.actpoint !== 'task'"
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
                  @click="
                    del(
                      scope.$index,
                      scope.row,
                      detailform.bidInfoSectionList,
                      'bd'
                    )
                  "
                  type="warning"
                  >删除
                </el-link>
                <el-link
                  :underline="false"
                  @click="openBd(p.from=='kblist'?'eidtnew':'edit', scope.row, scope.$index)"
                  type="warning"
                  >修改
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
</el-tab-pane>
      <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'&&detailform.bidInfo.flowStatus!='edit'&&detailform.bidInfo.flowStatus!=null&&detailform.topInforBO.topInfor.bidFlowStatus!=1&&detailform.topInforBO.topInfor.bidFlowStatus!=null">
        <!-- <Audit-Process :task="(p.task||p.from=='kblist')&&p.instid.indexOf('-kb')==-1?{businessId:p.instid+'-kb',businessType:' contract_bid_register'}:{businessId:p.uuid,businessType:'contract_bid_new'}"></Audit-Process> -->
        <Audit-Process :task="p.task||p.from=='kblist'?{businessId:p.instid,businessType:' contract_bid_register'}:{businessId:p.uuid,businessType:'contract_bid_new'}"></Audit-Process>
      </el-tab-pane>
      </el-tabs>
    <add-bd v-if="BDCSVisible" ref="infoBD" @refreshBD="getBdInfo"></add-bd>
    <company-tree
      v-if="DwVisible"
      ref="infoDw"
      @refreshBD="getDwInfo"
    ></company-tree>
    <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
    <!--多选的单位列表组件-->
    <company-mul v-if="companyMulStatus" ref="comAdd" @getComList="getComList"></company-mul>
  </div>
</template>

<script>
import { isMoney } from "@/utils/validate";
import AddBd from "./addBd";
import CompanyTree from "../contractManager/companyTree";
import AuditProcess from '@/components/auditProcess'
import FileUpload from '@/components/fileUpload'
import companyMul from '@/components/companiesMultiple'
export default {
  data() {
    var validateMoney = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else if (!isMoney(value)) {
        callback(new Error("请输入正确的金额格式"));
      } else {
        callback();
      }
    };
    var innerOrgName = (rule, value, callback) => {
      if(this.detailform.bidInfo.innerOrgName == ''){
        callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    return {
      Authorization:sessionStorage.getItem("token"),
      companyMulStatus:false,//设计单位等多选列表状态
      uploadVisible:false,//上传附件组件状态
      maxMoney: 1000000,
      key: 0,
      BDCSVisible: false, //标段新增弹框状态
      DwVisible: false, //选择单位弹框状态
      options1: [{ label: "值", value: "111" }],
      sjdwList:[],//共享单位库
      detailform: {
        bidInfo: {
          innerOrgId:''
        },
        bidInfoInnerOrgList: [],
        bidInfoSectionList: [],
        topInforBO: {
          capitalName: "",
          topInfor: {},
          topInfoOrg: {},
        },
        bidInfo_01: [],
        bidInfo_02: [],
        value1: [],
        nblht: [], //内部联合体单位列表
      },

      bidInfoSection: [],
      verifySection: [],
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
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
      rules: {
        contractAmount: [
          { required: true, validator: validateMoney, trigger: "change" },
        ],
        innerOrgName:[
          {
            required: true,
            validator: innerOrgName,
            trigger: 'change',
          }
        ]
      }, //表单验证规则
    };
  },
  components: {
    AddBd,
    CompanyTree,
    AuditProcess,
    FileUpload,
    companyMul,//多选的单位列表组件
  },
  computed: {
    bidType() {
      return this.$store.state.bidType;
    },
    bizCode() {
      return this.$store.state.bizCode;
    },
    projectPlate() {
      return this.$store.state.projectPlate;
    },
    amountSource() {
      return this.$store.state.amountSource;
    },
    innerOrgName() {
      return this.$store.state.innerOrgName;
    },
    // bidEvaluationMethodName(){
    //   return this.$store.state.bidEvaluationMethodName;
    // }
    // yesOrNo(){
    //   return this.$store.state.yesOrNo;
    // }
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
    //两个时间戳之间相隔的天数
    getDaysAndHours(startTime,endTime){
      let timeDiff = endTime - startTime;  // 时间差的毫秒数
      // timeDiff = 时间戳差值

      let days = Math.floor(timeDiff / (24 * 3600 * 1000)); // 计算出天数
      let leavel1 = timeDiff % (24 * 3600 * 1000); // 计算天数后剩余的时间
      let hours = Math.floor(leavel1 / (3600 * 1000)); // 计算天数后剩余的小时数
      // let leavel2 = timeDiff % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
      // let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数

      return days;
    },
    //判断是否逾期
    ifYq(){
      if(this.detailform.bidInfo.saleTime||this.detailform.bidInfo.endTime){
        console.log(this.detailform.bidInfo.saleTime<this.detailform.topInforBO.topInfoOrg.flowTime)
        if(this.detailform.bidInfo.saleTime>=this.detailform.topInforBO.topInfoOrg.flowTime){
          this.detailform.bidInfo.lateRegist='1';
          if(this.detailform.bidInfo.endTime&&this.getDaysAndHours(this.detailform.topInforBO.topInfoOrg.flowTime,this.detailform.bidInfo.endTime)<15){
            this.detailform.bidInfo.lateRegist='0';
            this.detailform.bidInfo.overdueType='资审登记逾期';
          }
        }else{
          this.detailform.bidInfo.lateRegist='0'
          this.detailform.bidInfo.overdueType=this.detailform.bidInfo.saleTime<this.detailform.topInforBO.topInfoOrg.flowTime?'跟踪逾期':this.getDaysAndHours(this.detailform.topInforBO.topInfoOrg.flowTime,this.detailform.bidInfo.endTime)<15?'资审登记逾期':'';
        }
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
      this.$forceUpdate();
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
            '/api/contract/topInfo/BidInfo/process/'+type,
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
        file.response.data.progressFlag='stop';
        tableList.forEach((item,index)=>{
          if(item.fileName==file.response.data.fileName&&item.progressFlag!='stop'){
            tableList[index]=file.response.data;
            // console.log(index,'==>',tableList[index])
            this.$set(tableList,index,tableList[index])
            // console.log(tableList[index])
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
    // 附件下载
    attachmentDownload(file){
      this.$handleDownload(file)
    },
    //打开单位弹框
    addDw(type, list) {
      this.DwVisible = true;
      this.$nextTick(() => {
        this.$refs.infoDw.init(type, list);
      });
    },
    //获取单位的值
    getDwInfo(data) {
      console.log(data);
      var list = [];
      var id = [],
        name = [];
      this.$forceUpdate();
      if (data) {
        data.forEach((item) => {
          id.push(item.id);
          name.push(item.detailName);
          var _v = {
            innerOrgId: item.id,
            innerOrgName: item.detailName,
          };
          list.push(_v);
        });
        this.detailform.bidInfoInnerOrgList = list;
        this.detailform.bidInfo.innerOrgId = id.join(",");
        this.detailform.bidInfo.innerOrgName = name.join(",");
      }
      this.$set(this.detailform.bidInfo,this.detailform.bidInfo)
      this.DwVisible = false;
    },
    //复选下拉框框获取name
    getMultipleName(valueList, list, id, name) {
      var _id = [],
        _name = [];
      list.forEach((item) => {
        if (valueList.indexOf(item.id) != -1) {
          _id.push(item.id);
          _name.push(item.detailName);
        }
      });
      this.detailform.bidInfo[id] = _id.join(",");
      this.detailform.bidInfo[name] = _name.join(",");
      // console.log(this.detailform.bidInfo[id]);
    },
    // 上传删除
    handleRemove1(file, index) {
      this.$http
        .post("/api/contract/topInfo/CommonFiles/list/delete", {
          ids: [file.uuid],
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.detailform.bidInfo_02.splice(index, 1);
          }
        });
    },
    //打开标段弹框
    openBd(type, detail, index) {
      console.info("type",type)
      this.BDCSVisible = true;
      var tableList=[],bdList=[];
      this.detailform.bidInfoSectionList.forEach((item)=>{
        tableList.push(item.bidInfoSection.sectionId)
      });
      bdList=this.detailform.topInforBO.topInfoSectionList.filter(item => tableList.indexOf(item.sectionId)==-1);
      // 已经选择的改为空
      bdList.forEach((element, index) => {
        this.detailform.bidInfoSectionList.forEach((item) => {
          if (element.uuid == item.bidInfoSection.sectionId) {
            bdList[index] = ""
          }
        })
      })
      // 去掉已经选择的
      for(var i = 0 ;i<bdList.length;i++) {
        if(bdList[i] =="" || bdList[i] == null || typeof(bdList[i]) == "undefined") {
          bdList.splice(i,1);
          i= i-1;
        }
      }
      // 去掉放弃跟踪的
      for(var i = 0 ;i<bdList.length;i++) {
        if(bdList[i].isTrack == "0" ) {
          bdList.splice(i,1);
          i= i-1;
        }
      }
      this.$nextTick(() => {
        this.$refs.infoBD.init(
          bdList,
          this.detailform.bidInfo.isBidRates,
          type,
          detail,
          index,
          this.p.from=='kblist'?'kbxq':''
        );
      });
    },
    openBd2(row) {
      this.BDCSVisible = true;
      this.$nextTick(() => {
        this.$refs.infoBD.init(
          this.detailform.topInforBO.topInfoSectionList,
          this.detailform.bidInfo.isBidRates,
          "look",
          row
        );
      });
    },
    //获取新增的标段
    getBdInfo(data) {
      // console.log(data);
      if (data.type == "add") {
        this.detailform.bidInfoSectionList.push(data);
      } else if (data.type == "edit") {
        this.detailform.bidInfoSectionList[data.index] = data;
      }
      // console.log(this.detailform.bidInfoSectionList);
      this.BDCSVisible = false;
      this.key = this.key + 1;
    },
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
    //上传附件
    handleChange(response, file, fileList) {
      if (response && response.code === 200) {
        this.$message({
          message: "上传成功",
          type: "success",
          duration: 1500,
          onClose: () => {
            this.detailform.bidInfo_01.push(response.data);
            // console.log(fileList);
          },
        });
      } else {
        this.$message.error(response.msg);
      }
    },
    //null转空字符串
    nullToStr(data) {
      // console.log('1111111',data)
      for (let x in data) {
        // if (data[x] === null&&x !='topInfoTrack_01'){
        if (data[x] === null){
          // 如果是null 把直接内容转为 ''
          data[x] = "";
        } else {
          if (Array.isArray(data[x])) {
            // 是数组遍历数组 递归继续处理
            data[x] = data[x].map((z) => {
              return this.nullToStr(z);
            });
          }
          if (typeof data[x] === "object") {
            // 是json 递归继续处理
            data[x] = this.nullToStr(data[x]);
          }
        }
      }
      //  console.log('2222222',data)
      return data;
    },
    //新增标段
    add(type) {
      var v = {
        bidInfoSection: {},
        verifySection: {},
      };
      v = {
        riskFee: "",
      };
      this.detailform.bidInfoSectionList.push(v);
      console.log(v);
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
      }
    },
    saveInfo(formName,type) {
      // 逾期原因赋值给开标
      this.detailform.kboverdueReaso =  this.detailform.overdueReason
      
      if(this.detailform.bidInfo.innerOrgId == undefined){
        this.detailform.bidInfo.innerOrgId = ''
      }
      if (this.detailform.bidInfo.innerOrgId != ''&&this.detailform.bidInfoInnerOrgList == '') {
        let id = this.detailform.bidInfo.innerOrgId.split(",")
        let name = this.detailform.bidInfo.innerOrgName.split(",")
        let list = [];
        id.forEach((item, index) => {
          var _v = {
            innerOrgId: id[index],
            innerOrgName: name[index],
          };
          list.push(_v);
        });
        this.detailform.bidInfoInnerOrgList = list;
      }
      var url='';
        if(type=='save'){
          url="/api/contract/topInfo/BidInfo/detail/saveOrUpdate"
        }else{
          url="/api/contract/topInfo/BidInfo/process/start"
        }
        if(this.detailform.bidInfo.publishTime>this.detailform.bidInfo.saleTime){
          this.$message.error("招标公告发布日期不能大于招标文件发售截止日期");
          return false;
        }
        if(this.detailform.bidInfo.publishTime>this.detailform.bidInfo.endTime){
          this.$message.error("招标公告发布日期不能大于投标截止日期");
          return false;
        }
        if(this.detailform.bidInfo_01.length==0){
          this.$message.error("附件不能为空");
          return false;
        }
        if(this.detailform.bidInfoSectionList.length==0){
          this.$message.error("标段信息不能为空");
          return false;
        }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.detailform.bidInfo_02=[];
          // this.detailform.srcId='';
          this.$http
            .post(
              url,
              JSON.stringify(this.detailform),
              { useJson: true }
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message:  `${type=='save'?'保存':'提交'}成功`,
                  type: "success",
                });
                if (type=='save') {
                  this.detailform.bidInfo = res.data.data.bidInfo;
                } else {
                  this.$router.back()
                }
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
    showinputchg() {},
    partchg(row) {
      row.showinput = false;
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

    back() {
      this.$router.back();
      // this.$router.push({
      //   path: "/manage/bid_info/list",
      // });
    },

    show(type) {
      this.type = type;
      if (type === "add") {
        this.resetinfo();
        this.title = "新增";
        this.detailform.clothSizePartList.push(this.sizeform);
        // this.dialogVisibleAdd = true
      }
    },
    resetinfo() {
      this.sizeform = {
        id: "",
        part: "",
        showinput: true,
      };
    },

    // 详情信息
    getDetail() {
      // console.log('==>',this.p.instid)
      var url = "";
      if (this.p.actpoint === "searchLook") {
        var q = { id: this.id };
        url = "/api/contract/topInfo/BidInfo/detail/entityInfoSelect";
      } else {
        var q =
          this.p.actpoint === "edit" ||
          (this.p.actpoint === "look")||this.p.actpoint === "task"
            ? { id: this.id ,topInfoOrgId:this.p.topInfoOrgId}
            : { topInfoOrgId: this.p.instid ,verifyId: this.p.verifyId};
        url = "/api/contract/topInfo/BidInfo/detail/entityInfo";
      }

      this.$http.post(url, q).then((res) => {
        var datas = res.data.data;
        datas.bidInfo = this.nullToStr(datas.bidInfo);
        // cons ole.log(datas.bidInfo)
        this.detailform = {
          bidInfo: datas.bidInfo,
          bidInfoInnerOrgList: datas.bidInfoInnerOrgList||[],
          bidInfoSectionList: datas.bidInfoSectionList || [],
          topInforBO: this.nullToStr(datas.topInforBO),
          bidInfo_01: datas.bidInfo_01||[],
          bidInfo_02: datas.bidInfo_02||[],
          value1: [],
          nblht: [],
          verifyInfo:datas.verifyInfo
        };
        if(this.detailform.bidInfo.isCoalitionBid === null || this.detailform.bidInfo.isCoalitionBid=== ''){
          console.info(1111)
          this.detailform.bidInfo.bidModeId = datas.verifyInfo.bidModeId;
          this.detailform.bidInfo.bidModeCode = datas.verifyInfo.bidModeCode;
          this.detailform.bidInfo.bidModeName = datas.verifyInfo.bidModeName;
          if(datas.verifyInfo.isCoalitionBid === '是'){
            this.detailform.bidInfo.isCoalitionBid = '0';
          }else if(datas.verifyInfo.isCoalitionBid === '否'){
            this.detailform.bidInfo.isCoalitionBid = '1';
          }
          this.detailform.bidInfo.innerOrgId = datas.verifyInfo.orgId;
          this.detailform.bidInfo.innerOrgName = datas.verifyInfo.orgName;
          this.detailform.bidInfo.outOrg = datas.verifyInfo.outOrg;
          this.detailform.bidInfo.outOrgId = datas.verifyInfo.outOrgId;
          this.detailform.bidInfo.outOrgCode = datas.verifyInfo.outOrgCode;
        }else{
          //内部联合体回显
          var id = [],
            name = [];
          this.detailform.bidInfoInnerOrgList.forEach((item) => {
            id.push(item.innerOrgId);
            name.push(item.innerOrgName);
          });
          this.detailform.bidInfo.innerOrgId = id!=''?id.join(","):'';
          this.detailform.bidInfo.innerOrgName = name!=''?name.join(","):'';
        }
        // console.log(this.detailform.bidInfo)
        //结束
        // this.detailform.nblht=datas.bidInfo.innerOrgId&&datas.contractInfo.innerOrgId.split(",");
      });
    },

    handleinputionChange(val) {
      this.multipleinpution = val;
    },
  },
  mounted() {
    // this.id=this.p.instid;
    this.id = this.p.instid;
    this.$store.dispatch("getConfig", {});
    if (this.p.actpoint === "edit" || this.p.actpoint === "look" || this.id) {
      this.getDetail();
    }
    //共享单位库列表
    this.$http
      .post(
        "/api/contract/Companies/detail/findCompanies",
      )
      .then((res) => {
        this.sjdwList = res.data.data.records;
        this.sjdwList.forEach((item)=>{
          item.id=item.uuid;
          item.detailName=item.companyName;
          item.detailCode=item.createOrgCode;
        })
      });
  },
};
</script>
<style lang="scss" scoped>
    .div-item >>>.el-form-item{
      display: inline-block;
      width: 32.5%!important;
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
.btn-group {
  text-align: center;
  margin-top: 20px;
}
.gcform {
  margin-top: 10px;
  >>> .el-form-item__label:before {
    position: initial;
    left: -10px;
  }
  >>> .el-form-item__error {
    padding-top: 0px;
    width: 95%;
    margin-left: 0;
    text-align: right;
    top: 0%;
  }
  > .el-form-item,
  >>> .formItem {
    display: inline-block;
    width: 32.5% !important;
  }
  > .el-form-item,
  >>> .formItem1 {
    display: inline-block;
    width: 32.5% !important;
    // display: none;
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

.el-card__body {
  //
  // height: 400px;
  // border: 1px solid black;
  // height: 200px;
}

>>> .el-input--mini .el-input__inner {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  // margin: 10px 0 0 10px;
}

.gcform >>> .el-input {
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
.detailUpload .el-upload-list__item {
  width: 200px;
}
.el-divider--horizontal {
  margin: 30px 0 25px 0;
}
.el-textarea__inner {
  width: 100% !important;
}
</style>

