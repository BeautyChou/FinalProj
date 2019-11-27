<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in img_url" :key="item.id">
                <img :src=item.img_1600_900 alt="">
            </mt-swipe-item>
        </mt-swipe>



        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6">
                <router-link to="/home/newslist">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">新闻</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6">
                <router-link to="/home/weixinList">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">微信精选文章</div>
                </router-link>
            </li>
        </ul>





    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        name: "HomeContainer",
        data(){
            return {
                imgList:[],
                number:0,
                total:0,
                imgId:"",
                img_url:[],
            };
        },
        created(){
          this.getimg();
        },
        methods:{
            getimg() {
                this.$http.get('/iimmgg/index.php?%20c=WallPaper&a=getAppsByCategory&cid=15&start='+Math.floor(Math.random()*(20 - 1) + 1)+'&count=3&from=360chrome').then(result => {
                    if (result.body.errno === "0") {
                        this.img_url.push(result.body.data[0])
                        this.img_url.push(result.body.data[1])
                        this.img_url.push(result.body.data[2])
                    } else {
                        Toast('加载轮播图失败...')
                    }
                })
            }
        },
    }
</script>

<style scoped lang="scss">
.mint-swipe {
    height: 200px;
    .mint-swipe-item {
        text-align: center;
        &:nth-child(1) {
            background-color: white;
        }
        &:nth-child(2) {
            background-color: white;
        }
        &:nth-child(3) {
            background-color: white;
        }
        img {
            width: 100%;
        }
    }
}
    .mui-table-view,.mui-grid-view,.mui-grid-9{
        background-color: #fff;
        border: 0;
    }
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
    }
</style>