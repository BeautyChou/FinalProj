<template>
    <div id="NewsListContainer">
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item mui-active" href="#" data-wid="tab-top-subpage-1.html" @click.prevent="getNewsList('top')">
                        头条
                    </a>
                    <a class="mui-control-item" href="#" data-wid="tab-top-subpage-2.html" @click.prevent="getNewsList('shehui')">
                        社会
                    </a>
                    <a class="mui-control-item" href="#" data-wid="tab-top-subpage-3.html" @click.prevent="getNewsList('guonei')">
                        国内
                    </a>
                    <a class="mui-control-item" href="#" data-wid="tab-top-subpage-4.html" @click.prevent="getNewsList('guoji')">
                        国际
                    </a>
                    <a class="mui-control-item" href="#" data-wid="tab-top-subpage-5.html" @click.prevent="getNewsList('yule')">
                        娱乐
                    </a>
                    <a class="mui-control-item" href="#" data-wid="tab-top-subpage-6.html" @click.prevent="getNewsList('tiyu')">
                        体育
                    </a>
                    <a class="mui-control-item" href="#" data-wid="tab-top-subpage-6.html" @click.prevent="getNewsList('junshi')">
                        军事
                    </a>
                    <a class="mui-control-item" href="#" data-wid="tab-top-subpage-6.html" @click.prevent="getNewsList('keji')">
                        科技
                    </a>
                    <a class="mui-control-item" href="#" data-wid="tab-top-subpage-6.html" @click.prevent="getNewsList('caijing')">
                        财经
                    </a>
                    <a class="mui-control-item" href="#" data-wid="tab-top-subpage-6.html" @click.prevent="getNewsList('shishang')">
                        时尚
                    </a>
                </div>
            </div>

        </div>
        <ul class="mui-table-view" v-for="item in newsList" :key="item.url">
            <li class="mui-table-view-cell mui-media">
                <router-link :to="'/home/newsinfo/'+item.uniquekey" @click.native="changeurl(item.url)">
                    <img class="mui-media-object mui-pull-left" :src=item.thumbnail_pic_s>
                    <img class="mui-media-object mui-pull-left" :src=item.thumbnail_pic_s02?item.thumbnail_pic_s02:item.thumbnail_pic_s>
                    <img class="mui-media-obje  ct mui-pull-left" :src=item.thumbnail_pic_s03?item.thumbnail_pic_s03:item.thumbnail_pic_s02?item.thumbnail_pic_s02:item.thumbnail_pic_s>
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.date | dateFormat('YYYY-MM-DD HH:mm') }}</span>
                            <span>分类：{{item.category}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js'
    import { Toast } from 'mint-ui'
    import Bus from './bus.js'
    export default {
        name: "NewsList",
        data() {
            return {
                newsList:[],
            }
        },
        created(){
            this.getNewsList()
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration:0.0005,
                scrollX:true,
            });
        },
        methods: {
            getNewsList( category ) {
                this.$http.get('/api/toutiao/index?type='+category+'&key=de811eba877e5c23ad0eafd088bbbf36').then(result => {
                    if (result.body.error_code === 0) {
                        this.newsList = result.body.result.data
                    } else {
                        Toast('获取列表失败')
                    }
                })
            },
            changeurl(uurrll){
                Bus.$emit('val',uurrll)
            }
        }
    }
</script>

<style scoped lang="scss">
    h1,
    .mui-h1 {
        font-size: 14px;
    }
    .mui-ellipsis {
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    #NewsListContainer {
        padding-bottom: 50.4px;
    }
    * {
        touch-action: pan-y;
    }
    img {
        width: 42px;
        height: 42px;
        border: 0 solid #000;
    }
</style>