<template>
    <text :class="['btn', 'btn-' + (disabled?'disabled':type)]"
          :style="{'border-radius':radius}"
          @longpress="longpress($event)"
          @click="click($event)">{{value}}</text>
</template>
<style lang="sass" src="../css/button.scss"></style>

<script>
    module.exports = {
        props: {
            "type": {default: 'default'},
            "value": {default: 'Button'},
            "disabled": {default: false},
            "radius": {default: "0px"}
        },
        methods: {
            click(e) {
                if (!this.disabled) {
                    this.$emit("click",e);
                }
            },
            longpress(e) {
                if (!this.disabled) {
                    this.$emit("longpress",e);
                }
            }
        }
    }
</script>

