<template>
    <div>
        <bui-header title="BUI-Sample" :leftItem="leftItem" @leftClick="back">
        </bui-header>
        <scroller>
            <catalog title="Layout"></catalog>
            <bui-cell @cellClick="jumpTo(item.url)" :title="item.name" :key="index" v-for="(item,index) in layout">
                <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
            </bui-cell>
            <catalog title="Base"></catalog>
            <bui-cell @cellClick="jumpTo(item.url)" :title="item.name" :key="index" v-for="(item,index) in base">
                <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
            </bui-cell>
            <catalog title="Form"></catalog>
            <bui-cell @cellClick="jumpTo(item.url)" :title="item.name" :key="index" v-for="(item,index) in form">
                <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
            </bui-cell>
            <catalog title="Popup"></catalog>
            <bui-cell @cellClick="jumpTo(item.url)" :title="item.name" :key="index" v-for="(item,index) in popup">
                <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
            </bui-cell>
            <catalog title="More"></catalog>
            <bui-cell @cellClick="jumpTo(item.url)" :title="item.name" :key="index" v-for="(item,index) in more">
                <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
            </bui-cell>
        </scroller>
    </div>
</template>

<style lang="scss" src="src/css/buiweex.scss"></style>

<script>
    import catalog from '../catalog.vue';
    const globalEvent = weex.requireModule('globalEvent');
    module.exports = {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                layout: [
                    {name: "布局(flexbox)", text: "", url: "flex-box-demo.js"},
                ],
                base:[
                    {name: "按钮(bui-button)", text: "", url: "button-demo.js"},
                    {name: "图标(bui-icon)", text: "", url: "icon-demo.js"},
                    {name: "图片(bui-image)", text: "", url: "image-demo.js"},
                    {name: "提示(bui-tip)", text: "", url: "tip-demo.js"},
                    {name: "面板(bui-panel)", text: "", url: "panel-demo.js"},
                    {name: "头部(bui-header)", text: "", url: "header-demo.js"},
                    {name: "滑动菜单(bui-swipe-cell)", text: "", url: "swipe-cell-demo.js"},
                    {name: "选项卡(bui-tabbar)", text: "", url: "tabbar-demo.js"},
                    {name: "选项卡(bui-tabbar-scroller)", text: "", url: "tabbar-scroller-demo.js"},
                    {name: "选项卡(bui-timeline)", text: "", url: "timeline-demo.js"},
                ],
                form:[
                    {name: "单元格(bui-cell)", text: "", url: "cell-demo.js"},
                    {name: "单选(bui-radio)", text: "", url: "radio-demo.js"},
                    {name: "多选(bui-checkbox)", text: "", url: "checkbox-demo.js"},
                    {name: "数字加减(bui-number-input)", text: "", url: "input-number-demo.js"},
                ],
                popup:[
                    {name: "弹出框(bui-dialog)", text: "", url: "dialog-demo.js"},
                    {name: "上拉菜单(bui-actionsheet)", text: "", url: "actionsheet-demo.js"},
                    {name: "下拉菜单(bui-dropdown)", text: "", url: "dropdown-demo.js"},
                    {name: "弹出层(bui-popup)", text: "", url: "popup-demo.js"}
                ],
                more:[
                    {name: "懒加载(bui-lazy-render)", text: "", url: "lazy-render-demo.js"},
                    {name: "轮播图片(bui-image-slider)", text: "", url: "slider-demo.js"},
                    {name: "搜索框(bui-searchbar)", text: "", url: "searchbar-demo.js"},
                    {name: "富文本(bui-richcell)",text:"",url:"richcell-demo.js"},
                    {name: "多格筛选(bui-grid-select)",text:"",url:"grid-select-demo.js"},
                    {name: "流程图(bui-flow)",text:"",url:"flow-demo.js"},
                    {name: "标签(bui-tag)",text:"",url:"tag-demo.js"},
                    {name: "路由(router)",text:"",url:"index.router.js"},
                ]
            }
        },
        components: {
            catalog
        },
        methods: {
            jumpTo (file) {
                if (file) {
                    var url = file;
                    this.$push(url);
                }
            },
            back () {
                this.$pop();
            }
        },
        mounted: function () {
            globalEvent.addEventListener("androidback",(e)=> {
                this.$pop();
            });
        }
    }
</script>
