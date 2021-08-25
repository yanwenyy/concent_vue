<template>
  <div class="searchListClass" style="margin-bottom: -50px;">
    <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
      <el-form-item label="项目名称:">
        <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="建设单位:">
        <el-input v-model="searchform.constructionOrg" placeholder="建设单位" clearable></el-input>
      </el-form-item> -->
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
        label="所属板块:"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="searchform.moduleId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in projectPlate"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="跟踪状态:">
       <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.trackStatus"
              >
                <el-option label="持续跟踪中" value="1"></el-option>
                <el-option label="放弃跟踪" value="2"></el-option>
                <el-option label="结束跟踪" value="3"></el-option>
                <el-option label="资审中" value="4"></el-option>
                <el-option label="资审通过待投标" value="5"></el-option>
                <el-option label="资审未通过" value="6"></el-option>
                <el-option label="投标中" value="7"></el-option>
                <el-option label="已开标" value="8"></el-option>
                <el-option label="中标未新签" value="9"></el-option>
                <el-option label="中标已新签" value="10"></el-option>
                <el-option label="未中标" value="11"></el-option>
                <el-option label="废标" value="12"></el-option>
                <el-option label="流标" value="13"></el-option>
                <el-option label="待跟踪" value="14"></el-option>
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
      <el-button @click="searchformReset" type="info" plain style="color:black;background:none;float:right; margin-right:20px;"><i class="el-icon-refresh-right"></i>重置</el-button>
      <el-button @click="exportdata" type="primary" plain style="float:right;margin-right:5px;"><i class="el-icon-top"></i>导出</el-button>
      <el-button @click="getData" type="primary" plain style="float:right"><i class="el-icon-search"></i>查询</el-button>
    </el-form>
    <div style="margin-top: 10px">
      <el-table
        class=""
        :data="page.records"
        :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        tooltip-effect="dark"
        :max-height="$tableHeight - 50"
        :height="$tableHeight - 50"
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
          label="所属线路"
          prop="belongLineName"
          show-overflow-tooltip
        >
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
             {{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核退回':'待登记'}}
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
        trackStatus:"",
        multipleSelection: [],
        xqprojectType:[],//工程二级列表
        projectStatus:[
          {
            detailName:"草稿",
            id:'edit'
          },
          {
            detailName:"审核中",
            id:'check'
          },
          {
            detailName:"审核通过",
            id:'pass'
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
      },
      projectPlate(){
        return this.$store.state.projectPlate;
      },
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
        this.searchform.size=1000000000;
        this.$http
          .post(
            "/api/contract/topInfo/TopInfor/list/loadPageDataForSelect",
            this.searchform
          )
          .then((res) => {
            this.searchform.size=20;
            var datas = res.data.data.records;
            this.$exportXls.exportList({
              thead:' <tr>\n' +
              '<th>项目名称</th>\n' +
              '<th>项目编码</th>\n' +
              '<th>项目板块</th>\n' +
              '<th>工程类别(一级)</th>\n' +
              '<th>工程类别(二级)</th>\n' +
              '<th>建设单位</th>\n' +
              '<th>所属线路</th>\n' +
              '<th>项目地点</th>\n' +
              '<th>公告类型</th>\n' +
              '<th>预计招标时间</th>\n' +
              '<th>跟踪状态</th>\n' +
              '<th>状态</th>\n' +
              '</tr>',
              jsonData:datas,
              tdstr:['inforName','inforCode','moduleName',
                'enginTypeFirstName','enginTypeSecondName','constructionOrg','belongLineName','placeName',
                'noticeTypeName','planBidTime','trackStatus','flowStatus'],
              tdstrFuc:{
                flowStatus:function (str) {
                  return str=='edit'?'草稿':str=='check'?'审核中':str=='pass'?'审核通过':str=='reject'?'审核退回':'待登记';
                },
                trackStatus:function(str){
                  return str==1?'持续跟踪中':str==2?'放弃跟踪':str==3?'结束跟踪':str==4?
                  '资审中':str==5?'资审通过待投标':str==6?'资审未通过':str==7?'投标中':
                  str==8?'已开标':str==9?'中标未新签':str==10?'中标已新签':str==11?'未中标':
                  str==12?'废标':str==13?'流标':'待跟踪'
                },
                planBidTime:function (str) {
                  return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
                },
                createTime:function (str) {
                  return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
                }
              }
            })
          });
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
