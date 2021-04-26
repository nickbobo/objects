import ResetDatePickers from './ResetDatePicker.vue'
// 这里是重点
const ResetDatePicker = {
    install: function(Vue){
        Vue.component('reset-date-picker',ResetDatePickers)
    }
}

// 导出组件
export default ResetDatePicker