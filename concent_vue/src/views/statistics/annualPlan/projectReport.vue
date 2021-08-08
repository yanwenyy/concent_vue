<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-form class="search-form" :inline="true" :model="searchform" @keyup.enter.native="init()">
        <el-form-item label="填报年月:">
          <el-date-picker
            v-model="searchform.reportDate"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button-group style="float: left">
        <!--<el-button @click="add" plain type="primary"><i class="el-icon-plus"></i>新增</el-button>-->
        <el-button @click="totop" plain type="primary"><i class="el-icon-edit"></i>自揽项目批量填写0计划</el-button>
        <el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        <!-- <el-button @click="Importdata" type="primary" plain>导入</el-button> -->
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
        :data="[{}]"
        :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        tooltip-effect="dark"
        lazy
        :load="load"
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
          :width="200"
          align="center"
          label="计划日期"
          prop="reportDate"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="500"
          label="填报单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <!--<template slot-scope="scope">-->
            <!--<span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>-->
          <!--</template>-->
        </el-table-column>

        <el-table-column
          :width="200"
          align="center"
          label="项目状态"
          prop="stauts"
          show-overflow-tooltip

        >
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="工程合同额"
          prop="stauts"
          show-overflow-tooltip

        >
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="剩余额"
          prop="stauts"
          show-overflow-tooltip

        >
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="本年计划"
          prop="stauts"
          show-overflow-tooltip

        >
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="填报类型"
          prop="stauts"
          show-overflow-tooltip

        >
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="状态"
          prop="stauts"
          show-overflow-tooltip

        >
        </el-table-column>

        <el-table-column
          :width="180"
          align="center"
          label="审核通过时间"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.createTime | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="操作"
          prop="stauts"
          show-overflow-tooltip
          fixed="right"
        >
          <template slot-scope="scope">
            <el-link type="warning" @click="toSummary(scope.row)">详细显示</el-link>
            <el-link type="success" @click="rowshow(scope.row)">查看</el-link>
            <el-link type="primary" @click="totop(scope.row)">修改</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    // inject:['reload'],
    name: "proposal-list-look",
    data() {
      return {
        Authorization:sessionStorage.getItem("token"),
        page: {current: 1, size: 20, total: 0, records: []},
        tableData: [],
        showinput: false,
        sousuo: "",
        searchform: {
          reportDate:'',
          createOrgName: "",
          stauts: "",
          createTime: "",
          auditDate: "",
        },
        menus: [],
        multipleSelection: [],
        orgTree: [],
        xqprojectType:[],//工程二级列表
        flowStatusList:[
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
          {
            detailName:"审核驳回",
            id:'reject'
          }
        ]
      };
    },
    computed: {

    },
    methods: {
      load(tree, treeNode, resolve) {
        setTimeout(() => {
          this.$http
          .post(
            "/api/statistics/unProjectReport/list/checkEntInfo",
            JSON.stringify(tree),
            {useJson: true}
          )
          .then((res) => {
            var datas=res.data.data.list
            resolve(datas)
          });

        }, 1000)
      },
      exportdata() {
      },
      search() {
        this.showinput = false;
      },
      // 增加
      add() {
        this.$http
          .post(
            "/api/statistics/unProjectReport/detail/save",
            JSON.stringify({'reportDate':this.searchform.reportDate}),
            {useJson: true,isLoading:false}
          )
          .then((res) => {
            var datas=res.data.data;
            if(datas.isExist=="0"){
              this.$message.info("该填报年下已有相应的该月份的月报数据 无法创建新的填报记录");
            }else{
              let p = {actpoint: "add",reportDate: this.searchform.reportDate,statId:datas.uuid};
              this.$router.push({
                path: "./detail/",
                query: {p: this.$utils.encrypt(JSON.stringify(p))},
              });
            }
        });

      },
      // 修改
      totop(row) {
        let p = {actpoint: "edit", row: row};
        this.$router.push({
          path: "./projectReportDetail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      //去汇总详情
      toSummary(row){
        let p = {actpoint: "edit", row: row};
        this.$router.push({
          path: "./summaryDetail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "look", row: row};
        this.$router.push({
          path: "./projectReportDetail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      // 删除
      remove() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let uuids = [],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          uuids.push(item.uuid);
        //   if(item.stauts==1||item.stauts==4){
        //   uuids.push(item.uuid);
        // }else{
        //   this.$message.info("当前所选数据中包含不可删除的选项,请检查后进行操作");
        //   return itemStatus=false;
        // }
      })

        if(itemStatus){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
              "/api/statistics/unProjectReport/list/delete",{ids: uuids}

            )
            .then((res) => {
            if (res.data && res.data.code == 200) {
            this.getData()
            } else {
              this.$message.error(data.message)
            }

        });
        }).catch(() => {})
        }

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
        // this.searchform.inforName = "";
        // this.searchform.enginTypeFirstId = "";
        // this.searchform.constructionOrg = "";
        // this.searchform.noticeTypeId = "";
        this.searchform={
          current: 1,
          size: 20
        };
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询
      getData() {
        if(this.searchform.importFileRecordName!=''){
          if(this.searchform.importFileRecordName=='是'){
            this.searchform.importFileRecordId='1';
          }else if(this.searchform.importFileRecordName=='否'){
            this.searchform.importFileRecordId='0';
          }
        }
        this.$http
          .post(
            "/api/statistics/unProjectReport/list/loadPageData",
            this.searchform
          )
          .then((res) => {
          this.tableData = res.data.data;
      });
      },
    },
    created() {
      //获取当前月份
      var sj=new Date().toLocaleDateString().split('/');
      this.searchform.reportDate=sj[0];
      // this.getData();
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
