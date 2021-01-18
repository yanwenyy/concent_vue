<template>
  <div  class="tableStyle"
        style="border: 1px solid #DCDFE6"
        :max-height="$tableHeight"
        :height="$tableHeight">


<!--   style="height: calc(100% - 60px); border: 1px solid #eee"-->
  <div style="display: inline-block;width: 16%;vertical-align: top;overflow: auto; border-right: 1px solid #DCDFE6" >
  <div style="padding: 10px;">
  <el-select
    filterable
    placeholder="工程行业类别"
    size="mini"
    v-model="itemform.vprojecttypes"
  >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.detailCode"
              v-for="(item, index) in projectDomainType"
            ></el-option>
          </el-select>
  </div>
<!--  style="background-color: rgb(238, 241, 246);height: 100%;overflow: auto"-->
    <el-tree
      :props="props"
      lazy
      ref="tree"
      :default-expanded-keys="['']"
      node-key="uuid"
      :load="loadNode"
      show-checkbox
      @check-change="handleCheckChange"
      @node-click="handleNodeClick"
      @node-expand="handleNodeExpand"
      @node-collapse = "handleNodeCollapse">
    <!--      show-checkbox-->
    <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
                <i :class="data.icon"></i>{{ node.label }}
            </span>
        </span>
    </el-tree>
  </div>
    <div style="display: inline-block;width:83%;vertical-align: top" >
      <div style="width: 100%; overflow: hidden;margin-top: 10px;">
      <div style="display: inline-block;width: 100%">
        <div style="display: inline-block;height: auto">
          <span style="background: whitesmoke; border: #DCDFE6 1px solid; padding: 5px">统计项名称：</span><span
            style="width: 200px;margin-left: 5px">{{
              selectItem.vname }}</span>
          <span style="margin-left: 20px;background: whitesmoke; border: #DCDFE6 1px solid; padding: 5px">计量单位：
          </span><span style="width: 200px;margin-left: 5px" >{{ selectItem.vjldwFormatter
            }}</span>
          <span  style="margin-left: 20px;background: whitesmoke; border: #DCDFE6 1px solid; padding: 5px">上报排除项：
          </span><span style="margin-left: 5px">{{ selectItem.vsbpc }}</span>
        </div>
        <div style="display: inline-block;float:right">
          <el-input  placeholder="请输入统计项名称" ></el-input>
          <el-button @click="add" class="detailbutton" >查询</el-button>
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
                stripe
                style="width: 100%;margin-top: 10px"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange">
      <el-table-column
        :width="50"
        align="center"
        show-overflow-tooltip
        type="selection"
      ></el-table-column>
        <el-table-column show-overflow-tooltip
                         type="index" label="序号" width="55" align="center">
        </el-table-column>
        <el-table-column prop="vname" label="统计名称" width="160">
        </el-table-column>
        <el-table-column prop="vjldw" label="计量单位" width="120" align="center" :formatter="vjldwFormatter">
        </el-table-column>
      <el-table-column prop="vprojecttype" label="工程（行业）类别" :formatter="vprojecttypeFormatter">
        </el-table-column>
      <el-table-column prop="vtype" label="使用设置" width="90" align="center" :formatter="vtypeFormatter">
        </el-table-column>
      <el-table-column prop="veditable" label="是否填报" width="90" align="center" :formatter="veditableFormatter">
        </el-table-column>
      <el-table-column prop="vdisable" label="是否隐藏" width="90" align="center" :formatter="vdisableFormatter">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增统计项" :visible.sync="dialogResult"
               width="30%">
      <el-form :model="itemform">
        <el-form-item label="统计名称"  prop="vname">
          <el-input
            placeholder=""
            size="mini"
            v-model="itemform.vname"
          />
        </el-form-item>
        <el-form-item label="计量单位"  prop="vjldw">
          <el-select
            filterable
            placeholder="请选择"
            size="mini"
            v-model="itemform.vjldw"
          >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.detailCode"
              v-for="(item, index) in measureUnit"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="工程（行业）类别"  prop="vprojecttypes">
         <el-select
           multiple
           filterable
           placeholder="请选择"
           size="mini"
           v-model="itemform.vprojecttypes"
         >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.detailCode"
              v-for="(item, index) in projectDomainType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用设置"  prop="vtype">
