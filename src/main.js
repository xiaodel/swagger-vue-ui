import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'ant-design-vue/dist/antd.css'
import './assets/css/main.less'


Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
