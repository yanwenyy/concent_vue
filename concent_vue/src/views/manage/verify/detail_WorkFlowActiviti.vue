<template>
  <div >
        <el-card class="box-card">
      <div slot="header" class="clearfix" >
        <span style="color: #2a2a7d"><b>资审管理详情</b></span>
        <el-button style="float: right; padding: 10px 20px ;border:1px solid #ddd;color: black" type="text">返回</el-button>
      </div>

      <div style="overflow: auto;max-height: 480px;padding-bottom: 10px">
    <el-form
      :inline="false"
      :model="detailform"
      class="gcform"
      ref="detailform"
      style="background: white;"
    >
    <el-row>
      <el-form-item
        label="项目名称:"
        style="width: 33%"
      >

        <el-input
          readonly

          v-model="detailform.topInfor.inforName"
        />
      </el-form-item>
        <el-form-item
        label="工程类别（一级）:"
        style="width: 33%"
      >
<!--        <el-select-->
<!--          :disabled="p.actpoint==='look'"-->
<!--          @change="chg"-->
<!--          clearable-->
<!--          filterable-->
<!--          placeholder="请选择"-->
<!--           -->
<!--          v-model="detailform.clothSize.bcTypeId"-->
<!--        >-->
<!--          <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options1"></el-option>-->
<!--        </el-select>-->
          <el-input
            readonly

            v-model="detailform.topInfor.enginTypeFirstName"
          />
      </el-form-item>
      <el-form-item
        label="工程类别（二级）:"
        style="width: 33%
              "
      >
        <el-input
          readonly

          v-model="detailform.topInfor.enginTypeSecondName"
        />
      </el-form-item>

</el-row>
<el-row>
      <el-form-item
        readonly
        label="公告类型:"
        style="width: 33%"
      >
        <el-input
          readonly

          v-model="detailform.topInfor.noticeTypeName"
         />

      </el-form-item>
        <el-form-item
        label="招标方式:"
        style="width: 33%"
      >
          <el-select
            :disabled="p.actpoint === 'look'"
            filterable
            placeholder="请选择"

            v-model="detailform.verify.bidModeName"
          >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in bidType"
            ></el-option>
          </el-select>
<!--          <el-input-->
<!--             -->
<!--            v-model="detailform.verify.bidModeName"-->
<!--          />-->
      </el-form-item>

<!-- 下拉 -->

      <el-form-item
        label="是否联合体投标:"
        prop="verify.isCoalitionBid"
        style="width: 33%"
        :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
      >
<!--        <el-select-->
<!--          :disabled="p.actpoint === 'look'"-->
<!--          filterable-->
<!--          placeholder="请选择"-->
<!--           -->
<!--          v-model="detailform.verify.isCoalitionBid"-->
<!--        >-->
<!--          <el-option-->
<!--            :key="index"-->
<!--            :label="item.detailName"-->
<!--            :value="item.id"-->
<!--            v-for="(item, index) in yesOrNo"-->
<!--          ></el-option>-->
<!--        </el-select>-->
        <el-input
          clearable

          v-model="detailform.verify.isCoalitionBid"
        />
      </el-form-item>
</el-row>
<!-- 不下拉 -->
<el-row>
      <el-form-item
        label="资审文件发售截止日期:"
        prop="verify.saleTime"
        style="width: 33%"
        :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
      >
        <el-date-picker
          clearable
          value-format="timestamp"
          v-model="detailform.verify.saleTime"
          align="right"
          type="date"
          placeholder="选择日期">
        </el-date-picker>

      </el-form-item>
