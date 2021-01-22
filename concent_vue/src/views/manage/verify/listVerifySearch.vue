<!--资审结果操作列表-->
<template>
  <div>
    <el-form :inline="true" :model="searchform" @keyup.enter.native="getData()" class="queryForm">

      <el-form-item label="项目名称:">
        <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="建设单位:">
        <el-input v-model="searchform.constructionOrg" placeholder="建设单位" clearable></el-input>
      </el-form-item>

      <el-form-item label="资审截止日期:">
        <el-date-picker
          v-model="searchform.saleTime"
          type="daterange"
          @change="searchform.selectTimeTypeSaleTime='01'"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="工程类别(一级):"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          @change="getTwo"
          size="mini"
          v-model="searchform.enginTypeFirstId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in projectDomainType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="工程类别(二级):"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="searchform.enginTypeSecondId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in xqprojectType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="招标代理机构:"
      >
        <el-input v-model="searchform.bidAgentCompany" placeholder="招标代理机构" clearable></el-input>
      </el-form-item>
      <el-form-item
        label="标段名称:"
      >
        <el-input v-model="searchform.sectionName" placeholder="标段名称" clearable></el-input>
      </el-form-item>
      <el-form-item
        label="资审状态:"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="searchform.flowStatus"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in projectStatus"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目地点:">
        <el-input v-model="searchform.path" placeholder="项目地点">
          <el-button slot="append" icon="el-icon-search"  @click="selectPosition()"></el-button>
        </el-input>
      </el-form-item>
        <el-form-item label="登记时间:">
          <el-date-picker
            v-model="searchform.createTime"
            @change="searchform.selectTimeTypeCreateTime='01'"
            type="daterange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
<!--        <el-form-item-->
<!--          label="录入单位:"-->
<!--        >-->
<!--          <el-select-->
<!--            clearable-->
<!--            filterable-->
<!--            placeholder="请选择"-->
<!--            size="mini"-->
<!--            v-model="searchform.flowStatus"-->
<!--          >-->
<!--            <el-option-->
<!--              :key="index"-->
<!--              :label="item.detailName"-->
<!--              :value="item.id"-->
<!--              v-for="(item, index) in projectStatus"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
      <el-button @click="getData" type="primary" plain>查询</el-button>
      <el-button @click="exportdata" type="primary" plain>导出</el-button>
      <el-button @click="verifyResultEdit" plain type="primary">资审结果登记查看</el-button>


    </el-form>
