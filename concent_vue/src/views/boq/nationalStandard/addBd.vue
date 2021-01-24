<template>
  <div>
     <el-dialog
     class="bdClass"
    :lock-scroll="true"
    :visible.sync="visible"
    :append-to-body="true">
    <el-card>
      <div class="clearfix el-card__header">
        <span style="color: #2a2a7d;line-height: 32px"><b>工程量清单计量规则</b></span>
        <el-button @click="close" style="float: right;">返回</el-button>
      </div>
    </el-card>
    <div style="height: calc(100% - 50px);overflow: auto;padding: 0 50px;">
      <el-form :inline="true" :model="detailForm" :rules="rules" ref="detailForm"  class="gcform">

          <el-form-item label="编码:" class="list-item"
            prop="nationalStandardSchedule.code"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }">
               <!-- <template slot="header">
                    <p>
                      <span class="red-star">*</span>
                      编码
                    </p>
                  </template> -->
          <el-input
          v-model="detailForm.nationalStandardSchedule.code"
          placeholder="编码"
          clearable
          :disabled="type === 'look'"
          ></el-input>
        </el-form-item>

        <el-form-item label="项目名称:" class="list-item"
          prop="nationalStandardSchedule.projectName"
            :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"
        >
          <el-input v-model="detailForm.nationalStandardSchedule.projectName	" placeholder="项目名称" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

        <br>
        <el-form-item label="计量单位:" class="list-item">
          <el-select
                :disabled="type === 'look'"
                filterable
                clearable
                placeholder="请选择"
                v-model="detailForm.nationalStandardSchedule.measuringUnit">
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in unit"/>
              </el-select>
          <!-- <el-input v-model="detailForm.nationalStandardSchedule.measuringUnit" placeholder="计量单位" clearable :disabled="type === 'look'"></el-input> -->
        </el-form-item>

        <el-form-item label="项目划分特征:" class="list-item">
          <el-input v-model="detailForm.nationalStandardSchedule.projectDivFeatures" placeholder="项目划分特征" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>

          <br>

        <el-form-item label="工程量计算规则:" class="list-item">
          <el-input v-model="detailForm.nationalStandardSchedule.quantityCalRules" placeholder="工程量计算规则" clearable :disabled="type === 'look'"></el-input>
        </el-form-item>


          <div>
            <el-form-item
              class="neirong"
              label="工程(工作)内容:"
              prop="nationalStandardSchedule.projectContent"
              style="width: 100%"
            >
              <el-input
                :disabled="type === 'look'"
                type="textarea"
                clearable
                placeholder="请输入"
                v-model="detailForm.nationalStandardSchedule.projectContent"
              />
            </el-form-item>
          </div>

          <div>
            <el-form-item
              class="neirong"
              label="附注:"
              prop="nationalStandardSchedule.remarks"
              style="width: 100%"
            >
              <el-input
                :disabled="type === 'look'"
                type="textarea"
                clearable
                placeholder="请输入"
                v-model="detailForm.nationalStandardSchedule.remarks"
              />
            </el-form-item>
          </div>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button v-if="type!='look'" type="primary" @click="sub()">确定</el-button>
    </div>

    </el-dialog>
    <Tree v-if="treeStatas" ref="addOrUpdate"  @getPosition="getPositionTree" ></Tree>
    <company-tree  v-if="DwVisible" ref="infoDw" @refreshBD="getDwInfo"></company-tree>
  </div>
</template>

<script>
import CompanyTree from '../../manage/contractManager/companyTree'
import Tree from "@/components/tree";
import { isMoney } from '@/utils/validate'

  export default {
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
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        treeStatas:false,
        visible: false,
        DwVisible:false,//选择单位弹框状态
        detailForm: {
          nationalStandardSchedule:{},
          unitId: '', // 计量单位
        },
        type:'',
        index:'',
        bdName:[],
        isBidRates:'',
        pageIndex: 1,
        pagesize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        currentRow: '',
         rules:{
          contractAmount: [
            { required: true,validator: validateMoney, trigger: 'change' }
          ]
        },//表单验证规则
      }
    },
    mounted() {

    },
    computed:{
      unit() {
        return this.$store.state.unit
      },
    },
    methods: {
      //获取标段名字
      getBdName(id, list, index) {
        if(id){
          this.$forceUpdate()
          list[index].orgName=this.nameList.find(
            (item) => item.id == id
        ).detailName;
        }
      },
    close(){
        this.$refs['detailForm'].clearValidate();
        this.visible = false;
      },

      //选中数据
      sub() {
        // var nationalStandardScheduleBOList=this.detailForm.dataList.concat(this.detailForm.dataList2);
        // this.detailForm.nationalStandardScheduleBOList=nationalStandardScheduleBOList;

         this.detailForm.type=this.type;
        if(this.type=='edit'){
          this.detailForm.index=this.index;

        }
          this.$refs.detailForm.validate((valid) => {
          if (valid) {
            this.visible = false;
            this.$emit('refreshBD', this.detailForm);

          }
        });

      },
      // 初始化
      init(list,isBidRates,type,detail,index) {
        console.log(type)
        this.detailForm={
            nationalStandardSchedule:{},
          };
        this.type=type;
        this.index=index;
        this.visible = true;
        this.bdName=list||[];
        this.isBidRates=isBidRates;
        if(type=='edit'||type=='look'){
         this.detailForm.nationalStandardSchedule=detail.nationalStandardSchedule;
         console.log(this.detailForm.nationalStandardSchedule)
        }else{
          this.detailForm={
            nationalStandardSchedule:{},
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
      del(index,type){
        if(type=='inside'){
          this.detailForm.dataList.splice(index, 1);
        }else{
          this.detailForm.dataList2.splice(index, 1);
        }
      }
    }
  }
</script>
<style scoped>
.bdClass >>>.el-dialog{
    height: 70vh!important;
  }
.bdClass >>>.el-card__header{
  padding: 8px 20px !important;
}
.bdClass >>>.el-dialog__header{
  display: none;
}
.bdClass >>>.el-dialog__body{
  padding: 0;
  height: calc(100% - 60px)!important;
  width: 100%;
  overflow: hidden;
}
.bdClass >>>.dialog-footer{
  padding-top: 14px;
  margin:0;
  text-align: center;
  background-color: #fafafa;
}
>>>.gcform .el-form-item{
  margin-bottom: 0px!important;
}
/* >>>.gcform .el-form-item__error{
  margin: -25px -7px 0 335px!important;
}
.bd-table-item  >>>.el-form-item__error{
  margin: -13px -7px 0 310px!important;
} */
>>>.el-form--inline .el-form-item__content{
  width: 100%;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
  .list-title{
    margin: 20px 0;
  }
  .list-item{
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
  >>>.el-input--mini .el-input__inner {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
  }

>>>form{
  height: 500px;
  padding: 0 10px 0 0;
}
p{
 font-size: 18px;
 font-weight:bolder;
}
.bdClass >>>.el-dialog{
  position: fixed;
  left: 10%;
  width: 80%;
}
@media (min-width: 1300px) and (max-width: 1400px) {
  .xmbk-item .el-form-item__error{
    top:-20px!important;
  }
}
.gcform >>>.el-form-item__error {
    top: -20px!important;
    right:10px;
    text-align: right;
}
.tabelForm >>>.el-form-item__error {
    top: -10px!important;
    right:80px;
    text-align: right;
}
>>>.el-table .cell.el-tooltip{
padding: 10px 10px;
}

 >>>.el-form-item__label{
   padding-left:10px;
 }
>>>.el-form-item__label:before{
   left:0px;
}
</style>
