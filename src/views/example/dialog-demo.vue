<template>
    <div>

        <bui-header
                :title="'Dialog'"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <div class="bui-container span1">
            <div class="bui-panel">
                <div class="bui-panel-header">
                    <text class="ex-title">自定义窗口</text>
                </div>
                <div class="bui-panel-main">
                    <bui-button value="自定义窗口" @click="open"></bui-button>
                </div>
            </div>
        </div>
        <!--自定义Dialog-->
        <bui-dialog @btnClick="onDialogCallback" :show="showDialog">
            <text>欢迎使用Bui-Weex!</text>
            <text>基于阿里weex构建的一套UI框架</text>
        </bui-dialog>
    </div>
</template>

<style lang="sass" src="../../css/layout.scss"></style>
<style lang="sass" src="../../css/example.scss"></style>
<script>
    var buiweex = require("../../js/buiweex.js");
    export default {
        data: function(){
            return {
                leftItem: {
                    icons: 'icon-back',
                },
                showDialog: false
            }
        },
        components: {
            'bui-tip': require('../../components/bui-tip.vue'),
            'bui-panel': require('../../components/bui-panel.vue'),
            'bui-dialog': require('../../components/bui-dialog.vue')
        },

        methods: {
            "back": function () {
                buiweex.pop();
            },
            "open": function () {
                this.showDialog = true;
            },
            "onDialogCallback": function (text) {
                this.showDialog = false;
                buiweex.toast(text)
            }
        }
    }
</script>