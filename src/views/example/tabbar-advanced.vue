<template>
    <div class="flex-column">
        <!--标题栏-->
        <bui-header
                title="选项卡示例"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <!--选项卡-->
        <bui-tabbar
                :tabItems="tabItems"
                :currentTab="currentTab"
                showSelectedLine="true"
                @load="onTabLoad"
                @itemClick="onTabItemClick">
        </bui-tabbar>

        <div style="width: 750px; height: 700px; background-color: #ff4e24">
            <bui-tabbar-item-a index="0" height="700" :currentTabIndex="currentTabIndex">
                <scroller style="height: 700px;">
                    <div>
                        <text>选项卡1</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                        <text>我是滚动的内容</text>
                    </div>
                </scroller>
            </bui-tabbar-item-a>

            <bui-tabbar-item-a index="1" :currentTabIndex="currentTabIndex">
                <text>选项卡2</text>
            </bui-tabbar-item-a>

            <bui-tabbar-item-a index="2" :currentTabIndex="currentTabIndex">
                <text>选项卡3</text>
            </bui-tabbar-item-a>

            <bui-tabbar-item-a index="3" :currentTabIndex="currentTabIndex">
                <text>选项卡4</text>
            </bui-tabbar-item-a>
        </div>
    </div>
</template>

<style lang="sass" src="../../css/layout.scss"></style>

<style>
    .tab1 {
        height: 1800px;
    }

    .slider {
        flex: 1;
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
                currentTab: "tab1",
                currentTabIndex: "1",
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
            "bui-tabbar-item": require('../../components/bui-tabbar-item.vue'),
            "bui-tabbar-item-a": require('../../components/bui-tabbar-item-a.vue')
        },
        methods: {
            "back": function () {
                buiweex.pop();
            },
            //选项卡加载完成事件,必须实现
            "onTabLoad": function (tabId, index) {
                this.currentTab = tabId;
            },
            //选项卡点击事件,必须实现
            "onTabItemClick": function (e, tabId, index) {
                this.currentTab = tabId;
                this.index = index;
                this.currentTabIndex = index;
            },
            "change": function (e) {
                var index = e.index;
                this.currentTab = this.tabItems[index].tabId;
            }
        }
    }
</script>
