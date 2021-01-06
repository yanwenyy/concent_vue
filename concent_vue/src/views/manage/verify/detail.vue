<template>
  <div >
        <el-card class="box-card">
      <div slot="header" class="clearfix" >
        <span style="color: #2a2a7d"><b>资审管理详情</b></span>
        <el-button
          @click="back"
          style="
            float: right;
            padding: 10px 20px;
            border: 1px solid #ddd;
            color: black;
            position: fixe;
          "
          type="text"
        >返回
        </el-button
        >
      </div>


      <div class="detailBox">
        <p style="overflow:hidden;margin-right: 30px"><span style="float:left;font-weight: bold">项目前期信息</span></p>
    <el-form
      :inline="false"
      :model="detailform"
      class="gcform"
      ref="detailform"
    >
      <el-form-item
        label="项目名称:"
        style="width: 33%"
      >

        <el-input
          disabled
          size="mini"
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
<!--          size="mini"-->
<!--          v-model="detailform.clothSize.bcTypeId"-->
<!--        >-->
<!--          <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in options1"></el-option>-->
<!--        </el-select>-->
          <el-input
            disabled
            size="mini"
            v-model="detailform.topInfor.enginTypeFirstName"
          />
      </el-form-item>
      <el-form-item
        label="工程类别（二级）:"
        style="width: 33%
              "
      >
        <el-input
          disabled
          size="mini"
          v-model="detailform.topInfor.enginTypeSecondName"
        />
      </el-form-item>

        <el-form-item
          label="公告类型:"
          style="width: 33%"
        >
          <el-input
            disabled
            size="mini"
            v-model="detailform.topInfor.noticeTypeName"
          />

        </el-form-item>
        <el-form-item
          label="设计单位:"
          style="width: 33%">
          <el-input
            disabled
            size="mini"
            v-model="detailform.topInfor.designOrg"
          />

        </el-form-item>
        <el-form-item

          label="建设单位:"
          style="width: 33%
        "
        >
          <el-input
            disabled
            size="mini"
            v-model="detailform.topInfor.constructionOrg"
          />

        </el-form-item>

        <el-form-item
          label="招标代理公司:"
          style="width: 33%
        "
        >
          <el-input
            disabled
            placeholder=""
            size="mini"
            v-model="detailform.topInfor.bidAgentCompany"
          />

        </el-form-item>
        <el-form-item
          label="项目模式:"
          style="width: 33%
        "
        >
          <el-input
            disabled
            placeholder=""
            size="mini"
            v-model="detailform.topInfor.projectModelName"
          />

        </el-form-item>
        <el-form-item
          label="资审方式:"
          style="width: 33%"
        >
          <el-input
            disabled
            placeholder=""
            size="mini"
            v-model="detailform.topInfor.verifyTypeName"
          />

        </el-form-item>
        <el-form-item

          label="资金来源:"
          style="width: 33%
        "
        >
          <el-input
            disabled
            placeholder=""
            size="mini"
            v-model="detailform.capitalName"
          />

        </el-form-item>
        <el-form-item
          label="项目跟踪负责人:"
          style="width: 33%
        "
        >
          <el-input
            disabled
            size="mini"
            v-model="detailform.topInfor.projectTrackResponPerson"
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          style="width: 33%"
        >
          <el-input
            disabled
            placeholder=""
            size="mini"
            v-model="detailform.topInfor.contactMode"
          />

        </el-form-item>
      <div>
        <el-form-item
          class="neirong"
          label="项目内容(最多1000字):"
          style="width: 100%"
        >
          <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
          <el-input
            disabled
            placeholder="请输入"
            type="textarea"
            size="mini"
            v-model="detailform.topInfor.inforContent"
          />
        </el-form-item>
        </div>
      <p style="overflow:hidden;margin-right: 30px"><span style="font-weight: bold">资审信息</span></p>

        <!-- --------------------------------------------------------------- -->
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
            :readonly="p.actpoint === 'look'"
            value-format="timestamp"
            v-model="detailform.verify.saleTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>

        </el-form-item>
        <el-form-item
          label="递交资格预审申请文件日期:"
          prop="verify.subTime"
          style="width: 33%"

          :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
        >

          <el-date-picker
            clearable
            :readonly="p.actpoint === 'look'"
            value-format="timestamp"
            v-model="detailform.verify.subTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>

        </el-form-item>
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
            :readonly="p.actpoint === 'look'"
            value-format="timestamp"
            v-model="detailform.verify.publishTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item
        label="招标方式:"
        style="width: 33%"
        :disabled="p.actpoint === 'look'"
      >
          <el-select
            :disabled="p.actpoint === 'look'"
            filterable
            placeholder="请选择"
            size="mini"
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
<!--            size="mini"-->
<!--            v-model="detailform.verify.bidModeName"-->
<!--          />-->
      </el-form-item>

