<template>
  <div class="imageDown" v-if="imgarr.id">
      <div class="downimgbox">
        <img :src="imgarr.url" alt style="width:100px;height:100px;" />
        <div class="operateBox">
          <i class="el-icon-download" @click="downloadimg(imgarr)"></i>
          <i class="el-icon-zoom-in" @click="pdfShow(imgarr)"></i>
          <i class="el-icon-delete" @click="del(imgarr)"></i>
        </div>
      </div>

    <el-image-viewer
      :on-close="closeViewer"
      :url-list="[pdfsrc]"
      v-if="pdfVisible"
    />
  </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'imageDown',
  components: { ElImageViewer },
  props: {
    imgarr: {
      type: Object,
      function() {
        return []
      }
    }
  },
  data() {
    return {
      pdfsrc: '',
      pdfVisible: false
    }
  },
  computed: {},
  created() {},
  methods: {
    closeViewer() {
      this.pdfVisible = false
    },
    deleteFiles(fileId) {
      this.$http
        .post('/api/common/Files/delete', {
          ids: [fileId]
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.$message.warning('删除成功')
          }
        })
    },
    del(file) {
      this.deleteFiles(file.id)

      this.$emit('deleteOk', file.id)
    },
    pdfShow(file) {
      this.pdfVisible = true
      this.pdfsrc = file.url
    },
    downloadimg(file) {
      var path =
        this.$baseURL + '/api/common/Files/downloadFile?fileId=' + file.id
      window.open(path)
    }
  }
}
</script>
<style lang="scss">
.imageDown {
  display: inline-block;
  .downimgbox {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    position: relative;
  }

  .operateBox {
    z-index: 1;
    width: 100px;
    height: 100px;
    display: none;
    display: flex;
    vertical-align: middle;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    i {
      flex: 1;
      align-items: center;
      display: inline-block;
      line-height: 100px;
      cursor: pointer;
    }
  }
  .downimgbox:hover .operateBox {
    display: block;
    opacity: 1;
  }
}
</style>
