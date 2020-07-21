/*
 * @Author: Whzcorcd
 * @Date: 2020-07-16 15:36:02
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-21 11:38:49
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
  console.log(to)
  console.log(from)
  NProgress.start() // start progress bar
  next()

  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // check login user.roles is null
      if (store.state.user.username === '') {
        // request login userInfo
        store
          .dispatch('user/GetAccountInfo')
          .then(() => {
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('user/Logout').then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
