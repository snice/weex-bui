<template>
    <div>
        <bui-header
                title="头部"
                :leftItem="leftItem"
                :rightItem="rightItem"
                @leftClick="back"
                @rightClick="rightclick"
                @centerClick="centerclick">
        </bui-header>

        <bui-content>
            <div>
                <text class="ex-title">居中对齐</text>
                <bui-header :title="'开发者中心'"
                            :ios=false
                            :leftItem="leftItem"
                            :rightItem="rightMenu"
                ></bui-header>

                <text class="ex-title">左边对齐</text>
                <bui-header :ios=false
                            :leftItem="leftMenu"
                            :rightItem="rightMenu">
                    <bui-icon slot="right" :name="'icon-search'" size="45px" color="#ffffff" class="pdl10"></bui-icon>
                </bui-header>

                <text class="ex-title">换个颜色</text>
                <bui-header :ios=false
                            :styleEx="style2"
                            :leftItem="leftMenu"
                            :rightItem="rightMenu">
                    <bui-icon slot="right" :name="'icon-search'" size="45px" color="#ffffff" class="pdl10"></bui-icon>
                </bui-header>

                <text class="ex-title">换个高度与颜色</text>
                <bui-header :ios=false
                            :title="'软件设置'"
                            :styleEx="style1"
                            :leftItem="leftItem">
                    <bui-icon slot="right" :name="'icon-search'" size="45px" color="#ffffff" class="pdl10"></bui-icon>
                </bui-header>
            </div>
        </bui-content>
    </div>

</template>
<style lang="sass" src="../../css/layout.scss"></style>
<style lang="sass" src="../../css/header.scss"></style>
<style lang="sass" src="../../css/example.scss"></style>
<script>
    var buiweex = require("../../js/buiweex.js");
    export default {
        data: function () {
            return {
                leftItem: {
                    icons: 'icon-back',
                },
                rightItem: {
                    text: '更多'
                },
                rightMenu: {
                    icons: 'icon-menu'
                },
                leftMenu: {
                    icons: 'icon-back',
                    text: '新闻中心'
                },
                style1: {
                    'background-color': '#ff4e24'
                },
                style2: {
                    'background-color': '#00c277'
                }
            }
        },
        methods: {
            "back": function () {
                buiweex.pop();
                buiweex.toast('left')
            },
            "rightclick": function () {
                buiweex.toast('right')
            },
            "centerclick": function () {
                buiweex.toast('center')
            }
        },
        created: function () {
        }
    }
</script>
<style>
    .pdl10 {
        padding-left: 10px;
    }

    .pdr10 {
        padding-right: 10px;
    }
</style>