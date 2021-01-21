<template>
  <div>
    <div style="width: 100%; overflow: hidden">

      <el-form :inline="true"
               :model="searchform"
               @keyup.enter.native="getData()"
               class="gcform">
          <el-row>
           <el-button plain
                      type="primary"
                      @click="add">新增</el-button>
            <el-button plain
                   type="primary"
                   @click="editItem">修改</el-button>

            <el-button plain
                       type="primary"
                       @click="sumbitFrom">提交</el-button>
            <el-form-item label="填报年度:">
<!--            <el-select-->
<!--              placeholder="请选择"-->
<!--              size="mini"-->
<!--              v-model="searchform.selectYear"-->
<!--            >-->
<!--          <el-option-->
<!--            :key="index"-->
<!--            :label="item.detailName"-->
<!--            :value="item.id"-->
<!--            v-for="(item, index) in years"-->
<!--          ></el-option>-->
<!--        </el-select>-->

            <el-date-picker
              v-model="searchform.selectYears"
              type="year"
              value-format="yyyy">
            </el-date-picker>
          </el-form-item>
          <el-button @click="getData"
                     type="primary"
                     plain>查询</el-button>


      </el-row>
        </el-form>
    </div>


    <div style="margin-top: 0px">
      <el-table
        ref="table"
        :max-height="$tableHeight"
        :height="$tableHeight"
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
                    class="analysis_btn"
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
          align="center"
          label="可见范围"
          show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button plain
          class="analysis_btn"
                     type="primary"
                     @click="selectOrgTable(scope.row.uuid)">选择范围</el-button>
        </template>
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
        :page-sizes="[12, 50, 100]"
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
        <el-date-picker
          v-model="resultform.year"
          type="year"
          value-format="yyyy">
            </el-date-picker>
          </el-form-item>
<!--        <el-select-->
<!--          placeholder="请选择"-->
<!--          size="mini"-->
<!--          v-model="resultform.year"-->
<!--        >-->
<!--          <el-option-->
<!--            :key="index"-->
<!--            :label="item.detailName"-->
<!--            :value="item.id"-->
<!--            v-for="(item, index) in years"-->
<!--          ></el-option>-->
<!--        </el-select>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="saveResult">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改填报内容" :visible.sync="dialogEdit"
               width="30%">
      <el-form :model="editform">
       <el-form-item
         prop="isShare">
          <el-radio v-model="editform.isShare" label="1">共享</el-radio>
          <el-radio v-model="editform.isShare" label="0">不共享</el-radio>
       </el-form-item>
          <el-form-item
            class="neirong"
            label="备注:"
            prop="remarks"
          >
              <el-input
                placeholder="请输入"
                size="mini"
                type="textarea"
                v-model="editform.remarks"
              />
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="saveEditResult">确 定</el-button>
      </div>
    </el-dialog>
<uploadTable v-if="uploadTableStatus" ref="addOrUpdate" @getPosition="getUploadTable"></uploadTable>
  <orgTable v-if="orgTableStatus" ref="addOrUpdate1" @getPosition="getOrgTable"></orgTable>
  </div>

</template>

