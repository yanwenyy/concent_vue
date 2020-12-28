<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :append-to-body="true">
      <div>
        <el-form :inline="true" :model="detailForm" @keyup.enter.native="init()">
          <el-form-item label="标段名称:" class="list-item">
            <el-input v-model="detailForm.sectionName" placeholder="标段名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="风险费(万元):" class="list-item">
            <el-input v-model="detailForm.riskFee" placeholder="风险费(万元)" clearable></el-input>
          </el-form-item>
          <el-form-item label="安全费(万元):" class="list-item">
            <el-input v-model="detailForm.safetyCost" placeholder="安全费(万元)" clearable></el-input>
          </el-form-item>
          <el-form-item label="投标限价(万元):" class="list-item">
            <el-input v-model="detailForm.biddingPriceLimit" placeholder="投标限价(万元)" clearable></el-input>
          </el-form-item>
          <el-form-item label="投标保证金(万元):" class="list-item">
            <el-input v-model="detailForm.tenderSecurity" placeholder="投标保证金(万元)" clearable></el-input>
          </el-form-item>
          <el-form-item label="投标价(万元):" class="list-item">
            <el-input v-model="detailForm.bidPrice" placeholder="投标价(万元)" clearable></el-input>
          </el-form-item>
          <el-form-item label="投标费率(百分比):" class="list-item">
            <el-input v-model="detailForm.tenderRate" placeholder="投标费率(百分比)" clearable></el-input>
          </el-form-item>
          <el-form-item label="开标地点:" class="list-item">
            <el-input v-model="detailForm.openBidPlaceName" placeholder="开标地点" clearable>
              <el-button slot="append" icon="el-icon-search" @click="selectPosition"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="评标办法:" class="list-item">
            <el-input v-model="detailForm.bidEvaluationMethodName" placeholder="评标办法" clearable></el-input>
          </el-form-item>
          <el-form-item label="开标日期:" class="list-item">
            <el-date-picker
              filterable
              clearable
              type="date"
              value-format="timestamp"
              v-model="detailForm.dateOfBidOpeningName"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="参与投标单位:" class="list-item">
            <el-input v-model="detailForm.participatingUnitsName" placeholder="评标办法" clearable>
              <el-button slot="append" icon="el-icon-search" @click="addDw"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="项目经理:" class="list-item">
            <el-input v-model="detailForm.projectManager" placeholder="项目经理" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目副经理:" class="list-item">
            <el-input v-model="detailForm.deputyProjectManager	" placeholder="项目副经理" clearable></el-input>
          </el-form-item>
          <el-form-item label="技术负责人:" class="list-item">
            <el-input v-model="detailForm.technicalDirector" placeholder="技术负责人" clearable></el-input>
          </el-form-item>
          <el-form-item label="安全负责人:" class="list-item">
            <el-input v-model="detailForm.personInChargeOfSafety" placeholder="安全负责人" clearable></el-input>
          </el-form-item>
          <el-form-item label="财务负责人:" class="list-item">
            <el-input v-model="detailForm.personInChargeOfFinance" placeholder="财务负责人" clearable></el-input>
          </el-form-item>
          <el-form-item label="成本负责人:" class="list-item">
            <el-input v-model="detailForm.costOwner" placeholder="成本负责人" clearable></el-input>
          </el-form-item>
          <div class="list-title">
            其他投标单位(系统内):
            <el-button
              @click="add('inside',1)"
              class="detatil-flie-btn"
              size="mini"
              type="primary"
            >新增</el-button >
          </div>
          <el-table
            :data="detailForm.dataList"
            border
            v-loading="dataListLoading"
            :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
            style="width: 100%;">
            <el-table-column
              type="index"
              header-align="center"
              align="center"
              width="80"
              label="ID">
            </el-table-column>
            <el-table-column
              :width="500"
              prop="inforName"
              show-overflow-tooltip
              label="其他投标单位(系统内)">
              <template slot-scope="scope">
                <el-select
                  clearable
                  filterable
                  placeholder="请选择"
                  v-model="scope.row.orgId"
                  @change="
                  getBdName(
                    scope.row.orgId,
                    detailForm.dataList,
                    scope.$index
                  )
                "
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in nameList"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="enginTypeSecondName"
              header-align="center"
              align="center"
              label="投标价">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.bidAmount"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              :resizable="false"
              fixed="right"
              label="操作"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-link :underline="false" @click="del(scope.$index,'inside',scope.row)" type="warning">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <div class="list-title">
            其他投标单位(系统外):
            <el-button
              @click="add('outside',2)"
              class="detatil-flie-btn"
              size="mini"
              type="primary"
            >新增</el-button >
          </div>
          <el-table
            :data="detailForm.dataList2"
            border
            v-loading="dataListLoading"
            :header-cell-style="{
          'text-align': 'center',
          'background-color': 'whitesmoke',
        }"
            style="width: 100%;">
            <el-table-column
              type="index"
              header-align="center"
              align="center"
              width="80"
              label="ID">
            </el-table-column>
            <el-table-column
              :width="500"
              prop="inforName"
              show-overflow-tooltip
              label="其他投标单位(系统外)">
              <template slot-scope="scope">
                <el-select
                  clearable
                  filterable
                  placeholder="请选择"
                  v-model="scope.row.orgId"
                  @change="
                  getBdName(
                    scope.row.orgId,
                    detailForm.dataList2,
                    scope.$index
                  )
                "
                >
                  <el-option
                    :key="index"
                    :label="item.detailName"
                    :value="item.id"
                    v-for="(item, index) in nameList"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="enginTypeSecondName"
              header-align="center"
              align="center"
              label="投标价">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.bidAmount"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              :resizable="false"
              fixed="right"
              label="操作"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-link :underline="false" @click="del(scope.$index,'outside',scope.row)" type="warning">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="sub()">确定</el-button>
      </div>

    </el-dialog>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
  </div>
