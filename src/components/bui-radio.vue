<template>
    <div :class="[changeDirection,'flex-fluid']">
        <div class="radio-box flex-row" :class="[(v.disabled || disabled) ? 'disabled':'']" v-for="(v, index) in items" :key="index" @click="select(v)">
            <!--<div class="bui-icon-box" v-if="v.value === value">-->
                <!--<bui-icon @click="select(v)"  :size="iconSize" :name=names(v.value) :color="selectedColor"></bui-icon>-->
            <!--</div>-->
            <div v-if="textDirection === 'right'">
                <div class="bui-icon-box" v-if="v.value === value">
                    <bui-icon @click="select(v)"  :size="iconSize" name="ion-android-radio-button-on" :color="selectedColor"></bui-icon>
                </div>
                <div class="bui-icon-box" v-if="v.value !== value">
                    <bui-icon @click="select(v)"  :size="iconSize" name="ion-android-radio-button-off" :color="unSelectedColor"></bui-icon>
                </div>
            </div>


            <text class="radio-label" :class="[leftColumn ? 'cb-flex-9': '']" :style="{'font-size':fontSize}">{{v.title || v.value}}</text>


            <div v-if="textDirection === 'left'" :class="[leftColumn ? 'cb-flex-1': '']">
                <div class="bui-icon-box" v-if="v.value === value">
                    <bui-icon @click="select(v)"  :size="iconSize" name="ion-android-radio-button-on" :color="selectedColor"></bui-icon>
                </div>
                <div class="bui-icon-box" v-if="v.value !== value">
                    <bui-icon @click="select(v)"  :size="iconSize" name="ion-android-radio-button-off" :color="unSelectedColor"></bui-icon>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="sass" src="../css/radio.scss"></style>

<script>
    module.exports = {
        props: {
            "textDirection": {
                type: String,
                default: 'right'
            },
            "disabled": {
                type: Boolean,
                default: false
            },
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
                default:"#e2e2e2"
            }
        },
        computed:{
            changeDirection () {
                return this.direction=="horizontal"? "flex-row":"flex-column";
            },
            leftColumn (){
                return this.direction=="horizontal" ? false : true
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
