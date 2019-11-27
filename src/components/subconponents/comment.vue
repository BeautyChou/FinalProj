<template>
    <div class="comment-container" style="padding-bottom: 52px">
        <h3>发表评论</h3>
        <hr>
        <textarea name="" id="" cols="30" rows="10" placeholder="请输入要输入的内容" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title">
                    第一楼　用户：匿名用户　发表时间：2099-99-99 13:13:13
                </div>
                <div class="cmt-body">
                    sd4as54d456sd456as465
                </div>
            </div>
        </div>
        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title">
                    第二楼　用户：匿名用户　发表时间：2099-99-99 13:13:13
                </div>
                <div class="cmt-body">
                    sd4as54d456sd456as465
                </div>
            </div>
        </div>
        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title">
                    第三楼　用户：匿名用户　发表时间：2099-99-99 13:13:13
                </div>
                <div class="cmt-body">
                    sd4as54d456sd456as465
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