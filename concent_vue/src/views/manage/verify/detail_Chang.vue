<!--资审变更列表-->
<template>
 <div style="position: relative">
 <el-button  class="detail-back-tab detailbutton save-btn" type="primary" @click="saveInfo('detailformAfter')">保存</el-button>
    <el-button  class="detail-back-tab detailbutton sub-btn" >提交</el-button>
 <el-button
   class="detail-back-tab detailbutton"
   @click="back">返回</el-button>
  <el-tabs type="border-card">
    <el-tab-pane label="资审原信息">
      <div>
        <el-card class="box-card">

          <div class="detailBox">
            <el-form
              :inline="false"
              :model="detailformBefore"
              class="gcform"
              ref="detailformBefore"
              style="background: white;width:calc(100% - 4px);">
              <p style="overflow:hidden;margin-right: 30px"><span style="font-weight: bold">项目前期信息</span></p>
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

            <el-form-item  label="外文名称:"
                           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                clearable
                v-model="detailformBefore.topInfor.inforNameForeign"/>
            </el-form-item>
           <br>
          <div>
            <el-form-item label="项目板块:" class="inline-formitem">
              <template>
                <el-radio-group class="detail-radio-group" disabled v-model="detailformBefore.topInfor.moduleId" @change="getName(detailformBefore.topInfor.moduleId, projectPlate, 'moduleName')">
                  <el-radio v-for="(item, index) in projectPlate" :label="item.id" :key="index">{{item.detailName}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            </div>
            <br>

            <el-form-item label="工程类别(一级):">
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
                          v-if="detailformBefore.topInfor.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'">
              <el-input
                disabled
                v-model="detailformBefore.topInfor.belongLineName"
              >
              </el-input>
            </el-form-item>
            <br>

            <el-form-item
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
            <br>

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
                           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformBefore.topInfor.marketSecondName"
              >
              </el-input>
            </el-form-item>
            <br>


            <el-form-item  label="建设单位:"
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

              <el-form-item label="设计单位:">
              <el-input
                disabled
                v-model="detailformBefore.topInfor.designOrg"
              />
            </el-form-item>
            <br>

            <el-form-item label="招标人:"
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

            <el-form-item label="招标代理公司:">
              <el-input
                disabled
                v-model="detailformBefore.topInfor.bidAgentCompany"
              />
            </el-form-item>

            <el-form-item label="预计招标时间:"
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
            <el-form-item label="投资额（万元）:"
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
                v-model="detailformBefore.topInfor.noticeTypeName"
              >

              </el-input>
            </el-form-item>

            <el-form-item label="资审方式:">
              <el-input
                disabled
                clearable
                placeholder="资审方式"
                v-model="detailformBefore.topInfor.verifyTypeName"
              />
            </el-form-item>
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
                v-model="detailformBefore.verify.projectTrackResponPerson"
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
                v-model="detailformBefore.verify.tioContactMode"
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
                v-model="detailformBefore.verify.bidProbName"
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
              <p style="overflow:hidden;margin-right: 30px"><span style="font-weight: bold">资审信息</span></p>

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

        <el-form-item v-show='detailformBefore.verify.isCoalitionBid=="是"'
                      label="内部联合体单位:"
                      :disabled="p.actpoint === 'look'"
        >

          <el-input disabled v-model="detailformBefore.verifyOrgLists" placeholder="内部联合体单位">
            <el-button slot="append" icon="el-icon-search"  @click="selectOrg()"></el-button>
          </el-input>
        </el-form-item>
       <br>
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

        <el-form-item v-show='detailformBefore.verify.isCoalitionBid=="是"'
                      label="外部联合体单位:"
        >
          <el-input
            disabled
            placeholder=""
            size="mini"
            v-model="detailformBefore.verify.outOrg"
          />

        </el-form-item>
<br>
         <el-form-item
           label="是否联合体投标:"
           prop="verify.isCoalitionBid"

           :rules="{
                  required: true, message: '此项不能为空', trigger: 'blur'
                }"
         >
          <el-switch
            disabled
            v-model="detailformBefore.verify.isCoalitionBid"
            active-value="是"
            inactive-value="否"
          >
            </el-switch>
