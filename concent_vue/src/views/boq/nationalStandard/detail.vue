<template>
  <div>
    <!--<FileUpload :businessCode='"01"' :businessType='"bidInfo"' ></FileUpload>-->
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span class="detailSpan"><b>国标库详情</b></span>
        <el-button @click="back" class="detailbutton" >返回</el-button>
        <el-button v-show="p.actpoint != 'look'" type="primary" @click="saveInfo('detailform')" class="detailbutton">保存</el-button>
        <!--<el-button v-show="p.actpoint != 'look'" @click="submit" class="detailbutton">提交</el-button>-->
      </div>
      <div class="detailBox">
 <el-form
          :inline="false"
          :model="detailform"
          :rules="rules"
          class="gcform"
          ref="detailform"
        >
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
              <template slot="title"><p class="title_head">基本信息</p></template>

          <div class="padding">

          <el-form-item
            label="国标名称:"
            prop="boqNationalStandard.name"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-input
              :disabled="p.actpoint === 'look'"
              clearable

              v-model="detailform.boqNationalStandard.name"/>
          </el-form-item>

          <el-form-item
            label="子名称:"
          >
            <el-input
              :disabled="p.actpoint === 'look'"
              clearable

              v-model="detailform.boqNationalStandard.childName"/>
          </el-form-item>

          <br>
          <el-form-item
              label="标准号:"

            >
              <el-input
                :disabled="p.actpoint === 'look'"
                clearable

                v-model="detailform.boqNationalStandard.standrardId"
              />
            </el-form-item>
          <el-form-item
            label="文号:"
            prop="boqNationalStandard.titanic"
            :rules="{
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-input
              clearable
              :disabled="p.actpoint === 'look'"

              v-model="detailform.boqNationalStandard.titanic"
            />
          </el-form-item>
          <br>
          <el-form-item
          label="实施日期:"
          prop="boqNationalStandard.implementationTime"
          :rules="{
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            }"

        >
          <el-date-picker
            :disabled="p.actpoint === 'look'"
            filterable
            clearable
            type="date"
            value-format="timestamp"
            v-model="detailform.boqNationalStandard.implementationTime"

          >
          </el-date-picker>
        </el-form-item>

          <el-form-item
            label="归口单位:"
              prop="boqNationalStandard.underCentralizedUnit"
              :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-input
              :disabled="p.actpoint === 'look'"

              v-model="detailform.boqNationalStandard.underCentralizedUnit"
            />
          </el-form-item>
        <br>
          <el-form-item
            label="适用范围:"
            prop="boqNationalStandard.engineeringType1"
          >
            <el-select
              class="multiple-sel"
              :disabled="p.actpoint === 'look'"
              clearable
              filterable
              placeholder="请选择"
              multiple
              v-model="detailform.syfw"
              @change="getMultipleName(
              detailform.syfw,
              projectDomainType,
              'engineeringTypeId',
              'engineeringType',
              'engineeringTypeCode')"

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
            class="inline-formitem"
            label="是否启用情景状态:"
            prop="boqNationalStandard.isUseSceneState"
            :rules="{
                required: true,
                message: '此项不能为空',
                trigger: 'blur',
              }"
          >
            <el-switch
              :disabled="p.actpoint === 'look'"
              class="inline-formitem-switch"
              v-model="detailform.boqNationalStandard.isUseSceneState"
              active-color="#409EFF"
              inactive-color="#ddd"
              active-value="0"
              inactive-value="1"
            >
            </el-switch>
          </el-form-item>
            <br>
            <div>
              <el-form-item
                class="neirong"
                label="标准简介:"
                prop="boqNationalStandard.instructions"
                style="width: 100% !important"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  :disabled="p.actpoint === 'look'"
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  v-model="detailform.boqNationalStandard.instructions"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item
                class="neirong"
                label="编码说明:"
                prop="boqNationalStandard.codeInstructions"
                style="width: 100% !important"
              >
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
                <el-input
                  :disabled="p.actpoint === 'look'"
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  v-model="detailform.boqNationalStandard.codeInstructions"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item
                class="neirong"
                label="备注:"
                prop="boqNationalStandard.remarks"
                style="width: 100% !important"
              >
                <el-input
                  :disabled="p.actpoint === 'look'"
                  type="textarea"
                  clearable
                  placeholder="请输入"
                  v-model="detailform.boqNationalStandard.remarks"
                />
              </el-form-item>
            </div>

        </div>
       </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title"><p class="title_head">工程量清单计量规则</p></template>

              <el-button-group style="float: left">
              <el-button
                v-show="p.actpoint != 'look'"
                @click="openBd('add')"
                plain
                type="primary"
              >新增</el-button>

              <el-button
                v-show="p.actpoint != 'look'"
                @click="openBd('edit')"
                plain
                type="primary"
              >修改</el-button>

              <el-button
                v-show="p.actpoint != 'look'"
                @click="del"
                plain
                type="primary"
              >删除</el-button>

              <!-- <el-button
                v-show="p.actpoint != 'look'"
                @click="add('bd')"
                plain
                type="primary"
              >刷新</el-button> -->
              </el-button-group>

          <div style="float: right">
        <el-upload
                class="upload-demo detailUpload"
                :action="'/api/contract/boq/BoqNationalStandard/detail/import'"
                :data="{'uuid':detailform.boqNationalStandard.uuid}"
                :on-success="handleChange"
                :on-error="handleChange"
                :headers="{'Authorization':Authorization}"
                :show-file-list="false"
                accept=".xls,.xlsx"
                multiple
                v-show="p.actpoint == 'edit'"
              >
                <el-button
                class="small_size"
                  type="primary"
                  plain
                  >导入
                  </el-button>
                  </el-upload>
        <el-button @click="exportdata" type="primary" plain v-show="p.actpoint != 'look'" class="small_size">导出</el-button>

