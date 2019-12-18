<template>
    <div class="app-contianer">

<!--        Header-->
        <mt-header fixed title="">
            <span slot="left" @click="goback" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
            <span slot="right">
                <span v-show="flagshow">城市：{{provin}}　　　明日天气：{{weather.weather}}　　　明日气温：{{weather.temperature}}　　</span>
                <span v-show="!flagshow">城市：{{provin}}　　天气：{{weathertoday.info}}　　气温：{{weathertoday.temperature}}&#8451;　　空气质量：{{weathertoday.aqi}}　{{quality}}</span>
            </span>
        </mt-header>

<!--        Router-view-->
        <transition>
        <router-view></router-view>
        </transition>

<!--        Tabbar-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
        </nav>

    </div>
</template>

<script>
    import { Toast }from 'mint-ui'
    export default {
        data(){
            return {
                src:"",
                flag:false,
                ip:"",
                provin:"",
                weather:"",
                weathertoday:"",
                flagshow:false,
                quality:'',
            }
        },
        created(){
            this.flag=this.$route.path==='/home'?false:true;
        },
        mounted() {
            this.welcome();
            this.ready();
            this.getprovince();
            this.switchflag()
        },
        methods:{
            ready(){
                var cip=returnCitySN["cip"];
                this.ip=cip;
                // console.log(this.ip);
            },
            goback(){
                this.$router.go(-1);
            },
            getprovince(){
                this.$http.get('/provinces/ip/ipNew?ip='+this.ip+'&key=07c8d5ee5ef9e222a581e735d36251d1').then((result)=>{
                    this.provin=result.body.result.City;
                    this.provin=this.provin.substring(0,this.provin.length-1);
                    // console.log(this.provin)
                    this.getweather(result.body.result.City);
                })
            },
            getweather(ppp){
                ppp=ppp.substring(0,ppp.length-1);
                console.log(ppp);
                this.$http.get('/provinces/simpleWeather/query?city='+ppp+'&key=fcc8636fdf9552eefb42b67852b2ea59').then((result)=>{
                    this.weather=result.body.result.future[0];
                    this.weathertoday=result.body.result.realtime;
                    if(result.body.result.realtime.aqi<51) this.quality='优';
                    else if(result.body.result.realtime.aqi<101) this.quality='良';
                    else if(result.body.result.realtime.aqi<151) this.quality='轻度污染';
                    else if(result.body.result.realtime.aqi<201) this.quality='中度污染';
                    else if(result.body.result.realtime.aqi<301) this.quality='重度污染';
                    else this.quality='严重污染';
                    console.log(this.weather);
                })
            },
            switchflag(){
                setInterval(()=>{
                    this.flagshow=!this.flagshow;
                },3000)
            },
            welcome(){
                In
            }
        },
        watch:{
            '$route.path':function (newval) {
                if (newval==='/home'){
                    this.flag=false
                }
                else{
                    this.flag=true
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .app-contianer {
        padding-top: 40px;
        overflow-x: hidden;
        /*touch-action: none;*/
    }
    .v-enter {
        opacity:0;
        transform:translateX(100%);
        position: absolute;
    }
    .v-leave-to {
        opacity:0;
        transform:translateX(-100%);
        position: absolute;
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }
    .mint-header {
        z-index: 99;
    }
</style>