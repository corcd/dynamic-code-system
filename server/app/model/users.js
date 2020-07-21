/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 13:31:32
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-15 09:28:27
 * @Description: file content
 */

'use strict'

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const Users = app.model.define(
    'users',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: STRING(255), allowNull: false },
      password: { type: STRING(255), allowNull: false },
      is_use: { type: INTEGER, defaultValue: 1 },
    },
    {
      freezeTableName: true, // 不自动将表名添加复数
    }
  )

  return Users
}
