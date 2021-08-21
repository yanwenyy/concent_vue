<template>
  <div style="position: relative">
          <el-button
            class="detailbutton detail-back-tab"
            @click="back">返回</el-button>
          <el-button
            class="detailbutton detail-back-tab save-btn"
            type="primary"
            @click="saveInfo('detailform','save')"
            v-show="p.actpoint != 'look'&&p.actpoint != 'task'"
          >保存</el-button>
          <el-button
            class="detailbutton detail-back-tab sub-btn"
            @click="saveInfo('detailform','sub')"
            v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.verify.flowStatus=='edit'||detailform.verify.flowStatus=='reject')"
          >提交</el-button>
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

    <el-tabs type="border-card" >
      <el-tab-pane label="资审管理详情">
      <div class="detailBox">
       <el-divider content-position="left" class="detailDivider">项目前期信息</el-divider>
    <el-form
      :inline="false"
      :model="detailform"
      :rules="rules"
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
                v-model="detailform.topInfor.inforName"/>
            </el-form-item>

            <el-form-item  label="外文名称:">
              <el-input
                disabled
                clearable
                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
           <br>
          <div>
            <el-form-item label="项目板块:" class="inline-formitem">
              <template>
                <el-radio-group
                class="detail-radio-group"
                disabled
                v-model="detailform.topInfor.moduleId"
                >
                  <el-radio
                  v-for="(item, index) in projectPlate"
                  :label="item.id" :key="index">{{item.detailName}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            </div>

            <el-form-item label="工程类别(一级):"
                          v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            >
              <el-input
                disabled
                clearable
                filterable
                placeholder="请选择"
                v-model="detailform.topInfor.enginTypeFirstName"
              >
              </el-input>
            </el-form-item>

            <el-form-item
              label="工程类别(二级):"
              v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
            >
              <el-input
                disabled
                placeholder="工程类别(二级)"
                v-model="detailform.topInfor.enginTypeSecondName"
              >
              </el-input>
            </el-form-item>


            <el-form-item label="所属线路:"
                          v-if="(detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb')&&detailform.topInfor.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'">
              <el-input
                disabled
                v-model="detailform.topInfor.belongLineName"
              >
              </el-input>
            </el-form-item>
            <br  v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null">

            <el-form-item
              v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null"
              label="项目性质(一级):"
            >
              <el-input
                disabled
                clearable
                filterable
                placeholder="请选择"
                v-model="detailform.topInfor.projectNatureFirstName"
              >
              </el-input>
            </el-form-item>

            <el-form-item
              v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null"
              label="项目性质(二级):"
            >
              <el-input
                disabled
                clearable
                filterable
                placeholder="请选择"
                v-model="detailform.topInfor.projectNatureSecondName"
              >
              </el-input>
            </el-form-item>
            <br  v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId==null">
            <el-form-item
              v-if="detailform.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
              label="供应产品"
            >
              <el-input
                disabled
                v-model="detailform.topInfor.supplyProductName"
              />
            </el-form-item>
            <el-form-item
              v-if="detailform.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'"
              label="采购性质:"
            >
              <el-input
                disabled
                v-model="detailform.topInfor.purchaseNatureName"
              />
            </el-form-item>
            <br v-if="detailform.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'">
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
                v-model="detailform.topInfor.marketFirstName"
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
                placeholder="请选择"
                v-model="detailform.topInfor.marketSecondName"
              >
              </el-input>
            </el-form-item>
            <br>

            <div class="div-item">
              <el-form-item
                label="装配率(%)"
                v-if="detailform.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"
              >
                <el-input
                  disabled
                  v-model="detailform.topInfor.otherAssemblyRate"
                />
              </el-form-item>

              <el-form-item
                label="装配类型"
                v-if="detailform.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"

              >
              <el-input
                  disabled
                  v-model="detailform.topInfor.otherAssemblyType"
                />
              </el-form-item>

            </div>

            <div class="div-item">
              <el-form-item
                label="建筑类型"
                v-if="detailform.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"
              >
              <el-input
                  disabled
                  v-model="detailform.topInfor.otherBuildingType"
                />
              </el-form-item>

              <el-form-item
                label="建筑结构类型"
                v-if="detailform.topInfor.marketFirstNameId=='00b87acd71784c3ba860b9513789724e'"
              >
                <el-input
                  disabled
                  v-model="detailform.topInfor.otherBuildingStructureType"
                />
              </el-form-item>

              <el-form-item
                label="场地名称"
                v-if="detailform.topInfor.marketFirstNameId=='50cd5e9992ac4653920fac8c1f2eb2e3'"
              >
                <el-input
                  disabled
                  v-model="detailform.topInfor.siteName"
                />
              </el-form-item>
            </div>


            <el-form-item
              :label="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'建设单位:':'客户名称:'"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                v-model="detailform.topInfor.constructionOrg"
              />
            </el-form-item>

              <el-form-item
                v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'||detailform.topInfor.moduleId=='510ba0d79593418493eb1a11ed3e7df4'||detailform.topInfor.moduleId==null"
                label="设计单位:">
              <el-input
                disabled
                v-model="detailform.topInfor.designOrg"
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
                placeholder="公告类型"
                v-model="detailform.topInfor.noticeTypeName"
              >

              </el-input>
            </el-form-item>

            <el-form-item label="资审方式:">
              <el-input
                disabled
                clearable
                placeholder="资审方式"
                v-model="detailform.topInfor.verifyTypeName"
              />
            </el-form-item>
            <br>
            <el-form-item
              v-if="detailform.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="招标人:"
                          :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                v-model="detailform.topInfor.bidPerson"
              />
            </el-form-item>

            <el-form-item
              v-if="detailform.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
              label="招标代理公司:">
              <el-input
                disabled
                v-model="detailform.topInfor.bidAgentCompany"
              />
            </el-form-item>

            <el-form-item
              v-if="detailform.topInfor.noticeTypeId!='9d70138b32d611eb8271a1606dfca13c'"
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
                v-model="detailform.topInfor.planBidTime"
              >
              </el-date-picker>
            </el-form-item>
            <br>
            <el-form-item
              :label="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'?'投资额（万元）:':'项目规模:'"
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
            v-model="detailform.topInfor.investment"
          >
          <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
          </el-input>
<!--              <el-input-->
<!--                disabled-->
<!--                clearable-->
<!--                placeholder="投资额（万元）:"-->
<!--                v-model="detailform.topInfor.investment"-->
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
                v-model="detailform.capitalName"
              >
              </el-input>
            </el-form-item>

            <el-form-item  label="是否为重大项目:">
              <el-switch

                class="inline-formitem-switch"
                v-model="detailform.topInfor.isMajorProject"
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
               v-show="detailform.topInfor.investment<maxMoney&&detailform.topInfor.isMajorProject=='0'"
               label="重大项目说明"
             >
              <el-input
                disabled
                v-model="detailform.topInfor.majorProjectExplain"
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
                v-model="detailform.verify.projectTrackResponPerson"
              >
              </el-input>
              </el-form-item>

              <el-form-item  class="formItem"  label="联系电话:">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailform.verify.tioContactMode"
              >
              </el-input>
              </el-form-item>

            <el-form-item  label="预计中标概率:">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailform.verify.bidProbName"
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
                v-model="detailform.topInfor.inforContent"
              />
            </el-form-item>
            </div>
       <el-divider content-position="left" class="detailDivider">资审信息</el-divider>

        <!-- --------------------------------------------------------------- -->
        <el-form-item
         label="招标方式:"
         class="formItem"
       >
              <el-select
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                filterable
                clearable
                placeholder="请选择"
                v-model="detailform.verify.bidModeId"
                @change="
                getName(
                  detailform.verify.bidModeId,
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
          v-if="detailform.verify.flowStatus!='pass'&&detailform.verify.lateRegist=='0'"
          label="是否逾期:"
          class="formItem"
        >
          <el-switch
            disabled
            v-model="detailform.verify.lateRegist"
            active-value="0"
            inactive-value="1"
          />
      </el-form-item>
      <el-form-item
        v-if="detailform.verify.lateRegist=='0'"
        label="逾期类型:"
        class="formItem"
      >
        <el-input
          disabled
          v-model="detailform.verify.overdueType"
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
            clearable
            :disabled="p.actpoint === 'look'||p.actpoint=='task'"
            value-format="timestamp"
            v-model="detailform.verify.publishTime"
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
            @change="ifYq"
            clearable
            :disabled="p.actpoint === 'look'||p.actpoint=='task'"
            value-format="timestamp"
            v-model="detailform.verify.saleTime"
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
        }">
          <el-date-picker
            @change="ifYq"
            clearable
            :disabled="p.actpoint === 'look'||p.actpoint=='task'"
            value-format="timestamp"
            v-model="detailform.verify.subTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
          <br>
         <el-form-item
           label="是否联合体投标:"

         >
                    <!-- prop="verify.isCoalitionBid"
           :rules="{
                  required: true, message: '此项不能为空', trigger: 'blur'
                }" -->
         <el-switch
           :disabled="p.actpoint === 'look'||p.actpoint=='task'"
           v-model="detailform.verify.isCoalitionBid"
           active-value="是"
           inactive-value="否"
           @change="detailform.verify.isCoalitionBid=='否'?(detailform.verify.orgName='',detailform.verify.outOrg=''):''"
         />
        </el-form-item>
        <el-form-item  label="内部联合体单位:"
                       prop="verify.orgName"
                       :rules="detailform.verify.isCoalitionBid=='是'&&(detailform.verify.outOrg==''||detailform.verify.outOrg==null)?{
                        required: true,
                        message: '此项不能为空',
                        trigger: 'change',
                      }:{}">
          <el-input v-model="detailform.verify.orgName"
          :disabled="p.actpoint === 'look'||p.actpoint === 'task' || detailform.verify.isCoalitionBid=='否' || detailform.verify.isCoalitionBid==null">
            <!--<el-button slot="append" icon="el-icon-search"  @click="selectOrg()"-->
            <!--v-if="p.actpoint != 'look' && detailform.verify.isCoalitionBid != '否' && detailform.verify.isCoalitionBid != null"-->
            <!--&gt;</el-button>-->
            <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('内部联合体单位',detailform.verify.orgId)"
                       v-if="p.actpoint != 'look'&&p.actpoint != 'task' && detailform.verify.isCoalitionBid != '否' && detailform.verify.isCoalitionBid != null"
            ></el-button>
            <!-- :disabled="p.actpoint === 'look' || detailform.verify.isCoalitionBid=='否'|| detailform.verify.isCoalitionBid==null" -->
          </el-input>
        </el-form-item>

        <el-form-item label="外部联合体单位:"
                      prop="verify.outOrg"
                      :rules="detailform.verify.isCoalitionBid=='是'&&(detailform.verify.orgName==''||detailform.verify.orgName==null)?{
                        required: true,
                        message: '此项不能为空',
                        trigger: 'change',
                      }:{}">
          <el-input
            placeholder=""
            size="mini"
            :disabled="p.actpoint === 'look' || detailform.verify.isCoalitionBid=='否' || detailform.verify.isCoalitionBid==null||p.actpoint=='task'"
            v-model="detailform.verify.outOrg"
          >
            <el-button v-if="p.actpoint != 'look' &&p.actpoint != 'task'&& detailform.verify.isCoalitionBid != '否' && detailform.verify.isCoalitionBid != null" slot="append" icon="el-icon-circle-plus-outline" @click="openComMul(detailform.verify.outOrgId,detailform.verify.outOrg,'/api/contract/Companies/detail/findCompanies','外部联合体单位')"></el-button>
          <!--<el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('外部联合体单位',detailform.verify.outOrgId)"-->
                     <!--v-if="p.actpoint != 'look' &&p.actpoint != 'task'&& detailform.verify.isCoalitionBid != '否' && detailform.verify.isCoalitionBid != null"-->
          <!--&gt;</el-button>-->
          </el-input>
        </el-form-item>

