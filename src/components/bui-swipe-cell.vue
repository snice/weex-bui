<template>
    <div class="bui-list-swipe-menu">
        <div class="bui-cell-swipe-menu" :style="{'height': height}">
            <div class="bui-list-swipe">
                <div class="bui-list-swipe-btn" :style="{'background-color': item.bgcolor}" @click="_closeswipe(index)" v-for="(item, index) in items"><text class="bui-list-swipe-btn-text">{{item.title}}</text></div>
            </div>
            <div @click="_click()" @swipe="_openswipe($event)" class="bui-list-main bui-list-swipe-main" ref="swipedom">
                <div class="bui-list-main-left">
                    <text v-if="title" class="bui-list-title">{{title}}</text>
                    <slot name="content"></slot>
                </div>
            </div>

        </div>
    </div>
</template>
<style lang="sass" src="../css/list.scss"></style>
<script>
    var animation = weex.requireModule('animation');
    module.exports = {
        props: {
            items: {
                type: Array,
                default: [
                    {
                        'title': '取消',
                        'bgcolor' : '#c6c7c8'
                    },
                    {
                        'title': '删除',
                        'bgcolor' : '#fa3300'
                    }
                ]
            },
            height: {
                type: String,
                default: '100px'
            },
            title: {
                type: String
            },
            index: {
                type: Number
            }
        },
        methods: {
            //点击滑动菜单操作
            _closeswipe (index){
                this.close(() => {
                    //点击滑动菜单组事件暴露同时把当前点击的菜单index指数传出去
                    this.$emit('clickmenu', index);
                });
            },
            //滑动事件操作
            _openswipe($event){
                var direction = $event.direction;
                switch (direction) {
                    case 'left':
                        this._open(() => {
                            //滑动左边时把传进来的index值传出去同时把事件也暴露出去
                            this.$emit('swipe', this.index);
                        });
                        break;
                    case 'right':
                        this.close();
                        break;
                };
            },
            //点击当前文本内容复原
            _click(){
                this.close(() => {
                    //点击时把传进来的index值传出去同时把事件也暴露出去
                    this.$emit('click', this.index);
                });
            },
            //复原
            close (fn){
                var translate = 'translate(0px, 0px)';
                var el = this.$refs.swipedom;
                this._animationFn(el, 1, translate, 'ease-in', function () {
                    fn && fn();
                });
            },
            //左移
            _open(fn){
                var len = this.items.length;
                var translate = 'translate(-'+120*len+'px, 0px)';
                var el = this.$refs.swipedom;
                this._animationFn(el, 1, translate, 'ease-in', function () {
                    fn && fn();
                });
            },
            //动画
            _animationFn (el, opacity, translate, timing, fn) {
                animation.transition(el, {
                    styles: {
                        opacity: opacity,
                        transform: translate,
                        transformOrigin: 'center center'
                    },
                    duration: 200,
                    timingFunction: timing,
                    delay: 0
                }, () => {
                    fn && fn();
                })
            },

        }
    }
</script>