</div>


            <el-table
              :key="key"
              @row-dblclick="openBd2"
              :data="detailform.nationalStandardScheduleBOList"
              :header-cell-style="{
                'text-align': 'center',
                'background-color': 'rgba(246,248,252,1)',
                color: 'rgba(0,0,0,1)',
              }"
              @select="handleSelectionChange"
            :header-cell-class-name="cellClass"
              align="center"
              border
              class="detailTable"
              ref="table"
              style="width: 100%; min-height: calc(100vh - 370px)"
            >
              <el-table-column
                :width="50"
                align="center"
                show-overflow-tooltip
                type="selection"
              ></el-table-column>
              <el-table-column
                :width="80"
                align="center"
                label="序号"
                show-overflow-tooltip
                type="index"
              ></el-table-column>

            <el-table-column
              :resizable="false"
              label="编码"
              prop="nationalStandardSchedule.code"
              show-overflow-tooltip
              align="center"
              :width="180"

            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目名称"
              prop="nationalStandardSchedule.projectName"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="计量单位"
              prop="nationalStandardSchedule.measuringUnit"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="项目划分特征"
              prop="nationalStandardSchedule.projectDivFeatures"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="工程量计算规则"
              prop="nationalStandardSchedule.quantityCalRules"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>

            <el-table-column
            class="long-tooltip"
              :resizable="false"
              label="工程（工作）内容"
              prop="nationalStandardSchedule.projectContent"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            <!-- <template slot-scope="scope">
                <el-tooltip popper-class="tooltip-class" :content="String(scope.row.nationalStandardSchedule.projectContent)" placement="bottom" effect="dark">
                  <span>{{scope.row.nationalStandardSchedule.projectContent}}</span>
                </el-tooltip>
            </template> -->
            </el-table-column>

            <el-table-column
              :resizable="false"
              label="附注"
              prop="nationalStandardSchedule.remarks"
              show-overflow-tooltip
              align="center"
              :width="180"
            >
            </el-table-column>
            </el-table>



       </el-collapse-item>
      </el-collapse>

        </el-form>
    </div>




    </el-card>
     <add-bd v-if="BDCSVisible" ref="infoBD" @refreshBD="getBdInfo"></add-bd>
    <Tree v-if="treeStatas" ref="addOrUpdate" @getPosition="getPositionTree"></Tree>
  </div>
</template>

