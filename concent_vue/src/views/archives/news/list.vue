<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button plain
                   type="primary"
                   @click="add">新增</el-button>
        <el-button plain
                   type="primary"
                   @click="editItem">修改</el-button>
        <el-button plain
                   type="primary"
                   @click="remove">删除</el-button>
      </el-button-group>
    </div>

    <div style="margin-top: 10px">
      <el-table
        ref="table"
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        border
        highlight-current-row
        style="width: 100%"
        tooltip-effect="dark"
        @row-click="rowshow"
        @selection-change="handleSelectionChange"
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
          type="index">
        </el-table-column>

        <el-table-column
          :width="120"
          align="center"
          label="消息类型"
          prop="archivesTypeName"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          :width="300"
          label="消息名称"
          prop="Name"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="blue pointer"
                  @click="rowshow(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报单位"
          prop="createOrgName"
          show-overflow-tooltip
        >

        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报人"
          prop="createUserName"
          show-overflow-tooltip>

          <template slot-scope="scope">
            {{ scope.row.createUserName }}
          </template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="填报时间"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.createTime | dateformat }}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          filter-multiple="true"
          label="提交时间"
          prop="sumbitTime"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            {{ scope.row.sumbitTime | dateformat }}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="是否发布"
          prop="isShare"
          show-overflow-tooltip
        >
        <template slot-scope="scope">
          {{ scope.row.isShare | statusFormat }}
        </template>
        </el-table-column>

        <el-table-column
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
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>

  </div>

</template>

<script>
export default {
  name: "消息列表",
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
        archivesInfoType: ''
      },
      multipleSelection: [],
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


    add() {
      // console.log(JSON.stringify(this.multipleSelection[0].uuid));
      // if (this.multipleSelection[0].uuid != null) {
      //   this.$message.info("当前登记的项目信息已经添加的资审信息！");
      //   return;
      // }
      //alert(JSON.stringify(this.multipleSelection[0]));
      let p = {actpoint: 'add'}
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
            '/api/contract/archives/ArchivesInfo/list/delete',
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
      console.log(JSON.stringify(this.searchform));
      this.$http
        .post(
          '/api/contract/archives/ArchivesInfo/list/loadPageDataByNews',
          this.searchform
        )
        .then(res => {
          this.page = res.data.data
        })
    },

  },
  created() {
    this.getData()
  }
}
</script>
<style scoped>
.el-table__row {
  cursor: pointer;
}
.gcform .el-form-item{
  width: auto;
  margin-bottom: 5px !important;
}
>>>.el-table td, .el-table th
{
  padding:5px 0px;
}
</style>
