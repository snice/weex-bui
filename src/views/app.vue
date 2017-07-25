<template>
    <div class="center">
        <bui-image src="/image/logo.png" width="244px" height="172px" @click="fn()"></bui-image>
        <bui-icon :name="'icon-home'"></bui-icon>
        <text class="h2">BUI-Weex</text>
        <text class="h4" ref="dd">专注为Weex前端开发者提供高质量UI组件</text>
    </div>
</template>

<style lang="sass" src="../css/buiweex.scss"></style>

<script>
    var buiweex = require("../js/buiweex.js");
    var animate = require("../js/animate.js");

    module.exports = {
        methods: {
                fn: function () {
                    var yy = this.$refs.dd;
                    animate.init(yy).left("10px").right("-10px");
                    animate.init("dd").left("10px").right("-10px");
                }
        },
        components: {},
        mounted:function () {
        }
    }
</script>