<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import indexRank from './components/indexRank.vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
</script>

<template>
  <a-config-provider :locale="zhCN">
    <indexRank msg="暗黑修仙Rank榜" />
  </a-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
