<template>
    <div>
        <div v-if="showSolid || showHollow"
             :class="['tag-item','tag-border',showHollow && 'tag-hollow']"
             :style="tagTextStyle">
            <text class="tag-text" :style="{color:fontColor}">{{value}}</text>
        </div>
        <bui-image v-if="showImage"
               :src="img"
               @load="onLoad"
               :aria-hidden="true"
               :style="{ width: imgWidth+'px'}"
               class="tag-image"></bui-image>
        <div class="tag-special tag-border"
             :style="{borderColor:tagColor}"
             :accessible="true"
             :aria-label="value"
             v-if="showSpecial">
            <div class="tag-left" :style="{backgroundColor:tagColor}">
                <bui-image :src="specialIcon" class="left-image"></bui-image>
            </div>
            <text class="tag-text" :style="{color:fontColor}">{{value}}</text>
        </div>
    </div>
</template>

<script>
import buiImage from "../bui-image";
export default {
  components: {
    buiImage
  },
  props: {
    type: {
      type: String,
      default: "solid"
    },
    value: {
      type: [String, Number],
      default: "测试测试"
    },
    tagColor: {
      type: String,
      default: "#5da3f6"
    },
    fontColor: {
      type: String,
      default: "#333333"
    },
    specialIcon: {
      type: String,
      default: ""
    },
    img: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      imgWidth: 90
    };
  },
  computed: {
    showSolid() {
      const { type, value } = this;
      return type === "solid" && value !== "";
    },
    showHollow() {
      const { type, value } = this;
      return type === "hollow" && value !== "";
    },
    showSpecial() {
      const { type, value, specialIcon } = this;
      return type === "special" && value !== "" && specialIcon !== "";
    },
    showImage() {
      const { type, img } = this;
      return type === "image" && img !== "";
    },
    tagTextStyle() {
      const { tagColor, showSolid } = this;
      return showSolid
        ? { backgroundColor: tagColor }
        : { borderColor: tagColor };
    }
  },
  methods: {
    onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {
        const width = e.size.naturalWidth;
        const height = e.size.naturalHeight;
        this.imgWidth = width * (46 / height);
      }
    },
    close(event) {
      this.$emit("close", event);
    }
  }
};
</script>

<style scoped>
.tag-item {
  height: 46px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.tag-border {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.tag-hollow {
  border-width: 1px;
}
.tag-image {
  height: 46px;
}
.tag-special {
  border-width: 1px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.left-image {
  width: 40px;
  height: 40px;
}
.tag-left {
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
}
.tag-text {
  font-size: 26px;
  height: 34px;
  line-height: 34px;
  padding-left: 16px;
  padding-right: 16px;
}
</style>