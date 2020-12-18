<!--资审标段列表-->
<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
      </el-button-group>

    </div>

    <div style="margin-top: 20px">
      <el-table
        :data="detailform.topInfoSectionList"
        :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
        @selection-change="handleSelectionChange"
        align="center"
        border
        class="clothSizeTable"
        ref="table"
        style="width: 98%; min-height: calc(100vh - 370px)"
      >
        <el-table-column
          :width="80"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>

        <el-table-column
          class="listTabel"
          :resizable="false"
          label="标段名"
          prop="sectionName"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input
              clearable
              :disabled="p.actpoint === 'look'"
              v-model="scope.row.sectionName"
            ></el-input>
            <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
          </template>
        </el-table-column>

        <el-table-column
          :resizable="false"
          label="项目份额"
          align="center"
          prop="contractAmount"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input
              clearable
              :disabled="p.actpoint === 'look'"
              v-model="scope.row.projectScale"
            ></el-input>
            <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
          </template>
        </el-table-column>

        <el-table-column
          v-show="!p.actpoint === 'look'"
          :resizable="false"
          fixed="right"
          label="操作"
          align="center"
          show-overflow-tooltip
          v-if="p.actpoint !== 'look'"
          width="200">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              @click="del(scope.$index,scope.row,detailform.topInfoSectionList,'bd')"
              type="warning">删除
            </el-link>
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
        style="margin: 20px; position: fixed; right: 200px; bottom: 40px"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "proposal-list-look",
  data() {
    return {
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      page: { current: 1, size: 10, total: 0, records: [] },
      showinput: false,
      sousuo: "",
      detailform: {
        topInfor: {},
        topInfoOrg: {},
        topInfoSiteList: [],
        topInfoSectionList: [],
      },
      menus: [],
      multipleSelection: [],
      orgTree: []

    }
  },
  methods: {
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



    handleSizeChange(val) {
      this.searchform.size = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.searchform.current = val
      this.getData()
    },


    getData() {
      alert(this.id)
      this.$http
        .post("/api/topInfo/TopInfor/detail/entityInfo", {topOrgId:this.id})
        .then((res) => {
          var datas=res.data.data;
          this.getTwo(datas.topInfor.enginTypeFirstId);
          this.getTwoSC(datas.topInfor.marketFirstNameId);
          datas.topInforCapitalList.forEach((item)=>{
            this.value1.push(item.capitalId)
          });
          this.detailform={
            topInfor: datas.topInfor,
            topInfoOrg: datas.topInfoOrg,
            topInfoSiteList: datas.topInfoSiteList,
            topInfoSectionList: datas.topInfoSectionList,
          }
        });
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
  mounted() {
    this.id = this.p.instid;
    //alert(2);
    //this.$store.dispatch('getConfig', { })
    // eslint-disable-next-line no-unde
    this.getData()

  }
}
</script>
<style scoped>
.el-table__row {
  cursor: pointer;
}
</style>
