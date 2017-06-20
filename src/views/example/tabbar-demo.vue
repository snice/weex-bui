<template>
    <div class="flex-column">
        <!--标题栏-->
        <bui-header
                title="选项卡示例"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>


        <bui-tabbar-new
                :tabItems="tabItems"
                :currentTab="currentTab"
                showSelectedLine="true"
                @load="onTabLoad"
                @itemClick="onTabItemClick">
        </bui-tabbar-new>
        <bui-tabbar-item-new tabId="tab1" :currentTab="currentTab">
            <scroller>
                <div class="tab1">
                    <text>选项卡1</text>
                    <text>我是滚动的内容</text>
                </div>
            </scroller>
        </bui-tabbar-item-new>

        <bui-tabbar-item-new tabId="tab2" :currentTab="currentTab">
            <text>选项卡2</text>
        </bui-tabbar-item-new>

        <bui-tabbar-item-new tabId="tab3" :currentTab="currentTab">
            <text>选项卡3</text>
        </bui-tabbar-item-new>

        <bui-tabbar-item-new tabId="tab4" :currentTab="currentTab">
            <text>选项卡4</text>
        </bui-tabbar-item-new>

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
                currentTab: "",
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
            "bui-tabbar-new": require("../../components/bui-tabbar-new.vue"),
            "bui-tabbar-item-new": require('../../components/bui-tabbar-item-new.vue')
        },
        methods: {
            "back": function () {
                buiweex.pop();
            },
            onTabLoad: function (tabId) {
                this.currentTab = tabId;
            },
            onTabItemClick: function (tabId) {
                this.currentTab = tabId;
            }
        }
    }
</script>
