<template>
    <div :class="['flex-fluid']">
        <div class="radio-box checkbox flex-row" :class="[v.disabled ? 'disabled':'']" @click="select(v)" v-for="v in items">
            <text class="radio-label cb-flex-9" :style="{'font-size':fontSize}">{{v.title || v.value}}</text>
            <div class="cb-flex-1" v-if="value.indexOf(v.value) != -1"><bui-icon @click="select(v)" :size="iconSize" name="ion-android-checkbox" :color="selectedColor"></bui-icon></div>
            <div class="cb-flex-1" v-if="value.indexOf(v.value) == -1"><bui-icon @click="select(v)" :size="iconSize" name="ion-android-checkbox-outline-blank" :color="unSelectedColor"></bui-icon></div>
        </div>
    </div>
</template>


<script>
    module.exports = {
        props: {
            "value": {
                type: Array,
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
                default:"#e2e2e2"
            }
        },
        data () {
            return {
            }
        },
        methods: {
            select (v) {
                if(v.disabled) return;
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
<style lang="scss" src="../css/radio.scss"></style>
