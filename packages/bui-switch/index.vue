<template>
    <div class="switch-box">
        <switch class="switch"
                @change="onchange"
                :checked="checked"
                :disabled="disabled"></switch>
        <text class="switch-label" v-if="title">{{title}}</text>
    </div>
</template>


<style lang="scss" src="../../theme/css/radio.scss"></style>

<script>
export default {
  props: {
    title: {
      type: String
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onchange(event) {
      this.checked = event.value;
      this.$emit("change", this.checked);
    }
  }
};
</script>