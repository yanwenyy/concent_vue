<template>
  <div>
    <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
      <el-form-item label="审核通过时间:">
        <el-date-picker
          clearable
          v-model="searchform.createTime"
          type="daterange"
          @change="searchform.selectTimeType='01',searchform.planBidTime=''"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同类型:">
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
      <el-form-item label="填报单位:">
        <el-input v-model="searchform.constructionOrg" placeholder="填报单位" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同名称:">
        <el-input v-model="searchform.designOrg" placeholder="合同名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同编号:">
        <el-input v-model="searchform.inforName" placeholder="合同编号" clearable></el-input>
      </el-form-item>
      <el-form-item
        label="项目性质(一级):"
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
            v-for="(item, index) in projectNature"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="项目性质(二级):"
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
            v-for="(item, index) in projectNatureTwo"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="合同状态:"
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
            v-for="(item, index) in projectStatus"
          ></el-option>
        </el-select>
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
        label="新兴市场(一级):"
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
            v-for="(item, index) in emergingMarket"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="主推单位:"
      >
        <el-input v-model="searchform.path" placeholder="主推单位" clearable @clear="searchform.ffid=''">
          <el-button slot="append" icon="el-icon-search"  @click="addDw('主推单位',searchform.contractMianOrg)"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item
        label="是否变更:"
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
            v-for="(item, index) in ifBg"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地点:">
        <el-input v-model="searchform.path" placeholder="地点" clearable @clear="searchform.ffid=''">
          <el-button slot="append" icon="el-icon-search"  @click="selectPosition()"></el-button>
        </el-input>
      </el-form-item>
      <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
      <el-button @click="getData" type="primary" plain>查询</el-button>
      <el-button @click="exportdata" type="primary" plain>导出</el-button>
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
        stripe
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
          :width="200"
          label="合同类型"
          prop="inforName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="500"
          label="合同名称"
          prop="inforName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :resizable="false"
          label="操作"
          show-overflow-tooltip
          width="150"
        >
          <template slot-scope="scope">
            <el-link :underline="false" type="warning">金额调整</el-link>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="是否包含调整"
          prop="enginTypeSecondName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="最后一次操作时间"
          prop="planBidTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.planBidTime | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="合同总金额"
          prop="constructionOrg"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="我方份额"
          prop="noticeTypeName"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="增值税"
          prop="placeName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报单位"
          prop="flowStatus"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报日期"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.createTime | dateformat
            }}</template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :current-page="page.current"
      :page-size="page.size"
      :page-sizes="[10, 50, 100]"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import CompanyTree from '../companyTree'
  export default {
    // inject:['reload'],
    components: {
      Tree,
      CompanyTree,
    },
    data() {
      return {
        treeStatas: false,
        DwVisible:false,//选择单位弹框状态
        page: {current: 1, size: 10, total: 0, records: []},
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
          createTime:'',
          planBidTime:'',
          path:'',
          selectTimeType:'',
          beginTime:"",
          endTime:'',
        },
        multipleSelection: [],
        xqprojectType:[],//工程二级列表
        projectNatureTwo:[],//项目性质二级
        projectStatus:[
          {
            id:'1',
            detailName:'全部'
          },
          {
            id:'1',
            detailName:'未提交'
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
        ifBg:[
          {
            id:'1',
            detailName:'否'
          },
          {
            id:'0',
            detailName:'是'
          },
        ],//是否变更
      };
    },
    mounted() {
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
    },
    computed: {
      projectDomainType() {
        // console.log(this.$store.state.category["projectDomainType"])
        return this.$store.state.category.projectDomainType;
      },
      projectNature() {
        // console.log(this.$store.state.category["projectDomainType"])
        return this.$store.state.category.projectNature;
      },
      emergingMarket() {
        // console.log(this.$store.state.category["projectDomainType"])
        return this.$store.state.category.emergingMarket;
      },
      projectPlate(){
        return this.$store.state.projectPlate;//合同类型
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
      //打开单位弹框
      addDw(type,list){
        this.DwVisible = true;
        this.$nextTick(() => {
          this.$refs.infoDw.init(type,list);
      })
      },
      //获取单位的值
      getDwInfo(data){
        console.log(data);
        var id=[],name=[];
        if(data){
          data.forEach((item)=>{
            id.push(item.id);
          name.push(item.detailName);
        })
        }
        this.searchform.ffid=id.join(",");
        this.searchform.path=name.join(",");
        this.DwVisible=false;
      },
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
      //项目性质二级
      getTwoXZ(id){
        this.detailform.topInfor.projectNatureSecondId='';
        this.projectNatureTwo=[];
        if(id!=''){
          this.projectNature.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.topInfor.projectNatureFirstName = item.detailName;
            this.projectNatureTwo = item.children;
          }
        }
        )
        }
      },
      exportdata() {
      },
      // 查看
      rowshow(row) {
        let p = {actpoint: "look", instid: row.topOrgId};
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
        console.log(this.searchform.selectTimeType)
        if(this.searchform.selectTimeType=='01'&&this.searchform.createTime){
          this.searchform.beginTime=this.searchform.createTime[0];
          this.searchform.endTime=this.searchform.createTime[1];
        }else if(this.searchform.selectTimeType=='02'&&this.searchform.planBidTime){
          this.searchform.beginTime=this.searchform.planBidTime[0];
          this.searchform.endTime=this.searchform.planBidTime[1];
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
