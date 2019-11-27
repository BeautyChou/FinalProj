<template>
    <div class="newsinfo-contianer" >
<!--        <h3>新闻标题啊啊啊啊啊啊&#45;&#45;&#45;&#45;&#45;&#45;{{varurl}}</h3>-->
        <div v-html="newsinfo" class="newsinfo"></div>
        <comment-box></comment-box>
    </div>
</template>

<script>
    import Comment from '../subconponents/comment.vue'
    import {Toast} from 'mint-ui'
    import Bus from './bus.js'
    export default {
        name: "newsinfo",
        data(){
            return {
                uniquekey:this.$route.params.uniquekey,
                newsinfo:"",
                newsList:[],
                varurl:this.$route.params.URL,
            }
        },
        mounted(){
            var vm = this;
            Bus.$on('val',(data)=>{
                console.log(data);
                this.varurl=data;
                this.getUrl();

            });

        },
        methods:{
            getUrl(){
                let http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                let realurl = http + '//cors-anywhere.herokuapp.com/' + this.varurl;
                this.$axios.get(realurl).then((response)=>{
                    console.log(response)
                    // let html = response.data;
                    response.data = response.data.replace(/data-src/g, "src")
                        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g, '')
                        .replace(/https/g,'http');
                    this.newsinfo = response.data
                    let html_src = 'data:text/html;charset=utf-8,' + response.data;
                    let iframe = document.getElementById('iFrame');
                    console.log(html_src)
                    iframe.src = html_src;
                    // var iframe = document.createElement('iframe');
                    // iframe.src=html_src;
                    // document.body.appendChild(iframe);
                },(err)=>{console.log(err);});
            },
        },
        components:{
            'comment-box':Comment
        },
    }
</script>

<style lang="scss">
.newsinfo-contianer{
    padding: 0 4px;
    .newsinfo {
        .title {
            font-size: 16px;

            margin: 15px 0;
            color: red !important;
        }

        .subtitle {
            font-size: 14px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }

        .content {
            .img {
                width: 100%;
            }
        }
    }
    .comment-container {
        width: 100% !important;
        padding: 0 4px !important;
    }
    .cmt-list {
        width: 100% !important;
        padding: 0 4px !important;
    }
}
</style>