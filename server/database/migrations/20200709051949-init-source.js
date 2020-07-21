/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 13:19:49
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-09 17:16:57
 * @Description: file content
 */

'use strict'

module.exports = {
  // 在执行数据库升级时调用的函数，创建 source 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, DATE } = Sequelize

    await queryInterface.createTable('source', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      appid: { type: STRING(255), allowNull: false },
      content: { type: TEXT('long'), allowNull: false },
      created_at: DATE,
      updated_at: DATE,
      is_use: { type: INTEGER, defaultValue: 1 },
    })
  },
  // 在执行数据库降级时调用的函数，删除 source 表
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('source')
  },
}
