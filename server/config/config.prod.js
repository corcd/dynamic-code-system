/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 12:22:57
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 14:59:22
 * @Description: file content
 */

'use strict'

module.exports = () => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'dynamic_code',
    operatorsAliases: false,
  }

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'whz18267590821',
      db: 0,
      weakDependent: true,
    },
  }

  config.jwt = {
    privateKey:
      '@3b^js3$WoeXiu!ijzFOvkT&70A927AU%8M6AgD8uxugwoN2lWivtn$UIX9M$rm7TpTlY0X1',
    publicKey: 'prod',
    ignore: ['/api/v1/user/login'],
  }

  return config
}
