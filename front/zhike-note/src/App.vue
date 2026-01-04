<script setup>
import MainTopToolbar from "@/components/toolbar/MainTopToolbar.vue";
import { useThemeStore } from "./stores/themeStore";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
</script>

<template>
  <n-config-provider :theme="theme.name">
    <n-layout position="absolute">
      <!-- 应用头 -->
      <n-layout-header bordered style="height: 64px; padding: 0 20px">
        <main-top-toolbar />
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px">
        <!-- 左侧应用栏 -->
        <n-layout-sider
          content-style="padding: 24px 0; text-align: center"
          width="64px"
          bordered
        >
          海淀桥
        </n-layout-sider>
        <!-- 主页面 -->
        <n-layout-content content-style="padding: 24px;">
          平山道
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>