<!-- 下拉 -->

      <el-form-item
        label="是否联合体投标:"
        prop="verify.isCoalitionBid"

        :rules="{
          required: true, message: '此项不能为空', trigger: 'blur'
        }"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="detailform.verify.isCoalitionBid"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in coalitionBid"
          ></el-option>
        </el-select>
<!--        <el-input-->
<!--          clearable-->
<!--          :readonly="p.actpoint === 'look'"-->
<!--          size="mini"-->
<!--          v-model="detailform.verify.isCoalitionBid"-->
<!--        />-->
      </el-form-item>

        <el-form-item v-show='detailform.verify.isCoalitionBid=="是"'
          label="内部联合体单位:"
          :disabled="p.actpoint === 'look'"
        >

          <el-input v-model="detailform.verifyOrgLists" placeholder="内部联合体单位">
            <el-button slot="append" icon="el-icon-search"  @click="selectOrg()"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item v-show='detailform.verify.isCoalitionBid=="是"'
          label="外部联合体单位:"
        >
          <el-input
            placeholder=""
            size="mini"
            v-model="detailform.verify.outOrg"
          />

        </el-form-item>
<div>
            <el-form-item
            class="neirong"
              label="资审说明(最多1000字):"

              prop="verify.verifyExplain"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-input
                :readonly="p.actpoint === 'look'"
                clearable
                placeholder="请输入"
                type="textarea"
                size="mini"
                v-model="detailform.verify.verifyExplain"
              />
            </el-form-item>
            </div>
      <div>
            <el-form-item
            class="neirong"
              label="附件（最大10MB）:"
            >
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-upload
                class="upload-demo detailUpload"
                :action="'/api/topInfo/CommonFiles/verify/01/uploadFile'"
                :on-success="handleChange"
                :on-error="handleChange"
                :on-remove="handleRemove"
                multiple
              >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            </el-form-item>
            </div>
    <div>
      <el-table
        :data="detailform.commonFilesList"
        :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
        @selection-change="handleSelectionChange1"
        align="center"
        border
        class="contractInfoTable"
        ref="table"
        style="width: 98%;height: auto;"
      >
                <el-table-column
                  :width="55"
                  align="center"
                  label="序号"
                  show-overflow-tooltip
                  type="index"
                ></el-table-column>
                <el-table-column :resizable="false" label="文件名" prop="fileName" show-overflow-tooltip>

                </el-table-column>

                <el-table-column :resizable="false" label="大小" prop="fileSize" show-overflow-tooltip>

                </el-table-column>
                <el-table-column :resizable="false" label="类型" prop="fileType" show-overflow-tooltip>

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
                    <el-link :underline="false" @click="handleRemove(scope.row,scope.$index)" type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>
    </div>

     <p style="overflow:hidden;margin-right: 30px"><span style="float:left;">标段信息: </span>   <el-button
       @click="dialogTopInfoSection = true"
       v-show="p.actpoint != 'look'"
            size="mini"
            style="float:right;width: 70px;height: 32px;background: #5C8BFA;font-size: 16px;"
            type="primary"
          >新增</el-button> </p>

      <el-table
        :data="detailform.verifySectionList"
        :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
        align="center"
        @cell-click="selectOrg1"
        :row-class-name="tableRowClassName"
        border
        ref="table"
        style="width: 98%;margin-bottom: 20px "
      >
        <el-table-column
          :width="80"

          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>

        <el-table-column
          class="listTabel"
          :resizable="false"
          label="标段名"
          prop="verifySection.sectionName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column

          :resizable="false"
          fixed="right"
          label="参与投标单位"
          align="center"
          prop="verifySectionOrgName"
          show-overflow-tooltip
          v-show="p.actpoint != 'look'"
          width="200">

          <template slot-scope="scope" v-show="p.actpoint != 'look'">
            <span  >
              {{scope.row.verifySectionOrgNameType01}}
            </span>
          </template>
        </el-table-column>
        <el-table-column

          :resizable="false"
          fixed="right"
          label="编标拟配合单位"
          align="center"
          prop="verifySectionOrgNameType02"
          show-overflow-tooltip
          v-show="p.actpoint != 'look'"
          width="200">

          <template slot-scope="scope" v-show="p.actpoint != 'look'">

            <span  >
              {{scope.row.verifySectionOrgNameType02}}
            </span>
          </template>
        </el-table-column>
        <el-table-column

          :resizable="false"
          fixed="right"
          label="投资估算"
          align="center"
          prop="investmentReckon"
          show-overflow-tooltip
          width="80">

          <template slot-scope="scope" >
          <el-input
            :disabled="p.actpoint === 'look'"
            placeholder=""
            size="mini"
            v-model="scope.row.verifySection.investmentReckon"
          />
          </template>
        </el-table-column>
        <el-table-column

          :resizable="false"
          fixed="right"
          label="其中建安投资"
          align="center"
          prop="jananInvestment"
          show-overflow-tooltip
          v-show="p.actpoint != 'look'"
          width="80">

          <template slot-scope="scope" >
           <el-input
             :disabled="p.actpoint === 'look'"
             placeholder=""
             size="mini"
             v-model="scope.row.verifySection.jananInvestment"
           />
          </template>
        </el-table-column>
        <el-table-column
          v-show="p.actpoint != 'look'"
          :resizable="false"
          fixed="right"
          label="操作"
          align="center"
          show-overflow-tooltip
          v-if="p.actpoint !== 'look'"
          width="200">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              @click="del(scope.$index,scope.row,detailform.verifySectionList,'bd')"
              type="warning">删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>


    </el-form>

    </div>