<!--       <el-radio-group v-model="detailformBefore.verify.isCoalitionBid" >-->
<!--                  <el-radio :disabled="p.actpoint === 'look'"  v-for="(item, index) in coalitionBid" :label="item.id" :key="index">{{item.detailName}}</el-radio>-->
<!--                </el-radio-group>-->

       <!--        <el-input-->
       <!--          clearable-->
       <!--          :readonly="p.actpoint === 'look'"-->
       <!--          size="mini"-->
       <!--          v-model="detailform.verify.isCoalitionBid"-->
       <!--        />-->
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
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-upload
                    disabled
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                  >
                  </el-upload>
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
                            <el-table-column :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

                            </el-table-column>

                            <el-table-column :resizable="false" label="大小" :width="120" prop="fileSize" show-overflow-tooltip>
                              <template slot-scope="scope">
                                {{(scope.row.fileSize/1024).toFixed(2)}}
                              </template>

                            </el-table-column>
                            <el-table-column :resizable="false" label="类型" :width="80" prop="fileType" show-overflow-tooltip>

                            </el-table-column>

                          </el-table>
                </div>
              <p style="overflow:hidden;margin-right: 30px"><span style="font-size: 14px">标段信息: </span>
              </p>
              <el-table
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
                  min-width="260"
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
                  width="160">

          <template slot-scope="scope" v-show="p.actpoint != 'look'">
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
          v-show="p.actpoint != 'look'"
          width="160">

          <template slot-scope="scope" v-show="p.actpoint != 'look'">

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
          v-show="p.actpoint != 'look'"
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
        </el-card>
      </div>
    </el-tab-pane>
    <el-tab-pane label="资审变更信息">

        <el-card class="box-card">

          <div class="detailBox">
            <el-form
              :inline="false"
              :model="detailformAfter"
              class="gcform"
              ref="detailformAfter"
              style="background: white;width:calc(100% - 4px);"
            >
              <p style="overflow:hidden;margin-right: 30px"><span style="font-weight: bold">项目前期信息</span></p>
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
                v-model="detailformAfter.topInfor.inforName"/>
            </el-form-item>

            <el-form-item  label="外文名称:"
                           :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
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
            <br>

            <el-form-item label="工程类别(一级):">
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
                          v-if="detailformAfter.topInfor.enginTypeFirstId=='17ff5c08d36b41ea8f2dc2e9d3029cac'">
              <el-input
                disabled
                v-model="detailformAfter.topInfor.belongLineName"
              >
              </el-input>
            </el-form-item>
            <br>

            <el-form-item
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
            <br>

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
                v-model="detailformAfter.topInfor.marketFirstName"
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
                v-model="detailformAfter.topInfor.marketSecondName"
              >
              </el-input>
            </el-form-item>
            <br>


            <el-form-item  label="建设单位:"
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

              <el-form-item label="设计单位:">
              <el-input
                disabled
                v-model="detailformAfter.topInfor.designOrg"
              />
            </el-form-item>
            <br>

            <el-form-item label="招标人:"
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

            <el-form-item label="招标代理公司:">
              <el-input
                disabled
                v-model="detailformAfter.topInfor.bidAgentCompany"
              />
            </el-form-item>

            <el-form-item label="预计招标时间:"
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
            <el-form-item label="投资额（万元）:"
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

              <el-form-item   class="formItem" label="项目跟踪负责人:"
                              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
              <el-input
                disabled
                placeholder="请选择"
                v-model="detailformAfter.verify.projectTrackResponPerson"
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
                v-model="detailformAfter.verify.tioContactMode"
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

              <p style="overflow:hidden;margin-right: 30px"><span style="font-weight: bold">资审信息</span></p>

                 <el-form-item
                   label="招标方式:"
                   class="formItem"
                 >
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                v-model="detailformAfter.verify.bidModeName"
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
          label="资审文件发售截止日期:"
          prop="verify.saleTime"

          :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
        >
          <el-date-picker
            clearable
            :readonly="p.actpoint === 'look'"
            value-format="timestamp"
            v-model="detailformAfter.verify.saleTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>

        </el-form-item>

        <el-form-item v-show='detailformAfter.verify.isCoalitionBid=="是"'
                      label="内部联合体单位:"
                      :disabled="p.actpoint === 'look'"
        >

          <el-input v-model="detailformAfter.verifyOrgLists" placeholder="内部联合体单位">
            <el-button slot="append" icon="el-icon-search"  @click="selectOrg()"></el-button>
          </el-input>
        </el-form-item>
       <br>
       <el-form-item
         label="递交资格预审申请文件日期:"
         prop="verify.subTime"

         :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
       >

          <el-date-picker
            clearable
            :readonly="p.actpoint === 'look'"
            value-format="timestamp"
            v-model="detailformAfter.verify.subTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>

        </el-form-item>
        <el-form-item
          label="资格预审公告发布日期:"
          prop="verify.publishTime"

          :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
        >
          <el-date-picker
            clearable
            :readonly="p.actpoint === 'look'"
            value-format="timestamp"
            v-model="detailformAfter.verify.publishTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item v-show='detailformAfter.verify.isCoalitionBid=="是"'
                      label="外部联合体单位:"
        >
          <el-input
            placeholder=""
            size="mini"
            v-model="detailformAfter.verify.outOrg"
          />

        </el-form-item>
