<template>
  <div>
    <div style="width: 100%; overflow: hidden">

      <el-form :inline="true"
               :model="searchform"
               @keyup.enter.native="getData()"
               class="queryForm">
            <el-form-item label="填报年度:">
            <el-select
              placeholder="请选择"
              size="mini"
              v-model="searchform.selectYear"
            >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in years"
          ></el-option>
        </el-select>
            <!--            <el-date-picker-->
            <!--              v-model="searchform.reportTime"-->
            <!--              type="month"-->
            <!--              value-format="timestamp">-->
            <!--            </el-date-picker>-->
          </el-form-item>
          <el-button @click="getData"
                     type="primary"
                     plain>查询</el-button>


        </el-form>
    </div>


    <div style="margin-top: 0px">
      <el-table
        ref="table"
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        border
        highlight-current-row
        stripe
        style="width: 100%"
        tooltip-effect="dark"
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
          prop="submitTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.submitTime | dateformat }}
          </template>
        </el-table-column>
         <el-table-column
           :width="120"
           align="center"
           label="附件"
           show-overflow-tooltip>
         <template slot-scope="scope">
          <el-button plain
                     type="primary"
                     @click="selectUploadTable(scope.row.uuid)">上传附件</el-button>
        </template>
        </el-table-column>
        <el-table-column
          :width="120"
          label="附件个数"
          align="center"
          prop="fileCount"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          :width="120"
          label="可见数"
          prop="orgCount"
          align="center"
          show-overflow-tooltip>
        <template slot-scope="scope">
            {{ scope.row.orgCount | getNotIncludedOrg }}
          </template>
        </el-table-column>
        <el-table-column
          :width="120"
          label="不可见数"
          prop="orgCount"
          align="center"
          show-overflow-tooltip>
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
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
     <el-dialog title="选择填报年份" :visible.sync="dialogAdd"
                width="30%">
      <el-form :model="resultform">
        <el-form-item
          prop="year">
        <el-select
          placeholder="请选择"
          size="mini"
          v-model="resultform.year"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in years"
          ></el-option>
        </el-select>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="saveResult">确 定</el-button>
      </div>
    </el-dialog>
<uploadTable v-if="uploadTableStatus" ref="addOrUpdate" @getPosition="getUploadTable"></uploadTable>
  </div>

</template>

<script>
import uploadTable from '@/components/fileUploadTable'
export default {
  name: "月度分析列表",
  components: {
    uploadTable
  },
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
        selectTimeTypeReportTime: '',
        reportTimeBeginTime: "",
        reportTimeEndTime: '',
        selectTimeTypeCreateTime: '',
        createTimeBeginTime: "",
        createTimeEndTime: '',
        createTime: '',
        createOrgName: '',
        createUserName: '',
        selectYear:'',
        orgCount:''
      },
      multipleSelection: [],
      uploadTableStatus:false,
      resultform:{
        year:''
      },
      years: [
        {
          id: '2020',
          detailName: '2020'
        },
        {
          id: '2021',
          detailName: '2021'
        },
        {
          id: '2022',
          detailName: '2022'
        },
        {
          id: '2023',
          detailName: '2023'
        }
      ],//是否共享
      detailform: {
        name: '',
        archivesTypeId: '',
        isShare: '',
        archivesTypeName: '',
        remarks: '',
        submitTime: '',
        reportTime: '',
        archivesInfoType: '',
        createOrgName: '',
        createUserName: '',
        selectYear:''

      },

    }
  },
  filters: {
    isActiveFitlter: (value) => {
      return value === 1 ? '激活' : '冻结'
    },
    statusFormat: (value) => {
      return value == "1" ? "是" : "否";
      // return statusW
    },
    getNotIncludedOrg: (value) => {
      return 67-parseInt( value );
    },
  },
  methods: {
    getUploadTable(data) {

      console.log(data)
      this.uploadTableStatus = false;
      this.getData();
    },
    selectUploadTable(val){
      this.uploadTableStatus = true;
      console.log(val);
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(val,"0")
      })
    },
    saveResult(){
      //alert(this.resultform.year)
      // var time = Date.parse(new Date());
      this.detailformarchivesTypeId='0',
        this.detailform.isShare='0',
        this.detailform.archivesTypeName='0',
        this.detailform.remarks='',
        this.detailform.submitTime='',
        this.detailform.reportTime="",
        this.detailform.archivesInfoType='5',
        this.detailform.selectYear = this.resultform.year;
      this.$http
        .post(
          "/api/contract/archives/ArchivesInfo/detail/save",
          JSON.stringify(this.detailform),
          {useJson: true}
        )
        .then((res) => {

          if (res.data.msg === "SUCCESS") {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            // this.$refs[formName].resetFields();
            // this.$router.push({
            //   path: "./list",
            // });
            this.dialogAdd = false;
            this.getData();
          }

        });
    },

    add() {
      //alert(1)
      this.dialogAdd = true;

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
      //alert(1)
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
            '/api/contract/archives/list/delete',
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
      if(this.searchform.selectYear==="")
      {
        var date = new Date();
        this.searchform.selectYear = date.getFullYear();
      }
      this.searchform.isShare = 1;

      console.log(JSON.stringify(this.searchform));
      this.$http
        .post(
          '/api/contract/archives/ArchivesInfo/list/loadPageDataByAnalysis',
          this.searchform
        )
        .then(res => {
          this.page = res.data.data
          console.log(JSON.stringify(this.page));
        })
    },

  },
  created() {
    this.getData()
  }
}
</script>
<style scoped>
.el-form-item{
  width: auto;
  margin-bottom: 5px !important;
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
