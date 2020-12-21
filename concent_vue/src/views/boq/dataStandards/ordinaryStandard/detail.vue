<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color: #2a2a7d;line-height: 37px;"><b>标准库详情</b></span>
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
          :rules="detailformrules"
          class="gcform"
          ref="detailform"
        >
          <el-form-item
            label="项目编号:"
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
              size="mini"
              v-model="detailform.topInfor.inforName"/>
          </el-form-item>

            <el-form-item
              label="项目名称:"
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
                size="mini"
                v-model="detailform.topInfor.inforName"/>
            </el-form-item>

          <el-form-item
            label="单位:"
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
              size="mini"
              v-model="detailform.topInfor.inforName"/>
          </el-form-item>

            <!-- 下拉 -->

            <el-form-item
              label="启用状态:"
              prop="topInfor.belongLineId"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder=""
                size="mini"
                @change="
                  getName(
                    detailform.topInfor.belongLineId,
                    railwayLine,
                    'belongLineName'
                  )
                "
                v-model="detailform.topInfor.belongLineId"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in railwayLine"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- --------------------------------------------------------------- -->

            <el-form-item
              label="工程类别:"
              prop="topInfor.projectModelId"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                @change="
                  getName(
                    detailform.topInfor.projectModelId,
                    projectModel,
                    'projectModelName'
                  )
                "
                v-model="detailform.topInfor.projectModelId"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectModel"
                ></el-option>
              </el-select>
            </el-form-item>
          <!-- --------------------------------------------------------------- -->
          <div>
            <el-form-item
              label="标准库项目特征:"
              prop="topInfor.inforName"
            >
              <el-input
                type="textarea"
                :rows="2"
                clearable
                readonly
                style="width: 700px"
                v-model="detailform.topInfor.inforName"/>
            </el-form-item>
          </div>


            <p style="overflow: hidden；margin-right: 30px">
              <span style="float: left">项目特征修改: </span>
              <el-button
                v-show="p.actpoint != 'look'"
                @click="add('dd')"
                size="mini"
                style="
                  float: right;
                  width: 70px;
                  height: 32px;
                  background: #5c8bfa;
                  font-size: 16px;
                "
                type="primary"
              >新增
              </el-button
              >
            </p>
            <el-table
              :data="detailform.topInfoSiteList"
              :key="key"
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
                :resizable="false"
                label="特征描述"
                prop="contractAmount"
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    class="listInput"
                    clearable
                    :disabled="p.actpoint === 'look'"
                    v-model="scope.row.contractAmount"
                  ></el-input>
                  <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
                </template>
              </el-table-column>

              <el-table-column
                :resizable="false"
                label="启用状态"
                prop="contractAmount"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.isMain" label="1">启用</el-radio>
                  <el-radio v-model="scope.row.isMain" label="0">禁用</el-radio>
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
              >
                <template slot-scope="scope">
                  <el-link
                    :underline="false"
                    @click="del(scope.$index,scope.row,detailform.topInfoSiteList)"
                    type="warning"
                  >删除
                  </el-link
                  >
                </template>
              </el-table-column>
            </el-table>
        </el-form>
      </div>

    </el-card>
    <div class="btn-group" v-show="p.actpoint != 'look'">
      <el-button type="primary" @click="saveInfo('detailform')">保存</el-button>
     <!-- <el-button @click="submit">提交</el-button>-->
    </div>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'

  export default {
    // name: "详情",
    data() {
      return {
        id:'',
        key: 0,
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index
        value1: [],
        options2: [],
        options: [],
        detailform: {
          topInfor: {},
          topInfoOrg: {},
          topInfoSiteList: [],
          topInfoSectionList: [],
        },
        detailformrules: {},
        xqprojectType: [],//工程类别二级
        emergingMarketTwo:[],//新兴市场二级
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        sizeform: {projectScale: "", sectionName: ""},
      };
    },
    components: {
      Tree,
    },
    computed: {
      projectDomainType() {
        // console.log(this.$store.state.category["projectDomainType"])
        return this.$store.state.category.projectDomainType;
      },
      emergingMarket() {
        // console.log(this.$store.state.category.emergingMarket)
        return this.$store.state.category.emergingMarket;
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
      yesOrNo() {
        return this.$store.state.yesOrNo;
      },
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
      // this.$store.commit("setCategory", 'projectDomainType');
      this.id=this.p.instid;
      if (this.p.actpoint === "edit"||this.id) {
        this.getDetail();
      }
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      // eslint-disable-next-line no-unde
    },
    methods: {
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

        if(id!=''){
          this.detailform.topInfor.enginTypeSecondId='';
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
        if(id!=''){
          this.detailform.topInfor.marketSecondId='';
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
      saveInfo(formName) {

        var topInforCapitalList = [];
        this.amountSource.forEach((item) => {
          if (this.value1.indexOf(item.id) != -1) {
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
                "/api/topInfo/TopInfor/detail/saveOrUpdate",
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
                "/api/topInfo/TopInfoSection/list/delete",
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

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
  };
</script>
<style lang="scss">
  .btn-group{
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
      /*float: left;*/
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
    padding: 0 100px;
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

