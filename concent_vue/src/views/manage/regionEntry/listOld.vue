<template>
  <div>
    <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
      <el-form-item label="区指挥部名称:">
        <el-input v-model="searchform.orgName" placeholder="区指挥部名称" clearable></el-input>
      </el-form-item>
      <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
      <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
      <el-button @click="back" class="detailbutton detail-back-tab" >返回</el-button>
      <el-button type="primary" @click="add" class="detailbutton detail-back-tab save-btn">确定</el-button>
    </el-form>
    <div style="margin-top: 10px">
      <el-table
        class=""
        :data="page.records"
        :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        tooltip-effect="dark"
        :max-height="$tableHeight+300"
        :height="$tableHeight+300"
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
          :width="500"
          label="区域指挥部名称"
          prop="orgName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="指挥长"
          prop="principalName"
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
  </div>
</template>

<script>
  export default {
    // inject:['reload'],
    components: {

    },
    data() {
      return {
        treeStatas: false,
        page: {current: 1, size: 20, total: 0, records: []},
        searchform: {
          current: 1,
          size: 20,
          orgName: "",
        },
        multipleSelection: [],
      };
    },
    mounted() {
      this.getData()
    },
    computed: {

    },
    methods: {
      add(){
        if(this.multipleSelection.length!=1){
          this.$message.error("请选择一条数据");
          return false;
        }
        // let p = {actpoint: "addZhb", msg: this.multipleSelection[0]};
        // this.$router.push({
        //   path: "../detail/",
        //   query: {p: this.$utils.encrypt(JSON.stringify(p))},
        // });
        this.$http
          .post(
            '/api/contract/regionalInfo/list/batchSave',
            JSON.stringify(this.multipleSelection[0]),
            {useJson: true}
          )
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message:  `保存成功`,
                type: "success",
              });
              this.back();
            }else{
              this.$message.error(res.data.msg)
            }
          });
      },
      back(){
        this.$router.back();
      },
      exportdata() {
      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "edit", orgCode: row.orgCode};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
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
        // this.$refs["searchform"].resetFields();
        this.searchform={
          current: 1,
          size: 20,
          orgName: "",
        }
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询
      getData() {
        this.$http
          .post(
            "/api/contract/regionalInfo/list/loadPageDataSysOrg",
            this.searchform
          )
          .then((res)=>{
            this.page = res.data.data;
      });
      },

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
