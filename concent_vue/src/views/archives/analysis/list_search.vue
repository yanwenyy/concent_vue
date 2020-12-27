<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-form :inline="true"
               :model="searchform"
               @keyup.enter.native="getData()"
               class="gcform">
      <el-row>
      <el-form-item label="填报年度:">
        <el-date-picker
          v-model="searchform.reportTime"
          type="month"
          @change="searchform.selectTimeTypeReportTime='01'"
          value-format="timestamp">
        </el-date-picker>
      </el-form-item>
      <el-button @click="getData"
                 type="primary"
                 plain>查询</el-button>
      </el-row>
    </el-form>
    </div>

    <div style="margin-top: 20px">
      <el-table
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
        stripe
        style="width: 100%"
        tooltip-effect="dark"
      >
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index">
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="填报年月"
          prop="reportTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.reportTime | dateformat }}
          </template>
        </el-table-column>
        <el-table-column
          :width="120"
          align="center"
          label="附件"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          :width="120"
          label="附件个数"
          align="center"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="备注"
          prop="remarks"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[10, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>

  </div>

</template>

<script>
export default {
  name: "月度分析查询",
  data() {
    return {
      page: {current: 1, size: 10, total: 0, records: []},
      searchform: {
        current: 1,
        size: 10,
        uuid: '',
        name: '',
        archivesTypeId: '',
        isShare: '',
        archivesTypeName: '',
        remarks: '',
        submitTime: '',
        reportTime: '',
        archivesInfoType: '',
        selectTimeTypeReportTime:'',
        reportTimeBeginTime:"",
        reportTimeEndTime:'',
        selectTimeTypeCreateTime:'',
        createTimeBeginTime:"",
        createTimeEndTime:'',
        createTime:'',
        createOrgName:'',
        createUserName:''
      },
      multipleSelection: [],
      isShare: [
        {
          id: '1',
          detailName: '是'
        },
        {
          id: '0',
          detailName: '否'
        }
      ],//是否共享
      archivesType: [
        {
          id: '1',
          detailName: '管理办法'
        },
        {
          id: '2',
          detailName: '其他'
        },
        {
          id: '3',
          detailName: '计划文件'
        }
      ],//联合投标选择

    }
  },
  filters:{
    isActiveFitlter : (value)=>{
      return value===1?'激活':'冻结'
    },
    statusFormat: (value)=> {

      return value == "1" ? "是" :"否";
      // return statusW
    },
  },
  methods: {
    exportdata() {
    },
    searchformReset() {
      // this.$refs["searchform"].resetFields();
      this.searchform={
        current: 1,
        size: 10,
        uuid: '',
        name: '',
        archivesTypeId: '',
        isShare: '',
        archivesTypeName: '',
        remarks: '',
        submitTime: '',
        reportTime: '',
        archivesInfoType: '',
        selectTimeTypeReportTime:'',
        reportTimeBeginTime:"",
        reportTimeEndTime:'',
        selectTimeTypeCreateTime:'',
        createTimeBeginTime:"",
        createTimeEndTime:'',
        createTime:'',
        createOrgName:'',
        createUserName:''
      }
      this.getData();
    },
    add() {
      console.log(JSON.stringify(this.multipleSelection[0].uuid));
      if (this.multipleSelection[0].uuid != null) {
        this.$message.info("当前登记的项目信息已经添加的资审信息！");
        return;
      }
      //alert(JSON.stringify(this.multipleSelection[0]));
      let p = {actpoint: 'add', instid: this.multipleSelection[0].uuid}
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
      })
    },
    editItem() {
      console.log(JSON.stringify(this.multipleSelection[0].uuid));
      //是否有资审信息判断
      // if (this.multipleSelection[0].uuid == "" || this.multipleSelection[0].uuid == null) {
      //   this.$message.info("当前登记的项目信息没有添加的资审信息，请添加资审信息后修改！");
      //   return;
      // }
      //是否在审核流程中判断
      //是否在变更流程中判断
      let p = {
        actpoint: 'editItem',
        instid: this.multipleSelection[0].uuid
      }
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
      })
    },
    remove() {
      console.log(JSON.stringify(this.multipleSelection[0].uuid));
      // if (this.multipleSelection[0].uuid == "" || this.multipleSelection[0].uuid == null) {
      //   this.$message.info("当前登记的项目信息没有添加的资审信息，请添加资审信息后修改！");
      //   return;
      // }
      let uuids = []
      this.multipleSelection.forEach((item) => {
        if (item.uuid != null) {
          uuids.push(item.uuid);
        }

      })
      this.$confirm('此操作将永久删除该资审信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
        this.$http
          .post(
            '/api/archives/ArchivesInfo/list/delete',
            {ids: uuids}
          )
          .then(res => {
            this.getData();
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 查看
    rowshow(row) {
      // let p = {actpoint: 'look', instid: row.uuid}
      // this.$router.push({
      //   path: './detail/',
      //   query: {p: this.$utils.encrypt(JSON.stringify(p))}
      // })
      console.log(JSON.stringify(row));
      // if (row.uuid === null) {
      //   this.$message.error("当前登记的项目信息未添加的资审信息！");
      //   return;
      // }
      //alert(JSON.stringify(this.multipleSelection[0]));
      let p = {actpoint: 'look', instid: row.uuid}
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
      })
    },
    show() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info('请选择一条记录进行查看操作！')
        return false
      }
      let p = {actpoint: 'look', instid: this.multipleSelection[0].uuid}
      this.$router.push({
        path: './detail/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
      })
    }, // list通用方法开始
    handleSizeChange(val) {
      this.searchform.size = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.searchform.current = val
      this.getData()
    },
    searchformSubmit() {
      this.searchform.current = 1
      this.getData()
    },

    // 列表选项数据
    handleSelectionChange(val) {
      //alert(JSON.stringify(val))
      this.multipleSelection = val
    },
    getData() {

      if(this.searchform.selectTimeTypeReportTime=='01'){
        this.searchform.reportTimeBeginTime=this.searchform.reportTime[0];
        this.searchform.reportTimeEndTime=this.searchform.reportTime[1];
      }
      if(this.searchform.selectTimeTypeCreateTime=='01'){
        this.searchform.createTimeBeginTime=this.searchform.createTime[0];
        this.searchform.createTimeEndTime=this.searchform.createTime[1];
      }
      this.searchform.createTime=null;
      this.searchform.reportTime=null;
      console.log(JSON.stringify(this.searchform));
      this.$http
        .post(
          '/api/archives/ArchivesInfo/list/loadPageDataByArchives',
          this.searchform
        )
        .then(res => {
          this.page = res.data.data
          this.searchform.selectTimeTypeCreateTime=='00'
          this.searchform.selectTimeTypeReportTime=='00'
        })
    },

  },
  created() {
    this.getData()
  }
}
</script>
<style scoped>
.gcform .el-form-item{
  width: auto;
  margin-bottom:22px;
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
