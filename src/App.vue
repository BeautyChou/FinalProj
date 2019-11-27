<template>

    <div class="app-contianer">
<!--        Header-->
        <mt-header fixed title="Vue项目">
            <span slot="left" @click="goback" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>

<!--        Router-view-->


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
        <transition>
        <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                flag:false,
            }
        },
        created(){
            this.flag=this.$route.path==='/home'?false:true;
        },
        methods:{
            goback(){
                this.$router.go(-1);
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
        }
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