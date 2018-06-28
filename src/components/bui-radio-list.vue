<template>
    <div :class="['flex-fluid']">
        <div class="radio-box checkbox flex-row" :class="[(v.disabled || disabled) ? 'disabled':'']" v-for="v in items" @click="select(v)">
            <text class="radio-label cb-flex-9" :style="{'font-size':fontSize}">{{v.title || v.value}}</text>
            <div class="bui-icon-box cb-flex-1" v-if="v.value === value"><bui-icon @click="select(v)"  :size="iconSize" name="ion-android-checkbox" :color="selectedColor"></bui-icon></div>
            <div class="bui-icon-box cb-flex-1" v-if="v.value !== value"><bui-icon @click="select(v)"  :size="iconSize" name="ion-android-checkbox-outline-blank" :color="unSelectedColor"></bui-icon></div>
        </div>
    </div>
</template>
<style lang="sass" src="../css/radio.scss"></style>

<script>
    module.exports = {
        props: {
            "disabled": {
                type: Boolean,
                default: false
            },
            "value": {
                type: String,
            },
            "items": {
                type: Array,
                default: function () {
                    return[];
                }
            },
            "fontSize":{
                type:[String,Number],
                default:32
            },
            "iconSize":{
                type:[String,Number],
                default:48
            },
            "selectedColor":{
                type: String,
                default:"#00cc66"
            },
            "unSelectedColor":{
                type: String,
                default:"#e2e2e2"
            }
        },
        data() {
            return{
            }
        },
        methods: {
            select (v) {
                if(v.disabled || this.disabled) return;
                this.$emit("change", v.value);
                this.$emit("input", v.value);
            }
        },
    }
</script>
