<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">登录</h1>
        </header>
        <div class="mui-content">
            <form id='login-form' class="mui-input-group">
                <div class="mui-input-row">
                    <label>用户名</label>
                    <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入用户名" v-model="username">
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="Password">
                </div>
            </form>
            <form class="mui-input-group">
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                        自动登录<mt-switch v-model="value" id="autoLogin" ></mt-switch>
<!--                    <div class="mui-switch-handle"></div>-->
                    </li>
                </ul>
            </form>
            <div class="mui-content-padded">
                <router-link  :to="'/member/users/'+username">
                    <button id='login' class="mui-btn mui-btn-block mui-btn-primary">登录</button>
                </router-link>
                <div class="link-area"><a id='reg'>注册账号</a> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
                </div>
            </div>
            <div class="mui-content-padded oauth-area">

            </div>
        </div>
    </div>
<!--    <div>-->
<!--        <h3>member</h3>-->
<!--    </div>-->
</template>

<script>
    import mui from '../../lib/mui/js/mui.js'
    import '../../lib/mui/js/mui.enterfocus.js'
    import '../../lib/mui/js/app.js'
    import { MessageBox } from 'mint-ui';
    export default {
        name: "MemberContainer",
        data(){
            return {
                username:"",
                Password:"",
                value:false
            }
        },
        mounted() {

        },
        beforeRouteLeave(to,from,next){
            console.log(this.Password.length);
            if (to.path==="/member/users/") {
                if (!(this.Password.length)) {
                    MessageBox({
                        title: '错误',
                        message: '未填写密码！',
                        showCancelButton: false
                    });
                    next(false)
                }
            }
                else if (to.path==="/member/users/") {
                    if (!(this.Password.length)) {
                        MessageBox({
                            title: '错误',
                            message: '未填写密码！',
                            showCancelButton: false
                        });
                        next(false)
                    }
                else if (this.username.length === 0) {
                    MessageBox({
                        title: '错误',
                        message: '未填写用户名！',
                        showCancelButton: false
                    });
                    next(false)
                }
                else {
                    next()
                }
            }
            else{
                next()
            }
        }
    }
    mui('.mui-content .mui-switch').each(function() { //循环所有toggle
        //toggle.classList.contains('mui-active') 可识别该toggle的开关状态
        this.parentNode.querySelector('span').innerText = '状态：' + (this.classList.contains('mui-active') ? 'true' : 'false');
        this.addEventListener('toggle', function(event) {
            //event.detail.isActive 可直接获取当前状态
            this.parentNode.querySelector('span').innerText = '状态：' + (event.detail.isActive ? 'true' : 'false');
        });
    });
</script>

<style scoped lang="scss">
    .mui-bar-nav,
    header{
        margin-top: 40px;
        .mui-title {
            position: absolute;
        }
    }
    .mui-content-padded,
    .mui-content{
        background-color: #fff;
    }
    .link-area {
        text-align: center;
    }
    .mui-table-view-cell{
        padding-right: 15px;
    }
    #autoLogin{
        float: right;
    }
    .mui-table-view-cell {
        line-height: 32px;
    }
</style>