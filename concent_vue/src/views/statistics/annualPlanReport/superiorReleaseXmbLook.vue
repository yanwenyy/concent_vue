<template>
  <div>
    <div style="width: 100%; overflow: hidden">
      <el-form class="search-form" :inline="true" :model="searchform" @keyup.enter.native="init()">
        <el-form-item label="项目状态:">
          <el-input style=" width: 100%" v-model="searchform.createOrgName"  />
        </el-form-item>
      </el-form>
      <div style="float: right">
        <!--<el-button-group style="float: left">-->
          <!--<el-button  @click="add" type="primary" plain><i class="el-icon-plus"></i>新增</el-button>-->
          <!--<el-button @click="edit" type="primary" plain><i class="el-icon-edit"></i>修改</el-button>-->
          <!--<el-button @click="del" type="primary" plain><i class="el-icon-delete"></i>删除</el-button>-->
        <!--</el-button-group>-->
        <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
        <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
        <!-- <el-button @click="Importdata" type="primary" plain>导入</el-button> -->
      </div>
    </div>

    <div style="margin-top: 10px">
      <el-table
        row-key="uuid"

        class="tableStyle"
        :max-height="$tableHeight"
        :height="$tableHeight"
        :data="tableData"
        :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
        @row-dblclick="rowshow"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
        ref="table"
        tooltip-effect="dark"


        default-expand-all
        :row-class-name="tableRowClassName"
      >
        <!--:tree-props="{children: 'chirldList', hasChildren: 'hasChildren'}"-->
        <!--lazy-->
        <!--:load="load"-->
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
          :width="500"
          label="项目简称"
          prop="createOrgName"
          show-overflow-tooltip
        >
       <!--   <template slot="header" slot-scope="scope">
            <span>填报单位</span>
            <div>
              <el-input
                class="list-search-picker"
                style=" width: 100%"
                v-model="searchform.createOrgName"

              />
            </div>
          </template>-->
          <!--<template slot-scope="scope">-->
            <!--<span class="blue pointer" v-if="scope.row.reportType != null && scope.row.reportType != ''">-->
              <!--{{scope.row.createOrgName+"("+(scope.row.reportType==1?'自揽':scope.row.reportType==2?'工区':'')+")"}}-->
            <!--</span>-->
            <!--<span class="blue pointer"v-if="scope.row.reportType== null || scope.row.reportType == ''">-->
              <!--{{scope.row.createOrgName}}-->
            <!--</span>-->
          <!--</template>-->

        </el-table-column>
        <el-table-column
          :width="500"
          label="项目名称"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <!--   <template slot="header" slot-scope="scope">
               <span>填报单位</span>
               <div>
                 <el-input
                   class="list-search-picker"
                   style=" width: 100%"
                   v-model="searchform.createOrgName"

                 />
               </div>
             </template>-->
          <!--<template slot-scope="scope">-->
          <!--<span class="blue pointer" v-if="scope.row.reportType != null && scope.row.reportType != ''">-->
          <!--{{scope.row.createOrgName+"("+(scope.row.reportType==1?'自揽':scope.row.reportType==2?'工区':'')+")"}}-->
          <!--</span>-->
          <!--<span class="blue pointer"v-if="scope.row.reportType== null || scope.row.reportType == ''">-->
          <!--{{scope.row.createOrgName}}-->
          <!--</span>-->
          <!--</template>-->

        </el-table-column>
        <el-table-column
          :width="200"
          align="center"
          label="项目状态"
          prop="flowStatus"
          show-overflow-tooltip

        >
