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
          label="扩展字段信息"
          prop="expandName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>扩展字段信息</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.expandName"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="所属单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>所属单位</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.createOrgName"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="字段类型"
          prop="expandTypeName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>字段类型</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.expandTypeName"
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
          :lock-scroll="true"
          :visible.sync="dialogResult"
          :append-to-body="true"
          title="新增扩展字段"
        >
          <el-form
            :rules="rules"
            :inline="true"
            :model="detailForm"
            ref="detailForm"
            @keyup.enter.native="init()"
            class="gcform">

            <el-form-item
              label="扩展字段信息:"
              prop="expandName"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-input v-model="detailForm.expandName" placeholder="扩展字段信息" clearable
                        :disabled="type === 'look'"></el-input>
            </el-form-item>
            <el-form-item
              label="单位简称:"
              prop="expandType"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
            >
              <el-radio-group v-model="detailForm.expandType">
                <el-radio :label="1">扩展字段1</el-radio>
                <el-radio :label="2">扩展字段2</el-radio>
                <el-radio :label="3">扩展字段3</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button v-if="type!='look'" type="primary" @click="save('detailForm')">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </template>
  </div>
</template>

<script>
    import {isMoney, isURL} from '@/utils/validate'

    export default {
        // inject:['reload'],
        name: "proposal-list-look",
        components: {

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
                    expandName: "",
                    expandTypeName: "",
                    createOrgName: "",
                },
                detailForm: {

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

        },
        methods: {
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      this.$http
                        .post(
                          "/api/contract/ContractInfoExpand/detail/save",
                          JSON.stringify(this.detailForm),
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
                        this.$message.error("请添加必填项和正确的数据格式");
                        return false;
                    }
                });

            },

            close() {
                this.$refs['detailForm'].clearValidate();
                this.dialogResult = false;
            },
            // 增加
            add() {
                this.dialogResult = true;
                this.detailForm = {

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
                this.detailForm = list;
                this.dialogResult = true;

            },
            // 查看
            rowshow(row) {
                this.type='look';
                var list = this.multipleSelection[0];
                this.detailForm = list;
                this.dialogResult = true;
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
                            "/api/contract/ContractInfoExpand/list/delete",
                            {ids: uuids}
                        )
                        .then((res) => {
                            this.getData()
                        });
                }).catch(() => {
                })
                // uuids.join(',')

            },
           // list通用方法开始
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
                  expandName: "",
                  expandTypeName: "",
                  createOrgName: "",
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
                        "/api/contract/ContractInfoExpand/list/loadPageData",
                        this.searchform
                    )
                    .then((res) => {
                        this.page = res.data.data;
                    });
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
    width: 50%!important;
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

   .dialog-footer {
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
