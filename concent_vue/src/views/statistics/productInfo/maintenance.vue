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
        <el-table-column
          :width="70"
          align="center"
          label="序号"
          show-overflow-tooltip
          type="index"
          fixed>
        </el-table-column>

        <el-table-column
          width="200"
          label="产品编码"
          prop="vcode"
          show-overflow-tooltip
          >
          <template slot="header" slot-scope="scope">
            <span>产品编码</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.vcode"
                size="mini"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="200"
          align="center"
          label="产品名称"
          prop="vname"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>产品名称</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.vname"
                size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="计量单位"
          prop="vmeasurename"
          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>计量单位</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.vmeasurename"
                size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="业务类型"
          prop="ywtypename"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="产品类型"
          prop="productTypeName"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="产品信息" :visible.sync="dialogFormVisible">
      <el-form :model="form"  ref="form" class="proForm">
        <el-form-item label="产品编码:">
          <el-input v-model="form.vcode" autocomplete="off" :disabled="look"></el-input>
        </el-form-item>
        <el-form-item label="产品名称:">
          <el-input v-model="form.vname" autocomplete="off" :disabled="look"></el-input>
        </el-form-item>
        <el-form-item label="计量单位:">
          <el-select v-model="form.vmeasureunitid"  @change="getName(
                          form.vmeasureunitid,
                          measureUnit,
                          'vmeasurename',
                          'vmeasureunit'
                        )" placeholder="请选择计量单位" :disabled="look">
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in measureUnit"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型:">
          <el-select v-model="form.ywtypeid"  @change="getName(
                          form.ywtypeid,
                          bizTypeCode,
                          'ywtypename',
                          'ywtypecode'
                        )" placeholder="请选择业务类型" :disabled="look">
            <el-option
              :key="index"
              :label="item.DETAIL_NAME"
              :value="item.ID"
              v-for="(item, index) in bizTypeCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型:">
          <el-select v-model="form.productTypeId"
                     @change="getName(
                          form.productTypeId,
                          cplxList,
                          'productTypeName',
                          'productTypeCode'
                        )"
                     placeholder="请选择产品类型" :disabled="look">
            <el-option
              :key="index"
              :label="item.DETAIL_NAME"
              :value="item.ID"
              v-for="(item, index) in cplxList"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="!look">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub('form')">确 定</el-button>
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
      bizTypeCode:[],
      cplxList:[],
      formLabelWidth:'120px',
      dialogFormVisible: false,
      look:false,
      form: {
        vcode: '',
        vname: '',
        vmeasure: '',
        venabled: '',
        vremark: ''
      },
      page: { current: 1, size: 20, total: 0, records: [] },
      searchform: {
        current: 1,
        size: 20,
        vcode: "",
        vname: "",
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
    //获取产品类型列表
    getCplx(code){
      this.$http
        .post(
          '/api/statistics/product/list/sysDic',
          {
            parentDetailId:"",
            detailCode:code
          }
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.cplxList=res.data.data;
          }
        });
    },
    //获取下拉框id和name的公共方法
    getName(id, list, name,code) {
      if(id){
        this.$forceUpdate();
        if (name=='vmeasurename') {
          this.form[name] = list.find(
            (item) => item.id == id
          ).detailName;
          this.form[code] = list.find(
            (item) => item.id == id
          ).detailCode;
        }else{
          this.form[name] = list.find(
            (item) => item.ID == id
          ).DETAIL_NAME;
          this.form[code] = list.find(
            (item) => item.ID == id
          ).DETAIL_CODE;
          this.getCplx(this.form[code])
        }
      }
    },
    //保存
    sub(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post(
              '/api/statistics/productbase/list/saveOrUpdate',
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
       this.form={
         // vcode: '',
         // vname: '',
         // vmeasure: '',
         // venabled: '',
         // vjnw: '',
         // vsort: '',
         // vremark: ''
       };
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
        // this.form={
        //   vcode: row.vcode,
        //   vname:  row.vname,
        //   vmeasure:  row.vmeasure,
        //   venabled: row.venabled,
        //   vjnw:  row.vjnw,
        //   vsort:  row.vsort,
        //   vremark: row.vremark,
        //   id:row.id
        // };
        this.getCplx(this.form.ywtypecode)
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
          uuids.push(item.id);
        })
        if(itemStatus){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
              "/api/statistics/productbase/list/delete",{ids: uuids}

            )
            .then((res) => {
            this.getData()
        });
        }).catch(() => {})
        }

      },
    rowshow(row) {
      this.look=true;
      this.form={
        vcode: row.vcode,
        vname:  row.vname,
        vmeasure:  row.vmeasure,
        venabled: row.venabled,
        vjnw:  row.vjnw,
        vsort:  row.vsort,
        vremark: row.vremark,
        vincludevat: row.vincludevat,
        isXqShow:  row.isXqShow,
        isTb:  row.isTb,
        productTypeId: row.productTypeId,
        prodectTypeCode: row.prodectTypeCode,
        prodectTypeName: row.prodectTypeName
      };
      this.getCplx(this.form.ywtypecode)
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
          vcode: "",
          vname: "",
          vmeasure: "",
          vjnw:''
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
         "/api/statistics/productbase/list/loadPageData",
          this.searchform
        )
        .then((res) => {
          this.page = res.data.data;
        });
    },

    // list通用方法结束
  },
  mounted() {
    this.getData();
    this.$store.dispatch("getConfig", {});
    // 业务类型
    this.$http
    .post(
      '/api/statistics/product/list/sysDic',
      {
        parentDetailId:"f01fc41388d14663ac8873113f55cdd5",
        detailCode:''
      }
    )
    .then((res) => {
      if (res.data.code === 200) {
        this.bizTypeCode = res.data.data
      }
    });
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
