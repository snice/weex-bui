<template>
	<div class="bui-weex-popover">
		<div :style="maskStyles" v-if="visible" @click="handleMask" class="bui-weex-popover__mask"></div>
		<div v-if="visible" class="bui-weex-popover__wrap" ref="el" :style="popoverStyles">
			<bui-icon v-if="hasArrow" :color="arrowColor" size="60" :style="arrowStyles" class="bui-weex-popover__arrow" :name="iconName"></bui-icon>
			<div :style="panelStyles" @click="handleFixClick" class="bui-weex-popover__inner">
				<slot></slot>
			</div>
		</div>		
	</div>
</template>
<script>
const animation = weex.requireModule('animation');
/*const DEFAULT_CONTENT_STYLE = {
	borderRadius : 4,
	padding : 10,
}*/
export default {
	props : {
		pos : {
			type : Object,
			default : ()=>({
				width : 0,
				height : 0,
				left : 0,
				top : 0,
				right : 0,
				bottom : 0
			})
		},
		placement : {
			type : String,
			default : 'bottom'
		},
		width : {
			type : [Number,String],
			default : 300
		},
		height : {
			type : [Number,String],
			default : 300
		},
		offsetX : {
			type : [Number,String],
			default : 0
		},
		offsetY : {
			type : [Number,String],
			default : 0
		},
		autoClose : {
			type : Boolean,
			default : true
		},
		duration : {
			type : [Number,String],
			default : 100
		},
		hasArrow: {
			type : Boolean,
			default : true
		},
		value : {
			type : Boolean,
			default : false
		},
		arrowColor : {
			type : String,
			default : '#ffffff'
		},
		maskStyle : {
			type : Object,
			default : ()=>({})
		},
		panelStyle : {
			type : Object,
			default : ()=>({})
		},
		
	},
	data (){
		return {
			visible : false,
 
		}
	},
	methods : {
		handleFixClick(e){
			
		},
		handleTrigger(e){
			
		},
		handleMask(){
			if(this.autoClose){
				this.hide();
			}
			this.$emit('onMask');
		},
		show(){
			this.visible = true;
			setTimeout(()=>{
				 	this.animationShow();
			 },40)
		},
	
		hide(){
			this.animationHide();
			
		},
		animationShow(){
		 	const el = this.$refs.el;
		 	if(!el){
		 		return;
		 	}
			animation.transition(el, {
         styles: {
           opacity: 1,
         },
         delay:0,
         duration: this.duration,
         timingFunction: 'ease-out',
         
       }, (e) => {
        
       });
		},
		animationHide(){
		 	const el = this.$refs.el;
		 	if(!el){
		 		return;
		 	}
		 	
			animation.transition(el, {
         styles: {
           opacity: 0,
         },
         delay:0,
         duration: this.duration,
         timingFunction: 'ease-out',
         
       }, (e) => {
        this.visible = false;
       });
		},

	},
	computed : {
		popoverStyles(){
			let { placement, pos , width , height} = this;

			let style = this.getCalculatedOffset;
			style.width = width;
			style.height = height;
			return style;
		},
		getCalculatedOffset(){
			let { placement, pos , width , height , offsetX , offsetY} = this;
			let style = {};
			let top,left;
			const padding = 40;
			switch (placement) {
				case 'bottom':
					top = pos.top + pos.height;
					left = pos.left + pos.width / 2 - width / 2;
					break;
				case 'bottom-start':
					top = pos.top + pos.height;
					left = pos.left - padding;
					break;
				case 'bottom-end':
					top = pos.top + pos.height;
					left = pos.right - width + padding;
					break;	
				case 'top':
					top = pos.top - height;
					left = pos.left + pos.width / 2 - width / 2;
					break;
				case 'top-start':
					top = pos.top - height;
					left = pos.left - padding;
					break;	
				case 'top-end':
					top = pos.top - height;
					left = pos.right - width + padding;
					break;		
				case 'left':
					top = pos.top + pos.height / 2 - height / 2;
					left = pos.left - width;
					break;	
				case 'left-start':
					top = pos.top - padding;
					left = pos.left - width;
					break;	
				case 'left-end':
					top = pos.top - pos.height - padding;
					left = pos.left - width;
					break;			
				case 'right':
					top = pos.top + pos.height / 2 - height / 2;
					left = pos.left + pos.width;
					break;		
				case 'right-start':
					top = pos.top - padding;
					left = pos.left + pos.width;
					break;
				case 'right-end':
					top = pos.top - pos.height - padding;
					left = pos.left + pos.width;
					break;
				default : 
					top = pos.top + pos.height;
					left = pos.left + pos.width / 2 - width / 2;
					break;

			}
			style.left = parseInt(left,10) + offsetX;
			style.top =  parseInt(top,10) + offsetY;
			return style;
		},
		arrowStyles(){
			let { placement, pos , width , height , offsetX , offsetY} = this;
			const arrowAdjust = 20;
			let style = {};
			let top,left;
			switch (placement) {
				case 'bottom':
					top = 6;
					left = width / 2 - arrowAdjust;
					break;
				case 'bottom-start':
					top = 6;
					left =  arrowAdjust * 2;
					break;	
				case 'bottom-end':
					top = 6;
					left =  width - arrowAdjust * 5;
					break;		
				case 'top':
					top = height - 65;
					left = width / 2 - arrowAdjust;
					break;
				case 'top-start':
					top = height - 65;
					left = arrowAdjust * 2;
					break;	
				case 'top-end':
					top = height - 65;
					left = width - arrowAdjust * 5;
					break;		
				case 'left':
					top = height / 2 - arrowAdjust;
					left = width - arrowAdjust * 3 - 3;
					break;
				case 'left-start':
					top =  arrowAdjust * 2;
					left = width - arrowAdjust * 3 -3;
					break;
				case 'left-end':
					top =  height - arrowAdjust * 5;
					left = width - arrowAdjust * 3 -3;
					break;			
				case 'right':
					top = height / 2 - arrowAdjust;
					left = 6;
					break;		
				case 'right-start':
					top = arrowAdjust * 2;
					left = 6;
					break;		
				case 'right-end':
					top =  height - arrowAdjust * 5;
					left = 6;
					break;
				default : 
					top = 6;
					left = width / 2 - arrowAdjust;		
					break;			
			}
			style.left = parseInt(left,10) ;
			style.top =  parseInt(top,10);
			return style;
		},
		iconName(){
			let {placement} = this;

			switch (placement) {
				case 'bottom':
				case 'bottom-start':
				case 'bottom-end':
					return 'ion-android-arrow-dropup'
					break;
				case 'top':
				case 'top-start':
				case 'top-end':
					return 'ion-android-arrow-dropdown'
					break;
				case 'left':
				case 'left-start':
				case 'left-end':
					return 'ion-android-arrow-dropright'
					break;	
				case 'right':
				case 'right-start':
				case 'right-end':
					return 'ion-android-arrow-dropleft'
					break;
				default:
					return 'ion-android-arrow-dropup'
					break;	
			}
		},
		maskStyles(){
			return this.maskStyle;
		},
		panelStyles(){
			return Object.assign({
				borderRadius : 4,
				padding : 10,
			},this.panelStyle)
		}

	},
	created(){
		 this.value ? this.show() : this.hide();

	},
	mounted(){

	},
	watch : {
		value(val){
			val ? this.show() : this.hide();

		},
		visible(val){
			this.$emit('input',val);
		}
	}
	
}
</script>
<style lang="scss" src="../css/popover.scss"></style>