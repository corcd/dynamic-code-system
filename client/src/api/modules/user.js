/*
 * @Author: Whzcorcd
 * @Date: 2020-07-16 17:07:44
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-20 20:02:49
 * @Description: file content
 */
import base from '@/api/base'
import Request from '@/request'

const User = {
  user_signin(data) {
    return Request.post(`${base.gateWay}/v1/user/login`, JSON.stringify(data))
  },
  user_account() {
    return Request.get(`${base.gateWay}/v1/user/account`)
  },
  user_signout(data) {
    return Request.post(`${base.gateWay}/v1/user/logout`, JSON.stringify(data))
  }
}

export default User
