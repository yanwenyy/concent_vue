<template>
  <div class="searchListClass" style="margin-bottom: -50px;">
    <el-form :inline="true" :model="searchform" @keyup.enter.native="getData()" class="queryForm">
      <el-form-item label="项目名称:">
        <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="工程类别:" >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          @change="getEngineering"
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
      <el-form-item label="录入单位:" >
        <el-input
          v-model="searchform.createOrgCode"
          placeholder="录入单位"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="标段名称:">
        <el-input v-model="searchform.sectionName" placeholder="标段名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="建设单位:">
        <el-input v-model="searchform.constructionOrgId" placeholder="建设单位" clearable></el-input>
      </el-form-item>
      <div class="el-form-item">
        <el-form-item label="开标日期:" prop="searchform.saleTime" >
          <el-date-picker
            style="width: 145px;"
            clearable
            value-format="timestamp"
            v-model="searchform.bidBeginTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到:" prop="searchform.saleTime" >
          <el-date-picker
            style="width: 145px;"
            clearable
            value-format="timestamp"
            v-model="searchform.bidEndTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>        
      </div>
      <el-form-item label="公告类型:" >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          @change="getTwo"
          v-model="searchform.noticeTypeId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in bulletinType"
          ></el-option>
        </el-select>
      </el-form-item>

      <div class="el-form-item">
        <el-form-item label="资审截止日期:" prop="searchform.saleTime" >
          <el-date-picker
            style="width: 145px;"
            clearable
            value-format="timestamp"
            v-model="searchform.saleTimeBeginTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到:" prop="searchform.saleTime" >
          <el-date-picker
            style="width: 145px;"
            clearable
            value-format="timestamp"
            v-model="searchform.saleTimeEndTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>        
      </div>
      <el-form-item label="是否中标:" >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          @change="getTwo"
          v-model="searchform.isWinBid"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in isTender"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目地点:">
        <el-input v-model="searchform.path" placeholder="项目地点">
          <el-button slot="append" icon="el-icon-search"  @click="selectPosition()"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button @click="searchformReset" style="color:black;background:none;float:right; margin-right:20px;" type="info" plain><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" style="float:right;margin-right:5px; margin-top:5px;" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        <el-button @click="exportdata" style="float:right;margin-right:5px; margin-top:5px;" type="primary" plain><i class="el-icon-upload2"></i>导出</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 10px;">
      <el-table
        :max-height="$tableHeight-50"
        :height="$tableHeight-50"
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        style="width: 100%"
        tooltip-effect="dark"
      >
        <el-table-column
          :width="50"
          align="center"
          show-overflow-tooltip
          type="selection"
        ></el-table-column>
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>
        <el-table-column
          :width="100"
          label="是否中标"
          prop="isWinBid"
          show-overflow-tooltip
        > 
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshowBid(scope.row)"> {{scope.row.isWinBid==1?'中标':scope.row.isWinBid==2?'废标':scope.row.isWinBid==3?'流标':scope.row.isWinBid==4?'未中标':'待操作'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="300"
          label="标段名称"
          prop="sectionName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.sectionName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="300"
          label="项目名称"
          prop="inforName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="投标进度"
          prop="bidProcess"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程类别"
          prop="enginTypeFirstName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="建设单位"
          prop="constructionOrg"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="项目地点"
          prop="path"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :width="150"
          label="参与投标单位"
          prop="participatingUnitsName"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="录入单位"
          prop="createOrgName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="公告类型"
          prop="noticeTypeName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="资审截止日期"
          prop="endTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{formatDate(scope.row.endTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="开标日期"
          prop="dateOfBidOpeningName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{formatDate(scope.row.dateOfBidOpeningName)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="审核通过日期"
          prop="approvalTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{formatDate(scope.row.dateOfBidOpeningName)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="登记时间"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{formatDate(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[20, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
    <!-- 中标结果登记 -->
    <div class="zb-dialog">
      <el-dialog  title="中标结果登记" :visible.sync="dialogFormVisible" >
        <div>
          <el-form :inline="true" :model="zbForm" :rules="rules" ref="zbForm" @keyup.enter.native="init()"  class="gcform">
            <div v-if="zbType=='look'">
                <el-form-item label="标段名称:" class="list-item" >
                  <el-select
                    clearable
                    placeholder=""
                    v-model="zbForm.bidInfoSection.sectionName"
                    disabled>
                    <el-option
                      :key="index"
                      :label="item.sectionName"
                      :value="item.sectionName"
                      v-for="(item, index) in bdName"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="评标办法:" class="list-item">
                  <template slot-scope="scope">
                    <el-select

                      clearable
                      placeholder="评标办法"

                      :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"
                      @change="
                    getName(
                      zbForm.bidInfoSection.bidEvaluationMethodId,
                      bidMethod,
                      'bidEvaluationMethodName'
                    )
                  "
                      v-model="zbForm.bidInfoSection.bidEvaluationMethodName">
                      <el-option
                        :key="index"
                        :label="item.detailName"
                        :value="item.id"
                        v-for="(item, index) in bidMethod"

                      ></el-option>
                    </el-select>
                  </template>
                </el-form-item>

                <el-form-item label="开标地点:" class="list-item">
                  <el-input v-model="zbForm.bidInfoSection.openBidPlaceName"
                            placeholder="开标地点"
                            clearable
                            :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"
                            @clear="searchform.openBidPlaceId=''"
                  >
                    <el-button
                      :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"
                      slot="append"
                      icon="el-icon-search"
                      @click="selectPosition()"
                    ></el-button>
                  </el-input>
                </el-form-item>
                <br>
                <el-form-item label="开标日期:" class="list-item">
                  <el-date-picker
                    width="100%"
                    filterable
                    clearable
                    type="date"
                    value-format="timestamp"
                    :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"
                    v-model="zbForm.bidInfoSection.dateOfBidOpeningName"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="参与投标单位:" class="list-item">
                  <el-input  placeholder="请输入内容" v-model="zbForm.bidInfoSection.participatingUnitsName" class="input-with-select" :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'">
                    <el-button :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('参与投标单位',zbForm.bidInfoSection.participatingUnitsId)" ></el-button>
                  </el-input>
                </el-form-item>

                <el-form-item label="编标拟配合单位:" class="list-item">
                  <el-input  placeholder="请输入内容" v-model="zbForm.bidInfoSection.orgName" class="input-with-select" :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'">
                    <el-button :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('编标拟配合单位',zbForm.bidInfoSection.orgId)" ></el-button>
                  </el-input>
                </el-form-item>
                <br>

                <el-form-item label="投标保证金(万元):" class="list-item" prop="bidInfoSection.tenderSecurity"  :rules="rules.contractAmount">
                  <el-input
                    v-model="zbForm.bidInfoSection.tenderSecurity"
                    clearable
                    placeholder="投标保证金(万元)"
                    :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"
                  >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>

                <el-form-item label="投标价(万元):" class="list-item" prop="bidInfoSection.bidPrice"  :rules="rules.contractAmount">
                  <el-input
                    v-model="zbForm.bidInfoSection.bidPrice"
                    clearable
                    placeholder="投标价(万元)"
                    :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"
                  >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="施工单位:" class="list-item">
                  <el-input  placeholder="请输入内容" v-model="zbForm.bidInfoSection.constructionUnitName" class="input-with-select" :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'">
                    <el-button :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('施工单位',zbForm.bidInfoSection.constructionUnitId,false)" ></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item v-show="isBidRates=='0'" label="投标费率(百分比):" class="list-item" prop="bidInfoSection.tenderRate"  :rules="rules.contractAmount">
                  <el-input
                    v-model="zbForm.bidInfoSection.tenderRate"
                    clearable
                    placeholder="投标费率(百分比)"
                    :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"
                  >
                  </el-input>
                </el-form-item>
                <br>
                <el-form-item label="项目经理:" class="list-item">
                  <el-input v-model="zbForm.bidInfoSection.projectManager" placeholder="项目经理" clearable :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"></el-input>
                </el-form-item>

                <el-form-item label="项目副经理:" class="list-item">
                  <el-input v-model="zbForm.bidInfoSection.deputyProjectManager	" placeholder="项目副经理" clearable :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"></el-input>
                </el-form-item>

                <el-form-item v-show="isBidRates=='1'" label="风险费(万元):" class="list-item"  prop="bidInfoSection.riskFee"  :rules="rules.contractAmount">
                  <el-input
                    v-model="zbForm.bidInfoSection.riskFee"
                    clearable
                    placeholder="风险费(万元)"
                    :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"
                  >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
                <br>
                <el-form-item label="技术负责人:" class="list-item">
                  <el-input v-model="zbForm.bidInfoSection.technicalDirector" placeholder="技术负责人" clearable :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"></el-input>
                </el-form-item>

                <el-form-item label="安全负责人:" class="list-item">
                  <el-input v-model="zbForm.bidInfoSection.personInChargeOfSafety" placeholder="安全负责人" clearable :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"></el-input>
                </el-form-item>

                <el-form-item v-show="isBidRates=='1'" label="安全费(万元):" class="list-item"  prop="bidInfoSection.safetyCost"  :rules="rules.contractAmount">
                  <el-input
                    v-model="zbForm.bidInfoSection.safetyCost"
                    clearable
                    placeholder="安全费(万元)"
                    :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"
                  >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
                <br>

                <el-form-item label="财务负责人:" class="list-item">
                  <el-input v-model="zbForm.bidInfoSection.personInChargeOfFinance" placeholder="财务负责人" clearable :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"></el-input>
                </el-form-item>

                <el-form-item label="成本负责人:" class="list-item">
                  <el-input v-model="zbForm.bidInfoSection.costOwner" placeholder="成本负责人" clearable :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"></el-input>
                </el-form-item>

                <el-form-item v-show="isBidRates=='1'" label="投标限价(万元):" class="list-item" prop="bidInfoSection.biddingPriceLimit"  :rules="rules.contractAmount">
                  <el-input
                    v-model="zbForm.bidInfoSection.biddingPriceLimit"
                    clearable
                    placeholder="投标限价(万元)"
                    :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"
                  >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
                <br>
                <el-form-item label="投资估算:" class="list-item" >
                  <el-input v-model="zbForm.bidInfoSection.investmentReckon" placeholder="投资估算" clearable :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'">
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="其中建安投资:" class="list-item" >
                  <el-input v-model="zbForm.bidInfoSection.jananInvestment" placeholder="其中建安投资" clearable :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'" >
                    <template slot="prepend">¥</template>
                    <template slot="append">(万元)</template>
                  </el-input>
                </el-form-item>
                <br>
                <el-form-item label="其他未列出单位(单位与单位之间用英文逗号隔开):" >
                  <el-input
                    class="textarea_qt"
                    v-model="zbForm.bidInfoSection.otherUnitsNotListed"
                    placeholder="其他未列出单位(单位与单位之间用英文逗号隔开)"
                    clearable
                    :disabled="zbForm.bidInfoSection.noticeTypeName!='竞争性谈判'||zbType=='look'"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    type="textarea"></el-input>
                </el-form-item>

                <div class="detail-title">
                  其他投标单位(系统内):
                </div>
                <el-table class="detailTable"
                          :data="zbForm.dataList"
                          border
                          v-loading="dataListLoading"
                          :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
                          style="width: 100%;">
                  <el-table-column
                    type="index"
                    header-align="center"
                    align="center"
                    width="80"
                    label="序号">
                  </el-table-column>
                  <el-table-column

                    prop="orgName"
                    show-overflow-tooltip
                    label="其他投标单位(系统内)">
                  </el-table-column>

                </el-table>

                <div class="detail-title">
                  其他投标单位(系统外):
                </div>

                <el-table class="detailTable"
                          :data="zbForm.dataList2"
                          border
                          v-loading="dataListLoading"
                          :header-cell-style="{
              'text-align': 'center',
              'background-color': 'whitesmoke',
            }"
                          style="width: 100%;">
                  <el-table-column
                    type="index"
                    header-align="center"
                    align="center"
                    width="80"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    prop="orgName"
                    show-overflow-tooltip
                    label="其他投标单位(系统外)">
                  </el-table-column>
                </el-table>

            </div>
            <el-divider content-position="left" class="detailDivider">中标登记</el-divider>
            <el-form ref="zbForm" :model="zbForm" :rules="rules">
              <el-form-item 
                label="是否中标" 
                :label-width="formLabelWidth"
                prop="bidInfoSection.isWinBid"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'blur',
                }">
                <template>
                  <el-radio-group @change="zbForm.bidInfoSection.isOutBidOrg='1'" class="detail-radio-group" v-model="zbForm.bidInfoSection.isWinBid"  :disabled="zbType=='look'">
                    <el-radio  label="1" value="1">中标</el-radio>
                    <el-radio  label="2" value="2">废标</el-radio>
                    <el-radio  label="3" value="3">流标</el-radio>
                    <el-radio  label="4" value="4">未中标</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
              <el-form-item 
                label="系统内施工单位:" 
                class="list-item" v-show="zbForm.bidInfoSection.isWinBid=='1'"
                prop="bidInfoSection.constructionUnitName"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'change',
                }">
                <el-input  placeholder="请输入内容" v-model="zbForm.bidInfoSection.constructionUnitName" class="input-with-select" :disabled="zbType=='look'">
                  <el-button :disabled="zbType=='look'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('系统内施工单位',zbForm.bidInfoSection.constructionUnitId)" ></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="中标单位:" class="list-item" v-show="zbForm.bidInfoSection.isWinBid=='1'"
                            prop="bidInfoSection.inBidOrgName"
                            :rules="rules.bidName">
                <el-input  placeholder="请输入内容" v-model="zbForm.bidInfoSection.inBidOrgName" class="input-with-select" :disabled="zbType=='look'">
                  <el-button :disabled="zbType=='look'" slot="append" icon="el-icon-circle-plus-outline" @click="addDw('中标单位',zbForm.bidInfoSection.inBidOrgId)" ></el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                class="list-item"
                label="中标公示网站:"
                prop="bidInfoSection.bidNoticeWebsite"
                :rules="rules.bidNoticeWebsite"
                v-show="zbForm.bidInfoSection.isWinBid=='1'"
              >
                <el-input
                  :disabled="zbType === 'look'"
                  clearable
                  placeholder="中标公示网站"
                  v-model="zbForm.bidInfoSection.bidNoticeWebsite"
                />
              </el-form-item>

              <el-form-item
                label="是否系统外单位中标:"
                class="inline-formitem formItem"
                v-show="zbForm.bidInfoSection.isWinBid=='4'">
                <el-switch
                  class="inline-formitem-switch"
                  v-model="zbForm.bidInfoSection.isOutBidOrg"
                  active-color="#409EFF"
                  inactive-color="#ddd"
                  active-value="0"
                  inactive-value="1"
                  :disabled="zbType=='look'"
                >
                </el-switch>
              </el-form-item>

              <el-form-item
                class="list-item"
                v-show="zbForm.bidInfoSection.isOutBidOrg === '0'"
                label="系统外中标单位:"
              >
                <el-input
                  disabled
                  placeholder="请选择系统外中标单位"
                  v-model="zbForm.bidInfoSection.outBidOrg"
                  :title="zbForm.bidInfoSection.outBidOrg"
                >
                  <el-button v-show="zbType != 'look'" slot="append" icon="el-icon-circle-plus-outline" @click="openComMul(zbForm.bidInfoSection.outBidOrgId,zbForm.bidInfoSection.outBidOrg,'/api/contract/Companies/detail/findCompanies','系统外中标单位')"></el-button>
                </el-input>
              </el-form-item>

              <el-form-item
                label="系统外中标金额"
                v-show="zbForm.bidInfoSection.isOutBidOrg==='0'"
                class="list-item"
                prop="bidInfoSection.outOrgBidMoney"
                :rules="rules.contractAmount"
              >
                <el-input
                  v-model="zbForm.bidInfoSection.outOrgBidMoney"
                  :disabled="zbType=='look'">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>

              <el-form-item
                width="100%"
                class="list-item_textarea"
                v-show="zbForm.bidInfoSection.isWinBid=='4'"
                label="未中标原因:"
                prop="bidInfoSection.notBidReason"
                :rules="{
                  required: true,
                  message: '此项不能为空',
                  trigger: 'change',
                }"
              >
                <el-input
                  type="textarea"

                  :disabled="zbType === 'look'"
                  clearable
                  placeholder="未中标原因"
                  v-model="zbForm.bidInfoSection.notBidReason"
                />
              </el-form-item>

              <el-form-item
                label="中标价(万元)"
                v-show="zbForm.bidInfoSection.isWinBid==='1'"
                class="list-item"
                prop="bidInfoSection.winBidPrice"
                :rules="rules.contractAmount"
              >
                <el-input
                  v-model="zbForm.bidInfoSection.winBidPrice"
                  :disabled="zbType=='look'">
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>

              <el-form-item
                label="中标时间"
                class="list-item"
                v-show="zbForm.bidInfoSection.isWinBid==='1'">
                <el-date-picker
                  :disabled="zbType=='look'"
                  width="100%"
                  v-model="zbForm.bidInfoSection.bidTime"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-form>
            <el-form v-show="zbForm.bidInfoSection.isWinBid==='1'">
              <p ><span >文件公示: </span>
              </p>
              <el-table
                :data="zbForm.bidInfo_03"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                align="center"
                border
                class="detailTable"
                ref="table"
                style="width: 98%;margin-bottom: 50px"
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
                  label="操作"
                  width="100"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="attachmentDownload(scope.row)" type="success">下载</el-link>
                    <el-link v-if="zbType=='add'" :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer self-footer" v-show="zbType=='add'" >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveInfo('zbForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import companyMul from '@/components/companiesMultiple'
  export default {
  name: "proposal-list-look",
    components: {
      Tree,
      companyMul
    },
  data() {
    var validateMoney = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else if (value&&!isMoney(value)) {
        callback(new Error("请输入正确的金额格式"));
      } else {
        callback();
      }

    };
    var validateUrl = (rule, value, callback) => {
      // console.log(value)
      if (value!=''&&value&&!isURL(value)) {
        callback(new Error('请输入正确的网址格式'))
      } else {
        callback()
      }
    }
    var validateName= (rule, value, callback) => {
      if (this.zbForm.bidInfoSection.inBidOrgName == '') {
        callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    return {
      constructionOrgList: '',
      sjdwList:[],
      treeStatas: false,
      dialogResult:false,
      page: { current: 1, size: 20, total: 0, records: [] },
      searchform: {
        current: 1,
        size: 20,
        inforName:"",
        enginTypeFirstId: "",
        sectionName:"",
        constructionOrgId:"",
        bidBeginTime:"",
        bidEndTime:"",
        noticeTypeId:"",
        createOrgCode:"",
        saleTimeBeginTime:"",
        saleTimeEndTime:"",
        isWinBid:"",
        path:"",
        isClientele:"1"
      },
      isClientele:[
        {
          detailName:"是",
          id:"1"
        },{
          detailName:"否",
          id:"0"
        },
      ],
      multipleSelection: [],
      isTender:[
        {
          detailName:"是",
          id:'1'
        },{
          detailName:"否",
          id:'0'
        },
      ],
      resultform:{
        verifySection:{
          uuid:'',
          verifyId:'',
          sectionId:'',
          investmentReckon:'',
          jananInvestment:'',
          verifyResult:'1',
          verifyResultTime:'2020-12-18'
        },
        commonFilesList:[]
      },
      dialogFormVisible: false,
      dataListLoading: false,
      isBidRates: "",
      bdName: [],
      zbType: "add", //中标弹框打开的方式
      zbForm: {
        bidInfoSection: {
          inBidOrgName:'',
          constructionUnitName:''
        },
        bidInfo_03: [],
        dataList:[],
        dataList2:[]
      },
      formLabelWidth: "120px",
      Authorization:sessionStorage.getItem("token"),
      rules: {
        contractAmount: [
          { required: true, validator: validateMoney, trigger: "change" },
        ],
        bidNoticeWebsite:[
          { required: true,validator: validateUrl, trigger: 'change' }
        ],
        bidName:[
          { required: true,validator: validateName, trigger: 'change' }
        ]
      }, //表单验证规则
    }
  },
  mounted() {
    this.$store.dispatch("getPubCustomers", {});
    this.$store.dispatch("getConfig", {});
    this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    //设计单位列表
    this.$http.post("/api/contract/Companies/detail/findCompanies").then((res) => {
      this.sjdwList = res.data.data.records;
      this.sjdwList.forEach((item)=>{
        item.value=item.companyName;
        item.detailName=item.companyName;
        item.id=item.uuid;
      })
    });
  },
  computed: {
    bidMethod() {
      return this.$store.state.bidMethod;
    },
    pubCustomers() {//客户名称
      return this.$store.state.pubCustomers;
    },
    //客户性质
    customerNature() {
      return this.$store.state.customerNature;
    },
    projectDomainType() {
      return this.$store.state.category.projectDomainType;
    },
    bulletinType() {
      return this.$store.state.bulletinType;
    },
    probability() {
      return this.$store.state.probability;
    },
    railwayLine(){
      return this.$store.state.railwayLine;
    },
    bulletinType() {
      return this.$store.state.bulletinType;
    },
  },
  methods: {
    //工程类别二级
    getTwo(id) {
      console.info(this.constructionOrgList)
    },
    // 选择工程类别
    getEngineering() {
      console.info(this.searchform.enginTypeFirstId, this.projectDomainType)
    },
    //获取项目地点的值
    getPositionTree(data) {
      //alert(1);
      console.log(data)
      this.treeStatas = false;
      this.searchform.ffid=data.fullDetailCode;
      this.searchform.path=data.fullDetailName;
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
    exportdata() {
      this.searchform.size=1000000000;
      this.$http
        .post(
          "/api/contract/topInfo/Verify/list/loadPageDataForSelect",
          this.searchform
        )
        .then((res) => {
          this.searchform.size=20;
          var datas = res.data.data.records;
          this.$exportXls.exportList({
            thead:' <tr>\n' +
            '<th>标段名称</th>\n' +
            '<th>项目名称</th>\n' +
            '<th>工程类别</th>\n' +
            '<th>建设单位</th>\n' +
            '<th>公告类型</th>\n' +
            '<th>资审文件发售截止日期</th>\n' +
            '<th>状态</th>\n' +
            '<th>项目地点</th>\n' +
            '<th>填报人</th>\n' +
            '<th>填报时间</th>\n' +
            '<th>资审结果</th>\n' +
            '</tr>',
            jsonData:datas,
            tdstr:['sectionName','inforName','enginTypeFirstName',
              'constructionOrg','noticeTypeName','saleTime','flowStatus','path',
              'createUserName','createTime','verifyResult'],
            tdstrFuc:{
              flowStatus:function (str) {
                return str==1?'草稿':str==2?'审核中':str==3?'审核通过':str==4?'审核退回':'待登记';
              },
              verifyResult:function (str) {
                return str==0?'未通过':str==1?'通过':'待通过';
              },
              saleTime:function (str) {
                return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
              },
              createTime:function (str) {
                return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
              }
            }
          })
        });
    },
    // 查看
    rowshow(row) {
      if(row.bidProcess == "投标审核通过") {
        let p = { actpoint: "look", instid: row.bidInfoId , topInfoOrgId:row.topInfoOrgId,flowStatus:row.flowStatus,uuid:row.uuid};
        this.$router.push({
          path: "./detail/",
          query: { p: this.$utils.encrypt(JSON.stringify(p)) },
        });
      } else if (row.bidProcess == "开标审核通过"){
        let p = { from:'kblist',actpoint: "look", instid: row.bidInfoId,flowStatus:row.bidFlowStatus,uuid:row.uuid};
        this.$router.push({
          path: "./detailKB/",
          query: { p: this.$utils.encrypt(JSON.stringify(p)) },
        });
      }
    },
    // 查看是否中标
    rowshowBid(row) {
      this.$http
        .post("/api/contract/topInfo/BidInfoSection/detail/entityInfo", {
          id: row.uuid,
        })
        .then((res) => {
          var datas = res.data.data;
          console.log(datas);
          this.zbForm.dataList=[];
          this.zbForm.dataList2=[];
          this.zbType = "look";
          this.dialogFormVisible = true;
          this.zbForm.bidInfoSection = datas.bidInfoSection;
          this.zbForm.bidInfo_03 = datas.bidInfo_03;
          datas.bidInfoSectionOrgList.forEach((item)=>{
            if(item.orgType=='1'){
              this.zbForm.dataList.push(item);
            }else{
              this.zbForm.dataList2.push(item);
            }
          })
        });
    },
    // 展示
    show() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info("请选择一条记录进行查看操作！");
        return false;
      }
      let p = {actpoint: "look", instid: this.multipleSelection[0].uuid};
      this.$router.push({
        path: "../detail/",
        query: {p: this.$utils.encrypt(JSON.stringify(p))},
      });
    }, // list通用方法开始
    handleSizeChange(val) {
      this.searchform.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.searchform.current = val;
      this.getData();
    },
    searchformSubmit() {
      this.searchform.current = 1;
      this.getData();
    },
    searchformReset() {
      this.searchform={
        current: 1,
        size: 20,
        inforName:"",
        enginTypeFirstId: "",
        sectionName:"",
        constructionOrgId:"",
        bidBeginTime:"",
        bidEndTime:"",
        noticeTypeId:"",
        createOrgCode:"",
        saleTimeBeginTime:"",
        saleTimeEndTime:"",
        isWinBid:"",
        path:"",
        isClientele:"1"
      }
      this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 查询
    getData() {
      this.$http
        .post(
          "/api/contract/topInfo/BidInfo/list/bidInfoQuery",
          this.searchform
        )
        .then((res)=>{
          this.page = res.data.data;
        });
    },
    formatDate(date) {
      if (date == '' || date == null) {
        return ''
      }
      var date = new Date(date);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      return YY + MM + DD;
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped> 
.zb-dialog >>> .el-dialog {
  width: 80% !important;
  height: 82%;
  overflow: hidden;
  /* overflow: auto; */
}
.queryForm .el-input-group {
  margin-top: 5px;
  width: 230px;
}
.queryForm .el-form-item {
  margin-bottom: 3px !important;
}
>>>.el-form-item__label{
  width: auto;
}
.el-table__row {
  cursor: pointer;
}
>>>.el-table td, .el-table th
{
  padding:5px 0px;
}
>>>.el-form-item__label{
  width: auto;
}
>>>.el-upload-list{
  display: none;
}
>>>.el-table td, .el-table th
{
  padding:5px 0px;
}
>>>.el-form-item__label{
  width: auto;
}
>>>.el-input--mini .el-input__inner{
  height: auto;
  line-height: inherit;
}
>.el-form-item {
  width: auto;
  margin-bottom: 5px !important;
  display: inline-block;
}
.item_zbj{
  width: 40%;
  display: inline-block;
  padding-right: 9%;
}
.el-dialog{
  width: 60%;
}
.el-table__row {
  cursor: pointer;
}
.mydialog .el-dialog{
  width: 70%!important;
  /* overflow: auto; */
}
.mydialog >>>.el-dialog__body{
  height: 500px;
  overflow: auto;
}
>>>.el-form-item__label{
  width: auto;
}
>>>.el-dialog__body{
  padding-top: 0px;
}
.mydialog >>>.el-form-item {
  width: auto;
  margin-bottom: 5px !important;
  display: inline-block;
  width: 32.5% !important;
}
.mydialog >>>.el-form-item__label:before {
  position: initial;
  left: -10px;
}
>>>.el-table--scrollable-x .el-table__body-wrapper{
  /* min-height: 600px!important; */
}
>>>.el-button--info.is-plain{
  margin-top:5px
}
>>>.mydialog .tgsj{
  width: 50% !important;
}
>>>.el-table__row{
  height: 42px !important;
}
.queryForm .el-input-group {
  margin-top: 5px;
  width: 230px;
}
.queryForm .el-form-item {
  margin-bottom: 3px !important;
}
.queryForm>.el-button{
  margin-top: 5px;
}
/deep/ .queryForm  .el-form-item__label{
  width: auto !important;
}
/deep/ .queryForm .el-form-item__content{
  width: auto !important;
}
.el-date-editor{
  width: 100%!important;
}
.el-table__row {
  cursor: pointer;
}
>>> .el-dialog__body {
  height: 60%;
  overflow: auto;
}
>>>.el-dialog__wrapper{
  height: 100vh!important;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.list-item{
  width: 32%;
}
>>>.el-form--inline .el-form-item__content {
    width: 100%;
    margin-left: 0px !important;
}
/* >>>.el-input{
  width: 100%;
} */
>>>.list-item_textarea{
  width:100%;
}
/* >>>.el-pagination__editor.el-input .el-input__inner{
  width: auto;
} */
>>>.dialog-footer {
    padding-top: 14px;
    margin: 0;
    text-align: center;
    background-color: #fafafa;
}
/* >>>.el-dialog__header{
  display: none;
} */

  @media (min-width: 1200px) and (max-width: 1500px) {
    >>>.el-dialog__body{
      height: 65%!important;
      overflow: auto;

    }
     >>>.el-form-item__label{
        width: 365px;
      }
  }
  @media (min-width: 1500px) and (max-width: 2000px) {
    >>>.el-dialog__body{
      height: 73%!important;
      overflow: auto;
    }
  }

.bdClass >>>.el-dialog{
  height: 70vh!important;
}
.bdClass >>>.el-card__header{
  padding: 8px 20px !important;
}
.bdClass >>>.el-dialog__header{
  display: none;
}
.bdClass >>>.el-dialog__body{
  padding: 0;
  height: calc(100% - 60px)!important;
  width: 100%;
  overflow: hidden;
}
.bdClass >>>.dialog-footer{
  padding-top: 14px;
  margin:0;
  text-align: center;
  background-color: #fafafa;
}
.self-footer{
  width: 100%;
  position: absolute;
  bottom: 0;
  padding-bottom: 30px;
}
  >>>.is-required .el-form-item__label{
    padding-left: 10px;
  }
  >>>.el-form-item__label:before{
    left: 0!important;
  }
</style>
