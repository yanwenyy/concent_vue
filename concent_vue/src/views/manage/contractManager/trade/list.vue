<template>
  <div>
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
        <el-button @click="batchSub" type="primary" plain><i class="el-icon-plus"></i>批量提交</el-button>
      </el-button-group>
      <div style="float: right;">
        <el-button @click="searchFromReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        <el-button @click="exportdata" type="primary" plain><i class="el-icon-upload2"></i>导出</el-button>
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
        :row-class-name="tableRowClassName"
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
          label="合同金额（万元）"
          prop="contractAmount"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>合同总金额（万元）</span>
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
          label="主推单位"
          prop="pushOrgName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>主推单位</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchFrom.pushOrgName"
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
        <el-table-column
          :width="150"
          align="center"
          label="是否招标公示"
          prop="isOpenBid"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.isOpenBid==1?'是':scope.row.isOpenBid==0?'否':''}}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="推送合同项目性质"
          prop="isPushInsure"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.isPushInsure==1?'系统内联合体':scope.row.isPushInsure==2?'系统内分包':scope.row.isPushInsure==3?'系统外联合体':scope.row.isPushInsure==4?'系统外分包':scope.row.isPushInsure==5?'集团内分包':''}}
          </template>
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
  </div>
</template>

<script>
export default {
  name: "proposal-list-look",
  data() {
    return {
      page: { current: 1, size: 20, total: 0, records: [] },
      searchFrom: {
        current: 1,
        size: 20,
        year: "",
        name: "",
        ptype: "",
        orgid: "",
        orgname: "",
        changeStatus:'0',
        moduleId:'510ba0d79593418493eb1a11ea4e7af4'
      },
      menus: [],
      multipleSelection: [],
      orgTree: [],
    };
  },
  methods: {
    //批量提交
    batchSub(){
      if (this.multipleSelection.length <1) {
        this.$message.info("请选择一条记录进行提交操作！");
        return false;
      }
      var list=[],itemStatus=true;
      this.multipleSelection.forEach((item) => {
        if(item.flowStatus==1||item.flowStatus==4){
          var v={
            businessId:item.uuid,
            businessName:item.contractName,
            businessType:'contract_contract_new'
          }
          list.push(v);
        }else{
          this.$message.info("当前所选数据中包含不可提交的选项,请检查后进行操作");
          return itemStatus=false;
        }
      })
      if(itemStatus){
        this.$confirm(`确认提交这些数据吗`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http
            .post(
              "/api/contract/topInfo/Verify/commonProcess/start",
              JSON.stringify(list),
              {useJson: true}

            )
            .then((res) => {
              if(res.data.code==200){
                this.$message({
                  message: "操作成功",
                  type: "success",
                });
                this.getData()
              }else{
                this.$message.error(res.data.msg);
              }

            });
        }).catch(() => {})
      }
    },
    exportdata() {
      this.searchFrom.size=1000000000;
      this.$http
        .post(
          "/api/contract/contract/ContractInfo/list/loadPageData",
          this.searchFrom
        )
        .then((res) => {
          this.searchFrom.size=20;
          var datas = res.data.data.records;
          this.$exportXls.exportList({
            thead:' <tr>\n' +
            '<th>合同名称</th>\n' +
            '<th>合同号</th>\n' +
            '<th>项目名称</th>\n' +
            '<th>填报单位</th>\n' +
            '<th>合同金额(万元)</th>\n' +
            '<th>填报人</th>\n' +
            '<th>录入时间</th>\n' +
            '<th>状态</th>\n' +
            '<th>版本标识</th>\n' +
            '<th>是否招标公示</th>\n' +
            '</tr>',
            jsonData:datas,
            tdstr:['contractName','contractCode','inforName',
              'createOrgName','contractAmount','createUserName','createTime',
              'flowStatus','version','isOpenBid'],
            tdstrFuc:{
              flowStatus:function (str) {
                return str==1?'草稿':str==2?'审核中':str==3?'审核通过':str==4?'审核退回':'待登记';
              },
              createTime:function (str) {
                return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
              },
              isOpenBid:function (str) {
                return str==1?'是':str==0?'否':'';
              }
            }
          })
        });
    },
    //table根据类型显示不一样的颜色
    tableRowClassName({row, rowIndex}) {
      if (row.projectNature == '2') {
        return 'row_red';
      } else if (row.projectNature =='1') {
        return 'row_blue';
      }else if (row.projectNature == '5') {
        return 'row_green';
      }
      if(row.pushId!=''&&row.pushId!=null){
        if (row.isPushInsure == '2') {
          return 'row_red';
        } else if (row.isPushInsure =='1') {
          return 'row_blue';
        }else if (row.isPushInsure == '5') {
          return 'row_green';
        }
      }
      return '';
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
          this.$http
          .post(
            "/api/contract/contract/ContractInfo/list/delete",
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
      if (this.multipleSelection.length !== 1) {
        this.$message.info("请选择一条记录进行查看操作！");
        return false;
      }
      if(this.multipleSelection[0].flowStatus=='2'||this.multipleSelection[0].flowStatus=='3'){
        this.$message.info("此条数据不可修改！");
        return false;
      }
      let p = {actpoint: "edit", instid: this.multipleSelection[0].uuid,pushId:this.multipleSelection[0].pushId};
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
      this.searchFrom={
        current: 1,
        size: 20,
        changeStatus:'0',
        moduleId:'510ba0d79593418493eb1a11ea4e7af4'
      };
      this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      this.$http
        .post(
          "/api/contract/contract/ContractInfo/list/loadPageData",
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
</style>
