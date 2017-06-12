<template>
    <div>
        <!--标题栏-->
        <bui-header
                :title="currentTab"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <!--选项卡内容-->
        <bui-tabbar :tabItems="tabItems"
                    :top="top" @tabItemOnClick="tabItemOnClick"></bui-tabbar>
    </div>
</template>
<style lang="sass" src="../../css/layout.scss"></style>
<script>
    var buiweex = require("../../js/buiweex.js");
    module.exports = {
        data: function () {
            return {
                leftItem: {
                    icons: 'icon-back',
                },
                top: '0px',
                dir: 'examples',
                currentTab: "首页",
                tabItems: [
                    {
                        index: 0,
                        title: '首页',
                        icon: 'icon-home',
                        selected: false,
                        src: '/tabbar-item1-demo.weex.js',
                        visibility: 'visible',
                    },
                    {
                        index: 1,
                        title: '通讯录',
                        icon: 'icon-book',
                        selected: false,
                        src: '/tabbar-item2-demo.weex.js',
                        visibility: 'hidden',
                    },
                    {
                        index: 2,
                        title: '动态',
                        icon: 'icon-msg',
                        selected: false,
                        src: '/tabbar-item3-demo.weex.js',
                        visibility: 'hidden',
                    },
                    {
                        index: 3,
                        title: '我的',
                        icon: 'icon-user',
                        selected: false,
                        src: '/tabbar-item4-demo.weex.js',
                        visibility: 'hidden',
                    }
                ]
            }
        },
        components: {
            'bui-tabbar': require('../../components/bui-tabbar.vue')
        },
        created: function () {
            for (var i = 0; i < this.tabItems.length; i++) {
                var path = this.tabItems[i].src;
                this.tabItems[i].src = buiweex.getContextPath() + path;
            };

            //tabbar的top值根据头部位置适配
            var _this = this;
            var env = weex.config.env.platform.toLowerCase();
            switch (env) {
                case "ios":
                    _this.top = '117px';
                    break;
                case "android":
                    _this.top = '100px';
                    break;
                case "web":
                    _this.top = '100px';
                    break;
                default:
                    _this.top = '100px';
            }
        },
        methods: {
            "back": function () {
                buiweex.pop();
            },
            tabItemOnClick: function (e) {
                buiweex.toast("tab" + e.index);
                //设置标题栏
                this.currentTab = this.tabItems[e.index].title;
            }
        }
    }
</script>
