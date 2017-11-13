<template>
    <div class="center">
        <bui-image src="/image/logo.png" width="244px" height="172px"></bui-image>
        <text class="h2">BUI-Weex</text>
        <text class="h4">专注为Weex前端开发者提供高质量UI组件</text>
    </div>
</template>

<style lang="sass" src="../css/buiweex.scss"></style>

<script>
    const buiweex = require("../js/buiweex.js");
    const globalEvent = weex.requireModule('globalEvent');
    module.exports = {
        data () {
            return {}
        },
        methods:{
         
        },
        mounted () {
            globalEvent.addEventListener("androidback", function (e) {
                buiweex.pop();
            });
        }
    }
</script>