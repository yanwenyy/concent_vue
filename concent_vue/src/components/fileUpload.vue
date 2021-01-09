<template>
  <!--:headers="{'Authorization':Authorization}"-->
  <el-dialog
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-upload
      ref="fileList1"
      class="upload-demo"
      :action="url"
      :on-success="handleChange"
      :on-error="handleChange"
      :on-remove="handleRemove"
      multiple
      :show-file-list="true">
      <el-button size="small" type="primary">选择文件</el-button>
    </el-upload>
    <div class="btn-group">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button @click="sub"  type="primary">确定</el-button>
    </div>

  </el-dialog>
</template>

<script>
    export default {
      data() {
        return {
          url:'',
          list:'',
          fileList: [],
          dialogVisible:true,
        };
      },
      mounted(){

      },
      methods: {
        sub(){
          var data={
            list:this.list,
            fileList:this.fileList
          };
          this.$emit('refreshBD',data);
          this.dialogVisible = false;
          this.$refs.fileList1.clearFiles();
        },
        init(url,list){
          this.fileList=[];
          this.url=url;
          this.list=list;
          this.dialogVisible = true;

        },
        handleRemove(file, fileList) {
          this.fileList=fileList;
          console.log(this.fileList)
        },
        //上传图片
        handleChange(response, file, fileList){
          if (response && response.code === 200) {
            this.$message({
              message: '上传成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
              this.fileList.push(response.data);
              console.log(this.fileList)
          }
          })
          } else {
            this.$message.error(response.msg)
          }
        },
      }
    }
</script>

<style scoped>
  >>>.el-dialog__body{
    max-height: 400px;
    overflow: auto;
  }
  .btn-group{
    text-align: center;
    margin-top: 20px;
  }
</style>
