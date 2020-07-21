/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 10:47:08
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 09:43:15
 * @Description: file content
 */

'use strict'

const Controller = require('egg').Controller

class ConfigController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.appidRule = {
      id: { type: 'string', required: true },
    }
  }

  /*
   * 查询所有可用的 app
   * @page 当前页数
   * @pageSize 单页数目
   */
  async index() {
    const { ctx, service } = this

    const indexRule = {
      page: { type: 'string', required: false },
      pageSize: { type: 'string', required: false },
    }

    try {
      ctx.validate(indexRule, ctx.query)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    const { page, pageSize } = ctx.query
    const res = await service.config.query(page, pageSize)

    if (!res) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, res, 'success')
  }

  /*
   * 创建新的 app 配置
   * @project app 名称
   */
  async create() {
    const { ctx, service } = this

    const createRule = {
      project: { type: 'string', required: true },
    }

    try {
      ctx.validate(createRule, ctx.request.body)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    const { project } = ctx.request.body

    const info = await service.config.create(project)

    if (!info) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, info, 'success')
  }

  /*
   * 获取已有 app 配置
   * @id appid
   */
  async show() {
    const { ctx, service } = this

    try {
      ctx.validate(this.appidRule, ctx.params)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    const { id } = ctx.params

    const config = await service.config.read(id)

    if (!config) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, config, 'success')
  }

  /*
   * 更新已有 app 配置
   * @appid appid
   * @project app 名称
   * @schema 配置
   */
  async update() {
    const { ctx, service } = this

    const updateBodyRule = {
      project: { type: 'string', required: false },
      schema: { type: 'string', required: false },
    }

    try {
      ctx.validate(this.appidRule, ctx.params)
      ctx.validate(updateBodyRule, ctx.request.body)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    const { id } = ctx.params
    const { project, schema } = ctx.request.body

    const res = await service.config.update({ appid: id, project, schema })

    if (!res) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, {}, 'success')
  }

  /*
   * 软删除已有 app 配置
   * @id appid
   */
  async destroy() {
    const { ctx, service } = this

    try {
      ctx.validate(this.appidRule, ctx.params)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    const { id } = ctx.params

    const res = await service.config.delete(id)

    if (!res) {
      ctx.returnCtxBody(404, {}, 'not existed')
      return
    }
    ctx.returnCtxBody(200, {}, 'success')
  }
}

module.exports = ConfigController
