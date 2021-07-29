<template>
  <div class="searchListClass">
    <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
      <el-form-item label="项目名称:">
        <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="建设单位:">
        <el-input v-model="searchform.constructionOrg" placeholder="建设单位" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="设计单位:">
        <el-input v-model="searchform.designOrg" placeholder="设计单位" clearable></el-input>
      </el-form-item> -->
      <!--<el-form-item label="创建日期:">-->
        <!--<el-date-picker-->
          <!--clearable-->
          <!--v-model="searchform.createTime"-->
          <!--type="daterange"-->
          <!--@change="searchform.selectTimeType='01',searchform.planBidTime=''"-->
          <!--value-format="timestamp"-->
          <!--range-separator="至"-->
          <!--start-placeholder="开始日期"-->
          <!--end-placeholder="结束日期">-->
        <!--</el-date-picker>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="预计招标日期:">-->
        <!--<el-date-picker-->
          <!--clearable-->
          <!--v-model="searchform.planBidTime"-->
          <!--type="daterange"-->
          <!--@change="searchform.selectTimeType='02',searchform.createTime=''"-->
          <!--value-format="timestamp"-->
          <!--range-separator="至"-->
          <!--start-placeholder="开始日期"-->
          <!--end-placeholder="结束日期">-->
        <!--</el-date-picker>-->
      <!--</el-form-item> -->
      <!-- <el-form-item label="创建日期开始:">
        <el-date-picker
          clearable
          v-model="searchform.createTimeStart"
          type="date"
          @change="searchform.selectTimeType='01',searchform.planBidTimeStart='',searchform.planBidTimeEnd=''"
          value-format="timestamp">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="创建日期结束:">
        <el-date-picker
          clearable
          v-model="searchform.createTimeEnd"
          type="date"
          @change="searchform.selectTimeType='01',searchform.planBidTimeStart='',searchform.planBidTimeEnd=''"
          value-format="timestamp">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="预计招标日期开始:">
        <el-date-picker
          clearable
          v-model="searchform.planBidTimeStart"
          type="date"
          @change="searchform.selectTimeType='02',searchform.createTimeStart='',searchform.createTimeEnd=''"
          value-format="timestamp">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预计招标日期结束:">
        <el-date-picker
          clearable
          v-model="searchform.planBidTimeEnd"
          type="date"
          @change="searchform.selectTimeType='02',searchform.createTimeStart='',searchform.createTimeEnd=''"
          value-format="timestamp">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="预计招标时间:">
        <el-date-picker
          clearable
          v-model="searchform.planBidTime"
          type="date"
          @change="searchform.selectTimeType='02'"
          value-format="timestamp">
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
          placeholder="请选择工程类别(一级)"
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
        label="公告类型:"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="searchform.noticeTypeId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in bulletinType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="所属线路:"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="searchform.belongLineId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in railwayLine"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="项目状态:"
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
        <el-input v-model="searchform.path" placeholder="项目地点" clearable @clear="searchform.ffid=''">
          <el-button slot="append" icon="el-icon-search"  @click="selectPosition()"></el-button>
        </el-input>
      </el-form-item>
      <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
      <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
      <!--<el-button @click="exportdata" type="primary" plain><i class="el-icon-top"></i>导出</el-button>-->
    </el-form>
    <div style="margin-top: 10px">
      <el-table
        :max-height="$tableHeight"
        class="tableStyle"
        :data="page.records"
        :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
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
        ></el-table-column>
        <el-table-column
          :width="500"
          label="项目名称"
          prop="inforName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          label="项目编码"
          prop="inforCode"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          label="项目板块"
          prop="moduleName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程类别（一级）"
          prop="enginTypeFirstName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程类别（二级）"
          prop="enginTypeSecondName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="建设单位"
          prop="constructionOrg"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="公告类型"
          prop="noticeTypeName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="预计招标时间"
          prop="planBidTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.planBidTime | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="项目地点"
          prop="placeName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="项目状态"
          prop="flowStatus"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'审核通过':scope.row.flowStatus==4?'审核退回':'待登记'}}
          </template>
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="跟踪通过时间"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.createTime | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="跟踪状态"
          prop="trackStatus"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.trackStatus==1?'持续跟踪中':scope.row.trackStatus==2?'放弃跟踪':scope.row.trackStatus==3?'结束跟踪':scope.row.trackStatus==4?'资审中':scope.row.trackStatus==5?'资审通过待投标':scope.row.trackStatus==6?'资审未通过':scope.row.trackStatus==7?'投标中':scope.row.trackStatus==8?'已开标':scope.row.trackStatus==9?'中标未新签':scope.row.trackStatus==10?'中标已新签':scope.row.trackStatus==11?'未中标':scope.row.trackStatus==12?'废标':scope.row.trackStatus==13?'流标':'待跟踪'}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :current-page="page.current"
      :page-size="page.size"
      :page-sizes="[20, 50, 100]"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  export default {
    // inject:['reload'],
    components: {
      Tree
    },
    data() {
      return {
        treeStatas: false,
        page: {current: 1, size: 20, total: 0, records: []},
        searchform: {
          current: 1,
          size: 20,
          inforName: "",
          enginTypeFirstId: "",
          enginTypeSecondId: "",
          constructionOrg: "",
          noticeTypeId: "",
          belongLineId: "",
          designOrg:"",
          ffid:'',
          flowStatus:'',
          createTime:'',
          planBidTime:'',
          path:'',
          selectTimeType:'',
          beginTime:"",
          endTime:'',
          createTimeStart:"",
          createTimeEnd:"",
          planBidTimeStart:"",
          planBidTimeEnd:"",
          planBidTime:""
        },
        multipleSelection: [],
        xqprojectType:[],//工程二级列表
        projectStatus:[
          {
            id:'1',
            detailName:'草稿'
          },
          {
            id:'2',
            detailName:'审核中'
          },
          {
            id:'3',
            detailName:'审核通过'
          }
        ],//项目状态列表
      };
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
      //获取项目地点的值
      getPositionTree(data) {
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
        let p = {from:'searchlist',actpoint: "look", instid: row.uuid};
        this.$router.push({
          path: "./importDetail/",
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
          path: "../importDetail/",
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
          current: 1,
          size: 20,
          inforName: "",
          enginTypeFirstId: "",
          enginTypeSecondId: "",
          constructionOrg: "",
          noticeTypeId: "",
          belongLineId: "",
          designOrg:"",
          ffid:'',
          flowStatus:'',
          createTime:'',
          planBidTime:'',
          path:'',
          selectTimeType:'',
          beginTime:"",
          endTime:'',
        }
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询
      getData() {
        // console.log(this.searchform.selectTimeType)
        // if(this.searchform.selectTimeType=='01'&&this.searchform.createTime){
        //   this.searchform.beginTime=this.searchform.createTime[0];
        //   this.searchform.endTime=this.searchform.createTime[1];
        // }else if(this.searchform.selectTimeType=='02'&&this.searchform.planBidTime){
        //   this.searchform.beginTime=this.searchform.planBidTime[0];
        //   this.searchform.endTime=this.searchform.planBidTime[1];
        // }else{
        //   this.searchform.selectTimeType='';
        //   this.searchform.beginTime=null;
        //   this.searchform.endTime=null;
        // }
        if(this.searchform.selectTimeType=='01'){
          this.searchform.beginTime=this.searchform.createTimeStart;
          this.searchform.endTime=this.searchform.createTimeEnd;
        }else if(this.searchform.selectTimeType=='02'){
          this.searchform.beginTime=this.searchform.planBidTimeStart;
          this.searchform.endTime=this.searchform.planBidTimeEnd;
        }else{
          this.searchform.selectTimeType='';
          this.searchform.beginTime=null;
          this.searchform.endTime=null;
        }
        this.$http
          .post(
            "/api/contract/topInfo/TopInfor/list/loadPageDataForSelect",
            this.searchform
          )
          .then((res)=>{
            this.page = res.data.data;
      });
      },

    },
    created() {
      this.getData();
    },
  };
</script>
<style scoped>
  .queryForm>.el-button{
    margin-top: 5px;
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
