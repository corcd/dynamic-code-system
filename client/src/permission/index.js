/*
 * @Author: Whzcorcd
 * @Date: 2020-07-16 15:36:02
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-23 16:57:58
 * @Description: file content
 */
import router from '@/router'
import store from '@/store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style

import notification from 'ant-design-vue/es/notification'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const ACCESS_TOKEN = 'Access-Token'
const whiteList = ['login', '404'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard'

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  NProgress.start() // start progress bar

  if (whiteList.includes(to.name)) {
    return next()
  } else {
    /* has token */
    if (storage.get(ACCESS_TOKEN)) {
      // check login user.username is null
      if (store.state.user.username === '') {
        // request login userInfo
        store
          .dispatch('user/GetAccountInfo')
          .then(() => {
            if (to.path === loginRoutePath) {
              return next({
                path: defaultRoutePath
              })
            }
            return next()
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('user/Logout').finally(() => {
              return next({
                path: loginRoutePath,
                query: { redirect: to.fullPath }
              })
            })
          })
      } else {
        if (to.path === loginRoutePath) {
          NProgress.done()
          return next({ path: defaultRoutePath })
        }
        return next()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
