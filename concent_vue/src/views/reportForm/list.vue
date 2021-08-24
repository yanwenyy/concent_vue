<template>
  <div>
    <!--<form :action="url" ref="itForm" method="post" id="itForm" style="display: none" target="nm_iframe">-->
    <form :action="url" ref="itForm" method="post" id="itForm" style="display: none" target="_top">
      <input id="paramsInfo" ref="paramsInfo" type="hidden" name="paramsInfo">
      <input type="hidden" v-for="(item,i) in paramMap" :value="item" :name="i" >
    </form>
    <!--<iframe id="id_iframe" name="nm_iframe" width="100%" height="100%"></iframe>-->
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
        sessionStorage.setItem("fromReportJump",true);
        var v_params={};
        if(this.$route.query['项目ID']){
          v_params={
            "resid":this.$route.query.resid,
            '项目ID':this.$route.query['项目ID'],
            '台账报表用统计项参数':this.$route.query['台账报表用统计项参数'],
            '台账报表用月报年月':this.$route.query['台账报表用月报年月'],
          }
          console.log(v_params)
        }else{
          v_params={
            "resid":this.$route.query.resid
          }
        }
        this.$http
          .post(
            "/api/contract/ReportManage/loadReportPage",
            v_params
            // JSON.stringify(v_params),
            // {useJson: true}
          )
          .then((res) => {
            this.url=res.data.data.url;
            console.log(this.url);
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
  #id_iframe{
    width: 100%;
    height: 100vh;
  }
</style>
