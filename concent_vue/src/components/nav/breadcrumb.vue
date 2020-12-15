<template>
  <div v-show="!ifDetail">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <template v-for="(c,index) in this.breadcrumbs">
          <el-breadcrumb-item :to="{ path: c.path }" v-bind:key="index" v-if="c.leaf">{{c.name}}</el-breadcrumb-item>
          <el-breadcrumb-item v-bind:key="index" v-else>{{c.name}}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [],
      ifDetail:false
    }
  },
  methods: {
    getbreadcrumb(items) {
      items.filter(item => {
        if (this.$route.path.indexOf(item.path) === 0) {
          this.breadcrumbs.push(item)
        }
        if (item.children && item.children.length) {
          this.getbreadcrumb(item.children)
        }
      })
    }
  },
  mounted() {
    this.breadcrumbs = []
    this.getbreadcrumb(this.$store.state.route[1].children)
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.ifDetail=val.path.indexOf("detail")!=-1
        this.breadcrumbs = []
        this.getbreadcrumb(this.$store.state.route[1].children);
      },
      deep: true
    }
  }
}
</script>
