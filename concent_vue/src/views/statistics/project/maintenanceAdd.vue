<!--运营维管项目登记-->
<template>
  <div>
    <el-card>
          <div slot="header" class="clearfix">
        <span style="color: #2a2a7d"><b>运营维管项目新增</b></span>
        <el-button style="float: right; padding: 10px 20px ;border:1px solid #ddd;color: black;position:fixe" type="text">返回</el-button>
      </div>
      </el-card>
    <el-card class="box-card">


      <div style="height:900px">
    <el-form
      :inline="false"
      :model="detailform"
      :rules="detailformrules"
      class="gcform"
      ref="detailform"
      style="background: white"
    >
      <el-row>
        <el-form-item
          label="项目名称:"
          prop="clothSize.bcPlateTypeId"
          required
           style="width:33%;"
        >
          <el-input
            clearable
            placeholder="请输入"
            size="mini"
            v-model="detailform.clothSize.bcPlateTypeId"
          />
        </el-form-item>
        <el-form-item
          label="签约单位:"
          prop="clothSize.bcPlateTypeId"
           style="width:33%;"

        >
          <el-input
            clearable
            placeholder="请输入"
            size="mini"
            v-model="detailform.clothSize.bcPlateTypeId"
          />
        </el-form-item>

        <el-form-item
          label="合同号:"
          prop="clothSize.bcTypeId"
          style="width:33%;"
        >
           <el-input
            clearable
            placeholder="请输入"
            size="mini"
            v-model="detailform.clothSize.bcPlateTypeId"
          />
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item
          label="合同金额(万元):"
          prop="clothSize.bcStyleId"
           style="width:33%;"
        >
          <el-input
            clearable
            placeholder="请输入"
            size="mini"
            v-model="detailform.clothSize.bcPlateTypeId"
          />
        </el-form-item>
        <el-form-item
          label="我方份额(万元):"
          prop="clothSize.bcStyleId"
           style="width:33%;"
        >
          <el-input
            clearable
            placeholder="请输入"
            size="mini"
            v-model="detailform.clothSize.bcPlateTypeId"
          />
        </el-form-item>
         <el-form-item
          label="项目地点:"
          prop="clothSize.bcTypeId"
          required
           style="width:33%;"

        >
          <el-select

            :disabled="p.actpoint === 'look'"
            @change="chg"
            clearable
            filterable
            placeholder="请选择"
            size="mini"
            v-model="detailform.clothSize.bcTypeId"
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
          label="合同签订时间:"
          prop="clothSize.bcStyleId"
          size="mini"
          style="width:33%;"

        >
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="所属单位:"
          prop="clothSize.bcTypeId"
           style="width:33%;"
        >
          <el-select
            :disabled="p.actpoint === 'look'"
            @change="chg"
            clearable
            filterable
            placeholder="请选择"
            size="mini"
            v-model="detailform.clothSize.bcTypeId"
          >
            <el-option
              :key="index"
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in options3"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="项目状态:"
          required
          prop="clothSize.bcStyleId"
           style="width:33%;"
        >
          <el-select
            :disabled="p.actpoint === 'look'"
            @change="chg1"
            filterable
            clearable
            placeholder="请选择"
            size="mini"
            v-model="detailform.clothSize.bcStyleId"
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
          label="是否年度合同:"
          prop="clothSize.bcStyleId"
           style="width:33%;"
        >
          <el-select
            :disabled="p.actpoint === 'look'"
            @change="chg1"
            filterable
            clearable
            placeholder="请选择"
            size="mini"
            v-model="detailform.clothSize.bcStyleId"
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
          label="新兴市场一级类别:"
          prop="clothSize.bcTypeId"
          required
           style="width:33%;"

        >
          <el-select

            :disabled="p.actpoint === 'look'"
            @change="chg"
            clearable
            filterable
            placeholder="请选择"
            size="mini"
            v-model="detailform.clothSize.bcTypeId"
          >
            <el-option
              :key="index"
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in options4"
            ></el-option>
          </el-select>
        </el-form-item>
          <el-form-item
          label="新兴市场二级类别:"
          required
          prop="clothSize.bcStyleId"
           style="width:33%;"

        >
          <el-select

            :disabled="p.actpoint === 'look'"
            @change="chg1"
            filterable
            clearable
            placeholder="请选择"
            size="mini"
            v-model="detailform.clothSize.bcStyleId"
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
          label="业务类别一级:"
          prop="clothSize.bcStyleId"
          required
           style="width:33%;"
        >
          <el-select

            :disabled="p.actpoint === 'look'"
            @change="chg1"
            filterable
            clearable
            placeholder="请选择"
            size="mini"
            v-model="detailform.clothSize.bcStyleId"
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
          label="业务类别二级:"
          prop="clothSize.bcTypeId"
          style="width:33%;"
        >
          <el-select

            :disabled="p.actpoint === 'look'"
            @change="chg"
            clearable
            filterable
            placeholder="请选择"
            size="mini"
            v-model="detailform.clothSize.bcTypeId"
          >
            <el-option
              :key="index"
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in options5"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item
          label="增值税(万元):"
          required
          prop="clothSize.bcStyleId"
           style="width:33%;"
        >
          <el-input
            clearable
            placeholder="请输入"
            size="mini"
            v-model="detailform.clothSize.bcPlateTypeId"
          />

        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item
          label="推送人:"
          prop="clothSize.bcStyleId"
           style="width:33%;"
        >
          <el-input
            clearable
            placeholder="请输入"
            size="mini"
            v-model="detailform.clothSize.bcPlateTypeId"
          />
        </el-form-item>
        <el-form-item
          label="联系方式:"
          prop="clothSize.bcTypeId"
           style="width:33%;"

        >
           <el-input
            clearable
            placeholder="请输入"
            size="mini"
            v-model="detailform.clothSize.bcPlateTypeId"
          />
        </el-form-item>
</el-row>
 <el-row>
            <el-form-item
            class="neirong"
              label="项目内容(最多1000字):"
              prop="clothSize.bcPlateTypeId"
              style="width: 33%"

            >
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-input
                clearable
                placeholder="请输入"
                size="mini"
                v-model="detailform.clothSize.bcPlateTypeId"
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
      switchvalue:true,
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
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      detailform: {
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
          createOrgName: "",
        },
        clothSizePartList: [],
      },

      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
    };
  },
  computed: {},
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
      this.detailform.clothSize.bcStyleId = "";
      this.detailform.clothSize.bcPlateTypeId = "";
      this.options1.forEach((item) => {
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
      _self.detailform.clothSizePartList.splice(index, 1);
      // })
    },

    show(type) {
      this.type = type;
      if (type === "add") {
        this.resetinfo();
        this.title = "新增";
        this.detailform.clothSizePartList.push(this.sizeform);
        // this.dialogVisibleAdd = true
      }
    },
    resetinfo() {
      this.sizeform = {
        id: "",
        part: "",
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
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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
                this.$store.dispatch("clearToolBar", {
                  detail: this.$route.fullPath,
                });
                this.$store.dispatch("clearCache", this.$route.name);
                let p = { actpoint: "edit", uuid: res.data.data.clothSize.id };
                this.$router.push({
                  path: "/app/base/tailsize/detailedit",
                  query: { p: this.$utils.encrypt(JSON.stringify(p)) },
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
    // eslint-disable-next-line no-unde
    this.getDetail();
  },
};
</script>
<style lang="scss" scoped>
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

  // height: 400px;
// border: 1px solid black;
// height: 200px;
}
.el-input--mini .el-input__inner{
  height: 40px;
  width: 100%;
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
