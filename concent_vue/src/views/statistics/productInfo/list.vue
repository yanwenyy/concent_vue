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
          :width="300"
          align="center"
          label="单位名称"
          prop="createOrgName"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="启用状态"
          prop="venabled"

          show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>启用状态</span>
            <el-select
              class="list-search-picker"
              clearable
              filterable
              placeholder="请选择"
              size="mini"
              v-model="searchform.venabled"
            >
              <el-option
                label="启用"
                value="1"
              ></el-option>
              <el-option
                label="禁用"
                value="0"
              ></el-option>
            </el-select>
          </template>
          <template slot-scope="scope">{{scope.row.venabled=='1'?'启用':scope.row.venabled=='0'?'禁用':''}}</template>
          <!--<template slot-scope="scope">-->
              <!--{{scope.row.bidFlowStatus==1?'草稿':scope.row.bidFlowStatus==2?'审核中':scope.row.bidFlowStatus==3?'审核通过':scope.row.bidFlowStatus==4?'审核退回':'待登记'}}-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="境内/外"
          prop="vjnw"
          show-overflow-tooltip>

          <template slot="header" slot-scope="scope">
            <span>境内/外</span>
            <el-select
              class="list-search-picker"
              clearable
              filterable
              placeholder="请选择"
              size="mini"
              v-model="searchform.vjnw"
            >
              <el-option
                label="境内"
                value="境内"
              ></el-option>
              <el-option
                label="境外"
                value="境外"
              ></el-option>
            </el-select>
          </template>
           <!--<template slot-scope="scope">{{-->
            <!--scope.row.endTime | dateformat-->
          <!--}}</template>-->
        </el-table-column>
        <el-table-column
          align="center"
          label="是否包含增值税"
          prop="vincludevat"
          show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.vincludevat=='1'?'包含':scope.row.vincludevat=='0'?'不包含':''}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="新签是否显示"
          prop="isXqShow"
          show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.isXqShow=='1'?'是':scope.row.isXqShow=='0'?'否':''}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="产值是否填月报"
          prop="isTb"
          show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.isTb=='1'?'是':scope.row.isTb=='0'?'否':''}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="产品类型"
          prop="productTypeName"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="排序"
          prop="vsort"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="备注"
          prop="vremark"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="产品信息" :visible.sync="dialogFormVisible">
      <el-form :model="form"  ref="form" class="proForm">
        <el-form-item label="产品编码:">
          <el-input v-model="form.vcode" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="产品名称:">
          <!-- <el-input v-model="form.vname" autocomplete="off" :disabled="look"></el-input> -->
          <el-select v-model="form.productId" @change="getProduct(form.productId,productNames)" placeholder="请选择产品名称" :disabled="look">
            <el-option
              :key="index"
              :label="item.vname"
              :value="item.id"
              v-for="(item, index) in productNames"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计量单位:">
          <el-select v-model="form.vmeasurename"  @change="getName(
                          form.vmeasureunitid,
                          measureUnit,
                          'vmeasurename',
                          'vmeasureunit'
                        )" placeholder="请选择计量单位" :disabled="true">
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in measureUnit"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用状态:">
          <el-select v-model="form.venabled" placeholder="请选择启用状态" :disabled="look">
            <el-option
              label="启用"
              value="1"
            ></el-option>
            <el-option
              label="禁用"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="境内/外:">
          <el-select v-model="form.vjnw" placeholder="请选择境内/外" :disabled="look">
            <el-option
              label="境内"
              value="境内"
            ></el-option>
            <el-option
              label="境外"
              value="境外"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否包含增值税:">
          <el-select v-model="form.vincludevat" placeholder="请选择" :disabled="look">
            <el-option
              label="包含"
              value="1"
            ></el-option>
            <el-option
              label="不包含"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="新签是否显示:">
          <el-select v-model="form.isXqShow" placeholder="请选择" :disabled="look">
            <el-option
              label="是"
              value="1"
            ></el-option>
            <el-option
              label="否"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="产值是否填月报:">
          <el-select v-model="form.isTb" placeholder="请选择" :disabled="look">
            <el-option
              label="是"
              value="1"
            ></el-option>
            <el-option
              label="否"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格型号:">
          <el-input v-model="form.specificationAndModel" autocomplete="off" :disabled="look"></el-input>
        </el-form-item>
        <el-form-item label="业务类型:">
          <el-select v-model="form.ywtypename"  @change="getName(
                          form.ywtypeid,
                          bizTypeCode,
                          'ywtypename',
                          'ywtypecode'
                        )" placeholder="请选择业务类型" :disabled="true">
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in bizTypeCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型:">
          <el-select v-model="form.productTypeName"
                     @change="getName(
                          form.productTypeId,
                          cplxList,
                          'productTypeName',
                          'productTypeCode'
                        )"
                     placeholder="请选择产品类型" :disabled="true">
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in cplxList"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="排序:">
          <el-input v-model="form.vsort" autocomplete="off" :disabled="look"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            :disabled="look"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.vremark">
          </el-input>
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
      cplxList:[],
      formLabelWidth:'120px',
      dialogFormVisible: false,
      look:false,
      productData:{},
      form: {
        vmeasurename: '',
        venabled: '',
        vjnw: '',
        vsort: '',
        vremark: '',
        specificationAndModel:'',
        productId:null,
        isXqShow:'1',
      },
      page: { current: 1, size: 20, total: 0, records: [] },
      searchform: {
        current: 1,
        size: 20,
        vcode: "",
        vname: "",
        vjnw:'',
        venabled:'1',
        isTb:'1',
        vmeasurename:''
      },
      multipleSelection: [],
      // 产品名称
      productNames:[],
    };
  },
   components: {
    },
    computed: {
     //计量单位
      measureUnit() {
        return this.$store.state.measureUnit;
      },
      //业务类型
      bizTypeCode() {
        // console.log(this.$store.state.category.bizTypeCode)
        var list=[];
        this.$store.state.bizTypeCode.forEach((item)=>{
          if(item.parentDetailId==null){
            list.push(item)
          }
        });
        return list;
      },
},
  methods: {
    //获取产品类型列表
    getCplx(code){
      this.$http
        .post(
          '/api/statistics/product/list/sysDic',
          {
            categoryName:"业务类别",
            detailCode:code
          }
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.cplxList=res.data.data;
            this.cplxList.forEach((item)=>{
              item.detailCode=item.DETAIL_CODE;
              item.detailName=item.DETAIL_NAME;
              item.id=item.ID;
            })
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
        if(name=='ywtypename'){
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
              '/api/statistics/product/list/saveOrUpdate',
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
      this.form={};
      this.productData = {},
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
        this.productData=row;
        this.form.productId = row.productId
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
              "/api/statistics/product/list/delete",{ids: uuids}

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
        prodectTypeName: row.prodectTypeName,
        productId:row.productId,
        vmeasurename:row.vmeasurename,
        specificationAndModel:row.specificationAndModel,
        ywtypename:row.ywtypename,
        productTypeName:row.productTypeName,

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
         "/api/statistics/product/list/loadPageData",
          this.searchform
        )
        .then((res) => {
          this.page = res.data.data;
        });
      // 获取产品下拉信息
      this.$http.post("/api/statistics/productbase/list/entityList").then((res) => {
        this.productNames = res.data.data
      });
    },
    // 选择产品名称
    getProduct(id,list) {
      if (id) {
        this.$forceUpdate();
        let item = list.find(
          (item) => item.id == id
        );
        this.productData = item
      }
    }
  },
  mounted() {
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
