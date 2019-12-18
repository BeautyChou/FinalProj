<template>
    <div class="newsinfo-contianer" >
        <div v-html="newsinfo"></div>
        <comment-box></comment-box>
    </div>
</template>

<script>
    import Comment from '../subconponents/comment.vue'
    import Bus from './bus.js'
    import { Indicator } from 'mint-ui';
    export default {
        name: "newsinfo",
        data(){
            return {
                newsList:[],
                varurl:"",
                url:'',
                newsinfo:"",
            }
        },
        created(){
            var vm = this;
            Bus.$on('val',(data)=>{
                console.log(data);
                this.varurl=data;
                this.getUrl();
            });
        },
        mounted(){

        },
        methods: {
            getUrl(){
                Indicator.open('加载中...');
                let http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                let realurl = http + '//cors-anywhere.herokuapp.com/' + this.varurl;
                this.$axios.get(realurl).then((response)=>{
                    response.data = response.data.replace(/data-src/g, "src")
                        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g, '')
                        .replace(/https/g,'http');
                    this.newsinfo = response.data;
                    setTimeout(()=>{
                        Indicator.close();
                    },1000)
                },(err)=>{console.log(err);});

            },
            setsize() {
                const oIframe = document.getElementById('iFrame');
                const deviceWidth = document.documentElement.clientWidth;
                const deviceHeight = document.documentElement.clientHeight;
                oIframe.style.width = '100%'; //数字是页面布局宽度差值
                oIframe.style.height = (Number(deviceHeight) - 150) + 'px'; //数字是页面布局高度差
            },
        },
        components:{
            'comment-box':Comment
        },
    }
</script>

<style lang="scss">

</style>