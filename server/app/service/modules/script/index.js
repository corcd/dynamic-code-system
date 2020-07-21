/*
 * @Author: Whzcorcd
 * @Date: 2020-07-14 10:32:38
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-14 16:20:35
 * @Description: file content
 */

'use strict'

module.exports = params => {
  const defaultParams = {
    url: '',
    async: false,
    onload: '',
  }
  const options = Object.assign({}, defaultParams, params)
  const sourceArray = [
    'var newSourceScript = document.createElement("script");',
    `newSourceScript.src = "${options.url}";`,
    `newSourceScript.async = ${options.async};`,
    'document.body.appendChild(newSourceScript);',
  ]

  // const onloadArray = [
  //   'newSourceScript.onload = function() {',
  //   'var newOnloadScript = document.createElement("script");',
  //   `newOnloadScript.innerHTML = "${options.onload}";`,
  //   'document.body.appendChild(newOnloadScript);',
  //   '};',
  // ]

  const onloadArray = [
    `newSourceScript.onload = function() {${options.onload}};`,
  ]

  // 存在加载函数时
  if (options.onload) {
    const str_1 = sourceArray.reduce((acc, value) => acc + value)
    const str_2 = onloadArray.reduce((acc, value) => acc + value)
    return str_1.concat(str_2)
  }

  return sourceArray.reduce((acc, value) => acc + value)
}
