<template>
    <div @viewappear="onappear">
        <bui-header
                :title="'表单元素'"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller class="bui-container span1 flex-column">
            <div style="padding-bottom:30px;">
                <bui-panel title="搜索布局——图标在左边" border="1">
                    <bui-searchbar-left placeholder="请输入数字" @search="onSearch"></bui-searchbar-left>
                </bui-panel>
                <bui-panel title="搜索布局——图标在中间" border="1">
                    <bui-searchbar-center  @search="onSearch"></bui-searchbar-center>
                </bui-panel>


                <bui-panel title="单选按钮(bui-radio)——横向布局" border="1">
                    <bui-radio
                            :items="radioItems"
                            direction="horizontal"
                            @change="radioChange"
                    ></bui-radio>
                </bui-panel>
                <bui-panel title="单选按钮(bui-radio)——纵向布局" border="1">
                    <bui-radio
                            :items="radioItems2"
                            @change="radioChange"
                            direction="vertical"></bui-radio>
                </bui-panel>


                <bui-panel title="多选按钮(bui-checkbox)——横向布局" border="1">
                    <bui-checkbox :items="checkboxItems"
                                  @change="checkboxChange"></bui-checkbox>
                </bui-panel>
                <bui-panel title="多选按钮(bui-checkbox)——纵向布局" border="1">
                    <bui-checkbox :items="checkboxItems2" direction="vertical" @change="checkboxChange"></bui-checkbox>
                </bui-panel>
                <bui-panel title="switch按钮" border="1">
                    <bui-switch
                            :title="'接收新消息通知'"
                            :checked=false
                            :disabled=false
                            @change="switchFn"
                    ></bui-switch>
                </bui-panel>
            </div>
        </scroller>
    </div>

</template>

<style lang="sass" src="../../css/layout.scss"></style>
<style lang="sass" src="../../css/example.scss"></style>

<script>
    const dom = weex.requireModule('dom');
    var buiweex = require("../../js/buiweex.js");
    module.exports = {
        data: function () {
            return {
                leftItem: {
                    icons: 'icon-back',
                },
                "radioItems": [
                    {
                        title: "男",         //文本
                        select: true,         //表明是否是选中项, true为选中、false为不选中
                        value: "1"
                    },
                    {
                        title: "女",
                        select: false,
                        value: "0"
                    }
                ],
                "radioItems2": [
                    {
                        title: "设计部",
                        select: true,
                        value: "0"
                    },
                    {
                        title: "产品部",
                        select: false,
                        value: "1"
                    },
                    {
                        title: "销售部",
                        select: false,
                        value: "2"
                    },
                    {
                        title: "行政部",
                        select: false,
                        value: "3"
                    }
                ],
                "checkboxItems": [
                    {
                        title: "设计部",
                        select: true,
                        value: "0"
                    },
                    {
                        title: "产品部",
                        select: false,
                        value: "0"
                    }
                ],
                "checkboxItems2": [
                    {
                        title: "设计部",
                        select: true,
                        value: "0"
                    },
                    {
                        title: "产品部",
                        select: false,
                        value: "0"
                    },
                    {
                        title: "销售部",
                        select: false,
                        value: "0"
                    },
                    {
                        title: "行政部",
                        select: false,
                        value: "0"
                    }
                ]
            }
        },
        components: {
            'bui-panel': require('../../components/bui-panel.vue'),
            'bui-radio': require('../../components/bui-radio.vue'),
            'bui-checkbox': require('../../components/bui-checkbox.vue'),
            'bui-switch': require('../../components/bui-switch.vue'),
            'bui-searchbar-left': require('../../components/bui-searchbar-left.vue'),
            'bui-searchbar-center': require('../../components/bui-searchbar-center.vue'),
        },

        methods: {
            "back": function () {
                buiweex.pop();
            },
            "radioChange": function (a) {
                console.log(a);
            },
            "checkboxChange": function (item, selecteArray) {
                console.log(item);
                console.log(selecteArray);
            },
            "onSearch": function (value) {
                buiweex.toast("搜索事件" + value);
            }
        }
    }
</script>
<style>
</style>