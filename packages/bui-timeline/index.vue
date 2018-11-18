<template>
    <div class="" :class="classes">
        <slot></slot>
    </div>
</template>

<style lang="scss" src="../../theme/css/timeline.scss"></style>

<script>
const prefixCls = "bui-timeline";
export default {
  props: {
    pending: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`, this.pending ? `${prefixCls}-pending` : ""];
    }
  }
};
</script>