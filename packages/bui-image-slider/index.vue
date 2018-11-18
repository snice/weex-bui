<template>
    <slider :style="sliderStyle" :interval="interval" :auto-play="autoplay" :infinite="infinite"
            @change="_change">
        <div :key="index" v-for="(item,index) in items">
            <bui-image @click="_click($event,index)"
                    :width="imgWidth"
                    :resize="imgResize"
                    :height="imgHeight"
                    :placeholder="placeholder"
                    :src="item.url">
            </bui-image>
        </div>
        <indicator class="indicator" :style="indicatorStyle"></indicator>
    </slider>
</template>

<style>
.indicator {
  width: 750px;
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 0;
  item-color: #ffffff;
  item-selectedcolor: #747474;
  item-size: 20px;
  opacity: 0.8;
}
</style>
<script>
import buiImage from "../bui-image";
export default {
  components: { buiImage },
  props: {
    sliderStyle: {
      type: Object,
      default: () => {
        return {
          width: "750px",
          height: "400px"
        }
      }
    },
    indicatorStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    interval: {
      type: Number,
      default: 6000 //ms
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    infinite: {
      type: Boolean,
      default: true
    },
    imgResize: {
      type: String,
      default: "stretch"
    },
    imgWidth: {
      type: [Number, String],
      default: 750
    },
    imgHeight: {
      type: [Number, String],
      default: 750
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  methods: {
    _change(e) {
      this.$emit("change", e);
    },
    _click(e, index) {
      this.$emit("itemClick", e, index);
    }
  }
};
</script>
