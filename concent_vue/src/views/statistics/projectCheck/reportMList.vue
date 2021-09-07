<!--工程月报上报-项目部月报-列表查询-->

<template>
  <div>
<!--    <el-collapse value="projectInfo">
      <el-collapse-item title="项目信息" name="projectInfo">
        <template slot="title">
          <i class="header-icon el-icon-collection"></i>项目信息
        </template>
        <div>项目名称：<span style="color:#0a469d !important;margin-right: 50px;">{{projectName}}</span></div>
      </el-collapse-item>
    </el-collapse>-->
    <div style="width: 100%; overflow: hidden">
      <el-button-group style="float: left">
        <el-button  @click="add" type="primary" plain><i class="el-icon-plus"></i>新增</el-button>
        <el-button @click="edit" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>
        <el-button @click="del" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>
      </el-button-group>
        <div style="float: left;margin: 4px auto;margin-left: 20px;"><span style="color: red;">项目名称：{{projectName}}</span></div>
      <div style="float: right;">
        <el-button
          @click="searchformReset"
          type="info"
          plain
          style="color:black;background:none">
          <i class="el-icon-refresh-right"></i>重置
        </el-button>
        <el-button @click="searchformSubmit" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        <el-button  @click="back" type="info"  style="color:black;background:none;margin-left: 0" plain>返回</el-button>
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
        <el-table-column label="projectId" align="center" prop="projectId" v-if="false" />
         <el-table-column
              :min-width="200"
              align="center"
              label="月报日期"
              prop="yearDateS"
              show-overflow-tooltip
            >
           <template slot="header" slot-scope="scope">
             <span>月报日期</span>
             <div>
               <el-date-picker
                 class="list-search-picker"
                 filterable
                 clearable
                 type="month"
                 value-format="yyyy-MM"
                 v-model="searchform.yearDateS"
               >
               </el-date-picker>
             </div>
           </template>
           <template slot-scope="scope">{{
             scope.row.reportYear+"-"+scope.row.reportMonth
             }}</template>
          </el-table-column>
        <el-table-column
          :min-width="200"
          align="center"
          label="项目名称"
          prop="reportProjectName"
          show-overflow-tooltip
        >
         <template slot="header" slot-scope="scope">
            <span>项目名称</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.reportProjectName" size="mini"/>
            </div>
          </template>
          </el-table-column>
         <el-table-column
          :min-width="200"
          align="center"
          label="所属单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
         <template slot="header" slot-scope="scope">
            <span>所属单位</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.createOrgName" size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="状态"
          prop="flowStatus"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
             {{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核驳回':'未创建'}}
          </template>
          <template slot="header" slot-scope="scope">
            <span>状态</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                v-model="searchform.flowStatus"
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
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="批复状态"
          prop="pfStatus"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <span>批复状态</span>
            <div>
              <el-input style=" width: 100%" v-model="searchform.pfStatus" size="mini"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="批复金额"
          prop="pfMoney"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="120"
          align="center"
          label="审核通过时间"
          prop="checkfinishTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.checkfinishTime | dateformat
            }}</template>
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
        <el-dialog :title="addTitle" :visible.sync="showYMDialog" append-to-body @close="closeAdd">
            <div>
              <div>
                <table>
                   <tr>
                    <td><span style="color: red;font-weight:bold">*</span>填报时间:</td>
                    <td style="width:70%;text-align:left;padding:10px">
                       <el-date-picker
                            v-model="form1.year"
                            type="month"
                            format="yyyy-MM"
                            value-format="yyyy-MM"
                            placeholder="填报时间">
                          </el-date-picker>
                    </td>
                      </tr>
                   <!--    <tr>
                            <td><span style="color: red;font-weight:bold">*</span>填报月:</td>
                            <td style="width:70%;text-align:left;padding:10px">
                               <el-date-picker
                                    v-model="form1.month"
                                     type="month"
                                     format="MM"
                                      value-format="MM"
                                    placeholder="填报月">
                                  </el-date-picker>
                            </td>
                      </tr>-->
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
        showYMDialog:false,
        addTitle:'选择填报年月',
        form1:{
        year:''
        },
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        projectName: JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectName,
        treeStatas: false,
        page: { current: 1, size: 20, total: 0, records: [] },
        searchform: {
          current: 1,
          size: 20
        },
        menus: [],
        multipleSelection: [],
        orgTree: [],
        flowStatusList:[
          {
            detailName:"草稿",
            id:'edit'
          },
          {
            detailName:"审核中",
            id:'check'
          },
          {
            detailName:"审核通过",
            id:'pass'
          },
          {
            detailName:"审核驳回",
            id:'reject'
          }
        ]
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
        add() {
           if (this.multipleSelection.length > 0) {
                this.$message.info("请取消选中的数据后进行新增操作", "提示")
                return false
            }
          this.type = 'add'
          this.showYMDialog=true
        },
      //提交
      submit() {
        if(!this.form1.year) {
          this.show = true
          return false
        }
       var years =this.form1.year.split("-");
        //判断当前年月是否创建
        if(this.page.records.length>0){
          for (var i=0; i < this.page.records.length; i++) {
            if((this.page.records[i].reportYear+"-"+this.page.records[i].reportMonth)==this.form1.year){
              this.$message.info('当前年月已创建,请重新选择时间！')
              return false;
            }
          };
        }
        var url = '/api/statistics/Projectcheck/detail/entityInfoByPrjCheck'
        var params = {}
        params.projectId = JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectId
        params.createOrgCode =JSON.parse(this.$utils.decrypt(this.$route.query.p)).orgCode
        params.reportProjectName =JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectName
        params.reportYear = years[0]
        params.reportMonth = years[1]
        params.status='1'
        params.flowStatus='edit'
        params.yearDateS=this.form1.year
       this.$http.post(
        url,
        JSON.stringify(params),
        {useJson: true}
       ).then((res) => {
            if (res.data.code === 200) {
            this.showYMDialog = false
              let p = {projectId:res.data.data.projectcheck.projectId,uuid:res.data.data.projectcheck.uuid,
                yearDateS:res.data.data.projectcheck.yearDateS,orgCode:res.data.data.projectcheck.createOrgCode,
                projectName:res.data.data.projectcheck.reportProjectName,projectStatus:res.data.data.projectcheck.flowStatus
              }
                this.$router.push({
                      path: '../reportMDetail/',
                      query: {p: this.$utils.encrypt(JSON.stringify(p))}
                    })
           }else if(res.data.code === 400){
                this.$message({
                message: "该单位已在本月创建过月报请尝试修改或于下月再进行尝试"
                })
                 this.showYMDialog= false
                 this.getData()
           }else{
               this.$message({
                   message: "创建失败"
                  })
           }
      })
      },
      closeAdd() {
            for(let item in this.form1) {
              if(this.form1.hasOwnProperty(item)) {
                this.form1[item] = ''
              }
            }
            this.show = false
            this.showYMDialog = false
            //this.query()
          },
        //编辑
        edit() {
          if (this.multipleSelection.length == 0) {
              this.$message.info("请选择需要编辑的数据", "提示")
              return false
           }
            if (this.multipleSelection.length >1) {
             this.$message.info("请选择一条数据，进行编辑", "提示")
             return false
            }
          if ((this.multipleSelection[0].flowStatus!=null||this.multipleSelection[0].flowStatus!='')&& this.multipleSelection[0].flowStatus=='check'){
            this.$message.info("审核中的数据不能修改", "提示")
            return false
          }

          this.type = 'edit'
          this.form1 = JSON.parse(JSON.stringify(this.multipleSelection[0]))
          let p = {fromPath:'./listAll',selfPath:'../reportMList',fromDate:this.searchform.yearDateS,projectId:JSON.parse(JSON.stringify(this.multipleSelection[0])).projectId,uuid:JSON.parse(JSON.stringify(this.multipleSelection[0])).uuid,
            orgCode:JSON.parse(JSON.stringify(this.multipleSelection[0])).createOrgCode,
            projectStatus:JSON.parse(JSON.stringify(this.multipleSelection[0])).flowStatus,projectName:this.multipleSelection[0].reportProjectName
          }
          if(this.multipleSelection[0].flowStatus=='pass'){
            this.$http
              .post(
                '/api/statistics/Projectcheck/detail/checkGrant',
                JSON.stringify(this.multipleSelection[0]),
                {useJson: true}
              )
              .then((res) => {
                if(res.data.code==200){
                  this.$confirm(`此条数据已经审核通过,确认补录吗`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.$http
                      .post(
                        '/api/statistics/Projectcheck/detail/supplyCheck',
                        { uuid: this.multipleSelection[0].uuid }
                      )
                      .then((res) => {
                        p.uuid=res.data.data.uuid;
                        this.$router.push({
                          path: this.p.fromPath?'./reportMDetail/':'../reportMDetail/',
                          query: {p: this.$utils.encrypt(JSON.stringify(p))}
                            })
                          })
                      }).catch(() => {
                      })

                }else{
                  this.$message.error(res.data.msg)
                }
              })
          }else{
            this.$router.push({
              path: this.p.fromPath?'./reportMDetail/':'../reportMDetail/',
              query: {p: this.$utils.encrypt(JSON.stringify(p))}
            })
          }

        },
      // 删除
      del() {
        if (this.multipleSelection.length < 1) {
          this.$message.info('请选择一条记录进行删除操作！')
          return false
        }
        let uuids = [],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.flowStatus=='edit'||item.flowStatus=='reject'){
          uuids.push(item.uuid)}
          else{
            this.$message.info('只允许删除未上报的数据！')
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
              '/api/statistics/Projectcheck/list/delete',
              { ids: uuids }
            )
            .then((res) => {
              this.getData()
            })
        }).catch(() => {
        })}
      },
      // 查看
      rowShow(row) {
          console.log(this.p)
        let p = { fromPath:'./listAll',selfPath:'../reportMList',fromDate:this.searchform.yearDateS,actpoint: 'look', projectId: row.projectId,uuid:row.uuid,reportYear:row.reportYear,reportMonth:row.reportMonth,orgCode:row.createOrgCode,projectName:row.reportProjectName,projectStatus:row.flowStatus }
        this.$router.push({
          path: this.p.fromPath?'./reportMDetail/':'../reportMDetail/',
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
        this.searchform.current = 1
        var shijian=this.searchform.yearDateS;
        if(shijian!='' && shijian!=null && shijian!=undefined){
        var y=shijian.split("-")[0];
        var m =shijian.split("-")[1];
        this.searchform.reportYear=y;
        this.searchform.reportMonth=m;
        }
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
          createTime: '',
          createUserId: '',
          createUserName: '',
          projectId:JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectId,
          status:'',
          flowStatus:'',
          reportProjectName:'',
          uuid:'',
          yearDates:''

        }
        this.getData()
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 获取分页数据
      getData() {
      this.searchform.projectId=JSON.parse(this.$utils.decrypt(this.$route.query.p)).projectId
        this.$http
          .post('/api/statistics/Projectcheck/list/loadPageData', this.searchform)
          .then(res => {
            this.page = res.data.data
          })
      },
      // 返回上一页
      back() {
        if(this.p.fromPath){
          console.log(this.p.fromPath)
          this.$router.push({
            path: this.p.fromPath,
          })
        }else{
          this.$router.back()
        }
      },
    },

    created() {
      if(this.p&&this.p.fromDate){
        this.searchform.yearDateS=this.p.fromDate;
        var shijian=this.searchform.yearDateS;
        if(shijian!=''&& shijian!=null) {
          var y = shijian.split("-")[0];
          var m = shijian.split("-")[1];
          this.searchform.reportYear = y;
          this.searchform.reportMonth = m;
        }
      }
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
