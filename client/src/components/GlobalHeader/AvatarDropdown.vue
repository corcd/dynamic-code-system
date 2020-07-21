<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-15 18:25:19
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-21 17:41:22
 * @Description: file content
-->
<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar
        size="small"
        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        class="antd-pro-global-header-index-avatar"
      />
      <span>{{ currentUser.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <!-- <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          个人设置
        </a-menu-item>
        <a-menu-divider v-if="menu" /> -->
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { mapActions } from 'vuex'
import { Modal } from 'ant-design-vue'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapActions({ Logout: 'user/Logout' }),
    handleLogout() {
      Modal.confirm({
        title: '确认登出',
        content: '请在完成所有任务流程后，确认登出系统',
        onOk: () => {
          return this.Logout({ username: this.currentUser.name })
            .then(() => {
              this.$router.push({ name: 'login' })
            })
            .catch(err => {
              console.log(err)
            })
        },
        onCancel() {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