<!--          <template slot="header" slot-scope="scope">
            <span>审核状态</span>
            <div>
              <el-select
                class="list-search-picker"
                clearable
                filterable
                placeholder="请选择"

                v-model="searchform.status"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in flowStatusList"
                ></el-option>
              </el-select>
              &lt;!&ndash;<el-input&ndash;&gt;
              &lt;!&ndash;class="list-search-picker"&ndash;&gt;
              &lt;!&ndash;style=" width: 100%"&ndash;&gt;
              &lt;!&ndash;v-model="searchform.flowStatus"&ndash;&gt;
              &lt;!&ndash; &ndash;&gt;
              &lt;!&ndash;/>&ndash;&gt;
            </div>
          </template>-->
          <!--<template slot-scope="scope">-->
            <!--<div>{{scope.row.flowStatus=='edit'?'草稿':scope.row.flowStatus=='check'?'审核中':scope.row.flowStatus=='pass'?'审核通过':scope.row.flowStatus=='reject'?'审核驳回':'未创建'}}-->
            <!--</div>-->
          <!--</template>-->
          <template slot-scope="scope">
            <div>{{scope.row.flowStatus=='0'?'未上报':scope.row.flowStatus=='1'?'部分上报':scope.row.flowStatus=='2'?'已上报':''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="合同额(万元)"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <!--   <template slot="header" slot-scope="scope">
               <span>填报单位</span>
               <div>
                 <el-input
                   class="list-search-picker"
                   style=" width: 100%"
                   v-model="searchform.createOrgName"

                 />
               </div>
             </template>-->
          <!--<template slot-scope="scope">-->
          <!--<span class="blue pointer" v-if="scope.row.reportType != null && scope.row.reportType != ''">-->
          <!--{{scope.row.createOrgName+"("+(scope.row.reportType==1?'自揽':scope.row.reportType==2?'工区':'')+")"}}-->
          <!--</span>-->
          <!--<span class="blue pointer"v-if="scope.row.reportType== null || scope.row.reportType == ''">-->
          <!--{{scope.row.createOrgName}}-->
          <!--</span>-->
          <!--</template>-->

        </el-table-column>
        <el-table-column
          label="行业类别"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <!--   <template slot="header" slot-scope="scope">
               <span>填报单位</span>
               <div>
                 <el-input
                   class="list-search-picker"
                   style=" width: 100%"
                   v-model="searchform.createOrgName"

                 />
               </div>
             </template>-->
          <!--<template slot-scope="scope">-->
          <!--<span class="blue pointer" v-if="scope.row.reportType != null && scope.row.reportType != ''">-->
          <!--{{scope.row.createOrgName+"("+(scope.row.reportType==1?'自揽':scope.row.reportType==2?'工区':'')+")"}}-->
          <!--</span>-->
          <!--<span class="blue pointer"v-if="scope.row.reportType== null || scope.row.reportType == ''">-->
          <!--{{scope.row.createOrgName}}-->
          <!--</span>-->
          <!--</template>-->

        </el-table-column>
        <el-table-column
          label="填报单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <!--   <template slot="header" slot-scope="scope">
               <span>填报单位</span>
               <div>
                 <el-input
                   class="list-search-picker"
                   style=" width: 100%"
                   v-model="searchform.createOrgName"

                 />
               </div>
             </template>-->
          <!--<template slot-scope="scope">-->
          <!--<span class="blue pointer" v-if="scope.row.reportType != null && scope.row.reportType != ''">-->
          <!--{{scope.row.createOrgName+"("+(scope.row.reportType==1?'自揽':scope.row.reportType==2?'工区':'')+")"}}-->
          <!--</span>-->
          <!--<span class="blue pointer"v-if="scope.row.reportType== null || scope.row.reportType == ''">-->
          <!--{{scope.row.createOrgName}}-->
          <!--</span>-->
          <!--</template>-->

        </el-table-column>
        <el-table-column
          label="所属单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <!--   <template slot="header" slot-scope="scope">
               <span>填报单位</span>
               <div>
                 <el-input
                   class="list-search-picker"
                   style=" width: 100%"
                   v-model="searchform.createOrgName"

                 />
               </div>
             </template>-->
          <!--<template slot-scope="scope">-->
          <!--<span class="blue pointer" v-if="scope.row.reportType != null && scope.row.reportType != ''">-->
          <!--{{scope.row.createOrgName+"("+(scope.row.reportType==1?'自揽':scope.row.reportType==2?'工区':'')+")"}}-->
          <!--</span>-->
          <!--<span class="blue pointer"v-if="scope.row.reportType== null || scope.row.reportType == ''">-->
          <!--{{scope.row.createOrgName}}-->
          <!--</span>-->
          <!--</template>-->

        </el-table-column>
        <el-table-column
          label="项目类型"
          prop="createOrgName"
          show-overflow-tooltip
        >
          <!--   <template slot="header" slot-scope="scope">
               <span>填报单位</span>
               <div>
                 <el-input
                   class="list-search-picker"
                   style=" width: 100%"
                   v-model="searchform.createOrgName"

                 />
               </div>
             </template>-->
          <!--<template slot-scope="scope">-->
          <!--<span class="blue pointer" v-if="scope.row.reportType != null && scope.row.reportType != ''">-->
          <!--{{scope.row.createOrgName+"("+(scope.row.reportType==1?'自揽':scope.row.reportType==2?'工区':'')+")"}}-->
          <!--</span>-->
          <!--<span class="blue pointer"v-if="scope.row.reportType== null || scope.row.reportType == ''">-->
          <!--{{scope.row.createOrgName}}-->
          <!--</span>-->
          <!--</template>-->

        </el-table-column>
        <!--<el-table-column-->
          <!--:width="180"-->
          <!--align="center"-->
          <!--label="查看详细"-->
          <!--prop="createTime"-->
          <!--show-overflow-tooltip-->
        <!--&gt;-->
          <!--<template slot-scope="scope">-->
            <!--<span @click="queryGsXq(scope.row)"   class="blue pointer" v-if="scope.row.createOrgType=='13'">-->
            <!--查看详细-->
           <!--</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
  </div>
</template>

<script>
  export default {
    // inject:['reload'],
    //name: "proposal-list-look",
    data() {
      return {
        showYMDialog:false,
        addTitle:'选择填报年月',
        form1:{
          year:''
        },
        p:{},
        Authorization:sessionStorage.getItem("token"),
        page: {current: 1, size: 20, total: 0, records: []},
        mrTime:'',
        tableData: [],
        userdata:{},
        showinput: false,
        sousuo: "",
        searchform: {
          current: 1,
          size: 20,
          createOrgName: "",
          flowStatus: "",
          createTime: "",
          yearDateS: "",
        },
        menus: [],
        multipleSelection: [],
        orgTree: [],
        xqprojectType:[],//工程二级列表
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
          },
          {
            detailName:"未创建",
            id:'0'
          }
        ]
      };
    },
    computed: {

    },
    methods: {
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
      //批量退回
      batchBack(){
        if (this.multipleSelection.length !=1) {
          this.$message.info("请选择一条记录进行提交操作！");
          return false;
        }
        var list=[],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.flowStatus=='pass'){
            item.jtOrGf='2';
            list.push(item);
          }else{
            this.$message.info("当前所选数据中包含不可退回的选项,请检查后进行操作");
            return itemStatus=false;
          }
        })
        if(itemStatus){
          this.$confirm(`确认退回这些数据吗`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                "/api/statistics/projectMonthlyReport/Projectreport/process/gfjt/complete/back",
                JSON.stringify(list),
                {useJson: true}

              )
              .then((res) => {
                if(res.data.code==200){
                  this.$message({
                    message: "操作成功",
                    type: "success",
                  });
                  this.getData()
                }else{
                  this.$message.error(res.data.msg);
                }

              });
          }).catch(() => {})
        }
      },
      //如果项目上报月报，公司没有上报，那这一条数据就要显示成红色
      checkRed(row,childreList){
        var allReport=false,showRed=false;
        childreList.forEach((item)=>{
          if(item.createTime){
            allReport=true;
          }
        })
        if(allReport==true&&(row.createTime==null||row.createTime=='')){
          showRed=true;
        }
        return showRed;
      },
      tableRowClassName({row, rowIndex}){
        if(row.red==true){
          return 'row_red';
        }
      },

      exportdata() {
      },
      load(tree, treeNode, resolve) {
        tree.reportYear= this.searchform.yearDateS.split("-")[0];
        tree.reportMonth= this.searchform.yearDateS.split("-")[1];
        var datas={
          createOrgId:tree.createOrgId,
          createOrgCode:tree.createOrgCode,
          createOrgName:tree.createOrgName,
          createOrgType:tree.createOrgType,
          uuid:tree.uuid,
          reportYear:tree.reportYear,
          reportMonth:tree.reportMonth,
          hasChildren:tree.hasChildren,
        }
        setTimeout(() => {
          this.$http
              .post(
                  "/api/statistics/projectMonthlyReport/Projectreport/list/jtClickQueryEntInfo",
                datas
              )
              .then((res) => {
                var datas=res.data.data.list;
                var showRed=datas?this.checkRed(tree,datas):false;
                tree.red=showRed?true:false;
                resolve(datas)
              });

        }, 1000)
      },
      getdatatime(){//默认显示今天
        var date = new Date();
        var y = date.getFullYear();
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var time=y + '-' + m;
        this.searchform.yearDateS= time;
        this.mrTime=time;
      },
      search() {
        this.showinput = false;
      },
      queryList(){
        this.searchform.current = 1;
        this.searchform.current = 1;
        if(this.searchform.yearDateS!='' && this.searchform.yearDateS!=null && this.searchform.yearDateS!=undefined){
          this.mrTime=this.searchform.yearDateS;
          this.searchform.reportYear= this.searchform.yearDateS.split("-")[0];
          this.searchform.reportMonth= this.searchform.yearDateS.split("-")[1];
        }
        this.getData();
      },
      //查询项目详细列表
      queryGsXq(row){
        row.reportYear=this.searchform.yearDateS.split("-")[0];
        row.reportMonth=this.searchform.yearDateS.split("-")[1];
        row.yearDateS=this.searchform.yearDateS;
        let p = row;
        this.$router.push({
          path: "./jTMList/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      //新增
      add() {
        // if (this.multipleSelection.length > 0) {
        //   this.$message.info("请取消选中的数据后进行新增操作", "提示")
        //   return false
        // }
        // this.type = 'add'
        // this.showYMDialog=true
        var sj=new Date().toLocaleDateString().split('/');
        var time=this.searchform.yearDateS.split("-")
        this.$http
          .post('/api/statistics/projectMonthlyReport/ReportEndtime/detail/checkReportTime',
            JSON.stringify({
              'restrictedobjectsType':this.userdata.managerOrgType,
              'reportType':'1',
              'endreporttime':sj[2],
            }),
            {useJson: true})
          .then(res => {
            if (res.data.data=='0') {
              var url = '/api/statistics/projectMonthlyReport/Projectreport/detail/jtReportEntityInfo';
              this.$http.post(
                url,
                JSON.stringify( {
                  reportYear:time[0],
                  reportMonth:time[1]
                }),
                {useJson: true}
              ).then((res) => {
                if (res.data.code === 200) {
                  this.$message({
                    message: '创建成功'
                  });
                  this.showYMDialog=false;
                  this.getData();
                }else if(res.data.code === 400){
                  this.$message({
                    message: '该单位已在本月创建过月报请尝试修改或于下月再进行尝试'
                  });
                  this.showYMDialog=false;
                  this.getData();
                }else{
                  this.$message({
                    message: '创建失败'
                  });
                }
              });
            }else{
              this.$message.error('当前月报已经过了上报截止日期,不能提交!')
            }
          })
      },
      //提交
      submit() {
        if(!this.form1.year) {
          this.show = true
          return false
        }
        var time=this.form1.year.split("-")
        var years =this.form1.year.split("-");
        //console.log("shijian"+new Date(this.form1.year).getTime());
        // var sj=new Date(this.form1.year).getTime();

        var sj=new Date().toLocaleDateString().split('/');
        this.$http
          .post('/api/statistics/projectMonthlyReport/ReportEndtime/detail/checkReportTime',
            JSON.stringify({
              'restrictedobjectsType':this.userdata.managerOrgType,
              'reportType':'1',
              'endreporttime':sj[2],
            }),
            {useJson: true})
          .then(res => {
            if (res.data.data=='0') {
              var url = '/api/statistics/projectMonthlyReport/Projectreport/detail/jtReportEntityInfo';
              this.$http.post(
                url,
                JSON.stringify( {
                  reportYear:time[0],
                  reportMonth:time[1]
                }),
                {useJson: true}
              ).then((res) => {
                if (res.data.code === 200) {
                  this.$message({
                    message: '创建成功'
                  });
                  this.showYMDialog=false;
                  this.getData();
                }else if(res.data.code === 400){
                  this.$message({
                    message: '该单位已在本月创建过月报请尝试修改或于下月再进行尝试'
                  });
                  this.showYMDialog=false;
                  this.getData();
                }else{
                  this.$message({
                    message: '创建失败'
                  });
                }
              });
            }else{
              this.$message.error('当前月报已经过了上报截止日期,不能提交!')
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
      // // 增加旧
      // add() {
      //   console.log(this.tableData)
      //   if (this.multipleSelection.length !== 1) {
      //     this.$message.info("请选择一条记录进行创建操作！");
      //     return false;
      //   }
      //   if (this.multipleSelection[0].createOrgCode==this.userdata.managerOrgCode && (this.multipleSelection[0].flowStatus!='' && this.multipleSelection[0].flowStatus!=null)) {
      //     this.$message.info("本单位月报已经创建！");
      //     return false;
      //   }
      //   if(this.multipleSelection[0].createOrgCode!=this.userdata.managerOrgCode){
      //     this.$message.info("无权操作下级单位月报！");
      //     return false;
      //   }
      //
      //   //判断是否存在未上报的数据，如果存在就提示，不存在就创建
      //   // if(this.tableData.length>0){
      //   //   for (var i=0; i < this.tableData.length; i++) {
      //   //     if((this.tableData[i].flowStatus ==''||this.tableData[i].flowStatus ==null||this.tableData[i].flowStatus !='pass')&&this.multipleSelection[0].uuid!=this.tableData[i].uuid){
      //   //       this.$message.info('该单位下存在未提交的月报,请提交该单位下所有项目月报后再进行尝试！')
      //   //       return false;
      //   //     }
      //   //   };
      //   // }
      //   if (this.multipleSelection[0].createOrgCode==this.userdata.managerOrgCode && (this.multipleSelection[0].flowStatus==''||this.multipleSelection[0].flowStatus==null)) {
      //     var url = '/api/statistics/projectMonthlyReport/Projectreport/detail/jtReportEntityInfo';
      //     var params =  this.multipleSelection[0];
      //     //判断是否存在未上报的数据，如果存在就提示，不存在就创建
      //     this.$http
      //       .post(
      //         "/api/statistics/projectMonthlyReport/Projectreport/detail/checkJtChildData",
      //         JSON.stringify( {
      //           reportYear:this.multipleSelection[0].reportYear,
      //           reportMonth:this.multipleSelection[0].reportMonth
      //         }),
      //         {useJson: true}
      //       )
      //       .then((res) => {
      //         if(res.data.data==''||res.data.data==null){
      //           this.$http.post(
      //             url,
      //             JSON.stringify(params),
      //             {useJson: true}
      //           ).then((res) => {
      //             if (res.data.code === 200) {
      //               this.$message({
      //                 message: '创建成功'
      //               });
      //               this.getData();
      //             }else if(res.data.code === 400){
      //               this.$message({
      //                 message: '该单位已在本月创建过月报请尝试修改或于下月再进行尝试'
      //               });
      //               this.getData();
      //             }else{
      //               this.$message({
      //                 message: '创建失败'
      //               });
      //             }
      //           });
      //         }else if(res.data.data=='1'){
      //           this.$message.info('公司月报必须审核通过才能创建集团月报')
      //         }else if(res.data.data=='2'){
      //           this.$message.info('项目部上报时间大于公司月报，请重新汇总公司月报，然后再创建集团月报')
      //         }
      //       });
      //
      //   }
      // },
      // 修改
      totop() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行修改操作！");
          return false;
        }
        if(this.multipleSelection[0].resultType!="1"){
          this.$message.info("只能修改集团的数据！");
          return false;
        }
         if(this.multipleSelection[0].createOrgCode!=this.userdata.managerOrgCode){
           this.$message.info("无权操作下级单位数据！");
           return false;
        }
        if(this.multipleSelection[0].flowStatus!='edit'&&this.multipleSelection[0].flowStatus!='reject'){
          this.$message.info("只能修改草稿和审核驳回的数据！");
          return false;
        }
        if (this.multipleSelection[0].createOrgCode==this.userdata.managerOrgCode && (this.multipleSelection[0].flowStatus!='' && this.multipleSelection[0].flowStatus!=null)){
          let p = {selfPath:'../jTList',fromDate:this.searchform.yearDateS,actpoint: "edit", params: this.multipleSelection[0]};
          this.$router.push({
            path: "./jTMDetail/",
            query: {p: this.$utils.encrypt(JSON.stringify(p))},
          });
        }


      },
      // 查看
      rowshow(row) {
        let p = {ifjtList:true,selfPath:'../jTList',fromDate:this.searchform.yearDateS,actpoint: "look", params: row};
        this.$router.push({
          path: "./superiorReleaseXmbLookTwo/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });

      },
      // 删除
      remove() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let uuids = [],itemStatus=true;
        this.multipleSelection.forEach((item) => {
          if(item.createOrgCode==this.userdata.managerOrgCode && (item.flowStatus=='edit'||item.flowStatus!=''||item.flowStatus=='reject'|| item.flowStatus!=null)){
            uuids.push(item.uuid);
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
               '/api/statistics/projectMonthlyReport/Projectreport/list/delete',{ids: uuids}

            )
            .then((res) => {
            this.getData()
        });
        }).catch(() => {})
        }

      },
      // 重新汇总
      summary() {
        if (this.multipleSelection.length < 1) {
          this.$message.info("请先选中要生成月报的工程公司！");
          return false;
        }
        if (this.multipleSelection.length > 1) {
          this.$message.info("只能选择一条记录！");
          return false;
        }
        if (this.multipleSelection[0].flowStatus!='pass') {
            this.$message.info("只能汇总审核通过的数据！");
            return false;
        }
        if(this.multipleSelection[0].resultType!="2"){
          this.$message.info("只能汇总集团的数据！");
          return false;
        }
          // if (this.multipleSelection[0].createOrgType!='12' && this.multipleSelection[0].createOrgType!='13' ) {
          //     this.$message.info("只能汇总集团跟工程公司数据！");
          //     return false;
          // }
        // this.multipleSelection[0].status='3'//集团创建
        // this.multipleSelection[0].flowStatus='3'
        //this.multipleSelection[0].projectId=this.multipleSelection[0].createOrgId
        this.multipleSelection[0].reportYear= this.searchform.yearDateS.split("-")[0]
        this.multipleSelection[0].reportMonth= this.searchform.yearDateS.split("-")[1]
        // let datas=this.multipleSelection[0];
        var datas={
          status:'3',
          flowStatus:'pass',
          projectId:this.multipleSelection[0].projectId,
          createOrgId:this.multipleSelection[0].createOrgId,
          createOrgCode:this.multipleSelection[0].createOrgCode,
          createOrgName:this.multipleSelection[0].createOrgName,
          createOrgType:this.multipleSelection[0].createOrgType,
          uuid:this.multipleSelection[0].uuid,
          reportYear:this.multipleSelection[0].reportYear,
          reportMonth:this.multipleSelection[0].reportMonth,
          hasChildren:this.multipleSelection[0].hasChildren,
        }
          this.$confirm(`该操作会重新生成工程公司月报 如果该公司已经上报过月报 将被新生成的月报替代 确认重新生成月报?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
                .post(
                    '/api/statistics/projectMonthlyReport/Projectreport/detail/summaryReportM',datas

                )
                .then((res) => {
                  if (res.data.code === 200) {
                    this.$message({
                      message: '汇总成功'
                    });
                    this.getData();
                  }
                });
          }).catch(() => {})

      },
/*      // 展示
      show() {
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        }
        let p = {actpoint: "look", instid: this.multipleSelection[0].uuid};
        this.$router.push({
          path: "../detail/",
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      }, */
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
        this.searchform={
          current: 1,
          size: 20
        };
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询
      getData() {
        if(this.searchform.yearDateS!='' && this.searchform.yearDateS!=null && this.searchform.yearDateS!=undefined) {
          this.searchform.reportYear = this.searchform.yearDateS.split("-")[0];
          this.searchform.reportMonth = this.searchform.yearDateS.split("-")[1];
        }
        this.$http
          .post(
            "/api/statistics/projectMonthlyReport/Projectreport/list/jtQueryEntInfo",
            this.searchform
          )
          .then((res) => {
            this.page = res.data.data
            var datas=res.data.data.records;
            datas.forEach((item)=>{
              var showRed=item.chirldList?this.checkRed(item,item.chirldList):false;
              item.red=showRed?true:false;
            });
            this.tableData = datas;

      });
      },
    },
    created() {
      this.p=this.$route.query.p?JSON.parse(this.$utils.decrypt(this.$route.query.p)):{};
      if(this.p&&this.p.fromDate){
        this.searchform.current = 1;
        this.searchform.yearDateS=this.p.fromDate;
        this.mrTime=this.searchform.yearDateS;
      }else{
        let that = this;
        that.getdatatime();
      }
      this.getData();
      this.userdata=JSON.parse(sessionStorage.getItem('userdata'))
    },
  };
</script>
<style scoped>
  .el-table__row {
    cursor: pointer;
  }
  .add-group .new-add-btn{
    border-radius: 0;
  }
  .search-form{
    display: inline-block;
    float: left;
  }
  .search-form >>>.el-form-item{
    margin-bottom: 0;
  }
  .search-form >>>.el-form-item__content,.search-form >>>.el-form-item__label{
    line-height: 30px;
  }
  .search-form{
    display: inline-block;
    float: left;
  }
  >>>.search-form .el-form-item__label{
    width:auto;
  }
  >>>.search-form .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  >>>.el-icon-date{
    line-height: 30px;
  }
</style>
