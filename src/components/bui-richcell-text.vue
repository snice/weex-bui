<template>
    <text @click="_click" :class="['text', textTheme,hasTextMargin ? 'margin-text' : '']" :style="themeStyle">{{textValue}}</text>
</template>

<script>
    module.exports = {
        props: {
            textValue: {
                type: String,
                default: ''
            },
            textTheme: {
                type: String,
                default: 'gray'
            },
            textStyle: {
                type: Object,
                default: () => ({})
            },
            hasTextMargin: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            themeStyle () {
                let style = {};
                const textStyle = this.textStyle;
                if (textStyle && textStyle.fontSize) {
                    style=Object.assign(style,{fontSize: `${textStyle.fontSize}px`, height: `${textStyle.fontSize * 1.2}px`})
                }
                if (textStyle && textStyle.color) {
                    style = Object.assign(style,{color: textStyle.color})
                }
                style = Object.assign(style,this.textStyle);
                return style;
            }
        },
        methods:{
            _click(e){
                this.$emit("click",e);
            }
        }
    }
</script>

<style scoped>
    .text {
        font-size: 28px;
        color: #3d3d3d;
    }

    .black {
        color: #3D3D3D;
    }

    .yellow {
        color: #EE9900;
    }

    .blue {
        color: #30A0FF;
    }

    .gray {
        color: #A5A5A5;
    }

    .red {
        color: #FF5000;
    }

    .margin-text {
        margin-right: 6px;
    }
</style>