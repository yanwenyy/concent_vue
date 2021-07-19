import Vue from 'vue'
import Router from 'vue-router'
// import { getPermission, getOrgPermission } from '@/assets/js/permission.js'
const App = resolve => require(['../App.vue'], resolve);
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

let Route = new Router({
  // base: 'history',
  routes: [{
    path: '/',
    component: App,
    redirect: '/manage/home/home'
  }]
})
Route.beforeEach(function(to, from, next) {

  // getPermission(to.path)
  // getOrgPermission(to.path)
  // console.log(to.name, to.path)
  // if (to.name === '申报选择') {
  // if (a === '1') {
  // next({
  // path: '/external/reporting/choosetype'
  // })
  // }
  // }
  next()
  // if (from.path === '/crmanage/reporting/list') {
  //   to.meta.keepAlive = false
  // } else {
  //   to.meta.keepAlive = true
  //   // this.$destroy()
  // }
})
export default Route