<!-- --------------------------------------------------------------- -->
      <el-form-item
        label="设计单位:"
        style="width: 33%">
        <el-input
          readonly

          v-model="detailform.topInfor.designOrg"
         />

      </el-form-item>
      <el-form-item
        label="递交资格预审申请文件日期:"
        prop="verify.subTime"
        style="width: 33%
        "
        :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
      >

        <el-date-picker
          clearable
          value-format="timestamp"
          v-model="detailform.verify.subTime"
          align="right"
          type="date"
          placeholder="选择日期">
        </el-date-picker>

      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item
        label="资格预审公告发布日期:"
        prop="verify.publishTime"
        style="width: 33%"
        :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
      >
        <el-date-picker
          clearable
          value-format="timestamp"
          v-model="detailform.verify.publishTime"
          align="right"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="招标代理公司:"
        style="width: 33%
        "
      >
        <el-input
          readonly
          placeholder=""

          v-model="detailform.topInfor.bidAgentCompany"
         />

      </el-form-item>
      <el-form-item
        label="项目模式:"
        style="width: 33%
        "
      >
        <el-input
          readonly
          placeholder=""

          v-model="detailform.topInfor.projectModelName"
         />

      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item
        label="资审方式:"
        style="width: 33%"
      >
        <el-input
          readonly
          placeholder=""

          v-model="detailform.topInfor.verifyTypeName"
         />

      </el-form-item>
      <el-form-item

        label="资金来源:"
        style="width: 33%
        "
      >
        <el-input
          readonly
          placeholder=""

          v-model="detailform.capitalName"
         />

      </el-form-item>
       <el-form-item
        label="项目跟踪负责人:"
        style="width: 33%
        "
      >
        <el-input
          readonly

          v-model="detailform.verify.projectTrackResponPerson"
         />

      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item
        label="联系电话:"
        style="width: 33%"
      >
        <el-input
          readonly
          placeholder=""

          v-model="detailform.verify.contactMode"
         />

      </el-form-item>
        <el-form-item

          label="建设单位:"
          style="width: 33%
        "
        >
          <el-input
            readonly

            v-model="detailform.topInfor.constructionOrg"
          />

        </el-form-item>
</el-row>
<el-row>
            <el-form-item
            class="neirong"
              label="项目内容(最多1000字):"
              style="width: 33%"
            >
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-input
                readonly
                placeholder="请输入"

                v-model="detailform.topInfor.inforContent"
              />
            </el-form-item>
</el-row>
<el-row>
            <el-form-item
            class="neirong"
              label="资审说明(最多1000字):"
              prop="verify.verifyExplain"
              style="width: 33%"
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

                v-model="detailform.verify.verifyExplain"
              />
            </el-form-item>
</el-row>
<el-row>
            <el-form-item
            class="neirong"
              label="附件:"
              style="width: 33%"
            >
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
     </el-row>

     <p style="overflow:hidden;margin-right: 30px"><span style="float:left;">标段信息: </span>   <el-button
          @click="show('add')"

            style="float:right;width: 70px;height: 32px;background: #5C8BFA;font-size: 16px;"
            type="primary"
          >新增</el-button> </p>
      <!--           -->
<!--        <el-table-->
<!--          :data="detailform.verifySectionOrg"-->
<!--          :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"-->

<!--          @selection-change="handleSelectionChange"-->
<!--          align="center"-->
<!--          border-->
<!--          class="clothSizeTable"-->
<!--          ref="table"-->
<!--          style="width: 98%;"-->
<!--        >-->
<!--         <el-table-column-->
<!--          :width="150"-->
<!--          align="center"-->
<!--          label="序号"-->
<!--          show-overflow-tooltip-->
<!--          type="index"-->
<!--        ></el-table-column>-->

<!--          <el-table-column :resizable="false" label="标段名称" prop="part" show-overflow-tooltip>-->
<!--            <template slot-scope="scope">-->
<!--              <el-form-item-->
<!--                :prop="'verifySectionOrg.'+scope.$index+'.part'"-->
<!--                :rules="{-->
<!--      required: true, message: '此项不能为空', trigger: 'blur'-->
<!--    }"-->
<!--                label-width="0"-->

<!--              >-->
<!--                <el-input max-length=50 clearable :disabled="p.actpoint==='look'"   v-model="scope.row.part"></el-input>-->
<!--              </el-form-item>-->
<!--              &lt;!&ndash; <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> &ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column :resizable="false" label="参与投标单位" prop="part" show-overflow-tooltip>-->
<!--            <template slot-scope="scope">-->
<!--              <el-form-item-->
<!--                :prop="'verifySectionOrg.'+scope.$index+'.part'"-->
<!--                :rules="{-->
<!--      required: true, message: '此项不能为空', trigger: 'blur'-->
<!--    }"-->
<!--                label-width="0"-->

