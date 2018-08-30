<template>
    <div class="bui-grid-select"
         :style="cWrapperStyle"
         @click="_click"
         :accessible="true"
         :aria-label="`${title},${checked?'已选中':'未选中'}`">
        <text class="bui-grid-select-title"
              :style="cTitleStyle">{{title}}</text>
        <bui-icon
                v-if="selected && !disabled && icon"
                :color="selectedBorderColor"
                :name="icon"
                size="20px" class="bui-grid-select-img"></bui-icon>
    </div>

</template>

<script>
    module.exports = {
        props: {
            index: {
                type: Number,
                default: -1
            },
            // 是否选中
            selected: {
                type: Boolean,
                default: false
            },
            // 是否可选
            disabled: {
                type: Boolean,
                default: false
            },
            width:{
                type: String,
                default: '166px'
            },
            height:{
                type: String,
                default: '72px'
            },
            // 标题
            title: {
                type: String,
                default: ''
            },
            // 正常状态文字色值
            color: {
                type: String,
                default: '#3d3d3d'
            },
            // 选中状态文字色值
            selectedColor: {
                type: String,
                default: '#3399ff'
            },
            // 不可选状态文字色值
            disabledColor: {
                type: String,
                default: '#9b9b9b'
            },
            // 正常状态边框色值
            borderColor: {
                type: String,
                default: 'transparent'
            },
            // 选中状态边框色值
            selectedBorderColor: {
                type: String,
                default: '#3399ff'
            },
            // 不可选状态边框色值
            disabledBorderColor: {
                type: String,
                default: 'transparent'
            },
            // 正常状态背景色值
            backgroundColor: {
                type: String,
                default: '#f6f6f6'
            },
            // 选中状态背景色值
            selectedBackgroundColor: {
                type: String,
                default: '#ffffff'
            },
            // 不可选状态背景色值
            disabledBackgroundColor: {
                type: String,
                default: '#f6f6f6'
            },
            icon: {
                type: [String, Boolean],
                default: 'ion-backspace'
            }
        },
        computed: {
            //多格筛选项外框样式
            cWrapperStyle () {
                const { width, height, borderColor, selectedBorderColor, disabledBorderColor, backgroundColor, selectedBackgroundColor, disabledBackgroundColor } = this;
                const { selected, disabled } = this;
                return {
                    width,
                    height,
                    borderColor: disabled ? disabledBorderColor : selected ? selectedBorderColor : borderColor,
                    backgroundColor: disabled ? disabledBackgroundColor : selected ? selectedBackgroundColor : backgroundColor
                }
            },
            //多格筛选项文字样式
            cTitleStyle () {
                const { color, selectedColor, disabledColor } = this;
                const { selected, disabled } = this;
                return {
                    color: disabled ? disabledColor : selected ? selectedColor : color
                }
            },

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

<style lang="sass" src="../css/gridselect.scss"/>