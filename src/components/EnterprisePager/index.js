import EnterprisePagers from './EnterprisePager.vue'
// 这里是重点
const EnterprisePager = {
    install: function(Vue){
        Vue.component('enterprise-pager',EnterprisePagers)
    }
}

// 导出组件
export default EnterprisePager