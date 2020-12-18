<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" plain type="primary">变更</el-button>
        <el-button @click="searchformReset" type="primary" plain>刷新</el-button>
      </el-button-group>
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
            {{scope.row.inforName}}
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
            {{scope.row.enginTypeFirstName}}
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
            {{scope.row.constructionOrg}}
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
            {{scope.row.noticeTypeName}}
          </template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="资审文件发售截止日期"
          prop="verify.saleTime"
          show-overflow-tooltip
        >

          <template slot-scope="scope" >
            {{scope.row.saleTime | dateformat}}
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
            <el-tag  v-if="scope.row.uuid===null" type="warning">未进行资审申请</el-tag>
            <el-tag  v-else type="success">已进行资审申请</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报人"
          prop="verify.username"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            {{scope.row.username}}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报时间"
          prop="verify.createtime"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">{{
            scope.row.createtime | dateformat
          }}</template> -->

          <template slot-scope="scope">
            {{scope.row.createtime | dateformat}}
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
        style="margin: 20px; position: fixed; right: 200px; bottom: 40px"
      ></el-pagination>
    </div>
    <el-dialog title="资审结果登记" :visible.sync="dialogResult">
      <el-form :model="resultform">
        <el-form-item label="资格预审结果" :label-width="formLabelWidth">
          <el-radio v-model="radio" label="1" border>通过</el-radio>
          <el-radio v-model="radio" label="0" border>不通过</el-radio>
        </el-form-item>
        <el-form-item label="通过时间" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          class="neirong"
          label="附件（最大10MB）:"
          style="width: 33%"
        >
          <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">最大上传文件不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResult = false">取 消</el-button>
        <el-button type="primary" @click="dialogResult = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "proposal-list-look",
  data() {
    return {
      radio:'0',
      page: { current: 1, size: 10, total: 0, records: [] },
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
      dialogResult:false,
      resultform: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'

    }
  },
  methods: {
    handleChange(){},
    statusFormat(row,column){
      return row.verify.uuid != "" ? "已进行资审申请" : row.verify.uuid == "" ? "未进行资审申请" : "未进行资审申请";
      // return statusW
    },
    search(){
      this.showinput = false
    },
    add(){
      console.log(JSON.stringify(this.multipleSelection[0].uuid));
      if(this.multipleSelection[0].flowStatus!='2' )
      {
        this.$message.info("当前登记的资审信息未审核通过，不能进行变更！");
        return;
      }
      //alert(JSON.stringify(this.multipleSelection[0]));
      let p = { actpoint: 'add',instid: this.multipleSelection[0].inforid, topinfoid:this.multipleSelection[0].tiouuid}
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail_Chang/',
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      })
    },
    // 查看
    rowshow(row) {
      let p = { actpoint: 'look', instid: row.uuid }
      this.$router.push({
        path: './detail/',
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      })
    },
    show() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info('请选择一条记录进行查看操作！')
        return false
      }
      let p = { actpoint: 'look', instid: this.multipleSelection[0].uuid }
      this.$router.push({
        path: '../detail/',
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
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
      this.multipleSelection = val
    },
    getData() {
      console.log(JSON.stringify(this.searchform));
      if(this.searchform.saleTime!="")
      {
        var date = new Date(this.searchform.saleTime);
        var time1 = Date.parse(date);
        this.searchform.saleTime=time1;
      }

      console.log(JSON.stringify(this.searchform));
      this.$http
        .post(
          '/api/topInfo/Verify/list/loadPageDataForChangeRecord',
          this.searchform
        )
        .then(res => {
          this.page = res.data.data
        })
    },
    getMenus() {
      this.$http
        .post('api/base/loadcascader', { typecode: 'XMLX' })
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
      this.$http.get('/api/base/loadorglist').then(res => {
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
</style>
