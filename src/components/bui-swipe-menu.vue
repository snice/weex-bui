<template>
    <div class="bui-list-swipe-menu">
        <div class="bui-cell-large">
            <div class="bui-list-swipe">
                <div class="bui-list-swipe-btn" :style="{'background-color': item.bgcolor}" @click="_actionClick(index)" v-for="(item, index) in items">
                    <text class="bui-list-swipe-btn-text">{{item.title}}</text>
                </div>
            </div>
            <div @click="_click" @swipe="_swipe($event)" class="bui-list-main bui-list-swipe-main" ref="swipedom">
                <div class="bui-list-main-left">
                    <slot name="content">
                        <text class="bui-list-title" v-if="title">{{title}}</text>
                    </slot>
                </div>
            </div>

        </div>
    </div>
</template>
<style lang="sass" src="../css/list.scss"></style>
<script>
    const animation = weex.requireModule('animation');
    let defaultAction=[
        {
            'title': '取消',
            'bgcolor' : '#c6c7c8'
        },
        {
            'title': '删除',
            'bgcolor' : '#fa3300'
        }
    ];

    module.exports = {
        props: {
            items: {
                type: Array,
                default:defaultAction
            },
            title: {
                type: String
            }
        },
        methods: {
            //操作点击事件
            _actionClick (index){
                this.close(()=>{
                    this.$emit('actionClick', index);
                });
            },
            _swipe(e){
                switch (e.direction) {
                    case 'left':
                        this.open(()=>{
                            this.$emit('swipe', this.index);
                        });
                        break;
                    case 'right':
                        this.close();
                        break;
                }
            },
            _click(){
                this.close(()=>{
                    this.$emit('click', this.index);
                });
            },
            close (fn){
                let translate = 'translate(0px, 0px)';
                let el = this.$refs.swipedom;
                this._animationFn(el, 1, translate, 'ease-in',()=>{
                    fn && fn();
                });
            },
            open(fn){
                let len = this.items.length;
                let translate = 'translate(-'+120*len+'px, 0px)';
                let el = this.$refs.swipedom;
                this._animationFn(el, 1, translate, 'ease-in',()=>{
                    fn && fn();
                });
            },
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
            }
        }
    }
</script>

