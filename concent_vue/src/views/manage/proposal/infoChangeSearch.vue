<template>
  <el-dialog
    :visible.sync="visible"
    :append-to-body="true" @close="reset()">
    <div>
      <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="init()">
        <el-form-item label="项目名称:">
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
            placeholder="请选择"

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
        <el-form-item>
          <el-button @click="init()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :max-height="$dialogTableHeight"
        :height="$dialogTableHeight"
        :data="dataList"
        border
        v-loading="dataListLoading"
        highlight-current-row
        @current-change="handleCurrentChange2"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        style="width: 100%;"
        height="400">

        <el-table-column label="" width="40">
        <template slot-scope="scope">
          <el-radio
            :label="scope.row.topOrgId"
            v-model="radioRow"
            @change="getCurrentRow(scope.row)"
            style="color: #fff;"
          >{{""}}</el-radio>
        </template>
        </el-table-column>
        <el-table-column
          type="index"
          header-align="center"
          align="center"
          width="80"
          label="ID">
        </el-table-column>
        <el-table-column
          :width="350"
          prop="inforName"
          show-overflow-tooltip
          label="项目名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="enginTypeFirstName"
          header-align="center"
          align="center"
          label="工程类别(一级)"
          :width="130"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="enginTypeSecondName"
          header-align="center"
          align="center"
          label="工程类别(二级)"
          :width="130"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="constructionOrg"
          header-align="center"
          align="center"
          label="建设单位"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="noticeTypeName"
          header-align="center"
          align="center"
          label="公告类型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="planBidTime"
          header-align="center"
          align="center"
          label="截止日期"
          show-overflow-tooltip>
          <template slot-scope="scope">{{
            scope.row.planBidTime | dateformat
            }}</template>
        </el-table-column>
        <!--<el-table-column-->
        <!--fixed="right"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--width="150"-->
        <!--label="操作">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button v-if="isAuth('biz:outcar:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>-->
        <!--<el-button v-if="isAuth('biz:outcar:delete')" type="text" size="small" @click="deleteHandle(scope.row.carNum)">删除</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
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
      <el-button @click="visible = false,reset()">取消</el-button>
      <el-button type="primary" @click="sub()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        radioRow:null,
        page: { current: 1, size: 20, total: 0, records: [] },
        visible: false,
        searchform: {
          inforName: '',
          enginTypeFirstId: '',
          enginTypeSecondId: '',
          current: 1,
          size: 20,
          flowStatus:'pass'
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
    computed: {
      projectDomainType() {
        return this.$store.state.category.projectDomainType;
      },
    },
    mounted() {
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    },
    methods: {
      reset(){
        this.searchform={
          inforName: '',
            enginTypeFirstId: '',
            enginTypeSecondId: '',
            current: 1,
            size: 20,
            flowStatus:'pass'
        }
        this.radioRow = null
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
      //选中数据
      sub() {
        this.visible = false;
        this.radioRow = null
        this.$emit('refreshDataList', this.currentRow)
      },
      // 初始化
      init() {
        this.visible = true;
        console.log(this.searchform)
        this.$http
          .post(
            "/api/contract/topInfo/TopInfor/list/loadPageDataForReg",
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
        this.searchform.size = val;
        this.init();
      },
      handleCurrentChange(val) {
        this.searchform.current = val;
        this.init();
      },
      // 单选
      handleCurrentChange2(val) {
        this.currentRow = val;
        this.radioRow = val.topOrgId
      },
      // 单选框
      getCurrentRow(row) { // 这个 row == 上面的val
        this.currentRow = row;
        this.radioRow = row.topOrgId
      },
      searchFromSubmit() {
        this.searchform.current = 1;
        this.init();
      },
    }
  }
</script>
<style scoped>
  >>>.el-dialog__header{
    padding: 0 20px;
  }
  .dialog-footer {
    margin-top: 10px;
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
  .el-radio__label {
    font-size: 14px;
    padding-left: 130px;
  }

  >>>.el-cascader-node>.el-radio, .el-radio:last-child {
    margin-right: 0;
    margin-left: 3px;
  }
</style>
