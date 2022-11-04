import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { DatePicker } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createPinia } from 'pinia'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const pinia = createPinia()

const app = createApp(App)
app.use(DatePicker).use(pinia).mount('#app')
export default {
  data() {
    return {
      locale: zhCN,
    }
  },
}
