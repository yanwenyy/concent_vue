<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" :disabled="flowStatus!=1&&flowStatus!=null" plain type="primary" ><i class="el-icon-plus"></i>登记</el-button>

        <el-button @click="editItem"
        :disabled="flowStatus==2 || flowStatus==3"
        plain type="primary"
        ><i class="el-icon-edit"></i>修改</el-button>

        <el-button @click="remove" :disabled="flowStatus!=1&&flowStatus!=4" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
        <el-button  type="primary" plain><i class="el-icon-upload2"></i>导出</el-button>
      </el-button-group>
            <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain ><i class="el-icon-search"></i>查询</el-button>
      </div>
    </div>
    <div style="margin-top: 10px">
      <el-table
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        @row-click="rowshow"
        @selection-change="handleSelectionChange"
        @select="rowSelect"
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
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
          fixed
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
                size="mini"/>
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
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>工程类别(一级)</span>
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

          </template>
          <!-- <template slot-scope="scope">
            {{ scope.row.enginTypeFirstName }}
          </template> -->
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

          </template>
        </el-table-column>

        <el-table-column
          :width="300"
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
                size="mini"/>
            </div>
          </template>

        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="公告类型"
          prop="topInfor.noticeTypeName"
          show-overflow-tooltip
        >
          <!--<template slot="header" slot-scope="scope">-->
            <!--<span>公告类型</span>-->
            <!--<div>-->
              <!--<el-select-->
              <!--class="list-search-picker"-->
              <!--clearable-->
              <!--filterable-->
              <!--placeholder="请选择"-->
              <!--size="mini"-->
              <!--v-model="searchform.noticeTypeName"-->
            <!--&gt;-->
              <!--<el-option-->
                <!--:key="index"-->
                <!--:label="item.detailName"-->
                <!--:value="item.id"-->
                <!--v-for="(item, index) in bulletinType"-->
              <!--&gt;</el-option>-->
            <!--</el-select>-->
            <!--</div>-->
          <!--</template>-->
          <template slot-scope="scope">
            {{ scope.row.noticeTypeName }}
          </template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="资审文件发售截止日期"
          prop="verify.saleTime"
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
          <template slot-scope="scope">
            {{ scope.row.saleTime | dateformat }}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="状态"
          prop="verify.flowStatus"

          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>审核状态</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.flowStatus"
              >
                <el-option label="草稿" value="1"></el-option>
                <el-option label="审核中" value="2"></el-option>
                <el-option label="审核通过" value="3"></el-option>
                <el-option label="审核退回" value="4"></el-option>
              </el-select>
              <!--<el-input-->
              <!--class="list-search-picker"-->
              <!--style=" width: 100%"-->
              <!--v-model="searchform.flowStatus"-->
              <!--size="mini"-->
              <!--/>-->
            </div>
          </template>
          <template slot-scope="scope">
              <!-- {{scope.row.uuid==null?'未通过':'通过'}} -->
              {{scope.row.flowStatus==1?'草稿':scope.row.flowStatus==2?'审核中':scope.row.flowStatus==3?'审核通过':scope.row.flowStatus==4?'审核退回':'待登记'}}
          </template>
           <!-- <template slot-scope="scope">
            <el-tag v-if="scope.row.uuid===null" type="warning">未进行资审申请</el-tag>
            <el-tag v-else type="success">已进行资审申请</el-tag>
          </template> -->
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
                size="mini"/>
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
          <!-- <template slot-scope="scope">{{
            scope.row.createtime | dateformat
          }}</template> -->
          <template slot="header" slot-scope="scope">
            <span>填报时间</span>
            <div>
            <el-date-picker
              style=" width: 100%"
              v-model="searchform.querCreateTime"
              size="mini"
              type="date"
              value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">
            {{ scope.row.createTime | dateformat }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="版本标识"
          prop="version"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>版本标识</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.version"
                size="mini"
              />
            </div>
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
    <el-dialog title="资审结果登记" :visible.sync="dialogResult"
    width="30%">
      <el-form :model="resultform">
        <el-form-item label="资格预审结果" :label-width="formLabelWidth" prop="verifyResult">
          <el-radio v-model="resultform.verifyResult" label="1" border>通过</el-radio>
          <el-radio v-model="resultform.verifyResult" label="0" border>不通过</el-radio>
        </el-form-item>
        <el-form-item label="通过时间" :label-width="formLabelWidth" prop="verifyResultTime">
          <el-date-picker
            v-model="resultform.verifyResultTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <div
        ><p class="detail-title"><span  class="uploadSpan">附件: </span>
          <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
         <el-upload
           class="upload-demo detailUpload"
           :action="'/api/contract/topInfo/CommonFiles/verify/02/uploadFile'"
           :on-success="handleChange"
           :on-error="handleChange"
           :on-remove="handleRemove"
           multiple
         >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </p>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResult = false">取 消</el-button>
        <el-button type="primary" @click="saveVerifyResult">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "proposal-list-look",
  data() {
    return {
      flowStatus:'',
      radio: '0',
      page: {current: 1, size: 20, total: 0, records: []},
      showinput: false,
      sousuo: "",
      searchform: {
        current: 1,
        size: 20,
        inforName: '',
        enginTypeFirstId: '',
        enginTypeSecondId:'',
        constructionOrg: '',
        noticeTypeName: '',
        status: '',
        username: '',
        saleTime: ''
      },
      xqprojectType:[],//工程二级列表
      menus: [],
      multipleSelection: [],
      orgTree: [],
      dialogResult: false,
      resultform: {
        verifyResult: '1',
        verifyResultTime: '2020-12-18',
        verifyResultfile: ''
      },
      formLabelWidth: '120px'

    }
  },
      computed: {
        projectDomainType() {
    // console.log(this.$store.state.category["projectDomainType"])
    return this.$store.state.category.projectDomainType;
  },
        bulletinType() {
    return this.$store.state.bulletinType;
      },
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
    verifyResultEdit() {
      if (this.multipleSelection.length > 0) {
        this.dialogResult = true;
        //alert(JSON.stringify(this.multipleSelection[0]));
        this.resultform.verifyResult = this.multipleSelection[0].verifyResult;
        this.resultform.verifyResultTime = this.multipleSelection[0].verifyResultTime;
      } else {
        this.$message.info("请选择列表中的项目！");
      }
    },
    saveVerifyResult() {
      this.dialogResult = false
      this.multipleSelection[0].verifyResult = this.resultform.verifyResult;
      var date = new Date(this.resultform.verifyResultTime);
      var time1 = date.getTime();
      this.multipleSelection[0].verifyResultTime = time1;
      // alert(JSON.stringify(this.multipleSelection[0]))
      this.$http
        .post(
          '/api/contract/topInfo/Verify/detail/saveVerifyResult',
          JSON.stringify(this.multipleSelection[0]), {useJson: true}
        )
        .then(res => {
          if (res.data.code === 0) {
            if (res.data.code === 0) {
              this.$message({
                message: "保存成功",
                type: "success",
              });

            }
          }
          this.getData();
        })
    },
    selectFile()
    {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.response.data.uuid]},
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.fileList=fileList;
          }
        });
    },
    handleRemove(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.detailform.fileList2.splice(index,1);
          }

        });
      console.log(this.detailform.fileList1)
    },
    //上传附件
    handleChange(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.detailform.fileList.push(response.data);
          }
        })
      } else {
        this.$message.error(response.msg)
      }
    },
    statusFormat(row, column) {
      //alert(row.verify.uuid)
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
    search() {
      this.showinput = false
    },
    add() {
      console.log(JSON.stringify(this.multipleSelection));
      if(this.multipleSelection.length==0)
      {
        this.$message.info("请选择未登记资审信息的项目进行资审登记！");
        return;
      }
      // if (this.multipleSelection[0].uuid != null) {
      //   this.$message.info("当前登记的项目信息已经添加的资审信息！");
      //   return;
      // }
      //alert(JSON.stringify(this.multipleSelection[0]));
      let p = {actpoint: 'add', instid: this.multipleSelection[0].inforid, topinfoid: this.multipleSelection[0].tiouuid}
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
      })
    },
    editItem() {
      // console.log(JSON.stringify(this.multipleSelection[0].uuid));
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
        topinfoid: this.multipleSelection[0].tiouuid
      }
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
      })
    },
    remove() {
      console.log(JSON.stringify(this.multipleSelection[0].uuid));
      if (this.multipleSelection[0].uuid == "" || this.multipleSelection[0].uuid == null) {
        this.$message.info("当前登记的项目信息没有添加的资审信息，请添加资审信息后修改！");
        return;
      }
      let uuids = []
      this.multipleSelection.forEach((item) => {
        if (item.uuid != null) {
          uuids.push(item.uuid);
        }

      })
      this.$confirm('此操作将永久删除该资审信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
        this.$http
          .post(
            '/api/contract/topInfo/Verify/list/delete',
            {ids: uuids}
          )
          .then(res => {
            this.getData();
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 查看
    rowshow(row) {
      // let p = {actpoint: 'look', instid: row.uuid}
      // this.$router.push({
      //   path: './detail/',
      //   query: {p: this.$utils.encrypt(JSON.stringify(p))}
      // })
      console.log(JSON.stringify(row));
      // if (row.uuid === null) {
      //   this.$message.error("当前登记的项目信息未添加的资审信息！");
      //   return;
      // }
      //alert(JSON.stringify(this.multipleSelection[0]));
      let p = {actpoint: 'look', instid: row.inforid, topinfoid: row.tiouuid,uuid:row.topInfoOrgId}
      //alert(JSON.stringify(p));
      this.$router.push({
        path: './detail/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
      })
    },
    show() {
      if (this.multipleSelection.length !== 1) {
        this.$message.info('请选择一条记录进行查看操作！')
        return false
      }
      let p = {actpoint: 'look', instid: this.multipleSelection[0].uuid}
      this.$router.push({
        path: '../detail/',
        query: {p: this.$utils.encrypt(JSON.stringify(p))}
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
      this.searchform={
          current: 1,
          size: 20,
          inforName: '',
          enginTypeFirstName: '',
          constructionOrg: '',
          noticeTypeName: '',
          status: '',
          username: '',
          saleTime: ''
      };
      this.getData();
    },

    // 列表选项数据
    handleSelectionChange(val) {
      //alert(JSON.stringify(val))
      this.multipleSelection = val
    },
    getData() {
      console.log(JSON.stringify(this.searchform));
      if (this.searchform.saleTime != "") {
        var date = new Date(this.searchform.saleTime);
        var time1 = Date.parse(date);
        this.searchform.saleTime = time1;
      }

      console.log(JSON.stringify(this.searchform));
      this.$http
        .post(
          '/api/contract/topInfo/Verify/list/loadPageDataForReg',
          this.searchform
        )
        .then(res => {
          this.page = res.data.data
        })
    },
    getMenus() {
      this.$http
        .post('api/base/loadcascader', {typecode: 'XMLX'})
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
    this.getData();
    this.$store.dispatch("getConfig", {});
    this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
  },
};
</script>
<style scoped>
.el-table__row {
  cursor: pointer;
}
>>>.el-table td, .el-table th
{
  padding:5px 0px;
}
>>>.el-form-item {
  margin-bottom: 5px !important;
}
>>>.el-dialog__body{
  padding-top: 0px;
}
.uploadSpan{
  font-size: 16px;
  color: #303133;
}
>>>.el-table__row{
  height: 42px !important;
}
</style>
