import App from './App.vue'
import Vue from 'vue'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import VueRouter from 'vue-router'
import router from "./router.js";
import VueResource from 'vue-resource'
import Moment from 'moment'
import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.use(VueRouter);
Vue.use(VueResource);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
Vue.filter('dateFormat',function (dateStr,pattern="YYYY-MM-DD HH:mm:ss") {
   return Moment(dateStr).format(pattern)
})
var vm = new Vue({
    el:'#app',
    data:{
    },
    methods:{},
    render:c => c(App),
    router,
})