<template>
  <div>
    <div style="width: 100%;overflow: hidden;">
      <el-button-group style="float: left">
        <el-button @click="add" plain type="primary">登记</el-button>
        <el-button @click="totop" :disabled="flowStatus!=1&&flowStatus!=4" plain type="primary">修改</el-button>
        <el-button type="primary" @click=" " plain >开标结果登记</el-button>

        <el-button @click="dialogFormVisible= true" plain type="primary">中标结果登记</el-button>
        <el-button @click="remove" type="primary" plain>删除</el-button>
        <!-- <el-button type="primary" style="height: 40px" plain>
          <input placeholder="请输入项目名称"/>
          </el-button> -->
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
        <el-button @click="getData" type="primary" plain>查询</el-button>
        <el-button @click="" type="primary" plain>导出</el-button>
      </div>
    </div>

    <div style="margin-top: 20px">
      <el-table
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        @select="rowSelect"
        border
        highlight-current-row
        ref="table"
        stripe
        style="width: 100%"
        tooltip-effect="dark"
      >
        <el-table-column
          :width="50"
          align="center"
          show-overflow-tooltip
          type="selection">
        </el-table-column>
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index">
        </el-table-column>

        <el-table-column
          :width="500"
          label="项目名称"
          prop="inforName"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>项目名称</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.inforName"
                size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>
        </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="工程类别"
          prop="enginTypeFirstName"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>工程类别(一级)</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.enginTypeFirstName"
                size="mini"/>
            </div>
          </template>
        </el-table-column>


        <el-table-column
          :width="150"
          align="center"
          label="工程类别"
          prop="enginTypeSecondName"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>工程类别(二级)</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.enginTypeSecondName"
                size="mini"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="建设单位"
          prop="constructionOrg"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>建设单位</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.constructionOrg"
                size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="公告类型"
          prop="noticeTypeName"
          show-overflow-tooltip>
          <!-- <template slot-scope="scope">{{
            scope.row.exetime | datetoMonth
          }}</template> -->
          <template slot="header" slot-scope="scope">
            <span>公告类型</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.noticeTypeName"
                size="mini"/>
            </div>
          </template>
        </el-table-column>



        <el-table-column
          :width="150"
          align="center"
          label="状态"
          prop="orgname"
          fixed="right"
          show-overflow-tooltip>
          <template slot-scope="scope">
              {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'审核通过':scope.row.flowStatus==4?'审核退回':'待登记'}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="sousuo"
                size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="投标截止日期"
          prop="endTime"
          show-overflow-tooltip>
          <!-- <template slot-scope="scope">{{
            scope.row.state === '0' ? '草稿' : '已上报'
          }}</template> -->
          <template slot="header" slot-scope="scope">
            <span>截至投标日期</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.endTime"
                size="mini"/>
            </div>
          </template>
           <template slot-scope="scope">{{
            scope.row.endTime | dateformat
          }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报人"
          prop="username"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>填报人</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="sousuo"
                size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="登记时间"
          prop="createtime"
          show-overflow-tooltip>
          <!-- <template slot-scope="scope">{{
            scope.row.createtime | dateformat
          }}</template> -->
          <template slot="header" slot-scope="scope">
            <span>登记时间</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="sousuo"
                size="mini"/>
            </div>
          </template>
            <template slot-scope="scope">{{
            scope.row.createtime | dateformat
          }}</template>
        </el-table-column>
      </el-table>
    </div>
          <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[10, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin: 20px;position: fixed;right:200px;bottom:40px">
      </el-pagination>
      <info-change-search v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></info-change-search>

  <el-dialog title="开标登记结果" :visible.sync="dialogFormVisible" margin="0 auto">
    <el-form>
        <el-form-item label="是否中标" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择">
        <el-option label="中标" value="shanghai"></el-option>
        <el-option label="未中标" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import InfoChangeSearch from '../proposal/infoChangeSearch'

export default {
  name: "proposal-list-look",
  data() {

    return {
      flowStatus:'',
      dialogFormVisible: false,
      infoCSVisible:false,
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      page: { current: 1, size: 10, total: 0, records: [] },
      showinput: false,
      sousuo: "",
      searchform: {
        current: 1,
        size: 10,
        year: "",
        name: "",
        ptype: "",
        orgid: "",
        orgname: "",
      },
      zbForm:{},
      menus: [],
      multipleSelection: [],
      orgTree: [],
      formLabelWidth: '120px'
    };
  },
   components: {
      InfoChangeSearch
    },
  methods: {
      //行选择的时候
      rowSelect(selection, row){
        if(selection.indexOf(row)!=-1){
          this.flowStatus=row.flowStatus;
        }else{
          this.flowStatus='';
        }
      },
      //去新增详情页面
      goAddDetail(data){
        console.log(data);
        let p = {actpoint: "add",instid: data.topOrgId};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
    search() {
      this.showinput = false;
    },
    //登记
    add() {
        if (this.multipleSelection.length !== 1||this.multipleSelection.length>1) {
          this.$message.info("请选择一条记录进行登记操作！");
          return false;
        }
        let p = {actpoint: "add", instid: this.multipleSelection[0].topInfoOrgId};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

        // this.infoCSVisible = true;
        // this.$nextTick(() => {
        //   this.$refs.infoCS.init();
        // })
    },
    // 修改
      totop() {
        if (this.multipleSelection.length !== 1||this.multipleSelection.length>1) {
          this.$message.info("请选择一条记录进行修改操作！");uuid
          return false;
        }
        let p = {actpoint: "edit", instid: this.multipleSelection[0].uuid};
        this.$router.push({
          path: "./detail/",
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
          if(item.flowStatus==1||item.flowStatus==4){
            uuids.push(item.uuid);
          }else{
            this.$message.info("当前所选数据中包含不可删除的选项,请检查后进行操作");
            return itemStatus=false;
          }
        })
        // uuids.join(',')
        // console.log(uuids)
        if(itemStatus){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
              "/api/topInfo/BidInfo/list/delete",{ids: uuids}

            )
            .then((res) => {
            this.getData()
        });
        }).catch(() => {})
        }

      },


    // 查看
        getData() {
        this.$http
          .post(
            "/api/topInfo/BidInfo/detail/loadPageDataForReg",
            this.searchform
          )
          .then((res) => {
            this.page = res.data.data;
          });
      },


    rowshow(row) {
      let p = { actpoint: "look", instid: row.uuid };
      this.$router.push({
        path: "./detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
      });
    },
    // 展示
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
        this.searchform= {
        current: 1,
        size: 10,
        year: "",
        name: "",
        ptype: "",
        orgid: "",
        orgname: "",
      }

        this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      this.$http
        .post(
         "/api/topInfo/BidInfo/detail/loadPageDataForReg",
          this.searchform
        )
        .then((res) => {
          this.page = res.data.data;
        });
    },
    getMenus() {
      this.$http
        .post("api/base/loadcascader", { typecode: "XMLX" })
        .then((res) => {
          if (res.data.code === 0) {
            this.menus = res.data.data;
          }
        });
    },
    currentMenu(selVal) {
      let selMenuObj = this.menus.filter((item) => item.value === selVal);
      this.searchform.menu = selMenuObj[0].label;
    },
    // 获取上级单位树信息
    getOrgTree() {
      this.$http.get("/api/base/loadorglist").then((res) => {
        this.orgTree = res.data.data;
      });
    },
    // 确定单位
    orgChange() {
      let selectLabelArr = this.$refs["porgCascader"].getCheckedNodes()[0]
        .pathLabels;
      this.searchform.orgname = selectLabelArr[selectLabelArr.length - 1];
    },

    // list通用方法结束
  },
  created() {
    // this.getMenus();
    // this.getOrgTree();
    this.getData();
  },
};
</script>
<style scoped>
.el-dialog{
  width: 60%;
}
.el-table__row {
  cursor: pointer;
}
</style>