<!-- 下拉 -->




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
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable
                placeholder="请输入"
                type="textarea"
                size="mini"
                v-model="detailform.verify.verifyExplain"
              />
            </el-form-item>
            </div>
            <div>
              <el-form-item
                v-if="detailform.verify.flowStatus!='pass'&&detailform.verify.lateRegist=='0'"
                class="neirong"
                label="逾期原因:"
                prop="verify.overdueReason"
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
                  size="mini"
                  v-model="detailform.verify.overdueReason"
                />
              </el-form-item>
            </div>
      <div>

            <p class="detail-title"><span  class="uploadSpan">附件: </span>
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-button
                v-show="p.actpoint !== 'look'&&p.actpoint!='task'"
                size="small"
                type="primary"
                @click="openFileUp('/api/contract/topInfo/CommonFiles/verify/01/uploadFile','commonFilesList')">
                点击上传
              </el-button>
              <!--<el-upload v-show="p.actpoint != 'look'"-->
                <!--class="upload-demo detailUpload"-->
                <!--:action="'/api/contract/topInfo/CommonFiles/verify/01/uploadFile'"-->
                <!--:on-success="handleChange"-->
                <!--:on-error="handleChange"-->
                <!--:on-remove="handleRemove"-->
                <!--multiple-->
              <!--&gt;-->
              <!--<el-button type="primary">点击上传</el-button>-->
            <!--</el-upload>-->
            </p>
            </div>
    <div>
      <el-table
        :data="detailform.commonFilesList"
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
                <el-table-column align="center" :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :resizable="false" label="大小(KB)" prop="fileSize" width="120" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" :resizable="false" label="类型" prop="fileType" width="80" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center"
                  :resizable="false"
                  label="操作"
                  show-overflow-tooltip
                  v-if="p.actpoint!=='look'&&p.actpoint!=='task'"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
    </div>
