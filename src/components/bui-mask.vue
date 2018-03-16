<template>
    <div class="bui-mask" @click="_click" :style="{'background-color':'rgba(0,0,0,'+ rgba +')'}"></div>
</template>

<script>

    module.exports = {
        props: {
            rgba: {
                type: [String, Number],
                default: '0.2'
            }
        },
        computed: {
            newRgba(){
                return this.rgba + '';
            }
        },
        methods: {
            _click() {
                this.$emit("click");
            }
        }
    }
</script>

<style>
    .bui-mask{
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        background-color:rgba(0,0,0,0.2);
    }
</style>