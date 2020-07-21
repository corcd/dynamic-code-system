<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-15 18:25:19
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-21 11:15:22
 * @Description: file content
-->
<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://www.guangdianyun.tv" target="_blank">Guangdianyun</a>
      <a href="https://github.com/corcd/dynamic-code-server" target="_blank">
        Github
      </a>
      <a href="https://github.com/corcd" target="_blank">@Whzcorcd</a>
    </template>
    <template v-slot:copyright>
      <a href="https://github.com/corcd/dynamic-code-server" target="_blank">
        @2020 Dynamic Code
      </a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
