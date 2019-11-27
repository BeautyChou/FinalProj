<template>
    <div>
        <mt-cell title="用户名" :value="username"></mt-cell>
        <mt-cell title="修改密码" is-link></mt-cell>
        <mt-cell title="喜好设置" is-link></mt-cell>
        <mt-cell title="黑名单" is-link></mt-cell>
        <mt-button type="danger" size="large" @click="back">退出</mt-button>
    </div>
</template>

<script>
    export default {
        name: "userInfo",
        data(){
            return {
                username:this.$route.params.username
            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>