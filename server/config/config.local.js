/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 12:22:50
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 14:59:00
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
      'Fj&O!QcUDY0WoB7Mah722lWuGSvVyFJ$w2Vs08i27&25!eQ@zHAKR1J1QCn&ig%U8KayTOpb',
    publicKey: 'local',
    ignore: ['/api/v1/user/login'],
  }

  return config
}
