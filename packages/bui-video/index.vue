<template>
    <video-ex
            :src="src"
            :playstatus="playstatus"
            :autoplay="autoplay"
            :seek="seek"
            @pause="statusChange('pause')"
            @start="statusChange('start')"
            @finish="statusChange('finish')"
            @fail="statusChange('fail')"
            @progress="progress"></video-ex>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    playstatus: {
      type: String,
      default: "pause"
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    seek: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {};
  },
  methods: {
    statusChange: function(status) {
      this.$emit(status);
    },
    progress: function(res) {
      this.$emit("progress", res.total, res.progress);
    }
  }
};
</script>