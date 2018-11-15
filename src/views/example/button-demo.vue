<template>
    <div>
        <bui-header
                title="按钮（bui-button）"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller class="center">
            <bui-button class="ex-btn" value="Normal" @click="btnEvent"></bui-button>
            <bui-button class="ex-btn" type="highlight" value="Highlight" @click="btnEvent"></bui-button>
            <bui-button class="ex-btn" type="primary" value="Primary" @click="btnEvent"></bui-button>
            <bui-button class="ex-btn" type="success" value="Success" @click="btnEvent"></bui-button>
            <bui-button class="ex-btn" type="warning" value="Warning" @click="btnEvent"></bui-button>
            <bui-button class="ex-btn" type="danger" value="Danger" @click="btnEvent"></bui-button>
            <bui-button class="ex-btn" disabled=true value="Disabled" @click="btnEvent"></bui-button>
            <bui-button class="ex-btn" type="text" value="Text Button" @click="btnEvent"></bui-button>

            <bui-button class="ex-btn" value="Button" type="highlight" @click="btnEvent">
                <bui-icon name="ion-checkmark-circled" color="#EE9900"></bui-icon>
            </bui-button>

            <bui-button class="ex-btn" value="Custom Button" type="highlight" :btnStyle="btnStyle"  @click="btnEvent">
            </bui-button>
        </scroller>
    </div>
</template>

<style lang="scss" src="src/css/buiweex.scss"></style>

<style>
    .ex-btn {
        margin-top: 20px;
    }
</style>

<script>
    export default {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                btnStyle:{
                    width:300,
                    backgroundColor:'#f3f2f23',
                    'backgroundColor:active':'#f6f2f23'
                }
            }
        },
        methods: {
            back() {
                this.$pop();
            },
            btnEvent(e) {
                this.$toast("button click");
            }
        }
    }
</script>