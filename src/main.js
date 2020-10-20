// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'

import axios from 'axios'
axios.defaults.withCredentials=true;//设置跨域
// axios.defaults.headers.post["Content-type"] = "application/x-www-form-urlencoded"//设置请求头
Vue.prototype.$ajax = axios

// 引入的UI库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

// 全局变量
import globals from '@/commonFunction/index'
Vue.prototype.globals = globals


// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入百度地图
// import BaiduMap from 'vue-baidu-map';
// Vue.use(BaiduMap, {
//   /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
//   ak: 'aSvAOxxm2KueTv12DcGLk2UFWHn5XdAD'
// })


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
}).$mount('#app')
