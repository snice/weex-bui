<template>
    <div class="bui-grid-select-box">
        <bui-option v-for="(item, index) in newItems"
                    v-bind="Object.assign({}, customStyles, item)"
                    :key="index"
                    :style="{marginTop: index >= cols ? lineSpacing : null}"
                    :index="index"
                    @select="select(index)"></bui-option>
        <bui-option v-for="(item, index) in hackList"
                    v-bind="Object.assign({}, customStyles, item)"
                    :key="index"
                    :style="{opacity: 0, marginTop: index >= cols ? lineSpacing : null}"></bui-option>
    </div>

</template>

<script>
    import buiOption from './bui-option.vue';
    module.exports = {
        components: { 'bui-option' : buiOption },
        props: {
            // 列数
            cols: {
                type: Number,
                default: 4
            },
            items: {
                type: Array
            },
            //单选
            single: {
                type: Boolean,
                default: false
            },
            //可选个数限制
            limit: {
                type: Number
            },
            customStyles: {
                type: Object,
                default: () => ({})
            }
        },
        data () {
            return {
                newItems: this.initList()
            }
        },
        watch: {
            items () {
                this.newList = this.initList();
            }
        },
        computed: {
            //补充层
            hackList () {
                const { items, cols } = this;
                const remainder = items.length % cols;
                const len = remainder ? cols - remainder : 0;
                return Array.apply(null, { length: len });
            }
        },
        created () {
            // 行间距
            this.lineSpacing = this.customStyles.lineSpacing || '12px';
        },
        methods: {
            //数据赋值
            initList () {
                const single = this.single;
                let selectedCount = 0;

                const newItems = this.items.map((item, i) => {
                    let { selected, disabled } = item;
                    disabled = !!disabled;
                    // disabled为true时认为selected无效，同时单选模式下只认为第一个selected为true的为有效值
                    selected = !disabled && !!selected && (!single || selectedCount === 0);
                    if (item.selected) selectedCount += 1;
                    return item;
                });
                this.selectedCount = selectedCount;
                return newItems;
            },
            //点击筛选操作
            select(index){
                if(this.newItems[index].disabled) return;
                const selected = this.newItems[index].selected;
                if (this.limit <= this.selectedCount && !selected) {
                    this.$emit('overLimit', this.limit);
                } else {
                    this.updateList(index);
                    this.$emit('select', {
                        selectIndex: index,
                        selected: !selected,
                        selectedList: this.newItems.filter(item => item.selected)
                    });
                }
            },
            //筛选时数据渲染
            updateList(index){
                const single = this.single;
                let selectedCount = 0;
                this.newItems = this.newItems.map((item, i) => {
                    if (single) {
                        item.selected = index === i && !item.selected;
                    } else {
                        if (i === index) item.selected = !item.selected;
                    }
                    if (item.selected) selectedCount += 1;
                    return item;
                });
                this.selectedCount = selectedCount;
            }
        }
    }
</script>

<style lang="sass" src="../css/gridselect.scss"/>