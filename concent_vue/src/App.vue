<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { permissionRouter } from '@/assets/js/permission.js'

export default {
  name: 'App',

  created() {
    // 拥有登录令牌情况获取路由权限

    permissionRouter()

    // 生成秘钥
    // if (!sessionStorage.getItem('k')) {
    //   sessionStorage.setItem('k', this.$utils.randomstring(12))
    // }
    // this.$store.state.browser = this.$utils.browser()
  }
}
</script>
