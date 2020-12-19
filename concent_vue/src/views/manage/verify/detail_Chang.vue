<!--资审变更列表-->
<template>
  <el-tabs type="border-card">
    <el-tab-pane label="项目原信息">
      <div>
        <el-card class="box-card">

          <div style="overflow: scroll;max-height:calc(100vh - 380px);">
            <el-form
              :inline="false"
              :model="detailformBefore"
              class="gcform"
              ref="detailformBefore"
              style="background: white;width:calc(100% - 4px);"
            >
              <el-row>
                <el-form-item
                  label="项目名称:"
                  style="width: 33%"
                >

                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformBefore.topInfor.inforName"
                  />
                </el-form-item>
                <el-form-item
                  label="工程类别（一级）:"
                  style="width: 33%"
                >
                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformBefore.topInfor.enginTypeFirstName"
                  />
                </el-form-item>
                <el-form-item
                  label="工程类别（二级）:"
                  style="width: 33%
              "
                >
                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformBefore.topInfor.enginTypeSecondName"
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
                    size="mini"
                    v-model="detailformBefore.topInfor.noticeTypeName"
                  />

                </el-form-item>
                <el-form-item
                  label="招标方式:"
                  style="width: 33%"
                >
                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformBefore.verify.bidModeName"
                  />

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
                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformBefore.verify.isCoalitionBid"
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
                    readonly
                    value-format="timestamp"
                    v-model="detailformBefore.verify.saleTime"
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
                    size="mini"
                    v-model="detailformBefore.topInfor.designOrg"
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
                    readonly
                    value-format="timestamp"
                    v-model="detailformBefore.verify.subTime"
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
                    readonly
                    value-format="timestamp"
                    v-model="detailformBefore.verify.publishTime"
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
                    size="mini"
                    v-model="detailformBefore.topInfor.bidAgentCompany"
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
                    size="mini"
                    v-model="detailformBefore.topInfor.projectModelName"
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
                    size="mini"
                    v-model="detailformBefore.topInfor.verifyTypeName"
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
                    size="mini"
                    v-model="detailformBefore.capitalName"
                  />

                </el-form-item>
                <el-form-item
                  label="项目跟踪负责人:"
                  style="width: 33%
        "
                >
                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformBefore.verify.projectTrackResponPerson"
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
                    size="mini"
                    v-model="detailformBefore.verify.contactMode"
                  />

                </el-form-item>
                <el-form-item

                  label="建设单位:"
                  style="width: 33%
        "
                >
                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformBefore.topInfor.constructionOrg"
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
                    size="mini"
                    v-model="detailformBefore.topInfor.inforContent"
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
                    readonly
                    placeholder="请输入"
                    size="mini"
                    v-model="detailformBefore.verify.verifyExplain"
                  />
                </el-form-item>
              </el-row>

              <el-table
                :data="detailformBefore.verifySectionList"
                :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
                align="center"
                border
                class="clothSizeTable"
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
                  prop="sectionName"
                  align="center"
                  show-overflow-tooltip
                >
                </el-table-column>

              </el-table>


            </el-form>

          </div>
        </el-card>
      </div>
    </el-tab-pane>
    <el-tab-pane label="项目变更信息">
      <div>
        <el-card class="box-card">

          <div style="overflow: scroll;max-height:calc(100vh - 380px);">
            <el-form
              :inline="false"
              :model="detailformAfter"
              class="gcform"
              ref="detailformAfter"
              style="background: white;width:calc(100% - 4px);"
            >
              <el-row>
                <el-form-item
                  label="项目名称:"
                  style="width: 33%"
                >

                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformAfter.topInfor.inforName"
                  />
                </el-form-item>
                <el-form-item
                  label="工程类别（一级）:"
                  style="width: 33%"
                >
                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformAfter.topInfor.enginTypeFirstName"
                  />
                </el-form-item>
                <el-form-item
                  label="工程类别（二级）:"
                  style="width: 33%
              "
                >
                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformAfter.topInfor.enginTypeSecondName"
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
                    size="mini"
                    v-model="detailformAfter.topInfor.noticeTypeName"
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
                    size="mini"
                    v-model="detailformAfter.verify.bidModeName"
                  >
                    <el-option
                      :key="index"
                      :label="item.detailName"
                      :value="item.id"
                      v-for="(item, index) in bidType"
                    ></el-option>
                  </el-select>
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

                  <el-input
                    clearable
                    size="mini"
                    v-model="detailformAfter.verify.isCoalitionBid"
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
                    v-model="detailformAfter.verify.saleTime"
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
                    size="mini"
                    v-model="detailformAfter.topInfor.designOrg"
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
                    v-model="detailformAfter.verify.subTime"
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
                    v-model="detailformAfter.verify.publishTime"
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
                    size="mini"
                    v-model="detailformAfter.topInfor.bidAgentCompany"
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
                    size="mini"
                    v-model="detailformAfter.topInfor.projectModelName"
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
                    size="mini"
                    v-model="detailformAfter.topInfor.verifyTypeName"
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
                    size="mini"
                    v-model="detailformAfter.capitalName"
                  />

                </el-form-item>
                <el-form-item
                  label="项目跟踪负责人:"
                  style="width: 33%
        "
                >
                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformAfter.verify.projectTrackResponPerson"
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
                    size="mini"
                    v-model="detailformAfter.verify.contactMode"
                  />

                </el-form-item>
                <el-form-item

                  label="建设单位:"
                  style="width: 33%
        "
                >
                  <el-input
                    readonly
                    size="mini"
                    v-model="detailformAfter.topInfor.constructionOrg"
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
                    size="mini"
                    v-model="detailformAfter.topInfor.inforContent"
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
                    size="mini"
                    v-model="detailformAfter.verify.verifyExplain"
                  />
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item
                  class="neirong"
                  label="附件（最大10MB）:"
                  style="width: 33%"
                >
                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleChange">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">最大上传文件不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </el-row>

              <p style="overflow:hidden;margin-right: 30px"><span style="float:left;">标段信息: </span>   <el-button
                @click="dialogTopInfoSection = true"
                size="mini"
                style="float:right;width: 70px;height: 32px;background: #5C8BFA;font-size: 16px;"
                type="primary"
              >新增</el-button> </p>

              <el-table
                :data="detailformAfter.verifySectionList"
                :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
                align="center"
                border
                class="clothSizeTable"
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
                  prop="sectionName"
                  align="center"
                  show-overflow-tooltip
                >

                </el-table-column>
                <el-table-column
                  v-show="!p.actpoint === 'look'"
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
                      @click="del(scope.$index,scope.row,detailformAfter.verifySectionList,'bd')"
                      type="warning">删除
                    </el-link>
                  </template>
                </el-table-column>
              </el-table>


            </el-form>

          </div>
        </el-card>
        <div class="btn-group" v-show="p.actpoint != 'look'">
          <el-button type="primary" @click="saveInfo('detailformAfter')">保存</el-button>
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
            class="clothSizeTable"
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
          </el-table>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTopInfoSection = false">取 消</el-button>
    <el-button type="primary" @click="addSection()">确 定</el-button>
  </span>
        </el-dialog>
      </div>

    </el-tab-pane>
  </el-tabs>
