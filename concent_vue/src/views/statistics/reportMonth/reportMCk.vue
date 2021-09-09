<!--工程月报-项目部月报-项目部月报查看-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
        <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="init()">
          <!--<el-form-item label="上报年月起:">-->
            <!--<el-date-picker-->
              <!--type="month"-->
              <!--value-format="yyyy-MM"-->
              <!--v-model="searchform.yearDateS"-->
              <!--placeholder="选择月">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="上报年月止:">-->
            <!--<el-date-picker-->
              <!--v-model="searchform.yearDatesEnd"-->
              <!--type="month"-->
              <!--value-format="yyyy-MM"-->
              <!--placeholder="选择月">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <el-form-item label="上报年月起:">
            <el-date-picker
              type="month"
              value-format="yyyy-MM"
              v-model="searchform.beginDate"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="上报年月止:">
            <el-date-picker
              v-model="searchform.fullDate"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="只看当月:">
            <el-checkbox v-model="searchform.isCk" true-label="1"></el-checkbox>
          </el-form-item>
          <el-form-item label="统计项名称:">
            <el-input v-model="searchform.tjxName" placeholder="统计项名称" clearable @clear="searchform.tjxCode=''">
              <el-button slot="append" icon="el-icon-search"  @click="openStatisticalTree('统计项名称',searchform.tjxCode)"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="可选择单位:">
            <el-input v-model="searchform.createOrgName" placeholder="可选择单位" clearable @clear="searchform.createOrgCode=''">
              <el-button slot="append" icon="el-icon-search"  @click="addDw('可选择单位','',false)"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="项目类型:">
             <el-select  placeholder="请选择" v-model="searchform.projectTypeCode">
               <el-option value="017001,017003" label="局指+自揽"></el-option>
               <el-option value="017002,017003" label="局指子+自揽"></el-option>
             </el-select>
          </el-form-item>
          <el-button
            @click="searchformReset"
            type="info"
            plain
            style="color:black;background:none">
            <i class="el-icon-refresh-right"></i> 重置
          </el-button>
          <el-button @click="searchformSubmit" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
          <el-button @click="getMx" type="primary" plain><i class="el-icon-search"></i>台账明细</el-button>
          <el-button @click="batchBack" type="primary" plain>批量退回</el-button>
        </el-form>
    </div>
    <div>
      <span>{{page.title[0].beginDate+"至"+page.title[0].fullDate+"月报:"}}</span>
      <span class="title-span" v-for="item in page.title">{{item.tjxName+":"+item.monthValue}}</span>
    </div>
    <div style="margin-top: 10px">
      <el-table
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="page.page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke'
        }"
        @row-dblclick="rowShow"
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
        <el-table-column label="projectId" align="center" prop="projectId" v-if="false" />
        <el-table-column label="projectreportuuid" align="center" prop="projectreportuuid" v-if="false" />
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>
        <el-table-column
          :min-width="200"
          align="center"
          label="项目简称"
          prop="projectOmit"
          show-overflow-tooltip

        >
          <template slot="header" slot-scope="scope">
            <span>项目简称</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.projectOmit" size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.projectOmit
            }}</template>

        </el-table-column>
        <el-table-column
          :min-width="200"
          align="center"
          label="项目名称"
          prop="projectName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>项目名称</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.projectName" size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.projectName
            }}</template>
        </el-table-column>
        <el-table-column
          :min-width="450"
          align="center"
          label="上报年月"
          prop="yearDateS"
          show-overflow-tooltip
        >
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>上报年月</span>-->
            <!--<div class="block">-->
              <!--<el-date-picker-->
                <!--v-model="setTimes"-->
                <!--class="list-search-picker"-->
                <!--type="monthrange"-->
                <!--format="yyyy-MM"-->
                <!--value-format="yyyy-MM"-->
                <!--range-separator="至"-->
                <!--start-placeholder="开始日期"-->
                <!--end-placeholder="结束日期">-->
              <!--</el-date-picker>-->
            <!--</div>-->
          <!--</template>-->
          <template slot-scope="scope">{{
            scope.row.reportYear+"-"+scope.row.reportMonth
            }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="工程合同额(万元)"
          prop="contractAmountTotal"
          show-overflow-tooltip
        >
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>工程合同额(万元)</span>-->
            <!--<div>-->
              <!--<el-input style=" width: 100%" v-model="searchform.contractAmountEngine" size="mini"/>-->
            <!--</div>-->
          <!--</template>-->
          <template slot-scope="scope">{{
            scope.row.contractAmountEngine
            }}</template>
        </el-table-column>
        <template v-for="(item,s) in headerList">
          <el-table-column

            :key="Math.random()"
            :width="150"
            align="center"
            show-overflow-tooltip
          >
            <template slot="header" slot-scope="scope">
              <span>{{ item.name+'本月'}}</span>
            </template>
            <template slot-scope="scope">
              <span v-for="vtem in scope.row.monthStrList" v-if="vtem.name==item.name">{{vtem.val||0}}</span>
            </template>
          </el-table-column>
          <el-table-column

            :key="Math.random()"
            :width="150"
            align="center"
            show-overflow-tooltip
          >
            <template slot="header" slot-scope="scope">
              <span>{{ item.name+'本年'}}</span>
            </template>
            <template slot-scope="scope">
              <span v-for="vtem in scope.row.yearStrList" v-if="vtem.name==item.name">{{vtem.val||0}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="Math.random()"
            :width="150"
            align="center"
            show-overflow-tooltip
          >
            <template slot="header" slot-scope="scope">
              <span>{{ item.name+'开累'}}</span>
            </template>
            <template slot-scope="scope">
              <span v-for="vtem in scope.row.totalStrList" v-if="vtem.name==item.name">{{vtem.val||0}}</span>
            </template>
          </el-table-column>
        </template>


        <el-table-column
          :width="150"
          align="center"
          label="所属单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>所属单位</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.createOrgName" size="mini"/>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.createOrgName
            }}</template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="剩余工程合同额"
          prop="htquantity"
          show-overflow-tooltip
        >
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>剩余工程合同额</span>-->
            <!--<div>-->
              <!--<el-input style=" width: 100%" v-model="searchform.htquantity" size="mini"/>-->
            <!--</div>-->
          <!--</template>-->
          <template slot-scope="scope">
            <span v-if="scope.row.contractAmountEngine">{{scope.row.contractAmountEngine-(scope.row.totalValue||0)}}</span>
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
        style="margin-top: 5px"
        v-if="page.total !== 0"
      ></el-pagination>
    </div>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <State ref="stateUpdate" :data="projectStatus" @resetState="getData"></State>
    <Statistcal-tree v-if="statistStatus"  ref="statistUpdate" @getStatistical="getStatisticalTree"></Statistcal-tree>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import State from '@/components/state'
  import StatistcalTree from '@/components/statisticalTree'
  import CompanyTree from '../companyTree'

  export default {
    name: 'proposal-list-look',
    components: {
      Tree, State,StatistcalTree,CompanyTree
    },
    data() {
      return {
        p:{},
        DwVisible:false,//选择单位弹框状态
        statistStatus:false,//选择统计项状态
        userdata:{},
        setTimes:[],
        treeStatas: false,
        page: { current: 1, size: 20, total: 0, records: [] },
        headerList:[{name:'施工产值'}],
        tjxNameList:[],//选择的统计项数组
        searchform: {
          createOrgName:'',
          createOrgCode:'',
          tjxCode:'001001',
          tjxName:'',
          beginDate:"",
          fullDate:'',
          isCk:"1",
          projectTypeCode:'',
          current: 1,
          size: 20,
          createOrgId: '',
          createOrgType: '',
          createTime: '',
          createUserId: '',
          createUserName: '',
          totalValue:'',
          yearValue:'',
          monthValue:'',
          contractAmountTotal:'',
          projectStatusName:'',
          projectName:'',
          projectOmit:'',
          projectId:'',
          projectreportuuid:'',
          htquantity:'',
          reportYear:'',
          reportMonth:'',
          yearDatesEnd:'',
          yearDateS:''
        },
        menus: [],
        multipleSelection: [],
        orgTree: []
      }
    },
    computed: {
      projectDomainType() {
        return this.$store.state.category.projectDomainType
      },
      projectNature() {
        return this.$store.state.category.projectNature
      },
      projectType() {
        return this.$store.state.projectType
      },
      projectStatus() {
        return this.$store.state.projectStatus
      }
    },
    methods: {
      //批量退回
      batchBack(){
        if (this.multipleSelection.length <1) {
          this.$message.info("请选择一条记录进行提交操作！");
          return false;
        }
        var list=[],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.flowStatus=='pass'){
            list.push(item);
          }else{
            this.$message.info("当前所选数据中包含不可退回的选项,请检查后进行操作");
            return itemStatus=false;
          }
        })
        if(itemStatus){
          this.$confirm(`确认退回这些数据吗`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                "/api/statistics/projectMonthlyReport/Projectreport/process/complete/back",
                JSON.stringify(list),
                {useJson: true}

              )
              .then((res) => {
                if(res.data.code==200){
                  this.$message({
                    message: "操作成功",
                    type: "success",
                  });
                  this.getData()
                }else{
                  this.$message.error(res.data.msg);
                }

              });
          }).catch(() => {})
        }
      },
      //处理选择的统计项数组
      setTjxList(strs){
        var list=[],strList=strs.split(",");
        if(this.tjxNameList.length==0){
          var _s=strList[0].split("@");
          list.push({
            name:'施工产值',
            code:_s[0],
            val:_s[1]
          })
        }else{
          strList.forEach((item)=>{
            var _s=item.split("@");
            this.tjxNameList.forEach((vtem)=>{
              var _tjxS=vtem.split("@");
              if(_s[0]===_tjxS[0]){
                var v={
                  name:_tjxS[1],
                  code:_s[0],
                  val:_s[1]
                };
                // 如果数组里面本身不存在这个对象则把这个加进去
                if(JSON.stringify(list).indexOf(JSON.stringify(v))===-1){
                  list.push(v);
                }
              }
            });
          })
        }
        return list;
      },
      //查看台账明细
      getMx(){
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        this.openStatisticalTree('台账明细');
      },
      //打开单位弹框
      addDw(type,list,ifChek,index,tableList){
        this.DwVisible = true;
        this.$nextTick(() => {
          this.$refs.infoDw.init(type,list,ifChek,index,tableList);
        })
      },
      //获取单位的值
      getDwInfo(data){
        this.$forceUpdate();
        if(data.type=="可选择单位"){
          this.searchform.createOrgCode=data.id;
          this.searchform.createOrgName=data.name;
        }
        this.DwVisible=false;
      },
      //打开统计项选择
      openStatisticalTree(type,list){
        this.statistStatus = true;
        this.$nextTick(() => {
          this.$refs.statistUpdate.init(type,list)
        })
      },
      //获取选中的统计项
      getStatisticalTree(data){
        // console.log(data)
        var name=[],code=[];
        this.headerList=[];
        if(data.length>3){
          this.$message.error("最多选择三条统计项");
          return false;
        }
        data.forEach((item)=>{
          name.push(item.vname);
          code.push(item.vcode);
          this.tjxNameList.push(item.vcode+"@"+item.vname);
          this.headerList.push({name:item.vname})
        });
        if(data.type=='统计项名称'){
          this.searchform.tjxCode=code.join(",");
          this.searchform.tjxName=name.join(",");
          this.getData();
        }else if(data.type=='台账明细'){
          this.$router.push({
            path: "../../reportForm/list",
            query: {resid: 'Iff808081017b151a151ad6a4017b28c9544e281d','项目ID':this.multipleSelection[0].projectId,'台账报表用统计项参数':code.join(","),'台账报表用月报年月':this.searchform.fullDate},
          });
        }

      },
      // 选中查看
      show() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info('请选择一条记录进行查看操作!')
          return false
        }
        let p = { actpoint: 'look', uuid: this.multipleSelection[0].uuid }
        this.$router.push({
          path: '',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
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
      getdatatime(){//默认显示今天
        var date = new Date();
        var y = date.getFullYear();
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var time=y + '-' + m;
        this.searchform.yearDateS= time;
        this.searchform.beginDate=(y-1)+'-'+m;
        this.searchform.fullDate= time;
      },
      searchformReset() {

        this.searchform = {
          createOrgName:'',
          createOrgCode:'',
          tjxCode:'001001',
          tjxName:'',
          beginDate:"",
          fullDate:'',
          isCk:"1",
          projectTypeCode:'',
          current: 1,
          size: 20,
          createOrgId: '',
          createOrgType: '',
          createTime: '',
          createUserId: '',
          createUserName: '',
          totalValue:'',
          yearValue:'',
          monthValue:'',
          contractAmountTotal:'',
          projectStatusName:'',
          projectName:'',
          projectOmit:'',
          projectId:'',
          projectreportuuid:'',
          htquantity:'',
          reportYear:'',
          reportMonth:'',
          yearDatesEnd:'',
          yearDateS:''
        }
        this.setTimes=[];
        var date = new Date();
        var y = date.getFullYear();
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var time=y + '-' + m;
        this.searchform.yearDateS=time;
        this.getdatatime();
        this.getData()
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 获取分页数据
      getData() {
        if(this.setTimes.length>0){
          this.searchform.yearDateS=this.setTimes[0];
          this.searchform.yearDatesEnd=this.setTimes[1];
        }
        this.searchform.reportYear=this.searchform.yearDateS.split("-")[0];
        this.searchform.reportMonth=this.searchform.yearDateS.split("-")[1];
        // this.searchform.tjxCode='002007001001,002007002001';
        this.$http
            .post('/api/statistics/projectMonthlyReport/Projectreport/list/reportMQuery', this.searchform)
            .then(res => {
              var datas=res.data.data;
              datas.page.records.forEach((item)=>{
                item.monthStrList=this.setTjxList(item.monthStr);
                item.yearStrList=this.setTjxList(item.yearStr);
                item.totalStrList=this.setTjxList(item.totalStr)
              });
              this.page =datas;
              // console.log(this.page.records)
            })
      },
      rowShow(row){
        let p = { selfPath:'../reportMCk',fromDate:this.searchform.fullDate,fromDateStart:this.searchform.beginDate,actpoint: 'look', projectId: row.projectId,uuid:row.projectreportuuid,reportYear:row.reportYear,reportMonth:row.reportMonth,orgCode:row.createOrgCode,projectName:row.projectName,projectStatus:row.status,isCk:'1' }
        this.$router.push({
          path: './reportMDetail/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })

      }
    },

    created() {
      this.p=this.$route.query.p?JSON.parse(this.$utils.decrypt(this.$route.query.p)):{};
      if(this.p&&this.p.fromDate){
        var time=this.p.fromDate.split("-");
        this.searchform.current = 1;
        this.searchform.fullDate=this.p.fromDate;
        this.searchform.beginDate=this.p.fromDateStart;
      }else{
        let that = this;
        that.getdatatime();
      }
      this.getData();
      this.userdata=JSON.parse(sessionStorage.getItem('userdata'))
    },

  }
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
  .search-form{
    display: inline-block;
    float: left;
  }
  .search-form >>>.el-form-item{
    margin-bottom: 0;
  }
  .search-form >>>.el-form-item__content,.search-form >>>.el-form-item__label{
    line-height: 30px;
  }
  .search-form{
    display: inline-block;
    float: left;
  }
  >>>.search-form .el-form-item__label{
    width:auto;
  }
  >>>.search-form .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  >>>.el-icon-date{
    line-height: 30px;
  }
  .list-search-picker >>>.el-input__icon {
    line-height: 28px;
    height: 28px;
  }
  .list-search-picker >>>.el-range-separator{
    line-height: 23px!important;
  }
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
  .tableStyle{
    min-height: calc(100vh - 185px)!important;
    max-height: calc(100vh - 185px)!important;
  }
  .title-span{
    margin-left: 20px;
  }
</style>
