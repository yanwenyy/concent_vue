<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-form class="search-form" :inline="true" :model="searchform" @keyup.enter.native="init()">
      </el-form>
      <el-button-group style="float: left">
        <el-button @click="add" plain type="primary"><i class="el-icon-plus"></i>创建</el-button>
        <el-button @click="totop" plain type="primary"><i class="el-icon-edit"></i>修改</el-button>
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
          :width="500"
          label="填报单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>填报单位</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.createOrgName"
                size="mini"
              />
            </div>
          </template>

        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="年份"
          prop="reportYear"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>年份</span>
            <div>
              <el-date-picker
                v-model="searchform.year"
                value-format="yyyy"
                type="year"

                placeholder="选择年"
                size="mini"
                style="width: 60%">
              </el-date-picker>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="审核状态"
          prop="flowStatus"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>审核状态</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.stauts"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in flowStatusList"
                ></el-option>
              </el-select>
            </div>
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
          createOrgName: "",
          stauts: "",
          createTime: "",
          auditDate: "",
          year:"",
          year:{}
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
      exportdata() {
      },
      search() {
        this.showinput = false;
      },
      // 增加
      add() {
        let p = {actpoint: "add"};
        this.$router.push({
          path: "./detail2/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      // 修改
      totop() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        if(this.multipleSelection[0].flowStatus=='edit'||this.multipleSelection[0].flowStatus=='reject'){
          this.$message.info("此条数据不可修改！");
          return false;
        }
        let p = {actpoint: "edit", instid: this.multipleSelection[0].topOrgId};
        this.$router.push({
          path: "./detail2/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "look", instid: row.topOrgId};
        this.$router.push({
          path: "./detail2/",
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
          if(item.flowStatus=='notpass'||item.flowStatus=='check'){
          uuids.push(item.topOrgId);
        }else{
          this.$message.info("当前所选数据中包含不可删除的选项,请检查后进行操作");
          return itemStatus=false;
        }
      })

        if(itemStatus){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
              "/api/contract/topInfo/TopInfor/list/delete",{ids: uuids}

            )
            .then((res) => {
            this.getData()
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
          path: "../detail2/",
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
            "/api/statistics/Year/detail/findByYear",
            this.searchform
          )
          .then((res) => {
          this.tableData = res.data.data;
      });
      },
    },
    created() {
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
  >>>.el-icon-date,>>>.el-icon-arrow-up{
    line-height: 30px;
  }
</style>
