<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" plain type="primary">登记</el-button>
        <el-button @click="editItem" plain type="primary">修改</el-button>
        <el-button @click="remove" type="primary" plain>删除</el-button>
        <el-button @click="searchformReset" type="primary" plain>刷新</el-button>
      </el-button-group>
    </div>
    <div style="margin-top: 10px">
      <el-table
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
        stripe
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
        >

        </el-table-column>

        <el-table-column
          :width="300"
          label="项目名称"
          prop="inforName"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程类别"
          prop="topInfor.enginTypeFirstName"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            {{ scope.row.enginTypeFirstName }}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="建设单位"
          prop="topInfor.constructionOrg"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            {{ scope.row.constructionOrg }}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="公告类型"
          prop="topInfor.noticeTypeName"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            {{ scope.row.noticeTypeName }}
          </template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="资审文件发售截止日期"
          prop="verify.saleTime"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            {{ scope.row.saleTime | dateformat }}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="状态"
          prop="verify.uuid"
          filter-multiple="true"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            <el-tag v-if="scope.row.uuid===null" type="warning">未进行资审申请</el-tag>
            <el-tag v-else type="success">已进行资审申请</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报人"
          prop="verify.createUserName"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            {{ scope.row.createUserName }}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报时间"
          prop="verify.createTime"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">{{
            scope.row.createtime | dateformat
          }}</template> -->

          <template slot-scope="scope">
            {{ scope.row.createTime | dateformat }}
          </template>
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
    <el-dialog title="资审结果登记" :visible.sync="dialogResult"
    width="30%">
      <el-form :model="resultform">
        <el-form-item label="资格预审结果" :label-width="formLabelWidth" prop="verifyResult">
          <el-radio v-model="resultform.verifyResult" label="1" border>通过</el-radio>
          <el-radio v-model="resultform.verifyResult" label="0" border>不通过</el-radio>
        </el-form-item>
        <el-form-item label="通过时间" :label-width="formLabelWidth" prop="verifyResultTime">
          <el-date-picker
            v-model="resultform.verifyResultTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          class="neirong"
          label="附件:"
        >
          <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
         <el-upload
           class="upload-demo detailUpload"
           :action="'/api/contract/topInfo/CommonFiles/verify/02/uploadFile'"
           :on-success="handleChange"
           :on-error="handleChange"
           :on-remove="handleRemove"
           multiple
         >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResult = false">取 消</el-button>
        <el-button type="primary" @click="saveVerifyResult">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "proposal-list-look",
  data() {
    return {
      radio: '0',
      page: {current: 1, size: 10, total: 0, records: []},
      showinput: false,
      sousuo: "",
      searchform: {
        current: 1,
        size: 10,
        inforName: '',
        enginTypeFirstName: '',
        constructionOrg: '',
        noticeTypeName: '',
        status: '',
        username: '',
        saleTime: ''
      },
      menus: [],
      multipleSelection: [],
      orgTree: [],
      dialogResult: false,
      resultform: {
        verifyResult: '1',
        verifyResultTime: '2020-12-18',
        verifyResultfile: ''
      },
      formLabelWidth: '120px'

    }
  },
  methods: {
    verifyResultEdit() {
      if (this.multipleSelection.length > 0) {
        this.dialogResult = true;
        //alert(JSON.stringify(this.multipleSelection[0]));
        this.resultform.verifyResult = this.multipleSelection[0].verifyResult;
        this.resultform.verifyResultTime = this.multipleSelection[0].verifyResultTime;
      } else {
        this.$message.info("请选择列表中的项目！");
      }
    },
    saveVerifyResult() {
      this.dialogResult = false
      this.multipleSelection[0].verifyResult = this.resultform.verifyResult;
      var date = new Date(this.resultform.verifyResultTime);
      var time1 = date.getTime();
      this.multipleSelection[0].verifyResultTime = time1;
      // alert(JSON.stringify(this.multipleSelection[0]))
      this.$http
        .post(
          '/api/contract/topInfo/Verify/detail/saveVerifyResult',
          JSON.stringify(this.multipleSelection[0]), {useJson: true}
        )
        .then(res => {
          if (res.data.code === 0) {
            if (res.data.code === 0) {
              this.$message({
                message: "保存成功",
                type: "success",
              });

            }
          }
          this.getData();
        })
    },
    selectFile()
    {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.response.data.uuid]},
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.fileList=fileList;
          }
        });
    },
    handleRemove(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.detailform.fileList2.splice(index,1);
          }

        });
      console.log(this.detailform.fileList1)
    },
    //上传附件
    handleChange(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.detailform.fileList.push(response.data);
          }
        })
      } else {
        this.$message.error(response.msg)
      }
    },
    statusFormat(row, column) {
      //alert(row.verify.uuid)
      // console.log(row.verify.uuid);
      // var statusW;
      // if(row.verify.uuid!="")
      // {
      //   statusW= "已进行资审申请"
      // }else
      // {
      //   statusW= "未进行资审申请"
      // }
      return row.verify.uuid != "" ? "已进行资审申请" : row.verify.uuid == "" ? "未进行资审申请" : "未进行资审申请";
      // return statusW
    },
    search() {
      this.showinput = false
    },
    add() {
      console.log(JSON.stringify(this.multipleSelection));
      if(this.multipleSelection.length==0)
      {
        this.$message.info("请选择未登记资审信息的项目进行资审登记！");
        return;
      }
      if (this.multipleSelection[0].uuid != null) {
        this.$message.info("当前登记的项目信息已经添加的资审信息！");
        return;
      }
      //alert(JSON.stringify(this.multipleSelection[0]));
      let p = {actpoint: 'add', instid: this.multipleSelection[0].inforid, topinfoid: this.multipleSelection[0].tiouuid}
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
      })
    },
    editItem() {
      console.log(JSON.stringify(this.multipleSelection[0].uuid));
      //是否有资审信息判断
      if (this.multipleSelection[0].uuid == "" || this.multipleSelection[0].uuid == null) {
        this.$message.info("当前登记的项目信息没有添加的资审信息，请添加资审信息后修改！");
        return;
      }
      //是否在审核流程中判断
      //是否在变更流程中判断
      let p = {
        actpoint: 'editItem',
        instid: this.multipleSelection[0].uuid,
        topinfoid: this.multipleSelection[0].tiouuid
      }
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
      })
    },
    remove() {
      console.log(JSON.stringify(this.multipleSelection[0].uuid));
      if (this.multipleSelection[0].uuid == "" || this.multipleSelection[0].uuid == null) {
        this.$message.info("当前登记的项目信息没有添加的资审信息，请添加资审信息后修改！");
        return;
      }
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
            '/api/contract/topInfo/Verify/list/delete',
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
      if (row.uuid === null) {
        this.$message.error("当前登记的项目信息未添加的资审信息！");
        return;
      }
      //alert(JSON.stringify(this.multipleSelection[0]));
      let p = {actpoint: 'look', instid: row.inforid, topinfoid: row.tiouuid}
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
        path: '../detail/',
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
    searchformReset() {
      // this.$refs['searchform'].resetFields()
      this.searchform.inforName = "";
      this.searchform.enginTypeFirstName = "";
      this.searchform.constructionOrg = "";
      this.searchform.noticeTypeName = "";
      this.searchform.status = "";
      this.searchform.username = "";
      this.searchform.saleTime = "";
      this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      //alert(JSON.stringify(val))
      this.multipleSelection = val
    },
    getData() {
      console.log(JSON.stringify(this.searchform));
      if (this.searchform.saleTime != "") {
        var date = new Date(this.searchform.saleTime);
        var time1 = Date.parse(date);
        this.searchform.saleTime = time1;
      }

      console.log(JSON.stringify(this.searchform));
      this.$http
        .post(
          '/api/contract/topInfo/Verify/list/loadPageDataForReg',
          this.searchform
        )
        .then(res => {
          this.page = res.data.data
        })
    },
    getMenus() {
      this.$http
        .post('api/base/loadcascader', {typecode: 'XMLX'})
        .then(res => {
          if (res.data.code === 0) {
            this.menus = res.data.data
          }
        })
    },
    currentMenu(selVal) {
      let selMenuObj = this.menus.filter(item => item.value === selVal)
      this.searchform.menu = selMenuObj[0].label
    },
    // 获取上级单位树信息
    getOrgTree() {
      this.$http.get('/api/contract/base/loadorglist').then(res => {
        this.orgTree = res.data.data
      })
    },
    // 确定单位
    orgChange() {
      let selectLabelArr = this.$refs['porgCascader'].getCheckedNodes()[0]
        .pathLabels
      this.searchform.orgname = selectLabelArr[selectLabelArr.length - 1]
    }

    // list通用方法结束
  },
  created() {
    //this.getMenus()
    //this.getOrgTree()
    this.getData()
  }
}
</script>
<style scoped>
.el-table__row {
  cursor: pointer;
}
>>>.el-table td, .el-table th
{
  padding:5px 0px;
}
.gcform >>>.el-form-item {
  margin-bottom: 5px !important;
}
</style>
