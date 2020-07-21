<!--
 * @Author: Whzcorcd
 * @Date: 2020-07-15 18:25:19
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-07-17 17:12:27
 * @Description: file content
-->
<template>
  <a-result
    status="500"
    title="500"
    sub-title="Sorry, the server is reporting an error."
  >
    <template #extra>
      <a-button type="primary" @click="toHome">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception500',
  methods: {
    toHome() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
