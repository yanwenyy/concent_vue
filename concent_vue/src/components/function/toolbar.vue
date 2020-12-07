<template>
  <div class="toolbar">
    <el-row>
      <el-col :span="22" style="min-height:1px;">
        <div class="tagBox" ref="tagBox">

<el-tag
            :class="{active:$route.fullPath == item.detail}"
            :closable="item.id != 0"
            :disable-transitions="false"
            :key="index"
            :type="$route.fullPath == item.detail?'warning':'info'"
            @click="redirect(item)"
            @close="closeToolItem(item)"
            class="toolItem"
            effect="plain"
            v-for="(item,index) in getToolData"
          >
            <span class="dot" v-if="$route.fullPath == item.detail"></span>
            {{item.name}}
          </el-tag>

        </div>
      </el-col>
      <el-col :span="2">
        <el-button-group class="btngroup">
          <el-button @click.native="right()" icon="el-icon-caret-left" size="mini" style="font-size:22px;padding:2px;"></el-button>
          <el-button @click.native="left()" icon="el-icon-caret-right" size="mini" style="font-size:22px;padding:2px;"></el-button>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-button
                icon="el-icon-arrow-down el-icon-arrow-up"
                size="mini"
                style="background:rgba(255,255,255,1);margin-left:10px;font-size:22px;padding:2px;"
              ></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="closeAll">关闭全部页面</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="refreshLocat">刷新当前页面</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-button-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    left() {
      this.$el.querySelector('.tagBox').scrollLeft += 100
    },
    right() {
      this.$el.querySelector('.tagBox').scrollLeft -= 100
    },
    closeToolItem(item, index) {
      switch (item.componentName) {
        case '款式开发列表':
          sessionStorage.removeItem('makeParams')
          break
        case '样衣申请单列表':
          sessionStorage.removeItem('spllistparams')
          break
        case '款式开发进度表':
          sessionStorage.removeItem('jinduListParams')
          break
        case '样衣列表':
          sessionStorage.removeItem('splParams')
          break
        case '原版列表':
          sessionStorage.removeItem('oriParams')
          break
      }
      setTimeout(() => {
        // if (item.detail.indexOf('detail') > -1) {
        //   setTimeout(() => {
        //     this.$player.$emit('backList', 'backlist')
        //   }, 200)
        // } else {
        // this.$player.$emit('backList', 'backlist')
        this.$store.dispatch('clearToolBar', item)
        this.$store.dispatch('clearCache', item.componentName)
        // }
      }, 200)
    },
    redirect(item) {
      this.$router.push({ path: item.detail })
    },
    closeAll() {
      var _self = this
      this.getToolData.forEach((item) => {
        setTimeout(() => {
          _self.$store.dispatch('clearAll', item)
          _self.$store.dispatch('clearCache', item.componentName)
        }, 100)
        this.$router.push('/')
      })
    },
    refreshLocat() {
      switch (this.$route.name) {
        case '款式开发列表':
          sessionStorage.removeItem('makeParams')
          break
        case '样衣申请单列表':
          sessionStorage.removeItem('spllistparams')
          break
        case '款式开发进度表':
          sessionStorage.removeItem('jinduListParams')
          break
        case '样衣列表':
          sessionStorage.removeItem('splParams')
          break
        case '原版列表':
          sessionStorage.removeItem('oriParams')
          break
      }
      this.$emit('refresh', true)
    }
  },
  computed: {
    ...mapGetters(['getToolData', 'getCacheView'])
  },
  watch: {
    getToolData(val) {
      setTimeout(() => {
        this.$el.querySelector('.tagBox').scrollLeft += 300
      }, 100)
    }
  }
}
</script>
<style >
.toolItem {
  height: 27px;
  line-height: 24px;
  margin: 0 5px;
  cursor: pointer;
}
.toolbar {
  height: 100%;
  width: 100%;
}
.tagBox {
  height: 58px;
  text-align: left;
  justify-content: space-between;
  width: calc(100% - 32px);
scroll-behavior:smooth;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-left: 16px;
}

.tagBox::-webkit-scrollbar {
  display: none;
}

.btngroup {
  margin-top:3px;
  line-height: 57px;
}
.el-button-group .el-button {
  float: none;
}
</style>
