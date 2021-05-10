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
      noView:true
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
          sessionStorage.setItem("token",self!=top?e.data:GetQueryString("token"));
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
