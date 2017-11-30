<template>
    <text @click="_click($event)" :value="getFontName" :style="{'color': color, 'font-size': size, 'font-family': 'ionfont'}"></text>
</template>

<script>
    var he = require("he");
    var iconItems = require('../font/ionicons.json');
    module.exports = {
        beforeCreate () {
            var bundleUrl = weex.config.bundleUrl;
            var url = bundleUrl.split('/').slice(0, -1).join('/');
            url += '/font/ionicons.ttf';

            var domModule = weex.requireModule("dom");
            domModule.addRule('fontFace', {
                'fontFamily': 'ionfont',
                'src': "url('" + url + "')"
            });
        },
        props: {
            name: {
                type: String
            },
            color: {
                type: String,
                default: '#9ea7b4'
            },
            size: {
                type: String,
                default: '40px'
            }
        },
        computed: {
            getFontName() {
                var icon = iconItems[this.name];
                return he.decode(icon || '');
            }
        },
        methods: {
            _click(e) {
                this.$emit("click", e);
            }
        }
    }
</script>