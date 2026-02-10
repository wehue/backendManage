<template>
  <el-config-provider :locale="zhCn" :size="assemblySize" :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="js">
import { reactive, computed } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { useGlobalStore } from "@/stores/modules/global";
import { useTheme } from "@/hooks/useTheme";

const globalStore = useGlobalStore();
const { initTheme } = useTheme();
initTheme();

const assemblySize = computed(() => globalStore.assemblySize);
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
