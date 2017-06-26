<template>
    <div @viewappear="onappear">
        <bui-header
                :title="'视频播放'"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <bui-content-scroll class="span1">
            <div style="height: 1800px;">
                <video class="bui-video"
                       :src="src"
                       autoplay controls
                       play-status="play"
                       @start="onstart($event)"
                       @pause="onpause($event)"
                       @finish="onfinish($event)"
                       @fail="onfail($event)"></video>
                <text class="info">state: {{state}}。目前官方video组件能力较弱，不推荐使用</text>

                <bui-video
                        :src="opts.src"
                        :play-status="opts.status"
                        style="width:750px;height:400px;"></bui-video>

                <bui-button value="换地址" @click="change"></bui-button>
                <bui-button value="暂停" @click="pause"></bui-button>
                <bui-button value="继续" @click="resume"></bui-button>
                <bui-button value="停止" @click="stop"></bui-button>
                <bui-button value="播放位置" @click="seekTo()"></bui-button>
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
                    status: "start",
                    isAuto: false
                },
                leftItem: {
                    icons: 'icon-back',
                },
                state: '---',
                src: 'http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4'
            }
        },
        components: {},

        methods: {
            "back": function () {
                buiweex.pop();
            },
            "onstart": function () {
                console.log(this.stateall);
                this.stateall = '55555';
                console.log(this.stateall);
            },
            "onpause": function (event) {
                console.log(event);
                console.log(this.state);
                this.state = 'onpause';
                console.log(this.state);
            },
            "onfinish": function (event) {
                this.state = 'onfinish'
            },
            "onfail": function (event) {
                this.state = 'onfinish'
            },
            change: function () {
                this.opts.src = "http://114.67.23.110:8088/data/userdata/vod/transcode/201705/8ejXIdYu_pu.mp4";
            },
            pause: function () {
                this.opts.status = "pause"
            },
            resume: function () {
                this.opts.status = "start"
            },
            stop: function () {
                this.opts.status = "stop"
            },
            seekTo: function () {
                this.seek = this.seek + 150000
            }
        }
    }
</script>