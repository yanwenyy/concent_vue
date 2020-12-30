<template>
  <div>
    <div style="width: 100%;overflow: hidden;">
      <el-button-group style="float: left">
        <el-button @click="setZB" plain type="primary" :disabled="isWinBid==1">中标结果登记</el-button>
      </el-button-group>
    </div>

    <div style="margin-top: 20px">
      <el-table
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        @select="rowSelect"
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
          type="selection">
        </el-table-column>
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index">
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="是否中标"
          prop="isWinBid"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span> {{scope.row.isWinBid==1?'中标':scope.row.isWinBid==2?'废标':scope.row.isWinBid==3?'流标':scope.row.isWinBid==4?'未中标':'待操作'}}</span>
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
          label="公示文件"
          prop="enginTypeFirstName"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="中标价"
          prop="winBidPrice"
          show-overflow-tooltip
        >
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
          prop="placeName"
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
          prop="ticCreateName"
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
          label="投标截止日期"
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
          prop="openBidTime"
          show-overflow-tooltip
        >
        <template slot-scope="scope">{{
            scope.row.openBidTime | dateformat
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
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <info-change-search v-if="infoCSVisible" ref="infoCS" @refreshDataList="goAddDetail"></info-change-search>

  <el-dialog title="中标登记结果" :visible.sync="dialogFormVisible" margin="0 auto" width="30%">
    <el-form>
        <el-form-item label="是否中标" :label-width="formLabelWidth">
      <el-select v-model="zbForm.isWinBid" placeholder="请选择">
        <el-option label="中标" value="1"></el-option>
        <el-option label="废标" value="2"></el-option>
        <el-option label="流标" value="3"></el-option>
        <el-option label="未中标" value="4"></el-option>
        <el-option label="待操作" :value="null"></el-option>

      </el-select>
    </el-form-item>
    <el-form-item label="中标价" :label-width="formLabelWidth">
      <el-input v-model="zbForm.enginTypeFirstName"></el-input>
    </el-form-item>
        <el-form-item label="中标时间" :label-width="formLabelWidth">
      <el-date-picker
      v-model="zbForm.name"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    </el-form-item>

    <p><span >文件公示: </span>
                <el-upload
                  class="upload-demo detailUpload"
                  :action="'/api/topInfo/CommonFiles/bidInfo/01/uploadFile'"
                  :on-success="handleChange"
                  :on-error="handleChange"
                  :on-remove="handleRemove"
                  multiple
                >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    </p>

              <el-table
                :data="zbForm.bidInfo_01"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"

                @selection-change="handleSelectionChange"
                align="center"
                border
                class="clothSizeTable"
                ref="table"
                style="width: 100%;min-height: calc(100vh - 370px);"
              >
                <el-table-column
                  :width="55"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column align="center" :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

                </el-table-column>

                <el-table-column
                  align="center"
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  show-overflow-tooltip
                  width="200"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>

<!-- <el-form-item label="文件公示" :label-width="formLabelWidth">
<el-upload
  class="upload-demo detailUpload"
  :action="'/api/topInfo/CommonFiles/bidInfo/01/uploadFile'"
  :on-success="handleChange"
  :on-error="handleChange"
  :on-remove="handleRemove"
  multiple
>
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
</el-form-item> -->
    </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import InfoChangeSearch from '../proposal/infoChangeSearch'

export default {
  name: "proposal-list-look",
  data() {

    return {
      key:0,
      isWinBid:'',
      dialogFormVisible: false,
      infoCSVisible:false,
      detailform: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          bidInfo_01:[],
        },
      zbForm:{
        bidInfo_01:[],
      },
      page: { current: 1, size: 10, total: 0, records: [] },
      showinput: false,
      sousuo: "",
      searchform: {
        current: 1,
        size: 10,
        year: "",
        name: "",
        ptype: "",
        orgid: "",
        orgname: "",
      },
      zbForm:{},
      menus: [],
      multipleSelection: [],
      orgTree: [],
      formLabelWidth: '120px'
    };
  },
   components: {
      InfoChangeSearch
    },
  methods: {
    //打开中标弹框
    setZB(){
      this.dialogFormVisible= true;
      this.zbForm=this.multipleSelection[0];
      this.zbForm.bidInfo_01=[];
      console.log(this.zbForm)
    },
    // 上传删除
        handleRemove1(file,index) {
      this.$http
        .post(
          "/api/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
        if (res.data.code === 200) {
        this.detailform.bidInfo_01.splice(index,1);
      }

    });
    },
    handleChange(){},
        handleRemove(file, fileList) {
         this.$http
          .post(
            "/api/topInfo/CommonFiles/list/delete",
            {ids:[file.response.data.uuid]},
          )
          .then((res) => {
            if (res.data.code === 200) {
               this.detailform.bidInfo_01=fileList;
            }
          });
        console.log(this.fileList)
      },

    //上传附件
    handleChange(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
          this.detailform.bidInfo_01.push(response.data);
          console.log(fileList)
        }
      })
      } else {
        this.$message.error(response.msg)
      }
    },



      //行选择的时候
      rowSelect(selection, row){
        if(selection.indexOf(row)!=-1){
          this.isWinBid=row.isWinBid;
        }else{
          this.isWinBid='';
        }
      },
      //去新增详情页面
      goAddDetail(data){
        console.log(data);
        let p = {actpoint: "add",instid: data.topOrgId};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
    search() {
      this.showinput = false;
    },
    //登记
    add() {
        if (this.multipleSelection.length !== 1||this.multipleSelection.length>1) {
          this.$message.info("请选择一条记录进行登记操作！");
          return false;
        }
        let p = {actpoint: "add", instid: this.multipleSelection[0].topInfoOrgId};
        this.$router.push({
          path: "./detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

        // this.infoCSVisible = true;
        // this.$nextTick(() => {
        //   this.$refs.infoCS.init();
        // })
    },


    // 查看
        getData() {
        this.$http
          .post(
            "/api/topInfo/BidInfo/detail/loadPageDataForReg",
            this.searchform
          )
          .then((res) => {
            this.page = res.data.data;
          });
      },


    rowshow(row) {
      var id=row.isWinBid==null?row.topInfoOrgId:row.uuid;
      let p = { actpoint: "look", instid: id ,isWinBid:row.isWinBid};
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
    },
    // list通用方法开始
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
        this.searchform= {
        current: 1,
        size: 10,
        year: "",
        name: "",
        ptype: "",
        orgid: "",
        orgname: "",
      }

        this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      this.$http
        .post(
         "/api/topInfo/BidInfoSection/list/loadPageDataForZb",
          this.searchform
        )
        .then((res) => {
          this.page = res.data.data;
        });
    },
    getMenus() {
      this.$http
        .post("api/base/loadcascader", { typecode: "XMLX" })
        .then((res) => {
          if (res.data.code === 0) {
            this.menus = res.data.data;
          }
        });
    },
    currentMenu(selVal) {
      let selMenuObj = this.menus.filter((item) => item.value === selVal);
      this.searchform.menu = selMenuObj[0].label;
    },
    // 获取上级单位树信息
    getOrgTree() {
      this.$http.get("/api/base/loadorglist").then((res) => {
        this.orgTree = res.data.data;
      });
    },
    // 确定单位
    orgChange() {
      let selectLabelArr = this.$refs["porgCascader"].getCheckedNodes()[0]
        .pathLabels;
      this.searchform.orgname = selectLabelArr[selectLabelArr.length - 1];
    },

    // list通用方法结束
  },
  created() {
    // this.getMenus();
    // this.getOrgTree();
    this.getData();
  },
};
</script>
<style scoped>
.el-dialog{
  width: 60%;
}
.el-table__row {
  cursor: pointer;
}
>>>.el-dialog{
  width: 70%!important;
  /* overflow: auto; */
}
>>>.el-dialog__body{
  height: 500px;
  overflow: auto;
}
</style>
