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
        if(this.$route.path.indexOf(item.path) === 0){
        // console.log(this.$route, '==>', item);
          this.breadcrumbs.push(item)
        }
        if (item.children && item.children.length) {
          this.getbreadcrumb(item.children)
        }
      })
    },
    getUrlsub (href) {
      let index = href.lastIndexOf("\/");
      let str = href.substring(index + 1,href.length);
      return str
    },
  },
  mounted() {
    this.breadcrumbs = []
    this.getbreadcrumb(this.$store.state.route[1].children);
    console.log(this.breadcrumbs)

  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.ifDetail=val.path.indexOf("detail")!=-1||val.path.indexOf("Detail")!=-1||val.path.indexOf("Winning_bidKB")!=-1
        this.breadcrumbs = []
        this.getbreadcrumb(this.$store.state.route[1].children);
      },
      deep: true
    }
  }
}
</script>
