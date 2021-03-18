<template>
  <div  class="tableStyle"
        style="border: 1px solid #DCDFE6"
        :max-height="$tableHeight"
        :height="$tableHeight">


<!--   style="height: calc(100% - 60px); border: 1px solid #eee"-->
  <div style="display: inline-block;vertical-align: top;overflow: auto; border-right: 1px solid #DCDFE6;width:14%" >
  <div style="position:relative;margin:10px">
  <el-select
    style="height:42px"
    filterable
    placeholder="请选择工程(行业)类别"
    size="mini"
    v-model="itemform.vprojecttypes"
    @change="engineer"
  >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in projectDomainType"

            ></el-option>
          </el-select>
  <!-- <el-button  class="detail-back-tab detailbutton save-btn"  @click="saveInfo">保存</el-button> -->
</div>
    <el-tree
      :key="key"
      :props="props"
      lazy
      ref="tree"
      :default-expanded-keys="['']"
      node-key="uuid"
      :load="loadNode"
      show-checkbox
      :default-checked-keys="checkedList"
      @check="handleCheckChange"
      @node-click="handleNodeClick"
      @node-expand="handleNodeExpand"
      @node-collapse = "handleNodeCollapse">
    <!--      show-checkbox-->
    <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
                <i :class="data.icon"></i>&nbsp;&nbsp;&nbsp;&nbsp;{{ node.label }}
            </span>
        </span>
    </el-tree>
  </div>
    <div style="display: inline-block;width:85%;vertical-align: top" >
      <div style="width: 100%; overflow: hidden;margin-top: 10px;">
      <div style="display: inline-block;width: 100%">
        <div style="display: inline-block;height: auto;width: 90%">
          <div class="small">
          <span style="padding: 5px">统计项名称：</span>
          <el-input v-model="selectItem.vname" disabled style="width:55%"></el-input>
          <!-- <span>{{selectItem.vname }}</span> -->
          </div>
          <div class="small">
          <span style="padding: 5px"> &nbsp;计量单位：</span>
          <el-input v-model="selectItem.vjldwFormatter" disabled style="width:55%"></el-input>
          <!-- <span>{{ selectItem.vjldwFormatter}}</span> -->
          </div>
          <div class="small">
          <span style="padding: 5px">上报排除项：</span>
          <el-input v-model="selectItem.vsbpc" disabled style="width:55%"></el-input>
          <!-- <span >{{ selectItem.vsbpc }}</span> -->
          </div>
        </div>
        <div class="cx">
          <el-button @click="getList" type="primary">查询</el-button>
          <!-- <el-input  placeholder="请输入统计项名称" ></el-input> -->

        </div>
      </div>
<!--          <el-button-group style="float: left">-->
<!--            <el-button @click="add" class="detailbutton" >新增</el-button>-->
<!--            <el-button @click="editItem" class="detailbutton" >修改</el-button>-->
<!--            <el-button @click="remove" class="detailbutton"  >删除</el-button>-->
<!--            <el-button @click="searchformReset" class="detailbutton" >刷新</el-button>-->
<!--          </el-button-group>-->
        </div>
      <el-table :data="itemList"
                :header-cell-style="{
                  'text-align': 'center',
                  'background-color': 'whitesmoke',
                }"
                highlight-current-row
                ref="table"
                border
                class="tableStyle"
                style="width: 100%;margin-top:10px"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange">
      <!-- <el-table-column
        :width="50"
        align="center"
        show-overflow-tooltip
        type="selection"
      ></el-table-column> -->
        <el-table-column show-overflow-tooltip type="index" label="序号" width="60" align="center">

        </el-table-column>
        <el-table-column prop="vname" label="统计项名称" >
          <template slot="header" slot-scope="scope">
            <span>统计项名称</span>
            <div>
              <el-input
                style=" width: 100%"
                v-model="searchform.vname"
                size="mini"/>
            </div>
          </template>
              <!-- <div>
              <el-input
                style=" width: 100%"
                v-model="selectItem.vname"
                size="mini"/>
            </div> -->
        </el-table-column>
        <!-- <el-table-column prop="vjldw" label="计量单位" width="120" align="center" :formatter="vjldwFormatter">
        </el-table-column> -->
      <el-table-column prop="vprojecttype" label="工程（行业）类别" :formatter="vprojecttypeFormatter">
          <template slot="header" slot-scope="scope">
            <span>工程（行业）类别</span>
            <div>
               <el-select
                filterable
                placeholder="工程行业类别"
                v-model="searchform.vprojecttypes"
              >
                <el-option
                  :key="index"
                  :label="item.detailName"
                  :value="item.id"
                  v-for="(item, index) in projectDomainType"

                ></el-option>
          </el-select>
            </div>
          </template>
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
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

  </div>

