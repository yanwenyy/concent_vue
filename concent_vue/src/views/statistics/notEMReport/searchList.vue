<template>
  <div>
    <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
      <el-form-item
        label="填报方式:"
        v-if="gyTypeShow"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="searchform.gyType"
          @change="gyTypeChange"
        >
          <el-option
            label="项目"
            value="1"
          ></el-option>
          <el-option
            label="产品"
            value="2"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="填报年月:">
        <el-date-picker
          v-model="searchform.reportDate"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目名称:">
        <el-input v-model="searchform.projectName" placeholder="项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目所在地:">
        <el-input v-model="searchform.projectLocation" placeholder="项目地点" clearable @clear="searchform.ffid=''">
          <el-button slot="append" icon="el-icon-search"  @click="selectPosition()"></el-button>
        </el-input>
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
          v-model="searchform.projectTypeFirstId"
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
          v-model="searchform.projectTypeSecondId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in xqprojectType"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
      <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
      <el-button @click="exportdata" type="primary" plain><i class="el-icon-upload2"></i>导出</el-button>
    </el-form>
    <div style="margin-top: 10px">
      <el-tabs type="border-card" @tab-click="tabChange" >
        <el-tab-pane :label="industrial">
          <div style="margin-top: 10px">
            <el-table
              default-expand-all
              row-key="uuid"
              :tree-props="{children: 'chirldList', hasChildren: 'hasChildren'}"
              class="tableStyle"
              :max-height="$tableHeight"
              :height="$tableHeight"
              :data="tableData.gy_list"
              :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
              @row-dblclick="rowshow"
              @selection-change="handleSelectionChange"
              border
              highlight-current-row
              ref="table"
              tooltip-effect="dark"
            >
              <!-- <el-table-column
                :width="50"
                align="center"
                show-overflow-tooltip
                type="selection"
              ></el-table-column> -->
              <el-table-column
                :width="70"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>
              <el-table-column
                :width="500"
                label="项目名称"
                prop="projectName"
                show-overflow-tooltip
              >
                <!--<template slot-scope="scope">-->
                <!--<span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场一级类别"
                prop="marketFirstName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场二级类别"
                prop="marketSecondName"
                show-overflow-tooltip

              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同号"
                prop="createTime"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="所属单位"
                prop="companyBelongName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="境/内外"
                prop="state"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.country=='01'?'境内':'境外'}}
                </template>
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同额"
                prop="contractMoney"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="剩余合同额"
                prop="htquantity"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本月工业总产值"
                prop="monthCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本年工业总产值"
                prop="yearCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="物资贸易">
          <div style="margin-top: 10px">
            <el-table
              default-expand-all
              row-key="uuid"
              :tree-props="{children: 'chirldList', hasChildren: 'hasChildren'}"
              class="tableStyle"
              :max-height="$tableHeight"
              :height="$tableHeight"
              :data="tableData.wz_list"
              :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
              @row-dblclick="rowshow"
              @selection-change="handleSelectionChange"
              border
              highlight-current-row
              ref="table"
              tooltip-effect="dark"
            >
              <!-- <el-table-column
                :width="50"
                align="center"
                show-overflow-tooltip
                type="selection"
              ></el-table-column> -->
              <el-table-column
                :width="70"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>
              <el-table-column
                :width="500"
                label="项目名称"
                prop="projectName"
                show-overflow-tooltip
              >
                <!--<template slot-scope="scope">-->
                <!--<span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场一级类别"
                prop="marketFirstName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场二级类别"
                prop="marketSecondName"
                show-overflow-tooltip

              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同号"
                prop="createTime"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="所属单位"
                prop="companyBelongName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="境/内外"
                prop="state"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.country=='01'?'境内':'境外'}}
                </template>
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同额"
                prop="contractMoney"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="剩余合同额"
                prop="htquantity"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本月物资贸易产值"
                prop="monthCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本年物资贸易产值"
                prop="yearCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="房地产">
          <div style="margin-top: 10px">
            <el-table
              default-expand-all
              row-key="uuid"
              :tree-props="{children: 'chirldList', hasChildren: 'hasChildren'}"
              class="tableStyle"
              :max-height="$tableHeight"
              :height="$tableHeight"
              :data="tableData.fdc_list"
              :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
              @row-dblclick="rowshow"
              @selection-change="handleSelectionChange"
              border
              highlight-current-row
              ref="table"
              tooltip-effect="dark"
            >
              <!-- <el-table-column
                :width="50"
                align="center"
                show-overflow-tooltip
                type="selection"
              ></el-table-column> -->
              <el-table-column
                :width="70"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>
              <el-table-column
                :width="500"
                label="项目名称"
                prop="projectName"
                show-overflow-tooltip
              >
                <!--<template slot-scope="scope">-->
                <!--<span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场一级类别"
                prop="marketFirstName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场二级类别"
                prop="marketSecondName"
                show-overflow-tooltip

              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同号"
                prop="createTime"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="所属单位"
                prop="companyBelongName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="境/内外"
                prop="state"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.country=='01'?'境内':'境外'}}
                </template>
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同额"
                prop="amountSignup"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="剩余合同额"
                prop="htquantity"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本月房地产营业收入"
                prop="monthCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本年房地产营业收入"
                prop="yearCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="金融保险">
          <div style="margin-top: 10px">
            <el-table
              default-expand-all
              row-key="uuid"
              :tree-props="{children: 'chirldList', hasChildren: 'hasChildren'}"
              class="tableStyle"
              :max-height="$tableHeight"
              :height="$tableHeight"
              :data="tableData.jrbx_list"
              :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
              @row-dblclick="rowshow"
              @selection-change="handleSelectionChange"
              border
              highlight-current-row
              ref="table"
              tooltip-effect="dark"
            >
              <!-- <el-table-column
                :width="50"
                align="center"
                show-overflow-tooltip
                type="selection"
              ></el-table-column> -->
              <el-table-column
                :width="70"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>
              <el-table-column
                :width="500"
                label="项目名称"
                prop="projectName"
                show-overflow-tooltip
              >
                <!--<template slot-scope="scope">-->
                <!--<span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场一级类别"
                prop="marketFirstName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场二级类别"
                prop="marketSecondName"
                show-overflow-tooltip

              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同号"
                prop="createTime"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="所属单位"
                prop="companyBelongName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="境/内外"
                prop="state"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.country=='01'?'境内':'境外'}}
                </template>
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同额"
                prop="amountSignup"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="剩余合同额"
                prop="htquantity"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本月金融保险产值"
                prop="monthCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本年金融保险产值"
                prop="yearCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="运营维管">
          <div style="margin-top: 10px">
            <el-table
              default-expand-all
              row-key="uuid"
              :tree-props="{children: 'chirldList', hasChildren: 'hasChildren'}"
              class="tableStyle"
              :max-height="$tableHeight"
              :height="$tableHeight"
              :data="tableData.yy_list"
              :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
              @row-dblclick="rowshow"
              @selection-change="handleSelectionChange"
              border
              highlight-current-row
              ref="table"
              tooltip-effect="dark"
            >
              <!-- <el-table-column
                :width="50"
                align="center"
                show-overflow-tooltip
                type="selection"
              ></el-table-column> -->
              <el-table-column
                :width="70"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>
              <el-table-column
                :width="500"
                label="项目名称"
                prop="projectName"
                show-overflow-tooltip
              >
                <!--<template slot-scope="scope">-->
                <!--<span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场一级类别"
                prop="marketFirstName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场二级类别"
                prop="marketSecondName"
                show-overflow-tooltip

              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同号"
                prop="createTime"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="所属单位"
                prop="companyBelongName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="境/内外"
                prop="state"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.country=='01'?'境内':'境外'}}
                </template>
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同额"
                prop="contractMoney"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="剩余合同额"
                prop="htquantity"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本月运营维管产值"
                prop="monthCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本年运营维管产值"
                prop="yearCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他">
          <div style="margin-top: 10px">
            <el-table
              default-expand-all
              row-key="uuid"
              :tree-props="{children: 'chirldList', hasChildren: 'hasChildren'}"
              class="tableStyle"
              :max-height="$tableHeight"
              :height="$tableHeight"
              :data="tableData.qt_list"
              :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
              @row-dblclick="rowshow"
              @selection-change="handleSelectionChange"
              border
              highlight-current-row
              ref="table"
              tooltip-effect="dark"
            >
              <!-- <el-table-column
                :width="50"
                align="center"
                show-overflow-tooltip
                type="selection"
              ></el-table-column> -->
              <el-table-column
                :width="70"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>
              <el-table-column
                :width="500"
                label="项目名称"
                prop="projectName"
                show-overflow-tooltip
              >
                <!--<template slot-scope="scope">-->
                <!--<span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场一级类别"
                prop="marketFirstName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="200"
                align="center"
                label="新兴市场二级类别"
                prop="marketSecondName"
                show-overflow-tooltip

              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同号"
                prop="createTime"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="所属单位"
                prop="companyBelongName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="境/内外"
                prop="state"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{scope.row.country=='01'?'境内':'境外'}}
                </template>
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="合同额"
                prop="contractMoney"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="剩余合同额"
                prop="htquantity"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本月其他产值"
                prop="monthCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :width="180"
                align="center"
                label="本年其他产值"
                prop="yearCzSum"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--<el-pagination-->
      <!--:current-page="page.current"-->
      <!--:page-size="page.size"-->
      <!--:page-sizes="[20, 50, 100]"-->
      <!--:total="page.total"-->
      <!--@current-change="handleCurrentChange"-->
      <!--@size-change="handleSizeChange"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
    <!--&gt;</el-pagination>-->
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  export default {
    // inject:['reload'],
    components: {
      Tree
    },
    data() {
      return {
        treeStatas: false,
        page: {current: 1, size: 20, total: 0, records: []},
        searchform: {
          current: 1,
          size: 20,
          gyType:"",
          reportDate:'',
          projectName:'',
          projectLocation:'',
          projectTypeFirstId:'',
          projectTypeSecondId:''
        },
        tableData:{},
        multipleSelection: [],
        xqprojectType:[],//工程二级列表
        projectStatus:[
          {
            detailName:"草稿",
            id:'edit'
          },
          {
            detailName:"审核中",
            id:'check'
          },
          {
            detailName:"审核通过",
            id:'pass'
          },
        ],//项目状态列表
        industrial:"工业制造",
        gyTypeShow:true
      };
    },
    mounted() {
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    },
    computed: {
      projectDomainType() {
        // console.log(this.$store.state.category["projectDomainType"])
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
      }
    },
    methods: {
      //获取项目地点的值
      getPositionTree(data) {
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
      //工程类别二级
      getTwo(id) {
        this.searchform.enginTypeSecondId='';
        this.xqprojectType =[];
        if(id!=''){
          this.projectDomainType.find(
            (item) => {
            if (item.id == id) {
            this.xqprojectType = item.children;
          }
        }
        )
        }
      },
      exportdata() {
      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "look", instid: row.topOrgId};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
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
        // this.$refs["searchform"].resetFields();
        this.searchform={
          current: 1,
          size: 20,
          gyType:"",
          reportDate:'',
          projectName:'',
          projectLocation:'',
          projectTypeFirstId:'',
          projectTypeSecondId:''
        };
        this.setDate();
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询
      getData() {
        if(this.searchform.reportDate!=null&&this.searchform.reportDate!=''){
          this.$http
            .post(
              "/api/statistics/unProjectReport/xxsc/list",
              this.searchform
            )
            .then((res)=>{
                this.tableData = res.data.data;
            });
        }else{
          this.$message.error("填报年月不能为空");
        }
      },
      //获取当前月份
      setDate(){
        var sj=new Date().toLocaleDateString().split('/');
        sj[1]=sj[1]<10?'0'+sj[1]:sj[1];
        this.searchform.reportDate=sj[0]+"-"+sj[1];
      },
      // 修改的功能 **************************************************************************************************************************************
      // 监听填报方式
      gyTypeChange() {
        if (this.searchform.gyType == 1) {
          this.industrial = "工业制造项目"
        } else {
          this.industrial = "工业制造"
        }
      },
      // 标签改变方法
      tabChange(val) {
        console.info(val.label)
        if (val.label == "工业制造" || val.label == "工业制造项目") {
          this.gyTypeShow = true
        } else {
          this.gyTypeShow = false
        }
      }
    },
    created() {
      this.setDate();
      this.getData();
    },
  };
</script>
<style scoped>
  .queryForm>.el-button{
    margin-top: 5px;
  }
  >>>.el-form-item__label{
    width: auto;
  }
  >>>.el-input--mini .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  .el-table__row {
    cursor: pointer;
  }
</style>
