<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button @click="add" plain type="primary">新增</el-button>
        <el-button @click="totop" plain type="primary">修改</el-button>
        <el-button @click="remove" type="primary" plain>删除</el-button>
      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none">重置</el-button>
        <el-button @click="getData" type="primary" plain>查询</el-button>
      </div>
    </div>

    <div style="margin-top: 10px">
      <el-table
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="page.records"
        :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        tooltip-effect="dark"
      >
        <el-table-column
          :width="50"
          align="center"
          show-overflow-tooltip
          type="selection"
        ></el-table-column>
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
        ></el-table-column>

        <el-table-column
          :width="300"
          align="center"
          label="单位名称"
          prop="companyName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>单位名称</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.companyName"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="单位简称"
          prop="companyOmit"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>单位简称</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.companyOmit"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="300"
          align="center"
          label="统一社会信用代码/组织机构代码"
          prop="socialCreditCode"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>统一社会信用代码/组织机构代码</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.socialCreditCode"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="法定代表人"
          prop="legalRepresentatice"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>法定代表人</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.legalRepresentatice"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="注册资本"
          prop="registerCapital"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>注册资本</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.registerCapital"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="180"
          align="center"
          label="成立时间"
          prop="foundedTime"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>成立时间</span>
            <div>
              <el-date-picker
                class="list-search-picker"
                filterable
                clearable
                type="date"
                value-format="timestamp"
                v-model="searchform.foundedTime"
              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">{{
            scope.row.foundedTime | dateformat
            }}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="企业性质"
          prop="enterpriseNatureName"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>企业性质</span>

            <el-select
              class="list-search-picker"
              clearable
              filterable
              placeholder="请选择"
              size="mini"
              v-model="searchform.enterpriseNatureName"
            >
              <el-option
                :key="index"
                :label="item.detailName"
                :value="item.id"
                v-for="(item, index) in customernatureCode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="企业所在地区"
          prop="companyLocationName"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>企业所在地区</span>

            <el-select
              class="list-search-picker"
              clearable
              filterable
              placeholder="请选择"
              size="mini"
              v-model="searchform.companyLocationId"
            >
              <!-- <el-option
                 :key="index"
                 :label="item.detailName"
                 :value="item.id"
                 v-for="(item, index) in bulletinType"
               ></el-option>-->
            </el-select>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="企业详细地址"
          prop="companyLocationDetail"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>企业详细地址</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.companyLocationDetail"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="官网链接"
          prop="linkWebsite"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>官网链接</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.linkWebsite"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="上级单位名称"
          prop="superCompanyName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>上级单位名称</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.superCompanyName"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="上级单位统一社会信用代码/组织机构代码"
          prop="superSocialCreditCode"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>上级单位统一社会信用代码/组织机构代码</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.superSocialCreditCode"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="上级单位官网链接"
          prop="superLinkWebsite"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>上级单位官网链接</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.superLinkWebsite"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :current-page="page.current"
      :page-size="page.size"
      :page-sizes="[20, 50, 100]"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <template>
      <div>
        <el-dialog
          class="bdClass"
          :lock-scroll="true"
          :visible.sync="dialogResult"
          :append-to-body="true">
          <el-card>
            <div class="clearfix el-card__header">
              <span style="color: #2a2a7d;line-height: 32px"><b>共享单位库信息维护</b></span>
              <el-button @click="close" style="float: right;">返回</el-button>
            </div>
          </el-card>
          <div
            style="height: calc(100% - 50px);overflow-y: auto;padding: 0px 50px;overflow-x: hidden; box-sizing: border-box; width: 100%;">
            <el-form
              :rules="rules"
              :inline="true"
              :model="detailForm"
              ref="detailForm"
              @keyup.enter.native="init()"
              class="gcform">

              <el-form-item
                label="单位名称:"
                class="list-item"
                prop="companies.companyName"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input v-model="detailForm.companies.companyName" placeholder="单位名称" clearable
                          :disabled="type === 'look'"></el-input>
              </el-form-item>
              <el-form-item
                label="单位简称:"
                class="list-item"
                prop="companies.companyOmit"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
              >
                <el-input v-model="detailForm.companies.companyOmit" placeholder="单位简称" clearable
                          :disabled="type === 'look'"></el-input>
              </el-form-item>
              <el-form-item
                label="统一社会信用代码/组织机构代码:"
                class="list-item"
                prop="companies.socialCreditCode"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"

              >
                <el-input v-model="detailForm.companies.socialCreditCode" placeholder="统一社会信用代码/组织机构代码" clearable
                          :disabled="type === 'look'"></el-input>
              </el-form-item>
              <br>
              <el-form-item
                label="企业性质:"
                class="list-item"
                prop="companies.enterpriseNatureId"
                :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"

              >
                <template slot-scope="scope">
                  <el-select
                    clearable
                    placeholder="企业性质"
                    size="mini"
                    :disabled="type === 'look'"
                    @change="
                getName(
                  detailForm.companies.enterpriseNatureId,
                  customernatureCode,
                  'enterpriseNatureName',
                  'enterpriseNatureCode'
                )
              "
                    v-model="detailForm.companies.enterpriseNatureId">
                    <el-option
                      :key="index"
                      :label="item.detailName"
                      :value="item.id"
                      v-for="(item, index) in customernatureCode"
                    ></el-option>
                  </el-select>
                </template>
              </el-form-item>
              <el-form-item label="法定代表人:" class="list-item">
                <el-input v-model="detailForm.companies.legalRepresentatice" placeholder="法定代表人" clearable
                          :disabled="type === 'look'"></el-input>
              </el-form-item>
              <el-form-item label="注册资本:" class="list-item">
                <el-input v-model="detailForm.companies.registerCapital" placeholder="注册资本" clearable
                          :disabled="type === 'look'"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="成立时间:" class="list-item">
                <el-date-picker
                  width="100%"
                  filterable
                  clearable
                  type="date"
                  value-format="timestamp"
                  :disabled="type === 'look'"
                  v-model="detailForm.companies.foundedTime"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="企业所在地区:" class="list-item">
                <el-input v-model="detailForm.companies.companyLocationName"
                          placeholder="企业所在地区"
                          clearable
                          :disabled="type === 'look'"
                          @clear="searchform.companyLocationId=''"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="selectPosition()"
                  ></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="企业详细地址:" class="list-item">
                <el-input v-model="detailForm.companies.companyLocationDetail" placeholder="企业详细地址" clearable
                          :disabled="type === 'look'"></el-input>
              </el-form-item>
              <br>

              <el-form-item label="官网链接:" class="list-item" :rules="rules.linkWebsite" prop="companies.linkWebsite">
                <el-input v-model="detailForm.companies.linkWebsite" placeholder="官网链接" clearable
                          :disabled="type === 'look'"></el-input>
              </el-form-item>
              <el-form-item label="上级单位名称:" class="list-item">
                <el-input v-model="detailForm.companies.superCompanyName" placeholder="上级单位名称" clearable
                          :disabled="type === 'look'"></el-input>
              </el-form-item>
              <el-form-item label="上级单位统一社会信用代码/组织机构代码:" class="list-item">
                <el-input v-model="detailForm.companies.superSocialCreditCode" placeholder="上级单位统一社会信用代码/组织机构代码"
                          clearable :disabled="type === 'look'"></el-input>
              </el-form-item>
              <br>

              <el-form-item label="上级单位官网链接:" class="list-item" :rules="rules.linkWebsite"
                            prop="companies.superLinkWebsite">
                <el-input v-model="detailForm.companies.superLinkWebsite" placeholder="上级单位官网链接" clearable
                          :disabled="type === 'look'"></el-input>
              </el-form-item>
              <br>

            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button v-if="type!='look'" type="primary" @click="save('detailForm')">确定</el-button>
          </div>
        </el-dialog>

        <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
      </div>
    </template>
  </div>
