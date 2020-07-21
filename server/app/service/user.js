/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 13:43:52
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 18:13:14
 * @Description: file content
 */

'use strict'

const utility = require('utility')

const Service = require('egg').Service

class UserService extends Service {
  /*
   * 检查账户合法性
   * @username 账号名称
   * @password 账户密码
   */
  async check(username, password) {
    const { ctx, app } = this

    // md5 加密
    const cryptographicPassword = utility.md5(password)
    console.log(cryptographicPassword)

    try {
      const res = await ctx.model.Users.findOne({
        attributes: ['password'],
        where: { username, is_use: 1 },
      })
      const existedPassword = res.password

      if (cryptographicPassword !== existedPassword) return null
    } catch (err) {
      console.error(err)
      return null
    }

    // 生成 token
    const token = ctx.generateToken(
      {
        username,
      },
      24 * 60 * 60
    )

    await app.redis.set(username, token)
    await app.redis.expire(username, 24 * 60 * 60)

    return token
  }
}

module.exports = UserService
