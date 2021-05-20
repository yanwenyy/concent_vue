<template>
  <div>
    <el-tabs class="houseTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="新签" name="first">
        <div style="width: 100%; overflow: hidden">
          <el-button-group style="float: left">
            <el-popover
              class="detail-back-tab add-group"
              placement="bottom-start"
              width="auto"
              popper-class="new-add-group"
              trigger="click">
              <div>
                <div class="add-li" @click="add()">新签合同</div>
                <div class="add-li" @click="add('bq')">新签补充合同</div>
              </div>
              <!--<el-button class="add-group-btn" @click="add()" type="primary" plain >新签合同</el-button>-->
              <!--<br>-->
              <!--<el-button class="add-group-btn" @click="add('bq')" type="primary" plain >新签补充合同</el-button>-->
              <el-button class="new-add-btn" slot="reference"  type="primary" plain ><i class="el-icon-plus"></i>新增</el-button>
            </el-popover>
            <el-button @click="totop" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
            <el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
            <el-button @click="report" type="primary" plain><i class="el-icon-delete"></i>填报销售业绩</el-button>
          </el-button-group>
          <div style="float: right;">
            <el-button @click="searchFromReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
            <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
            <el-button type="primary" plain><i class="el-icon-upload2"></i>导出</el-button>
          </div>
        </div>
        <div style="margin-top: 10px">
          <el-table
            class="tableStyle"
            :max-height="$tableHeight"
            :height="$tableHeight"
            :data="page.records"
            :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
            @row-click="rowshow"
            @selection-change="handleSelectionChange"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
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
            <!--<el-table-column-->
            <!--:width="500"-->
            <!--label="项目名称"-->
            <!--prop="inforName"-->
            <!--show-overflow-tooltip-->
            <!--&gt;-->
            <!--<template slot="header" slot-scope="scope">-->
            <!--<span>项目名称</span>-->
            <!--<div>-->
            <!--<el-input-->
            <!--class="list-search-picker"-->
            <!--style=" width: 100%"-->
            <!--v-model="searchFrom.inforName"-->
            <!--size="mini"-->
            <!--/>-->
            <!--</div>-->
            <!--</template>-->
            <!--<template slot-scope="scope">-->
            <!--<span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              :width="150"
              label="合同名称"
              prop="contractName"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>合同名称</span>
                <div>
                  <el-input
                    class="list-search-picker"
                    style=" width: 100%"
                    v-model="searchFrom.contractName"
                    size="mini"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.contractName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="合同号"
              prop="contractCode"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>合同号</span>
                <div>
                  <el-input
                    class="list-search-picker"
                    style=" width: 100%"
                    v-model="searchFrom.contractCode"
                    size="mini"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
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
                    v-model="searchFrom.createOrgName"
                    size="mini"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="合同总金额"
              prop="contractAmount"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>合同总金额</span>
                <div>
                  <el-input
                    class="list-search-picker"
                    style=" width: 100%"
                    v-model="searchFrom.contractAmount"
                    size="mini"
                  />
                </div>
              </template>
            </el-table-column>

            <el-table-column
              :width="150"
              align="center"
              label="填报人"
              prop="createUserName"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>填报人</span>
                <div>
                  <el-input
                    class="list-search-picker"
                    style=" width: 100%"
                    v-model="searchFrom.createUserName"
                    size="mini"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="录入时间"
              prop="createTime"
              show-overflow-tooltip
            >
              <!-- <template slot-scope="scope">{{
                scope.row.createtime | dateformat
              }}</template> -->
              <template slot="header" slot-scope="scope">
                <span>录入时间</span>
                <div>
                  <el-date-picker
                    class="list-search-picker"
                    filterable
                    clearable
                    type="date"
                    value-format="timestamp"
                    v-model="searchFrom.createTime"

                  >
                  </el-date-picker>
                </div>
              </template>
              <template slot-scope="scope">{{
                scope.row.createTime | dateformat
                }}</template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="状态"
              prop="flowStatus"
              show-overflow-tooltip
            >
              <!-- <template slot-scope="scope">{{
                scope.row.state === '0' ? '草稿' : '已上报'
              }}</template> -->
              <template slot="header" slot-scope="scope">
                <span>状态</span>
                <div>
                  <el-input
                    class="list-search-picker"
                    style=" width: 100%"
                    v-model="searchFrom.flowStatus"
                    size="mini"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                 {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'审核通过':scope.row.flowStatus==4?'审核退回':'待登记'}}
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="版本标识"
              prop="version"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>版本标识</span>
                <div>
                  <el-input
                    class="list-search-picker"
                    style=" width: 100%"
                    v-model="searchFrom.version"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="填报销售业绩" name="second">
        <div style="width: 100%; overflow: hidden">
          <el-button-group style="float: left">
            <el-button @click="totop" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
            <el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
          </el-button-group>
          <div style="float: right;">
            <el-button @click="searchFromReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
            <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
            <el-button type="primary" plain><i class="el-icon-upload2"></i>导出</el-button>
          </div>
        </div>
        <div style="margin-top: 10px">
          <el-table
            class="tableStyle"
            :max-height="$tableHeight"
            :height="$tableHeight"
            :data="page.records"
            :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
            @row-click="rowshow"
            @selection-change="handleSelectionChange"
            border
            highlight-current-row
            ref="table"
            style="width: 100%"
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
            <!--<el-table-column-->
            <!--:width="500"-->
            <!--label="项目名称"-->
            <!--prop="inforName"-->
            <!--show-overflow-tooltip-->
            <!--&gt;-->
            <!--<template slot="header" slot-scope="scope">-->
            <!--<span>项目名称</span>-->
            <!--<div>-->
            <!--<el-input-->
            <!--class="list-search-picker"-->
            <!--style=" width: 100%"-->
            <!--v-model="searchFrom.inforName"-->
            <!--size="mini"-->
            <!--/>-->
            <!--</div>-->
            <!--</template>-->
            <!--<template slot-scope="scope">-->
            <!--<span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              label="合同名称"
              prop="contractName"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>合同名称</span>
                <div>
                  <el-input
                    class="list-search-picker"
                    style=" width: 100%"
                    v-model="searchFrom.contractName"
                    size="mini"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.contractName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="合同号"
              prop="contractCode"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>合同号</span>
                <div>
                  <el-input
                    class="list-search-picker"
                    style=" width: 100%"
                    v-model="searchFrom.contractCode"
                    size="mini"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
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
                    v-model="searchFrom.createOrgName"
                    size="mini"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="合同总金额"
              prop="contractAmount"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>合同总金额</span>
                <div>
                  <el-input
                    class="list-search-picker"
                    style=" width: 100%"
                    v-model="searchFrom.contractAmount"
                    size="mini"
                  />
                </div>
              </template>
            </el-table-column>

            <el-table-column
              :width="150"
              align="center"
              label="填报人"
              prop="createUserName"
              show-overflow-tooltip
            >
              <template slot="header" slot-scope="scope">
                <span>填报人</span>
                <div>
                  <el-input
                    class="list-search-picker"
                    style=" width: 100%"
                    v-model="searchFrom.createUserName"
                    size="mini"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="录入时间"
              prop="createTime"
              show-overflow-tooltip
            >
              <!-- <template slot-scope="scope">{{
                scope.row.createtime | dateformat
              }}</template> -->
              <template slot="header" slot-scope="scope">
                <span>录入时间</span>
                <div>
                  <el-date-picker
                    class="list-search-picker"
                    filterable
                    clearable
                    type="date"
                    value-format="timestamp"
                    v-model="searchFrom.createTime"

                  >
                  </el-date-picker>
                </div>
              </template>
              <template slot-scope="scope">{{
                scope.row.createTime | dateformat
                }}</template>
            </el-table-column>
            <el-table-column
              :width="150"
              align="center"
              label="状态"
              prop="flowStatus"
              show-overflow-tooltip
            >
              <!-- <template slot-scope="scope">{{
                scope.row.state === '0' ? '草稿' : '已上报'
              }}</template> -->
              <template slot="header" slot-scope="scope">
                <span>状态</span>
                <div>
                  <el-input
                    class="list-search-picker"
                    style=" width: 100%"
                    v-model="searchFrom.flowStatus"
                    size="mini"
                  />
                </div>
              </template>
              <template slot-scope="scope">
                 {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'审核通过':scope.row.flowStatus==4?'审核退回':''}}
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>
    </el-tabs>
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
</template>

