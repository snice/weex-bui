<template>
    <div class="flex-column">
        <!--标题栏-->
        <bui-header
                title="选项卡示例"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>


        <!--选项卡内容-->
        <bui-tabbar-item tabId="tab1" :currentTab="currentTab">
            <scroller>
                <div class="tab1">
                    <text>选项卡1</text>
                    <text>我是滚动的内容</text>
                </div>
            </scroller>
        </bui-tabbar-item>

        <bui-tabbar-item tabId="tab2" :currentTab="currentTab">
            <text>选项卡2</text>
        </bui-tabbar-item>

        <bui-tabbar-item tabId="tab3" :currentTab="currentTab">
            <text>选项卡3</text>
        </bui-tabbar-item>

        <bui-tabbar-item tabId="tab4" :currentTab="currentTab">
            <text>选项卡4</text>
        </bui-tabbar-item>

        <!--选项卡-->
        <bui-tabbar
                :tabItems="tabItems"
                :currentTab="currentTab"
                @load="onTabLoad"
                @itemClick="onTabItemClick">
        </bui-tabbar>



    </div>
</template>

<style lang="sass" src="../../css/layout.scss"></style>

<style>
    .tab1{
        height: 1800px;
    }
</style>
<script>
    var buiweex = require("../../js/buiweex.js");
    module.exports = {
        data: function () {
            return {
                leftItem: {
                    icons: 'icon-back',
                },
                //当前选择的tab
                currentTab: "tab2",
                tabItems: [
                    {
                        tabId: "tab1",
                        title: "首页",
                        icon: "icon-home"
                    },
                    {
                        tabId: "tab2",
                        icon: "icon-liwu",
                        title: "动态"
                    },
                    {
                        tabId: "tab3",
                        icon: "icon-user",
                        title: "我的"
                    },
                    {
                        tabId: "tab4",
                        icon: "icon-video",
                        title: "直播"
                    }
                ],
                itemStyleEx: {},
                containerStyleEx: {},
            }
        },
        components: {
            "bui-tabbar": require("../../components/bui-tabbar.vue"),
            "bui-tabbar-item": require('../../components/bui-tabbar-item.vue')
        },
        methods: {
            "back": function () {
                buiweex.pop();
            },
            //选项卡加载完成事件,必须实现
            onTabLoad: function (tabId) {
                this.currentTab = tabId;
            },
            //选项卡点击事件,必须实现
            onTabItemClick: function (tabId) {
                this.currentTab = tabId;
            }
        }
    }
</script>