</template>

<script>
    import Tree from '@/components/tree'
    import {isMoney, isURL} from '@/utils/validate'

    export default {
        // inject:['reload'],
        name: "proposal-list-look",
        components: {
            Tree
        },
        data() {
            var validateMoney = (rule, value, callback) => {
                // console.log(value)
                if (value === '') {
                    callback(new Error('不能为空'))
                } else if (!isMoney(value)) {
                    callback(new Error('请输入正确的金额格式'))
                } else {
                    callback()
                }
            };
            var validateUrl = (rule, value, callback) => {
                // console.log(value)
                if (value != '' && value && !isURL(value)) {
                    callback(new Error('请输入正确的网址格式'))
                } else {
                    callback()
                }
            }
            return {
                page: {current: 1, size: 20, total: 0, records: []},
                type: '',
                treeStatas: false,
                dialogResult: false,
                showinput: false,
                sousuo: "",
                searchform: {
                    current: 1,
                    size: 20,
                    ompanyLocationDetail: "",
                    companyLocationName: "",
                    companyLocationId: "",
                    companyLocationCode: "",
                    companyName: "",
                    companyOmit: "",
                    enterpriseNatureCode: "",
                    enterpriseNatureId: "",
                    enterpriseNatureName: "",
                    foundedTime: "",
                    legalRepresentatice: "",
                    linkWebsite: "",
                    superCompanyName: "",
                    registerCapital: "",
                    socialCreditCode: "",
                    superLinkWebsite: "",
                    superSocialCreditCode: "",
                    uuid: ""
                },
                detailForm: {
                    companies: {}
                },
                menus: [],
                multipleSelection: [],
                orgTree: [],
                rules: {
                    linkWebsite: [
                        {required: true, validator: validateUrl, trigger: 'change'}
                    ]
                },

            };
        },
        computed: {
            projectDomainType() {
                return this.$store.state.category.projectDomainType;
            },
            bulletinType() {
                return this.$store.state.bulletinType;
            },
            customernatureCode() {
                console.log(this.$store.state.customerNature)
                return this.$store.state.customerNature;
            },
        },
        methods: {

            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http
                            .post(
                                "/api/contract/Companies/detail/check",
                                JSON.stringify(this.detailForm.companies),
                                {useJson: true}
                            )
                            .then((res) => {
                                if (res.data.data === true) {
                                    this.$http
                                        .post(
                                            "/api/contract/Companies/detail/save",
                                            JSON.stringify(this.detailForm.companies),
                                            {useJson: true}
                                        )
                                        .then((res) => {
                                            if (res.data.code === 200) {
                                                this.$message({
                                                    message: "保存成功",
                                                    type: "success",
                                                });
                                                //清空输入框
                                                this.detailForm = {
                                                    companies: {},
                                                };
                                                //关闭dialog对话框
                                                this.dialogResult = false;
                                                //查询列表数据
                                                this.getData();
                                            } else {
                                                this.$message.error(res.data.msg);
                                                return false;
                                            }
                                        });
                                } else {
                                    this.$message.error("统一社会信用代码/组织机构代码已存在");
                                    return false;
                                }
                            });

                    } else {
                        this.$message.error("请添加必填项和正确的数据格式");
                        return false;
                    }
                });

            },

            close() {
                this.$refs['detailForm'].clearValidate();
                this.dialogResult = false;
            },

            getName(id, list, name, code) {
                if (id) {
                    this.$forceUpdate()
                    this.detailForm.companies[name] = list.find(
                        (item) => item.id == id
                    ).detailName;
                    this.detailForm.companies[code] = list.find(
                        (item) => item.id == id
                    ).detailCode;
                }
            },

            //获取项目地点的值
            getPositionTree(data) {
                this.treeStatas = false;
                console.log(data)
                this.detailForm.companies.companyLocationId = data.id;
                this.detailForm.companies.companyLocationCode = data.fullDetailCode;
                this.detailForm.companies.companyLocationName = data.fullDetailName;
                this.key = this.key + 1;
            },

            //选择企业所在地
            selectPosition() {
                this.treeStatas = true;
                console.log(this.positionIndex);
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init();
                });
            },

            //上传附件
            handleChange(response, file, fileList) {
                if (response && response.code === 200) {
                    this.$message({
                        message: "导入成功",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                            this.getData();
                            // console.log(fileList);
                        },
                    });
                } else {
                    this.$message.error(response.msg);
                }
            },
            exportdata() {
            },
            search() {
                this.showinput = false;
            },
            // 增加
            add() {
                this.dialogResult = true;
                this.detailForm = {
                    companies: {
                        companyLocationDetail: "",
                        companyLocationName: "",
                        companyLocationId: "",
                        companyLocationCode: "",
                        companyName: "",
                        companyOmit: "",
                        enterpriseNatureCode: "",
                        enterpriseNatureId: "",
                        enterpriseNatureName: "",
                        foundedTime: "",
                        legalRepresentatice: "",
                        linkWebsite: "",
                        superCompanyName: "",
                        registerCapital: "",
                        socialCreditCode: "",
                        superLinkWebsite: "",
                        superSocialCreditCode: "",
                        uuid: ""
                    }
                }
            },
            // 修改
            totop() {
                this.type='edit';
                if (this.multipleSelection.length !== 1) {
                    this.$message.info("请选择一条记录进行修改操作！");
                    return false;
                }
                var list = this.multipleSelection[0];
                this.detailForm = {
                    companies: {
                        companyLocationDetail: list.companyLocationDetail,
                        companyLocationName: list.companyLocationName,
                        companyName: list.companyName,
                        companyOmit: list.companyOmit,
                        enterpriseNatureName: list.enterpriseNatureName,
                        enterpriseNatureId: list.enterpriseNatureId,
                        foundedTime: list.foundedTime,
                        legalRepresentatice: list.legalRepresentatice,
                        linkWebsite: list.linkWebsite,
                        registerCapital: list.registerCapital,
                        socialCreditCode: list.socialCreditCode,
                        superCompanyName: list.superCompanyName,
                        superLinkWebsite: list.superLinkWebsite,
                        superSocialCreditCode: list.superSocialCreditCode,
                        uuid: list.uuid,
                    },
                };
                this.dialogResult = true;

            },
            // 查看
            rowshow(row) {
                this.type='look';
                this.$http
                    .post("/api/contract/Companies/detail/entityInfo", {
                        id: row.uuid,
                    })
                    .then((res) => {
                        var datas = res.data.data;
                        console.log(datas)
                        companies:{
                        this.detailForm.companyLocationDetail = datas.companyLocationDetail;
                        this.detailForm.companyLocationName = datas.companyLocationName;
                        this.detailForm.companyName = datas.companyName;
                        this.detailForm.companyOmit = datas.companyOmit;
                        this.detailForm.enterpriseNatureName = datas.enterpriseNatureName;
                        this.detailForm.enterpriseNatureId = datas.enterpriseNatureId;
                        this.detailForm.foundedTime = datas.foundedTime;
                        this.detailForm.linkWebsite = datas.linkWebsite;
                        this.detailForm.registerCapital = datas.registerCapital;
                        this.detailForm.socialCreditCode = datas.socialCreditCode;
                        this.detailForm.superCompanyName = datas.superCompanyName;
                        this.detailForm.superLinkWebsite = datas.superLinkWebsite;
                        this.detailForm.superSocialCreditCode = datas.superSocialCreditCode;
                        this.detailForm.uuid=datas.uuid;
                        this.dialogResult = true;
                        }

                    });

            },
            // 删除
            remove() {
                if (this.multipleSelection.length < 1) {
                    this.$message.info("请选择一条记录进行删除操作！");
                    return false;
                }
                let uuids = []
                this.multipleSelection.forEach((item) => {
                    uuids.push(item.uuid)
                });
                this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http
                        .post(
                            "/api/contract/Companies/list/delete",
                            {ids: uuids}
                        )
                        .then((res) => {
                            this.getData()
                        });
                }).catch(() => {
                })
                // uuids.join(',')

            },
            // 展示
            show() {
                if (this.multipleSelection.length !== 1) {
                    this.$message.info("请选择一条记录进行查看操作！");
                    return false;
                }
                let p = {actpoint: "look", instid: this.multipleSelection[0].uuid};
                this.$router.push({
                    path: "./detail/",
                    query: {p: this.$utils.encrypt(JSON.stringify(p))},
                });
            }, // list通用方法开始
            handleSizeChange(val) {
                this.searchform.size = val;
                this.getData();
            },
            handleCurrentChange(val) {
                this.searchform.current = val;
                this.getData();
            },
            searchformSubmit() {
                this.searchform.current = 1;
                this.getData();
            },
            searchformReset() {
                //   // this.$refs["searchform"].resetFields();
                this.searchform = {
                    current: 1,
                    size: 20,
                    year: "",
                    name: "",
                    childName: "",
                    standrardId: "",
                    implementationTime: "",
                    underCentralizedUnit: "",
                    titanic: "",
                }
                this.getData();
            },
            // 列表选项数据
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 查询
            getData() {
                this.$http
                    .post(
                        "/api/contract/Companies/list/loadPageData",
                        this.searchform
                    )
                    .then((res) => {
                        this.page = res.data.data;
                    });
            },
            getMenus() {
                this.$http
                    .post("api/base/loadcascader", {typecode: "XMLX"})
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.menus = res.data.data;
                        }
                    });
            },
            currentMenu(selVal) {
                let selMenuObj = this.menus.filter((item) => item.value === selVal);
                this.searchform.menu = selMenuObj[0].label;
            },
            // 获取上级单位树信息
            getOrgTree() {
                this.$http.get("/api/contract/base/loadorglist").then((res) => {
                    this.orgTree = res.data.data;
                });
            },
            // 确定单位
            orgChange() {
                let selectLabelArr = this.$refs["porgCascader"].getCheckedNodes()[0]
                    .pathLabels;
                this.searchform.orgname = selectLabelArr[selectLabelArr.length - 1];
            },

            // list通用方法结束
        },
        created() {
            this.getData();
            this.$store.dispatch("getConfig", {});
            this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
        },
    };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }

  .bdClass >>> .el-dialog {
    height: 70vh !important;
  }

  .bdClass >>> .el-card__header {
    padding: 8px 20px !important;
  }

  .bdClass >>> .el-dialog__header {
    display: none;
  }

  .bdClass >>> .el-dialog__body {
    padding: 0;
    height: calc(100% - 60px) !important;
    width: 100%;
    overflow: hidden;
  }

  .bdClass >>> .dialog-footer {
    padding-top: 14px;
    margin: 0;
    text-align: center;
    background-color: #fafafa;
  }

  >>> .gcform .el-form-item {
    margin-bottom: 0px !important;
  }

  >>> .el-form--inline .el-form-item__content {
    width: 100%;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }

  .list-title {
    margin: 20px 0;
  }

  .list-item {
    width: 32%;
  }

  .dr-notice-warn {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background: #FFE5E0;
    color: red;
  }

  .dr-notice-body {
    padding: 10px;
  }

  .dr-notice-body > div {
    margin-bottom: 20px;
  }

  .sumWeigh {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  >>> .el-input--mini .el-input__inner {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
  }

  >>> form {
    height: 300px;
    padding: 0 10px 0 0;
  }

  p {
    font-size: 18px;
    font-weight: bolder;
  }

  .bdClass >>> .el-dialog {
    position: fixed;
    left: 10%;
    width: 80%;
  }

  .gcform >>> .el-form-item__error {
    top: -20px !important;
    right: 10px;
    text-align: right;
  }

  .tabelForm >>> .el-form-item__error {
    top: -10px !important;
    right: 80px;
    text-align: right;
  }

  /*>>>.el-table .cell.el-tooltip{*/
  /*  padding: 10px 10px;*/
  /*}*/
</style>
