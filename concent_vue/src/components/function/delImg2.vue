<template>
  <div class="imageDown">
    <template v-for="(item,index) in imgarr">
      <div v-if="item.id!==null" :key="index" class="downimgbox">
        <img :src="item.url" alt style="width:100px;height:100px;" />
        <div class="operateBox">
          <i class="el-icon-download" @click="downloadimg(item)"></i>
          <i class="el-icon-zoom-in" @click="pdfShow(item)"></i>
             <i class="el-icon-delete" @click="del(item)"></i>
        </div>
      </div>
    </template>
    <el-image-viewer :on-close="closeViewer" :url-list="[pdfsrc]" v-if="pdfVisible" />
  </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'imageDown',
  components: { ElImageViewer },
  props: {
    imgarr: {
      type: Array,
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
  created() {

  },
  methods: {
    closeViewer() {
      this.pdfVisible = false
    },
    deleteFiles(fileId) {
      this.$http
        .post('/api/contract/common/Files/delete', {
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
      this.$emit('deleteOk', file.businessCode)
    },
    pdfShow(file) {
      this.pdfVisible = true
      this.pdfsrc = file.url
    },
    downloadimg(file) {
      var path =
        this.$baseURL + '/api/contract/common/Files/downloadFile?fileId=' + file.id
      window.open(path)
    }
  }
}
</script>
<style lang="scss">

.imageDown {
  .downimgbox {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    position: relative;
  }

  .operateBox {
    z-index: 1;
    width:100px;
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
    i{
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
