<template>
  <div class="searchListClass" style="margin-bottom: -50px;">
    <!-- <el-menu default-active="2" class="el-menu-vertical-demo" >
      <el-submenu index="1">
        <template slot="title">
          <span>查询条件</span>
        </template>
        <el-menu-item-group> -->
          <el-form
            class="queryForm"
            :inline="true"
            :model="searchform"
            @keyup.enter.native="getData()"
          >
            <el-form-item label="项目名称:">
              <el-input
                v-model="searchform.projectName"
                placeholder="项目名称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="所属单位:">
              <el-input
                disabled
                clearable
                placeholder="请输入"
                v-model="searchform.createOrgName">
                <el-button  slot="append" icon="el-icon-circle-plus-outline"
                @click="addDw('所属单位',searchform.createOrgCode,false)"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="签约/使用资质单位:">
              <el-input
                disabled
                clearable
                placeholder="请输入"
                v-model="searchform.companyName">
                <el-button slot="append" icon="el-icon-circle-plus-outline" 
                @click="addDw('签约/使用资质单位',searchform.companyId)"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="项目板块:">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                v-model="searchform.projectModuleId"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectPlate"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="项目状态:">
              <el-select
                filterable
                clearable
                placeholder="请选择"
                v-model="searchform.projectStatusId"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectStatus"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="工程类别(一级):">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                @change="getProjectTwo"
                v-model="searchform.projectTypeFirstId"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectDomainType"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="工程类别(二级):">
              <el-select
                clearable
                filterable
                :disabled="searchform.projectTypeFirstId == ''"
                placeholder="请先选择一级类别"
                v-model="searchform.projectTypeSecondId"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectTypeTwo"
                />
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="建设单位:">
              <el-input
                v-model="searchform.companyBuild"
                placeholder="建设单位"
                clearable
              ></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="设计单位:">
              <el-input
                v-model="searchform.companyDesign"
                placeholder="设计单位"
                clearable
              ></el-input>
            </el-form-item> -->
            <el-form-item label="项目类型:">
              <el-select
                filterable
                clearable
                placeholder="请选择"
                v-model="searchform.projectTypeId"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.detailCode"
                  v-for="(item, index) in projectType"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="新兴市场类别(一级):">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                @change="getMarketTwo"
                v-model="searchform.marketFirstId"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in emergingMarket"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="新兴市场类别(二级):">
              <el-select
                filterable
                clearable
                :disabled="searchform.marketFirstId == ''"
                placeholder="请先选择一级类别"
                v-model="searchform.marketSecondId"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in emergingMarketTwo"
                />
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="是否托管:">
              <el-select
                filterable
                clearable
                placeholder="请选择"
                v-model="searchform.isTrusteeship"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in yesOrNo"
                />
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="是否代管:">
              <el-select
                filterable
                clearable
                placeholder="请选择"
                v-model="searchform.isEscrow"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in yesOrNo"
                />
              </el-select>
            </el-form-item> -->
            <!-- <el-button
              @click="searchformReset"
              type="info"
              plain
              style="color:black;background:none"
              ><i class="el-icon-refresh-right"></i>重置</el-button
            >
            <el-button @click="getData" type="primary" plain
              ><i class="el-icon-search"></i>查询</el-button
            >
            <el-button @click="exportData" type="primary" plain
              ><i class="el-icon-upload2"></i>导出</el-button
            > -->
          <!-- </el-form>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <el-form
      class="queryForm"
      :inline="true"
      :model="searchform"
      style="float:right"
    > -->
      <el-button
        @click="searchformReset"
        type="info"
        plain
        style="color:black;background:none"
        ><i class="el-icon-refresh-right"></i>重置</el-button
      >
      <el-button @click="getData" type="primary" plain
        ><i class="el-icon-search"></i>查询</el-button
      >
      <el-button @click="exportData" type="primary" plain
        ><i class="el-icon-upload2"></i>导出</el-button
      >
    </el-form>
    <div style="margin-top: 10px;overflow-x: scroll;overflow-y: scroll;">
      <el-table
        class=""
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke'
        }"
        @row-dblclick="rowShow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        tooltip-effect="dark"
        :max-height="$tableHeight-30"
        :height="$tableHeight-30"
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
          :width="150"
          align="center"
          label="板块"
          prop="projectModuleName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="200"
          label="项目简称"
          prop="projectOmit"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="项目名称"
          prop="projectName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="承建单位"
          prop="companyBuiltName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="初始合同额"
          prop="contractAmountInitial"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程合同额"
          prop="contractAmountEngine"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="签约单位"
          prop="companyName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程类别(一级)"
          prop="projectTypeFirst"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程类别(二级)"
          prop="projectTypeSecond"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="300"
          align="center"
          label="项目编码"
          prop="projectCode"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="项目状态"
          prop="projectStatusName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="新兴市场一级类别"
          prop="marketFirstName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="新兴市场二级类别"
          prop="marketSecondName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="项目性质(一级)"
          prop="projectNatureFirst"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="项目性质(二级)"
          prop="projectNatureSecond"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="项目所在地"
          prop="projectLocation"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="所属铁路局"
          prop="railwayName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="开累完成"
          prop=""
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="本年完成"
          prop=""
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="本月完成"
          prop=""
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="剩余额"
          prop=""
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="计量单位"
          prop="unitName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程合同数量"
          prop="contractCount"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="合同开工日期"
          prop="contractStartTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.contractStartTime | dateformat
          }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="合同竣工日期"
          prop="contractEndTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.contractEndTime | dateformat
          }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="合同签订日期"
          prop="contractSignTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.contractSignTime | dateformat
          }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="实际开工日期"
          prop="realStartTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.realStartTime | dateformat
          }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="实际竣工日期"
          prop="realEndTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.realEndTime | dateformat
          }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="建设单位"
          prop="companyBuild"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="设计单位"
          prop="companyDesign"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="监理单位"
          prop="companySupervisor"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程标段"
          prop="projectBidSection"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="项目经理"
          prop="projectManagerName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="起讫地点"
          prop="beginAddress"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="竣工产值"
          prop="completedOutputValue"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="竣工日期"
          prop="projectEndTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.projectEndTime | dateformat
          }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="增值税"
          prop="valueAddedTax"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="是否托管"
          prop="isTrusteeship"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.isTrusteeship == "0" ? "是" : "否"
          }}</template>

        </el-table-column>
         <el-table-column
            property="menusstate"
            :width="150"
            align="center"
            prop="monthReport"
            show-overflow-tooltip
            label="不填月报"
          >
            <template slot-scope="scope">
              <el-switch
                class="inline-formitem-switch"
                v-model="scope.row.monthReport"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="1"
                inactive-value="0"
                @change="monthReportChange(scope.row.monthReport,scope.row.uuid,scope.$index)"
              >
              </el-switch>
            </template>
          </el-table-column>
          
         <el-table-column
            property="menusstate"
            :width="150"
            align="center"
            prop="monthReportTypeCode"
            show-overflow-tooltip
            label="填报类型"
          >
            <template slot-scope="scope">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                @change="reportTypeChange(scope.row.uuid,scope.row.monthReportTypeCode)"
                v-model="scope.row.monthReportTypeCode">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.detailCode"
                  v-for="(item, index) in projectFillType"/>
              </el-select>
            </template>
          </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="是否代管"
          prop="isEscrow"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.isEscrow == "0" ? "是" : "否"
          }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程概况"
          prop="engineSurvey"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="本月完成(验工计价)"
          prop=""
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="本年完成(验工计价)"
          prop=""
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="开累完成(验工计价)"
          prop=""
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :min-width="200"
          align="center"
          label="备注"
          prop="projectRemark"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :current-page="page.current"
      :page-size="page.size"
      :page-sizes="[20, 50, 100]"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
  </div>
