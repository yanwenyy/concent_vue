import axios from 'axios'
import Vue from 'vue'
// import qs from 'qs'
// axios 全局配置

Vue.prototype.$http = axios
axios.defaults.timeout = 60000 // 请求超时
axios.defaults.withCredentials = false
axios.defaults.baseURL = 'http://192.168.70.155:8090'

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
    if (config.useJson) {
      config.headers = {
        'Content-Type': 'application/json; charset = utf-8'
      }
    } else {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
      if(config.url.indexOf('36.112.155.134')>-1){
        config.headers.authorization='eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiZGV0YWlscyI6eyJzdWIiOiJocnd4fDk4NzgzNyIsInBvc3ROYW1lIjoi5aSE6ZW_IiwicG9zdFBhdGgiOiLkuK3lm73pk4Hlu7rnvZHnu5zkv6Hmga_np5HmioDmnInpmZDlhazlj7giLCJwb3N0Q29kZSI6IjAwMDAxMDAwNTQwMTAwMDc3MDE5ODgwMDM5OTAwMSIsImlkIjoiOTg3ODM3IiwidXNlck5hbWUiOiLmnLHlha0iLCJwb3N0cyI6W3sidHlwZSI6MywiaWQiOjE0MzI0NywibmFtZSI6IumDqOmVvyIsImNvZGUiOiIwMDAwMTAwMDU0NzcwMDg5OTAwMSIsIm9yZGVyIjoxLCJtYWluUG9zaXRpb24iOmZhbHNlLCJwcm92aWRlcklkIjoiaHJ3eCIsInBhdGgiOiLnvZHkv6Hnp5HmioDlm73kv6Hlronpgq7pg6jplb8iLCJ6dXpoaWJpYW5tYSI6IjAwMDAxMDAwNTQ3NzAwODk5MDAxIiwiamlhbmNoZW5nIjoi6YOo6ZW_IiwienV6aGlsdWppbmciOiLkuK3lm73pk4Hlu7rnvZHnu5zkv6Hmga_np5HmioDmnInpmZDlhazlj7gifSx7InR5cGUiOjMsImlkIjoxNDMxMjgsIm5hbWUiOiLlvoXliIbphY3kurrlkZgiLCJjb2RlIjoiMDAwMDEwMDA1NDAyMDAwNzcwMDc5OTAwMSIsIm9yZGVyIjo0MSwibWFpblBvc2l0aW9uIjpmYWxzZSwicHJvdmlkZXJJZCI6Imhyd3giLCJwYXRoIjoi572R5L-h56eR5oqA5Lq65Yqb6LWE5rqQ6YOo5b6F5YiG6YWN5Lq65ZGYIiwienV6aGliaWFubWEiOiIwMDAwMTAwMDU0MDIwMDA3NzAwNzk5MDAxIiwiamlhbmNoZW5nIjoi5b6F5YiG6YWN5Lq65ZGYIiwienV6aGlsdWppbmciOiLkuK3lm73pk4Hlu7rnvZHnu5zkv6Hmga_np5HmioDmnInpmZDlhazlj7gifSx7InR5cGUiOjMsImlkIjoxMTY0NTY3LCJuYW1lIjoi5aSE6ZW_IiwiY29kZSI6IjAwMDAxMDAwNTQwMTAwMDc3MDE5ODgwMDM5OTAwMSIsIm9yZGVyIjoxLCJtYWluUG9zaXRpb24iOnRydWUsInByb3ZpZGVySWQiOiJocnd4IiwicGF0aCI6Iue9keS_oeenkeaKgOS_oeaBr-WMlueuoeeQhumDqOWfuuehgOW5s-WPsOWkhOWkhOmVvyIsInp1emhpYmlhbm1hIjoiMDAwMDEwMDA1NDAxMDAwNzcwMTk4ODAwMzk5MDAxIiwiamlhbmNoZW5nIjoi5aSE6ZW_IiwienV6aGlsdWppbmciOiLkuK3lm73pk4Hlu7rnvZHnu5zkv6Hmga_np5HmioDmnInpmZDlhazlj7gifV19LCJleHAiOjE2MDc1MjU1NTN9.EH43nB3FiHEeGEmVDM7hOaQ6X4RJ9U7s8pxfi9LrYRpFGQrUU_WxZh-FSRb9Lpvhcm272ZTIBaX3iX2u6eXuXw'
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
