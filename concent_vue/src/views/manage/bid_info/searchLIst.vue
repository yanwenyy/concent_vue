<template>
  <div>
    <el-form :inline="true" :model="searchform" @keyup.enter.native="getData()" class="queryForm">
      <el-form-item label="项目名称:">
        <el-input
          v-model="searchform.inforName"
          placeholder="项目名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="工程类别(一级):">
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
      </el-form-item>
      <el-form-item label="工程类别(二级):">
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
      </el-form-item>
      <el-form-item label="标段名称:">
        <el-input
          v-model="searchform.sectionId"
          placeholder="标段名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="建设单位:">
        <el-input
          v-model="searchform.constructionOrg"
          placeholder="建设单位"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="开标日期:">
        <el-date-picker
          v-model="searchform.dateOfBidOpeningName"
          @change="searchform.selectTimeTypeSaleTime='02',searchform.vifSaleTime=''"
          value-format="timestamp"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
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

      <el-form-item label="录入单位:">
        <el-input
          v-model="searchform.createOrgName"
          placeholder="录入单位"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="资审截止日期:">
        <el-date-picker
         @change="searchform.selectTimeTypeSaleTime='01',searchform.dateOfBidOpeningName=''"
          v-model="searchform.vifSaleTime"
          value-format="timestamp"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="是否中标:">
            <!-- <el-switch
              class="inline-formitem-switch"
              v-model="searchform.isWinBid"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
            >
            </el-switch> -->
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="searchform.isWinBid"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in yesOrNo"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目地点:">
        <el-input v-model="searchform.path" placeholder="项目地点" clearable  @clear="searchform.ffid=''">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="selectPosition()"
          ></el-button>
        </el-input>
      </el-form-item>

      <el-button
        @click="searchformReset"
        type="info"
        plain
        style="color: black; background: none"
        >重置</el-button
      >
      <el-button @click="getData" type="primary" plain>查询</el-button>
      <el-button @click="exportdata" type="primary" plain>导出</el-button>
    </el-form>
    <div style="margin-top: 10px">
      <el-table
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
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
          :width="150"
          align="center"
          label="是否中标"
          prop="isWinBid"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.isWinBid==='1'?'中标':'未中标'}}
          </template>
        </el-table-column>

        <el-table-column
          :width="500"
          label="标段名称"
          prop="sectionId"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.sectionId}}</span>
          </template>
        </el-table-column>

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
          :width="150"
          align="center"
          label="工程类别(一级)"
          prop="enginTypeFirstName"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="工程类别(二级)"
          prop="enginTypeSecondName"
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
          label="项目地点"
          prop="path"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="300"
          align="center"
          label="参与投标单位"
          prop="noticeTypeName"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="300"
          align="center"
          label="录入单位"
          prop="createOrgName"
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
          label="资审截止日期"
          prop="vifSaleTime"
          show-overflow-tooltip
        >
         <template slot-scope="scope">{{
            scope.row.vifSaleTime | dateformat
            }}</template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="开标日期"
          prop="dateOfBidOpeningName"
          show-overflow-tooltip
        >
        <template slot-scope="scope">{{
            scope.row.dateOfBidOpeningName | dateformat
            }}</template>
        </el-table-column>
        <!-- ??? -->
        <el-table-column
          :width="150"
          align="center"
          label="审核通过日期"
          prop="openBidTime"
          show-overflow-tooltip
        >
         <template slot-scope="scope">{{
            scope.row.openBidTime | dateformat
            }}</template>
        </el-table-column>

        <!-- <el-table-column
          :width="150"
          align="center"
          label="项目状态"
          prop="flowStatus"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span> {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'审核通过':scope.row.flowStatus==4?'审核退回':'待登记'}}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          :width="200"
          align="center"
          label="登记时间(审核通过时间)"
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
    <Tree
      v-if="treeStatas"
      ref="addOrUpdate"
      @getPosition="getPositionTree"
    ></Tree>
  </div>
</template>

