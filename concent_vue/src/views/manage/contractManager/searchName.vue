<template>
  <el-dialog
    :visible.sync="visible"
    :append-to-body="true">
    <div v-if="contractType=='1'">
      <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="init()">
        <el-form-item label="项目名称:">
          <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="init()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        highlight-current-row
        @current-change="rowSel"
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
          prop="inforName"
          show-overflow-tooltip
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="enginTypeSecondName"
          header-align="center"
          align="center"
          label="工程行业类别">
        </el-table-column>
        <el-table-column
          prop="constructionOrg"
          header-align="center"
          align="center"
          label="建设单位">
        </el-table-column>
        <el-table-column
          prop="noticeTypeName"
          header-align="center"
          align="center"
          label="建设单位">
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
    <div v-if="contractType=='2'">
      <el-form  class="queryForm" :inline="true" :model="searchform2" @keyup.enter.native="init()">
        <el-form-item label="合同名称:">
          <el-input v-model="searchform2.contractName" placeholder="合同名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="init()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        highlight-current-row
        @current-change="rowSel"
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
          prop="contractNo"
          header-align="center"
          align="center"
          label="合同号">
        </el-table-column>
        <el-table-column
          prop="constructionOrg"
          header-align="center"
          align="center"
          label="填报单位">
        </el-table-column>
        <el-table-column
          prop="noticeTypeName"
          header-align="center"
          align="center"
          label="录入时间">
        </el-table-column>
        <el-table-column
          prop="noticeTypeName"
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
          inforName: '',
        },
        searchform2: {
          contractName:'',
          changeStatus:'0',
          contractType:'1',
          current: 1,
          size: 20,
        },
        contractType:'',
        dataList: [],
        pageIndex: 1,
        pagesize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        currentRow: ''
      }
    },
    mounted() {

    },
    methods: {
      //选中数据
      sub() {
        this.visible = false;
        var data={
          data:this.currentRow,
          type:this.contractType
        };
        this.$emit('refreshDataList', data)
      },
      // 初始化
      init(id,type) {
        this.visible = true;
        this.searchform.moduleId=id;
        this.searchform2.moduleId=id;
        this.contractType=type;
        var url='',_data={};
        if(this.contractType=='1'){
          url="/api/contract/topInfo/TopInfor/list/loadPageDataForContract";
          _data=this.searchform;
        }else{
          url="/api/contract/contract/ContractInfo/list/loadPageData";
          _data=this.searchform2;
        }
        this.$http
          .post(
            url,
            _data,
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
        this.searchform2.size = val;
        this.init(this.searchform.moduleId,this.contractType);
      },
      handleCurrentChange(val) {
        this.searchform.current = val;
        this.searchform2.current = val;
        this.init(this.searchform.moduleId,this.contractType);
      },
      searchFromSubmit() {
        this.searchform.current = 1;
        this.searchform2.current =  1;
        this.init(this.searchform.moduleId,this.contractType);
      },
      rowSel(val){
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
