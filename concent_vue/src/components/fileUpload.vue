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
      :headers="{'Authorization':Authorization}"
      :on-success="handleChange"
      :on-error="handleChange"
      :on-remove="handleRemove"
      :on-change="fileChage1"
      :on-preview="handlePreview"
      :before-upload="beforeAvatarUpload"
      show-file-list
      multiple>
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
          Authorization:sessionStorage.getItem("token"),
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
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt100M = file.size / 1024 / 1024 < 100;

          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!');
          // }
          if (!isLt100M) {
            this.$message.error('上传文件大小不能超过 100MB!');
          }
          // return isJPG && isLt2M;
          return isLt100M;
        },
        handlePreview(file) {
          console.log(file);
        },
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
          // this.$forceUpdate();
          // debugger
          if (response && response.code === 200) {
            this.fileList1.push(response.data);
            // this.$forceUpdate();
            // console.log(this.fileList1)
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
