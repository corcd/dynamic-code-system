/*
 * @Author: Whzcorcd
 * @Date: 2020-07-14 15:09:20
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-24 16:15:05
 * @Description: file content
 */

'use strict'

module.exports = params => {
  const defaultParams = {
    target: 'window',
    listener: 'load',
    content: '',
  }
  const options = Object.assign({}, defaultParams, params)

  // const contentArray = [
  //   'var newContentScript = document.createElement("script");',
  //   `newContentScript.innerHTML = "function eventHandler(event) {${options.content}} `,
  //   `${options.target}.addEventListener('${options.listener}', eventHandler())";`,
  //   'document.body.appendChild(newContentScript);',
  // ]

  const contentArray = [
    '(function(){',
    `function eventHandler(event) {${options.content}};`,
    `${options.target}.addEventListener('${options.listener}', eventHandler());`,
    '}());',
  ]

  return contentArray.reduce((acc, value) => acc + value)
}
