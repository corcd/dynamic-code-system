/*
 * @Author: Whzcorcd
 * @Date: 2020-07-16 17:07:44
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-17 13:20:11
 * @Description: file content
 */
import base from '@/api/base'
import Request from '@/request'

const Config = {
  config_list(data) {
    return Request.get(`${base.gateWay}/v1/config`, { data })
  },
  config_create(data) {
    return Request.post(`${base.gateWay}/v1/config`, JSON.stringify(data))
  },
  config_read(data) {
    return Request.get(`${base.gateWay}/v1/config/${data}`)
  },
  config_update(data) {
    return Request.patch(`${base.gateWay}/v1/config`, JSON.stringify(data))
  },
  config_delete(data) {
    return Request.delete(`${base.gateWay}/v1/config/${data}`)
  }
}

export default Config
