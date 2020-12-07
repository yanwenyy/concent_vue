import router from '../../router'
import Vue from 'vue'
import data from '../../../static/jsonData/nav.js'

const _import = file => () =>
    import('@/views' + file)
const routevue = () =>
    import(/* webpackChunkName: "routevue" */ '@/components/router.vue')
    

var getRouter // 用来获取后台拿到的路由
let zcsbRoute = {
  name: 'tm',
  data: [{
    'name': '首页',
    'path': '/homepage',
    'component': '/welcome',
    'iconCls': 'el-icon-setting',
    'menushow': true,
    'leaf': true,
    'defaultpage': false
  }
  ]
}
export function permissionRouter() {
  // 服务器路由 || 本地路由
  console.log(data)
  var arr = []
  var string = ''
  getRouter = data.data//本地路由
  routerGo()
  // Vue.prototype.$http.post('/api/resource/getRoute').then(res => {
  //   getRouter = res.data.data
  //   getRouter[0] = zcsbRoute
  //   sessionStorage.setItem('a', JSON.stringify(getRouter))
  //   routerGo()
  //   getRouter.forEach(item => {
  //     if (item.name === 'tlm') {
  //       item.data.forEach(item2 => {
  //         item2.children.forEach(item3 => {
  //           if (item3.name === '白名单管理' || item3.name === '资料审核' || item3.name === '投票规则管理' || item3.name === '投票结果动态') {
  //             if (item3.menushow === true) {
  //               arr.push(item3.path)
  //             }
  //           }
  //         })
  //       })
  //     }
  //   })
  //   string = arr.toString()
  //   localStorage.setItem('routerstring', string)
  // })
}

export function getPermission(path, callback) {
  // 获取当前登陆人模块权限
  Vue.prototype.$http
    .post('/api/resource/getUserCompanyPermissionByModule' + path)
    .then(res => {
      localStorage.setItem('permissionArr', JSON.stringify(res.data.data))
      callback()
      console.log(res.data.data)
    })
}

export function getOrgPermission(path, callback) {
  // 获取当前登陆人组织树权限
  Vue.prototype.$http
    .post('/api/resource/getPermissionByModule' + path)
    .then(res => {
      localStorage.setItem('orgPermissionArr', JSON.stringify(res.data.data))
      callback()
    })
}

function routerGo() {
  getRouter.filter(layout => {
    dynamicRoutes.filter(routeLayout => {
      if (layout.name === routeLayout.name) {
        routeLayout.children = filterAsyncRouter(layout.data) // 过滤路由
      }
    })
  })
  router.app.$store.state.route = dynamicRoutes
  router.addRoutes(dynamicRoutes)
  // var path = ''
  // if (dynamicRoutes[0].children && dynamicRoutes[0].children.length) {
  //   path = dynamicRoutes[0].children[0].path
  // } else {
  //   path = dynamicRoutes[1].children[0].path
  // }
  // console.log(window)
  // if (sessionStorage.getItem('a')) {
  //   router.push({ path: path })
  // }
}

function filterAsyncRouter(asyncRouterMap, parentroute) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component && route.component !== '/router') {
      route.component = _import(route.component)
    } else {
      route.component = routevue
    }
    if (
      route.path &&
            route.path.length > 0 &&
            route.path.lastIndexOf('/') < route.path.length - 1
    ) {
      // route.path += '/'
    }
    if (route.defaultpage === true) {
      Vue.set(parentroute, 'redirect', route.path)
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route)
    }
    return true
  })
  return accessedRouters
}

export const dynamicRoutes = [{
  name: 'tm',
  path: '/tm',
  component: () =>
            import(/* webpackChunkName: "Tm" */ '@/components/layout/tm'),
  children: []
},
{
  name: 'tlm',
  path: '/tlm',
  component: () =>
            import(/* webpackChunkName: "Tlm" */ '@/components/layout/tlm'),
  children: []
},
{
  path: '*',
  component: () =>
            import(/* webpackChunkName: "NotFound" */ '@/components/404')
},
{
  name: 'msgtm',
  path: '/msgtm',
  component: () =>
            import(/* webpackChunkName: "Tm" */ '@/components/layout/tm'),
  children: [{
    path: '/msgtm/message',
    component: () =>
                import(/* webpackChunkName: "NotFound" */ '@/components/message')
  }]
}
]
