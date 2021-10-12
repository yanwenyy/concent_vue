<template>
  <div class="tableStyle" :max-height="$tableHeight" :height="$tableHeight">
    <div
      style="
        display: inline-block;
        width: 20%;
        vertical-align: top;
        overflow: auto;
        border: 1px solid #eee;
      "
    >
      <el-tree
        :key="key"
        :props="props"
        lazy
        ref="tree"
        :default-expanded-keys="['']"
        node-key="uuid"
        :load="loadNode"
        @check-change="handleCheckChange"
        @node-click="handleNodeClick"
        @node-expand="handleNodeExpand"
        @node-collapse="handleNodeCollapse"
      >
        <!--      show-checkbox-->
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <i :class="data.icon" style="margin-right: 5px"></i>{{ node.label }}
          </span>
        </span>
      </el-tree>
    </div>
    <div
      style="
        display: inline-block;
        width: 79%;
        vertical-align: top;
        padding-left: 4px;
      "
    >
      <div style="width: 100%; overflow: hidden;">
        <el-button-group style="float: left">
          <el-button @click="add" plain type="primary"><i class="el-icon-plus"></i>新增</el-button>
          <el-button @click="editItem" plain type="primary"><i class="el-icon-edit"></i>修改</el-button>
          <el-button @click="remove" plain type="primary"><i class="el-icon-delete"></i>删除</el-button>
          <el-button @click="searchformReset" plain type="primary"
            ><i class="el-icon-refresh-right"></i>刷新</el-button
          >
        </el-button-group>
      </div>
      <div style="margin-top: 10px">
      <el-table
      class="tableStyle"
      :data="page.records"
      :max-height="$tableHeight"
      :height="$tableHeight"
      :header-cell-style="{'text-align': 'center','background-color': 'whitesmoke',}"
      highlight-current-row
      ref="table"
      border
      style="width: 100%;"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
      >
        <el-table-column
          :width="50"
          align="center"
          show-overflow-tooltip
          type="selection"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          type="index"
          label="序号"
          :width="70"
          align="center"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="vcode"
          label="编码"
          :width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="vname"
          label="名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="vjldw"
          label="计量单位"
          width="120"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="isUsed"
          label="是否可用"
          width="90"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.isUsed=='1'?'可用':scope.row.isUsed=='0'?'不可用':''}}
          </template>
        </el-table-column>
        <el-table-column
          prop="isEdit"
          label="是否可写"
          width="90"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.isEdit=='1'?'可写':scope.row.isEdit=='0'?'不可写':''}}
          </template>
        </el-table-column>
      </el-table>
      </div>
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
<!-- 新增统计项的弹框 -->
    <el-dialog :title="dialogtitle" :visible.sync="dialogResult" width="40%">
      <el-form :model="itemform">
        <el-form-item label="序号"  v-if="dialogtitle=='新增劳材机'">
          <el-input placeholder="" class="bp_height" disabled  :value="page.records.length+1"/>
        </el-form-item>
        <el-form-item label="序号"   v-if="dialogtitle=='修改劳材机'">
          <el-input placeholder="" class="bp_height" disabled  :value="currentRowIndex"/>
        </el-form-item>
        <el-form-item label="编码" prop="vCode" >
          <el-input placeholder="" class="bp_height" :maxlength="parentid=='0'?3:100000000000000" :disabled="parentid!='0'||page.records.length!=0"  v-model="itemform.vCode" />
        </el-form-item>
        <el-form-item label="名称" prop="vName" >
          <el-input placeholder="" class="bp_height"  v-model="itemform.vName" />
        </el-form-item>
        <el-form-item label="计量单位" prop="vJldw">
          <el-select
            filterable
            placeholder="请选择"
            class="bp_height"
            v-model="itemform.vJldwId"
            @change="
              getName(itemform.vJldwId, measureUnit, 'vJldw')
            "
          >
            <el-option
              :key="index"
              :label="item.detailName"
              :value="item.id"
              v-for="(item, index) in measureUnit"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用" prop="isUsed">
          <el-switch
            class="inline-formitem-switch"
            v-model="itemform.isUsed"
            active-color="#409EFF"
            inactive-color="#ddd"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
          <!--          <el-radio v-model="itemform.veditable" label="1" >是</el-radio>-->
          <!--          <el-radio v-model="itemform.veditable" label="0" >否</el-radio>-->
        </el-form-item>
        <el-form-item label="是否可写" prop="isEdit">
          <el-switch
            class="inline-formitem-switch"
            v-model="itemform.isEdit"
            active-color="#409EFF"
            inactive-color="#ddd"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
          <!--          <el-radio v-model="itemform.vdisable" label="1" >是</el-radio>-->
          <!--          <el-radio v-model="itemform.vdisable" label="0" >否</el-radio>-->
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
      key:0,
      currentRowIndex:'',
      props: {
        label: "vname",
        isLeaf: "vleaf",
        icon: "icon",
      },
      tjxKey:0,
      tjx:false,
      dialogtitle: "",
      parentid: "",
      radio: "0",
      page: { current: 1, size: 20, total: 0, records: [] },
      showinput: false,
      searchform: {
        current: 1,
        size: 20,
        year: "",
        name: "",
        ptype: "",
        orgid: "",
        orgname: "",
      },
      sousuo: "",
      itemTreeList: [],
      itemList: [],
      node: {},
      resolve: {},

      itemform: {
        vCode:'',
        vName:'',
        vjldwId:'',
        vJldw:'',
        isUsed:'',
        isEdit:'',
      },

      menus: [],
      multipleSelection: [],
      orgTree: [],
      dialogResult: false,
      formLabelWidth: "120px",
      vtypeRadio: [
        {
          detailName: "全部",
          id: "0",
        },
        {
          detailName: "仅年报",
          id: "2",
        },
        {
          detailName: "仅月报",
          id: "1",
        },
      ],
    };
  },
  computed: {
    unit() {
      return this.$store.state.unit;
    },
    measureUnit() {
      return this.$store.state.measureUnit;
    },
    projectDomainType() {
      return this.$store.state.category.projectDomainType;
    },
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      row.row_index = rowIndex;
    },
    //获取下拉框id和name的公共方法
    getName(id, list, name) {
      if (id) {
        this.$forceUpdate();
        this.itemform[name] = list.find(
            (item) => item.id == id
          ).detailName;
      }
    },

    vdisableFormatter(row, column) {
      var str = "";
      if (row.vdisable == "1") {
        str = "是";
      } else {
        str = "否";
      }
      return str;
    },
    veditableFormatter(row, column) {
      var str = "";
      if (row.veditable == "1") {
        str = "是";
      } else {
        str = "否";
      }
      return str;
    },
    vtypeFormatter(row, column) {
      var str = "";
      if (row.vtype == "0") {
        str = "全部";
      } else if (row.vtype == "1") {
        str = "仅月报";
      } else if (row.vtype == "2") {
        str = "仅年报";
      }
      return str;
    },
    vprojecttypeFormatter(row, column) {
      var str = "";
      if (row.vprojecttype != null) {
        var strs = row.vprojecttype.split(",");
        // console.log(this.projectDomainType);
        strs.forEach((itemstr) => {
          this.projectDomainType.forEach((item) => {
            //console.log(row);
            if (itemstr == item.id) {
              str += item.detailName + ", ";
            }
          });
        });
        // console.log(str);
        str = str.substring(0, str.length - 2);
        return str;
      }
    },
    vjldwFormatter: function (row, column) {
      // console.log(this.measureUnit);
      var str = "";
      this.measureUnit.forEach((item) => {
        //console.log(row);
        if (row.vjldw == item.id) {
          str = item.detailName;
        }
      });
      return str;
    },
    handleNodeExpand(data, note) {
      // console.log(note);
      if (data.vleaf != "1") {
        data.icon = "";
      }
    },
    handleNodeCollapse(data, note) {
      if (data.vleaf != "1") {
        data.icon = "";
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
    },
    handleNodeClick(data, node) {
      // console.log(data);
      this.getTableData(data);
      //this.getData(node,this.resolve)
    },
    loadNode(node, resolve,ifRefresh) {
      this.getData(node, resolve,ifRefresh);
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

      this.$http
        .post(
          "/api/contract/ContractInfoQuantityMachine/wood/save",
          this.itemform
          // JSON.stringify(this.itemform),
          // this.itemform,
          // { useJson: true }
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.dialogResult = false;
            for (
              let i = 0;
              i < this.$refs.tree.store._getAllNodes().length;
              i++
            ) {
              this.$refs.tree.store._getAllNodes()[i].expanded = false;
            }
            this.loadNode(this.node, this.resolve,true);
            this.key = Symbol(new Date().toString());
          }
          //this.getData();
        });
    },
    selectFile() {
      this.$http
        .post("/api/contract/topInfo/CommonFiles/list/delete", {
          ids: [file.response.data.uuid],
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.fileList = fileList;
          }
        });
    },
    handleRemove(file, index) {
      this.$http
        .post("/api/statistics/bp/BpTjx/list/delete", { ids: [file.uuid] })
        .then((res) => {
          if (res.data.code === 200) {
            this.detailform.fileList2.splice(index, 1);
          }
        });
    },
    //上传附件
    handleChange(response, file, fileList) {
      if (response && response.code === 200) {
        this.$message({
          message: "上传成功",
          type: "success",
          duration: 1500,
          onClose: () => {
            this.detailform.fileList.push(response.data);
          },
        });
      } else {
        this.$message.error(response.msg);
      }
    },

    search() {
      this.showinput = false;
    },
    add() {
      if(this.parentid!=''){
        this.dialogtitle = "新增劳材机";
        this.itemform = {
          pId:this.parentid,
          vCode:'',
          vName:'',
          vjldwId:'',
          vJldw:'',
          isUsed:'',
          isEdit:'',
        };
        var listParentId=this.parentid!='0'?this.vcode:this.page.records[this.page.records.length-1].vcode.indexOf("00")!=-1?'00':'0';
        // console.log(this.page.records[this.page.records.length-1].vcode.indexOf("00"))
        if(this.parentid!='0'&&this.page.records.length==0){
          this.itemform.vCode=listParentId+'001';
        }else{
          var chilVcode=Number(this.page.records[this.page.records.length-1].vcode)+1;
          console.log(chilVcode,chilVcode.toString().length)
          this.itemform.vCode=this.page.records.length>0?(chilVcode.toString().length==4||chilVcode.toString().length==1?'00'+chilVcode:'0'+chilVcode):'';
        }
        this.dialogResult = true;
      }else{
        this.$message.error("请选择左侧树")
      }

    },
    handleSelectChange() {
      this.$forceUpdate()
    },
    editItem() {
      if (this.multipleSelection.length == 0) {
        this.$message.info("请选择数据进行修改！");
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.info("请只选择一条数据进行修改！");
        return;
      }
      if (
        this.multipleSelection[0].uuid == "" ||
        this.multipleSelection[0].uuid == null
      ) {
        this.$message.info("请选择数据进行修改！");
        return;
      }
      this.dialogtitle = "修改劳材机";
      this.dialogResult = true;
      this.$forceUpdate();
      var item= this.multipleSelection[0];
      this.currentRowIndex=this.multipleSelection[0].row_index+1;
      this.itemform = {
        vCode:item.vcode,
        vName:item.vname,
        vJldwId:item.vjldwId,
        vJldw:item.vjldw,
        isUsed:item.isUsed,
        isEdit:item.isEdit,
        pId:item.pid,
        uuid:item.uuid,
      };
      console.log(this.itemform)
    },
    // changeTreeNodeStatus(node) {
    //   node.expanded = false;
    //   for (let i = 0; i < node.childNodes.length; i++) {
    //     // 改变节点的自身expanded状态
    //     node.childNodes[i].expanded = false;
    //     // 遍历子节点
    //     if (node.childNodes[i].childNodes.length > 0) {
    //       this.changeTreeNodeStatus(node.childNodes[i]);
    //     }
    //   }
    // },

    remove() {
      //console.log(JSON.stringify(this.multipleSelection[0].uuid));
      if (
        this.multipleSelection[0].uuid == "" ||
        this.multipleSelection[0].uuid == null
      ) {
        this.$message.info("请选择数据进行删除！");
        return;
      }
      let uuids = [];
      this.multipleSelection.forEach((item) => {
        if (item.uuid != null) {
          uuids.push(item.uuid);
        }
      });
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.$http
            .post("/api/contract/ContractInfoQuantityMachine/wood/delete", { ids: uuids })
            .then((res) => {
              //this.$refs.tree.store.root
              //var nodeall = this.$refs.tree.store.root;
              for (
                let i = 0;
                i < this.$refs.tree.store._getAllNodes().length;
                i++
              ) {
                this.$refs.tree.store._getAllNodes()[i].expanded = false;
              }

              this.loadNode(this.node, this.resolve);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 查看
    rowshow(row) {},
    show() {}, // list通用方法开始
    handleSizeChange(val) {
      this.searchform.size = val;
      // this.getData();
      this.getData(this.node, this.resolve);
    },
    handleCurrentChange(val) {
      this.searchform.current = val;
      // this.getData();
      this.getData(this.node, this.resolve);
    },
    searchformSubmit() {
      this.searchform.current = 1;
      // this.getData();
      this.getData(this.node, this.resolve);
    },
    searchformReset() {
      // this.$refs['searchform'].resetFields()
      // for (let i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
      //   this.$refs.tree.store._getAllNodes()[i].expanded = false;
      // }
      this.loadNode(this.node, this.resolve,true);
      this.key = Symbol(new Date().toString());
    },
    // 列表选项数据
    handleSelectionChange(val) {
      //alert(JSON.stringify(val))
      this.multipleSelection = val;
    },
    getTableData(val,ifRefresh) {
      this.$http
        .post("/api/contract/ContractInfoQuantityMachine/wood/loadPageData",
          {pId:ifRefresh?"0":val.uuid})
        .then((res) => {
          this.page = res.data.data;
        });
    },
    getData(node, resolve,ifRefresh) {
      // console.log(ifRefresh)
      this.node = node;
      this.resolve = resolve;
      if (node.level === 0) {
        return resolve([
          { vname: "劳材机", uuid: "0",},
        ]);
      }
      setTimeout(() => {
        // console.log(node);
        this.$http
          .post("/api/contract/ContractInfoQuantityMachine/wood/loadTreeData", {
            pid: ifRefresh?"0":node.data.uuid,
          })
          .then((res) => {
            node.data.current=this.searchform.current;
            node.data.size=this.searchform.size;
            this.getTableData(node.data,ifRefresh);
            //this.page = res.data.data
            this.parentid = node.data.uuid;
            this.vcode=node.data.vcode;
            const data = [];
            //console.log(res.data.data);
            var itemDatas = res.data.data;
            itemDatas.forEach((item) => {
              if (item.vleaf == "1") {
                item.icon = "";
              } else {
                item.icon = "";
              }
              data.push(item);
            });
            this.itemList = data;
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
          });
      });
    },
    // 获取上级单位树信息
    getOrgTree() {
      this.$http.get("/api/contract/base/loadorglist").then((res) => {
        this.orgTree = res.data.data;
      });
    },
    // 确定单位
    orgChange() {
      let selectLabelArr = this.$refs["porgCascader"].getCheckedNodes()[0]
        .pathLabels;
      this.searchform.orgname = selectLabelArr[selectLabelArr.length - 1];
    },

    // list通用方法结束
  },
  created() {
    //this.getMenus()
    //this.getOrgTree()
    //this.getData()
  },
  mounted() {
    //alert(2);
    this.$store.dispatch("getConfig", {});
    this.$store.dispatch("getCategory", {
      name: "projectDomainType",
      id: "238a917eb2b111e9a1746778b5c1167e",
    });
    // eslint-disable-next-line no-unde
  },
};
</script>
<style lang="scss" scoped>
.el-tree {
  font-size:13px !important;
  height: calc(100vh - 70px) !important;
  // max-height: calc(100vh - 223px) !important;
}
>>>.el-tree-node{
  > .el-tree-node__children{
    overflow:visible !important
  }
}
.gcform {
  margin-top: 10px;
  >>> .el-form-item__label:before {
    position: initial;
    left: -10px;
  }
  >>> .el-form-item__error {
    padding-top: 0px;
    width: 95%;
    margin-left: 0;
    text-align: right;
    top: 0%;
  }
  > .el-form-item,
  >>> .formItem {
    display: inline-block;
    width: 32.5% !important;
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
  .errorMsg >>> .el-form-item__label {
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
>>> .el-table td,
.el-table th {
  padding: 5px 0px;
}
>>> .el-form-item {
  margin-bottom: 5px !important;
}
>>> .el-dialog__body {
  padding-top: 0px;
}
.uploadSpan {
  font-size: 16px;
  color: #303133;
}
>>> .el-main {
  padding: 0px 20px !important;
}
#user-manage {
  //height: calc(100% - 500px);
  //background-color: green;

  .el-container {
    height: calc(100% - 60px);
  }
}
.detailbutton {
  margin-left: 0px;
}
>>> .el-form-item__label {
  width: 15%;
  text-align: right;
}
>>> .el-tree-node:focus > .el-tree-node__content {
  background-color: #409eff;
  color: #ffffff;
  font-size: 13px!important;
}
>>> .el-breadcrumb {
  margin: -100px 0 0 0 !important;
}
// >>>.el-tree-node__content{
//   background: #eee !important;
// }
// >>>.el-table .cell.el-tooltip{
//     height: 31px;
//     padding: 9px;
// }
.bp_height{
  height: 40px!important;
  width: 80%;
}
>>>.el-input__inner{
  height: 32px!important;
}
>>>.el-tree-node__content{
  height: 40px !important;
}
>>>.el-table__row{
  height: 40px !important;
}
/*>>>.el-dialog__body{*/
  /*height: 500px !important;*/
  /*overflow: auto;*/
/*}*/
</style>
