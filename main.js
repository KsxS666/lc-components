import Vue from 'vue'
import App from './App'
import 'cndapp-ui/common/style/iconfont/iconfont.css'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
