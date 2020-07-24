<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-23 11:45:04
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-24 12:28:03
 * @Description: file content
-->
<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" title="应用配置" :bordered="false">
          <a-button slot="extra" type="primary" @click="handleSubmit">
            发布配置
          </a-button>
          <a-form-model ref="form" :model="appConfig" v-bind="formItemLayout">
            <a-form-model-item ref="appid" label="应用 Appid" prop="appid">
              <a-input :value="appConfig.appid" read-only />
            </a-form-model-item>
            <a-form-model-item ref="appid" label="应用名称" prop="project">
              <a-input v-model="appConfig.project" />
            </a-form-model-item>
            <a-form-model-item
              v-for="(item, index) in appConfig.schema"
              :key="index"
              label="Schema 项"
            >
              <a-select
                :default-value="item.type"
                style="width: 140px"
                @change="handleSelectChange($event, index)"
              >
                <a-select-option
                  v-for="i in options"
                  :key="i.value"
                  :value="i.value"
                >
                  {{ i.name }}
                </a-select-option>
              </a-select>
              <a-input
                v-for="k in options.filter(ele => ele.value === item.type)[0]
                  .params"
                :key="k"
                :addon-before="k"
                :value="item.params[k]"
                @change="handleInputChange($event, index, k)"
              />
            </a-form-model-item>
            <a-form-model-item label="Schema 总览">
              <a-input
                :value="JSON.stringify(appConfig.schema)"
                type="textarea"
                :rows="8"
                read-only
              />
            </a-form-model-item>
            <!-- <a-form-model-item label="JSON 解析树">
              <tree-view
                :data="JSON.parse(appConfig.schema)"
                :options="{ maxDepth: 3 }"
              >
              </tree-view>
            </a-form-model-item> -->
            <a-form-model-item :wrapper-col="{ span: 20, offset: 5 }">
              <a-button type="dashed" style="width: 60%" @click="addDomain">
                <a-icon type="plus" /> 增加配置项
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
    const schemaItem = new Map([
      ['logger', { level: '', msg: '' }],
      ['script', { url: '', async: '', onload: '' }],
      ['listener', { target: '', listener: '', content: '' }]
    ])
    return {
      options: [
        {
          name: '控制台输出',
          value: 'logger',
          params: ['level', 'msg']
        },
        {
          name: '脚本加载',
          value: 'script',
          params: ['url', 'async', 'onload']
        },
        {
          name: '全局侦听器',
          value: 'listener',
          params: ['target', 'listener', 'content']
        }
      ],
      schemaItem: schemaItem,

      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      dynamicValidateForm: {
        domains: []
      },

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
          this.appConfig = Object.assign({}, data, {
            schema: JSON.parse(data.schema)
          })
          console.log(this.appConfig.schema)
        }
      } catch (err) {
        console.log(err)
      }
    },
    removeDomain() {
      // TODO
    },
    addDomain() {
      const type = 'logger'
      this.appConfig.schema.push({
        type: type,
        params: this.schemaItem.get(type)
      })
      console.log(this.appConfig.schema)
    },
    handleSelectChange(e, index) {
      this.$set(this.appConfig.schema, index, {
        type: e,
        params: this.schemaItem.get(e)
      })
      console.log(this.appConfig.schema[index])
    },
    handleInputChange(e, index, key) {
      this.$set(this.appConfig.schema[index].params, key, e.target.value)
      console.log(this.appConfig.schema[index].params[key])
    },
    async handleSubmit() {
      try {
        const params = {
          project: this.appConfig.project,
          schema: JSON.stringify(this.appConfig.schema)
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

<style lang="less" scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
