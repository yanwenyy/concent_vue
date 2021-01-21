<template>
  <el-container style="width: 100%; height: 100%;">
    <el-header style="border-bottom: 1px solid #e6e6e6; width:100%;margin:0;padding:0;">
      <top></top>
    </el-header>
    <div :class="el_container_style" style="width: 100%; height: calc(100% - 68px);margin-top:8px;">
      <div style="width:100%;height:40px;box-sizing:border-box;">
        <el-menu
        :default-active="defaultActiveIndex"
        :router="true"
        @select="handleSelect"
        class="el-menu-demo"
        mode="horizontal"
        style=""
      >
        <!-- 上下布局 -->
        <template v-for="(route) in this.$store.state.route[0].children">
          <el-menu-item
            :index="route.path"
            v-bind:key="route.name"
            v-if="route.menushow"
          >{{route.name}}</el-menu-item>
        </template>

        <!-- 上左右布局 -->
       <template v-for="(route) in this.$store.state.route[1].children">
          <el-menu-item
            class="biaoqian"
            :index="route.path"
            style="font-size:20px;padding:0 6px;font-weight: 1000; width: 177px;height: 45px;line-height: 45px;text-align: center;"
            v-bind:key="route.name"
            v-if="route.menushow"
          >{{route.name}}</el-menu-item>
        </template>
      </el-menu>
      </div>
      <div  style="position:relatve;width:100%;height:100%;background:#F7F9FA;;box-sizing:border-box;padding:1px 0 60px;">
        <div style="height:calc(100%);background:white;display:flex;">
      <el-scrollbar
        :class="tlm_height"
        id="el-leftnav-scrollbar"
        style="border-right: 1px solid #e6e6e6;"
        wrap-class="default-scrollbar__wrap"
      >
        <el-aside id="el-leftnav" style="height: 100%; overflow-y: hidden;" width>
          <sidebar></sidebar>
        </el-aside>
      </el-scrollbar>
          <el-main class="el-tlm-main" style="width: 80%; height: 100%;padding-top: 10px !important; padding-bottom: 10px !important;">
            <router-view></router-view>
            <div class="block">
              <breadcrumb v-if="breadcrumb" style="flex:none;">
              </breadcrumb>
            </div>
          </el-main>
      <!--<el-scrollbar :class="tlm_height" id="el-main" wrap-class="default-scrollbar__wrap" style=" height: 100%;">-->
        <!--<el-main class="el-tlm-main" style="width: 100%; height: 100%;">-->
          <!--<router-view></router-view>-->
          <!--<div class="block">-->
            <!--<breadcrumb v-if="breadcrumb" style="flex:none;">-->
            <!--</breadcrumb>-->
          <!--</div>-->
        <!--</el-main>-->

      <!--</el-scrollbar>-->

      </div>
      </div>
    </div>

  </el-container>
</template>

<script>
export default {
  name: 'tlm',
  components: {
    top: () =>
      import(/* webpackChunkName: "TopNav" */ '@/components/nav/topNav'),
    sidebar: () =>
      import(/* webpackChunkName: "TopNav" */ '@/components/nav/leftNav'),
    breadcrumb: () =>
      import(/* webpackChunkName: "breadcrumb" */ '@/components/nav/breadcrumb')
  },
  data() {
    return {
      el_container_style: 'el_container_style_' + this.$store.state.collapsed,
      tlm_height: 'tlm_height',
      breadcrumb: false,
      defaultActiveIndex:'/manage'
    }
  },
  mounted() {
    if (this.$store.state.browser === 'FF') {
      this.tlm_height = this.tlm_height + '_' + this.$store.state.browser
    }
  },
  methods: {
    handleSelect(){},
    collapse() {
      if (this.el_container_style === 'el_container_style_true') {
        this.el_container_style = 'el_container_style_false'
      } else if (this.el_container_style === 'el_container_style_false') {
        this.el_container_style = 'el_container_style_true'
      }
    }
  },
  computed: {
    listenCollapsed() {
      return this.$store.state.collapsed
    }
  },
  watch: {
    listenCollapsed: function(old, newd) {
      this.collapse()
    },
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path.split('').filter(i => i === '/').length === 2) {
          // 默认第一层不显示breadcrumb
          this.breadcrumb = false
        } else {
          this.breadcrumb = true
        }
      }
    }
  }
}
</script>

<style>
  .el-main{
    padding: 10px!important;
  }
  .el-menu-demo{
    margin-left: 40px!important;
  }
  .el-menu-demo>li{
    height: 40px!important;
    line-height: 40px!important;
    font-size: 14px!important;
    font-weight: normal;
    width: auto!important;
    padding: 0 20px!important;
  }
.el_container_style_true #el-leftnav-scrollbar,
.el_container_style_true #el-leftnav {
  position: relative;
  width: 160px;
  height: calc(100vh - 108px)!important;
  transition: width 0.5s;
  -moz-transition: width 0.5s;
  -webkit-transition: width 0.5s;
  -o-transition: width 0.5s;
}
.el_container_style_true #el-main {
  width: calc(100% - 200px);
  transition: width 0.5s;
  -moz-transition: width 0.5s;
  -webkit-transition: width 0.5s;
  -o-transition: width 0.5s;
}

.el_container_style_false #el-leftnav-scrollbar,
.el_container_style_false #el-leftnav {
  width: 64px;
  transition: width 0.3s;
  -moz-transition: width 0.3s;
  -webkit-transition: width 0.3s;
  -o-transition: width 0.3s;
}
.el_container_style_false #el-main {
  width: calc(100% - 64px);
  transition: width 0.3s;
  -moz-transition: width 0.3s;
  -webkit-transition: width 0.3s;
  -o-transition: width 0.3s;
}
.tlm_height {
  height: 100%;
}
.tlm_height_FF {
  height: calc(100%);
}
.el-breadcrumb{
  margin: 15px 0 0px 0px;
  position: fixed;
}
.block{

  position: fixed;
}
.el-pagination{
  float: right;
  margin: 10px 0px 0 0px;
}
.el-pagination .el-select .el-input .el-input__inner{
  height: auto;
  margin: 1px;
}
</style>
