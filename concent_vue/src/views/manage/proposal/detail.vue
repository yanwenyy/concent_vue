<template>
  <div>
    <el-card class="box-card">
          <div slot="header" class="clearfix">
        <span style="color: #2a2a7d"><b>信息管理详情</b></span>
        <el-button @click="back" style="float: right; padding: 10px 20px ;border:1px solid #ddd;color: black;position:fixe" type="text">返回</el-button>
      </div>

      <div style="overflow: auto;max-height: 480px;padding-bottom: 10px">
        <el-form
          :inline="false"
          :model="detailform"
          :rules="detailformrules"
          class="gcform"
          ref="detailform"
          style="background: white;height:ceil(100%-300px)"
        >
<el-row>
            <el-form-item
              label="项目板块:"
              prop="topInfor.moduleId"
              style="width: 33%"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                @change="chg"
                clearable
                filterable
                style="width: 100%"
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInfor.moduleId"
              >
                <el-option
                  :key="index"
                  :label="item.categoryName"
                  :value="item.id"
                  v-for="(item, index) in options1"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="工程类别(一级):"
              prop="topInfor.enginTypeFirstId"
              style="width: 33%"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInfor.enginTypeFirstId"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options1"
                ></el-option>
              </el-select>
            </el-form-item>

                        <el-form-item
              label="工程类别(二级):"
              prop="topInfor.enginTypeSecondId"
              style="width: 33%"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInfor.enginTypeSecondId"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options1"
                ></el-option>
              </el-select>
            </el-form-item>
</el-row>
<el-row>
            <el-form-item
              label="项目名称:"
              prop="topInfor.inforName"
              style="width: 33%"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                clearable
                size="mini"
                v-model="detailform.topInfor.inforName"
              />
            </el-form-item>


            <el-form-item
              label="建设单位:"
              prop="topInfor.constructionOrg"
              style="width: 33%"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                clearable
                size="mini"
                v-model="detailform.topInfor.constructionOrg"
              />
            </el-form-item>
            <el-form-item
              label="公告类型:"
              prop="topInfor.noticeTypeId"

              style="width: 33%"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInfor.noticeTypeId"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options1"
                ></el-option>
              </el-select>
            </el-form-item>
</el-row>
            <!-- 下拉 -->
<el-row>
            <el-form-item
              label="预计招标时间:"
              prop="topInfor.planBidTime"
              style="width: 33%"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInfor.planBidTime"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options2"
                ></el-option>
              </el-select>
            </el-form-item>

          <!-- 下拉 -->

            <el-form-item
              label="所属线路:"
              prop="topInfor.belongLineId"
              style="width: 33%"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择或直接填写所属现路"
                size="mini"
                v-model="detailform.topInfor.belongLineId"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options2"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- --------------------------------------------------------------- -->
            <el-form-item
              label="招标人:"
              prop="topInfor.bidPerson"
              style="width: 33%"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                clearable
                size="mini"
                v-model="detailform.topInfor.bidPerson"
              />
            </el-form-item>
            </el-row>
<el-row>
            <el-form-item
              label="设计单位:"
              prop="topInfor.designOrg"
              style="width: 33%"
              :rules="{
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                clearable
                size="mini"
                v-model="detailform.topInfor.designOrg"
              />
            </el-form-item>


            <el-form-item
              label="招标代理公司:"
              prop="topInfor.bidAgentCompany"
              style="width: 33%"
              :rules="{
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                size="mini"
                v-model="detailform.topInfor.bidAgentCompany"
              />
            </el-form-item>
            <el-form-item
              label="项目模式:"
              prop="topInfor.projectModelId"
              style="width: 33%"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInfor.projectModelId"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options1"
                ></el-option>
              </el-select>
            </el-form-item>
            </el-row>
            <el-row>
            <el-form-item
              label="资审方式:"
              prop="topInfor.verifyTypeId"
              style="width: 33%"
              :rules="{
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                clearable
                placeholder=""
                size="mini"
                v-model="detailform.topInfor.verifyTypeId"
              />
            </el-form-item>


            <el-form-item
              label="资金来源:"
              prop="topInfor.investment"
              style="width: 33%"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                multiple
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInfor.investment"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options2"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="项目跟踪负责人:"
              prop="topInfoOrg.projectTrackResponPerson"
              style="width: 33%"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                clearable
                placeholder=""
                size="mini"
                v-model="detailform.topInfoOrg.projectTrackResponPerson"
              />
            </el-form-item>
            </el-row>
            <el-row>
            <el-form-item
              label="联系电话:"
              prop="topInfoOrg.contactMode"
              style="width: 33%"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                clearable
                placeholder=""
                size="mini"
                v-model="detailform.topInfoOrg.contactMode"
              />
            </el-form-item>


            <el-form-item
              label="投资额（万元）:"
              prop="topInfor.investment"
              style="width: 33%"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                clearable
                placeholder=""
                size="mini"
                v-model="detailform.topInfor.investment"
              />
            </el-form-item>

            <el-form-item
              label="项目地点:"
              prop="topInfor.bidPerson"
              style="width: 33%"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInfor.bidPerson"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options2"
                ></el-option>
              </el-select>
            </el-form-item>