<br>
         <el-form-item
           label="是否联合体投标:"
           prop="verify.isCoalitionBid"

           :rules="{
                  required: true, message: '此项不能为空', trigger: 'blur'
                }"
         >
         <el-switch
           v-model="detailformAfter.verify.isCoalitionBid"
           active-value="是"
           inactive-value="否"
         >
            </el-switch>
<!--       <el-radio-group v-model="detailformAfter.verify.isCoalitionBid" >-->
<!--                  <el-radio :disabled="p.actpoint === 'look'"  v-for="(item, index) in coalitionBid" :label="item.id" :key="index">{{item.detailName}}</el-radio>-->
<!--                </el-radio-group>-->

       <!--        <el-input-->
       <!--          clearable-->
       <!--          :readonly="p.actpoint === 'look'"-->
       <!--          size="mini"-->
       <!--          v-model="detailform.verify.isCoalitionBid"-->
       <!--        />-->
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
                    clearable
                    placeholder="请输入"
                    type="textarea"
                    size="mini"
                    v-model="detailformAfter.verify.verifyExplain"
                  />
                </el-form-item>
              </div>
              <div>
                <p class="detail-title"><span  class="uploadSpan">附件: </span>
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-upload
                    class="upload-demo detailUpload"
                    :action="'/api/contract/topInfo/CommonFiles/verify/01/uploadFile'"
                    :on-success="handleChange"
                    :on-error="handleChange"
                    :on-remove="handleRemove"
                    multiple
                  >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
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

                            <el-table-column :resizable="false" label="大小" :width="120" prop="fileSize" show-overflow-tooltip>
                              <template slot-scope="scope">
                                {{(scope.row.fileSize/1024).toFixed(2)}}
                              </template>
                            </el-table-column>
                            <el-table-column :resizable="false" label="类型" :width="80" prop="fileType" show-overflow-tooltip>

                            </el-table-column>

                            <el-table-column
                              :resizable="false"
                              label="操作"
                              show-overflow-tooltip
                              v-if="p.actpoint!=='look'"
                              :width="80"
                            >
                              <template slot-scope="scope">
                                <el-link :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                              </template>
                            </el-table-column>
                          </el-table>
                </div>
              <p style="overflow:hidden;margin-right: 30px"><span style="font-size: 14px">标段信息: </span>
                <el-button
                  @click="dialogTopInfoSection = true"
                  size="mini"
                  class="detatil-flie-btn"
                  type="primary"
                >新增
                </el-button>
              </p>

              <el-table
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
                  min-width="260"
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
                  width="160">

          <template slot-scope="scope" v-show="p.actpoint != 'look'">
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
          v-show="p.actpoint != 'look'"
          width="160">

          <template slot-scope="scope" v-show="p.actpoint != 'look'">

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
            :disabled="p.actpoint === 'look'"
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
          v-show="p.actpoint != 'look'"
          width="260">

          <template slot-scope="scope" >
           <el-input
             :disabled="p.actpoint === 'look'"
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
                  v-show="!p.actpoint === 'look'"
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  align="center"
                  width="80"
                  show-overflow-tooltip
                  v-if="p.actpoint != 'look'">
                  <template slot-scope="scope">
                    <el-link
                      :underline="false"
                      @click="del(scope.$index,scope.row,detailformAfter.verifySectionList,'bd')"
                      type="warning">删除
                    </el-link>
                  </template>
                </el-table-column>
              </el-table>


            </el-form>

          </div>
        </el-card>
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
    </el-tab-pane>
  </el-tabs>
 </div>
