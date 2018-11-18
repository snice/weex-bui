<template>
  <list ref="dropload" class="bui-weex-dropload" @scroll="onscroll" :style="droploadStyle" @loadmore="onloadmore" :loadmoreoffset="100">
    <refresh v-if="hasRefresh" class="bui-weex-dropload__refresh" @refresh="onrefresh"  @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'" :style="refreshStyles">
          <text class="bui-weex-dropload__text" :style="refreshTextStyle">{{refreshText}}</text>
          <loading-indicator :style="refreshIconStyle" class="bui-weex-dropload__indicator"></loading-indicator>
        </refresh>
    <cell class="bui-weex-dropload__cell" v-if="$slots.content">
      <slot name="content"></slot>
    </cell>
    <slot v-if="$slots.default" class="bui-weex-dropload__cell"></slot>
    <loading v-if="isShowLoading" class="bui-weex-dropload__loading"  :display="loadinging ? 'show' : 'hide'" @loading="onloading" :style="loadingStyles">
      <text class="bui-weex-dropload__text" :style="loadingTextStyles">{{loadingText}}</text>
     <loading-indicator :style="loadingIconStyles" class="bui-weex-dropload__indicator"></loading-indicator>
   </loading>
  </list>
</template>
<script>
export default {
  name: "bui-dropload",
  props: {
    distance: {
      type: Number,
      default: 100
    },
    hasRefresh: {
      type: Boolean,
      default: true
    },
    hasLoading: {
      type: Boolean,
      default: true
    },
    hasLoadmore: {
      type: Boolean,
      default: false
    },
    refreshTextMap: {
      type: Object,
      default: () => ({})
    },
    loadingTextMap: {
      type: Object,
      default: () => ({})
    },
    refreshTextStyle: {
      type: Object,
      default: () => ({})
    },
    refreshIconStyle: {
      type: Object,
      default: () => ({})
    },
    loadingTextStyle: {
      type: Object,
      default: () => ({})
    },
    loadingIconStyle: {
      type: Object,
      default: () => ({})
    },
    refreshStyle: {
      type: Object,
      default: () => ({})
    },
    loadingStyle: {
      type: Object,
      default: () => ({})
    },
    droploadStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      canLoadmore: true,
      isRefreshBack: false,
      refreshing: false,
      loadinging: false,
      refreshText: "",
      loadingText: "",
      loadmoreText: "加载更多",
      refreshTextDefault: {
        start: "下拉刷新",
        move: "释放立即刷新",
        success: "刷新完成",
        fail: "刷新失败，请重试"
      },
      loadingTextDefault: {
        start: "上拉加载更多",
        success: "加载完成",
        empty: "没有更多了",
        fail: "加载失败，请重试"
      }
    };
  },
  methods: {
    onrefresh(event) {
      this.refreshing = true;
      this.$emit("refresh", this.refreshRecover);
    },
    refreshRecover(state = "success") {
      this.isRefreshBack = true;
      switch (state) {
        case "success":
          this.refreshText = this.refreshTextDefault.success;

          break;
        case "fail":
          this.refreshText = this.refreshTextDefault.fail;
          break;
        default:
          this.refreshText = state;
          break;
      }
      setTimeout(() => {
        this.refreshing = false;
        setTimeout(() => {
          this.isRefreshBack = false;
          this.refreshText = this.refreshTextDefault.start;
        }, 200);
      }, 500);
    },
    onpullingdown(event) {
      if (
        Math.abs(event.pullingDistance) >= this.distance &&
        !this.isRefreshBack
      ) {
        this.refreshText = this.refreshTextDefault.move;
      }
    },
    loadingRecover(state = "success") {
      switch (state) {
        case "empty":
          this.loadingText = this.loadingTextDefault.empty;
          break;
        case "success":
          this.loadingText = this.loadingTextDefault.success;
          break;
        case "fail":
          this.loadingText = this.loadingTextDefault.fail;
          break;
        default:
          this.loadingText = state;
          break;
      }
      setTimeout(() => {
        this.loadinging = false;
        setTimeout(() => {
          this.loadingText = this.loadingTextDefault.start;
        }, 200);
      }, 1000);
    },
    onloading(event) {
      this.loadinging = true;
      this.loadingText = this.loadingTextDefault.start;

      this.$emit("loading", this.loadingRecover);
    },
    onscroll(event) {
      this.$emit("scroll", event);
    },
    onloadmore(event) {
      this.$refs.dropload.resetLoadmore();
      this.$emit("loadmore", event);
    },
    setRefreshTextMap(val) {
      this.refreshTextDefault = Object.assign(
        {},
        this.refreshTextDefault,
        val || {}
      );
      this.refreshText = this.refreshTextDefault.start;
    },
    setLoadingTextMap(val) {
      this.loadingTextDefault = Object.assign(
        {},
        this.loadingTextDefault,
        val || {}
      );
      this.loadingText = this.loadingTextDefault.start;
    }
  },
  created() {
    this.setRefreshTextMap(this.refreshTextMap);
    this.setLoadingTextMap(this.loadingTextMap);
  },
  mounted() {},
  computed: {
    refreshStyles() {
      // let width = this.$getWidth();
      let style = {
        width: "750px"
      };
      return Object.assign(this.refreshStyle, style);
    },
    loadingStyles() {
      // let width = this.$getWidth();
      let style = {
        width: "750px"
      };
      return Object.assign(this.loadingStyle, style);
    },
    loadingIconStyles() {
      let style = {
        opacity: this.loadinging ? 1 : 0
      };
      return Object.assign(this.loadingIconStyle, style);
    },
    loadingTextStyles() {
      let style = {
        opacity: this.loadinging ? 1 : 0
      };
      return Object.assign(this.loadingTextStyle, style);
    },
    isShowLoading() {
      if (this.$isIPhone) {
        return this.hasLoading && !this.refreshing;
      } else {
        return this.hasLoading;
      }
    }
  },
  watch: {
    refreshTextMap(val) {
      this.setRefreshTextMap(val);
    },
    loadingTextMap(val) {
      this.setLoadingTextMap(val);
    }
  }
};
</script>
<style lang="scss" src="../../theme/css/dropload.scss"></style>
