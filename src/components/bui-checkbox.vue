<template>
    <div :class="[changeDirection,'flex-fluid']">
        <div class="radio-box flex-row" :class="[(v.disabled || disabled) ? 'disabled':'']" @click="select(v)" v-for="v in items">
            <div v-if="textDirection === 'right'">
                <div v-if="value.indexOf(v.value) != -1"><bui-icon @click="select(v)" :size="iconSize" name="ion-ios-checkmark" :color="selectedColor"></bui-icon></div>
                <div v-if="value.indexOf(v.value) == -1"><bui-icon @click="select(v)" :size="iconSize" name="ion-ios-checkmark-outline" :color="unSelectedColor"></bui-icon></div>
            </div>
            <text class="radio-label" :class="[leftColumn ? 'cb-flex-9': '']" :style="{'font-size':fontSize}">{{v.title || v.value}}</text>
            <div v-if="textDirection === 'left'":class="[leftColumn ? 'cb-flex-1': '']">
                <div v-if="value.indexOf(v.value) != -1"><bui-icon @click="select(v)" :size="iconSize" name="ion-ios-checkmark" :color="selectedColor"></bui-icon></div>
                <div v-if="value.indexOf(v.value) == -1"><bui-icon @click="select(v)" :size="iconSize" name="ion-ios-checkmark-outline" :color="unSelectedColor"></bui-icon></div>
            </div>
        </div>
    </div>
</template>


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
                type: Array,
            },
            "direction": {
                type: String,
                default: 'horizontal' // horizontal | vertical
            },
            "items": {
                type: Array,
                default(){
                    return [];
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
                default:"#9ea7b4"
            }
        },
        computed:{
            leftColumn (){
                return this.direction=="horizontal" ? false : true
            },
            changeDirection(){
                return this.direction=="horizontal"? "flex-row":"flex-column";
            }
        },
        data () {
            return {
            }
        },
        methods: {
            select (v) {
                if(v.disabled || this.disabled) return;
                let i = this.value.indexOf(v.value)
                if (i != -1) {
                    // 已经存在，则将其删除
                    this.value.splice(i, 1); // TODO: 这里直接操作了 props
                } else {
                    // 不存在，则添加
                    this.value.push(v.value) // TODO: 这里直接操作了 props
                }
                this.$emit("change", this.value);
                this.$emit("input", this.value);
            }
        },
    }
</script>
<style lang="sass" src="../css/radio.scss"></style>
