<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span class="detail-card-title"><b>房地产合同新增</b></span>
        <el-button class="detail-back" type="text">返回</el-button>
      </div>
      <div class="detailBox">
        <el-form
      :inline="false"
      :model="detailform"
      :rules="rules"
      class="gcform"
      ref="detailform"
      style="background: white;"
    >
     <!-- <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button type="primary" plain>保存</el-button>
        <el-button type="primary" plain>提交</el-button>
      </el-button-group>
    </div>
    <p></p> -->

      <el-form-item
        label="合同名称:"
        prop="contractInfo.contractName"
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.contractName"
         />
      </el-form-item>

            <el-form-item
        label="合同编号:"
        prop="contractInfo.contractNo"

        :rules="{
           required: true, message: '此项不能为空', trigger: 'blur'
        }"
      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.contractNo"
         />
      </el-form-item>

 <el-form-item
        label="合同总金额（万元）:"
        prop="contractInfo.contractAmount"

          :rules="{

    }"
      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.contractAmount"
         />
      </el-form-item>
      <el-form-item
        label="我方份额（万元）:"
        prop="contractInfo.ourAmount"

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.ourAmount"
         />
      </el-form-item>

            <el-form-item
        label="增值税（万元）:"
        prop="contractInfo.valueAddedTax"

         :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.valueAddedTax"
         />
      </el-form-item>

 <el-form-item
        label="系统外份额（万元）:"
        prop="contractInfo.outSystemAmount"

          :rules="{

    }"
      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.outSystemAmount"
         />
      </el-form-item>
      <el-form-item
        label="合同签定日期:"
        prop="contractInfo.contractSignTime"

      >
      <el-date-picker
        v-model="detailform.contractInfo.contractSignTime"
        type="datetime"
        size="mini"
        placeholder="选择日期时间">
     </el-date-picker>
      </el-form-item>
      <el-form-item
        label="新兴市场类别(一级):"
        prop="contractInfo.marketFirstNameId"
        :rules="{
            required: true,
            message: '此项不能为空',
            trigger: 'blur',
          }"
      >
        <el-select
          :disabled="p.actpoint === 'look'"
          filterable
          clearable
          placeholder="请选择"
          @change="getTwoSC"
          size="mini"
          v-model="detailform.contractInfo.marketFirstNameId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in emergingMarket"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="新兴市场类别(二级):"
        prop="contractInfo.marketSecondId"
        :rules="{
            required: true,
            message: '此项不能为空',
            trigger: 'blur',
          }"
      >
        <el-select
          :disabled="p.actpoint === 'look'"
          filterable
          clearable
          placeholder="请选择"
          size="mini"
          @change="
              getName(
                detailform.contractInfo.marketSecondId,
                emergingMarketTwo,
                'marketSecondName'
              )
            "
          v-model="detailform.contractInfo.marketSecondId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in emergingMarketTwo"
          ></el-option>
        </el-select>
      </el-form-item>
          <el-form-item
            label="场地名称:"
            prop="contractInfo.estateHolding"
            required

          >
            <el-select
              :disabled="p.actpoint==='look'"

              clearable
              filterable
              placeholder="请选择"
              size="mini"
              v-model="detailform.contractInfo.estateHolding"
            >
              <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options1"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item
        label="控股情况:"
        prop="contractInfo.estateHolding"
        required

      >
        <el-select
          :disabled="p.actpoint==='look'"

          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="detailform.contractInfo.estateHolding"
        >
          <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options1"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item
        label="是否并表:"
        prop="contractInfo.isMergeEstate"
        required

      >
        <el-select
          :disabled="p.actpoint==='look'"
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="detailform.contractInfo.isMergeEstate"
        >
          <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="建设地点:"
        prop="contractInfo.estateBuildPlace"
        required
      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.estateBuildPlace"
        />
      </el-form-item>
     <el-form-item
        label="详细建细地点:"

        prop="contractInfo.estateDetailedBuildPlace"
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.estateDetailedBuildPlace"
         />
      </el-form-item>


      <el-form-item
        label="建设用地面积（万平方米）:"

        prop="contractInfo.estateBuildArea"
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.estateBuildArea"
         />
      </el-form-item>

      <el-form-item
        label="签约单位（使用资质单位）:"
        prop="contractInfo.signOrgId"
        required

      >
        <el-select
          :disabled="p.actpoint==='look'"
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="detailform.contractInfo.signOrgId"
        >
          <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options1"></el-option>
        </el-select>
      </el-form-item>
     <el-form-item
        label="录入单位:"

        prop="contractInfo.createOrgName"
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.createOrgName"
         />
      </el-form-item>


      <el-form-item
        label="录入时间:"

        prop="contractInfo.createTime"
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.createTime"
         />
      </el-form-item>
      <p><span >证明文件: </span>
        <el-upload
          class="upload-demo detailUpload detatil-flie-btn"
          :action="'/api/topInfo/CommonFiles/contractInfo/01/uploadFile'"
          :on-success="handleChange1"
          :on-error="handleChange1"
          :on-remove="handleRemove1"
          :show-file-list="false"
          multiple
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </p>

        <el-table
          :data="detailform.commonFilesList"
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

          <el-table-column align="center" :resizable="false" label="大小" prop="fileSize" show-overflow-tooltip>

          </el-table-column>
          <el-table-column align="center" :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

          </el-table-column>

          <el-table-column
            align="center"
            :resizable="false"
            fixed="right"
            label="操作"
            show-overflow-tooltip
            v-if="p.actpoint!=='look'"
            width="200"
          >
            <template slot-scope="scope">
              <el-link :underline="false" @click="handleRemove1(scope.row,scope.$index)" type="warning">删除</el-link>
            </template>
          </el-table-column>
        </el-table>

    </el-form>
      </div>
    </el-card>
    <div class="btn-group" v-show="p.actpoint != 'look'">
      <el-button type="primary" @click="saveInfo('detailform')">保存</el-button>
      <el-button>提交</el-button>
    </div>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import { isMoney } from '@/utils/validate'
