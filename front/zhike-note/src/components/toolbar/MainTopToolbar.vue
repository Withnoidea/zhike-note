<script setup>
import { DarkModeRound, NotificationsNoneOutlined } from "@vicons/material";
import { useThemeStore } from "@/stores/themeStore";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { theme, isDarkTheme } = storeToRefs(themeStore);
const { changeTheme } = themeStore;
</script>

<template>
  <n-space align="center" justify="space-between" style="height: 100%">
    <n-text>知科笔记</n-text>
    <n-space>
      <n-avatar
        size="small"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        style="position: relative; top: 3px"
      />
      <n-divider vertical style="position: relative; top: 5px" />
      <n-badge dot processing type="success" :offset="[-8, 4]">
        <n-button circle tertiary>
          <n-icon :component="NotificationsNoneOutlined" size="18"></n-icon>
        </n-button>
      </n-badge>
      <n-button circle tertiary @click="changeTheme(!isDarkTheme)">
        <n-icon :component="theme.icon" size="10"></n-icon>
      </n-button>
      <n-button tertiary type="primary">登录</n-button>
    </n-space>
  </n-space>
</template>