<p  v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'" class="detail-title" style="overflow: hidden;margin-right:30px">
     <span  >标段信息: </span>
      <el-button
       @click="dialogTopInfoSection=true"
       v-show="p.actpoint != 'look'&&p.actpoint!='task'"
       class="detatil-flie-btn"
            type="primary"
          >新增</el-button>
</p>
       <!-- && dialogTopInfoSection. == []   &&checked-->

      <el-table
        v-if="detailform.topInfor.moduleId=='7f4fcba4255b43a8babf15afd6c04a53'||detailform.topInfor.moduleId=='f6823a41e9354b81a1512155a5565aeb'"
        :data="detailform.verifySectionList"
        :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
        align="center"
        @cell-click="selectOrg1"
        :row-class-name="tableRowClassName"
        border
        class="detailTable"
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
          v-show="p.actpoint != 'look'"
          width="500">

          <template slot-scope="scope" v-show="p.actpoint != 'look'&&p.actpoint != 'task'">
            <el-input  readonly placeholder="请输入内容" v-model="scope.row.verifySectionOrgNameType01" class="input-with-select"/>
          </template>
        </el-table-column>
        <el-table-column

          :resizable="false"
          label="编标拟配合单位"
          align="center"
          prop="verifySectionOrgNameType02"
          show-overflow-tooltip
          v-show="p.actpoint != 'look'"
          width="500">

          <template slot-scope="scope" v-show="p.actpoint != 'look'">
            <el-input  readonly placeholder="请输入内容" v-model="scope.row.verifySectionOrgNameType02" class="input-with-select"/>
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
            <!--:prop="'verifySectionList.' + scope.$index + '.verifySection.investmentReckon'" :rules='rules.contractAmount'-->
            <el-form-item class="tabelForm">
              <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
              <el-tooltip popper-class="tooltip-class" :content="String(scope.row.verifySection.investmentReckon)" placement="bottom" :disabled="p.actpoint !== 'look'" effect="dark">
                <el-input
                  class="group-no-padding"
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  placeholder=""
                  size="mini"
                  v-model="scope.row.verifySection.investmentReckon"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-tooltip>

            </el-form-item>

          </template>
        </el-table-column>
        <el-table-column

          :resizable="false"
          label="其中建安投资"
          align="center"
          prop="jananInvestment"
          show-overflow-tooltip
          v-show="p.actpoint != 'look'"
          width="260">

          <template slot-scope="scope" >
            <!--:prop="'verifySectionList.' + scope.$index + '.verifySection.jananInvestment'" :rules='rules.contractAmount'-->
            <el-form-item class="tabelForm">
              <!--@input="scope.row.contractAmount=getMoney(scope.row.contractAmount)"-->
              <el-tooltip popper-class="tooltip-class" :content="String(scope.row.verifySection.jananInvestment)" placement="bottom" :disabled="p.actpoint !== 'look'" effect="dark">
                <el-input
                class="group-no-padding"
                  :disabled="p.actpoint === 'look'||p.actpoint === 'task'"
                  placeholder=""
                  size="mini"
                  v-model="scope.row.verifySection.jananInvestment"
                  @input="calcTzys(scope.row.verifySection.jananInvestment,scope.row.verifySection.investmentReckon,scope.$index,detailform.verifySectionList)"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-tooltip>

            </el-form-item>

          </template>
        </el-table-column>
        <el-table-column
          v-show="p.actpoint != 'look'"
          :resizable="false"
          fixed="right"
          label="操作"
          align="center"
          show-overflow-tooltip
          v-if="p.actpoint !== 'look'&&p.actpoint !== 'task'"
          width="80">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              @click="del(scope.$index,scope.row,detailform.verifySectionList,'bd')"
              type="warning">删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>


    </el-form>

    </div>
    </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'&&detailform.verify.flowStatus!='edit'&&detailform.verify.flowStatus!=null">
        <Audit-Process :task="p.task||{businessId:p.newUuid+'-'+p.uuid,businessType:' contract_qual_new'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="前期项目标段列表" :visible.sync="dialogTopInfoSection">
    <el-table
      :data="detailform1.topInfoSectionList"
      :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
      @selection-change="handleSelectionChange"
      align="center"
      :row-class-name="tableSection"
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
        show-overflow-tooltip
      >

      </el-table-column>


