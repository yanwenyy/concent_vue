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
        <el-button @click="batchSub" type="primary" plain><i class="el-icon-plus"></i>批量提交</el-button>
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
          label="档案类型"
          prop="archivesTypeName"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          :width="300"
          label="档案名称"
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
          :filter-multiple="true"
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
          label="是否共享"
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
        <el-table-column
          :width="150"
          align="center"
          label="审核状态"
          prop="flowStatus"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核退回':'待登记'}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>审核状态</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.flowStatus"
              >
                <el-option label="待登记" value="edit"></el-option>
                <el-option label="草稿" value="edit"></el-option>
                <el-option label="审核中" value="check"></el-option>
                <el-option label="审核通过" value="pass"></el-option>
                <el-option label="审核退回" value="reject"></el-option>
              </el-select>
              <!--<el-input-->
              <!--class="list-search-picker"-->
              <!--style=" width: 100%"-->
              <!--v-model="searchform.flowStatus"-->
              <!--size="mini"-->
              <!--/>-->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[20, 50, 100]"
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
  data() {
    return {
      page: {current: 1, size: 20, total: 0, records: []},
      searchform: {
        queryType:'1',
        current: 1,
        size: 20,
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
    //批量提交
    batchSub(){
      if (this.multipleSelection.length <1) {
        this.$message.info("请选择一条记录进行提交操作！");
        return false;
      }
      var list=[],itemStatus=true;
      this.multipleSelection.forEach((item) => {
        if(item.flowStatus=='edit'||item.flowStatus=='reject'){
          var v={
            businessId:item.uuid,
            businessName:item.name,
            businessType:'contract_file_manager'
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
        path: './detail_archives/',
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
      if(this.multipleSelection[0].flowStatus=='check'||this.multipleSelection[0].flowStatus=='pass'){
        this.$message.info("此条数据不可修改！");
        return false;
      }
      let p = {
        actpoint: 'editItem',
        instid: this.multipleSelection[0].uuid
      }
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail_archives/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
      })
    },
    remove() {
      //console.log(JSON.stringify(this.multipleSelection[0].uuid));
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
      console.log(JSON.stringify(uuids));
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
        path: './detail_archives/',
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
        path: './detail_archives/',
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
      // console.log(JSON.stringify(this.searchform));
      this.$http
        .post(
          '/api/contract/archives/ArchivesInfo/list/loadPageDataByArchives',
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
/*>>>.el-table td, .el-table th*/
/*{*/
  /*padding:5px 0px;*/
/*}*/
</style>
