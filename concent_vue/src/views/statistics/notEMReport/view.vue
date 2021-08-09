<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-form class="search-form" :inline="true" :model="searchform" @keyup.enter.native="init()">
        <el-form-item label="填报年月:">
          <el-date-picker
            v-model="searchform.reportDate"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div style="float: right">
        <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
      </div>
    </div>

    <div style="margin-top: 10px">
      <el-table
        default-expand-all
        row-key="uuid"
        :tree-props="{children: 'chirldList', hasChildren: 'hasChildren'}"
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="tableData"
        :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
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
          :width="150"
          label="年份"
          prop="1"
          show-overflow-tooltip
          sortable
        ></el-table-column>
        <el-table-column
          :width="100"
          label="月份"
          prop="2"
          show-overflow-tooltip
          sortable
        ></el-table-column>
        <el-table-column
          :width="400"
          label="填报单位"
          prop="3"
          show-overflow-tooltip
          sortable
        ></el-table-column>
        <el-table-column
          label="审核状态"
          prop="3"
          show-overflow-tooltip
          sortable
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="3"
          show-overflow-tooltip
          sortable
        ></el-table-column>
        <el-table-column
          label="审核通过时间"
          prop="3"
          show-overflow-tooltip
          sortable
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "proposal-list-view",
    data() {
      return {
        page: {current: 1, size: 20, total: 0, records: []},
        tableData: [],
        searchform: {
          reportDate:'',
        },
      };
    },
    computed: {

    },
    methods: {
      // 双击列表 查看
      rowshow(row) {
        console.log(row)
        let p = {
          'stauts':row.stauts,
          'gyType': this.userdata.managerOrgList[0].principalCode||'2',
          actpoint: "look", 
          statId: row.uuid,
          reportDate: row.reportDate,
          stauts:row.stauts,
          createOrgCode:row.createOrgCode
        };
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      // 列表选项数据
      handleSelectionChange(val) {
        console.log(val)
      },
      // 查询数据
      getData(){

      },

    },
    created() {
      //获取当前月份
      var sj=new Date().toLocaleDateString().split('/');
      sj[1]=sj[1]<10?'0'+sj[1]:sj[1];
      this.searchform.reportDate=sj[0]+"-"+sj[1];
      this.getData();
    },
  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
  .add-group .new-add-btn{
    border-radius: 0;
  }
  .search-form{
    display: inline-block;
    float: left;
  }
  .search-form >>>.el-form-item{
    margin-bottom: 0;
  }
  .search-form >>>.el-form-item__content,.search-form >>>.el-form-item__label{
    line-height: 30px;
  }
  .search-form{
    display: inline-block;
    float: left;
  }
  >>>.search-form .el-form-item__label{
    width:auto;
  }
  >>>.search-form .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  >>>.el-icon-date{
    line-height: 30px;
  }
</style>
