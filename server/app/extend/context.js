/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 14:22:03
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-16 17:28:58
 * @Description: file content
 */

'use strict'

const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

module.exports = {
  /**
   * 生成 token
   * @param data 信息
   * @param time 时长（秒）
   */
  generateToken(data, time = 0) {
    const cert = fs.readFileSync(
      path.join(__dirname, '../public/rsa_private_key.pem')
    )
    const created = Math.floor(Date.now() / 1000)

    const options = Object.assign({}, data, { exp: created + time })

    const token = jwt.sign(options, cert, {
      algorithm: 'RS256',
    })
    return token
  },

  /**
   * 校验 token
   * @param token token
   */
  verifyToken(token) {
    const cert = fs.readFileSync(
      path.join(__dirname, '../public/rsa_public_key.pem')
    )
    const current = Math.floor(Date.now() / 1000)

    try {
      const result =
        jwt.verify(token, cert, {
          algorithms: ['RS256'],
        }) || {}

      const { exp } = result

      if (current <= exp) {
        return result
      }
      return null
    } catch (e) {
      console.error(e)
      return null
    }
  },

  /**
   * 生成 console 错误信息
   * @param msg 错误信息
   */
  consoleError(msg) {
    return `console.error('${String(msg)}')`
  },

  /**
   * 返回客户端接口标准化内容
   * @param status 返回状态
   * @param data 返回内容
   * @param msg 返回信息
   */
  returnCtxBody(status, data = {}, msg) {
    // this 即 ctx
    this.status = status
    this.body = {
      status,
      data,
      msg,
    }
  },

  /**
   * 直接返回内容
   * @param status 返回状态
   * @param content 返回内容
   */
  returnCtxCode(status, content) {
    // this 即 ctx
    // 去除缓存
    this.set('cache-control', 'max-age=0')

    this.status = status
    this.body = content

    this.type = 'application/javascript'
  },
}
