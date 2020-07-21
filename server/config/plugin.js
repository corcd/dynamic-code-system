/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 10:36:59
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-14 18:13:07
 * @Description: file content
 */

'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  snowflake: {
    enable: true,
    package: 'egg-snowflake',
  },
}
