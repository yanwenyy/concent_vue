<template>
  <div id="app">
    <router-view v-if="!noView"></router-view>
    <div class="no-view" v-if="noView">加载中...</div>
  </div>
</template>

<script>
import { permissionRouter } from '@/assets/js/permission.js'

export default {
  name: 'App',
  data(){
    return{
      origin:'',
      noView:true,
      token:'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiZGV0YWlscyI6eyJzdWIiOiJocnwzNTk4NTYiLCJwb3N0TmFtZSI6IuW8gOWPkee7j-eQhiIsInBvc3RQYXRoIjoi5YyX5Lqs5Lit6L2v5Zu96ZmF5L-h5oGv5oqA5pyv5pyJ6ZmQ5YWs5Y-4IiwicG9zdENvZGUiOiIwMDAwMTAwMDAxMDAwMTA3NzAwMTk5MDAxIiwiaWQiOiIzNTk4NTYiLCJ1c2VyTmFtZSI6IuWImOm5jyIsInBvc3RzIjpbeyJ0eXBlIjozLCJpZCI6Mjg2OTcyLCJuYW1lIjoi5byA5Y-R57uP55CGIiwiY29kZSI6IjAwMDAxMDAwMDEwMDAxMDc3MDAxOTkwMDEiLCJvcmRlciI6MSwibWFpblBvc2l0aW9uIjp0cnVlLCJwcm92aWRlcklkIjoiaHIiLCJwYXRoIjoi5oC76YOo5YyX5Lqs5Lit6L2v5Zu96ZmF5L-h5oGv5oqA5pyv5pyJ6ZmQ5YWs5Y-45byA5Y-R6YOo5byA5Y-R57uP55CGIiwienV6aGliaWFubWEiOiIwMDAwMTAwMDAxMDAwMTA3NzAwMTk5MDAxIiwiamlhbmNoZW5nIjoi5byA5Y-R57uP55CGIiwienV6aGlsdWppbmciOiLljJfkuqzkuK3ova_lm73pmYXkv6Hmga_mioDmnK_mnInpmZDlhazlj7gifV19LCJleHAiOjE2MjM0MDkxOTd9.trspIvqhDF2jnR0O7TKAZEvPQGTFlOzfYXnekZsTZ4HKpTtkbuGbWjz4wDJT6o6K2tg-jJH1pp5uNCwRcG4w4A'
    }
  },
  beforeCreate(){
    // window.addEventListener('message',function(e){
    //   // console.log(e)//子页面接收参数
    //   sessionStorage.setItem("token",e.data);
    //   this.origin=e.origin;
    // })
  },
  created() {
    // 拥有登录令牌情况获取路由权限
    // if(self==top){
    //   sessionStorage.setItem("token",this.GetQueryString("token"));
    // }
    // permissionRouter()
    this.getLoad()
    // 生成秘钥
    // if (!sessionStorage.getItem('k')) {
    //   sessionStorage.setItem('k', this.$utils.randomstring(12))
    // }
    // this.$store.state.browser = this.$utils.browser()
  },
  mounted(){
    this.getLoad()
    // console.log(this.origin)
    // if(this.origin.indexOf("localhost")!=-1){
    //   sessionStorage.setItem("token",this.GetQueryString("token"));
    // }
  },
  methods: {
    getLoad(){
      var loading,that=this;
      return new Promise((resolve, reject) => {
        function GetQueryString(name){
          var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if(r!=null)return  unescape(r[2]); return null;
        }
        // loading = this.$loading({
        //   lock: true,
        //   text: '加载中',
        //   spinner: 'el-icon-loading',
        //   background:'transparent',
        // });
        window.addEventListener('message',function(e){
          console.log(e)//子页面接收参数
          // sessionStorage.setItem("token",self!=top?e.data:GetQueryString("token"));
          sessionStorage.setItem("token",self!=top?e.data:that.token);
          resolve("1111")
        })
      }).then((data)=>{
        console.log(data)
        // loading.close();
        that.noView=false;
        permissionRouter()
      });
    },
    //获取url的参数
    GetQueryString(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)return  unescape(r[2]); return null;
    },
    //获取iframe的参数
    geturl(name) {
      var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
      var arr = window.parent.document.getElementById("manage").contentWindow.location.search.match(reg);
      if (arr != null) {
        return decodeURI(arr[0].substring(arr[0].search("=") + 1));
      }
      return "";
    }
  }
}
</script>
<style scoped>
  .no-view{
    text-align: center;
    color: #409EFF;
    margin-top: 45vh;
  }
</style>
