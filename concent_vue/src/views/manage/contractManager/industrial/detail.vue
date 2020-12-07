<template>
  <div>
        <el-card>
          <div slot="header" class="clearfix">
        <span style="color: #2a2a7d"><b>工业制造合同新增</b></span>
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
    <el-row>
      <el-form-item
        label="合同名称:"
        prop="clothSize.bcTypeId"
        required
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
        label="合同编号:"
        prop="clothSize.bcStyleId"
        required
          style="width:33%;"
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
      <el-form-item
        label="客户名称:"
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
     </el-row>

     <el-row>
 <el-form-item
        label="合同所属板块:"
        prop="clothSize.bcTypeId"
        required
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
        label="合同金额(万元):"
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
        label="我方份额(万元):"
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
        label="合同签订日期:"
        prop="clothSize.bcTypeId"
          style="width:33%;"
      >
        <el-date-picker
       v-model="value1"
      type="date"
      placeholder="选择日期"
      size="mini">
    </el-date-picker>
      </el-form-item>
      <el-form-item
        label="合同开始日期:"
        prop="clothSize.bcStyleId"
        required
          style="width:33%;"
      >
        <el-date-picker
       v-model="value1"
      type="date"
      placeholder="选择日期"
      size="mini">
    </el-date-picker>
      </el-form-item>
      <el-form-item
        label="合同结束日期:"
        prop="clothSize.bcPlateTypeId"
        required
        style="width:33%;"
      >
         <el-date-picker
       v-model="value1"
      type="date"
      placeholder="选择日期"
      size="mini">
    </el-date-picker>

      </el-form-item>
     </el-row>

       <el-row>
       <el-form-item
        label="增值税(万元):"
        prop="clothSize.bcTypeId"
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
        label="补充金额(万元):"
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
        label="新兴市场类别(一级):"
        prop="clothSize.bcPlateTypeId"
        required
          style="width:33%;"
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
        label="新兴市场类别(二级):"
        prop="clothSize.bcStyleId"
        required
          style="width:33%;"
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
       <el-form-item
        label="合同总金额(万元):"
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
        label="我方份额(万元):"
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
     </el-row>
     <el-row>
       <el-form-item
        label="增值税(万元):"
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
        label="系统外份额(万元):"
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
        label="暂定金(万元):"
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
       </el-row>

    <el-row>
      <el-form-item
        label="新兴市场类别(一级):"
        prop="clothSize.bcTypeId"
        required
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
        label="新兴市场类别(二级):"
        prop="clothSize.bcTypeId"
        required
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
        label="业务类别:"
        prop="clothSize.bcTypeId"
        required
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
        label="使用资质单位:"
        prop="clothSize.bcTypeId"
        required
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
        label="产品用途(施工项目名称):"
        prop="clothSize.bcTypeId"
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
        label="是否为系统内的采购:"
        prop="clothSize.bcTypeId"
        required
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
        label="是否区域经营机构承揽:"
        prop="clothSize.bcPlateTypeId"
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
        label="供货地点:"
        prop="clothSize.bcPlateTypeId"
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
        label="海外合同(美元):"
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
        label="生产工号:"
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


       <el-form-item
        label="录入单位:"
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
        label="录入时间:"
        prop="clothSize.bcTypeId"
        required
          style="width:33%;"
      >
          <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期"
      size="mini">
    </el-date-picker>
      </el-form-item>

    </el-row>

          <el-row>
            <el-form-item
            class="neirong"
              label="备注(最多600字):"
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
        label="证明文件(最大10MB):"
        prop="clothSize.bcPlateTypeId"
        style="width:33%;"
      ></el-form-item>

  <el-button
            @click="show('add')"
            size="mini"
            style="float:left;width: 100px;height: 32px;background: #5C8BFA;font-size: 16px;"
            type="primary"
          >添加文件</el-button>
         <el-button
            size="mini"
            style="float:left;width: 100px;height: 32px;background: #5C8BFA;font-size: 16px;"
            type="primary">删除文件</el-button>

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
          :width="55"
          align="center"
          label=""
          show-overflow-tooltip
          type="index"><el-checkbox v-model="checked"></el-checkbox></el-table-column>

          <el-table-column :resizable="false" label="文件名" prop="part" show-overflow-tooltip>
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

           <el-table-column :resizable="false" label="备注" prop="part" show-overflow-tooltip>
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
           <el-table-column :resizable="false" label="大小" prop="part" show-overflow-tooltip>
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
           <el-table-column :resizable="false" label="预览" prop="part" show-overflow-tooltip>
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

           <el-table-column :resizable="false" label="类型" prop="part" show-overflow-tooltip>
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
           <el-table-column :resizable="false" label="进度" prop="part" show-overflow-tooltip>
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
           </el-table>
    </el-row>

           <el-row class="detail_bottom">
              <p style="overflow: hidden">
            <span style="float: left">标段信息: </span>
            <el-button
              @click="show('add')"
              size="mini"
              style="
                float: right;
                width: 70px;
                height: 32px;
                background: #5c8bfa;
                font-size: 16px;
              "
              type="primary"
              >新增</el-button
            >
          </p>

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
          :width="55"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"></el-table-column>


        <el-table-column
          :width="55"
          align="center"
          label=""
          show-overflow-tooltip
          type="index"><el-checkbox v-model="checked"></el-checkbox></el-table-column>

          <el-table-column :resizable="false" label="产品名称" prop="part" show-overflow-tooltip>
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

           <el-table-column :resizable="false" label="规格型号" prop="part" show-overflow-tooltip>
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

           <el-table-column :resizable="false" label="产品数量" prop="part" show-overflow-tooltip>
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


 <el-table-column :resizable="false" label="产品单位" prop="part" show-overflow-tooltip>
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
                let p = { actpoint: 'edit', uuid: res.data.data.clothSize.id }
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
