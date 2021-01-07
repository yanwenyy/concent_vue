<template>
  <div id="dataCenter" style="position:relative;">
    <el-button
      @click="uppic"
      class="addBtn"
      size="mini"
      style="position:absolute;right:10px;top:10px;z-index:1;"
      type="primary"
      v-if="uuid!==''"
    >上传</el-button>
    <div style="
    overflow: hidden;">
      <div class="window">
        <span class="imgtitle">大图展示</span>
        <div class="imgBox">
          <el-image :preview-src-list="[imgUrl]" :src="imgUrl" alt></el-image>
          <el-button-group style="width:100%;margin-top:-2px;border-radios:0;display: flex;" v-if="file.id">
            <el-button
              @click.native="downloadimg()"
              size="samll"
              style="width:100%;border-radios:0;"
              type="primary"
            >图片下载</el-button>
            <!-- <el-button @click.native="downloadfile()" size="samll" style="width:50%;border-radios:0;" type="primary">附件下载</el-button> -->
          </el-button-group>
        </div>
      </div>
      <div class="rightBox">
        <template>
          <div class="ulBox">
            <span class="imgtitle">原版图</span>
            <div class="ulImgBox" ref="ulImgBox">
              <el-button
                @click="toleft"
                circle
                class="toleftarrow"
                icon="el-icon-arrow-left"
                plain
                type="info"
                v-if="yyt.length>5"
              ></el-button>
              <ul class="dots">
                <el-checkbox-group @change="radioChg" class="checkpic" v-model="radio">
                   <template  v-for="(dot, i) in yyt">
                  <li
                    :class="{dotted: dot.url === imgUrl}"
                    :key="i"
                    @click="jump(dot)"
                    style="position:relative;"
v-if="dot.id"
                  >
                    <el-checkbox
                      :key="dot.id"
                      :label="dot.id"
                      style="position:absolute;width:20px;right:0;"
                      v-if="uuid!==''&&dot.id"
                    ></el-checkbox>
                    <img v-if="dot.id" :src="dot.url" alt style="width:100%;height:100%;" />
                  </li>
                   </template>
                </el-checkbox-group>
              </ul>
              <el-button
                @click="toright"
                circle
                class="torightarrow"
                icon="el-icon-arrow-right"
                plain
                type="info"
                v-if="yyt.length>5"
              ></el-button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dataCenter',
  props: {
    no: {
      type: String,
      default: ''
    },
    initialSpeed: {
      type: Number,
      default: 20
    }, // 图片移动速度
    uuid: {
      type: String,
      default: ''
    },
    yyt: {
      type: Array,
      function() {
        return [{ url: '1111' }]
      }
    },

    ztsjt: {
      type: Array,
      function() {
        return []
      }
    },
    xjsjt: {
      type: Array,
      function() {
        return []
      }
    },
    initialInterval: {
      type: Number,
      default: 1
    } // 如果是一个组件 接受外部传入的切换周期
  },
  data() {
    return {
      radio: [],
      file: '',
      imgUrl: '',
      content: '',
      sliders: [], // 放图片的数组
      imgWidth: 400, // 图片宽度
      currentIndex: 1, // 原点起始位置
      distance: -600, // 外层嵌套的初始移动距离
      transitionEnd: true, // 防止多次快速点击切换出现问题的闸门
      speed: this.initialSpeed,
      timer: null, // 定时器
      imgNumber: 0, // 点击放大的图片
      maskBol: false
    }
  },
  computed: {
    containerStyle() {
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      }
    }
  },
  created() {
    setTimeout(() => {
      if (this.yyt.length) {
        this.file = this.yyt[0]
        this.imgUrl = this.yyt[0].url
        this.content = this.yyt[0].filesDescribe.descText
      } else if (this.ztsjt.length) {
        this.file = this.ztsjt[0]
        this.imgUrl = this.ztsjt[0].url
        this.content = this.ztsjt[0].filesDescribe.descText
      } else if (this.xjsjt.length) {
        this.file = this.xjsjt[0]
        this.imgUrl = this.xjsjt[0].url
        this.content = this.xjsjt[0].filesDescribe.descText
      }
    }, 1000)
  },
  methods: {
    toleft() {
      this.$el.querySelector('.ulImgBox').scrollLeft -= 100
    },
    toright() {
      this.$el.querySelector('.ulImgBox').scrollLeft += 100
    },
    radioChg(val) {
      if (this.radio.length > 1) {
        this.radio.splice(0, 1)
      }
    },
    uppic() {
      if (this.radio.length === 0) {
        this.$message.error('请选择图片后上传！')
        return
      }
      var upData = JSON.parse(localStorage.getItem('upData'))
      upData.fileId = this.radio
      this.$http
        .post('/api/contract/common/Files/upByFile', upData)
        .then((res) => {
          this.$player.$emit('getImgData', {imgData: res.data.data, no: this.no})
        })
    },
    downloadimg() {
      var path =
        this.$baseURL + '/api/contract/common/Files/downloadFile?fileId=' + this.file.id
      window.open(path)
    },
    downloadfile() {
      var path =
        this.$baseURL + '/api/contract/common/Files/downloadFile?fileId=' + this.file.id
      window.open(path)
    },
    jump(data) {
      this.file = data
      this.imgUrl = data.url
      this.content = data.filesDescribe.descText
    },
    // 自动播放函数

    maskFun() {
      this.maskBol = false

      // this.play()
    }
  }
}
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
ol,
ul {
  list-style: none;
}
 .toleftarrow {
    position: absolute;
    left: 50px;
    top: 50px;
  }
  .torightarrow {
    position: absolute;
    right: 10px;
    top: 50px;
  }
 .ulImgBox::-webkit-scrollbar {
    display: none;
  }