</template>

<script>
export default {
  name: "proposal-list-look",
  data() {
    return {
      checkedList:[],//tree默认勾选数组
      disabledList:[],//tree禁用数组
      form:{
            code:'',
            name:''
        },
        value:'',
        options: [],

      props: {
        label: 'vname',
        isLeaf: 'vleaf',
        icon:'icon'
      },
      key:0,
      parentid: '',
      radio: '0',
      page: {current: 1, size: 20, total: 0, records: []},
      showinput: false,
      sousuo: "",
      itemTreeList:[],
      itemList:[],
      node:{},
      resolve:{},
      searchform: {
        current: 1,
        size: 20,
        year: "",
        name: "",
        ptype: "",
        orgid: "",
        orgname: "",
      },
      itemform: {
        uuid:'',
        vname: '',
        vjldw:'',
        vprojecttype:'',
        vprojecttypes:[],
        vleaf:'',
        vparentid:'',
        vxh:'',
        vsbpc:'',
        venabled:'',
        vcode: '',
        nnamelength: '',
        vtype: '',
        veditable: '',
        vhjtjx: '',
        voptional:'',
        valtername:'',
        vdisable: ''

      },
      selectItem: {
        uuid:'',
        vname: '',
        vjldw:'',
        vprojecttype:'',
        vprojecttypes:[],
        vleaf:'',
        vparentid:'',
        vxh:'',
        vsbpc:'',
        venabled:'',
        vcode: '',
        nnamelength: '',
        vtype: '',
        veditable: '',
        vhjtjx: '',
        voptional:'',
        valtername:'',
        vdisable: ''

      },
      menus: [],
      multipleSelection: [],
      orgTree: [],
      dialogResult: false,
      formLabelWidth: '120px',
      vtypeRadio:[{
        detailName:'全部',
        id:'0'
      },{
        detailName:'仅年报',
        id:'2'
      },{
        detailName:'仅月报',
        id:'1'
      }]
    }
  },
  computed: {

    unit () {
      return this.$store.state.unit
    },
    measureUnit () {
      return this.$store.state.measureUnit
    },
    projectDomainType(){
      return this.$store.state.category.projectDomainType;
    },

  },
  methods: {
    // 点击下拉框调用
    engineer(){
      this.key+=1;
      // this.$http
      //       .post(
      //         "/api/statistics/bp/BpTjx/list/loadPageDataByProjectType",{id: this.itemform.vprojecttypes}
      //       )
      this.getData(this.node,this.resolve);
    },
    // 查讯
        getList() {
        this.$http
          .post(
            "/api/statistics/bp/BpGdwtjxsz/list/getBpGdwtjxszList",

            this.searchform
          )
          .then((res) => {
            this.page= res.data.data;
          });
      },

    saveInfo(){
      var list=this.$refs.tree.getCheckedNodes();
    },

    vprojecttypeFormatter(row, column)
    {
      var str="";
      if(row.vprojecttype!=null)
      {
        var strs=row.vprojecttype.split(",");
        strs.forEach((itemstr)=> {
          this.projectDomainType.forEach((item)=> {
            if(itemstr==item.id)
            {
              str+= item.detailName+", ";
            }

          })
        });
        str=str.substring(0,str.length-2);
        return str;
      }

    },

    vjldwFormatter: function(row, column) {
      var str="";
      this.measureUnit.forEach((item)=> {

        if(row.vjldw==item.detailCode)
        {
          str= item.detailName;
        }

      })
      return str;
    },
    handleNodeExpand(data,note){
      if(data.vleaf!="1")
      {
        data.icon='el-icon-folder-opened';
      }
    },
    handleNodeCollapse(data,note){
      if(data.vleaf!="1")
      {
        data.icon='el-icon-folder';
      }


    },
    // 树节点保存
    handleCheckChange(data, checked) {
      // console.log(data,checked)
      var list=checked.checkedNodes,subList=[];
      list.forEach((item)=>{
        if(item.disabled!=true){
          subList.push(item)
        }
      });
      console.log(list,subList)
      // console.log(checked.checkedKeys.indexOf(data.uuid))

      this.$http
        .post(
          "/api/statistics/bp/BpGdwtjxsz/detail/saveAll",
          JSON.stringify(subList),
          {useJson: true}
        )
        .then((res) => {
      });

      //old
      // var ifChecked=checked.checkedKeys.indexOf(data.uuid);
      // if(ifChecked!=-1){
      //     //debugger
      //   this.$http
      //     .post(
      //       "/api/statistics/bp/BpGdwtjxsz/detail/save",
      //        JSON.stringify({ids:[data.uuid],projectType:this.itemform.vprojecttypes,vcode:data.vcode}),
      //       {useJson: true}
      //     )
      //     .then((res) => {
      //     //      this.$http
      //     //         .post(
      //     //           "/api/statistics/bp/BpGdwtjxsz/list/deleteById",
      //     //         {ids:data.uuid,projectId:this.itemform.vprojecttypes},
      //
      //     //         )
      //     //         .then((res) => {
      //     //           // console.log(res.data)
      //     //         });
      //     });
      // }else{
      //   this.$http
      //     .post(
      //       "/api/statistics/bp/BpGdwtjxsz/list/deleteById",
      //     {ids:data.uuid,projectId:this.itemform.vprojecttypes},
      //
      //     )
      //     .then((res) => {
      //     });
      // }

    },
    handleNodeClick(data,node) {
      //this.getData(node,this.resolve)
      this.selectItem = data;
      var str="";
      this.measureUnit.forEach((item)=> {

        if(data.vjldw==item.id)
        {
          str= item.detailName;
        }

      })
      this.selectItem.vjldwFormatter = str;
      // this.searchform.vname=data.vname;
    },
    loadNode(node, resolve) {
      this.getData(node,resolve)
    },


    changeTreeNodeStatus (node) {
      node.expanded = false
      for (let i = 0; i < node.childNodes.length; i++) {
        // 改变节点的自身expanded状态
        node.childNodes[i].expanded = false
        // 遍历子节点
        if (node.childNodes[i].childNodes.length > 0) {
          this.changeTreeNodeStatus(node.childNodes[i])
        }
      }
    },


    // list通用方法开始
    handleSizeChange(val) {
      this.searchform.size = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.searchform.current = val
      this.getData()
    },

    // 列表选项数据
    handleSelectionChange(val) {
      //alert(JSON.stringify(val))
      this.multipleSelection = val
    },
    getData(node,resolve) {
      this.node = node;
      this.resolve = resolve;
      if (node.level === 0) {
        return resolve([{ vname: '统计项',uuid:"" ,icon:'el-icon-folder'}]);
      }
      this.$http
        .post(
          "/api/statistics/bp/BpGdwtjxsz/list/getBpGdwtjxszList",
        {'projectType':this.itemform.vprojecttypes}
        )
        .then((res) => {
          var datas=res.data.data,list=[],disabledList=[];
          datas.forEach((item)=>{
            list.push(item.vtjxid);
            if(item.disabled==true){
              disabledList.push(item.vtjxid)
            }
          })
          this.checkedList= list;
          this.disabledList=disabledList;
        });
      setTimeout(() => {
        if(this.itemform.vprojecttypes!=''){
           this.$http
          .post(
            '/api/statistics/bp/BpTjx/list/getBpTjxListByParentId1',
            {"parentid":node.data.uuid,'projectType':this.itemform.vprojecttypes}
          )
          .then(res => {

            //this.page = res.data.data
            this.parentid = node.data.uuid;
            const data = [];
            var itemDatas = res.data.data;
            itemDatas.forEach((item)=> {
              if (item.vleaf == "1") {
                item.icon = 'el-icon-document';
              } else {
                item.icon = 'el-icon-folder';

              }
              // console.log(item.uuid,'==>',this.disabledList.indexOf(item.uuid)!=-1)
              item.disabled=this.disabledList.indexOf(item.uuid)!=-1?true:null;
              data.push(item);

            });
            this.itemList=data;
            // this.itemList = res.data.data;
            // this.itemList.forEach((item)=>{
            //   console.log(item);
            //   if(item.vleaf=="1")
            //   {
            //     item.icon='el-icon-document';
            //   }else
            //   {
            //     item.icon='el-icon-folder';
            //
            //   }
            //   data.push(item);
            // });
            resolve(data);
          })
        }else{
          resolve('');
        }

      }, 500);
    },
    // getMenus() {
    //   this.$http
    //     .post('api/base/loadcascader', {typecode: 'XMLX'})
    //     .then(res => {
    //       if (res.data.code === 0) {
    //         this.menus = res.data.data
    //       }
    //     })
    // },
    currentMenu(selVal) {
      let selMenuObj = this.menus.filter(item => item.value === selVal)
      this.searchform.menu = selMenuObj[0].label
    },
    // 获取上级单位树信息
    getOrgTree() {
      this.$http.get('/api/contract/base/loadorglist').then(res => {
        this.orgTree = res.data.data
      })
    },
    // 确定单位
    orgChange() {
      let selectLabelArr = this.$refs['porgCascader'].getCheckedNodes()[0]
        .pathLabels
      this.searchform.orgname = selectLabelArr[selectLabelArr.length - 1]
    }

    // list通用方法结束
  },
  created() {
    //this.getMenus()
    //this.getOrgTree()
    //this.getData()
  },
  mounted() {
    //alert(2);
    this.$store.dispatch('getConfig', { })
    this.$store.dispatch('getCategory', {name: 'projectDomainType', id: '238a917eb2b111e9a1746778b5c1167e'});
    // eslint-disable-next-line no-unde

  }
}
</script>
<style lang="scss" scoped>
.save-btn{
  position:absolute;
  top:0!important;
  right:-5px!important;
}
.el-tree{
  height:calc(100vh - 223px)!important;
  max-height:calc(100vh - 223px)!important;
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
  >.el-form-item,>>>.formItem{

    display: inline-block;
    width: 32.5%!important;
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

>>>.el-table__row {
  cursor: pointer;
  height: 40px!important;
}
.el-input
{
  width: 100%;
  margin-right: 10px;
}
>>>.el-input .el-input__inner{
  width: 100%;
  height: 32px !important;
  line-height: 32px !important;
}
>>>.el-table td, .el-table th
{
  padding:5px 0px;
}
>>>.el-form-item {
  margin-bottom: 5px !important;
}
>>>.el-dialog__body{
  padding-top: 0px;
}
.uploadSpan{
  font-size: 16px;
  color: #303133;
}
>>>.el-main{
  padding: 0px 20px !important;
}
#user-manage {
  //height: calc(100% - 500px);
  //background-color: green;

  .el-container {
    height: calc(100% - 60px); border: 1px solid #eee
  }
}
.detailbutton{
  margin-left: 0px;
}
>>>.el-form-item__label
{
  width: auto;

}
span{
  font-size: 14px;
  color: #4d4d4d;
}
// >>>.el-tree{
//   width: 15% !important;
//   margin: 0 0 0 0;
// }
>>>.el-tree-node__content{
  height: 40px !important;
}
.small{
  width: 29%;
  display: inline-block;
}
.cx{
  // margin: 20px 0 0 0;
  float: right;
}
</style>
