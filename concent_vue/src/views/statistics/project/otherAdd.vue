<!-- 其他项目管理 -->
<template>
  <div>
    <el-card>
          <div slot="header" class="clearfix">
        <span style="color: #2a2a7d"><b>其他项目新增</b></span>
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
      style="background: white;"
    >
     <!-- <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button type="primary" plain>返回上一级</el-button>
        <el-button type="primary" plain>保存</el-button>
        <el-button type="primary" plain>提交</el-button>
      </el-button-group>
    </div>
    <p></p> -->
    <el-row>
      <el-form-item
        label="项目名称:"
        prop="clothSize.bcPlateTypeId"
        style="width:33%;"
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
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
                 label="合同号 :"
                 prop="clothSize.bcPlateTypeId"
                 style="width:33%;">
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
        label="合同金额（万元）:"

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
        label="我方份额（万元）:"
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
            label="项目地点:"
            prop="clothSize.bcTypeId"
            required
            size="mini"
            style="width:33%;"
          >
            <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange">
            </el-cascader>
         </el-form-item>

    </el-row>

      <el-row>

         <el-form-item
              label="所属单位:"
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
        label="合同签定日期:"
        prop="clothSize.bcPlateTypeId"
        style="width:33%;"
      >
      <el-date-picker
        v-model="value1"
        type="datetime"
        size="mini"
        placeholder="选择日期时间">
     </el-date-picker>
      </el-form-item>

          <el-form-item
              label="项目状态:"
              prop="clothSize.bcPlateTypeId"
              style="width:33%;"
              :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }"
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
        label="是否年度项目:"
        prop="clothSize.bcTypeId"

        style="width:33%;"
      >
        <el-select
          :disabled="p.actpoint==='look'"
          @change="chg"
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="detailform.clothSize.bcTypeId"
        >
          <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="新兴市场类别（一级）:"
        prop="clothSize.bcTypeId"

        style="width:33%;"
      >
        <el-select
          :disabled="p.actpoint==='look'"
          @change="chg"
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="detailform.clothSize.bcTypeId"
        >
          <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options1"></el-option>
        </el-select>
      </el-form-item>



          <el-form-item
            label="新兴市场类别（二级）:"
            prop="clothSize.bcTypeId"

            style="width:33%;"
          >
            <el-select
              :disabled="p.actpoint==='look'"
              @change="chg"
              clearable
              filterable
              placeholder="请选择"
              size="mini"
              v-model="detailform.clothSize.bcTypeId"
            >
              <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options1"></el-option>
            </el-select>
          </el-form-item>

       </el-row>

      <el-row>

     <el-form-item
        label="业务类别:"
        prop="clothSize.bcTypeId"

        style="width:33%;"
      >
        <el-select
          :disabled="p.actpoint==='look'"
          @change="chg"
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="detailform.clothSize.bcTypeId"
        >
          <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options1"></el-option>
        </el-select>
      </el-form-item>

       <el-form-item
        label="增值税（万元）:"
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
        label="推送人 :"
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
        label="联系方式:"
         style="width:33%;"
        prop="clothSize.bcPlateTypeId"

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />
      </el-form-item>
  <!-- `checked` 为 true 或 false -->

    <el-form-item
    style="margin-top:30px;"
    >
            <el-checkbox v-model="checked">填报产值反写合同额</el-checkbox>
    </el-form-item>
    </el-row>
      <el-row>
            <el-form-item
            class="neirong"
              label="项目内容(最多1000字):"
              prop="clothSize.bcPlateTypeId"
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
  name: '详情',
  data() {
    return {
            pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        value3: '',
      options1:[{label:"值",value:'111'}],

       value: [],
               options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
         methods: {
      handleChange(value) {
        console.log(value);
      }
    },

    //  fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

      detailform: {
        'clothSize': {
          'id': '',
          'bcTypeId': '',
          'bcStyleId': '',
          'bcPlateTypeId': '',
          'bcTypeName': '',
          'bcStyleName': '',
          'bcPlateTypeName': '',
          'isDelete': 0,
          'createTime': '',
          'createUserId': 0,
          'createUserName': '',
          'createOrgId': 0,
          'createOrgName': ''
        },
        'clothSizePartList': [

        ]
      },

      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),

    }
  },
  computed: {

  },
  methods: {

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
              '/api/contract/basicConfig/ClothSize/detail/save',
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              '/api/contract/basicConfig/ClothSize/detail/save',
              JSON.stringify(this.detailform), {useJson: true}
            )
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
              }
            })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
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
  }
}
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
