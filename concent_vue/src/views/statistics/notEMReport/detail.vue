<template>
  <div style="position: relative">
    <el-button @click="back" class="detailbutton detail-back-tab" >返回</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailform','save')" class="detailbutton detail-back-tab save-btn">保存</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.topInfoOrg.flowStatus==1||detailform.topInfoOrg.flowStatus==4)" @click="saveInfo('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <!--<el-button v-show="p.actpoint == 'task'&&p.task.edit==true" @click="operation('recall')" class="detailbutton" type="danger">撤销</el-button>-->
    <el-tabs type="border-card" >
      <el-tab-pane label="勘察设计板块">
        <div class="table-div">
          <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
            <el-form-item label="项目简称:">
              <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
            </el-form-item>
            <el-form-item
              label="工程类别(一级):"
            >
              <el-select
                clearable
                filterable
                placeholder="请选择"
                @change="getTwo"
                size="mini"
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
            <el-form-item
              label="工程类别(二级):"
            >
              <el-select
                clearable
                filterable
                placeholder="请选择工程类别(一级)"
                size="mini"
                v-model="searchform.enginTypeSecondId"
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
              label="项目状态:"
            >
              <el-select
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.flowStatus"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectStatus"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="业务板块:"
            >
              <el-select
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.flowStatus"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectStatus"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
            <el-button @click="getData" type="primary" plain>查询</el-button>
            <el-button @click="exportdata" type="primary" plain>导出</el-button>
          </el-form>
          <el-table
            :data="[]"
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
              label="单位名称"
              prop="projectCode"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="项目简称"
              prop="projectName"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="项目名称"
              prop="projectProp"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              :resizable="false"
              label="工程合同额"
              align="center"
              prop="measureUnit"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="年初进度%"
              prop="workAmount"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="月初进度%"
              prop="singlePrice"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="上月进度%"
              prop="sumPrice"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="月末进度%"
              prop="tempPrice"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="本月产值(万元)"
              prop="tempPrice"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="本年产值(万元)"
              prop="tempPrice"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="实物工程量"
              prop="tempPrice"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="计量单位"
              prop="tempPrice"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="本月完成(万元)"
              prop="tempPrice"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="本年完成(万元)"
              prop="tempPrice"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              class="listTabel"
              :resizable="false"
              label="备注"
              prop="tempPrice"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>

          </el-table>
        </div>
        <div class="detailBox">
          <el-form
            :inline="false"
            :model="detailform"
            :rules="rules"
            class="gcform"
            ref="detailform"
          >
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>当月: </span>
            </p>
            <el-form-item
              label="合计:"
              prop="topInfor.inforName"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>
            <el-form-item
              label="其中勘察设计:"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="工程监理:"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="技术咨询与转让:"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="其他:"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <p  class="detail-title" style="overflow: hidden;margin-right:30px">
              <span>当年: </span>
            </p>
            <el-form-item
              label="合计:"
              prop="topInfor.inforName"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforName"/>
            </el-form-item>
            <el-form-item
              label="其中勘察设计:"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="工程监理:"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="技术咨询与转让:"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
            <el-form-item
              label="其他:"
            >
              <el-input
                :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                clearable

                v-model="detailform.topInfor.inforNameForeign"/>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工业制造板块">
        <el-tabs type="border-card">
          <el-tab-pane label="产值">
            <div class="detailBox">
              <el-form
                :inline="false"
                :model="detailform"
                :rules="rules"
                class="gcform"
                ref="detailform"
              >
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>合计:</span>
                </p>
                <el-form-item
                  label="工业总产值(万元):"
                  prop="topInfor.inforName"
                  :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforName"/>
                </el-form-item>
                <el-form-item
                  label="工业总产值年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="装备制造(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="装备制造年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="预构件(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="预构件年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境内数据: </span>
                </p>
                <el-form-item
                  label="工业总产值(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="工业总产值年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="装备制造(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="装备制造年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="预构件(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="预构件年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境外数据: </span>
                </p>
                <el-form-item
                  label="工业总产值(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="工业总产值年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="装备制造(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="装备制造年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="预构件(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="预构件年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="其他工业产品年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要项目管理">
            <div class="table-div">
              <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
                <el-form-item label="项目名称:">
                  <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
                </el-form-item>
                <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
                <el-button @click="getData" type="primary" plain>查询</el-button>
                <el-button @click="exportdata" type="primary" plain>导出</el-button>
              </el-form>
              <el-table
                :data="[]"
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
                  label="项目信息"
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
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同号"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="所属单位"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="境/内外"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目内容"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="推送人"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="联系方式"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="剩余合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="上报产值是否含增值税"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="税额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="本月完成"
                >
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="工业总产值"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="装备制造"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="预购件"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="其他工业产品"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="物资贸易板块">
        <el-tabs type="border-card">
          <el-tab-pane label="产值">
            <div class="detailBox">
              <el-form
                :inline="false"
                :model="detailform"
                :rules="rules"
                class="gcform"
                ref="detailform"
              >
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>合计:</span>
                </p>
                <el-form-item
                  label="物资贸易产值(万元):"
                  prop="topInfor.inforName"
                  :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforName"/>
                </el-form-item>
                <el-form-item
                  label="物资贸易产值年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境内数据: </span>
                </p>
                <el-form-item
                  label="物资贸易产值(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="物资贸易产值年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境外数据: </span>
                </p>
                <el-form-item
                  label="物资贸易产值(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="物资贸易产值年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要项目管理">
            <div class="table-div">
              <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
                <el-form-item label="项目名称:">
                  <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
                </el-form-item>
                <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
                <el-button @click="getData" type="primary" plain>查询</el-button>
                <el-button @click="exportdata" type="primary" plain>导出</el-button>
              </el-form>
              <el-table
                :data="[]"
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
                  label="项目信息"
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
                    label="合同编号号"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目名称"
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="所属单位"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目内容"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="境/内外"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="推送人"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="联系方式"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="剩余合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="上报产值是否含增值税"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="税额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="本月完成"
                >
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="物资贸易产值"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="房地产板块">
        <el-tabs type="border-card">
          <el-tab-pane label="产值">
            <div class="detailBox">
              <el-form
                :inline="false"
                :model="detailform"
                :rules="rules"
                class="gcform"
                ref="detailform"
              >
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>合计:</span>
                </p>
                <el-form-item
                  label="房地产营业收入(万元):"
                  prop="topInfor.inforName"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforName"/>
                </el-form-item>
                <el-form-item
                  label="房地产营业收入年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表内营收(万元)::"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表内营收年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外权益(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外权益年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境内数据: </span>
                </p>
                <el-form-item
                  label="房地产营业收入(万元):"
                  prop="topInfor.inforName"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforName"/>
                </el-form-item>
                <el-form-item
                  label="房地产营业收入年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表内营收(万元)::"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表内营收年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外权益(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外权益年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <p  class="detail-title" style="overflow: hidden;margin-right:30px">
                  <span>境外数据: </span>
                </p>
                <el-form-item
                  label="房地产营业收入(万元):"
                  prop="topInfor.inforName"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforName"/>
                </el-form-item>
                <el-form-item
                  label="房地产营业收入年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表内营收(万元)::"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表内营收年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外权益(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外权益年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
                <el-form-item
                  label="表外非权益年累(万元):"
                >
                  <el-input
                    :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                    clearable

                    v-model="detailform.topInfor.inforNameForeign"/>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要项目管理">
            <div class="table-div">
              <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
                <el-form-item label="项目名称:">
                  <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
                </el-form-item>
                <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
                <el-button @click="getData" type="primary" plain>查询</el-button>
                <el-button @click="exportdata" type="primary" plain>导出</el-button>
              </el-form>
              <el-table
                :data="[]"
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
                  label="项目信息"
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
                    prop="projectCode"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同号"
                    prop="projectName"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="所属单位"
                    prop="projectProp"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="false"
                    label="境/内外"
                    align="center"
                    prop="measureUnit"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="项目内容"
                    prop="workAmount"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="推送人"
                    prop="singlePrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="联系方式"
                    prop="sumPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="剩余合同额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="上报产值是否含增值税"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="税额"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="本月完成"
                >
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="房地产营业收入"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="表内营收"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="表外权益"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    class="listTabel"
                    :resizable="false"
                    label="表外非权益"
                    prop="tempPrice"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'">
        <Audit-Process :task="p.task||{businessId:p.instid,businessType:' contract_project_new'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import FileUpload from '@/components/fileUpload'
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
        timeout:  null,
        maxMoney:1000000,
        id:'',
        key: 0,
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index
        options2: [],
        options: [],
        searchform:{},
        detailform: {
          topInfor: {
            marketSecondId:'',
            constructionOrg:''
          },
          topInfoOrg: {},
          topInfoSiteList: [],
          topInfoSectionList: [],
          value1: [],
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
        },
        xqprojectType: [],//工程类别二级
        emergingMarketTwo:[],//新兴市场二级
        projectNatureTwo:[],//项目性质二级
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
          ],
          phone: [
            { required: true,validator: validatePhone, trigger: 'blur' }
          ]
        },//表单验证规则
      };
    },
    components: {
      Tree,
      FileUpload,
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
      pubCustomers() {//客户名称
        return this.$store.state.pubCustomers;
      },
      assemblyType(){
        return this.$store.state.assemblyType;//装配类型
      },
      architecturalType(){
        return this.$store.state.architecturalType;//建筑类型
      },
      buildingStructure(){
        return this.$store.state.buildingStructure;//建筑结构类型
      },
      siteName(){
        return this.$store.state.siteName;//场地名称
      },
    },
    mounted() {
      // window.onresize = () => {
      //   return (() => {
      //     window.screenWidth = document.body.clientWidth
      //   console.log( window.screenWidth)
      // })()
      // }
      // this.$store.commit("setCategory", 'projectDomainType');
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch("getPubCustomers", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
      this.id=this.p.instid;
      if (this.p.actpoint === "edit"||this.id) {
        this.getDetail();
      }
      if (this.p.actpoint === "add") {
        this.detailform.topInfoSiteList=[{
          country: '',
          ffid: '',
          path: '',
          contractAmount: '',
          isMain: ''
        }];
        this.detailform.topInfoSectionList=[{
          sectionName: '',
          projectScale: '',
        }]
      }

      // eslint-disable-next-line no-unde
    },
    methods: {
      //复选下拉框框获取name
      getMultipleName(valueList,list,id,name){
        var _id=[],_name=[];
        list.forEach((item)=>{
          if(valueList.indexOf(item.id)!=-1){
          _id.push(item.id);
          _name.push(item.detailName)
        }
      });
        this.detailform.topInfor[id]=_id.join(",");
        this.detailform.topInfor[name]=_name.join(",");
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
      //建设单位搜索
      querySearchAsync(queryString, cb) {
        var restaurants = this.pubCustomers;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.$forceUpdate();
        cb(results);
      }, 500 * Math.random());
      },
      createStateFilter(queryString) {
        return (restaurants) => {
          return (restaurants.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
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
      //解决新增的时候二级联动清除不了
      clear(id,name){
        id='';
        name='';
        this.$forceUpdate();
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
        this.detailform.topInfor.enginTypeSecondName='';
        this.detailform.topInfor.enginTypeFirstName='';
        this.xqprojectType=[];
        if(id!=''){
          this.projectDomainType.find(
            (item) => {
            if (item.id == id) {
            this.detailform.topInfor.enginTypeFirstName = item.detailName;
            this.xqprojectType = item.children;
          }
        }
        )
        }
      },
      //新兴市场二级
      getTwoSC(id) {
        this.detailform.topInfor.marketSecondId='';
        this.detailform.topInfor.marketSecondName='';
        this.detailform.topInfor.marketFirstName='';
        this.emergingMarketTwo=[];
        if(id!=''){
          this.emergingMarket.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.topInfor.marketFirstName = item.detailName;
            this.emergingMarketTwo = item.children;
          }
        }
        )
        }
      },
      //项目性质二级
      getTwoXZ(id){
        this.detailform.topInfor.projectNatureSecondId='';
        this.detailform.topInfor.projectNatureSecondName='';
        this.detailform.topInfor.projectNatureFirstName='';
        this.projectNatureTwo=[];
        if(id!=''){
          this.projectNature.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.topInfor.projectNatureFirstName = item.detailName;
            this.projectNatureTwo = item.children;
          }
        }
        )
        }
      },
      //获取下拉框id和name的公共方法
      getName(id, list, name) {
        if(id){
          this.$forceUpdate();
          this.detailform.topInfor[name] = list.find(
            (item) => item.id == id
        ).detailName;
          console.log(this.detailform.topInfor[name]);
        }
      },
      //获取下拉框id和name的公共方法
      getNameZb(id, list, name) {
        if(id){
          this.$forceUpdate()
          this.detailform.topInfoOrg[name] = list.find(
            (item) => item.id == id
        ).detailName;
          console.log(this.detailform.topInfoOrg[name]);
        }
      },
      saveInfo(formName,type) {
        var url='';
        if(type=='save'){
          url="/api/contract/topInfo/TopInfor/detail/saveOrUpdate"
        }else{
          url="/api/contract/topInfo/TopInfor/process/start"
        }
        var topInforCapitalList = [];
        this.amountSource.forEach((item) => {
          if (this.detailform.value1&&this.detailform.value1.indexOf(item.id) != -1) {
          var v = {
            capitalId: item.id,
            capitalName: item.detailName,
          };
          topInforCapitalList.push(v);
        }
      });
        this.detailform.topInforCapitalList=topInforCapitalList;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                url,
                JSON.stringify(this.detailform),
                {useJson: true}
              )
              .then((res) => {
              if (res.data.code === 200) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.$refs[formName].resetFields();
              this.$router.push({
                path: "/manage/proposal/list",
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
        this.$router.back()
        // this.$router.push({
        //   path: "/manage/proposal/list",
        // });
      },
      del(index,item,list,type) {
        console.log(index);
        if(item.uuid&&type=='bd'){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
              "/api/contract/topInfo/TopInfoSection/list/delete",
              {ids: [item.uuid]}
            )
            .then((res) => {
            if (res.data && res.data.code === 200) {
            list.splice(index, 1);
            console.log(list)
          } else {
            this.$message.error(data.msg)
          }
        });
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
            isMain: ''
          }
          this.detailform.topInfoSiteList.push(v);
        } else {
          v = {
            sectionName: '',
            projectScale: '',
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
      // 加载列表
      getDetail() {
        this.$http
          .post("/api/contract/topInfo/TopInfor/detail/entityInfo", {topOrgId:this.id})
          .then((res) => {
          var datas=res.data.data;
        this.getTwo(datas.topInfor.enginTypeFirstId||'');
        this.getTwoSC(datas.topInfor.marketFirstNameId||'');
        this.getTwoXZ(datas.topInfor.projectNatureFirstId||'');
        this.detailform={
          topInfor: datas.topInfor,
          topInfoOrg: datas.topInfoOrg,
          topInfoSiteList: datas.topInfoSiteList,
          topInfoSectionList: datas.topInfoSectionList,
          value1:[],
          zplx:[],//装配类型
          jzlx:[],//建筑类型
          jzjglx:[],//建筑结构类型
          cdmc:[],//场地名称
        }
        this.detailform.cdmc=datas.topInfor.siteNameId&&datas.topInfor.siteNameId.split(",");
        this.detailform.zplx=datas.topInfor.otherAssemblyTypeId&&datas.topInfor.otherAssemblyTypeId.split(",");
        this.detailform.jzlx=datas.topInfor.otherBuildingTypeId&&datas.topInfor.otherBuildingTypeId.split(",");
        this.detailform.jzjglx=datas.topInfor.otherBuildingStructureTypeId&&datas.topInfor.otherBuildingStructureTypeId.split(",");
        datas.topInforCapitalList.forEach((item)=>{
          this.detailform.value1.push(item.capitalId)
      });
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
    padding: 20px;
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
</style>

