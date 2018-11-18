<template>
    <div v-if="value">
        <bui-mask :rgba="rgba" @click="maskClick"></bui-mask>
        <div ref="popupBox"
            :height="popupHeight"
            :hack="isNeedShow"
            :class="['bui-popup', pos]"
            :style="popupStyle">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.bui-popup {
  position: fixed;
  width: 750px;
}

.top {
  left: 0;
  right: 0;
}

.bottom {
  left: 0;
  right: 0;
}

.left {
  bottom: 0;
  top: 0;
}

.right {
  bottom: 0;
  top: 0;
}
</style>

<script>
const animation = weex.requireModule("animation");
export default {
  props: {
    rgba: {
      type: [String, Number]
    },
    value: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: "bottom"
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    height: {
      type: [Number, String],
      default: 840
    },
    width: {
      type: [Number, String],
      default: 750
    }
  },
  watch: {
    value(val) {
      this.$emit("input", val);
    }
  },
  computed: {
    isNeedShow() {
      setTimeout(() => {
        this.appearPopup(this.value);
      }, 50);
      return this.value;
    },
    popupHeight() {
      this.appearPopup(this.value, 150);
      return this.height;
    },
    popupStyle() {
      const { pos, width, height, backgroundColor } = this;
      let style = {
        width: `${width}px`,
        backgroundColor: backgroundColor
      };
      if (pos == "top") {
        style = Object.assign(style, {
          top: `${-height}px`,
          height: `${height}px`
        });
      }
      if (pos == "bottom") {
        style = Object.assign(style, {
          bottom: `${-height}px`,
          height: `${height}px`
        });
      }
      if (pos == "left") {
        style = Object.assign(style, {
          left: `${-width}px`
        });
      }
      if (pos == "right") {
        style = Object.assign(style, {
          right: `${-width}px`
        });
      }
      return style;
    }
  },
  methods: {
    maskClick() {
      this.appearPopup(false);
    },
    appearPopup(bool) {
      const popupEl = this.$refs["popupBox"];
      if (!popupEl) {
        return;
      }
      animation.transition(
        popupEl,
        {
          styles: {
            transform: this.getTransform(
              this.pos,
              this.width,
              this.height,
              !bool
            )
          },
          duration: 300,
          delay: 0
        },
        () => {
          if (!bool) {
            this.$emit("input", false);
          }
        }
      );
    },
    getTransform(pos, width, height, bool) {
      let _size = pos === "top" || pos === "bottom" ? height : width;
      let _transform;
      bool && (_size = 0);
      switch (pos) {
        case "top":
          _transform = `translateY(${_size}px)`;
          break;
        case "bottom":
          _transform = `translateY(-${_size}px)`;
          break;
        case "left":
          _transform = `translateX(${_size}px)`;
          break;
        case "right":
          _transform = `translateX(-${_size}px)`;
          break;
      }
      return _transform;
    }
  }
};
</script>