#dataCenter {
  overflow: hidden;

  .imgcontent {
    padding-right: 10px;
    padding-left: 10px;
    min-height: 80px;
    line-height: 25px;
    width: calc(100vw - 490px);
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    font-size: 12px;
    margin: 5px 120px;
    border: 1px solid #dce1f0;
  }

  .rightBox {

    width: calc(100vw - 850px);
    overflow: hidden;
  }
  .window {

    width: 500px;
    min-height: 400px;
    .imgBox {
      padding: 10px;
      height: 400px;
      width: 350px;
      margin-left: 120px;
      border: 1px solid rgba(220, 225, 240, 1);
    }
    .el-image {
      width: 100%;
      height: calc(100% - 40px);
      border: 1px solid rgba(220, 225, 240, 1);
      background: rgba(246, 248, 252, 1);
      img {
        height: 100%;
      }
    }
    p {
      margin-left: 123px;
      box-sizing: border-box;
      width: 300px;
      border: 1px solid #eee;
      padding: 2px;
    }
  }
  .dots {

    height: 132px;
    width: max-content;
    overflow: hidden;
  }
  .dots li {

padding: 10px 10px;
    width: 132px;
    height: 132px;
    margin: 0 12px;
    background: rgba(246, 248, 252, 1);
    border: 1px solid rgba(220, 225, 240, 1);
    cursor: pointer;
  }

  .dots .dotted {
     border: 1px solid #5B8BF9;
  }
  .imgtitle {

    font-size: 14px;
    line-height: 44px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    width: 95px;
    text-indent: 10px;
  }
  .ulBox {
    position: relative;
    overflow: hidden;
    margin: 10px 0 10px 0;
  }
  .ulBox :last-child {
    margin-bottom: 0;
  }
  .ulImgBox {

    width: calc(100% - 183px);
    margin-left: 10px;
    height: 142px;
    overflow-y: scroll;
  }
  .mask-div {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    .mask-img {
      margin-top: calc(50vh - 200px);
    }
  }
}
</style>