</el-card>
    <div class="btn-group" v-show="p.actpoint != 'look'">
      <el-button type="primary" @click="saveInfo('detailform')">保存</el-button>
      <el-button  @click="submitForm('detailform')">提交</el-button>
    </div>
    <el-dialog title="前期项目标段列表" :visible.sync="dialogTopInfoSection">
    <el-table
      :data="detailform1.topInfoSectionList"
      :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
      @selection-change="handleSelectionChange"
      align="center"
      border
      ref="table"
      style="width: 98%;"
    >
      <el-table-column
        :width="50"
        align="center"
        show-overflow-tooltip
        type="selection"
      ></el-table-column>
      <el-table-column
        :width="80"
        align="center"
        label="序号"
        show-overflow-tooltip
        type="index"
      ></el-table-column>

      <el-table-column
        class="listTabel"
        :resizable="false"
        label="标段名"
        prop="sectionName"
        align="center"
        show-overflow-tooltip
      >

      </el-table-column>


<!--      <el-table-column-->
<!--        v-show="!p.actpoint === 'look'"-->
<!--        :resizable="false"-->
<!--        fixed="right"-->
<!--        label="操作"-->
<!--        align="center"-->
<!--        show-overflow-tooltip-->
<!--        v-if="p.actpoint !== 'look'"-->
<!--        width="200">-->
<!--        <template slot-scope="scope">-->
<!--          <el-link-->
<!--            :underline="false"-->
<!--            @click="addSection(scope.$index,scope.row,detailform1.topInfoSectionList,'bd')"-->
<!--            type="warning">选择-->
<!--          </el-link>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTopInfoSection = false">取 消</el-button>
    <el-button type="primary" @click="addSection()">确 定</el-button>
  </span>
    </el-dialog>
    <TreeOrg v-if="treeOrgStatas" ref="addOrUpdate" @getPosition="getTreeOrg"></TreeOrg>
    <TreeOrg v-if="treeOrgStatas1" ref="addOrUpdate1" @getPosition="getTreeOrg1"></TreeOrg>
   <TreeOrg v-if="treeOrgStatas2" ref="addOrUpdate2" @getPosition="getTreeOrg2"></TreeOrg>
  </div>
</template>

