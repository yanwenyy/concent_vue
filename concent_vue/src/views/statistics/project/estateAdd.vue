<!--房地产项目登记-->
<template>
  <div>
    <el-card>
      <div class="clearfix el-card__header">
        <span style="color: #2a2a7d;line-height: 32px"><b>房地产项目详情</b></span>
        <el-button @click="back" class="detailbutton">返回</el-button>
        <el-button type="primary"  class="detailbutton">保存</el-button>
        <el-button @click="submitForm" class="detailbutton">提交</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="detailBox">
        <el-form
          :inline="false"
          :model="detailForm"
          :rules="rules"
          class="gcform"
          ref="detailForm"
          style="background: white">
          <el-row>
            <el-form-item
              label="项目名称:"
              prop="projectName"
              style="width: 33%">
              <el-input
                clearable
                placeholder="请输入"
                v-model="detailForm.project.projectName"/>
            </el-form-item>
            <el-form-item
              label="项目详细地点:"
              prop="projectAddress"
              style="width:33%;">
              <el-input
                clearable
                placeholder="请输入"
                v-model="detailForm.project.projectAddress"/>
            </el-form-item>
            <el-form-item
              label="建设用地面积(万平方米):"
              prop="projectLandArea"
              style="width:33%;">
              <el-input
                clearable
                placeholder="请输入"
                v-model="detailForm.project.projectLandArea"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="合同号:"
              prop="contractNumber"
              style="width:33%;">
              <el-input
                clearable
                placeholder="请输入"
                v-model="detailForm.project.contractNumber"/>
            </el-form-item>
            <el-form-item
              label="签约总金额(万元):"
              prop="amountSignup"
              style="width:33%;">
              <el-input
                clearable
                placeholder="请输入"
                v-model="detailForm.project.amountSignup"/>
            </el-form-item>
            <el-form-item
              label="我方份额(万元):"
              prop="amountWe"
              style="width:33%;">
              <el-input
                clearable
                placeholder="请输入"
                v-model="detailForm.project.amountWe"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="合同签订时间:"
              prop="ocontractSignTime"
              style="width: 33%">
              <el-date-picker
                v-model="detailForm.project.ocontractSignTime"
                type="datetime"
                placeholder="选择日期时间"/>
            </el-form-item>
            <el-form-item
              label="是否海外合同:"
              prop="isOverseasContract"
              style="width:33%;">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                v-model="detailForm.project.isOverseasContract">
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in yesOrNo"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="项目状态:"
              prop="projectStatusId"
              style="width:33%;">
              <el-select
                filterable
                clearable
                placeholder="请选择"
                v-model="detailForm.project.projectStatusId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectStatus"/>
              </el-select>
            </el-form-item>
            <el-form-item
              label="是否为年度合同:"
              prop="isAnnualContract"
              style="width:33%;">
              <el-select
                filterable
                clearable
                placeholder="请选择"
                v-model="detailForm.project.isAnnualContract">
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in yesOrNo"/>
              </el-select>
            </el-form-item>
            <el-form-item
              label="签约单位:"
              prop="amountCompanyId"
              style="width:33%;">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                v-model="detailForm.project.amountCompanyId">
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in options4"/>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="新兴市场类别(一级):"
              prop="marketFirstId"
              style="width: 33%">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                @change="getMarketTwo"
                v-model="detailForm.project.marketFirstId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in emergingMarket"/>
              </el-select>
            </el-form-item>
            <el-form-item
              label="新兴市场类别(二级):"
              prop="marketSecondId"
              style="width: 33%">
              <el-select
                filterable
                clearable
                placeholder="请选择"
                v-model="detailForm.project.marketSecondId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in emergingMarketTwo"/>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="推送人 :"
              prop="clothSize.bcPlateTypeId"
              style="width:33%;"
            >
              <el-input
                clearable
                placeholder="请输入"
                size="mini"
                v-model="detailForm.clothSize.bcPlateTypeId"
              />
            </el-form-item>

            <el-form-item
              label="联系方式 :"
              prop="clothSize.bcPlateTypeId"
              style="width:33%;"
            >
              <el-input
                clearable
                placeholder="请输入"
                size="mini"
                v-model="detailForm.clothSize.bcPlateTypeId"
              />
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "投资模式",
  data() {
    return {
      switchvalue: true,
      yesOrNo: [
        { label: '是', value: 0 },
        { label: '否', value: 1 }
      ],
      options1: [{ label: "值1", value: "111" }],
      options2: [{ label: "值2", value: "111" }],
      options3: [{ label: "值3", value: "111" }],
      options4: [{ label: "值4", value: "111" }],
      options5: [{ label: "值5", value: "111" }],
      options6: [{ label: "值", value: "111" }],
      options7: [{ label: "值", value: "111" }],
      options8: [{ label: "值", value: "111" }],
      options9: [{ label: "值", value: "111" }],
      options10: [{ label: "值", value: "111" }],
      options11: [{ label: "值", value: "111" }],
      options12: [{ label: "值", value: "111" }],
      options13: [{ label: "值", value: "111" }],
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      detailForm: {
        project: {
          projectName: '',
          projectAddress: '',
          projectLandArea: '',
          contractNumber: '',
          amountSignup: '',
          amountWe: '',
          bcPlateTypeId: '',
          ocontractSignTime: '',
          isOverseasContract: '',
          projectStatusId: '',
          isAnnualContract: '',
          amountCompanyId: '',
          marketFirstId: '',
          marketSecondId: '',
        },
        clothSize: {
          id: "",
          bcTypeId: "",
          bcStyleId: "",
          bcPlateTypeId: "",
          bcTypeName: "",
          bcStyleName: "",
          bcPlateTypeName: "",
          isDelete: 0,
          createTime: "",
          createUserId: 0,
          createUserName: "",
          createOrgId: 0,
          createOrgName: ""
        },
        clothSizePartList: []
      },

      p: JSON.parse(this.$utils.decrypt(this.$route.query.p))
    };
  },
  computed: {
    projectStatus() {
      return this.$store.state.projectStatus
    },
  },
  methods: {
    pageGo() {
      this.searchParam.current = this.current;
      this.getuserlist();
    },
    showinputchg() {},
    partchg(row) {
      row.showinput = false;
    },

    chg(val) {
      this.errorMsg = Math.random();
      this.errorMsg0 = Math.random();
      this.$nextTick(() => {
        this.errorMsg = "";
        this.errorMsg0 = "";
      });
      this.detailForm.clothSize.bcStyleId = "";
      this.detailForm.clothSize.bcPlateTypeId = "";
      this.options1.forEach(item => {
        if (val === item.value) {
          this.options2 = item.children;
        }
      });
    },
    chg1() {
      this.errorMsg = Math.random();
      this.errorMsg0 = Math.random();
      this.$nextTick(() => {
        this.errorMsg = "";
        this.errorMsg0 = "";
      });
      if (this.detailForm.clothSize.bcStyleId === "") {
        this.detailForm.clothSize.bcPlateTypeId = "";
      }
      if (this.detailForm.clothSize.bcTypeId === "") {
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
      if (this.detailForm.clothSize.bcStyleId === "") {
        this.detailForm.clothSize.bcPlateTypeId = "";
        this.$message.error("请先选择款式类型！");
      }
    },

    del(index) {
      console.log(index);
      var _self = this;
      // this.$utils.isdel(function() {
      _self.detailForm.clothSizePartList.splice(index, 1);
      // })
    },

    show(type) {
      this.type = type;
      if (type === "add") {
        this.resetinfo();
        this.title = "新增";
        this.detailForm.clothSizePartList.push(this.sizeform);
        // this.dialogVisibleAdd = true
      }
    },
    resetinfo() {
      this.sizeform = {
        id: "",
        part: "",
        showinput: true
      };
    },
    handleClose(done) {
      this.resetform("form");
      done();
    },
    resetform(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    carry(formName) {
      if (
        [...new Set(this.detailForm.clothSizePartList.map(item => item.part))]
          .length < this.detailForm.clothSizePartList.length
      ) {
        this.$message.error("部位填写重复");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "/api/contract/basicConfig/ClothSize/detail/save",
              JSON.stringify(this.detailForm),
              { useJson: true }
            )
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: "保存成功",
                  type: "success"
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
      if (
        [...new Set(this.detailForm.clothSizePartList.map(item => item.part))]
          .length < this.detailForm.clothSizePartList.length
      ) {
        this.$message.error("部位填写重复");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "/api/contract/basicConfig/ClothSize/detail/save",
              JSON.stringify(this.detailForm),
              { useJson: true }
            )
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.$store.dispatch("clearToolBar", {
                  detail: this.$route.fullPath
                });
                this.$store.dispatch("clearCache", this.$route.name);
                let p = { actpoint: "edit", uuid: res.data.data.clothSize.id };
                this.$router.push({
                  path: "/app/base/tailsize/detailedit",
                  query: { p: this.$utils.encrypt(JSON.stringify(p)) }
                });
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
          console.log("error submit!");
          return false;
        }
      });
    },
    sure() {
      console.log(this.sizeform);
      this.$refs["sizeform"].validate(valid => {
        if (valid) {
          this.detailForm.clothSizePartList.push(this.sizeform);
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
    }
  },
  mounted() {
    // eslint-disable-next-line no-unde
    this.getDetail();
  }
}
</script>
<style lang="scss" scoped>
  .gcform{
    >>>.el-form-item__error {
      padding-top: 0px;
      width: 95%;
      margin-left: 0;
      text-align: right;
      top: 0%;
    }
    >>>.el-form-item__label:before {
      position: initial;
      left: -10px;
    }
    .el-form-item{
      float: left;
      .el-input{
        width: 95%;
      }
      .el-select{
        width: 95%;
      }
    }
  }
</style>
