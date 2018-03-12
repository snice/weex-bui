<template>
    <div class="bui-flow-box">
        <div class="bui-flow" v-for="(item, index) in newItems" @click="_click(index)">
            <div class="bui-flow-header bui-flow-list">
                <div class="bui-flow-line" :style="Object.assign({'top': (index==0 ? '20px': '0px'),'bottom': (index == newItems.length-1 ? '20px': '0px')}, item.lineStyle)"></div>
                <div class="bui-flow-header-point" :class="[item.highlight ? 'highlight-point':'']" :style="item.pointStyle"></div>
                <text class="bui-flow-text bui-flow-header-title" :class="[item.highlight ? 'text-highlight-title':'']" :style="item.titleStyle">{{item.title}}</text>
            </div>
            <div class="bui-flow-main bui-flow-list">
                <div class="bui-flow-line" :style="Object.assign({'width': (index == newItems.length-1 ? '0px':'2px')}, item.lineStyle)"></div>
                <div class="bui-flow-text bui-flow-main-desc">
                    <text class="desc-text">{{item.desc}}</text>
                    <text class="desc-date">{{item.date}}</text>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    module.exports = {
        props: {
            //数据
            items: {
                type: Array
            },
            //自定义
            customStyles: {
                type: Object,
                default: () => ({})
            }
        },
        watch: {

        },
        computed: {
            newItems () {
                return this.initItems(this.items);
            }

        },
        methods: {
            _click(index){
                this.$emit('click', index);
            },
            initItems(items){
                    const {
                            lineColor,
                            pointInnerColor,
                            pointBorderColor,
                            highlightTitleColor,
                            highlightPointInnerColor,
                            highlightPointBorderColor
                    } = this.customStyles;
                    const len = items.length;
                    const pre = Date.now();

                    return items.map((item, index) => {
                        item.key = `${pre}_${index}`;
                        item.pointStyle = {};
                        item.lineStyle = {};
                        item.titleStyle = {};

                        if (lineColor) item.lineStyle.backgroundColor = lineColor;
                        if (pointInnerColor) item.pointStyle.backgroundColor = pointInnerColor;
                        if (pointBorderColor) item.pointStyle.borderColor = pointBorderColor;

                        if (item.highlight) {
                            if (highlightTitleColor) item.titleStyle.color = highlightTitleColor;
                            if (highlightPointInnerColor) item.pointStyle.backgroundColor = highlightPointInnerColor;
                            if (highlightPointBorderColor) item.pointStyle.borderColor = highlightPointBorderColor;
                        }
                        return item;
                    });

            }
        }
    }
</script>

<style lang="sass" src="../css/flow.scss"/>