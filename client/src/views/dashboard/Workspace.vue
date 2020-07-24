<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-17 09:47:09
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-24 15:56:55
 * @Description: file content
-->
<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}，{{ username }}
            <span class="welcome-text">，{{ welcome }}</span>
          </div>
          <div>管理员 | 广电云 - 云平台事业部 - 控制台</div>
        </div>
      </div>
    </template>
    <template v-slot:extraContent>
      <div class="extra-content">
        <div class="stat-item">
          <a-statistic title="项目数" :value="count" />
        </div>
        <div class="stat-item">
          <a-statistic title="项目访问" :value="2233" />
        </div>
      </div>
    </template>

    <div>
      <a-row :gutter="24">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" title="已配置应用" :bordered="false">
            <a-button slot="extra" type="primary" @click="showDrawer">
              <a-icon type="plus" /> 新增应用
            </a-button>
            <a-list>
              <a-list-item :key="item.appid" v-for="item in applications">
                <a-list-item-meta>
                  <div slot="title">
                    <a @click="handleItemClick(item.appid)">
                      {{ item.project }}
                    </a>
                  </div>
                  <div slot="description">{{ item.appid }}</div>
                </a-list-item-meta>
                <div>
                  <a-popconfirm
                    title="删除前请确认未应用于生产环境"
                    ok-text="是"
                    cancel-text="否"
                    style="color: red"
                    @confirm="deleteApplication(item.appid)"
                  >
                    <a-icon
                      slot="icon"
                      type="question-circle-o"
                      style="color: red"
                    />
                    <a href="#">删除应用</a>
                  </a-popconfirm>
                </div>
              </a-list-item>
            </a-list>
            <a-row>
              <a-col :span="8"> </a-col>
              <a-col :span="8">
                <a-pagination
                  simple
                  :defaultCurrent="page"
                  :defaultPageSize="pageSize"
                  :total="count"
                  style="width: 100%; text-align: center;"
                  @change="handlePaginationChange($event)"
                />
              </a-col>
              <a-col :span="8"> </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <a-drawer
      title="创建新的应用"
      :width="360"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form layout="vertical" hide-required-mark>
        <a-row :gutter="24">
          <a-form-item label="应用名称">
            <a-input v-model="addDate.project" placeholder="请输入应用名称" />
          </a-form-item>
        </a-row>
        <a-row :gutter="24">
          <a-form-item label="应用描述">
            <a-textarea :rows="4" placeholder="请输入应用描述" />
          </a-form-item>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary" @click="addNewAppcation">
          提交
        </a-button>
      </div>
    </a-drawer></page-header-wrapper
  >
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import API from '@/api'

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper
  },
  data() {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},

      visible: false,
      loading: true,
      radarLoading: true,
      page: 1,
      pageSize: 6,

      projects: [],
      count: 0,
      applications: [],
      teams: [],
      addDate: {
        project: ''
      },

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
      welcome: state => state.user.welcome
    }),
    currentUser() {
      return {
        name: 'whz',
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    }
  },
  mounted() {
    this.getApplications()
  },
  methods: {
    async getApplications() {
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize
        }
        const response = await API.Config.config_list(params)
        const { status } = response.data
        if (Number(status) === 200) {
          this.loading = false
          const { count, rows } = response.data.data
          this.count = count
          this.applications = rows
        }
      } catch (err) {
        console.log(err)
      }
    },
    async addNewAppcation() {
      try {
        const params = Object.assign(
          {},
          {
            project: ''
          },
          this.addDate
        )
        const response = await API.Config.config_create(params)
        const { status } = response.data
        if (Number(status) === 200) {
          this.getApplications()
          this.onClose()
        }
      } catch (err) {
        console.log(err)
      }
    },
    async deleteApplication(appid) {
      try {
        const response = await API.Config.config_delete(appid)
        const { status } = response.data
        if (Number(status) === 200) {
          this.getApplications()
        }
      } catch (err) {
        console.log(err)
      }
    },
    handlePaginationChange(e) {
      console.log(e)
      if (e) {
        this.page = Number(e)
        this.getApplications()
      }
    },
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
      for (let key in this.addDate) {
        this.addDate[key] = ''
      }
    },
    handleItemClick(appid) {
      this.$router.push({ path: `/dashboard/configuration/${appid}` })
    }
  }
}
</script>

<style lang="less" scoped>
@import './Workplace.less';

.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }

  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }

  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;

    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }

    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