<!--              >-->
<!--                <el-input max-length=50 clearable :disabled="p.actpoint==='look'"   v-model="scope.row.part"></el-input>-->
<!--              </el-form-item>-->
<!--              &lt;!&ndash; <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> &ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column :resizable="false" label="标段状态" prop="part" show-overflow-tooltip>-->
<!--            <template slot-scope="scope">-->
<!--              <el-form-item-->
<!--                :prop="'verifySectionOrg.'+scope.$index+'.part'"-->
<!--                :rules="{-->
<!--      required: true, message: '此项不能为空', trigger: 'blur'-->
<!--    }"-->
<!--                label-width="0"-->

<!--              >-->
<!--                <el-input max-length=50 clearable :disabled="p.actpoint==='look'"   v-model="scope.row.part"></el-input>-->
<!--              </el-form-item>-->
<!--              &lt;!&ndash; <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> &ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->

<!--          <el-table-column-->
<!--            :resizable="false"-->
<!--            fixed="right"-->
<!--            label="状态"-->
<!--            show-overflow-tooltip-->
<!--            v-if="p.actpoint!=='look'"-->
<!--            width="200"-->
<!--          >-->
<!--            <template slot-scope="scope">-->
<!--              <el-link :underline="false" @click="del(scope.$index)" type="warning">删除</el-link>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
          <el-row style="text-align: center">
            <el-button type="primary" @click="saveInfo('detailform')">保存</el-button>
            <el-button  @click="submitForm('detailform')">提交</el-button>
          </el-row>

    </el-form>

    </div>
</el-card>
  </div>
</template>

