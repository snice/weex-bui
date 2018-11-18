<template>
    <div :class="['tip', 'tip-' + type]">
        <text :class="['tip-txt', 'tip-txt-' + type]" v-if="value">{{value}}</text>
        <slot name="value"></slot>
    </div>
</template>

<style lang="scss" src="../../theme/css/tip.scss"></style>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "success"
    },
    value: {
      type: String,
      default: ""
    }
  }
};
</script>