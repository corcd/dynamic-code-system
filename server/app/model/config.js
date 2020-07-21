/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 17:25:43
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-09 17:41:07
 * @Description: file content
 */

'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const Config = app.model.define(
    'config',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      appid: { type: STRING(255), allowNull: false },
      project: { type: STRING(255), allowNull: false },
      schema: { type: STRING(10000), allowNull: false },
      created_at: DATE,
      updated_at: DATE,
      is_use: { type: INTEGER, defaultValue: 1 },
    },
    {
      freezeTableName: true, // 不自动将表名添加复数
    }
  )

  return Config
}
