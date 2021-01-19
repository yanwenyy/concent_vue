<template>
  <div>
    <!--<FileUpload :businessCode='"01"' :businessType='"bidInfo"' ></FileUpload>-->
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span class="detailSpan"><b>国标库详情</b></span>
        <el-button @click="back" class="detailbutton" >返回</el-button>
        <el-button v-show="p.actpoint != 'look'" type="primary" @click="saveInfo('detailform')" class="detailbutton">保存</el-button>
        <el-button v-show="p.actpoint != 'look'" @click="submit" class="detailbutton">提交</el-button>
      </div>
      <div class="detailBox">

      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
              <template slot="title"><p class="title_head">基本信息</p></template>

          <div class="padding">
        <el-form
          :inline="false"
          :model="detailform"
          :rules="rules"
          class="gcform"
          ref="detailform"
        >
          <el-form-item
            label="国标名称:"
            prop="topInfor.inforName"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-input
              :disabled="p.actpoint === 'look'"
              clearable

              v-model="detailform.topInfor.inforName"/>
          </el-form-item>
          <el-form-item
            label="子名称:"
          >
            <el-input
              :disabled="p.actpoint === 'look'"
              clearable

              v-model="detailform.topInfor.inforNameForeign"/>
          </el-form-item>

          <br>
          <el-form-item
              label="标准号:"
              prop="topInfor.constructionOrg"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable

                v-model="detailform.topInfor.constructionOrg"
              />
            </el-form-item>
          <el-form-item
            label="文号:"
            prop="topInfor.designOrg"
            :rules="{
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-input
              clearable
              :disabled="p.actpoint === 'look'"

              v-model="detailform.topInfor.designOrg"
            />
          </el-form-item>
          <br>
          <el-form-item
          label="实施日期:"
          prop="topInfor.planBidTime"
          :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"

        >
          <el-date-picker
            :disabled="p.actpoint === 'look'"
            filterable
            clearable
            type="date"
            value-format="timestamp"
            v-model="detailform.topInfor.planBidTime"

          >
          </el-date-picker>
        </el-form-item>

          <el-form-item
            label="归口单位:"
            prop="topInfor.bidAgentCompany"
            :rules="{
              message: '此项不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              :disabled="p.actpoint === 'look'"

              v-model="detailform.topInfor.bidAgentCompany"
            />
          </el-form-item>
        <br>
          <el-form-item
            label="适用范围:"
            prop="topInfor.enginTypeFirstId"
          >
            <el-select
              :disabled="p.actpoint === 'look'"
              clearable
              filterable
              placeholder="请选择"
              @change="getTwo"

              v-model="detailform.topInfor.enginTypeFirstId"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in projectDomainType"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            class="inline-formitem"
            label="是否启用情景状态:"
            prop="topInfor.isMajorProject"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-switch
              :disabled="p.actpoint === 'look'"
              class="inline-formitem-switch"
              v-model="detailform.topInfor.isMajorProject"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
            >
            </el-switch>
          </el-form-item>
            <br>
            <div>
              <el-form-item
                class="neirong"
                label="标准简介:"
                prop="topInfor.inforContent"
                style="width: 100%"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  :disabled="p.actpoint === 'look'"
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  v-model="detailform.topInfor.inforContent"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item
                class="neirong"
                label="编码说明:"
                prop="topInfor.inforContent"
                style="width: 100%"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  :disabled="p.actpoint === 'look'"
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  v-model="detailform.topInfor.inforContent"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item
                class="neirong"
                label="备注:"
                prop="topInfor.inforContent"
                style="width: 100%"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  :disabled="p.actpoint === 'look'"
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  v-model="detailform.topInfor.inforContent"
                />
              </el-form-item>
            </div>
        </el-form>
        </div>
       </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title"><p class="title_head">标段信息</p></template>

              <el-button-group style="float: left">
              <el-button
                v-show="p.actpoint != 'look'"
                @click="add('bd')"
                plain
                type="primary"
              >新增</el-button>

              <el-button
                v-show="p.actpoint != 'look'"
                @click="add('bd')"
                plain
                type="primary"
              >修改</el-button>

              <el-button
                v-show="p.actpoint != 'look'"
                @click="add('bd')"
                plain
                type="primary"
              >删除</el-button>

              <el-button
                v-show="p.actpoint != 'look'"
                @click="add('bd')"
                plain
                type="primary"
              >刷新</el-button>
              </el-button-group>

          <div style="float: right">
        <!-- <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
        <el-button @click="getData" type="primary" plain>查询</el-button> -->
        <!-- <el-button @click="Importdata" type="primary" plain>导入</el-button> -->
        <el-upload
                class="upload-demo detailUpload"
                :action="'/api/contract/topInfo/CommonFiles/bidInfo/01/uploadFile'"
                :on-success="handleChange"
                :on-error="handleChange"
                :show-file-list="false"
                accept=".xls,.xlsx"
                multiple
              >
                <el-button
                  type="primary"
                  plain
                  >导入
                  </el-button>
                  </el-upload>
        <el-button @click="exportdata" type="primary" plain>导出</el-button>

