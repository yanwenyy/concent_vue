<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" plain type="primary">新增</el-button>
        <el-button :disabled="flowStatus==2 || flowStatus==3" @click="editItem" plain type="primary">修改</el-button>
        <el-button @click="searchformReset" type="primary" plain>刷新</el-button>
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
        <el-button @click="getData" type="primary" plain>查询</el-button>
        <el-button @click="getData" type="primary" plain>导出</el-button>
      </div>
    </div>

    <div style="margin-top: 10px">
      <el-table
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"

        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        style="width: 100%"
        tooltip-effect="dark"
         @select="rowSelect"
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
          :width="500"
          label="项目名称"
          prop="inforName"
          show-overflow-tooltip
        >
        <template slot="header" slot-scope="scope">
            <span>项目名称</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.inforName"
                size="mini"
              />
            </div>
          </template>
        <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.inforName}}</span>
          </template>
        </el-table-column>
<el-table-column
          :width="200"
          align="center"
          label="工程类别(一级)"
          prop="enginTypeFirstName"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>工程类别(一级)</span>
            <el-select
              clearable
              filterable
              placeholder="请选择"
              @change="getTwo"
              size="mini"
              v-model="searchform.enginTypeFirstName"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in projectDomainType"
              ></el-option>
            </el-select>

          </template>
        </el-table-column>

        <el-table-column
          :width="200"
          align="center"
          label="工程类别(二级)"
          prop="enginTypeSecondName"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>工程类别(二级)</span>
            <el-select
              clearable
              filterable
              placeholder="请选择"
              @change="getTwo"
              size="mini"
              v-model="searchform.enginTypeSecondName"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in xqprojectType"
              ></el-option>
            </el-select>

          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="建设单位"
          prop="constructionOrg"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>建设单位</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.constructionOrg"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="公告类型"
          prop="noticeTypeName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>公告类型</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.noticeTypeName"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="资审文件发售截止日期"
          prop="saleTime"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>资审文件发售截止日期</span>
            <div>
            <el-date-picker
              style=" width: 100%"
              v-model="searchform.saleTime"
              size="mini"
              value-format="timestamp"
              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope" >
            {{scope.row.saleTime | dateformat}}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="资格预审结果"
          prop="verify.flowStatus"
          :filter-multiple="true"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- {{scope.row.uuid==null?'未通过':'通过'}} -->
             {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'通过审核':'其他情况'}}
          </template>
         <template slot="header" slot-scope="scope">
            <span>资格预审结果</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.flowStatus"
                size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报人"
          prop="createUserName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>填报人</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.createUserName"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报时间"
          prop="verify.createTime"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>填报时间</span>
            <div>
              <el-date-picker
                style=" width: 100%"
                size="mini"
                value-format="timestamp"
                v-model="searchform.createTime"
              >
              </el-date-picker>
            </div>
          </template>
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

    <ListChangeSearch v-if="dialogResult" ref="verifyChange" @refreshDataList="goAddDetail"></ListChangeSearch>
  </div>

</template>

<script>
import ListChangeSearch from './listChangeSearch'
export default {
  name: "proposal-list-look",
  components: {
    ListChangeSearch
  },
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
      flowStatus:'',
      xqprojectType:[],
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
      computed: {
      projectDomainType() {
        return this.$store.state.category.projectDomainType;
      }
    },
  methods: {
    //行选择的时候
      rowSelect(selection, row){
        if(selection.indexOf(row)!=-1){
          this.flowStatus=row.flowStatus;
        }else{
          this.flowStatus='';
        }
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
    //去新增详情页面
    goAddDetail(data){
      // console.log(data);
      // if(data.topOrgId){
      //   let p = {actpoint: "add",instid:data.topOrgId};
      //   this.$router.push({
      //     path: "./infoChangeDetail/",
      //     query: {p: this.$utils.encrypt(JSON.stringify(p))},
      //   });
      // }
      // console.log(JSON.stringify(data));
      //alert(JSON.stringify(this.multipleSelection[0]));
      if(data){
        let p = { actpoint: 'add',instid: data.inforid, topinfoid:data.tiouuid}
        //alert(JSON.stringify(p));
        this.$router.push({
          path: './detail_Chang/',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      }

    },
    handleChange(){},
    statusFormat(row,column){
      return row.verify.uuid != "" ? "已进行资审申请" : row.verify.uuid == "" ? "未进行资审申请" : "未进行资审申请";
      // return statusW
    },
    search(){
      this.showinput = false
    },
    add(){
      this.dialogResult = true
      // console.log(this.dialogResult);
      this.$nextTick(() => {
        this.$refs.verifyChange.init()
      })
    },
    editItem() {
      // console.log(JSON.stringify(this.multipleSelection[0]));
      //是否有资审信息判断
      if (this.multipleSelection[0].uuid == "" || this.multipleSelection[0].uuid == null) {
        this.$message.info("当前登记的项目信息没有添加的资审信息，请添加资审信息后修改！");
        return;
      }
      //是否在审核流程中判断
      //是否在变更流程中判断
      let p = {
        actpoint: 'editItem',
        instid: this.multipleSelection[0].uuid,
        topinfoid: this.multipleSelection[0].topInfoOrgId
      }
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail_Chang/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
      })
    },
    // 查看
    rowshow(row) {
      let p = {
        actpoint: 'look',
        instid: row.uuid,
        topinfoid: row.topInfoOrgId
      }
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail_Chang/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
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
      this.searchform.enginTypeSecondName="";
      this.searchform.flowStatus="";
      this.searchform.createUserName="";
      this.searchform.createTime="";

      this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getData() {
      // console.log(JSON.stringify(this.searchform));
      if(this.searchform.saleTime!="")
      {
        var date = new Date(this.searchform.saleTime);
        var time1 = Date.parse(date);
        this.searchform.saleTime=time1;
      }

      // console.log(JSON.stringify(this.searchform));
      this.$http
        .post(
          '/api/contract/topInfo/Verify/list/loadPageDataForIsChange',
          // '/api/contract/topInfo/Verify/list/loadPageDataForChangeRecord',
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
      this.$http.get('/api/contract/base/loadorglist').then(res => {
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
    this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
  }


}
</script>
<style scoped>
.btn-group{
  text-align: center;
  margin-top: 20px;
}
.el-table__row {
  cursor: pointer;
}
>>>.el-table td, .el-table th
{
  padding:5px 0px;
}
.gcform >>>.el-form-item {
  margin-bottom: 5px !important;
}
>>>.el-table__row{
  height: 42px !important;
}
</style>
