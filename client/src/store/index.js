import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((files, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  files[moduleName] = value.default
  return files
}, {})

export default new Vuex.Store({
  modules,
  plugins: process.env.NODE_ENV === 'production' ? [] : []
})
