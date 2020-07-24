/*
 * @Author: Whzcorcd
 * @Date: 2020-07-14 10:32:38
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-24 12:54:08
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
    '(function(){',
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

  const tail = '}());'

  // 存在加载函数时
  if (options.onload) {
    const str_1 = sourceArray.reduce((acc, value) => acc + value)
    const str_2 = onloadArray.reduce((acc, value) => acc + value)
    return str_1.concat(str_2, tail)
  }

  const res = sourceArray.reduce((acc, value) => acc + value)
  return res.concat(tail)
}