<script>
export default {
  name: '详情',
  data() {
    return {
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      detailform: {
        'verify': {
          bidModeName:'',
          isCoalitionBid:'',
          verifyTypeName:'',
          verifyExplain:'',
          saleTime:'',
          subTime:'',
          designOrg:'',
          publishTime:''
        },
        'topInforBO': {
        },
        'sectionStr': [
        ],
        'verifySectionList': [

        ],
        'verifyOrgList': [

        ]
      }

    }
  },
  computed: {

    bidType () {
      return this.$store.state.bidType
    },
    yesOrNo () {
      return this.$store.state.yesOrNo
    },

  },
  methods: {
    saveInfo(formName){
      //alert(formName);
        //alert(this.$refs.formName.validate())

       this.$refs[formName].validate((valid) => {
         //alert(valid);
        if (valid) {
          //alert(JSON.stringify(this.detailform));
          console.log(JSON.stringify(this.detailform));
          detailform.verify.flowStatus="0";
          this.$http
            .post(
              "/api/contract/topInfo/Verify/detail/saveOrUpdate",
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
      this.searchParam.current = this.current
      this.getuserlist()
    },
    showinputchg() {},
    partchg(row) {
      row.showinput = false
    },

    chg(val) {
      this.errorMsg = Math.random()
      this.errorMsg0 = Math.random()
      this.$nextTick(() => {
        this.errorMsg = ''
        this.errorMsg0 = ''
      })
      this.detailform.clothSize.bcStyleId = ''
      this.detailform.clothSize.bcPlateTypeId = ''
      this.options1.forEach((item) => {
        if (val === item.value) {
          this.options2 = item.children
        }
      })
    },
    chg1() {
      this.errorMsg = Math.random()
      this.errorMsg0 = Math.random()
      this.$nextTick(() => {
        this.errorMsg = ''
        this.errorMsg0 = ''
      })
      if (this.detailform.clothSize.bcStyleId === '') {
        this.detailform.clothSize.bcPlateTypeId = ''
      }
      if (this.detailform.clothSize.bcTypeId === '') {
        this.$message.error('请先选择样衣类型！')
      }
    },
    chg2() {
      this.errorMsg = Math.random()
      this.errorMsg0 = Math.random()
      this.$nextTick(() => {
        this.errorMsg = ''
        this.errorMsg0 = ''
      })
      if (this.detailform.clothSize.bcStyleId === '') {
        this.detailform.clothSize.bcPlateTypeId = ''
        this.$message.error('请先选择款式类型！')
      }
    },

    del(index) {
      console.log(index)
      var _self = this
      // this.$utils.isdel(function() {
      _self.detailform.clothSizePartList.splice(index, 1)
      // })
    },

    show(type) {
      this.type = type
      if (type === 'add') {
        this.resetinfo()
        this.title = '新增'
        this.detailform.clothSizePartList.push(this.sizeform)
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
    carry(formName) {
      if ([...new Set(this.detailform.clothSizePartList.map(item => item.part))].length < this.detailform.clothSizePartList.length) {
        this.$message.error('部位填写重复')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              '/api/contract/topInfo/Verify/detail/save',
              JSON.stringify(this.detailform), {useJson: true}
            )
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.$refs[formName].resetFields()
              }
              if (res.data.code === 10) {
                this.errorMsg = Math.random()
                this.errorMsg0 = Math.random()
                this.$nextTick(() => {
                  this.errorMsg = res.data.msg
                  this.errorMsg0 = ' '
                })
              }
            })
        } else {
          this.$message.error('请添加必填项')
          return false
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //alert(valid);
        if (valid) {
          //alert(JSON.stringify(this.detailform));
          console.log(JSON.stringify(this.detailform));
          detailform.verify.flowStatus="1";
          this.$http
            .post(
              "/api/contract/topInfo/Verify/detail/saveOrUpdate",
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
    handleChange(){},
    sure() {
      console.log(this.sizeform)
      this.$refs['sizeform'].validate(valid => {
        if (valid) {
          this.detailform.clothSizePartList.push(this.sizeform)
          this.dialogVisibleAdd = false
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    //加载本页面数据

    // 加载列表
    getDetail() {
      //alert(this.p.topinfoid);
      this.$http
        .post(
          '/api/contract/topInfo/Verify/detail/entityInfo',
          // '/api' + this.$route.path.substr(0, this.$route.path.length - 1),
          {"id":this.p.topinfoid}
        )
        .then(res => {
          this.detailform = res.data.data

          //alert( JSON.stringify(this.detailform))
        })
         //alert(JSON.stringify(this.p))
      // this.detailform.Verify.contactMode = this.p.selectrow.contactMode;
      // this.detailform.TopInfor.inforName = this.p.selectrow.inforName;
      // this.detailform.TopInfor.enginTypeFirstName = this.p.selectrow.enginTypeFirstName;
      // this.detailform.TopInfor.enginTypeSecondName = this.p.selectrow.enginTypeSecondName;
      // this.detailform.TopInfor.noticeTypeName = this.p.selectrow.noticeTypeName;
      // this.detailform.TopInfor.constructionOrg = this.p.selectrow.constructionOrg;
      // this.detailform.TopInfor.inforContent = this.p.selectrow.inforContent;
      // this.detailform.TopInfor.bidAgentCompany = this.p.selectrow.bidAgentCompany;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    }

  },
  mounted() {
    //alert(2);
    //this.$store.dispatch('getConfig', { })
    // eslint-disable-next-line no-unde
    this.getDetail()

  }
}
</script>
<style lang="scss" scoped>
// .gcform {

//   margin-top: 10px;
//   .el-form-item__label:before {
//     position: initial;
//     left: -10px;
//   }
//   .el-form-item__error {
//     padding-top: 0px;
//       width: 100%;
//     text-align: left;
//     margin-left: 0;
//   }
//   .el-form-item  {
//    float:left;
//   }
//   .detailformfooter1 {
//     margin-top: 5px;
//     width: 100%;
//     .el-button {
//       margin: 0 30px;
//       width: 140px;
//       height: 42px;
//       font-size: 18px;
//       font-family: Microsoft YaHei;
//     }
//     .el-button--primary {
//       background: #5c8bfa;
//     }
//     .el-button--default {
//       border: 1px solid #5c8bfa;
//       color: #5c8bfa;
//     }
//   }
//   .errorMsg .el-form-item__label {
//     color: red;
//   }
//   .el-input {
//     width: 200px;
//   }
// }

// .el-table thead.is-group th {
//   background: #fff;
// }
// .clothSizeTable {
//   td {
//     padding: 0;
//   }
//   .el-form-item__content {
//     height: 50px;
//     .el-form-item__error {
//       top: 42px;
//     }
//   }
// }
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

}
.el-input--mini .el-input__inner{
  height: 40px;
  width: 100%;;
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
}
</style>
