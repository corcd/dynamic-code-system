/*
 * @Author: Whzcorcd
 * @Date: 2020-07-16 17:12:09
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-20 19:53:04
 * @Description: file content
 */
/* eslint-disable */
import axios from 'axios'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'

// 创建 axios 实例
const Request = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  timeout: 5000
})

/**
 * 用来判断值类型
 * @param {Object} obj
 */
const toType = obj => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

/**
 * 对象 null 值过滤
 * @param {Object} obj 请求 data 对象
 */
const filterNull = obj => {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key]
    } else {
      if (toType(obj[key]) === 'string') {
        obj[key] = obj[key].trim()
      } else if (toType(obj[key]) === 'object') {
        obj[key] = filterNull(obj[key])
      } else if (toType(obj[key]) === 'array') {
        obj[key] = filterNull(obj[key])
      }
    }
  }
  return obj
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param {String} info 请求失败的附带信息
 */
const errorHandle = (status, info) => {
  // 状态码判断
  switch (status) {
    // 400: 客户端请求错误
    case 400:
      notification.error('请求错误，请检查您的网络')
      break
    case 404:
      notification.error('请求的资源不存在')
      break
    case 450:
      notification.error('请求参数错误')
      break
    case 500:
      notification.error('服务异常，请稍后再试')
      break
    case 503:
      notification.error('服务不可用，请稍后再试')
      break
    default:
      notification.error(info)
  }
}

// 请求拦截器
Request.interceptors.request.use(
  config => {
    // console.log(config)
    const token = storage.get('Access-Token')
    if (!config.url.includes('/user/login')) {
      if (token) {
        config.headers.authorization = token
      } else {
        const error = '账号未登录'
        notification.error(error)
        return Promise.reject(error)
      }
    }
    if (config.method === 'get') {
      const data = filterNull(config.data)
      config.params = data
    }
    return config
  },
  error => {
    notification.error('请求失败')
    return Promise.reject(error)
  }
)

// 响应拦截器
Request.interceptors.response.use(
  response => {
    // console.log(response)
    // store.commit('changeNetwork', true)
    if (response.status === 200) {
      if (Number(response.data.status) === 200) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response.data.errornotification)
      }
    } else {
      // 请求已发出，在 2xx 的范围
      notification.error('请求响应错误')
      return Promise.reject(response)
    }
  },
  error => {
    const { err } = error
    if (err) {
      // 请求已发出，但是不在 2xx 的范围
      notification.error('请求响应异常')
      errorHandle(err.status, err.data.errornotification)
      return Promise.reject(err)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新 state 的 network 状态
      // network 状态在 app.vue 中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        notification.error('网络断开')
        // store.commit('changeNetwork', false)
      } else {
        notification.error('未知错误')
        return Promise.reject(error)
      }
    }
  }
)

/**
 * 创建统一封装过的 axios 实例
 * @return { AxiosInstance }
 */
export default Request
