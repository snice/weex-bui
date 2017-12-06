<template>
    <div class='number-input'>
        <bui-icon class="number-control" name="ion-minus" size="35px" @click="minusClicked" :style="controlStyle"></bui-icon>
        <input type="number" v-model="value" :style="inputStyle"/>
        <bui-icon class="number-control" name="ion-plus" size="35px" @click="plusClicked" :style="controlStyle"></bui-icon>
    </div>
</template>

<style>
.number-input {
    flex-direction: row;
}
.number-control {
    background-color: #eeeeee;
    border-radius: 10px;
    text-align: center;
}
</style>

<script>
    module.exports = {
        data() {
            return {
            }  
        },
        props: {
            value: {
                type: Number,
                "default": 1,
            },
            step: {
                type: Number,
                "default": 1,
            },
            controlSize: {
                "default": 70,
            }
        },
        computed: {
            inputStyle() {
                const extraWidth = 20;
                const digitWidth = 20;
                return {
                    // TODO: 数字的宽度？
                    width: digitWidth * this.value.toString().length + extraWidth,
                    "margin-left": digitWidth,
                    "margin-right": digitWidth - extraWidth,
                }
            },
            controlStyle() {
                return {
                    width: this.controlSize,
                    height: this.controlSize,
                    "line-height": this.controlSize, 
                }
            }
        },
        watch: {
            value(newValue) {
                this.$emit('input', Number(newValue));
            }
        },
        methods: {
            minusClicked() {
                this.value = this.value - this.step;
            },
            plusClicked() {
                this.value = Number(this.value) + Number(this.step);
            },
        }
    }
</script>

