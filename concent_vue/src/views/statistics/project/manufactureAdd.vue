<!--工业制造项目登记-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color: #2a2a7d;line-height: 32px" v-if="p.actpoint === 'add'"><b>工业制造项目新增</b></span>
        <span style="color: #2a2a7d;line-height: 32px" v-if="p.actpoint === 'edit'"><b>工业制造项目修改</b></span>
        <span style="color: #2a2a7d;line-height: 32px" v-if="p.actpoint === 'look'"><b>工业制造项目查看</b></span>
        <el-button @click="back" class="detailbutton">返回</el-button>
        <el-button v-if="p.actpoint !== 'look'" type="primary" @click="submitForm('detailForm')" class="detailbutton">保存</el-button>
        <el-button v-if="p.actpoint !== 'look'" @click="submitForm('detailForm', 'submit')" class="detailbutton">提交</el-button>
      </div>
      <div class="detailBoxBG" style="height: calc(100vh - 196px)">
        <el-form
          :inline="false"
          :model="detailForm"
          class="gcform"
          ref="detailForm"
          style="background: white">
          <el-row>
            <el-form-item
              label="项目名称:"
              prop="project.projectName"
              :rules="{
                required: true, message: '此项不能为空', trigger: 'blur'
              }"
              style="width: 32.5%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.projectName"/>
            </el-form-item>
            <el-form-item
              label="外文名称:"
              style="width: 32.5%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.projectForeginName"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="产品名称:"
              style="width: 32.5%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.productName"/>
            </el-form-item>
            <el-form-item
              label="客户名称:"
              prop="project.customerName"
              style="width: 32.5%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.customerName"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="合同号:"
              prop="project.contractNumber"
              style="width:32.5%;">
              <el-input
                clearable
                placeholder="请输入"
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.contractNumber"/>
            </el-form-item>
            <el-form-item
              label="合同金额(万元):"
              prop="project.contractMoney"
              style="width:32.5%;">
              <el-input
                clearable
                type="number"
                placeholder="请输入"
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.contractMoney">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="合同所属板块:"
              prop="project.ocontractModel"
              style="width: 32.5%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                placeholder="请选择"
                v-model="detailForm.project.ocontractModel">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.detailName"
                  v-for="(item, index) in wumoveType"/>
              </el-select>
            </el-form-item>
            <el-form-item
              label="合同补充金额(万元):"
              prop="project.contractAmountSupplement"
              style="width:32.5%;">
              <el-input
                clearable
                type="number"
                placeholder="请输入"
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.contractAmountSupplement">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>
            <el-form-item
              label="是否系统内采购:"
              prop="isSystemPurchase"
              class="inline-formitem"
              style="width:32.5%;">
              <el-switch
                :disabled="p.actpoint === 'look'"
                class="inline-formitem-switch"
                v-model="detailForm.project.isSystemPurchase"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="0"
                inactive-value="1"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="项目状态:"
              prop="project.projectStatusId"
              :rules="{
                required: true, message: '此项不能为空', trigger: 'blur'
              }"
              style="width:32.5%;">
              <el-select
                filterable
                clearable
                placeholder="请选择"
                :disabled="p.actpoint === 'look'"
                @change="getName(detailForm.project.projectStatusId, projectStatus, 'projectStatusName')"
                v-model="detailForm.project.projectStatusId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectStatus"/>
              </el-select>
            </el-form-item>
            <el-form-item
              label="增值税(万元):"
              prop="project.valueAddedTax"
              style="width: 32.5%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                type="number"
                placeholder="请输入"
                v-model="detailForm.project.valueAddedTax">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="供方地点"
              style="width: 32.5%"
              prop="project.supplierAddress"
              :rules="{
                required: true, message: '此项不能为空', trigger: 'change'
              }"
            >
              <el-input v-model="detailForm.project.supplierAddress" placeholder="供方地点"
                        :disabled="p.actpoint === 'look'" clearable>
                <el-button slot="append" :disabled="p.actpoint === 'look'" icon="el-icon-search"
                           @click="selectPosition()"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item
              label="合同签订时间:"
              prop="project.contractSignTime"
              style="width: 32.5%">
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.contractSignTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期时间"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="合同开始时间:"
              prop="project.ocontractStartTime"
              style="width: 32.5%">
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.ocontractStartTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期时间"/>
            </el-form-item>
            <el-form-item
              label="合同结束时间:"
              prop="project.ocontractEndTime"
              style="width: 32.5%">
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.ocontractEndTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期时间"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="签约单位:"
              prop="amountCompanyName"
              style="width:32.5%;">
              <el-input
                clearable
                :disabled="p.actpoint === 'look'"
                placeholder="请输入"
                v-model="detailForm.project.amountCompanyName"/>
            </el-form-item>
            <el-form-item
              label="所属单位:"
              prop="companyBelongName"
              style="width:32.5%;">
              <el-input
                clearable
                disabled
                placeholder="请输入"
                v-model="detailForm.project.companyBelongName"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="业务类别:"
              prop="categorySecondId"
              style="width: 32.5%">
              <el-select
                filterable
                clearable
                :disabled="p.actpoint === 'look'"
                placeholder="请选择"
                @change="getName(detailForm.project.categorySecondId, bizTypeCodeTwo, 'categorySecondName')"
                v-model="detailForm.project.categorySecondId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in bizTypeCodeTwo"/>
              </el-select>
            </el-form-item>
            <el-form-item
              label="海外合同(美元):"
              prop="ocontractAmountTotal"
              style="width:32.5%;">
              <el-input
                clearable
                type="number"
                :disabled="p.actpoint === 'look'"
                placeholder="请输入"
                v-model="detailForm.project.ocontractAmountTotal">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="新兴市场类别(一级):"
              prop="marketFirstId"
              style="width: 32.5%">
              <el-select
                clearable
                filterable
                :disabled="p.actpoint === 'look'"
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
              style="width: 32.5%">
              <el-select
                filterable
                clearable
                :disabled="p.actpoint === 'look'||detailForm.project.marketFirstId==='00b87acd71784c3ba860b9513789724e'"
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
              v-if="detailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
              label="装配率(%):"
              prop="project.assemblyRate"
              :rules="{
                required: true, message: '此项不能为空', trigger: 'blur'
              }"
              style="width: 32.5%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                type="number"
                placeholder="请输入"
                v-model="detailForm.project.assemblyRate"/>
            </el-form-item>
            <el-form-item
              v-if="detailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
              label="装配类型:"
              prop="project.assemblyTypeId"
              :rules="{
                required: true, message: '此项不能为空', trigger: 'blur'
              }"
              style="width: 32.5%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.assemblyTypeId, assemblyType, 'assemblyTypeName')"
                placeholder="请选择"
                v-model="detailForm.project.assemblyTypeId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in assemblyType"/>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              v-if="detailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
              label="建筑类型:"
              prop="project.architectureTypeId"
              :rules="{
                required: true, message: '此项不能为空', trigger: 'blur'
              }"
              style="width: 32.5%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.architectureTypeId, architecturalType, 'architectureTypeName')"
                placeholder="请选择"
                v-model="detailForm.project.architectureTypeId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in architecturalType"/>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="detailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
              label="房屋结构类型:"
              prop="project.houseTypeId"
              :rules="{
                required: true, message: '此项不能为空', trigger: 'blur'
              }"
              style="width: 32.5%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.houseTypeId, buildingStructure, 'houseTypeName')"
                placeholder="请选择"
                v-model="detailForm.project.houseTypeId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in buildingStructure"/>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              v-if="detailForm.project.marketFirstId === '50cd5e9992ac4653920fac8c1f2eb2e3'"
              label="场地名称:"
              prop="project.fieldId"
              :rules="{
                required: true, message: '此项不能为空', trigger: 'blur'
              }"
              style="width: 32.5%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.fieldId, siteName, 'fieldName')"
                placeholder="请选择"
                v-model="detailForm.project.fieldId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in siteName"/>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="推送人:"
              prop="project.projectPusher"
              style="width:32.5%;">
              <el-input
                clearable
                placeholder="请输入"
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.projectPusher"/>
            </el-form-item>
            <el-form-item
              label="联系方式:"
              prop="project.projectPusherPhone"
              :rules="{ pattern: /^1[3456789]\d{9}$/, message: '请填写正确的联系方式', trigger: 'blur'}"
              style="width:32.5%;">
              <el-input
                clearable
                placeholder="请输入"
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.projectPusherPhone"/>
            </el-form-item>
          </el-row>
          <!--备注(最多2000字)-->
          <el-row>
            <el-form-item
              class="neirong"
              label="备注(最多2000字):"
              :rules="{ min: 0, max: 2000, message: '最多输入2000字', trigger: 'blur' }"
              prop="project.projectRemark">
              <el-input
                :disabled="p.actpoint === 'look'"
                type="textarea"
                placeholder="请输入"
                v-model="detailForm.project.projectRemark"/>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'

  export default {
    name: 'estateMode',
    components: {
      Tree
    },
    data() {
      return {
        uuid: null,
        switchvalue: true,
        treeStatas: false,
        emergingMarketTwo: [],
        bizTypeCodeTwo: [],
        yesOrNo: [
          { label: '是', value: 0 },
          { label: '否', value: 1 }
        ],
        inOut: [
          { label: '系统内', value: 0 },
          { label: '系统外', value: 1 }
        ],
        inOutRoad: [
          { label: '路内', value: 0 },
          { label: '路外', value: 1 }
        ],
        detailForm: {
          project: {
            commonFilesList: [], // 文件列表
            topInfoSiteList: [
              {
                path: '',
                placeId: '',
                uuid: ''
              }
            ],
            projectModuleId: '510ba0d79593418493eb1a11ed3e7df4', // 项目板块
            projectName: '',
            projectForeginName: '',
            productName: '', // 产品名称
            customerName: '',
            contractNumber: '',
            contractMoney: '',
            contractAmountSupplement: '',
            supplierAddress: '', // 供方地点
            contractSignTime: '',
            ocontractStartTime: '',
            ocontractEndTime: '',
            valueAddedTax: '', // 增值税
            categoryFirstId: 'f01fc41388d14663ac8873113f55cdd5', // 业务类别（一级）
            categorySecondId: '', // 业务类别（二级）
            ocontractModel: '', // 合同所属板块
            isSystemPurchase: '', // 5
            companyBelongName: '股份公司', // 6
            projectStatusId: '',
            amountCompanyName: '',
            ocontractAmountTotal: '',
            marketFirstId: '',
            marketSecondId: '',
            assemblyRate: '',
            assemblyTypeId: '',
            architectureTypeId: '',
            houseTypeId: '',
            fieldId: '',
            projectPusher: '',
            projectRemark: '',
            projectPusherPhone: ''
          }
        },
        rules: {},
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p))
      }
    },
    computed: {
      wumoveType() {
        return this.$store.state.wumoveType
      },
      projectStatus() {
        return this.$store.state.projectStatus
      },
      emergingMarket() {
        return this.$store.state.category.emergingMarket
      },
      assemblyType() {
        return this.$store.state.assemblyType
      },
      architecturalType() {
        return this.$store.state.architecturalType
      },
      buildingStructure() {
        return this.$store.state.buildingStructure
      },
      siteName() {
        return this.$store.state.siteName
      },
      bizTypeCode() {
        return this.$store.state.bizTypeCode
      }
    },
    methods: {
      // 选择项目地点
      selectPosition() {
        this.treeStatas = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
        })
      },
      // 获取项目地点的值
      getPositionTree(data) {
        this.treeStatas = false
        this.detailForm.project.supplierAddress = data.fullDetailName
      },
      getName(id, list, name) {
        if (id) {
          this.$forceUpdate()
          this.detailForm.project[name] = list.find(
            (item) => item.id === id
          ).detailName
          console.log(this.detailForm)
        }
      },
      getShowTwo() {
        this.emergingMarket.find((item) => {
          if (item.id === this.detailForm.project.marketFirstId) {
            this.emergingMarketTwo = item.children
          }
        })
      },
      getMarketTwo(id) {
        this.detailForm.project.marketSecondId = ''
        this.detailForm.project.marketSecondName = ''
        this.detailForm.project.assemblyRate = ''
        this.detailForm.project.assemblyTypeId = ''
        this.detailForm.project.assemblyTypeName = ''
        this.detailForm.project.architectureTypeId = ''
        this.detailForm.project.architectureTypeName = ''
        this.detailForm.project.houseTypeId = ''
        this.detailForm.project.houseTypeName = ''
        this.detailForm.project.fieldId = ''
        this.detailForm.project.fieldName = ''
        this.emergingMarketTwo = []
        if (id !== '') {
          this.emergingMarket.find(
            (item) => {
              if (item.id === id) {
                this.detailForm.project.marketFirstName = item.detailName
                this.emergingMarketTwo = item.children
              }
            }
          )
        }
      },
      // 保存
      submitForm(formName, type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                '/api/statistics/StatisticsProject/detail/save',
                JSON.stringify(this.detailForm.project),
                { useJson: true }
              )
              .then((res) => {
                if (res.data.code === 200) {
                  if (type && type === 'submit') {
                    this.uuid = res.data.data.uuid
                    this.submit()
                  } else {
                    this.$message({
                      message: '保存成功',
                      type: 'success'
                    })
                    this.$router.push({
                      path: '/statistics/project/manufactureList'
                    })
                  }
                } else {
                  this.$message({
                    message: '保存失败',
                    type: 'error'
                  })
                }
              })
          } else {
            this.$message({
              message: '请填写必填项',
              type: 'error'
            })
            return false
          }
        })
      },
      // 提交
      submit() {
        const id = this.p.uuid || this.uuid
        this.$http
          .post('/api/statistics/StatisticsProject/detail/projectSubmitById', { projectId: id })
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$router.push({
                path: '/statistics/project/manufactureList'
              })
            } else {
              this.$message({
                message: '提交失败',
                type: 'error'
              })
            }
          })
      },
      back() {
        this.$router.back()
      },
      getShow() {
        let data = { topInfoId: this.p.uuid }
        this.$http
          .post('/api/statistics/StatisticsProject/detail/entityInfo', data)
          .then((res) => {
            if (res.data.code === 200) {
              this.detailForm.project = res.data.data
              this.getShowTwo()
            }
          })
      }
    },
    mounted() {
      this.$store.dispatch('getConfig', {})
      this.$store.dispatch('getCategory', { name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3' })
      this.$store.dispatch('getCategory', { name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e' })
      this.$store.dispatch('getCategory', { name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72' })
      if (this.p.actpoint === 'look' || this.p.actpoint === 'edit') {
        this.getShow()
      }
      // 业务类别数据格式不对，已处理
      this.bizTypeCode.find((item) => {
        if (item.parentDetailId === this.detailForm.project.categoryFirstId) {
          this.bizTypeCodeTwo.push(item)
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  > > > input::-webkit-outer-spin-button,
  > > > input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  > > > input[type="number"] {
    -moz-appearance: textfield;
  }
  .gcform {
    margin-top: 10px;
    .neirong {
      > > > .el-form-item__error {
        top: 4%!important;
      }
    }
    > > > .el-form-item__error {
      padding-top: 0px;
      width: 95%;
      margin-left: 0;
      text-align: right;
      top: 0%;
    }

    > > > .el-form-item__label:before {
      position: initial;
      left: -10px;
    }

    > > > .inline-formitem {
      margin-top: 30px;
    }

    .el-form-item {
      float: left;
      margin-bottom: 0;
      margin-right: 0.5%;

      .el-input {
        width: 95%;
      }

      .el-select {
        width: 95%;
      }
    }
  }
</style>
