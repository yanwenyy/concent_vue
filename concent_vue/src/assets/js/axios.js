import axios from 'axios'
import Vue from 'vue'
// import qs from 'qs'
// axios 全局配置

Vue.prototype.$http = axios
axios.defaults.timeout = 60000 // 请求超时
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://0.0.0.0:8116'
// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading() {
  loading = Vue.prototype.$loading({
    lock: true,
    text: '努力加载中...',
    // background: 'rgba(0,0,0,0.5)',
    target: document.querySelector('.loading-area') // 设置加载动画区域
  })
}

function endLoading() {
  loading.close()
}

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

function hideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

const fetch = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        // 替换 all 字段 为全部
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// axios拦截器
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    if (config.isLoading !== false) {
      // 如果配置了isLoading: false，则不显示loading
      showFullScreenLoading()
    }
    // 每次
    if (config.method === 'post') {
      // config.data = qs.stringify(config.data, { indices: false })
    }
    return config
  },
  function(error) {
    hideFullScreenLoading()
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  function(response) {
    hideFullScreenLoading()
    // 请求正常返回，更新token
    // todo 后续去掉第二个判断

    if (response.headers.authorization && response.status === 200) {
      // sessionStorage.setItem('a', response.headers.authorization)
    }
    // if (response.data.code === 0 && !response.data.data) {
    //   response.data.data = {}
    // }
    // if (response.data.code === 0 && response.data.data === null) {
    //   response.data.data.item = []
    // }
    // 令牌失效，清除本地登录信息，重新登录
    if (response.data.code === 1) {
      Vue.prototype.$message.error(response.data.msg)
      sessionStorage.clear()
      setTimeout(function() {
        window.location.href = localStorage.getItem('outUrl')
      }, 3000)
    }
    if (response.data.code === -1) {
      Vue.prototype.$message.error('操作失败')
    }
    if (response.data.code === -2) {
      Vue.prototype.$message.error(response.data.msg)
    }
    return response
  },
  function(error) {
    hideFullScreenLoading()
    // Do something with response error
    //
    if (error.response.status === 404) {
      Vue.prototype.$message.error('404 请求的地址没有找到')
    } else if (error.response.status === 500) {
      Vue.prototype.$message.error('500 网络异常')
    }
    return Promise.reject(error)
  }
)
export { fetch, axios }
