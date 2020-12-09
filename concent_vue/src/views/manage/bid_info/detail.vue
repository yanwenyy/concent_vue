<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color: #2a2a7d"><b>投标管理详情</b></span>
        <el-button @click="back" style="float: right; padding: 10px 20px ;border:1px solid #ddd;color: black" type="text">返回</el-button>
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
    <el-row>
      <el-form-item
        label="项目名称:"
        prop="clothSize.bcTypeId"
        required
        style="width: 33%"
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
        label="工程类别:"
        prop="clothSize.bcTypeId"
        required
        style="width: 33%
              "
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
        label="建设单位:"
        prop="clothSize.bcPlateTypeId"
        style="width: 33%
        "
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />

      </el-form-item>
</el-row>
<el-row>
      <el-form-item
        label="公告类型:"
        prop="clothSize.bcPlateTypeId"
        style="width: 33%"
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable

          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />

      </el-form-item>
        <el-form-item
        label="投标截止日期:"
        prop="clothSize.bcTypeId"
        required
        style="width: 33%
        "
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

<!-- 下拉 -->

      <el-form-item
        label="招标公告发布日期:"
        prop="clothSize.bcStyleId"
        style="width: 33%
        "
      >
        <el-select
          :disabled="p.actpoint==='look'"
          @change="chg1"
          filterable
          clearable
          placeholder="请选择"
          size="mini"
          v-model="detailform.clothSize.bcStyleId"
        >
          <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options2"></el-option>
        </el-select>
      </el-form-item>
</el-row>
<!-- 不下拉 -->
<el-row>
      <el-form-item
        label="招标方式:"
        prop="clothSize.bcStyleId"
        style="width: 33%
        "
      >
        <el-select
          :disabled="p.actpoint==='look'"
          @change="chg1"
          filterable
          clearable
          placeholder="请选择"
          size="mini"
          v-model="detailform.clothSize.bcStyleId"
        >
          <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options2"></el-option>
        </el-select>
      </el-form-item>
<!-- --------------------------------------------------------------- -->
      <el-form-item
        label="是否联合体投标:"
        prop="clothSize.bcPlateTypeId"
        style="width: 33%
        "
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable

          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />

      </el-form-item>
      <el-form-item
        label="设计单位:"
        prop="clothSize.bcPlateTypeId"
        style="width: 33%
        "
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />

      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item
        label="招标代理公司:"
        prop="clothSize.bcPlateTypeId"
        style="width: 33%"
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />

      </el-form-item>
      <el-form-item
        label="项目模式:"
        prop="clothSize.bcPlateTypeId"
        style="width: 33%
        "
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder=""
          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />

      </el-form-item>
      <el-form-item
        label="资审方式:"
        prop="clothSize.bcPlateTypeId"
        style="width: 33%
        "
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder=""
          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />

      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item
        label="资金来源:"
        prop="clothSize.bcPlateTypeId"
        style="width: 33%"
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder=""
          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />

      </el-form-item>
      <el-form-item
        label="是否为费率招标:"
        prop="clothSize.bcPlateTypeId"
        style="width: 33%
        "
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder=""
          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />

      </el-form-item>
       <el-form-item
        label="项目跟踪负责人:"
        prop="clothSize.bcPlateTypeId"
        style="width: 33%
        "
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder=""
          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />

      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item
        label="联系电话:"
        prop="clothSize.bcPlateTypeId"
        style="width: 33%"
          :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
      >
        <el-input
          clearable
          placeholder=""
          size="mini"
          v-model="detailform.clothSize.bcPlateTypeId"
         />

      </el-form-item>

      <el-form-item
        label="招标文件发售截止日期"
        prop="clothSize.bcStyleId"
        style="width: 33%
        "
      >
        <el-select
          :disabled="p.actpoint==='look'"
          @change="chg1"
          filterable
          clearable
          placeholder="请选择"
          size="mini"
          v-model="detailform.clothSize.bcStyleId"
        >
          <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options2"></el-option>
        </el-select>
      </el-form-item>
</el-row>
<el-row>
                      <el-form-item
            class="neirong"
              label="工程概况(最多1000字):"
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
<el-row>
            <el-form-item
            class="neirong"
              label="投标说明(最多1000字):"
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
        <el-row>
            <el-form-item
            class="neirong"
              label="附件（最大10MB）:"
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












     <p style="overflow:hidden;"><span style="float:left;">标段信息: </span>   <el-button
            @click="show('add')"
            size="mini"
            style="float:right;width: 70px;height: 32px;background: #5C8BFA;font-size: 16px;"
            type="primary"
          >新增</el-button> </p>

        <el-table
          :data="detailform.clothSizePartList"
          :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"

          @selection-change="handleSelectionChange"
          align="center"
          border
          class="clothSizeTable"
          ref="table"
          style="width: 100%;min-height: calc(100vh - 370px);"
        >
         <el-table-column
          :width="100"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>


          <el-table-column :resizable="false" label="标段名称" prop="part" show-overflow-tooltip :width="215">
            <template slot-scope="scope">
              <el-form-item
                :prop="'clothSizePartList.'+scope.$index+'.part'"
                :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                label-width="0"

              >
                <el-input max-length=100 clearable :disabled="p.actpoint==='look'" size="mini" v-model="scope.row.part" width="100"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column :resizable="false" label="风险费（万元）" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

          <el-table-column :resizable="false" label="安全费（万元）" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="投标限价（万元）" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

          <el-table-column :resizable="false" label="投标保证金（万元）" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="投标价（万元）" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="开标地点" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="评价办法" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="开标日期" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="参与投标单位" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="其他投标单位（系统内）" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="其他投标单位（系统外）" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="其他未列出单位" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="项目经理" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="项目副经理" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="技术负责人" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="安全负责人" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="财务负责人" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>

                    <el-table-column :resizable="false" label="成本负责人" prop="part" show-overflow-tooltip :width="215">
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
            </template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            fixed="right"
            label="状态"
            show-overflow-tooltip
            v-if="p.actpoint!=='look'"
            width="200"
          >
            <template slot-scope="scope">
              <el-link :underline="false" @click="del(scope.$index)" type="warning">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
          <el-row style="text-align: center">
            <el-button type="primary" @click="saveInfo('detailform')">保存</el-button>
            <el-button  @click="submit">提交</el-button>
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
      options1:[{label:"值",value:'111'}],
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
    back(){
        this.$router.push({
        path: "/manage/proposal/list"
      });
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
    this.$store.dispatch('getConfig', { })
    // eslint-disable-next-line no-unde
      this.getDetail()
  }
}
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
  // height: 500px ;
}
</style>
