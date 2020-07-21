/*
 * @Author: Whzcorcd
 * @Date: 2020-07-15 14:15:09
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 17:33:54
 * @Description: file content
 */

'use strict'

module.exports = (options, app) => {
  return async function authInterceptor(ctx, next) {
    // 获取 token
    const token = ctx.headers.authorization

    // 验证 token 是否为空
    if (token) {
      const result = ctx.verifyToken(token) // 解密 token

      if (!result || !result.username) {
        ctx.returnCtxBody(401, {}, 'illegal identity')
        return
      }

      const { username } = result

      const cachedToken = await app.redis.get(username)

      // 验证 token 是否在缓存中
      if (cachedToken && token === cachedToken) {
        ctx.state.user = { username }
        return await next()
      }

      // 非最新 token 或记录不存在
      ctx.returnCtxBody(409, {}, 'information conflict')
      return
    }
    // token 为空，未登录
    ctx.returnCtxBody(403, {}, 'please login first')
  }
}
