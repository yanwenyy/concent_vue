<!--项目部月报详情-->
<template>
  <div style="position: relative">
    <!--    <el-collapse value="projectInfo">
          <el-collapse-item title="项目信息" name="projectInfo">
            <template slot="title">
              <i class="header-icon el-icon-collection"></i>项目信息
            </template>
            <div>项目名称：<span style="color:#0a469d !important;margin-right: 50px;">{{projectName}}</span></div>
          </el-collapse-item>
        </el-collapse>

    -->
    <div style="margin-top: 9px;color: red;position: absolute;top: 1px;right: 279px;z-index: 999;font-size: 15px;">项目名称：<span
      style="color: red !important;margin-right: 50px;">{{projectName.length>20?projectName.slice(0,20)+'...':projectName}}</span>
    </div>
    <el-button
      v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||dataReport.flowStatus=='edit'||dataReport.flowStatus=='reject')&&(dataReport.flowStatus!='check'&&dataReport.flowStatus!='pass'&&dataReport.uuid!=''&&dataReport.isEdit=='1')"
      @click="save('sub')" class="detailbutton detail-back-tab sub-btn">提交
    </el-button>
    <el-button
      v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(dataReport.flowStatus!='check'&&dataReport.flowStatus!='pass'&&dataReport.uuid!=''&&dataReport.isEdit=='1')"
      type="primary" @click="save('save')" class="detailbutton detail-back-tab save-btn">保存
    </el-button>
    <!--<el-button v-if="isCk!='1'" @click="save" type="primary"  class="detailbutton detail-back-tab" style="float: left; margin-right: 185px;" plain>保存</el-button>-->
    <!--<el-button v-if="isCk!='1'" @click="submit" type="primary"  class="detailbutton detail-back-tab " style="float: left;margin-right: 93px;" plain>提交</el-button>-->
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh"
               @click="operation('back')" type="warning">驳回
    </el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg"
               @click="operation('complete')" type="success">通过
    </el-button>
    <el-button @click="back" type="primary" class="detailbutton detail-back-tab " plain>返回</el-button>
    <el-tabs type="border-card" v-model="activeName" @tab-click="tabChange">
      <el-tab-pane label="生产经营计划(计1)" name="tab1">
        <div class="table-div" style="position: relative">
          <el-table
            class="tableStyle"
            :height="tableHeight"
            :max-height="tableHeight"
            :data="data"
            :key="key"
            :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
          >
            <el-table-column
              :width="50"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :width="250"
              align="left"
              label="单位指标"
              prop="jldw"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="自揽新签合同额(万元)"
            >
              <el-table-column
                align="right"
                prop="jldw"
                label="合计"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="其中"
                show-overflow-tooltip
              >
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="工程承包"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="勘察设计咨询"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="工业制造"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="房地产开发"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="物资物流"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="其他"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="金融保险"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="新签合同总额(含内分包)(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="企业总产值计划"

            >
              <el-table-column
                align="right"
                prop="jldw"
                label="合计"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="其中"
                show-overflow-tooltip
              >
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="工程承包"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="勘察设计咨询"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="工业制造"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="房地产开发"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="物资物流"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="其他"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="金融保险"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="right"
              label="预计2019年底剩余合同额(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新签合同总额(含内分包)" name="tab2">
        <div class="table-div" style="position: relative">
          <el-table
            class="tableStyle"
            :height="tableHeight"
            :max-height="tableHeight"
            :data="data"
            :key="key"
            :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
          >
            <el-table-column
              :width="50"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :width="250"
              align="left"
              label="单位指标"
              prop="jldw"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="新签合同总额计划(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="工程承包(不含资本经营和二次经营)"
              show-overflow-tooltip
            >
              <el-table-column
                align="right"
                prop="jldw"
                label="工程承包合计"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="铁路"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="公路"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="城市轨道"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="市政"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="房建"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="水利"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="电力"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="机场"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="港口航道"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="矿山"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="其他工程"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table-column>
            <el-table-column
              label="非工程板块"
              show-overflow-tooltip
            >
              <el-table-column
                align="right"
                prop="jldw"
                label="勘察设计"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="工业制造"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="房地产开发"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="物资物流"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="其他"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="资本经营"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="二次经营"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工程承包计划" name="tab3">
        <el-tabs type="border-card">
          <el-tab-pane label="自揽新签合同额(计1-1)">
            <div class="table-div" style="position: relative">
              <el-table
                class="tableStyle2"
                :height="tableHeight"
                :max-height="tableHeight"
                :data="data"
                :key="key"
                :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
                border
                highlight-current-row
                ref="table"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                tooltip-effect="dark"
              >
                <el-table-column
                  :width="50"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column
                  :width="250"
                  align="left"
                  label="单位指标"
                  prop="jldw"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="新签合同总额计划(万元)"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  label="其中"
                  show-overflow-tooltip
                >
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="铁路"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="公路"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="城市轨道"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="市政"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="房建"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="水利"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="电力"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="机场"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="港口航道"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="矿山"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="其他工程"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="新兴产业"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="剩余合同额分类情况一览表(计1-2)">
            <div class="table-div" style="position: relative">
              <el-table
                class="tableStyle2"
                :height="tableHeight"
                :max-height="tableHeight"
                :data="data"
                :key="key"
                :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
                border
                highlight-current-row
                ref="table"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                tooltip-effect="dark"
              >
                <el-table-column
                  :width="50"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column
                  :width="250"
                  align="left"
                  label="单位名称/工程类别"
                  prop="jldw"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="预计2021年底剩余合同额(万元)"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  label="其中"
                  show-overflow-tooltip
                >
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="铁路"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="公路"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="城市轨道"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="市政"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="房建"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="水利"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="电力"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="机场"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="港口航道"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="矿山"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="其他工程"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要在建项目施工计划(计2)">
            <div class="table-div" style="position: relative">
              <el-table
                class="tableStyle2"
                :height="tableHeight"
                :max-height="tableHeight"
                :data="data"
                :key="key"
                :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
                border
                highlight-current-row
                ref="table"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                tooltip-effect="dark"
              >
                <el-table-column
                  :width="50"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column
                  :width="250"
                  align="left"
                  label="项目名称"
                  prop="jldw"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="工期"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="所在地"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="起讫地点(标段)"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="计量单位"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  label="施工总规模"
                  show-overflow-tooltip
                >
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="初始合同(万元)"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="right"
                    prop="jldw"
                    label="工程合同(万元)"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="2021年12月底累计完成(万元)"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="预计2021年底累计完成(万元)"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="2021年12月底剩余(万元)"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="预计2021年底剩余(万元)"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="2022计划安排(万元)"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="jldw"
                  label="到2022底主要建设内容"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="勘察设计计划(计3)" name="tab4">
        <div class="table-div" style="position: relative">
          <el-table
            class="tableStyle"
            :height="tableHeight"
            :max-height="tableHeight"
            :data="data"
            :key="key"
            :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
          >
            <el-table-column
              :width="50"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :width="250"
              align="left"
              label="项目名称"
              prop="jldw"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="工作类别"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="规模(公里)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="产值计划(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="工程合同额(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="开累(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="剩余合同额(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="工作时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="形象进度"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="房地产开发计划(计4)" name="tab5">
        <div class="table-div" style="position: relative">
          <el-table
            class="tableStyle"
            :height="tableHeight"
            :max-height="tableHeight"
            :data="data"
            :key="key"
            :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
          >
            <el-table-column
              :width="50"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :width="250"
              align="left"
              label="项目名称"
              prop="jldw"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="运作单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="地域"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="建设地点"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="建设性质"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="本年计划销售金额(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="本年计划营业收入(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="备注"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工业制造计划(计5)" name="tab6">
        <div class="table-div" style="position: relative">
          <el-table
            class="tableStyle"
            :height="tableHeight"
            :max-height="tableHeight"
            :data="data"
            :key="key"
            :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
          >
            <el-table-column
              :width="50"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :width="250"
              align="left"
              label="单位(产品)名称"
              prop="jldw"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="规格型号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="计量单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="地域"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="数量"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="产值计划(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="备注"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="物资贸易计划(计6)" name="tab7">
        <div class="table-div" style="position: relative">
          <el-table
            class="tableStyle"
            :height="tableHeight"
            :max-height="tableHeight"
            :data="data"
            :key="key"
            :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
          >
            <el-table-column
              :width="50"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :width="250"
              align="left"
              label="单位(产品)名称"
              prop="jldw"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="计量单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="地域"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="数量"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="产值计划(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="备注"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="各版块剩余合同额(计7)" name="tab8">
        <div class="table-div" style="position: relative">
          <el-table
            class="tableStyle"
            :height="tableHeight"
            :max-height="tableHeight"
            :data="data"
            :key="key"
            :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
          >
            <el-table-column
              :width="50"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :width="250"
              align="left"
              label="单位名称\业务板块"
              prop="jldw"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              label="预计2021年底剩余合同额(万元)"
              prop="jldw"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="其中"
              show-overflow-tooltip
            >
              <el-table-column
                align="right"
                prop="jldw"
                label="工程承包"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="勘察设计"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="房地产"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="工业制造"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="物资贸易"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="其他"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="剩余合同额分类情况一览表(计1-2)"  name="tab9">
        <div class="table-div" style="position: relative">
          <el-table
            class="tableStyle2"
            :height="tableHeight"
            :max-height="tableHeight"
            :data="data"
            :key="key"
            :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
          >
            <el-table-column
              :width="50"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :width="250"
              align="left"
              label="单位名称/工程类别"
              prop="jldw"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="预计2021年底剩余合同额(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="其中"
              show-overflow-tooltip
            >
              <el-table-column
                align="right"
                prop="jldw"
                label="铁路"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="公路"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="城市轨道"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="市政"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="房建"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="水利"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="电力"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="机场"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="港口航道"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="矿山"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="其他工程"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="主要在建项目施工计划(计2)"  name="tab10">
        <div class="table-div" style="position: relative">
          <el-table
            class="tableStyle2"
            :height="tableHeight"
            :max-height="tableHeight"
            :data="data"
            :key="key"
            :header-cell-style="{
                      'text-align': 'center',
                      'background-color': 'whitesmoke'
                    }"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
          >
            <el-table-column
              :width="50"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :width="250"
              align="left"
              label="项目名称"
              prop="jldw"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="工期"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="所在地"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="起讫地点(标段)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="计量单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="施工总规模"
              show-overflow-tooltip
            >
              <el-table-column
                align="right"
                prop="jldw"
                label="初始合同(万元)"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="jldw"
                label="工程合同(万元)"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="2021年12月底累计完成(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="预计2021年底累计完成(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="2021年12月底剩余(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="预计2021年底剩余(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="2022计划安排(万元)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="right"
              prop="jldw"
              label="到2022底主要建设内容"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="dataReport.flowStatus!='edit'&&(p.actpoint == 'task'||p.actpoint == 'look')">
        <Audit-Process :task="p.task||{businessId:p.uuid,businessType:' engineering_monthly_report'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import AuditProcess from '@/components/auditProcess'

  export default {
    name: 'reportM-all-detail',
    components: {
      AuditProcess
    },
    data() {
      return {
        userdata: JSON.parse(sessionStorage.getItem('userdata')),
        projectList: {},
        tableHeight: "100vh - 110px",
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        key: 0,
        data: [],
        dataReport: {},
        nextData: [],
        yearDateS: '',
        activeName: "ztjd",
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        proNameHover: false,
        projectName: '',
        isCk: JSON.parse(this.$utils.decrypt(this.$route.query.p)).isCk,
        projectreport: {},
        projectreportDetaiList: [],
        planPrjTjxDetailList: [],
        projectStatus: JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectStatus,
      }
    },
    components: {
      AuditProcess
    },
    computed: {
      vnameMarginLeft() {
        return (vcode, veditable) => {
          var vnameClass = ''
          if (vcode && veditable) {
            if (veditable === '1') {
              vnameClass += 'editable'
            }
            if (vcode.length === 6) {
              vnameClass += ' margin-left-25'
            } else if (vcode.length === 9) {
              vnameClass += ' margin-left-50'
            } else if (vcode.length === 12) {
              vnameClass += ' margin-left-75'
            } else if (vcode.length === 15) {
              vnameClass += ' margin-left-100'
            }
          }
          return vnameClass
        }
      }
      /* ,
       sumCount () {
         return (rowData) => {
           // console.log('this.data.map(row => row.value)' + rowData.uuid, this.data.map(row => row.value))
           var bb = []
           for (var i in this.data.map(row => row.value)) {
             if (this.data.map(row => row.value)[i] && this.data.map(row => row.sumTarget)[i] === rowData.uuid) {
               bb.push(this.data.map(row => row.value)[i])
             }
           }
           // + (rowData.value.value === '' ? 0 : parseFloat(rowData.value.value))
           return (bb.reduce((acc, cur) => (parseFloat(cur) + acc), 0) === 0 ? '' : bb.reduce((acc, cur) => (parseFloat(cur) + acc), 0))
         }
       }*/
    },
    methods: {
      //tab切换事件
      tabChange(tab, event){
        console.log(tab, event)
      },
      //002009004  房建折合面积
      //002009001 房建新开工面积
      //002009001001  其中：新开工面积
      //计算房建施工面积和其中投标承包面积
      clacFjsg(list) {
        var sgVal = 0, qztbVal = 0;
        list.forEach((item, index) => {
          if (item.tjxCode == '002009001') {
            sgVal += Number(item.totalValue)
          }
          if (item.tjxCode == '002009002') {
            sgVal += Number(item.yearValue)
          }
          if (item.tjxCode == '002009001001') {
            qztbVal += Number(item.totalValue)
          }
          if (item.tjxCode == '002009002001') {
            qztbVal += Number(item.yearValue)
          }
        });
        list.forEach((item, index) => {
          if (item.tjxCode == '002009002') {
            sgVal = sgVal - Number(item.totalValue)
          }
          if (item.tjxCode == '002009002001') {
            qztbVal = qztbVal - Number(item.totalValue)
          }
        });
        list.forEach((item, index) => {

          if (item.tjxCode == '002009005') {
            item.monthValue = sgVal;
          }
          if (item.tjxCode == '002009005001') {
            item.monthValue = qztbVal;
          }
        });
      },
      //隐藏某些行
      tableRowClassName: function (row, index) {
        if (row.row.tjxCode == '002009003' || row.row.tjxCode == '002009003001' || row.row.tjxCode == '002009005' || row.row.tjxCode == '002009005001') {
          return 'hidden-row';
        }
        return '';
      },
      //计算比较实物工程量
      calcValue(list) {
        var i = 0, len = list.length, canWrite = true;
        var zszx = 0,//其中其中：装饰装修
          jzgc = 0,//建筑工程
          jgcz = 0,//竣工产值
          sgcz = 0;//施工产值
        for (; i < len; i++) {
          var v = list[i];
          switch (v.tjxCode) {
            case '001001002001':
              zszx = Number(v.monthValue);
              break;
            case '001001002':
              jzgc = Number(v.monthValue);
              break;
            case '001009':
              jgcz = Number(v.monthValue);
              break;
            case '001001':
              sgcz = Number(v.totalValue);
              break;
          }
        }
        //其中：装饰装修要小于等于建筑工程
        if (zszx > jzgc) {
          this.$message.error("其中：装饰装修要小于等于建筑工程");
          canWrite = false;
        }
        //竣工产值要小于等于施工产值的开累完成
        if (jgcz > sgcz) {
          this.$message.error("竣工产值要小于等于施工产值的开累完成");
          canWrite = false;
        }
        return canWrite;
      },
      //流程操作
      operation(type) {
        var msg = '', that = this;
        this.$prompt('请输入审核意见', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          if (type == 'back') {
            if (value == null || value == '') {
              this.$message.error('审核意见不能为空');
              return false;
            }
          } else {
            if (value == null || value == '') {
              value = that.examineReviewMsg;
            }
          }
          this.p.task.remark = value;
          this.$http
            .post(
              '/api/statistics/projectMonthlyReport/Projectreport/process/' + type,
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
      //设置当年的完成值
      getYear(list, index, code) {
        var canWrite = this.calcValue(list);
        if (canWrite) {
          if (Number(list[index].oldTotalValue) + Number(list[index].monthValue) > Number(this.projectList.contractAmountEngine)) {
            this.$message.error("施工产值的开累完成不能大于项目的工程合同额");
            list[index].monthValue = '';
            return false;
          }
          var treeSum = 0, parentNum = 0, canCalc = false, parentCanCalc = false;
          list.forEach((item) => {
            if (item.tjxCode.length >= 12 && item.sumTarget == code) {
              treeSum += Number(item.monthValue);
              console.log(item.tjxName)
              canCalc = true;
            }
            if (item.tjxCode == code && item.tjxCode.length == 9) {
              parentNum = Number(item.monthValue);
              parentCanCalc = true;
              // console.log(item.tjxName)
            }
          });
          // console.log(list[index].tjxCode.length,treeSum,parentNum,list[index].sumTarget,canCalc,parentCanCalc)
          if (treeSum != 0 && parentNum != 0 && list[index].sumTarget && canCalc && parentCanCalc && list[index].tjxCode.length >= 12 && (treeSum > parentNum)) {
            this.$message.error("该级本月完成之和不能大于上级本月完成");
            list[index].monthValue = '';
            return false;
          }
          var num = 0;
          var num1 = 0;
          var num2 = 0;
          list[index].yearValue = list[index].oldYearValue ? Number(list[index].oldYearValue) + Number(list[index].monthValue) : list[index].monthValue;
          list[index].totalValue = list[index].oldTotalValue ? Number(list[index].oldTotalValue) + Number(list[index].monthValue) : list[index].monthValue;
          // list[index].yearRate=list[index].yearValue&&list[index].yearPlan?(Number(list[index].yearValue)/Number(list[index].yearPlan)/ 100).toFixed(4):0;
          list[index].yearRate = list[index].yearValue && list[index].yearPlan ? (Number(list[index].yearValue) / Number(list[index].yearPlan) * 100).toFixed(2) : '';
          // list[index].monthRate=list[index].monthPlan>0?(Number(list[index].monthValue)/Number(list[index].monthPlan) / 100).toFixed(4):Number(list[index].monthValue)*100;
          list[index].monthRate = list[index].monthValue && list[index].monthPlan > 0 ? (Number(list[index].monthValue) / Number(list[index].monthPlan) * 100).toFixed(2) : '';
          list[index].totalRate = list[index].totalValue && list[index].totalPlan ? (Number(list[index].totalValue) / Number(list[index].totalPlan) / 100).toFixed(2) : 0;
          // console.log(list[index])
          //code3位 一级  code6位  二级  code9位  三级  code12位 四级
          list.forEach((item, i) => {
            if (item.sumTarget == code && item.tjxId != '192' && item.tjxId != '126' && item.veditable == '1') {
              num = Number(item.monthValue) + num;
              num1 = Number(item.yearValue) + num1;
              num2 = Number(item.totalValue) + num2;
            }
          });
          this.data.forEach((item, i) => {
            if (item.tjxCode == list[index].sumTarget && item.veditable == '0') {
              item.monthValue = num;
              item.yearValue = num1;
              item.totalValue = num2;
            }
          });
          if (list[index].tjxCode == '002009001' || list[index].tjxCode == '002009002' || list[index].tjxCode == '002009001001' || list[index].tjxCode == '002009002001') {
            this.clacFjsg(list);
          }
        } else {
          list[index].monthValue = '';
        }

      },
      // 保存
      save(type) {
        // this.dataReport.status="1"
        // this.dataReport.flowStatus="1"
        var fjjgmj = 0,//房建竣工面积
          fjjgcz = 0,//房建竣工产值
          sgcz = 0;//施工产值
        this.data.forEach((item, index) => {
          if (item.tjxCode == '002009003') {
            this.dataReport.fjJe = Number(item.monthValue);
          }
          if (item.tjxCode == '002009003001') {
            this.dataReport.qzmjJe = Number(item.monthValue);
          }
          if (item.tjxCode == '002009003001') {
            fjjgmj = Number(item.monthValue);
          }
          if (item.tjxCode == '001001') {
            sgcz = Number(item.totalValue);
          }
        });
        if (sgcz > this.projectList.contractAmountEngine) {
          this.$message.error("施工产值不能大于合同额");
          return false;
        }

        let tableData = {
          projectReportDetaiList: this.data,
          projectreport: this.dataReport,
          planPrjTjxDetailList: this.nextData
        }
        var url = '';
        if (type == 'save') {
          url = "/api/statistics/projectMonthlyReport/Projectreport/detail/saveOrUpdate";
          this.$http
            .post(url, JSON.stringify(tableData), {useJson: true})
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: `${type == 'save' ? '保存' : '提交'}成功`,
                  duration: 1000,
                  type: 'success',
                  onClose: () => {
                    // this.$router.back()
                  }
                })
              }
            })
        } else {
          url = "/api/statistics/projectMonthlyReport/Projectreport/process/start";
          var sj = new Date().toLocaleDateString().split('/');
          this.$http
            .post('/api/statistics/projectMonthlyReport/ReportEndtime/detail/checkReportTime',
              JSON.stringify({
                'restrictedobjectsType': this.userdata.managerOrgType,
                'reportType': '1',
                'endreporttime': sj[2],
              }),
              {useJson: true})
            .then(res => {
              if (res.data.data == '0') {
                this.$http
                  .post(url, JSON.stringify(tableData), {useJson: true})
                  .then(res => {
                    if (res.data.code === 200) {
                      this.$message({
                        message: `${type == 'save' ? '保存' : '提交'}成功`,
                        duration: 1000,
                        type: 'success',
                        onClose: () => {
                          this.$router.back()
                        }
                      })
                    }
                  })
              } else {
                this.$message.error('当前月报已经过了上报截止日期,不能提交!')
              }
            })

        }

      },
      getPlanYear(list, index, code) {
        var num = 0;
        list.forEach((item, i) => {
          if (item.sumTarget == code) {
            num = Number(item.value) + num;
          }
        });
        this.data.forEach((item, i) => {
          if (item.tjxCode == list[index].sumTarget) {
            item.value = num;
          }
        });
      },
      getNextPlanYear(list, index, code) {
        var num = 0;
        list.forEach((item, i) => {
          if (item.sumTarget == code) {
            num = Number(item.value) + num;
          }
        });
        this.nextData.forEach((item, i) => {
          if (item.tjxCode == list[index].sumTarget && item.veditable == '0') {
            item.value = num;
          }
        });
      },
      submit() {
        this.dataReport.status = "1"
        this.dataReport.flowStatus = "check"
        let tableData = {
          projectReportDetaiList: this.data,
          projectreport: this.dataReport,
          planPrjTjxDetailList: this.nextData
        }
        this.$http
          .post('/api/statistics/projectMonthlyReport/Projectreport/detail/saveOrUpdate', JSON.stringify(tableData), {useJson: true})
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '提交成功',
                duration: 1000,
                type: 'success',
                onClose: () => {
                  this.$router.back()
                }
              })
            }
          })
      },
      /*    rollback() {
            this.$http
              .post('/api/statistics/PlanProjectTjx/detail/save', JSON.stringify({uuid: this.p.planInfo.planId, status: 0}), {useJson: true})
              .then(res => {
                if (res.data.code === 200) {
                  this.$message({
                    message: '回退成功',
                    duration: 1000,
                    onClose: () => { this.$router.back() }
                  })
                }
              })
          },*/
      // 返回上一页
      back() {
        if (this.p.selfPath) {
          let _p = {
            projectName: this.p.projectName,
            fromDate: this.p.fromDate,
            fromPath: this.p.fromPath,
            projectId: this.p.projectId,
            fromDateStart: this.p.fromDateStart
          };
          console.log(this.p)
          this.$router.push({
            path: this.p.selfPath,
            query: {p: this.$utils.encrypt(JSON.stringify(_p))},

          })
        } else {
          this.$router.back()
        }
      },
      // 获取数据
      getData() {
        this.$http
          .post('/api/statistics/projectMonthlyReport/Projectreport/detail/queryMonthReportEntityInfo', JSON.stringify({
            projectId: this.p.projectId,
            uuid: this.p.uuid || this.p.instid,
            reportYear: this.p.reportYear,
            reportMonth: this.p.reportMonth,
            createOrgCode: this.p.orgCode,
            flowStatus: this.p.projectStatus
          }), {useJson: true})
          .then(res => {
            var datas = res.data.data;
            this.projectList = datas.projectList;
            this.data = datas.projectReportDetaiList
            this.dataReport = datas.projectreport
            this.dataReport.yearDateS = this.dataReport.reportYear + "-" + this.dataReport.reportMonth
            this.nextData = datas.planPrjTjxDetailList;
            this.projectName = datas.projectreport.reportProjectName;
            if (this.projectName == '' || this.projectName == null) {
              this.projectName = this.p.projectName;
            }
            this.data.forEach((item) => {
              item.yearRate = item.yearValue && item.yearPlan ? (Number(item.yearValue) / Number(item.yearPlan) * 100).toFixed(2) : '';
              item.monthRate = item.monthValue && item.monthPlan > 0 ? (Number(item.monthValue) / Number(item.monthPlan) * 100).toFixed(2) : '';
              item.totalRate = item.totalValue && item.totalPlan ? (Number(item.totalValue) / Number(item.totalPlan) / 100).toFixed(2) : 0;
            });
            this.clacFjsg(this.data);
            // this.reportVo=this.data;
          })
      }
    },
    created() {

    },
    mounted() {
      this.getData();
      if (this.p.actpoint == 'task') {
        this.activeName = 'cwjswgcl'
      } else {
        this.activeName = 'ztjd'
      }
    }
  }
