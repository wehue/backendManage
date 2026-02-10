import { defineStore } from "pinia";

// 初始化keepAliveName数组
const keepAliveName = [];

export const useKeepAliveStore = defineStore({
  id: "geeker-keepAlive",
  state: () => ({
    keepAliveName
  }),
  actions: {
    // Remove KeepAliveName
    async removeKeepAliveName(name) {
      this.keepAliveName = this.keepAliveName.filter(item => item !== name);
    },
    // Set KeepAliveName
    async setKeepAliveName(keepAliveName = []) {
      this.keepAliveName = keepAliveName;
    }
  }
});