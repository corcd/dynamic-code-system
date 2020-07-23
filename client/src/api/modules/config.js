/*
 * @Author: Whzcorcd
 * @Date: 2020-07-16 17:07:44
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-23 19:24:07
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
  config_read(appid) {
    return Request.get(`${base.gateWay}/v1/config/${appid}`)
  },
  config_update(appid, data) {
    return Request.patch(
      `${base.gateWay}/v1/config/${appid}`,
      JSON.stringify(data)
    )
  },
  config_delete(appid) {
    return Request.delete(`${base.gateWay}/v1/config/${appid}`)
  }
}

export default Config
