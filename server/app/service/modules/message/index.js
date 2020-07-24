/*
 * @Author: Whzcorcd
 * @Date: 2020-07-24 16:14:12
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-24 17:26:37
 * @Description: file content
 */

'use strict'

module.exports = params => {
  const defaultParams = {
    subkey: '',
    topic: '',
    actions: '',
  }
  const options = Object.assign({}, defaultParams, params)
  const sourceArray = [
    '(function(){',
    'var newSourceScript = document.createElement("script");',
    'newSourceScript.src = "https://cdn.aodianyun.com/dms/rop_client.js";',
    'newSourceScript.async = true;',
    'document.body.appendChild(newSourceScript);',
    'newSourceScript.onload = function() {',
    'var clientId = "dc_"+String(new Date().getTime() + Math.floor(Math.random() * 10000 + 1));',
    'if (typeof ROP != "undefined") {',
    `ROP.Enter("", "${options.subkey}", clientId, true);`,
    `ROP.On('publish_data', function (data) { ${options.actions} });`,
    'window.onbeforeunload = function () { ROP.Leave();};',
    '};};',
    '}());',
  ]

  return sourceArray.reduce((acc, value) => acc + value)
}
