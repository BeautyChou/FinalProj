<template>
    <div id="NewsListContainer">
        <ul class="mui-table-view" v-for="item in weixinList" :key="item.url">
            <li class="mui-table-view-cell mui-media">
                <router-link :to="'/home/weixininfo/'+item.id.substring(0,10)" @click.native="changeurl(item.url)">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表来源：{{item.source}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import Bus from './bus.js'
    export default {
        name: "WeixinList",
        data() {
            return {
                weixinList:[],
                // weixinList:[
                //     {
                //         "id":"3016043663_2650643845_2",
                //         "title":"风水不好穷三代！10种户型不能住",
                //         "source":"玄门道学",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzAxNjA0MzY2Mw==&mid=2650643845&idx=2&sn=02b02e4d92af0f7435770d1d13d296d4&chksm=83f3e665b4846f7312cc66b37c6415c1ba3def2b123dc6fa1bf73fb288ee2217d28dcc07a956"
                //     },
                //     {
                //         "id":"3078586803_2654546331_5",
                //         "title":"大吉之兆！财神爷找上门，躲都躲不掉！",
                //         "source":"跑赢大盘的王者",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzA3ODU4NjgwMw==&mid=2654546331&idx=5&sn=3e35492a2128f00560f2bf21c08428b3&chksm=848dff47b3fa7651e6f979fd485d37cc734623ca5a0dbda9dc4803c8cb788c5f0497fa9b1f6a"
                //     },
                //     {
                //         "id":"3200869032_2247492751_1",
                //         "title":"【必看】十二生肖今日运势",
                //         "source":"解读风水与命运",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzIwMDg2OTAzMg==&mid=2247492751&idx=1&sn=a5465f53d84e08880f6c0e2ea2bcc28c&chksm=96f43148a183b85ec197628a099c108bf736db7ce461b439ad9a2b973cc0a9f0d49deaf6cdfd"
                //     },
                //     {
                //         "id":"3556737401_2247492840_1",
                //         "title":"出生在这几个月份的注定一生很“好命”，你家有吗？",
                //         "source":"周易先生",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzU1NjczNzQwMQ==&mid=2247492840&idx=1&sn=7a1288717441481bf438bc0a235cc27d&chksm=fbc2d2feccb55be862e4676c282c1f8a5d0cc4ae00559976e1c60613e58f8dab7d37920f3f34"
                //     },
                //     {
                //         "id":"3879266397_2247484184_1",
                //         "title":"3生肖别愁了，迟早要做“人上人”，2019年财运逆天咸鱼大翻身",
                //         "source":"十二生肖运程与详解",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=Mzg3OTI2NjM5Nw==&mid=2247484184&idx=1&sn=9d46f941cc988541dda4634213b9294f&chksm=cf065c2af871d53c25c42b28a5de3c6f2a1860c86cd3a157002147cde145b63e4f7f452f56c0"
                //     },
                //     {
                //         "id":"3534999978_2247489997_5",
                //         "title":"羊羊羊：“偷着乐”吧，就在明天11月27日（上午11:07）家里有11级大喜事，不接不灵！",
                //         "source":"后缘生缘",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzUzNDk5OTk3OA==&mid=2247489997&idx=5&sn=5ce164b2335a06676595c3decd36c325&chksm=fa8d7f08cdfaf61e61cd6c327ee42a999a597affc5d2b623172df04da14ebb16cec201801997"
                //     },
                //     {
                //         "id":"3541744695_2247490680_4",
                //         "title":"金鸡已吼，69年鸡鸡鸡：传说中”的11月27日就在明天，有乐死人的“好消息”，非看不可！！",
                //         "source":"福缘生肖",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzU0MTc0NDY5NQ==&mid=2247490680&idx=4&sn=a3510711ea315bb948ce15fd2f780b8b&chksm=fb241720cc539e36cc74b365a8433e1a412476d6398ca0c5d292ad944b028d6b2a0756ff1329"
                //     },
                //     {
                //         "id":"2396248780_2652519927_2",
                //         "title":"白羊座 | 11月27日 | 明日运势",
                //         "source":"白羊座运势",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MjM5NjI0ODc4MA==&mid=2652519927&idx=2&sn=63ef33a04bc273e37dfb26eb1b67c8bd&chksm=bd02b0548a753942b8374fcd1582aed3e828708c49db0d9dce68e5dbbc79b21c19e1e803b6ee"
                //     },
                //     {
                //         "id":"2396248780_2652519927_1",
                //         "title":"没有理由不喜欢白羊座！",
                //         "source":"白羊座运势",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MjM5NjI0ODc4MA==&mid=2652519927&idx=1&sn=b8457dd37595e58410749e39860c5ff0&chksm=bd02b0548a7539425bdd9aabbbcbf0e8de5d6173a572e7c32fc4f2775e2a13ba4062675e3cba"
                //     },
                //     {
                //         "id":"3274810280_2247484408_1",
                //         "title":"年底，这几个生肖遇贵人、喜事，发横财，成为最大赢家！",
                //         "source":"十二生肖解析运势",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzI3NDgxMDI4MA==&mid=2247484408&idx=1&sn=ad89ef4f307f34ff0e2f6b4c0a7eb60e&chksm=eb0f173fdc789e29459dea6906b49f22ecc4da09bb68723afca264c0161a871913e334c6c4fa"
                //     },
                //     {
                //         "id":"3209757194_2247489667_1",
                //         "title":"一个人最硬的底牌，不是金钱，不是婚姻，不是子女，而是...",
                //         "source":"旺财风水师",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzIwOTc1NzE5NA==&mid=2247489667&idx=1&sn=929f0b0c28e91adf14506d152f28a56b&chksm=976fade6a01824f0c5925a2b153aa97f63cc596ec88338c9d97c18dd0c196894d397b16da6a5"
                //     },
                //     {
                //         "id":"3230169273_2652844383_3",
                //         "title":"坏的不灵好的灵，总是很幸运的生肖",
                //         "source":"每日运势播报",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzIzMDE2OTI3Mw==&mid=2652844383&idx=3&sn=49da998132208f364dd57b76e9202a70&chksm=f35c1e89c42b979f782b2eeaf20f7ef301f05c8e23e67f6396f1031dc5635d5810b2fabea95e"
                //     },
                //     {
                //         "id":"3276871571_2247493888_1",
                //         "title":"一线城市房价大迷局：无奈的北上广，无解的深圳",
                //         "source":"楼市头条",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzI3Njg3MTU3MQ==&mid=2247493888&idx=1&sn=a1dfb1881f75e9b384944efd2cd6aac7&chksm=eb6c49fcdc1bc0ead2694afece18b60ed4f0e0bfa25782f1e20a38048718402cbd35bd8f4631"
                //     },
                //     {
                //         "id":"3082681928_2651825033_2",
                //         "title":"倒霉的预示征兆！可惜很多人都不知道……",
                //         "source":"风水学大师",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzA4MjY4MTkyOA==&mid=2651825033&idx=2&sn=89e5f3c9a8ddaec1c3f14026a44c2adc&chksm=84790aaeb30e83b8950df850dd7cadbf41ae8c8f37aab151d0f9e8fc5508fcaadd78a24fc755"
                //     },
                //     {
                //         "id":"3208433753_2247492707_2",
                //         "title":"大金鸡：你“闯大祸啦”，明天11月27日上午10点整，“鸡鸡鸡”有“三喜临门”，再不接喜就飞了！",
                //         "source":"育儿父母心",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzIwODQzMzc1Mw==&mid=2247492707&idx=2&sn=f0a66b85c9bbeb29dc31e7f2218778c9&chksm=97018355a0760a4337d324db422ca87e538891cfcf0998f272e0a6c5cf278a40c32fe3f4a033"
                //     },
                //     {
                //         "id":"3082681928_2651825033_1",
                //         "title":"天生有福运的三大生肖，男有财，女有貌",
                //         "source":"风水学大师",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzA4MjY4MTkyOA==&mid=2651825033&idx=1&sn=11f52a2b4763c76f0c7f91936224bbd7&chksm=84790aaeb30e83b8e5963f35f5ce1310db8ae6f7dcf8c02db3c4fa2ebdd2a9d08aaded65312a"
                //     },
                //     {
                //         "id":"2398031761_2652272023_2",
                //         "title":"老来富贵的三大生肖！30岁行大运，50岁老来福！",
                //         "source":"最全周公解梦",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MjM5ODAzMTc2MQ==&mid=2652272023&idx=2&sn=a010ed18523474f8ceead76cf53300d1&chksm=bd322d698a45a47f01b2f40dbe8913be56ed0398e5b4b716fc8da40227c667ae59e97763c60d"
                //     },
                //     {
                //         "id":"3015767256_2650635220_1",
                //         "title":"这些星座CP不是不对，就是不配！",
                //         "source":"星座巫师",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzAxNTc2NzI1Ng==&mid=2650635220&idx=1&sn=2b8a3b762d87ad424003601f5dba60e0&chksm=83f6d863b48151753cdf8de23975dafb157de7d76782e58482a90376f9baeb68c1b400296114"
                //     },
                //     {
                //         "id":"3222040933_2649789065_1",
                //         "title":"做人，不要去怪任何人（2019必读好文）！",
                //         "source":"易经人生",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzIyMjA0MDkzMw==&mid=2649789065&idx=1&sn=20a5441bbe71f28336ba9801a1c4cb2a&chksm=f037b483c7403d957663063f5c28496b8c01d861d96e534d74a80d5861f2f8817eedd21e0b17"
                //     },
                //     {
                //         "id":"3071005266_2675743116_2",
                //         "title":"中年以后的长相，特别准！",
                //         "source":"国学智慧",
                //         "firstImg":"",
                //         "mark":"",
                //         "url":"https:\/\/mp.weixin.qq.com\/s?__biz=MzA3MTAwNTI2Ng==&mid=2675743116&idx=2&sn=b742f03bb401beb738bc7d35123b0cd3&chksm=85bc1cb1b2cb95a75e3ce9d30f217c20e70fb1c92b7c402245cf918453e4e2dc6e80d8df2454"
                //     }
                // ],
                index:1,
            }
        },
        created(){
            this.getweixinList()
        },
        mounted(){

        },
        methods: {
            getweixinList( category ) {
                console.log(this.index);
                this.$http.get('/api/weixin/query?pno='+this.index+'&ps=&dtype=&key=c2cb0cd62e134e794a8b17ed99d997c3').then(result => {
                    if (result.body.error_code === 0) {
                        this.weixinList=this.weixinList.concat(result.body.result.list)
                    } else {
                        Toast('获取列表失败')
                    }
                })
            },
            changeurl(uurrll){
                Bus.$emit('val',uurrll)
            },
            getmore(){
                this.index++;
                this.getweixinList();
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
</style>