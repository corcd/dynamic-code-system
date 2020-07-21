/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 10:36:59
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-16 17:45:00
 * @Description: file content
 */

'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app

  router.post('/api/v1/user/login', controller.user.login)
  router.get(
    '/api/v1/user/account',
    middleware.auth({}, app),
    controller.user.account
  )
  router.post('/api/v1/user/logout', controller.user.logout)

  // 控制台配置接口
  router.resources(
    'config',
    '/api/v1/config',
    middleware.auth({}, app),
    controller.config
  )

  // 前台应用访问接口
  router.resources('source', '/api/v1/source', controller.source)
}
