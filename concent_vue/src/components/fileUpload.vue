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
      :on-change="fileChage1"
      multiple
      :show-file-list="true">
      <el-button size="small" type="primary">选择文件</el-button>
    </el-upload>
    <div class="btn-group">
      <el-button @click="close">取 消</el-button>
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
          fileList1: [],
          dialogVisible:true,
          ifUP:false,
          upLoading:false,
        };
      },
      mounted(){

      },
      methods: {
        close(){
          this.dialogVisible = false;
          this.$refs.fileList1.clearFiles();
        },
        sub(){
          console.log(this.fileList1)
          var data={
            list:this.list,
            fileList:this.fileList1
          };
          if(this.upLoading==true&&this.ifUP==false){
            // this.$message.error('上传中,请稍等');
            this.$message({
              message: '上传中,请稍等',
              type: 'error',
              duration: 500})
          }else{
            this.$emit('refreshBD',data);
            this.dialogVisible = false;
            this.$refs.fileList1.clearFiles();
        }
        },
        init(url,list){
          this.fileList1=[];
          this.url=url;
          this.list=list;
          this.dialogVisible = true;
          this.ifUP = false;
          this.upLoading = false;
        },
        handleRemove(file, fileList) {
          this.fileList1.forEach((item,index)=>{
            console.log(item,file.response.data)
            if(item.uuid==file.response.data.uuid){
              this.fileList1.splice(index,1)
            }
          })
          // this.fileList1=fileList;
          console.log(this.fileList1)
        },
        //上传图片
        handleChange(response, file, fileList){
          if (response && response.code === 200) {
            this.fileList1.push(response.data);
            console.log(this.fileList1)
            this.$message({
              message: '上传成功',
              type: 'success',
              duration: 1000})
          } else {
            this.$message.error(response.msg)
          }
        },
        //上传改变时
        fileChage1(file, fileList){
          this.upLoading=true;
          this.ifUP=false;
          if(file.status==='success'){
            this.upLoading=false;
            this.ifUP=true;
          }
          if(file.status==='fail'){

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
