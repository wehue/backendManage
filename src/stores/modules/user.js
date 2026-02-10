import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/helper/persist";

export const useUserStore = defineStore({
  id: "geeker-user",
  state: () => ({
    token: "",
    userInfo: null
  }),
  getters: {},
  actions: {
    // Set token
    setToken(token) {
      this.token = token;
    },
    // Set userInfo
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    // Clear token and userInfo
    clearUserInfo() {
      this.token = "";
      this.userInfo = null;
    }
  },
  persist: piniaPersistConfig("geeker-user")
});
