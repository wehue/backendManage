import router from "@/routers";
import { defineStore } from "pinia";
import { getUrlWithParams } from "@/utils";
import { useKeepAliveStore } from "./keepAlive";
import piniaPersistConfig from "@/stores/helper/persist";

// 初始化tabsMenuList数组
const tabsMenuList = [];

const keepAliveStore = useKeepAliveStore();

export const useTabsStore = defineStore({
  id: "geeker-tabs",
  state: () => ({
    tabsMenuList
  }),
  actions: {
    // Add Tabs
    async addTabs(tabItem) {
      const isExists = this.tabsMenuList.some(item => item.path === tabItem.path);
      if (!isExists) {
        this.tabsMenuList.push(tabItem);
      }
      // add keepalive
      if (!keepAliveStore.keepAliveName.includes(tabItem.path) && tabItem.isKeepAlive) {
        // 使用setKeepAliveName方法，因为keepAliveStore中没有addKeepAliveName方法
        const newKeepAliveList = [...keepAliveStore.keepAliveName, tabItem.path];
        keepAliveStore.setKeepAliveName(newKeepAliveList);
      }
    },
    // Remove Tabs
    async removeTabs(tabPath, isCurrent = true) {
      if (isCurrent) {
        this.tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab = this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      // remove keepalive
      const tabItem = this.tabsMenuList.find(item => item.path === tabPath);
      tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.path);
      // set tabs
      this.tabsMenuList = this.tabsMenuList.filter(item => item.path !== tabPath);
    },
    // Close Tabs On Side
    async closeTabsOnSide(path, type) {
      const currentIndex = this.tabsMenuList.findIndex(item => item.path === path);
      if (currentIndex !== -1) {
        this.tabsMenuList = this.tabsMenuList.filter((item, index) => {
          if (type === "left") {
            return index >= currentIndex || !item.close;
          } else if (type === "right") {
            return index <= currentIndex || !item.close;
          }
          return true;
        });
      }
      // set keepalive
      const KeepAliveList = this.tabsMenuList.filter(item => item.isKeepAlive);
      keepAliveStore.setKeepAliveName(KeepAliveList.map(item => item.path));
    },
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue) {
      this.tabsMenuList = this.tabsMenuList.filter(item => {
        return item.path === tabsMenuValue || !item.close;
      });
      // set keepalive
      const KeepAliveList = this.tabsMenuList.filter(item => item.isKeepAlive);
      keepAliveStore.setKeepAliveName(KeepAliveList.map(item => item.path));
    },
    // Set Tabs
    async setTabs(tabsMenuList) {
      this.tabsMenuList = tabsMenuList;
    },
    // Set Tabs Title
    async setTabsTitle(title) {
      this.tabsMenuList.forEach(item => {
        if (item.path == getUrlWithParams()) item.title = title;
      });
    }
  },
  persist: piniaPersistConfig("geeker-tabs")
});