<script>
import AddBd  from "./addBd";
  import Tree from '@/components/tree'
  import FileUpload from '@/components/fileUpload'
  import { isMoney, isMobile} from '@/utils/validate'
  export default {
    // name: "详情",
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
      };
      var validatePhone = (rule, value, callback) => {
        // console.log(value)
        if(value===''){
          callback(new Error('不能为空'))
        }else if (!isMobile(value)) {
          callback(new Error('请输入正确的手机格式'))
        } else {
          callback()
        }
      }
      return {
        Authorization:sessionStorage.getItem("token"),
        maxMoney:1000000,
        selectIndex:'',
        id:'',
        key: 0,
         BDCSVisible: false, //标段新增弹框状态
        treeStatas: false,
        positionIndex: '',//缓存当前的选中的项目地点的index
        options2: [],
        options: [],
        detailform: {
          boqNationalStandard:{},
          nationalStandardScheduleBOList:[],
          syfw:[],
        },
        activeNames: ['1','2'],
        xqprojectType: [],//工程类别二级
        emergingMarketTwo:[],//新兴市场二级
        projectNatureTwo:[],//项目性质二级
        p: JSON.parse(this.$utils.decrypt(this.$route.query.p)),
        sizeform: {projectScale: "", sectionName: ""},
        yesOrNo:[
          {
            id:'0',
            detailName:'是'
          },
          {
            id:'1',
            detailName:'否'
          }
        ],
        rules:{
          contractAmount: [
            { required: true,validator: validateMoney, trigger: 'change' }
          ],
          phone: [
            { required: true,validator: validatePhone, trigger: 'change' }
          ]
        },//表单验证规则
      };
    },
    components: {
      Tree,
      FileUpload,
      AddBd,
    },
    computed: {
      projectDomainType() {
        return this.$store.state.category.projectDomainType;
      },
    },
    mounted() {
      this.id=this.p.instid;
      if (this.p.actpoint === "edit"||this.id) {
        this.getDetail();
      }
      if (this.p.actpoint === "add") {
        this.detailform.topInfoSiteList=[{
          country: '',
          ffid: '',
          path: '',
          contractAmount: '',
          isMain: ''
        }];
        this.detailform.topInfoSectionList=[{
          sectionName: '',
          projectScale: '',
        }]
      }
      this.$store.dispatch("getConfig", {});

      this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
      this.$store.dispatch('getCategory', {name: 'emergingMarket', id: '33de2e063b094bdf980c77ac7284eff3'});
      this.$store.dispatch('getCategory', {name: 'projectNature', id: '99239d3a143947498a5ec896eaba4a72'});
      // eslint-disable-next-line no-unde
    },
    methods: {
      //多选传参
       //复选下拉框框获取name
    getMultipleName(valueList,list,id,name,code){
      var _id=[],_name=[],_code=[];
      list.forEach((item)=>{
        if(valueList.indexOf(item.id)!=-1){
        _id.push(item.id);
        _name.push(item.detailName)
        _code.push(item.detailCode)
      }
    });
      this.detailform.boqNationalStandard[id]=_id.join(",");
      this.detailform.boqNationalStandard[name]=_name.join(",");
      this.detailform.boqNationalStandard[code]=_code.join(",");
    },
      // engineeringType(){
      //   if(label=="适用范围:"){
      //      this.detailform.contractInfo.engineeringType=id.join(",");
      //     this.detailform.contractInfo.engineeringType=name.join(",");
      //   }
      // },
      //导出函数
      exportdata(){
        window.open('/api/contract/boq/BoqNationalStandard/detail/downloadTemplate');
        // this.$http
        //   .post(
        //     '/api/contract/boq/BoqNationalStandard/detail/downloadTemplate',
        //     { responseType:'blob' }
        //   )
        //   .then((res) => {
        //     // let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
        //     // let objectUrl = URL.createObjectURL(blob);
        //     // window.location.href = objectUrl;
        //     const content = res.data;
        //     const blob = new Blob([content])
        //     const fileName = '工程量清单计量规则'+new Date().toLocaleDateString()+'.xlsx'
        //     if ('download' in document.createElement('a')) { // 非IE下载
        //       const elink = document.createElement('a')
        //       elink.download = fileName;
        //       elink.style.display = 'none'
        //       elink.href = URL.createObjectURL(blob)
        //       document.body.appendChild(elink)
        //       elink.click()
        //       URL.revokeObjectURL(elink.href) // 释放URL 对象
        //       document.body.removeChild(elink)
        //     } else { // IE10+下载
        //       navigator.msSaveBlob(blob, fileName)
        //     }
        //   })
      },
          //上传附件
    handleChange(response, file, fileList) {
      if (response && response.code === 200) {
        this.$message({
          message: "上传成功",
          type: "success",
          duration: 1500,
          onClose: () => {
            this.detailform.bidInfo_01.push(response.data);
            // console.log(fileList);
          },
        });
      } else {
        this.$message.error(response.msg);
      }
    },
      //解决新增的时候二级联动清除不了
      clear(id,name){
        id='';
        name='';
        this.$forceUpdate();
      },
      //金额过滤
      getMoney(value){
        return isMoney(value);
      },
      //获取项目地点的值
      getPositionTree(data) {
        console.log(data)
        this.treeStatas = false;
        var country = '', _data = data;
        if (_data.fullDetailName.indexOf("境内") != -1) {
          country = '01';
        } else if (_data.fullDetailName.indexOf("境外") != -1) {
          country = '02';
        }
        this.detailform.topInfoSiteList.forEach((item, index) => {
          if (index == this.positionIndex) {
            // item.detailName = _data.detailName;
            item.country = country;
            item.ffid = _data.fullDetailCode;
            item.path = _data.fullDetailName;
          }
        });
        this.key = this.key + 1;
      },
    //获取新增的标段
    getBdInfo(data) {
      console.log(data);
      if (data.type == "add") {
        this.detailform.nationalStandardScheduleBOList.push(data);
      } else if (data.type == "edit") {
        this.detailform.nationalStandardScheduleBOList[data.index] = data;
      }
      console.log(this.detailform.nationalStandardScheduleBOList);
      this.BDCSVisible = false;
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
      submit() {
      },

      //获取下拉框id和name的公共方法
      getName(id, list, name,code) {
        if(id){
          this.$forceUpdate();
          this.detailform.boqNationalStandard[name] = list.find(
            (item) => item.id == id
          ).detailName;
            this.detailform.boqNationalStandard[code] = list.find(
                (item) => item.id == id
            ).detailCode;
        }
      },

      saveInfo(formName) {
       // this.detailform.boqNationalStandard.engineeringType=this.detailform.boqNationalStandard.engineeringType1.join(",");
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .post(
                "/api/contract/boq/BoqNationalStandard/detail/save",

                JSON.stringify(this.detailform),
                {useJson: true}
              )
              .then((res) => {
                if (res.data.code === 200) {
                  this.$message({
                    message: "保存成功",
                    type: "success",
                  });
                  this.$router.back();
                }
              });
          } else {
            this.$message.error("请添加必填项");
            return false;
          }
        });
      },
      pageGo() {
        this.searchParam.current = this.current;
        this.getuserlist();
      },
      back() {
        this.$router.back()
        // this.$router.push({
        //   path: "/manage/proposal/list",
        // });
      },
      del(index,item,list,type) {
        console.log(this.multipleSelection.length)
      if (this.multipleSelection.length != 1) {
        this.$message.info("请选择一条记录进行删除操作！");
        return false;
      }

        var i='';
        this.detailform.nationalStandardScheduleBOList.forEach((item,index)=>{
          if(item.nationalStandardSchedule.uuid==this.selectIndex.nationalStandardSchedule.uuid){
            i=index;
          }
        })

        if(this.selectIndex.nationalStandardSchedule.uuid){
          this.$confirm(`确认删除该条数据吗?删除后数据不可恢复`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http
              .post(
                "/api/contract/boq/BoqNationalStandard/list/delete",
                {ids: [this.selectIndex.nationalStandardSchedule.uuid]}
              )
              .then((res) => {
                if (res.data && res.data.code === 200) {
                  this.detailform.nationalStandardScheduleBOList.splice(i, 1);
                } else {
                  this.$message.error(data.msg)
                }
              });
          }).catch(() => {})
        }else{
          this.detailform.nationalStandardScheduleBOList.splice(i, 1);
        }

      },
      //新增标段和地点
    add(type) {
      var v = {
        nationalStandardSchedule: {},
      };
      v = {
        riskFee: "",
      };
      this.detailform.nationalStandardScheduleBOList.push(v);
      console.log(v);
    },

      // 加载列表
      getDetail() {
        this.$http
          .post("/api/contract/boq/BoqNationalStandard/detail/entityInfo", {id:this.id})
          .then((res) => {
            var datas=res.data.data;

            this.detailform={
              boqNationalStandard: datas.boqNationalStandard,
              nationalStandardScheduleBOList: datas.nationalStandardScheduleBOList,
            }
            this.detailform.boqNationalStandard.engineeringType1=this.detailform.boqNationalStandard.engineeringType?this.detailform.boqNationalStandard.engineeringType.split(","):[];
          });
      },

          //打开标段弹框
    openBd(type, detail, index) {
      var i='';
      if(type=='edit'){
        if (this.multipleSelection.length !== 1) {
          this.$message.info("请选择一条记录进行查看操作！");
          return false;
        };
        // selectIndex
        this.detailform.nationalStandardScheduleBOList.forEach((item,index)=>{
          if(item.nationalStandardSchedule.uuid==this.selectIndex.nationalStandardSchedule.uuid){
            i=index;
          }
        })
      }
      this.BDCSVisible = true;
      this.$nextTick(() => {
         // this.detailform.topInforBO.topInfoSectionList,
        //  this.detailform.bidInfo.isBidRates
        this.$refs.infoBD.init(
          this.detailform.nationalStandardScheduleBOList,
          '',
          type,
          this.selectIndex,
          i
        );
      });
    },
    openBd2(row) {
      this.BDCSVisible = true;
      this.$nextTick(() => {
        this.$refs.infoBD.init(
          this.detailform.nationalStandardScheduleBOList,
          '',
          "look",
          row
        );
      });
    },

      handleSelectionChange(val,row) {
        this.multipleSelection = val;
        this.selectIndex=row;
      },
      cellClass(row){
            console.log(row)
            if (row.columnIndex === 0) {
                return 'DisableSelection'
            }
      },
    },
  };
