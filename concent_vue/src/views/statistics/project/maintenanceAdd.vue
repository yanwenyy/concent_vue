<!--运营维管项目登记-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color: #2a2a7d;line-height: 32px" v-if="p.actpoint === 'add'"><b>运营维管项目新增</b></span>
        <span style="color: #2a2a7d;line-height: 32px" v-if="p.actpoint === 'edit'"><b>运营维管项目修改</b></span>
        <span style="color: #2a2a7d;line-height: 32px" v-if="p.actpoint === 'look'"><b>运营维管项目查看</b></span>
         <span style="color: #2a2a7d;line-height: 32px" v-if="p.actpoint === 'task'"><b>运营维管项目审核</b></span>
        <el-button @click="back" class="detailbutton">返回</el-button>
        <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'" type="primary" @click="submitForm('detailForm','save')" class="detailbutton">
          保存
        </el-button>
        <el-button v-show="p.actpoint != 'look'&&p.actpoint != 'task'&&(p.actpoint == 'add'||detailForm.project.flowStatus==1||detailForm.project.flowStatus==4)" @click="submitForm('detailForm','sub')" class="detailbutton">提交
        </el-button>
        <el-button
            v-show="p.actpoint == 'task'&&p.task.edit==false"
            class="detailbutton detail-back-tab bh"
            @click="operation2('back')"
            type="warning"
          >驳回</el-button>
          <el-button
            v-show="p.actpoint == 'task'&&p.task.edit==false"
            class="detailbutton detail-back-tab tg"
            @click="operation2('complete')"
            type="success"
          >通过</el-button>
      </div>
      <div class="detailBox">
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
              :rules="rules.project.must"
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
              label="合同签订时间:"
              prop="contractSignTime"
              style="width: 32.5%">
              <el-date-picker
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.contractSignTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期时间"/>
            </el-form-item>
            <el-form-item
              label="是否为年度合同:"
              prop="isAnnualContract"
              class="inline-formitem"
              style="width:32.5%;">
              <el-switch
                :disabled="p.actpoint === 'look'"
                class="inline-formitem-switch"
                v-model="detailForm.project.isAnnualContract"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="0"
                inactive-value="1"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="合同金额(万元):"
              prop="project.contractMoney"
              :rules="rules.project.isMoney"
              style="width:32.5%;">
              <el-input
                clearable
                placeholder="请输入"
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.contractMoney">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>
            <el-form-item
              label="我方份额(万元):"
              prop="project.amountWe"
              :rules="rules.project.isMoney"
              style="width:32.5%;">
              <el-input
                clearable
                placeholder="请输入"
                :disabled="p.actpoint === 'look'"
                v-model="detailForm.project.amountWe">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
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
                @change="getName(detailForm.project.categoryFirstId, operation, 'categoryFirstName','categoryFirstCode')"
                v-model="detailForm.project.categoryFirstId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in operation"/>
              </el-select>
            </el-form-item>
            <el-form-item
              label="增值税(万元):"
              prop="project.valueAddedTax"
              :rules="rules.project.isMoney"
              style="width: 32.5%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                v-model="detailForm.project.valueAddedTax">
                <template slot="prepend">¥</template>
                <template slot="append">(万元)</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="项目状态:"
              prop="project.projectStatusId"
              :rules="rules.project.must"
              style="width:32.5%;">
              <el-select
                filterable
                clearable
                placeholder="请选择"
                :disabled="p.actpoint === 'look'"
                @change="getName(detailForm.project.projectStatusId, projectStatus, 'projectStatusName','projectStatusCode')"
                v-model="detailForm.project.projectStatusId">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectStatus"/>
              </el-select>
            </el-form-item>
            <el-form-item
              label="项目详细地点"
              style="width: 32.5%"
              prop="project.topInfoSiteList[0].path"
              :rules="rules.project.must"
            >
              <el-input v-model="detailForm.project.topInfoSiteList[0].path" placeholder="项目所在地"
                        :disabled="p.actpoint === 'look'" clearable>
                <el-button slot="append" :disabled="p.actpoint === 'look'" icon="el-icon-search"
                           @click="selectPosition()"></el-button>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
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
              prop="project.companyBelongName"
              style="width:32.5%;">
              <el-input
                disabled
                placeholder="请输入"
                v-model="detailForm.project.companyBelongName"/>
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
                @change="getName(detailForm.project.marketSecondId, emergingMarketTwo, 'marketSecondName','marketSecondCode')"
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
              :rules="rules.project.isPercent"
              style="width: 32.5%">
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable
                type="number"
                placeholder="请输入"
                v-model="detailForm.project.assemblyRate">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="detailForm.project.marketFirstId === '00b87acd71784c3ba860b9513789724e'"
              label="装配类型:"
              prop="project.assemblyTypeId"
              :rules="rules.project.must"
              style="width: 32.5%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.assemblyTypeId, assemblyType, 'assemblyTypeName','assemblyTypeCode')"
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
              :rules="rules.project.must"
              style="width: 32.5%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.architectureTypeId, architecturalType, 'architectureTypeName','architectureTypeType')"
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
              :rules="rules.project.must"
              style="width: 32.5%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.houseTypeId, buildingStructure, 'houseTypeName','houseTypeCode')"
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
              :rules="rules.project.must"
              style="width: 32.5%">
              <el-select
                :disabled="p.actpoint === 'look'"
                filterable
                clearable
                @change="getName(detailForm.project.fieldId, siteName, 'fieldName','fieldCode')"
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
              :rules="rules.project.isMobile"
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
  import { isMoney, isMobile, isPhone } from '@/utils/validate'

  export default {
    name: 'estateMode',
    components: {
      Tree
    },
    data() {
      const validateMoney = (rule, value, callback) => {
        if (!value || value === '') {
          callback()
        } else if (!isMoney(value)) {
          callback(new Error('请输入正确的金额格式'))
        } else {
          callback()
        }
      }
      const validateMustMoney = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('此项不能为空'))
        } else if (!isMoney(value)) {
          callback(new Error('请输入正确的金额格式'))
        } else {
          callback()
        }
      }
      const validateNumber = (rule, value, callback) => {
        if (!value || value === '') {
          callback()
        } else if (!isMoney(value)) {
          callback(new Error('请输入正确的数字格式'))
        } else {
          callback()
        }
      }
      const validateMobile = (rule, value, callback) => {
        if (!value || value === '') {
          callback()
        } else if (!isMobile(value) && !isPhone(value)) {
          callback(new Error('请输入正确的联系方式'))
        } else {
          callback()
        }
      }
      const validatePercent = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('此项不能为空'))
        } else if (!isMoney(value) || value < 0 || value > 100) {
          callback(new Error('请输入正确的装配率百分比'))
        } else {
          callback()
        }
      }
      return {
        uuid: null,
        switchvalue: true,
        treeStatas: false,
        emergingMarketTwo: [],
        bizTypeCodeTwo: [],
        detailForm: {
          project: {
            projectSubContractList: [], // 分包字段
            infoProductList: [], // 产品列表
            infoSubjectMatterList: [], // 标的信息
            commonFilesList: [], // 文件列表
            topInfoSiteList: [
              {
                path: '',
                placeId: '',
                uuid: ''
              }
            ],
            projectModuleId: '510ba0d79593418493eb1a11ed4e7df4', // 项目板块
            projectModuleName: '运营维管', // 项目板块
            projectName: '',
            projectForeginName: '',
            valueAddedTax: '',
            contractNumber: '',
            contractMoney: '',
            amountWe: '',
            contractSignTime: '',
            categoryFirstId: '', // 业务类别（一级）
            projectStatusId: '',
            isAnnualContract: '',
            amountCompanyName: '',
            marketFirstId: '',
            marketSecondId: '',
            assemblyRate: '',
            assemblyTypeId: '',
            architectureTypeId: '',
            houseTypeId: '',
            fieldId: '',
            companyBelongName: '股份公司',
            projectPusher: '',
            projectRemark: '',
            projectPusherPhone: ''
          }
        },
        rules: {
          project: {
            must: [{ required: true, message: '此项不能为空', trigger: ['blur', 'change'] }],
            contractNumber: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
            projectRemark: [{ min: 0, max: 2000, message: '最多输入2000字', trigger: 'blur' }],
            isMoney: [{ validator: validateMoney, trigger: ['blur', 'change'] }],
            isMustMoney: [{ required: true, validator: validateMustMoney, trigger: ['blur', 'change'] }],
            isMobile: [{ validator: validateMobile, trigger: ['blur', 'change'] }],
            isPercent: [{ required: true, validator: validatePercent, trigger: ['blur', 'change'] }],
            isNumber: [{ validator: validateNumber, trigger: ['blur', 'change'] }]
          }
        },
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p))
      }
    },
    computed: {
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
      operation() {
        return this.$store.state.operation
      }
    },
    methods: {
      //流程操作
      operation2(type){
        this.$http
          .post(
            '/api/statistics/StatisticsProject/process/'+type,
            JSON.stringify(this.p.task),
            {useJson: true}
          )
          .then((res) => {
          if (res.data.code === 200) {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.$router.back()
        }
        });
      },
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
        this.detailForm.project.topInfoSiteList[0].placeId = data.id
        this.detailForm.project.topInfoSiteList[0].path = data.fullDetailName
      },
      getName(id, list, name,code) {
        if (id) {
          this.$forceUpdate()
          this.detailForm.project[name] = list.find(
            (item) => item.id === id
          ).detailName
            this.detailForm.project[code] = list.find(
                (item) => item.id === id
            ).detailCode
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
                  this.detailForm.project.marketFirstCode = item.detailCode
                this.emergingMarketTwo = item.children
              }
            }
          )
        }
      },
      // 保存
      submitForm(formName, type) {
        var url='';
        if(type=='save'){
          url="/api/statistics/StatisticsProject/detail/save"
        }else{
          url="/api/statistics/StatisticsProject/process/start"
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                url,
                JSON.stringify(this.detailForm.project),
                { useJson: true }
              )
              .then((res) => {
                if (res.data.code === 200) {
                   this.$message({
                      message: '保存成功',
                      type: 'success'
                    })
                    this.$router.push({
                      path: '/statistics/project/maintenanceList'
                    })
                } else {
                  this.$message({
                    message: '保存失败',
                    type: 'error'
                  })
                }
              })
          } else {
            this.$message({
              message: '请正确填写信息',
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
          .post('/api/statistics/StatisticsProject/process/start',
          JSON.stringify(this.detailForm.project),{ useJson: true })
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$router.push({
                path: '/statistics/project/maintenanceList'
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
        let params = { topInfoId: this.p.uuid ||this.p.instid}
        this.$http
          .post('/api/statistics/StatisticsProject/detail/entityInfo', params)
          .then((res) => {
            if (res.data.code === 200) {
              this.detailForm.project = res.data.data
              if (!res.data.data.infoProductList) {
                this.detailForm.project.infoProductList = []
              }
              if (!res.data.data.infoSubjectMatterList) {
                this.detailForm.project.infoSubjectMatterList = []
              }
              if (!res.data.data.projectSubContractList) {
                this.detailForm.project.projectSubContractList = []
              }
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
      if (this.p.actpoint === 'look' || this.p.actpoint === 'edit' || this.p.actpoint === 'task') {
        this.getShow()
      }
    }
  }
</script>
<style lang="scss" scoped>
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
