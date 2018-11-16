<template>
	<div class="bui-weex-popover">
		<div :style="maskStyles" v-if="visible" @click="handleMask" class="bui-weex-popover__mask"></div>
		<div v-if="visible" class="bui-weex-popover__wrap" ref="el" :style="popoverStyles">
			<bui-icon v-if="hasArrow" :color="arrowColor" size="60" :style="arrowStyles" class="bui-weex-popover__arrow" :name="iconName"></bui-icon>
			<div :style="panelStyles" @click="handleFixClick" class="bui-weex-popover__inner">
				<list class="bui-weex-popover__list" >
					<header>
						<text :style="titleStyles" @click="handleListClick" class="bui-weex-popover__title" :value="title"></text>
					</header>
					<cell>
						<text :style="contentStyles" @click="handleListClick" class="bui-weex-popover__content" :value="content"></text>
					</cell>
				</list>
			</div>
		</div>		
	</div>
</template>
<script>
const animation = weex.requireModule('animation');
import buiPopover from './bui-popover.vue';
export default {
	props : {
		title : {
			type : String,
			default : ''
		},
		content : {
			type : String,
			default : ''
		},
		titleStyle : {
			type : Object,
			default : ()=>({})
		},
		contentStyle : {
			type : Object,
			default : ()=>({})
		},
	},
	data (){
		return {
			
 
		}
	},
	computed : {
		titleStyles(){
			return this.titleStyle;
		},
		contentStyles(){
			return this.contentStyle;
		}
	},
	methods : {
		handleListClick(){
			this.$emit('poptipClick');
		}
	},
	extends : buiPopover
	
}
</script>
<style lang="scss" src="../css/popover.scss"></style>