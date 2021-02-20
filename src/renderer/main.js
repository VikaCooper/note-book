import Vue from 'vue';

// 引入axios
import axios from 'axios';

// 引入antdv组件库
import Antd from 'ant-design-vue';
import './theme/theme.less';

// 注入全局过滤器
import './utils/filters';

// 引入nedb数据库
import db from './datastore';


import App from './App';
import router from './router';
import store from './store';

Vue.use(Antd);
Vue.prototype.$db = db;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