export default {
  data() {
    var validateMoney = (rule, value, callback) => {
      console.log(value)
      if(value===''){
        callback(new Error('不能为空'))
      }else if (!isMoney(value)) {
        callback(new Error('请输入正确的金额格式'))
      } else {
        callback()
      }
    }
    return {
      options1:[{label:"值",value:'111'}],
      value: [],
      detailform: {
        contractInfo: {},
        commonFilesList: [],
      },
      yesOrNo:[
        {
          id:'0',
          detailName:'是'
        },
        {
          id:'1',
          detailName:'否'
        }
      ],
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      emergingMarketTwo:[],//新兴市场二级
      rules:{
        contractAmount: [
          { required: true,validator: validateMoney, trigger: 'change' }
        ]
      },//表单验证规则
    }
  },
  components: {
    Tree,
  },
  computed: {
    projectDomainType() {
      // console.log(this.$store.state.category.projectDomainType)
      return this.$store.state.category.projectDomainType;
    },
    emergingMarket() {
      // console.log(this.$store.state.category.emergingMarket)
      return this.$store.state.category.emergingMarket;
    },
    projectNature(){
      return this.$store.state.projectNature;
    },
    certificationType(){
      return this.$store.state.certificationType;
    },
    bizCode() {
      return this.$store.state.bizCode;
    },
    bulletinType() {
      return this.$store.state.bulletinType;
    },
    projectModel() {
      return this.$store.state.projectModel;
    },
    amountSource() {
      return this.$store.state.amountSource;
    },
    // yesOrNo() {
    //   return this.$store.state.yesOrNo;
    // },
    position() {
      return this.$store.state.position;
    },
    probability() {
      return this.$store.state.probability;
    },
    railwayLine() {
      return this.$store.state.railwayLine;
    },
  },
  methods: {
    handleRemove1(file,index) {
      this.$http
        .post(
          "/api/topInfo/CommonFiles/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
        if (res.data.code === 200) {
        this.detailform.commonFilesList.splice(index,1);
      }

    });
      console.log(this.detailform.commonFilesList)
    },
    //上传附件
    handleChange1(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
          this.detailform.commonFilesList.push(response.data);
      }
      })
      } else {
        this.$message.error(response.msg)
      }
    },
    //获取下拉框id和name的公共方法
    getName(id, list, name) {
      if(id){
        this.$forceUpdate()
        this.detailform.topInfor[name] = list.find(
          (item) => item.id == id
      ).detailName;
        console.log(this.detailform.topInfor[name]);
      }
    },
    //新兴市场二级
    getTwoSC(id) {
      this.detailform.contractInfo.marketSecondId='';
      this.emergingMarketTwo=[];
      if(id!=''){
        this.emergingMarket.find(
          (item)=>{
          if (item.id == id) {
          this.detailform.contractInfo.marketFirstName = item.detailName;
          this.emergingMarketTwo = item.children;
        }
      }
      )
      }
    },
    del(index) {
      console.log(index)
      var _self = this
      // this.$utils.isdel(function() {
      _self.detailform.contractInfo.splice(index, 1)
      // })
    },

    show(type) {
      this.type = type
      if (type === 'add') {
        this.resetinfo()
        this.title = '新增'
        this.detailform.contractInfo.push(this.sizeform)
      // this.dialogVisibleAdd = true
      }
    },
    resetinfo() {
      this.sizeform = {
        'id': '',
        'part': '',
        showinput: true

      }
    },
    handleClose(done) {
      this.resetform('form')
      done()
    },
    resetform(formName) {
      this.$refs[formName].resetFields()
    },
    // 加载列表
    getDetail() {

    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    }

  },
  mounted() {
    // eslint-disable-next-line no-unde
    this.getDetail()
    this.$store.dispatch("getConfig", {});
    this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
  }
}
</script>
<style lang="scss" scoped>
  .detatil-flie-btn{
    margin-left: 30px;
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
      /*float: left;*/
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

  .topInforTable {
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
  .detailBox{
    max-height:calc(100vh - 410px)!important;
  }
</style>
