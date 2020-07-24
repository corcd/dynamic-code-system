/*
 * @Author: Whzcorcd
 * @Date: 2020-07-13 14:55:37
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-24 17:11:54
 * @Description: file content
 */

'use strict'

const logger = require('./logger')
const script = require('./script')
const listener = require('./listener')
const message = require('./message')

const modules = new Map([
  [
    'logger',
    params => {
      return logger(params)
    },
  ],
  [
    'script',
    params => {
      return script(params)
    },
  ],
  [
    'listener',
    params => {
      return listener(params)
    },
  ],
  [
    'message',
    params => {
      return message(params)
    },
  ],
])

module.exports = serializedSchema => {
  // 内部容错
  if (serializedSchema instanceof Array) {
    let res = ''
    // 多模块连同配置
    serializedSchema.forEach(module => {
      const { type, params } = module
      if (modules.has(type)) res = res.concat(modules.get(type)(params))
    })
    return res
  }

  return ''
}
