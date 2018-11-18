<template>
    <div v-if="value">
        <bui-mask @click="_maskClick"></bui-mask>

        <div class="bui-actionsheet-box" :style="{'bottom': '-'+bottom+'px'}" ref="actionsheetBox">
            <div class="bui-actionsheet-top">
                <text class="bui-actionsheet-title" v-if="title">{{title}}</text>
                <div class="bui-actionsheet-content">
                    <text class="bui-actionsheet-list" :key="index" v-for="(item,index) in items" @click="_itemClick(item,index)">{{item}}</text>
                </div>
            </div>
            <div class="bui-actionsheet-bottom">
                <text class="bui-actionsheet-btn" @click="_btnClick">{{button}}</text>
            </div>
        </div>
    </div>

</template>

<script>
import buiMask from "../bui-mask";
const animation = weex.requireModule("animation");
export default {
  components: {
    buiMask
  },
  props: {
    title: {
      default: "请选择"
    },
    items: {
      type: Array
    },
    button: {
      default: "取消"
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      this.$emit("input", val);
      setTimeout(() => {
        if (val) {
          this._open();
        }
      }, 50);
    }
  },
  computed: {
    bottom() {
      return (this.items.length + 1) * 100 + 80;
    }
  },
  methods: {
    show() {},
    _animationFn: function(translate, fn) {
      let el = this.$refs.actionsheetBox;
      animation.transition(
        el,
        {
          styles: {
            transform: translate,
            transformOrigin: "center center"
          },
          duration: 200,
          timingFunction: "ease-in",
          delay: 0
        },
        () => {
          fn && fn();
        }
      );
    },
    _open() {
      let translate = "translate(0px, -" + (this.bottom + 20) + "px, 0px)";
      this._animationFn(translate);
    },
    _maskClick() {
      let translate = "translate(0px, " + (this.bottom + 20) + "px, 0px)";
      this._animationFn(translate, () => {
        this.$emit("input", false);
        this.$emit("maskClick");
      });
    },
    _itemClick(item, index) {
      let translate = "translate(0px, " + (this.bottom + 20) + "px, 0px)";
      this._animationFn(translate, () => {
        this.$emit("input", false);
        this.$emit("itemClick", item, index);
      });
    },
    _btnClick() {
      let translate = "translate(0px, " + (this.bottom + 20) + "px, 0px)";
      this._animationFn(translate, () => {
        this.$emit("input", false);
        this.$emit("cancel");
      });
    }
  }
};
</script>

<style lang="scss" src="../../theme/css/actionsheet.scss"/>