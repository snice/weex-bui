<template>
    <div ref="lazy-content" style="opacity: 0">
        <text>1212</text>
    </div>
</template>

<style lang="sass" src="../../css/layout.scss"></style>
<style lang="sass" src="../../css/example.scss"></style>
<style lang="sass" src="../../css/form.scss"></style>

<script>
    var buiweex= require("../../js/buiweex.js");
    module.exports = {
        name:"lazy-render-content",
        data: function(){
            return {
                leftItem: {
                    icons: 'icon-back',
                },
            }
        },
        components: {
            'bui-switch': require('../../components/bui-switch.vue'),
        },
        methods: {
        },
        mounted: function () {
            buiweex.show({
                id: this.$refs['lazy-content'],
                duration:1500
            });
        }
    }
</script>
