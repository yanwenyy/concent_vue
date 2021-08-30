<template>
  <div>
    <el-dialog title="选择项目进行资审变更"
               :visible.sync="dialogResult"
               :append-to-body="true">


    <div>
      <el-table
        :max-height="$dialogTableHeight"
        :height="$dialogTableHeight"
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        @selection-change="handleCurrentChangeTable"
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
          :filter-multiple="true"
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
          prop="verify.createUserName"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            {{scope.row.createUserName}}
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
            {{scope.row.createTime | dateformat}}
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
      ></el-pagination>
    </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResult = false">取消</el-button>
        <el-button type="primary" @click="sub()">确定</el-button>
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
      page: { current: 1, size: 20, total: 0, records: [] },
      showinput: false,
      sousuo: "",
      searchform: {
        current: 1,
        size: 20,
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
      formLabelWidth: '120px',
      currentRow:[]

    }
  },
  methods: {
    //复选下拉框框获取name
    getMultipleName(valueList, list, id, name) {
      var _id = [],
        _name = [];
      list.forEach((item) => {
        if (valueList.indexOf(item.id) != -1) {
          _id.push(item.id);
          _name.push(item.detailName);
        }
      });
      this.detailform.bidInfo[id] = _id.join(",");
      this.detailform.bidInfo[name] = _name.join(",");
      // console.log(this.detailform.bidInfo[id]);
    },
    sub(){
      if(this.currentRow.length!=1)
      {
        this.$message.info('请选择一条资审信息进行变更！')
        return false
      }
      this.dialogResult = false;

      this.$emit('refreshDataList', this.currentRow[0])
    },

    search(){
      this.showinput = false
    },
    handleSizeChange(val) {
      this.searchform.size = val
      this.init()
    },
    handleCurrentChange(val) {
      this.searchform.current = val
      this.init()
    },
    searchformSubmit() {
      this.searchform.current = 1
      this.init()
    },
    handleCurrentChangeTable(val) {
      //alert(JSON.stringify(val));
      this.currentRow = val;
    },

    // // 列表选项数据
    // handleSelectionChange(val) {
    //   this.multipleSelection = val
    // },
    init() {
      this.dialogResult = true
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
          //'/api/contract/topInfo/Verify/list/loadPageDataForIsChange',
          '/api/contract/topInfo/Verify/list/loadPageDataForChangeRecord',
          this.searchform
        )
        .then(res => {
          this.page = res.data.data
        })
    }


    // list通用方法结束
  }
}
</script>
<style scoped>

.dialog-footer {
  margin-top: 10px;
  text-align: center;
}

>>>.el-dialog {
  width: 80%;
}

>>>.el-form-item__label {
  width: auto;
}

.inline-block {
  display: inline-block;
}

</style>
