<template>
    <div class="rich-cell" v-if="content.length!=0">
        <div :key="i" v-for="(v,i) in content">
            <bui-richcell-text @click="_click($event,v)" v-if="v.type=='text' && v.value"
                               :text-value="v.value"
                               :text-style="v.style"
                               :has-text-margin="hasTextMargin"
                               :text-theme="v.theme"></bui-richcell-text>
            <bui-icon @click="_click($event,v)" v-if="v.type=='icon' && v.icon" :name="v.icon" :color="v.color" :size="v.size"></bui-icon>
            <bui-image @click="_click($event,v)" v-if="v.type=='image' && v.src" :src="v.src" :width="v.width" :height="v.height"></bui-image>
        </div>
    </div>
</template>

<style scoped>
    .rich-cell {
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>

<script>
    export default {
        components: {
            "bui-richcell-text": require('./bui-richcell-text.vue')
        },
        props: {
            content: {
                type: Array,
                default: function () {
                    return []
                }
            },
            hasTextMargin: {
                type: Boolean,
                default: true
            }
        },
        methods:{
            _click(e,obj){
                this.$emit("click",e,obj);
            }
        },
        data: () => ({

        })
    };
</script>