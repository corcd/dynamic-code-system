/*
 * @Author: Whzcorcd
 * @Date: 2020-07-10 15:22:58
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 09:41:58
 * @Description: file content
 */

'use strict'

const produce = require('./modules')

const Service = require('egg').Service

class CodeService extends Service {
  /*
   * 依据 schema 构建动态代码
   * @schema 配置
   */
  async build(schema) {
    const serializedSchema = JSON.parse(schema)

    if (!serializedSchema instanceof Array) return null

    // 执行构建
    return produce(serializedSchema)
  }
}

module.exports = CodeService
