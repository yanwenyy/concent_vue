<template>
  <el-tabs type="border-card">
    <el-tab-pane label="项目原信息">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button
            @click="back"
            style="
              float: right;
              padding: 10px 20px;
              border: 1px solid #ddd;
              color: black;
            "
            type="text"
            >返回</el-button
          >
        </div>
        <div class="detail-class-tltle">项目前期信息:</div>
        <!--<div class="detailBox">-->
        <el-form :inline="false" :model="detailFormBefore" class="gcform">
          <el-form-item label="项目板块:">
            <el-input
              v-model="detailFormBefore.topInfor.moduleName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="工程类别(一级):">
            <el-input
              v-model="detailFormBefore.topInfor.enginTypeFirstName"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="工程类别(二级):">
            <el-input
              v-model="detailFormBefore.topInfor.enginTypeSecondName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="项目名称:">
            <el-input
              v-model="detailFormBefore.topInfor.inforName"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="建设单位:">
            <el-input
              v-model="detailFormBefore.topInfor.constructionOrg"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="公告类型:">
            <el-input
              v-model="detailFormBefore.topInfor.noticeTypeName"
              disabled
            ></el-input>
          </el-form-item>
          <!-- 下拉 -->
          <el-form-item label="预计招标时间:">
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

          <!-- 下拉 -->

          <el-form-item label="所属线路:">
            <el-input
              v-model="detailFormBefore.topInfor.belongLineName"
              disabled
            ></el-input>
          </el-form-item>
          <!-- --------------------------------------------------------------- -->
          <el-form-item label="招标人:">
            <el-input
              v-model="detailFormBefore.topInfor.bidPerson"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="设计单位:">
            <el-input
              v-model="detailFormBefore.topInfor.designOrg"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="招标代理公司:">
            <el-input
              v-model="detailFormBefore.topInfor.bidAgentCompany"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="项目性质(一级):">
            <el-input
              v-model="detailFormBefore.topInfor.projectModelName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="项目性质(二级):">
            <el-input
              v-model="detailFormBefore.topInfor.projectModelName"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="资审方式:">
            <el-input
              v-model="detailFormBefore.topInfor.verifyTypeId"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="资金来源:" prop="capitalId">
            <el-input
              v-model="detailFormBefore.capitalName"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item
            label="投资额（万元）:"
            prop="topInfor.investment"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="detailFormBefore.topInfor.investment"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="新兴市场(一级):">
            <el-input
              v-model="detailFormBefore.topInfor.marketFirstName"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="新兴市场(二级):">
            <el-input
              v-model="detailFormBefore.topInfor.marketSecondName"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="是否为重大项目:">
            <el-select
              :disabled="true"
              filterable
              clearable
              placeholder="请选择"
              size="mini"
              v-model="detailFormBefore.topInfor.isMajorProject"
            >
              <el-option
                :key="index + '__'"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in yesOrNo"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计中标概率:">
            <el-input
              v-model="detailFormBefore.topInfor.bidProbName"
              disabled
            ></el-input>
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
                size="mini"
                v-model="detailform.topInfor.investment"
              />
            </el-form-item> -->

          <div>
            <el-form-item label="项目跟踪负责人:">
              <el-input
                v-model="detailFormBefore.topInfoOrg.projectTrackResponPerson"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input
                v-model="detailFormBefore.topInfoOrg.contactMode"
                disabled
              ></el-input>
            </el-form-item>
          </div>

          <el-form-item class="neirong" label="项目内容:">
            <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
            <el-input
              :disabled="true"
              type="textarea"
              clearable
              placeholder="请输入"
              size="mini"
              v-model="detailFormBefore.topInfor.inforContent"
            />
          </el-form-item>
          <div class="detail-class-tltle">投标信息:</div>
          <el-form-item label="投标截止日期:">
            <el-input
              v-model="detailFormBefore.topInfor.bidProbName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="招标公告发布日期:">
            <el-input
              v-model="detailFormBefore.topInfor.bidProbName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="招标文件发售截止日期:">
            <el-input
              v-model="detailFormBefore.topInfor.bidProbName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="招标方式:">
            <el-input
              v-model="detailFormBefore.topInfor.bidProbName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="是否联合体投标:">
            <el-input
              v-model="detailFormBefore.topInfor.bidProbName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="是否为费率招标:">
            <el-input
              v-model="detailFormBefore.topInfor.bidProbName"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item class="neirong" label="投标说明(最多1000字):">
            <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
            <el-input
              :disabled="true"
              type="textarea"
              clearable
              placeholder="请输入"
              size="mini"
              v-model="detailFormBefore.topInfor.inforContent"
            />
          </el-form-item>

          <el-form-item class="neirong" label="附件:">
            <el-upload
              class="upload-demo"
              ref="upload"
              disabled
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
            >
              <div>
                <!-- <el-button display="block" slot="trigger" size="small" type="primary">选取文件</el-button> -->
              </div>
            </el-upload>
          </el-form-item>

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
              label="风险费(万元)"
              align="center"
              prop="contractAmount"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-input
                  @input="
                    scope.row.projectScale = getMoney(scope.row.projectScale)
                  "
                  clearable
                  :disabled="true"
                  v-model="scope.row.projectScale"
                ></el-input>
                <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="安全费(万元)"
              prop="safetyFee"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="true"
                  v-model="scope.row.bidInfoSection.safetyFee"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标限价(万元)"
              prop="bidPriceLimit"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.bidPriceLimit"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标保证金(万元)"
              prop="bidEarnestMoney"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.bidEarnestMoney"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="投标价(万元)"
              prop="bidMoney"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.bidMoney"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="开标地点"
              prop="openBidAddress"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.openBidAddress"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="评标办法"
              prop="evaluationBidId"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.evaluationBidId"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="开标日期"
              prop="openBidTime"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  value-format="timestamp"
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.openBidTime"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="参与投标单位"
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
            </el-table-column>

            <el-table-column
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
            </el-table-column>

            <el-table-column
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
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="其他未列出单位"
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
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目经理"
              prop="projectManager"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.projectManager"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目副经理"
              prop="projectDeputyManager"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.projectDeputyManager"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="技术负责人"
              prop="technicalDirector"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.technicalDirector"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="安全负责人"
              prop="securityDirector"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.securityDirector"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="财务负责人"
              prop="financeDirector"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.financeDirectorr"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="成本负责人"
              prop="costDirector"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
              <template slot-scope="scope">
                <el-input
                  clearable
                  :disabled="p.actpoint === 'look'"
                  v-model="scope.row.bidInfoSection.costDirector"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <!-- </div> -->
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="项目变更信息">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button
            @click="back"
            style="
              float: right;
              padding: 10px 20px;
              border: 1px solid #ddd;
              color: black;
              position: fixe;
            "
            type="text"
            >返回
          </el-button>
        </div>

        <div style="overflow: scroll; max-height: calc(100vh - 420px)">
          <div class="detail-class-tltle">项目前期信息:</div>
          <el-form
            :inline="false"
            :model="detailform"
            :rules="detailformrules"
            class="gcform"
            ref="detailform"
          >
            <el-form-item label="项目板块:" prop="topInfor.moduleId">
              <!--@change="chg('bulletinType')"-->
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                style="width: 100%"
                placeholder="请选择"
                size="mini"
                @change="
                  getName(detailform.topInfor.moduleId, bizCode, 'moduleName')
                "
                v-model="detailform.topInfor.moduleId"
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in bizCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="工程类别(一级):"
              prop="topInfor.enginTypeFirstId"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                placeholder="请选择"
                @change="getTwo"
                size="mini"
                v-model="detailform.topInfor.enginTypeFirstId"
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectDomainType"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="工程类别(二级):"
              prop="topInfor.enginTypeSecondId"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                @change="
                  getName(
                    detailform.topInfor.enginTypeSecondId,
                    xqprojectType,
                    'enginTypeSecondName'
                  )
                "
                v-model="detailform.topInfor.enginTypeSecondId"
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in xqprojectType"
                ></el-option>
              </el-select>
            </el-form-item>
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
                :disabled="p.actpoint === 'look'"
                clearable
                size="mini"
                v-model="detailform.topInfor.inforName"
              />
            </el-form-item>

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
                :disabled="p.actpoint === 'look'"
                clearable
                size="mini"
                v-model="detailform.topInfor.constructionOrg"
              />
            </el-form-item>
            <el-form-item label="公告类型:" prop="topInfor.noticeTypeId">
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInfor.noticeTypeId"
                @change="
                  getName(
                    detailform.topInfor.noticeTypeId,
                    bulletinType,
                    'noticeTypeName'
                  )
                "
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in bulletinType"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 下拉 -->
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
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="detailform.topInfor.planBidTime"
              >
              </el-date-picker>
            </el-form-item>

            <!-- 下拉 -->

            <el-form-item label="所属线路:" prop="topInfor.belongLineId">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择或直接填写所属现路"
                size="mini"
                @change="
                  getName(
                    detailform.topInfor.belongLineId,
                    railwayLine,
                    'belongLineName'
                  )
                "
                v-model="detailform.topInfor.belongLineId"
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in railwayLine"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- --------------------------------------------------------------- -->
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
                :disabled="p.actpoint === 'look'"
                clearable
                size="mini"
                v-model="detailform.topInfor.bidPerson"
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
                :disabled="p.actpoint === 'look'"
                size="mini"
                v-model="detailform.topInfor.designOrg"
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
                :disabled="p.actpoint === 'look'"
                size="mini"
                v-model="detailform.topInfor.bidAgentCompany"
              />
            </el-form-item>
            <el-form-item
              label="项目性质(一级):"
              prop="topInfor.projectModelId"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                @change="
                  getName(
                    detailform.topInfor.projectModelId,
                    projectModel,
                    'projectModelName'
                  )
                "
                v-model="detailform.topInfor.projectModelId"
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectModel"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="项目性质(二级):"
              prop="topInfor.projectModelId"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                @change="
                  getName(
                    detailform.topInfor.projectModelId,
                    projectModel,
                    'projectModelName'
                  )
                "
                v-model="detailform.topInfor.projectModelId"
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectModel"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="资审方式:"
              prop="topInfor.verifyTypeId"
              :rules="{
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder=""
                size="mini"
                v-model="detailform.topInfor.verifyTypeId"
              />
            </el-form-item>

            <el-form-item label="资金来源:" prop="capitalId">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                multiple
                placeholder="请选择"
                size="mini"
                v-model="value1"
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in amountSource"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="投资额（万元）:"
              prop="topInfor.investment"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                @input="
                  detailform.topInfor.investment = getMoney(
                    detailform.topInfor.investment
                  )
                "
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder=""
                size="mini"
                v-model="detailform.topInfor.investment"
              />
            </el-form-item>
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
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                @change="getTwoSC"
                size="mini"
                v-model="detailform.topInfor.marketFirstNameId"
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in emergingMarket"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="新兴市场(二级):"
              prop="topInfor.marketSecondId"
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
                    detailform.topInfor.marketSecondId,
                    emergingMarketTwo,
                    'marketSecondName'
                  )
                "
                v-model="detailform.topInfor.marketSecondId"
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in emergingMarketTwo"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="是否为重大项目:"
              prop="topInfor.isMajorProject"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInfor.isMajorProject"
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in yesOrNo"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="预计中标概率:"
              prop="topInfor.bidProbId"
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
                    detailform.topInfor.bidProbId,
                    probability,
                    'bidProbName'
                  )
                "
                v-model="detailform.topInfor.bidProbId"
              >
                <el-option
                  :key="index + '-only'"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in probability"
                ></el-option>
              </el-select>
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
                size="mini"
                v-model="detailform.topInfor.investment"
              />
            </el-form-item> -->
            <div>
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
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder=""
                  size="mini"
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
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder=""
                  size="mini"
                  v-model="detailform.topInfoOrg.contactMode"
                />
              </el-form-item>
            </div>
            <el-form-item
              class="neirong"
              label="项目内容:"
              prop="topInfor.inforContent"
              style="width: 100%"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-input
                :disabled="p.actpoint === 'look'"
                type="textarea"
                clearable
                placeholder="请输入"
                size="mini"
                v-model="detailform.topInfor.inforContent"
              />
            </el-form-item>
            <div>
              <div class="detail-class-tltle">投标信息:</div>
              <el-form-item
                label="投标截止日期:"
                prop="bidInfo.endTime"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
              >
                <el-date-picker
                  :disabled="p.actpoint === 'look'"
                  value-format="timestamp"
                  clearable
                  filterable
                  size="mini"
                  v-model="detailform"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                label="招标公告发布日期:"
                prop="bidInfo.publishTime"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
              >
                <el-date-picker
                  :disabled="p.actpoint === 'look'"
                  filterable
                  clearable
                  size="mini"
                  value-format="timestamp"
                  v-model="detailform"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="招标文件发售截止日期">
                <el-date-picker
                  :disabled="p.actpoint === 'look'"
                  value-format="timestamp"
                  filterable
                  clearable
                  size="mini"
                  v-model="detailform"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="招标方式:">
                <el-select
                  :disabled="p.actpoint === 'look'"
                  filterable
                  clearable
                  placeholder="请选择"
                  size="mini"
                  v-model="detailform"
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
                label="是否联合体投标:"
                prop="bidInfo.isCoalitionBid"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
              >
                <el-select
                  :disabled="p.actpoint === 'look'"
                  clearable
                  size="mini"
                  v-model="detailform"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in yesOrNo"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="是否为费率招标:"
                prop="bidInfo.isBidRates"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
              >
                <el-select
                  :disabled="p.actpoint === 'look'"
                  clearable
                  placeholder=""
                  size="mini"
                  v-model="detailform"
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in yesOrNo"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <el-row>
              <el-form-item
                class="neirong"
                label="投标说明(最多1000字):"
                prop="bidInfo.bidExplain"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  size="mini"
                  v-model="detailform"
                />
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item
                class="neirong"
                label="附件（最大10MB）:"
                prop=""
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }"
              >
                <el-upload
                  class="upload-demo detailUpload"
                  :action="'/api/topInfo/CommonFiles/bidInfo/01/uploadFile'"
                  :on-success="handleChange"
                  :on-error="handleChange"
                  :on-remove="handleRemove"
                  multiple
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-row>

            <p style="overflow: hidden；margin-right: 30px">
              <span style="float: left">标段信息: </span>
              <el-button
                v-show="p.actpoint != 'look'"
                @click="add('bd')"
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
              </el-button>
            </p>
            <el-table
              :data="detailform.topInfoSectionList"
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
                label="标段名"
                prop="sectionName"
                align="center"
                show-overflow-tooltip
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.sectionName"
                  ></el-input>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="风险费(万元)"
                prop="riskFee"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.riskFee"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="安全费(万元)"
                prop="safetyFee"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.safetyFee"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="投标限价(万元)"
                prop="bidPriceLimit"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.bidPriceLimit"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="投标保证金(万元)"
                prop="bidEarnestMoney"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.bidEarnestMoney"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="投标价(万元)"
                prop="bidMoney"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.bidMoney"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="开标地点"
                prop="openBidAddress"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.openBidAddress"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="评标办法"
                prop="evaluationBidId"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.evaluationBidId"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="开标日期"
                prop="openBidTime"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    value-format="timestamp"
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.openBidTime"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="参与投标单位"
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
              </el-table-column>

              <el-table-column
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
              </el-table-column>

              <el-table-column
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
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="其他未列出单位"
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
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="项目经理"
                prop="projectManager"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.projectManager"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="项目副经理"
                prop="projectDeputyManager"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.projectDeputyManager"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="技术负责人"
                prop="technicalDirector"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.technicalDirector"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="安全负责人"
                prop="securityDirector"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.securityDirector"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="财务负责人"
                prop="financeDirector"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.financeDirectorr"
                  ></el-input>
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="成本负责人"
                prop="costDirector"
                show-overflow-tooltip
                align="center"
                :width="180"
              >
                <template slot-scope="scope">
                  <el-input
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.bidInfoSection.costDirector"
                  ></el-input>
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
                width="200"
              >
                <template slot-scope="scope">
                  <el-link
                    :underline="false"
                    @click="
                      del(
                        scope.$index,
                        scope.row,
                        detailform.topInfoSectionList,
                        'bd'
                      )
                    "
                    type="warning"
                    >删除
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-card>
      <div class="btn-group" v-show="p.actpoint != 'look'">
        <el-button type="primary" @click="saveInfo('detailform')"
          >保存</el-button
        >
        <el-button @click="submit">提交</el-button>
      </div>
      <Tree
        v-if="treeStatas"
        ref="addOrUpdate"
        @getPosition="getPositionTree"
      ></Tree>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Tree from "@/components/tree";
