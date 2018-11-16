<template>
    <div>
        <bui-header
                title="数字加减（bui-number-input）"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell label="数量" >
                <bui-number-input v-model="value" step=1 min="-2" max=15 @change="numberChange"></bui-number-input>
            </bui-cell>
        </scroller>
    </div>
</template>

<style lang="scss" src="src/css/buiweex.scss"></style>

<script>
    export default {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                value:4
            }
        },
        methods: {
            back() {
                this.$pop();
            },
            numberChange(value){
                this.$toast(value);
            }
        }
    }
</script>