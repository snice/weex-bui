import App from '../views/app.vue'
import buiweex from '../js/buiweex.js'

Vue.use(buiweex);

App.el = '#root'

new Vue(App)
