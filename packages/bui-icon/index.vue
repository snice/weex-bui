<template>
    <div class="icon-block" :style="{width:size,height:size}" @click="_click($event)">
        <text class="icon" :style="getStyle" @click="_click($event)">{{getFontName}}</text>
    </div>
</template>

<style>
.icon-block {
  /*justify-content: flex-start;*/
}

.icon {
  text-align: center;
}
</style>

<script>
import iconItems from '../font/ionicons.json'
const fontFamily = "ionfont";
const domModule = weex.requireModule("dom");
export default {
  beforeCreate() {
    domModule.addRule("fontFace", {
      fontFamily: fontFamily,
      src: "url('https://oss.zhuzhe.wang/fonts/ionicons.ttf')"
    });
  },
  props: {
    name: {
      type: String,
      defalut: ""
    },
    color: {
      type: String,
      default: "#9ea7b4"
    },
    size: {
      type: [Number, String],
      default: 48
    },
    activeColor: {
      type: String
    }
  },
  computed: {
    getFontName() {
      let icon = iconItems[this.name];
      return this.decode(icon || "");
    },
    getStyle() {
      let style = {
        color: this.color,
        "font-size": this.size,
        "font-family": fontFamily
      };
      if (this.activeColor) {
        style["color:active"] = this.activeColor;
      }
      return style;
    }
  },
  methods: {
    _click(e) {
      this.$emit("click", e);
    },
    decode(fontCode) {
      if (/^&#x/.test(fontCode)) {
        return String.fromCharCode(
          fontCode.replace(/^&#x/, "0x").replace(/;$/, "")
        );
      } else {
        return String.fromCharCode("0x" + fontCode);
      }
    }
  }
};
</script>