</script>
<style lang="scss" scoped>
.el-table .DisableSelection .cell .el-checkbox__inner{
  display: none;
  position: relative;
}
.el-table .DisableSelection .cell:before{
  content: "";
  position: absolute;
  // right: 11px;
}
  .btn-group{
    text-align: center;
    margin-top: 20px;
  }
  .gcform {
    margin-top: 10px;
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
    }
    >>>.el-form-item,>>>.formItem{

      display: inline-block;
      width: 33%!important;
    }
    .detailformfooter1 {
      margin-top: 5px;
      width: 100%;
      .el-button {
        margin: 0 30px;
        width: 140px;
        height: 42px;
        font-size: 18px;
        font-family: Microsoft YaHei;
      }
      .el-button--primary {
        background: #5c8bfa;
      }
      .el-button--default {
        border: 1px solid #5c8bfa;
        color: #5c8bfa;
      }
    }
    .errorMsg >>>.el-form-item__label {
      color: red;
    }
    .el-input {
      width: 300px;
    }
    .el-input .el-input_inner {
      width: 300px;
      height: 500px;
    }
  }

  .el-input .el-input_inner {
    width: 300px;
    height: 500px;
  }

  .el-table thead.is-group th {
    background: #fff;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .el-card__body {
    /*padding: 0 100px;*/
    // height: 400px;
    // border: 1px solid black;
    // height: 200px;
  }

  >>>.el-input--mini .el-input__inner {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    // margin: 10px 0 0 10px;
  }

  .gcform >>>.el-input {
    width: 95%;
  }
  .listInput{
    width: auto!important;
  }
  .gcform .listInput input{
    width: 100px!important;
    padding:10px!important;
    box-sizing: border-box;
  }
  .neirong {
    width: 100% !important;
  }

  .gcform >>>.el-form-item {
    margin-bottom: 0px;
  }

  .neirong >>>.el-input--mini .el-input__inner {
    height: 100px;
  }

  .detail_bottom {
    margin: 20px 0 0 0;
    // border: 1px solid #ddd;
  }

  .el-card,
  .el-message {
    overflow: hidden;
  }

  .el-scrollbar__wrap.default-scrollbar__wrap {
    overflow: hidden;
  }

  .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    overflow: auto;
    // height: 500px ;
    /*height: 44vh;*/
  }

  .el-button--mini,
  .el-button--mini.is-round {
    margin: 0 27px 5px 0;
  }

  .el-table--border {
    min-height: auto !important;
  }

  >>>.el-collapse-item__header{
    color: #0a469d !important;
    height: 30px;
    background:#f8fafd !important;
    margin: 10px;
  }
  .detailBox{
    padding: 0px !important;
  }
  .padding{
    padding: 0 100px;
  }
  .title_head{
    margin: 0 0 0 10px;
  }
  >>>.el-table__body, .el-table__footer, .el-table__header{
    width: 100%!important;
    height: 40px;
  }
  >>>.el-table__header{
  width: 100%!important;
  }
  >>>.el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 10px;
    margin: auto;
}
>>>.el-collapse-item__wrap{
  padding: 0px 10px;
}
// >>>.neirong{
//    width: 100% !important;
// }
>>>.gcform{
  margin: 0 !important;
}
.small_size{
  font-size: 12px;
}
>>>.el-table__row{
  height: 50px !important;
}
>>>.el-table__header-wrapper  .el-checkbox{//找到表头那一行，然后把里面的复选框隐藏掉
  display:none
}
>>>.el-table--border, .el-table--group{
  border: 0px !important;
}
>>>.el-table__header{
  margin: 20px 0 0 0px;
}

</style>

