<template>
    <div class="comment-container" style="padding-bottom: 52px">
        <h3>发表评论</h3>
        <hr>
        <textarea name="" id="" cols="30" rows="10" placeholder="请输入要输入的内容" maxlength="120" v-model="COMMENT"></textarea>
        <mt-button type="primary" size="large" @click="Submit">发表评论</mt-button>

        <div class="cmt-list" v-for="item in commentList">
            <div class="cmt-item">
                <div class="cmt-title">
                    第{{item.id}}楼　用户：{{item.username}}　发表时间：{{item.date|dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain>加载更多</mt-button>
        <div class="hhhhh"></div>
    </div>
</template>

<script>
    export default {
        name: "comment",
        data(){
            return {
                commentList:[
                    {id:'1',username:'匿名用户',date:new Date(),content:'哈哈哈哈哈哈'},
                    {id:'2',username:'匿名用户',date:new Date(),content:'文章写得好'},
                    {id:'3',username:'匿名用户',date:new Date(),content:'小编厉害！'}
                ],
                COMMENT:"",
            }
        },
        methods:{
            Submit(){
                var newComment={id:this.commentList.length+1,username:'匿名用户',date:new Date(),content:this.COMMENT};
                this.commentList.push(newComment);
                this.COMMENT="";
            }
        }
    }
</script>

<style scoped lang="scss">
    .comment-container {
        .hhhhh {
            height: 52px;
        }
        h3 {
            fong-size:10px;
        }
        height: 100%;
        padding-bottom: 52px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list {
        margin:5px 0;
        .cmt-item {
            font-size: 13px;
            .cmt-title {
                background-color: #ccc;
                line-height: 35px;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
</style>