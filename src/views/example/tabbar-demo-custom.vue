<template>
    <div class="flex-column">
        <!--标题栏-->
        <bui-header
                title="自定义选项卡"
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

        <text class="h4">只有图标,控制大小，颜色</text>
        <bui-tabbar
                iconSize="45px"
                selectedColor="#FE1F24"
                :tabItems="tabItems1"
                :currentTab="currentTab"
                showSelectedLine="true"
                @load="onTabLoad"
                @itemClick="onTabItemClick">
        </bui-tabbar>
        <text class="h4">只有文字，控制字体大小, 选中颜色, 高度</text>
        <bui-tabbar
                height="80px"
                titleSize="32px"
                selectedColor="#FEA52C"
                :tabItems="tabItems2"
                :currentTab="currentTab"
                showSelectedLine="true"
                @load="onTabLoad"
                @itemClick="onTabItemClick">
        </bui-tabbar>
        <text class="h4">调整背景,选中颜色，去掉底部边框</text>
        <bui-tabbar
                selectedBackground="#F77845"
                selectedColor="#ffffff"
                :tabItems="tabItems3"
                :currentTab="currentTab"
                @load="onTabLoad"
                @itemClick="onTabItemClick">
        </bui-tabbar>

        <slider class="slider" :index="index" auto-play="false" @change="change($event)">
            <!--选项卡内容-->
            <bui-tabbar-item tabId="tab1" :currentTab="currentTab">
                <scroller style="height: 1000px;">
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
        </slider>
    </div>
</template>

<style>
    .tab1 {
        height: 1800px;
    }

    .slider {
        flex: 1;
        background-color: #00c277;
    }
</style>
<style lang="sass" src="../../css/buiweex.scss"></style>

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
                tabItems1: [
                    {
                        tabId: "tab1",
                        icon: "icon-home"
                    },
                    {
                        tabId: "tab2",
                        icon: "icon-liwu"
                    },
                    {
                        tabId: "tab3",
                        icon: "icon-user"
                    },
                    {
                        tabId: "tab4",
                        icon: "icon-video"
                    }
                ],
                tabItems2: [
                    {
                        tabId: "tab1",
                        title: "首页"
                    },
                    {
                        tabId: "tab2",
                        title: "动态"
                    },
                    {
                        tabId: "tab3",
                        title: "我的"
                    },
                    {
                        tabId: "tab4",
                        title: "直播"
                    }
                ],
                tabItems3: [
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
            "onTabLoad": function (tabId,index) {
                this.currentTab = tabId;
//                this.index=index;
            },
            //选项卡点击事件,必须实现
            "onTabItemClick": function (e, tabId, index) {
                this.currentTab = tabId;
                this.index = index;
            },
            "change": function (e) {
                var index = e.index;
                this.currentTab = this.tabItems[index].tabId;
            }
        }
    }
</script>