</template>

<script>

export default {
  name: '详情',
  data() {
    return {
      p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
      detailformBefore: {
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
        'topInfor': {},
        'sectionStr': [],
        'verifySectionList': [],
        'verifyOrgList': []
      },
      detailformAfter: {
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
        'topInfor': {},
        'sectionStr': [],
        'verifySectionList': [],
        'verifyOrgList': []
      },
      detailform1: {
        topInfor: {},
        topInfoOrg: {},
        topInfoSiteList: [],
        topInfoSectionList: [],
      },

      dialogTopInfoSection:false

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
          console.log(JSON.stringify(this.detailformAfter));
          this.detailformAfter.verify.flowStatus="0";
          this.$http
            .post(
              "/api/topInfo/Verify/detail/saveOrUpdate",
              JSON.stringify(this.detailformAfter),
              { useJson: true }
            )
            .then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.$refs[formName].resetFields();
                this.$router.push({
                  path: "/manage/proposal/list",
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


    del(index,item,list,type) {
      console.log(index);
      list.splice(index, 1);
      // if(item.uuid&&type=='bd'){
      //   this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //
      // this.$http
      //   .post(
      //     "/api/topInfo/TopInfoSection/list/delete",
      //     {ids: [item.uuid]}
      //   )
      //   .then((res) => {
      //     if (res.data && res.data.code === 200) {
      //
      //       console.log(list)
      //     } else {
      //       this.$message.error(data.msg)
      //     }
      //   });
      //   }).catch(() => {})
      // }else{
      //   list.splice(index, 1);
      // }
      // var _self = this;
      // _self.detailform.topInfoSectionList.splice(index, 1);
    },
    addSection()
    {
      this.dialogTopInfoSection = false;
      this.multipleSelection.forEach((item, index) => {
        console.log(item.uuid)
        console.log(index)

        var vsl={
          uuid:item.uuid,
          sectionName:item.sectionName
        }
        var isadd = true;
        this.detailformAfter.verifySectionList.forEach((item1, index1) => {
          if(item.uuid==item1.uuid)
          {
            isadd = false;
          }
        })
        if(isadd)
        {
          this.detailformAfter.verifySectionList.push(vsl);
        }else
        {
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
          '/api/topInfo/Verify/detail/entityInfo',
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
<style lang="scss">
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
}
</style>

