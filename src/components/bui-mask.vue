<template>
    <div class="bui-mask" @click="_click"></div>
</template>

<script>

    module.exports = {
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