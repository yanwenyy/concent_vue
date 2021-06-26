<template>
  <div>
    <form :action="url" ref="itForm" method="post" id="itForm" style="display: none" target="_top">
      <input id="paramsInfo" ref="paramsInfo" type="hidden" name="paramsInfo">
      <input type="hidden" v-for="(item,i) in paramMap" :value="item" :name="i" >
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url:'',
        paramMap:{},
      }
    },
    methods: {
      parseObj(obj){
        if(!obj||obj=="undefined" ||obj==undefined)return "";
        return obj;
      }
    },
    mounted() {
      if(window.performance.navigation.type==2&&sessionStorage.getItem('fromReportJump')=='true'){
        this.$router.push({
          // path: "/manage/xinqian/list",
          path:sessionStorage.getItem("bbPath")
        });
        sessionStorage.setItem("fromReportJump",false)
      }else{
        sessionStorage.setItem("fromReportJump",true)
        this.$http
          .post(
            "/api/contract/ReportManage/loadReportPage",
            {"resid":this.$route.query.resid}
          )
          .then((res) => {
            this.url=res.data.data.url;
            this.paramMap = res.data.data;
            console.log(this.paramMap)
            return new Promise((resolve, reject) => {
              /* 设置报表参数 */
              var params = new Array();

              var param = new Object();
              param.name = "R1USERID";
              param.value = this.paramMap.R1USERID;
              param.displayValue = this.paramMap.R1USERID;
              param.stanbyValue = this.paramMap.R1USERID;
              params[0] = param;
              for(var n in this.paramMap){
                var val=this.paramMap[n];
                var obj = new Object();
                obj.name = n;
                obj.value = this.parseObj(val);
                obj.displayValue = this.parseObj(val);
                obj.stanbyValue = this.parseObj(val);
                params.push(obj);
              }
              this.$refs.paramsInfo.value = JSON.stringify(params);
                resolve("1111")
            }).then((data)=>{
              this.$refs.itForm.submit();
            });
          });
      }
    },
    beforeRouteEnter(to, from, next) {
      console.log(from, 'beforeRouteEnter');
      if(from.path!='/reportForm/list'){
        sessionStorage.setItem("bbPath",from.path);
      }
      next(vm => {
        // vm相当于上面的this
        vm.fromPage = from.path;
      });
    },
  };
</script>
<style scoped>
  .iframe-body{
    width: 100%;
    height: 100%;
  }
</style>
