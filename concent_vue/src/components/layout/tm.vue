<template>
  <el-container style="height: 100%; width: 100%;">
    <el-header style="border-bottom: 1px solid #e6e6e6; width: 100%; ">
      <top></top>
    </el-header>
    <el-main class="el-tm-main" style="width: 100%;height:calc(100% - 68px);overflow:hidden;">
      <el-card style="height:100%;overflow-y:scroll;overflow-x:hidden;background:rgb(245,249,250);">
        <router-view></router-view>
      </el-card>
    </el-main>
  </el-container>
</template>

<script >
import 'element-ui/lib/theme-chalk/display.css'
const TopNav = () =>
  import(/* webpackChunkName: "TopNav" */ '@/components/nav/topNav')
export default {
  name: 'tm',
  components: {
    top: TopNav
  },
  data() {
    return {
      itemList: []
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
