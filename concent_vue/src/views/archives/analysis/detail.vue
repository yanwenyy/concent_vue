<template>
  <div>
        <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span style="color: #2a2a7d"><b>档案详情</b></span>
        <el-button
          @click="back"
          style="
            float: right;
            padding: 10px 20px;
            border: 1px solid #ddd;
            color: black;
            position: fixe;
          "
          type="text"
        >返回
        </el-button
        >
      </div>


      <div class="detailBox">
    <el-form
      :inline="false"
      :model="detailform"
      class="gcform"
      ref="detailform"
    >
    <el-row>
      <el-form-item
        label="档案名称:"
        style="width: 33%"
      >

        <el-input
          :disabled="p.actpoint === 'look'"

          v-model="detailform.archivesInfo.name"
        />

      </el-form-item>
      <el-form-item
        label="档案类型:"
        style="width: 33%
              "
      >
        <el-select
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
    </el-row>
      <el-row>
        <el-form-item
          label="是否共享:"
          style="width: 33%"
        >
          <el-select
            :disabled="p.actpoint === 'look'"
            filterable
            placeholder="请选择"

            v-model="detailform.archivesInfo.isShare"
          >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in isShare"
            ></el-option>
          </el-select>
      </el-form-item>
        <el-form-item v-show="detailform.archivesInfo.archivesTypeName=='3'"
                      label="填报时间:"
                      style="width: 33%"
        >

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

</el-row>

<el-row>
            <el-form-item
              class="neirong"
              label="备注:"
              prop="remarks"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-input
                :readonly="p.actpoint === 'look'"
                clearable
                placeholder="请输入"

                v-model="detailform.archivesInfo.remarks"
              />
            </el-form-item>
</el-row>
<el-row>
            <el-form-item
              class="neirong"
              label="附件（最大10MB）:"
              style="width: 33%"
            >
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->

              <!--<el-button-->
                <!--v-show="p.actpoint !== 'look'"-->
                <!--size="small"-->
                <!--type="primary"-->
                <!--@click="openFileUp('/api/contract/topInfo/CommonFiles/archives/03/uploadFile','commonFilesList')">-->
                <!--点击上传-->
              <!--</el-button>-->
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange">
                <el-button size="small"
                           type="primary"
                           v-show="p.actpoint != 'look'">点击上传</el-button>
                <div slot="tip"
                     class="el-upload__tip"></div>
              </el-upload>
            </el-form-item>
     </el-row>
<el-row>



      <el-form-item
        label="填报单位:"
        style="width: 33%"
      >
        <el-input
          disabled

          v-model="detailform.archivesInfo.createOrgName"
        />
      </el-form-item>
        <el-form-item
          label="录入人:"
          style="width: 33%"
        >

          <el-input
            disabled

            v-model="detailform.archivesInfo.createUserName"
          />
        </el-form-item>
</el-row>
    </el-form>

    </div>
</el-card>
    <div class="btn-group"
         v-show="p.actpoint != 'look'">
      <el-button type="primary"
                 @click="saveInfo('detailform')">保存</el-button>
      <el-button @click="submitForm('detailform')">提交</el-button>
    </div>
    <file-upload v-if="uploadVisible" ref="infoUp" @refreshBD="getUpInfo"></file-upload>
  </div>
</template>

<script>
  import FileUpload from '@/components/fileUpload'
export default {
  data() {
    return {
      uploadVisible:false,//上传附件组件状态
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      detailform:{
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
      myVerifySection: {},
      multipleSelection:[],
      multipleSelection1:[],
    }
  },
  components: {
    FileUpload,
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
    saveInfo(formName) {
      this.$refs[formName].validate((valid) => {
        //alert(valid);
        if (valid) {
          //alert(JSON.stringify(this.detailform));
          console.log(JSON.stringify(this.detailform));
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

          this.$http
            .post(
              "/api/contract/archives/ArchivesInfo/detail/saveBo",
              JSON.stringify(this.detailform),
              {useJson: true}
            )
            .then((res) => {

              if (res.data.msg === "SUCCESS") {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.$refs[formName].resetFields();
                this.$router.push({
                  path: "./list",
                });
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
          console.log(JSON.stringify(this.detailform));
          //this.detailform.verify.flowStatus="1";
          this.$http
            .post(
              "/api/contract/archives/ArchivesInfo/detail/saveOrUpdate",
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
    handleChange() {
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
    }

  },
  mounted() {
    this.getDetail()

  }
}
</script>
<style lang="scss" scoped>
.btn-group {
  text-align: center;
  margin-top: 20px;
}

.gcform {
  margin-top: 10px;

  .el-form-item__label:before {
    position: initial;
    left: -10px;
  }

  .el-form-item__error {
    padding-top: 0px;
    width: 95%;
    margin-left: 0;
    text-align: right;
    top: 0%;
  }

  .el-form-item {
    /**/
    display: inline-block;
    width: 32.5%;
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

  .errorMsg .el-form-item__label {
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

.clothSizeTable {
  /*td {*/
  /*padding: 0;*/
  /*}*/
  .el-form-item__content {
    height: 60px;
    line-height: 60px;

    .el-form-item__error {
      top: 42px;
    }
  }
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

.el-input--mini .el-input__inner {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  // margin: 10px 0 0 10px;
}

.gcform .el-input {
  width: 95%;
}

.listInput {
  width: auto !important;
}

.gcform .listInput input {
  width: 100px !important;
  padding: 10px !important;
  box-sizing: border-box;
}

.neirong {
  width: 100% !important;
}

.gcform .el-form-item {
  margin-bottom: 0px;
}

.neirong .el-input--mini .el-input__inner {
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
</style>
