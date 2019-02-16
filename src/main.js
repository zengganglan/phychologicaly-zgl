// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import $ from 'jquery'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
// import './assets/bootstrap/css/bootstrap.css';
// import './assets/bootstrap/js/bootstrap.js';
// ./layui/css/layui.css
// ./layui/layui.js //提示：如果是采用非模块化方式（最下面有讲解），此处可换成：./layui/layui.all.js
      
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
 import axios from './http'
Vue.use(ElementUI);
import router from './router/index'
import store from './store/index'
//引入公共样式文件
import "./assets/css/common.css"
import "./assets/css/iconfont.css"
//axios挂载在vue上面
Vue.prototype.axios = axios;
//路由
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  //如果跳转页面存在uid表示登陆过 可以跳转，否则不能跳转
  var whitelist = ["/login","/register","/getUserPassword"]
  if (store.getters.uid) {
    next()
  }else{
      if (whitelist.indexOf(to.path)!== -1) {
         next()
      }else{
        //执行的时候uid还没设置上,刷新时候uid才放到数据库才能正确判断。当第一次登陆应该设置cokie跳转本应该可以跳转可是路由监测还没有存在uid,因为cookie.js,没有很快获取到放到数据，刚开始登陆的时候需要我们手动设置
        next('/login')
        alert("没有登陆，请去登陆")
        console.log(from,to)
      }
  }
})
console.log(zgl)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})

