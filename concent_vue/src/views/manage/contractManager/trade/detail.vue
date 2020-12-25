<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span class="detail-card-title"><b>物资贸易合同新增</b></span>
        <el-button class="detail-back" type="text">返回</el-button>
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

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.contractNo"
        />
      </el-form-item>

      <el-form-item
        label="合同所属类别:"
        prop="contractInfo.bcPlateTypeId"
        required

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.bcPlateTypeId"
         />
      </el-form-item>
      <el-form-item
        label="合同甲方:"
        prop="contractInfo.bcTypeId"
        required

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.bcPlateTypeId"
        />
      </el-form-item>

      <el-form-item
        label="合同乙方:"
        prop="contractInfo.bcStyleId"
        required

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.bcPlateTypeId"
        />
      </el-form-item>

      <el-form-item
        label="供货地点:"
        prop="contractInfo.supplyPlace"
        required

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.supplyPlace"
         />
      </el-form-item>
      <el-form-item
        label="合同金额(万元):"
        prop="contractInfo.contractAmount"
        required

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.contractAmount"
        />
      </el-form-item>

      <el-form-item
        label="预期收益率(%):"
        prop="contractInfo.tradeExpectedProfit"
        required

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.tradeExpectedProfit"
        />
      </el-form-item>

      <el-form-item
        label="预期收益额:"
        prop="contractInfo.tradeExpectedIncome"
        required

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.tradeExpectedIncome"
         />
      </el-form-item>
      <el-form-item
        label="我方份额(万元):"
        prop="contractInfo.ourAmount"
        required

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.ourAmount"
        />
      </el-form-item>

      <el-form-item
        label="使用资质单位:"
        prop="contractInfo.signOrgId"
        required

      >
        <el-select
          :disabled="p.actpoint==='look'"
          @change="chg1"
          filterable
          clearable
          placeholder="请选择"
          size="mini"
          v-model="detailform.contractInfo.signOrgId"
        >
          <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="系统内外:"
        prop="contractInfo.tradeInoutSystem"
        required

      >
        <el-select
          :disabled="p.actpoint==='look'"
          @change="chg1"
          filterable
          clearable
          placeholder="请选择"
          size="mini"
          v-model="detailform.contractInfo.tradeInoutSystem"
        >
          <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in outOrIn"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="增值税(万元):"
        prop="contractInfo.valueAddedTax"
        required

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.valueAddedTax"
        />
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
        label="合同签订时间:"
        prop="contractInfo.contractSignTime"
        required

      >
        <el-date-picker
          v-model="detailform.contractInfo.contractSignTime"
          type="datetime"
          size="mini"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item
        label="合同开始日期:"
        prop="contractInfo.contractStartTime"
        required

      >
        <el-date-picker
          v-model="detailform.contractInfo.contractStartTime"
          type="datetime"
          size="mini"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item
        label="合同结束日期:"
        prop="contractInfo.contractEndTime"
        required

      >
        <el-date-picker
          v-model="detailform.contractInfo.contractEndTime"
          type="datetime"
          size="mini"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="路内路外:"
        prop="contractInfo.tradeInoutRoad"
        required

      >
        <el-select
          :disabled="p.actpoint==='look'"
          @change="chg"
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="detailform.contractInfo.tradeInoutRoad"
        >
          <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in outOrIn"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="是否年度合同:"
        prop="contractInfo.isYearContract"
        required

      >
        <el-select
          :disabled="p.actpoint==='look'"
          @change="chg1"
          filterable
          clearable
          placeholder="请选择"
          size="mini"
          v-model="detailform.contractInfo.isYearContract"
        >
          <el-option :key="index" :label="item.detailName" :value="item.id" v-for="(item,index) in yesOrNo"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="录入单位:"
        prop="contractInfo.createOrgName"
        required

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
        required

      >
        <el-input
          clearable
          placeholder="请输入"
          size="mini"
          v-model="detailform.contractInfo.createTime"
        />
      </el-form-item>
      <div>
        <el-form-item
          class="neirong"
          label="项目内容(最多600字):"
          prop="contractInfo.info"
          style="width: 33%"
          :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
        >
          <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
          <el-input
            type="textarea"
            clearable
            placeholder="请输入"
            size="mini"
            v-model="detailform.contractInfo.info"
          />
        </el-form-item>
      </div>
      <div>
        <el-form-item
          class="neirong"
          label="补充说明(最多600字):"
          prop="contractInfo.extendExplain"
          style="width: 33%"
          :rules="{
          required: true,
          message: '此项不能为空',
          trigger: 'blur',
        }"
        >
          <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
          <el-input
            type="textarea"
            clearable
            placeholder="请输入"
            size="mini"
            v-model="detailform.contractInfo.extendExplain"
          />
        </el-form-item>
      </div>
      <div>
        <el-form-item
          class="neirong"
          label="合同主要内容(最多600字):"
          prop="contractInfo.mainContent"
          style="width: 33%"
          :rules="{
          required: true,
          message: '此项不能为空',
          trigger: 'blur',
        }"
        >
          <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
          <el-input
            type="textarea"
            clearable
            placeholder="请输入"
            size="mini"
            v-model="detailform.contractInfo.mainContent"
          />
        </el-form-item>
      </div>
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


        <p><span>标的物信息: </span>   <el-button
            @click="show('add')"
            size="mini"
            class="detatil-flie-btn"
            type="primary"
          >增加文件</el-button> </p>

        <el-table
          :data="detailform.clothSizePartList"
          :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
          @selection-change="handleSelectionChange"
          align="center"
          border
          class="clothSizeTable"
          ref="table"
          style="width: 100%;height: auto;"
        >
         <el-table-column
          :width="55"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>
          <el-table-column :resizable="false" label="标的物名称" prop="part" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-form-item
                :prop="'clothSizePartList.'+scope.$index+'.part'"
                :rules="{
                  required: true, message: '此项不能为空', trigger: 'blur'
                }"
                label-width="0"

              >
                <el-input max-length=50 clearable :disabled="p.actpoint==='look'" size="mini" v-model="scope.row.part"></el-input>
              </el-form-item>
              <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
            </template>
          </el-table-column>

          <el-table-column :resizable="false" label="标的物数量" prop="part" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-form-item
                :prop="'clothSizePartList.'+scope.$index+'.part'"
                :rules="{
                  required: true, message: '此项不能为空', trigger: 'blur'
                }"
                label-width="0"

              >
                <el-input max-length=50 clearable :disabled="p.actpoint==='look'" size="mini" v-model="scope.row.part"></el-input>
              </el-form-item>
              <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
            </template>
          </el-table-column>

          <el-table-column :resizable="false" label="标的物单位" prop="part" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-form-item
                :prop="'clothSizePartList.'+scope.$index+'.part'"
                :rules="{
                  required: true, message: '此项不能为空', trigger: 'blur'
                }"
                label-width="0"

              >
                <el-input max-length=50 clearable :disabled="p.actpoint==='look'" size="mini" v-model="scope.row.part"></el-input>
              </el-form-item>
              <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
            </template>
          </el-table-column>

          <el-table-column :resizable="false" label="总价(万元)" prop="part" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-form-item
                :prop="'clothSizePartList.'+scope.$index+'.part'"
                :rules="{
                  required: true, message: '此项不能为空', trigger: 'blur'
                }"
                label-width="0"

              >
                <el-input max-length=50 clearable :disabled="p.actpoint==='look'" size="mini" v-model="scope.row.part"></el-input>
              </el-form-item>
              <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
            </template>
          </el-table-column>

          <el-table-column
            :resizable="false"
            fixed="right"
            label="操作"
            show-overflow-tooltip
            v-if="p.actpoint!=='look'"
            width="200"
          >
            <template slot-scope="scope">
              <el-link :underline="false" @click="del(scope.$index)" type="warning">删除</el-link>
            </template>
          </el-table-column>
        </el-table>


        <!--  -->





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
export default {
  data() {
    return {
      options1:[{label:"值",value:'111'}],
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
      outOrIn:[
        {
          id:'0',
          detailName:'内'
        },
        {
          id:'1',
          detailName:'外'
        }
      ],
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),

    }
  },
  computed: {

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
      this.detailform.contractInfo.bcStyleId = ''
      this.detailform.contractInfo.bcPlateTypeId = ''
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
      if (this.detailform.contractInfo.bcStyleId === '') {
        this.detailform.contractInfo.bcPlateTypeId = ''
      }
      if (this.detailform.contractInfo.bcTypeId === '') {
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
      if (this.detailform.contractInfo.bcStyleId === '') {
        this.detailform.contractInfo.bcPlateTypeId = ''
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
              '/api/basicConfig/ClothSize/detail/save',
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
      if ([...new Set(this.detailform.clothSizePartList.map(item => item.part))].length < this.detailform.clothSizePartList.length) {
        this.$message.error('部位填写重复')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              '/api/basicConfig/ClothSize/detail/save',
              JSON.stringify(this.detailform), {useJson: true}
            )
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.$store.dispatch('clearToolBar', {
                  detail: this.$route.fullPath
                })
                this.$store.dispatch('clearCache', this.$route.name)
                let p = { actpoint: 'edit', uuid: res.data.data.contractInfo.id }
                this.$router.push({
                  path: '/app/base/tailsize/detailedit',
                  query: { p: this.$utils.encrypt(JSON.stringify(p)) }
                })
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
