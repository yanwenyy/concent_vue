<template>
  <div style="position: relative">
    <div slot="header" class="clearfix">
      <el-button @click="back" class="detailbutton detail-back-tab">返回</el-button>
      <el-button
        v-if="p.actpoint != 'look' && p.actpoint !== 'searchLook'&&p.actpoint != 'task'"
        type="primary"
        @click="saveInfo('detailform','save')"
        class="detailbutton detail-back-tab save-btn"
      >保存</el-button
      >
      <el-button
        v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.archivesInfo.flowStatus=='edit'||detailform.archivesInfo.flowStatus=='reject'||detailform.archivesInfo.bidFlowStatus==1||detailform.archivesInfo.bidFlowStatus==4)"
        @click="saveInfo('detailform','sub')"
        class="detailbutton detail-back-tab sub-btn"
      >提交</el-button>
      <!-- v-if="p.actpoint != 'look' && p.actpoint !== 'searchLook'" -->
      <el-button
        v-show="p.actpoint == 'task'&&p.task.edit==false"
        class="detailbutton detail-back-tab bh"
        @click="operation('back')"
        type="warning"
      >驳回</el-button>

      <el-button
        v-show="p.actpoint == 'task'&&p.task.edit==false"
        class="detailbutton detail-back-tab tg"
        @click="operation('complete')"
        type="success"
      >通过</el-button>
    </div>

    <el-tabs type="border-card" >
      <el-tab-pane label="档案详情">
        <div class="detailBox">
          <el-form
            :inline="false"
            :model="detailform"
            class="gcform"
            ref="detailform"
          >
            <el-form-item
              label="档案名称:"
              prop="archivesInfo.name"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >

              <el-input
                clearable
                :disabled="p.actpoint === 'look'"

                v-model="detailform.archivesInfo.name"
              />

            </el-form-item>
            <el-form-item
              label="档案类型:"
              prop="archivesInfo.archivesTypeId"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-select
                clearable
                :disabled="p.actpoint === 'look'"
                filterable
                placeholder="请选择"

                v-model="detailform.archivesInfo.archivesTypeId"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in archivesType"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-show="detailform.archivesInfo.archivesTypeName=='3'"
                          label="填报时间:">
              <el-date-picker
                clearable
                :readonly="p.actpoint === 'look'"
                value-format="timestamp"
                v-model="detailform.archivesInfo.reportTime"
                align="right"
                type="date"
                placeholder="选择日期">
              </el-date-picker>

            </el-form-item>
            <el-form-item
              label="是否共享:"
            >
              <el-switch
                :disabled="p.actpoint === 'look'"
                v-model="detailform.archivesInfo.isShare"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>

            </el-form-item>
            <div>
              <el-form-item
                class="neirong"
                label="备注:"
                prop="remarks"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  :readonly="p.actpoint === 'look'"
                  type="textarea"
                  placeholder="请输入"

                  v-model="detailform.archivesInfo.remarks"
                />
              </el-form-item>
            </div>
            <div>
              <p class="detail-title"><span  class="uploadSpan">附件: </span>
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-upload
                  :headers="{'Authorization':Authorization}"
                  v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                  class="upload-demo detailUpload detatil-flie-btn"
                  :action="'/api/contract/topInfo/CommonFiles/archives/01/uploadFile'"
                  :on-change="( file, fileList)=>{uploadPorgress( file, fileList,detailform.commonFilesList)}"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  multiple
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <!--<el-button-->
                  <!--v-show="p.actpoint !== 'look'"-->
                  <!--size="small"-->
                  <!--type="primary"-->
                  <!--@click="openFileUp('/api/contract/topInfo/CommonFiles/archives/01/uploadFile','commonFilesList')">-->
                  <!--点击上传-->
                <!--</el-button>-->
                <!--<el-upload v-show="p.actpoint != 'look'"-->
                <!--class="upload-demo detailUpload"-->
                <!--:action="'/api/contract/topInfo/CommonFiles/archives/01/uploadFile'"-->
                <!--:on-success="handleChange"-->
                <!--:on-error="handleChange"-->
                <!--:on-remove="handleRemove"-->
                <!--multiple-->
                <!--&gt;-->
                <!--<el-button size="small" type="primary">点击上传</el-button>-->
                <!--</el-upload>-->
              </p>
            </div>
            <div>
              <el-table
                :data="detailform.commonFilesList"
                :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
                @selection-change="handleSelectionChange1"
                align="center"
                border
                class="contractInfoTable"
                ref="table"
                style="width: 100%;height: auto;"
              >
                <el-table-column
                  :width="55"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column :resizable="false" align="center" label="大小(KB)" prop="fileSize" width="120"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>

                </el-table-column>
                <el-table-column align="center" :resizable="false" label="类型" prop="fileType" width="80"
                                 show-overflow-tooltip>

                </el-table-column>
                <el-table-column align="center" width="200" :resizable="false" label="上传进度" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-progress v-if="scope.row.progressFlag=='start'" :percentage="scope.row.loadProgress||0"></el-progress>
                    <el-progress  v-if="scope.row.progressFlag=='fail'" :percentage="100" status="warning"></el-progress>
                    <span v-if="scope.row.progressFlag=='stop'||scope.row.progressFlag==null">已上传</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  show-overflow-tooltip
                  v-if="p.actpoint!=='look'&&p.actpoint!=='task'"
                  width="100"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false" @click="attachmentDownload(scope.row)" type="warning" :style="(p.actpoint != 'look'&&p.actpoint !== 'task')?'color: #409EFF;margin-right: 3px;':'color: #409EFF;'">下载</el-link>
                    <el-link :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>



            <!--      <el-form-item-->
            <!--        label="填报单位:"-->
            <!--        style="width: 33%"-->
            <!--      >-->
            <!--        <el-input-->
            <!--          disabled-->
            <!--           -->
            <!--          v-model="detailform.createOrgName"-->
            <!--        />-->
            <!--      </el-form-item>-->
            <!--        <el-form-item-->
            <!--          label="录入人:"-->
            <!--          style="width: 33%"-->
            <!--        >-->

            <!--          <el-input-->
            <!--            disabled-->
            <!--             -->
            <!--            v-model="detailform.createUserName"-->
            <!--          />-->
            <!--        </el-form-item>-->
          </el-form>

        </div>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'&&detailform.archivesInfo.flowStatus!=1&&detailform.archivesInfo.flowStatus!=null">
        <Audit-Process :task="p.task||{businessId:p.instid,businessType:' contract_file_manager'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
    <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
  </div>
  <!--<div :max-height="$tableHeight"-->
       <!--:height="$tableHeight">-->
        <!--<el-card class="box-card">-->
      <!--<div slot="header"-->
           <!--class="clearfix">-->
        <!--<span  class="detailSpan"><b>档案详情</b></span>-->
        <!--<el-button-->
          <!--class="detail-back-tab detailbutton"-->
          <!--@click="back">返回</el-button>-->
         <!--<el-button type="primary" class="detailbutton" v-show="p.actpoint != 'look'"-->
                    <!--@click="saveInfo('detailform')">保存</el-button>-->
      <!--&lt;!&ndash;<el-button class="detailbutton" @click="submitForm('detailform')" v-show="p.actpoint != 'look'">提交</el-button>&ndash;&gt;-->
      <!--</div>-->


      <!---->
