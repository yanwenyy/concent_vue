<template>
  <div class="searchListClass">
    <el-form class="queryForm" :inline="true" :model="searchform" @keyup.enter.native="getData()">
      <el-form-item label="审核通过时间:">
        <el-date-picker
          clearable
          v-model="searchform.createTime"
          type="daterange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同类型:">
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="searchform.moduleId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in projectPlate"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="填报单位:">
        <el-input v-model="searchform.createOrgName" placeholder="填报单位" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同名称:">
        <el-input v-model="searchform.contractName" placeholder="合同名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同编号:">
        <el-input v-model="searchform.contractCode" placeholder="合同编号" clearable></el-input>
      </el-form-item>
      <el-form-item
        label="项目性质(一级):"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          @change="getTwo"
          size="mini"
          v-model="searchform.projectNatureFirstId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in projectNature"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="项目性质(二级):"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择工程类别(一级)"
          size="mini"
          v-model="searchform.projectNatureSecondId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id" v-if="item.isUse==1"
            v-for="(item, index) in projectNatureTwo"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="合同状态:"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          @change="getTwo"
          size="mini"
          v-model="searchform.enginTypeFirstId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in projectStatus"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="工程类别(一级):"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          @change="getTwo"
          size="mini"
          v-model="searchform.enginTypeFirstId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in projectDomainType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="工程类别(二级):"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择工程类别(一级)"
          size="mini"
          v-model="searchform.enginTypeSecondId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in xqprojectType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="新兴市场(一级):"
      >
        <el-select
          clearable
          filterable
          placeholder="请选择"
          size="mini"
          v-model="searchform.marketFirstNameId"
        >
          <el-option
            :key="index"
            :label="item.detailName"
            :value="item.id"
            v-for="(item, index) in emergingMarket"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="主推单位:"
      >
        <el-input v-model="searchform.path" placeholder="主推单位" clearable @clear="searchform.contractMianOrg=''">
          <el-button slot="append" icon="el-icon-search"  @click="addDw('主推单位',searchform.contractMianOrg)"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item
        label="是否变更:"
      >
        <el-select
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
            v-for="(item, index) in ifBg"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地点:">
        <el-input v-model="searchform.path" placeholder="地点" clearable @clear="clear('ffid','path')">
          <el-button slot="append" icon="el-icon-search"  @click="selectPosition()"></el-button>
        </el-input>
      </el-form-item>
      <el-button @click="searchformReset" type="info" plain style="color:black;background:none"><i class="el-icon-refresh-right"></i>重置</el-button>
      <el-button @click="getData" type="primary" plain><i class="el-icon-search"></i>查询</el-button>
      <el-button @click="exportdata" type="primary" plain><i class="el-icon-upload2"></i>导出</el-button>
    </el-form>
    <div style="margin-top: 10px">
      <el-table
        class=""
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
          :width="200"
          label="合同类型"
          prop="moduleName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="500"
          label="合同名称"
          prop="contractName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="blue pointer" @click="rowshow(scope.row)">{{scope.row.contractName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :resizable="false"
          label="操作"
          show-overflow-tooltip
          width="150"
        >
          <template slot-scope="scope">
            <el-link :underline="false" type="warning" @click="editMoney(scope.row)">金额调整<i class="el-icon-edit"></i></el-link>
          </template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="是否包含调整"
          prop="enginTypeSecondName"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.lastMarkDate?'是':'否'
            }}</template>
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="最后一次操作时间"
          prop="lastMarkDate"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.lastMarkDate | dateformat
            }}</template>
        </el-table-column>
        <el-table-column
          :width="300"
          align="center"
          label="合同总金额"
          prop="contractAmount"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="我方份额"
          prop="ourAmount"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          :width="150"
          align="center"
          label="增值税"
          prop="valueAddedTax"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报单位"
          prop="createOrgName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :width="150"
          align="center"
          label="填报日期"
          prop="createTime"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.createTime | dateformat
            }}</template>
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
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
    <el-dialog
      class="bdClass"
      :visible.sync="dialogVisible"
      width="70%"
      :append-to-body="true">
      <el-button
        @click="addXs()"
        size="mini"
        class="detatil-flie-btn"
        type="primary"
      >新增</el-button>
      <span class="notice"> 注:金额应长度小于等于8位数字且保留小数点后四位数字</span>
      <el-form
        :inline="false"
        :model="moneyform"
        :rules="rules"
        class="gcform"
        ref="moneyform"
      >
        <el-table
          :data="moneyform.contractInfoAdjustLogList"
          :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
          @selection-change="handleSelectionChange"
          align="center"
          border
          class="detailTable"
          ref="table"
          style="width: 100%;height: auto;"
        >
          <el-table-column
            :width="55"
            align="center"
            label="序号"
            show-overflow-tooltip
            type="index"
          ></el-table-column>
          <el-table-column
            class="listTabel"
            :resizable="false"
            label="标记日期"
            prop="markDate"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <el-form-item
                class="tabelForm tabelformItem"
                :prop="'contractInfoAdjustLogList.'+scope.$index+'.markDate'"
                :rules="{
                  required: true, message: '此项不能为空', trigger: 'blur'
                }"
                label-width="0"

              >
                <el-date-picker
                  v-model="scope.row.markDate"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column width="400" :resizable="false" label="集团调整(万元)" prop="groupAdjustAmount" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-form-item
                class="tabelForm"
                :prop="'contractInfoAdjustLogList.'+scope.$index+'.groupAdjustAmount'"
                :rules="scope.row.stockAdjustAmount!=''&&scope.row.groupAdjustAmount==''?{}:rules.contractAmount"
                label-width="0"

              >
                <el-input
                  clearable
                  v-model="scope.row.groupAdjustAmount"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
            </template>
          </el-table-column>
          <el-table-column width="400" :resizable="false" label="股份调整(万元)" prop="stockAdjustAmount" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-form-item
                class="tabelForm"
                :prop="'contractInfoAdjustLogList.'+scope.$index+'.stockAdjustAmount'"
                :rules="scope.row.groupAdjustAmount!=''&&scope.row.stockAdjustAmount==''?{}:rules.contractAmount"
                label-width="0"

              >
                <el-input
                  clearable
                  v-model="scope.row.stockAdjustAmount"
                >
                  <template slot="prepend">¥</template>
                  <template slot="append">(万元)</template>
                </el-input>
              </el-form-item>
              <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
            </template>
          </el-table-column>
          <el-table-column width="300"  class="listTabel"  align="center" :resizable="false" label="备注信息" prop="remarks" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-form-item
                class="tabelForm"
                :prop="'contractInfoAdjustLogList.'+scope.$index+'.remarks'"
                :rules="{
                  required: true, message: '此项不能为空', trigger: 'change'
                }"
                label-width="0"

              >
                <el-input
                  clearable
                  v-model="scope.row.remarks"
                ></el-input>
              </el-form-item>
              <!-- <span @click="scope.row.showinput = true" v-if="!scope.row.showinput">{{scope.row.part}}</span> -->
            </template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            fixed="right"
            label="操作"
            show-overflow-tooltip
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-link :underline="false" @click="del(scope.$index,scope.row,moneyform.contractInfoAdjustLogList)" type="warning">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subEdit('moneyform')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import CompanyTree from '../companyTree'
  import { isMoney } from '@/utils/validate'
  export default {
    // inject:['reload'],
    components: {
      Tree,
      CompanyTree,
    },
    data() {
      var validateMoney = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMoney(value)) {
          callback(new Error('请输入正确的金额格式'))
        } else {
          callback()
        }
      }
      return {
        dialogVisible:false,//弹框状态
        contractInfoId:"",//合同id
        treeStatas: false,
        DwVisible:false,//选择单位弹框状态
        page: {current: 1, size: 20, total: 0, records: []},
        searchform: {
          current: 1,
          size: 20,
          changeStatus:'0',
        },
        moneyform:{
          contractInfoAdjustLogList:[],
          subStatus:true,
        },
        multipleSelection: [],
        xqprojectType:[],//工程二级列表
        projectNatureTwo:[],//项目性质二级
        projectStatus:[
          {
            id:'1',
            detailName:'全部'
          },
          {
            id:'1',
            detailName:'未提交'
          },
          {
            id:'2',
            detailName:'审核中'
          },
          {
            id:'3',
            detailName:'审核通过'
          }
        ],//项目状态列表
        ifBg:[
          {
            id:'1',
            detailName:'否'
          },
          {
            id:'0',
            detailName:'是'
          },
        ],//是否变更
        rules:{
          contractAmount: [
            { required: true,validator: validateMoney, trigger: 'change' }
          ]
        },//表单验证规则
      };
    },
    mounted() {
      this.$store.dispatch("getConfig", {});
      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
    },
    computed: {
      projectDomainType() {
        // console.log(this.$store.state.category["projectDomainType"])
        return this.$store.state.category.projectDomainType;
      },
      projectNature() {
        // console.log(this.$store.state.category["projectDomainType"])
        return this.$store.state.category.projectNature;
      },
      emergingMarket() {
        // console.log(this.$store.state.category["projectDomainType"])
        return this.$store.state.category.emergingMarket;
      },
      projectPlate(){
        return this.$store.state.projectPlate;//合同类型
      },
      bulletinType() {
        return this.$store.state.bulletinType;
      },
      probability() {
        return this.$store.state.probability;
      },
      railwayLine(){
        return this.$store.state.railwayLine;
      }
    },
    methods: {
      clear(id,name){
        this.$forceUpdate();
        this.searchform[id]='';
        this.searchform[name]='';
      },
      //根据id跳页面
      getUrl(id){
        var url='';
        if(id=='7f4fcba4255b43a8babf15afd6c04a53'){
          url= '../project/detail/';
        }else if(id=='f6823a41e9354b81a1512155a5565aeb'){
          url= '../design/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7af6'){
          url=  '../house/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7af4'){
          url=  '../trade/detail/';
        }else if(id=='510ba0d79593418493eb1a11ed3e7df4'){
          url=  '../industrial/detail/';
        }else if(id=='510ba0d79593418493eb1a11ea4e7df4'){
          url=  '../finance/detail/';
        }else if(id=='510ba0d79593418493eb1a11ed4e7df4'){
          url=  '../operate/detail/';
        }else if(id=='510ba0d79593419493eb1a11ed3e7df4'){
          url=  '../other/detail/';
        }
        return url;
      },
      //删除金额修改
      del(index,item,list,type) {
        if(item.uuid){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
              "/api/contract/contract/ContractInfo/list/deleteInfoAdjustLog",
              {ids: [item.uuid]}
            )
            .then((res) => {
            if (res.data && res.data.code === 200) {
                list.splice(index, 1);
              } else {
                this.$message.error(data.msg)
              }
            });
            }).catch(() => {})
        }else{
          list.splice(index, 1);
        }
      },
      //金额修改提交
      subEdit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.moneyform.subStatus==true){
              this.moneyform.subStatus=false;
              this.$http
                .post(
                  "/api/contract/contract/ContractInfo/detail/saveOrUpdateInfoAdjustLog",
                  JSON.stringify(this.moneyform),
                  {useJson: true}
                )
                .then((res) => {
                if (res.data.code === 200) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.getData();
                this.dialogVisible=false;
                this.moneyform={
                  contractInfoAdjustLogList:[],
                  subStatus:true,
                };
              }
            });
            }
          } else {
            this.$message.error("请添加必填项");
             return false;
          }
        });
      },
      //新增金额
      addXs(){
        var v={
          markDate:"",
          groupAdjustAmount:"",
          stockAdjustAmount:"",
          remarks:"",
          contractInfoId:this.contractInfoId
        };
        this.moneyform.contractInfoAdjustLogList.push(v);
      },
      //打开金额修改弹框
      editMoney(val){
        this.contractInfoId=val.uuid;
        this.$http
          .post(
            "/api/contract/contract/ContractInfo/detail/entityInfoAdjustLog",
            {contractInfoId:this.contractInfoId},
          )
          .then((res) => {
          if (res.data.code === 200) {
            var datas=res.data.data;
            this.moneyform={
              contractInfoAdjustLogList:this.nullToStr(datas.contractInfoAdjustLogList)||[],
              subStatus:true,
            };
            this.dialogVisible=true;
          }
        });
      },
      //null转空字符串
      nullToStr(data) {
        // console.log('1111111',data)
        for (let x in data) {
          if (data[x] === null){
            // 如果是null 把直接内容转为 ''
            data[x] = "";
          } else {
            if (Array.isArray(data[x])) {
              // 是数组遍历数组 递归继续处理
              data[x] = data[x].map((z) => {
                return this.nullToStr(z);
            });
            }
            if (typeof data[x] === "object") {
              // 是json 递归继续处理
              data[x] = this.nullToStr(data[x]);
            }
          }
        }
        //  console.log('2222222',data)
        return data;
      },
      //打开单位弹框
      addDw(type,list){
        this.DwVisible = true;
        this.$nextTick(() => {
          this.$refs.infoDw.init(type,list);
      })
      },
      //获取单位的值
      getDwInfo(data){
        console.log(data);
        var id=[],name=[];
        if(data){
          data.forEach((item)=>{
            id.push(item.id);
          name.push(item.detailName);
        })
        }
        this.searchform.contractMianOrg=id.join(",");
        this.searchform.path=name.join(",");
        this.DwVisible=false;
      },
      //获取项目地点的值
      getPositionTree(data) {
        console.log(data)
        this.treeStatas = false;
        this.searchform.ffid=data.fullDetailCode;
        this.searchform.path=data.fullDetailName;
        this.key = this.key + 1;
      },
      //选择项目地点
      selectPosition() {
        this.treeStatas = true;
        console.log(this.positionIndex);
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
      })
      },
      //工程类别二级
      getTwo(id) {
        this.searchform.enginTypeSecondId='';
        this.xqprojectType =[];
        if(id!=''){
          this.projectDomainType.find(
            (item) => {
            if (item.id == id) {
            this.xqprojectType = item.children;
          }
        }
        )
        }
      },
      //项目性质二级
      getTwoXZ(id){
        this.detailform.topInfor.projectNatureSecondId='';
        this.projectNatureTwo=[];
        if(id!=''){
          this.projectNature.find(
            (item)=>{
            if (item.id == id) {
            this.detailform.topInfor.projectNatureFirstName = item.detailName;
            this.projectNatureTwo = item.children;
          }
        }
        )
        }
      },
      exportdata() {
        this.searchFrom.size=1000000000;
        this.$http
          .post(
            "/api/contract/contract/ContractInfo/list/loadPageDataForContractInfoAdjust",
            this.searchFrom
          )
          .then((res) => {
            this.searchFrom.size=20;
            var datas = res.data.data.records;
            this.$exportXls.exportList({
              thead:' <tr>\n' +
              '<th>合同类型</th>\n' +
              '<th>合同名称</th>\n' +
              '<th>是否包含调整</th>\n' +
              '<th>最后一次操作时间</th>\n' +
              '<th>合同总金额</th>\n' +
              '<th>我方份额</th>\n' +
              '<th>增值税</th>\n' +
              '<th>填报单位</th>\n' +
              '<th>填报日期</th>\n' +
              '</tr>',
              jsonData:datas,
              tdstr:['moduleName','contractName','enginTypeSecondName','lastMarkDate',
                'contractAmount','ourAmount','valueAddedTax','createOrgName','createTime'
              ],
              tdstrFuc:{
                enginTypeSecondName:function (str) {
                  return str?'是':str==0?'否':'';
                },
                lastMarkDate:function (str) {
                  return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
                },
                createTime:function (str) {
                  return str?new Date(str).toLocaleString().replace(/:\d{1,2}$/,' '):'';
                },
              }
            })
          });
      },
      // 查看
      rowshow(row) {
        var url=this.getUrl(row.moduleId);
        let p = {actpoint: "look", instid: row.uuid};
        this.$router.push({
          path: url,
          query: {p: this.$utils.encrypt(JSON.stringify(p))},
        });
      },
      // 展示
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
        // this.$refs["searchform"].resetFields();
        this.searchform={
          current: 1,
          size: 20,
          changeStatus:'0',
        }
        this.getData();
      },
      // 列表选项数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询
      getData() {
        if(this.searchform.createTime){
          this.searchform.beginTime=this.searchform.createTime[0];
          this.searchform.stopTime=this.searchform.createTime[1];
        }
        this.$http
          .post(
            "/api/contract/contract/ContractInfo/list/loadPageDataForContractInfoAdjust",
            this.searchform
          )
          .then((res)=>{
            this.page = res.data.data;
      });
      },

    },
    created() {
      this.getData();
    },
  };
</script>
<style scoped>
  .queryForm>.el-button{
    margin-top: 5px;
  }
  .detailTable .el-input-group{
    margin-top: 5px !important;
  }
  >>>.el-form-item__label{
    width: auto;
  }
  >>>.el-input--mini .el-input__inner{
    height: auto;
    line-height: inherit;
  }
  .el-table__row {
    cursor: pointer;
  }
  .bdClass >>>.el-dialog__header{
    padding: 0!important;
  }
  >>>.el-dialog__body{
    padding: 10px 20px!important;
  }
  >>>.dialog-footer{
    text-align: center!important;
  }
  .detatil-flie-btn{
    margin-bottom: 10px;
  }
  >>>.tabelformItem .el-date-editor{
    width: 100% !important;
  }
  .notice{
    color:#999;
    display: inline-block;
    margin-left: 10px;
  }
  .detailTable >>>.el-form-item{
    margin-bottom: 0;
  }
  >>>.el-form-item__label:before {
    position: initial;
    left: -10px;
  }
  >>>.el-form-item__error {
    padding-top: 0px;
    width: 95%;
    margin-left: 0;
    text-align: right;
    top: 0%;
    right: 0!important;
  }
</style>
