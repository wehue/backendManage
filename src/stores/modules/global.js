import { defineStore } from "pinia";
import { DEFAULT_PRIMARY } from "@/config";
import piniaPersistConfig from "@/stores/helper/persist";

export const useGlobalStore = defineStore({
  id: "geeker-global",
  state: () => ({
    assemblySize: "default",
    maximize: false,
    primary: DEFAULT_PRIMARY,
    isDark: false,
    isGrey: false,
    isWeak: false,
    asideInverted: false,
    headerInverted: false,
    isCollapse: false,
    accordion: true,
    breadcrumb: true,
    breadcrumbIcon: true,
    tabs: true,
    tabsIcon: true,
    footer: true
  }),
  getters: {},
  actions: {
    setGlobalState(key, value) {
      this[key] = value;
    },
    setDark(isDark) {
      this.isDark = isDark;
    },
    setCollapse(isCollapse) {
      this.isCollapse = isCollapse;
    }
  },
  persist: piniaPersistConfig("geeker-global")
});