</script>
<style lang="scss" scoped>


  .two-left {
    margin-left: 50px !important;
  }

  .two-left {
    margin-left: 100px !important;
  }

  .detail-back-tab {
    padding: 10px 20px;
    border: 1px solid #ddd;
    color: black;
    position: absolute;
    top: 1px;
    right: 15px;
    z-index: 999999999;
    background: #fff;
  }

  .save-btn {
    right: 95px;
    background: #409EFF;
    color: #fff;
  }

  .sub-btn {
    right: 175px;
  }

  .btn-group {
    text-align: center;
    margin-top: 20px;
  }

  .gcform {
    margin-top: 10px;
    > > > .el-form-item__label:before {
      position: initial;
      left: -10px;
    }
    > > > .el-form-item__error {
      padding-top: 0px;
      width: 95%;
      margin-left: 0;
      text-align: right;
      top: 0%;
    }
    > .el-form-item, > > > .formItem {

      display: inline-block;
      width: 32.5% !important;
    }
    .div-item > > > .el-form-item {
      display: inline-block;
      width: 32.5% !important;
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
    .errorMsg > > > .el-form-item__label {
      color: red;
    }
    > > > .el-input {
      width: 300px;
    }
    > > > .el-input > > > .el-input_inner {
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

  /*  >>>.el-input--mini .el-input__inner {
      height: 40px;
      width: 100%;
      box-sizing: border-box;
      // margin: 10px 0 0 10px;
    }*/

  .gcform > > > .el-input {
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

  > > > .el-form-item {
    margin-bottom: 0px;
    text-align: left !important;
  }

  .neirong > > > .el-input--mini .el-input__inner {
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

  /deep/ .el-input__inner {
    height: 25px;
    //text-align: right;
    padding-right: 2px;
  }

  .margin-left-25 {
    margin-left: 25px;
  }

  .margin-left-50 {
    margin-left: 50px;
  }

  .margin-left-75 {
    margin-left: 75px;
  }

  .margin-left-100 {
    margin-left: 100px;
  }

  .editable {
    color: #0e45a1;
  }

  /deep/ .el-collapse-item__header {
    height: 35px !important;
    ling-height: 35px !important;
  }

  /deep/ .el-collapse-item__content {
    padding-bottom: 5px !important;
  }

  /deep/ .el-input__inner {
    height: 25px;
    text-align: right;
    padding-right: 2px;
  }

  /*按钮样式*/
  .detail-back-tab {
    padding: 10px 20px;
    border: 1px solid #ddd;
    color: black;
    position: absolute;
    top: 1px;
    right: 15px;
    z-index: 999999999;
    background: #fff;
  }

  .save-btn {
    right: 95px;
    background: #409EFF;
    color: #fff;
  }

  .detailBoxBG {
    overflow: hidden !important;
  }

  .sub-btn {
    right: 175px;
  }

  .tableStyle {
    max-height: calc(100vh - 130px) !important;
    min-height: calc(100vh - 130px) !important;
    overflow: auto;
  }
  .tableStyle2 {
    max-height: calc(100vh - 150px) !important;
    min-height: calc(100vh - 150px) !important;
    overflow: auto;
  }
  /**/
</style>
