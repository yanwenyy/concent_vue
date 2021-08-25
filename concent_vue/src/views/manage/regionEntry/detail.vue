<template>
  <div style="position: relative">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="back" class="detailbutton detail-back-tab" >返回</el-button>
        <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="saveInfo('detailform','save')" class="detailbutton detail-back-tab save-btn">保存</el-button>
      </div>
      <div class="detailBox">
        <el-form
          :inline="false"
          :model="detailform"
          :rules="rules"
          class="gcform"
          ref="detailform"
        >
          <el-form-item
            label="指挥部:"
            prop="orgName"
          >
            <el-input clearable disabled placeholder="请输入内容" v-model="detailform.orgName" class="input-with-select">
              <el-button v-if="p.actpoint !== 'look'&&p.actpoint!='task'" slot="append" icon="el-icon-circle-plus-outline" @click="addZhb" ></el-button>
            </el-input>
            <!--<el-select-->
              <!--:disabled="p.actpoint === 'look'||p.actpoint=='task'"-->
              <!--clearable-->
              <!--filterable-->
              <!--placeholder="请选择"-->
              <!--@change="getMsg"-->
              <!--v-model="detailform.orgCode"-->
            <!--&gt;-->
              <!--<el-option-->
                <!--:key="index"-->
                <!--:label="item.orgName"-->
                <!--:value="item.orgCode"-->
                <!--v-for="(item, index) in zhbList"-->
              <!--&gt;</el-option>-->
            <!--</el-select>-->
          </el-form-item>
          <el-form-item
            label="管辖省市:"
          >
            <el-input
              disabled
              clearable

              v-model="detailform.governingProvinceName"/>
          </el-form-item>
          <el-form-item
            label="指挥长姓名:"
          >
            <el-input
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              clearable

              v-model="detailform.principalName"/>
          </el-form-item>
          <el-form-item
            label="指挥长电话:"
          >
            <el-input
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              clearable

              v-model="detailform.principalContactNumber"/>
          </el-form-item>
          <el-form-item
            label="指挥长级别:"
          >
            <el-input
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              clearable

              v-model="detailform.principalGrade"/>
          </el-form-item>
          <el-form-item
            label="省市负责人姓名:"
          >
            <el-input
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              clearable

              v-model="detailform.provinceName"/>
          </el-form-item>
          <el-form-item
            label="省市负责人电话:"
          >
            <el-input
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              clearable

              v-model="detailform.provinceContactNumber"/>
          </el-form-item>
          <el-form-item
            label="省市负责人级别:"
          >
            <el-input
              :disabled="p.actpoint === 'look'||p.actpoint=='task'"
              clearable

              v-model="detailform.provinceGrade"/>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>

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
        searchform: {
          current: 1,
          size: 20,
          orgCode:''
        },
        zhbList:[],
        detailform: {
          orgName:'',
          orgCode:'',
          orgType:'',
          governingProvinceName:'',
          principalName:'',
          principalContactNumber:'',
          principalGrade:'',
          provinceName:'',
          provinceContactNumber:'',
          provinceGrade:'',
        },
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        page: {current: 1, size: 20, total: 0, records: []},
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

    },
    computed: {

    },
    mounted() {
      // this.getDetail();
      if(this.p.actpoint=='addZhb'||this.p.actpoint=='eidt'||this.p.actpoint=='look'){
        var msg=this.p.msg;
        // console.log(msg)
        this.detailform.orgName=msg.orgName;
        this.detailform.orgCode=msg.orgCode;
        this.detailform.orgType=msg.orgType;
        this.detailform.governingProvinceName=msg.governingProvinceName;
        this.detailform.principalName=msg.principalName;
        this.detailform.principalContactNumber=msg.principalContactNumber;
        this.detailform.principalGrade=msg.principalGrade;
        this.detailform.provinceName=msg.provinceName;
        this.detailform.provinceContactNumber=msg.provinceContactNumber;
        this.detailform.provinceGrade=msg.provinceGrade;
        this.$forceUpdate();
        // console.log(this.detailform)
      }
    },
    methods: {
      //选择指挥部
      addZhb(){
        let p = {actpoint: "add"};
        this.$router.push({
          path: "../listOld/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      //获取指挥部信息
      getMsg(id){

      },
      handleSizeChange(val) {
        this.searchform.size = val;
        this.getDetail();
      },
      handleCurrentChange(val) {
        this.searchform.current = val;
        this.getDetail();
      },
      searchformSubmit() {
        this.searchform.current = 1;
        this.getDetail();
      },
      saveInfo(formName,type) {
        var url='';
        if(type=='save'){
          url="/api/contract/regionalInfo/list/saveOrUpdateRegional"
        }else{
          url="/api/contract/topInfo/TopInfor/process/start"
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
                  this.$message({
                    message:  `${type=='save'?'保存':'提交'}成功`,
                    type: "success",
                  });
                 this.back();
                }
              });
          } else {
            this.$message.error("请添加必填项");
            return false;
          }
        });
      },
      back() {
        this.$router.push({  path: "../list",})
      },
      // 加载列表
      getDetail() {
        this.$http
          .post("/api/contract/regionalInfo/list/loadPageDataOrgCode", this.searchform)
          .then((res) => {
            var datas=res.data.data;
            if(this.p.actpoint!='addZhb'){
              this.detailform=datas;
            }
          });
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .clearfix{

  }
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
  .clearfix{
    width: 100%;
    height: 30px;
  }
  .detailBox{
    padding: 0 30px 50px 30px!important;
  }
  >>>.el-pagination .el-input,>>>.el-pagination .el-input__inner{
    width:80px!important;
  }
</style>