<div style="margin-top: 10px">
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
          label="标段名称"
          prop="sectionName"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.sectionName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="300"
          label="项目名称"
          prop="inforName"
          show-overflow-tooltip
        >


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

          <template slot-scope="scope" :value-format="timestamp">
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
          <template slot-scope="scope">
            {{scope.row.createTime | dateformat}}
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
<div   class="mydialog">
    <el-dialog title="资审结果登记查看" :visible.sync="dialogResult"
             >
      <el-form :model="resultform.verifySection" class="queryForm">
        <el-form-item label="资格预审结果"   prop="verifyResult">
         <el-switch
           disabled
           active-text="通过"
           v-model="resultform.verifySection.verifyResult"
           active-value="true"
           inactive-value="false"
         >
            </el-switch>
        </el-form-item>
        <el-form-item label="通过时间"  prop="verifyResultTime">
          <el-date-picker
            disabled
            value-format="timestamp"
            v-model="resultform.verifySection.verifyResultTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <div>
      <el-table
        :data="resultform.commonFilesList"
        :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
        align="center"
        border
        class="contractInfoTable"
        ref="table"
        style="width: 100%;height: auto;"
      >
                <el-table-column
                  :width="55"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column :resizable="false"
                                 label="文件名"
                                 prop="fileName"
                                 show-overflow-tooltip>

                </el-table-column>

                <el-table-column :resizable="false"
                                 label="大小"
                                 align="center"
                                 prop="fileSize"
                                 :width="120"
                                 show-overflow-tooltip>

                </el-table-column>
                <el-table-column :resizable="false"
                                 label="类型"
                                 :width="80"
                                 prop="fileType"
                                 show-overflow-tooltip>

                </el-table-column>

              </el-table>

    </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResult = false">取 消</el-button>
        <el-button type="primary" @click="saveVerifyResult">确 定</el-button>
      </div>
    </el-dialog>
    </div>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  export default {
  name: "proposal-list-look",
    components: {
      Tree
    },
  data() {
    return {
      treeStatas: false,
      dialogResult:false,
      page: { current: 1, size: 10, total: 0, records: [] },
      searchform: {
        inforName: "",
        enginTypeFirstId: "",
        enginTypeSecondId: "",
        constructionOrg: "",
        noticeTypeId: "",
        belongLineId: "",
        designOrg:"",
        ffid:'',
        flowStatus:'',
        saleTime:'',
        createTime:'',
        planBidTime:'',
        bidAgentCompany:'',
        sectionName:'',
        path:'',
        selectTimeTypeSaleTime:'',
        saleTimeBeginTime:"",
        saleTimeEndTime:'',
        selectTimeTypeCreateTime:'',
        createTimeBeginTime:"",
        createTimeEndTime:''
      },
      multipleSelection: [],
      xqprojectType:[],//工程二级列表

      projectStatus:[
        {
          id:'0',
          detailName:'草稿'
        },
        {
          id:'1',
          detailName:'审核中'
        },
        {
          id:'2',
          detailName:'审核通过'
        }
      ],//项目状态列表
      formLabelWidth: '120px',
      resultform:{
        verifySection:{
          uuid:'',
          verifyId:'',
          sectionId:'',
          investmentReckon:'',
          jananInvestment:'',
          verifyResult:'1',
          verifyResultTime:'2020-12-18'
        },
        commonFilesList:[]
      },
    }
  },
  mounted() {
    this.$store.dispatch("getConfig", {});
    this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
  },
  computed: {
    projectDomainType() {
      // console.log(this.$store.state.category["projectDomainType"])
      return this.$store.state.category.projectDomainType;
    },
    bulletinType() {
      return this.$store.state.bulletinType;
    },
    probability() {
      return this.$store.state.probability;
    },
    railwayLine(){
      return this.$store.state.railwayLine;
    }
  },
  methods: {
    saveVerifyResult() {
      this.dialogResult = false

    },
    verifyResultEdit() {
      if (this.multipleSelection.length > 0) {
        this.dialogResult = true;
        console.log(this.multipleSelection[0].verifySectionId)
        this.$http
          .post(
            '/api/contract/topInfo/Verify/detail/entitySectionInfo',
            {"id":this.multipleSelection[0].verifySectionId}
          )
          .then(res => {
            this.resultform = res.data.data
            console.log(JSON.stringify(this.resultform))
            //this.getData();
          })

      } else {
        this.$message.info("请选择列表中的项目！");
      }
    },
    //获取项目地点的值
    getPositionTree(data) {
      //alert(1);
      console.log(data)
      this.treeStatas = false;
      this.searchform.ffid=data.fullDetailCode;
      this.searchform.path=data.fullDetailName;
      this.key = this.key + 1;
    },
    //选择项目地点
    selectPosition() {
      this.treeStatas = true;
      console.log(this.positionIndex);
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    //工程类别二级
    getTwo(id) {
      this.searchform.enginTypeSecondId='';
      this.xqprojectType =[];
      if(id!=''){
        this.projectDomainType.find(
          (item) => {
            if (item.id == id) {
              this.xqprojectType = item.children;
            }
          }
        )
      }
    },
    exportdata() {
    },
    // 查看
    rowshow(row) {

      console.log(JSON.stringify(row));
      // if (row.uuid != null) {
      //   this.$message.info("当前登记的项目信息已经添加的资审信息！");
      //   return;
      // }
      let p = {actpoint: "look", instid: row.inforid, topinfoid: row.tiouuid};
      this.$router.push({
        path: "./detail/",
        query: {p: this.$utils.encrypt(JSON.stringify(p))},
      });
    },
    // 展示
    show() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info("请选择一条记录进行查看操作！");
        return false;
      }
      let p = {actpoint: "look", instid: this.multipleSelection[0].uuid};
      this.$router.push({
        path: "../detail/",
        query: {p: this.$utils.encrypt(JSON.stringify(p))},
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
      this.searchform={
        inforName: "",
        enginTypeFirstId: "",
        enginTypeSecondId: "",
        constructionOrg: "",
        noticeTypeId: "",
        belongLineId: "",
        designOrg:"",
        ffid:'',
        flowStatus:'',
        saleTime:'',
        createTime:'',
        bidAgentCompany:'',
        sectionName:'',
        selectTimeTypeSaleTime:'',
        saleTimeBeginTime:"",
        saleTimeEndTime:'',
        selectTimeTypeCreateTime:'',
        createTimeBeginTime:"",
        createTimeEndTime:'',
      }
      this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 查询
    getData() {
      if(this.searchform.selectTimeTypeSaleTime=='01'){
        this.searchform.saleTimeBeginTime=this.searchform.saleTime[0];
        this.searchform.saleTimeEndTime=this.searchform.saleTime[1];
      }
      if(this.searchform.selectTimeTypeCreateTime=='01'){
        this.searchform.createTimeBeginTime=this.searchform.createTime[0];
        this.searchform.createTimeEndTime=this.searchform.createTime[1];
      }
      // this.searchform.createTime=null;
      // this.searchform.saleTime=null;

      console.log(this.searchform)
      this.$http
        .post(
          "/api/contract/topInfo/Verify/list/loadPageDataForFlowStatus",
          this.searchform
        )
        .then((res)=>{
          this.page = res.data.data;
          console.log(this.page)
        });
    }

  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
>>>.el-form-item__label{
  width: auto;
}
.el-table__row {
  cursor: pointer;
}
>>>.el-table td, .el-table th
{
  padding:5px 0px;
}
>>>.el-form-item__label{
  width: auto;
}
>>>.el-upload-list{
  display: none;
}
>>>.el-table td, .el-table th
{
  padding:5px 0px;
}
>>>.el-form-item__label{
  width: auto;
}
>>>.el-input--mini .el-input__inner{
  height: auto;
  line-height: inherit;
}
>.el-form-item {
  width: auto;
  margin-bottom: 5px !important;
  display: inline-block;
}
.item_zbj{
  width: 40%;
  display: inline-block;
  padding-right: 9%;
}
.el-dialog{
  width: 60%;
}
.el-table__row {
  cursor: pointer;
}
.mydialog .el-dialog{
  width: 70%!important;
  /* overflow: auto; */
}
.mydialog >>>.el-dialog__body{
  height: 500px;
  overflow: auto;
}
>>>.el-form-item__label{
  width: auto;
}
>>>.el-dialog__body{
  padding-top: 0px;
}
.mydialog >>>.el-form-item {
  width: auto;
  margin-bottom: 5px !important;
  display: inline-block;
  width: 32.5% !important;
}
.mydialog >>>.el-form-item__label:before {
  position: initial;
  left: -10px;
}
</style>
