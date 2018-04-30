import Vue from 'vue';
import App from './views/app';
import VueRouter from 'vue-router';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$http=axios;

Vue.use(ElementUI);
//注册路由插件
Vue.use(VueRouter);

new Vue({
	el: '#app',
	router,//将路由配置添加到vue实例中
	render: h => h(App)
});