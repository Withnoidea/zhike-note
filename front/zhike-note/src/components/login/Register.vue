<script setup>
import { ref } from "vue";
import { EmailOutlined, LockOpenOutlined } from "@vicons/material";
// 自定义事件
const emits = defineEmits(["changeStep"]);
// 注册表单值
const registerFormValue = ref({
  email: "",
  vc: "",
  trim: false,
});

// 注册表单验证规则
const registerFormRules = {
  email: [
    {
      required: true,
      message: "请输入邮箱号",
      trigger: ["blur", "input"],
    },
    {
      key: "mail",
      message: "请正确输入邮箱格式",
      trigger: ["blur", "input"],
      validator: (rule, value) => {
        return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
      },
    },
  ],
  vc: [
    {
      required: true,
      message: "请输入验证码",
      trigger: ["blur", "input"],
    },
  ],
  trim: [
    {
      message: "请认真阅读本公司条款与协议",
      trigger: ["change"],
      validator: (rule, value) => {
        return value;
      },
    },
  ],
};
// 注册表单对象引用
const registerFormRef = ref(null);
// 去注册
const toRegister = (e) => {
  e.preventDefault();
  registerFormRef.value?.validate((errors) => {
    if (!errors) {
      alert("注册成功");
    }
  });
};

// 获取验证码
const btnCountDown = ref({
  text: "获取验证码", //按钮显示文本
  time: 60, //还有多久结束
  disabled: false, //是否禁用按钮
  clock: null,
});
// 按钮倒计时
const buttonCountDown = () => {
  btnCountDown.value.clock = setInterval(() => {
    if (btnCountDown.value.time === 1) {
      // 不需要倒计时 重置获取验证码的状态
      resetButtonCountDownStatus();
    } else {
      // 需要倒计时
      btnCountDown.value.disabled = true;
      btnCountDown.value.time--;
      btnCountDown.value.text = btnCountDown.value.time + "秒后重新获取";
    }
  }, 1000);
};

// 重置获取验证码的状态
const resetButtonCountDownStatus = () => {
  clearInterval(btnCountDown.value.clock);

  btnCountDown.value.time = 60;
  btnCountDown.value.text = "获取验证码";
  btnCountDown.value.disabled = false;
};

// 获取验证码
const getEmailVc = () => {
  registerFormRef.value?.validate(
    (errors) => {
      if (!errors) {
        buttonCountDown();
      }
    },
    (rule) => {
      return rule?.key === "mail";
    }
  );
};
</script>
<template>
  <n-card>
    <!-- 前往登录 -->
    <n-space justify="space-between" align="center">
      <h2>注册</h2>
      <n-text depth="3"
        >已有账号?
        <n-button text type="info" @click="emits('changeStep', 1)"
          >前往登录</n-button
        >
      </n-text>
    </n-space>
    <!-- 注册表单 -->
    <n-form
      :model="registerFormValue"
      :rules="registerFormRules"
      ref="registerFormRef"
    >
      <n-form-item label="邮箱号" path="email" first>
        <n-input
          placeholder="请输入邮箱号"
          v-model:value="registerFormValue.email"
        >
          <template #prefix>
            <n-icon :component="EmailOutlined"></n-icon>
          </template>
        </n-input>
      </n-form-item>

      <n-grid :cols="2" :x-gap="24">
        <n-form-item-gi label="验证码" path="vc">
          <n-input
            placeholder="请输入验证码"
            v-model:value="registerFormValue.vc"
          >
          </n-input
        ></n-form-item-gi>
        <n-form-item-gi>
          <n-button
            secondary
            block
            type="success"
            :disabled="btnCountDown.disabled"
            @click="getEmailVc"
            >{{ btnCountDown.text }}</n-button
          >
        </n-form-item-gi>
      </n-grid>
      <n-form-item :show-label="false" path="trim">
        <n-checkbox v-model:checked="registerFormValue.trim"
          >同意本公司的</n-checkbox
        >
        <n-button text type="info">《条款与协议》</n-button>
      </n-form-item>
      <n-form-item :show-label="false">
        <n-button type="success" block>注册</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>
