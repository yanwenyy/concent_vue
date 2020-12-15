<template>
  <el-container style="width: 100%; height: 100%;">
    <el-header style="border-bottom: 1px solid #e6e6e6; width:100%;margin:0;padding:0;">
      <top></top>
    </el-header>
    <div :class="el_container_style" style="width: 100%; height: calc(100% - 60px);margin-top:5px;">
      <div style="width:100%;height:60px;box-sizing:border-box;padding:0 20px;">
        <el-menu
        :default-active="defaultActiveIndex"
        :router="true"
        @select="handleSelect"
        class="el-menu-demo"
        mode="horizontal"
        style="float: left;"
      >
        <!-- 上下布局 -->
        <template v-for="(route) in this.$store.state.route[0].children">
          <el-menu-item
            :index="route.path"
            style="font-size:15px;padding:0 6px;font-weight: 1000;"
            v-bind:key="route.name"
            v-if="route.menushow"
          >{{route.name}}</el-menu-item>
        </template>

        <!-- 上左右布局 -->
       <template v-for="(route) in this.$store.state.route[1].children">
          <el-menu-item
            class="biaoqian"
            :index="route.path"
            style="font-size:20px;padding:0 6px;font-weight: 1000; width: 177px;height: 60px;text-align: center;"
            v-bind:key="route.name"
            v-if="route.menushow"
          >{{route.name}}</el-menu-item>
        </template>
      </el-menu>
      </div>
      <div  style="position:relatve;width:100%;height:100%;background:#F7F9FA;;box-sizing:border-box;padding:20px 0 100px;">

        <p style="width: auto;
        position:absolute;
        bottom:0;
        left:33%;
height: 10px;
font-size: 15px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #C0C4CC;
line-height: 10px;">中国铁建股份有限公司 版权所有 建设监管：中国铁建股份有限公司 技术维护：中铁建网络信息科技有限公司</p>
        <div style="width:90%;height: 100%;margin:0px auto;background:white;display:flex;">

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
      <el-scrollbar :class="tlm_height" id="el-main" wrap-class="default-scrollbar__wrap" style="
    height: calc(100% - 60px);">
        <el-main class="el-tlm-main" style="width: 100%; height: 100%;">
          <router-view></router-view>



        </el-main>
  <div class="block">
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="15"
      style="flex:none;">
    </el-pagination> -->

<breadcrumb v-if="breadcrumb" style="flex:none;">
 </breadcrumb>
</div>
      </el-scrollbar>

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
      defaultActiveIndex:'0'
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
.el_container_style_true #el-leftnav-scrollbar,
.el_container_style_true #el-leftnav {
  width: 200px;
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
.el_container_style_true #el-main .el-scrollbar__view{
height: calc(100% - 18px);
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
  margin: 5px 0 0px 30px;
  position: fixed;
}
.block{
  float: left;
  position: fixed;
  width: 75%;
}
.el-pagination{
  float: right;
  margin: 25px 0px 0 0px;
}
.el-pagination .el-select .el-input .el-input__inner{
  height: auto;
}
</style>
