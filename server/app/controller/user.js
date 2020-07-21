/*
 * @Author: Whzcorcd
 * @Date: 2020-07-14 18:55:04
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 17:32:15
 * @Description: file content
 */

'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  /*
   * 登入
   * @username 账号名称
   * @password 账户密码
   */
  async login() {
    const { ctx, service } = this

    const rule = {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    }

    try {
      ctx.validate(rule, ctx.request.body)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    const { username, password } = ctx.request.body

    const token = await service.user.check(username, password)

    if (!token) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }

    ctx.cookies.set('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
      domain: 'localhost',
      httpOnly: false,
    })
    ctx.returnCtxBody(200, { token }, 'success')
  }

  /*
   * 查看账户信息
   */
  async account() {
    const { ctx } = this

    const { username } = ctx.state.user

    ctx.returnCtxBody(200, { username }, 'success')
  }

  /*
   * 登出
   */
  async logout() {
    const { ctx, app } = this

    const rule = {
      username: { type: 'string', required: true },
    }

    try {
      ctx.validate(rule, ctx.request.body)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    const { username } = ctx.request.body

    try {
      await app.redis.del(username)
    } catch (err) {
      console.error(err)
    }

    ctx.returnCtxBody(200, {}, 'success')
  }
}

module.exports = UserController
