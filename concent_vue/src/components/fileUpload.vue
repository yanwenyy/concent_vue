<template>
  <!--:headers="{'Authorization':Authorization}"-->
  <el-upload
    class="upload-demo"
    :action="'/api/topInfo/CommonFiles/'+businessType+'/'+businessCode+'/uploadFile'"
    :on-success="handleChange"
    :on-error="handleChange"
    :on-remove="handleRemove"
      multiple
    :limit="3"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>

</template>

<script>
    export default {
      data() {
        return {
          fileList: []
        };
      },
      props:{
        businessCode:{
          type: String
        },
        businessType:{
          type: String
        }
      },
      mounted(){
        console.log(this.businessCode)
      },
      methods: {
        handleRemove(file, fileList) {
          this.dataForm.imgUrl='';
        },
        //上传图片
        handleChange(response, file, fileList){
          if (response && response.code === 200) {
            this.$message({
              message: '上传成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
              this.dataForm.imgUrl=response.data;
          }
          })
          } else {
            this.$message.error(response.msg)
          }
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        }
      }
    }
</script>

<style scoped>

</style>
