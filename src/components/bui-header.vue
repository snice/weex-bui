<template>
    <div :style="{'background-color':backgroundColor}">

        <div style="height: 40px;" v-if="iosFixed"></div>

        <div class="bui-header" :style="{'height':height}">

            <div class="bui-header-left">
                <bui-icon  @click="_leftClick($event)" v-if="leftItem.icon||leftItem.icons" :name="leftItem.icon||leftItem.icons" :size="iconSize" :color="iconColor"></bui-icon>
                <text  @click="_leftClick($event)" :style="{'color':textColor,'margin-left':'10px'}" v-if="leftItem.text" class="bui-header-text" :value="leftItem.text"></text>
                <slot name="left"></slot>
            </div>
            <div class="bui-header-left" v-if="!leftItem">
            </div>

            <div class="bui-header-main">
                <div :style="{width:maxTitleWidth}" v-if="title!==''">
                    <text class="bui-header-title" :style="{'color':textColor}" @click="_centerClick($event)">{{title}}</text>
                </div>
                <slot name="center"></slot>
            </div>

            <div class="bui-header-right">
                <bui-icon @click="_rightClick($event)" v-if="rightItem.icon||rightItem.icons" :name="rightItem.icon||rightItem.icons" :size="iconSize" :color="iconColor"></bui-icon>
                <text @click="_rightClick($event)" :style="{'color':textColor,'margin-left':'10px'}" v-if="rightItem.text" class="bui-header-text" :value="rightItem.text"></text>
                <slot name="right"></slot>
            </div>

            <div class="bui-header-right" v-if="!rightItem">
            </div>

        </div>
    </div>
</template>
<style lang="sass" src="../css/header.scss"></style>

<script>
    var defaultItem = {
        icon: '',
        icons: '',
        text: ''
    };
    var platform = weex.config.env.platform.toLowerCase();
    module.exports = {
        props: {
            title: {
                type: String,
                default: ""
            },
            leftItem: {
                type: Object,
                default: defaultItem
            },
            rightItem: {
                type: Object,
                default: defaultItem
            },
            textColor:{
              type:String,
                default:"#ffffff"
            },
            iconColor: {
                type: String,
                default: "#ffffff"
            },
            iconSize: {
                type: String,
                default: "48px"
            },
            backgroundColor: {
                type:String,
                default: "#4ca4fe"
            },
            height: {
                type:String,
                default: "90px"
            },
            maxTitleWidth:{
                type:String,
                default:"480px"
            }
        },
        computed: {
            iosFixed () {
                return platform === "ios";
            }
        },
        methods: {
            _leftClick (e) {
                this.$emit('leftClick', e);
            },
            _rightClick (e) {
                this.$emit('rightClick', e);
            },
            _centerClick (e) {
                this.$emit('centerClick', e);
            }
        }
    }
</script>