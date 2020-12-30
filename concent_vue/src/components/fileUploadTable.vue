<template>
  <el-dialog
    :destroy-on-close="true"
    title="附件列表"
    :visible.sync="dialogVisible"
  >
    <div>
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input> -->
              <el-upload
                class="upload-demo detailUpload"
                :action="UploadUrl()"
                :on-success="handleChange"
                :on-error="handleChange"
                :on-remove="handleRemove"
                multiple
              >
              <el-button size="small"
                         type="primary">点击上传</el-button>
            </el-upload>
    </div>
    <div>
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
                                 show-overflow-tooltip>

                </el-table-column>
                <el-table-column :resizable="false"
                                 label="类型"
                                 prop="fileType"
                                 show-overflow-tooltip>

                </el-table-column>

                <el-table-column
                  :resizable="false"
                  fixed="right"
                  label="操作"
                  show-overflow-tooltip
                  width="200"
                >
                  <template slot-scope="scope">
                    <el-link :underline="false"
                             @click="handleRemove(scope.row,scope.$index)"
                             type="warning">删除</el-link>
                  </template>
                </el-table-column>
              </el-table>

    </div>
    <div>
<el-pagination
  :current-page="page.current"
  :page-size="page.size"
  :page-sizes="[10, 50, 100]"
  :total="page.total"
  @current-change="handleCurrentChange"
  @size-change="handleSizeChange"
  layout="total, sizes, prev, pager, next, jumper"
></el-pagination>
    </div>
  </el-dialog>
</template>

<script>
  //import datas from '@/utils/positionOrg'

  export default {
    data() {
      return {
        page: {current: 1, size: 10, total: 0, records: []},
        searchform:{
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
      UploadUrl:function(){
        return '/api/topInfo/CommonFiles/'+this.selectbusinessId+'/archives/05/uploadFileByBusinessId';
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
              console.log(JSON.stringify(response.data))
              this.detailform.commonFilesList.push(response.data);
            }
          })
        } else {
          this.$message.error(response.msg)
        }
      },
      handleRemove(file, index) {
        this.$http
          .post(
            "/api/topInfo/CommonFiles/list/delete",
            {ids: [file.uuid]},
          )
          .then((res) => {
            if (res.data.code === 200) {
              this.detailform.commonFilesList.splice(index, 1);
            }

          });
        console.log(this.detailform.commonFilesList)
      },
      init(val) {
        this.selectbusinessId = val;
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
            '/api/topInfo/CommonFiles/list/loadPageData',
            this.searchform
          )
          .then(res => {
            this.page = res.data.data
            console.log(JSON.stringify(this.page));
          })
      }
    }
  }
</script>

<style scoped>
.el-upload-list{
  display: none;
}
</style>