import { isMoney } from "@/utils/validate";
export default {
  // name: "详情",
  data() {
    return {
      id: "",
      afterId: "",
      key: 0,
      treeStatas: false,
      positionIndex: "", //缓存当前的选中的项目地点的index
      value1: [],
      options2: [],
      options: [],
      detailform: {
        topInfor: {},
        topInfoOrg: {},
        topInfoSiteList: [],
        topInfoSectionList: [],
      },
      detailFormBefore: {
        topInfor: {},
        topInfoOrg: {},
        topInfoSiteList: [],
        topInfoSectionList: [],
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
  },
  mounted() {
    // this.$store.commit("setCategory", 'projectDomainType');
    (this.id = this.p.instid), (this.afterId = this.p.afterId);
    if (this.p.actpoint === "edit" || this.p.actpoint === "look") {
      this.getDetail();
    }
    if (this.p.actpoint === "add" || this.id) {
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
      this.key = this.key + 1;
    },
    //选择项目地点
    selectPosition() {
      this.treeStatas = true;
      console.log(this.positionIndex);
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init();
      });
    },
    submit() {},
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
    getName(id, list, name) {
      if (id) {
        this.$forceUpdate();
        this.detailform.topInfor[name] = list.find(
          (item) => item.id == id
        ).detailName;
        console.log(this.detailform.topInfor[name]);
      }
    },
    saveInfo(formName) {
      var topInforCapitalList = [];
      this.amountSource.forEach((item) => {
        if (this.value1.indexOf(item.id) != -1) {
          var v = {
            capitalId: item.id,
            capitalName: item.detailName,
          };
          topInforCapitalList.push(v);
        }
      });
      this.detailform.topInforCapitalList = topInforCapitalList;
      this.detailform.srcId = this.id;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post(
              `/api/topInfo/TopInfor/detail/${
                this.p.actpoint === "add"
                  ? "saveChangeRecord"
                  : "updateChangeRecord"
              }`,
              JSON.stringify(this.detailform),
              { useJson: true }
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.$refs[formName].resetFields();
                this.$router.push({
                  path: "/manage/bid_info/infoChangeList",
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
        path: "/manage/bid_info/inforChangeList",
      });
    },
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
              .post("/api/topInfo/TopInfoSection/list/delete", {
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
        .post("/api/topInfo/TopInfor/detail/entityInfoByBeforeAndAfterId", {
          beforeId: this.id,
          afterId: this.afterId,
        })
        .then((res) => {
          var datas = res.data.data;
          var beforData = [],
            afterData = [];
          if (datas[0].topInfoOrg.changeStatus == 1) {
            beforData = datas[0];
            afterData = datas[1];
          } else {
            beforData = datas[1];
            afterData = datas[0];
          }
          this.getTwo(afterData.topInfor.enginTypeFirstId);
          this.getTwoSC(afterData.topInfor.marketFirstNameId);
          // afterData.topInforCapitalList.forEach((item)=>{
          //   this.value1.push(item.capitalId);
          // });
          console.log(afterData);
          this.detailform = {
            topInfor: afterData.topInfor,
            topInfoOrg: afterData.topInfoOrg,
            topInfoSiteList: afterData.topInfoSiteList,
            topInfoSectionList: afterData.topInfoSectionList,
          };
          this.detailFormBefore = {
            capitalName: beforData.capitalName,
            topInfor: beforData.topInfor,
            topInfoOrg: beforData.topInfoOrg,
            topInfoSiteList: beforData.topInfoSiteList,
            topInfoSectionList: beforData.topInfoSectionList,
          };
        });
    },
    //新增的时候详情
    getAddDetail() {
      // console.log(111);
      this.$http
        .post("/api/topInfo/TopInfor/detail/entityInfo", { topOrgId: this.id })
        .then((res) => {
          var datas = res.data.data;
          this.getTwo(datas.topInfor.enginTypeFirstId);
          this.getTwoSC(datas.topInfor.marketFirstNameId);
          datas.topInforCapitalList.forEach((item) => {
            this.value1.push(item.capitalId);
          });
          this.detailform = {
            topInfor: datas.topInfor,
            topInfoOrg: datas.topInfoOrg,
            topInfoSiteList: datas.topInfoSiteList,
            topInfoSectionList: datas.topInfoSectionList,
          };
          for (var i in this.detailform) {
            this.detailFormBefore[i] = JSON.parse(
              JSON.stringify(this.detailform[i])
            );
          }
          this.detailFormBefore.capitalName = datas.capitalName;
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
<style lang="scss" scope>
.detail-class-tltle {
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
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
  margin-top: 10px;
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
    /*float: left;*/
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

.el-card__body {
  padding: 0 100px;
  // height: 400px;
  // border: 1px solid black;
  // height: 200px;
}

.el-input--mini .el-input__inner {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  // margin: 10px 0 0 10px;
}

.gcform .el-input {
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
</style>

