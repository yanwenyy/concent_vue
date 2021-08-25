<template>
  <div>
    <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
      <el-form-item label="区指挥部名称:">
        <el-input v-model="searchform.orgFullName" placeholder="区指挥部名称" clearable></el-input>
      </el-form-item>
      <el-button @click="add" plain type="primary"><i class="el-icon-plus"></i>新增</el-button>
      <el-button @click="totop" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
      <el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
      <el-button @click="searchformReset" type="info" plain style="color:black;background:none;float:right; margin-right:20px;"><i class="el-icon-refresh-right"></i>重置</el-button>
      <el-button @click="getData" type="primary" plain style="float:right;margin-right:5px;"><i class="el-icon-search"></i>查询</el-button>
      <!--<el-button @click="exportdata" type="primary" plain><i class="el-icon-top"></i>导出</el-button>-->
    </el-form>
    <div style="margin-top: 10px">
      <el-table
        :data="page.records"
        :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
        align="center"
        border
        class="detailTable"
        ref="table"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :width="50"
          align="center"
          show-overflow-tooltip
          type="selection"
        ></el-table-column>
        <el-table-column
          :width="80"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          label="指挥部名称"
          align="center"
          prop="orgName"
        >
        </el-table-column>

        <el-table-column
          :resizable="false"
          label="管辖省市"
          prop="governingProvinceName"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="指挥长"
        >
          <el-table-column
            :resizable="false"
            label="姓名"
            prop="principalName"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="电话"
            prop="principalContactNumber"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="级别"
            prop="principalGrade"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="省市负责人"
        >
          <el-table-column
            :resizable="false"
            label="姓名"
            prop="provinceName"
            align="center"
            show-overflow-tooltip
          >
            <!--<template slot-scope="scope">-->
              <!--<el-input-->
                <!--clearable-->
                <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                <!--v-model="scope.row.provinceName"-->
              <!--&gt;</el-input>-->
            <!--</template>-->
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="级别"
            prop="provinceGrade"
            align="center"
            show-overflow-tooltip
          >
            <!--<template slot-scope="scope">-->
              <!--<el-input-->
                <!--clearable-->
                <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                <!--v-model="scope.row.provinceGrade"-->
              <!--&gt;</el-input>-->
            <!--</template>-->
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="电话"
            prop="provinceContactNumber"
            align="center"
            show-overflow-tooltip
          >
            <!--<template slot-scope="scope">-->
              <!--<el-input-->
                <!--clearable-->
                <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
                <!--v-model="scope.row.provinceContactNumber"-->
              <!--&gt;</el-input>-->
            <!--</template>-->
          </el-table-column>
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
          orgFullName: "",
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
      // 删除
      remove() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择一条记录进行删除操作！");
          return false;
        }
        let uuids = [],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          uuids.push(item.uuid);
        })
        if(itemStatus){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                "/api/contract/regionalInfo/list/delete",
                {ids: uuids}
              )
              .then((res) => {
                this.getData()
              });
          }).catch(() => {})
        }

      },
      // 修改
      totop() {
        if (this.multipleSelection.length != 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let p = {actpoint: "eidt", msg: this.multipleSelection[0]};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

      },
      add(){
        let p = {actpoint: "add"};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      exportdata() {
      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "look", msg: row};
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
          orgFullName: "",
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
            "/api/contract/regionalInfo/list/loadPageDataOrgCode",
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
