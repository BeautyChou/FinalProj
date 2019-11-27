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
                    <img class="mui-media-object mui-pull-left" :src=item.thumbnail_pic_s02>
                    <img class="mui-media-object mui-pull-left" :src=item.thumbnail_pic_s03>
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
                // newsList: [{
                //     "id": 13,
                //     "title": "1季度多家房企利润跌幅超50% 去库存促销战打响",
                //     "add_time": "2015-04-16T03:50:28.000Z",
                //     "zhaiyao": "房企一季度销售业绩已经陆续公布，克而瑞研究中心统计",
                //     "click": 1,
                //     "img_url": "http://demo.dtcms.net/upload/201504/16/201504161149414479.jpg"
                // },
                //     {
                //         "id": 14,
                //         "title": "买房还是炒股，2015年买房无法拒绝的5大理由",
                //         "add_time": "2015-04-16T04:05:34.000Z",
                //         "zhaiyao": "转眼间2015年已经过去了4个月，在这短短的四个月",
                //         "click": 2,
                //         "img_url": "http://demo.dtcms.net/upload/201504/16/201504161205596364.jpg"
                //     },
                //     {
                //         "id": 15,
                //         "title": "抢先实拍猎豹CS10 霸气时尚2.0T涡轮增压",
                //         "add_time": "2016-12-07T08:49:04.000Z",
                //         "zhaiyao": "在SUV当道的天下，许多自主品牌相继推出了旗下多款",
                //         "click": 1,
                //         "img_url": "http://demo.dtcms.net/upload/201504/16/201504161218505373.jpg"
                //     },
                //     {
                //         "id": 16,
                //         "title": "长城汽车不走高端很快就会死 哈弗H8卷土重来",
                //         "add_time": "2015-04-16T04:29:51.000Z",
                //         "zhaiyao": "&amp;emsp;&amp;emsp;一辆豪华日",
                //         "click": 0,
                //         "img_url": "http://demo.dtcms.net/upload/201504/16/201504161229442885.jpg"
                //     },
                //     {
                //         "id": 19,
                //         "title": "三星S6造价更高 卖得却比iPhone 6便宜",
                //         "add_time": "2015-04-16T04:46:22.000Z",
                //         "zhaiyao": "根据调研公司IHS的拆机分析，三星最新推出的旗舰智",
                //         "click": 0,
                //         "img_url": "http://demo.dtcms.net/upload/201504/16/201504161246140423.jpg"
                //     },
                //     {
                //         "id": 20,
                //         "title": "乐视手机遭疯狂吐槽 忽不忽悠看了再说",
                //         "add_time": "2015-04-16T04:54:36.000Z",
                //         "zhaiyao": "昨天，乐视发布了3款手机，乐1、乐1Pro和乐Ma",
                //         "click": 0,
                //         "img_url": "http://demo.dtcms.net/upload/201504/16/201504161254335201.jpg"
                //     },
                //     {
                //         "id": 21,
                //         "title": "假宽带频现 什么是真正的光纤宽带？",
                //         "add_time": "2015-04-16T04:59:15.000Z",
                //         "zhaiyao": "&amp;emsp;&amp;emsp;OFwee",
                //         "click": 0,
                //         "img_url": "http://demo.dtcms.net/upload/201504/16/201504161258558786.jpg"
                //     },
                //     {
                //         "id": 22,
                //         "title": "58同城与赶集网最快今日将宣布合并",
                //         "add_time": "2015-04-16T05:02:30.000Z",
                //         "zhaiyao": "北京时间4月16日消息，腾讯科技通过可靠渠道获知，",
                //         "click": 0,
                //         "img_url": "http://demo.dtcms.net/upload/201504/16/201504161303162262.jpg"
                //     },
                //     {
                //         "id": 23,
                //         "title": "电商下乡，京东、苏宁、阿里农村遭遇战打响？",
                //         "add_time": "2015-04-16T05:29:20.000Z",
                //         "zhaiyao": "2015年，各大电商逐鹿广袤的农村市场，一场圈地运",
                //         "click": 0,
                //         "img_url": "http://demo.dtcms.net/upload/201504/16/201504161329185965.jpg"
                //     },
                //     {
                //         "id": 24,
                //         "title": "易车总裁邵京宁：汽车行业电商化的三个阶段",
                //         "add_time": "2015-04-16T05:37:50.000Z",
                //         "zhaiyao": "易车总裁邵京宁在艾瑞年度高峰会议上表示，汽车行业作",
                //         "click": 0,
                //         "img_url": "http://demo.dtcms.net/upload/201504/16/201504161336598829.jpg"
                //     }],
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
</style>