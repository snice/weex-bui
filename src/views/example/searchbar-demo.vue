<template>
    <div>
        <bui-header
                title="搜索框(bui-searchbar)"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <div>
            <text class="h4">类型1</text>
            <bui-searchbar-center @search="onSearch" @focus="onfocus()" @blur="onblur()" @clear="onclear()"></bui-searchbar-center>
            <text class="h4">类型2</text>
            <bui-searchbar-left @search="onSearch" :autofocus=true></bui-searchbar-left>
        </div>
    </div>
</template>

<style lang="scss" src="src/css/buiweex.scss"></style>

<style>

</style>

<script>
    export default {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                }
            }
        },
        methods: {
            back() {
                this.$pop();
            },
            onSearch(value){
                this.$toast(value);
            },
            onfocus(e){
                 this.$toast("focus");
            },
            onblur(e){
                this.$toast("blur");
            },
            onclear(){
                this.$toast("clear");
            }
        }
    }
</script>