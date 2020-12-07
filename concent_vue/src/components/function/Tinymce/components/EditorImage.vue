<template>
  <div class="upload-container">
    <el-upload
      :action="$upLoadbaseURL"
:headers="$token"
      :before-upload="beforeUpload"
      :data="data"
      :file-list="fileList"
      :limit="limit"
      :multiple="false"
      :on-remove="beforeRemove"
      :on-success="handleSuccess"
      :show-file-list="false"
      class
    >
      <el-button size="mini" type="primary" class="picUpBtn">上传图片</el-button>
    </el-upload>

    <el-button
      :style="{background:color,borderColor:color}"
      @click=" dialogVisible=true"
      class="picUpBtn"
      size="mini"
      type="primary"
      v-if="type===2"
    >上传图片</el-button>
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible">
      <div style="margin-bottom:20px;">
        <div @click="yykchoose" class="el-upload el-upload--picture-card">
          <p class="uploadp">
            <i class="el-icon-upload"></i>
          </p>
          <p class="uploadSpan">样衣库选择</p>
        </div>

        <div @click="ybkchoose" class="el-upload el-upload--picture-card">
          <p class="uploadp">
            <i class="el-icon-upload"></i>
          </p>
          <p class="uploadSpan">原版库选择</p>
        </div>
        <el-upload
          :before-remove="beforeRemove"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :limit="limit"
          :multiple="false"
          :on-success="handleSuccess"
          :show-file-list="false"
          action="https://httpbin.org/post"
          class="el-upload"
          list-type="picture-card"
        >
          <p class="uploadp">
            <i class="el-icon-upload"></i>
          </p>
          <p class="uploadSpan">本地上传</p>
        </el-upload>
      </div>
      <div>
        温馨提示：
        <span style="color: #949494;"></span>支持上传图片（图片格式支持.jpg .jpeg .png），大小限制5M以内
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="handleSubmit" type="primary">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'EditorSlideUpload',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    color: {
      type: String,
      default: '#1890ff'
    },
    limit: {
      type: [Number, String],
      required: false,
      default: 1
    },
    type: {
      type: [Number, String],
      required: false,
      default: 1
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    yykchoose() {},
    ybkchoose() {},
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待上传完成后关闭')
        return
      }

      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.data.url
          this.listObj[objKeyArr[i]].hasSuccess = true
        }
      }
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      const data = {arr: arr, fileData: response.data}
      this.$emit('successCBK', data)
      this.listObj = {}
      this.fileList = []
    },
    beforeRemove(file) {
      if (file && file.status === 'success') {
        const uid = file.uid
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            delete this.listObj[objKeyArr[i]]
            return
          }
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.picUpBtn {
  background: #5c8bfa;
}
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
.uploadp {
  height: 20px;
  color: #90b5e8;
}
.uploadSpan {
  height: 0px;
  display: inline-block;
  padding: 0;
  margin-top: -14px;
}
</style>
