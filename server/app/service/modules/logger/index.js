/*
 * @Author: Whzcorcd
 * @Date: 2020-07-13 14:56:38
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-14 12:58:41
 * @Description: file content
 */

'use strict'

module.exports = params => {
  const defaultParams = {
    level: 'log',
    msg: '',
  }
  const options = Object.assign({}, defaultParams, params)
  return `console.${options.level}('${options.msg}');`
}
