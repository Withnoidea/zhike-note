import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { darkTheme } from "naive-ui";
import { LightbulbOutlined, DarkModeRound } from "@vicons/material";
//关于主题的全局状态
export const useThemeStore = defineStore(
  "theme",
  () => {
    //是否是暗系主题
    const isDarkTheme = ref(false);
    //主题的按钮的切换
    const theme = computed(() => {
      if (isDarkTheme.value) {
        //暗系
        return {
          name: darkTheme,
          icon: LightbulbOutlined,
        };
      } else {
        //亮系
        return {
          name: null,
          icon: DarkModeRound,
        };
      }
    });
    //更改主题 dark {Boolean} 是否是暗系
    const changeTheme = (dark) => {
      isDarkTheme.value = dark;
    };
    return { isDarkTheme, theme, changeTheme };
  }
  // 自定义存储方式
);
