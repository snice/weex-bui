<template>
    <div :class="[changeDirection,'flex-fluid']">
        <div class="radio-box flex-row" :class="[v.disabled ? 'disabled':'']" v-for="v in items" @click="select(v)">
            <div class="bui-icon-box" v-if="v.value === value"><bui-icon @click="select(v)"  :size="iconSize" name="ion-android-radio-button-on" :color="selectedColor"></bui-icon></div>
            <div class="bui-icon-box" v-if="v.value !== value"><bui-icon @click="select(v)"  :size="iconSize" name="ion-android-radio-button-off" :color="unSelectedColor"></bui-icon></div>
            <text class="radio-label" :style="{'font-size':fontSize}">{{v.title || v.value}}</text>
        </div>
    </div>
</template>
<style lang="sass" src="../css/radio.scss"></style>

<script>
    module.exports = {
        props: {
            "value": {
                type: String,
            },
            "direction": {
                type: String,
                default: 'horizontal' // horizontal | vertical
            },
            "items": {
                type: Array,
                default: []
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
                default:"#9ea7b4"
            }
        },
        computed:{
            changeDirection () {
                return this.direction=="horizontal"? "flex-row":"flex-column";
            }
        },
        data() {
            return{
            }
        },
        methods: {
            select (v) {
                if(v.disabled) return;
                this.$emit("change", v.value);
                this.$emit("input", v.value);
            }
        },
    }
</script>