<!--</el-card>-->
<!--&lt;!&ndash;    <div class="btn-group"&ndash;&gt;-->
<!--&lt;!&ndash;         v-show="p.actpoint != 'look'">&ndash;&gt;-->
<!--&lt;!&ndash;      <el-button type="primary"&ndash;&gt;-->
<!--&lt;!&ndash;                 @click="saveInfo('detailform')">保存</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-button @click="submitForm('detailform')">提交</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
    <!---->
  <!--</div>-->
</template>

<script>
  import FileUpload from '@/components/fileUpload'
  import AuditProcess from '@/components/auditProcess'
export default {
  data() {
    return {
      Authorization:sessionStorage.getItem("token"),
      uploadVisible:false,//上传附件组件状态
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      detailform: {
        archivesInfo:{
          uuid: '',
            name: '',
            archivesTypeId: '',
            isShare: '',
            archivesTypeName: '',
            remarks: '',
            submitTime: '',
            reportTime: '',
            archivesInfoType: '',
            createOrgName: '',
            createUserName: ''

        },archivesInfoOrgList:[],
          commonFilesList:[]

      } ,
      multipleSelection:[],
      multipleSelection1:[],
      isShare: [
        {
          id: '1',
          detailName: '是'
        },
        {
          id: '0',
          detailName: '否'
        }
      ],//是否共享
      archivesType: [
        {
          id: '1',
          detailName: '管理办法'
        },
        {
          id: '2',
          detailName: '其他'
        },
        {
          id: '3',
          detailName: '计划文件'
        }
      ],//联合投标选择
      myVerifySection: {}
    }
  },
  components: {
    FileUpload,
    AuditProcess
  },
  computed: {

    // bidType () {
    //   return this.$store.state.bidType
    // },
    // yesOrNo () {
    //   return this.$store.state.yesOrNo
    // },

  },
  methods: {
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
      // console.log(event, file, fileList,tableList);
      // console.log(fileList)
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
                // console.log(index,'==>',tableList[index])
                that.$set(tableList,index,tableList[index])
                // console.log(tableList[index])
              }

              clearInterval(interval);
              return
            }
            if(item.progressFlag == 'start'){
              item.loadProgress += 20;//进度条进度
              // that.$set(tableList[len],tableList[len])
              that.$set(tableList,index,tableList[index])
              // console.log(tableList[len].loadProgress)

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
        //     // const len=tableList.length;
        //
        //     file.response.data.progressFlag='stop';
        //     tableList.forEach((item,index)=>{
        //       if(item.fileName==file.response.data.fileName&&item.progressFlag!='stop'){
        //         tableList[index]=file.response.data;
        //         // console.log(index,'==>',tableList[index])
        //         this.$set(tableList,index,tableList[index])
        //         // console.log(tableList[index])
        //       }
        //     })
        //     // tableList[len-1]=file.response.data;
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
    //流程操作
    operation(type){
      var msg='',that=this;
      this.$prompt('请输入审核意见', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if(type=='back'){
          if(value==null||value==''){
            this.$message.error('审核意见不能为空');
            return false;
          }
        }else{
          if(value==null||value==''){
            value=that.examineReviewMsg;
          }
        }
        this.p.task.remark=value;
        this.$http
          .post(
            '/api/contract/archives/ArchivesInfo/process/'+type,
            JSON.stringify(this.p.task),
            {useJson: true}
          )
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.$router.back()
            }
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });

    },
    //打开附件上传的组件
    openFileUp(url,list){
      this.uploadVisible = true;
      this.$nextTick(() => {
        this.$refs.infoUp.init(url,list);
    })
    },
    //获取上传的附件列表
    getUpInfo(data){
      this.$forceUpdate();
      this.detailform[data.list]=this.detailform[data.list].concat(data.fileList);
      this.uploadVisible = false;
    },
    back() {
      this.$router.back()

    },
    saveInfo(formName,type) {
      this.$refs[formName].validate((valid) => {
        //alert(valid);
        if (valid) {
          //alert(JSON.stringify(this.detailform));
          //console.log(JSON.stringify(this.detailform));
          this.archivesType.forEach((item, index) => {
            if (item.id === this.detailform.archivesInfo.archivesTypeId) {
              this.detailform.archivesInfo.archivesTypeName = item.detailName;
            }
          })
          if (this.detailform.archivesInfo.archivesTypeId == '3') {
            this.detailform.archivesInfo.archivesInfoType = '2'
          } else {
            this.detailform.archivesInfo.archivesInfoType = '1'
          }
          var url='';
          if(type=='save'){
            url="/api/contract/archives/ArchivesInfo/detail/saveBo"
          }else{
            url="/api/contract/archives/ArchivesInfo/process/start"
          }
          this.$http
            .post(
              url,
              JSON.stringify(this.detailform),
              {useJson: true}
            )
            .then((res) => {

              if (res.data.msg === "SUCCESS") {
                this.$message({
                  message:  `${type=='save'?'保存':'提交'}成功`,
                  type: "success",
                });
                this.$router.back();
              }

            });
        } else {
          this.$message.error("请添加必填项");
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //alert(valid);
        if (valid) {
          //alert(JSON.stringify(this.detailform));
          //console.log(JSON.stringify(this.detailform));
          //this.detailform.verify.flowStatus="1";
          this.$http
            .post(
              "/api/contract/archives/ArchivesInfo/process/start",
              JSON.stringify(this.detailform),
              {useJson: true}
            )
            .then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.$refs[formName].resetFields();
              }

            });
        } else {
          this.$message.error("请添加必填项");
          return false;
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
            this.detailform.commonFilesList.push(response.data);
            //console.log( JSON.stringify(this.detailform.commonFilesList))
          }
        })
      } else {
        this.$message.error(response.msg)
      }
    },
    handleRemove(file,index) {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.detailform.commonFilesList.splice(index,1);
          }

        });
      //console.log(this.detailform.commonFilesList)
    },

    getDetail() {
      //alert(JSON.stringify(this.p))
      if (this.p.actpoint === "add") {

      } else {
        this.$http
          .post(
            '/api/contract/archives/ArchivesInfo/detail/entityInfoBo',
            {"id": this.p.instid}
          )
          .then(res => {
            this.detailform = res.data.data
          })
      }


    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val
    }

  },
  mounted() {
    this.getDetail()

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
      width: 32.5%!important;
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

  .el-table--border {
    min-height: auto !important;
  }

  >>>.detailDivider {
    margin: 60px 0 20px 0 !important;
  }
  >>>.el-form-item__error {
    margin: -6px 0px 0 20px;
  }
  // >>>.el-form-item__content{
  //   margin-top: -15px!important;
  // }
  .detail-back-tab{
    padding: 10px 20px ;
    border:1px solid #ddd;
    color: black;
    position: absolute;
    top:1px;
    right:15px;
    z-index: 999999999;
    background: #fff;
  }
  .save-btn{
    right: 95px;
    background: #409EFF;
    color:#fff;
  }
  .sub-btn{
    right: 175px;
  }
</style>
