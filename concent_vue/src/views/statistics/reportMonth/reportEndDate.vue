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
              <el-input style=" width: 100%" v-model="searchform.createUserName" size="mini"/>
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
              <el-input style=" width: 100%" v-model="searchform.createOrgName" size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="限制对象"
          prop="restrictedobjects"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>限制对象</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.restrictedobjects" size="mini"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="状态"
          prop="startStatus"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.startStatus"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in flowStatusList"
                ></el-option>
              </el-select>
              <!--<el-input-->
              <!--class="list-search-picker"-->
              <!--style=" width: 100%"-->
              <!--v-model="searchform.flowStatus"-->
              <!--size="mini"-->
              <!--/>-->
            </div>
          </template>
          <template slot-scope="scope">
            {{scope.row.startStatus==1?'启用':'未启用'}}
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="标准上报时间"
          prop="standardreporttime"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>标准上报时间</span>
            <div>
              <el-date-picker
                v-model="searchform.standardreporttime"
                type="date"
                format="dd"
                value-format="dd"
                placeholder="选择日" style=" width: 100%" size="mini">
              </el-date-picker>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="截止上报时间"
          prop="endreporttime"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>截止上报时间</span>
            <div>
              <el-date-picker
                v-model="searchform.endreporttime"
                type="date"
                format="dd"
                value-format="dd"
                placeholder="选择日" style=" width: 100%" size="mini">
              </el-date-picker>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>创建时间</span>
            <div>
              <el-date-picker
                style=" width: 100%"
                v-model="searchform.createTime"
                size="mini"
                type="datetime"
                value-format="timestamp"
              >
              </el-date-picker>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- <div>{{scope.row.monthValue}}</div>-->
            <div>
              {{
              scope.row.createTime | dateformat
              }}
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
                <td><span style="color: red;font-weight:bold">*</span>填报单位:</td>
                <td style="width:70%;text-align:left;padding:10px">
                  <el-input  :disabled="true" v-model.trim="form1.createOrgName" placeholder="填报单位" min="0" max="500" type="text"
                             style="width:100%" ></el-input>
                  <span style="color:red;font-size:12px;float:left" v-if="this.show && this.form1.createOrgName == ''">此项不能为空</span>
                </td>
              </tr>
              <tr>
                <td><span style="color: red;font-weight:bold">*</span>填报人:</td>
                <td style="width:70%;text-align:left;padding:10px">
                  <el-input  :disabled="true" v-model.trim="form1.createUserName" style="width:100%" type="text" placeholder="填报人:"></el-input>
                  <span style="color:red;font-size:12px;float:left" v-if="this.show && this.form1.createUserName == ''">此项不能为空</span>
                </td>
              </tr>
              <tr>
                <td><span style="color: red;font-weight:bold">*</span>启用状态:</td>
                <td style="width:70%;text-align:left;padding:10px">
                  <el-radio-group v-model="form1.startStatus">
                    <el-radio label="1" ><span>启用</span></el-radio>
                    <el-radio label="2" ><span>未启用</span></el-radio>
                  </el-radio-group>
                  <span style="color:red;font-size:12px;float:left" v-if="this.show && this.form1.startStatus == ''">此项不能为空</span>
                </td>
              </tr>
              <tr>
                <td><span style="color: red;font-weight:bold">*</span>标准上报时间:</td>
                <td style="width:70%;text-align:left;padding:10px">
                  <el-date-picker
                    v-model="form1.standardreporttime"
                    type="date"
                    format="d"
                    @change="jyShow"
                    value-format="dd"
                    placeholder="选择日">
                  </el-date-picker>
                  <span style="color:red;font-size:12px;float:left" v-if="show && (form1.standardreporttime == ''||form1.standardreporttime == null)">此项不能为空</span>
                </td>
              </tr>
              <tr>
                <td><span style="color: red;font-weight:bold">*</span>下月标准截止时间:</td>
                <td style="width:70%;text-align:left;padding:10px">
                  <el-date-picker
                    v-model="form1.endreporttime"
                    type="date"
                    format="d"
                    value-format="dd"
                    @change="jyShowEnd"
                    placeholder="选择日">
                  </el-date-picker>
                  <span style="color:red;font-size:12px;float:left" v-if="show && (form1.endreporttime == ''||form1.endreporttime == null)">此项不能为空</span>
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
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <State ref="stateUpdate" :data="projectStatus" @resetState="getData"></State>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import State from '@/components/state'

  export default {
    name: 'proposal-list-look',
    components: {
      Tree, State
    },
    data() {
      return {
        userdata:{},
        //新增弹窗
        showCfclAddDialog1: false,
        addTitle1: "新增",
        //上报截止日期
        form1: {
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
          startStatus:'2',
          uuid:''
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
        this.showCfclAddDialog1 = true;
      },
      jyShow(){
        if(this.form1.standardreporttime==null || this.form1.standardreporttime=='') {
          this.show = true
        }
        this.$forceUpdate();
      },
      jyShowEnd(){
        if(this.form1.endreporttime==null || this.form1.endreporttime==''){
          this.show=true
        }
        this.$forceUpdate();
      },
      //提交
      submit() {
        if(!this.form1.createOrgName || !this.form1.createUserName || !this.form1.startStatus || !this.form1.standardreporttime|| !this.form1.endreporttime) {
          this.show = true;
          return false;
        }
        var url = '/api/statistics/projectMonthlyReport/ReportEndtime/detail/save';
        var params = {};
        params.createOrgName = this.form1.createOrgName;
        params.createUserName = this.form1.createUserName;
        params.startStatus = this.form1.startStatus;
        params.standardreporttime = this.form1.standardreporttime;
        params.endreporttime = this.form1.endreporttime;
        params.createOrgId = this.userdata.managerOrgId;
        params.createOrgType = this.userdata.managerOrgType;
        params.createUserId =this.userdata.id;
        params.createOrgCode =this.userdata.createOrgCode;
        params.reportType ='1';
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
        this.form1 = JSON.parse(JSON.stringify(this.multipleSelection[0]));
        this.showCfclAddDialog1 = true;
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
                  '/api/statistics/projectMonthlyReport/ReportEndtime/list/delete',
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
          reportType: '1',
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
            .post('/api/statistics/projectMonthlyReport/ReportEndtime/list/loadPageData', this.searchform)
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
        this.form1.startStatus='2'
      }
    },

    created() {
      this.getData()
      this.userdata=JSON.parse(sessionStorage.getItem('userdata'))
    },

  }
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
</style>
