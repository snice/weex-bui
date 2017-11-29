<template>
    <div class="bui-dropdown" :value="value" v-if="visible">
        <bui-mask @click="_maskClick"></bui-mask>
        <div class="bui-dropdown-box" ref="dropdownBox" :style="{'left': left, 'top': top, 'width': width}">
            <div class="bui-dropdown-content" :style="{ 'background-color': bgColor }">
                <slot></slot>
            </div>
            <text class="bui-dropdown-arrow" :style="{'color':bgColor,'font-family':'jiantou','left':arrowLeft}">&#xe646;</text>
        </div>
    </div>
</template>
<style lang="sass" src="../css/dropdown.scss"></style>
<script>
    var animation = weex.requireModule('animation');
    var platform = weex.config.env.platform;
    var colorWhite = "#ffffff";
    module.exports = {
        data: () => {
            return {
                width: "260px",
                left: "0px",
                top: "0px",
                arrowLeft: "40px",
                position: {
                    width: '0px',
                    height: '0px',
                    left: '0px',
                    right: '0px'
                },
                visible: false
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            bgColor: {
                type: String,
                default: colorWhite
            },
            center: {
                type: Boolean,
                default: false
            },
            autoWidth: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            value(val) {
                this.visible = val;
            },
            visible(val) {
                this.$emit('input', val);
            }
        },
        mounted(){
            if (this.value) {
                this.visible = true;
            }
        },
        created () {
            var bundleUrl = weex.config.bundleUrl;
            var url = bundleUrl.split('/').slice(0, -1).join('/');
            url += '/font/jiantou.ttf';
            var domModule = weex.requireModule("dom");
            domModule.addRule('fontFace', {
                'fontFamily': 'jiantou',
                'src': "url('" + url + "')"
            });
        },
        components: {
            'bui-mask': require('./bui-mask.vue')
        },
        methods: {
            show(event){
                this._reset();
                this.$nextTick(e => {
                    this._open(event);
                });
            },
            _reset(){
                this.width="260px";
                this.arrowLeft="40px";
            },
            _open(event) {
                var el = this.$refs.dropdownBox;

                this.position = event.position;
                //autoWidth默认true，宽度按触发元素宽度自适应，如果控制宽度可设置为false，宽度为260px
                if (this.autoWidth) {
                    if (this.position.width >= 260) {
                        this.width = this.position.width;
                        if (this.center) {
                            this.arrowLeft = this.position.width / 2 - 20;
                            this.left = this.position.x;
                        } else {
                            if ((750 - this.position.x) < 260) {
                                this.left = this.position.x - (260 - (750 - this.position.x)) - 20;
                                this.arrowLeft = 260 - 80;
                            } else {
                                this.left = this.position.x + "px";
                            }
                        }
                    } else {
                        if (this.center) {
                            this.arrowLeft = 260 / 2 - 20;
                            this.left = this.position.x - (260 - this.position.width) / 2;
                        } else {
                            if ((750 - this.position.x) < 260) {
                                this.left = this.position.x - (260 - (750 - this.position.x)) - 20;
                                this.arrowLeft = 260 - 80;
                            } else {
                                this.left = this.position.x + "px";
                            }
                        }
                    }

                } else {
                    if (this.center) {
                        this.arrowLeft = 260 / 2 - 20;
                        this.left = this.position.x + this.position.width / 2 - 130;
                    } else {
                        if (this.position.x == 0) {
                            this.left = this.position.x + 20;
                        }
                        if ((750 - this.position.x) <= 260) {
                            this.left = this.position.x - (260 - (750 - this.position.x)) - 20;
                            this.arrowLeft = 260 - 80;
                        }
                    }

                }

                if (platform == "android") {
                    this.top = this.position.y - 60;
                } else if (platform == "iOS") {
                    this.top = this.position.y - 20;
                }

                var translate = 'translate(0px, ' + parseInt(this.position.height) + 'px)';
                this._animationFn(el, "1", translate, 'ease-in');

            },
            _animationFn (el, opacity, translate, timing, fn) {
                animation.transition(el, {
                    styles: {
                        opacity: opacity,
                        transform: translate,
                        transformOrigin: 'center center'
                    },
                    duration: 200, //ms
                    timingFunction: timing,
                    delay: 0 //ms
                }, () => {
                    fn && fn();
                })
            },
            _maskClick() {
                var el = this.$refs.dropdownBox;
                var translate = 'scale(0.9, 0.9)';
                this._animationFn(el, "0", translate, 'ease-out', () => {
                    this.visible = false;
                    this.$emit("onMaskClick");
                });
            }
        }
    }
</script>