<script>
import orgTable from '@/components/orgTable'
import uploadTable from '@/components/fileUploadTable'
export default {
  // name: "月度分析列表",
  components: {
    uploadTable,
    orgTable
  },
  data() {
    return {
      page: {current: 1, size: 12, total: 0, records: []},
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
        selectYears:new Date(),
        orgCount:''
      },
      multipleSelection: [],
      dialogAdd:false,
      uploadTableStatus:false,
      orgTableStatus:false,
      dialogEdit:false,
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
      editform:{
        isShare: '',
        remarks: ''
      }

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

    selectUploadTable(val){
      this.uploadTableStatus = true;
      // console.log(val);
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(val,"1")
      })
    },
    selectOrgTable(val){
      this.orgTableStatus = true;
      //console.log(this.positionIndex);
      this.$nextTick(() => {
        this.$refs.addOrUpdate1.init(val)
      })
    },
    getOrgTable(data)
    {
      // console.log(data)
      this.orgTableStatus = false;
      this.getData();
      var resultStr = [];
      //data.forEach((item, index) => {

        //var verifyOrg={ orgId:item.name,orgName:item.name};
        //this.detailform.verifyOrgList.push(verifyOrg)
        //resultStr+=item.name+",";
      //});

      // this.detailform.verifyOrgLists=resultStr;
      // alert(this.detailform.verifyOrgLists);
      // console.log(this.detailform.verifyOrgLists)
      // this.key = this.key + 1;
    },
    getUploadTable(data) {

      // console.log(data)
      this.uploadTableStatus = false;
      this.getData();
    },
    saveResult(){
      //alert(this.resultform.year)
      // var time = Date.parse(new Date());
        this.detailform.archivesTypeId='0',
        this.detailform.isShare='0',
        this.detailform.archivesTypeName='0',
        this.detailform.remarks='',
        this.detailform.submitTime='',
        this.detailform.reportTime="",
        this.detailform.archivesInfoType='5',
        this.detailform.selectYear = this.resultform.year;
        //查询选中年度是否已经有填报信息
      this.searchform.selectYear = this.resultform.year;
      this.$http
        .post(
          '/api/contract/archives/ArchivesInfo/list/loadPageDataByAnalysis',
          this.searchform
        )
        .then(res => {
          if(res.data.data.records.length>0)
          {
            this.$message.error("不能对相同年度进行重复填报！");
          }else {
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
          }
          // console.log(JSON.stringify(this.page));
        })



    },
    saveEditResult(){
        this.detailform.uuid = this.multipleSelection[0].uuid;
        this.detailform.archivesTypeId=  this.multipleSelection[0].archivesTypeId;
        this.detailform.isShare = this.editform.isShare;
        this.detailform.archivesTypeName = this.multipleSelection[0].archivesTypeName;
        this.detailform.remarks = this.editform.remarks;
        this.detailform.submitTime = this.multipleSelection[0].submitTime;
        this.detailform.reportTime = this.multipleSelection[0].reportTime;
        this.detailform.archivesInfoType = this.multipleSelection[0].archivesInfoType;
        this.detailform.reportYear = this.multipleSelection[0].reportYear;
      this.detailform.createOrgName = this.multipleSelection[0].createOrgName;
      this.detailform.createUserName = this.multipleSelection[0].createUserName;
      console.log(this.detailform)
      this.$http
        .post(
          "/api/contract/archives/ArchivesInfo/detail/saveItem",
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
            this.dialogEdit = false;
            this.getData();
          }

        });
    },

    add() {
      //alert(1)
      this.dialogAdd = true;

    },
    editItem() {
      // console.log(JSON.stringify(this.multipleSelection[0].uuid));
      if(this.multipleSelection.length>1)
      {
        this.$message.info("请选择一条信息进行修改！");
        return;
      }
      this.dialogEdit  =true;

      //alert(JSON.stringify(p));

    },

    sumbitFrom(){
      this.detailform.uuid = this.multipleSelection[0].uuid;
      this.detailform.archivesTypeId=  this.multipleSelection[0].archivesTypeId;
      this.detailform.isShare = this.multipleSelection.isShare;
      this.detailform.archivesTypeName = this.multipleSelection[0].archivesTypeName;
      this.detailform.remarks = this.multipleSelection.remarks;
      this.detailform.submitTime = Date.parse(new Date());
      this.detailform.reportTime = this.multipleSelection[0].reportTime;
      this.detailform.archivesInfoType = this.multipleSelection[0].archivesInfoType;
      this.detailform.reportYear = this.multipleSelection[0].reportYear;
      this.detailform.createOrgName = this.multipleSelection[0].createOrgName;
      this.detailform.createUserName = this.multipleSelection[0].createUserName;
      // console.log(this.detailform)
      this.$http
        .post(
          "/api/contract/archives/ArchivesInfo/detail/saveItem",
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
            this.dialogEdit = false;
            this.getData();
          }

        });
    },

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
      this.multipleSelection = val;
      this.editform.isShare = this.multipleSelection[0].isShare;
      this.editform.remarks = this.multipleSelection[0].remarks;
    },
    getData() {
      if(this.searchform.selectYears==="")
      {
        var date = new Date();
        this.searchform.selectYear = date.getFullYear();
      }else {
        var date = new Date(this.searchform.selectYears);
        this.searchform.selectYear = date.getFullYear()
      }

      // console.log(JSON.stringify(this.searchform));

      this.$http
        .post(
          '/api/contract/archives/ArchivesInfo/list/loadPageDataByAnalysis',
          this.searchform
        )
        .then(res => {
          this.page = res.data.data
          // console.log(this.searchform);
          // console.log(JSON.stringify(this.page));
        })
    },

  },
  created() {
    this.getData()
  },

}
</script>
<style scoped>
.gcform .el-form-item{
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
>>>.el-dialog__body{
  padding-top: 0px;
}
>>>.el-date-editor.el-input, .el-date-editor.el-input__inner
{
  width: 100%;
}
>>>.el-table td, .el-table th
{
  padding:5px 0px;
}
/* .el-button--primary.is-plain{
  width: 100%;
  text-align: center;
} */
>>>.analysis_btn{
  padding: 0px;
  width: 80% !important;
  text-align: center;
  height: 90% !important;
}

</style>
