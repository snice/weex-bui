import TabbarDemo from '../views/example/tabbar-demo-custom.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);
TabbarDemo.el="#root";
new Vue(TabbarDemo);

