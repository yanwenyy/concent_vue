<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="verifyResultEdit()" plain type="primary"><i class="el-icon-plus"></i>资审结果登记</el-button>
      </el-button-group>
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
          label="标段名称"
          prop="sectionName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>标段名称</span>
          </template>
          <template slot-scope="scope">
            <span class="blue pointer" @click="verifyResultEdit(scope.row,'look')">{{scope.row.sectionName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          :width="500"
          label="项目名称"
          prop="inforName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>项目名称</span>
          </template>
          <template slot-scope="scope">
          <span class="blue pointer" @click="verifyResultEdit(scope.row,'look')">{{scope.row.inforName}}</span>
          </template>
        </el-table-column>
<!--
        <el-table-column
          :width="150"
          align="center"
          label="工程类别"
          prop="topInfor.enginTypeFirstName"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            {{ scope.row.enginTypeFirstName }}
          </template>
        </el-table-column> -->

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
          prop="topInfor.constructionOrg"
          show-overflow-tooltip
        >

          <template slot-scope="scope">
            {{ scope.row.constructionOrg }}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="公告类型"
          prop="topInfor.noticeTypeName"
          show-overflow-tooltip
        >

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

          <template slot-scope="scope">
            {{ scope.row.saleTime | dateformat }}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="资格预审结果"
          prop="verifyResult"
          :filter-multiple="true"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
             {{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'通过审核':'其他情况'}}
          </template> -->
          <template slot-scope="scope">
            <span> {{scope.row.verifyResult=='0'?'未通过':scope.row.verifyResult=='1'?'通过':'待通过'}}</span>
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
          prop="verify.createUserName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.createUserName }}
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

          <template slot-scope="scope">
            {{ scope.row.createTime | dateformat }}
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
    <el-dialog title="资审结果登记" :visible.sync="dialogResult" width="70%"  >
      <el-form :model="resultform.verifySection" class="queryForm" >
        <el-form-item label="资格预审结果"   prop="verifyResult" >
         <!--<el-switch-->
           <!--active-text="通过"-->
           <!--v-model="resultform.verifySection.verifyResult"-->
           <!--:active-value="true"-->
           <!--inactive-value="false"-->
          <!--:disabled="type=='look'"-->
         <!--&gt;-->
            <!--</el-switch>-->
          <el-radio-group :disabled="type=='look'"  v-model="resultform.verifySection.verifyResult">
            <el-radio label="0">未通过</el-radio>
            <el-radio label="1">通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="操作时间"  prop="verifyResultTime" >
          <el-date-picker
            value-format="timestamp"
            v-model="resultform.verifySection.verifyResultTime"
            type="date"
            placeholder="选择日期"
            :disabled="type=='look'">
          </el-date-picker>
        </el-form-item>
        <div
        >
        <p class="detail-title"><span class="uploadSpan">附件: </span>
          <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
         <!-- <el-upload
           :headers="{'Authorization':Authorization}"
           class="upload-demo detailUpload"
           :action="'/api/contract/topInfo/CommonFiles/verify/02/uploadFile'"
           :on-change="( file, fileList)=>{uploadPorgress( file, fileList,resultform.commonFilesList)}"
           :on-success="handleChange"
           :on-error="handleChange"
           :on-remove="handleRemove"
           multiple
         > -->
          <el-upload
            :headers="{'Authorization':Authorization}"
            class="upload-demo detailUpload detatil-flie-btn"
           :action="'/api/contract/topInfo/CommonFiles/verify/02/uploadFile'"
           :on-change="( file, fileList)=>{uploadPorgress( file, fileList,resultform.commonFilesList)}"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            multiple
          >
              <el-button size="small" type="primary" v-if="type!='look'">点击上传</el-button>
            </el-upload>
        </p>
        </div>
      </el-form>
      <div>
      <el-table
        :data="resultform.commonFilesList"
        :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
        @selection-change="handleSelectionChange"
        align="center"
        border
        class="contractInfoTable"
        ref="table"
        height="240"
        style="width: 100%;"
      >
                <el-table-column
                  :width="55"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column :resizable="false"
                                 label="文件名"
                                 prop="fileName"
                                 show-overflow-tooltip>

                </el-table-column>

                <el-table-column align="center" :resizable="false"
                                 label="大小(KB)"
                                 prop="fileSize"
                                 :width="120"
                                 show-overflow-tooltip>
                              <template slot-scope="scope">
                                {{(scope.row.fileSize/1024).toFixed(2)}}
                              </template>

                </el-table-column>
                <el-table-column align="center"  :resizable="false"
                                 label="类型"
                                 :width="80"
                                 prop="fileType"
                                 show-overflow-tooltip>

                </el-table-column>
                <el-table-column align="center" width="200" :resizable="false" label="上传进度" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-progress v-if="scope.row.progressFlag=='start'" :percentage="scope.row.loadProgress||0"></el-progress>
                    <el-progress  v-if="scope.row.progressFlag=='fail'" :percentage="100" status="warning"></el-progress>
                    <span v-if="scope.row.progressFlag=='stop'||scope.row.progressFlag==null">已上传</span>
                  </template>
                </el-table-column>

                <el-table-column align="center"
                  :resizable="false"
                  label="操作"
                  show-overflow-tooltip
                  :width="100"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="attachmentDownload(scope.row)" type="warning" >下载</el-link>
                    <el-link v-if="type!='look'" :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>

    </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResult = false,type=''">取 消</el-button>
        <el-button type="primary" @click="saveVerifyResult" v-if="type!='look'">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  // name: "标段通过信息录入",
  data() {
    return {
      Authorization:sessionStorage.getItem("token"),
      radio: '0',
      page: {current: 1, size: 20, total: 0, records: []},
      showinput: false,
      sousuo: "",
      formLabelWidth: '120px',
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
      type:'',
      menus: [],
      multipleSelection: [],
      orgTree: [],
      dialogResult: false,
      // resultform: {
      //   verifyResult: '1',
      //   verifyResultTime: '2020-12-18',
      //   verifyResultfile: '',
      //   commonFilesList:[]
      // },
      resultform:{
        verifySection:{
          uuid:'',
          verifyId:'',
          sectionId:'',
          investmentReckon:'',
          jananInvestment:'',
          verifyResult:'1',
          verifyResultTime:'2020-12-18'
        },
        commonFilesList:[]
      },

    }
  },
  methods: {
    //     rowshow() {
    //   if (this.multipleSelection.length > 0) {
    //     this.dialogResult = true;
    //     console.log(this.multipleSelection[0].verifySectionId)
    //     this.$http
    //       .post(
    //         '/api/contract/topInfo/Verify/detail/entitySectionInfo',
    //         {"id":this.multipleSelection[0].verifySectionId}
    //       )
    //       .then(res => {
    //         this.resultform = res.data.data;
    //         console.log(JSON.stringify(this.resultform));
    //         this.type = "look";
    //       })
    //   }
    // },

    verifyResultEdit(row,type) {
      if(row){
        this.type=type;
        this.dialogResult = true;
        this.$http
          .post(
            '/api/contract/topInfo/Verify/detail/entitySectionInfo',
            {"id":row.verifySectionId}
          )
          .then(res => {
            this.resultform = res.data.data;
            if (this.resultform.verifySection.verifyResultTime === null) {
              this.resultform.verifySection.verifyResultTime =new Date().getTime()
            }
          })
      }else{
        if (this.multipleSelection.length ==1) {
          this.dialogResult = true;
          this.$http
            .post(
              '/api/contract/topInfo/Verify/detail/entitySectionInfo',
              {"id":this.multipleSelection[0].verifySectionId}
            )
            .then(res => {
              this.resultform = res.data.data;
              if (this.resultform.verifySection.verifyResultTime === null) {
                this.resultform.verifySection.verifyResultTime =new Date().getTime()
              }
              //this.getData();
            })
        } else {
          this.$message.info("请选择一条内容进行操作！");
        }
      }

    },
    saveVerifyResult() {
      // var date = new Date(this.resultform.verifyResultTime);
      // var time1 = date.getTime();
      // this.resultform.verifySection.verifyResultTime = time1;
      // this.resultform.verifySection.verifyResult =
      // alert(JSON.stringify(this.multipleSelection[0]))
      if(this.resultform.commonFilesList.length==0 && this.resultform.verifySection.verifyResult === "1"){
        this.$message.error("附件列表不能为空");
        return false;
      }
      this.$http
        .post(
          '/api/contract/topInfo/Verify/detail/saveSectionResult',
          JSON.stringify(this.resultform), {useJson: true}
        )
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.code === 200) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.dialogResult = false
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
    // handleRemove(file,index) {
    //   this.$http
    //     .post(
    //       "/api/contract/topInfo/CommonFiles/list/delete",
    //       {ids:[file.uuid]},
    //     )
    //     .then((res) => {
    //       if (res.data.code === 200) {
    //         this.detailform.fileList2.splice(index,1);
    //       }
    //
    //     });
    //   console.log(this.detailform.fileList1)
    // },

    // 附件下载
    attachmentDownload(file){
      this.$handleDownload(file)
    },

    //判断附件大小
    beforeAvatarUpload(file) {
      var fileLimit=Number(this.fileLimit);
      const isJPG = file.type === 'image/jpeg';
      const isLt100M = file.size / 1024 / 1024 < fileLimit;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt100M) {
        this.$message.error('上传文件大小不能超过 '+fileLimit+'MB!');
      }
      // return isJPG && isLt2M;
      return isLt100M;
    },
    //上传附件显示进度条
    uploadPorgress(file, fileList,tableList){
      const len=tableList.length;
      if (file.status === 'ready') {
        file.fileName=file.name;
        file.fileSize=file.size;
        // file.fileType=file.type;
        file.progressFlag = 'start'; // 显示进度条

        file.loadProgress=0;

        tableList.push(file);
        var that=this;
        tableList.forEach((item,index)=>{

          const interval = setInterval(() => {
            if (item&&item.loadProgress >= 90) {
              item.loadProgress = 90;
              if(file.response&&item.fileName==file.response.data.fileName&&file.response.data.progressFlag=='stop'){
                tableList[index]=file.response.data;
                that.$set(tableList,index,tableList[index])
              }

              clearInterval(interval);
              return
            }
            if(item.progressFlag == 'start'){
              item.loadProgress += 20;//进度条进度
              that.$set(tableList,index,tableList[index])

            }
            if(file.response&&file.response.data.progressFlag=='fail'){
              tableList[index].progressFlag='fail';
              this.$set(tableList,tableList)
            }
          }, 600);
        });

      }
      if (file.response && file.response.code === 200) {
        file.response.data.progressFlag='stop';
        tableList.forEach((item,index)=>{
          if(item.fileName==file.response.data.fileName&&item.progressFlag!='stop'){
            tableList[index]=file.response.data;
            // console.log(index,'==>',tableList[index])
            this.$set(tableList,index,tableList[index])
            // console.log(tableList[index])
          }
        })
        // this.$message({
        //   message: '上传成功',
        //   type: 'success',
        //   duration: 1000,
        //   onClose: () => {
        //     file.response.data.progressFlag='stop';
        //     tableList.forEach((item,index)=>{
        //       if(item.fileName==file.response.data.fileName&&item.progressFlag!='stop'){
        //         tableList[index]=file.response.data;
        //         this.$set(tableList,index,tableList[index])
        //       }
        //     })
        //
        //   }
        // })
      }else if(file.response && file.response.code !== 200){
        // tableList[len-1].progressFlag = 'fail';
        file.response.data.progressFlag='fail';
        this.$set(tableList,tableList)
        this.$message.error(file.response.msg);
      }

      this.$forceUpdate();
    },
    handleRemove(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.resultform.commonFilesList.splice(index,1);
          }

        });
    },
    //上传附件
    handleChange(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            if(response.data.uuid!=null) {

              var commonFile = {

                uuid: response.data.uuid,
                businessId: response.data.businessId,
                businessType: response.data.businessType,
                businessCode: response.data.businessCode,
                fileName: response.data.fileName,
                fileType: response.data.fileType,
                fileSize: response.data.fileSize,
                filePath: response.data.filePath,
                remarks: response.data.remarks,
                createTime: response.data.createTime,
                createUserId: response.data.createUserId,
                createUserName: response.data.createUserName,
                createOrgId: response.data.createOrgId,
                createOrgName: response.data.createOrgName
              }
              if(this.resultform.commonFilesList==null)
              {
                var list =[];
                list.push(commonFile);
                this.resultform.commonFilesList = list;
              }else {
                this.resultform.commonFilesList.push(commonFile);
              }

            }
            //this.resultform.commonFilesList.push(response.data);
            // console.log( JSON.stringify(this.resultform.commonFilesList))
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

    remove() {
      // console.log(JSON.stringify(this.multipleSelection[0].uuid));
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
      //alert(JSON.stringify(val))
      this.multipleSelection = val
    },
    getData() {


      // console.log(JSON.stringify(this.searchform));
      this.$http
        .post(
          '/api/contract/topInfo/Verify/list/loadPageDataForFlowStatus',
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
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
  .btn-group{
    text-align: center;
    margin-top: 20px;
  }
  .gcform {
    margin-top: 10px;
    >>>.el-form-item__label:before {
      position: initial;
      left: -10px;
    }
    >>>.el-form-item__error {
      padding-top: 0px;
      width: 95%;
      margin-left: 0;
      text-align: right;
      top: 0%;
    }
    >.el-form-item,>>>.formItem{

      display: inline-block;
    }
    .detailformfooter1 {
      margin-top: 5px;
      width: 100%;
      .el-button {
        margin: 0 30px;
        width: 140px;
        height: 42px;
        font-size: 18px;
        font-family: Microsoft YaHei;
      }
      .el-button--primary {
        background: #5c8bfa;
      }
      .el-button--default {
        border: 1px solid #5c8bfa;
        color: #5c8bfa;
      }
    }
    .errorMsg >>>.el-form-item__label {
      color: red;
    }
    .el-input {
      width: 300px;
    }
    .el-input .el-input_inner {
      width: 300px;
      height: 500px;
    }
  }

  .el-input .el-input_inner {
    width: 300px;
    height: 500px;
  }

  .el-table thead.is-group th {
    background: #fff;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .el-card__body {
    /*padding: 0 100px;*/
    // height: 400px;
    // border: 1px solid black;
    // height: 200px;
  }

  >>>.el-input--mini .el-input__inner {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    // margin: 10px 0 0 10px;
  }

  .gcform >>>.el-input {
    width: 95%;
  }
  .listInput{
    width: auto!important;
  }
  .gcform .listInput input{
    width: 100px!important;
    padding:10px!important;
    box-sizing: border-box;
  }
  .neirong {
    width: 100% !important;
  }

  .gcform >>>.el-form-item {
    margin-bottom: 0px;
  }

  .neirong >>>.el-input--mini .el-input__inner {
    height: 100px;
  }

  .detail_bottom {
    margin: 20px 0 0 0;
    // border: 1px solid #ddd;
  }

  .el-card,
  .el-message {
    overflow: hidden;
  }

  .el-scrollbar__wrap.default-scrollbar__wrap {
    overflow: hidden;
  }

  .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    overflow: auto;
    // height: 500px ;
    /*height: 44vh;*/
  }

  .el-button--mini,
  .el-button--mini.is-round {
    margin: 0 27px 5px 0;
  }

  /*.el-table--border {*/
    /*min-height: auto !important;*/
  /*}*/
  >>>.el-form-item__label{
    width: auto;
  }
  >>>.el-upload-list{
    display: none;
  }
  >>>.el-table td, .el-table th
  {
    padding:5px 0px;
  }
  >>>.el-form-item__label{
    width: auto;
  }
  >>>.el-input--mini .el-input__inner{
    height: auto;
    line-height: inherit;
  }
>>>.el-form-item {
  width: auto;
    margin-bottom: 5px !important;
  display: inline-block;
  width: 32.5% !important;
  }
  .item_zbj{
    width: 40%;
    display: inline-block;
    padding-right: 9%;
  }
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
  //>>>.el-dialog__body{
  //  height: 300px;
  //  overflow: auto;
  //}
  >>>.el-form-item__label{
    width: auto;
  }
  >>>.el-dialog__body{
    padding-top: 0px;
  }
  .uploadSpan{
    font-size: 16px;
    color: #303133;
  }
  >>>.el-form-item__label{
    width: auto;
  }
  .el-table__row {
    cursor: pointer;
  }
  >>>.el-table td, .el-table th
  {
    padding:5px 0px;
  }
  >>>.el-form-item__label{
    width: auto;
  }
  >>>.el-upload-list{
    display: none;
  }
  >>>.el-table td, .el-table th
  {
    padding:5px 0px;
  }
  >>>.el-form-item__label{
    width: auto;
  }
  >>>.el-input--mini .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  >>>.el-form-item {
    width: auto;
    margin-bottom: 5px !important;
    display: inline-block;
  }
  .item_zbj{
    width: 40%;
    display: inline-block;
    padding-right: 9%;
  }
  .el-dialog{
    width: 60%;
  }
  .el-table__row {
    cursor: pointer;
  }
  .mydialog .el-dialog{
    width: 70%!important;
    /* overflow: auto; */
  }
  .mydialog >>>.el-dialog__body{
    //height: 300px;
    overflow: auto;
  }
  >>>.el-form-item__label{
    width: auto;
  }
  >>>.el-dialog__body{
    padding-top: 0px;
  }
  >>>.el-table__row{
  height: 42px !important;
}
</style>
