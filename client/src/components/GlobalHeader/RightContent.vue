<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-15 18:25:19
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-21 10:37:58
 * @Description: file content
-->
<template>
  <div :class="wrpCls">
    <avatar-dropdown
      :menu="showMenu"
      :current-user="currentUser"
      :class="prefixCls"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AvatarDropdown from './AvatarDropdown'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showMenu: true,
      currentUser: {}
    }
  },
  computed: {
    ...mapState({ username: 'user/username' }),
    wrpCls() {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${
          this.isMobile || !this.topMenu ? 'light' : this.theme
        }`]: true
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.currentUser = {
        name: 'whz'
      }
    }, 1500)
  }
}
</script>
