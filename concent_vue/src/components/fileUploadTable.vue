<template>
  <el-dialog
    :destroy-on-close="true"
    title="附件列表"
    @close="result"
    :visible.sync="dialogVisible"
  >
    <div>
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-upload
                v-show="isShow==='1'"
                class="upload-demo detailUpload"
                :action="UploadUrl()"
                :on-success="handleChange"
                :on-error="handleChange"
                :on-remove="handleRemove"
                multiple
              >
              <el-button size="small" type="primary" class="dialog_but">点击上传</el-button>

            </el-upload>
    </div>
    <div class="dialog_body">
      <el-table
        :data="detailform.commonFilesList"
        :header-cell-style="{'text-align' : 'center','background-color' : 'rgba(246,248,252,1)','color':'rgba(0,0,0,1)'}"
        @selection-change="handleSelectionChange"
        align="center"
        border
        class="contractInfoTable"
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
                <el-table-column :resizable="false"
                                 label="文件名"
                                 prop="fileName"
                                 show-overflow-tooltip>

                </el-table-column>

                <el-table-column :resizable="false"
                                 label="大小"
                                 prop="fileSize"
                                 align="center"
                                 :width="120"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{(scope.row.fileSize/1024).toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column :resizable="false"
                                 label="类型"
                                 align="center"
                                 :width="80"
                                 prop="fileType"
                                 show-overflow-tooltip>

                </el-table-column>

                <el-table-column
                  v-if="isShow=='1'"
                  v-show="isShow=='1'"
                  :resizable="false"
                  align="center"
                  fixed="right"
                  label="操作"
                  show-overflow-tooltip
                  :width="80"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false"
                             @click="handleRemove(scope.row,scope.$index)"
                             type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>

    </div>
        <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="sub()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  //import datas from '@/utils/positionOrg'

  export default {
    data() {
      return {
        page: {current: 1, size: 20, total: 0, records: []},
        searchform:{
          current: 1,
          size: 20,
          uuid:'',
          businessId:'',
          businessType:'',
          businessCode:'',
          fileName:'',
          fileType:'',
          fileSize:'',
          filePath:'',
          remarks:''
        },
        detailform:{
          commonFilesList:[]
        },
        selectbusinessId:"",
        isShow:'',
        dialogVisible: true,
        multipleSelection: [],
      }
    },
    mounted() {

      //json方法引入数据
      // this.$http.get('/static/jsonData/position.json', { isLoading: false }).then(res =>{
      //   // console.log(res.data.data);
      //   this.datas=res.data.data
      // });

      //js方法引入数据
      //this.datas=datas;
      //console.log(datas)
    },
    methods: {
      // 取消
      close(){
        this.dialogVisible=false;
        // this.$refs['detailForm'].clearValidate();
        // this.visible = false;
      },
      //选中数据
      sub() {
         this.$http
              .post(
                "/api/contract/archives/ArchivesInfo/detail/saveBo",
                JSON.stringify(this.detailform),
                {useJson: true}
              )
              .then((res) => {
              if (res.data.code === 200) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.$emit('getPosition');
            }
          });
        // this.detailform.commonFilesList = list;
        // this.detailForm.type=this.type;
        // if(this.type=='edit'){
        //   this.detailForm.index=this.index;
        // }
        //   this.$refs.detailForm.validate((valid) => {
        //   if (valid) {
        //     this.visible = false;
        //     this.$emit('refreshBD', this.detailForm);
        //   }
        // });
      },

      UploadUrl:function(){
        return '/api/contract/topInfo/CommonFiles/archives/05/uploadFile';
      },
      handleSizeChange(val) {
        this.searchform.size = val
        this.loadData()
      },
      handleCurrentChange(val) {
        this.searchform.current = val
        this.loadData()
      },
      //上传附件
      handleChange(response, file, fileList) {
        if (response && response.code === 200) {
          this.$message({
            message: '上传成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              if(response.data.uuid!=null) {
                // var list =[];
                // this.detailform.commonFilesList = list;
                var commonFile = {
                  uuid: response.data.uuid,
                  businessId: this.selectbusinessId,
                  businessType: response.data.businessType,
                  businessCode: response.data.businessCode,
                  fileName: response.data.fileName,
                  fileType: response.data.fileType,
                  fileSize: response.data.fileSize,
                  filePath: response.data.filePath,
                  remarks: response.data.remarks,
                  createTime: response.data.createTime,
                  createUserId: response.data.createUserId,
                  createUserName: response.data.createUserName,
                  createOrgId: response.data.createOrgId,
                  createOrgName: response.data.createOrgName
                }
                this.detailform.commonFilesList.push(commonFile);
              }
            }
          })
        } else {
          this.$message.error(response.msg)
        }
      },
      handleRemove(file, index) {
        this.$http
          .post(
            "/api/contract/topInfo/CommonFiles/list/delete",
            {ids: [file.uuid]},
          )
          .then((res) => {
            if (res.data.code === 200) {
              this.detailform.commonFilesList.splice(index, 1);
            }

          });
        console.log(this.detailform.commonFilesList)
      },
      init(val,type) {
        this.selectbusinessId = val;

        this.isShow = type;
        this.dialogVisible = true;
        this.loadData();
      },
      handleCheckChange(data, checked, indeterminate) {

        if (checked) {
          this.resultData.push(data);
        }
        console.log(data, checked, indeterminate);
      },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
      handleNodeClick(data) {
        // console.log(data);
        if (this.notSelect.indexOf(data.detailCode) == '-1') {
          this.dialogVisible = false;
          this.$emit('getPosition', this.resultData)
          //this.$emit('getPosition',data)
        }
      },
      result() {
        this.dialogVisible = false;
        this.$emit('getPosition', this.resultData)
        this.resultData = [];
      },
      loadData() {
        //alert(this.selectbusinessId);
        this.searchform.businessId = this.selectbusinessId;
        this.$http
          .post(
            '/api/contract/topInfo/CommonFiles/list/loadPageData',
            this.searchform
          )
          .then(res => {
            this.page = res.data.data
            console.log(JSON.stringify(this.page));
            if( this.page.records.length>0)
            {
              this.detailform.commonFilesList=[];
              this.page.records.forEach((item,index)=>{

                this.detailform.commonFilesList.push(item);
              })
            }

          })
      }
    }
  }
</script>

<style scoped>
>>>.el-upload-list{
  display: none;
}
>>>.el-table td, .el-table th
{
  padding:5px 0px;
}
>>>.dialog_body{
  height: auto !important;
}
>>>.dialog_but{
  margin: 0 0 15px 0;
}
.dialog-footer{
  padding-top: 14px;
  margin:0;
  text-align: center;
  /*background-color: #fafafa;*/
}
</style>