<script>
import TreeOrg from '@/components/treeOrg'
export default {

  name: '详情',
  components: {
    TreeOrg
  },
  data() {
    return {
      treeOrgStatas: false,
      treeOrgStatas1: false,
      treeOrgStatas2: false,
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
          publishTime:'',
          flowStatus:'0'
        },
        'topInfor': {
        },
        'sectionStr': [
        ],
        'verifySectionList': [

        ],
        'verifyOrgList': [
        ],
        verifyOrgLists:"111",
        commonFilesList:[]
      },
      detailform1: {
        topInfor: {},
        topInfoOrg: {},
        topInfoSiteList: [],
        topInfoSectionList: [],
      },
      dialogTopInfoSection:false,
      coalitionBid:[
        {
          id:'是',
          detailName:'是'
        },
        {
          id:'否',
          detailName:'否'
        }
      ],//联合投标选择
      myVerifySection:{},
      myVerifySection1:{},
      multipleSelection:[],
      multipleSelection1:[]
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

    back() {
      this.$router.back()
      // this.$router.push({
      //   path: "/manage/proposal/list",
      // });
    },
    saveInfo(formName){
      //alert(formName);
        //alert(this.$refs.formName.validate())

       this.$refs[formName].validate((valid) => {
         //alert(valid);
        if (valid) {
          //alert(JSON.stringify(this.detailform));
          console.log(JSON.stringify(this.detailform));
          console.log(this.detailform.verifySectionList);
          this.detailform.verify.flowStatus="0";
          this.$http
            .post(
              "/api/topInfo/Verify/detail/saveOrUpdate",
              JSON.stringify(this.detailform),
              { useJson: true }
            )
            .then((res) => {

              if (res.data.msg === "SUCCESS") {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.$refs[formName].resetFields();
                this.$router.push({
                  path: "/manage/verify/list",
                });
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


    del(index,item,list,type) {
      console.log(index);

        list.splice(index, 1);
      // console.log(index);
      // list.splice(index, 1);

    },
    selectOrg(){
      this.treeOrgStatas = true;
      console.log(this.positionIndex);
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    getTreeOrg(data) {

      console.log(data)
      this.treeStatas = false;

      var resultStr = "";
      data.forEach((item, index) => {

        var verifyOrg={ orgId:item.name,orgName:item.name};
        this.detailform.verifyOrgList.push(verifyOrg)
        resultStr+=item.name+",";
      });
      this.detailform.verifyOrgLists =resultStr.substring(0,resultStr.length-1);
      // this.detailform.verifyOrgLists=resultStr;
      // alert(this.detailform.verifyOrgLists);
      console.log(this.detailform.verifyOrgLists)
      // this.key = this.key + 1;
    },
    getTreeOrg1(data) {

      console.log(data)

      this.treeOrgStatas1 = false;

      var resultStr = "";
      this.myVerifySection.verifySectionOrgList= [];
      data.forEach((item, index) => {

        var VerifySectionOrg={ orgId:item.name,orgName:item.name,orgType:"01"};
        this.myVerifySection.verifySectionOrgList.push(VerifySectionOrg)
        resultStr+=item.name+",";
      });
       this.detailform.verifySectionList[this.myVerifySection.index].verifySectionOrgNameType01 =resultStr.substring(0,resultStr.length-1);
       this.detailform.verifySectionList[this.myVerifySection.index].verifySectionOrgListType01=this.myVerifySection.verifySectionOrgList;
      // this.detailform.verifyOrgLists=resultStr;
      // alert(this.detailform.verifyOrgLists);
      console.log(this.detailform.verifySectionList)
      // this.key = this.key + 1;
    },
    getTreeOrg2(data) {

      console.log(data)
      this.treeOrgStatas2 = false;

      var resultStr = "";
      this.myVerifySection1.verifySectionOrgList= [];
      data.forEach((item, index) => {

        var VerifySectionOrg={ orgId:item.name,orgName:item.name,orgType:"02"};
        this.myVerifySection1.verifySectionOrgList.push(VerifySectionOrg)
        resultStr+=item.name+",";
      });
      this.detailform.verifySectionList[this.myVerifySection1.index].verifySectionOrgNameType02
        =resultStr.substring(0,resultStr.length-1);
      this.detailform.verifySectionList[this.myVerifySection1.index].verifySectionOrgListType02=this.myVerifySection1.verifySectionOrgList;
      // this.detailform.verifyOrgLists=resultStr;
      // alert(this.detailform.verifyOrgLists);
      console.log(this.detailform.verifySectionList)
      // this.key = this.key + 1;
    },
    selectOrg1(row, column, cell, event){
      // alert(JSON.stringify(row));
      if(column.label==="参与投标单位") {
        this.myVerifySection = row;
        this.treeOrgStatas1 = true;
        //console.log(this.positionIndex);
        this.$nextTick(() => {
          this.$refs.addOrUpdate1.init()
        })
      }else if(column.label==="编标拟配合单位") {
        this.myVerifySection1 = row;
        this.treeOrgStatas2 = true;
        //console.log(this.positionIndex);
        this.$nextTick(() => {
          this.$refs.addOrUpdate2.init()
        })
      }
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    addSection()
    {
      this.dialogTopInfoSection = false;
      this.multipleSelection.forEach((item, index) => {
        console.log(item.uuid)
        console.log(index)

        var vsl = {
          sectionId: item.uuid,
          verifyId:this.detailform.verify.uuid,
          sectionName: item.sectionName
        }
        var vsBo={
          verifySection:{},
          verifySectionOrgListType01:[],
          verifySectionOrgNameType01:'',
          verifySectionOrgListType02:[],
          verifySectionOrgNameType02:''
        }
        var isadd = true;
        this.detailform.verifySectionList.forEach((item1, index1) => {
          if (item.uuid == item1.verifySection.sectionId) {
            isadd = false;
          }
        })
        if (isadd) {
          vsBo.verifySection=vsl;
          this.detailform.verifySectionList.push(vsBo);
        } else {
          this.$message.error('请不要重复添加')
        }
      });
    },

    show(type) {
      let p1 = { actpoint: 'add',instid: this.p.topinfoid}
      this.$router.push({
        path: '../list_Section/',
        query: { p: this.$utils.encrypt(JSON.stringify(p1)) }
      })
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
              '/api/topInfo/Verify/detail/save',
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
          this.detailform.verify.flowStatus="1";
          this.$http
            .post(
              "/api/topInfo/Verify/detail/saveOrUpdate",
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
    handleRemove(file,index) {
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
    handleChange(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.detailform.commonFilesList.push(response.data);
            console.log( JSON.stringify(this.detailform.commonFilesList))
          }
        })
      } else {
        this.$message.error(response.msg)
      }
    },
    // sure() {
    //   console.log(this.sizeform)
    //   this.$refs['sizeform'].validate(valid => {
    //     if (valid) {
    //       this.detailform.clothSizePartList.push(this.sizeform)
    //       this.dialogVisibleAdd = false
    //     } else {
    //       console.log('error submit!')
    //       return false
    //     }
    //   })
    // },
    //加载本页面数据


    // 加载列表
    getDetail() {


      //alert(this.p.topinfoid);
      this.$http
        .post(
          '/api/topInfo/Verify/detail/entityInfo',
          // '/api' + this.$route.path.substr(0, this.$route.path.length - 1),
          {"id":this.p.topinfoid}
        )
        .then(res => {
          this.detailform = res.data.data

          console.log( JSON.stringify(this.detailform.verifySectionList))
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
   getTopInforDetail() {

    this.$http
      .post("/api/topInfo/TopInfor/detail/entityInfo", {topOrgId:this.p.topinfoid})
      .then((res1) => {
        var datas=res1.data.data;
        // this.getTwo(datas.topInfor.enginTypeFirstId);
        // this.getTwoSC(datas.topInfor.marketFirstNameId);
        // datas.topInforCapitalList.forEach((item)=>{
        //   this.value1.push(item.capitalId)
        // });
        this.detailform1={
          topInfor: datas.topInfor,
          topInfoOrg: datas.topInfoOrg,
          topInfoSiteList: datas.topInfoSiteList,
          topInfoSectionList: datas.topInfoSectionList,
        }
        //alert( JSON.stringify(this.detailform1.topInfoSiteList))
      });
  },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val
    }

  },
  mounted() {
    //alert(2);
    //this.$store.dispatch('getConfig', { })
    // eslint-disable-next-line no-unde
    this.getDetail()
    this.getTopInforDetail();

  }
}
</script>
<style lang="scss" scoped>

.btn-group{
  text-align: center;
  margin-top: 20px;
}
.gcform {
  margin-top: 10px;
  .el-form-item__label:before {
    position: initial;
    left: -10px;
  }
  .el-form-item__error {
    padding-top: 0px;
    width: 95%;
    margin-left: 0;
    text-align: right;
    top: 0%;
  }
  .el-form-item {

    display: inline-block;
    width: 32.5%;
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

.el-input--mini .el-input__inner {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  // margin: 10px 0 0 10px;
}

.gcform .el-input {
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

.gcform .el-form-item {
  margin-bottom: 0px;
}

.neirong .el-input--mini .el-input__inner {
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
>>>.el-form-item__label{
  width: auto;
}
>>>.el-upload-list{
  display: none;
}
</style>
