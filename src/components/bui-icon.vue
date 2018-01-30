<template>
    <div class="icon-block" :style="{width:size,height:size}" @click="_click($event)">
        <text class="icon" :value="getFontName" :style="getStyle"></text>
    </div>
</template>

<style>
    .icon-block {
        justify-content: flex-start;
    }

    .icon {
        text-align: center;
    }
</style>

<script>
    var iconItems = require('../font/ionicons.json');
    var fontFamily = "ionfont";
    module.exports = {
        beforeCreate () {
            var bundleUrl = weex.config.bundleUrl;
            var url = bundleUrl.split('/').slice(0, -1).join('/');
            url += '/font/ionicons.ttf';

            var domModule = weex.requireModule("dom");
            domModule.addRule('fontFace', {
                'fontFamily': fontFamily,
                'src': "url('" + url + "')"
            });
        },
        props: {
            name: {
                type: String,
                defalut: ''
            },
            color: {
                type: String,
                default: '#9ea7b4'
            },
            size: {
                type: [Number, String],
                default: 48
            },
            activeColor: {
                type: String
            }
        },
        computed: {
            getFontName() {
                var icon = iconItems[this.name];
                return this.decode(icon || '');
            },
            getStyle(){
                var style = {
                    'color': this.color,
                    'font-size': this.size,
                    'font-family': fontFamily
                };
                if (this.activeColor) {
                    style["color:active"] = this.activeColor;
                }
                return style;
            }
        },
        methods: {
            _click(e) {
                this.$emit("click", e);
            },
            decode(fontCode){
                if (/^&#x/.test(fontCode)) {
                    return String.fromCharCode(fontCode.replace(/^&#x/, '0x').replace(/;$/, ''))
                } else {
                    return String.fromCharCode('0x' + fontCode);
                }
            }
        }
    }
</script>