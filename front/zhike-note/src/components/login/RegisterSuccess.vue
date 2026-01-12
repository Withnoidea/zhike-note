<script setup>
import { CheckCircleFilled } from "@vicons/material";
// 自定义事件
const emits = defineEmits(["changeStep"]);
</script>
<template>
  <n-card style="text-align: center">
    <n-icon size="120" color="#0e7a0d" :component="CheckCircleFilled"></n-icon>
    <h2 style="margin-top: 0; margin-bottom: 5px">欢迎加入知科笔记</h2>
    <n-text depth="3">请前往注册的邮箱，查看账号信息,</n-text>
    <n-button text type="info" @click="emits('changeStep', 1)"
      >可点击此处前往登录</n-button
    >
  </n-card>
</template>
