<template>
  <div style="position: relative">
    <el-button @click="back" class="detailbutton detail-back-tab" >返回</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailform','save')" class="detailbutton detail-back-tab save-btn">保存</el-button>
    <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailform.flowStatus=='edit'||detailform.flowStatus=='reject')" @click="saveInfo('detailform','sub')" class="detailbutton detail-back-tab sub-btn">提交</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab bh" @click="operation('back')"  type="warning">驳回</el-button>
    <el-button v-show="p.actpoint == 'task'&&p.task.edit==false" class="detailbutton detail-back-tab tg" @click="operation('complete')"  type="success">通过</el-button>
    <!--<el-button v-show="p.actpoint == 'task'&&p.task.edit==true" @click="operation('recall')" class="detailbutton" type="danger">撤销</el-button>-->
    <el-tabs type="border-card" >
      <el-tab-pane label="合同信息核减详情">
        <div class="detailBox">
          <el-form
            :inline="false"
            :model="detailform"
            :rules="rules"
            class="gcform"
            ref="detailform"
          >
            <el-form-item
              label="合同板块:"
            >
              <el-input
                disabled
                clearable
                v-model="detailform.moduleName"/>
            </el-form-item>
            <el-form-item
              label="合同名称:"
            >
              <el-input
                disabled
                clearable
                v-model="detailform.contractName"/>
            </el-form-item>
            <el-form-item
              label="合同号:"
            >
              <el-input
                disabled
                clearable
                v-model="detailform.contractCode"/>
            </el-form-item>
            <el-form-item
              label="核减单位:"
            >
              <el-input
                disabled
                clearable
                v-model="detailform.createOrgName"/>
            </el-form-item>
            <el-form-item
              label="核减人:"
            >
              <el-input
                disabled
                clearable
                v-model="detailform.createUserName"/>
            </el-form-item>
            <div>
              <el-form-item
                class="neirong"
                label="核减原因:"
                prop="cutResion"
                :rules="{
                   required: true, message: '此项不能为空', trigger: 'blur'
                }"
                style="width: 100%"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  :disabled="p.actpoint === 'look'||p.actpoint=='task'"
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  v-model="detailform.cutResion"
                />
              </el-form-item>
            </div>
            <p><span >附件: </span>
              <!--<el-button-->
                <!--v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"-->
                <!--size="small"-->
                <!--type="primary"-->
                <!--@click="openFileUp('/api/contract/topInfo/CommonFiles/contractInfo/01/uploadFile','filesList')">-->
                <!--点击上传-->
              <!--</el-button>-->
              <el-upload
                :headers="{'Authorization':Authorization}"
                v-show="p.actpoint !== 'look'&&p.actpoint !== 'task'"
                class="upload-demo detailUpload detatil-flie-btn"
                :action="'/api/contract/topInfo/CommonFiles/contractInfo/01/uploadFile'"
                :on-change="( file, fileList)=>{uploadPorgress( file, fileList,detailform.filesList)}"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                multiple
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </p>
            <el-table
              :data="detailform.filesList"
              :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
              align="center"
              border
              class="detailTable"
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
              <el-table-column align="center"  :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

              </el-table-column>

              <el-table-column align="center" width="200" :resizable="false" label="大小(KB)" prop="fileSize" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{(scope.row.fileSize/1024).toFixed(2)}}
                </template>
              </el-table-column>
              <el-table-column align="center" width="100" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

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
                label="操作"
                show-overflow-tooltip
                v-if="p.actpoint!=='look'&&p.actpoint !== 'task'"
                width="80"
              >
                <template slot-scope="scope">
                  <el-link :underline="false" @click="attachmentDownload(scope.row)" type="warning" :style="(p.actpoint != 'look'&&p.actpoint !== 'task')?'color: #409EFF;margin-right: 3px;':'color: #409EFF;'">下载</el-link>
                  <el-link :underline="false" @click="handleRemove1(scope.row,scope.$index)" type="warning">删除</el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审批流程" v-if="p.actpoint == 'task'||p.actpoint == 'look'&&detailform.flowStatus!='edit'&&detailform.flowStatus!=null">
        <Audit-Process :task="p.task||{businessId:p.instid,businessType:' contract_cut_exam'}"></Audit-Process>
      </el-tab-pane>
    </el-tabs>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import FileUpload from '@/components/fileUpload'
  import { isMoney, isMobile} from '@/utils/validate'
  import AuditProcess from '@/components/auditProcess'

  export default {
    // name: "详情",
    data() {
      var validateMoney = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMoney(value)) {
          callback(new Error('请输入正确的金额格式'))
        } else {
          callback()
        }
      };
      var validatePhone = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMobile(value)) {
          callback(new Error('请输入正确的手机格式'))
        } else {
          callback()
        }
      }
      return {
        Authorization:sessionStorage.getItem("token"),
        timeout:  null,
        uploadVisible:false,//上传附件组件状态
        id:'',
        key: 0,
        treeStatas: false,
        detailform: {

        },
        xqprojectType: [],//工程类别二级
        emergingMarketTwo:[],//新兴市场二级
        projectNatureTwo:[],//项目性质二级
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        rules:{
          contractAmount: [
            { required: true,validator: validateMoney, trigger: 'change' }
          ],
          phone: [
            { required: true,validator: validatePhone, trigger: 'blur' }
          ]
        },//表单验证规则
      };
    },
    components: {
      Tree,
      FileUpload,
      AuditProcess
    },
    computed: {

    },
    mounted() {

      this.id=this.p.instid;
      if (this.p.actpoint === "edit"||this.id) {
        this.getDetail();
      }

      // eslint-disable-next-line no-unde
    },
    methods: {
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
          // console.log(tableList.length)
          this.$message({
            message: '上传成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              // const len=tableList.length;

              file.response.data.progressFlag='stop';
              tableList.forEach((item,index)=>{
                if(item.fileName==file.response.data.fileName&&item.progressFlag!='stop'){
                  tableList[index]=file.response.data;
                  // console.log(index,'==>',tableList[index])
                  this.$set(tableList,index,tableList[index])
                  // console.log(tableList[index])
                }
              })
              // tableList[len-1]=file.response.data;

            }
          })
        }else if(file.response && file.response.code !== 200){
          // tableList[len-1].progressFlag = 'fail';
          file.response.data.progressFlag='fail';
          this.$set(tableList,tableList)
          this.$message.error(file.response.msg);
        }

        this.$forceUpdate();
      },
      // 附件下载
      attachmentDownload(file){
        this.$handleDownload(file)
      },
      handleRemove1(file,index) {
        this.$http
          .post(
            "/api/contract/topInfo/CommonFiles/list/delete",
            {ids:[file.uuid]},
          )
          .then((res) => {
            if (res.data.code === 200) {
              this.detailform.filesList.splice(index,1);
            }

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
              '/api/contract/contractInfoCut/process/'+type,
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
      saveInfo(formName,type) {
        var url='';
        if(type=='save'){
          url="/api/contract/contractInfoCut/detail/update"
        }else{
          url="/api/contract/contractInfoCut/process/start"
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                url,
                JSON.stringify(this.detailform),
                {useJson: true}
              )
              .then((res) => {
                if (res.data.code === 200) {
                  if (res.data.data == null) {
                    this.$message({
                      message:  `${type=='save'?'保存':'提交'}信息重复`,
                      type: 'error'
                    })
                  } else {
                    this.$message({
                      message:  `${type=='save'?'保存':'提交'}成功`,
                      type: "success",
                    });
                    if (type=='save') {
                      this.detailform.contractInfo.uuid = res.data.data.contractInfo.uuid
                    } else {
                      this.$router.back()
                    }
                  }
                }
              });
          } else {
            this.$message.error("请添加必填项");
            return false;
          }
        });
      },
      back() {
        this.$router.back()
      },
      // 加载列表
      getDetail() {
        this.$http
          .post("/api/contract/contractInfoCut/detail/queryInfo", {uuid:this.id})
          .then((res) => {
            var datas=res.data.data;
            this.detailform=datas;
          });
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
  };
</script>
<style lang="scss" scoped>
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
    .div-item >>>.el-form-item{
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
</style>

