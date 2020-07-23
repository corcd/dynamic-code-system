<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-23 11:45:04
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-23 20:04:07
 * @Description: file content
-->
<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" title="应用配置" :bordered="false">
          <a-form-model
            ref="form"
            :model="appConfig"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item ref="appid" label="应用 Appid" prop="appid">
              <a-input :value="appConfig.appid" readonly />
            </a-form-model-item>
            <a-form-model-item ref="appid" label="应用名称" prop="project">
              <a-input v-model="appConfig.project" />
            </a-form-model-item>
            <a-form-model-item label="配置 Schema" prop="schema">
              <a-input v-model="appConfig.schema" type="textarea" :rows="8" />
            </a-form-model-item>
            <a-form-model-item label="JSON 解析树">
              <tree-view
                :data="JSON.parse(appConfig.schema)"
                :options="{ maxDepth: 3 }"
              >
              </tree-view>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
              <a-button type="primary" @click="handleSubmit">
                更新配置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import API from '@/api'

export default {
  name: 'Configuration',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      loading: true,
      appid: '',
      appConfig: {
        appid: '',
        project: '',
        schema: ''
      }
    }
  },
  mounted() {
    const { appid } = this.$route.params
    this.appid = appid
    this.getApplicationConfig()
  },
  methods: {
    async getApplicationConfig() {
      try {
        const params = this.appid
        const response = await API.Config.config_read(params)
        const { status } = response.data
        if (Number(status) === 200) {
          this.loading = false
          const { data } = response.data
          this.appConfig = data
        }
      } catch (err) {
        console.log(err)
      }
    },
    async handleSubmit() {
      try {
        const params = {
          project: this.appConfig.project,
          schema: this.appConfig.schema
        }
        const response = await API.Config.config_update(this.appid, params)
        const { status } = response.data
        if (Number(status) === 200) {
          this.loading = true
          this.getApplicationConfig()
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
