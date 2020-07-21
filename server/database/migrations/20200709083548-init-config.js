/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 16:35:48
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-09 17:13:31
 * @Description: file content
 */

'use strict'

module.exports = {
  // 在执行数据库升级时调用的函数，创建 config 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize

    await queryInterface.createTable('config', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      appid: { type: STRING(255), allowNull: false },
      project: { type: STRING(255), allowNull: false },
      schema: { type: STRING(10000), allowNull: false },
      created_at: DATE,
      updated_at: DATE,
      is_use: { type: INTEGER, defaultValue: 1 },
    })
  },
  // 在执行数据库降级时调用的函数，删除 config 表
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('config')
  },
}