<!--         <el-radio-group class="detail-radio-group" v-model="itemform.vtype"  @change="getName(itemform.vtype,-->
<!--         this.vtype, 'moduleName')">-->
<!--             <el-radio   v-for="(item, index) in this.vtype" :label="item.id" :key="index">{{item.detailName}}</el-radio>-->
<!--         </el-radio-group>-->
          <el-radio v-model="itemform.vtype" label="0" >全部</el-radio>
          <el-radio v-model="itemform.vtype" label="2" >仅年报</el-radio>
          <el-radio v-model="itemform.vtype" label="1" >仅月报</el-radio>
        </el-form-item>
        <el-form-item label="是否填报"  prop="veditable">
          <el-radio v-model="itemform.veditable" label="1" >是</el-radio>
          <el-radio v-model="itemform.veditable" label="0" >否</el-radio>
        </el-form-item>
         <el-form-item label="是否隐藏"  prop="vdisable">
          <el-radio v-model="itemform.vdisable" label="1" >是</el-radio>
          <el-radio v-model="itemform.vdisable" label="0" >否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResult = false">取 消</el-button>
        <el-button type="primary" @click="saveVerifyResult">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "proposal-list-look",
  data() {
    return {
      props: {
        label: 'vname',
        isLeaf: 'vleaf',
        icon:'icon'
      },
      parentid: '',
      radio: '0',
      page: {current: 1, size: 10, total: 0, records: []},
      showinput: false,
      sousuo: "",
      itemTreeList:[],
      itemList:[],
      node:{},
      resolve:{},
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
      console.log(this.$store.state.measureUnit)
      return this.$store.state.measureUnit
    },
    projectDomainType(){
      console.log(this.$store.state.category.projectDomainType)
      return this.$store.state.category.projectDomainType;
    },

  },
  methods: {
    vdisableFormatter(row, column){
      var str="";
      if(row.vdisable=="1")
      {
        str="是";
      }else
      {
        str="否";
      }
      return str;
    },
    veditableFormatter(row, column){
      var str="";
      if(row.veditable=="1")
      {
        str="是";
      }else
      {
        str="否";
      }
      return str;
    },
    vtypeFormatter(row, column){
      var str="";
      if(row.vtype=="0")
      {
        str="全部";
      }else if(row.vtype=="1")
      {
        str="仅月报";
      }else if(row.vtype=="2")
      {
        str="仅年报";
      }
      return str;
    },
    vprojecttypeFormatter(row, column)
    {
      var str="";
      if(row.vprojecttype!=null)
      {
        var strs=row.vprojecttype.split(",");
        console.log(this.projectDomainType);
        strs.forEach((itemstr)=> {
          this.projectDomainType.forEach((item)=> {
            //console.log(row);
            if(itemstr==item.detailCode)
            {
              str+= item.detailName+", ";
            }

          })
        });
        console.log(str);
        str=str.substring(0,str.length-2);
        return str;
      }

    },

    vjldwFormatter: function(row, column) {
      //console.log(this.measureUnit);
      var str="";
      this.measureUnit.forEach((item)=> {

        //console.log(row);
        if(row.vjldw==item.detailCode)
        {
          str= item.detailName;
        }

      })
      return str;
    },
    handleNodeExpand(data,note){
      console.log(note);
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
    handleCheckChange(data, checked, indeterminate) {

      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data,node) {
      //this.getData(node,this.resolve)
      this.selectItem = data;
      var str="";
      this.measureUnit.forEach((item)=> {

        //console.log(row);
        if(data.vjldw==item.detailCode)
        {
          str= item.detailName;
        }

      })
      this.selectItem.vjldwFormatter = str;
    },
    loadNode(node, resolve) {
      this.getData(node,resolve)
    },
    verifyResultEdit() {
      if (this.multipleSelection.length > 0) {
        this.dialogResult = true;
        //alert(JSON.stringify(this.multipleSelection[0]));

      } else {
        this.$message.info("请选择列表中的项目！");
      }
    },
    saveVerifyResult() {
      this.dialogResult = false
      var str = "";
      this.itemform.vprojecttypes.forEach((item)=> {
        str +=item+",";
      });
      str=str.substring(0,str.length-1);
      //排序
      this.itemform.vxh='0';
      this.itemform.vprojecttype=str;
      this.itemform.vparentid =this.node.data.uuid;
      console.log(this.node);
      console.log(this.itemform);
      //return;
      // this.itemform.vName =
      // alert(JSON.stringify(this.multipleSelection[0]))
      this.$http
        .post(
          '/api/statistics/bp/BpTjx/detail/save',
          JSON.stringify(this.itemform),
          // this.itemform,
          { useJson: true }
        )
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            for(let i = 0; i < this.$refs.tree.store._getAllNodes().length; i++){
              this.$refs.tree.store._getAllNodes()[i].expanded = false;
            }
            // var nodeall = this.$refs.tree.store.root;
            // for (let i = 0; i < nodeall.childNodes.length; i++) {
            //   node.childNodes[i].expanded = false;
            //   // 遍历子节点
            //   if (node.childNodes[i].childNodes.length > 0) {
            //     this.changeTreeNodeStatus(node.childNodes[i])
            //   }
            // }
            this.loadNode(this.node, this.resolve)

          }
          //this.getData();

        })
    },
    selectFile()
    {
      this.$http
        .post(
          "/api/contract/topInfo/CommonFiles/list/delete",
          {ids:[file.response.data.uuid]},
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.fileList=fileList;
          }
        });
    },
    handleRemove(file,index) {
      this.$http
        .post(
          "/api/statistics/bp/BpTjx/list/delete",
          {ids:[file.uuid]},
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.detailform.fileList2.splice(index,1);
          }

        });
      console.log(this.detailform.fileList1)
    },
    //上传附件
    handleChange(response, file, fileList){
      if (response && response.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.detailform.fileList.push(response.data);
          }
        })
      } else {
        this.$message.error(response.msg)
      }
    },

    search() {
      this.showinput = false
    },
    add() {
      this.dialogResult=true;

    },
    editItem() {
      if (this.multipleSelection[0].uuid == "" || this.multipleSelection[0].uuid == null) {
        this.$message.info("请选择统计项进行修改！");
        return;
      }
      this.dialogResult=true;
      console.log(this.multipleSelection[0]);
      //是否有资审信息判断
      if (this.multipleSelection[0].uuid == "" || this.multipleSelection[0].uuid == null) {
        this.$message.info("当前登记的项目信息没有添加的资审信息，请添加资审信息后修改！");
        return;
      }
      var item = this.multipleSelection[0];
      item.vprojecttypes = item.vprojecttype.split(",");

      this.itemform = item;
      //是否在审核流程中判断
      //是否在变更流程中判断

      //alert(JSON.stringify(p));

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

    remove() {
      //console.log(JSON.stringify(this.multipleSelection[0].uuid));
      if (this.multipleSelection[0].uuid == "" || this.multipleSelection[0].uuid == null) {
        this.$message.info("请选择统计项进行删除！");
        return;
      }
      let uuids = []
      this.multipleSelection.forEach((item) => {
        if (item.uuid != null) {
          uuids.push(item.uuid);
        }

      })
      this.$confirm('此操作将永久删除该统计项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
        this.$http
          .post(
            '/api/statistics/bp/BpTjx/list/delete',
            {ids: uuids}
          )
          .then(res => {
            //this.$refs.tree.store.root
            //var nodeall = this.$refs.tree.store.root;
            for(let i = 0; i < this.$refs.tree.store._getAllNodes().length; i++){
              this.$refs.tree.store._getAllNodes()[i].expanded = false;
            }

            this.loadNode(this.node, this.resolve)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 查看
    rowshow(row) {

    },
    show() {

    }, // list通用方法开始
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
      this.getData()
    },
    searchformReset() {
      // this.$refs['searchform'].resetFields()
      for(let i = 0; i < this.$refs.tree.store._getAllNodes().length; i++){
        this.$refs.tree.store._getAllNodes()[i].expanded = false;
      }
      this.getData(this.node,this.resolve);
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
      setTimeout(() => {
        //console.log(node);
        this.$http
          .post(
            '/api/statistics/bp/BpTjx/list/getBpTjxListByParentId',
            {"parentid":node.data.uuid}
          )
          .then(res => {
            //this.page = res.data.data
            this.parentid = node.data.uuid;
            const data = [];
            //console.log(res.data.data);
            var itemDatas = res.data.data;
            itemDatas.forEach((item)=> {
              console.log(item);
              if (item.vleaf == "1") {
                item.icon = 'el-icon-document';
              } else {
                item.icon = 'el-icon-folder';

              }
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
      }, 500);
    },
    getMenus() {
      this.$http
        .post('api/base/loadcascader', {typecode: 'XMLX'})
        .then(res => {
          if (res.data.code === 0) {
            this.menus = res.data.data
          }
        })
    },
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

.el-table__row {
  cursor: pointer;
}
.el-input
{
  width: 300px;
  margin-right: 10px;
}
>>>.el-input .el-input__inner{
  width: 300px;
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

</style>
