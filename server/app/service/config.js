/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 13:43:58
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 09:41:35
 * @Description: file content
 */

'use strict'

const Service = require('egg').Service

class ConfigService extends Service {
  /*
   * 查询所以可用的 app
   * @page 当前页数（ 默认 1）
   * @pageSize 单页数目（默认 10）
   */
  async query(page = 1, pageSize = 10) {
    const { ctx } = this

    const res = await ctx.model.Config.findAndCountAll({
      attributes: ['appid', 'project'],
      where: { is_use: 1 },
      limit: Number(pageSize),
      offset: (Number(page) - 1) * Number(pageSize),
    })

    return res
  }

  /*
   * 创建新的 app 配置
   * @project app 名称
   */
  async create(project = 'default app') {
    const { ctx, app } = this

    const appid = await app.snowflake.uuid()

    // 创建新的 app 配置记录
    const resConfig = await ctx.model.Config.create({
      appid,
      project,
      schema: '',
    })

    // 同步创建新的动态代码仓库
    const resSource = await ctx.model.Source.create({
      appid,
      content: '',
    })

    return resConfig && resSource ? { appid, project } : null
  }

  /*
   * 获取已有 app 配置
   * @appid appid
   */
  async read(appid) {
    const { ctx } = this

    if (!appid) return null

    const res = await ctx.model.Config.findOne({
      where: { appid, is_use: 1 },
    })

    return res
  }

  /*
   * 更新已有 app 配置
   * @params 参数
   */
  async update(params) {
    const { ctx } = this

    if (!params.appid) return null

    // 更新 app 配置记录
    const resConfig = await ctx.model.Config.update(params, {
      where: { appid: params.appid, is_use: 1 },
    })

    // 同步创建新的动态代码仓库
    const resSource = this.publish(params.appid, params.schema, false)

    return resConfig && resSource
  }

  /*
   * 软删除已有 app 配置
   * @appid appid
   */
  async delete(appid) {
    const { ctx } = this

    if (!appid) return null

    const resConfig = await ctx.model.Config.update(
      { is_use: 0 },
      {
        where: { appid, is_use: 1 },
      }
    )

    const resSource = this.publish(appid, '', true)

    return resConfig && resSource
  }

  /*
   * 发布动态代码
   * @appid appid
   * @schema 配置（默认空）
   * @reset 是否重置（默认否）
   */
  async publish(appid, schema = '', reset = false) {
    const { ctx } = this

    if (!appid) return null

    const code = await ctx.service.code.build(schema)

    const res = await ctx.service.source.write(appid, reset ? '' : code)

    return res
  }
}

module.exports = ConfigService
