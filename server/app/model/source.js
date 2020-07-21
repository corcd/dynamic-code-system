/*
 * @Author: Whzcorcd
 * @Date: 2020-07-09 13:39:50
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-09 17:25:25
 * @Description: file content
 */

'use strict'

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize

  const Source = app.model.define(
    'source',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      appid: { type: STRING(255), allowNull: false },
      content: { type: TEXT('long'), allowNull: false },
      created_at: DATE,
      updated_at: DATE,
      is_use: { type: INTEGER, defaultValue: 1 },
    },
    {
      freezeTableName: true, // 不自动将表名添加复数
    }
  )

  return Source
}
