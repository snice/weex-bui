<template>
    <div :class="[changeDirection,'flex-fluid']">
        <div class="radio-box flex-row" :class="[(v.disabled || disabled) ? 'disabled':'']" :style="containerStyle" v-for="(v, index) in items" :key="index" @click="select(v)">
            <bui-icon v-if="textDirection === 'right'" @click="select(v)"  :size="iconSize" :name="(v.value === value) ? selectIcon : unSelectedIcon" :color="(v.value === value) ? selectedColor : unSelectedColor"></bui-icon>

            <text class="radio-label" :class="[leftColumn ? 'cb-flex-9': '']" :style="Object.assign({}, {'font-size':fontSize, 'color': (v.value === value) ? selectedColor : unSelectedColor}, newTextStyles)">{{v.title || v.value}}</text>

            <bui-icon @click="select(v)" v-if="textDirection === 'left'" :size="iconSize" :name="(v.value === value) ? selectIcon : unSelectedIcon" :color="(v.value === value) ? selectedColor : unSelectedColor"></bui-icon>

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
            "containerStyle": {
                type: Object
            },
            "selectedColor":{
                type: String,
                default:"#00cc66"
            },
            "unSelectedColor":{
                type: String,
                default:"#9ea7b4"
            },
            "textStyles": {
                type: Object
            },
            "selectIcon": {
                type: String,
                default:"ion-android-radio-button-on"
            },
            "unSelectedIcon": {
                type: String,
                default:"ion-android-radio-button-off"
            }
        },
        computed:{
            newTextStyles(){
                return Object.assign({}, {'height': this.fontSize+5}, this.textStyle);
            },
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
                this.$emit("change", v.value, v);
                this.$emit("input", v.value, v);
            }
        },
    }
</script>