<script>
export default {
  name: "proposal-list-look",
  data() {
    return {
      activeName:"first",
      page: { current: 1, size: 20, total: 0, records: [] },
      searchFrom: {
        current: 1,
        size: 20,
        changeStatus:'0',
        moduleId:'510ba0d79593418493eb1a11ea4e7af6'
      },
      menus: [],
      multipleSelection: [],
      orgTree: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      this.page= { current: 1, size: 20, total: 0, records: [] };
      this.searchFrom={
        current: 1,
        size: 20,
        changeStatus:'0',
        moduleId:'510ba0d79593418493eb1a11ea4e7af6'
      };
      this.getData();
    },
    // 删除
    remove() {
      if (this.multipleSelection.length < 1) {
        this.$message.info("请选择一条记录进行删除操作！");
        return false;
      }
      let uuids = [],itemStatus=true;
      this.multipleSelection.forEach((item) => {
        if(item.flowStatus==1||item.flowStatus==4){
        uuids.push(item.uuid);
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
          var url=this.activeName=='first'?"/api/contract/contract/ContractInfo/list/delete":"/api/contract/ContractInfoDetail/list/delete";
          this.$http
          .post(
            url,
            {ids: uuids}
          )
          .then((res) => {
          this.getData()
      });
      }).catch(() => {})
      }

    },
    //批量填报
    report(){
      if (this.multipleSelection.length < 1) {
        this.$message.info("请选择一条记录进行填报操作！");
        return false;
      }
      console.log(this.multipleSelection)
      this.$confirm(`确认填报销售业绩吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http
          .post(
            "/api/contract/ContractInfoDetail/detail/save",
            JSON.stringify({contractInfoList: this.multipleSelection}),
            {useJson: true}
          )
          .then((res) => {
            if(res.data.code==200){
              this.$message({
                message:  `填报成功`,
                type: "success",
              });
              this.getData()
            }else{
              this.$message.error(res.data.msg);
            }

          });
      }).catch(() => {})
    },
    // 修改
    totop() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info("请选择一条记录进行查看操作！");
        return false;
      }
      if(this.multipleSelection[0].flowStatus=='2'||this.multipleSelection[0].flowStatus=='3'){
        this.$message.info("此条数据不可修改！");
        return false;
      }
      let p = {actpoint:this.activeName=='first'? "edit":'Yjedit', instid: this.multipleSelection[0].uuid};
      this.$router.push({
        path: "./detail/",
        query: {p: this.$utils.encrypt(JSON.stringify(p))},
      });

    },
    add(type) {
      let p = { actpoint: "add" ,type:type};
      this.$router.push({
        path: "./detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
      });
    },
    // 查看
    rowshow(row) {
      let p = { actpoint: "look", instid: row.uuid };
      this.$router.push({
        path: "./detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
      });
    },
    show() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info("请选择一条记录进行查看操作！");
        return false;
      }
      let p = { actpoint: "look", instid: this.multipleSelection[0].uuid };
      this.$router.push({
        path: "../detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
      });
    }, // list通用方法开始
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
    searchFromReset() {
      this.$refs["searchFrom"].resetFields();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      var url=this.activeName=='first'?"/api/contract/contract/ContractInfo/list/loadPageData":"/api/contract/ContractInfoDetail/list/loadPageData";
      this.$http
        .post(
          url,
          this.searchFrom
        )
        .then((res) => {
        this.page = res.data.data;
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style scoped>
.el-table__row {
  cursor: pointer;
}
.tableStyle{
  min-height: calc(100vh - 160px)!important;
}
  /*.houseTab{*/
    /*padding-bottom: 0!important;*/
    /*position: relative;*/
  /*}*/
  /*>>>.el-tabs__content{*/
    /*min-height: calc(100vh - 120px)!important;*/
    /*max-height: calc(100vh - 120px)!important;*/
  /*}*/
</style>
