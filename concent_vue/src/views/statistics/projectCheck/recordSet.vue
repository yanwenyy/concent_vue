<!--工程月报上报截止日期-->

<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <!--<el-button @click="add" type="primary" plain>新增</el-button>-->
        <el-button  @click="showCfclAddDialog" type="primary" plain><i class="el-icon-plus"></i>新增</el-button>
        <el-button @click="showCfclEditDialog" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="del" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
      </el-button-group>
      <div style="float: right;">
        <el-button
          @click="searchformReset"
          type="info"
          plain
          style="color:black;background:none">
          <i class="el-icon-refresh-right"></i>重置
        </el-button>
        <el-button @click="searchformSubmit" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
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
          'background-color': 'whitesmoke'
        }"
        @row-dblclick="rowShow"
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
          :min-width="200"
          align="center"
          label="填报人"
          prop="createUserName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>填报人</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.createUserName"  />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="200"
          align="center"
          label="填报单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>填报单位</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.createOrgName"  />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="被授权单位"
          prop="orgName"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>被授权单位</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.orgName"  />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="是否启用"
          prop="startStatus"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>是否启用</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"

                v-model="searchform.isEnable"
              >
                <el-option
                  label="是"
                  value="1"
                ></el-option>
                <el-option
                  label="否"
                  value="0"
                ></el-option>
              </el-select>
              <!--<el-input-->
              <!--class="list-search-picker"-->
              <!--style=" width: 100%"-->
              <!--v-model="searchform.flowStatus"-->
              <!-- -->
              <!--/>-->
            </div>
          </template>
          <template slot-scope="scope">
            {{scope.row.isEnable==1?'启用':'未启用'}}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="补录开始日期"
          prop="startDate"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>补录开始日期</span>
            <div>
              <el-date-picker
                v-model="searchform.startDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择" style=" width: 100%"  >
              </el-date-picker>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="补录截至日期"
          prop="endDate"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>补录截至日期</span>
            <div>
              <el-date-picker
                v-model="searchform.endDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择" style=" width: 100%"  >
              </el-date-picker>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="补录年月"
          prop="yearMonth"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>补录年月</span>
            <div>
              <el-date-picker
                style=" width: 100%"
                v-model="searchform.yearMonth"

                type="month"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :page-sizes="[20, 50, 100]"
        :total="page.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 5px"
        v-if="page.total !== 0"
      ></el-pagination>

      <el-dialog :title="addTitle1" :visible.sync="showCfclAddDialog1" append-to-body @close="closeAdd">
        <div>
          <div>
            <table>
              <tr>
                <td><span style="color: red;font-weight:bold">*</span>被授权单位:</td>
                <td style="width:80%;text-align:left;padding:10px">
                  <el-input  :disabled="true" v-model.trim="form1.orgName" placeholder="被授权单位" min="0" max="500" type="text"
                             style="width:70%" >
                    <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addDw('被授权单位',form1.orgId)"></el-button>
                  </el-input>
                  <span style="color:red;font-size:12px;float:left" v-if="this.show && this.form1.orgName == ''">此项不能为空</span>
                </td>
              </tr>
              <tr>
                <td><span style="color: red;font-weight:bold">*</span>是否启用:</td>
                <td style="width:80%;text-align:left;padding:10px">
                  <el-radio-group v-model="form1.isEnable">
                    <el-radio label="1" ><span>是</span></el-radio>
                    <el-radio label="0" ><span>否</span></el-radio>
                  </el-radio-group>
                  <span style="color:red;font-size:12px" v-if="this.show && this.form1.startStatus == ''">此项不能为空</span>
                </td>
              </tr>
              <tr>
                <td><span style="color: red;font-weight:bold">*</span>补录开始日期:</td>
                <td style="width:80%;text-align:left;padding:10px">
                  <el-date-picker
                    v-model="form1.startDate"
                    type="date"
                    style="width:70%;display: inline-block"
                    format="yyyy-MM-dd"
                    @change="jyShow"
                    value-format="yyyy-MM-dd"
                    placeholder="选择时间">
                  </el-date-picker>
                  <span style="color:red;font-size:12px" v-if="show && (form1.startDate == ''||form1.startDate == null)">此项不能为空</span>
                </td>
              </tr>
              <tr>
                <td><span style="color: red;font-weight:bold">*</span>补录结束日期:</td>
                <td style="width:80%;text-align:left;padding:10px">
                  <el-date-picker
                    v-model="form1.endDate"
                    type="date"
                    format="yyyy-MM-dd"
                    style="width:70%;display: inline-block"
                    value-format="yyyy-MM-dd"
                    @change="jyShowEnd"
                    placeholder="选择时间">
                  </el-date-picker>
                  <span style="color:red;font-size:12px" v-if="show && (form1.endDate == ''||form1.endDate == null)">此项不能为空</span>
                </td>
              </tr>
              <tr>
                <td><span style="color: red;font-weight:bold">*</span>补录年月:</td>
                <td style="width:80%;text-align:left;padding:10px">
                  <el-date-picker
                    v-model="form1.yearMonth"
                    type="month"
                    format="yyyy-MM"
                    style="width:70%;display: inline-block"
                    value-format="yyyy-MM"
                    @change="jyShowEnd2"
                    placeholder="选择时间">
                  </el-date-picker>
                  <span style="color:red;font-size:12px" v-if="show && (form1.yearMonth == ''||form1.yearMonth == null)">此项不能为空</span>
                </td>
              </tr>
            </table>
          </div>
          <div style="text-align:right;margin-top:10px">
            <el-button @click="submit" type="primary">确认</el-button>
            <el-button @click="closeAdd" type="primary">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
    <State ref="stateUpdate" :data="projectStatus" @resetState="getData"></State>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import State from '@/components/state'
  import CompanyTree from '../companyTree'

  export default {
    name: 'proposal-list-look',
    components: {
      Tree, State,CompanyTree
    },
    data() {
      return {
        DwVisible: false,
        userdata:{},
        //新增弹窗
        showCfclAddDialog1: false,
        addTitle1: "新增",
        //上报截止日期
        form1: {
          orgId: '',
          orgCode: '',
          orgName: '',
          isEnable: '',
          startDate: '',
          endDate: '',
          yearMonth: '',
        },
        treeStatas: false,
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          current: 1,
          size: 20,
          createOrgCode: '',
          createOrgId: '',
          createOrgName: '',
          createOrgType: '',
          createTime: '',
          createUserId: '',
          createUserName: '',
          endreporttime: '',
          reportType: '',
          restrictedobjects:'',
          standardreporttime:'',
        },
        show:false,
        menus: [],
        flowStatusList:[
          {
            detailName:"启用",
            id:'1'
          },
          {
            detailName:"未启用",
            id:'2'
          }
        ],
        multipleSelection: [],
        orgTree: []
      }
    },
    computed: {
      projectDomainType() {
        return this.$store.state.category.projectDomainType
      },
      projectNature() {
        return this.$store.state.category.projectNature
      },
      projectType() {
        return this.$store.state.projectType
      },
      projectStatus() {
        return this.$store.state.projectStatus
      }
    },
    methods: {
      //打开单位弹框
      addDw(type,list,ifChek,index,tableList){
        this.DwVisible = true;
        this.$nextTick(() => {
          this.$refs.infoDw.init(type,list,ifChek,index,tableList);
        })
      },
      //获取单位的值
      getDwInfo(data){
        console.log(data);
        this.$forceUpdate();
        var id=[],name=[],code=[];
        if(data){
          data.forEach((item)=>{
            id.push(item.id);
            name.push(item.detailName);
            code.push(item.code)
          })
        }
        if(data.type=="被授权单位"){
          this.form1.orgName=name.join(",");
          this.form1.orgId=id.join(",");
          this.form1.orgCode=code.join(",");
        }
        this.DwVisible=false;
      },
      //新增
      showCfclAddDialog() {
        if (this.multipleSelection.length > 0) {
          this.$message.info("请取消选中的数据后进行新增操作", "提示")
          return false;
        }
        this.type = 'add';
        this.addTitle1 = '新增';
        this.form1.createOrgName=this.userdata.managerOrgName;
        this.form1.createOrgType=this.userdata.managerOrgType;
        this.form1.createUserName=this.userdata.username;
        this.form1={
          orgId: '',
          orgCode: '',
          orgName: '',
          isEnable: '',
          startDate: '',
          endDate: '',
          yearMonth: '',
        };
        this.showCfclAddDialog1 = true;
      },
      jyShow(){
        if(this.form1.startDate==null || this.form1.startDate=='') {
          this.show = true
        }
        this.$forceUpdate();
      },
      jyShowEnd(){
        if(this.form1.endDate==null || this.form1.endDate==''){
          this.show=true
        }
        this.$forceUpdate();
      },
      jyShowEnd2(){
        if(this.form1.yearMonth==null || this.form1.yearMonth==''){
          this.show=true
        }
        this.$forceUpdate();
      },
      //提交
      submit() {
        var url = '/api/statistics/supplyConfig/detail/save';
        var params = {};
        params.orgName = this.form1.orgName;
        params.orgId = this.form1.orgId;
        params.orgCode = this.form1.orgCode;
        params.isEnable = this.form1.isEnable;
        params.startDate = this.form1.startDate;
        params.endDate = this.form1.endDate;
        params.yearMonth = this.form1.yearMonth;
        if(this.type == 'edit') {
          params.uuid = this.form1.uuid;
        }
        this.$http.post(
            url,
            JSON.stringify(params),
            {useJson: true}
        ).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.showCfclAddDialog1 = false;
            this.getData()
          }
        })
      },
      //编辑
      showCfclEditDialog() {
        if (this.multipleSelection.length == 0) {
          this.$message.info("请选择需要编辑的数据", "提示")
          return false;
        }
        if (this.multipleSelection.length >1) {
          this.$message.info("请选择一条数据，进行编辑", "提示")
          return false;
        }
        this.type = 'edit';
        this.addTitle1 = '编辑';
        this.$http
          .post('/api/statistics/supplyConfig/detail/entityInfo', {id:this.multipleSelection[0].uuid})
          .then(res => {
            this.form1 = res.data.data;
            this.showCfclAddDialog1 = true;
          })

      },
      // 删除
      del() {
        if (this.multipleSelection.length < 1) {
          this.$message.info('请选择一条记录进行删除操作！')
          return false
        }
        let uuids = []
        this.multipleSelection.forEach((item) => {
          uuids.push(item.uuid)
        })
        this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http
              .post(
                  '/api/statistics/supplyConfig/list/delete',
                  { ids: uuids }
              )
              .then((res) => {
                this.getData()
              })
        }).catch(() => {
        })
      },
      // 查看
      rowShow(row) {
        let p = { actpoint: 'look', uuid: row.uuid }
        this.$router.push({
          path: '',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      // 选中查看
      show() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info('请选择一条记录进行查看操作!')
          return false
        }
        let p = { actpoint: 'look', uuid: this.multipleSelection[0].uuid }
        this.$router.push({
          path: '',
          query: { p: this.$utils.encrypt(JSON.stringify(p)) }
        })
      },
      handleSizeChange(val) {
        this.searchform.size = val
        this.getData()
      },
      handleCurrentChange(val) {
        this.searchform.current = val
        this.getData()
      },
      searchformSubmit() {
        this.searchform.current = 1;
        this.getData()
      },
      searchformReset() {
        this.searchform = {
          current: 1,
          size: 20,
          createOrgCode: '',
          createOrgId: '',
          createOrgName: '',
          createOrgType: '',
          createTime: '', // 其他
          createUserId: '',
          createUserName: '',
          endreporttime: '',
          reportType: '2',
          restrictedobjects:'',
          standardreporttime:'',
          startStatus:'',
          uuid:''
        }
        this.getData()
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 获取分页数据
      getData() {

        this.$http
            .post('/api/statistics/supplyConfig/list/loadPageData', this.searchform)
            .then(res => {
              this.page = res.data.data
            })
      },
      closeAdd() {
        for(let item in this.form1) {
          if(this.form1.hasOwnProperty(item)) {
            this.form1[item] = ''
          }
        }
        this.show = false
        this.showCfclAddDialog1 = false
        this.getData()
      }
    },

    created() {
      this.getData()
      console.log(JSON.parse(sessionStorage.getItem('userdata')))
      this.userdata=JSON.parse(sessionStorage.getItem('userdata'))
    },

  }
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
</style>
