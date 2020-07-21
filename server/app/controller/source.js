/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 10:57:23
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 09:42:14
 * @Description: file content
 */

'use strict'

const Controller = require('egg').Controller

class SourceController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.appidRule = {
      id: { type: 'string', required: true },
    }
  }

  /*
   * 获取已有 app 动态代码
   * @id appid
   */
  async show() {
    const { ctx, service } = this

    try {
      ctx.validate(this.appidRule, ctx.params)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxCode(400, ctx.consoleError('illegal parameters'))
      return
    }

    const { id } = ctx.params

    const content = await service.source.read(id)

    if (!content) {
      ctx.returnCtxCode(404, ctx.consoleError('not existed'))
      return
    }
    ctx.returnCtxCode(200, content)
  }
}

module.exports = SourceController
