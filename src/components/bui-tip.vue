<template>
    <div :class="['tip', 'tip-' + type]">
        <text :class="['tip-txt', 'tip-txt-' + type]" v-if="value">{{value}}</text>
        <slot name="value"></slot>
    </div>
</template>

<style lang="scss" src="../css/tip.scss"></style>
<script>
    module.exports = {
        props: {
            type: {default: 'success'},
            value: {default: ''}
        }
    }
</script>