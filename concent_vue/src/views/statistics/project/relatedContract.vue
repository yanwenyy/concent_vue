<template>
  <el-dialog
    :visible.sync="visible"
    :append-to-body="true"
    style="margin-top: -7vh;"
    >
    <div>
      <!--<el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="init()">-->
        <!--<el-form-item label="项目名称:">-->
          <!--<el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item-->
          <!--label="工程类别(一级):"-->
        <!--&gt;-->
          <!--<el-select-->
            <!--clearable-->
            <!--filterable-->
            <!--placeholder="请选择"-->
            <!--@change="getTwo"-->
            <!-- -->
            <!--v-model="searchform.enginTypeFirstId"-->
          <!--&gt;-->
            <!--<el-option-->
              <!--:key="index"-->
              <!--:label="item.detailName"-->
              <!--:value="item.id"-->
              <!--v-for="(item, index) in projectDomainType"-->
            <!--&gt;</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item-->
          <!--label="工程类别(二级):"-->
        <!--&gt;-->
          <!--<el-select-->
            <!--clearable-->
            <!--filterable-->
            <!--placeholder="请选择"-->
            <!-- -->
            <!--v-model="searchform.enginTypeSecondId"-->
          <!--&gt;-->
            <!--<el-option-->
              <!--:key="index"-->
              <!--:label="item.detailName"-->
              <!--:value="item.id"-->
              <!--v-for="(item, index) in xqprojectType"-->
            <!--&gt;</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button @click="init()">查询</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <el-table
        :max-height="$tableHeight-180"
        :height="$tableHeight-180"
        :data="dataList"
        border
        v-loading="dataListLoading"
        highlight-current-row
        @current-change="handleCurrentChange"
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
          label="ID">
        </el-table-column>
        <el-table-column
          :width="500"
          prop="contractName"
          show-overflow-tooltip
          label="合同名称">
        </el-table-column>
        <el-table-column
          prop="contractCode"
          header-align="center"
          align="center"
          label="合同号">
        </el-table-column>
        <el-table-column
          prop="contractAmount"
          header-align="center"
          align="center"
          label="合同金额">
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
        style="margin-top: 5px"
        v-if="page.total !== 0"
      ></el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="sub()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        page: { current: 1, size: 20, total: 0, records: [] },
        visible: false,
        searchform: {
          current: 1,
          size: 20
        },
        xqprojectType:[],
        dataList: [],
        pageIndex: 1,
        pagesize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        currentRow: ''
      }
    },
    // computed: {
    //   projectDomainType() {
    //     return this.$store.state.category.projectDomainType;
    //   },
    // },
    mounted() {
      // this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    },
    methods: {
      //选中数据
      sub() {
        this.visible = false;
        this.$emit('getPosition', this.currentRow)
      },
      // 初始化
      init(id) {
        this.visible = true;
        this.searchform.moduleId=id;
        this.$http
          .post(
            "/api/statistics/StatisticsProject/list/findProjectContract",
            this.searchform,
            {isLoading: false}
          )
          .then((res) => {
              var datas = res.data.data;
            if (res.data && res.data.code === 200) {
              this.dataList = datas.records;
              this.page = datas
            } else {
              this.dataList = []
            }
            this.dataListLoading = false
      });
      },
      handleSizeChange(val) {
        this.searchFrom.size = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.searchFrom.current = val;
        this.getData();
      },
      searchFromSubmit() {
        this.searchFrom.current = 1;
        this.getData();
      },
      // 单选
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>
<style scoped>
  .dialog-footer {
    margin-top: 50px;
    text-align: center;
  }

  >>>.el-dialog {
    width: 80%;
  }

  >>>.el-form-item__label {
    width: auto;
  }

  .inline-block {
    display: inline-block;
  }

  .dr-notice-warn {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background: #FFE5E0;
    color: red;
  }

  .dr-notice-body {
    padding: 10px;
  }

  .dr-notice-body > div {
    margin-bottom: 20px;
  }

  .sumWeigh {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  >>>.el-input--mini .el-input__inner {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
  }
</style>
