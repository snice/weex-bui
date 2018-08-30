<template>
    <div class="radio-box flex-row"
         :class="[isOpacity]"
         :style="Object.assign({}, cWrapperStyle, containerStyle)"
         @click="_click"
         :accessible="true"
         :aria-label="`${title},${checked?'已选中':'未选中'}`">
        <bui-icon
                v-if="textDirection === 'right'"
                @click="_click"
                :size="iconSize"
                :name="iconName"
                :color="lasetColor"></bui-icon>
        <text class="radio-label" :class="[fullCell]" :style="Object.assign({}, cTitleStyle, textStyles)">{{title || value}}</text>
        <!--<text class="radio-label" :class="['cb-flex-9']" :style="">jjjjjdsfs sfsdf s</text>-->
        <bui-icon
                v-if="textDirection === 'left'"
                @click="_click"
                :size="iconSize"
                :name="iconName"
                :color="lasetColor"></bui-icon>
    </div>

</template>

<script>
    module.exports = {
        props: {
            "textDirection": {
                type: String,
                default: "right"
            },
            "leftColumn":{
                type: Boolean,
                default: false
            },
            "index": {
                type: Number,
                default: -1
            },
            // 是否可选
            "disabled": {
                type: Boolean,
                default: false
            },
            // 是否选中
            "selected": {
                type: Boolean,
                default: false
            },
            // 标题
            "title": {
                type: String,
                default: ''
            },
            "fontSize": {
                type: String,
                default: '30px'
            },
            "iconSize": {
                type: String,
                default: '48px'
            },
            // 正常状态文字色值
            "color": {
                type: String,
                default: '#9ea7b4'
            },
            // 选中状态文字色值
            "selectedColor": {
                type: String,
                default: '#00cc66'
            },
            "selectIcon": {
                type: String,
                default:"ion-ios-checkmark"
            },
            "unSelectedIcon": {
                type: String,
                default:"ion-ios-checkmark-outline"
            },
            "textStyles": {
                type: Object
            },
        },
        computed: {
            //多格筛选项外框样式
            isOpacity () {
                const { disabled } = this;
                return disabled ? 'disabled' : 'undisabled'
            },
            //多格筛选项文字样式
            cTitleStyle () {
                const { color, selectedColor, fontSize } = this;
                const { selected } = this;
                return {
                    "font-size": fontSize,
                    "color": selected ? selectedColor : color
                }
            },
            lasetColor(){
                const { color, selectedColor } = this;
                const { selected } = this;
                return selected ? selectedColor : color
            },
            iconName(){
                const { selectIcon, unSelectedIcon } = this;
                const { selected } = this;
                return selected ? selectIcon : unSelectedIcon
            },
            fullCell(){
                const { leftColumn } = this;
                return leftColumn ? 'cb-flex-9' : ''
            }

        },
        methods: {
            _click () {
                if (!this.disabled) {
                    this.$emit('select', this.index);
                }
            },
        }
    }
</script>

<style lang="sass" src="../css/radio.scss"/>