<!--      <el-table-column-->
<!--        v-show="!p.actpoint === 'look'"-->
<!--        :resizable="false"-->
<!--        fixed="right"-->
<!--        label="操作"-->
<!--        align="center"-->
<!--        show-overflow-tooltip-->
<!--        v-if="p.actpoint !== 'look'"-->
<!--        width="200">-->
<!--        <template slot-scope="scope">-->
<!--          <el-link-->
<!--            :underline="false"-->
<!--            @click="addSection(scope.$index,scope.row,detailform1.topInfoSectionList,'bd')"-->
<!--            type="warning">选择-->
<!--          </el-link>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
  </div>

</template>

<script>
import TreeOrg from '@/components/treeOrg'
import { isMoney } from '@/utils/validate'
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
      companyMulStatus:false,//设计单位等多选列表状态
      DwVisible:false,//选择单位弹框状态
      uploadVisible:false,//上传附件组件状态
      maxMoney:1000000,
      treeOrgStatas: false,
      treeOrgStatas1: false,
      treeOrgStatas2: false,
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      detailform: {
         verify:{
           orgName:'',
           outOrg:''
         },
        'topInfor': {
        },
        'sectionStr': [
        ],
        'verifySectionList': [

        ],
        'verifyOrgList': [
        ],
        verifyOrgLists:"111",
        commonFilesList:[]
      },
      verifySectionListSplit:[],//删除的标段信息缓存数组
      detailform1: {
        topInfor: {},
        topInfoOrg: {},
        topInfoSiteList: [],
        topInfoSectionList: [],
      },
      checked:false,
      dialogTopInfoSection:false,
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
      myVerifySection:{},
      myVerifySection1:{},
      multipleSelection:[],
      multipleSelection1:[],
      rules:{
        contractAmount: [
          { required: true,validator: validateMoney, trigger: 'change' }
        ]
      },//表单验证规则
    }
  },
  computed: {
    topInfoSectionList(){
      return this.detailform1.topInfoSectionList.filter((data) => {
        return data.isTrack== '1'
      })
    },
    bidType () {
      return this.$store.state.bidType
    },
    yesOrNo () {
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
    tableSection({ row, rowIndex }){
      if(this.detailform1.topInfoSectionList[rowIndex] != null && this.detailform1.topInfoSectionList[rowIndex].isTrack === "0"){
        return "none-show"
      }else{
        return "";
      }
    },
    //获取拿过来的多选单位列表
    getComList(data){
      console.log(data)
      this.$forceUpdate();
      if(data.type=='外部联合体单位'){
        this.detailform.verify.outOrgId=data.selIdList.join(",");
        this.detailform.verify.outOrg=data.selList.join(",");
      }
    },
    //计算建安投资<=投资预算
    calcTzys(val,tzval,index,list){
      if(Number(val)>Number(tzval)){
        this.$message.error("其中建安投资不能大于投资估算");
        list[index].verifySection.jananInvestment='';
        return false;
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
      console.log(data)
      this.$forceUpdate();
      var id=[],name=[];
      if(data&&data.type!='参与投标单位'&&data.type!='编标拟配合单位'){
        data.forEach((item)=>{
          id.push(item.id);
          name.push(item.detailName);
        })
      }
      if(data.type=="内部联合体单位"){
        this.detailform.verify.orgId=id.join(",");
        this.detailform.verify.orgName=name.join(",");
        this.$set(this.detailform.verify,this.detailform.verify)
      }else if(data.type=="外部联合体单位"){
        this.detailform.verify.outOrgId=id.join(",");
        this.detailform.verify.outOrg=name.join(",");
        this.$set(this.detailform.verify,this.detailform.verify)
      }else if(data.type=='参与投标单位'){
        var _list=[];
        data.forEach((item)=>{
          _list.push({ orgId:item.id,orgName:item.detailName,orgType:"01",uuid:item.uuid});
          name.push(item.detailName);
        })
        this.detailform.verifySectionList[data.index].verifySectionOrgNameType01=name.join(",");
        this.detailform.verifySectionList[data.index].verifySectionOrgListType01=_list;
        this.$set(this.detailform.verifySectionList,this.detailform.verifySectionList);
      }else if(data.type=="编标拟配合单位"){
        var _list=[];
        data.forEach((item)=>{
          _list.push({ orgId:item.id,orgName:item.detailName,orgType:"02",uuid:item.uuid});
          name.push(item.detailName);
        })
        this.detailform.verifySectionList[data.index].verifySectionOrgNameType02=name.join(",");
        this.detailform.verifySectionList[data.index].verifySectionOrgListType02=_list;
        this.$set(this.detailform.verifySectionList,this.detailform.verifySectionList);
      }
      this.DwVisible=false;
    },
    //判断是否逾期
    ifYq(){
      if(this.detailform.verify.saleTime||this.detailform.verify.subTime){
        if(this.detailform.verify.saleTime>=this.detailform1.topInfoOrg.flowTime){
          this.detailform.verify.lateRegist='1';
          if(this.detailform.verify.subTime<this.detailform1.topInfoOrg.flowTime){
            this.detailform.verify.lateRegist='0';
            this.detailform.verify.overdueType='资审登记逾期';
          }
        }else{
          this.detailform.verify.lateRegist='0';
          this.detailform.verify.overdueType=this.detailform.verify.saleTime<this.detailform1.topInfoOrg.flowTime?'跟踪逾期':this.detailform.verify.subTime<this.detailform1.topInfoOrg.flowTime?'资审登记逾期':''
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
              '/api/contract/topInfo/Verify/process/'+type,
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
//获取下拉框id和name的公共方法
    getName(id, list, name,code) {
      if(id){
        this.$forceUpdate();
          this.detailform.verify[name] = list.find(
              (item) => item.id == id
          ).detailName;
          this.detailform.verify[code] = list.find(
              (item) => item.id == id
          ).detailCode;
      }
    },
    back() {
      this.$router.back()
      // this.$router.push({
      //   path: "/manage/proposal/list",
      // });
    },
    saveInfo(formName,type){
      //alert(formName);
        //alert(this.$refs.formName.validate())
        var url='';
        if(type=='save'){
          url="/api/contract/topInfo/Verify/detail/saveOrUpdate"
        }else{
          url="/api/contract/topInfo/Verify/process/start"
        }
        if(this.detailform.verify.publishTime > this.detailform.verify.saleTime){
          this.$message.error("资格预审公告发布日期不能大于资审文件发售截止日期");
          return false;
        }
        if(this.detailform.verify.publishTime > this.detailform.verify.subTime){
          this.$message.error("资格预审公告发布日期不能大于递交资格预审申请文件日期");
          return false;
        }
        if(this.detailform.commonFilesList.length==0){
          this.$message.error("附件必须上传");
          return false;
        }
        // if(this.detailform.verify.isCoalitionBid=='是'&&this.detailform.verify.orgName==''&&this.detailform.verify.outOrg==''){
        //   this.$message.error("内部联合体单位和外部联合体单位至少有一个不能为空");
        //   return false;
        // }
        this.detailform.verifyOrgList=[{orgId:this.detailform.verify.orgId,orgName:this.detailform.verify.orgName}];
       this.$refs[formName].validate((valid) => {
         //alert(valid);
        if (valid) {
          //alert(JSON.stringify(this.detailform));
          if(this.detailform.verifySectionList.length==0){
            this.$message.error("标段信息不能为空");
          }else{
            this.detailform.verifySectionList=this.detailform.verifySectionList.concat(this.verifySectionListSplit);
            var obj = Object.assign(this.detailform, this.detailform1);
            this.$http
              .post(
                url,
                JSON.stringify(obj),
                { useJson: true }
              )
              .then((res) => {

                if (res.data.msg === "SUCCESS") {
                  this.$message({
                    message:  `${type=='save'?'保存':'提交'}成功`,
                    type: "success",
                  });
                  this.$router.back();
                }else{
                  this.$message.error(res.data.msg)
                }

              });
          }

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
    showinputchg() {},
    partchg(row) {
      row.showinput = false
    },

    del(index,item,list,type) {
      this.$confirm('确认删除该标段吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(item.verifySection.uuid!=''){
          item.verifySection.isDelete='1';
          // this.detailform.verifySectionList=list.filter((item)=> item.verifySection.isDelete!='1')
          // console.log(this.detailform.verifySectionList)
          this.verifySectionListSplit=list.splice(index, 1);
          // list.splice(index, 1);
          this.$set(this.detailform,this.detailform)
        }else{
          list.splice(index, 1);
        }
        // this.$set(this.detailform.verifySectionList,list);
        this.$forceUpdate();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

      // console.log(index);
      // list.splice(index, 1);

    },
    selectOrg(){
      this.treeOrgStatas = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    getTreeOrg(data) {

      // console.log(data)
      this.treeStatas = false;
      this.detailform.verifyOrgList=[];
      var resultStr = "";
      data.forEach((item, index) => {

        var verifyOrg={ orgId:item.name,orgName:item.name};
        this.detailform.verifyOrgList.push(verifyOrg)
        resultStr+=item.name+"，";
      });
      this.detailform.verifyOrgLists =resultStr.substring(0,resultStr.length-1);
      // this.detailform.verifyOrgLists=resultStr;
      // alert(this.detailform.verifyOrgLists);
      console.log(this.detailform.verifyOrgLists)
      // this.key = this.key + 1;
    },
    getTreeOrg1(data) {

      console.log(data)

      this.treeOrgStatas1 = false;

      var resultStr = "";
      this.myVerifySection.verifySectionOrgList= [];
      data.forEach((item, index) => {

        var VerifySectionOrg={ orgId:item.name,orgName:item.name,orgType:"01"};
        this.myVerifySection.verifySectionOrgList.push(VerifySectionOrg)
        resultStr+=item.name+"，";
      });
       this.detailform.verifySectionList[this.myVerifySection.index].verifySectionOrgNameType01 =resultStr.substring(0,resultStr.length-1);
       this.detailform.verifySectionList[this.myVerifySection.index].verifySectionOrgListType01=this.myVerifySection.verifySectionOrgList;
      // this.detailform.verifyOrgLists=resultStr;
      // alert(this.detailform.verifyOrgLists);
      console.log(this.detailform.verifySectionList)
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
        resultStr+=item.name+"，";
      });
      this.detailform.verifySectionList[this.myVerifySection1.index].verifySectionOrgNameType02
        =resultStr.substring(0,resultStr.length-1);
      this.detailform.verifySectionList[this.myVerifySection1.index].verifySectionOrgListType02=this.myVerifySection1.verifySectionOrgList;
      // this.detailform.verifyOrgLists=resultStr;
      // alert(this.detailform.verifyOrgLists);
      console.log(this.detailform.verifySectionList)
      // this.key = this.key + 1;
    },
    selectOrg1(row, column, cell, event){
      // console.log(row, column, cell, event)
      // alert(JSON.stringify(row));
      if(column.label==="参与投标单位"&&this.p.actpoint != 'look'&&this.p.actpoint!='task') {
        // this.myVerifySection = row;
        // this.treeOrgStatas1 = true;
        // //console.log(this.positionIndex);
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
      }else if(column.label==="编标拟配合单位"&&this.p.actpoint != 'look'&&this.p.actpoint!='task') {
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
    addSection()
    {
      this.dialogTopInfoSection = false;
      this.multipleSelection.forEach((item, index) => {
        console.log(item.uuid)
        console.log(index)

        var vsl = {
          sectionId: item.uuid,
          verifyId:this.detailform.verify.uuid,
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
        this.detailform.verifySectionList.forEach((item1, index1) => {
          if (item.uuid == item1.verifySection.sectionId&&item1.verifySection.isDelete!='1') {
            isadd = false;
          }
        })
        if (isadd) {
          vsBo.verifySection=vsl;
          this.detailform.verifySectionList.push(vsBo);
        } else {
          this.$message.error('请不要重复添加')
        }
      });
    },

    show(type) {
      let p1 = { actpoint: 'add',instid: this.p.topinfoid}
      this.$router.push({
        path: '../list_Section/',
        query: { p: this.$utils.encrypt(JSON.stringify(p1)) }
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
    carry(formName) {
      if ([...new Set(this.detailform.clothSizePartList.map(item => item.part))].length < this.detailform.clothSizePartList.length) {
        this.$message.error('部位填写重复')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              '/api/contract/topInfo/Verify/detail/save',
              JSON.stringify(this.detailform), {useJson: true}
            )
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.$refs[formName].resetFields()
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
          this.$message.error('请添加必填项')
          return false
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //alert(valid);
        if (valid) {
          //alert(JSON.stringify(this.detailform));
          // console.log(JSON.stringify(this.detailform));
          this.detailform.verify.flowStatus="1";
          var obj = Object.assign(this.detailform, this.detailform1);
          this.$http
            .post(
              "/api/contract/topInfo/Verify/detail/saveOrUpdate",
              JSON.stringify(obj),
              { useJson: true }
            )
            .then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.$refs[formName].resetFields();
              }

            });
        } else {
          this.$message.error("请添加必填项");
          return false;
        }
      });
    },
    handleRemove(file,index) {
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
    // handleChange(response, file, fileList){
    //   if (response && response.code === 200) {
    //     this.$message({
    //       message: '上传成功',
    //       type: 'success',
    //       duration: 1500,
    //       onClose: () => {
    //         console.log(response.data)
    //         console.log( JSON.stringify(this.detailform.commonFilesList))
    //         console.log( JSON.stringify(this.detailform))
    //         if(response.data.uuid!=null) {
    //           //var list =[];
    //           //this.detailform.commonFilesList = list;
    //           var commonFile = {
    //
    //             uuid: response.data.uuid,
    //             businessId: response.data.businessId,
    //             businessType: response.data.businessType,
    //             businessCode: response.data.businessCode,
    //             fileName: response.data.fileName,
    //             fileType: response.data.fileType,
    //             fileSize: response.data.fileSize,
    //             filePath: response.data.filePath,
    //             remarks: response.data.remarks,
    //             createTime: response.data.createTime,
    //             createUserId: response.data.createUserId,
    //             createUserName: response.data.createUserName,
    //             createOrgId: response.data.createOrgId,
    //             createOrgName: response.data.createOrgName
    //           }
    //           if(this.detailform.commonFilesList==null)
    //           {
    //             var list =[];
    //             list.push(commonFile);
    //             this.detailform.commonFilesList = list;
    //           }else {
    //             this.detailform.commonFilesList.push(commonFile);
    //           }
    //           // this.detailform.commonFilesList.push(commonFile);
    //         }
    //
    //         //this.detailform.commonFilesList.push(response.data);
    //         console.log( JSON.stringify(this.detailform.commonFilesList))
    //       }
    //     })
    //   } else {
    //     this.$message.error(response.msg)
    //   }
    // },


    // sure() {
    //   console.log(this.sizeform)
    //   this.$refs['sizeform'].validate(valid => {
    //     if (valid) {
    //       this.detailform.clothSizePartList.push(this.sizeform)
    //       this.dialogVisibleAdd = false
    //     } else {
    //       console.log('error submit!')
    //       return false
    //     }
    //   })
    // },
    //加载本页面数据


    // 加载列表
    getDetail() {
      this.$http
        .post(
          '/api/contract/topInfo/Verify/detail/entityInfo',
          // '/api' + this.$route.path.substr(0, this.$route.path.length - 1),
          {"id":this.p.task?this.p.instid.split("-")[1]:this.p.topinfoid},
         // {"id":this.p.task?this.p.instid:this.p.topinfoid}
        )
        .then(res => {
          this.detailform = res.data.data;
          var datas=res.data.data;
           this.detailform={
             capitalName:datas.capitalName,
            'verify':datas.verify||{},
            'topInfor': datas.topInfor||{},
            'sectionStr':datas.sectionStr||'',
            'verifySectionList':datas.verifySectionList||[],
            'verifyOrgList': datas.verifyOrgList||[],
            verifyOrgLists:datas.verifyOrgLists,
            commonFilesList:datas.commonFilesList||[],
          };
          this.detailform.verify.orgId=datas.verifyOrgList[0].orgId;
          this.detailform.verify.orgName=datas.verifyOrgList[0].orgName;
          this.ifYq();
          // console.log( JSON.stringify(this.detailform.verifySectionList))
          // console.log( JSON.stringify(this.detailform.topInfor))
        })
         //alert(JSON.stringify(this.p))
      // this.detailform.Verify.contactMode = this.p.selectrow.contactMode;
      // this.detailform.TopInfor.inforName = this.p.selectrow.inforName;
      // this.detailform.TopInfor.enginTypeFirstName = this.p.selectrow.enginTypeFirstName;
      // this.detailform.TopInfor.enginTypeSecondName = this.p.selectrow.enginTypeSecondName;
      // this.detailform.TopInfor.noticeTypeName = this.p.selectrow.noticeTypeName;
      // this.detailform.TopInfor.constructionOrg = this.p.selectrow.constructionOrg;
      // this.detailform.TopInfor.inforContent = this.p.selectrow.inforContent;
      // this.detailform.TopInfor.bidAgentCompany = this.p.selectrow.bidAgentCompany;
    },
   getTopInforDetail() {

    this.$http
      .post("/api/contract/topInfo/TopInfor/detail/entityInfo", {topOrgId:this.p.task?this.p.instid.split("-")[1]:this.p.topinfoid})
      .then((res1) => {
        var datas=res1.data.data;
        // this.getTwo(datas.topInfor.enginTypeFirstId);
        // this.getTwoSC(datas.topInfor.marketFirstNameId);
        // datas.topInforCapitalList.forEach((item)=>{
        //   this.value1.push(item.capitalId)
        // });
        this.detailform1={
          topInfor: datas.topInfor,
          topInfoOrg: datas.topInfoOrg,
          topInfoSiteList: datas.topInfoSiteList,
          topInfoSectionList: datas.topInfoSectionList,
        }
        this.ifYq();
        //alert( JSON.stringify(this.detailform1.topInfoSiteList))
      });
  },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val
    }

  },
  mounted() {
    //alert(2);
    //this.$store.dispatch('getConfig', { })
    // eslint-disable-next-line no-unde
    this.getDetail()
    this.getTopInforDetail();
    this.$store.dispatch("getConfig", {});
  }
}
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
>>>.el-form-item__label{
  width: auto;
}
/*>>>.el-upload-list{*/
  /*display: none;*/
/*}*/
.uploadSpan{
  font-size: 16px;
  color: #303133;
}
>>>.el-form-item__error {
  padding-top: 0px;
  width: 95%;
  margin-left: 0;
  text-align: right;
  top: 0%;
}
.neirong >>>.el-form-item__error
{
  padding-top:0px !important;
}
  >>>.none-show{
    display: none!important;
  }
</style>
