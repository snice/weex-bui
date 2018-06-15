<template>
    <div :class="itemClasses">
        <div :class="contentClasses">
            <slot>
                <text>{{title}}</text>
            </slot>
        </div>
        <div :class="tailClasses"></div>
        <div :class="headClasses" :style="customColor" ref="dot"><slot name="dot"></slot></div>
    </div>
</template>

<style lang="sass" src="../css/timeline.scss"></style>

<script>
    const prefixCls = 'bui-timeline';

    module.exports = {
        props: {
            color: {
                type: String,
                default: 'blue'
            },
            last: {
                type: Boolean,
                default: false
            },
            first: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '发布版本一'
            },
        },
        data () {
            return {
                dot: false
            };
        },
        mounted () {
            this.dot = this.$refs.dot.pureChildren.length ? true : false;
        },
        computed: {
            itemClasses () {
                return [`${prefixCls}-item`];
            },
            tailClasses () {
                return [
                    `${prefixCls}-item-tail`, this.first ? `${prefixCls}-item-tail-first`: '', this.last ? `${prefixCls}-item-tail-last`: ''
                ];
            },
            headClasses () {
                return [
                    `${prefixCls}-item-head`, this.dot ? `${prefixCls}-item-head-custom`: '', this.headColorShow ? `${prefixCls}-item-head-${this.color}`: ''
                ];
            },
            headColorShow () {
                return this.color == 'blue' || this.color == 'red' || this.color == 'green' || this.color == 'gray';
            },
            customColor () {
                let style = {};
                if (this.color) {
                    if (!this.headColorShow) {
                        style = {
                            'border-color': this.color
                        };
                    }
                }
                return style;
            },
            contentClasses () {
                return [`${prefixCls}-item-content`];
            }
        }
    }
</script>