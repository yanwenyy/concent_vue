<template>
  <el-dialog
    :visible.sync="visible"
    :append-to-body="true">
    <div>
      <el-form :inline="true" :model="searchform" @keyup.enter.native="init()" class="queryForm">
        <el-form-item label="合同名称:">
          <el-input v-model="searchform.contractName" placeholder="项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="合同编号:">
          <el-input v-model="searchform.contractCode" placeholder="项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="合同类型:"
        >
          <el-select
            clearable
            filterable
            placeholder="请选择"

            v-model="searchform.moduleId"
          >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in projectPlate"
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
          prop="moduleName"
          show-overflow-tooltip
          label="合同板块">
        </el-table-column>
        <el-table-column
          prop="contractName"
          header-align="center"
          align="center"
          label="合同名称">
        </el-table-column>
        <el-table-column
          prop="contractCode"
          header-align="center"
          align="center"
          label="合同号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          header-align="center"
          align="center"
          label="审核通过时间">
          <template slot-scope="scope">{{
            scope.row.createTime | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          prop="createOrgName"
          header-align="center"
          align="center"
          label="填报单位">
        </el-table-column>
        <el-table-column
          prop="createUserName"
          header-align="center"
          align="center"
          label="填报人">
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[20, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange2"
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
          contractName: '',
          contractCode: '',
          moduleId: '',
          changeStatus:'0',
          current: 1,
          size: 20,
          flowStatus:'pass',
        },
        lxList:[
          {
            id:'0',
            detailName:'工程承包'
          },
          {
            id:'1',
            detailName:'勘察设计'
          },
          {
            id:'2',
            detailName:'物资贸易'
          },
          {
            id:'3',
            detailName:'工业制造'
          },
          {
            id:'4',
            detailName:'金融保险'
          },
          {
            id:'5',
            detailName:'其他合同'
          },
          {
            id:'6',
            detailName:'房地产'
          },
          {
            id:'7',
            detailName:'运营维护'
          },
        ],
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
      projectPlate(){
        return this.$store.state.projectPlate;
      },
    },
    mounted() {
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    },
    methods: {
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
        this.$emit('refreshDataList', this.currentRow)
      },
      // 初始化
      init() {
        this.visible = true;
        this.$http
          .post(
            "/api/contract/contractInfoCut/list/loadToCutData",
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
      // 每页数
      handleSizeChange(val) {
        this.searchform.size = val;
        this.init();
      },
      handleCurrentChange2(val) {
        this.searchform.current = val;
        this.init();
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
    margin-top:10px;
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
