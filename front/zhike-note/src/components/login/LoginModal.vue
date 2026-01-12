<script setup>
import login from "@/components/login/Login.vue";
import Register from "@/components/login/Register.vue";
import RegisterSuccess from "@/components/login/RegisterSuccess.vue";
import { useThemeStore } from "@/stores/themeStore";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useLoginModalStore } from "@/stores/loginModalStore";

const themeStore = useThemeStore();
const { theme, isDarkTheme } = storeToRefs(themeStore);
const { changeTheme } = themeStore;
// 登录模态框共享资源的对象
const loginModalStore = useLoginModalStore();
// 是否显示登录模态框
const { showLoginModal } = storeToRefs(loginModalStore);

//登录模态框显示的内容 1 登录 2 注册 3 注册成功
const loginModalStep = ref(1);

// 登录模态框显示的卡片
const showLoginModalCard = computed(() => {
  if (loginModalStep.value === 1) {
    return login;
  } else if (loginModalStep.value === 2) {
    return Register;
  } else {
    return RegisterSuccess;
  }
});

// 改变登录模态框显示的卡片
const changeLoginModalStep = (step) => {
  loginModalStep.value = step;
};
</script>

<template>
  <n-modal
    v-model:show="showLoginModal"
    transform-origin="center"
    :close-on-esc="false"
  >
    <div style="width: 430px">
      <!-- 登录模态框卡片 -->
      <transition name="bounce" mode="out-in">
        <component
          :is="showLoginModalCard"
          @changeStep="changeLoginModalStep"
        ></component>
      </transition>
    </div>
  </n-modal>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
