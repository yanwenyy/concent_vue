<template>
  <div class="searchListClass" style="margin-bottom: -50px;">
    <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
      <el-form-item label="审核通过时间:">
        <el-date-picker
          clearable
          v-model="searchform.createTime"
          type="daterange"
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
        <el-input v-model="searchform.createOrgName" placeholder="填报单位" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同名称:">
        <el-input v-model="searchform.contractName" placeholder="合同名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同编号:">
        <el-input v-model="searchform.contractCode" placeholder="合同编号" clearable></el-input>
      </el-form-item>
      <el-form-item
        label="项目性质(一级):"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          @change="getTwoXZ"
          size="mini"
          v-model="searchform.projectNatureFirstId"
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
          placeholder="请选择工程类别(二级)"
          size="mini"
          v-model="searchform.projectNatureSecondId"
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
          placeholder="请选择工程类别(二级)"
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
          v-model="searchform.marketFirstNameId"
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
        <el-input v-model="searchform.path" placeholder="主推单位" clearable @clear="searchform.contractMianOrg=''">
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
          v-model="searchform.changeStatus"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in ifBg"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="是否导入清单:"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="searchform.isImport"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in ifBg"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="是否公开招标:"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="searchform.isOpenBid"
        >
          <el-option
            label="是"
            value="1"
          ></el-option>
          <el-option
            label="否"
            value="0"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地点:">
        <el-input v-model="searchform.path" placeholder="地点" clearable @clear="clear('ffid','path')">
          <el-button slot="append" icon="el-icon-search"  @click="selectPosition()"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none;float:right; margin-right:20px;"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" style="float:right;margin-right:5px;" plain><i class="el-icon-search"></i>查询</el-button>
        <el-button @click="exportdata" type="primary" style="float:right;margin-right:5px;" plain><i class="el-icon-upload2"></i>导出</el-button>
      </el-form-item>
    </el-form>
    <div style="color:red;">
      总计{{titleInfo.mapTotal.total}}个合同（其中不含分包{{titleInfo.mapNotSub['COUNTNOTSUB']}}个，系统内分包{{titleInfo.mapSystemSub['COUNTSYSTEMSUB']}}个，集团内分包{{titleInfo.mapGroupSub['COUNTGROUPSUB']}}个）；
      我方份额总计{{titleInfo.mapTotal.totalAmount}}亿元（其中不含分包{{titleInfo.mapNotSub['SUMNOTSUB']}}亿元，系统内分包{{titleInfo.mapSystemSub['SUMSYSTEMSUB']}}亿元，集团内分包{{titleInfo.mapGroupSub['SUMGROUPSUB']}}亿元
    </div>
    <div style="margin-top: 10px">
      <el-table
        :max-height="$tableHeight-100"
        :height="$tableHeight-100"
        class=""
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
          :width="200"
          label="合同类型"
          prop="moduleName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="500"
          label="合同名称"
          prop="contractName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.contractName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="合同编号"
          prop="contractCode"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="合同总金额"
          prop="contractAmount"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="我方份额"
          prop="ourAmount"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="增值税"
          prop="valueAddedTax"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="建筑面积(平方米)"
          prop="contractBuiltArea"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="线路长度(千米)"
          prop="lineLength"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="我方份额(含补充)"
          prop="ourAmountSupply"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="工程行业类别一级"
          prop="enginTypeFirstName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="新兴市场(一级)"
          prop="marketFirstName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="新兴市场(二级)"
          prop="marketSecondName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="合同签订日期"
          prop="contractSignTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.contractSignTime | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="主地点"
          prop="placeName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="共同承揽单位已阅状态"
          prop="createOrgName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="签约单位(使用资质单位)"
          prop="signOrgName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="建设单位"
          prop="constructionOrg"
          show-overflow-tooltip
        >
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
          label="填报日期"
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
          label="填报人"
          prop="createUserName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="主推单位"
          prop="pushOrgName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="中标日期"
          prop="bidTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.bidTime | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="版本标识"
          prop="version"
          show-overflow-tooltip
        >
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>版本标识</span>-->
            <!--<div>-->
              <!--<el-input-->
                <!--class="list-search-picker"-->
                <!--style=" width: 100%"-->
                <!--v-model="searchFrom.version"-->
              <!--/>-->
            <!--</div>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="是否招标公示"
          prop="isOpenBid"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.isOpenBid==1?'是':scope.row.isOpenBid==0?'否':''}}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="推送合同项目性质"
          prop="isPushInsure"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.isPushInsure==1?'系统内联合体':scope.row.isPushInsure==2?'系统内分包':scope.row.isPushInsure==3?'系统外联合体':scope.row.isPushInsure==4?'系统外分包':scope.row.isPushInsure==5?'集团内分包':''}}
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
        titleInfo:{
          mapGroupSub: {COUNTGROUPSUB: null, SUMGROUPSUB: null},
          mapNotSub: {COUNTNOTSUB: null, SUMNOTSUB: null},
          mapSystemSub: {COUNTSYSTEMSUB: null, SUMSYSTEMSUB: null},
          mapTotal: { total: null, totalAmount: null}
        },
        dialogVisible:false,//弹框状态
        contractInfoId:"",//合同id
        treeStatas: false,
        DwVisible:false,//选择单位弹框状态
        page: {current: 1, size: 20, total: 0, records: []},
        searchform: {
          current: 1,
          size: 20,
          changeStatus:'0',
          projectNatureSecondId:'',
          enginTypeSecondId:''
        },
        moneyform:{
          contractInfoAdjustLogList:[],
          subStatus:true,
        },
        multipleSelection: [],
        xqprojectType:[],//工程二级列表
        projectNatureTwo:[],//项目性质二级
        projectStatus:[
          {
            id:'',
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
      // 查询数据
      this.$http.post("/api/contract/contract/ContractInfo/list/getContractInformation",).then((res)=>{
        this.titleInfo = res.data.data
      });
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

      clear(id,name){
        this.$forceUpdate();
        this.searchform[id]='';
        this.searchform[name]='';
      },
      //根据id跳页面
      getUrl(id){
        var url='';
        if(id=='7f4fcba4255b43a8babf15afd6c04a53'){
          url= '../project/detail/';
        }else if(id=='f6823a41e9354b81a1512155a5565aeb'){
          url= '../design/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7af6'){
          url=  '../house/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7af4'){
          url=  '../trade/detail/';
        }else if(id=='510ba0d79593418493eb1a11ed3e7df4'){
          url=  '../industrial/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7df4'){
          url=  '../finance/detail/';
        }else if(id=='510ba0d79593418493eb1a11ed4e7df4'){
          url=  '../operate/detail/';
        }else if(id=='510ba0d79593419493eb1a11ed3e7df4'){
          url=  '../other/detail/';
        }
        return url;
      },
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
        this.searchform.contractMianOrg=id.join(",");
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
        this.searchform.projectNatureSecondId='';
        this.projectNatureTwo=[];
        if(id!=''){
          this.projectNature.find(
            (item)=>{
            if (item.id == id) {
            this.searchform.projectNatureFirstName = item.detailName;
            this.projectNatureTwo = item.children;
          }
        }
        )
        }
      },
      exportdata() {
        this.searchform.size=1000000000;
        this.$http
          .post(
            "/api/contract/contract/ContractInfo/list/loadPageDataForContractInfoAdjust",
            this.searchform
          )
          .then((res) => {
            this.searchform.size=20;
            var datas = res.data.data.records;
            this.$exportXls.exportList({
              thead:' <tr>\n' +
              '<th>合同类型</th>\n' +
              '<th>合同名称</th>\n' +
              '<th>合同编号</th>\n' +
              '<th>合同总金额</th>\n' +
              '<th>我方份额</th>\n' +
              '<th>增值税</th>\n' +
              '<th>建筑面积(平方米)</th>\n' +
              '<th>线路长度(千米)</th>\n' +
              '<th>我方份额(含补充)</th>\n' +
              '<th>工程行业类别一级</th>\n' +
              '<th>新兴市场(一级)</th>\n' +
              '<th>新兴市场(二级)</th>\n' +
              '<th>合同签订日期</th>\n' +
              '<th>地点</th>\n' +
              '<th>共同承揽单位已阅状态</th>\n' +
              '<th>签约单位(使用资质单位)</th>\n' +
              '<th>建设单位</th>\n' +
              '<th>填报单位</th>\n' +
              '<th>填报日期</th>\n' +
              '<th>填报人</th>\n' +
              '<th>主推单位</th>\n' +
              '<th>中标日期</th>\n' +
              '<th>版本标识</th>\n' +
              '<th>是否招标公示</th>\n' +
              '</tr>',
              jsonData:datas,
              tdstr:['moduleName','contractName','contractCode','contractAmount',
                'ourAmount','valueAddedTax','contractBuiltArea','lineLength',
                'ourAmountSupply','enginTypeFirstName','marketFirstName','marketSecondName',
                'contractSignTime','placeName','createOrgName','signOrgName',
                'constructionOrg','createOrgName','createTime','createUserName',
                'pushOrgName','bidTime','version','isOpenBid',
              ],
              tdstrFuc:{
                isOpenBid:function (str) {
                  return str==1?'是':str==0?'否':'';
                },
                contractSignTime:function (str) {
                  return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
                },
                createTime:function (str) {
                  return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
                },
                bidTime:function (str) {
                  return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
                },
              }
            })
          });
      },
      // 查看
      rowshow(row) {
        var url=this.getUrl(row.moduleId);
        let p = {actpoint: "look", instid: row.uuid};
        this.$router.push({
          path: url,
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
          current: 1,
          size: 20,
          changeStatus:'0',
        }
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询
      getData() {
        if(this.searchform.createTime){
          this.searchform.beginTime=this.searchform.createTime[0];
          this.searchform.stopTime=this.searchform.createTime[1];
        }
        this.$http
          .post(
            "/api/contract/contract/ContractInfo/list/loadPageDataForContractInfoAdjust",
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
  .detailTable .el-input-group{
    margin-top: 5px !important;
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
