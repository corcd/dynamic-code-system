/*
 * @Author: Whzcorcd
 * @Date: 2020-07-15 18:25:19
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-23 15:08:07
 * @Description: file content
 */
import storage from 'store'
import API from '@/api'
import { welcome } from '@/utils/util'

const ACCESS_TOKEN = 'Access-Token'

const user = {
  state: {
    token: '',
    username: '',
    welcome: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { username, welcome }) => {
      state.username = username
      state.welcome = welcome
    }
  },

  actions: {
    // 登录
    async Login({ commit }, userInfo) {
      try {
        const response = await API.User.user_signin(userInfo)
        const { status } = response.data
        if (Number(status) === 200) {
          const { token } = response.data.data
          storage.set(ACCESS_TOKEN, token, 1 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', token)
          return Promise.resolve(response.data.msg)
        } else {
          return Promise.reject(response.data.msg)
        }
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },

    // 获取用户信息
    async GetAccountInfo({ commit }) {
      try {
        const response = await API.User.user_account()
        const { status } = response.data
        if (Number(status) === 200) {
          const { username } = response.data.data
          commit('SET_NAME', { username: username, welcome: welcome() })
          return Promise.resolve(response.data.msg)
        } else {
          return Promise.reject(response.data.msg)
        }
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },

    // 登出
    async Logout({ commit }, userInfo) {
      try {
        const response = await API.User.user_signout(userInfo)
        const { status } = response.data
        if (Number(status) === 200) {
          commit('SET_TOKEN', '')
          storage.remove(ACCESS_TOKEN)
          return Promise.resolve(response.data.msg)
        } else {
          return Promise.reject(response.data.msg)
        }
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    }
  }
}

export default {
  namespaced: true,
  state: user.state,
  mutations: user.mutations,
  actions: user.actions,
  getters: user.getters
}
