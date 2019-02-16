//配置http拦截
import axios from 'axios'
import router from './router/index'
import store from './store/index'
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:8080'
// http request 请求拦截器
console.log(axios.interceptors.request.use)
axios.interceptors.request.use(
  // 在发送请求之前给请求头配置taken
  config => {
    if (store.state.uid) {
      config.headers.Authorization = `token ${store.state.uid}`
    }
    // return config
  },
  err => {
    console.log(22)
    return Promise.reject(err)
  },
)
// http response 响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(loginout)         
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path },
            })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  },
)
export default axios

