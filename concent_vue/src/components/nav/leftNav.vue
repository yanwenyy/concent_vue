<template>
  <!--左侧导航-->
  <aside :class="{showSidebar:!this.$store.state.collapsed}">
    <!--导航菜单-->
    <el-menu
      class="left-tab"
      :collapse="!this.$store.state.collapsed"
      :default-active="this.$route.path"
      :unique-opened="true"
      :router="useroute"
      ref="leftNavigation"
    >
      <template v-for="(route) in this.$store.state.route[1].children">
        <!-- 注意：这里就是topNavState状态作用之处，当该值与router的home路由的path相等时加载相应菜单组 -->
        <template v-if="route.path === $store.state.topNavState">
          <template v-for="(item,index) in route.children">

            <!-- 非叶子节点 -->
            <el-submenu :index="index+''" v-bind:key="index" v-if="!item.leaf&&item.menushow">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <template v-for="(term) in item.children">
                <el-menu-item
                  :class="$route.path.indexOf(term.path) === 0 ?'is-active':''"
                  :index="term.path"
                  :key="term.path"
                  v-if="term.menushow"
                >
                  <i :class="term.iconCls"></i>
                  <span slot="title">{{term.name}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
            <!-- 叶子节点 -->
            <el-menu-item
              :class="$route.path===item.path?'is-active':''"
              :index="item.path"
              v-bind:key="index"
              v-else-if="item.leaf&&item.menushow"
            >
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
    <!--展开折叠开关-->
    <div @click.prevent="collapse" class="collapse-bar">
      <i class="el-icon-more" title="收起" v-show="this.$store.state.collapsed"></i>
      <i class="el-icon-more-outline" title="展开" v-show="!this.$store.state.collapsed"></i>
    </div>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      useroute: true
    }
  },

  methods: {
    // 折叠导航栏
    collapse: function() {
      this.$store.state.collapsed = !this.$store.state.collapsed
    },
    // 左侧导航栏根据当前路径默认打开子菜单（如果当前是二级菜单，则父级子菜单默认打开）
    defaultLeftNavOpened() {
      // 导航折叠时不打开
      if (this.$store.state.collapsed) {
        let curpath = this.$route.path // 获取当前路由
        this.$store.state.route.forEach(router => {
          if (router.path === '/tlm') {
            router.children.forEach(toprouter => {
              if (toprouter.path === this.$store.state.topNavState) {
                toprouter.children.forEach((leftrouter, index) => {
                  if (leftrouter.children) {
                    leftrouter.children.forEach(subleftrouter => {
                      if (
                        curpath.indexOf(subleftrouter.path) === 0 &&
                        this.$refs['leftNavigation']
                      ) {
                        this.$refs['leftNavigation'].open(index) // 打开子菜单
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    }
  },
  watch: {
    $route: function(to, from) {
      // 路由改变时执行
      // console.info("to.path:" + to.path);
    }
  },
  mounted() {
    this.defaultLeftNavOpened()
  }
}
</script>
<style scoped>
  .left-tab{
    max-height: calc(100vh - 168px)!important;
    /*margin-bottom: 60px;*/
    overflow: auto;
  }

  >>>.el-submenu__title{
    padding: 0 10px!important;
    font-size: 13px!important;
  }
  >>>.el-menu-item{
    padding: 0 0 0 20px!important;
    min-width: 0;
    font-size: 13px!important;
    height: 40px!important;
    line-height: 40px!important;
  }
  .el-menu {
    border-right: none;
  }
  .collapse-bar {
    width: 100%;
    background-color: #fff;
    border-color: #e0e0e0;
    border-style: solid;
    border-width: 0 0 1px;
    text-align: center;
    padding: 3px 0;
    height: 40px;
    /*line-height: 40px;*/
    vertical-align: top;
    position: absolute;
    bottom:0;
  }
  /*.collapse-bar::before {*/
    /*content: '';*/
    /*display: block;*/
    /*height: 0;*/
    /*border-top: 1px solid;*/
    /*border-color: inherit;*/
    /*position: absolute;*/
    /*left: 15px;*/
    /*right: 15px;*/
    /*top: 13px;*/
  /*}*/
  .collapse-bar i {
    /*border-radius: 100%;*/
    /*border-color: #bbb;*/
    /*color: #aaa;*/
    /*background-color: #fff;*/
    position: relative;
    /*border: 1px solid;*/
    cursor: pointer;
    font-size: 28px;
    color:#666;
  }
  .left-tab>li{
    padding-left: 0!important;
  }
</style>
