import Vue from "vue";

export default new Vue();
//空的vue实列作为中央事件总线
/*
使用方法

import Bus from '@/helpers/bus'

Bus.$on('test', msg => {
  console.log(msg)
})


Bus.$emit('test', 'hello jxm')


*/
