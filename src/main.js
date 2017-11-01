import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-default/index.css';    // 默认主题
 import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import moment from 'moment'
//import VueMoment from 'vue-moment'

import $ from 'jquery'
import VueResource from 'vue-resource'

window.$ = $;
Vue.use(VueResource);
//Vue.use(VueMoment)
Vue.http.options.emulateJSON = true;

Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    return moment(value).format(formatString);
});

Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');