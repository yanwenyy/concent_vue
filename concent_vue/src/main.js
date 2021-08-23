import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import '@/assets/css/gobal.css'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import { getPermission, getOrgPermission } from '@/assets/js/permission.js'
import ElementUI from 'element-ui'
import store from '@/assets/js/store.js'
import '@/assets/js/axios.js'
import utils from '@/assets/js/utils.js'
import moment from 'moment'
import App from './App'
import './assets/icon/iconfont.css'
import router from './router'
import exportXls from './utils/exportXls'
import { handleDownload } from '@/views/manage/download.js'

import { message } from '@/utils/resetMessage.js'
Vue.use(ElementUI)
Vue.prototype.$message = message
// import VueSocketio from 'vue-socket.io'
// import socketio from 'socket.io-client'
/* eslint-disable no-new */
Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$moment = moment
Vue.prototype.$exportXls = exportXls
Vue.prototype.$tableHeight = document.body.clientHeight - 213
Vue.prototype.$getPermission = getPermission
Vue.prototype.$getOrgPermission = getOrgPermission
Vue.prototype.examineReviewMsg='通过';
Vue.prototype.$handleDownload = handleDownload;
if (process.env.NODE_ENV === "development") {
  Vue.prototype.downLoadUrl='/static';
}else {
  Vue.prototype.downLoadUrl='./static';
}
    // var timerOne = window.setInterval(() => {
    //   if (
    //     sessionStorage.getItem("a") &&
    //     sessionStorage.getItem("a") !== undefined
    //   ) {
    //     Vue.use(
    //       new VueSocketio({
    //         debug: true,
    //         connection: "http://119.3.172.122:8081"
    //       })
    //     );
    //     console.log(sessionStorage.getItem("a"));
    //     window.clearInterval(timerOne);
    //   }
    // }, 500);
    // 日期格式化过滤器注册
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD') {
  if (dataStr) {
    return moment(dataStr).format(pattern)
  } else {
    return ''
  }
})
Vue.filter('monthdateformat', function(dataStr, pattern = 'YYYY-MM') {
    if (dataStr) {
        return moment(dataStr).format(pattern)
    } else {
        return ''
    }
})

Vue.filter('formatMoney', function(num) {
    return utils.formatMoney(num, 4)
})
Vue.filter('datetimeformat', function(
    dataStr,
    pattern = 'YYYY-MM-DD HH:mm:ss'
) {
    if (dataStr) {
        return moment(dataStr).format(pattern)
    } else {
        return ''
    }
})
Vue.filter('numberToChinese', function(integer) {
    return utils.numberToChinese(integer)
})
Vue.filter('stateTranslate', function(code) {
    return utils.stateTranslate(code)
})
Vue.filter('datetoMonth', function(date) {
    return utils.datetoMonth(date)
})

// Vue.use(ElementUI)


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    template: '<App/>'
})
