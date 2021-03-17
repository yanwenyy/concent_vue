<template>
  <div style="position: relative">
    <div class="tabs-header-copy"></div>
    <el-button @click="back" class="detailbutton detail-back-tab" >返回</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailform','save')" class="detailbutton detail-back-tab save-btn">保存</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||p.stauts==1||p.stauts==4)" @click="saveInfo('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <!--<el-button v-show="p.actpoint == 'task'&&p.task.edit==true" @click="operation('recall')" class="detailbutton" type="danger">撤销</el-button>-->
    <el-tabs type="border-card" >
      <el-tab-pane label="生产经营计划(计1)">
        <div class="table-div">
          <el-table
            :data="detailform.kc_list"
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
              label="单位\指标"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="企业总产值计划(万元)"
            >
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="合计"
                prop="projectOmit"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="其中"
              >
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="工程承包"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="勘察设计咨询"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="工业制造"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="房地产开发"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="物资物流"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="其他"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="金融保险"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="预计2020年底剩余合同额(万元)"
              prop="projectOmit"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工程承包计划">
        <el-tabs type="border-card">
          <el-tab-pane label="剩余合同额分类情况一览表(计1-2)">
            <div class="table-div">
              <el-table
                :data="detailform.kc_list"
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
                  label="单位名称\工程类别"
                  width="150"
                  prop="amountCompanyName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="预计2020年底剩余合同额(万元)"
                  width="150"
                  prop="amountCompanyName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  label="其中"
                >
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="铁路"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="公路"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="城市轨道"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="市政"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="房建"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="水利"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="电力"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="机场"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="港口航道"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="矿山"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="其他工程"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要在建项目施工计划(计2)">
            <div class="table-div">
              <el-table
                :data="detailform.kc_list"
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
                  label="项目名称"
                  prop="amountCompanyName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="工期"
                  prop="amountCompanyName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="所在地"
                  prop="amountCompanyName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="起讫地点(标段)"
                  width="150"
                  prop="amountCompanyName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="计量单位"
                  prop="amountCompanyName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  label="施工总规模"
                >
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="初始合同(万元)"
                    width="150"
                    prop="projectOmit"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同工程(万元)"
                    width="150"
                    prop="amountCompanyName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="2020年12月底累计完成(万元)"
                  width="150"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="预计2020年底累计完成(万元)"
                  width="150"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="2020年12月底剩余(万元)"
                  width="150"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="预计2020年12月底剩余(万元)"
                  width="150"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="2021计划安排(万元)"
                  width="150"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  class="listTabel"
                  :resizable="false"
                  label="到2021底主要建设内容"
                  width="150"
                  prop="projectOmit"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="勘察设计计划(计3)">
        <div class="table-div">
          <el-table
            :data="detailform.kc_list"
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
              label="项目名称"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="工作类别"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="规模(公里)"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="产值计划(万元)"
              width="150"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="工程合同额(万元)"
              width="150"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="开累(万元)"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="剩余合同额(万元)"
              width="150"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="工作时间"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="形象进度"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="房地产开发计划(计4)">
        <div class="table-div">
          <el-table
            :data="detailform.kc_list"
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
              label="项目名称"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="运作单位"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="地域"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="建设地点"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="建设性质"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="本年计划销售金额(万元)"
              width="150"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="本年计划营业收入(万元)"
              width="150"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="备注"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工业制造计划(计5)">
        <div class="table-div">
          <el-table
            :data="detailform.kc_list"
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
              label="单位(产品)名称"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="规格型号"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="计量单位"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="地域"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="数量"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="产值计划(万元)"
              width="150"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="备注"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="物资贸易计划(计6)">
        <div class="table-div">
          <el-table
            :data="detailform.kc_list"
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
              label="单位(产品)名称"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="计量单位"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="地域"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="数量"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="产值计划(万元)"
              width="150"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="备注"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="各版块剩余合同额(计7)">
        <div class="table-div">
          <el-table
            :data="detailform.kc_list"
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
              label="单位名称\业务板块"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="预计2020年底剩余合同额(万元)"
              width="150"
              prop="amountCompanyName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="其中"
            >
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="工程承包"
                prop="amountCompanyName"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="勘察设计"
                prop="amountCompanyName"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="房地产"
                prop="amountCompanyName"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="工业制造"
                prop="amountCompanyName"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="物资贸易"
                prop="amountCompanyName"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                class="listTabel"
                :resizable="false"
                label="其他"
                prop="amountCompanyName"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'">
        <Audit-Process :task="p.task||{businessId:p.instid,businessType:' contract_project_new'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { isMoney, isMobile} from '@/utils/validate'
  import AuditProcess from '@/components/auditProcess'
  export default {
    // name: "详情",
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
      };
      var validatePhone = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMobile(value)) {
          callback(new Error('请输入正确的手机格式'))
        } else {
          callback()
        }
      }
      return {
        Authorization:sessionStorage.getItem("token"),
        projectStatus:[],//项目状态
        timeout:  null,
        maxMoney:1000000,
        id:'',
        key: 0,
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index
        options2: [],
        options: [],
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        searchform:{
          designDetail:{},
          industryDetail:{},
          materialDetail:{},
          otherDetail:{},
          realtyDetail:{},
          secureDetail:{},
          serviceDetail:{},
        },
        detailform: {
          fdc_list:[],
          sumByMon_3:{},
          sumByYear_3:{},
          gy_list:[],
          sumByMon_1:{},
          sumByYear_1:{},
          jrbx_list:[],
          sumByMon_4:{},
          sumByYear_4:{},
          kc_list:[],
          sumByMon_0:{},
          sumByYear_0:{},
          qt_list:[],
          sumByMon_6:{},
          sumByYear_6:{},
          wz_list:[],
          sumByMon_2:{},
          sumByYear_2:{},
          yy_list:[],
          sumByMon_5:{},
          sumByYear_5:{},
        },
        xqprojectType: [],//工程类别二级
        emergingMarketTwo:[],//新兴市场二级
        projectNatureTwo:[],//项目性质二级
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
          ],
          phone: [
            { required: true,validator: validatePhone, trigger: 'blur' }
          ]
        },//表单验证规则
      };
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
    },
    mounted() {
      this.id=this.p.instid;
      // this.getDetail();
      // eslint-disable-next-line no-unde
    },
    methods: {
      addNum(){
        this.detailform.sumByMon_1.industry=Number(this.detailform.sumByMon_1.industry||0)+1;
        this.$forceUpdate();
      },
      //勘察设计月末进度
      setCcsjYmjd(list,obj,name,index){
        console.log(index)
      },
      //修改产值
      getGyzzCz(list,obj,name){
        //  list 列表数据 obj 修改哪个对象 name 修改对象里的哪个值
        var num=0;
        list.forEach((item)=>{
          num=num+Number(item[name]||0);
      })
        obj[name]=num;
        this.$forceUpdate();
      },
      //重置
      searchformReset() {
        this.searchform={
          current: 1,
          size: 20
        };
        this.getData();
      },
      //流程操作
      operation(type){
        this.$http
          .post(
            '/api/contract/topInfo/TopInfor/process/'+type,
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
      submit() {
      },
      saveInfo(formName,type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                '/api/statistics/unProjectReport/save/batch/addDetail',
                JSON.stringify(this.detailform),
                {useJson: true}
              )
              .then((res) => {
              if (res.data.code === 200) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.back();
            }
          });
          } else {
            this.$message.error("请添加必填项");
        return false;
      }
      });
      },
      back() {
        this.$router.back()
        // this.$router.push({
        //   path: "/manage/proposal/list",
        // });
      },
      // 加载列表
      getDetail() {
        var data={};
        if(this.p.actpoint=='add'){
          data={reportDate: this.p.reportDate}
        }else if(this.p.actpoint=='edit'||this.p.actpoint=='look'){
          data={reportUuid: this.p.reportUuid,isAdd:'1',reportDate:this.p.reportDate}
        }
        this.$http
          .post("/api/statistics/unProjectReport/list/queryAllInfo",data )
          .then((res) => {
          var datas=res.data.data;
        this.detailform=datas;
        this.detailform.sumByMon_0=datas.sumByMon_0||{};
        this.detailform.sumByYear_0=datas.sumByYear_0||{};
        this.detailform.sumByMon_1=datas.sumByMon_1||{};
        this.detailform.sumByYear_1=datas.sumByYear_1||{};
        this.detailform.sumByMon_2=datas.sumByMon_2||{};
        this.detailform.sumByYear_2=datas.sumByYear_2||{};
        this.detailform.sumByMon_3=datas.sumByMon_3||{};
        this.detailform.sumByYear_3=datas.sumByYear_3||{};
        this.detailform.sumByMon_4=datas.sumByMon_4||{};
        this.detailform.sumByYear_4=datas.sumByYear_4||{};
        this.detailform.sumByMon_5=datas.sumByMon_5||{};
        this.detailform.sumByYear_5=datas.sumByYear_5||{};
        this.detailform.sumByMon_6=datas.sumByMon_6||{};
        this.detailform.sumByYear_6=datas.sumByYear_6||{};
        this.detailform.statId=this.p.statId;
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
    .div-item >>>.el-form-item{
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
  .table-div{
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  .queryForm>.el-button{
    margin-top: 5px;
  }
  .queryForm >>>.el-form-item__label{
    width: auto;
  }
  .queryForm >>>.el-input--mini .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  .detailTable >>>.el-input input{
    width: 100%;
    height: 30px;
    margin: 5px 0;
    box-sizing: border-box;
  }
  >>>.el-tabs__header{
    width: 77%;
  }
</style>

