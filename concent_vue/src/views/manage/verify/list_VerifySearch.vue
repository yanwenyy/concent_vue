<!--资审结果操作列表-->
<template>
  <div>
    <el-form :inline="true" :model="searchform" @keyup.enter.native="getData()" class="gcform">
      <el-row>
      <el-form-item label="项目名称:" style="width: 33%">
        <el-input v-model="searchform.inforName" placeholder="项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="建设单位:" style="width: 33%">
        <el-input v-model="searchform.constructionOrg" placeholder="建设单位" clearable></el-input>
      </el-form-item>

      <el-form-item label="资审截止日期:" style="width: 33%">
        <el-date-picker
          v-model="searchform.createTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      </el-row>
      <el-row>
      <el-form-item style="width: 33%"
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
      <el-form-item style="width: 33%"
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
        <el-input v-model="searchform.inforName" placeholder="招标代理机构" clearable></el-input>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item
        label="标段名称:"
      >
        <el-input v-model="searchform.inforName" placeholder="标段名称" clearable></el-input>
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
        <el-form-item label="登记时间:" style="width: 33%">
          <el-date-picker
            v-model="searchform.createTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="录入单位:"
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
      <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
      <el-button @click="getData" type="primary" plain>查询</el-button>
      <el-button @click="exportdata" type="primary" plain>导出</el-button>
      </el-row>

    </el-form>

    <div style="margin-top: 20px">
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
        stripe
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
                  <template slot="header" slot-scope="scope">
            <span>项目名称</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.inforName"
                size="mini"
              />
            </div>
          </template>
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
                  <template slot="header" slot-scope="scope">
            <span>工程类别</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.enginTypeFirstName"
                size="mini"
              />
            </div>
          </template>
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
          <template slot="header" slot-scope="scope">
            <span>建设单位</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.constructionOrg"
                size="mini"
              />
            </div>
          </template>
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
          <template slot="header" slot-scope="scope">
            <span>公告类型</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.noticeTypeName"
                size="mini"
              />
            </div>
          </template>
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
          <!-- <template slot-scope="scope">{{
            scope.row.state === '0' ? '草稿' : '已上报'
          }}</template> -->
                    <template slot="header" slot-scope="scope">
            <span>资审文件发售截止日期</span>
            <div>
              <el-date-picker
                v-model="searchform.saleTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </template>
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
                  <template slot="header" slot-scope="scope">
            <span>状态</span>
                    <el-select v-model="searchform.status" placeholder="请选择">
                      <el-option
                        key="0"
                        label="未进行资审申请"
                        value="0">
                      </el-option>
                      <el-option
                        key="1"
                        label="已进行资审申请"
                        value="1">
                      </el-option>
                    </el-select>
          </template>
          <template slot-scope="scope">
            <el-tag  v-if="scope.row.uuid===null" type="warning">未进行资审申请</el-tag>
            <el-tag  v-else type="success">已进行资审申请</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报人"
          prop="verify.username"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>填报人</span>
            <div>
              <el-input
                style="float: left; width: 100%"
                v-model="searchform.username"
                size="mini"
              />
            </div>
          </template>
          <template slot-scope="scope">
            {{scope.row.username}}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报时间"
          prop="verify.createtime"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">{{
            scope.row.createtime | dateformat
          }}</template> -->
          <template slot="header" slot-scope="scope">
            <span>填报时间</span>
            <div>
              <div>
                <el-date-picker
                  v-model="searchform.createtime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </template>
          <template slot-scope="scope">
            {{scope.row.createtime}}
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
  </div>
</template>

<script>
export default {
  name: "proposal-list-look",
  data() {
    return {
      page: { current: 1, size: 10, total: 0, records: [] },
      showinput: false,
      sousuo: "",
      searchform: {
        current: 1,
        size: 10,
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
      orgTree: []
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

      if(id!=''){
        this.searchform.enginTypeSecondId='';
        this.projectDomainType.find(
          (item) => {
            if (item.id == id) {
              this.xqprojectType = item.children;
            }
          }
        )
      }
    },
    statusFormat(row,column){
      alert(row.verify.uuid)
      // console.log(row.verify.uuid);
      // var statusW;
      // if(row.verify.uuid!="")
      // {
      //   statusW= "已进行资审申请"
      // }else
      // {
      //   statusW= "未进行资审申请"
      // }
      return row.verify.uuid != "" ? "已进行资审申请" : row.verify.uuid == "" ? "未进行资审申请" : "未进行资审申请";
      // return statusW
    },
    search(){
      this.showinput = false
    },
    add(){
      //alert(JSON.stringify(this.multipleSelection[0]));
       let p = { actpoint: 'add',instid: this.multipleSelection[0].uuid, topinfoid:this.multipleSelection[0].tiouuid}
      //alert(JSON.stringify(p));
       this.$router.push({
        path: './detail/',
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
      })
    },
    // 查看
    rowshow(row) {
      let p = { actpoint: 'look', instid: row.uuid }
      this.$router.push({
        path: './detail/',
        query: { p: this.$utils.encrypt(JSON.stringify(p)) }
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
        this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getData() {
      this.$http
        .post(
          '/api/topInfo/Verify/list/loadPageDataForFlowStatus',
          // '/api' + this.$route.path.substr(0, this.$route.path.length - 1),
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
      this.$http.get('/api/base/loadorglist').then(res => {
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
  }
}
</script>
<style scoped>
.el-table__row {
  cursor: pointer;
}
</style>
