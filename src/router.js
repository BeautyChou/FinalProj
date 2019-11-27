import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from './components/tabbar/HomeContainer.vue'
import Member from './components/tabbar/MemberContainer.vue'
import NewsList from "./components/news/NewsList.vue";
import NewsInfo from "./components/news/newsinfo.vue"
import WeixinList from "./components/weixinhightlight/weixinList.vue";
import Weixininfo from "./components/weixinhightlight/weixininfo.vue";
import userInfo from "./components/myInfo/userInfo.vue";
Vue.use(VueRouter);

var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component: Home},
        {path:'/member',component: Member},
        {path:'/home/newslist',component: NewsList},
        {path:'/home/newsinfo/:uniquekey',component: NewsInfo},
        {path:'/home/weixinList',component: WeixinList},
        {path:'/home/weixininfo/:id',component: Weixininfo},
        {path:'/member/users/:username',component:userInfo}
    ],
    linkActiveClass:'mui-active', //覆盖默认的路由高亮的类 默认叫 router-link-active

})


export default router