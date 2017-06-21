<template>
    <div v-if="tabId==currentTab" @swipe="onSwipe($event)" style="flex:1;">
        <slot></slot>
    </div>
</template>

<script>
    module.exports = {
        props: {
            tabId:{},
            currentTab:{}
        },
        created:function () {

        },
        methods:{
            onSwipe:function (event) {
                var direction = event.direction;
                this.$emit("swipe",this.tabId,direction);
            }
        }
    }
</script>
