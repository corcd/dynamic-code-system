/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 13:44:02
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-13 16:38:43
 * @Description: file content
 */

'use strict'

const Service = require('egg').Service

class SourceService extends Service {
  /*
   * 写入 app 动态代码
   * @appid appid
   * @content 动态代码
   */
  async write(appid, content = '') {
    const { ctx, app } = this

    if (!appid) return null

    const res = await ctx.model.Source.update(
      { content },
      {
        where: { appid, is_use: 1 },
      }
    )

    await app.redis.set(`content_${appid}`, res.content)

    return res
  }

  /*
   * 读取 app 动态代码
   * @appid appid
   */
  async read(appid) {
    const { ctx, app } = this

    if (!appid) return null

    const cached_content = await app.redis.get(`content_${appid}`)

    if (cached_content) {
      // 返回 redis 中缓存的内容
      return cached_content
    }

    const res = await ctx.model.Source.findOne({
      attributes: ['content'],
      where: { appid, is_use: 1 },
    })

    await app.redis.set(`content_${appid}`, res.content)

    // 返回查询结果
    return res.content
  }
}

module.exports = SourceService
