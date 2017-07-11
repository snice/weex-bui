<template>
    <div @viewappear="onappear">
        <bui-header
                :title="'视频播放'"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <bui-content-scroll class="span1">
            <div style="height: 1800px;">
                <bui-video
                        :src="opts.src"
                        autoplay="false"
                        :playstatus="opts.status"
                        :seek="opts.seek"
                        @pause="statusChange('pause')"
                        @start="statusChange('start')"
                        @finish="statusChange('finish')"
                        @fail="statusChange('fail')"
                        @progress="progress"
                        style="width:750px;height:400px;"></bui-video>

                <bui-button value="换地址" @click="change"></bui-button>
                <bui-button value="暂停" @click="pause"></bui-button>
                <bui-button value="继续" @click="resume"></bui-button>
                <bui-button value="指定位置" @click="seekTo"></bui-button>

            </div>
        </bui-content-scroll>
    </div>

</template>

<style lang="sass" src="../../css/layout.scss"></style>
<style lang="sass" src="../../css/example.scss"></style>
<style lang="sass" src="../../css/video.scss"></style>
<script>
    var buiweex = require("../../js/buiweex.js");
    export default {
        data: function () {
            return {
                opts: {
                    src: "http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4",
//                    src: "http://4667.liveplay.myqcloud.com/live/4667_7d9bbb4d66f7eaa2.m3u8",
                    status: "start",
                    isAuto: false,
                    seek: 0
                },
                leftItem: {
                    icons: 'icon-back'
                }
            }
        },
        components: {
            "bui-video": require('../../components/bui-video.vue')
        },
        methods: {
            "back": function () {
                buiweex.pop();
            },
            change: function () {
                this.opts.src = "http://114.67.23.110:8088/data/userdata/vod/transcode/201705/8ejXIdYu_pu.mp4";

                setTimeout(() => {
                    this.opts.status = "play";
                }, 2000);
            },
            pause: function () {
                this.opts.status = "pause"
            },
            resume: function () {
                this.opts.status = "play"
            },
            seekTo: function () {
                this.opts.seek = this.opts.seek + 150000
            },
            statusChange: function (type) {
                buiweex.toast(type);
            },
            progress: function (total, progress) {
                //buiweex.toast(total + " " + progress);
            }
        }
    }
</script>