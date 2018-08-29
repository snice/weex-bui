<template>
    <div :class="[changeDirection,'flex-fluid']">
        <div class="radio-box flex-row" :style="containerStyle" :class="[(disabled) ? 'disabled':'undisabled']" @click="select(v)" v-for="(v, i) in items">
            <bui-icon v-if="textDirection === 'right'" @click="select(v)" :size="iconSize" :name="(value.indexOf(v.value) != -1) ? selectIcon : unSelectedIcon" :color="(value.indexOf(v.value) != -1) ? selectedColor : unSelectedColor"></bui-icon>
            <text class="radio-label" :class="[leftColumn ? 'cb-flex-9': '']" :style="Object.assign({}, {'font-size':fontSize, 'color': (value.indexOf(v.value) != -1) ? selectedColor : unSelectedColor}, newTextStyles)">{{v.title || v.value}}</text>
            <bui-icon v-if="textDirection === 'left'" @click="select(v)" :size="iconSize" :name="(value.indexOf(v.value) != -1) ? selectIcon : unSelectedIcon" :color="(value.indexOf(v.value) != -1) ? selectedColor : unSelectedColor"></bui-icon>
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
            //可选个数限制
            "limit": {
                type: [Number, String],
                default: 10
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
            },
            "containerStyle": {
                type: Object
            },
            "textStyles": {
                type: Object
            },
            "selectIcon": {
                type: String,
                default:"ion-ios-checkmark"
            },
            "unSelectedIcon": {
                type: String,
                default:"ion-ios-checkmark-outline"
            }
        },
        computed:{
            newTextStyles(){
                return Object.assign({}, {'height': this.fontSize-0+5, 'line-height': this.fontSize-0+5}, this.textStyle);
            },
            leftColumn (){
                return this.direction=="horizontal" ? false : true
            },
            changeDirection(){
                return this.direction=="horizontal"? "flex-row":"flex-column";
            }
        },
        data () {
            return {
                newItems: this.initList()
            }
        },
        mounted (){

            // this.$alert(this.newItems);

        },
        methods: {
            initList(){
                let newItems = [];

                for (let i = 0; i < this.items.length; i++) {
                    if(this.value.indexOf(this.items[i].value) != -1) {
                        newItems.push(this.items[i]);
                    }
                }
                return newItems;
            },
            select (v) {
                if(v.disabled || this.disabled) return;
                let i = this.value.indexOf(v.value);
                let len = this.value.length;
                if (i != -1) {
                    // 已经存在，则将其删除
                    this.value.splice(i, 1); // TODO: 这里直接操作了 props
                    this.newItems.splice(i, 1);
                } else {
                    if(this.limit > this.value.length) {
                        this.value.push(v.value); // 不存在，则添加 TODO: 这里直接操作了 props
                        this.newItems.push(v);
                    }
                    else if(this.limit == this.value.length && this.limit == 1) {
                        this.value.splice(len-1, 1);
                        this.newItems.splice(len-1, 1);
                        this.value.push(v.value);
                        this.newItems.push(v);
                    }
                }
                this.$emit("change", this.value, this.newItems);
                this.$emit("input", this.value, this.newItems);
            }
        },
    }
</script>
<style lang="sass" src="../css/radio.scss"></style>
