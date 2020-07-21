<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-15 18:25:19
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-21 11:09:00
 * @Description: file content
-->
<template>
  <pro-layout
    title="Dynamic Code"
    :menus="menus"
    theme="dark"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :logo="logoRender"
  >
    <template v-slot:rightContentRender>
      <right-content :top-menu="false" theme="dark" />
    </template>
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
import routes from '@/router/routes'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'

import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'BasicLayout',
  components: {
    RightContent,
    GlobalFooter
  },
  data() {
    return {
      // preview.pro.antdv.com only use.
      isProPreviewSite:
        process.env.VUE_APP_PREVIEW === 'true' &&
        process.env.NODE_ENV !== 'development',
      // end

      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: '',
      // 媒体查询
      query: {},

      // 是否手机模式
      isMobile: false
    }
  },
  created() {
    this.menus = routes.find(item => item.path === '/').children
  },
  methods: {
    handleMediaQuery(query) {
      this.query = query
      if (this.isMobile && !query['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && query['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
      }
    },
    handleCollapse() {
      this.collapsed = !this.collapsed
    },
    logoRender() {
      return <LogoSvg />
    }
  }
}
</script>

<style lang="less">
@import './BasicLayout.less';
</style>