</div>
        <div class="padding">
        <el-form
          :inline="false"
          :model="detailform"
          :rules="rules"
          class="gcform"
          ref="detailform"
        >
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
              class="detailTable"
              ref="table"
              style="width: 98%;"
            >
              <el-table-column
                :width="80"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>

            <el-table-column
              :resizable="false"
              label="编码"
              prop="bidInfoSection.sectionName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目名称"
              prop="bidInfoSection.sectionName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="计量单位"
              prop="bidInfoSection.sectionName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目划分特征"
              prop="bidInfoSection.sectionName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="工程量计算规则"
              prop="bidInfoSection.sectionName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="工程（工作）内容"
              prop="bidInfoSection.sectionName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="附注"
              prop="bidInfoSection.sectionName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>
            </el-table>

        </el-form>
        </div>

       </el-collapse-item>
      </el-collapse>

    </div>




    </el-card>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import FileUpload from '@/components/fileUpload'
  import { isMoney, isMobile} from '@/utils/validate'
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
        maxMoney:1000000,
        id:'',
        key: 0,
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index
        options2: [],
        options: [],
        detailform: {
          topInfor: {},
          topInfoOrg: {},
          topInfoSiteList: [],
          topInfoSectionList: [],
          value1: [],
        },
        activeNames: ['1'],
        xqprojectType: [],//工程类别二级
        emergingMarketTwo:[],//新兴市场二级
        projectNatureTwo:[],//项目性质二级
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        sizeform: {projectScale: "", sectionName: ""},
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
        rules:{
          contractAmount: [
            { required: true,validator: validateMoney, trigger: 'change' }
          ],
          phone: [
            { required: true,validator: validatePhone, trigger: 'change' }
          ]
        },//表单验证规则
      };
    },
    components: {
      Tree,
      FileUpload
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
        return this.$store.state.category.projectNature;
      },
      certificationType(){
        return this.$store.state.certificationType;
      },
      bizCode() {
        return this.$store.state.bizCode;
      },
      projectPlate(){
        return this.$store.state.projectPlate;
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
    mounted() {
      // window.onresize = () => {
      //   return (() => {
      //     window.screenWidth = document.body.clientWidth
      //   console.log( window.screenWidth)
      // })()
      // }
      // this.$store.commit("setCategory", 'projectDomainType');
      this.id=this.p.instid;
      if (this.p.actpoint === "edit"||this.id) {
        this.getDetail();
      }
      if (this.p.actpoint === "add") {
        this.detailform.topInfoSiteList=[{
          country: '',
          ffid: '',
          path: '',
          contractAmount: '',
          isMain: ''
        }];
        this.detailform.topInfoSectionList=[{
          sectionName: '',
          projectScale: '',
        }]
      }
      this.$store.dispatch("getConfig", {});

      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
      // eslint-disable-next-line no-unde
    },
    methods: {
      //解决新增的时候二级联动清除不了
      clear(id,name){
        id='';
        name='';
        this.$forceUpdate();
      },
      //金额过滤
      getMoney(value){
        return isMoney(value);
      },
      //获取项目地点的值
      getPositionTree(data) {
        console.log(data)
        this.treeStatas = false;
        var country = '', _data = data;
        if (_data.fullDetailName.indexOf("境内") != -1) {
          country = '01';
        } else if (_data.fullDetailName.indexOf("境外") != -1) {
          country = '02';
        }
        this.detailform.topInfoSiteList.forEach((item, index) => {
          if (index == this.positionIndex) {
            // item.detailName = _data.detailName;
            item.country = country;
            item.ffid = _data.fullDetailCode;
            item.path = _data.fullDetailName;
          }
        });
        this.key = this.key + 1;
      },
      //选择项目地点
      selectPosition() {
        this.treeStatas = true;
        console.log(this.positionIndex);
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
        })
      },
      submit() {
      },
      //工程类别二级
      getTwo(id) {
        this.detailform.topInfor.enginTypeSecondId='';
        this.xqprojectType=[];
        if(id!=''){
          this.projectDomainType.find(
            (item) => {
              if (item.id == id) {
                this.detailform.topInfor.enginTypeFirstName = item.detailName;
                this.xqprojectType = item.children;
              }
            }
          )
        }
      },
      //新兴市场二级
      getTwoSC(id) {
        this.detailform.topInfor.marketSecondId='';
        this.emergingMarketTwo=[];
        if(id!=''){
          this.emergingMarket.find(
            (item)=>{
              if (item.id == id) {
                this.detailform.topInfor.marketFirstName = item.detailName;
                this.emergingMarketTwo = item.children;
              }
            }
          )
        }
      },
      //项目性质二级
      getTwoXZ(id){
        this.detailform.topInfor.projectNatureSecondId='';
        this.projectNatureTwo=[];
        if(id!=''){
          this.projectNature.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.topInfor.projectNatureFirstName = item.detailName;
            this.projectNatureTwo = item.children;
          }
        }
        )
        }
      },
      //获取下拉框id和name的公共方法
      getName(id, list, name) {
        if(id){
          this.$forceUpdate();
          this.detailform.topInfor[name] = list.find(
            (item) => item.id == id
          ).detailName;
          console.log(this.detailform.topInfor[name]);
        }
      },
      //获取下拉框id和name的公共方法
      getNameZb(id, list, name) {
        if(id){
          this.$forceUpdate()
          this.detailform.topInfoOrg[name] = list.find(
            (item) => item.id == id
        ).detailName;
          console.log(this.detailform.topInfoOrg[name]);
        }
      },
      saveInfo(formName) {

        var topInforCapitalList = [];
        this.amountSource.forEach((item) => {
          if (this.detailform.value1&&this.detailform.value1.indexOf(item.id) != -1) {
            var v = {
              capitalId: item.id,
              capitalName: item.detailName,
            };
            topInforCapitalList.push(v);
          }
        });
        this.detailform.topInforCapitalList=topInforCapitalList;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                "/api/contract/topInfo/TopInfor/detail/saveOrUpdate",
                JSON.stringify(this.detailform),
                {useJson: true}
              )
              .then((res) => {
                if (res.data.code === 200) {
                  this.$message({
                    message: "保存成功",
                    type: "success",
                  });
                  this.$refs[formName].resetFields();
                  this.$router.push({
                    path: "/manage/proposal/list",
                  });
                }
              });
          } else {
            this.$message.error("请添加必填项");
            return false;
          }
        });
      },
      pageGo() {
        this.searchParam.current = this.current;
        this.getuserlist();
      },
      back() {
        this.$router.back()
        // this.$router.push({
        //   path: "/manage/proposal/list",
        // });
      },
      del(index,item,list,type) {
        console.log(index);
        if(item.uuid&&type=='bd'){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                "/api/contract/topInfo/TopInfoSection/list/delete",
                {ids: [item.uuid]}
              )
              .then((res) => {
                if (res.data && res.data.code === 200) {
                  list.splice(index, 1);
                  console.log(list)
                } else {
                  this.$message.error(data.msg)
                }
              });
          }).catch(() => {})
        }else{
          list.splice(index, 1);
        }
        // var _self = this;
        // _self.detailform.topInfoSectionList.splice(index, 1);
      },
      //新增标段和地点
      add(type) {
        var v = {};
        if (type == 'dd') {
          v = {
            country: '',
            ffid: '',
            path: '',
            contractAmount: '',
            isMain: ''
          }
          this.detailform.topInfoSiteList.push(v);
        } else {
          v = {
            sectionName: '',
            projectScale: '',
          }
          this.detailform.topInfoSectionList.push(v);
        }
      },
      resetinfo() {
        this.sizeform = {
          id: "",
          part: "",
          showinput: true,
        };
      },
      // 加载列表
      getDetail() {
        this.$http
          .post("/api/contract/topInfo/TopInfor/detail/entityInfo", {topOrgId:this.id})
          .then((res) => {
            var datas=res.data.data;
            this.getTwo(datas.topInfor.enginTypeFirstId);
            this.getTwoSC(datas.topInfor.marketFirstNameId);
            this.getTwoXZ(datas.topInfor.projectNatureFirstId);
            this.detailform={
              topInfor: datas.topInfor,
              topInfoOrg: datas.topInfoOrg,
              topInfoSiteList: datas.topInfoSiteList,
              topInfoSectionList: datas.topInfoSectionList,
              value1:[],
            }
            datas.topInforCapitalList.forEach((item)=>{
              this.detailform.value1.push(item.capitalId)
            });
          });
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
  };
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

  >>>.el-collapse-item__header{
    color: #0a469d !important;
    height: 20px;
    background: #ebf0f9 !important;
  }
  .detailBox{
    padding: 0px !important;
  }
  .padding{
    padding: 0 100px;
  }
  .title_head{
    margin: 0 0 0 10px;
  }
</style>

