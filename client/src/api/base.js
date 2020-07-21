/*
 * @Author: Whzcorcd
 * @Date: 2020-07-16 17:32:03
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-20 20:01:11
 * @Description: file content
 */
const base = {
  gateWay:
    process.env.NODE_ENV === 'development'
      ? '//127.0.0.1:7001/api'
      : '//dc.guangdianyun.tv'
}

export default base
