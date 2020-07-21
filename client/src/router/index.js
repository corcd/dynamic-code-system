/*
 * @Author: Whzcorcd
 * @Date: 2020-07-16 15:27:25
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-17 15:16:22
 * @Description: file content
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
