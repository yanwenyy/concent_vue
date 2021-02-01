<template>
  <el-row class="heaaderclass">
    <el-col :span="6" style="text-align: left;">
     &nbsp;
    </el-col>
    <!-- 注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
    <el-col :span="16">
      <!-- <el-menu
        :default-active="defaultActiveIndex"
        :router="true"
        @select="handleSelect"
        class="el-menu-demo"
        mode="horizontal"
        style=""
      > -->
        <!-- 上下布局 -->
        <!-- <template v-for="route in this.$store.state.route[0].children">
          <el-menu-item
            :index="route.path"
            style="font-size:13px;padding:0 6px;"
            v-bind:key="route.name"
            v-if="route.menushow&&route.name!=='消息中心'"
          >{{route.name}}</el-menu-item>
        </template> -->

        <!-- 上左右布局 -->
        <!-- <template v-for="(route) in this.$store.state.route[1].children">
          <el-menu-item
            :index="route.path"
            style="font-size:13px;padding:0 6px;"
            v-bind:key="route.name"
            v-if="route.menushow"
          >{{route.name}}</el-menu-item>
        </template>
      </el-menu> -->
    </el-col>
    <div class="inline-block userName-div">
      <el-dropdown>
        <span class="el-dropdown-link" style="cursor: pointer;">
          <i class="iconfont icon-user"></i>
          <el-badge class="item" is-dot v-if="num>0">{{this.username}}</el-badge>
          <span v-if="num===0">{{this.username}}</span>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!--<el-dropdown-item @click.native="msg" divided>-->
            <!--消息-->
            <!--<el-badge :max="10" :value="num" class="item" v-if="num>0"></el-badge>-->
          <!--</el-dropdown-item>-->
          <!--<el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-row>
</template>
<script>
export default {
  name: 'top-nav',
  data() {
    return {
      userdata: {},
      username: '',
      defaultActiveIndex: '',
      timerOne: '',
      outurl: ''
    }
  },
  // sockets: {
  //   connect: function(data) {
  //     // 这里是监听connect事件
  //     this.id = this.$socket.id

  //     console.log('连接上了')
  //     console.log(data)
  //   }, // 接收服务端发来的推送
  //   client_msg(data) {
  //     this.$notify({
  //       title: '新消息',
  //       message: data,
  //       type: 'danger',
  //       duration: 0
  //     })
  //     this.getNum()
  //     console.log('data', data) // 接收的消息
  //   },
  //   client_out(data) {
  //     // 弹出消息并弹走
  //     this.$notify({
  //       title: '新消息',
  //       message: 'data',
  //       type: 'error',
  //       duration: 0
  //     })
  //     setTimeout(function() {
  //       window.location.href = 'https://g1openid.crcc.cn'
  //     }, 3000)
  //     // this.num = data
  //     console.log('data', data) // 接收的消息
  //   },
  //   disconnect() {
  //     console.log('断开链接')
  //   }, // 检测socket断开链接
  //   reconnect() {
  //     this.$socket.emit(
  //       'client_msg',
  //       this.userdata.providerId + '|' + this.userdata.userid
  //     )
  //     this.$socket.emit(
  //       'client_out',
  //       this.userdata.providerId + '|' + this.userdata.userid
  //     )
  //     console.log('重新链接')
  //   }
  // },
  computed: {
    num() {
      // console.log(this.$store.state.num)
      return this.$store.state.num
    }
  },
  created() {
    this.fetchNavData()
  },

  methods: {
    getAlert() {
      let _self = this
      this.$http
        .post('/api/contract/resource/getAlert', {}, { isLoading: false })
        .then(res => {
          if (res.data.code === 2) {
            // this.$notify({
            //   title: '新消息',
            //   message: res.data.msg,
            //   type: 'error',
            //   duration: 0
            // })
            this.getNum()
          } else if (res.data.code === 3) {
            // this.$notify({
            //   title: '新消息',
            //   message: res.data.msg,
            //   type: 'error',
            //   duration: 0
            // })
            setTimeout(function() {
              window.location.href = _self.outurl
            }, 3000)
          }
        })
    },
    getNum() {
      // this.$http
      //   .post('/api/contract/resource/getMsgNum', {}, { isLoading: false })
      //   .then(res => {
      //     if (res.data.code === 0) {
      //       // console.log(res.data)
      //       this.$store.state.num = res.data.data
      //     }
      //   })
    },
    msg() {
      this.$router.push({ path: '/msgtm/message' })
    },
    handleCommand(url) {
      alert(url)
      this.$router.push(url) // 用go刷新
    },
    handleSelect(index) {
      this.defaultActiveIndex = index
    },

    fetchNavData() {
      // 初始化菜单激活项
      this.defaultActiveIndex = '/' + this.$route.path.slice(1, -1) + '/'
      this.$store.state.topNavState = '/' + this.$route.path.split('/')[1]
    },
    logout() {
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = this.outurl
    }
  },
  mounted() {
    // this.$http.post('/api/contract/resource/getConfig').then(res => {
    //   if (res.data.code === 0) {
    //     this.outurl = res.data.data.logoutUrl;
    //     localStorage.setItem("outUrl",this.outurl);
    //     this.timerOne = window.setInterval(() => {
    //       // this.getAlert()
    //     }, 2000)
    //   }
    // })
    this.$http
      .get(
        '/jsonapi/System/system/v1.0/userinfo',
      )
      .then(res => {
        console.log(res.data.data.username)
      this.username = res.data.data.username
      this.userdata = res.data.data
      localStorage.setItem('username',this.username)
    })
    this.getNum()
  },
  beforeDestroy() {
    clearInterval(this.timerOne)
    this.timerOne = null
  },
  watch: {
    $route: {
      handler: function(to, from) {
        // 路由改变时执行
        this.fetchNavData()
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .userName-div{
    float: right;
    color:#fff;
    margin-right: 20px;
  }
  >>>.el-dropdown{
    color:#fff;
  }
.heaaderclass{
  height: 68px;
  background: url('../../../static/images/daohang.png') no-repeat;
  background-size: 100% 100%;
}
.el-submenu__title .item {
  position: absolute;
  top: -18px;
  right: 28px;
}
.submenu-item .item {
  bottom: 4px;
}
.el-menu--horizontal .el-menu-item,
.el-menu--horizontal .el-menu-item i {
  font-size: 14px;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):hover i {
  color: #66b1ff;
}
</style>