</template>

<script>
  import Tree from '@/components/tree'
  import CompanyTree from './companyTree'
  export default {
    data() {
      return {
        key: 0,
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index
        DwVisible:false,//选择单位弹框状态
        visible: false,
        detailForm: {
          dataList: [],
          dataList2: []
        },
        type:'',
        index:'',
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        currentRow: '',
        nameList:[
          {
          id:'0',
          detailName:'测试设施上'
          },
          {
            id:'1',
            detailName:'啦啦啦啦啦'
          },
        ],
      }
    },
    components: {
      Tree,
      CompanyTree
    },
    mounted() {

    },
    methods: {
      //打开单位弹框
      addDw(type){
        this.DwVisible = true;
        this.$nextTick(() => {
          this.$refs.infoDw.init();
      })
      },
      //获取单位的值
      getDwInfo(data){
        console.log(data);
        this.DwVisible=false;
        var participatingUnitsId='',participatingUnitsName='';
        var i=0,len=data.length;
        for(;i<len;i++){
          participatingUnitsId+=data[i].detailCode+(i<len-1?",":"");
          participatingUnitsName+=data[i].detailName+(i<len-1?",":"")
        }
        this.detailForm.participatingUnitsId=participatingUnitsId;
        this.detailForm.participatingUnitsName=participatingUnitsName;
      },
      //获取项目地点的值
      getPositionTree(data) {
        console.log(data)
        this.treeStatas = false;
        var country = '', _data = data;
        this.detailForm.openBidPlaceId = _data.fullDetailCode;
        this.detailForm.openBidPlaceName = _data.fullDetailName;
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
      //获取标段名字
      getBdName(id, list, index) {
        if(id){
          this.$forceUpdate()
          list[index].orgName=this.nameList.find(
            (item) => item.id == id
        ).detailName;
          console.log(list[index].orgName);
        }
      },
      //选中数据
      sub() {
        var contractInfoSectionOrgList=this.detailForm.dataList.concat(this.detailForm.dataList2);
        this.detailForm.contractInfoSectionOrgList=contractInfoSectionOrgList;
        this.visible = false;
        this.detailForm.type=this.type;
        if(this.type=='edit'){
          this.detailForm.index=this.index;
        }
        this.$emit('refreshBD', this.detailForm)
      },
      // 初始化
      init(type,detail,index) {
        // console.log(detail)
        this.visible = true;
        this.type=type;
        if(type!='add'){
          this.detailForm=detail;
          this.detailForm.dataList=[];
          this.detailForm.dataList2=[];
          this.index=index;
          if(detail.contractInfoSectionOrgList){
            detail.contractInfoSectionOrgList.forEach((item, index) => {
              if (item.orgType == '1') {
              // item.detailName = _data.detailName;
              this.detailForm.dataList.push(item)
            }else{
              this.detailForm.dataList2.push(item)
            }
            })
          }
        }else{
          this.detailForm={
            dataList: [],
            dataList2: []
          };
        }
      },
      //新增列表
      add(type,orgType){
        var v={
          orgId:'',
          orgName:'',
          bidAmount:'',
          orgType:orgType
        };
        if(type=='inside'){
          this.detailForm.dataList.push(v)
        }else{
          this.detailForm.dataList2.push(v)
        }
      },
      del(index,type,value){
        console.log(value)
        if(value.uuid){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
            .post(
              "/api/contract/ContractInfo/list/deleteSectionOrg",
              {ids: [value.uuid]}
            )
            .then((res) => {
            if (res.data && res.data.code === 200) {
              if(type=='inside'){
                this.detailForm.dataList.splice(index, 1);
              }else{
                this.detailForm.dataList2.splice(index, 1);
              }
          } else {
            this.$message.error(data.msg)
          }
        });
        }).catch(() => {})
        }else{
          if(type=='inside'){
            this.detailForm.dataList.splice(index, 1);
          }else{
            this.detailForm.dataList2.splice(index, 1);
          }
        }

      }
    }
  }
</script>
<style scoped>
  .list-title{
    margin: 20px 0;
  }
  .detatil-flie-btn{
    float: right;
  }
  .list-item{
    width: 43%;
  }
  .dialog-footer {
    margin-top: 50px;
    text-align: center;
  }

  >>>.el-dialog {
    width: 60%;
  }

  >>>.el-form-item__label {
    width: auto;
  }

  .inline-block {
    display: inline-block;
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
  >>>.el-input--mini .el-input__inner {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
  }
</style>
