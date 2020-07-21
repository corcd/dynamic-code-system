/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 10:36:59
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 15:35:12
 * @Description: file content
 */

/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1594262188520_1907'

  // add your middleware config here
  config.middleware = ['gzip', 'errorHandler']

  // add your user config here
  const userConfig = {
    myAppName: 'dynamic-code-server',
    cluster: {
      listen: {
        port: 7001,
        hostname: '127.0.0.1',
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
        headerName: 'x-csrf-token',
      },
      domainWhiteList: ['http://localhost:7001', 'http://127.0.0.1:7001'],
    },
    bodyParser: {
      jsonLimit: '2mb',
      formLimit: '2mb',
    },
    gzip: {
      threshold: 1024,
    },
    errorHandler: {
      match: '/api',
    },
    snowflake: {
      client: {
        machineId: 0,
        // `Number` if 6-bit length (the default value),
        // we could handle servers from `2 ** 6` different machines.
        // And if 0, there will be no machine id in the uuid
        machineIdBitLength: 6,
        workerIdBitLength: 4,
        // Could handle max 4096 requests per millisecond
        serialIdBitLength: 8,
      },
    },
  }

  return {
    ...config,
    ...userConfig,
  }
}
