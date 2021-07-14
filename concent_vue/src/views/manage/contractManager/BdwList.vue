<template>
  <div>
    <div style="width: 100%;overflow: hidden;">
      <el-button-group style="float: left">
        <el-button type="primary" @click="add" plain><i class="el-icon-document-checked"></i>新增</el-button>
        <el-button @click="totop" plain type="primary"><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="remove" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>

      </el-button-group>
      <div style="float: right">
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain ><i class="el-icon-search"></i>查询</el-button>
      </div>
    </div>

    <div style="margin-top: 10px">
      <el-table
        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="page.records"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        style="width: 100%"
        tooltip-effect="dark"
      >
        <el-table-column
          :width="50"
          align="center"
          show-overflow-tooltip
          type="selection">
        </el-table-column>
        <!--<el-table-column-->
          <!--:width="70"-->
          <!--align="center"-->
          <!--label="序号"-->
          <!--show-overflow-tooltip-->
          <!--type="index"-->
          <!--fixed>-->
        <!--</el-table-column>-->
        <el-table-column
          align="center"
          label="编码"
          prop="subjectMatterCode"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          width="500"
          label="标的物名称"
          prop="subjectMatterName"
          show-overflow-tooltip
          >
          <template slot="header" slot-scope="scope">
            <span>标的物名称</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.subjectMatterName"
                size="mini"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="计量单位"
          prop="subjectMatterUnitName"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="所属单位"
          prop="createOrgName"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="是否启用"
          prop="isEnable"
          show-overflow-tooltip>
          <template slot-scope="scope">
              <el-switch
                class="inline-formitem-switch"
                v-model="scope.row.isEnable"
                active-color="#409EFF"
                inactive-color="#ddd"
                active-value="1"
                inactive-value="0"
                @change="changeUse(scope.row.isEnable,scope.row.id)"
              >
              </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="标的物维护" :visible.sync="dialogFormVisible">
      <el-form :model="form"  ref="form" class="proForm">
        <el-form-item label="编码:">
          <el-input v-model="form.subjectMatterCode" autocomplete="off" :disabled="look"></el-input>
        </el-form-item>
        <el-form-item label="标的物名称:">
          <el-input v-model="form.subjectMatterName" autocomplete="off" :disabled="look"></el-input>
        </el-form-item>
        <el-form-item label="计量单位:">
          <el-select v-model="form.subjectMatterUnitName" placeholder="请选择计量单位" :disabled="look">
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.detailName"
              v-for="(item, index) in measureUnit"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属单位:">
          <el-input v-model="form.createOrgName" autocomplete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="!look" type="primary" @click="sub('form','save')">保 存</el-button>
        <el-button v-if="form.isSubmit=='0'&&!look" type="primary" @click="sub('form','sub')">提 交</el-button>
      </div>
    </el-dialog>
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[20, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>

  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem('userdata')),
      formLabelWidth:'120px',
      dialogFormVisible: false,
      look:false,
      form: {
        isSubmit:"0",
      },
      page: { current: 1, size: 20, total: 0, records: [] },
      searchform: {
        current: 1,
        size: 20,
        subjectMatterName: "",
      },
      multipleSelection: [],
    };
  },
   components: {
    },
    computed: {
     //计量单位
      measureUnit() {
        return this.$store.state.measureUnit;
      },
},
  methods: {
    //是否启用点击
    changeUse(val,id){
      this.$http
        .post(
          "/api/contract/SubjectMatter/list/isEnable",
          JSON.stringify({id:id, isEnable:val}),
          {useJson: true}

        )
        .then((res) => {
          if (res.data && res.data.code === 200) {
            this.getData();
          } else {
            this.$message.error(data.msg)
          }
        });
    },
    //获取下拉框id和name的公共方法
    getName(id, list, name,code) {
      if(id){
        this.$forceUpdate();
        this.form[name] = list.find(
          (item) => item.id == id
        ).detailName;
        this.form[code] = list.find(
          (item) => item.id == id
        ).detailCode;
        console.log(this.form[name]);
        console.log(this.form[code]);
      }
    },
    //保存
    sub(formName,type){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.isSubmit = type=='save' ? '0' : '1';
          this.$http
            .post(
              '/api/contract/SubjectMatter/list/saveOrUpdate',
              JSON.stringify(this.form),
              {useJson: true}
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message:  `保存成功`,
                  type: "success",
                });
                this.$refs[formName].resetFields();
                this.dialogFormVisible=false;
                this.getData();
              }
            });
        } else {
          this.$message.error("请添加必填项");
          return false;
        }
      });
    },
    //新增
    add() {
      this.look=false;
      this.form={isSubmit:"0"};
      this.form.createOrgCode=this.userInfo.managerOrgCode;
      this.form.createOrgId=this.userInfo.managerOrgId;
      this.form.createOrgName=this.userInfo.managerOrgName;
       this.dialogFormVisible=true;
    },
    // 修改
    totop() {
      if (this.multipleSelection.length !== 1||this.multipleSelection.length>1) {
        this.$message.info("请选择一条记录进行修改操作！");
        return false;
      }
      this.look=false;
      var row=this.multipleSelection[0];
      this.form=row;
      this.dialogFormVisible=true;
    },
      // 删除
    remove() {
      if (this.multipleSelection.length < 1) {
        this.$message.info("请选择一条记录进行查看操作！");
        return false;
      }
      let uuids = [],itemStatus=true;
      this.multipleSelection.forEach((item) => {
        if(item.isSubmit=='0'){
          uuids.push(item.id);
        }else{
          this.$message.info("当前所选数据中包含不可删除的选项,请检查后进行操作");
          return itemStatus=false;
        }
      })
      if(itemStatus){
        this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http
          .post(
            "/api/contract/SubjectMatter/list/delete",{ids: uuids}

          )
          .then((res) => {
          this.getData()
      });
      }).catch(() => {})
      }

    },
    rowshow(row) {
      this.look=true;
      this.form=row;
      this.dialogFormVisible=true;

    },
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
      // this.$refs["searchform"].resetFields();
        this.searchform= {
          current: 1,
          size: 20,
          subjectMatterName: "",
      }

        this.getData();
    },
    // 列表选项数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      this.$http
        .post(
          "/api/contract/SubjectMatter/list/loadPageData",
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
  },
};
</script>
<style scoped>
.el-dialog{
  width: 60%;
}
.el-table__row {
  cursor: pointer;
}
  .proForm >>>.el-form-item__label{
    width:120px;
    text-align: right;
  }
.proForm >>>.el-form-item__content{
  width:80%;
  display: inline-block;
}
</style>