</template>

<script>
import TreeOrg from '@/components/treeOrg'
export default {
  name: '详情',components: {
    TreeOrg
  },
  data() {
    return {
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
          flowStatus: '0'
        },
        'topInfor': {},
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
          flowStatus: '0'
        },
        'topInfor': {},
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

      if(column.label==="参与投标单位")
      {
        this.myVerifySection=row;
        this.treeOrgStatas1 = true;
        console.log(this.positionIndex);
        this.$nextTick(() => {
          this.$refs.addOrUpdate1.init()
        })
      }else if(column.label==="编标拟配合单位") {
        this.myVerifySection1 = row;
        this.treeOrgStatas2 = true;
        //console.log(this.positionIndex);
        this.$nextTick(() => {
          this.$refs.addOrUpdate2.init()
        })
      }

    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    back() {
      this.$router.back()
      // this.$router.push({
      //   path: "/manage/proposal/list",
      // });
    },
    saveInfo(formName) {
      //alert(formName);
      //alert(this.$refs.formName.validate())

      this.$refs[formName].validate((valid) => {
        //alert(valid);
        if (valid) {
          //alert(JSON.stringify(this.detailform));
          console.log(JSON.stringify(this.detailformAfter));
          this.detailformAfter.verify.flowStatus = "0";
          this.$http
            .post(
              "/api/contract/topInfo/Verify/detail/saveChange",
              JSON.stringify(this.detailformAfter),
              {useJson: true}
            )
            .then((res) => {
              if (res.data.msg === "SUCCESS") {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.$refs[formName].resetFields();
                this.$router.push({
                  path: "/manage/verify/listChange",
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
      this.searchParam.current = this.current
      this.getuserlist()
    },
    showinputchg() {
    },
    partchg(row) {
      row.showinput = false
    },


    del(index, item, list, type) {
      console.log(index);
      list.splice(index, 1);

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
            this.detailformAfter = res.data.data

            // alert( JSON.stringify(this.detailformAfter.verifySectionList))
          })
      }else
      {

        this.$http
          .post(
            '/api/contract/topInfo/Verify/detail/entityInfoChange',
            // '/api' + this.$route.path.substr(0, this.$route.path.length - 1),
            {"id": this.p.topinfoid}
          )
          .then(res => {
            var data = res.data.data;
            data.forEach((item, index) => {
              //alert(item.verify.changeStatus)
              if(item.verify.changeStatus==1)
              {
                this.detailformBefore =item;
              }else if(item.verify.changeStatus==2)
              {
                this.detailformAfter =item
                console.log( this.detailformAfter)
              }
            })



            //alert( JSON.stringify(this.detailform))
          })
      }
    },
    getTopInforDetail() {

      this.$http
        .post("/api/contract/topInfo/TopInfor/detail/entityInfo", {topOrgId: this.p.topinfoid})
        .then((res1) => {
          var datas = res1.data.data;
          this.detailform1 = {
            topInfor: datas.topInfor,
            topInfoOrg: datas.topInfoOrg,
            topInfoSiteList: datas.topInfoSiteList,
            topInfoSectionList: datas.topInfoSectionList,
          }
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

  },
  mounted() {
    //alert(2);
    //this.$store.dispatch('getConfig', { })
    // eslint-disable-next-line no-unde
    this.getDetail()
    this.getTopInforDetail();

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
>>>.el-upload-list{
  display: none;
}
.uploadSpan{
  font-size: 16px;
  color: #303133;
}
</style>

