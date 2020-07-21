/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 12:43:55
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 09:28:18
 * @Description: file content
 */

'use strict'

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize

    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: STRING(255), allowNull: false },
      password: { type: STRING(255), allowNull: false },
      is_use: { type: INTEGER, defaultValue: 1 },
    })
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  },
}