</template>

<script>
import CompanyTree from '../companyTree'
export default {
  components: {
    CompanyTree
  },
  data() {
    return {
      DwVisible: false,
      projectTypeTwo: [], // 工程类别(二级)
      emergingMarketTwo: [], // 新兴市场(二级)
      yesOrNo: [
        { id: "0", detailName: "是" },
        { id: "1", detailName: "否" }
      ],
      page: { current: 1, size: 20, total: 0, records: [] },
      searchform: {
        current: 1,
        size: 20,
        projectName: "", // 项目名称
        projectModuleId: "", // 项目板块
        projectStatusId: "", // 项目状态
        projectTypeFirstId: "", // 工程类别(一级)
        projectTypeSecondId: "", // 工程类别(二级)
        companyBelongName: "", // 所属单位
        companyBelongId: "", // 所属单位
        companyName: "", // 签约/使用资质单位
        companyId: "", // 签约/使用资质单位
        createOrgCode:'', //所属单位 ->取创建单位
        createOrgName:'', //所属单位 ->取创建单位
        companyBuild: "", // 建设单位
        companyDesign: "", // 设计单位
        projectTypeId: "", // 项目类型
        marketFirstId: "", // 新兴市场类别(一级)
        marketSecondId: "", // 新兴市场类别(二级)
        isTrusteeship: "", // 是否托管
        isEscrow: "", // 是否代管
        monthReport:""
      },
      multipleSelection: []
    };
  },
  mounted() {
    this.$store.dispatch("getConfig", {});
    this.$store.dispatch("getCategory", {
      name: "emergingMarket",
      id: "33de2e063b094bdf980c77ac7284eff3"
    });
    this.$store.dispatch("getCategory", {
      name: "projectDomainType",
      id: "238a917eb2b111e9a1746778b5c1167e"
    });
    this.$store.dispatch("getCategory", {
      name: "projectNature",
      id: "99239d3a143947498a5ec896eaba4a72"
    });
  },
  computed: {
    projectPlate() {
      return this.$store.state.projectPlate; // 项目板块
    },
    projectStatus() {
      return this.$store.state.projectStatus; // 项目状态
    },
    projectDomainType() {
      return this.$store.state.category.projectDomainType; // 工程类别
    },
    emergingMarket() {
      return this.$store.state.category.emergingMarket; // 新兴市场
    },
    projectType() {
      return this.$store.state.projectType; // 项目类型
    },
    projectFillType(){
      return this.$store.state.projectFillType; // 填报类型
    }
  },
  methods: {
    // 获取工程类别(二级)
    getProjectTwo(id) {
      this.searchform.projectTypeSecondId = "";
      this.projectTypeTwo = [];
      if (id !== "") {
        this.projectDomainType.find(item => {
          if (item.id === id) {
            this.projectTypeTwo = item.children;
          }
        });
      }
    },
    // 获取新兴市场(二级)
    getMarketTwo(id) {
      this.searchform.marketSecondId = "";
      this.emergingMarketTwo = [];
      if (id !== "") {
        this.emergingMarket.find(item => {
          if (item.id === id) {
            this.emergingMarketTwo = item.children;
          }
        });
      }
    },
    monthReportChange(data,id,index){
      this.$http
        .post(
          "/api/statistics/StatisticsProject/detail/isFillReport",
          {projectId:id,isFillReport:data}
        )
        .then(res => {
          if(res.data.data === 1){
            this.page[index].monthReport = 0;
            this.$message.info("该项目本年本月已填过月报不可选择");
          }
        });
    },
    reportTypeChange(id,code){
      // this.projectFillType.find(item => {
      //   if (item.detailCode === code) {
      //     this.projectTypeTwo = item.children;
      //   }
      // });
        this.$http
        .post(
          "/api/statistics/StatisticsProject/detail/updateReportType",
          {id:id,monthReportTypeCode:code}
        )
        .then(res => {
          if(res.data.data === 1){
            this.$message.info("修改成功");
          }
        });
    },
    getRoute(id) {
      var url = null;
      if (id === "7f4fcba4255b43a8babf15afd6c04a53") {
        url = "./engineAdd/";
      } else if (id === "f6823a41e9354b81a1512155a5565aeb") {
        url = "./designAdd/";
      } else if (id === "510ba0d79593418493eb1a11ea4e7af6") {
        url = "./estateAdd/";
      } else if (id === "510ba0d79593418493eb1a11ea4e7af4") {
        url = "./tradeAdd/";
      } else if (id === "510ba0d79593418493eb1a11ed3e7df4") {
        url = "./manufactureAdd/";
      } else if (id === "510ba0d79593418493eb1a11ea4e7df4") {
        url = "./financeAdd/";
      } else if (id === "510ba0d79593418493eb1a11ed4e7df4") {
        url = "./maintenanceAdd/";
      } else if (id === "510ba0d79593419493eb1a11ed3e7df4") {
        url = "./otherAdd/";
      }
      return url;
    },
    exportData() {
      this.searchform.size=1000000000;
        this.$http
          .post(
            "/api/statistics/StatisticsProject/list/projectInfoPageData",
            this.searchform
          )
          .then((res) => {
            this.searchform.size=20;
            var datas = res.data.data.records;
            this.$exportXls.exportList({
              thead:' <tr>\n' +
              '<th>项目名称</th>\n' +
              '<th>项目简称</th>\n' +
              '<th>项目板块</th>\n' +
              '<th>承建单位</th>\n' +
              '<th>初始合同额</th>\n' +
              '<th>工程合同额</th>\n' +
              '<th>签约单位</th>\n' +
              '<th>工程类别(一级)</th>\n' +
              '<th>工程类别(二级)</th>\n' +
              '<th>项目状态</th>\n' +
              '<th>新兴市场(一级)</th>\n' +
              '<th>新兴市场(二级)</th>\n' +
              '<th>项目性质(一级)</th>\n' +
              '<th>项目性质(二级)</th>\n' +
              '<th>项目所在地</th>\n' +
              '<th>所属铁路局</th>\n' +
              '<th>开累完成</th>\n' +
              '<th>本年完成</th>\n' +
              '<th>本月完成</th>\n' +
              '<th>剩余额</th>\n' +
              '<th>计量单位</th>\n' +
              '<th>工程合同数量</th>\n' +
              '<th>合同开工日期</th>\n' +
              '<th>合同竣工日期</th>\n' +
              '<th>合同签订日期</th>\n' +
              '<th>实际开工日期</th>\n' +
              '<th>实际竣工日期</th>\n' +
              '<th>建设单位</th>\n' +
              '<th>设计单位</th>\n' +
              '<th>监理单位</th>\n' +
              '<th>工程标段</th>\n' +
              '<th>项目经理</th>\n' +
              '<th>起讫地点</th>\n' +
              '<th>竣工产值</th>\n' +
              '<th>竣工日期</th>\n' +
              '<th>增值税</th>\n' +
              '<th>是否托管</th>\n' +
              '<th>不填月报</th>\n' +
              '<th>填报类型</th>\n' +
              '<th>是否代管</th>\n' +
              '<th>工程概况</th>\n' +
              '<th>本月完成（验工计价）</th>\n' +
              '<th>本年完成（验工计价）</th>\n' +
              '<th>开累完成（验工计价）</th>\n' +
              '<th>备注</th>\n' +
              '</tr>',
              jsonData:datas,
              tdstr:['projectName','projectOmit','projectModuleName',
                'companyBuiltName','contractAmountInitial','contractAmountEngine','amountCompanyName',
                'projectTypeFirst','projectTypeSecond','projectStatusName','marketFirstName','marketSecondName'
                ,'projectNatureFirst','projectNatureSecond','projectLocation','railwayName',''
                ,'','','','unitName','contractCount'
                ,'contractStartTime','contractEndTime','contractSignTime','realStartTime','realEndTime'
                ,'companyBuild','companyDesign','companySupervisor','projectBidSection','projectManagerName'
                ,'beginAddress','completedOutputValue','projectEndTime','valueAddedTax','isTrusteeship'
                ,'monthReport','monthReportTypeCode','isEscrow','engineSurvey','','','','projectRemark'],
              tdstrFuc:{
              }
            })
          });
    },
    // 查看
    rowShow(row) {
      let p = { actpoint: "look", uuid: row.uuid };
      let url = this.getRoute(row.projectModuleId);
      if (!url) {
        this.$message({
          message: "该项目存在问题",
          type: "error"
        });
        return;
      }
      this.$router.push({
        path: url,
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      });
    },
    // 选中查看
    show() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info("请选择一条记录进行查看操作!");
        return false;
      }
      let p = { actpoint: "look", uuid: this.multipleSelection[0].uuid };
      let url = this.getRoute(this.multipleSelection[0].projectModuleId);
      if (!url) {
        this.$message({
          message: "该项目存在问题",
          type: "error"
        });
        return;
      }
      this.$router.push({
        path: url,
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      });
    },
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
      this.searchform = {
        current: 1,
        size: 20,
        projectName: "", // 项目名称
        projectModuleId: "", // 项目板块
        projectStatusId: "", // 项目状态
        projectTypeFirstId: "", // 工程类别(一级)
        projectTypeSecondId: "", // 工程类别(二级)
        companyBelongName: "", // 所属单位
        companyBelongId: "", // 所属单位
        companyName: "", // 签约/使用资质单位
        companyId: "", // 签约/使用资质单位
        createOrgCode:'', //所属单位 ->取创建单位
        createOrgName:'', //所属单位 ->取创建单位
        companyBuild: "", // 建设单位
        companyDesign: "", // 设计单位
        projectTypeId: "", // 项目类型
        marketFirstId: "", // 新兴市场类别(一级)
        marketSecondId: "", // 新兴市场类别(二级)
        isTrusteeship: "", // 是否托管
        isEscrow: "", // 是否代管
        monthReport:""
      };
      this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页查询
    getData() {
      this.$http
        .post(
          "/api/statistics/StatisticsProject/list/projectInfoPageData",
          this.searchform
        )
        .then(res => {
          this.page = res.data.data;
        });
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
        if(data&&data.type!='所属单位'){
          data.forEach((item)=>{
            id.push(item.id);
            name.push(item.detailName);
          })
        }
        
        if(data.type=="所属单位"){
          this.searchform.createOrgName=data.name;
          this.searchform.createOrgCode=data.code;
        }else if(data.type=="签约/使用资质单位"){
          this.searchform.companyId=id.join(",");
          this.searchform.companyName=name.join(",");
        }
      this.DwVisible=false;
    },
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
.queryForm .el-input-group {
  margin-top: 5px;
  width: 230px;
}
.queryForm .el-form-item {
  margin-bottom: 3px !important;
}
.queryForm > .el-button {
  margin-top: 5px;
}

>>> .el-form-item__label {
  width: auto;
}

>>> .el-input--mini .el-input__inner {
  height: auto;
  line-height: inherit;
}

.el-table__row {
  cursor: pointer;
}
</style>