</el-row>
<el-row>
            <el-form-item
              label="是否为重大项目:"
              prop="topInfor.isMajorProject"
              style="width: 33%"
            >
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                size="mini"
                v-model="detailform.topInfor.isMajorProject"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options2"
                ></el-option>
              </el-select>
            </el-form-item>
</el-row>
          <el-row>
            <el-form-item
            class="neirong"
              label="项目内容(最多1000字):"
              prop="topInfor.inforContent"
              style="width: 33% "
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-input
                clearable
                placeholder="请输入"
                size="mini"
                v-model="detailform.topInfor.inforContent"

              />
            </el-form-item>
          </el-row>
      <el-row class="detail_bottom">
          <p style="overflow: hidden；margin-right: 30px">
            <span style="float: left">标段信息: </span>
            <el-button
              @click="show('add')"
              size="mini"
              style="
                float: right;
                width: 70px;
                height: 32px;
                background: #5c8bfa;
                font-size: 16px;"
                type="primary"
              >新增</el-button ></p>
          <el-table
            :data="detailform.topInfoSectionList"
            :header-cell-style="{
              'text-align': 'center',
              'background-color': 'rgba(246,248,252,1)',
              'color': 'rgba(0,0,0,1)'}"

            @selection-change="handleSelectionChange"
            align="center"
            border
            class="clothSizeTable"
            ref="table"
            style="width: 98%; min-height: calc(100vh - 370px)"
          >
            <el-table-column
              :width="150"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column
              :resizable="false"
              label="项目名称"
              prop="topInfor.inforName"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-form-item

                  label-width="0"
                >
                  <el-input
                    max-length="50"
                    clearable
                    :disabled="p.actpoint === 'look'"
                    size="mini"
                    v-model="detailform.topInfor.inforName"
                  ></el-input>
                </el-form-item>
                <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
              </template>
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="标段名"
              prop="topInfoSectionList.sectionName"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-form-item

                  label-width="0"
                >
                  <el-input
                    max-length="50"
                    clearable
                    :disabled="p.actpoint === 'look'"
                    size="mini"
                    v-model="detailform.topInfoSectionList.sectionName"
                  ></el-input>
                </el-form-item>
                <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
              </template>
            </el-table-column>
            <el-table-column
              :resizable="false"
              fixed="right"
              label="操作"
              show-overflow-tooltip
              v-if="p.actpoint !== 'look'"
              width="200"
            >
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  @click="del(scope.$index)"
                  type="warning"
                  >删除</el-link
                >
              </template>
            </el-table-column>
          </el-table>

          <el-row style="text-align: center">
            <el-button type="primary" @click="saveInfo('detailform')">保存</el-button>
            <el-button  @click="submit">提交</el-button>
          </el-row>
          </el-row>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "详情",
  data() {
    return {
      options2: [],
      detailform: {
        topInfor:{

        },
        topInfoOrg:{

        },
        topInfoSectionList:[]
        // topInfoSiteList:{

        // },



      },

      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      sizeform:{projectScale:'',sectionName:''}
    };
  },
  computed: {
    options1 () {
      return this.$store.state.optiondata
    },
  },
  methods: {
    saveInfo(formName){
       this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post(
              "/api/topInfo/TopInfor/detail/save",
              JSON.stringify(this.detailform),
              { useJson: true }
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
    pageGo() {
      this.searchParam.current = this.current;
      this.getuserlist();
    },
    showinputchg() {},
    partchg(row) {
      row.showinput = false;
    },
    back(){
        this.$router.push({
        path: "/manage/proposal/list"
      });
    },
    chg(val) {
        var name = ''
      this.options1.forEach((item) => {
        if (val === item.categoryCode) {
          name = item.categoryName
          this.options2 = item.sysCategoryDetailList
        }
      })
      console.log(val)
      console.log(name)

    },
    chg1() {
      this.errorMsg = Math.random();
      this.errorMsg0 = Math.random();
      this.$nextTick(() => {
        this.errorMsg = "";
        this.errorMsg0 = "";
      });
      if (this.detailform.clothSize.bcStyleId === "") {
        this.detailform.clothSize.bcPlateTypeId = "";
      }
      if (this.detailform.clothSize.bcTypeId === "") {
        this.$message.error("请先选择样衣类型！");
      }
    },
    chg2() {
      this.errorMsg = Math.random();
      this.errorMsg0 = Math.random();
      this.$nextTick(() => {
        this.errorMsg = "";
        this.errorMsg0 = "";
      });
      if (this.detailform.clothSize.bcStyleId === "") {
        this.detailform.clothSize.bcPlateTypeId = "";
        this.$message.error("请先选择款式类型！");
      }
    },

    del(index) {
      console.log(index);
      var _self = this;
      // this.$utils.isdel(function() {
      _self.detailform.topInfoSectionList.splice(index, 1);
      // })
    },

    show(type) {
      this.type = type;
      if (type === "add") {
        this.resetinfo();
        this.title = '新增'
        this.detailform.topInfoSectionList.push(this.sizeform);
        // this.dialogVisibleAdd = true
      }
    },
    resetinfo() {
      this.sizeform = {
        'id': "",
        'part': "",
        showinput: true,
      };
    },
    handleClose(done) {
      this.resetform("form");
      done();
    },
    resetform(formName) {
      this.$refs[formName].resetFields();
    },
    carry(formName) {
      if (
        [...new Set(this.detailform.clothSizePartList.map((item) => item.part))]
          .length < this.detailform.clothSizePartList.length
      ) {
        this.$message.error("部位填写重复");
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post(
              "/api/basicConfig/ClothSize/detail/save",
              JSON.stringify(this.detailform),
              { useJson: true }
            )
            .then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.$refs[formName].resetFields();
              }
              if (res.data.code === 10) {
                this.errorMsg = Math.random();
                this.errorMsg0 = Math.random();
                this.$nextTick(() => {
                  this.errorMsg = res.data.msg;
                  this.errorMsg0 = " ";
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
        if (valid) {
          this.$http
            .post(
              "/api/basicConfig/ClothSize/detail/save",
              JSON.stringify(this.detailform),
              { useJson: true }
            )
            .then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
              }
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    sure() {
      console.log(this.sizeform);
      this.$refs["sizeform"].validate((valid) => {
        if (valid) {
          this.detailform.clothSizePartList.push(this.sizeform);
          this.dialogVisibleAdd = false;
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },

    // 加载列表
    getDetail() {},

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  mounted() {
    this.$store.dispatch('getConfig', { })
    // eslint-disable-next-line no-unde
    this.getDetail();
  },
};
</script>
<style lang="scss">
.gcform {
  margin-top: 10px;
  .el-form-item__label:before {
    position: initial;
    left: -10px;
  }
  .el-form-item__error {
    padding-top: 0px;
    width: 95%;
    text-align: left;
    margin-left: 0;
    margin: right;
    text-align: right;
    top:0%
  }
  .el-form-item {
    float: left;
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
  td {
    padding: 0;
  }
  .el-form-item__content {
    height: 60px;
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
.el-input--mini .el-input__inner{
  height: 40px;
  width: 100%;;
  padding: 0;
}
.gcform .el-input{
  width: 95%;
}
.neirong{
  width: 100% !important;
}
.gcform .el-form-item{
  margin-bottom: 0px;
}
.neirong .el-input--mini .el-input__inner{
height: 100px;
}
.detail_bottom{
  margin: 50px 0 0 0;
  border: 1px solid #ddd;
}
.el-card, .el-message{
  overflow: hidden;
}
.el-scrollbar__wrap.default-scrollbar__wrap{
  overflow: hidden;
}
.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
  overflow: auto ;
  // height: 500px ;
}
</style>