<script>
import Tree from "@/components/tree";
export default {
  // inject:['reload'],
  components: {
    Tree,
  },
  data() {
    return {
      treeStatas: false,
      page: { current: 1, size: 10, total: 0, records: [] },
      searchform: {
        inforName: "",
        enginTypeFirstName: "",
        enginTypeSecondName: "",
        sectionName:"",
        constructionOrg: "",
        openBidTime:"",
        noticeTypeId: "",
        noticeTypeName:"",
        ticCreateName:"",
        vifSaleTime:"",
        isWinBid:"",
        path: "",
      },
      multipleSelection: [],
      xqprojectType: [], //工程二级列表
      // projectStatus: [
      //   {
      //     id: "1",
      //     detailName: "草稿",
      //   },
      //   {
      //     id: "2",
      //     detailName: "审核中",
      //   },
      //   {
      //     id: "3",
      //     detailName: "审核通过",
      //   },
      // ], //项目状态列表

            yesOrNo:[
          {
            id:'1',
            detailName:'中标'
          },
          {
            id:'0',
            detailName:'未中标'
          }
        ],
    };
  },
  mounted() {
    // this.getData();
    this.$store.dispatch("getConfig", {});
    this.$store.dispatch("getCategory", {
      name: "projectDomainType",
      id: "238a917eb2b111e9a1746778b5c1167e",
    });
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
    railwayLine() {
      return this.$store.state.railwayLine;
    },
  },
  methods: {
    //获取项目地点的值
    getPositionTree(data) {
      this.treeStatas = false;
      this.searchform.ffid = data.fullDetailCode;
      this.searchform.path = data.fullDetailName;
      this.key = this.key + 1;
    },
    //选择项目地点
    selectPosition() {
      this.treeStatas = true;
      console.log(this.positionIndex);
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init();
      });
    },
    submit() {},
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
    exportdata() {},
    // 查看
    rowshow(row) {
      var id=row.flowStatus==null?row.uuid:row.uuid;
      let p = { actpoint: "searchLook", instid: id ,flowStatus:row.flowStatus};
      this.$router.push({
        path: "./detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
      });
    },
    // 展示
    show() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info("请选择一条记录进行查看操作！");
        return false;
      }
      let p = { actpoint: "look", instid: this.multipleSelection[0].uuid };
      this.$router.push({
        path: "../detail/",
        query: { p: this.$utils.encrypt(JSON.stringify(p)) },
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
      this.searchform = {
        inforName: "",
        enginTypeFirstName: "",
        enginTypeSecondName: "",
        constructionOrg: "",
        noticeTypeId: "",
        noticeTypeName:"",
        belongLineId: "",
        designOrg: "",
        ffid: "",
        flowStatus: "",
        createTime: "",
        planBidTime: "",
        sectionName:"",
      };
      this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 查询
    getData() {
       if(this.searchform.selectTimeTypeSaleTime=='01'&&this.searchform.vifSaleTime){
          this.searchform.SaleTimeBeginTime=this.searchform.vifSaleTime[0];
          this.searchform.SaleTimeEndTime=this.searchform.vifSaleTime[1];
        }else if(this.searchform.selectTimeTypeSaleTime=='02'&&this.searchform.dateOfBidOpeningName){
          this.searchform.SaleTimeBeginTime=this.searchform.dateOfBidOpeningName[0];
          this.searchform.SaleTimeEndTime=this.searchform.dateOfBidOpeningName[1];
        }else{
          this.searchform.selectTimeTypeSaleTime='';
          this.searchform.SaleTimeBeginTime=null;
          this.searchform.SaleTimeEndTime=null;
        }
      this.$http
        .post(
          "/api/contract/topInfo/BidInfo/list/loadPageDataForSelect",
          this.searchform
        )
        .then((res) => {
          this.page = res.data.data;
          console.log(this.page);
        });
    },
  },
  created() {
    this.getData();
    this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
  },
};
</script>
<style scoped>
>>> .el-form-item__label {
  width: auto;
}
>>> .el-input--mini .el-input__inner {
  height: auto;
  line-height: inherit;
}
.el-table__row {
  cursor: pointer;
}
</style>
